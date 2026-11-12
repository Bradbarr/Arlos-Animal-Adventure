/* ============ VERSION 4: twenty new animals and their landscapes ============
   Chapter 2 "Wild Isles" (Britain) and Chapter 3 "Shores and Far Lands".
   Every animal has: name, sign word (sw), size, food, facts, pixel art and a voice. */

/* ---------- new ground tiles ---------- */
const _bt = buildTiles;
buildTiles = function () {
  _bt();
  mkTile('leaf', '#8a6a32', [['#a87a3a', 18, 2], ['#c8642a', 10, 2], ['#6a5428', 16], ['#d8a040', 6, 1]]);
  mkTile('heath', '#7a5a78', [['#9a6a9a', 18, 2], ['#5a7a3a', 16], ['#b880c0', 8, 1]]);
  mkTile('shingle', '#a8a49c', [['#c0bcb4', 20, 2], ['#8a867e', 20, 2], ['#d8d4cc', 6, 1]]);
  mkTile('redsand', '#c8642e', [['#d8743a', 22], ['#b05424', 20], ['#e88a4a', 5, 1]]);
  mkTile('chalk', '#e8e4d8', [['#f4f0e6', 16, 3], ['#d0ccc0', 16, 2]]);
  mkTile('gravel', '#b8a888', [['#cbbc9c', 22, 1], ['#9a8a6a', 22, 1], ['#e0d4b8', 6, 1]]);
};

/* ---------- new scenery props ---------- */
Object.assign(PROP, {
  birch(x, y, t, s) { const d = Math.round(Math.sin(t * 1.4 + s)); box(x - 2, y - 26, 4, 26, '#f0ece4'); for (let k = 0; k < 5; k++) px('#2a2a2a', x - 2 + (k % 2) * 2, y - 24 + k * 5, 2, 1); box(x - 9 + d, y - 34, 18, 9, '#8fc040'); box(x - 6 + d, y - 39, 12, 6, '#a0d050'); px('#6a9a30', x - 5 + d, y - 28, 4, 2); },
  willow(x, y, t, s) { const d = Math.round(Math.sin(t * 1.2 + s) * 1.5); box(x - 3, y - 20, 6, 20, '#6a5a3a'); box(x - 14, y - 32, 28, 9, '#7aa040'); for (let k = 0; k < 7; k++) px(k % 2 ? '#8ab850' : '#6a9030', x - 13 + k * 4 + d, y - 24, 2, 10 + (k % 3) * 3); },
  seastack(x, y) { box(x - 6, y - 30, 12, 30, '#a8a4a0'); box(x - 4, y - 36, 8, 7, '#b8b4b0'); px('#5a8a3a', x - 4, y - 37, 8, 2); px('#8a8680', x - 3, y - 20, 2, 12); px('#fff', x + 2, y - 33, 2, 1); },
  mangrove(x, y, t, s) { const d = Math.round(Math.sin(t + s)); for (const o of [-6, -2, 3, 7]) px('#6a4a2a', x + o, y - 8, 2, 8); box(x - 2, y - 22, 4, 15, '#6a4a2a'); box(x - 13 + d, y - 30, 26, 9, '#2f7a3a'); box(x - 8 + d, y - 35, 16, 6, '#3a8a44'); },
  baobab(x, y) { box(x - 6, y - 24, 12, 24, '#9a7a5a'); px('#8a6a4a', x - 3, y - 20, 2, 18); for (const [a, b] of [[-10, -28], [-4, -30], [3, -30], [8, -27]]) { px('#9a7a5a', x + a, y + b, 3, 6); box(x + a - 3, y + b - 4, 8, 4, '#6a9a3a'); } },
  gum(x, y, t, s) { const d = Math.round(Math.sin(t * 1.3 + s)); box(x - 2, y - 24, 4, 24, '#e8dcc8'); px('#c8b8a0', x - 1, y - 18, 1, 14); box(x - 10 + d, y - 32, 20, 8, '#7a9a7a'); box(x - 6 + d, y - 37, 12, 6, '#8aaa8a'); },
  bramble(x, y) { box(x - 11, y - 10, 22, 10, '#3a7a34'); box(x - 7, y - 14, 14, 5, '#4a8a3a'); for (const [a, b] of [[-7, -7], [-2, -11], [4, -8], [8, -4], [0, -4]]) px('#3a1a4a', x + a, y + b, 2, 2); px('#e8e0f0', x - 4, y - 13, 2, 1); },
  hedge(x, y) { box(x - 12, y - 14, 24, 14, '#3a8a3a'); box(x - 10, y - 17, 20, 4, '#4a9a44'); px('#2a6a2a', x - 8, y - 9, 4, 2); px('#2a6a2a', x + 3, y - 12, 5, 2); px('#fff', x - 4, y - 15, 2, 1); px('#ffd23f', x + 6, y - 6, 2, 1); },
  haybale(x, y) { box(x - 10, y - 12, 20, 12, '#e0c060'); px('#c8a840', x - 10, y - 8, 20, 1); px('#c8a840', x - 10, y - 4, 20, 1); px('#f0d880', x - 8, y - 11, 14, 1); px('#a03a2a', x - 3, y - 12, 1, 12); px('#a03a2a', x + 4, y - 12, 1, 12); },
  sett(x, y) { box(x - 12, y - 8, 24, 8, '#6a5030'); box(x - 8, y - 11, 16, 4, '#7a5e3a'); box(x - 4, y - 7, 8, 7, '#1c140c'); px('#8a6a44', x - 10, y - 3, 3, 2); px('#4a8a3a', x + 5, y - 12, 4, 1); },
  stump(x, y) { box(x - 7, y - 9, 14, 9, '#7a5030'); box(x - 7, y - 10, 14, 3, '#c89a5a'); px('#a07a40', x - 3, y - 9, 6, 1); px('#5a8a3a', x + 3, y - 11, 4, 2); px('#e5342b', x - 5, y - 12, 3, 2); },
  kelp(x, y, t, s) { const d = Math.round(Math.sin(t * 1.6 + s)); box(x - 11, y - 6, 22, 6, '#4a5a2a'); for (let k = 0; k < 6; k++) px(k % 2 ? '#6a7a30' : '#5a6a28', x - 10 + k * 4 + (k % 2 ? d : 0), y - 10 - (k % 3) * 2, 3, 6 + (k % 3) * 2); },
  puffhole(x, y) { box(x - 11, y - 7, 22, 7, '#4a9a3a'); box(x - 8, y - 10, 16, 4, '#5aaa44'); box(x - 4, y - 7, 8, 6, '#2a1a0c'); for (let k = 0; k < 4; k++) px('#ff8ab0', x - 9 + k * 6, y - 11, 2, 2); },
  tidepool(x, y, t) { box(x - 12, y - 8, 24, 8, '#8a8680'); px('#3f8fdc', x - 9, y - 7, 18, 4); px('#7cc0f2', x - 7 + ((t * 2) | 0) % 6, y - 7, 4, 1); box(x - 12, y - 11, 5, 4, '#9a9690'); box(x + 6, y - 12, 6, 5, '#9a9690'); px('#4a8a4a', x - 2, y - 10, 1, 3); },
  mangroot(x, y) { for (const o of [-10, -6, -1, 4, 8]) { px('#6a4a2a', x + o, y - 12, 2, 12); px('#6a4a2a', x + o - 1, y - 3, 4, 3); } px('#6a4a2a', x - 10, y - 13, 20, 2); box(x - 8, y - 18, 16, 6, '#2f7a3a'); },
  coralrock(x, y) { box(x - 10, y - 9, 20, 9, '#e08a7a'); box(x - 6, y - 13, 6, 5, '#f0a090'); px('#ffd23f', x + 2, y - 12, 2, 4); px('#b07af0', x + 5, y - 11, 2, 3); px('#c06a5a', x - 7, y - 5, 4, 1); },
  thornbush(x, y) { box(x - 12, y - 9, 24, 9, '#7a8a3a'); box(x - 8, y - 13, 16, 5, '#8a9a44'); for (let k = 0; k < 5; k++) px('#5a4a2a', x - 10 + k * 5, y - 14 + (k % 2), 1, 3); px('#fff', x - 3, y - 12, 2, 2); },
  spinifex(x, y, t, s) { const d = Math.round(Math.sin(t * 2 + s)); box(x - 11, y - 6, 22, 6, '#b8a850'); for (let k = 0; k < 9; k++) px(k % 2 ? '#c8b860' : '#a89840', x - 10 + k * 2 + (k % 3 ? d : 0), y - 8 - (k % 4) * 2, 2, 4 + (k % 4) * 2); },
  bluebell(x, y, t, s) { px('#3f8a3c', x, y - 5, 1, 5); px('#6a6ae0', x + 1, y - 6, 2, 2); px('#6a6ae0', x + 1, y - 3, 2, 2); px('#3f8a3c', x - 2, y - 2, 2, 2); },
  heather(x, y) { px('#5a7a3a', x - 3, y - 3, 7, 3); px('#b880c0', x - 2, y - 5, 2, 2); px('#9a5aa0', x + 1, y - 6, 2, 3); },
  thrift(x, y) { px('#4a8a3a', x - 2, y - 2, 5, 2); px('#ff8ab0', x - 1, y - 5, 3, 3); }
});
Object.assign(PROP_H, { bramble: 14, hedge: 17, haybale: 12, sett: 11, stump: 12, kelp: 12, puffhole: 11, tidepool: 12, mangroot: 18, coralrock: 13, thornbush: 14, spinifex: 12 });

