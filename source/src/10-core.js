'use strict';
/* =====================================================================
   ARLO'S ANIMAL ADVENTURE  (version 4)
   CONFIG: every number you may want to tune lives here.
   Learning content (words, questions, stories) lives in the LEARN DATA
   block further down: search for "LEARN DATA".
   ===================================================================== */
const CONFIG = {
  VERSION: 5,
  story: {
    levelCols: { explorer: 104, ranger: 132, chief: 152 },   // length of each landscape, in blocks
    spots: { explorer: [6, 8], ranger: [9, 12], chief: [11, 14] },   // hiding places per landscape (first level, last level)
    hints: { explorer: 5, ranger: 3, chief: 1 },
    searchTime: { explorer: .55, ranger: .9, chief: 1.2 },   // seconds to search one hiding place
    babyMoves: { explorer: 0, ranger: 1, chief: 2 },         // how many times the baby may scurry to a new spot
    babyMoveAfter: 40,                                       // seconds before a restless baby moves by itself
    gemsPerHint: 5,                                          // collect this many treasures to earn a hint
    gemRefill: 600                                           // seconds before treasures sparkle back in a finished landscape
  },
  poacher: {
    arriveAfter: { explorer: 100, ranger: 70, chief: 45 },   // seconds of searching before the Poacher comes
    walkTime: { explorer: 10, ranger: 7.5, chief: 6 },       // seconds he needs to reach the hiding place
    taps: { explorer: 1, ranger: 2, chief: 3 },              // taps to scare him off before he finds the baby
    runSpeed: { explorer: 40, ranger: 56, chief: 72 },       // how fast he runs away with the net
    runTaps: { explorer: 1, ranger: 1, chief: 2 },           // taps to make him drop the net
    runMax: 9,                                               // longest he can be chased, in seconds
    codeDigits: { explorer: 3, ranger: 3, chief: 4 }         // digits on the Hideout padlock
  },
  learn: { breath: 4, galleryMax: 24, signGems: 3 },          // ... and treasure for answering a Ranger Sign                      // seconds per breath; pictures kept in the gallery
  sanct: {
    mealEvery: 240,        // seconds between meals (one in-game day)
    bowlPortions: 5,       // meals in a full bowl
    growTime: 90,          // seconds for a baby to grow up
    fishBite: [1.2, 3],    // seconds until a fish bites
    fishWindow: 1.6,       // seconds to press USE when it bites
    visitorEvery: 28,      // seconds between visitors (they only come if there is a path)
    jobsEvery: 240,        // a fresh set of Ranger Jobs every in-game day
    seaPen: 80,            // sea tiles a nurse shark needs
    room: { small: 12, medium: 16, large: 30, giant: 50 }   // room each new animal needs
  }
};
/* ============ CORE: helpers, canvas, input, audio, save ============ */
const $ = id => document.getElementById(id);
const TS = 16, TAU = Math.PI * 2;
const clamp = (v, a, b) => v < a ? a : v > b ? b : v, lerp = (a, b, t) => a + (b - a) * t;
const rnd = Math.random, ri = (a, b) => a + Math.floor(rnd() * (b - a + 1)), pick = a => a[Math.floor(rnd() * a.length)];
function RNG(seed) { let s = (seed >>> 0) || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function shuffle(a, r = rnd) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ---- canvas: draw at low resolution, scale up crisp ---- */
const cv = $('c'), scr = cv.getContext('2d');
const lo = document.createElement('canvas');
let g = lo.getContext('2d');
let VW = 320, VH = 200, SC = 3, DPR = 1;
function resize() {
  const W = Math.max(200, innerWidth), H = Math.max(200, innerHeight);
  DPR = Math.min(window.devicePixelRatio || 1, 3);
  const k0 = Math.max(1, Math.floor(Math.min(W, H) * DPR / 200)), k = clamp(k0 + (window.ZOOMD || 0), Math.max(1, k0 - 2), k0 + 2);
  SC = k / DPR;
  cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
  cv.style.width = W + 'px'; cv.style.height = H + 'px';
  VW = Math.ceil(W / SC); VH = Math.ceil(H / SC);
  lo.width = VW; lo.height = VH; g = lo.getContext('2d'); g.imageSmoothingEnabled = false;
}
addEventListener('resize', resize); resize();
function withCtx(ctx, fn) { const o = g; g = ctx; try { fn(); } finally { g = o; } }

/* ---- colour helpers ---- */
const _sh = {};
const hx6 = h => h.length === 4 ? '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3] : h;
function shade(hex, a) {
  const k = hex + a; if (_sh[k]) return _sh[k];
  let n = parseInt(hx6(hex).slice(1), 16), r = n >> 16, gg = (n >> 8) & 255, b = n & 255;
  const t = a < 0 ? 0 : 255, p = Math.abs(a);
  r = Math.round(r + (t - r) * p); gg = Math.round(gg + (t - gg) * p); b = Math.round(b + (t - b) * p);
  return _sh[k] = '#' + ((1 << 24) | (r << 16) | (gg << 8) | b).toString(16).slice(1);
}
function mix(h1, h2, t) {
  const a = parseInt(hx6(h1).slice(1), 16), b = parseInt(hx6(h2).slice(1), 16);
  const r = Math.round(lerp(a >> 16, b >> 16, t)), gg = Math.round(lerp((a >> 8) & 255, (b >> 8) & 255, t)), bl = Math.round(lerp(a & 255, b & 255, t));
  return '#' + ((1 << 24) | (r << 16) | (gg << 8) | bl).toString(16).slice(1);
}
function px(c, x, y, w, h) { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), w, h); }
/* a shaded block: light top edge, dark bottom and right edge */
function box(x, y, w, h, c) {
  x = Math.round(x); y = Math.round(y);
  g.fillStyle = c; g.fillRect(x, y, w, h);
  if (w > 2 && h > 2) {
    g.fillStyle = shade(c, .22); g.fillRect(x, y, w - 1, 1);
    g.fillStyle = shade(c, -.2); g.fillRect(x, y + h - 1, w, 1); g.fillRect(x + w - 1, y + 1, 1, h - 1);
  }
}

