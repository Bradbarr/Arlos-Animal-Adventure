/* ============ ART: every picture is drawn from pixel blocks in code ============ */
const TILES = {};
function mkTile(name, base, sp, fn) {
  const c = document.createElement('canvas'); c.width = c.height = 16;
  const x = c.getContext('2d'), r = RNG(hash(name));
  x.fillStyle = base; x.fillRect(0, 0, 16, 16);
  for (const [col, n, w] of sp) for (let i = 0; i < n; i++) { x.fillStyle = col; x.fillRect((r() * 16) | 0, (r() * 16) | 0, w || (1 + (r() * 2 | 0)), 1); }
  if (fn) fn(x, r);
  TILES[name] = c; return c;
}
function buildTiles() {
  mkTile('plank', '#c79a5a', [['#b98545', 10, 5], ['#d8b06a', 6, 4]], x => { x.fillStyle = '#8a5a2a'; x.fillRect(0, 5, 16, 1); x.fillRect(0, 11, 16, 1); x.fillRect(5, 0, 1, 5); x.fillRect(11, 6, 1, 5); x.fillRect(3, 12, 1, 4); });
  mkTile('grass', '#5fa83c', [['#6fbb48', 26], ['#4f9432', 22], ['#7fc955', 6, 1]]);
  mkTile('dry', '#c8b257', [['#d8c56c', 24], ['#b39c45', 20], ['#e3d27e', 6, 1]]);
  mkTile('snow', '#eef4fa', [['#ffffff', 22], ['#dbe6f2', 18]]);
  mkTile('sand', '#e6d08a', [['#f0dc9c', 22], ['#d6bd74', 20]]);
  mkTile('mud', '#70553a', [['#7d6144', 20], ['#5f4730', 22], ['#8a6d4c', 5, 1]]);
  mkTile('rock', '#8b8f96', [['#9a9ea6', 20], ['#787c84', 22], ['#6c7078', 6, 3]]);
  mkTile('volc', '#3d3742', [['#4a4350', 20], ['#2f2a34', 22]], x => { x.fillStyle = '#ff7a1a'; x.fillRect(3, 5, 4, 1); x.fillRect(6, 6, 1, 3); x.fillRect(10, 11, 3, 1); x.fillStyle = '#ffc23a'; x.fillRect(4, 5, 1, 1); });
  mkTile('moss', '#3f8a3c', [['#4c9c46', 22], ['#327430', 24], ['#8fd060', 5, 1]]);
  mkTile('dirt', '#8a5a33', [['#9a683c', 20], ['#75492a', 22], ['#6a4124', 5, 2]]);
  mkTile('pit', '#5a3a20', [['#4c301a', 20], ['#664328', 14]], x => { x.fillStyle = '#3a2412'; x.fillRect(0, 0, 16, 2); x.fillRect(0, 0, 2, 16); x.fillStyle = '#73492c'; x.fillRect(0, 15, 16, 1); x.fillRect(15, 0, 1, 16); });
  mkTile('ice', '#bfe6f5', [['#d8f2fb', 16, 3], ['#a6d6ea', 14]]);
  mkTile('icy', '#9fcfe6', [['#b9e0f0', 14, 3], ['#88bcd6', 16]]);
  mkTile('stone', '#70747c', [['#7e828a', 20], ['#62666e', 20]]);
  mkTile('sandstone', '#cfae6a', [['#dcbc7a', 18, 4], ['#b9985a', 18, 3]]);
  mkTile('basalt', '#2b2730', [['#383340', 20], ['#211e26', 20]]);
  mkTile('clay', '#a0603a', [['#b06e46', 20], ['#8a5030', 20]]);
  mkTile('darkdirt', '#4a3a3a', [['#584646', 20], ['#3c2e2e', 20]]);
  mkTile('night', '#3c5a48', [['#48684f', 20], ['#31503f', 22]]);
  for (let f = 0; f < 2; f++) mkTile('water' + f, '#3f8fdc', [['#3684d0', 14, 3]], x => { x.fillStyle = '#7cc0f2'; x.fillRect(2 + f * 5, 3, 4, 1); x.fillRect(9 - f * 4, 10, 4, 1); x.fillStyle = '#5aa8e8'; x.fillRect(11 - f * 3, 5, 3, 1); x.fillRect(1 + f * 3, 13, 3, 1); });
  mkTile('lava0', '#ff7a1a', [['#ffb02e', 14, 3], ['#e85a10', 12, 2], ['#ffe066', 4, 2]]);
}
/* side-view ground block: under-block with a strip of the top block on it */
function sideTile(top, under) {
  const k = 'S_' + top + '_' + under; if (TILES[k]) return TILES[k];
  const c = document.createElement('canvas'); c.width = c.height = 16; const x = c.getContext('2d'), r = RNG(hash(k));
  x.drawImage(TILES[under], 0, 0); x.drawImage(TILES[top], 0, 0, 16, 5, 0, 0, 16, 5);
  for (let i = 0; i < 16; i++) if (r() < .45) x.drawImage(TILES[top], i, 5, 1, 1 + (r() * 2 | 0), i, 5, 1, 1 + (r() * 2 | 0));
  x.fillStyle = 'rgba(255,255,255,.22)'; x.fillRect(0, 0, 16, 1);
  TILES[k] = c; return c;
}