/* ---------- new foods ---------- */
Object.assign(FOODS, { nuts: 'Nuts', nectar: 'Flower nectar' });
Object.assign(ICON, {
  nuts() { for (const [a, b] of [[2, 7], [8, 5], [6, 10]]) { box(a, b, 6, 5, '#a0703a'); px('#6a4420', a + 1, b, 4, 1); px('#c89a5a', a + 1, b + 2, 2, 1); } },
  nectar() { box(4, 6, 8, 9, '#ffd23f'); px('#ffb02e', 5, 8, 6, 6); px('#fff6c8', 6, 7, 2, 2); px('#8a5a2a', 5, 4, 6, 2); px('#ff8ab0', 1, 1, 4, 4); px('#ffd23f', 2, 2, 2, 2); },
  coin() { box(3, 3, 10, 10, '#d8a040'); px('#f0c860', 4, 4, 4, 2); px('#a87020', 6, 7, 4, 3); },
  cave() { box(1, 6, 14, 9, '#7f838b'); box(3, 3, 10, 4, '#8f939b'); box(5, 9, 6, 6, '#1c1c24'); },
  sett() { box(1, 8, 14, 7, '#6a5030'); box(5, 10, 6, 5, '#1c140c'); px('#4a8a3a', 2, 7, 4, 1); },
  nestbox() { px('#7a5a34', 7, 10, 2, 6); box(3, 3, 10, 8, '#c08a4a'); px('#8a4a2a', 2, 2, 12, 2); box(6, 5, 4, 4, '#2a1a0c'); },
  bughotel() { box(2, 4, 12, 11, '#a07040'); px('#8a4a2a', 1, 3, 14, 2); for (let k = 0; k < 3; k++) { px('#5a3a1a', 4 + k * 3, 7, 2, 2); px('#e0c080', 4 + k * 3, 11, 2, 2); } },
  rockpool() { box(1, 6, 14, 8, '#8a8680'); px('#3f8fdc', 3, 8, 10, 4); px('#7cc0f2', 4, 8, 4, 1); px('#ff8a5a', 10, 10, 2, 2); },
  seaweed() { for (let k = 0; k < 4; k++) px(k % 2 ? '#4a8a3a' : '#3a7a2a', 3 + k * 3, 3 + (k % 2) * 3, 2, 12 - (k % 2) * 3); },
  shells() { box(2, 8, 6, 5, '#f3c9b0'); px('#e0a088', 3, 9, 1, 4); px('#e0a088', 5, 9, 1, 4); box(9, 6, 5, 7, '#f0e0d0'); px('#ff8a5a', 4, 3, 5, 1); px('#ff8a5a', 6, 1, 1, 5); },
  mushroom() { px('#f0e6d8', 7, 9, 3, 6); box(3, 4, 11, 6, '#e5342b'); px('#fff', 5, 5, 2, 2); px('#fff', 10, 6, 2, 1); },
  path() { box(1, 1, 14, 14, '#b8a888'); px('#9a8a6a', 3, 4, 2, 1); px('#e0d4b8', 8, 9, 3, 1); px('#9a8a6a', 11, 3, 2, 1); },
  store() { box(1, 6, 14, 9, '#d8a05a'); box(0, 2, 16, 5, '#3f8fdc'); px('#fff', 2, 3, 3, 3); px('#fff', 8, 3, 3, 3); box(6, 10, 4, 5, '#5a3a1a'); },
  jobs() { px('#7a5a34', 3, 9, 2, 7); px('#7a5a34', 11, 9, 2, 7); box(1, 1, 14, 9, '#d8b06a'); px('#3a2a10', 3, 3, 9, 1); px('#3a2a10', 3, 5, 7, 1); px('#e5342b', 11, 6, 3, 3); },
  fountain() { box(1, 9, 14, 6, '#a8acb4'); px('#3f8fdc', 2, 10, 12, 2); box(6, 4, 4, 6, '#b8bcc4'); px('#bfe6ff', 7, 1, 2, 3); px('#bfe6ff', 4, 3, 2, 2); px('#bfe6ff', 10, 3, 2, 2); },
  statue() { box(2, 12, 12, 4, '#8d9199'); box(5, 6, 6, 6, '#e8b830'); box(5, 1, 6, 5, '#f0c840'); px('#c89820', 3, 1, 10, 1); },
  chest() { box(1, 5, 14, 10, '#8a5a2a'); box(1, 2, 14, 4, '#a06a34'); px('#ffd23f', 1, 6, 14, 1); box(6, 5, 4, 4, '#ffd23f'); px('#7cf0ff', 3, 0, 2, 2); },
  swing() { px('#8a5a2a', 1, 1, 2, 15); px('#8a5a2a', 13, 1, 2, 15); px('#8a5a2a', 1, 1, 14, 2); px('#ddd', 5, 3, 1, 8); px('#ddd', 10, 3, 1, 8); box(4, 11, 8, 3, '#e5342b'); },
  arch() { const C = ['#e5342b', '#ffd23f', '#4aa343', '#3f8fdc']; C.forEach((c, k) => { g.fillStyle = c; g.beginPath(); g.arc(8, 15, 8 - k * 1.6, Math.PI, 0); g.arc(8, 15, 6.4 - k * 1.6, 0, Math.PI, true); g.fill(); }); },
  map() { box(1, 2, 14, 12, '#e8dcb0'); px('#4aa343', 2, 3, 5, 4); px('#3f8fdc', 9, 8, 5, 5); px('#e5342b', 7, 6, 2, 2); px('#8a6a3a', 1, 2, 14, 1); }
});
Object.assign(BLOCK_TILE, { b_leaf: 'leaf', b_heath: 'heath', b_shingle: 'shingle', b_redsand: 'redsand' });

