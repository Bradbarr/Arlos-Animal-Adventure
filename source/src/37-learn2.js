/* ============ VERSION 4 LEARNING: nature, money, time, phonics, quick questions, skills ============ */
STRAND.F = ['🌍', 'Nature & Science'];
TASKS.A.push('bonds', 'coins', 'clock');
TASKS.B.push('phonics', 'tricky');
TASKS.F = ['habitat', 'diet', 'lifecycle', 'protect'];
Object.assign(TITLES, { bonds: 'MAKE TEN', coins: 'COUNT THE COINS', clock: 'WHAT TIME IS IT?', phonics: 'FIRST SOUNDS', tricky: 'TRICKY WORDS',
  habitat: 'WHERE DO THEY LIVE?', diet: 'WHAT DO THEY EAT?', lifecycle: 'HOW DO THEY GROW?', protect: 'BE A NATURE HELPER' });

/* ---- LEARN DATA (version 4) ---- */
const TRICKY = ['the', 'said', 'was', 'you', 'they', 'my', 'are', 'come', 'some', 'one', 'what', 'where', 'there', 'have', 'like', 'here', 'little', 'do', 'to', 'go', 'no', 'she', 'he', 'we', 'me', 'be', 'all', 'was', 'saw', 'out'];
const LOOKALIKE = { the: ['then', 'they'], said: ['sad', 'sand'], was: ['saw', 'wash'], you: ['your', 'yes'], they: ['then', 'the'], my: ['me', 'by'], are: ['ear', 'arm'], come: ['came', 'some'], some: ['same', 'come'], one: ['on', 'own'], what: ['want', 'that'], where: ['were', 'here'], there: ['three', 'their'], have: ['hive', 'gave'], like: ['lick', 'lake'], here: ['her', 'hear'], little: ['litter', 'kettle'], do: ['go', 'no'], to: ['too', 'two'], go: ['do', 'got'], no: ['on', 'now'], she: ['he', 'see'], he: ['me', 'she'], we: ['me', 'wet'], me: ['my', 'we'], be: ['by', 'bee'], all: ['ball', 'tall'], saw: ['was', 'sew'], out: ['our', 'cut'] };
const PROTECT = [
  ['There is litter on the beach. Sea animals might try to eat it.', 'Pick it up and put it in a bin', 'Leave it where it is', 'Litter can hurt animals. A clean beach keeps them safe.'],
  ['You find a bird nest with eggs in a hedge.', 'Look quietly from far away', 'Take an egg home', 'Mum bird needs her eggs. Watching quietly keeps them safe.'],
  ['Bees need flowers to find their food.', 'Plant flowers in the garden', 'Pull up all the flowers', 'More flowers means more food for bees and butterflies.'],
  ['A hedgehog wants to walk from garden to garden at night.', 'Make a little gap under the fence', 'Block every gap', 'Hedgehog highways help them find food and friends.'],
  ['Rhinos and elephants are in danger in the wild.', 'Rangers watch over them and keep them safe', 'Chase them for fun', 'Rangers like Arlo help endangered animals.'],
  ['The tap is running while you brush your teeth.', 'Turn it off to save water', 'Let it run all day', 'Saving water helps animals and plants too.'],
  ['You lift a stone in a rock pool and find a crab.', 'Put the stone back gently', 'Throw the stone', 'The stone is the crab\'s home. Put it back the way you found it.'],
  ['A baby bird is on the grass, hopping about. Its parents are nearby.', 'Leave it alone and watch from far away', 'Pick it up and take it home', 'Its mum and dad are still feeding it. Give them space.'],
  ['You have finished your drink at the park.', 'Put the bottle in the recycling bin', 'Throw it in the pond', 'Recycling keeps ponds clean for frogs and ducks.'],
  ['Trees give animals homes and food.', 'Plant a tree and look after it', 'Snap off the branches', 'One tree can be home to hundreds of creatures.']
];
const SEASONQ = [
  ['In which season do many trees lose their leaves?', 'Autumn', ['Summer', 'Spring']],
  ['In which season is it usually coldest?', 'Winter', ['Summer', 'Autumn']],
  ['In which season do lambs and baby birds arrive?', 'Spring', ['Winter', 'Autumn']],
  ['In which season is it usually hottest?', 'Summer', ['Winter', 'Autumn']],
  ['What falls from clouds and makes puddles?', 'Rain', ['Sand', 'Leaves']],
  ['What do we see in the sky when the sun shines through rain?', 'A rainbow', ['A star', 'A moon']],
  ['Which animal sleeps all winter?', 'A dormouse', ['A duck', 'A camel']],
  ['What do plants need to grow?', 'Water and sunlight', ['Sweets', 'Darkness']]
];
const HABCAT = { gorilla: 'jungle', polarbear: 'ice', turtle: 'sea', lion: 'grass', capybara: 'river', flamingo: 'water', hedgehog: 'garden', duck: 'pond', snowleopard: 'mountain', camel: 'desert',
  fox: 'wood', badger: 'wood', redsquirrel: 'wood', dormouse: 'hedge', barnowl: 'farm', otter: 'river', kingfisher: 'river', frog: 'pond', ladybird: 'garden', bumblebee: 'garden',
  puffin: 'sea', seal: 'sea', crab: 'sea', starfish: 'sea', shark: 'sea', elephant: 'grass', rhino: 'grass', kangaroo: 'desert', eagle: 'mountain', tortoise: 'island' };