/* ---------- scenery props (origin: bottom centre on the ground) ---------- */
const PROP = {
  oak(x, y, t, s) { const d = Math.round(Math.sin(t * 1.3 + s) * 1); box(x - 2, y - 15, 5, 15, '#7a4f2a'); box(x - 11 + d, y - 24, 23, 8, '#35862f'); box(x - 9 + d, y - 30, 19, 8, '#3f9a3a'); box(x - 5 + d, y - 35, 11, 6, '#4bb043'); px('#2c7028', x - 7 + d, y - 21, 3, 2); px('#5cc452', x - 2 + d, y - 32, 3, 1); },
  apple(x, y, t, s) { PROP.oak(x, y, t, s); const d = Math.round(Math.sin(t * 1.3 + s)); for (const [a, b] of [[-7, -22], [3, -27], [6, -20], [-2, -31]]) px('#e5342b', x + a + d, y + b, 2, 2); },
  jungle(x, y, t, s) { const d = Math.round(Math.sin(t * 1.1 + s)); box(x - 3, y - 26, 6, 26, '#6a4a2a'); px('#54391f', x - 1, y - 20, 1, 14); box(x - 15 + d, y - 34, 31, 8, '#256e2c'); box(x - 12 + d, y - 41, 25, 8, '#2e8535'); box(x - 7 + d, y - 46, 15, 6, '#3a9b40'); for (const [a, l] of [[-12, 9], [-6, 6], [9, 11], [13, 5]]) px('#1f5c26', x + a + d, y - 27, 1, l); px('#ff6fa8', x + 9 + d, y - 17, 2, 2); },
  acacia(x, y, t, s) { box(x - 2, y - 16, 4, 16, '#7a5a34'); px('#7a5a34', x + 2, y - 18, 2, 4); px('#7a5a34', x - 5, y - 19, 3, 4); box(x - 17, y - 24, 35, 6, '#7d9a3a'); box(x - 12, y - 28, 25, 5, '#8eae46'); px('#6a8530', x - 14, y - 19, 8, 1); px('#6a8530', x + 5, y - 19, 9, 1); },
  pine(x, y, t, s) { box(x - 2, y - 7, 4, 7, '#6a4a2a'); for (let i = 0; i < 4; i++) { const w = 20 - i * 4; box(x - w / 2, y - 14 - i * 6, w, 7, i % 2 ? '#2a6e4a' : '#246040'); } px('#246040', x - 1, y - 35, 3, 3); },
  snowpine(x, y, t, s) { PROP.pine(x, y, t, s); for (let i = 0; i < 4; i++) { const w = 20 - i * 4; px('#f4f8fc', x - w / 2 + 1, y - 14 - i * 6, w - 2, 2); } px('#f4f8fc', x - 1, y - 35, 3, 1); },
  palm(x, y, t, s) { const d = Math.round(Math.sin(t * 1.4 + s)); for (let i = 0; i < 6; i++) box(x - 2 + Math.round(i * .8), y - 5 - i * 5, 4, 5, i % 2 ? '#a07a48' : '#8e6a3c'); const tx = x + 4, ty = y - 30; box(tx - 12 + d, ty - 2, 10, 3, '#3f9a3a'); box(tx + 2 + d, ty - 2, 10, 3, '#3f9a3a'); box(tx - 15 + d, ty + 1, 5, 3, '#35862f'); box(tx + 10 + d, ty + 1, 5, 3, '#35862f'); box(tx - 7 + d, ty - 6, 6, 3, '#4bb043'); box(tx + 1 + d, ty - 6, 6, 3, '#4bb043'); px('#6a4a2a', tx - 1, ty, 2, 2); px('#6a4a2a', tx + 1, ty + 1, 2, 2); },
  cactus(x, y) { box(x - 3, y - 20, 6, 20, '#3f8f4a'); box(x - 8, y - 14, 4, 3, '#3f8f4a'); box(x - 8, y - 18, 3, 5, '#3f8f4a'); box(x + 4, y - 11, 4, 3, '#3f8f4a'); box(x + 6, y - 16, 3, 6, '#3f8f4a'); px('#ff7ab0', x - 1, y - 22, 2, 2); px('#2f7438', x - 1, y - 17, 1, 14); },
  dead(x, y) { box(x - 2, y - 18, 4, 18, '#4a3a34'); px('#4a3a34', x + 2, y - 15, 5, 2); px('#4a3a34', x + 6, y - 19, 2, 5); px('#4a3a34', x - 6, y - 12, 4, 2); px('#4a3a34', x - 7, y - 16, 2, 5); },
  /* hiding places */
  bush(x, y, t, s) { box(x - 10, y - 9, 20, 9, '#3f9a3a'); box(x - 6, y - 13, 13, 5, '#4bb043'); px('#2f7a2c', x - 6, y - 5, 3, 2); px('#2f7a2c', x + 3, y - 7, 3, 2); px('#e5342b', x - 3, y - 9, 2, 2); px('#e5342b', x + 6, y - 5, 2, 2); },
  fern(x, y, t, s) { const hs = [7, 10, 13, 11, 14, 12, 14, 10, 12, 8]; for (let i = 0; i < 10; i++) { const h = hs[i]; px(i % 2 ? '#3a9b40' : '#2e8535', x - 10 + i * 2, y - h, 2, h); px('#58bf58', x - 10 + i * 2, y - h, 1, 2); } },
  log(x, y) { box(x - 12, y - 8, 24, 8, '#7a4f2a'); px('#5f3c1f', x - 8, y - 5, 12, 1); box(x - 12, y - 8, 4, 8, '#c89a5a'); px('#a67a40', x - 11, y - 5, 2, 2); px('#3f9a3a', x + 2, y - 9, 5, 1); },
  igloo(x, y) { box(x - 12, y - 8, 24, 8, '#e4f0f8'); box(x - 10, y - 12, 20, 5, '#eef6fc'); box(x - 6, y - 15, 12, 4, '#f6fbff'); px('#b8d2e6', x - 12, y - 5, 24, 1); px('#b8d2e6', x - 4, y - 12, 1, 4); px('#b8d2e6', x + 5, y - 9, 1, 4); box(x - 3, y - 7, 7, 7, '#35506e'); },
  snowpile(x, y) { box(x - 11, y - 6, 22, 6, '#e8f1f9'); box(x - 7, y - 10, 15, 5, '#f4f9fd'); box(x - 3, y - 12, 7, 3, '#ffffff'); },
  iceblock(x, y) { box(x - 9, y - 13, 18, 13, '#a8dcf0'); px('#d8f2fb', x - 6, y - 10, 2, 6); px('#d8f2fb', x - 3, y - 11, 1, 3); px('#88c4de', x + 3, y - 6, 4, 1); },
  shell(x, y) { box(x - 9, y - 8, 18, 8, '#f3c9b0'); box(x - 6, y - 12, 12, 5, '#f7d8c4'); px('#e0a088', x - 6, y - 6, 2, 5); px('#e0a088', x - 1, y - 9, 2, 8); px('#e0a088', x + 4, y - 6, 2, 5); px('#fff0e6', x - 3, y - 11, 3, 1); },
  sandcastle(x, y) { box(x - 10, y - 8, 20, 8, '#e0c070'); box(x - 11, y - 13, 5, 6, '#e8cc80'); box(x + 6, y - 13, 5, 6, '#e8cc80'); box(x - 3, y - 12, 6, 5, '#e8cc80'); px('#8a6a30', x - 1, y - 5, 3, 5); px('#7a5a2a', x, y - 17, 1, 5); px('#e5342b', x + 1, y - 17, 3, 2); },
  driftwood(x, y) { box(x - 12, y - 6, 24, 6, '#a89a88'); box(x - 5, y - 10, 5, 5, '#b8aa98'); px('#8a7c6c', x - 8, y - 4, 10, 1); box(x + 5, y - 9, 4, 4, '#a89a88'); },
  tallgrass(x, y, t, s) { const hs = [8, 11, 9, 13, 10, 12, 9, 13, 11, 8, 10]; const d = Math.round(Math.sin(t * 2 + s)); for (let i = 0; i < 11; i++) { px(i % 2 ? '#d8c056' : '#c2a843', x - 11 + i * 2, y - hs[i], 2, hs[i]); px('#efe08c', x - 11 + i * 2 + d, y - hs[i] - 1, 1, 2); } },
  termite(x, y) { box(x - 8, y - 9, 16, 9, '#b0703c'); box(x - 6, y - 14, 11, 6, '#b97a44'); box(x - 3, y - 18, 6, 5, '#c28550'); px('#8a5228', x - 3, y - 7, 2, 3); px('#8a5228', x + 2, y - 12, 2, 2); },
  rock(x, y) { box(x - 10, y - 8, 20, 8, '#8d9199'); box(x - 6, y - 12, 12, 5, '#9da1a9'); px('#74787f', x - 5, y - 5, 4, 1); px('#74787f', x + 3, y - 3, 3, 1); },
  sandrock(x, y) { box(x - 10, y - 8, 20, 8, '#c9a45e'); box(x - 6, y - 12, 13, 5, '#d6b470'); px('#a8844a', x - 5, y - 5, 5, 1); px('#a8844a', x + 2, y - 9, 3, 1); },
  reeds(x, y, t, s) { const d = Math.round(Math.sin(t * 1.8 + s)); const hs = [12, 15, 11, 16, 13, 15, 10, 14]; for (let i = 0; i < 8; i++) { px(i % 2 ? '#5aa04a' : '#4a8a3c', x - 9 + i * 2 + (i % 3 ? 1 : 0), y - hs[i], 2, hs[i]); if (i % 2 === 1) px('#6a4424', x - 9 + i * 2 + d, y - hs[i] - 3, 2, 4); } },
  lavarock(x, y) { box(x - 10, y - 9, 20, 9, '#3a3440'); box(x - 6, y - 13, 12, 5, '#463f4e'); px('#ff7a1a', x - 5, y - 6, 3, 1); px('#ff7a1a', x - 3, y - 5, 1, 3); px('#ffc23a', x + 4, y - 4, 2, 1); },
  vent(x, y, t) { box(x - 9, y - 7, 18, 7, '#4a4350'); box(x - 6, y - 11, 4, 5, '#544c5a'); box(x + 2, y - 11, 4, 5, '#544c5a'); px(((t * 4) | 0) % 2 ? '#ff7a1a' : '#ffb02e', x - 2, y - 8, 4, 2); },
  flowerpot(x, y) { box(x - 7, y - 7, 14, 7, '#c0623a'); px('#d87a4e', x - 8, y - 8, 16, 2); box(x - 9, y - 15, 18, 8, '#3f9a3a'); px('#ff7ab0', x - 6, y - 14, 2, 2); px('#ffd23f', x, y - 16, 2, 2); px('#ff7ab0', x + 5, y - 13, 2, 2); },
  barrel(x, y) { box(x - 8, y - 12, 16, 12, '#9a6a3a'); px('#5a5a62', x - 8, y - 10, 16, 1); px('#5a5a62', x - 8, y - 3, 16, 1); px('#7d5228', x - 3, y - 12, 1, 12); px('#7d5228', x + 3, y - 12, 1, 12); },
  crate(x, y) { box(x - 9, y - 12, 18, 12, '#b98545'); px('#8a5e2a', x - 9, y - 12, 18, 1); px('#8a5e2a', x - 9, y - 7, 18, 1); px('#8a5e2a', x - 1, y - 12, 2, 12); },
  boulder(x, y) { box(x - 12, y - 10, 24, 10, '#7f838b'); box(x - 8, y - 15, 15, 6, '#8f939b'); px('#f4f8fc', x - 7, y - 16, 12, 2); px('#666a72', x - 6, y - 6, 5, 1); px('#666a72', x + 4, y - 9, 4, 1); },
  urn(x, y) { box(x - 6, y - 11, 12, 11, '#c0703c'); box(x - 8, y - 9, 16, 6, '#c8794a'); px('#d88a58', x - 4, y - 14, 8, 3); px('#8a4a22', x - 7, y - 6, 14, 1); px('#f0e0a0', x - 5, y - 8, 2, 1); px('#f0e0a0', x - 1, y - 8, 2, 1); px('#f0e0a0', x + 3, y - 8, 2, 1); },
  cactusclump(x, y) { box(x - 10, y - 9, 6, 9, '#3f8f4a'); box(x - 3, y - 13, 7, 13, '#4a9a55'); box(x + 5, y - 8, 6, 8, '#3f8f4a'); px('#ff7ab0', x - 1, y - 15, 2, 2); px('#ffd23f', x + 7, y - 10, 2, 2); },
  /* small decorations */
  flower(x, y, t, s) { px('#3f8a3c', x, y - 4, 1, 4); px(['#ff6fa8', '#ffd23f', '#fff', '#b07af0', '#ff7a3a'][(s | 0) % 5], x - 1, y - 6, 3, 3); px('#ffe98a', x, y - 5, 1, 1); },
  mushroom(x, y) { px('#f0e6d8', x, y - 3, 2, 3); px('#e5342b', x - 2, y - 6, 6, 3); px('#fff', x - 1, y - 5, 1, 1); px('#fff', x + 2, y - 6, 1, 1); },
  tuft(x, y, t, s) { px('#4f9432', x - 2, y - 3, 1, 3); px('#6fbb48', x, y - 5, 1, 5); px('#4f9432', x + 2, y - 4, 1, 4); },
  drytuft(x, y) { px('#b39c45', x - 2, y - 3, 1, 3); px('#e3d27e', x, y - 5, 1, 5); px('#b39c45', x + 2, y - 4, 1, 4); },
  pebble(x, y) { box(x - 2, y - 3, 5, 3, '#8d9199'); },
  starfish(x, y) { px('#ff8a5a', x - 2, y - 2, 5, 1); px('#ff8a5a', x, y - 4, 1, 4); px('#ff8a5a', x - 1, y - 3, 3, 2); },
  snowman(x, y) { box(x - 5, y - 8, 10, 8, '#fff'); box(x - 4, y - 14, 8, 7, '#fff'); px('#222', x - 2, y - 12, 1, 1); px('#222', x + 1, y - 12, 1, 1); px('#f08a24', x, y - 10, 3, 1); px('#222', x - 4, y - 16, 8, 2); px('#222', x - 3, y - 19, 6, 3); px('#e5342b', x - 4, y - 8, 8, 1); },
  bones(x, y) { px('#3f8f4a', x - 1, y - 6, 3, 6); px('#3f8f4a', x - 3, y - 4, 2, 2); },
  lily(x, y) { px('#4aa04a', x - 3, y - 1, 7, 2); px('#ff9ac8', x, y - 3, 2, 2); },
  ember(x, y, t) { px(((t * 3) | 0) % 2 ? '#ff7a1a' : '#ffc23a', x - 2, y - 2, 4, 2); px('#3a3440', x - 3, y - 1, 6, 1); },
  fencebit(x, y) { for (let i = -1; i <= 1; i++) box(x + i * 6 - 1, y - 10, 3, 10, '#c79a5a'); px('#a67a40', x - 8, y - 8, 17, 2); px('#a67a40', x - 8, y - 4, 17, 2); },
  birdhouse(x, y) { px('#7a5a34', x, y - 14, 2, 14); box(x - 4, y - 21, 10, 8, '#d8a05a'); px('#b8483c', x - 5, y - 23, 12, 3); px('#3a2a1a', x, y - 18, 2, 2); },
  tent(x, y) { box(x - 12, y - 6, 24, 6, '#e0763a'); box(x - 9, y - 11, 18, 5, '#ea8448'); box(x - 5, y - 15, 10, 4, '#f29358'); px('#5a3a1a', x - 3, y - 9, 6, 9); px('#fff', x - 12, y - 1, 24, 1); px('#7a5a34', x, y - 24, 1, 9); px('#3fa34d', x + 1, y - 24, 6, 4); px('#fff', x + 3, y - 23, 2, 2); },
  hut(x, y) { box(x - 16, y - 16, 32, 16, '#b98545'); px('#8a5e2a', x - 16, y - 11, 32, 1); px('#8a5e2a', x - 16, y - 6, 32, 1); box(x - 19, y - 22, 38, 7, '#b8483c'); box(x - 14, y - 27, 28, 6, '#c9584a'); box(x - 4, y - 11, 8, 11, '#5a3a1a'); px('#ffe27a', x - 12, y - 12, 5, 5); px('#ffe27a', x + 7, y - 12, 5, 5); px('#7a5a34', x + 16, y - 36, 1, 20); px('#3fa34d', x + 17, y - 36, 8, 5); px('#fff', x + 20, y - 35, 2, 3); },
  campfire(x, y, t) { px('#5a3a1a', x - 5, y - 2, 10, 2); px('#3a2a1a', x - 3, y - 3, 6, 1); const f = (t * 8) | 0; px('#ff7a1a', x - 3, y - 7 - f % 2, 6, 5 + f % 2); px('#ffc23a', x - 2, y - 6, 4, 4); px('#fff2a8', x - 1 + f % 2, y - 5, 2, 2); px('#ff7a1a', x - 1 + (f % 3) - 1, y - 10 - f % 2, 2, 3); },
  sign(x, y) { px('#7a5a34', x - 1, y - 9, 2, 9); box(x - 6, y - 15, 12, 7, '#d8b06a'); px('#7a5a34', x - 4, y - 13, 8, 1); px('#7a5a34', x - 4, y - 11, 6, 1); }
};
const PROP_H = { bush: 13, fern: 13, log: 8, igloo: 15, snowpile: 12, iceblock: 13, shell: 12, sandcastle: 13, driftwood: 9, tallgrass: 12, termite: 18, rock: 12, sandrock: 12, reeds: 15, lavarock: 13, vent: 11, flowerpot: 15, barrel: 12, crate: 12, boulder: 16, urn: 14, cactusclump: 13 };