/* ---------- pixel art for the new animals (side view, facing right, feet at y=0) ---------- */
const bob1 = (t, wk, k) => (!wk && Math.sin(t * 2.4 + k) > .75) ? 1 : 0;
Object.assign(ANI, {
  fox(b, t, wk) {
    quad({ bw: 16, bh: 7, lh: 5, hw: 8, hh: 6, c: '#d8642a', leg: '#3a2a22', ear: 'point', sn: '#f6efe6', nose: '#1c1c1c',
      tail(x0, by, bw, bh, b, t) { const w = Math.round(Math.sin(t * 3)); box(x0 - 6, by + w, 7, b ? 3 : 4, '#d8642a'); px('#f6efe6', x0 - 8, by + 1 + w, 3, b ? 2 : 3); },
      body(x0, by, bw, bh) { px('#f6efe6', x0 + 3, by + bh - 2, bw - 6, 2); } }, b, t, wk);
  },
  badger(b, t, wk) {
    quad({ bw: 18, bh: 8, lh: 3, hw: 8, hh: 6, c: '#8a8a90', hc: '#f2f2f2', ec: '#2a2a2e', leg: '#2a2a2e', ear: 'tiny', nose: '#1c1c1c',
      tail(x0, by) { px('#9a9aa0', x0 - 2, by + 1, 3, 2); },
      body(x0, by, bw, bh) { px('#2a2a2e', x0 + 1, by + bh - 2, bw - 2, 2); px('#a8a8ae', x0 + 2, by + 1, bw - 6, 1); },
      post(hx, hy, hw, hh, b, t) { px('#1c1c1c', hx, hy + 1, hw - 2, 3); eye(hx + hw - 5, hy + 2, t, 7); } }, b, t, wk);
  },
  redsquirrel(b, t, wk) {
    quad({ bw: 9, bh: 6, lh: 3, hw: 6, hh: 5, c: '#c0502a', ear: 'point', sn: '#f2dcc0', nose: '#3a1a10',
      tail(x0, by, bw, bh, b, t) { const w = Math.round(Math.sin(t * 2.5)); box(x0 - 4, by - (b ? 4 : 7) + w, 4, b ? 8 : 11, '#b8482a'); box(x0 - 6, by - (b ? 6 : 10) + w, 5, 5, '#c85a30'); px('#e07a48', x0 - 5, by - (b ? 5 : 9) + w, 2, 5); },
      body(x0, by, bw, bh) { px('#f2dcc0', x0 + 2, by + bh - 2, bw - 4, 2); } }, b, t, wk);
  },
  dormouse(b, t, wk) {
    quad({ bw: 8, bh: 5, lh: 2, hw: 6, hh: 5, c: '#e0a040', ear: 'round', ec: '#d08a30', nose: '#8a4a2a',
      tail(x0, by) { box(x0 - 7, by + 1, 8, 3, '#d8963a'); px('#f0c070', x0 - 7, by + 1, 7, 1); },
      body(x0, by, bw, bh) { px('#f4d89a', x0 + 1, by + bh - 2, bw - 3, 2); } }, b, t, wk);
  },
  otter(b, t, wk) {
    quad({ bw: 18, bh: 6, lh: 2, hw: 7, hh: 5, c: '#6a4a30', ear: 'tiny', sn: '#c8b090', nose: '#1c1c1c',
      tail(x0, by) { px('#5a3e28', x0 - 6, by + 2, 7, 3); px('#5a3e28', x0 - 9, by + 3, 4, 2); },
      body(x0, by, bw, bh) { px('#c8b090', x0 + bw - 7, by + bh - 2, 6, 2); px('#7a5a3c', x0 + 2, by + 1, bw - 6, 1); } }, b, t, wk);
  },
  elephant(b, t, wk) {
    quad({ bw: 24, bh: 12, lh: 8, hw: 10, hh: 10, c: '#8a8f98', leg: '#7a7f88', nose: 0, hx: 2,
      tail(x0, by) { px('#7a7f88', x0 - 1, by + 2, 1, 6); px('#3a3a3a', x0 - 2, by + 8, 2, 2); },
      body(x0, by, bw, bh) { px('#9aa0a8', x0 + 2, by + 1, bw - 6, 1); px('#7a7f88', x0 + 3, by + bh - 2, bw - 6, 1); },
      post(hx, hy, hw, hh, b, t) {
        const sw = Math.round(Math.sin(t * 2)), L = b ? 5 : 9;
        px('#8a8f98', hx + hw - 3, hy + hh - 2, 3, L); px('#8a8f98', hx + hw - 2 + sw, hy + hh - 2 + L, 3, 2);
        if (!b) px('#f4f0e0', hx + hw - 5, hy + hh - 1, 2, 3);
        box(hx - 2, hy + 1, b ? 5 : 6, b ? 6 : 9, '#9aa0a8'); px('#c9a0a8', hx - 1, hy + 2, b ? 2 : 3, b ? 3 : 5);
      } }, b, t, wk);
  },
  rhino(b, t, wk) {
    quad({ bw: 22, bh: 10, lh: 5, hw: 10, hh: 7, c: '#9c9a92', leg: '#8a8880', ear: 'point', nose: 0, hy: 3,
      tail(x0, by) { px('#8a8880', x0 - 1, by + 2, 1, 4); px('#4a4a44', x0 - 2, by + 6, 2, 1); },
      body(x0, by, bw, bh) { px('#b0aea6', x0 + 2, by + 1, bw - 6, 1); px('#8a8880', x0 + bw - 8, by + 2, 1, bh - 3); },
      post(hx, hy, hw, hh, b) { px('#e2dac4', hx + hw - 2, hy - (b ? 1 : 4), 2, b ? 2 : 5); px('#e2dac4', hx + hw - 1, hy - (b ? 2 : 6), 1, 2); if (!b) px('#e2dac4', hx + hw - 5, hy - 2, 2, 3); px('#6a6860', hx + hw - 1, hy + hh - 2, 1, 1); } }, b, t, wk);
  },
  kingfisher(b, t, wk) {
    const y = -bob1(t, wk, 3) - (wk ? Math.abs(Math.round(Math.sin(wk * 10))) : 0);
    if (b) { px('#e5342b', -1, -2 + y, 1, 2); px('#e5342b', 1, -2 + y, 1, 2); box(-4, -7 + y, 7, 5, '#3a6a9a'); px('#d88a4a', -2, -4 + y, 4, 2); box(1, -10 + y, 5, 4, '#3a6a9a'); px('#333', 6, -9 + y, 2, 1); eye(3, -9 + y, t, 3); return; }
    px('#e5342b', -1, -2 + y, 1, 2); px('#e5342b', 1, -2 + y, 1, 2);
    px('#2a8ad8', -8, -7 + y, 3, 2); box(-5, -9 + y, 9, 7, '#2a8ad8'); px('#ff8a3a', -3, -5 + y, 6, 3); px('#1a6ab0', -5, -8 + y, 5, 3); px('#7cd0ff', -4, -9 + y, 3, 1);
    box(2, -13 + y, 6, 5, '#2a8ad8'); px('#ff8a3a', 4, -10 + y, 3, 2); px('#fff', 6, -9 + y, 1, 1); px('#222', 8, -11 + y, 5, 1); px('#222', 8, -10 + y, 4, 1); eye(5, -12 + y, t, 3);
  },
  barnowl(b, t, wk) {
    const y = -bob1(t, wk, 5);
    if (b) { px('#d8b070', -2, -1, 2, 1); px('#d8b070', 1, -1, 2, 1); box(-5, -10 + y, 10, 9, '#f2eee4'); px('#e0d8c8', -4, -6 + y, 3, 4); box(-4, -15 + y, 9, 6, '#f8f6f0'); px('#16161c', -2, -13 + y, 2, 2); px('#16161c', 2, -13 + y, 2, 2); px('#e0a060', 0, -11 + y, 2, 2); return; }
    px('#d8b070', -2, -1, 2, 1); px('#d8b070', 1, -1, 2, 1);
    box(-5, -14 + y, 10, 13, '#d8a860'); px('#f4ece0', -1, -10 + y, 5, 8); px('#b88840', -5, -12 + y, 3, 9); px('#8a6a3a', -4, -9 + y, 1, 1); px('#8a6a3a', -3, -6 + y, 1, 1);
    box(-4, -21 + y, 10, 8, '#d8a860'); box(-3, -20 + y, 8, 7, '#f6f0e4'); px('#c8a070', -3, -20 + y, 1, 7); px('#c8a070', 4, -20 + y, 1, 7);
    if (EYES_SHUT || (t + 1.3) % 3.4 < .13) { px('#3a2a2a', -1, -17 + y, 2, 1); px('#3a2a2a', 2, -17 + y, 2, 1); } else { px('#16161c', -1, -18 + y, 2, 2); px('#16161c', 2, -18 + y, 2, 2); }
    px('#e0a060', 1, -15 + y, 1, 2);
  },
  frog(b, t, wk) {
    const y = wk ? -Math.abs(Math.round(Math.sin(wk * 9) * 3)) : 0;
    if (b) { px('#5aa04a', -7, -3 + y, 4, 1); box(-4, -4 + y, 6, 3, '#6ab04a'); box(1, -6 + y, 4, 3, '#6ab04a'); px('#fff', 2, -7 + y, 2, 2); px('#111', 3, -7 + y, 1, 1); px('#4a8a3a', -3, -1 + y, 2, 1); return; }
    px('#4a8a3a', -8, -2 + y, 4, 2); px('#4a8a3a', -5, -1 + y, 3, 1); box(-6, -6 + y, 12, 5, '#5aa04a'); px('#c8e0a0', -4, -2 + y, 8, 1); px('#3a7a2a', -3, -5 + y, 2, 1); px('#3a7a2a', 1, -4 + y, 2, 1);
    box(2, -8 + y, 7, 4, '#5aa04a'); box(3, -10 + y, 3, 3, '#5aa04a'); eye(4, -10 + y, t, 9); px('#2a6a2a', 5, -5 + y, 4, 1); px('#4a8a3a', 4, -2 + y, 2, 2);
  },
  ladybird(b, t, wk) {
    const sw = wk ? ((wk * 12) | 0) % 2 : 0;
    if (b) { for (let k = 0; k < 3; k++) px('#222', -3 + k * 3 + sw, -1, 1, 1); box(-5, -4, 10, 3, '#3a3a4a'); px('#ff8a2a', -2, -4, 2, 1); px('#ff8a2a', 2, -4, 2, 1); px('#5a5a6a', -4, -3, 8, 1); px('#222', 5, -4, 2, 3); px('#fff', 6, -4, 1, 1); return; }
    for (let k = 0; k < 3; k++) px('#111', -3 + k * 3 + sw, -1, 1, 1);
    box(-5, -5, 10, 4, '#e5342b'); px('#e5342b', -4, -6, 8, 1); px('#ff7a70', -3, -6, 3, 1); px('#111', 0, -6, 1, 5); px('#111', -3, -4, 2, 2); px('#111', 2, -5, 2, 2); px('#111', 2, -2, 2, 1);
    box(4, -4, 3, 3, '#111'); px('#fff', 5, -4, 1, 1); px('#fff', 6, -3, 1, 1);
  },
  bumblebee(b, t, wk) {
    if (b) {   // a larva: a soft cream grub
      const w = Math.round(Math.sin(t * 3)); box(-5, -5, 10, 5, '#f4ecd0'); for (let k = 0; k < 3; k++) px('#d8ccaa', -3 + k * 3, -5, 1, 5); px('#f4ecd0', -6, -3 + w, 2, 2); box(4, -6, 4, 4, '#f8f0d8'); eye(5, -5, t, 4); px('#e0a0a0', 7, -3, 1, 1); return;
    }
    const y = -2 - Math.round(Math.sin(t * 6) * 1.5), f = ((t * 20) | 0) % 2;
    g.fillStyle = 'rgba(220,240,255,.85)'; g.fillRect(-4, -13 + y - f, 5, 4); g.fillRect(0, -12 + y + f, 4, 3);
    box(-5, -8 + y, 10, 7, '#ffd23f'); px('#1c1c1c', -3, -8 + y, 2, 7); px('#1c1c1c', 1, -8 + y, 2, 7); px('#fff', -6, -6 + y, 2, 4);
    box(4, -7 + y, 4, 5, '#1c1c1c'); px('#fff', 6, -6 + y, 1, 1); px('#1c1c1c', 6, -9 + y, 1, 2); px('#1c1c1c', -2, -1 + y, 1, 2); px('#1c1c1c', 2, -1 + y, 1, 2);
  },
  puffin(b, t, wk) {
    const y = -bob1(t, wk, 2), sw = wk ? Math.round(Math.sin(wk * 12)) : 0;
    if (b) { px('#555', -2 + sw, -1, 2, 1); px('#555', 1 - sw, -1, 2, 1); box(-4, -8 + y, 8, 7, '#4a4a52'); px('#8a8a92', 0, -6 + y, 3, 4); box(-1, -11 + y, 6, 5, '#4a4a52'); px('#333', 5, -9 + y, 2, 1); eye(2, -10 + y, t, 2); return; }
    px('#ff7a1a', -2 + sw, -1, 2, 1); px('#ff7a1a', 1 - sw, -1, 2, 1);
    box(-4, -11 + y, 8, 10, '#1c1c24'); px('#f4f4f4', 0, -10 + y, 4, 8); px('#2a2a34', -4, -9 + y, 2, 6);
    box(-1, -16 + y, 7, 6, '#1c1c24'); px('#f0f0f0', 1, -15 + y, 4, 4); px('#ff7a1a', 6, -14 + y, 3, 3); px('#3a5a8a', 6, -14 + y, 1, 3); px('#ffd23f', 8, -13 + y, 1, 1); eye(3, -14 + y, t, 2);
  },
  seal(b, t, wk) {
    const u = wk ? Math.round(Math.sin(wk * 8)) : 0;
    if (b) { box(-6, -5 - u, 12, 5, '#f2f2ee'); px('#dcdcd6', -5, -2, 10, 1); box(4, -8, 6, 5, '#f6f6f2'); px('#1c1c1c', 9, -6, 1, 1); eye(6, -7, t, 4); px('#dcdcd6', -9, -3, 3, 2); px('#ccc', 10, -5, 2, 1); return; }
    px('#5a6068', -14, -3, 4, 2); box(-11, -6 - u, 20, 6, '#7a8088'); px('#9aa0a8', -9, -6 - u, 14, 1); for (const [a, c] of [[-7, -4], [-2, -3], [3, -4]]) px('#5a6068', a, c - u, 2, 1);
    px('#5a6068', 0, -1, 4, 1); box(7, -9, 7, 6, '#7a8088'); px('#1c1c1c', 13, -7, 1, 1); px('#ddd', 13, -5, 2, 1); eye(10, -8, t, 6);
  },
  crab(b, t, wk) {
    const f = wk ? ((wk * 12) | 0) % 2 : ((t * 2) | 0) % 2, k = b ? 1 : 0;
    for (let i = 0; i < 3; i++) { px('#c84a30', -6 + k + i * 2, -2 + (i + f) % 2, 1, 2); px('#c84a30', 3 - k + i * 2, -2 + (i + f + 1) % 2, 1, 2); }
    box(-6 + k * 2, -5, 12 - k * 4, 4, '#e5542b'); px('#ff7a5a', -4 + k * 2, -5, 6 - k * 2, 1);
    px('#e5542b', -2, -7, 1, 2); px('#e5542b', 2, -7, 1, 2); px('#111', -2, -8, 1, 1); px('#111', 2, -8, 1, 1);
    box(-10 + k * 3, -7 - f, 4 - k, 3, '#ff6a4a'); box(7 - k * 3, -7 - f, 4 - k, 3, '#ff6a4a'); px('#e5542b', -7 + k * 3, -5, 2, 1); px('#e5542b', 6 - k * 3, -5, 2, 1);
  },
  starfish(b, t) {
    const c = '#ff8a5a', d = '#ffc0a0';
    if (b) { box(-2, -5, 5, 4, c); px(c, 0, -7, 1, 2); px(c, -4, -4, 2, 1); px(c, 3, -4, 2, 1); px(c, -2, -1, 1, 1); px(c, 2, -1, 1, 1); px('#16161c', -1, -4, 1, 1); px('#16161c', 1, -4, 1, 1); return; }
    box(-3, -8, 7, 6, c); px(c, -1, -12, 3, 4); px(c, 0, -13, 1, 1); px(c, -8, -7, 5, 2); px(c, 4, -7, 5, 2); px(c, -5, -3, 2, 3); px(c, 3, -3, 2, 3); px(c, -6, -1, 2, 1); px(c, 4, -1, 2, 1);
    for (const [a, e] of [[0, -11], [-6, -7], [6, -7], [-4, -2], [4, -2]]) px(d, a, e, 1, 1); eye(-2, -7, t, 1); eye(1, -7, t, 1); px('#c0503a', -1, -4, 3, 1);
  },
  shark(b, t, wk) {
    const s = Math.round(Math.sin(t * 3 + (wk || 0) * 6) * 1.2), C = '#b0905a', F = '#a08048';
    if (b) { px(F, -11, -6 + s, 3, 2); px(F, -10, -4 - s, 2, 1); box(-8, -5, 14, 4, C); px('#e0d0b0', -6, -2, 12, 1); px(F, -1, -7, 3, 2); box(5, -5, 4, 4, C); px('#8a6a3a', 8, -2, 1, 1); for (const a of [-5, -2, 2]) px('#8a6a3a', a, -4, 1, 1); eye(6, -4, t, 2); return; }
    px(F, -18, -10 + s, 5, 3); px(F, -16, -7 + s, 3, 2); px(F, -15, -4 - s, 3, 2);
    box(-13, -7, 23, 6, C); px('#c8a870', -11, -7, 17, 1); px('#e0d0b0', -11, -2, 20, 1); px(F, -2, -10, 4, 3); px(F, -8, -9, 3, 2); px(F, 4, -2, 4, 2);
    box(10, -6, 5, 5, C); px('#8a6a3a', 14, -2, 1, 2); px('#8a6a3a', 7, -5, 1, 3); px('#8a6a3a', 8, -5, 1, 3); eye(11, -5, t, 2);
  },
  kangaroo(b, t, wk) {
    const hp = wk ? -Math.abs(Math.round(Math.sin(wk * 8) * (b ? 2 : 4))) : 0, C = '#b8703e', D = '#a0603a';
    if (b) { px(D, -7, -3, 5, 2); px(D, -1, -1, 5, 1); box(-3, -7 + hp, 6, 6, C); box(-1, -12 + hp, 5, 6, C); px('#e0b890', 1, -10 + hp, 2, 4); box(0, -16 + hp, 6, 5, C); px('#3a2010', 6, -14 + hp, 1, 1); px(C, 0, -19 + hp, 2, 3); px(C, 3, -19 + hp, 2, 3); px('#e0a080', 1, -18 + hp, 1, 2); eye(3, -15 + hp, t, 6); return; }
    px(D, -11, -3, 6, 2); px(D, -7, -5, 4, 3); px('#8a5030', -2, -2 + hp, 8, 2);
    box(-5, -10 + hp, 8, 8, C); box(-1, -18 + hp, 6, 10, C); px('#e0b890', 1, -16 + hp, 3, 7); px(D, 4, -14 + hp, 2, 3);
    box(1, -24 + hp, 6, 5, C); px(C, 6, -22 + hp, 2, 3); px('#3a2010', 7, -22 + hp, 1, 1); px(C, 1, -28 + hp, 2, 4); px(C, 4, -28 + hp, 2, 4); px('#e0a080', 2, -27 + hp, 1, 2); eye(4, -23 + hp, t, 6);
  },
  eagle(b, t, wk) {
    const y = -bob1(t, wk, 4);
    if (b) { px('#d8b040', -2, -1, 2, 1); px('#d8b040', 1, -1, 2, 1); box(-4, -9 + y, 8, 8, '#a8a8a0'); px('#c8c8c0', -1, -7 + y, 4, 5); box(0, -13 + y, 6, 5, '#b8b8b0'); px('#333', 6, -11 + y, 2, 2); eye(3, -12 + y, t, 4); return; }
    px('#ffd23f', -2, -1, 2, 1); px('#ffd23f', 1, -1, 2, 1); px('#ffd23f', -1, -3, 1, 2); px('#ffd23f', 1, -3, 1, 2);
    px('#fff', -9, -7 + y, 4, 4); box(-5, -15 + y, 10, 12, '#4a3020'); px('#3a2418', -5, -14 + y, 4, 10); px('#5a3a28', 0, -12 + y, 4, 8);
    box(1, -21 + y, 7, 7, '#f6f6f2'); px('#d8d8d0', 3, -20 + y, 4, 1); px('#ffc21a', 8, -19 + y, 3, 3); px('#ffc21a', 10, -16 + y, 1, 1); eye(5, -18 + y, t, 4);
  },
  tortoise(b, t, wk) {
    const sw = wk ? Math.round(Math.sin(wk * 8)) : 0, hb = (!wk && Math.sin(t * 1.5) > .6) ? 1 : 0;
    if (b) { px('#8a8a7a', -4 + sw, -2, 2, 2); px('#8a8a7a', 2 - sw, -2, 2, 2); box(-5, -7, 9, 5, '#6a5a3a'); px('#4a3e28', -2, -6, 2, 2); px('#8a7a58', -5, -3, 9, 1); box(4, -6 + hb, 4, 3, '#9a9a88'); eye(5, -6 + hb, t, 3); return; }
    px('#8a8a7a', -7 + sw, -3, 3, 3); px('#8a8a7a', 3 - sw, -3, 3, 3); box(-9, -11, 16, 8, '#6a5a3a'); box(-7, -13, 12, 3, '#7a6a48');
    for (const [a, c] of [[-6, -10], [-1, -11], [3, -9], [-4, -7], [1, -6]]) px('#4a3e28', a, c, 3, 2); px('#8a7a58', -9, -4, 16, 1);
    px('#9a9a88', 6, -8 + hb, 4, 2); box(9, -10 + hb, 5, 4, '#9a9a88'); eye(11, -9 + hb, t, 3);
  }
});
/* how tall each baby is, so it can peek over its hiding place (measured from the art) */
function measureBaby(id) {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64; const x = c.getContext('2d');
  withCtx(x, () => drawAnimal(id, 32, 56, { b: true, t: 0.4 })); const d = x.getImageData(0, 0, 64, 64).data;
  for (let y = 0; y < 64; y++) for (let k = 0; k < 64; k++) if (d[(y * 64 + k) * 4 + 3] > 0) return 56 - y;
  return 8;
}