const HABNAME = { jungle: 'the JUNGLE', ice: 'the ICE and SNOW', sea: 'the SEA', grass: 'the GRASSY PLAINS', river: 'a RIVER', water: 'a salty LAKE', garden: 'a GARDEN', pond: 'a POND', mountain: 'the MOUNTAINS', desert: 'a hot, dry DESERT', wood: 'a WOOD', hedge: 'a HEDGE', farm: 'a FARM', island: 'an ISLAND' };
const DIETW = { plants: ['🌿', 'Plants'], meat: ['🍖', 'Meat'], both: ['🌿🍖', 'Both'] };
const COINV = [1, 2, 5, 10, 20];
/* ---- end of version 4 LEARN DATA ---- */

const coinH = (v, cls) => `<span class="coin c${v} ${cls || ''}">${v}p</span>`;
const coinsH = list => `<div class="coins">${list.map(v => coinH(v)).join('')}</div>`;
function clockH(h, m, size) {
  const S = size || 120, c = S / 2, r = S / 2 - 6; let t = '';
  for (let k = 1; k <= 12; k++) { const a = k / 12 * TAU - TAU / 4; t += `<text x="${(c + Math.cos(a) * (r - 13)).toFixed(1)}" y="${(c + Math.sin(a) * (r - 13) + 4).toFixed(1)}" font-size="${S / 10}" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="900" fill="#222">${k}</text>`; }
  const ma = m / 60 * TAU - TAU / 4, ha = ((h % 12) + m / 60) / 12 * TAU - TAU / 4;
  return `<svg class="lclock" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}"><circle cx="${c}" cy="${c}" r="${r}" fill="#fff" stroke="#222" stroke-width="5"/>${t}<line x1="${c}" y1="${c}" x2="${(c + Math.cos(ha) * r * .5).toFixed(1)}" y2="${(c + Math.sin(ha) * r * .5).toFixed(1)}" stroke="#e5342b" stroke-width="6" stroke-linecap="round"/><line x1="${c}" y1="${c}" x2="${(c + Math.cos(ma) * r * .78).toFixed(1)}" y2="${(c + Math.sin(ma) * r * .78).toFixed(1)}" stroke="#222" stroke-width="4" stroke-linecap="round"/><circle cx="${c}" cy="${c}" r="4" fill="#222"/></svg>`;
}
const timeW = (h, m) => m === 0 ? `${h} o'clock` : m === 30 ? `half past ${h}` : m === 15 ? `quarter past ${h}` : `quarter to ${h % 12 + 1}`;
function tenFrame(n, tot) { let s = ''; for (let f = 0; f < tot / 10; f++) { s += '<div class="tf">'; for (let i = 0; i < 10; i++) s += `<i class="${f * 10 + i < n ? 'on' : ''}"></i>`; s += '</div>'; } return `<div class="tfw">${s}</div>`; }
const portH = (id, b, cls) => `<img class="pix lport ${cls || ''}" src="${portrait(id, b)}" alt="">`;
function otherAnimals(an, n, test) { return shuffle(AIDS.filter(i => i !== an && (!test || test(i)))).slice(0, n); }
function makeCoins(total, maxC) { const out = []; let left = total; while (left > 0 && out.length < 9) { const cs = COINV.filter(v => v <= Math.min(left, maxC)); const v = rnd() < .7 ? cs[cs.length - 1] : pick(cs); out.push(v); left -= v; } return out.sort((a, b) => b - a); }

