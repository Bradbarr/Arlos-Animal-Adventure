/* ============ THE SANCTUARY ISLAND ============
   One big island in the sea (128 x 128 tiles). The land climbs from beaches and sea cliffs up to the
   mountains in the north, with the volcano on the north-east corner of that high ground. Rain falls on the
   mountains and runs down a river to the lake and out through the jungle to the west coast. South of the jungle
   it gets drier: savanna, then desert in the south-west, red outback along the south. The cooler, wetter east has
   the British countryside: the Wild Wood and Woodland Park, with heather moor up towards the volcano.
   Building areas: Sanctuary Meadow (middle), Woodland Park (east), Great Plains (south), the Beach bay
   (south-east) and the whole sea around the island. */
const ZLIST = ['sea', 'meadow', 'park', 'plains', 'beach', 'cliffs', 'shore', 'volcano', 'snow', 'mountain', 'moor', 'forest', 'wildwood', 'lake', 'jungle', 'marsh', 'savanna', 'desert', 'outback'];
/* where each building area sits now, and where it was on the older maps (so nothing Arlo built is lost) */
const IRECT = { meadow: [48, 44, 79, 75], park: [88, 36, 114, 69], plains: [40, 80, 97, 105], bay: [96, 96, 127, 127] };
const OLDRECT = {
  96: [[16, 16, 47, 47, 'meadow'], [67, 18, 93, 51, 'park'], [3, 67, 60, 92, 'plains'], [64, 64, 95, 95, 'bay']],
  64: [[16, 16, 47, 47, 'meadow']]
};
const VOLC = { x: 106, y: 22 }, PEAKS = [[44, 15, 0], [57, 11, 1], [70, 17, 0], [50, 23, 0]];
Object.assign(ZONES, { cliffs: ['Sea Cliffs', 'High rocky cliffs. Dig ROCK here. Seabirds nest on the ledges.'], shore: ['Sandy Shore', 'Dig SAND here and collect shells.'] });
Object.assign(ZCOL, { cliffs: '#8b8f96', shore: '#f0dc9c', sea: '#2a6ac0' });
Object.assign(ZSPOT, { meadow: [64, 50], park: [100, 52], plains: [68, 92], beach: [100, 108], wildwood: [104, 30], moor: [88, 22], outback: [68, 110], jungle: [22, 50], forest: [62, 36], mountain: [66, 24], snow: [52, 16], volcano: [104, 30], desert: [22, 110], savanna: [24, 86], marsh: [42, 76], lake: [34, 56], cliffs: [30, 13], shore: [80, 116] });
O.PEAK = 52; SOLID.add(O.PEAK);