/* ---------- voices ---------- */
Object.assign(VOICE, {
  fox: (p, v) => { AU.tone(900 * p, .12, { to: 1300 * p, vol: v * .9, type: 'sawtooth' }); AU.tone(1100 * p, .1, { to: 700 * p, vol: v * .7, type: 'sawtooth', at: .16 }); },
  badger: (p, v) => { for (let i = 0; i < 3; i++) AU.tone(180 * p, .09, { to: 140 * p, vol: v, type: 'sawtooth', at: i * .12 }); },
  redsquirrel: (p, v) => { for (let i = 0; i < 5; i++) AU.tone(2200 * p, .04, { to: 1800 * p, vol: v * .6, type: 'square', at: i * .06 }); },
  dormouse: (p, v) => { AU.tone(2600 * p, .08, { to: 3000 * p, vol: v * .6, type: 'sine' }); AU.tone(2800 * p, .06, { vol: v * .5, type: 'sine', at: .14 }); },
  barnowl: (p, v) => AU.noise(.6, { f: 3200 * p, q: 3, vol: v * 1.2, attack: .05 }),
  otter: (p, v) => { AU.tone(1500 * p, .18, { to: 2100 * p, vol: v * .7, type: 'sine' }); AU.tone(2000 * p, .16, { to: 1500 * p, vol: v * .6, type: 'sine', at: .22 }); },
  kingfisher: (p, v) => { for (let i = 0; i < 2; i++) AU.tone(3200 * p, .07, { to: 3800 * p, vol: v * .5, type: 'sine', at: i * .1 }); },
  frog: (p, v) => { AU.tone(240 * p, .12, { to: 200 * p, vol: v, type: 'square', vib: 30, vibRate: 40 }); AU.tone(300 * p, .1, { to: 220 * p, vol: v, type: 'square', at: .18, vib: 30, vibRate: 40 }); },
  ladybird: (p, v) => { AU.tone(3000, .03, { vol: v * .4, type: 'sine' }); AU.tone(3400, .03, { vol: v * .4, type: 'sine', at: .07 }); },
  bumblebee: (p, v) => AU.tone(150 * p, .7, { to: 170 * p, vol: v * .8, type: 'sawtooth', vib: 8, vibRate: 30 }),
  puffin: (p, v) => AU.tone(200 * p, .5, { to: 150 * p, vol: v, type: 'sawtooth', vib: 20, vibRate: 12 }),
  seal: (p, v) => AU.tone(330 * p, .7, { to: 240 * p, vol: v, type: 'sine', vib: 14, vibRate: 5 }),
  crab: (p, v) => { for (let i = 0; i < 4; i++) AU.noise(.03, { f: 3500, q: 4, vol: v, at: i * .07 }); },
  starfish: (p, v) => { for (let i = 0; i < 3; i++) AU.tone(600 + i * 200, .08, { to: 1200 + i * 200, vol: v * .5, type: 'sine', at: i * .1 }); },
  shark: (p, v) => { AU.noise(.6, { f: 500, q: .5, vol: v * .8, attack: .2 }); AU.tone(500 * p, .2, { to: 900 * p, vol: v * .3, type: 'sine', at: .3 }); },
  elephant: (p, v) => { AU.tone(420 * p, .5, { to: 640 * p, vol: v * 1.1, type: 'sawtooth', vib: 25, vibRate: 18 }); AU.noise(.4, { f: 1500 * p, q: 2, vol: v * .5 }); },
  rhino: (p, v) => { AU.noise(.25, { f: 400, q: .8, vol: v * 1.4 }); AU.tone(110 * p, .25, { to: 80 * p, vol: v, type: 'sawtooth', at: .05 }); },
  kangaroo: (p, v) => { for (let i = 0; i < 3; i++) AU.tone(500 * p, .06, { to: 400 * p, vol: v * .7, type: 'triangle', at: i * .1 }); },
  eagle: (p, v) => { for (let i = 0; i < 4; i++) AU.tone(2400 * p, .07, { to: 2000 * p, vol: v * .5, type: 'sine', at: i * .09 }); },
  tortoise: (p, v) => AU.noise(.5, { f: 900, q: .6, vol: v * .8, attack: .2 })
});