Object.assign(TASK, {
  /* ---------- A: maths ---------- */
  bonds(c, end) {
    const T = [5, 10, 20][c.lv];
    const round = nx => { const n = ri(1, T - 1), ans = T - n; Learn.ask(`${n} and how many more make ${T}?`, numOpts(ans, 0, T), nx, { top: tenFrame(n, T <= 10 ? 10 : 20) + `<p class="lbig">${n} + ? = ${T}</p>`, say: `${n} and how many more make ${T}?`, right: `${n} + ${ans} = ${T}. Brilliant!`, hint: 'Count the empty boxes. I took one wrong answer away.' }); };
    Learn.seq([round, round, round], end);
  },
  coins(c, end) {
    const mx = [2, 5, 10][c.lv], top = [6, 12, 25][c.lv];
    const count = nx => { const tot = ri(2, top), list = makeCoins(tot, mx); Learn.ask('How much money is this altogether?', shuffle([...new Set([tot, tot + ri(1, 3), Math.max(1, tot - ri(1, 3))])]).map(v => ({ h: `<b>${v}p</b>`, ok: v === tot })), nx, { top: coinsH(list), right: `Yes! That makes ${tot}p.`, hint: 'Start with the biggest coin, then count on.' }); };
    const most = nx => { const vs = shuffle(COINV.filter(v => v <= Math.max(5, mx * 2))).slice(0, 3), b = Math.max(...vs); Learn.ask('Which coin is worth the MOST?', vs.map(v => ({ h: coinH(v, 'big'), ok: v === b })), nx, { cls: 'big', right: `${b}p is worth the most.` }); };
    const pay = nx => {
      const A = ANIMALS[c.an], price = ri(3, [6, 10, 20][c.lv]); let tray = [];
      const draw = () => {
        const sum = tray.reduce((s, v) => s + v, 0);
        Learn.setQ(`<img class="pix lpic sm" src="${iconURL(A.food)}" alt=""><p class="lq">The ${FOODS[A.food].toLowerCase()} costs <b>${price}p</b>. Tap coins to pay exactly ${price}p.</p><div class="coins tray">${tray.map(v => coinH(v)).join('') || '<i class="small">Empty</i>'}</div><p class="lbig">${sum}p</p><div class="coins">${COINV.filter(v => v <= Math.max(2, mx)).map(v => `<button class="lcoin" data-v="${v}">${coinH(v, 'big')}</button>`).join('')}</div><button class="btn sm" id="lcu">↩ Take back</button><button class="btn go" id="lcp">PAY</button>`, `The food costs ${price} pence. Tap coins to pay exactly ${price} pence.`, () => Learn.msg(`Try ${price > 5 && mx >= 5 ? 'a 5p coin first, then count on' : 'some 1p and 2p coins'}.`));
        $('lt').querySelectorAll('.lcoin').forEach(b => b.onclick = () => { AU.init(); tray.push(+b.dataset.v); SFX.pop(); draw(); });
        $('lcu').onclick = () => { tray.pop(); SFX.click(); draw(); };
        $('lcp').onclick = () => { const s = tray.reduce((q, v) => q + v, 0); if (s === price) { SFX.yes(); Learn.msg(`${tray.join(' + ')} = ${price}p. Paid!`, 'ok'); Learn.later(nx, 1300); } else { c.miss++; SFX.nope(); Learn.msg(s > price ? `That is ${s}p. Too much! Take a coin back.` : `That is ${s}p. You need ${price - s}p more.`, 'no'); } };
      };
      draw();
    };
    Learn.seq([count, most, pay], end);
  },
  clock(c, end) {
    const mins = [[0], [0, 30], [0, 30, 15, 45]][c.lv];
    const round = nx => {
      const h = ri(1, 12), m = pick(mins), ans = timeW(h, m), o = new Set([ans]);
      while (o.size < 3) o.add(timeW(ri(1, 12), pick(mins.length > 1 ? mins : [0])));
      Learn.ask('What time does the clock say?', shuffle([...o]).map(v => ({ h: v, ok: v === ans })), nx, { top: clockH(h, m, 130), right: `Yes! It is ${ans}.`, hint: m === 0 ? 'When the long hand points to 12, it is o\'clock. Look at the short hand.' : 'The long hand on 6 means half past.' });
    };
    Learn.seq([round, round, round], end);
  },
  /* ---------- B: reading ---------- */
  phonics(c, end) {
    const pool = shuffle(WORDS.slice()).slice(0, 3), endS = c.lv === 2;
    Learn.seq(pool.map(([em, w], k) => nx => {
      const last = endS && k === 2, ch = last ? w[w.length - 1] : w[0], o = new Set([ch]);
      while (o.size < 3) o.add('BCDFGHKLMNPRSTW'[ri(0, 14)]);
      Learn.ask(`Which sound does <b>${w.toLowerCase()}</b> ${last ? 'END' : 'START'} with?`, shuffle([...o]).map(q => ({ h: `<b>${q.toLowerCase()}</b>`, ok: q === ch })), nx, { top: `<div class="lem big">${em}</div>`, say: `${w.toLowerCase()}. Which sound does ${w.toLowerCase()} ${last ? 'end' : 'start'} with?`, right: `${w.toLowerCase()} ${last ? 'ends' : 'starts'} with ${ch.toLowerCase()}!` });
    }), end);
  },
  tricky(c, end) {
    const pool = shuffle([...new Set(TRICKY)]).slice(0, 3);
    Learn.seq(pool.map(w => nx => { const opts = shuffle([w, ...(LOOKALIKE[w] || ['cat', 'dog'])]); Learn.ask(`Find the word <b>“${w}”</b>.`, opts.map(q => ({ h: `<span class="lword sm">${q}</span>`, ok: q === w })), nx, { say: `Find the word ${w}.`, right: `Yes, that says ${w}!`, hint: 'Look at every letter carefully.' }); }), end);
  },
  /* ---------- F: nature and science ---------- */
  habitat(c, end) {
    const A = ANIMALS[c.an], cat = HABCAT[c.an], oth = otherAnimals(c.an, 2, i => HABCAT[i] !== cat && ANIMALS[i].biome !== A.biome);
    Learn.seq([
      nx => Learn.ask(`Where does the ${A.name.toLowerCase()} live?`, shuffle([c.an, ...oth]).map(i => ({ h: `<img class="pix lscene" src="${Learn.scene(i === c.an ? c.an : i)}" alt="${BIOMES[ANIMALS[i].biome].name}">`, ok: i === c.an })), nx, { top: portH(c.an, false), right: `Yes! It lives in ${A.home}.`, wait: 1800 }),
      nx => { const cats = shuffle([...new Set(Object.values(HABCAT))]), k = cats[0], yes = pick(AIDS.filter(i => HABCAT[i] === k)), no = otherAnimals(yes, 2, i => HABCAT[i] !== k); Learn.ask(`Which animal lives in ${HABNAME[k]}?`, shuffle([yes, ...no]).map(i => ({ h: portH(i, false) + `<br>${ANIMALS[i].name}`, ok: i === yes })), nx, { cls: 'big', right: `Yes! The ${ANIMALS[yes].name.toLowerCase()} lives in ${ANIMALS[yes].home}.`, wait: 2000 }); }
    ], end);
  },
  diet(c, end) {
    const A = ANIMALS[c.an], d = A.diet || 'plants';
    const which = (want, nx) => { const yes = pick(AIDS.filter(i => ANIMALS[i].diet === want)), no = otherAnimals(yes, 2, i => ANIMALS[i].diet && ANIMALS[i].diet !== want && ANIMALS[i].diet !== 'both'); Learn.ask(`Which animal is a ${want === 'plants' ? 'PLANT-eater' : 'MEAT-eater'}?`, shuffle([yes, ...no]).map(i => ({ h: portH(i, false) + `<br>${ANIMALS[i].name}`, ok: i === yes })), nx, { cls: 'big', right: `Yes! The ${ANIMALS[yes].name.toLowerCase()} eats ${ANIMALS[yes].eats}.`, wait: 2000 }); };
    Learn.seq([
      nx => Learn.ask(`The ${A.name.toLowerCase()} eats ${A.eats}. Does it eat plants, meat, or both?`, ['plants', 'meat', 'both'].map(k => ({ h: `<span class="lem">${DIETW[k][0]}</span><br>${DIETW[k][1]}`, ok: k === d })), nx, { top: portH(c.an, false), cls: 'big', right: d === 'plants' ? 'Yes! Plant-eaters are called herbivores.' : d === 'meat' ? 'Yes! Meat-eaters are called carnivores.' : 'Yes! Animals that eat both are called omnivores.', wait: 2200 }),
      nx => which('plants', nx), nx => which('meat', nx)
    ], end);
  },
  lifecycle(c, end) {
    const A = ANIMALS[c.an];
    const st = A.stages || (A.egg ? [['🥚', 'Egg'], ['B', cap1(A.baby)], ['A', 'Grown-up']] : [['B', 'New baby'], ['Y', cap1(A.baby)], ['A', 'Grown-up']]);
    const show = t => t[0] === 'B' ? portH(c.an, true, 'sm') : t[0] === 'Y' ? portH(c.an, true) : t[0] === 'A' ? portH(c.an, false) : `<span class="lem">${t[0]}</span>`;
    const one = (q, items, pic) => nx => {
      const sh = shuffle(items.map((t, i) => ({ t, i }))); if (sh.every((p, k) => p.i === k)) sh.reverse(); let pos = 0;
      Learn.setQ(`<p class="lq">${q} Tap them in order, first to last.</p><div class="lopts big">${sh.map(p => `<button class="lopt" data-i="${p.i}">${pic(p.t)}<br>${p.t[1]}<em></em></button>`).join('')}</div>`, `${q} Tap them in order, first to last.`, () => { const b = $('lt').querySelector(`.lopt[data-i="${pos}"]`); if (b) b.classList.add('glow'); Learn.msg('The glowing one comes next.'); });
      $('lt').querySelectorAll('.lopt').forEach(b => b.onclick = () => {
        AU.init(); const i = +b.dataset.i; if (b.classList.contains('good')) return;
        if (i === pos) { b.classList.add('good'); b.classList.remove('glow'); b.querySelector('em').textContent = pos + 1; pos++; SFX.pop(); if (pos === items.length) { SFX.yes(); Learn.msg(items.map(t => t[1]).join(' → '), 'ok'); Learn.later(nx, 1600); } }
        else { c.miss++; b.classList.add('bad'); SFX.nope(); Learn.msg(pos ? 'Not yet. What comes next?' : 'What comes first?', 'no'); setTimeout(() => b.classList.remove('bad'), 400); }
      });
    };
    const life = ORDERS.filter(o => /grow/.test(o[0]));
    Learn.seq([one(`How does a ${A.name.toLowerCase()} grow up?`, st, show), one(...pick(life), t => `<span class="lem">${t[0]}</span>`)], end);
  },
  protect(c, end) { const sets = shuffle(PROTECT.slice()).slice(0, 3); Learn.seq(sets.map(([q, good, bad, why]) => nx => Learn.ask(`${q} What should a nature helper do?`, shuffle([{ h: good, ok: true }, { h: bad, why: 'Hmm. Would that help the animals? Try the other one.' }]), nx, { right: why, wait: 2400 })), end); }
});