/* ---------- animals (side view, facing right, feet at y=0) ---------- */
function eye(x, y, t, k) { const bl = EYES_SHUT || (t + k * .7) % 3.4 < .13; if (bl) px('#3a2a2a', x, y + 1, 2, 1); else { px('#16161c', x, y, 2, 2); px('#ffffff', x, y, 1, 1); } }
function quad(o, b, t, wk) {
  const bw = b ? Math.round(o.bw * .6) : o.bw, bh = b ? Math.max(4, Math.round(o.bh * .6)) : o.bh, lh = b ? Math.max(2, Math.round(o.lh * .55)) : o.lh;
  const hw = b ? Math.max(6, Math.round(o.hw * .85)) : o.hw, hh = b ? Math.max(5, Math.round(o.hh * .85)) : o.hh;
  const lw = b ? 2 : 3, sw = wk ? Math.round(Math.sin(wk * 12) * 1.5) : 0;
  const x0 = -Math.round(bw / 2) - (b ? 1 : 2), by = -lh - bh;
  const lc = o.leg || shade(o.c, -.12), fc = shade(lc, -.2);
  if (o.tail) o.tail(x0, by, bw, bh, b, t);
  px(fc, x0 + 2 - sw, -lh, lw, lh); px(fc, x0 + bw - lw - 2 + sw, -lh, lw, lh);
  px(lc, x0 + sw, -lh, lw, lh); px(lc, x0 + bw - lw - sw, -lh, lw, lh);
  box(x0, by, bw, bh, o.c);
  if (o.body) o.body(x0, by, bw, bh, b, t);
  const bob = (!wk && Math.sin(t * 2.4 + bw) > .75) ? 1 : 0;
  const hx = x0 + bw - Math.round(hw * .55) + (o.hx || 0), hy = by - (o.hy != null ? (b ? Math.round(o.hy * .7) : o.hy) : Math.round(hh * .45)) + bob;
  if (o.pre) o.pre(hx, hy, hw, hh, b, by, t);
  box(hx, hy, hw, hh, o.hc || o.c);
  const ec = o.ec || o.hc || o.c;
  if (o.ear === 'round') { box(hx, hy - 2, 3, 3, ec); box(hx + hw - 4, hy - 2, 3, 3, ec); }
  else if (o.ear === 'point') { px(ec, hx, hy - 2, 2, 2); px(ec, hx, hy - 3, 1, 1); px(ec, hx + hw - 3, hy - 2, 2, 2); px(ec, hx + hw - 2, hy - 3, 1, 1); }
  else if (o.ear === 'tiny') { px(shade(ec, -.2), hx + 1, hy - 1, 2, 1); }
  if (o.sn) px(o.sn, hx + hw - 3, hy + hh - 4, 3, 4);
  if (o.nose !== 0) px(o.nose || '#1c1c1c', hx + hw - 1, hy + hh - 4, 1, 2);
  eye(hx + hw - 5, hy + Math.round(hh * .3), t, bw);
  if (o.post) o.post(hx, hy, hw, hh, b, t);
}
const ANI = {
  gorilla(b, t, wk) {
    quad({ bw: 16, bh: 11, lh: 5, hw: 9, hh: 9, c: '#3c3c44', hc: '#34343c', nose: 0,
      body(x0, by, bw, bh, b) { px('#56565e', x0 + 2, by + 1, bw - 5, 2); },
      post(hx, hy, hw, hh, b, t) { px('#7a7a84', hx + hw - 5, hy + 3, 5, hh - 4); px('#2a2a30', hx + hw - 6, hy + 2, 6, 1); eye(hx + hw - 4, hy + 4, t, 3); px('#4a4a52', hx + hw - 3, hy + hh - 2, 3, 1); px('#34343c', hx + 2, hy - 1, hw - 4, 1); } }, b, t, wk);
  },
  polarbear(b, t, wk) {
    quad({ bw: 20, bh: 10, lh: 5, hw: 9, hh: 8, c: '#f1f4f7', leg: '#dfe5ea', ear: 'round', sn: '#dfe5ea', tail(x0, by) { px('#dfe5ea', x0 - 1, by + 2, 1, 2); } }, b, t, wk);
  },
  turtle(b, t, wk) {
    const w = b ? 9 : 15, h = b ? 5 : 8, x0 = -(w >> 1) - 1, fl = wk ? Math.round(Math.sin(wk * 12)) : 0;
    px('#7ac28a', x0 - 1 + fl, -2, 3, 2); px('#7ac28a', x0 + w - 3 - fl, -2, 4, 2);
    box(x0, -h - 1, w, h, '#3f8f5a'); px('#2f7446', x0 + 2, -h + 1, 2, 2); px('#2f7446', x0 + w - 4, -h + 1, 2, 2);
    if (!b) { px('#2f7446', x0 + 6, -h + 3, 3, 2); box(x0 + 2, -h - 3, w - 4, 3, '#4aa368'); } else px('#4aa368', x0 + 2, -h - 2, w - 4, 1);
    px('#e6d98a', x0 + 1, -2, w - 2, 1);
    const hs = b ? 4 : 5, hx = x0 + w - 1, hy = -h + (b ? 0 : 1) + ((Math.sin(t * 2) > .7 && !wk) ? 1 : 0);
    box(hx, hy, hs, hs, '#8fd19c'); eye(hx + hs - 3, hy + 1, t, 2);
  },
  lion(b, t, wk) {
    quad({ bw: 19, bh: 9, lh: 6, hw: 9, hh: 8, c: '#dba545', ear: 'round', sn: '#f3ddb0', nose: '#7a3a2a',
      tail(x0, by, bw, bh, b, t) { const w = Math.round(Math.sin(t * 3)); px('#c9943a', x0 - 4, by + 1 + w, 4, 1); px('#c9943a', x0 - 5, by - 2 + w, 1, 4); px('#6b4420', x0 - 6, by - 4 + w, 2, 2); },
      body(x0, by, bw, bh, b) { if (b) { px('#c08a30', x0 + 2, by + 1, 1, 1); px('#c08a30', x0 + 5, by + 2, 1, 1); px('#c08a30', x0 + 8, by + 1, 1, 1); } px('#f3ddb0', x0 + 2, by + bh - 2, bw - 5, 1); },
      pre(hx, hy, hw, hh, b) { if (!b) { box(hx - 3, hy - 3, hw + 3, hh + 6, '#8a5a22'); px('#734a1a', hx - 1, hy + hh + 1, 2, 2); } } }, b, t, wk);
  },
  capybara(b, t, wk) {
    quad({ bw: 18, bh: 10, lh: 4, hw: 10, hh: 7, c: '#9a6b3c', ear: 'tiny', nose: '#4a2e18', hx: 1,
      body(x0, by, bw, bh) { px('#b07f4c', x0 + 2, by + 1, bw - 6, 1); },
      post(hx, hy, hw, hh) { px('#855a30', hx + hw - 2, hy + 2, 2, hh - 3); } }, b, t, wk);
  },
  flamingo(b, t, wk) {
    const sw = wk ? Math.round(Math.sin(wk * 12)) : 0;
    if (b) {
      px('#8a8f98', -2 + sw, -3, 1, 3); px('#8a8f98', 1 - sw, -3, 1, 3);
      box(-4, -9, 8, 6, '#cfd3d8'); px('#b9bec4', -3, -7, 4, 2);
      const hy = -14 + ((Math.sin(t * 2.4) > .75 && !wk) ? 1 : 0);
      box(0, hy, 6, 6, '#e1e4e8'); px('#b0808a', 6, hy + 3, 2, 2); eye(3, hy + 1, t, 1);
    } else {
      px('#e0607f', -1 + sw, -10, 1, 10); px('#e0607f', -2 + sw, -1, 3, 1);
      if (wk) { px('#e0607f', 2 - sw, -10, 1, 10); } else { px('#e0607f', 2, -10, 1, 5); px('#e0607f', 2, -6, 3, 1); }
      box(-6, -17, 11, 7, '#ff8fb0'); px('#f0709a', -5, -15, 7, 3); px('#f0709a', -8, -16, 2, 2);
      px('#ff8fb0', 3, -21, 2, 5); px('#ff8fb0', 5, -25, 2, 5);
      const hy = -29 + ((Math.sin(t * 2) > .8 && !wk) ? 1 : 0);
      box(5, hy, 5, 4, '#ff9ab8'); px('#f5e0d0', 10, hy + 2, 2, 2); px('#222', 10, hy + 4, 2, 2); eye(7, hy + 1, t, 4);
    }
  },
  hedgehog(b, t, wk) {
    const w = b ? 9 : 14, h = b ? 6 : 9, x0 = -(w >> 1) - 2, sw = wk ? Math.round(Math.sin(wk * 12)) : 0;
    px('#5a4030', x0 + 1 + sw, -1, 2, 1); px('#5a4030', x0 + w - 3 - sw, -1, 2, 1);
    box(x0, -h - 1, w, h, '#7a5a3a');
    for (let i = 0; i < w; i += 2) { px('#d9bb8a', x0 + i, -h - 2 + ((i >> 1) % 2), 1, 2); px('#d9bb8a', x0 + i + 1, -h + 2 + ((i >> 1) % 2) * 2, 1, 1); }
    const fs = b ? 4 : 5, fx = x0 + w - 1, fy = -fs - 1;
    box(fx, fy, fs, fs, '#ecd6b0'); px('#1c1c1c', fx + fs, fy + fs - 2, 1, 1); eye(fx + fs - 3, fy + 1, t, 5);
  },
  duck(b, t, wk) {
    const sw = wk ? Math.round(Math.sin(wk * 12)) : 0;
    if (b) {
      px('#f08a24', -2 + sw, -1, 2, 1); px('#f08a24', 1 - sw, -1, 2, 1);
      box(-4, -6, 8, 5, '#ffd84a'); px('#f0c030', -3, -4, 4, 2);
      const hy = -11 + ((Math.sin(t * 3) > .75 && !wk) ? 1 : 0);
      box(1, hy, 6, 6, '#ffe36a'); px('#f08a24', 7, hy + 3, 2, 2); eye(4, hy + 1, t, 6);
    } else {
      px('#f08a24', -3 + sw, -2, 2, 2); px('#f08a24', 1 - sw, -2, 2, 2);
      box(-9, -10, 15, 8, '#9a7a56'); box(-7, -9, 9, 5, '#7a5e40'); px('#3a3a3a', -11, -11, 3, 2); px('#6a3a2a', 3, -9, 3, 6); px('#fff', 3, -11, 5, 1);
      const hy = -17 + ((Math.sin(t * 2.2) > .75 && !wk) ? 1 : 0);
      box(3, hy, 7, 6, '#1f8a52'); px('#f2c230', 10, hy + 3, 3, 2); eye(7, hy + 1, t, 6);
    }
  },
  snowleopard(b, t, wk) {
    quad({ bw: 20, bh: 8, lh: 6, hw: 8, hh: 7, c: '#d9dce1', ear: 'round', sn: '#ffffff', nose: '#c07a8a',
      tail(x0, by, bw, bh, b, t) { const w = Math.round(Math.sin(t * 2.5)); box(x0 - 6, by + 2, 7, 3, '#d9dce1'); box(x0 - 9, by - 2 + w, 4, 5, '#d9dce1'); px('#5a5f68', x0 - 4, by + 3, 1, 1); px('#5a5f68', x0 - 8, by + w, 2, 1); },
      body(x0, by, bw, bh) { for (const [a, c] of [[2, 1], [6, 3], [10, 1], [14, 3], [4, 5], [12, 5]]) if (a < bw - 2 && c < bh - 1) px('#5a5f68', x0 + a, by + c, 2, 1); } }, b, t, wk);
  },
  camel(b, t, wk) {
    quad({ bw: 18, bh: 8, lh: 9, hw: 6, hh: 5, c: '#cfa56a', hy: 9, hx: 4, nose: '#7a5a34', ear: 'tiny',
      tail(x0, by) { px('#b88c50', x0 - 1, by + 1, 1, 5); },
      body(x0, by, bw, bh, b) { const hw2 = b ? 5 : 8; box(x0 + Math.round(bw / 2) - (hw2 >> 1) - 1, by - (b ? 3 : 4), hw2, b ? 4 : 5, '#cfa56a'); },
      pre(hx, hy, hw, hh, b, by) { px('#cfa56a', hx, hy + hh - 1, 3, by - hy - hh + 4); px('#b88c50', hx + 2, hy + hh, 1, by - hy - hh + 2); } }, b, t, wk);
  }
};
const BABY_H = { gorilla: 11, polarbear: 10, turtle: 7, lion: 10, capybara: 9, flamingo: 14, hedgehog: 8, duck: 11, snowleopard: 10, camel: 13 };
function drawAnimal(id, x, y, o = {}) {
  g.save(); g.translate(Math.round(x), Math.round(y)); if (o.flip) g.scale(-1, 1);
  ANI[id](!!o.b, o.t || 0, o.wk || 0); g.restore();
}
const _url = {};
function portrait(id, b) {
  const k = id + (b ? 'b' : 'a'); if (_url[k]) return _url[k];
  const c = document.createElement('canvas'); c.width = 44; c.height = 34; const x = c.getContext('2d');
  withCtx(x, () => drawAnimal(id, 22, 32, { b, t: 1 }));
  return _url[k] = c.toDataURL();
}

