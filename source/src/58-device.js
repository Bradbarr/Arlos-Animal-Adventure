/* ============ PHONES AND TABLETS: full screen, keep the screen awake, installed app ============ */
const DEVICE = {
  standalone: () => matchMedia('(display-mode: fullscreen), (display-mode: standalone)').matches || navigator.standalone === true,
  canFull: () => !!(document.fullscreenEnabled || document.webkitFullscreenEnabled) && !DEVICE.standalone(),
  isFull: () => !!(document.fullscreenElement || document.webkitFullscreenElement),
  toggleFull() {
    const d = document, el = d.documentElement;
    try {
      if (DEVICE.isFull()) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
      else { const r = (el.requestFullscreen || el.webkitRequestFullscreen).call(el, { navigationUI: 'hide' }); if (r && r.catch) r.catch(() => { }); }
    } catch (e) { }
  },
  /* stop the screen dimming while Arlo is playing (where the device allows it) */
  lock: null,
  async wake() { try { if ('wakeLock' in navigator && !DEVICE.lock && document.visibilityState === 'visible') { DEVICE.lock = await navigator.wakeLock.request('screen'); DEVICE.lock.addEventListener('release', () => { DEVICE.lock = null; }); } } catch (e) { DEVICE.lock = null; } }
};
addEventListener('pointerdown', () => DEVICE.wake(), { passive: true });
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') DEVICE.wake(); });
const _showMenuDev = showMenu;
showMenu = function () {
  _showMenuDev();
  const p = $('panel'); if (!p || !DEVICE.canFull()) return;
  const b = document.createElement('button'); b.className = 'btn sm'; b.id = 'mfs'; b.textContent = DEVICE.isFull() ? '⤡ Leave full screen' : '⛶ Full screen';
  b.onclick = () => { AU.init(); DEVICE.toggleFull(); setTimeout(showMenu, 300); };
  const row = p.querySelector('#m10'); if (row) row.after(b); else p.appendChild(b);
};