/* ---------- one quick question: Ranger Signs and Sanctuary jobs ---------- */
Learn.quickQ = function (an, kind) {
  const lv = lvl(), A = ANIMALS[an] || ANIMALS.fox, k = kind || pick(['maths', 'maths', 'sound', 'nature', 'time', 'coins', 'season']);
  if (k === 'maths') { let Q; do { Q = this.mathQ(lv); } while (Q.a < 0); return { q: `<span class="lbig">${Q.q}</span>`, opts: numOpts(Q.a, 0, Math.max(12, Q.a + 4)), top: Q.top || '', say: Q.say || Q.q, right: `Yes! The answer is ${Q.a}.` }; }
  if (k === 'sound') { const [em, w] = pick(WORDS), ch = w[0], o = new Set([ch]); while (o.size < 3) o.add('BCDFGHKLMNPRSTW'[ri(0, 14)]); return { q: `Which sound does <b>${w.toLowerCase()}</b> start with?`, opts: shuffle([...o]).map(q => ({ h: `<b>${q.toLowerCase()}</b>`, ok: q === ch })), top: `<div class="lem big">${em}</div>`, say: `Which sound does ${w.toLowerCase()} start with?`, right: `${w.toLowerCase()} starts with ${ch.toLowerCase()}!` }; }
  if (k === 'time') { const h = ri(1, 12), m = lv ? pick([0, 30]) : 0, ans = timeW(h, m), o = new Set([ans]); while (o.size < 3) o.add(timeW(ri(1, 12), m)); return { q: 'What time does the clock say?', opts: shuffle([...o]).map(v => ({ h: v, ok: v === ans })), top: clockH(h, m, 110), say: 'What time does the clock say?', right: `It is ${ans}!` }; }
  if (k === 'coins') { const tot = ri(2, [6, 10, 20][lv]), list = makeCoins(tot, [2, 5, 10][lv]); return { q: 'How much money is this?', opts: shuffle([...new Set([tot, tot + 1, tot + 2])]).map(v => ({ h: `<b>${v}p</b>`, ok: v === tot })), top: coinsH(list), say: 'How much money is this?', right: `That makes ${tot}p!` }; }
  if (k === 'season') { const [q, a, w] = pick(SEASONQ); return { q, opts: shuffle([a, ...w]).map(v => ({ h: v, ok: v === a })), top: '', say: q, right: `Yes! ${a}.` }; }
  const R = READQ[an]; if (R && rnd() < .5) return { q: R.q, opts: shuffle([{ h: R.a, ok: true }, ...R.w.map(h => ({ h }))]), top: portH(an, true), say: `${A.fact} ${R.q}`, right: A.fact };
  const oth = otherAnimals(an, 2).map(i => ANIMALS[i].baby); return { q: `What is a baby ${A.name.toLowerCase()} called?`, opts: shuffle([{ h: cap1(A.baby), ok: true }, ...oth.map(h => ({ h: cap1(h) }))]), top: portH(an, true), say: `What is a baby ${A.name.toLowerCase()} called?`, right: `A baby ${A.name.toLowerCase()} is called a ${A.baby}.` };
};
/* run a short list of questions in a little panel; done(misses) */
Learn.quiz = function (title, qs, done, o = {}) {
  const c = this.cur = { strand: 'Q', name: 'quick', miss: 0, hints: 0, clean: [], lv: lvl() };
  UI.modal(`<h2>${title}</h2>${o.intro ? `<p class="small">${o.intro}</p>` : ''}<div id="lt"></div><p class="lmsg" id="lmsg">&nbsp;</p><div class="lrow"><button class="btn sm" id="lsay">🔊 Read to me</button><button class="btn sm" id="lhint">💡 Hint</button><button class="btn sm" id="lback">Not now</button></div>`, { wide: true });
  $('lsay').onclick = () => { AU.init(); say(c.say || ''); };
  $('lhint').onclick = () => { AU.init(); c.hints++; if (c.hintFn) c.hintFn(); };
  $('lback').onclick = () => { SFX.click(); this.cur = null; UI.close(); if (o.cancel) o.cancel(); };
  this.seq(qs.map(Q => nx => this.ask(Q.q, Q.opts, nx, { top: Q.top, say: Q.say, right: Q.right, cls: Q.cls, wait: 1500 })), () => { this.cur = null; done(c.miss); });
};

