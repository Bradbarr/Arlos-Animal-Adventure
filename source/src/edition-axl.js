/* ============ AXL'S EDITION: blonde hair, and a birthday party ============ */
window.RANGER_HAIR = '#f2d36b';
const BDAY = { m: 10, d: 13, born: 2017 };   // 13 November
function birthdayToday() {
  const n = new Date(), y = n.getFullYear();
  if (n.getMonth() === BDAY.m && n.getDate() === BDAY.d) return y - BDAY.born;
  if (y === 2026 && n.getMonth() === 10 && n.getDate() === 12) return y - BDAY.born;   // a preview the day before
  return 0;
}
function birthdaySong() {
  const C = 262, D = 294, E = 330, F = 349, G = 196, A = 220, B = 247, C5 = 523, A4 = 440, B4 = 494, F4 = 349, G4 = 392, E4 = 330;
  const notes = [[G, .3], [G, .15], [A, .45], [G, .45], [C, .45], [B, .9], [G, .3], [G, .15], [A, .45], [G, .45], [D, .45], [C, .9],
    [G, .3], [G, .15], [G4, .45], [E4, .45], [C, .45], [B, .45], [A, .9], [F4, .3], [F4, .15], [E4, .45], [C, .45], [D, .45], [C, .9]];
  let at = 0; for (const [f, d] of notes) { AU.tone(f * 2, d * .95, { type: 'triangle', vol: .12, at }); AU.tone(f, d * .95, { type: 'sine', vol: .06, at }); at += d * 1.05; }
}
function showBirthday(age) {
  const yr = new Date().getFullYear(), gift = DB.bday !== yr;
  UI.modal(`<div class="bday"><canvas id="bdc" width="320" height="200"></canvas>
    <h1 class="bdt">HAPPY BIRTHDAY<br>AXL!</h1><p class="bda">🎂 You're <b>${age}</b>! 🎈</p>
    <p>All the animals on Sanctuary Island have come to say happy birthday, Ranger Axl!</p>
    ${gift ? `<p class="small">🎁 Birthday presents: <b>9 💎 treasures</b>, <b>9p</b> and a <b>Birthday Star</b> sticker!</p>` : '<p class="small">🎁 Your birthday presents are in your bag and sticker book.</p>'}
    <button class="btn sm" id="bsing">🎵 Play the song again</button><button class="btn go big" id="bgo">🎉 LET'S PLAY!</button></div>`, { wide: true, clear: true });
  if (gift) { DB.bday = yr; DB.gems = (DB.gems || 0) + 9; DB.coins = (DB.coins || 0) + 9; if (!DB.stickers.some(s => s.id === 'bday' + yr)) DB.stickers.push({ id: 'bday' + yr, em: '🎂', label: `Birthday Star ${yr}` }); SAVE.put(); }
  const c = $('bdc'), x = c.getContext('2d'); x.imageSmoothingEnabled = false;
  const conf = []; for (let k = 0; k < 70; k++) conf.push({ x: Math.random() * 320, y: Math.random() * -200, v: 20 + Math.random() * 40, c: ['#e5342b', '#ffd23f', '#3f8fdc', '#4aa343', '#ff8ab0', '#b07af0'][k % 6], w: Math.random() * 6 });
  const balloons = [[30, '#e5342b'], [60, '#3f8fdc'], [262, '#ffd23f'], [292, '#ff8ab0']];
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
      for (const [id, px2, fl] of [['elephant', 36, false], ['fox', 236, true], ['kangaroo', 274, true], ['puffin', 304, true]]) { g.save(); g.translate(px2, 170); g.scale(2, 2); drawAnimal(id, 0, 0, { b: true, t: t + px2, flip: fl, wk: Math.sin(t * 3 + px2) > .6 ? t : 0 }); g.restore(); }
      for (const q of conf) { q.y += q.v * dt; q.x += Math.sin(t * 2 + q.w) * .4; if (q.y > 200) { q.y = -10; q.x = Math.random() * 320; } px(q.c, Math.round(q.x), Math.round(q.y), 3, 2); }
    });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  const party = () => { AU.init(); birthdaySong(); setTimeout(() => say(`Happy birthday, Axl! You are ${age}!`), 200); };
  UI.on('bsing', party);
  UI.on('bgo', () => { UI.close(); showMenu(); });
  // sound needs a tap first on phones and tablets, so the song starts on the first touch
  const first = () => { removeEventListener('pointerdown', first, true); if (document.getElementById('bdc')) party(); };
  addEventListener('pointerdown', first, true);
  try { party(); } catch (e) { }
}
(function () { const age = birthdayToday(); if (age) setTimeout(() => showBirthday(age), 400); })();