/* ---- input ---- */
const K = { left: 0, right: 0, up: 0, down: 0, jump: 0 };
const JP = {};            // just-pressed this frame
const KEYMAP = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down', Space: 'jump' };
addEventListener('keydown', e => {
  if (e.repeat) { if (KEYMAP[e.code]) e.preventDefault(); return; }
  AU.init();
  const k = KEYMAP[e.code];
  if (k) { K[k] = 1; JP[k] = 1; e.preventDefault(); }
  JP[e.code] = 1;
  if (e.code === 'Escape') JP.esc = 1;
});
addEventListener('keyup', e => { const k = KEYMAP[e.code]; if (k) K[k] = 0; });
addEventListener('blur', () => { for (const k in K) K[k] = 0; });
function bindControls() {
  document.querySelectorAll('.cb').forEach(b => {
    const k = b.dataset.k, a = b.dataset.a;
    const dn = e => { e.preventDefault(); AU.init(); b.classList.add('on'); if (k) { K[k] = 1; JP[k] = 1; } if (a) JP['a_' + a] = 1; try { b.setPointerCapture(e.pointerId); } catch (_) { } };
    const up = e => { e.preventDefault(); b.classList.remove('on'); if (k) K[k] = 0; };
    b.addEventListener('pointerdown', dn); b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('lostpointercapture', up);
    b.addEventListener('contextmenu', e => e.preventDefault());
  });
  let held = false;
  cv.addEventListener('pointerdown', e => { e.preventDefault(); AU.init(); held = true; try { cv.setPointerCapture(e.pointerId); } catch (_) { } if (MODE && MODE.tap && !UI.open) MODE.tap(e.clientX / SC, e.clientY / SC); });
  cv.addEventListener('pointermove', e => { if (held && MODE && MODE.drag && !UI.open) MODE.drag(e.clientX / SC, e.clientY / SC); else if (MODE && MODE.hover && !UI.open) MODE.hover(e.clientX / SC, e.clientY / SC); });
  const end = e => { if (!held) return; held = false; if (MODE && MODE.dragEnd && !UI.open) MODE.dragEnd(e.clientX / SC, e.clientY / SC); };
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  cv.addEventListener('contextmenu', e => e.preventDefault());
}

