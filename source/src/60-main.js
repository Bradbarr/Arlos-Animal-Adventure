/* ============ MAIN: menu, loop, start-up ============ */
function setMode(m, cls) { if (m !== Sanct && window.ZOOMD) { window.ZOOMD = 0; resize(); } MODE = m; document.body.className = cls; setBar(false); for (const k in K) K[k] = 0; $('srch').classList.remove('glow'); UI.tq.length = 0; UI.tt = 0; $('toast').classList.remove('on'); }
const Menu = {
  t: 0,
  update(dt) { this.t += dt; },
  draw() {
    const t = this.t, gl = VH - Math.round(Math.max(40, VH * .22)), sc = t * 22;
    for (let k = 0; k < 10; k++) px(mix('#4aa8f0', '#d0f0ff', k / 9), 0, k * Math.ceil(gl / 10), VW, Math.ceil(gl / 10) + 1);
    box(Math.round(VW * .8), 16, 14, 14, '#ffe27a');
    for (let k = 0; k < 5; k++) { const x = ((k * 97 + t * 5) % (VW + 70) + VW + 70) % (VW + 70) - 40, y = 14 + (k * 23) % 44; box(x, y, 26, 6, '#fff'); box(x + 5, y - 4, 14, 5, '#fff'); }
    CAM.x = sc; Story.skyline(77, gl - 4, 50, 26, '#5a9a4a', .12); Story.skyline(177, gl - 2, 26, 18, '#7ab860', .28);
    for (let k = -1; k < VW / 60 + 2; k++) { const i = Math.floor(sc * .7 / 60) + k, x = Math.round(i * 60 - sc * .7); (Story.h01(i) < .5 ? PROP.oak : Story.h01(i) < .75 ? PROP.apple : PROP.pine)(x, gl, t, i); }
    const st = sideTile('grass', 'dirt'), off = Math.round(sc) % TS;
    for (let x = -off; x < VW; x += TS) { g.drawImage(st, x, gl); for (let y = gl + TS; y < VH; y += TS) g.drawImage(TILES.dirt, x, y); }
    const cx = Math.round(VW * .62);
    drawArlo(cx, gl, { wk: t, t });
    (DB.rescued.length ? DB.rescued : AIDS).slice(-12).forEach((id, k) => drawAnimal(id, cx - 22 - k * 19, gl - (Math.sin(t * 6 + k) > .9 ? 2 : 0), { b: true, t: t + k, wk: t + k * .3 }));
    CAM.x = 0; drawParts();
  }
};
function goMenu() { setMode(Menu, 'm-menu'); AMB.set('quiet'); showMenu(); }
function showMenu() {
  const st = DB.story, cont = st && !st.finished && st.order, n = DB.rescued.length;
  UI.modal(`<h1>ARLO'S<br>ANIMAL ADVENTURE</h1><p class="small">Find the lost baby animals. Outsmart the Poacher. Build them a home.</p>${SAVE.ok ? '' : '<p class="small no">⚠ Progress will not be saved in private mode.</p>'}
  ${cont ? `<button class="btn go big" id="m1">▶ CONTINUE ${st.ch === 'wild' ? 'WILD WEEK' : 'CHAPTER ' + (st.ch || 1)}</button><br>` : ''}<button class="btn ${cont ? '' : 'go'} big" id="m1n">🔦 STORY CHAPTERS</button><br>
  <button class="btn big" id="m2">🏡 ANIMAL SANCTUARY</button><br><button class="btn big" id="m7b">⭐ TODAY'S PRACTICE</button>
  <div class="lbl">HOW HARD?</div>${Object.keys(DIFF).map(k => `<button class="btn sm ${DB.set.diff === k ? 'sel' : ''}" data-d="${k}">${DIFF[k].name}</button>`).join('')}
  <div class="lbl">MORE</div><button class="btn sm" id="m7">🎓 Practice</button><button class="btn sm" id="m8">🖼 Gallery</button><button class="btn sm" id="m3">How to play</button><button class="btn sm" id="m4">📖 Journal</button><button class="btn sm" id="m9">💾 Backup</button><button class="btn sm" id="m10">👪 Grown-ups</button><button class="btn sm" id="m5">Sound: ${AU.muted ? 'OFF' : 'ON'}</button><button class="btn sm" id="m6">Music: ${AU.music ? 'ON' : 'OFF'}</button>
  <p class="small">Babies rescued: ${n} / ${AIDS.length} &nbsp; 🪙 ${DB.coins}p &nbsp; 💎 ${DB.gems || 0}</p>`, { clear: true });
  UI.on('m1', () => { UI.close(); Story.start(); });
  UI.on('m1n', () => showChapters(showMenu));
  UI.on('m7b', () => todaysPractice(showMenu)); UI.on('m10', () => showGrown(showMenu));
  UI.on('m2', () => { UI.close(); Sanct.start(); });
  document.querySelectorAll('[data-d]').forEach(b => b.onclick = () => { AU.init(); SFX.click(); DB.set.diff = b.dataset.d; SAVE.put(); showMenu(); });
  UI.on('m3', () => { UI.modal(`<h2>HOW TO PLAY</h2><button class="btn big" id="h1">🔦 Story Adventure</button><br><button class="btn big" id="h2">🏡 Animal Sanctuary</button><br><button class="btn sm" id="h3">Back</button>`, { clear: true }); UI.on('h1', () => showHow('story', showMenu)); UI.on('h2', () => showHow('sanct', showMenu)); UI.on('h3', showMenu); });
  UI.on('m4', () => showJournal(showMenu));
  UI.on('m7', () => showPractice(showMenu)); UI.on('m8', () => showGallery(showMenu)); UI.on('m9', showBackup);
  UI.on('m5', () => { AU.setMute(!AU.muted); DB.set.mute = AU.muted; SAVE.put(); showMenu(); });
  UI.on('m6', () => { AU.music = !AU.music; DB.set.music = AU.music; SAVE.put(); showMenu(); });
}