/* ---------- Arlo ---------- */
function drawArlo(x, y, o = {}) {
  x = Math.round(x); y = Math.round(y);
  const dir = o.dir || 'side', wk = o.wk || 0, sw = wk ? Math.round(Math.sin(wk * 14) * 2) : 0, pose = o.pose || '';
  const cr = pose === 'search' ? 3 : 0, hop = pose === 'cheer' ? -Math.abs(Math.round(Math.sin((o.t || 0) * 10) * 3)) : 0;
  g.save(); g.translate(x, y + hop); if (o.flip) g.scale(-1, 1);
  const SK = '#f2c79a', SH = '#3fa34d', PA = '#3b5fa8', HAT = '#a06a35', HA2 = '#8a5a2b', BP = '#e08a2e', HAIR = window.RANGER_HAIR || '#6b4226';
  if (dir === 'side') {
    const air = o.air ? 2 : 0;
    px(shade(PA, -.2), -1 - sw - air, -6, 3, 6); px('#3a2a1a', -1 - sw - air, -2, 4, 2);
    px(PA, -2 + sw + air, -6, 3, 6); px('#4a3420', -2 + sw + air, -2, 4, 2);
    box(-6, -16 + cr, 4, 9, BP); px('#b86a1a', -6, -12 + cr, 4, 1);
    if (o.carry) { const c = ANIMALS[o.carry].col; box(-8, -22 + cr, 6, 6, c); px('#16161c', -5, -20 + cr, 2, 2); px('#fff', -5, -20 + cr, 1, 1); }
    box(-3, -16 + cr, 7, 10, SH); px('#5a3a1a', -3, -8 + cr, 7, 1);
    if (pose === 'search') { px(SH, 2, -13 + cr, 5, 2); px(SK, 7, -13 + cr, 2, 2); px('#ffe27a', 9, -14 + cr, 2, 3); }
    else if (pose === 'cheer') { px(SH, 1, -21, 2, 6); px(SK, 1, -23, 2, 2); }
    else if (pose === 'use') { const a = Math.round(Math.sin((o.t || 0) * 30) * 2); px(SH, 2, -14 + a, 5, 2); px(SK, 7, -14 + a, 2, 2); }
    else { px(shade(SH, -.15), 0 - sw, -15, 2, 6); px(SK, 0 - sw, -9, 2, 2); }
    box(-4, -24 + cr, 8, 8, SK); px(HAIR, -4, -24 + cr, 2, 6); px(HAIR, -4, -24 + cr, 6, 1);
    px('#16161c', 1, -21 + cr, 2, 2); px('#fff', 1, -21 + cr, 1, 1); px('#c97a5a', 2, -18 + cr, 2, 1);
    px(HA2, -6, -25 + cr, 12, 2); box(-4, -29 + cr, 8, 4, HAT); px('#3fa34d', -4, -26 + cr, 8, 1);
  } else {
    const back = dir === 'back';
    px(PA, -3, -6 + (sw > 0 ? -1 : 0), 3, 6); px(PA, 1, -6 + (sw < 0 ? -1 : 0), 3, 6); px('#3a2a1a', -3, -2, 3, 2); px('#3a2a1a', 1, -2, 3, 2);
    box(-4, -16, 9, 10, SH); px('#5a3a1a', -4, -8, 9, 1);
    px(shade(SH, -.15), -6, -15 + (sw > 0 ? 1 : 0), 2, 6); px(shade(SH, -.15), 5, -15 + (sw < 0 ? 1 : 0), 2, 6); px(SK, -6, -9, 2, 2); px(SK, 5, -9, 2, 2);
    if (back) { box(-3, -16, 7, 8, BP); px('#b86a1a', -3, -12, 7, 1); if (o.carry) { box(-3, -21, 6, 6, ANIMALS[o.carry].col); } }
    box(-4, -24, 9, 8, back ? HAIR : SK);
    if (!back) { px(HAIR, -4, -24, 9, 1); px('#16161c', -2, -21, 2, 2); px('#16161c', 2, -21, 2, 2); px('#fff', -2, -21, 1, 1); px('#fff', 2, -21, 1, 1); px('#c97a5a', 0, -18, 2, 1); }
    px(HA2, -6, -25, 13, 2); box(-4, -29, 9, 4, HAT); px('#3fa34d', -4, -26, 9, 1);
  }
  g.restore();
}