/* ---- audio: everything is synthesised ---- */
const AU = {
  c: null, m: null, muted: false, music: true,
  init() {
    if (this.c) { if (this.c.state === 'suspended') this.c.resume().catch(() => { }); return; }
    try {
      const C = window.AudioContext || window.webkitAudioContext; if (!C) return;
      const c = this.c = new C();
      this.m = c.createGain(); this.m.gain.value = this.muted ? 0 : .9; this.m.connect(c.destination);
      const n = c.sampleRate * 2, b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
      this.nb = b;
      this.ambG = c.createGain(); this.ambG.gain.value = 0;
      this.ambF = c.createBiquadFilter(); this.ambF.type = 'lowpass'; this.ambF.frequency.value = 500;
      const s = c.createBufferSource(); s.buffer = b; s.loop = true; s.connect(this.ambF); this.ambF.connect(this.ambG); this.ambG.connect(this.m); s.start();
      if (c.state === 'suspended') c.resume().catch(() => { });
    } catch (e) { this.c = null; }
  },
  setMute(v) { this.muted = v; if (this.m) this.m.gain.value = v ? 0 : .9; if (v) try { speechSynthesis.cancel(); } catch (e) { } },
  tone(f, d, o = {}) {
    if (!this.c || this.muted) return;
    try {
      const c = this.c, t = c.currentTime + (o.at || 0), os = c.createOscillator(), gn = c.createGain();
      os.type = o.type || 'square'; os.frequency.setValueAtTime(f, t);
      if (o.to) os.frequency.exponentialRampToValueAtTime(Math.max(20, o.to), t + d);
      if (o.vib) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = o.vibRate || 8; lg.gain.value = o.vib; l.connect(lg); lg.connect(os.frequency); l.start(t); l.stop(t + d + .05); }
      const v = o.vol == null ? .12 : o.vol;
      gn.gain.setValueAtTime(.0001, t); gn.gain.linearRampToValueAtTime(v, t + (o.attack || .008)); gn.gain.exponentialRampToValueAtTime(.0001, t + d);
      os.connect(gn); gn.connect(this.m); os.start(t); os.stop(t + d + .05);
    } catch (e) { }
  },
  noise(d, o = {}) {
    if (!this.c || this.muted) return;
    try {
      const c = this.c, t = c.currentTime + (o.at || 0), s = c.createBufferSource(), f = c.createBiquadFilter(), gn = c.createGain();
      s.buffer = this.nb; f.type = o.type || 'bandpass'; f.frequency.value = o.f || 1000; f.Q.value = o.q || 1;
      const v = o.vol == null ? .15 : o.vol;
      gn.gain.setValueAtTime(.0001, t); gn.gain.linearRampToValueAtTime(v, t + (o.attack || .005)); gn.gain.exponentialRampToValueAtTime(.0001, t + d);
      s.connect(f); f.connect(gn); gn.connect(this.m); s.start(t, Math.random()); s.stop(t + d + .05);
    } catch (e) { }
  },
  seq(ns, step, o = {}) { ns.forEach((n, i) => { if (n) this.tone(n, o.len || step * 1.5, Object.assign({}, o, { at: (o.at || 0) + i * step })); }); },
  amb(vol, freq) { if (!this.c) return; const t = this.c.currentTime; this.ambG.gain.setTargetAtTime(vol, t, .6); this.ambF.frequency.setTargetAtTime(freq, t, .6); }
};
const VOICE = {
  gorilla: (p, v) => { AU.tone(150 * p, .16, { to: 120 * p, vol: v }); AU.tone(170 * p, .22, { to: 115 * p, vol: v, at: .2 }); },
  polarbear: (p, v) => AU.tone(120 * p, .5, { to: 80 * p, vol: v * 1.2, type: 'sawtooth', vib: 12, vibRate: 22 }),
  turtle: (p, v) => { AU.tone(700 * p, .07, { to: 900 * p, vol: v * .8, type: 'sine' }); AU.tone(800 * p, .09, { to: 1000 * p, vol: v * .8, type: 'sine', at: .12 }); },
  lion: (p, v) => { AU.tone(330 * p, .18, { to: 470 * p, vol: v, type: 'sawtooth' }); AU.tone(470 * p, .28, { to: 260 * p, vol: v, type: 'sawtooth', at: .17 }); },
  capybara: (p, v) => { for (let i = 0; i < 3; i++) AU.tone(900 * p, .07, { to: 1150 * p, vol: v * .8, type: 'sine', at: i * .11 }); },
  flamingo: (p, v) => { AU.tone(380 * p, .14, { to: 330 * p, vol: v * .8 }); AU.tone(400 * p, .2, { to: 320 * p, vol: v * .8, at: .2 }); },
  hedgehog: (p, v) => { for (let i = 0; i < 3; i++) AU.noise(.05, { f: 2500, q: 2, vol: v * 1.3, at: i * .09 }); AU.tone(1300 * p, .06, { vol: v * .5, type: 'sine', at: .3 }); },
  duck: (p, v) => { if (p > 1) for (let i = 0; i < 3; i++) AU.tone(1900, .06, { to: 2400, vol: v * .7, type: 'sine', at: i * .12 }); else for (let i = 0; i < 2; i++) AU.tone(520, .13, { to: 360, vol: v, type: 'sawtooth', at: i * .18 }); },
  snowleopard: (p, v) => { AU.tone(420 * p, .3, { to: 280 * p, vol: v, type: 'sawtooth', vib: 10, vibRate: 30 }); AU.noise(.2, { f: 1200, vol: v * .4, at: .05 }); },
  camel: (p, v) => AU.tone(170 * p, .6, { to: 130 * p, vol: v, type: 'sawtooth', vib: 8, vibRate: 9 })
};
const SFX = {
  click() { AU.tone(660, .05, { vol: .07 }); },
  pop() { AU.tone(500, .09, { to: 1100, type: 'sine', vol: .15 }); },
  jump() { AU.tone(300, .14, { to: 620, vol: .05 }); },
  chop() { AU.noise(.08, { f: 500, q: 2, vol: .28 }); AU.tone(160, .08, { to: 90, vol: .1 }); },
  dig() { AU.noise(.12, { f: 900, q: .8, vol: .22 }); },
  place() { AU.tone(220, .07, { to: 150, vol: .12, type: 'triangle' }); AU.noise(.05, { f: 1500, vol: .08 }); },
  splash() { AU.noise(.25, { f: 1800, q: .7, vol: .14 }); AU.tone(900, .15, { to: 300, type: 'sine', vol: .05 }); },
  rustle() { for (let i = 0; i < 3; i++) AU.noise(.07, { f: 3000, q: 1, vol: .1, at: i * .08 }); },
  nope() { AU.tone(220, .12, { to: 160, vol: .08 }); AU.tone(180, .16, { to: 120, vol: .08, at: .12 }); },
  yes() { AU.seq([523, 659, 784], .08, { type: 'triangle', vol: .14 }); },
  jingle() { AU.seq([523, 659, 784, 1047], .11, { vol: .08 }); AU.seq([262, 330, 392, 523], .11, { type: 'triangle', vol: .12 }); },
  sparkle() { AU.seq([1319, 1568, 2093, 1568, 2637], .06, { type: 'sine', vol: .08 }); },
  dun() { [0, .3].forEach((a, i) => { AU.tone(i ? 73 : 82, .26, { type: 'sawtooth', vol: .22, at: a }); AU.tone(i ? 74 : 83.5, .26, { type: 'sawtooth', vol: .18, at: a }); AU.tone(i ? 146 : 164, .2, { vol: .06, at: a }); }); },
  caught() { AU.tone(400, .25, { to: 2400, type: 'sine', vol: .14 }); AU.tone(700, .5, { to: 110, type: 'sine', vol: .16, at: .25, vib: 60, vibRate: 14 }); },
  laugh() { AU.tone(420, .9, { to: 140, type: 'sawtooth', vol: .11, vib: 50, vibRate: 7 }); },
  punch() { AU.noise(.09, { f: 700, q: 1.2, vol: .4, attack: .015 }); AU.tone(120, .1, { to: 60, type: 'sine', vol: .25 }); },
  groan() { AU.tone(200, .4, { to: 80, type: 'sawtooth', vol: .13, at: .06 }); },
  fanfare() { AU.seq([523, 659, 784, 1047, 1319, 1568], .13, { type: 'sine', vol: .16, len: .32 }); AU.seq([262, 330, 392, 523, 659, 784], .13, { type: 'triangle', vol: .1, len: .32 }); },
  clang() { [0, .16, .32].forEach((a, i) => { AU.tone(1800 + i * 350, .22, { type: 'sine', vol: .13, at: a }); AU.tone(2711 + i * 300, .15, { type: 'sine', vol: .06, at: a }); }); },
  gate() { AU.tone(180, .15, { to: 260, type: 'triangle', vol: .14 }); AU.noise(.1, { f: 400, vol: .1 }); },
  heart() { AU.tone(880, .1, { type: 'sine', vol: .1 }); AU.tone(1175, .14, { type: 'sine', vol: .1, at: .09 }); },
  grow() { AU.seq([392, 494, 587, 784], .09, { type: 'triangle', vol: .14 }); },
  cry(id, baby, vol) { const f = VOICE[id]; if (f) f(baby ? 1.5 : 1, vol == null ? .12 : vol); }
};
/* ambience bed + tiny generative chiptune */
const AMB = {
  kind: '', t: 0, beat: 0, n: 3, bt: 0,
  KINDS: { jungle: [.035, 2200], wind: [.07, 380], sea: [.07, 700], quiet: [.02, 900], night: [.03, 1500], fire: [.05, 300], off: [0, 400] },
  set(k) { if (k === this.kind) return; this.kind = k; const a = this.KINDS[k] || this.KINDS.off; AU.amb(a[0], a[1]); },
  update(dt) {
    if (!AU.c || AU.muted || this.kind === 'off' || !this.kind) return;
    this.t -= dt;
    if (this.t <= 0) {
      this.t = 2 + rnd() * 4; const k = this.kind;
      if (k === 'jungle') { const f = 1800 + rnd() * 1400; for (let i = 0; i < ri(2, 4); i++) AU.tone(f, .07, { to: f * 1.25, type: 'sine', vol: .025, at: i * .11 }); }
      else if (k === 'quiet') { const f = 2400 + rnd() * 800; AU.tone(f, .09, { to: f * .8, type: 'sine', vol: .02 }); AU.tone(f * 1.1, .09, { to: f * .9, type: 'sine', vol: .02, at: .14 }); }
      else if (k === 'night') { for (let i = 0; i < 4; i++) AU.tone(3800, .03, { type: 'sine', vol: .012, at: i * .07 }); }
      else if (k === 'sea') { AU.noise(1.6, { f: 500, q: .4, vol: .05, attack: .7 }); if (rnd() < .3) AU.tone(1300, .18, { to: 900, type: 'sine', vol: .02, at: .4 }); }
      else if (k === 'fire') AU.noise(.04, { f: 2000, vol: .04 });
    }
    if (!AU.music) return;
    this.bt -= dt;
    if (this.bt <= 0) {
      this.bt = .42; this.beat++;
      const sc = [262, 294, 330, 392, 440, 523, 587, 659, 784];
      if (rnd() < .6) { this.n = clamp(this.n + ri(-2, 2), 0, sc.length - 1); AU.tone(sc[this.n], .34, { type: 'triangle', vol: .03 }); }
      if (this.beat % 8 === 0) AU.tone([131, 175, 196, 147][(this.beat / 8) % 4 | 0], .8, { type: 'sine', vol: .04 });
    }
  }
};
function say(t) {
  try {
    if (!window.speechSynthesis || AU.muted) return; speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(t).replace(/<[^>]+>/g, ' ').replace(/[^\w\s.,!?'’:-]/g, ' '));
    u.rate = .92; u.pitch = 1.1; speechSynthesis.speak(u);
  } catch (e) { }
}

/* ---- save (falls back to memory when storage is unavailable) ---- */
const SAVE = {
  k: 'arlo_adventure_v3', mem: {}, ok: true,
  load() { try { localStorage.setItem('arlo_test', '1'); localStorage.removeItem('arlo_test'); const s = localStorage.getItem(this.k); if (s) this.mem = JSON.parse(s) || {}; } catch (e) { this.mem = {}; this.ok = false; } return this.mem; },
  put() { try { localStorage.setItem(this.k, JSON.stringify(this.mem)); } catch (e) { if (this.mem.gallery && this.mem.gallery.length > 4) { this.mem.gallery.splice(0, 4); try { localStorage.setItem(this.k, JSON.stringify(this.mem)); } catch (_) { } } } },
  /* fill in anything an older save does not have */
  fix(d) {
    d.set = Object.assign({ diff: 'explorer', mute: false, music: true, raid: false }, d.set || {});
    d.journal = d.journal || {}; d.rescued = d.rescued || []; d.gallery = d.gallery || [];
    d.learn = Object.assign({ A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 }, d.learn || {}); d.hideout = d.hideout || 0; d.scared = d.scared || 0;
    d.skill = d.skill || {}; d.taskN = d.taskN || 0; d.stickers = d.stickers || []; d.coins = d.coins == null ? 20 : d.coins; d.chdone = d.chdone || {}; d.trails = d.trails || {}; d.released = d.released || {}; d.tips = d.tips || {};
    if (d.gems == null) { let n = 0; for (const T of [d.story, ...Object.values(d.trails)]) if (T && T.gemN) n += T.gemN; d.gems = n; }
    if (d.story && d.story.finished && !(d.story.ch > 1) && d.story.ch !== 'wild') d.chdone[1] = 1;
    d.v = CONFIG.VERSION; return d;
  },
  importText(txt) {
    try { const d = JSON.parse(txt); if (!d || typeof d !== 'object' || !d.set) return false; this.mem = this.fix(d); DB = this.mem; AU.muted = !!DB.set.mute; AU.music = !!DB.set.music; this.put(); return true; } catch (e) { return false; }
  }
};
let DB = SAVE.fix(SAVE.load());
AU.muted = !!DB.set.mute; AU.music = !!DB.set.music;

/* ---- particles (pooled) and floating text ---- */
const PT = []; const FT = []; const CAM = { x: 0, y: 0 };
function part(x, y, vx, vy, life, c, o = {}) {
  if (PT.length > 500) PT.shift();
  PT.push({ x, y, vx, vy, life, max: life, c, s: o.s || 1, gr: o.gr == null ? 200 : o.gr, scr: !!o.scr, fade: o.fade !== false });
}
function burst(x, y, cols, n, o = {}) {
  for (let i = 0; i < n; i++) { const a = rnd() * TAU, sp = (o.sp || 60) * (.4 + rnd()); part(x, y, Math.cos(a) * sp, Math.sin(a) * sp - (o.up || 30), (o.life || .6) * (.6 + rnd() * .6), Array.isArray(cols) ? pick(cols) : cols, { s: o.s || ri(1, 2), gr: o.gr, scr: o.scr }); }
}
function updParts(dt) {
  for (let i = PT.length - 1; i >= 0; i--) { const p = PT[i]; p.life -= dt; if (p.life <= 0) { PT.splice(i, 1); continue; } p.vy += p.gr * dt; p.x += p.vx * dt; p.y += p.vy * dt; }
  for (let i = FT.length - 1; i >= 0; i--) { const f = FT[i]; f.t -= dt; f.y -= 14 * dt; if (f.t <= 0) FT.splice(i, 1); }
}
function drawParts() {
  for (const p of PT) { if (p.fade && p.life < p.max * .3 && ((p.life * 30) | 0) % 2) continue; px(p.c, p.scr ? p.x : p.x - CAM.x, p.scr ? p.y : p.y - CAM.y, p.s, p.s); }
}
function ftext(txt, x, y, c = '#fff', o = {}) { FT.push({ txt, x, y, c, t: o.t || 1.2, scr: !!o.scr, big: !!o.big }); }
function drawFT() {
  if (!FT.length) return;
  scr.textAlign = 'center'; scr.textBaseline = 'middle';
  for (const f of FT) {
    const X = (f.scr ? f.x : f.x - CAM.x) * SC * DPR, Y = (f.scr ? f.y : f.y - CAM.y) * SC * DPR, s = Math.round((f.big ? 15 : 9) * Math.max(1, SC / 2.2) * DPR);
    scr.font = s + "px 'Press Start 2P','Courier New',monospace";
    scr.globalAlpha = clamp(f.t * 3, 0, 1);
    scr.fillStyle = '#000'; scr.fillText(f.txt, X + DPR * 2, Y + DPR * 2); scr.fillStyle = f.c; scr.fillText(f.txt, X, Y);
  }
  scr.globalAlpha = 1;
}
let SHAKE = 0;
function shake(a) { SHAKE = Math.max(SHAKE, a); try { if (navigator.vibrate) navigator.vibrate(20); } catch (e) { } }
let MODE = null;
const plu = A => A.pl || A.name + 's';
let EYES_SHUT = false;
