/* ============ VERSION 4 SANCTUARY: new areas, visitors, shop, jobs, map, the sea ============ */
const PRICES = { greens: 2, seeds: 2, fruit: 3, bugs: 3, nuts: 3, shrimp: 4, fish: 4, meat: 5, nectar: 4 };
const SEALIFE = new Set(['shark', 'seal', 'crab', 'starfish', 'turtle', 'puffin', 'otter']);
const GCOL = ['#5fa83c', '#c8b257', '#eef4fa', '#e6d08a', '#70553a', '#8b8f96', '#3d3742', '#3f8a3c', '#3f8fdc', '#5a3a20', '#c79a5a', '#8a6a32', '#7a5a78', '#a8a49c', '#c8642e', '#b8a888'];
const RELEASE_FACT = {
  shark: 'Lots of sharks live wild in the open ocean. A nursery pen keeps a pup safe until it is big enough to look after itself.',
  seal: 'Seal rescue centres look after lost or poorly pups. When the pups are strong, they go back to the sea.',
  turtle: 'Sea turtles swim thousands of miles across the ocean. One day she may come back to the beach where she hatched!'
};
const VCOLS = ['#e5342b', '#3f8fdc', '#ffd23f', '#b07af0', '#ff8ab0', '#4aa343', '#ff9a2e'];