/* ---------- the Poacher: comical, never scary ---------- */
const _po = {};
function poacherSprite(weapon, f) {
  const k = weapon + f; if (_po[k]) return _po[k];
  const c = document.createElement('canvas'); c.width = 40; c.height = 50; const x = c.getContext('2d');
  withCtx(x, () => {
    g.save(); g.translate(20, 49);
    const KH = '#c9b06a', K2 = '#a88a4a', SK = '#e8b890', w = f ? 1 : 0;
    if (weapon === 'net') { px('#8a5a2a', 10 + w, -34, 2, 22); for (const [nx, ny, nw, nh] of [[6, -47, 10, 2], [4, -45, 2, 10], [16, -45, 2, 10], [6, -35, 10, 2]]) px('#e8e2d0', nx + w, ny, nw, nh); for (let k = 0; k < 3; k++) { px('rgba(255,255,255,.55)', 7 + k * 3 + w, -45, 1, 10); px('rgba(255,255,255,.55)', 6 + w, -43 + k * 3, 10, 1); } }
    if (weapon === 'spear' || weapon === 'both') { px('#8a5a2a', -14 - w, -40, 2, 40); px('#d0d4da', -15 - w, -44, 4, 5); px('#f0f2f5', -14 - w, -46, 2, 2); px('#e5342b', -15 - w, -38, 4, 1); }
    if (weapon === 'gun' || weapon === 'both') { px('#6a4a2a', 10 + w, -20, 4, 6); px('#5a5a62', 11 + w, -34, 3, 15); px('#7a7a84', 9 + w, -37, 7, 4); px('#fff', 10 + w, -40, 5, 3); px('#d8d8e0', 11 + w, -41, 3, 1); }
    box(-7, -3, 6, 3, '#3a2a1a'); box(1, -3, 6, 3, '#3a2a1a');
    px(SK, -5, -7, 3, 4); px(SK, 2, -7, 3, 4); px('#fff', -5, -5, 3, 1); px('#fff', 2, -5, 3, 1);
    box(-7, -12, 14, 5, K2);
    box(-9, -22, 18, 11, KH); px('#5a3a1a', -9, -13, 18, 2); px('#ffd23f', -1, -13, 3, 2); px(K2, -6, -19, 4, 4); px(K2, 3, -19, 4, 4); px('#8a7a3a', 0, -22, 1, 9);
    box(-12, -21, 3, 9, KH); box(9, -21, 3, 9, KH); px(SK, -12, -13, 3, 3); px(SK, 9, -13, 3, 3);
    box(-6, -31, 12, 10, SK);
    px('#fff', -4, -28, 3, 3); px('#fff', 2, -28, 3, 3); px('#16161c', -3, -27, 2, 2); px('#16161c', 2, -27, 2, 2);
    px('#4a2a12', -5, -30, 4, 1); px('#4a2a12', 2, -30, 4, 1); px('#4a2a12', -2, -29, 1, 1); px('#4a2a12', 1, -29, 1, 1);
    px('#d89a70', -1, -26, 2, 2);
    px('#4a2a12', -5, -24, 10, 2); px('#4a2a12', -7, -23, 3, 2); px('#4a2a12', 4, -23, 3, 2); px('#4a2a12', -8, -22, 2, 1); px('#4a2a12', 6, -22, 2, 1);
    px('#8a7a3a', -9, -33, 18, 2); box(-6, -38, 12, 5, '#a8964a'); px('#7a2a1a', -6, -35, 12, 1);
    g.restore();
  });
  return _po[k] = c;
}
function drawPoacher(x, y, o = {}) {
  const s = o.s || 1.5, c = poacherSprite(o.weapon || 'gun', ((o.t || 0) * 5 | 0) % 2), w = 40 * s, h = 50 * s;
  g.save(); g.translate(Math.round(x), Math.round(y));
  if (o.rot) g.rotate(o.rot);
  if (o.flip) g.scale(-1, 1);
  if (o.sc != null) g.scale(o.sc, o.sc);
  g.globalAlpha = o.alpha == null ? 1 : o.alpha;
  g.drawImage(c, -w / 2, -h, w, h);
  if (o.red) { g.globalCompositeOperation = 'source-atop'; }
  g.restore();
}