function showBackup() {
  UI.modal(`<h2>💾 SAVE BACKUP</h2><p>Your game saves by itself on this device. A backup lets you move it to another phone, tablet or computer.</p>
  <button class="btn sm" id="bi">⬆ Load a backup file</button><input type="file" id="bf" accept=".json,application/json" style="display:none">
  <div class="lbl">OR USE A SAVE CODE (works everywhere)</div><textarea id="bt" class="savetxt" placeholder="Tap SHOW MY CODE, then copy it. On the other device, paste a code here and tap LOAD THIS CODE." spellcheck="false"></textarea><br>
  <button class="btn sm" id="bc">Show my code</button><button class="btn sm" id="bcp">Copy</button><button class="btn sm" id="bl">Load this code</button>
  <p class="small" id="bmsg">${SAVE.ok ? 'Saving is working on this device.' : '⚠ This browser is not saving progress (private mode?).'}</p><button class="btn" id="bb">Back</button>`, { clear: true, wide: true });
  const msg = t => { $('bmsg').textContent = t; };
  UI.on('bi', () => $('bf').click());
  const load = txt => { if (SAVE.importText(txt)) { UI.toast('✅ Backup loaded!'); showMenu(); } else msg('That is not an Arlo save. Check you copied all of it.'); };
  $('bf').onchange = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => load(String(r.result)); r.readAsText(f); };
  UI.on('bc', () => { if (MODE && MODE.save) MODE.save(); $('bt').value = JSON.stringify(DB); $('bt').select(); msg('This is your save code. Copy all of it and keep it somewhere safe.'); });
  UI.on('bcp', () => { const t = $('bt'); if (!t.value) t.value = JSON.stringify(DB); t.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (e) { } try { navigator.clipboard.writeText(t.value).catch(() => { }); } catch (e) { } msg(ok ? 'Copied! Paste it into a note or message to yourself.' : 'Press and hold the code, choose Select All, then Copy.'); });
  UI.on('bl', () => { const v = $('bt').value.trim(); if (!v) { msg('Paste a save code into the box first.'); return; } load(v); });
  UI.on('bb', showMenu);
}
let _last = 0;
function frame(ts) {
  const dt = Math.min(.05, Math.max(0, (ts - _last) / 1000 || 0)); _last = ts;
  try {
    UI.update(dt);
    if (UI.open) { if (JP.Enter) { const b = document.querySelector('#panel .btn.go') || document.querySelector('#panel .btn'); if (b) b.click(); } }
    else if (MODE !== Menu && (JP.esc || JP.KeyP)) showPause();
    else if (MODE) { const n = window.GAME.speed || 1; for (let i = 0; i < n && !UI.open; i++) MODE.update(dt); }
    AMB.update(dt); updParts(dt);
    MODE.draw();
    let sx = 0, sy = 0; if (SHAKE > 0) { sx = Math.round((rnd() - .5) * SHAKE * 2); sy = Math.round((rnd() - .5) * SHAKE * 2); SHAKE = Math.max(0, SHAKE - dt * 18); }
    const k = Math.round(SC * DPR);
    scr.imageSmoothingEnabled = false; if (sx || sy) { scr.fillStyle = '#10131c'; scr.fillRect(0, 0, cv.width, cv.height); }
    scr.drawImage(lo, 0, 0, VW, VH, sx * k, sy * k, VW * k, VH * k);
    drawFT(); if (MODE.overlay) MODE.overlay();
  } catch (e) { console.error(e); }
  for (const k in JP) delete JP[k];
  requestAnimationFrame(frame);
}
function boot() {
  window.GAME = {}; buildTiles(); bindControls();
  $('bPause').onclick = () => { AU.init(); if (!UI.open) showPause(); };
  $('bBook').onclick = () => { AU.init(); if (!UI.open) showJournal(); };
  $('bGoals').onclick = () => { AU.init(); if (!UI.open && MODE === Sanct) Sanct.showGoals(); };
  $('bCam').onclick = () => { AU.init(); if (!UI.open && MODE === Sanct) Sanct.photo(); };
  $('mini').onclick = () => { AU.init(); if (!UI.open && MODE === Sanct) Sanct.showMap(); };
  $('zIn').onclick = () => { AU.init(); if (MODE === Sanct) Sanct.zoom(1); }; $('zOut').onclick = () => { AU.init(); if (MODE === Sanct) Sanct.zoom(-1); };
  $('bLook').onclick = () => { AU.init(); if (!UI.open && MODE === Sanct) Sanct.lookBelow(); };
  document.addEventListener('visibilitychange', () => { if (document.hidden) { if (MODE && MODE.save) MODE.save(); for (const k in K) K[k] = 0; } });
  window.__SC = () => SC; window.__CAM = () => CAM;
  window.GAME = { Story, Sanct, Menu, UI, Learn, SAVE, CONFIG, TASKS, DB: () => DB, AU, mode: () => MODE, speed: 1, debug: false };
  goMenu(); requestAnimationFrame(frame);
}
boot();
