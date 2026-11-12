/* ============ STORY ADVENTURE: one long side-scrolling world ============ */
const Story = {
  BW: 104, EW: 44, GB: 160, S: null, W: null, a: null, P: null, cur: -1, t: 0, banner: null, crit: [], fly: null,
  cryT: 3, hintGlow: 0, saveT: 0, msgT: 0, endT: -1, fx: [], near: null, reveal: null, hud: '', taskT: 0, moveT: 0, hideT: -1,

  /* ----- new game / resume ----- */
  /* open a chapter: resume it if it was started before, otherwise begin a fresh trail */
  open(ch) {
    const cur = DB.story, key = S => (S && S.ch) || 1;
    if (cur && key(cur) === ch && !cur.finished && (ch !== 'wild' || cur.week === weekNo())) { this.start(); return; }
    if (cur && !cur.finished) DB.trails[key(cur)] = cur;
    const old = DB.trails[ch]; delete DB.trails[ch];
    if (old && !old.finished && (ch !== 'wild' || old.week === weekNo())) { DB.story = old; SAVE.put(); this.start(); } else this.newGame(ch);
  },
  newGame(ch) {
    ch = ch || 1; const k = DB.set.diff, status = {}, seed = (rnd() * 1e9) | 0;
    const order = ch === 'wild' ? shuffle(unlockedBiomes(), RNG(weekNo() * 7919 + 13)).slice(0, 10) : shuffle(CHAPTERS[ch].ids.slice());
    order.forEach(b => status[b] = 'lost');
    this.S = DB.story = { v: 4, ch, week: ch === 'wild' ? weekNo() : 0, qa: {}, seed, diff: k, bw: CONFIG.story.levelCols[k] || 104, order, status, entered: {}, searched: {}, finished: false, hints: CONFIG.story.hints[k] || 3, x: 40, told: {},
      pv: {}, clock: {}, babyAt: {}, moved: {}, gems: {}, got: {}, clues: {}, gemN: 0, task: Learn.plan(seed), taskDone: {}, stars: {}, hideout: 0 };
    SAVE.put(); this.start();
  },
  /* bring a story saved by an older version up to date without losing rescued animals */
  migrate(S) {
    if (S.v === 4) return;
    S.v = 4; S.bw = CONFIG.story.levelCols[S.diff] || 104; S.searched = {}; S.pv = {}; S.clock = {}; S.babyAt = {}; S.moved = {}; S.gems = {}; S.got = {}; S.clues = {}; S.gemN = 0; S.task = Learn.plan(S.seed); S.taskDone = {}; S.stars = {}; S.hideout = 0;
    for (const b of S.order) { if (S.status[b] === 'stolen') { S.status[b] = 'safe'; const id = BIOMES[b].an; if (!DB.rescued.includes(id)) DB.rescued.push(id); } else if (S.status[b] !== 'safe') S.status[b] = 'lost'; if (S.status[b] === 'safe') S.taskDone[b] = 1; }
    S.reset = 1; delete S.stolen; delete S.plv; delete S.cageCleared; delete S.cageHits; delete S.freedList;
  },
  start() {
    const S = this.S = DB.story; this.migrate(S); S.ch = S.ch || 1; S.qa = S.qa || {}; this.gen();
    for (const b of S.order) { if (S.status[b] === 'netted') S.status[b] = 'lost'; if (S.status[b] === 'lost') { const sp = this.babySpot(b); if (sp) delete S.searched[sp.key]; } }
    if (S.reset) { let i = S.order.findIndex(b => !this.done(b)); if (i < 0) i = 10; S.x = i * this.BW * TS + 40; delete S.reset; }
    this.a = { x: S.x || 40, y: 0, vy: 0, onG: true, face: 1, wk: 0, searchT: 0, searchM: 1, cheerT: 0, tx: null, tspot: null, carry: null };
    this.a.x = clamp(this.a.x, 8, this.W.N * TS - 8); this.a.y = this.gy(this.a.x);
    for (const b of S.order) if (S.status[b] === 'carried') this.a.carry = BIOMES[b].an;
    this.P = null; this.cur = -1; this.crit = []; this.nearQ = null; this.qTold = {}; this.fly = null; this.reveal = null; this.endT = -1; this.fx = []; this.banner = null; this.taskT = 0; this.moveT = 0; this.hideT = -1;
    PT.length = 0; FT.length = 0; this.hud = '';
    CAM.x = clamp(this.a.x - VW * .42, 0, this.W.N * TS - VW);
    setMode(this, 'm-story');
    if (!S.told.how3) { S.told.how3 = 1; showHow('story', () => { }); }
    else if (!S.told.ch) { S.told.ch = 1; UI.toast(S.ch === 'wild' ? `🌟 WILD WEEK: ten surprise landscapes, just for this week!` : `📖 Chapter ${S.ch}: ${CHAPTERS[S.ch].name}`, 3600); }
  },
  save() { if (this.S) { this.S.x = Math.round(this.a.x); SAVE.put(); } },

  /* ----- world generation (same seed -> same world). Each landscape has three zones. ----- */
  gen() {
    const S = this.S, r = RNG(S.seed), BW = this.BW = S.bw || 104, N = 10 * BW + this.EW, h = new Int8Array(N), water = new Uint8Array(N), tb = new Uint8Array(N);
    const props = [], spots = [], plats = [], gems = [], clues = [], qs = [], ZW = Math.floor((BW - 24) / 3), zk = [], GB = this.GB;
    const cs = CONFIG.story.spots[S.diff] || CONFIG.story.spots.explorer;
    for (let i = 0; i < 10; i++) {
      const B = BIOMES[S.order[i]], c0 = i * BW, kinds = shuffle(B.water > 1 ? ['stream', 'ledges', 'stream'] : B.water ? ['stream', 'hills', 'ledges'] : ['flat', 'hills', 'ledges'], r);
      zk.push(kinds); let lv = 0, run = 0;
      for (let z = 0; z < 3; z++) {
        const z0 = c0 + 6 + z * ZW, hill = kinds[z] === 'hills';
        for (let c = z0; c < z0 + ZW; c++) { if (run <= 0 && r() < (hill ? .45 : .25)) { lv = clamp(lv + (r() < .5 ? -1 : 1) * (r() < (hill ? .4 : .2) ? 2 : 1), hill ? -4 : -2, hill ? 2 : 1); run = 2 + (r() * 4 | 0); } run--; h[c] = lv; }
      }
    }
    const sweep = () => { for (let c = 1; c < N; c++) h[c] = clamp(h[c], h[c - 1] - 2, h[c - 1] + 2); for (let c = N - 2; c >= 0; c--) h[c] = clamp(h[c], h[c + 1] - 2, h[c + 1] + 2); };
    sweep();
    const pl = [];
    for (let i = 0; i < 10; i++) for (let z = 0; z < 3; z++) {
      const z0 = i * BW + 6 + z * ZW, kind = zk[i][z];
      if (kind === 'stream') {   // a wide stream with stepping stones
        const len = 7 + (r() * 4 | 0), s = z0 + 3 + (r() * Math.max(1, ZW - len - 7) | 0), L = h[s - 1];
        for (let c = s - 1; c <= s + len; c++) h[c] = L;
        for (let c = s; c < s + len; c++) { h[c] = L + 1; water[c] = 1; }
        for (const q of [s + 2 + (r() * 2 | 0), s + len - 3]) { water[q] = 0; h[q] = L; }
      } else if (kind === 'ledges') {   // floating ledges to jump on
        const n = 2 + (r() < .5 ? 1 : 0);
        for (let j = 0; j < n; j++) pl.push({ bi: i, c: z0 + 3 + j * Math.floor((ZW - 6) / n) + (r() * 3 | 0), len: 3 + (r() * 2 | 0) });
      }
    }
    sweep();
    for (const p of pl) { let top = 99, ok = true; for (let c = p.c; c < p.c + p.len; c++) { if (water[c]) ok = false; top = Math.min(top, h[c]); } if (!ok) continue; p.y = GB + top * TS - 30; p.x0 = p.c * TS; p.x1 = (p.c + p.len) * TS; plats.push(p); }
    for (let c = 0; c < N; c++) { const i = Math.min(10, (c / BW) | 0), o = c - i * BW; let b = i; if (o < 3 && i > 0 && r() < (3 - o) / 6) b = i - 1; else if (o >= BW - 3 && i < 10 && r() < (o - BW + 4) / 6) b = i + 1; tb[c] = b; }
    for (let i = 0; i < 10; i++) {
      const bid = S.order[i], B = BIOMES[bid], c0 = i * BW, n = Math.round(lerp(cs[0], cs[1], i / 9)), cand = [];
      for (let c = c0 + 8; c < c0 + BW - 18; c++) if (!water[c] && !water[c - 1] && !water[c + 1] && h[c] === h[c - 1] && h[c] === h[c + 1]) cand.push(c);
      shuffle(cand, r); const ch = [];
      for (const gap of [9, 6, 4, 3]) for (const c of cand) { if (ch.length >= n) break; if (ch.every(q => Math.abs(q - c) >= gap)) ch.push(c); }
      const far = ch.findIndex(c => c > c0 + BW * .3); if (far > 0) [ch[0], ch[far]] = [ch[far], ch[0]];   // the baby never hides right at the start
      let hintN = S.diff === 'explorer' ? 2 : 1;
      ch.forEach((c, k) => {
        let content = 'empty';
        if (k === 0) content = 'baby'; else { const q = r(); if (q < .5) content = 'decoy:' + B.decoys[(r() * B.decoys.length) | 0]; else if (q < .72 && hintN > 0) { content = 'hint'; hintN--; } }
        spots.push({ key: bid + ':' + c, bid, bi: i, col: c, x: c * TS + 8, type: B.hides[(r() * B.hides.length) | 0], content, seed: r() * 10, shake: 0, pop: 0 });
      });
      const used = new Set(ch); let gk = 0;
      for (let c = c0 + 5; c < c0 + BW - 12; c += 5 + (r() * 5 | 0)) { const hi = r() < .35; if (used.has(c) || water[c]) continue; gems.push({ key: bid + ':g' + (gk++), bi: i, x: c * TS + 8, y: GB + h[c] * TS - (hi ? 34 : 10) }); }
      for (const p of plats) if (p.bi === i) for (let k = 0; k < p.len; k++) gems.push({ key: bid + ':g' + (gk++), bi: i, x: (p.c + k) * TS + 8, y: p.y - 10 });
      for (let z = 0; z < 3; z++) for (let k = 0; k < 2; k++) { const c = c0 + 6 + z * ZW + Math.floor(ZW * (.25 + k * .5)) + (r() * 3 | 0); if (!water[c] && !used.has(c) && !used.has(c - 1) && !used.has(c + 1)) clues.push({ key: bid + ':c' + z + k, bi: i, x: c * TS + 8, col: c, kind: (z + k) % 3 }); }
      const rq = RNG(((S.seed ^ 0x51ab) + i * 977) >>> 0); for (let z = 0; z < 3; z++) { const z0 = c0 + 6 + z * ZW; for (let tr = 0; tr < 12; tr++) { const c = z0 + 3 + ((rq() * (ZW - 6)) | 0); if (!water[c] && !water[c + 1] && !water[c - 1] && h[c] === h[c - 1] && !used.has(c) && !used.has(c - 1) && !used.has(c + 1) && !clues.some(q => Math.abs(q.col - c) < 2) && !qs.some(q => Math.abs(q.col - c) < 4)) { qs.push({ key: bid + ':q' + z, bi: i, x: c * TS + 8, col: c }); break; } } }
      let lastT = -9;
      for (let c = c0 + 1; c < c0 + BW; c++) {
        if (water[c] || ch.some(q => Math.abs(q - c) <= 1) || clues.some(q => q.col === c) || qs.some(q => Math.abs(q.col - c) <= 1)) continue;
        const o = c - c0, q = r();
        if (o < BW - 12 && o > 2 && q < .15 && c - lastT >= 3 && h[c] === h[c + 1]) { props.push({ k: 'tree', ti: (r() * 9) | 0, x: c * TS + 8, col: c, bi: i, seed: r() * 10 }); lastT = c; }
        else if (q < .36 && o < BW - 4) props.push({ k: 'decor', ti: (r() * 9) | 0, x: c * TS + 4 + (r() * 8 | 0), col: c, bi: i, seed: (r() * 10) | 0 });
      }
    }
    const e0 = 10 * BW;
    for (let c = e0 + 2; c < N - 1; c++) { const o = c - e0, q = r(); if ((o < 16 || o > 32) && q < .22 && o % 3 === 0) props.push({ k: 'tree', ti: (r() * 9) | 0, x: c * TS + 8, col: c, bi: 10, seed: r() * 10 }); else if (q < .3) props.push({ k: 'decor', ti: (r() * 9) | 0, x: c * TS + 8, col: c, bi: 10, seed: (r() * 10) | 0 }); }
    this.W = { N, h, water, tb, props, spots, plats, gems, clues, qs };
    for (const bid in S.babyAt) { const to = spots.find(s => s.key === S.babyAt[bid]), from = spots.find(s => s.bid === bid && s.content === 'baby'); if (to && from && to !== from) { from.content = to.content; to.content = 'baby'; } }
  },
  bio(i) { return i < 10 ? BIOMES[this.S.order[i]] : BIOMES.station; },
  col(x) { return clamp(Math.floor(x / TS), 0, this.W.N - 1); },
  gyc(c) { return this.GB + this.W.h[clamp(c, 0, this.W.N - 1)] * TS; },
  gy(x) { return this.gyc(this.col(x)); },
  /* the ground under Arlo's feet, counting ledges he is standing on or falling onto */
  floor(x, y) { let f = Math.min(this.gy(x - 4), this.gy(x + 4)); for (const p of this.W.plats) if (x > p.x0 - 4 && x < p.x1 + 4 && p.y < f && y <= p.y + .5) f = p.y; return f; },
  groundLine() { return VH - Math.round(Math.max(56, 100 / SC, VH * .28)); },
  done(bid) { return this.S.status[bid] === 'safe' && !!this.S.taskDone[bid]; },
  gateX(i) { return (i * this.BW + this.BW - 3) * TS; },
  tentX(i) { return (i * this.BW + this.BW - 9) * TS + 8; },
  babySpot(bid) { return this.W.spots.find(s => s.bid === bid && s.content === 'baby'); },

  /* ----- update ----- */
  update(dt) {
    const S = this.S, a = this.a, W = this.W; this.t += dt;
    if (JP.Backquote && window.GAME.debug) this.debugSkip();
    if (JP.KeyH || JP.a_hint) this.hint();
    if (JP.KeyE || JP.Enter || JP.a_search) this.searchNear();
    // walking
    let mv = (K.right ? 1 : 0) - (K.left ? 1 : 0);
    if (mv) { a.tx = null; a.tspot = null; }
    if (a.tx != null) { const dd = a.tx - a.x; if (Math.abs(dd) < 3) { a.tx = null; if (a.tspot) { const s = a.tspot; a.tspot = null; this.search(s); } } else mv = Math.sign(dd); }
    if (a.searchT > 0) { a.searchT -= dt; mv = 0; if (a.searchT <= 0 && this.reveal) { const f = this.reveal; this.reveal = null; f(); } }
    if (a.cheerT > 0) a.cheerT -= dt;
    if (mv) a.face = mv;
    const inW = W.water[this.col(a.x)] && a.onG;
    let nx = clamp(a.x + mv * (inW ? 55 : 80) * dt, 6, W.N * TS - 6);
    for (let i = 0; i < 10; i++) { const gx = this.gateX(i); if (!this.done(S.order[i]) && a.x <= gx - 5 && nx > gx - 5) { nx = gx - 5; a.tx = null; this.atGate(i); } }
    const top = Math.min(this.gy(nx - 4), this.gy(nx + 4));
    if (top < a.y - .5) {
      if (a.onG && a.y - top <= 17) a.y = top;
      else { nx = a.x; if (a.onG && mv && (a.tx != null || DB.set.diff === 'explorer')) { a.vy = -238; a.onG = false; SFX.jump(); } }
    }
    if (mv && nx !== a.x) { a.wk += dt; if (inW && rnd() < .2) part(a.x, a.y - 12, (rnd() - .5) * 30, -40, .4, '#bfe6ff'); } else a.wk = 0;
    a.x = nx;
    if (K.jump && a.onG && a.searchT <= 0) { a.vy = -238; a.onG = false; SFX.jump(); }
    const py = a.y; a.vy += 700 * dt; a.y += a.vy * dt;
    const fl = this.floor(a.x, py);
    if (a.y >= fl) { if (!a.onG && a.vy > 150) burst(a.x, fl, '#fff', 3, { sp: 25, up: 10, life: .3 }); a.y = fl; a.vy = 0; a.onG = true; } else if (a.y < fl - 1) a.onG = false;
    // camera
    const tcx = clamp(a.x - VW * (a.face > 0 ? .4 : .6), 0, W.N * TS - VW);
    CAM.x += (tcx - CAM.x) * Math.min(1, dt * 4); CAM.y = this.GB - this.groundLine();
    // which landscape are we in
    const ci = Math.min(10, Math.floor(a.x / TS / this.BW));
    if (ci !== this.cur) this.enter(ci);
    this.msgT -= dt; this.taskT -= dt;
    // nearest hiding place
    let best = null, bd = 20;
    for (const s of W.spots) { if (S.searched[s.key]) continue; const dd = Math.abs(s.x - a.x); if (dd < bd && Math.abs(this.gy(s.x) - a.y) < 64) { bd = dd; best = s; } if (s.shake > 0) s.shake -= dt; if (s.pop > 0) s.pop -= dt; }
    if (best !== this.near) { this.near = best; $('srch').classList.toggle('glow', !!best); }
    if (ci < 10) {
      const bid = S.order[ci], sp = this.babySpot(bid), st = S.status[bid];
      // treasures to collect, and clues to read
      for (const q of W.gems) if (q.bi === ci && !S.got[q.key] && Math.abs(q.x - a.x) < 10 && Math.abs(q.y - (a.y - 12)) < 17) {
        S.got[q.key] = 1; SFX.pop(); AU.tone(1319, .08, { type: 'sine', vol: .08, at: .05 }); burst(q.x, q.y, ['#7cf0ff', '#fff'], 6, { sp: 40 });
        if (!this.addGems(bid, 1)) ftext('+1', q.x, q.y - 8, '#7cf0ff', { t: .7 });
      }
      // ranger signs: an optional quick question for treasure
      let nq = null; for (const q of W.qs) if (q.bi === ci && !S.qa[q.key] && Math.abs(q.x - a.x) < 14) nq = q;
      if (nq !== this.nearQ) { this.nearQ = nq; $('srch').classList.toggle('glow', !!(nq || this.near)); if (nq && !this.qTold[nq.key]) { this.qTold[nq.key] = 1; UI.toast('📋 A Ranger Sign! Tap it or press 🔍 SEARCH for a quick question. (+3 💎)', 3200); SFX.pop(); } }
      if (st === 'lost' && sp && a.onG) for (const q of W.clues) if (q.bi === ci && !S.clues[q.key] && Math.abs(q.x - a.x) < 9) {
        S.clues[q.key] = 1; const dd = sp.x - a.x, what = ['🐾 Little paw prints!', '🔎 A tuft of soft fur!', '🍃 A nibbled snack!'][q.kind];
        UI.toast(`${what} ${Math.abs(dd) < 120 ? 'They look fresh. The baby is VERY close!' : dd > 0 ? 'The trail leads to the RIGHT ▶' : '◀ The trail leads back to the LEFT'}`, 3400);
        SFX.sparkle(); ftext(Math.abs(dd) < 120 ? 'CLOSE!' : dd > 0 ? 'CLUE ▶' : '◀ CLUE', a.x, a.y - 40, '#ffe27a', { t: 1.6 });
      }
      if (st === 'lost' && sp) {
        // the baby wiggles and cries so Arlo can find it
        this.cryT -= dt;
        if (this.cryT <= 0) {
          this.cryT = 4 + rnd() * 2; const dd = Math.abs(sp.x - a.x), d = dif();
          sp.pop = .8; sp.shake = .5;
          if (dd < d.cryR) { SFX.cry(BIOMES[bid].an, true, clamp(.2 - dd / 3500, .03, .2)); if (dd > 40 && DB.set.diff !== 'chief') ftext(sp.x > a.x ? '♪ ▶' : '◀ ♪', a.x, a.y - 38, '#ffe27a', { t: 1.4 }); }
        }
        if (DB.set.diff !== 'explorer' && rnd() < dt * .25) { const o = pick(W.spots); if (o.bi === ci && !S.searched[o.key]) o.shake = .4; }
        // a restless baby may scurry to a new hiding place
        this.moveT += dt;
        if (this.moveT > CONFIG.story.babyMoveAfter && !this.P && Math.abs(sp.x - a.x) > 130) { this.moveT = 0; if (this.canMove(bid)) this.moveBaby(bid); }
        // the Poacher is looking for the baby too
        S.clock[bid] = (S.clock[bid] || 0) + dt;
        if (!this.P && !S.pv[bid] && S.clock[bid] > (CONFIG.poacher.arriveAfter[DB.set.diff] || 90) && a.searchT <= 0 && sp.x > CAM.x + 34 && sp.x < CAM.x + VW - 34) this.spawnPoacher(bid);
      }
      if (st === 'taken' && !this.P) { this.hideT -= dt; if (this.hideT <= 0) this.hideout(bid); }
      // hints slowly recharge
      const mx = CONFIG.story.hints[DB.set.diff] || 3; if (S.hints < mx) { this.hintGlow += dt; if (this.hintGlow > 30) { this.hintGlow = 0; S.hints++; } }
      // deliver to the safe tent
      if (a.carry && ANIMALS[a.carry].biome === bid && Math.abs(a.x - this.tentX(ci)) < 14) this.deliver(ci);
    } else if (!S.finished && this.endT < 0 && a.x > (10 * this.BW + 15) * TS) { this.endT = .6; a.cheerT = 2; }
    if (this.P) this.updPoacher(dt);
    for (let i = this.crit.length - 1; i >= 0; i--) { const c = this.crit[i]; c.t += dt; c.x += c.vx * dt; c.y = c.by - Math.abs(Math.sin(c.t * 9)) * (c.fly ? 0 : 7) - (c.fly ? c.t * 26 : 0); if (c.t > 3) this.crit.splice(i, 1); }
    this.updFx(dt);
    if (this.banner) { this.banner.t -= dt; if (this.banner.t <= 0) this.banner = null; }
    if (this.endT > 0) { this.endT -= dt; if (this.endT <= 0) this.finish(); }
    this.saveT += dt; if (this.saveT > 5) { this.saveT = 0; this.save(); }
    this.updHud();
  },
  addGems(bid, n) {
    const S = this.S, a = this.a; let hint = false;
    for (let k = 0; k < n; k++) { S.gems[bid] = (S.gems[bid] || 0) + 1; S.gemN = (S.gemN || 0) + 1; DB.gems = (DB.gems || 0) + 1; if (S.gemN % CONFIG.story.gemsPerHint === 0) { S.hints++; hint = true; } }
    if (!DB.tips.gem) { DB.tips.gem = 1; UI.toast('💎 A treasure! Keep collecting them: every 5 gives a hint, and you can SPEND them at the Ranger Hut in your Sanctuary.', 5000); }
    if (hint) { ftext('+1 HINT', a.x, a.y - 40, '#ffe27a'); SFX.sparkle(); } return hint;
  },
  askSign(q) {
    const S = this.S, bid = S.order[q.bi], an = BIOMES[bid].an; this.a.tx = null;
    Learn.quiz('📋 RANGER SIGN', [Learn.quickQ(an)], () => {
      S.qa[q.key] = 1; const n = CONFIG.learn.signGems; this.addGems(bid, n); UI.close(); SFX.jingle(); ftext(`+${n} 💎`, q.x, this.gy(q.x) - 30, '#7cf0ff', { big: true }); burst(q.x, this.gy(q.x) - 20, ['#7cf0ff', '#fff', '#ffe27a'], 14, { sp: 60 }); this.nearQ = null; this.save();
    }, { intro: 'Answer the ranger question to earn treasure!' });
  },
  enter(ci) {
    const S = this.S, first = this.cur === -1; this.cur = ci; const B = this.bio(ci);
    AMB.set(B.amb); this.banner = { txt: (ci < 10 ? 'ENTERING: ' : '') + B.name.toUpperCase(), t: 2.6 };
    this.cryT = 2.5; this.moveT = 0;
    if (ci < 10) { const bid = S.order[ci]; S.refill = S.refill || {};
      if (this.done(bid)) { const now = Date.now(); if (!S.refill[bid]) S.refill[bid] = now; else if (now - S.refill[bid] > CONFIG.story.gemRefill * 1000) { S.refill[bid] = now; let n = 0; for (const k in S.got) if (k.startsWith(bid + ':')) { delete S.got[k]; n++; } if (n) setTimeout(() => UI.toast(`✨ ${n} treasures have sparkled back in ${BIOMES[bid].name}! Collect them to spend at the Ranger Hut.`, 4200), 2800); } }
      if (!S.entered[bid]) { S.entered[bid] = 1; S.hints = Math.max(S.hints, CONFIG.story.hints[DB.set.diff] || 3); this.showNote(bid); } }
    if (!first) this.save();
  },
  showNote(bid) {
    const A = ANIMALS[BIOMES[bid].an], i = this.S.order.indexOf(bid), st = STRAND[this.S.task[i][0]];
    UI.modal(`<h2>📜 LOST NOTE: ${BIOMES[bid].name.toUpperCase()}</h2><img class="pix" style="width:132px" src="${portrait(BIOMES[bid].an, true)}" alt=""><p>${A.note}</p>
    <p class="small">Look for the ${A.baby}. Follow the clues, listen for a cry and watch for something wiggling! At the gate: ${st[0]} ${st[1]}.</p>${sayBtn(A.note)}<button class="btn go" id="nb">I'LL FIND THEM!</button>`, { clear: true });
    UI.on('nb', () => UI.close());
  },
  updHud() {
    const S = this.S, B = this.bio(this.cur), k = this.cur + B.name + S.hints + JSON.stringify(S.status) + Object.keys(S.taskDone).length + '|' + S.gemN + '|' + DB.gems;
    if (k === this.hud) return; this.hud = k;
    $('bname').textContent = B.name; $('hintC').textContent = '💡 x' + S.hints; $('cageC').textContent = '💎 ' + (DB.gems || 0);
    $('prog').innerHTML = S.order.map((b, i) => `<span class="pb ${this.done(b) ? 'safe' : S.status[b] === 'safe' ? 'half' : S.status[b] === 'taken' ? 'stolen' : ''} ${i === this.cur ? 'cur' : ''}"></span>`).join('');
  },

  /* ----- the Task Gate at the end of each landscape ----- */
  atGate(i) {
    const S = this.S, st = S.status[S.order[i]];
    if (st === 'safe') { if (this.taskT <= 0 && this.a.onG) this.openTask(i); return; }
    if (this.msgT <= 0) { this.msgT = 3; UI.toast(st === 'carried' ? 'Take the baby to the orange tent first!' : '🚧 Find the lost baby first!'); SFX.nope(); }
  },
  openTask(i) {
    const S = this.S, bid = S.order[i], [s, t0] = S.task[i], t = Learn.choose(s, t0), a = this.a;
    this.taskT = 1.2; SFX.sparkle();
    Learn.run(s, t, { an: BIOMES[bid].an, gems: S.gems[bid] || 0 }, stars => {
      S.taskDone[bid] = 1; S.stars[bid] = stars; S.refill = S.refill || {}; S.refill[bid] = Date.now(); SFX.gate(); SFX.jingle(); a.cheerT = 1.5;
      burst(this.gateX(i) + 8, a.y - 20, ['#ffe27a', '#fff', '#8fe085'], 24, { sp: 90, up: 50 });
      UI.toast(i < 9 ? '🚪 The gate is open! On to the next landscape ▶' : '🚪 The gate is open! The Ranger Station is just ahead ▶', 3500); this.save();
    }, () => { this.taskT = 2.5; a.x -= 12; UI.toast('Walk back to the gate when you are ready for the task.'); });
  },

  /* ----- searching ----- */
  searchNear() { if (this.a.searchT > 0) return; if (this.nearQ && (!this.near || Math.abs(this.nearQ.x - this.a.x) < Math.abs(this.near.x - this.a.x))) { this.askSign(this.nearQ); return; } if (this.near) this.search(this.near); else { UI.toast('Stand next to a bush, rock or log, then search.'); SFX.nope(); } },
  search(s) {
    const S = this.S, a = this.a; if (S.searched[s.key] || a.searchT > 0) return;
    if (Math.abs(s.x - a.x) > 22) { a.tx = s.x; a.tspot = s; return; }
    a.searchM = a.searchT = CONFIG.story.searchTime[DB.set.diff] || .55; a.face = s.x >= a.x ? 1 : -1; s.shake = a.searchT; SFX.rustle();
    burst(s.x, this.gy(s.x) - 8, ['#6fbb48', '#fff', '#d8c56c'], 8, { sp: 45, up: 40 });
    this.reveal = () => {
      const gy = this.gy(s.x);
      if (s.content === 'baby') { if (S.status[s.bid] === 'lost') { S.searched[s.key] = 1; this.found(s); } return; }
      S.searched[s.key] = 1;
      if (s.content.startsWith('decoy:')) { const k = s.content.slice(6); this.crit.push({ k, x: s.x, by: gy, y: gy, vx: (rnd() < .5 ? -1 : 1) * 40, t: 0, fly: k === 'butterfly' || k === 'bird' }); SFX.pop(); UI.toast('🔎 ' + DECOY[k], 3200); }
      else if (s.content === 'hint') { S.hints++; SFX.sparkle(); ftext('+1 HINT', s.x, gy - 20, '#ffe27a'); UI.toast('🔦 You found a torch battery! +1 hint'); burst(s.x, gy - 10, ['#ffe27a', '#fff'], 10); }
      else { UI.toast(pick(['Nothing here. Keep looking!', 'Empty! Try another spot.', 'Not here. Look for clues on the ground!'])); SFX.nope(); }
      // searching right beside the baby can startle it into a new hiding place
      const b = this.babySpot(s.bid); if (b && S.status[s.bid] === 'lost' && !this.P && Math.abs(b.x - s.x) < 110 && this.canMove(s.bid)) this.moveBaby(s.bid);
    };
  },
  canMove(bid) { return (this.S.moved[bid] || 0) < (CONFIG.story.babyMoves[DB.set.diff] || 0); },
  moveBaby(bid) {
    const S = this.S, a = this.a, from = this.babySpot(bid); if (!from) return false;
    const opts = this.W.spots.filter(s => s.bid === bid && s !== from && !S.searched[s.key] && Math.abs(s.x - a.x) > 90 && Math.abs(s.x - from.x) > 60);
    if (!opts.length) return false; const to = pick(opts);
    from.content = to.content; to.content = 'baby'; S.babyAt[bid] = to.key; S.moved[bid] = (S.moved[bid] || 0) + 1; this.moveT = 0;
    to.shake = 1; SFX.rustle(); UI.toast(`👀 Something small scurried away to the ${to.x > a.x ? 'RIGHT ▶' : 'LEFT ◀'}`, 3000);
    ftext(to.x > a.x ? '▶▶' : '◀◀', a.x, a.y - 40, '#ffe27a', { t: 1.6 }); return true;
  },
  found(s, direct) {
    const S = this.S, id = BIOMES[s.bid].an, A = ANIMALS[id], gy = this.gy(s.x);
    SFX.cry(id, true, .2); SFX.sparkle(); burst(s.x, gy - 12, ['#ffe27a', '#fff', '#ff8ab0'], 16, { sp: 70 }); shake(2);
    DB.journal[id] = 1; this.a.cheerT = 1;
    if (this.P && (this.P.st === 'walk' || this.P.st === 'warn')) this.fleePoacher('Too late, Poacher! Arlo found the baby first!');
    const feed = () => {
      const wrong = shuffle(Object.keys(FOODS).filter(f => f !== A.food)).slice(0, 2), opts = shuffle([A.food, ...wrong]);
      const q = `${A.pro} is hungry! What do ${plu(A).toLowerCase()} like to eat?`;
      UI.modal(`<h2>CARE TIME ❤</h2><img class="pix" style="width:110px" src="${portrait(id, true)}" alt=""><p>${q}</p><div class="foods">${opts.map(f => `<div class="food" data-f="${f}"><img class="pix" src="${iconURL(f)}" alt="">${FOODS[f]}</div>`).join('')}</div><p class="small" id="fmsg">Tap the right food.</p>${sayBtn(q)}`, { clear: true });
      document.querySelectorAll('.food').forEach(el => el.onclick = () => {
        AU.init();
        if (el.dataset.f === A.food) {
          el.classList.add('good'); SFX.yes(); SFX.cry(id, true, .15);
          $('fmsg').innerHTML = `<b class="ok">Yum! ${cap1(plu(A).toLowerCase())} eat ${A.eats}.</b>`;
          S.status[s.bid] = 'carried'; this.a.carry = id; this.save();
          setTimeout(() => { UI.close(); SFX.heart(); ftext('❤', this.a.x, this.a.y - 36, '#ff5a7a', { big: true }); UI.toast(`Carry the ${A.baby} to the orange Safe Tent ▶`, 3500); }, Learn.fast ? 10 : 1100);
        } else { el.classList.add('bad'); SFX.nope(); $('fmsg').innerHTML = `<b class="no">Not ${FOODS[el.dataset.f].toLowerCase()}. Try again!</b>`; setTimeout(() => el.classList.remove('bad'), 400); }
      });
    };
    const show = () => {
      const txt = `You ${direct ? 'rescued' : 'found'} the ${A.baby}! ${A.fact} ${cap1(plu(A).toLowerCase())} live in ${A.home}.`;
      UI.modal(`<h2>YOU ${direct ? 'RESCUED' : 'FOUND'} THE ${A.baby.toUpperCase()}!</h2><img class="pix" style="width:150px" src="${portrait(id, true)}" alt=""><p>${A.fact}</p><p class="small">Real home: ${A.home}.</p>${sayBtn(txt)}<button class="btn go" id="fb">TAKE CARE OF ${A.pro === 'He' ? 'HIM' : 'HER'} ❤</button>`, { clear: true });
      UI.on('fb', feed);
    };
    if (direct) show(); else setTimeout(() => { if (MODE === Story) show(); }, 650);
  },
  hint() {
    const S = this.S, a = this.a; if (this.cur >= 10) return;
    const bid = S.order[this.cur], st = S.status[bid]; let tx, msg;
    if (st === 'lost') { if (S.hints <= 0) { UI.toast('No hints left. Collect 💎 treasures to earn more, or look for clues on the ground!'); SFX.nope(); return; } S.hints--; const sp = this.babySpot(bid); tx = sp.x; sp.pop = 3; sp.shake = 1; const dd = Math.abs(tx - a.x); msg = dd < 90 ? 'VERY HOT!' : dd < 260 ? 'WARM' : 'COLD'; }
    else if (st === 'carried') { tx = this.tentX(this.cur); msg = 'TENT ▶'; }
    else if (st === 'safe' && !S.taskDone[bid]) { tx = this.gateX(this.cur); msg = 'TASK GATE ▶'; }
    else { tx = this.gateX(this.cur) + 30; msg = 'GO RIGHT ▶'; }
    SFX.sparkle(); const dir = Math.sign(tx - a.x) || 1;
    ftext((dir < 0 ? '◀ ' : '') + msg + (dir > 0 && !msg.includes('▶') ? ' ▶' : ''), a.x, a.y - 40, msg === 'COLD' ? '#8fd0ff' : '#ffb03a', { t: 2 });
    for (let i = 0; i < 26; i++) part(a.x + dir * i * 7, a.y - 14 - Math.sin(i * .5) * 5, dir * 30, -8, .5 + i * .06, i % 2 ? '#ffe27a' : '#fff', { gr: 0, s: 2 });
  },
  deliver(ci) {
    const S = this.S, bid = S.order[ci], id = BIOMES[bid].an, A = ANIMALS[id], a = this.a;
    S.status[bid] = 'safe'; a.carry = null; a.cheerT = 1.4; if (!DB.rescued.includes(id)) DB.rescued.push(id); DB.coins += 2; ftext('+2p', this.tentX(ci), a.y - 60, '#ffd23f');
    SFX.jingle(); setTimeout(() => SFX.cry(id, true, .15), 500);
    burst(this.tentX(ci), a.y - 14, ['#ff5a7a', '#ffe27a', '#fff'], 22, { sp: 80, up: 50 });
    ftext('SAFE!', this.tentX(ci), a.y - 44, '#8fe085', { big: true, t: 1.8 });
    const st = STRAND[S.task[ci][0]];
    UI.toast(`🎉 The ${A.baby} is safe! Now walk to the glowing Task Gate ▶  (${st[0]} ${st[1]})`, 4200);
    this.save();
  },

  /* ----- the Poacher: he is searching for the baby too ----- */
  spawnPoacher(bid) {
    const S = this.S, sp = this.babySpot(bid), k = DB.set.diff, C = CONFIG.poacher; if (!sp) return;
    const fromL = sp.x - CAM.x > VW / 2, x = fromL ? CAM.x - 26 : CAM.x + VW + 26;
    S.pv[bid] = 1;
    this.P = { bid, sp, st: 'warn', t: 0, x, x0: x, y: this.gy(clamp(x, 8, this.W.N * TS - 8)), dir: fromL ? 1 : -1, speed: Math.abs(sp.x - x) / (C.walkTime[k] || 10), taps: C.taps[k] || 1, rt: C.runTaps[k] || 1, stun: 0, wk: 0, rot: 0, vx: 0, vy: 0, run: 0 };
    SFX.dun(); shake(3); UI.toast('🎯 The Poacher is looking for the baby too! TAP him to scare him away!', 3400); this.save();
  },
  updPoacher(dt) {
    const P = this.P, S = this.S, a = this.a, k = DB.set.diff, C = CONFIG.poacher, W = this.W; P.t += dt; if (P.stun > 0) P.stun -= dt;
    const lim = x => clamp(x, 8, W.N * TS - 8);
    if (P.st === 'warn') { if (P.t > 1.3) { P.st = 'walk'; P.t = 0; } }
    else if (P.st === 'walk') {
      if (S.status[P.bid] !== 'lost') { this.fleePoacher('Too late, Poacher! The baby is safe with Arlo.'); return; }
      if (P.sp.content !== 'baby') { P.sp = this.babySpot(P.bid); P.dir = Math.sign(P.sp.x - P.x) || 1; }
      if (P.stun <= 0) { P.x += P.dir * P.speed * dt; P.wk += dt; }
      P.y = this.gy(lim(P.x));
      setBar(true, '🎯 THE POACHER IS COMING! TAP HIM!', 1 - Math.abs(P.sp.x - P.x) / (Math.abs(P.sp.x - P.x0) || 1));
      if ((P.sp.x - P.x) * P.dir < 6) this.netBaby();
    }
    else if (P.st === 'grab') { if (P.t > .9) { P.st = 'run'; P.t = 0; P.dir = P.x >= a.x ? 1 : -1; UI.toast('🕸 He has the baby in his net! TAP him before he gets away!', 3000); } }
    else if (P.st === 'run') {
      P.run += dt; if (P.stun <= 0) { P.x += P.dir * (C.runSpeed[k] || 40) * dt; P.wk += dt; } P.y = this.gy(lim(P.x));
      setBar(true, '🕸 HE HAS THE BABY! TAP HIM!', P.run / C.runMax, '#ff9a2e');
      const off = P.x < CAM.x - 30 || P.x > CAM.x + VW + 30;
      if ((off && P.run > 1.2) || P.run > C.runMax || P.x < 10 || P.x > W.N * TS - 10) this.taken();
    }
    else if (P.st === 'flee') { P.rot += dt * 16; P.x += P.vx * dt; P.y += P.vy * dt; P.vy += 320 * dt; if (P.t > 1.1) this.P = null; }
  },
  netBaby() {
    const P = this.P, S = this.S; S.status[P.bid] = 'netted'; S.searched[P.sp.key] = 1; P.st = 'grab'; P.t = 0; P.sp.shake = .7;
    SFX.rustle(); SFX.laugh(); AU.noise(.3, { f: 2400, q: .6, vol: .16 }); shake(3); burst(P.sp.x, this.gy(P.sp.x) - 10, ['#6fbb48', '#fff', '#d8c56c'], 14, { sp: 60, up: 40 });
    ftext('OH NO!', P.x, P.y - 78, '#ff8a5a', { big: true }); setBar(false);
  },
  taken() {
    const P = this.P, S = this.S, id = BIOMES[P.bid].an; S.status[P.bid] = 'taken'; this.P = null; setBar(false); this.hideT = 2.4; SFX.nope();
    UI.toast(`😮 The Poacher took the ${ANIMALS[id].baby} to his Hideout! Follow his muddy footprints…`, 2400); this.save();
  },
  fleePoacher(msg) { const P = this.P; P.st = 'flee'; P.t = 0; P.vx = -P.dir * 150; P.vy = -190; setBar(false); SFX.caught(); if (msg) UI.toast(msg, 3000); },
  hitPoacher() {
    const P = this.P, S = this.S, a = this.a;
    SFX.punch(); AU.tone(240, .22, { to: 640, type: 'sine', vol: .14 }); shake(3); burst(P.x, P.y - 30, ['#fff', '#ffe27a'], 12, { sp: 80 });
    if (P.st === 'walk') {
      P.taps--;
      if (P.taps <= 0) { DB.scared++; ftext('GOT HIM!', P.x, P.y - 78, '#8fe085', { big: true }); a.cheerT = 1; this.fleePoacher('👋 You scared the Poacher away! The baby is still hiding. Keep looking!'); }
      else { P.stun = .9; P.x -= P.dir * 26; ftext('AGAIN!', P.x, P.y - 78, '#ffe27a'); }
    } else {
      P.rt--;
      if (P.rt <= 0) { const bid = P.bid; DB.scared++; this.fleePoacher(); S.status[bid] = 'lost'; a.cheerT = 1; UI.toast('🎉 He dropped the net! The baby escaped!', 2600); this.found({ bid, x: a.x }, true); }
      else { P.stun = .8; ftext('AGAIN!', P.x, P.y - 78, '#ffe27a'); }
    }
  },
  hideout(bid) {
    const S = this.S, id = BIOMES[bid].an; this.hideT = 99; AMB.set('fire');
    Learn.hideout({ an: id }, () => { S.hideout = (S.hideout || 0) + 1; DB.hideout++; addSticker('hide', '🏚', 'Hideout Hero'); if (DB.hideout >= 5) addSticker('hide5', '🔓', 'Master Code Cracker'); S.status[bid] = 'lost'; this.hideT = -1; AMB.set(this.bio(this.cur).amb); this.found({ bid, x: this.a.x }, true); this.save(); });
  },

  /* ----- the end of the trail: the Ranger Station ----- */
  finish() {
    const S = this.S; S.finished = true; const ch = S.ch || 1; DB.coins += 10;
    if (ch === 'wild') { DB.wildN = (DB.wildN || 0) + 1; addSticker('wild' + S.week, '🌟', `Wild Week ${DB.wildN}`); } else { DB.chdone[ch] = 1; addSticker('ch' + ch, ['🦍', '🦊', '🦈'][ch - 1], `Chapter ${ch}: ${CHAPTERS[ch].name}`); }
    this.save(); SFX.fanfare(); setTimeout(() => SFX.jingle(), 900);
    const nx = ch === 'wild' ? null : ch < 3 ? ch + 1 : 'wild';
    for (let i = 0; i < 120; i++) part(rnd() * VW, -rnd() * 60, (rnd() - .5) * 40, 20 + rnd() * 50, 3 + rnd() * 2, pick(['#ff5a7a', '#ffe27a', '#8fe085', '#7cc0f2', '#fff', '#b07af0']), { gr: 20, s: 2, scr: true, fade: false });
    const stars = S.order.reduce((n, b) => n + (S.stars[b] || 0), 0);
    UI.modal(`<h1>ALL SAFE!</h1><p>Brilliant rescuing, Ranger Arlo! Every baby animal is safe and sound.</p><div class="grid5">${S.order.map(b => { const id = BIOMES[b].an; return `<div class="acell"><img class="pix" src="${portrait(id, true)}" alt="">${ANIMALS[id].name}<br>${'★'.repeat(S.stars[b] || 0)}</div>`; }).join('')}</div>
    <p class="small">${ch === 'wild' ? 'Wild Week' : `Chapter ${ch} complete`}! Task stars: ${stars} / 30 &nbsp; 🪙 +10p &nbsp; 💎 Treasures: ${S.gemN || 0} &nbsp; 🏚 Hideout rescues: ${S.hideout || 0}${S.hideout ? '' : ' (the Poacher never got one!)'}</p>
    ${nx ? `<button class="btn go big" id="d5">▶ ${nx === 'wild' ? 'WILD WEEK IS OPEN!' : `CHAPTER ${nx}: ${CHAPTERS[nx].name.toUpperCase()}`}</button><br>` : ''}<button class="btn big" id="d1">🏡 BUILD THEIR HOMES</button><br><button class="btn sm" id="d4">🖼 Art Gallery</button><button class="btn sm" id="d2">Keep exploring</button><button class="btn sm" id="d3">Main menu</button>`, { clear: true, wide: true });
    UI.on('d1', () => { UI.close(); Sanct.start(); }); UI.on('d5', () => { UI.close(); Story.open(nx); }); UI.on('d2', () => UI.close()); UI.on('d3', () => { UI.close(); goMenu(); }); UI.on('d4', () => showGallery(() => this.finish()));
  },
  debugSkip() {
    const S = this.S, a = this.a;
    if (this.cur < 10) { const bid = S.order[this.cur], id = BIOMES[bid].an; S.status[bid] = 'safe'; S.taskDone[bid] = 1; a.carry = null; DB.journal[id] = 1; if (!DB.rescued.includes(id)) DB.rescued.push(id); if (this.P) { this.P = null; setBar(false); } a.x = this.gateX(this.cur) + 24; a.y = this.gy(a.x); a.vy = 0; a.tx = null; S.hints = 9; }
  },

  /* ----- taps ----- */
  tap(x, y) {
    const a = this.a, P = this.P, wx = x + CAM.x, wy = y + CAM.y;
    if (P && (P.st === 'walk' || P.st === 'run' || P.st === 'grab')) { const r = Math.max(30, 40 / SC); if (Math.abs(wx - P.x) < r && wy > P.y - Math.max(92, 100 / SC) && wy < P.y + 16) { this.hitPoacher(); return; } }
    for (const q of this.W.qs) { if (this.S.qa[q.key]) continue; const gy = this.gy(q.x); if (Math.abs(wx - q.x) < 12 && wy > gy - 34 && wy < gy + 6) { if (Math.abs(q.x - a.x) < 40) this.askSign(q); else { a.tx = q.x - 6; a.tspot = null; } return; } }
    for (const s of this.W.spots) { if (this.S.searched[s.key]) continue; const gy = this.gy(s.x); if (Math.abs(wx - s.x) < 15 && wy > gy - 30 && wy < gy + 10) { this.search(s); return; } }
    a.tx = clamp(wx, 8, this.W.N * TS - 8); a.tspot = null;
    part(wx, this.gy(wx) - 2, 0, -20, .4, '#fff', { gr: 0, s: 2 });
  },

  /* ----- ambient effects ----- */
  updFx(dt) {
    const B = this.bio(this.cur), k = B.fx, F = this.fx;
    if (F.length < 46 && rnd() < dt * 9) {
      if (k === 'snow') F.push({ x: rnd() * VW, y: -2, vx: -8 + rnd() * 6, vy: 18 + rnd() * 16, l: 12, c: '#fff', s: rnd() < .3 ? 2 : 1 });
      else if (k === 'leaves') F.push({ x: rnd() * VW, y: -2, vx: -10 + rnd() * 20, vy: 12 + rnd() * 10, l: 12, c: pick(['#4bb043', '#8fd060', '#d8c056']), s: 2, w: 1 });
      else if (k === 'dust') F.push({ x: VW + 2, y: rnd() * VH * .8, vx: -30 - rnd() * 30, vy: (rnd() - .5) * 6, l: 12, c: '#f0dca0', s: 1 });
      else if (k === 'embers') F.push({ x: rnd() * VW, y: this.groundLine() + 4, vx: (rnd() - .5) * 14, vy: -18 - rnd() * 22, l: 4 + rnd() * 3, c: pick(['#ff7a1a', '#ffc23a']), s: 1, w: 1 });
      else if (k === 'fireflies' && F.length < 16) F.push({ x: rnd() * VW, y: VH * .3 + rnd() * VH * .4, vx: (rnd() - .5) * 12, vy: (rnd() - .5) * 8, l: 3 + rnd() * 3, c: '#f6ff8a', s: 1, w: 1, bl: 1 });
      else if (k === 'butterflies' && F.length < 7) F.push({ x: rnd() * VW, y: VH * .35 + rnd() * VH * .3, vx: (rnd() - .5) * 24, vy: (rnd() - .5) * 10, l: 6, c: pick(['#ff7ab0', '#ffd23f', '#fff', '#b07af0']), s: 2, w: 1, fl: 1 });
      else if (k === 'sparkle' && F.length < 12) F.push({ x: rnd() * VW, y: this.groundLine() - 22 + rnd() * 10, vx: 0, vy: 0, l: .5 + rnd(), c: '#fff', s: 1, bl: 1 });
    }
    for (let i = F.length - 1; i >= 0; i--) { const p = F[i]; p.l -= dt; p.x += (p.vx + (p.w ? Math.sin(this.t * 3 + i) * 10 : 0)) * dt; p.y += p.vy * dt; if (p.l <= 0 || p.y > VH + 4 || p.x < -6 || p.x > VW + 6) F.splice(i, 1); }
  },

  /* ----- drawing ----- */
  h01(n) { n = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b); n ^= n >>> 13; n = Math.imul(n, 0xc2b2ae35); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; },
  skyline(seed, baseY, amp, step, col, par, cap) {
    const off = CAM.x * par, i0 = Math.floor(off / step);
    for (let i = i0 - 1; i <= i0 + Math.ceil(VW / step) + 1; i++) {
      const hgt = Math.round(amp * (.25 + .75 * this.h01(seed + i * 7))), x = Math.round(i * step - off);
      px(col, x, baseY - hgt, step, hgt + VH); if (cap && hgt > amp * .55) { px(cap, x, baseY - hgt, step, 3); px(cap, x + 2, baseY - hgt + 3, step - 4, 2); }
    }
  },
  drawFar(i, alpha) {
    const B = this.bio(i), gl = this.groundLine(), seed = hash(B.name) & 0xffff; g.globalAlpha = alpha;
    if (B.volcano) { const cx = Math.round(VW * .62 + ((i + .5) * this.BW * TS - CAM.x - VW / 2) * .12); for (let k = 0; k < 9; k++) px(k % 2 ? '#3a2430' : '#33202a', cx - 60 + k * 6, gl - 10 - k * 8, 120 - k * 12, 9 + VH); px('#ff7a1a', cx - 9, gl - 84, 18, 4); px('#ffc23a', cx - 5, gl - 85, 10, 3); px('#ff7a1a', cx - 2, gl - 80, 3, 26); px('#ff7a1a', cx + 5, gl - 80, 2, 14); g.globalAlpha = alpha * .25; px('#ff7a1a', 0, gl - 40, VW, 44); g.globalAlpha = alpha; }
    this.skyline(seed, gl - 4, 54, 26, B.far[0], .12, (B.peaks || B.name === 'Arctic') ? '#f4f8fc' : null);
    if (B.sea) { const c = B.name === 'Amazon River' ? '#3a8a8a' : '#2a7ac8'; px(c, 0, gl - 26, VW, 30); for (let k = 0; k < 8; k++) px(shade(c, .3), ((k * 61 - CAM.x * .2 + this.t * 6) % (VW + 40) + VW + 40) % (VW + 40) - 20, gl - 22 + (k % 4) * 5, 10, 1); }
    if (B.houses) {
      const step = 46, off = CAM.x * .3, i0 = Math.floor(off / step);
      for (let k = i0 - 1; k <= i0 + Math.ceil(VW / step) + 1; k++) {
        const x = Math.round(k * step - off), q = this.h01(seed + k * 13);
        if (q < .45) { const wc = ['#e8d8b8', '#d8a878', '#c8d8e0'][(q * 30 | 0) % 3]; box(x, gl - 26, 30, 26, wc); box(x - 3, gl - 34, 36, 9, '#b85a48'); box(x + 3, gl - 40, 24, 7, '#c86a58'); px('#7ac0f0', x + 5, gl - 20, 6, 6); px('#7ac0f0', x + 19, gl - 20, 6, 6); px('#7a4f2a', x + 12, gl - 12, 6, 12); px('#8a5a48', x + 22, gl - 46, 4, 8); }
        else { box(x + 8, gl - 22, 22, 14, '#4a9a3c'); box(x + 12, gl - 30, 14, 9, '#58ac48'); px('#7a4f2a', x + 17, gl - 8, 4, 8); }
        px('#d8c8a0', x, gl - 10, step, 2); px('#d8c8a0', x, gl - 5, step, 2); for (let f = 0; f < step; f += 6) px('#e8dcc0', x + f, gl - 13, 3, 13);
      }
    } else this.skyline(seed + 99, gl - 2, 28, 18, B.far[1], .28);
    g.globalAlpha = 1;
  },
  draw() {
    const S = this.S, W = this.W, a = this.a, t = this.t, gl = this.groundLine();
    const cxw = CAM.x + VW / 2, bf = cxw / TS / this.BW, i = clamp(Math.floor(bf), 0, 10), fr = bf - i;
    let j = i, bl = 0; const edge = 9 / this.BW;
    if (fr < edge && i > 0) { j = i - 1; bl = .5 - fr / edge / 2; } else if (fr > 1 - edge && i < 10) { j = i + 1; bl = .5 - (1 - fr) / edge / 2; }
    const A = this.bio(i), B = this.bio(j), top = mix(A.sky[0], B.sky[0], bl), bot = mix(A.sky[1], B.sky[1], bl), night = (A.night ? 1 - bl : 0) + (B.night && j !== i ? bl : 0);
    const bands = 10, bh = Math.ceil((gl + 8) / bands);
    for (let k = 0; k < bands; k++) px(mix(top, bot, k / (bands - 1)), 0, k * bh, VW, bh + 1);
    if (night > .3) { g.globalAlpha = night; for (let k = 0; k < 40; k++) { const sx = (k * 97 + 13) % VW, sy = (k * 53) % Math.max(20, gl - 40); if ((t * 2 + k) % 5 > .6) px('#fff', sx, sy, 1, 1); } box(VW * .78, 18, 12, 12, '#f0f4ff'); px('#c8d0e8', VW * .78 + 3, 21, 3, 3); g.globalAlpha = 1; }
    else { box(Math.round(VW * .78), 16, 14, 14, '#ffe27a'); px('#fff6c8', Math.round(VW * .78) + 2, 18, 4, 4); }
    if (A.name === 'Arctic' || B.name === 'Arctic') { g.globalAlpha = (A.name === 'Arctic' ? 1 - bl : bl) * .35; for (let x = 0; x < VW; x += 4) { const hh = 22 + Math.sin(x * .05 + t * .6) * 12 + Math.sin(x * .13 - t) * 6; px(x % 8 ? '#5affb0' : '#8a7aff', x, 14 + Math.sin(x * .03 + t * .3) * 8, 4, hh); } g.globalAlpha = 1; }
    g.globalAlpha = night > .5 ? .25 : .9;
    for (let k = 0; k < 5; k++) { const x = ((k * 97 + t * 4 - CAM.x * .06) % (VW + 70) + VW + 70) % (VW + 70) - 40, y = 14 + (k * 23) % 44; box(x, y, 26, 6, '#fff'); box(x + 5, y - 4, 14, 5, '#fff'); }
    g.globalAlpha = 1;
    this.drawFar(i, 1); if (bl > 0) this.drawFar(j, bl);
    if (A.name === 'Jungle' && bl < .3) { g.globalAlpha = .07; g.fillStyle = '#fff8c0'; for (let k = 0; k < 3; k++) { g.beginPath(); const x = VW * (.2 + k * .3) - (CAM.x * .1) % 40; g.moveTo(x, 0); g.lineTo(x + 26, 0); g.lineTo(x - 30, gl); g.lineTo(x - 70, gl); g.fill(); } g.globalAlpha = 1; }
    const c0 = Math.floor(CAM.x / TS) - 3, c1 = c0 + Math.ceil(VW / TS) + 6, wf = ((t * 2) | 0) % 2;
    const X = wx => Math.round(wx - CAM.x), Y = wy => Math.round(wy - CAM.y);
    // trees behind
    for (const p of W.props) { if (p.k !== 'tree' || p.col < c0 - 2 || p.col > c1 + 2) continue; const Bp = this.bio(p.bi); PROP[Bp.trees[p.ti % Bp.trees.length]](X(p.x), Y(this.gyc(p.col)), t, p.seed); }
    // end-of-trail scenery behind the ground line
    if (c1 > 10 * this.BW) this.drawEnd(X, Y, t);
    // ground blocks
    for (let c = Math.max(0, c0); c <= Math.min(W.N - 1, c1); c++) {
      const Bc = this.bio(W.tb[c]), x = X(c * TS), y = Y(this.gyc(c));
      g.drawImage(sideTile(Bc.top, Bc.under), x, y);
      const ut = TILES[Bc.under]; for (let yy = y + TS; yy < VH; yy += TS) g.drawImage(ut, x, yy);
      g.fillStyle = 'rgba(0,0,0,.16)'; g.fillRect(x, y + 28, TS, VH); g.fillStyle = 'rgba(0,0,0,.14)'; g.fillRect(x, y + 60, TS, VH);
      if (c > 0 && this.gyc(c - 1) > this.gyc(c)) { g.fillStyle = 'rgba(255,255,255,.14)'; g.fillRect(x, y, 1, this.gyc(c - 1) - this.gyc(c)); }
      if (c < W.N - 1 && this.gyc(c + 1) > this.gyc(c)) { g.fillStyle = 'rgba(0,0,0,.22)'; g.fillRect(x + TS - 1, y, 1, this.gyc(c + 1) - this.gyc(c)); }
    }
    for (const p of W.props) { if (p.k !== 'decor' || p.col < c0 || p.col > c1) continue; const Bp = this.bio(p.bi); PROP[Bp.decor[p.ti % Bp.decor.length]](X(p.x), Y(this.gyc(p.col)), t, p.seed); }
    // floating ledges
    for (const p of W.plats) { if (p.x1 < CAM.x - 8 || p.x0 > CAM.x + VW + 8) continue; const Bp = this.bio(p.bi), st = sideTile(Bp.top, Bp.under); for (let k = 0; k < p.len; k++) { const x = X(p.x0 + k * TS), y = Y(p.y); g.drawImage(st, 0, 0, 16, 9, x, y, 16, 9); g.fillStyle = 'rgba(0,0,0,.3)'; g.fillRect(x, y + 8, 16, 1); } g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(X(p.x0), Y(p.y) + 9, p.len * TS, 2); }
    // clues on the ground
    for (const q of W.clues) { if (q.col < c0 || q.col > c1 || S.status[S.order[q.bi]] !== 'lost') continue; const x = X(q.x), y = Y(this.gyc(q.col)), used = S.clues[q.key], c = used ? 'rgba(60,40,20,.35)' : '#5a3a1a';
      if (q.kind === 0) { for (const [dx, dy] of [[-6, -2], [-1, -4], [4, -2]]) { px(c, x + dx, y + dy, 3, 2); px(c, x + dx, y + dy - 2, 1, 1); px(c, x + dx + 2, y + dy - 2, 1, 1); } }
      else if (q.kind === 1) { px(used ? c : '#f0e8d8', x - 3, y - 4, 6, 3); px(used ? c : '#d8ccb0', x - 2, y - 6, 3, 2); px(used ? c : '#fff', x + 1, y - 5, 2, 1); }
      else { px(used ? c : '#4bb043', x - 4, y - 3, 7, 3); px(used ? c : '#8fd060', x - 3, y - 4, 3, 1); px(S.clues[q.key] ? c : '#2a1a0a', x + 1, y - 3, 2, 2); }
      if (!used && ((t * 2 + q.col) | 0) % 2) { px('#ffe27a', x - 1, y - 14, 2, 4); px('#ffe27a', x - 1, y - 9, 2, 2); } }
    // ranger signs
    for (const q of W.qs) { if (q.col < c0 || q.col > c1) continue; const x = X(q.x), y = Y(this.gyc(q.col)), done = S.qa[q.key];
      px('#7a5a34', x - 1, y - 13, 2, 13); box(x - 7, y - 23, 14, 11, done ? '#4aa343' : '#3f8fdc'); px(shade(done ? '#4aa343' : '#3f8fdc', -.3), x - 7, y - 13, 14, 1);
      if (done) { px('#fff', x - 3, y - 18, 2, 2); px('#fff', x - 1, y - 16, 2, 2); px('#fff', x + 1, y - 18, 2, 2); px('#fff', x + 3, y - 20, 2, 2); }
      else { px('#fff', x - 2, y - 21, 4, 1); px('#fff', x + 2, y - 20, 1, 2); px('#fff', x, y - 18, 2, 1); px('#fff', x, y - 17, 1, 1); px('#fff', x, y - 15, 1, 1); if (q === this.nearQ) { const bob = Math.round(Math.sin(t * 6) * 2); px('#ffe27a', x - 2, y - 31 + bob, 5, 2); px('#ffe27a', x - 1, y - 29 + bob, 3, 2); } } }
    // tents, safe babies, gates
    for (let b = 0; b < 10; b++) {
      const tx = this.tentX(b), gx = this.gateX(b); if (gx < CAM.x - 200 || tx > CAM.x + VW + 60) continue;
      const bid = S.order[b], ty = Y(this.gy(tx)); PROP.tent(X(tx), ty, t);
      if (S.status[bid] === 'carried') { const bob = Math.round(Math.sin(t * 5) * 2); px('#ffe27a', X(tx) - 1, ty - 36 + bob, 3, 6); px('#ffe27a', X(tx) - 3, ty - 31 + bob, 7, 2); px('#ffe27a', X(tx) - 1, ty - 29 + bob, 3, 2); }
      if (S.status[bid] === 'safe') { const hop = Math.abs(Math.sin(t * 3 + b)) > .9 ? -2 : 0; drawAnimal(BIOMES[bid].an, X(tx) + 20, ty + hop, { b: true, t: t + b, flip: true }); if ((t + b) % 4 < .5) px('#ff5a7a', X(tx) + 20, ty - 18 - ((t + b) % 4) * 8, 2, 2); }
      const gy = Y(this.gy(gx)), x = X(gx), open = this.done(bid), ready = S.status[bid] === 'safe' && !open;
      box(x - 5, gy - 30, 6, 30, '#8d9199'); box(x + 15, gy - 30, 6, 30, '#8d9199'); box(x - 5, gy - 38, 26, 9, '#a2a6ae'); px('#7a7e86', x - 5, gy - 18, 6, 1); px('#7a7e86', x + 15, gy - 12, 6, 1); px('#7a7e86', x + 7, gy - 38, 1, 9);
      if (open) { box(x + 3, gy - 36, 10, 6, '#4aa343'); px('#fff', x + 5, gy - 33, 2, 2); px('#fff', x + 7, gy - 32, 2, 1); px('#fff', x + 9, gy - 35, 2, 3); }
      else if (ready) { const gl2 = ((t * 3) | 0) % 2; box(x + 2, gy - 37, 12, 8, gl2 ? '#ffe27a' : '#ffc23a'); px('#7a4f1a', x + 6, gy - 35, 4, 1); px('#7a4f1a', x + 9, gy - 34, 1, 2); px('#7a4f1a', x + 7, gy - 32, 2, 1); px('#7a4f1a', x + 7, gy - 30, 2, 1); g.globalAlpha = .18 + Math.sin(t * 4) * .08; g.fillStyle = '#ffe27a'; g.fillRect(x + 1, gy - 29, 14, 29); g.globalAlpha = 1; for (let k = 0; k < 3; k++) px('#fff', x + 3 + ((t * 9 + k * 5) % 10 | 0), gy - 6 - ((t * 14 + k * 9) % 22 | 0), 1, 1); }
      else { for (let k = 0; k < 4; k++) px('#c79a5a', x + 1, gy - 26 + k * 7, 14, 3); box(x + 3, gy - 37, 10, 8, '#e5c23a'); px('#3a2a1a', x + 7, gy - 35, 2, 3); px('#3a2a1a', x + 7, gy - 31, 2, 1); }
    }
    // hiding places (the baby peeks out from behind)
    for (const s of W.spots) {
      if (s.col < c0 || s.col > c1) continue;
      const x = X(s.x), y = Y(this.gyc(s.col)), ph = PROP_H[s.type] || 12, sh = s.shake > 0 ? Math.round(Math.sin(t * 50) * 1.5) : 0, srch = S.searched[s.key];
      if (s.content === 'baby' && S.status[s.bid] === 'lost') {
        const id = BIOMES[s.bid].an, pk = (dif().peek - 1) + (s.pop > 0 ? 4 : 0), bhh = BABY_H[id];
        if (pk > 0) { g.save(); g.beginPath(); g.rect(x - 16, y - ph - 14, 32, 14); g.clip(); drawAnimal(id, x, y - ph - pk + bhh, { b: true, t }); g.restore(); }
      }
      PROP[s.type](x + sh, y, t, s.seed);
      if (srch) { px('#fff', x - 3, y - ph - 7, 2, 2); px('#fff', x - 1, y - ph - 5, 2, 2); px('#fff', x + 1, y - ph - 7, 2, 2); px('#fff', x + 3, y - ph - 9, 2, 2); }
      else if (s === this.near) { const bob = Math.round(Math.sin(t * 6) * 2); px('#fff', x - 3, y - ph - 14 + bob, 7, 2); px('#fff', x - 2, y - ph - 12 + bob, 5, 2); px('#fff', x - 1, y - ph - 10 + bob, 3, 2); px('#000', x, y - ph - 8 + bob, 1, 1); }
    }
    for (const q of W.gems) { if (S.got[q.key] || q.x < CAM.x - 8 || q.x > CAM.x + VW + 8) continue; const x = X(q.x), y = Y(q.y) + Math.round(Math.sin(t * 3 + q.x * .1) * 2); px('#7cf0ff', x - 2, y - 4, 4, 2); px('#3ac8e8', x - 4, y - 2, 8, 3); px('#1a9ac8', x - 2, y + 1, 4, 2); px('#1a9ac8', x - 1, y + 3, 2, 1); px('#fff', x - 2, y - 2, 2, 1); if (((t * 2 + q.x) | 0) % 3 === 0) px('#fff', x + 4, y - 5, 1, 1); }
    for (const c of this.crit) CRIT[c.k](X(c.x), Y(c.y), c.t);
    // Arlo
    const pose = a.searchT > 0 ? 'search' : a.cheerT > 0 ? 'cheer' : '';
    drawArlo(X(a.x), Y(a.y) - (W.water[this.col(a.x)] && a.onG ? 7 + Math.round(Math.sin(t * 4)) : 0), { flip: a.face < 0, wk: a.wk, pose, t, carry: a.carry, air: !a.onG });
    if (a.searchT > 0 && a.searchM > .6) { const fr = 1 - a.searchT / a.searchM, bx = X(a.x) - 10, by = Y(a.y) - 44; px('#000', bx - 1, by - 1, 22, 5); px('#444', bx, by, 20, 3); px('#ffe27a', bx, by, Math.round(20 * fr), 3); }
    // water over his boots
    g.globalAlpha = .78;
    for (let c = Math.max(0, c0); c <= Math.min(W.N - 1, c1); c++) if (W.water[c]) { g.drawImage(TILES['water' + wf], 0, 0, 16, 12, X(c * TS), Y(this.gyc(c)) - 12, 16, 12); }
    g.globalAlpha = 1;
    for (let c = Math.max(0, c0); c <= Math.min(W.N - 1, c1); c++) if (W.water[c]) px('#bfe6ff', X(c * TS) + ((c * 5 + (t * 3 | 0)) % 12), Y(this.gyc(c)) - 12, 4, 1);
    drawParts();
    for (const p of this.fx) { if (p.bl && ((t * 4 + p.x) | 0) % 2) continue; if (p.fl) { const f = ((t * 10 + p.x) | 0) % 2; px(p.c, p.x - 1 - f, p.y, 2, 2); px(p.c, p.x + 1 + f, p.y, 2, 2); px('#222', p.x, p.y, 1, 2); } else px(p.c, p.x, p.y, p.s, p.s); }
    const P = this.P;
    if (P) {
      const sx = X(P.x), sy = Y(P.y);
      if (P.st === 'warn' || ((P.st === 'walk' || P.st === 'run' || P.st === 'grab') && (sx < -6 || sx > VW + 6))) { if (((t * 6) | 0) % 2) { const ex = (P.st === 'warn' ? P.dir > 0 : sx < 0) ? 6 : VW - 12, ey = this.groundLine() - 44; box(ex, ey, 6, 14, '#ff5a3a'); box(ex, ey + 17, 6, 5, '#ff5a3a'); } }
      else if (P.st === 'flee') { g.save(); g.translate(sx, sy - 30); g.rotate(P.rot); g.drawImage(poacherSprite('net', 0), -30, -37, 60, 75); g.restore(); }
      else {
        const bob = P.stun > 0 ? Math.round(Math.sin(t * 60) * 2) : 0;
        g.globalAlpha = .25; px('#000', sx - 12, sy - 1, 24, 3); g.globalAlpha = 1;
        drawPoacher(sx + bob, sy, { s: 1.5, weapon: 'net', t: P.stun > 0 ? 0 : t, flip: P.dir < 0 });
        if (P.st === 'grab' || P.st === 'run') { const nx2 = sx + bob + P.dir * 16, ny2 = sy - 58; g.save(); g.beginPath(); g.rect(nx2 - 12, ny2 - 14, 24, 22); g.clip(); drawAnimal(BIOMES[P.bid].an, nx2, ny2 + 6 + Math.round(Math.sin(t * 12)), { b: true, t }); g.restore(); g.fillStyle = 'rgba(255,255,255,.5)'; for (let k = -1; k < 2; k++) { g.fillRect(nx2 + k * 5, ny2 - 12, 1, 18); g.fillRect(nx2 - 9, ny2 - 4 + k * 5, 18, 1); } }
        if (((t * 3) | 0) % 2) { const hy = sy - 86; px('#ffe27a', sx - 3, hy, 7, 2); px('#ffe27a', sx - 2, hy + 2, 5, 2); px('#ffe27a', sx - 1, hy + 4, 3, 2); }
        if (P.stun > 0) for (let k = 0; k < 3; k++) px('#ffe27a', sx + Math.round(Math.cos(t * 9 + k * 2.1) * 10), sy - 80 + Math.round(Math.sin(t * 9 + k * 2.1) * 3), 2, 2);
      }
    }
    if (night > .5) { g.fillStyle = 'rgba(10,14,50,.22)'; g.fillRect(0, 0, VW, VH); }
  },
  drawEnd(X, Y, t) {
    const e0 = 10 * this.BW, hx = X((e0 + 24) * TS), hy = Y(this.gyc(e0 + 24)); PROP.hut(hx, hy, t);
    this.S.order.map(b => BIOMES[b].an).forEach((id, k) => drawAnimal(id, hx - 70 + k * 15, Y(this.gyc(e0 + 20)) - Math.abs(Math.sin(t * 5 + k)) * 4, { b: true, t: t + k }));
  },
  overlay() {
    if (this.banner) {
      const b = this.banner, al = clamp(b.t * 2, 0, 1) * clamp((2.6 - b.t) * 4, 0, 1), s = Math.round(Math.min(18, innerWidth / (b.txt.length * 1.15)) * DPR);
      scr.globalAlpha = al; scr.textAlign = 'center'; scr.textBaseline = 'middle'; scr.font = s + "px 'Press Start 2P','Courier New',monospace";
      const X = cv.width / 2, Y = cv.height * .3; scr.fillStyle = 'rgba(0,0,0,.55)'; scr.fillRect(0, Y - s * 1.3, cv.width, s * 2.6);
      scr.fillStyle = '#000'; scr.fillText(b.txt, X + 2 * DPR, Y + 2 * DPR); scr.fillStyle = '#ffe27a'; scr.fillText(b.txt, X, Y); scr.globalAlpha = 1;
    }
  }
};

