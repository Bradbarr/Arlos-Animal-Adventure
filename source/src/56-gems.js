/* ============ THE RANGER HUT: a Treasure Shop paid with 💎 from the Story landscapes ============ */
const GEMSHOP = [
  { k: 'meat', n: 3, cost: 3, d: 'Food for lions, owls and snow leopards' },
  { k: 'sapling', n: 3, cost: 6, d: 'Three trees to plant' },
  { k: 'wood', n: 10, cost: 8, d: 'Ten pieces of wood' },
  { k: 'fence', n: 10, cost: 8, d: 'Ten fence pieces, ready to build' },
  { k: 'boulder', n: 4, cost: 10, d: 'Enough for a boulder cave' },
  { k: 'chest', n: 1, cost: 20, d: 'Treasure chest decoration' },
  { k: 'swing', n: 1, cost: 30, d: 'A swing for playful animals' },
  { k: 'fountain', n: 1, cost: 40, d: 'A splashing fountain' },
  { k: 'arch', n: 1, cost: 50, d: 'A rainbow to walk under' },
  { k: 'statue', n: 1, cost: 75, d: 'A shiny golden statue of Ranger Arlo!' }
];
Object.assign(Sanct, {
  showGemShop() {
    const Z = this.Z, have = DB.gems || 0;
    UI.modal(`<h2>💎 RANGER HUT: TREASURE SHOP</h2><p>You have <b>${have} 💎</b></p><p class="small">💎 Treasures can only be found in the Story landscapes. Collect them as you search for babies, answer Ranger Signs for 3 more, and come back to finished landscapes: their treasures sparkle back after a while!</p>
    <div class="list">${GEMSHOP.map((it, i) => `<div class="li ${have >= it.cost ? '' : 'dis'}" data-g="${i}"><img class="pix" src="${iconURL(it.k)}" alt=""><b>${ITEM[it.k].n}${it.n > 1 ? ' x' + it.n : ''}<br><span class="small">${it.d}</span></b><i>${it.cost} 💎</i></div>`).join('')}</div>
    <button class="btn sm" id="ghunt">🔦 Go treasure hunting</button><button class="btn go" id="gx">CLOSE</button>`, { wide: true });
    UI.on('gx', () => UI.close());
    UI.on('ghunt', () => { this.save(); UI.close(); showChapters(goMenu); });
    $('panel').querySelectorAll('[data-g]').forEach(el => el.onclick = () => {
      AU.init(); const it = GEMSHOP[+el.dataset.g], have = DB.gems || 0;
      if (have < it.cost) { SFX.nope(); UI.toast(`You need ${it.cost} 💎 but you have ${have}. That is ${it.cost - have} more. Find them in the Story landscapes!`, 3800); return; }
      const after = have - it.cost;
      UI.modal(`<h2>BUY ${ITEM[it.k].n.toUpperCase()}?</h2><img class="pix lpic sm" src="${iconURL(it.k)}" alt=""><p class="lbig">${have} − ${it.cost} = ?</p><p class="small">Work out how many 💎 you will have left.</p><div class="lopts">${shuffle([...new Set([after, after + ri(1, 3), Math.max(0, after - ri(1, 3)), after + 10])]).slice(0, 3).concat([]).map(v => v).filter((v, i, a) => a.indexOf(v) === i).map(v => `<button class="lopt" data-v="${v}"><b>${v}</b></button>`).join('')}</div><p class="lmsg" id="lmsg">&nbsp;</p><button class="btn sm" id="gb">Back</button>`);
      if (!$('panel').querySelector(`[data-v="${after}"]`)) $('panel').querySelector('.lopts').insertAdjacentHTML('beforeend', `<button class="lopt" data-v="${after}"><b>${after}</b></button>`);
      UI.on('gb', () => this.showGemShop());
      $('panel').querySelectorAll('[data-v]').forEach(b => b.onclick = () => {
        AU.init();
        if (+b.dataset.v !== after) { SFX.nope(); b.classList.add('bad'); $('lmsg').className = 'lmsg no'; $('lmsg').textContent = `Not quite. Count back ${it.cost} from ${have}.`; setTimeout(() => b.classList.add('out'), 400); return; }
        DB.gems = after; Z.inv[it.k] = (Z.inv[it.k] || 0) + it.n; this.hotK = ''; this.hudK = ''; SFX.yes(); SFX.jingle(); this.save();
        UI.modal(`<h2>THANK YOU, RANGER!</h2><img class="pix lpic sm" src="${iconURL(it.k)}" alt=""><p>${have} − ${it.cost} = <b>${after}</b>. You have ${after} 💎 left.</p><p class="small">${ITEM[it.k].obj ? 'It is in your 🎒 bag. Pick it, then press USE to place it. Decorations make animals happier!' : 'It is in your 🎒 bag.'}</p><button class="btn go" id="gk">SHOP MORE</button><button class="btn sm" id="gd">Done</button>`);
        UI.on('gk', () => this.showGemShop()); UI.on('gd', () => UI.close());
      });
    });
    if (!DB.tips.hut) { DB.tips.hut = 1; say('Welcome to the Ranger Hut! Spend the treasures you find in the Story landscapes.'); }
  }
});
