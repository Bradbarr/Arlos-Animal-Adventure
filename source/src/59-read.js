/* ============ READING HELP: questions read themselves out, and answers are tap-to-hear, tap-again-to-choose ============
   Auto-read is ON by default. A child who can read (or a grown-up) can switch it off with the 🔊 button in any
   question panel, on the main menu, or on the Grown-ups page. With auto-read off, answers choose on a single tap. */
const READ = {
  on: () => !DB.set || DB.set.read !== false,
  armed: null, told: 0, hoverT: 0,
  /* the words to speak for an answer button */
  label(el) {
    let t = el.dataset.say || el.getAttribute('aria-label') || el.innerText || '';
    t = t.replace(/\s+/g, ' ').trim().replace(/(\d+)p\b/g, '$1 pence').replace(/(\d+) − (\d+)/g, '$1 take away $2').replace(/(\d+) \+ (\d+)/g, '$1 add $2').replace(/×/g, 'times');
    if (!t.replace(/[^\w]/g, '')) { const img = el.querySelector('img[alt]'); t = (img && img.alt) || 'this one'; }
    return t;
  },
  speakLabel(el, confirm) {
    const t = this.label(el), more = confirm && this.told < 3 ? '. Tap it again to choose it.' : '';
    if (confirm) this.told++;
    say(t + more);
  },
  disarm() { if (this.armed) this.armed.classList.remove('armed'); this.armed = null; },
  toggle() { DB.set.read = !this.on(); SAVE.put(); this.disarm(); try { speechSynthesis.cancel(); } catch (e) { } if (this.on()) say('Reading out loud is on.'); this.paintToggles(); },
  paintToggles() { document.querySelectorAll('.rtog').forEach(b => { b.textContent = this.on() ? '🔊 Reading aloud: ON' : '🔇 Reading aloud: OFF'; b.classList.toggle('sel', this.on()); }); },
  toggleBtn: () => `<button class="btn sm rtog" type="button">🔊 Reading aloud: ON</button>`
};
/* answer buttons that need a second tap to choose (when reading aloud is on) */
const READ_CONFIRM = '.lopt, #panel .food';
/* things that just say their name when tapped */
const READ_SAY = '.ltile, .acell, .lcoin, .chap';
document.addEventListener('click', e => {
  const tg = e.target.closest && e.target.closest('.rtog'); if (tg) { e.stopImmediatePropagation(); e.preventDefault(); AU.init(); READ.toggle(); return; }
  if (!READ.on()) return;
  const el = e.target.closest && e.target.closest(READ_CONFIRM);
  if (el && !el.classList.contains('out') && !el.classList.contains('good') && !el.disabled) {
    if (READ.armed !== el || !document.body.contains(el)) {
      e.stopImmediatePropagation(); e.preventDefault(); AU.init();
      READ.disarm(); READ.armed = el; el.classList.add('armed'); AU.tone(880, .05, { type: 'sine', vol: .06 });
      READ.speakLabel(el, true); return;
    }
    READ.disarm(); return;   // second tap on the same answer: let it through to choose it
  }
  const s = e.target.closest && e.target.closest(READ_SAY);
  if (s) { const t = s.classList.contains('ltile') ? s.dataset.ch : READ.label(s); if (t) say(t); }
}, true);
/* on a computer, pointing at an answer reads it out */
document.addEventListener('pointerover', e => {
  if (e.pointerType !== 'mouse' || !READ.on()) return;
  const el = e.target.closest && e.target.closest(READ_CONFIRM); if (!el || el === READ.hovered) return;
  READ.hovered = el; clearTimeout(READ.hoverT); READ.hoverT = setTimeout(() => { if (READ.hovered === el) READ.speakLabel(el, false); }, 350);
}, true);
document.addEventListener('pointerout', e => { if (e.pointerType === 'mouse' && e.target.closest && e.target.closest(READ_CONFIRM) === READ.hovered) { READ.hovered = null; clearTimeout(READ.hoverT); } }, true);

/* questions read themselves out */
const _setQ = Learn.setQ.bind(Learn);
Learn.setQ = function (html, sayTxt, hintFn) {
  _setQ(html, sayTxt, hintFn); READ.disarm();
  if (READ.on() && sayTxt && !this.fast) { clearTimeout(this.readT); this.readT = setTimeout(() => { if (this.cur && this.cur.say === sayTxt) say(sayTxt); }, 250); }
};
/* any panel with a "Read to me" button reads itself out, and gets the on/off switch */
const _modal = UI.modal.bind(UI);
UI.modal = function (html, o = {}) {
  _modal(html, o); READ.disarm();
  const p = $('panel'), sb = p.querySelector('[data-say], #lsay');
  if (!sb) return;
  if (!p.querySelector('.rtog')) sb.insertAdjacentHTML('afterend', READ.toggleBtn()); READ.paintToggles();
  if (READ.on() && sb.dataset.say && !Learn.fast) { const t = sb.dataset.say; setTimeout(() => { if (UI.open && document.body.contains(sb)) say(t); }, 300); }
};
/* the switch also lives on the main menu */
const _showMenuRead = showMenu;
showMenu = function () { _showMenuRead(); const p = $('panel'), r = p && p.querySelector('#m10'); if (r && !p.querySelector('.rtog')) { r.insertAdjacentHTML('afterend', READ.toggleBtn()); READ.paintToggles(); } };