/* ---------- the plan for a 10-landscape trail: maths, reading and nature twice, the rest at least once ---------- */
Learn.plan = function (seed) {
  const r = RNG((seed ^ 0x5ea1) >>> 0), extra = ['C', 'D', 'E'][(r() * 3) | 0]; let a;
  const base = ['A', 'A', 'B', 'B', 'F', 'F', 'C', 'D', 'E', extra], ok = q => q.every((s, i) => !i || s !== q[i - 1]);
  for (let k = 0; k < 400; k++) { a = shuffle(base.slice(), r); if (ok(a)) break; }
  if (!ok(a)) a = ['A', 'B', 'F', 'C', 'A', 'D', 'B', 'E', 'F', extra === 'E' ? 'C' : extra];
  const t = {}; for (const s in TASKS) t[s] = shuffle([...TASKS[s].keys()], r);
  const seen = {}; return a.map(s => { seen[s] = (seen[s] || 0) + 1; return [s, t[s][(seen[s] - 1) % t[s].length]]; });
};
/* skills: stars per task are remembered. A wobbly skill comes back sooner. */
const _finish = Learn.finish.bind(Learn);
Learn.finish = function (c, done, skipped) {
  const n = c.miss + c.hints, stars = skipped ? 1 : n === 0 ? 3 : n <= 2 ? 2 : 1, S = DB.skill[c.name] || { n: 0, avg: 2 };
  S.n++; S.avg = Math.round((S.avg * .6 + stars * .4) * 100) / 100; DB.taskN = (DB.taskN || 0) + 1; S.last = DB.taskN; DB.skill[c.name] = S;
  _finish(c, done, skipped);
};
Learn.wobbly = function (strand) { return (strand ? TASKS[strand] : [].concat(...Object.values(TASKS))).filter(nm => DB.skill[nm] && DB.skill[nm].avg < 2.2 && (DB.taskN - (DB.skill[nm].last || 0)) >= 3).sort((a, b) => DB.skill[a].avg - DB.skill[b].avg); };
/* the gate may swap the planned task for a wobbly one from the same strand (gentle spaced repetition) */
Learn.choose = function (s, ti) { const w = this.wobbly(s); if (w.length && rnd() < .5) return TASKS[s].indexOf(w[0]); return ti % TASKS[s].length; };
const strandOf = nm => Object.keys(TASKS).find(s => TASKS[s].includes(nm));