/* ---------- the animals ---------- */
/* sw = word spelt on the sign. size: small/medium/large/giant (how much room it needs).
   noct = sleeps by day. swim = may walk in water. aqua = lives only in water. release = can go back to the wild. */
const NEW_ANIMALS = {
  fox: { name: 'Red Fox', sw: 'FOX', baby: 'fox cub', biome: 'wildwood', col: '#d8642a', pro: 'She', food: 'bugs', eats: 'worms, beetles and berries', home: 'woods, fields and even towns in Britain', size: 'medium', noct: 1, ch: 2, em: '🦊', diet: 'both',
    fact: 'A fox curls its big bushy tail around itself like a warm blanket when it sleeps.',
    note: 'A little fox cub went exploring in the bluebells and lost her way back to the den. She is hiding somewhere orange and brown. Can you find her?' },
  badger: { name: 'Badger', sw: 'BADGER', baby: 'badger cub', biome: 'sett', col: '#8a8a90', pro: 'He', food: 'bugs', eats: 'earthworms, beetles and berries', home: 'woods and fields in Britain', size: 'medium', noct: 1, ch: 2, em: '🦡', diet: 'both',
    fact: 'Badgers live in tunnels called a sett, and they bring in fresh grass to make cosy beds.',
    note: 'It is night time in the wood. A badger cub came out of the sett and could not find the way back. Badgers like the dark. Can you find him?' },
  redsquirrel: { name: 'Red Squirrel', sw: 'SQUIRREL', baby: 'squirrel kitten', biome: 'pinewood', col: '#c0502a', pro: 'She', food: 'nuts', eats: 'nuts, seeds and pine cones', home: 'pine forests in Scotland, Wales and northern England', size: 'small', ch: 2, em: '🐿️', diet: 'plants',
    fact: 'Red squirrels bury nuts for the winter. The ones they forget can grow into new trees!',
    note: 'A tiny squirrel kitten fell out of her drey, a nest high in a pine tree. She is scared down on the ground. Can you find her?' },
  dormouse: { name: 'Dormouse', sw: 'DORMOUSE', baby: 'dormouse pup', biome: 'hedgerow', col: '#e0a040', pro: 'He', food: 'nuts', eats: 'hazelnuts, flowers and berries', home: 'hedges and woods in Britain', size: 'small', noct: 1, ch: 2, em: '🐭', diet: 'plants',
    fact: 'A hazel dormouse sleeps all winter long, curled up in a tight, warm ball.',
    note: 'A sleepy dormouse pup wandered out of the hedge and got lost along the lane. He is very small and golden. Can you find him?' },
  barnowl: { name: 'Barn Owl', sw: 'OWL', baby: 'owlet', biome: 'farm', col: '#f2eee4', pro: 'She', food: 'meat', eats: 'mice and voles', home: 'farms, fields and old barns', size: 'medium', noct: 1, ch: 2, em: '🦉', diet: 'meat',
    fact: "A barn owl's heart-shaped face works like a dish to catch the tiniest sounds.",
    note: 'A fluffy white owlet tumbled out of the barn at sunset. She cannot fly yet. Listen for a little hiss! Can you find her?' },
  otter: { name: 'Otter', sw: 'OTTER', baby: 'otter cub', biome: 'river', col: '#6a4a30', pro: 'He', food: 'fish', eats: 'fish and crayfish', home: 'rivers and coasts in Britain', size: 'medium', swim: 1, ch: 2, em: '🦦', diet: 'meat',
    fact: 'An otter can close its ears and nose when it swims underwater.',
    note: 'An otter cub was playing in the river and got swept downstream. He is tired and lost on the riverbank. Can you find him?' },
  kingfisher: { name: 'Kingfisher', sw: 'KINGFISHER', baby: 'kingfisher chick', biome: 'stream', col: '#2a8ad8', pro: 'She', food: 'fish', eats: 'small fish', home: 'rivers and streams', size: 'small', ch: 2, em: '🐦', diet: 'meat', egg: 1,
    fact: 'A kingfisher dives head first into the water to catch a fish in its beak.',
    note: 'A kingfisher chick left the nest burrow too early and is hiding by the stream. Look for a flash of blue! Can you find her?' },
  frog: { name: 'Common Frog', sw: 'FROG', baby: 'froglet', biome: 'lilypond', col: '#5aa04a', pro: 'He', food: 'bugs', eats: 'flies, slugs and worms', home: 'ponds and damp gardens', size: 'small', swim: 1, ch: 2, em: '🐸', diet: 'meat', stages: [['🥚', 'Frogspawn'], ['〰️', 'Tadpole'], ['B', 'Froglet'], ['A', 'Frog']],
    fact: 'A frog starts life as a tiny tadpole that swims with a wiggly tail.',
    note: 'A froglet has just lost his tadpole tail and hopped out of the pond for the first time. Now he is lost! Can you find him?' },
  ladybird: { name: 'Ladybird', sw: 'LADYBIRD', baby: 'ladybird larva', biome: 'wildmeadow', col: '#e5342b', pro: 'She', food: 'bugs', eats: 'greenfly and other tiny bugs', home: 'gardens, meadows and hedges', size: 'small', ch: 2, em: '🐞', diet: 'meat', stages: [['🥚', 'Egg'], ['B', 'Larva'], ['🫘', 'Pupa'], ['A', 'Ladybird']],
    fact: 'A ladybird can eat about five thousand greenfly in its life. Gardeners love them!',
    note: 'A ladybird larva has wandered off its leaf. It does not look like a ladybird yet! It is dark with orange spots. Can you find it?' },
  bumblebee: { name: 'Bumblebee', sw: 'BEE', baby: 'bumblebee larva', biome: 'orchard', col: '#ffd23f', pro: 'She', food: 'nectar', eats: 'nectar and pollen from flowers', home: 'gardens, meadows and orchards', size: 'small', ch: 2, em: '🐝', diet: 'plants', stages: [['🥚', 'Egg'], ['B', 'Larva'], ['🫘', 'Pupa'], ['A', 'Bee']],
    fact: 'Bumblebees carry pollen from flower to flower. That helps the flowers make seeds and fruit.',
    note: 'A baby bumblebee, called a larva, has dropped out of the nest in the orchard. It is soft and cream. Can you find it?' },
  puffin: { name: 'Puffin', sw: 'PUFFIN', baby: 'puffling', biome: 'cliffs', col: '#1c1c24', pro: 'He', food: 'fish', eats: 'small fish like sand eels', home: 'sea cliffs and islands, like Skomer in Wales', size: 'small', swim: 1, ch: 3, em: '🐦', diet: 'meat', egg: 1,
    fact: 'A puffin can carry ten or more little fish in its colourful beak at once.',
    note: 'A fluffy puffling left his burrow on the cliff top and got lost. He is grey and round like a little ball. Can you find him?' },
  seal: { name: 'Grey Seal', sw: 'SEAL', baby: 'seal pup', biome: 'shore', col: '#7a8088', pro: 'She', food: 'fish', eats: 'fish and squid', home: 'rocky shores and seas around Britain', size: 'large', swim: 1, release: 1, ch: 3, em: '🦭', diet: 'meat',
    fact: 'Grey seal pups are born with fluffy white fur. They swim well when they are older.',
    note: 'A fluffy white seal pup is lost on the rocky shore. Her mum is out at sea finding fish. Can you find her?' },
  crab: { name: 'Shore Crab', sw: 'CRAB', baby: 'baby crab', biome: 'rockpools', col: '#e5542b', pro: 'He', food: 'shrimp', eats: 'tiny sea creatures', home: 'rock pools and the seashore', size: 'small', swim: 1, ch: 3, em: '🦀', diet: 'meat', egg: 1,
    fact: 'A crab has its skeleton on the outside, like a suit of armour.',
    note: 'A baby crab scuttled out of his rock pool and the tide went out! He needs to get back to the water. Can you find him?' },
  starfish: { name: 'Starfish', sw: 'STARFISH', baby: 'baby starfish', biome: 'tidal', col: '#ff8a5a', pro: 'She', food: 'shrimp', eats: 'mussels and tiny sea creatures', home: 'rock pools and the sea floor', size: 'small', aqua: 1, ch: 3, em: '⭐', diet: 'meat', egg: 1,
    fact: 'A starfish can grow back an arm if it loses one.',
    note: 'A baby starfish was left on the beach when the tide went out. She needs to be back in the water. Can you find her?' },
  shark: { name: 'Nurse Shark', sw: 'SHARK', baby: 'nurse shark pup', biome: 'lagoon', col: '#b0905a', pro: 'He', food: 'fish', eats: 'fish, crabs and shrimp', home: 'warm, shallow seas near reefs and mangroves', size: 'large', aqua: 1, release: 1, ch: 3, em: '🦈', diet: 'meat',
    fact: 'Nurse sharks are gentle. They rest on the sea floor in the day and hunt at night.',
    note: 'A spotty nurse shark pup is lost in the shallow lagoon. He is gentle and shy and likes to hide in pools. Can you find him?' },
  elephant: { name: 'Elephant', sw: 'ELEPHANT', baby: 'elephant calf', biome: 'plains', col: '#8a8f98', pro: 'She', food: 'greens', eats: 'grass, leaves and fruit', home: 'the grassy plains of Africa', size: 'giant', swim: 1, ch: 3, em: '🐘', diet: 'plants',
    fact: 'An African elephant uses its trunk to drink, smell, breathe, lift things and say hello.',
    note: 'An elephant calf stopped to play in the mud and her herd walked on without her. She is big, but she is still a baby! Can you find her?' },
  rhino: { name: 'White Rhino', sw: 'RHINO', baby: 'rhino calf', biome: 'bushveld', col: '#9c9a92', pro: 'He', food: 'greens', eats: 'grass', home: 'grassy plains in southern Africa', size: 'large', ch: 3, em: '🦏', diet: 'plants',
    fact: 'Rhinos roll in mud to stay cool and keep biting bugs off their skin.',
    note: 'A rhino calf lost his mum in the thorny bush. Rhinos need rangers to keep them safe. Can you find him first?' },
  kangaroo: { name: 'Kangaroo', sw: 'KANGAROO', baby: 'joey', biome: 'outback', col: '#b8703e', pro: 'She', food: 'greens', eats: 'grass and leaves', home: 'the dry outback of Australia', size: 'large', ch: 3, em: '🦘', diet: 'plants',
    fact: "A baby kangaroo, called a joey, grows up safe inside its mum's pouch.",
    note: "A little joey hopped out of mum's pouch and could not find her again. She is somewhere in the red outback. Can you find her?" },
  eagle: { name: 'Bald Eagle', sw: 'EAGLE', baby: 'eaglet', biome: 'canyon', col: '#4a3020', pro: 'He', food: 'fish', eats: 'fish', home: 'lakes, rivers and coasts of North America', size: 'large', ch: 3, em: '🦅', diet: 'meat', egg: 1,
    fact: 'A bald eagle is not really bald. Its head is covered in white feathers.',
    note: 'An eaglet slipped out of a giant nest high in the canyon. He is grey and fluffy and cannot fly yet. Can you find him?' },
  tortoise: { name: 'Giant Tortoise', sw: 'TORTOISE', baby: 'tortoise hatchling', biome: 'galapagos', col: '#6a5a3a', pro: 'She', food: 'greens', eats: 'grass, leaves and cactus', home: 'the Galápagos Islands', size: 'medium', ch: 3, em: '🐢', diet: 'plants', egg: 1,
    fact: 'Giant tortoises can live for more than one hundred years!',
    note: 'A tiny tortoise hatchling dug out of her nest and wandered off. She is very slow, so she cannot be far away. Can you find her?' }
};
/* extra facts for the original ten, used by the new nature tasks */
const OLD_EXTRA = {
  gorilla: { ch: 1, em: '🦍', diet: 'plants', size: 'medium' }, polarbear: { ch: 1, em: '🐻‍❄️', diet: 'meat', size: 'medium' }, turtle: { ch: 1, em: '🐢', diet: 'plants', egg: 1, size: 'small', release: 1 },
  lion: { ch: 1, em: '🦁', diet: 'meat', size: 'medium' }, capybara: { ch: 1, em: '🐹', diet: 'plants', size: 'small' }, flamingo: { ch: 1, em: '🦩', diet: 'meat', egg: 1, size: 'small' },
  hedgehog: { ch: 1, em: '🦔', diet: 'meat', size: 'small', noct: 1 }, duck: { ch: 1, em: '🦆', diet: 'both', egg: 1, size: 'small' }, snowleopard: { ch: 1, em: '🐆', diet: 'meat', size: 'medium' }, camel: { ch: 1, em: '🐫', diet: 'plants', size: 'medium' }
};
for (const k in OLD_EXTRA) Object.assign(ANIMALS[k], OLD_EXTRA[k]);
NEW_ANIMALS.fox.pl = 'Foxes'; NEW_ANIMALS.starfish.pl = 'Starfish'; NEW_ANIMALS.dormouse.pl = 'Dormice';
Object.assign(ANIMALS, NEW_ANIMALS);
for (const k in NEW_ANIMALS) AIDS.push(k);