/* ---------- chapters ---------- */
function weekNo() { return Math.floor((Date.now() / 864e5 + 3) / 7); }
function chOpen(ch) { if (ch === 1) return true; if (DB.set.unlock) return true; if (ch === 'wild') return !!DB.chdone[3]; return !!DB.chdone[ch - 1]; }
function unlockedBiomes() { let a = []; for (const k of [1, 2, 3]) if (chOpen(k)) a = a.concat(CHAPTERS[k].ids); return a; }
function showChapters(back) {
  const S = DB.story, live = S && !S.finished && S.order, cur = S && (S.ch || 1);
  const safe = T => T.order.filter(b => T.status[b] === 'safe').length;
  const row = ch => { const C = ch === 'wild' ? { name: 'Wild Week', sub: 'Ten surprise landscapes from every chapter. A new trail each week!' } : CHAPTERS[ch], open = chOpen(ch), T = cur === ch ? S : DB.trails[ch], prog = T && !T.finished && T.order && (ch !== 'wild' || T.week === weekNo()) ? `▶ ${safe(T)} / 10 safe` : ch !== 'wild' && DB.chdone[ch] ? '✔ Finished' : '';
    const ids = ch === 'wild' ? [] : CHAPTERS[ch].ids.map(b => BIOMES[b].an);
    return `<button class="chap ${open ? '' : 'off'}" data-c="${ch}"><b>${ch === 'wild' ? '🌟 ' + C.name.toUpperCase() : 'CHAPTER ' + ch + ': ' + C.name}</b><span>${C.sub}</span><span class="chi">${ids.map(id => `<img class="pix ${DB.rescued.includes(id) ? '' : 'sil'}" src="${portrait(id, true)}" alt="">`).join('')}</span><i>${open ? prog || 'Start' : '🔒 Finish chapter ' + (ch === 'wild' ? 3 : ch - 1) + ' first'}</i></button>`; };
  UI.modal(`<h2>🔦 STORY ADVENTURE</h2>${live ? `<button class="btn go big" id="cc">▶ CONTINUE ${cur === 'wild' ? 'WILD WEEK' : 'CHAPTER ' + cur}</button>` : ''}<div class="chaps">${[1, 2, 3, 'wild'].map(row).join('')}</div><button class="btn sm" id="cb">Back</button>`, { wide: true, clear: true });
  UI.on('cc', () => { UI.close(); Story.start(); }); UI.on('cb', () => { UI.close(); if (back) back(); });
  $('panel').querySelectorAll('.chap').forEach(b => b.onclick = () => { AU.init(); const ch = b.dataset.c === 'wild' ? 'wild' : +b.dataset.c; if (!chOpen(ch)) { SFX.nope(); UI.toast('🔒 Finish the chapter before to open this one. (A grown-up can unlock every chapter.)'); return; } SFX.click(); UI.close(); Story.open(ch); });
}
