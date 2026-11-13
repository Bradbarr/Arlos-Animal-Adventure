/* ============ VERSION 5: the eclipse story, rescue questions, sign first, quick supplies ============ */

/* ---------- 1. THE OPENING STORY: a solar eclipse scatters the babies ---------- */
const INTRO_LINES = [
  [0, 'It was a sunny day at the Ranger Station. All the baby animals were playing with Ranger Arlo.'],
  [4.5, 'Then something strange happened. The Moon slid in front of the Sun. It was a SOLAR ECLIPSE!'],
  [9, 'The day went dark. The baby animals had never seen anything like it. They got scared!'],
  [12, 'They ran away to hide, far across the land.'],
  [16, 'When the Sun came back, every baby was lost. Ranger Arlo, can you find them all?']
];
function showIntro(ids, done) {
  UI.modal(`<h2>🌑 THE DAY THE SUN WENT DARK</h2><canvas id="inc" class="uwc" width="320" height="180"></canvas><p class="lq" id="incap">&nbsp;</p><p class="small" id="infact" style="visibility:hidden">A solar eclipse happens when the Moon passes between the Sun and the Earth. Never look straight at the Sun!</p><button class="btn sm" id="inskip">Skip ⏭</button><button class="btn go" id="ingo" style="visibility:hidden">🔦 START THE RESCUE!</button>`, { wide: true, clear: true });
  const c = $('inc'), x = c.getContext('2d'); x.imageSmoothingEnabled = false;
  const kids = ids.slice(0, 10).map((id, k) => { const ang = k / Math.min(10, ids.length) * TAU; return { id, hx: 160 + Math.cos(ang) * 92, hy: 150 + Math.sin(ang) * 14, dir: k % 2 ? 1 : -1, ph: k * .7 }; });
  let t = 0, line = -1, last = performance.now(), fin = false;
  const end = () => { if (fin) return; fin = true; UI.close(); try { speechSynthesis.cancel(); } catch (e) { } if (done) done(); };
  const tick = now => {
    if (fin || !document.getElementById('inc')) return; const dt = Math.min(.05, (now - last) / 1000); last = now; t += dt;
    const L = INTRO_LINES.reduce((a, q, i) => t >= q[0] ? i : a, 0);
    if (L !== line) { line = L; $('incap').textContent = INTRO_LINES[L][1]; if (READ.on()) say(INTRO_LINES[L][1]);
      if (L === 1) { AU.tone(220, 1.6, { type: 'sine', to: 110, vol: .1 }); } if (L === 2) { for (let k = 0; k < 4; k++) SFX.cry(kids[k % kids.length].id, true, .1); } if (L === 3) SFX.nope();
      if (L === 4) { $('infact').style.visibility = 'visible'; $('ingo').style.visibility = 'visible'; SFX.jingle(); } }
    // how dark is it? the Moon covers the Sun between 5 and 15 seconds
    const mx = 258 + (t < 4.5 ? 46 : t < 9 ? 46 - (t - 4.5) / 4.5 * 46 : t < 14.5 ? 0 : -Math.min(46, (t - 14.5) / 2.5 * 46)), dark = clamp(1 - Math.abs(mx - 258) / 46, 0, 1);
    withCtx(x, () => {
      for (let k = 0; k < 12; k++) px(mix(mix('#62b8f4', '#e4f6ff', k / 11), mix('#0a0e2a', '#2a2a4a', k / 11), dark * .9), 0, k * 12, 320, 12);
      if (dark > .5) for (let k = 0; k < 24; k++) { g.globalAlpha = (dark - .5) * 2; px('#fff', (k * 97) % 320, (k * 37) % 110, 1, 1); g.globalAlpha = 1; }
      g.fillStyle = dark > .9 ? '#fff6c8' : '#ffd23f'; g.beginPath(); g.arc(258, 34, 16 + (dark > .9 ? 4 : 0), 0, TAU); g.fill();
      if (dark > .9) { g.globalAlpha = .4; g.fillStyle = '#fff'; g.beginPath(); g.arc(258, 34, 26, 0, TAU); g.fill(); g.globalAlpha = 1; }
      g.fillStyle = mix('#c8ccd4', '#1a1a2a', dark); g.beginPath(); g.arc(mx, 34, 16, 0, TAU); g.fill();
      for (let k = 0; k < 6; k++) box(Math.round((k * 61 + t * 4) % 360 - 30), 70 - (k % 3) * 8, 34, 10, mix('#7ab860', '#1a2a24', dark * .8));
      px(mix('#5fa83c', '#1a3020', dark * .85), 0, 140, 320, 40); px(mix('#4a8a3a', '#14261a', dark * .85), 0, 140, 320, 2);
      // the Ranger Station hut
      box(130, 100, 60, 40, mix('#c08a4a', '#3a2a1a', dark * .8)); px(mix('#a03a2a', '#2a1010', dark * .8), 124, 92, 72, 10); box(152, 116, 16, 24, '#3a2410');
      for (const q of kids) {
        let X = q.hx, Y = q.hy, wk = 0, flip = q.dir < 0;
        if (t < 9) { Y -= Math.abs(Math.sin(t * 4 + q.ph)) * 4; wk = Math.sin(t * 3 + q.ph) > .3 ? t : 0; }
        else if (t < 12) { X += Math.sin(t * 40 + q.ph) * 1.5; }
        else { const r = (t - 12) * 70; X += q.dir * r; wk = t; flip = q.dir < 0; }
        if (X < -30 || X > 350) continue;
        drawAnimal(q.id, Math.round(X), Math.round(Y), { b: true, t: t + q.ph, wk, flip });
        if (t >= 9 && t < 12.5) { px('#e5342b', Math.round(X) - 1, Math.round(Y) - 26, 2, 6); px('#e5342b', Math.round(X) - 1, Math.round(Y) - 18, 2, 2); }
      }
      drawArlo(160, 152, { dir: t >= 9 && t < 16 ? 'front' : 'side', pose: t < 4.5 ? 'cheer' : '', t, flip: false });
      if (dark > .05) { g.globalAlpha = dark * .35; px('#000018', 0, 0, 320, 180); g.globalAlpha = 1; }
    });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  UI.on('inskip', end); UI.on('ingo', end);
}
const _newGame5 = Story.newGame.bind(Story);
Story.newGame = function (ch) {
  _newGame5(ch);
  const S = this.S; if (Learn.fast || window.GAME && GAME.noIntro) return;
  S.told.how3 = 0;
  showIntro(S.order.map(b => BIOMES[b].an), () => { if (!S.told.how3) { S.told.how3 = 1; showHow('story', () => { }); } this.save(); });
};

/* ---------- 2. SAVING THE BABY: three questions at the Safe Tent open the gate ---------- */
const RESCUE_KINDS = { A: ['maths', 'coins', 'time'], B: ['sound', 'nature', 'sound'], F: ['nature', 'season', 'nature'], C: ['maths', 'nature', 'sound'], D: ['nature', 'season', 'maths'], E: ['sound', 'maths', 'nature'] };
Story.deliver = function (ci) {
  const S = this.S, bid = S.order[ci], id = BIOMES[bid].an, A = ANIMALS[id], a = this.a, s = S.task[ci][0];
  if (this.rescuing) return; this.rescuing = true; a.tx = null;
  const qs = shuffle(RESCUE_KINDS[s] || RESCUE_KINDS.C).map(k => Learn.quickQ(id, k));
  Learn.quiz(`🏕 SAVE THE ${A.baby.toUpperCase()}!`, qs, miss => {
    this.rescuing = false; UI.close();
    const stars = miss === 0 ? 3 : miss <= 2 ? 2 : 1;
    S.status[bid] = 'safe'; a.carry = null; a.cheerT = 1.6; if (!DB.rescued.includes(id)) DB.rescued.push(id); DB.coins += 2; DB.learn[s] = (DB.learn[s] || 0) + 1;
    S.taskDone[bid] = 1; S.stars[bid] = stars; S.refill = S.refill || {}; S.refill[bid] = Date.now();
    SFX.jingle(); SFX.gate(); setTimeout(() => SFX.cry(id, true, .15), 500);
    burst(this.tentX(ci), a.y - 14, ['#ff5a7a', '#ffe27a', '#fff'], 26, { sp: 80, up: 50 });
    ftext('SAFE!', this.tentX(ci), a.y - 44, '#8fe085', { big: true, t: 1.8 }); ftext('+2p ' + '★'.repeat(stars), this.tentX(ci), a.y - 64, '#ffd23f');
    UI.toast(ci < 9 ? `🎉 The ${A.baby} is safe! The gate is open. On to the next landscape ▶` : `🎉 The ${A.baby} is safe! The Ranger Station is just ahead ▶`, 4200);
    this.save();
  }, { intro: `Answer 3 questions to keep the ${A.baby} safe in the tent!`, cancel: () => { this.rescuing = false; a.x -= 16; UI.toast(`Come back to the tent when you are ready to save the ${A.baby}.`); } });
};
const _atGate5 = Story.atGate.bind(Story);
Story.atGate = function (i) {
  const S = this.S, bid = S.order[i];
  if (S.status[bid] === 'safe' && !S.taskDone[bid]) { S.taskDone[bid] = 1; this.save(); return; }   // older trails: a saved baby always opens the gate now
  _atGate5(i);
};

/* ---------- 3. SANCTUARY: start with a sign, and make it before planting it ---------- */
Object.assign(Sanct, {
  pickAnimal(tx, ty) {
    const Z = this.Z, free = AIDS.filter(id => !Z.habs.some(h => h.an === id));
    const giveBack = () => { this.obj[this.idx(tx, ty)] = O.NONE; Z.inv.sign = (Z.inv.sign || 0) + 1; this.hotK = ''; };
    if (!free.length) { UI.toast('Every animal already has a sign!'); giveBack(); return; }
    free.sort((a, b) => (DB.rescued.includes(b) ? 1 : 0) - (DB.rescued.includes(a) ? 1 : 0));
    UI.modal(`<h2>🪧 WHO WILL LIVE HERE?</h2><p class="small">Choose an animal. Then make its sign: paint it, spell its name and give it a nickname. ❤ = rescued by Arlo.${this.zoneAt(tx, ty) === 'sea' ? ' This sign floats on the sea: perfect for a nurse shark!' : ''}</p><div class="grid5">${free.map(id => `<div class="acell" data-id="${id}"><img class="pix" src="${portrait(id, true)}" alt="">${ANIMALS[id].name}${DB.rescued.includes(id) ? '<span class="tag">❤</span>' : ''}</div>`).join('')}</div><button class="btn sm" id="pc">Cancel</button>`, { wide: true });
    document.querySelectorAll('.acell').forEach(c => c.onclick = () => { AU.init(); SFX.yes(); this.signWizard({ an: c.dataset.id, x: tx, y: ty, arrived: false }, giveBack); });
    UI.on('pc', () => { giveBack(); UI.close(); });
  },
  /* the three sign jobs, one after another; the sign is planted when all three are done */
  signWizard(h, giveBack) {
    const Z = this.Z, A = ANIMALS[h.an];
    const steps = () => `<div class="sgs"><span class="${h.art ? 'ok' : ''}">${h.art ? '✔' : '1'} 🎨 Paint</span><span class="${h.spelt ? 'ok' : ''}">${h.spelt ? '✔' : '2'} 🔤 Spell</span><span class="${h.nick ? 'ok' : ''}">${h.nick ? '✔' : '3'} 🏷 Name</span></div>`;
    const cancel = () => { giveBack(); UI.close(); UI.toast('The sign went back in your bag.'); };
    const paint = () => {
      UI.modal(`<h2>🪧 MAKE THE ${A.name.toUpperCase()} SIGN</h2>${steps()}<p class="lq">Step 1: Paint the ${A.name.toLowerCase()} on the sign!</p><div id="spd"></div><button class="btn go" id="spok">NEXT ▶</button><button class="btn sm" id="spno">Cancel</button>`, { wide: true });
      say(`Step 1. Paint the ${A.name} on the sign!`);
      const P = Learn.pad($('spd'), { w: 160, h: 120, bg: (x, W, H) => { x.fillStyle = '#f4e4b8'; x.fillRect(0, 0, W, H); x.imageSmoothingEnabled = false; x.globalAlpha = .13; x.drawImage(Learn.sprite(h.an, false), W / 2 - 66, H / 2 - 51, 132, 102); x.globalAlpha = 1; } });
      UI.on('spok', () => { if (!P.ops.length) { SFX.nope(); UI.toast('Paint something first! You can trace the faint picture.'); return; } const c = document.createElement('canvas'); c.width = 64; c.height = 48; c.getContext('2d').drawImage(P.canvas, 0, 0, 64, 48); h.art = c.toDataURL('image/jpeg', .8); Learn.saveArt(P.data(), `My sign for the ${A.name.toLowerCase()}`); SFX.sparkle(); spell(); });
      UI.on('spno', cancel);
    };
    const spell = () => {
      const w = (A.sw || A.name).toUpperCase();
      UI.modal(`<h2>🪧 MAKE THE ${A.name.toUpperCase()} SIGN</h2>${steps()}<img class="pix lpic sm" src="${portrait(h.an, true)}" alt=""><p class="lq">Step 2: Tap the letters to spell the name.</p><div id="ssp"></div><p class="lmsg" id="lmsg">&nbsp;</p><button class="btn sm" id="sshint">💡 Hint</button><button class="btn sm" data-say="${w.toLowerCase()}">🔊 Say the word</button><button class="btn sm" id="ssno">Cancel</button>`, { wide: true });
      say(`Step 2. Spell ${w.toLowerCase()}.`);
      const sp = Learn.spell($('ssp'), w, { extra: [0, 2, 3][lvl()], ghost: lvl() === 0, miss: () => Learn.msg(pick(TRY), 'no') }, () => { h.spelt = true; Learn.msg(`${w}!`, 'ok'); setTimeout(name, Learn.fast ? 10 : 900); });
      UI.on('sshint', () => sp.hint()); UI.on('ssno', cancel);
    };
    const name = () => {
      say(`Step 3. Give your ${A.baby} a name!`);
      Learn.typeName(`🪧 STEP 3: NAME YOUR ${A.baby.toUpperCase()}`, '', 8, nm => {
        if (nm == null) { cancel(); return; }
        if (!nm.trim()) { SFX.nope(); UI.toast('Every animal needs a name!'); name(); return; }
        h.nick = nm.trim(); plant();
      });
    };
    const plant = () => {
      Z.habs.push(h); this.evalHab(h); this.save(); SFX.fanfare(); burst(h.x * TS + 8, h.y * TS + 4, ['#ffe27a', '#fff', '#8fe085'], 20, { sp: 60, up: 40 });
      UI.modal(`<h2>🪧 SIGN PLANTED!</h2><img class="pix" style="width:140px;border:4px solid #7a5a34" src="${h.art}" alt=""><p class="lq"><b>${h.nick} the ${A.name}</b></p><p>Now build ${h.nick}'s home around the sign: a fence loop with a gate, and everything on the list.</p><button class="btn go" id="sgok">SHOW ME THE LIST</button>`, { clear: true });
      say(`Sign planted! Now build ${h.nick}'s home around the sign.`);
      UI.on('sgok', () => this.showHab(h));
      if (!Z.told.signDone) { Z.told.signDone = 1; Z.tool = 5; this.fmode = 'pen'; this.hotK = ''; }
    };
    paint();
  },

  /* ---------- 4. QUICK SUPPLIES: spend 💎 to skip the long gathering ---------- */
  quickPlan(h) {
    const Z = this.Z, out = []; this.evalHab(h);
    const itemFor = os => os.map(o => Object.keys(ITEM).find(k => ITEM[k].obj === o && !ITEM[k].water)).find(Boolean);
    for (const q of REQ[h.an]) {
      const row = h.ck.list.find(r => r.l === (q[0] === 'g' ? q[3] : q[0] === 'o' ? q[3] : q[0] === 'w' ? q[2] : null));
      if (q[0] === 'g' && row && !row.ok) { const n = row.need - row.have; out.push({ t: `${n} ${ITEM[GBLOCK[q[1]]].n.toLowerCase()}s`, cost: Math.ceil(n / 2), go: () => { Z.inv[GBLOCK[q[1]]] = (Z.inv[GBLOCK[q[1]]] || 0) + n; } }); }
      if (q[0] === 'o' && row && !row.ok) { const n = row.need - row.have, k = itemFor(q[1]); if (k) out.push({ t: `${n} × ${ITEM[k].n.toLowerCase()}`, cost: n * 2, go: () => { Z.inv[k] = (Z.inv[k] || 0) + n; } }); }
      if (q[0] === 'w' && row && !row.ok && h.closed && h.cells) { const n = row.need - row.have; out.push({ t: `dig and fill ${n} water tiles inside the pen`, cost: Math.ceil(n / 2), go: () => { let k = 0; const cells = [...h.cells].sort((p, q2) => Math.hypot(q2 % this.N - h.x, (q2 / this.N | 0) - h.y) - Math.hypot(p % this.N - h.x, (p / this.N | 0) - h.y)); for (const c of cells) { if (k >= n) break; if (this.obj[c] === O.NONE && this.gnd[c] !== G.WATER) { this.gnd[c] = G.WATER; k++; burst((c % this.N) * TS + 8, (c / this.N | 0) * TS + 8, ['#3f8fdc', '#bfe6ff'], 4, { sp: 30 }); } } } }); }
    }
    const tr = REQ[h.an].some(q => q[0] === 't'), trRow = h.ck.list.find(r => /trough/i.test(r.l));
    if (tr && trRow && !trRow.ok) out.push({ t: 'a water trough and 3 buckets of water', cost: 2, go: () => { Z.inv.trough = (Z.inv.trough || 0) + 1; Z.water = Math.max(Z.water, 3); } });
    const f = REQ[h.an].find(q => q[0] === 'f'), fRow = h.ck.list.find(r => /food|bowl/i.test(r.l));
    if (f && fRow && !fRow.ok) out.push({ t: `a bowl and 3 portions of ${FOODS[f[1]].toLowerCase()}`, cost: 2, go: () => { Z.inv.bowl = (Z.inv.bowl || 0) + 1; Z.inv[f[1]] = (Z.inv[f[1]] || 0) + 3; } });
    const fRow2 = h.ck.list.find(r => /fence/i.test(r.l)); if (fRow2 && !fRow2.ok && this.fenceStock() < 12) out.push({ t: '12 fence pieces', cost: 3, go: () => { Z.inv.fence = (Z.inv.fence || 0) + 12; } });
    return out;
  },
  quickSupply(h) {
    const list = this.quickPlan(h), cost = list.reduce((s, q) => s + q.cost, 0), have = DB.gems || 0;
    if (!list.length) { UI.toast(h.closed ? 'This home has everything it needs from the shop. Place the things in your bag!' : 'Close the fence loop first, then Quick Supplies can help.'); return; }
    UI.modal(`<h2>⚡ QUICK SUPPLIES</h2><p>Skip the long gathering! For <b>${cost} 💎</b> you get:</p><div class="list">${list.map(q => `<div class="li"><b>${q.t}</b><i>${q.cost} 💎</i></div>`).join('')}</div><p class="small">Things go into your 🎒 bag, ready to place. Water is dug and filled for you. You have ${have} 💎.</p>
      ${have >= cost ? `<button class="btn go" id="qsy">BUY FOR ${cost} 💎</button>` : `<p class="no">You need ${cost - have} more 💎. Find treasures in the Story landscapes!</p>`}<button class="btn sm" id="qsn">Back</button>`, { wide: true });
    UI.on('qsn', () => this.showHab(h));
    UI.on('qsy', () => { DB.gems = have - cost; for (const q of list) q.go(); this.hotK = ''; this.hudK = ''; this.evalT = 0; SFX.jingle(); this.save(); this.evalAll(); UI.toast(`⚡ Supplies delivered! ${have} − ${cost} = ${DB.gems} 💎 left. Now place them inside the pen.`, 4200); this.showHab(h); });
  }
});
const _showHab5 = Sanct.showHab.bind(Sanct);
Sanct.showHab = function (h) {
  _showHab5(h); if (!h || h.arrived) return;
  const ok = $('hb'); if (ok && !$('hqs')) { ok.insertAdjacentHTML('beforebegin', `<button class="btn" id="hqs">⚡ Quick supplies (💎)</button><br>`); UI.on('hqs', () => this.quickSupply(h)); }
};
/* the HELP BOARD: a blue notice board by the Ranger Station that explains how to build a home */
O.HELP = 53; SOLID.add(O.HELP);
const HELP_STEPS = [
  ['🪧', 'Plant a sign', 'Open your 🎒 BAG, tap SIGN, then press USE on the ground. Choose the animal who will live there.'],
  ['🎨', 'Make the sign', 'Paint the animal, spell its name and give it a nickname. Then the sign goes in.'],
  ['🚧', 'Build a fence', 'Pick the FENCE tool, choose PEN and drag a box around the sign. Every fence loop needs a GATE.'],
  ['⛏', 'Change the ground', 'Some animals need sand, mud, snow or other ground. Dig blocks with the SHOVEL, then place them inside the fence.'],
  ['🏠', 'Add a den and plants', 'Make shelters, caves, nest boxes and more in your BAG, then place them inside.'],
  ['💧', 'Water and food', 'Dig a hole and pour water in with the BUCKET, or fill a TROUGH. Put the right food in a FOOD BOWL.'],
  ['🎉', 'Your animal arrives!', 'When every line on the home list has a ✔, the animal moves in. Tap the sign any time to see the list.']
];
Sanct.showHelp = function () {
  const Z = this.Z; Z.told.help = 1; this.save();
  const rows = HELP_STEPS.map(([i, h, t], n) => `<div class="step"><b>${n + 1}. ${i} ${h}</b><span>${t}</span></div>`).join('');
  const txt = 'How to build an animal home. ' + HELP_STEPS.map(([, h, t], n) => `Step ${n + 1}. ${h}. ${t}`).join(' ');
  UI.modal(`<h2>❓ HOW TO BUILD AN ANIMAL HOME</h2><div class="steps">${rows}</div><p class="small">⚡ Short of things? Tap a sign and use <b>Quick Supplies</b> to buy what is missing with 💎 treasures.</p>${sayBtn(txt)}<button class="btn go" id="hlpok">GOT IT!</button>`, { wide: true });
  UI.on('hlpok', () => UI.close());
};
Sanct.placeHelp = function () {
  const old = this.obj.indexOf(O.HELP); if (old >= 0) { const ox = old % this.N, oy = (old / this.N) | 0; if (Math.abs(ox - 64) <= 14 && Math.abs(oy - 49) <= 14) return; this.obj[old] = O.NONE; }
  const free = (x, y) => { const i = this.idx(x, y); return this.inB(x, y) && this.obj[i] === O.NONE && this.gnd[i] !== G.WATER && this.gnd[i] !== G.PIT && this.zoneAt(x, y) === 'meadow' && !this.Z.habs.some(h => Math.abs(h.x - x) < 2 && Math.abs(h.y - y) < 2); };
  for (let d = 0; d < 14; d++) for (let y = 49 - d; y <= 49 + d; y++) for (let x = 64 - d; x <= 64 + d; x++) if (free(x, y)) { this.obj[this.idx(x, y)] = O.HELP; return; }
};
const _drawObj5 = Sanct.drawObj.bind(Sanct);
Sanct.drawObj = function (o, x, y, tx, ty, t) {
  if (o !== O.HELP) return _drawObj5(o, x, y, tx, ty, t);
  px('#5a4026', x + 2, y + 4, 2, 11); px('#5a4026', x + 12, y + 4, 2, 11); box(x - 1, y - 8, 18, 14, '#3f7fd6'); px('#2a5aa0', x - 1, y + 5, 18, 1);
  px('#fff', x + 5, y - 6, 6, 2); px('#fff', x + 9, y - 4, 2, 3); px('#fff', x + 7, y - 2, 3, 2); px('#fff', x + 7, y + 1, 2, 2);
  if (!this.Z.told.help) { const bb = Math.round(Math.sin(t * 6) * 2); px('#ffd23f', x + 13, y - 12 + bb, 4, 4); px('#000', x + 14, y - 11 + bb, 2, 2); }
};
const _act5 = Sanct.act.bind(Sanct);
Sanct.act = function (tx, ty) {
  if (this.inB(tx, ty) && this.obj[this.idx(tx, ty)] === O.HELP && !(this.a.useT > 0)) { this.a.useT = .3; this.showHelp(); return; }
  return _act5(tx, ty);
};
const _bag5 = Sanct.showBag && Sanct.showBag.bind(Sanct);
if (_bag5) Sanct.showBag = function () { _bag5(); const m = $('bmp'); if (m && !$('bhl')) { m.insertAdjacentHTML('afterend', '<button class="btn sm" id="bhl">❓ How to build</button>'); UI.on('bhl', () => this.showHelp()); } };
const _updTip5 = Sanct.updTip.bind(Sanct);
Sanct.updTip = function () {
  const Z = this.Z; if (this.helpN !== this.obj) { this.helpN = this.obj; this.placeHelp(); }
  if (!Z.habs.length) { const t = '❓ New to building? Tap the blue HELP BOARD by the Ranger Station, or open your 🎒 BAG and tap ❓ How to build.'; if ($('tipT').textContent !== t) $('tipT').textContent = t; return; }
  _updTip5();
};
/* more generous: two blocks per dig, and a starter pack for everyone */
const _start5 = Sanct.start.bind(Sanct);
Sanct.start = function () {
  _start5(); const Z = this.Z;
  if (!Z.v5) { Z.v5 = 1; for (const [k, n] of [['wood', 20], ['fence', 12], ['sign', 2], ['bowl', 2]]) Z.inv[k] = (Z.inv[k] || 0) + n; this.hotK = ''; if (Z.habs.length) setTimeout(() => { if (MODE === this) UI.toast('🎁 Starter pack: +20 wood, +12 fences, 2 signs and 2 bowls. And try ⚡ Quick Supplies on any home!', 5000); }, 3000); }
  if (!Z.told.help && !Z.habs.length) setTimeout(() => { if (MODE === this && !UI.open) this.showHelp(); }, 1500);
};
const _gain5 = Sanct.gain.bind(Sanct);
Sanct.gain = function (k, n, tx, ty) { if (k && k.startsWith('b_') && n === 1) n = 2; return _gain5(k, n, tx, ty); };