/* ---------- the twenty new landscapes ---------- */
Object.assign(BIOMES, {
  wildwood: { name: 'Bluebell Wood', an: 'fox', top: 'leaf', under: 'dirt', sky: ['#6ab0e0', '#d8f0e0'], far: ['#4a7a3a', '#5a8a44'], trees: ['oak', 'birch', 'oak'], hides: ['bramble', 'log', 'bush'], decor: ['bluebell', 'bluebell', 'mushroom', 'tuft'], fx: 'leaves', amb: 'quiet', decoys: ['rabbit', 'bird', 'snail', 'butterfly'] },
  sett: { name: 'Moonlit Wood', an: 'badger', top: 'leaf', under: 'darkdirt', sky: ['#141a3a', '#3a3a6a'], far: ['#1a2a24', '#22342c'], trees: ['oak', 'pine'], hides: ['sett', 'log', 'stump'], decor: ['mushroom', 'bluebell', 'tuft'], fx: 'fireflies', amb: 'night', night: 1, decoys: ['rabbit', 'snail', 'frog'] },
  pinewood: { name: 'Pine Forest', an: 'redsquirrel', top: 'moss', under: 'dirt', sky: ['#5aa8e0', '#d0ecf0'], far: ['#2a5a3a', '#346a44'], trees: ['pine', 'pine', 'birch'], hides: ['stump', 'log', 'fern'], decor: ['mushroom', 'tuft'], fx: 'leaves', amb: 'wind', decoys: ['bird', 'rabbit', 'snail'] },
  hedgerow: { name: 'Hedgerow Lane', an: 'dormouse', top: 'grass', under: 'dirt', sky: ['#6ab8f0', '#e0f4ff'], far: ['#6a9a4a', '#88b860'], trees: ['oak', 'apple'], hides: ['hedge', 'bramble', 'bush'], decor: ['flower', 'tuft', 'fencebit'], fx: 'butterflies', amb: 'quiet', houses: 1, decoys: ['ladybird', 'snail', 'butterfly', 'bird'] },
  farm: { name: 'Farm at Dusk', an: 'barnowl', top: 'grass', under: 'dirt', sky: ['#5a4a8a', '#f0a070'], far: ['#4a6a3a', '#5a7a44'], trees: ['oak'], hides: ['haybale', 'barrel', 'crate'], decor: ['fencebit', 'tuft', 'flower'], fx: 'fireflies', amb: 'night', houses: 1, decoys: ['rabbit', 'bird', 'snail'] },
  river: { name: 'Riverbank', an: 'otter', top: 'grass', under: 'mud', sky: ['#5ab0e0', '#d8f0e8'], far: ['#3a7a4a', '#4a8a54'], trees: ['willow', 'oak'], hides: ['reeds', 'log', 'rock'], decor: ['flower', 'tuft'], water: 2, sea: 1, fx: 'butterflies', amb: 'sea', decoys: ['frog', 'bird', 'snail'] },
  stream: { name: 'Willow Stream', an: 'kingfisher', top: 'grass', under: 'dirt', sky: ['#6ac0e8', '#e0f6f0'], far: ['#4a8a4a', '#5a9a54'], trees: ['willow', 'willow', 'birch'], hides: ['reeds', 'bush', 'driftwood'], decor: ['flower', 'tuft', 'bluebell'], water: 2, fx: 'butterflies', amb: 'quiet', decoys: ['frog', 'butterfly', 'snail'] },
  lilypond: { name: 'Lily Pond', an: 'frog', top: 'grass', under: 'mud', sky: ['#7ac0f0', '#e8f8ff'], far: ['#5a9a4a', '#7ab860'], trees: ['willow', 'oak'], hides: ['reeds', 'log', 'bush'], decor: ['lily', 'flower', 'tuft'], water: 2, fx: 'butterflies', amb: 'quiet', decoys: ['snail', 'ladybird', 'butterfly'] },
  wildmeadow: { name: 'Wildflower Meadow', an: 'ladybird', top: 'grass', under: 'dirt', sky: ['#5ab4f8', '#e0f4ff'], far: ['#7ab050', '#98c870'], trees: ['oak', 'apple'], hides: ['tallgrass', 'bush', 'fern'], decor: ['flower', 'flower', 'flower', 'tuft'], fx: 'butterflies', amb: 'quiet', decoys: ['butterfly', 'snail', 'bird'] },
  orchard: { name: 'Orchard Garden', an: 'bumblebee', top: 'grass', under: 'dirt', sky: ['#62b8f4', '#e4f6ff'], far: ['#b85a48', '#d8c8a0'], trees: ['apple', 'apple', 'oak'], hides: ['flowerpot', 'bush', 'barrel'], decor: ['flower', 'flower', 'birdhouse', 'tuft'], fx: 'butterflies', amb: 'quiet', houses: 1, decoys: ['ladybird', 'butterfly', 'snail'] },
  cliffs: { name: 'Puffin Cliffs', an: 'puffin', top: 'grass', under: 'chalk', sky: ['#5aa8e8', '#d8f0ff'], far: ['#e8e4d8', '#d0ccc0'], trees: ['seastack'], hides: ['puffhole', 'rock', 'puffhole'], decor: ['thrift', 'tuft', 'thrift'], sea: 1, fx: 'sparkle', amb: 'sea', decoys: ['bird', 'rabbit'] },
  shore: { name: 'Rocky Shore', an: 'seal', top: 'shingle', under: 'stone', sky: ['#7aa8d0', '#d8e8f0'], far: ['#8a9aa8', '#a0aab4'], trees: ['seastack'], hides: ['rock', 'kelp', 'driftwood'], decor: ['pebble', 'starfish', 'pebble'], water: 1, sea: 1, fx: 'sparkle', amb: 'sea', decoys: ['crab', 'bird'] },
  rockpools: { name: 'Rock Pools', an: 'crab', top: 'sand', under: 'stone', sky: ['#5ab0f0', '#d8f2ff'], far: ['#9aa0a8', '#b0b4ba'], trees: ['seastack'], hides: ['tidepool', 'rock', 'kelp'], decor: ['starfish', 'pebble'], water: 1, sea: 1, fx: 'sparkle', amb: 'sea', decoys: ['bird', 'snail'] },
  tidal: { name: 'Low Tide Beach', an: 'starfish', top: 'sand', under: 'sandstone', sky: ['#4aa8f0', '#c8ecff'], far: ['#e8d8a0', '#f0e0b0'], trees: ['seastack', 'palm'], hides: ['tidepool', 'shell', 'kelp'], decor: ['pebble', 'starfish'], water: 1, sea: 1, fx: 'sparkle', amb: 'sea', decoys: ['crab', 'bird'] },
  lagoon: { name: 'Mangrove Lagoon', an: 'shark', top: 'sand', under: 'sandstone', sky: ['#3aa8e8', '#c0f0f0'], far: ['#2a7a5a', '#3a8a64'], trees: ['mangrove', 'palm'], hides: ['tidepool', 'mangroot', 'coralrock'], decor: ['starfish', 'pebble'], water: 2, sea: 1, fx: 'sparkle', amb: 'sea', decoys: ['crab', 'bird'] },
  plains: { name: 'Elephant Plains', an: 'elephant', top: 'dry', under: 'clay', sky: ['#f0a85a', '#ffe8b0'], far: ['#a08a4a', '#c0a050'], trees: ['acacia', 'baobab'], hides: ['tallgrass', 'termite', 'rock'], decor: ['drytuft', 'pebble'], water: 1, fx: 'dust', amb: 'quiet', decoys: ['bird', 'lizard', 'butterfly'] },
  bushveld: { name: 'Bushveld', an: 'rhino', top: 'dry', under: 'clay', sky: ['#e8985a', '#ffe0a8'], far: ['#8a7a3a', '#a08a44'], trees: ['acacia', 'dead'], hides: ['thornbush', 'termite', 'rock'], decor: ['drytuft', 'pebble'], fx: 'dust', amb: 'quiet', decoys: ['lizard', 'bird'] },
  outback: { name: 'Red Outback', an: 'kangaroo', top: 'redsand', under: 'clay', sky: ['#3a90e0', '#ffd8a0'], far: ['#b8542a', '#c86a3a'], trees: ['gum', 'dead'], hides: ['spinifex', 'sandrock', 'termite'], decor: ['drytuft', 'pebble'], fx: 'dust', amb: 'wind', decoys: ['lizard', 'bird'] },
  canyon: { name: 'Eagle Canyon', an: 'eagle', top: 'grass', under: 'stone', sky: ['#4a90e0', '#d8ecff'], far: ['#b8784a', '#c88a5a'], trees: ['pine', 'pine', 'dead'], hides: ['rock', 'log', 'bush'], decor: ['pebble', 'tuft'], water: 1, peaks: 1, fx: 'leaves', amb: 'wind', decoys: ['bird', 'rabbit'] },
  galapagos: { name: 'Galápagos Island', an: 'tortoise', top: 'volc', under: 'basalt', sky: ['#4ab0f0', '#d0f4ff'], far: ['#3a5a3a', '#4a6a44'], trees: ['cactus', 'palm'], hides: ['lavarock', 'cactusclump', 'bush'], decor: ['pebble', 'minicactus'], sea: 1, fx: 'sparkle', amb: 'sea', decoys: ['lizard', 'crab'] }
});
/* the three chapters of the Story, ten landscapes each */
const CHAPTERS = {
  1: { name: 'Wild Rescue', sub: 'Jungles, ice and deserts', ids: BIDS.slice() },
  2: { name: 'Wild Isles', sub: 'Woods, rivers and gardens of Britain', ids: ['wildwood', 'sett', 'pinewood', 'hedgerow', 'farm', 'river', 'stream', 'lilypond', 'wildmeadow', 'orchard'] },
  3: { name: 'Shores and Far Lands', sub: 'Seas, plains and faraway islands', ids: ['cliffs', 'shore', 'rockpools', 'tidal', 'lagoon', 'plains', 'bushveld', 'outback', 'canyon', 'galapagos'] }
};
const ALLB = [...CHAPTERS[1].ids, ...CHAPTERS[2].ids, ...CHAPTERS[3].ids];