/* ---------- Today's practice: three tasks, wobbly skills first ---------- */
function todaysPractice(back) {
  const picks = Learn.wobbly().slice(0, 2), least = Object.keys(STRAND).sort((a, b) => (DB.learn[a] || 0) - (DB.learn[b] || 0));
  for (const s of least) { if (picks.length >= 3) break; const cand = shuffle(TASKS[s].filter(nm => !picks.includes(nm))); if (cand.length) picks.push(cand[0]); }
  let i = 0; const an = pick(DB.rescued.length ? DB.rescued : AIDS);
  const next = () => { if (i >= picks.length) { SFX.fanfare(); UI.modal(`<h1>⭐ ALL DONE!</h1><p>Three tasks finished today. Brilliant practising, Ranger Arlo!</p><button class="btn go" id="tpok">OK</button>`); UI.on('tpok', () => { UI.close(); if (back) back(); }); return; } const nm = picks[i++], s = strandOf(nm); Learn.run(s, TASKS[s].indexOf(nm), { an, practice: true }, next, () => { if (back) back(); }); };
  next();
}
const _showPractice = showPractice;
showPractice = function (back) {
  _showPractice(back);
  const p = $('panel'), b = document.createElement('div'); b.innerHTML = `<button class="btn go big" id="tdp">⭐ TODAY'S PRACTICE</button><p class="small">Three tasks picked just for you. Tricky ones come back until they feel easy.</p>`;
  p.insertBefore(b, p.children[2]); UI.on('tdp', () => todaysPractice(() => showPractice(back)));
};