/* ---------- tiny creatures hiding as decoys ---------- */
const CRIT = {
  butterfly(x, y, t) { const f = ((t * 10) | 0) % 2; px('#ff7ab0', x - 2 - f, y - 2, 2, 3); px('#ffd23f', x + 1 + f, y - 2, 2, 3); px('#222', x, y - 2, 1, 3); },
  frog(x, y) { box(x - 3, y - 4, 7, 4, '#4aa04a'); px('#fff', x - 3, y - 6, 2, 2); px('#fff', x + 2, y - 6, 2, 2); px('#111', x - 2, y - 5, 1, 1); px('#111', x + 3, y - 5, 1, 1); },
  rabbit(x, y) { box(x - 3, y - 5, 7, 5, '#e8e0d4'); px('#e8e0d4', x + 1, y - 10, 2, 5); px('#e8e0d4', x + 4, y - 9, 1, 4); px('#111', x + 2, y - 4, 1, 1); px('#fff', x - 4, y - 3, 2, 2); },
  ladybird(x, y) { box(x - 2, y - 3, 5, 3, '#e5342b'); px('#111', x + 2, y - 3, 1, 3); px('#111', x - 1, y - 2, 1, 1); },
  crab(x, y, t) { const f = ((t * 8) | 0) % 2; box(x - 3, y - 4, 7, 3, '#ff6a4a'); px('#ff6a4a', x - 5, y - 5 - f, 2, 2); px('#ff6a4a', x + 4, y - 5 - f, 2, 2); px('#111', x - 1, y - 5, 1, 1); px('#111', x + 1, y - 5, 1, 1); px('#c84a30', x - 4 + f, y - 1, 1, 1); px('#c84a30', x + 3 - f, y - 1, 1, 1); },
  lizard(x, y) { px('#8ab04a', x - 5, y - 2, 9, 2); px('#8ab04a', x + 3, y - 3, 3, 2); px('#111', x + 5, y - 3, 1, 1); px('#6a9038', x - 7, y - 1, 3, 1); },
  snail(x, y) { px('#e8d8a8', x - 3, y - 2, 8, 2); box(x - 3, y - 6, 5, 5, '#c0703c'); px('#e8d8a8', x + 4, y - 5, 1, 3); },
  bird(x, y, t) { const f = ((t * 10) | 0) % 2; box(x - 3, y - 5, 6, 4, '#5a9ae0'); px('#3a7ac0', x - 4, y - 5 - f * 2, 3, 2); px('#f08a24', x + 3, y - 4, 2, 1); px('#111', x + 1, y - 4, 1, 1); }
};