/* ---------- learning data for the new animals ---------- */
Object.assign(READQ, {
  fox: { q: 'What does a fox use like a blanket?', a: 'Its bushy tail', w: ['A coat', 'Some leaves'] },
  badger: { q: 'What is a badger home called?', a: 'A sett', w: ['A nest', 'A hive'] },
  redsquirrel: { q: 'What can grow from a forgotten nut?', a: 'A new tree', w: ['A flower pot', 'A rock'] },
  dormouse: { q: 'What does a dormouse do all winter?', a: 'Sleeps', w: ['Swims', 'Sings'] },
  barnowl: { q: "What shape is a barn owl's face?", a: 'A heart', w: ['A square', 'A star'] },
  otter: { q: 'What can an otter close when it swims?', a: 'Its ears and nose', w: ['Its tail', 'Its paws'] },
  kingfisher: { q: 'How does a kingfisher dive?', a: 'Head first', w: ['Tail first', 'Backwards'] },
  frog: { q: 'What is a baby frog first?', a: 'A tadpole', w: ['A chick', 'A kitten'] },
  ladybird: { q: 'What do ladybirds eat lots of?', a: 'Greenfly', w: ['Cake', 'Fish'] },
  bumblebee: { q: 'What do bees carry from flower to flower?', a: 'Pollen', w: ['Water', 'Sand'] },
  puffin: { q: 'How many fish can a puffin carry?', a: 'Ten or more', w: ['None', 'One'] },
  seal: { q: 'What colour is a grey seal pup?', a: 'White', w: ['Green', 'Purple'] },
  crab: { q: "Where is a crab's skeleton?", a: 'On the outside', w: ['In its tail', 'It has none'] },
  starfish: { q: 'What can a starfish grow back?', a: 'An arm', w: ['A tail', 'Wings'] },
  shark: { q: 'When does a nurse shark rest?', a: 'In the day', w: ['At night', 'Never'] },
  elephant: { q: 'What does an elephant use its trunk for?', a: 'Drinking and smelling', w: ['Flying', 'Digging holes'] },
  rhino: { q: 'Why do rhinos roll in mud?', a: 'To stay cool', w: ['To get warm', 'To hide eggs'] },
  kangaroo: { q: 'Where does a joey grow up?', a: "In mum's pouch", w: ['In a nest', 'In a tree'] },
  eagle: { q: "What covers a bald eagle's head?", a: 'White feathers', w: ['Nothing', 'Fur'] },
  tortoise: { q: 'How long can a giant tortoise live?', a: 'Over 100 years', w: ['One week', 'Ten days'] }
});
Object.assign(HOMEW, { wildwood: 'WOOD', sett: 'SETT', pinewood: 'TREE', hedgerow: 'HEDGE', farm: 'BARN', river: 'RIVER', stream: 'STREAM', lilypond: 'POND', wildmeadow: 'LEAF', orchard: 'NEST',
  cliffs: 'CLIFF', shore: 'SEA', rockpools: 'POOL', tidal: 'BEACH', lagoon: 'SEA', plains: 'PLAINS', bushveld: 'GRASS', outback: 'BUSH', canyon: 'CANYON', galapagos: 'ISLAND' });
Object.assign(FOODW, { nuts: 'nuts', nectar: 'drops of nectar' });
Object.assign(FOODSPELL, { nuts: 'NUTS', nectar: 'NECTAR' });
WORDS.push(['🦊', 'FOX'], ['🦉', 'OWL'], ['🦀', 'CRAB'], ['🦈', 'SHARK'], ['🦭', 'SEAL'], ['🐝', 'HIVE'], ['🦦', 'OTTER'], ['🦏', 'RHINO'], ['🦅', 'EAGLE'], ['🌰', 'NUT']);

for (const k in NEW_ANIMALS) BABY_H[k] = measureBaby(k);
