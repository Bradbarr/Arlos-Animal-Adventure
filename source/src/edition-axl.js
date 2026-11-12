/* ============ AXL'S EDITION: blonde hair, and a birthday party ============ */
window.RANGER_HAIR = '#f2d36b';
const BDAY = { m: 10, d: 13, born: 2017 };   // 13 November
function birthdayToday() {
  const n = new Date(), y = n.getFullYear();
  if (n.getMonth() === BDAY.m && n.getDate() === BDAY.d) return y - BDAY.born;
  if (y === 2026 && n.getMonth() === 10 && n.getDate() === 12) return y - BDAY.born;   // a preview the day before
  return 0;
}
/* celebration horns: a brass fanfare and party blowers (no song) */
function brass(f, d, at, vol) {
  const c = AU.c; if (!c || AU.muted) return;
  try {
    const t = c.currentTime + at, o1 = c.createOscillator(), o2 = c.createOscillator(), fl = c.createBiquadFilter(), gn = c.createGain();
    o1.type = 'sawtooth'; o2.type = 'sawtooth'; o1.frequency.setValueAtTime(f, t); o2.frequency.setValueAtTime(f * 1.006, t);
    fl.type = 'lowpass'; fl.frequency.setValueAtTime(f * 1.5, t); fl.frequency.linearRampToValueAtTime(f * 6, t + .06); fl.frequency.linearRampToValueAtTime(f * 3.5, t + d); fl.Q.value = 2;
    gn.gain.setValueAtTime(.0001, t); gn.gain.linearRampToValueAtTime(vol || .09, t + .04); gn.gain.setValueAtTime(vol || .09, t + d * .8); gn.gain.exponentialRampToValueAtTime(.0001, t + d);
    o1.connect(fl); o2.connect(fl); fl.connect(gn); gn.connect(AU.m); o1.start(t); o2.start(t); o1.stop(t + d + .05); o2.stop(t + d + .05);
  } catch (e) { }
}
function partyHorn(at) { AU.tone(380, .5, { type: 'square', to: 760, vol: .07, at, vib: 25, vibRate: 22 }); AU.noise(.45, { f: 2400, q: 3, vol: .05, at }); }
function birthdaySong() {
  const G4 = 392, C5 = 523, E5 = 659, G5 = 784, C6 = 1047, F5 = 698, A5 = 880;
  // ta-ta-ta TAAA, ta-ta-ta TAAAA!
  const fan = [[G4, .14], [G4, .14], [G4, .14], [C5, .5], [G4, .14], [C5, .14], [E5, .14], [G5, .7], [F5, .14], [A5, .14], [G5, .14], [C6, 1.2]];
  let at = .05; for (const [f, d] of fan) { brass(f, d * .95, at, .09); brass(f / 2, d * .95, at, .05); at += d; }
  brass(C5 / 2, 1.2, at - 1.2, .06); brass(E5 / 2, 1.2, at - 1.2, .05);
  for (let k = 0; k < 4; k++) partyHorn(at + .1 + k * .35);
  for (let k = 0; k < 8; k++) AU.noise(.08, { f: 4000 + k * 300, q: 2, vol: .06, at: at + .2 + k * .12 });   // confetti poppers
}
const ord = n => n + (n % 10 === 1 && n % 100 !== 11 ? 'st' : n % 10 === 2 && n % 100 !== 12 ? 'nd' : n % 10 === 3 && n % 100 !== 13 ? 'rd' : 'th');
function showBirthday(age) {
  const yr = new Date().getFullYear(), gift = DB.bday !== yr;
  UI.modal(`<div class="bday"><canvas id="bdc" width="320" height="200"></canvas>
    <h1 class="bdt">HAPPY ${ord(age).toUpperCase()} BIRTHDAY<br>AXL!</h1><p class="bda">❤ love from Uncle Brad ❤</p>
    <p>All the animals on Sanctuary Island have come to celebrate with you, Ranger Axl!</p>
    ${gift ? `<p class="small">🎁 Birthday presents: <b>9 💎 treasures</b>, <b>9p</b> and a <b>Birthday Star</b> sticker!</p>` : '<p class="small">🎁 Your birthday presents are in your bag and sticker book.</p>'}
    <button class="btn sm" id="bsing">🎺 Play the fanfare again</button><button class="btn go big" id="bgo">🎉 LET'S PLAY!</button></div>`, { wide: true, clear: true });
  if (gift) { DB.bday = yr; DB.gems = (DB.gems || 0) + 9; DB.coins = (DB.coins || 0) + 9; if (!DB.stickers.some(s => s.id === 'bday' + yr)) DB.stickers.push({ id: 'bday' + yr, em: '🎂', label: `Birthday Star ${yr}` }); SAVE.put(); }
  const c = $('bdc'), x = c.getContext('2d'); x.imageSmoothingEnabled = false;
  const conf = []; for (let k = 0; k < 70; k++) conf.push({ x: Math.random() * 320, y: Math.random() * -200, v: 20 + Math.random() * 40, c: ['#e5342b', '#ffd23f', '#3f8fdc', '#4aa343', '#ff8ab0', '#b07af0'][k % 6], w: Math.random() * 6 });
  const balloons = [[30, '#e5342b'], [60, '#3f8fdc'], [262, '#ffd23f'], [292, '#ff8ab0']];
  const PARTY = ['elephant', 'fox', 'kangaroo', 'puffin', 'lion'], HOMES = [[56, 1], [236, 0], [22, 1], [270, 0], [302, 0]];
  let t = 0, last = performance.now();
  const tick = now => {
    if (!document.getElementById('bdc')) return; const dt = Math.min(.05, (now - last) / 1000); last = now; t += dt;
    withCtx(x, () => {
      for (let k = 0; k < 10; k++) px(mix('#7ac0f0', '#ffe0f0', k / 9), 0, k * 20, 320, 20);
      px('#5fa83c', 0, 168, 320, 32); px('#4a8a3a', 0, 168, 320, 2);
      for (const [bx, col] of balloons) { const by = 40 + Math.sin(t * 1.5 + bx) * 5; px('#fff', bx, by + 18, 1, 40); box(bx - 8, by - 4, 16, 20, col); px(shade(col, .4), bx - 5, by, 4, 5); px(col, bx - 1, by + 16, 3, 2); }
      // the cake with candles
      const cx = 166, cy = 168; box(cx - 44, cy - 28, 88, 28, '#f4c8d8'); box(cx - 44, cy - 28, 88, 6, '#fff'); for (let k = 0; k < 8; k++) px('#fff', cx - 41 + k * 11, cy - 22, 5, 5); px('#e5342b', cx - 30, cy - 12, 60, 3);
      box(cx - 32, cy - 48, 64, 20, '#ffe0ea'); box(cx - 32, cy - 48, 64, 5, '#fff'); px('#e5342b', cx - 27, cy - 39, 4, 4); px('#3f8fdc', cx - 2, cy - 39, 4, 4); px('#e5342b', cx + 23, cy - 39, 4, 4);
      for (let k = 0; k < age; k++) { const kx = cx - 28 + Math.round(k * 54 / Math.max(1, age - 1)); px(['#3f8fdc', '#ffd23f', '#e5342b', '#4aa343'][k % 4], kx, cy - 60, 3, 12); const fl = Math.round(Math.sin(t * 12 + k)); px('#ffb02e', kx + fl, cy - 66, 3, 5); px('#fff6a0', kx + 1 + fl, cy - 64, 1, 2); }
      // Axl the ranger in a party hat, and friends, drawn big
      const hop = -Math.abs(Math.round(Math.sin(t * 10) * 3));
      g.save(); g.translate(96, 170); g.scale(2, 2); drawArlo(0, 0, { dir: 'side', pose: 'cheer', t });
      px('#ff8ab0', -3, -31 + hop, 7, 2); px('#ff8ab0', -2, -33 + hop, 5, 2); px('#ff8ab0', -1, -35 + hop, 3, 2); px('#ffd23f', 0, -37 + hop, 1, 2); px('#fff', -2, -31 + hop, 1, 1); px('#fff', 2, -33 + hop, 1, 1); g.restore();
      PARTY.forEach((id, k) => { const left = !!HOMES[k][1], home = HOMES[k][0], from = left ? -40 : 360, p = clamp((t - .3 - k * .25) / 1.4, 0, 1), X = Math.round(from + (home - from) * p);
        const dance = p >= 1, jump = dance ? Math.abs(Math.round(Math.sin(t * 6 + k) * 6)) : 0, sp = dance && Math.floor(t * 1.5 + k) % 4 === 0;
        g.save(); g.translate(X, 172 - jump); if (sp) g.scale(-2, 2); else g.scale(2, 2); drawAnimal(id, 0, 0, { b: true, t: t + k, flip: dance ? !left : !left ? true : false, wk: !dance || Math.sin(t * 3 + k) > .3 ? t : 0 }); g.restore();
        if (dance && Math.floor(t * 2 + k) % 3 === 0) { px('#ff5a7a', X - 2, 124 - jump - (k % 2) * 6, 3, 3); px('#ff5a7a', X + 2, 124 - jump - (k % 2) * 6, 3, 3); px('#ff5a7a', X - 1, 127 - jump - (k % 2) * 6, 5, 2); px('#ff5a7a', X, 129 - jump - (k % 2) * 6, 3, 1); } });
      for (let k = 0; k < 12; k++) { const sx = (k * 29) % 320; px(['#e5342b', '#ffd23f', '#3f8fdc', '#4aa343'][k % 4], sx, 0, 3, 18 + Math.round(Math.sin(t * 2 + k) * 4)); }
      for (const q of conf) { q.y += q.v * dt; q.x += Math.sin(t * 2 + q.w) * .4; if (q.y > 200) { q.y = -10; q.x = Math.random() * 320; } px(q.c, Math.round(q.x), Math.round(q.y), 3, 2); }
    });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  const party = () => { AU.init(); birthdaySong(); setTimeout(() => say(`Happy ${ord(age)} birthday, Axl! Love from Uncle Brad.`), 3800); for (const [k, id] of PARTY.entries()) setTimeout(() => SFX.cry(id, true, .08), 4600 + k * 260); };
  UI.on('bsing', party);
  UI.on('bgo', () => { UI.close(); showMenu(); });
  // sound needs a tap first on phones and tablets, so the song starts on the first touch
  const first = () => { removeEventListener('pointerdown', first, true); if (document.getElementById('bdc')) party(); };
  addEventListener('pointerdown', first, true);
  try { party(); } catch (e) { }
}
(function () { const age = birthdayToday(); if (age) setTimeout(() => showBirthday(age), 400); })();