/* ---------- item icons (16x16) ---------- */
const ICON = {
  hands() { box(4, 6, 8, 7, '#f2c79a'); px('#f2c79a', 4, 3, 2, 4); px('#f2c79a', 6, 2, 2, 5); px('#f2c79a', 8, 2, 2, 5); px('#f2c79a', 10, 3, 2, 4); px('#f2c79a', 2, 7, 2, 3); },
  axe() { px('#8a5a2a', 7, 3, 2, 12); box(8, 2, 6, 6, '#b8bcc4'); px('#e6e9ee', 13, 3, 1, 4); px('#8a8e96', 4, 3, 3, 3); },
  shovel() { px('#8a5a2a', 7, 1, 2, 9); px('#6a4420', 5, 1, 6, 2); box(5, 9, 6, 6, '#b8bcc4'); px('#8a8e96', 6, 14, 4, 1); },
  bucket() { box(3, 6, 10, 9, '#9aa0aa'); px('#6a707a', 3, 6, 10, 1); px('#6a707a', 2, 3, 1, 4); px('#6a707a', 13, 3, 1, 4); px('#6a707a', 3, 2, 10, 1); },
  bucketfull() { ICON.bucket(); px('#3f8fdc', 4, 6, 8, 2); px('#7cc0f2', 5, 6, 3, 1); },
  wood() { box(1, 5, 14, 7, '#7a4f2a'); box(1, 5, 4, 7, '#c89a5a'); px('#a67a40', 2, 8, 2, 2); px('#5f3c1f', 6, 8, 7, 1); },
  fence() { box(2, 3, 3, 12, '#c79a5a'); box(11, 3, 3, 12, '#c79a5a'); px('#a67a40', 0, 6, 16, 2); px('#a67a40', 0, 10, 16, 2); },
  gate() { box(1, 2, 2, 13, '#8a5a2a'); box(13, 2, 2, 13, '#8a5a2a'); box(3, 5, 10, 8, '#d8b06a'); px('#a67a40', 3, 8, 10, 1); px('#ffd23f', 10, 9, 2, 2); },
  sign() { px('#7a5a34', 7, 8, 2, 8); box(2, 1, 12, 8, '#d8b06a'); px('#7a5a34', 4, 3, 8, 1); px('#7a5a34', 4, 5, 6, 1); },
  trough() { box(1, 7, 14, 7, '#9a6a3a'); px('#3f8fdc', 2, 8, 12, 3); px('#7cc0f2', 3, 8, 4, 1); px('#7d5228', 2, 14, 2, 2); px('#7d5228', 12, 14, 2, 2); },
  bowl() { box(2, 8, 12, 6, '#c0623a'); px('#8a4226', 3, 8, 10, 2); px('#d87a4e', 1, 7, 14, 1); },
  shelter() { box(2, 7, 12, 8, '#b98545'); box(0, 3, 16, 5, '#b8483c'); px('#c9584a', 3, 1, 10, 2); px('#3a2a1a', 6, 10, 4, 5); },
  logpile() { box(1, 9, 7, 5, '#7a4f2a'); box(8, 9, 7, 5, '#7a4f2a'); box(4, 4, 8, 5, '#8a5a30'); px('#c89a5a', 1, 9, 2, 5); px('#c89a5a', 8, 9, 2, 5); px('#c89a5a', 4, 4, 2, 5); },
  sapling() { px('#7a4f2a', 7, 9, 2, 6); box(4, 3, 8, 7, '#4bb043'); px('#5a3a1a', 4, 14, 8, 1); },
  fruitsap() { ICON.sapling(); px('#e5342b', 5, 5, 2, 2); px('#e5342b', 9, 7, 2, 2); },
  palmsap() { px('#a07a48', 7, 8, 2, 7); box(2, 4, 5, 3, '#3f9a3a'); box(9, 4, 5, 3, '#3f9a3a'); px('#4bb043', 6, 2, 4, 3); px('#5a3a1a', 4, 14, 8, 1); },
  bush() { box(2, 6, 12, 9, '#3f9a3a'); box(4, 3, 8, 4, '#4bb043'); px('#2f7a2c', 5, 9, 2, 2); px('#2f7a2c', 10, 8, 2, 2); },
  reeds() { for (let i = 0; i < 5; i++) { px('#4a8a3c', 2 + i * 3, 4 + (i % 2) * 2, 2, 12 - (i % 2) * 2); px('#6a4424', 2 + i * 3, 1 + (i % 2) * 2, 2, 4); } },
  boulder() { box(1, 6, 14, 9, '#7f838b'); box(4, 3, 9, 4, '#8f939b'); px('#666a72', 4, 10, 4, 1); },
  flower() { px('#3f8a3c', 7, 7, 2, 8); px('#ff6fa8', 5, 2, 6, 6); px('#ffd23f', 7, 4, 2, 2); px('#3f8a3c', 4, 11, 3, 2); },
  fruit() { box(3, 5, 10, 9, '#e5342b'); px('#ff7a70', 5, 7, 2, 2); px('#7a4f2a', 7, 2, 2, 4); px('#3f9a3a', 9, 2, 4, 2); },
  fish() { box(4, 5, 9, 6, '#5a9ae0'); px('#5a9ae0', 1, 4, 3, 8); px('#fff', 10, 6, 2, 2); px('#111', 11, 7, 1, 1); px('#3a7ac0', 6, 9, 5, 1); },
  greens() { box(2, 3, 6, 10, '#4bb043'); box(8, 5, 6, 9, '#3f9a3a'); px('#2f7a2c', 4, 5, 1, 7); px('#2f7a2c', 10, 7, 1, 6); px('#7a4f2a', 7, 12, 2, 3); },
  meat() { box(3, 4, 9, 8, '#c0503a'); px('#e07a60', 5, 6, 3, 2); px('#f0ece0', 11, 10, 4, 2); px('#f0ece0', 13, 9, 2, 4); },
  shrimp() { box(4, 4, 8, 4, '#ff8a9a'); px('#ff8a9a', 10, 8, 3, 4); px('#ff8a9a', 6, 11, 5, 2); px('#111', 5, 5, 1, 1); px('#e06a7a', 2, 3, 3, 1); px('#e06a7a', 3, 12, 3, 2); },
  bugs() { box(3, 6, 6, 5, '#5a3a8a'); px('#111', 9, 7, 2, 3); px('#111', 2, 5, 1, 1); px('#111', 4, 11, 1, 1); px('#111', 7, 11, 1, 1); px('#e0a0a0', 10, 12, 5, 2); px('#e0a0a0', 12, 10, 2, 2); },
  seeds() { for (const [a, b] of [[3, 4], [8, 3], [11, 7], [5, 9], [9, 11], [3, 12]]) { px('#d8b04a', a, b, 3, 2); px('#b08a30', a + 1, b + 1, 2, 1); } },
  heart() { px('#e5342b', 3, 4, 4, 3); px('#e5342b', 9, 4, 4, 3); px('#e5342b', 2, 6, 12, 3); px('#e5342b', 4, 9, 8, 2); px('#e5342b', 6, 11, 4, 2); px('#ff8a80', 4, 5, 2, 1); },
  boat() { box(1, 8, 14, 5, '#a8642c'); px('#7a4420', 2, 13, 12, 1); px('#d89a54', 2, 8, 12, 1); px('#8a5a2a', 7, 1, 1, 7); px('#f4f4f4', 8, 2, 5, 4); },
  plank() { box(1, 3, 14, 4, '#c79a5a'); box(1, 9, 14, 4, '#b98545'); },
  lantern() { px('#555', 7, 1, 2, 2); box(5, 3, 6, 9, '#ffd23f'); px('#fff6c8', 7, 5, 2, 4); px('#555', 4, 12, 8, 2); px('#555', 4, 3, 8, 1); },
  bench() { box(2, 6, 12, 3, '#c79a5a'); px('#8a5a2a', 3, 9, 2, 5); px('#8a5a2a', 11, 9, 2, 5); box(2, 2, 12, 3, '#b98545'); },
  flag() { px('#8a5a2a', 4, 1, 2, 14); box(6, 2, 8, 6, '#e5342b'); px('#fff', 8, 4, 3, 2); },
  ball() { box(4, 5, 8, 8, '#e5342b'); px('#fff', 4, 8, 8, 2); px('#ffd23f', 7, 5, 2, 8); },
  lily() { box(2, 7, 12, 6, '#4aa04a'); px('#3a8a3a', 7, 7, 2, 3); px('#ff9ac8', 6, 4, 4, 4); px('#fff', 7, 5, 2, 2); },
  rod() { px('#8a5a2a', 3, 13, 2, 2); px('#8a5a2a', 5, 10, 2, 3); px('#8a5a2a', 7, 7, 2, 3); px('#8a5a2a', 9, 4, 2, 3); px('#8a5a2a', 11, 1, 2, 3); px('#ddd', 13, 2, 1, 9); px('#e5342b', 12, 11, 3, 3); },
  fencetool() { box(1, 3, 3, 12, '#c79a5a'); box(12, 3, 3, 12, '#c79a5a'); px('#a67a40', 4, 5, 8, 2); px('#a67a40', 4, 10, 8, 2); box(6, 1, 4, 14, '#d8b06a'); },
  gem() { px('#7cf0ff', 6, 3, 4, 2); px('#3ac8e8', 4, 5, 8, 4); px('#1a9ac8', 6, 9, 4, 3); px('#fff', 6, 5, 2, 2); },
  book() { box(2, 2, 12, 12, '#8a5a2a'); px('#f0e6c8', 4, 3, 9, 10); px('#3fa34d', 6, 5, 5, 2); px('#555', 6, 9, 5, 1); }
};
const BLOCK_TILE = { b_grass: 'grass', b_dry: 'dry', b_snow: 'snow', b_sand: 'sand', b_mud: 'mud', b_rock: 'rock', b_volc: 'volc', b_moss: 'moss' };
function iconURL(name) {
  if (_url['i' + name]) return _url['i' + name];
  const c = document.createElement('canvas'); c.width = c.height = 16; const x = c.getContext('2d');
  if (BLOCK_TILE[name]) { x.drawImage(TILES[BLOCK_TILE[name]], 0, 0); x.fillStyle = 'rgba(255,255,255,.35)'; x.fillRect(0, 0, 16, 1); x.fillRect(0, 0, 1, 16); x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(0, 15, 16, 1); x.fillRect(15, 0, 1, 16); }
  else if (ICON[name]) withCtx(x, ICON[name]);
  return _url['i' + name] = c.toDataURL();
}
function iconCanvas(name) {
  const k = 'c' + name; if (_po[k]) return _po[k];
  const c = document.createElement('canvas'); c.width = c.height = 16; const x = c.getContext('2d');
  if (BLOCK_TILE[name]) x.drawImage(TILES[BLOCK_TILE[name]], 0, 0); else if (ICON[name]) withCtx(x, ICON[name]);
  return _po[k] = c;
}