/* ---------- stickers ---------- */
function addSticker(id, em, label) { if (DB.stickers.some(s => s.id === id)) return false; DB.stickers.push({ id, em, label }); SAVE.put(); UI.toast(`${em} New sticker: ${label}!`, 3200); SFX.sparkle(); return true; }
const _showBadges = showBadges;
showBadges = function (back) {
  _showBadges(back);
  const p = $('panel'), d = document.createElement('div');
  d.innerHTML = `<div class="lbl">STICKERS</div><div class="stk">${DB.stickers.length ? DB.stickers.map(s => `<span title="${s.label}"><b>${s.em}</b>${s.label}</span>`).join('') : '<p class="small">Rescue a baby from the Hideout, finish a chapter or have a Release Day to earn stickers.</p>'}</div>`;
  p.insertBefore(d, p.querySelector('#bb'));
};

/* ---------- the grown-ups page (with a check so little fingers do not wander in) ---------- */
function showGrown(back) {
  UI.modal(`<h2>👪 FOR GROWN-UPS</h2><p>Press and hold the button for 3 seconds.</p><button class="btn big" id="gh">HOLD ME</button><br><button class="btn sm" id="gx">Back</button>`, { clear: true });
  const b = $('gh'); let tm = 0;
  b.onpointerdown = e => { e.preventDefault(); b.classList.add('sel'); b.textContent = 'KEEP HOLDING…'; tm = setTimeout(quiz, Learn.fast ? 30 : 3000); };
  b.onpointerup = b.onpointerleave = b.onpointercancel = () => { clearTimeout(tm); b.classList.remove('sel'); b.textContent = 'HOLD ME'; };
  UI.on('gx', () => { UI.close(); if (back) back(); });
  const quiz = () => {
    const x = ri(6, 9), y = ri(6, 9), a = x * y, o = new Set([a]); while (o.size < 4) o.add(a + ri(-9, 9) || a + 10);
    UI.modal(`<h2>👪 FOR GROWN-UPS</h2><p class="lbig">${x} × ${y} = ?</p><p class="small">(This page is for grown-ups.)</p><div class="lopts">${shuffle([...o]).map(v => `<button class="lopt" data-v="${v}"><b>${v}</b></button>`).join('')}</div><button class="btn sm" id="gx">Back</button>`, { clear: true });
    $('panel').querySelectorAll('[data-v]').forEach(e => e.onclick = () => { if (+e.dataset.v === a) page(); else { SFX.nope(); UI.close(); if (back) back(); } });
    UI.on('gx', () => { UI.close(); if (back) back(); });
  };
  const page = () => {
    const rows = Object.keys(TASKS).map(s => `<div class="lbl">${STRAND[s][0]} ${STRAND[s][1].toUpperCase()} — ${DB.learn[s] || 0} finished</div>${TASKS[s].map(nm => { const k = DB.skill[nm]; return `<div class="li"><b>${TITLES[nm]}</b><i>${k ? `${k.n}× · ${'★'.repeat(Math.round(k.avg))}${k.avg < 2.2 ? ' ⚠ practise' : ''}` : 'not tried'}</i></div>`; }).join('')}`).join('');
    const Z = DB.sanct, homes = Z ? Z.habs.filter(h => h.arrived).length : 0;
    UI.modal(`<h2>👪 ARLO'S PROGRESS</h2><p class="small">Babies rescued: <b>${DB.rescued.length} / ${AIDS.length}</b> · Sanctuary homes: <b>${homes}</b> · Chapters finished: <b>${[1, 2, 3].filter(k => DB.chdone[k]).length} / 3</b> · Coins: <b>${DB.coins}p</b></p>
    <p class="small">⚠ marks a skill that is still wobbly. It comes back in Today's Practice and at some Task Gates until it feels easy. Nothing is ever taken away for a wrong answer.</p><div class="list">${rows}</div>
    <div class="lbl">SETTINGS</div><button class="btn sm ${DB.set.unlock ? 'sel' : ''}" id="gu">${DB.set.unlock ? '✔' : '☐'} Unlock every chapter</button>${READ.toggleBtn()}<button class="btn sm ${DB.set.raid ? 'sel' : ''}" id="gr">${DB.set.raid ? '✔' : '☐'} Sanctuary night raids</button>
    <p class="small">Everything is saved only on this device. Nothing is sent anywhere. Use 💾 Backup on the main menu to move a save.</p><button class="btn go" id="gx">DONE</button>`, { wide: true, clear: true });
    UI.on('gu', () => { DB.set.unlock = !DB.set.unlock; SAVE.put(); page(); }); READ.paintToggles(); UI.on('gr', () => { DB.set.raid = !DB.set.raid; SAVE.put(); page(); });
    UI.on('gx', () => { UI.close(); if (back) back(); });
  };
}