Object.assign(Sanct, {
  /* ----- the new areas of the map ----- */
  genNew(x, y, gnd, obj, r) {
    const N = this.N, z = this.zoneAt(x, y), i = y * N + x, q = r(); let gg = G.GRASS, o = 0;
    if (z === 'wildwood') { gg = G.LEAF; o = q < .11 ? O.TREE : q < .18 ? O.BIRCH : q < .22 ? O.HAZEL : q < .26 ? O.MUSH : q < .29 ? O.OLDLOG : q < .32 ? O.BUSH : q < .35 ? O.FLOWER : 0; }
    else if (z === 'park') { o = q < .025 ? O.TREE : q < .05 ? O.FLOWER : q < .07 ? O.TALL : q < .08 ? O.BUSH : 0; if (x >= 84 && x <= 88 && y >= 40 && y <= 43) { gg = G.WATER; o = 0; } }
    else if (z === 'moor') { gg = G.HEATH; o = q < .18 ? O.HEATHER : q < .24 ? O.BOULDER : q < .3 ? O.TALL : 0; }
    else if (z === 'plains') { gg = G.DRY; o = q < .02 ? O.TREE : q < .1 ? O.TALL : 0; if (x >= 28 && x <= 31 && y >= 78 && y <= 80) { gg = G.WATER; o = 0; } }
    else if (z === 'outback') { gg = G.REDSAND; o = q < .05 ? O.TREE : q < .1 ? O.BUSH : q < .15 ? O.BOULDER : 0; }
    else if (z === 'beach') { gg = x <= 66 && y > 66 ? G.SHINGLE : G.SAND; o = q < .05 ? O.SHELLS : q < .08 ? O.BOULDER : 0; }
    else if (z === 'sea') { gg = G.WATER; o = q < .04 ? O.SEAWEED : 0; }
    gnd[i] = gg; obj[i] = o;
  },
  /* the Food Store, the Ranger Jobs board, rock pools and a sea boat */
  extras(gnd, obj) {
    const N = this.N, put = (x, y, o) => { const i = y * N + x; obj[i] = o; if (gnd[i] === G.WATER && o !== O.BOAT && o !== O.SEAWEED) gnd[i] = G.SAND; };
    put(28, 17, O.STORE); put(36, 21, O.JOBS);
    for (const [x, y] of [[66, 70], [65, 78], [67, 88], [69, 83]]) put(x, y, O.ROCKPOOL);
    obj[72 * N + 74] = O.BOAT; obj[72 * N + 73] = O.NONE;
  },
  /* an older, smaller sanctuary keeps everything and gains the new areas round the edge */
  grow64() {
    const Z = DB.sanct, N = this.N, gnd = new Uint8Array(N * N), obj = new Uint8Array(N * N), r = RNG(hash('grow' + (Z.px || 1)));
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { if (x < 64 && y < 64) { gnd[y * N + x] = Z.gnd.charCodeAt(y * 64 + x) - 65; obj[y * N + x] = Z.obj.charCodeAt(y * 64 + x) - 65; } else this.genNew(x, y, gnd, obj, r); }
    const conv = i => ((i / 64) | 0) * N + (i % 64), remap = m => { const o = {}; for (const k in m || {}) o[conv(+k)] = m[k]; return o; };
    Z.meta = remap(Z.meta); Z.port = remap(Z.port); Z.fc = remap(Z.fc); Z.plan = (Z.plan || []).map(conv);
    let s1 = '', s2 = ''; for (let i = 0; i < N * N; i++) { s1 += String.fromCharCode(65 + gnd[i]); s2 += String.fromCharCode(65 + obj[i]); } Z.gnd = s1; Z.obj = s2;
  },
  upgrade4() {
    const Z = this.Z, N = this.N; Z.v4 = 1; Z.fst = Z.fst || 0;
    const free = (x, y) => { const i = this.idx(x, y); return this.inM(x, y) && this.obj[i] === O.NONE && this.gnd[i] !== G.WATER && this.gnd[i] !== G.PIT; };
    const place = (x0, y0, o) => { for (let d = 0; d < 12; d++) for (let y = y0 - d; y <= y0 + d; y++) for (let x = x0 - d; x <= x0 + d; x++) if (this.inB(x, y) && this.zoneAt(x, y) === 'meadow' && free(x, y)) { this.obj[this.idx(x, y)] = o; return; } };
    if (!this.obj.includes(O.STORE)) place(28, 17, O.STORE); if (!this.obj.includes(O.JOBS)) place(36, 21, O.JOBS);
    for (const [x, y] of [[66, 70], [65, 78], [67, 88]]) if (this.obj[this.idx(x, y)] === O.NONE) this.obj[this.idx(x, y)] = O.ROCKPOOL;
    let boat = false; for (let i = 0; i < N * N; i++) if (this.obj[i] === O.BOAT && this.zoneAt(i % N, (i / N) | 0) === 'sea') boat = true;
    if (!boat) { this.obj[72 * N + 74] = O.BOAT; this.gnd[72 * N + 74] = G.WATER; }
    setTimeout(() => { if (MODE === this) UI.toast('🌍 Your Sanctuary is BIGGER! Tap the map in the corner to explore the new areas.', 5000); }, 1500);
  },

  /* ----- zoom and the map ----- */
  zoom(d) { window.ZOOMD = clamp((window.ZOOMD || 0) + d, -2, 2); resize(); this.hotK = ''; CAM.x = clamp(this.a.x - VW / 2, 0, this.N * TS - VW); CAM.y = clamp(this.a.y - VH / 2, 0, this.N * TS - VH); SFX.click(); },
  tileCol(i) { const gg = this.gnd[i], o = this.obj[i]; if (o === O.FENCE || o === O.GATE) return '#7a4f2a'; if (SOLID.has(o) && o !== O.STORE) return shade(GCOL[gg], -.25); return GCOL[gg]; },
  miniDraw() {
    const c = $('mini'); if (!c || MODE !== this) return; const N = this.N; if (c.width !== N) { c.width = c.height = N; this.miniImg = null; } const x = c.getContext('2d');
    if (!this.miniImg) { this.miniImg = x.createImageData(N, N); }
    const d = this.miniImg.data; for (let i = 0; i < N * N; i++) { const n = parseInt(this.tileCol(i).slice(1), 16); d[i * 4] = n >> 16; d[i * 4 + 1] = (n >> 8) & 255; d[i * 4 + 2] = n & 255; d[i * 4 + 3] = 255; }
    x.putImageData(this.miniImg, 0, 0);
    x.strokeStyle = 'rgba(255,255,255,.8)'; x.lineWidth = 1; x.strokeRect(Math.floor(CAM.x / TS) + .5, Math.floor(CAM.y / TS) + .5, Math.ceil(VW / TS), Math.ceil(VH / TS));
    x.fillStyle = '#fff'; for (const A of this.animals) x.fillRect(Math.floor(A.x / TS), Math.floor(A.y / TS), 2, 2);
    x.fillStyle = '#ff2a2a'; x.fillRect(Math.floor(this.a.x / TS) - 1, Math.floor(this.a.y / TS) - 2, 3, 3);
  },
  showMap() {
    const N = this.N, a = this.a, S = 3;
    const zs = ['meadow', 'park', 'plains', 'beach', 'sea', 'wildwood', 'moor', 'outback', 'jungle', 'forest', 'mountain', 'snow', 'volcano', 'desert', 'savanna', 'marsh', 'lake', 'cliffs', 'shore'];
    UI.modal(`<h2>🗺 SANCTUARY MAP</h2><p class="small">Arlo's Sanctuary Island! Tap a place on the map, or a button, to travel there. White edges show where you can build. The sea all round the island is for sea pens.</p><canvas id="mapc" class="mapc" width="${N * S}" height="${N * S}"></canvas>
    <div class="lbl">BUILDING AREAS</div><div>${zs.slice(0, 5).map(z => `<button class="btn sm" data-z="${z}" style="border-color:${ZCOL[z]}">${ZONES[z][0]}</button>`).join('')}</div>
    <div class="lbl">GATHERING AREAS</div><div>${zs.slice(5).map(z => `<button class="btn sm" data-z="${z}">${ZONES[z][0]}</button>`).join('')}</div><button class="btn go" id="mpx">CLOSE</button>`, { wide: true });
    const c = $('mapc'), x = c.getContext('2d');
    for (let i = 0; i < N * N; i++) { x.fillStyle = this.tileCol(i); x.fillRect((i % N) * S, ((i / N) | 0) * S, S, S); }
    x.fillStyle = 'rgba(255,255,255,.65)'; for (let y = 0; y < N; y++) for (let k = 0; k < N; k++) { const z = this.zoneAt(k, y); if (!BUILDZ.has(z)) continue; if (k + 1 < N && this.zoneAt(k + 1, y) !== z) x.fillRect(k * S + S - 1, y * S, 1, S); if (k > 0 && this.zoneAt(k - 1, y) !== z) x.fillRect(k * S, y * S, 1, S); if (y + 1 < N && this.zoneAt(k, y + 1) !== z) x.fillRect(k * S, y * S + S - 1, S, 1); if (y > 0 && this.zoneAt(k, y - 1) !== z) x.fillRect(k * S, y * S, S, 1); }
    x.font = "bold 10px 'Nunito',sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle';
    for (const z of zs) { if (!ZSPOT[z] || z === 'sea') continue; const [zx, zy] = ZSPOT[z]; x.fillStyle = 'rgba(0,0,0,.6)'; const w = x.measureText(ZONES[z][0]).width + 6; x.fillRect(zx * S - w / 2, zy * S - 7, w, 14); x.fillStyle = '#fff'; x.fillText(ZONES[z][0], zx * S, zy * S); }
    for (const h of this.Z.habs) if (h.arrived) { x.fillStyle = '#ff5a7a'; x.font = '12px serif'; x.fillText('♥', h.x * S, h.y * S); }
    x.fillStyle = '#ff2a2a'; x.beginPath(); x.arc(a.x / TS * S, a.y / TS * S, 5, 0, TAU); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 2; x.stroke();
    c.onclick = e => { const r = c.getBoundingClientRect(); this.travel(Math.floor((e.clientX - r.left) / r.width * N), Math.floor((e.clientY - r.top) / r.height * N)); };
    $('panel').querySelectorAll('[data-z]').forEach(b => b.onclick = () => { AU.init(); const sp = ZSPOT[b.dataset.z]; if (b.dataset.z === 'sea') { this.travel(105, 104); return; } this.travel(sp[0], sp[1]); });
    UI.on('mpx', () => UI.close());
  },
  travel(tx, ty) {
    const a = this.a; if (a.boat) { SFX.nope(); UI.toast('⛵ Row to the shore and climb out of the boat first.'); return; }
    let best = null, bd = 1e9; for (let d = 0; d < 20 && !best; d++) for (let y = ty - d; y <= ty + d; y++) for (let x = tx - d; x <= tx + d; x++) { if (!this.inB(x, y)) continue; const i = this.idx(x, y); if (this.gnd[i] === G.WATER || this.gnd[i] === G.PIT || SOLID.has(this.obj[i]) || this.obj[i] === O.BOAT) continue; const dd = Math.hypot(x - tx, y - ty); if (dd < bd) { bd = dd; best = [x, y]; } }
    if (!best) return; a.x = best[0] * TS + 8; a.y = best[1] * TS + 12; a.tx = null; this.tap0 = null; CAM.x = clamp(a.x - VW / 2, 0, this.N * TS - VW); CAM.y = clamp(a.y - VH / 2, 0, this.N * TS - VH);
    UI.close(); SFX.sparkle(); burst(a.x, a.y - 10, ['#fff', '#ffe27a'], 14, { sp: 50 }); this.zone = ''; this.save();
  },

  /* ----- visitors walk along paths and give coins at happy homes ----- */
  spawnVisitor() {
    const N = this.N; let best = -1, bd = 1e9;
    for (let i = 0; i < N * N; i++) { const gg = this.gnd[i]; if (gg !== G.GRAVEL && gg !== G.PLANK) continue; if (!this.inM(i % N, (i / N) | 0)) continue; const d = Math.hypot(i % N - 64, ((i / N) | 0) - 47); if (d < bd) { bd = d; best = i; } }
    if (best < 0) return false;
    const x = best % N, y = (best / N) | 0;
    this.vis.push({ x: x * TS + 8, y: y * TS + 12, cx: x, cy: y, prev: -1, tx: null, ty: null, life: 40 + rnd() * 30, out: 0, col: pick(VCOLS), c2: pick(VCOLS), kids: ri(0, 2), hat: rnd() < .4, seen: {}, wk: 0, t: rnd() * 9 });
    if (!this.Z.told.vis) { this.Z.told.vis = 1; UI.toast('👪 Visitors have come to see your animals! Happy homes earn coins from them.', 4000); }
    return true;
  },
  updVisitors(dt) {
    const N = this.N, Z = this.Z;
    this.visT -= dt; if (this.visT <= 0) { this.visT = CONFIG.sanct.visitorEvery * (.7 + rnd() * .6); if (this.vis.length < 4 && this.night() < .3) this.spawnVisitor(); }
    for (let k = this.vis.length - 1; k >= 0; k--) {
      const V = this.vis[k]; V.t += dt; V.life -= dt;
      if (V.life <= 0 || this.night() > .6) { V.out += dt; if (V.out > .8) this.vis.splice(k, 1); continue; }
      if (V.tx == null) {
        const opts = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => [V.cx + dx, V.cy + dy]).filter(([x, y]) => this.inB(x, y) && (this.gnd[this.idx(x, y)] === G.GRAVEL || this.gnd[this.idx(x, y)] === G.PLANK) && !SOLID.has(this.obj[this.idx(x, y)]));
        const fwd = opts.filter(([x, y]) => this.idx(x, y) !== V.prev), go = fwd.length ? pick(fwd) : opts[0];
        if (!go) { V.wait = 1; V.life -= 2; continue; }
        V.prev = this.idx(V.cx, V.cy); V.cx = go[0]; V.cy = go[1]; V.tx = go[0] * TS + 8; V.ty = go[1] * TS + 12; if (rnd() < .15) V.pause = 1 + rnd() * 1.5;
      }
      if (V.pause > 0) { V.pause -= dt; V.wk = 0; continue; }
      const dx = V.tx - V.x, dy = V.ty - V.y, d = Math.hypot(dx, dy), sp = 18 * dt; V.wk += dt;
      if (d <= sp) { V.x = V.tx; V.y = V.ty; V.tx = null; this.visitorLook(V); } else { V.x += dx / d * sp; V.y += dy / d * sp; }
    }
  },
  visitorLook(V) {
    const Z = this.Z;
    for (let hi = 0; hi < Z.habs.length; hi++) {
      const h = Z.habs[hi], key = h.x + ',' + h.y; if (!h.arrived || !h.ck || !h.cells || V.seen[key]) continue;
      let near = false; for (let dy = -2; dy <= 2 && !near; dy++) for (let dx = -2; dx <= 2; dx++) if (h.cells.has(this.idx(V.cx + dx, V.cy + dy))) { near = true; break; }
      if (!near) continue; V.seen[key] = 1; V.pause = 1.6;
      if (h.ck.happy >= 4) { const n = h.ck.happy >= 8 ? 2 : 1; DB.coins += n; ftext(`+${n}p`, V.x, V.y - 26, '#ffd23f'); ftext('♥', V.x + 8, V.y - 18, '#ff5a7a', { t: .9 }); AU.tone(1568, .06, { type: 'square', vol: .06 }); AU.tone(2093, .1, { type: 'square', vol: .06, at: .07 }); this.hudK = ''; }
      else if (this.t - (this.visMsg || -99) > 40) { this.visMsg = this.t; UI.toast(`👪 A visitor says: "The ${ANIMALS[h.an].name.toLowerCase()} looks a bit bored." Add decorations to make it happier!`, 3600); }
    }
  },
  drawVisitor(V, ox, oy, t) {
    const al = 1 - clamp(V.out / .8, 0, 1); if (al <= 0) return; g.globalAlpha = al;
    for (let k = 0; k <= V.kids; k++) {
      const big = k === 0, X = Math.round(V.x - ox) + (k ? (k % 2 ? -9 : 9) : 0), Y = Math.round(V.y - oy) + (k ? 2 : 0), sw = V.wk ? Math.round(Math.sin(V.wk * 12 + k) * 1.5) : 0, h = big ? 1 : 0;
      g.fillStyle = 'rgba(0,0,0,.2)'; g.fillRect(X - 4, Y - 1, 8, 2);
      px('#3a3a4a', X - 2 + sw, Y - 4 - h * 2, 2, 4 + h * 2); px('#3a3a4a', X + 1 - sw, Y - 4 - h * 2, 2, 4 + h * 2);
      box(X - 3, Y - 10 - h * 4, 7, 6 + h * 2, k ? V.c2 : V.col);
      box(X - 2, Y - 15 - h * 5, 5, 5, '#f2c79a'); px('#16161c', X + 1, Y - 13 - h * 5, 1, 1);
      if (big && V.hat) px('#6a4a2a', X - 3, Y - 16 - h * 5, 7, 2); else px(k ? '#8a5a2a' : '#3a2a1a', X - 2, Y - 16 - h * 5, 5, 2);
    }
    g.globalAlpha = 1;
  },

  /* ----- Ranger Jobs: sums about the sanctuary, for coins ----- */
  jobsReady() { const J = this.Z.jobs; return !J || !J.done || this.jobT > CONFIG.sanct.jobsEvery; },
  makeJobs() {
    const Z = this.Z, lv = lvl(), W = Z.inv.wood || 0, homes = Z.habs.filter(h => h.arrived), H = homes.length, an = homes.length ? pick(homes).an : pick(AIDS), A = ANIMALS[an];
    const jobs = [
      () => { const w = W > 0 && W <= [6, 12, 20][lv] ? W : ri(2, [5, 9, 14][lv]), m = [3, 6, 6][lv]; return { t: '🪵 Wood', q: `You have ${w} wood. You chop a tree and get ${m} more. How much wood now?`, a: w + m }; },
      () => { const n = clamp(H || 2, 2, [3, 5, 8][lv]); return { t: '🍽 Meals', q: `Each animal eats 2 meals a day. How many meals for ${n} animals?`, a: n * 2, top: '🍽'.repeat(n * 2) }; },
      () => { const a = ri(1, [4, 6, 9][lv]), b = ri(1, [4, 6, 9][lv]); return { t: '🐘 Water', q: `An elephant calf drinks ${a} buckets in the morning and ${b} at night. How many buckets is that?`, a: a + b, top: '🪣'.repeat(a) + ' ' + '🪣'.repeat(b) }; },
      () => { const m = pick([2, 2, 3]), e = ri(1, [3, 4, 6][lv]); return { t: '🐟 Fish', q: `Share ${m * e} fish fairly between ${m} sea animals. How many fish each?`, a: e, top: '🐟'.repeat(m * e) }; },
      () => { const need = ri(6, [10, 14, 20][lv]), have = ri(1, need - 1); return { t: '🚧 Fences', q: `A new pen needs ${need} fence pieces. You have ${have}. How many more do you need?`, a: need - have }; },
      () => { const a = pick([1, 2, 5]), b = pick([1, 2, lv ? 5 : 2]); return { t: '🪙 Visitors', q: `One visitor gave ${a}p. Another gave ${b}p. How much did they give altogether?`, a: a + b, top: coinsH([a, b]) }; },
      () => { const w = ri(2, [3, 4, 5][lv]), h = ri(2, [3, 3, 5][lv]); return { t: '📏 Room', q: `A pen is ${w} tiles wide and ${h} tiles long. How many tiles of room inside?`, a: w * h, top: `<div class="lgrid" style="grid-template-columns:repeat(${w},18px)">${'<i></i>'.repeat(w * h)}</div>` }; },
    ];
    const pickJ = shuffle(jobs.slice(0, 7 - (lv === 0 ? 1 : 0))).slice(0, 3).map(f => f());
    return pickJ;
  },
  showJobs() {
    const Z = this.Z; if (!Z.jobs || (Z.jobs.done && this.jobT > CONFIG.sanct.jobsEvery)) { Z.jobs = { list: this.makeJobs(), done: false }; this.jobT = 0; }
    const J = Z.jobs;
    if (J.done) { UI.modal(`<h2>📋 RANGER JOBS</h2><p>All of today's jobs are done. Brilliant work, Ranger! New jobs will be pinned up tomorrow.</p><p class="small">🪙 You have ${DB.coins}p.</p><button class="btn go" id="jx">OK</button>`); UI.on('jx', () => UI.close()); return; }
    UI.modal(`<h2>📋 RANGER JOBS</h2><p>Help run the Sanctuary! Finish all three jobs to earn <b>6p</b>.</p><div class="list">${J.list.map(j => `<div class="li"><b>${j.t}</b><span>${j.q}</span></div>`).join('')}</div><button class="btn go" id="jgo">DO THE JOBS</button><button class="btn sm" id="jx">Later</button>`, { wide: true });
    UI.on('jx', () => UI.close());
    UI.on('jgo', () => Learn.quiz('📋 RANGER JOBS', J.list.map(j => ({ q: j.q, opts: numOpts(j.a, 0, Math.max(12, j.a + 4)), top: j.top ? (j.top[0] === '<' ? j.top : `<div class="lem2">${j.top}</div>`) : '', say: j.q, right: `Yes! ${j.a}. Job done!` })), () => {
      J.done = true; DB.coins += 6; this.hudK = ''; SFX.fanfare(); this.save();
      UI.modal(`<h1>🪙 +6p</h1><p>Every job is done! The Sanctuary is running beautifully.</p><p class="small">You have ${DB.coins}p. Spend them at the 🏪 Food Store.</p><button class="btn go" id="jx">OK</button>`); UI.on('jx', () => UI.close());
    }));
  },

  /* ----- the Food Store: pay with coins, counting out the exact amount ----- */
  showStore() {
    const Z = this.Z;
    UI.modal(`<h2>🏪 THE FOOD STORE</h2><p>You have <b>${DB.coins}p</b>. Each bag has 3 portions of food.</p><div class="foods">${Object.keys(PRICES).map(k => `<div class="food ${DB.coins >= PRICES[k] ? '' : 'dim'}" data-f="${k}"><img class="pix" src="${iconURL(k)}" alt="">${FOODS[k]}<br><span class="coin c1">${PRICES[k]}p</span></div>`).join('')}</div><p class="small">Earn coins from visitors (lay a 🛤 path), Ranger Jobs, and rescuing babies in the Story.</p><button class="btn go" id="sx">CLOSE</button>`, { wide: true });
    UI.on('sx', () => UI.close());
    $('panel').querySelectorAll('[data-f]').forEach(el => el.onclick = () => { AU.init(); const k = el.dataset.f; if (DB.coins < PRICES[k]) { SFX.nope(); UI.toast(`You need ${PRICES[k]}p but you have ${DB.coins}p. That is ${PRICES[k] - DB.coins}p more.`); return; } SFX.click(); this.payFor(k); });
  },
  payFor(k) {
    const Z = this.Z, price = PRICES[k], mx = [2, 5, 10][lvl()]; let tray = [];
    const draw = () => {
      const sum = tray.reduce((s, v) => s + v, 0);
      UI.modal(`<h2>🏪 PAY ${price}p</h2><img class="pix lpic sm" src="${iconURL(k)}" alt=""><p class="lq">${FOODS[k]} costs <b>${price}p</b>. Tap coins to pay exactly ${price}p.</p><div class="coins tray">${tray.map(v => coinH(v)).join('') || '<i class="small">Tap a coin below</i>'}</div><p class="lbig">${sum}p</p>
      <div class="coins">${COINV.filter(v => v <= mx).map(v => `<button class="lcoin" data-v="${v}">${coinH(v, 'big')}</button>`).join('')}</div><p class="lmsg" id="lmsg">&nbsp;</p><button class="btn sm" id="pu">↩ Take back</button><button class="btn go" id="pp">PAY</button><button class="btn sm" id="px">Back</button>`, { wide: true });
      $('panel').querySelectorAll('.lcoin').forEach(b => b.onclick = () => { AU.init(); tray.push(+b.dataset.v); SFX.pop(); say(String(tray.reduce((s, v) => s + v, 0)) + ' p'); draw(); });
      UI.on('pu', () => { tray.pop(); draw(); }); UI.on('px', () => this.showStore());
      UI.on('pp', () => {
        const s = tray.reduce((q, v) => q + v, 0), m = $('lmsg');
        if (s !== price) { SFX.nope(); m.className = 'lmsg no'; m.textContent = s > price ? `That is ${s}p. Too much! Take a coin back.` : `That is ${s}p. You need ${price - s}p more.`; return; }
        DB.coins -= price; Z.inv[k] = (Z.inv[k] || 0) + 3; this.hotK = ''; this.hudK = ''; SFX.yes(); SFX.jingle(); this.save();
        UI.modal(`<h2>THANK YOU!</h2><img class="pix lpic sm" src="${iconURL(k)}" alt=""><p>You bought 3 portions of ${FOODS[k].toLowerCase()}. They are in your 🎒 bag.</p><p class="small">${tray.join(' + ')} = ${price}p. You have ${DB.coins}p left.</p><button class="btn go" id="tk">SHOP MORE</button><button class="btn sm" id="tx">Done</button>`);
        UI.on('tk', () => this.showStore()); UI.on('tx', () => UI.close());
      });
    };
    draw();
  },

  /* ----- peeking into a den ----- */
  peek(A) {
    const N = ANIMALS[A.an];
    UI.modal(`<h2>🔦 PEEK INSIDE</h2><canvas id="pkc" class="pkc" width="160" height="96"></canvas><p>Shh! ${A.h.nick || 'The ' + N.name.toLowerCase()} is fast asleep.</p><p class="small">${cap1(plu(N).toLowerCase())} are <b>nocturnal</b>. That means they sleep in the day and wake up at night.</p>${sayBtn(`Shh! The ${N.name} is fast asleep. ${plu(N)} are nocturnal. They sleep in the day and wake up at night.`)}<button class="btn go" id="pkx">TIPTOE AWAY</button>`);
    const x = $('pkc').getContext('2d'); x.imageSmoothingEnabled = false;
    withCtx(x, () => {
      for (let k = 0; k < 8; k++) px(mix('#4a3a2a', '#1a140e', k / 7), 0, k * 12, 160, 12);
      for (let k = 0; k < 14; k++) box((k * 37) % 150, (k * 23) % 60, 14, 9, k % 2 ? '#5a4a3a' : '#3a2e22');
      box(0, 76, 160, 20, '#6a5030'); for (let k = 0; k < 30; k++) px('#d8b860', 30 + (k * 7) % 100, 70 + (k * 3) % 8, 5, 1);
      g.save(); g.translate(80, 80); g.scale(2, 2); EYES_SHUT = true; try { drawAnimal(A.an, 0, 0, { b: !A.h.grown, t: 2.15 }); } finally { EYES_SHUT = false; } g.restore();
      for (let k = 0; k < 3; k++) { const zx = 104 + k * 10, zy = 34 - k * 10, s = 4 + k * 2; px('#fff', zx, zy, s, 1); px('#fff', zx + s - 2, zy + 1, 1, 1); px('#fff', zx + 1, zy + 2, 1, 1); px('#fff', zx, zy + 3, s, 1); }
    });
    $('panel').querySelectorAll('[data-say]').forEach(b => b.onclick = () => say(b.dataset.say));
    UI.on('pkx', () => UI.close()); say('Shh!');
  },

  /* ----- Look Below: an underwater view of the sea ----- */
  underScene(o) {
    const W = 960, H = 180, c = $('uw'), x = c.getContext('2d'), Z = this.Z; x.imageSmoothingEnabled = false;
    const life = Z.habs.filter(h => h.arrived && SEALIFE.has(h.an)).map((h, k) => ({ h, an: h.an, x: 120 + k * 150 + rnd() * 60, y: { shark: 148, crab: 158, starfish: 150, seal: 90, turtle: 100, puffin: 50, otter: 70 }[h.an] || 100, vx: (rnd() < .5 ? -1 : 1) * ({ shark: 8, seal: 22, turtle: 12, puffin: 26, otter: 20, crab: 5, starfish: 0 }[h.an] || 10), sc: h.an === 'shark' && h.grown ? 3 : 2 }));
    if (o.release) { const L = life.find(q => q.h === o.release); if (L) { L.x = 300; L.vx = 10; } }
    const fish = []; for (let s = 0; s < 4; s++) for (let k = 0; k < 7; k++) fish.push({ x: s * 260 + 40 + (k % 4) * 9, y: 40 + s * 22 + ((k / 4) | 0) * 7, c: ['#ffd23f', '#ff8a5a', '#7cd0ff', '#b07af0'][s], v: 14 + s * 4 });
    const bub = []; let ox = o.release ? 140 : 0, t = 0, drag = null, last = performance.now(), labels = true, done = false;
    const st = { life, setLabels: v => { labels = v; }, go: () => { const L = life.find(q => q.h === o.release); if (L) { L.vx = 110; L.leaving = true; } }, stop: () => { done = true; } };
    const draw = () => {
      for (let k = 0; k < 12; k++) { x.fillStyle = mix('#3aa0e8', '#0a2a5a', k / 11); x.fillRect(0, k * 15, 320, 16); }
      x.globalAlpha = .08; x.fillStyle = '#fff'; for (let k = 0; k < 5; k++) { const rx = ((k * 211 - ox * .3 + t * 6) % 420 + 420) % 420 - 60; x.beginPath(); x.moveTo(rx, 0); x.lineTo(rx + 24, 0); x.lineTo(rx - 20, H); x.lineTo(rx - 50, H); x.fill(); } x.globalAlpha = 1;
      x.fillStyle = '#bfe6ff'; for (let k = 0; k < 40; k++) x.fillRect(((k * 23 - ox * .9 + t * 8) % 340 + 340) % 340 - 10, 1 + (k % 3), 6, 1);
      withCtx(x, () => {
        for (let k = 0; k < 16; k++) { const hh = 20 + Story.h01(k * 13) * 30, fx = Math.round(k * 64 - ox * .5); px('#164a7a', fx, 150 - hh, 64, hh + 10); }
        for (let i = 0; i < 20; i++) { const sx = i * 48 - Math.round(ox); if (sx < -60 || sx > 330) continue; px('#d8c08a', sx, 152, 48, 28); px('#c8ac70', sx + 6, 158 + (i % 3) * 5, 20, 1); px('#e8d4a0', sx + 26, 164 - (i % 2) * 4, 14, 1); }
        const L = (txt, wx, wy) => { if (!labels) return; const X = Math.round(wx - ox); if (X < -40 || X > 360) return; x.font = "8px 'Press Start 2P',monospace"; x.textAlign = 'center'; x.fillStyle = 'rgba(0,0,0,.55)'; const w = x.measureText(txt).width + 6; x.fillRect(X - w / 2, wy - 7, w, 12); x.fillStyle = '#ffe27a'; x.fillText(txt, X, wy + 2); };
        for (const rx of [80, 330, 560, 820]) { const X = Math.round(rx - ox); if (X > -50 && X < 370) { box(X - 22, 136, 44, 18, '#5a6068'); box(X - 12, 126, 26, 12, '#6a7078'); box(X + 8, 140, 18, 14, '#4a5058'); px('#7a8088', X - 10, 128, 12, 2); } }
        for (const sx of [180, 440, 680, 900]) { const X = Math.round(sx - ox); if (X > -30 && X < 350) for (let k = 0; k < 6; k++) { const hh = 22 + (k % 3) * 9; for (let j = 0; j < hh; j += 3) px(k % 2 ? '#3a8a3a' : '#2a6a2a', X + k * 5 + Math.round(Math.sin(t * 1.6 + j * .15 + k) * (j / 10)), 152 - j, 3, 3); } }
        for (const cx of [250, 740]) { const X = Math.round(cx - ox); if (X > -30 && X < 350) { box(X - 14, 140, 10, 12, '#ff8a9a'); box(X - 2, 134, 8, 18, '#ffb03a'); box(X + 8, 142, 10, 10, '#b07af0'); px('#ffd23f', X - 1, 132, 3, 3); } }
        L('ROCKS', 80, 120); L('SEAWEED', 440, 116); L('CORAL', 250, 126); L('SAND', 560, 172); L('ROCKS', 820, 120); L('SEAWEED', 900, 116);
        for (const f of fish) { const X = Math.round(f.x - ox), Y = Math.round(f.y + Math.sin(t * 2 + f.x) * 3); if (X < -6 || X > 326) continue; px(f.c, X, Y, 5, 3); px(f.c, X - 2, Y - 1, 2, 5); px('#111', X + 3, Y, 1, 1); }
        for (const q of life) { const X = Math.round(q.x - ox), Y = Math.round(q.y + (q.an === 'crab' || q.an === 'starfish' ? 0 : Math.sin(t * 1.3 + q.x * .01) * 4)); if (X < -60 || X > 380) continue; g.save(); g.translate(X, Y); g.scale(q.sc, q.sc); drawAnimal(q.an, 0, 0, { b: !q.h.grown, t: t + q.x, wk: q.vx ? t : 0, flip: q.vx < 0 }); g.restore(); if (labels && q.h.nick) L(q.h.nick, q.x, Y - 14 * q.sc - 8); }
        for (const b of bub) px('rgba(220,240,255,.8)', Math.round(b.x - ox), Math.round(b.y), b.s, b.s);
      });
      if (!life.length) { x.font = "8px 'Press Start 2P',monospace"; x.textAlign = 'center'; x.fillStyle = 'rgba(0,0,0,.5)'; x.fillRect(20, 70, 280, 34); x.fillStyle = '#fff'; x.fillText('Nobody lives in your sea yet.', 160, 84); x.fillText('Build a BIG net pen for a nurse shark!', 160, 97); }
    };
    const tick = now => {
      if (done || !document.getElementById('uw')) return; const dt = Math.min(.05, (now - last) / 1000); last = now; t += dt;
      for (const f of fish) { f.x += f.v * dt; if (f.x > W + 40) f.x = -40; }
      for (const q of life) { q.x += q.vx * dt; if (!q.leaving && (q.x < 40 || q.x > W - 40)) q.vx = -q.vx; if (q.an === 'shark' && !q.leaving && rnd() < dt * .3) q.vx = rnd() < .5 ? 0 : (rnd() < .5 ? -8 : 8); }
      if (rnd() < dt * 4) bub.push({ x: ox + rnd() * 320, y: H, s: rnd() < .3 ? 2 : 1 }); for (let i = bub.length - 1; i >= 0; i--) { bub[i].y -= 20 * dt; bub[i].x += Math.sin(t * 3 + i) * .2; if (bub[i].y < 0) bub.splice(i, 1); }
      if (o.follow) { const L = life.find(q => q.h === o.release); if (L) ox = clamp(L.x - 160, 0, W - 320); if (L && L.x > W + 80 && o.gone) { o.gone(); o.gone = null; } }
      draw(); requestAnimationFrame(tick);
    };
    c.onpointerdown = e => { e.preventDefault(); drag = { x: e.clientX, ox, moved: 0 }; try { c.setPointerCapture(e.pointerId); } catch (_) { } };
    c.onpointermove = e => { if (!drag) return; const r = c.getBoundingClientRect(), d = (e.clientX - drag.x) / r.width * 320; drag.moved = Math.max(drag.moved, Math.abs(d)); ox = clamp(drag.ox - d, 0, W - 320); };
    c.onpointerup = e => { if (drag && drag.moved < 4 && o.tapAnimal) { const r = c.getBoundingClientRect(), wx = (e.clientX - r.left) / r.width * 320 + ox, wy = (e.clientY - r.top) / r.height * H; const q = life.find(q => Math.abs(q.x - wx) < 14 * q.sc && wy > q.y - 16 * q.sc && wy < q.y + 4); if (q) o.tapAnimal(q); } drag = null; };
    requestAnimationFrame(tick); return st;
  },
  lookBelow() {
    const a = this.a;
    UI.modal(`<h2>🤿 LOOK BELOW</h2><canvas id="uw" class="uwc" width="320" height="180"></canvas><p class="lmsg" id="lmsg">Drag to look around. Tap an animal to learn about it!</p><button class="btn sm" id="ulab">🏷 Labels: ON</button><button class="btn sm" id="usay">🔊 Read to me</button><button class="btn go" id="ux">⬆ BACK UP</button>`, { wide: true });
    let lab = true, msg = 'Under the sea! Drag to look around. Tap an animal to learn about it.';
    const st = this.underScene({ tapAnimal: q => { const A = ANIMALS[q.an]; msg = `${q.h.nick ? q.h.nick + ' the ' + A.name.toLowerCase() : 'The ' + A.name.toLowerCase()}! ${A.fact}`; $('lmsg').textContent = msg; say(msg); SFX.cry(q.an, !q.h.grown, .12); } });
    UI.on('ulab', () => { lab = !lab; st.setLabels(lab); $('ulab').textContent = `🏷 Labels: ${lab ? 'ON' : 'OFF'}`; });
    UI.on('usay', () => say(msg)); UI.on('ux', () => { st.stop(); UI.close(); });
    AU.noise(.8, { f: 600, q: .5, vol: .1, attack: .3 }); if (!this.Z.told.look) { this.Z.told.look = 1; addSticker('look', '🤿', 'Deep Sea Explorer'); }
  },
  /* ----- Release Day: a grown sea animal goes back to the wild ----- */
  release(h) {
    const A = ANIMALS[h.an];
    UI.modal(`<h2>🌊 RELEASE DAY</h2><canvas id="uw" class="uwc" width="320" height="180"></canvas><p>${h.nick || 'The ' + A.name.toLowerCase()} is grown up, healthy and strong. It is time to go back to the wild!</p><button class="btn go" id="rgo">🚪 OPEN THE GATE</button><button class="btn sm" id="rno">Not yet</button>`, { wide: true });
    const o = { release: h, tapAnimal: null };
    const st = this.underScene(o);
    UI.on('rno', () => { st.stop(); this.showHab(h); });
    UI.on('rgo', () => {
      $('rgo').style.display = 'none'; $('rno').style.display = 'none'; SFX.gate(); SFX.fanfare(); say(`Goodbye, ${h.nick || A.name}! Swim free!`);
      o.follow = true; o.gone = () => {
        st.stop(); DB.released[h.an] = (DB.released[h.an] || 0) + 1; DB.coins += 5; addSticker('rel_' + h.an, A.em || '🌊', `Released a ${A.name.toLowerCase()}`);
        h.grown = false; h.age = 0; h.fedOnce = false; h.nick = ''; this.animals = this.animals.filter(q => q.h !== h); this.spawnAnimal(this.Z.habs.indexOf(h)); this.save();
        const fact = RELEASE_FACT[h.an] || 'Rescue centres care for animals until they are strong enough to go back to the wild.';
        UI.modal(`<h1>SWIM FREE!</h1><p>${fact}</p><p class="small">🪙 +5p. And look: a new baby ${A.baby} has arrived at the nursery. It needs you now!</p>${sayBtn(fact)}<button class="btn go" id="rx">❤ OK</button>`, { clear: true });
        $('panel').querySelectorAll('[data-say]').forEach(b => b.onclick = () => say(b.dataset.say)); UI.on('rx', () => UI.close());
      };
      st.go();
    });
  }
});
