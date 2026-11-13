/* ============ GAME CONTROLLER (Xbox, PlayStation, Switch Pro, any standard pad) ============
   In the game:   left stick / d-pad = move   A = jump / use   X = search / bag   Y = hint / map
                  LB / RB = change tool   LT / RT = zoom   ☰ Menu = pause   ⧉ View = goals
   In menus:      d-pad / left stick = move between buttons   A = choose   B = back   LT / RT = scroll
   Anywhere:      right stick = a pointing hand. Hold A to press, paint or drag with it.
   On Xbox, Edge would otherwise turn the controller into a mouse cursor, so ask it for real gamepad input. */
try { navigator.gamepadInputEmulation = 'gamepad'; } catch (e) { }
const PAD = {
  on: false, prev: [], dirs: { left: 0, right: 0, up: 0, down: 0 }, focus: null, rep: 0, repDir: '',
  cx: innerWidth / 2, cy: innerHeight / 2, curT: 0, held: false, last: 0, el: null,
  get() { const ps = navigator.getGamepads ? navigator.getGamepads() : []; for (const p of ps) if (p && p.connected && p.buttons.length >= 10) return p; return null; },
  /* everything in the open panel that can be chosen */
  items() {
    const root = UI.open ? $('panel') : null; if (!root) return [];
    const out = [];
    root.querySelectorAll('*').forEach(el => {
      if (out.some(o => o.contains(el))) return;
      const t = el.tagName, cs = getComputedStyle(el);
      const can = t === 'BUTTON' || t === 'INPUT' || t === 'SELECT' || t === 'TEXTAREA' || t === 'A' || el.onclick || el.onpointerdown || (cs.cursor === 'pointer' && t !== 'IMG');
      if (!can || el.disabled || cs.visibility === 'hidden' || cs.display === 'none') return;
      const r = el.getBoundingClientRect(); if (r.width < 4 || r.height < 4) return;
      out.push(el);
    });
    return out;
  },
  setFocus(el, quiet) {
    if (this.focus) this.focus.classList.remove('padf');
    this.focus = el; if (!el) return;
    el.classList.add('padf'); try { el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) { el.scrollIntoView(false); }
    if (quiet) return;
    AU.tone(660, .03, { type: 'sine', vol: .04 });
    if (READ.on()) {
      if (el.matches(READ_CONFIRM)) { READ.disarm(); READ.armed = el; el.classList.add('armed'); READ.speakLabel(el, false); }
      else if (el.matches(READ_SAY)) { const t = el.classList.contains('ltile') ? el.dataset.ch : READ.label(el); if (t) say(t); }
    }
  },
  ensureFocus() {
    const its = this.items();
    if (this.focus && its.includes(this.focus) && document.body.contains(this.focus)) return its;
    const pick = its.find(e => e.matches('.lopt, .food, .acell, .ltile, .chap')) || (its.length <= 4 && its.find(e => e.matches('.btn.go'))) || its[0];
    $('panel').scrollTop = 0; this.setFocus(pick || null, true); return its;
  },
  move(dir) {
    const its = this.ensureFocus(); if (!its.length) return;
    const c = this.focus; if (!c) return;
    const r = c.getBoundingClientRect(), ax = r.left + r.width / 2, ay = r.top + r.height / 2;
    const dx = { left: -1, right: 1, up: 0, down: 0 }[dir], dy = { left: 0, right: 0, up: -1, down: 1 }[dir];
    let best = null, bs = 1e9;
    for (const e of its) {
      if (e === c) continue;
      const q = e.getBoundingClientRect(), bx = q.left + q.width / 2, by = q.top + q.height / 2;
      const along = (bx - ax) * dx + (by - ay) * dy; if (along <= 4) continue;
      const side = Math.abs((bx - ax) * dy) + Math.abs((by - ay) * dx);
      const s = along + side * 2.5; if (s < bs) { bs = s; best = e; }
    }
    if (!best && (dir === 'down' || dir === 'right')) best = null;
    if (best) this.setFocus(best); else AU.tone(220, .04, { type: 'square', vol: .03 });
  },
  press(el) {
    if (!el || !document.body.contains(el)) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') { el.focus(); return; }
    if (el.onpointerdown && !el.onclick) {
      const r = el.getBoundingClientRect(), o = { bubbles: true, cancelable: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, pointerId: 7, pointerType: 'mouse', isPrimary: true };
      el.dispatchEvent(new PointerEvent('pointerdown', o)); el.dispatchEvent(new PointerEvent('pointerup', o)); return;
    }
    el.click();
  },
  back() {
    const its = this.items();
    const b = its.find(e => /^\s*(✖|✕|×|▶ keep playing|close|back|cancel|not now|no thanks|later|ok|got it)/i.test(e.textContent)) || its.find(e => /close|cancel|back/i.test(e.id || ''));
    if (b) this.press(b); else AU.tone(220, .04, { type: 'square', vol: .03 });
  },
  /* the pointing hand on the right stick */
  ptr(type) {
    const el = document.elementFromPoint(this.cx, this.cy); if (!el) return;
    const o = { bubbles: true, cancelable: true, clientX: this.cx, clientY: this.cy, pointerId: 7, pointerType: 'mouse', isPrimary: true, buttons: type === 'pointerup' ? 0 : 1 };
    const tg = type === 'pointerdown' ? (this.el = el) : (this.el && document.body.contains(this.el) ? this.el : el);
    tg.dispatchEvent(new PointerEvent(type, o));
    if (type === 'pointerup') { if (el === this.el || this.el.contains(el)) el.click(); this.el = null; }
  },
  btn(p, i) { const b = p.buttons[i]; return !!b && (b.pressed || b.value > .5); },
  edge(p, i) { const v = this.btn(p, i), was = this.prev[i]; return v && !was; },
  tick(dt) {
    const p = this.get();
    if (!p) { if (this.on) { this.on = false; document.body.classList.remove('pad'); for (const k in this.dirs) if (this.dirs[k]) { this.dirs[k] = 0; K[k] = 0; } } return; }
    if (!this.on) { this.on = true; document.body.classList.add('pad'); AU.init(); UI.toast('🎮 Controller ready! A = jump / use · X = search / bag · Y = hint / map · B = back · right stick = pointing hand', 6000); }
    const ax = p.axes[0] || 0, ay = p.axes[1] || 0, dz = .45;
    const now = { left: ax < -dz || this.btn(p, 14), right: ax > dz || this.btn(p, 15), up: ay < -dz || this.btn(p, 12), down: ay > dz || this.btn(p, 13) };
    /* right stick: the pointing hand */
    const rx = p.axes[2] || 0, ry = p.axes[3] || 0;
    if (Math.hypot(rx, ry) > .2) {
      const sp = 700 * dt * Math.min(1, Math.hypot(rx, ry));
      this.cx = clamp(this.cx + rx * sp, 0, innerWidth - 1); this.cy = clamp(this.cy + ry * sp, 0, innerHeight - 1); this.curT = 5;
      if (this.held) this.ptr('pointermove');
    } else if (!this.held) this.curT = Math.max(0, this.curT - dt);
    const cur = $('padcur'); cur.style.display = this.curT > 0 ? 'block' : 'none'; cur.style.transform = `translate(${this.cx - 6}px,${this.cy - 4}px)`; cur.classList.toggle('dn', this.held);
    const A = this.btn(p, 0);
    if (this.curT > 0 || this.held) {
      /* A presses with the hand */
      if (A && !this.prev[0]) { AU.init(); this.held = true; this.ptr('pointerdown'); }
      else if (!A && this.held) { this.held = false; this.ptr('pointerup'); }
      for (const k in this.dirs) if (this.dirs[k] && UI.open) { this.dirs[k] = 0; K[k] = 0; }
    } else if (UI.open) {
      for (const k in this.dirs) if (this.dirs[k]) { this.dirs[k] = 0; K[k] = 0; }
      const d = ['up', 'down', 'left', 'right'].find(k => now[k]) || '';
      if (d && d !== this.repDir) { this.move(d); this.rep = .4; }
      else if (d) { this.rep -= dt; if (this.rep <= 0) { this.move(d); this.rep = .14; } }
      this.repDir = d;
      if (this.edge(p, 0)) { AU.init(); this.ensureFocus(); this.press(this.focus); }
      if (this.edge(p, 1)) this.back();
      const sc = (this.btn(p, 7) ? 1 : 0) - (this.btn(p, 6) ? 1 : 0); if (sc) $('panel').scrollBy(0, sc * 900 * dt);
    } else {
      if (this.focus) this.setFocus(null);
      this.repDir = '';
      for (const k in now) { if (now[k] && !this.dirs[k]) { K[k] = 1; JP[k] = 1; } else if (!now[k] && this.dirs[k]) K[k] = 0; this.dirs[k] = now[k] ? 1 : 0; }
      const San = typeof Sanct !== 'undefined' && MODE === Sanct;
      if (this.edge(p, 0)) { AU.init(); JP.jump = 1; K.jump = 1; } else if (!A && this.prev[0]) K.jump = 0;
      if (this.edge(p, 2)) { JP.KeyE = 1; JP.a_search = 1; JP.a_bag = 1; }
      if (this.edge(p, 3)) { if (San) JP.KeyM = 1; else { JP.KeyH = 1; JP.a_hint = 1; } }
      if (this.edge(p, 9)) JP.esc = 1;
      if (this.edge(p, 8)) { const g = $('bGoals'); if (San) JP.KeyG = 1; else if (g && g.offsetParent) g.click(); }
      if (San && (this.edge(p, 4) || this.edge(p, 5))) { const Z = Sanct.Z, n = 6; let t = (Z.tool + (this.edge(p, 5) ? 1 : n - 1)) % n; if (t === 4 && !Z.item) t = (t + (this.edge(p, 5) ? 1 : n - 1)) % n; JP['Digit' + (t + 1)] = 1; }
      if (this.edge(p, 6)) JP.Minus = 1; if (this.edge(p, 7)) JP.Equal = 1;
      if (this.edge(p, 1)) JP.KeyB = 1;
    }
    this.prev = p.buttons.map((b, i) => this.btn(p, i));
  }
};
document.body.insertAdjacentHTML('beforeend', '<div id="padcur" aria-hidden="true">👆</div>');
addEventListener('gamepadconnected', () => AU.init());
(function padLoop(ts) { const dt = Math.min(.05, Math.max(0, (ts - PAD.last) / 1000 || 0)); PAD.last = ts; try { PAD.tick(dt); } catch (e) { console.error(e); } requestAnimationFrame(padLoop); })(0);
/* a new panel: put the highlight on its main button */
const _modalPad = UI.modal.bind(UI);
UI.modal = function (html, o) { _modalPad(html, o); if (PAD.on) { PAD.focus = null; setTimeout(() => { if (PAD.on && UI.open && !PAD.focus) PAD.ensureFocus(); }, 60); } };