Object.assign(Sanct, {
  N: 128,
  noise(x, y, s) { const X = Math.floor(x / s), Y = Math.floor(y / s), fx = x / s - X, fy = y / s - Y, h = (a, b) => Story.h01(a * 73 + b * 191 + 7); const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy); return (h(X, Y) * (1 - u) + h(X + 1, Y) * u) * (1 - v) + (h(X, Y + 1) * (1 - u) + h(X + 1, Y + 1) * u) * v; },
  /* work out every tile's area once */
  buildZM() {
    const N = this.N, ZM = new Uint8Array(N * N), id = z => ZLIST.indexOf(z), inR = (x, y, r, m = 0) => x >= r[0] - m && x <= r[2] + m && y >= r[1] - m && y <= r[3] + m;
    const ell = (x, y, cx, cy, rx, ry) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 < 1;
    const land = new Uint8Array(N * N);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const px2 = Math.max(24 - x, 0, x - 103), py2 = Math.max(24 - y, 0, y - 103), d = Math.hypot(px2, py2), n = this.noise(x, y, 9) * 8 - 4 + this.noise(x + 50, y, 4) * 3;
      let L = d < 14 + n; if (inR(x, y, IRECT.meadow, 3) || inR(x, y, IRECT.park, 3) || inR(x, y, IRECT.plains, 3)) L = true;
      if (inR(x, y, IRECT.bay)) { const rx = x - 96 + 64, ry = y - 96 + 64; L = rx <= 73 || ry <= 66; }
      land[y * N + x] = L ? 1 : 0;
    }
    const nearSea = (x, y, r) => { for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= N || Y >= N || !land[Y * N + X]) return true; } return false; };
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const i = y * N + x; let z;
      if (!land[i]) z = 'sea';
      else if (inR(x, y, IRECT.bay)) z = 'beach';
      else if (inR(x, y, IRECT.meadow)) z = 'meadow';
      else if (inR(x, y, IRECT.park)) z = 'park';
      else if (inR(x, y, IRECT.plains)) z = 'plains';
      else if (nearSea(x, y, 2)) z = (y < 56 || x < 34) && !(x > 96 && y > 70) ? 'cliffs' : 'shore';
      else if (Math.hypot(x - VOLC.x, (y - VOLC.y) * 1.15) < 13) z = 'volcano';
      else if (ell(x, y, 54, 16, 15 + this.noise(x, y, 5) * 4, 7)) z = 'snow';
      else if (ell(x, y, 60, 21, 34, 12 + this.noise(x, y, 6) * 3)) z = 'mountain';
      else if (x >= 80 && x <= 100 && y < 34) z = 'moor';
      else if (ell(x, y, 34, 56, 10, 9)) z = 'lake';
      else if (ell(x, y, 42, 77, 10, 5)) z = 'marsh';
      else if (x < 40 && y < 79) z = 'jungle';
      else if (x < 40 && y < 97 - this.noise(x, y, 6) * 6) z = 'savanna';
      else if (x < 40) z = 'desert';
      else if (y > 105) z = 'outback';
      else if (x >= 80) z = 'wildwood';
      else if (y < 44) z = 'forest';
      else z = x < 48 ? 'jungle' : 'wildwood';
      ZM[i] = id(z);
    }
    this.ZM = ZM;
  },
  zoneAt(x, y) { if (!this.ZM) this.buildZM(); if (x < 0 || y < 0 || x >= this.N || y >= this.N) return 'sea'; return ZLIST[this.ZM[y * this.N + x]]; },

  /* ----- a brand new island ----- */
  newWorld() {
    const N = this.N, r = RNG((rnd() * 1e9) | 0), gnd = new Uint8Array(N * N), obj = new Uint8Array(N * N);
    this.genIsland(gnd, obj, r);
    DB.sanct = { gnd: '', obj: '', inv: { wood: 6, fence: 16, gate: 1, sign: 1, bowl: 1 }, water: 0, habs: [], meta: {}, port: {}, plan: [], fc: {}, fcol: 0, fst: 0, bps: [], v3: 1, v4: 1, island: 1, boat: false, time: 30, tool: 0, item: null, px: 64 * TS + 8, py: 48 * TS + 8, told: {}, doneAll: false };
    this.gnd = gnd; this.obj = obj; this.Z = DB.sanct; this.save(true);
  },
  genIsland(gnd, obj, r) {
    const N = this.N, set = (x, y, gg, o = 0) => { if (x < 0 || y < 0 || x >= N || y >= N) return; gnd[y * N + x] = gg; obj[y * N + x] = o; };
    const GZ = { sea: G.WATER, meadow: G.GRASS, park: G.GRASS, plains: G.DRY, beach: G.SAND, cliffs: G.ROCK, shore: G.SAND, volcano: G.VOLC, snow: G.SNOW, mountain: G.ROCK, moor: G.HEATH, forest: G.GRASS, wildwood: G.LEAF, lake: G.WATER, jungle: G.MOSS, marsh: G.MUD, savanna: G.DRY, desert: G.SAND, outback: G.REDSAND };
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const z = this.zoneAt(x, y), i = y * N + x, q = r(); let gg = GZ[z], o = 0;
      if (z === 'sea') o = q < .025 ? O.SEAWEED : 0;
      else if (z === 'beach') { const rx = x - 96 + 64; gg = rx <= 66 && y > 98 ? G.SHINGLE : G.SAND; o = q < .05 ? O.SHELLS : q < .08 ? O.BOULDER : 0; }
      else if (z === 'shore') o = q < .06 ? O.SHELLS : q < .08 ? O.PALM : 0;
      else if (z === 'cliffs') o = q < .1 ? O.BOULDER : q < .14 ? O.FLOWER : q < .2 ? O.TALL : 0;
      else if (z === 'meadow') { if (!(x >= 59 && x <= 69 && y >= 44 && y <= 52)) o = q < .035 ? O.TREE : q < .075 ? O.FLOWER : q < .105 ? O.TALL : q < .12 ? O.BUSH : 0; }
      else if (z === 'park') { o = q < .025 ? O.TREE : q < .05 ? O.FLOWER : q < .07 ? O.TALL : q < .08 ? O.BUSH : 0; if (x >= 105 && x <= 109 && y >= 58 && y <= 61) { gg = G.WATER; o = 0; } }
      else if (z === 'plains') { o = q < .02 ? O.TREE : q < .1 ? O.TALL : 0; if (x >= 65 && x <= 68 && y >= 91 && y <= 93) { gg = G.WATER; o = 0; } }
      else if (z === 'volcano') { const d = Math.hypot(x - VOLC.x, y - VOLC.y); o = d > 6 && q < .07 ? O.BOULDER : 0; }
      else if (z === 'snow') o = q < .08 ? O.PINE : q < .12 ? O.BOULDER : 0;
      else if (z === 'mountain') o = q < .14 ? O.BOULDER : q < .22 ? O.PINE : 0;
      else if (z === 'moor') o = q < .18 ? O.HEATHER : q < .24 ? O.BOULDER : q < .3 ? O.TALL : 0;
      else if (z === 'forest') o = q < .2 ? O.TREE : q < .25 ? O.FRUIT : q < .31 ? O.OLDLOG : q < .36 ? O.BUSH : q < .4 ? O.FLOWER : q < .44 ? O.PINE : 0;
      else if (z === 'wildwood') { o = q < .11 ? O.TREE : q < .18 ? O.BIRCH : q < .22 ? O.HAZEL : q < .26 ? O.MUSH : q < .29 ? O.OLDLOG : q < .32 ? O.BUSH : q < .35 ? O.FLOWER : 0; if (x % 9 === 0 && y % 3 !== 0 && q > .3) o = O.HAZEL; }
      else if (z === 'lake') { const e = ((x - 34) / 10) ** 2 + ((y - 56) / 9) ** 2; if (e > .62) { gg = G.SAND; o = q < .15 ? O.REEDS : 0; } else if (q < .05) o = O.LILY; }
      else if (z === 'jungle') o = q < .14 ? O.TREE : q < .24 ? O.FRUIT : q < .32 ? O.BUSH : 0;
      else if (z === 'marsh') { if (Story.h01((x >> 1) * 7 + (y >> 1) * 13) < .32) gg = G.WATER; else if (q < .2) o = O.REEDS; }
      else if (z === 'savanna') o = q < .06 ? O.TREE : q < .26 ? O.TALL : 0;
      else if (z === 'desert') o = q < .07 ? O.PALM : q < .14 ? O.CACTUS : 0;
      else if (z === 'outback') o = q < .05 ? O.TREE : q < .1 ? O.BUSH : q < .15 ? O.BOULDER : 0;
      gnd[i] = gg; obj[i] = o;
    }
    /* the river: from the snowy mountains down to the lake, then west through the jungle to the sea */
    const river = [[47, 22], [44, 30], [40, 38], [37, 46], [34, 52], [28, 56], [22, 54], [16, 57], [9, 56], [2, 57]];
    for (let k = 0; k < river.length - 1; k++) { const [ax, ay] = river[k], [bx, by] = river[k + 1], n = Math.max(Math.abs(bx - ax), Math.abs(by - ay)) * 2; for (let s = 0; s <= n; s++) { const x = Math.round(ax + (bx - ax) * s / n), y = Math.round(ay + (by - ay) * s / n); for (const [dx, dy] of [[0, 0], [1, 0], [0, 1]]) { const X = x + dx, Y = y + dy, z = this.zoneAt(X, Y); if (z !== 'sea' && !BUILDZ.has(z)) set(X, Y, G.WATER); } } }
    for (const [x, y] of [[42, 34], [42, 35], [43, 34], [43, 35], [44, 34], [44, 35], [19, 55], [19, 56], [19, 57], [20, 55], [20, 56], [20, 57]]) set(x, y, G.PLANK);   // two bridges
    /* a frozen tarn in the snow, an oasis in the desert */
    for (let y = 14; y <= 16; y++) for (let x = 53; x <= 56; x++) set(x, y, G.WATER);
    for (let y = 108; y <= 109; y++) for (let x = 20; x <= 22; x++) set(x, y, G.WATER); set(19, 108, G.SAND, O.PALM); set(23, 109, G.SAND, O.PALM);
    /* the volcano and the mountain peaks are solid landmarks */
    for (let y = -4; y <= 2; y++) for (let x = -5; x <= 5; x++) if (Math.hypot(x, y * 1.2) < 5) set(VOLC.x + x, VOLC.y + y, G.VOLC, O.PEAK);
    for (const [px3, py3, big] of PEAKS) for (let y = -2 - big; y <= 0; y++) for (let x = -3 - big; x <= 3 + big; x++) if (Math.abs(x) <= 3 + big + y) set(px3 + x, py3 + y, gnd[(py3 + y) * N + px3 + x] === G.SNOW ? G.SNOW : G.ROCK, O.PEAK);
    /* the ranger hut, campfire, Food Store, jobs board, the boats and rock pools */
    set(64, 45, G.GRASS, O.HUT); set(63, 45, G.GRASS, O.BLOCK); set(65, 45, G.GRASS, O.BLOCK); set(67, 46, G.GRASS, O.FIRE);
    set(60, 45, G.GRASS, O.STORE); set(68, 49, G.GRASS, O.JOBS);
    for (const [x, y] of [[98, 102], [97, 110], [99, 120], [101, 115]]) set(x, y, G.SAND, O.ROCKPOOL);
    set(106, 104, G.WATER, O.BOAT); set(105, 104, G.SAND, 0);
    set(39, 54, G.WATER, O.BOAT); set(40, 54, G.SAND, 0); set(41, 54, G.SAND, 0);   // the lake boat
  },
  /* move an older, square sanctuary onto the island: every building area keeps exactly what Arlo built */
  migrateIsland(oldN) {
    const Z = DB.sanct, N = this.N, gnd = new Uint8Array(N * N), obj = new Uint8Array(N * N);
    this.genIsland(gnd, obj, RNG(hash('island' + (Z.px || 1))));
    const maps = OLDRECT[oldN] || [], newPos = (x, y) => { for (const [x0, y0, x1, y1, k] of maps) if (x >= x0 && x <= x1 && y >= y0 && y <= y1) { const R = IRECT[k]; return [x - x0 + R[0], y - y0 + R[1]]; } return null; };
    for (const [x0, y0, x1, y1, k] of maps) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const o = y * oldN + x, [nx, ny] = newPos(x, y), n = ny * N + nx; gnd[n] = Z.gnd.charCodeAt(o) - 65; obj[n] = Z.obj.charCodeAt(o) - 65; }
    const conv = i => { const p = newPos(i % oldN, (i / oldN) | 0); return p ? p[1] * N + p[0] : -1; };
    const remap = m => { const out = {}; for (const k in m || {}) { const j = conv(+k); if (j >= 0) out[j] = m[k]; } return out; };
    Z.meta = remap(Z.meta); Z.port = remap(Z.port); Z.fc = remap(Z.fc); Z.plan = (Z.plan || []).map(conv).filter(j => j >= 0);
    Z.habs = Z.habs.filter(h => { const p = newPos(h.x, h.y); if (!p) return false; h.x = p[0]; h.y = p[1]; return true; });
    const ap = newPos(Math.floor(Z.px / TS), Math.floor(Z.py / TS)); if (ap && !Z.boat) { Z.px = ap[0] * TS + 8; Z.py = ap[1] * TS + 8; } else { Z.px = 64 * TS + 8; Z.py = 48 * TS + 8; Z.boat = false; }
    let s1 = '', s2 = ''; for (let i = 0; i < N * N; i++) { s1 += String.fromCharCode(65 + gnd[i]); s2 += String.fromCharCode(65 + obj[i]); } Z.gnd = s1; Z.obj = s2; Z.island = 1;
    Z.told.islandNews = 0;
  },
  /* very old sanctuaries also need the Food Store and jobs board */
  upgrade4() {
    const Z = this.Z, N = this.N; Z.v4 = 1; Z.fst = Z.fst || 0;
    const free = (x, y) => { const i = this.idx(x, y); return this.inM(x, y) && this.obj[i] === O.NONE && this.gnd[i] !== G.WATER && this.gnd[i] !== G.PIT; };
    const place = (x0, y0, o) => { for (let d = 0; d < 12; d++) for (let y = y0 - d; y <= y0 + d; y++) for (let x = x0 - d; x <= x0 + d; x++) if (this.inB(x, y) && this.zoneAt(x, y) === 'meadow' && free(x, y)) { this.obj[this.idx(x, y)] = o; return; } };
    if (!this.obj.includes(O.STORE)) place(60, 45, O.STORE); if (!this.obj.includes(O.JOBS)) place(68, 49, O.JOBS);
  },
  grow64() { },

  /* ----- the volcano and mountain peaks, drawn big ----- */
  drawLandmarks(y, ox, oy, t) {
    if (y === VOLC.y + 2) {
      const X = VOLC.x * TS + 8 - ox, Y = (VOLC.y + 3) * TS - oy;
      if (X > -140 && X < VW + 140 && Y > -40 && Y < VH + 160) {
        for (let k = 0; k < 14; k++) { const w = 168 - k * 9, hh = 9; px(k % 3 === 0 ? '#4a4350' : k % 3 === 1 ? '#3d3742' : '#453e4c', Math.round(X - w / 2), Y - k * hh - hh, w, hh); }
        px('#2a2430', Math.round(X - 42), Y - 132, 84, 6);
        for (let k = 0; k < 5; k++) { const lx = X - 34 + k * 17, ln = 40 + (k % 2) * 30; px(k % 2 ? '#ff8a2a' : '#ff5a1a', lx, Y - 128, 4, ln); px('#ffd23f', lx + 1, Y - 128 + ((t * 20 + k * 9) % ln | 0), 2, 4); }
        const gl = .5 + Math.sin(t * 3) * .2; g.globalAlpha = gl; px('#ff6a2a', Math.round(X - 36), Y - 134, 72, 4); g.globalAlpha = 1;
        for (let k = 0; k < 6; k++) { const s = (t * .35 + k / 6) % 1, sx = X - 10 + Math.sin(t + k * 2) * 10 + s * 30, sy = Y - 140 - s * 90, sz = 10 + s * 22; g.globalAlpha = .45 * (1 - s); box(Math.round(sx - sz / 2), Math.round(sy - sz / 2), Math.round(sz), Math.round(sz * .8), '#9a96a0'); g.globalAlpha = 1; }
      }
    }
    for (const [px3, py3, big] of PEAKS) if (y === py3) {
      const X = px3 * TS + 8 - ox, Y = (py3 + 1) * TS - oy, H = big ? 120 : 84, W = big ? 140 : 108;
      if (X < -100 || X > VW + 100 || Y < -10 || Y > VH + H + 20) continue;
      for (let k = 0; k < H; k += 6) { const w = Math.round(W * (1 - k / H)); px(k < H * .55 ? '#8b8f96' : '#a2a6ae', Math.round(X - w / 2), Y - k - 6, w, 6); px('#6e727a', Math.round(X), Y - k - 6, Math.round(w / 2), 6); }
      for (let k = Math.round(H * .58); k < H; k += 6) { const w = Math.round(W * (1 - k / H)); px('#f4f8fc', Math.round(X - w / 2), Y - k - 6, w, 6); px('#d6e4f0', Math.round(X), Y - k - 6, Math.round(w / 2), 6); }
    }
  }
});
