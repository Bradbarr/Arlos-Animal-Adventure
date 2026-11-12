/* ============ LEARN DATA: edit or add words, questions and stories here ============ */
const STRAND = { A: ['🔢', 'Counting & Maths'], B: ['🔤', 'Spelling & Reading'], C: ['🧩', 'Problem Solving'], D: ['💛', 'Feelings'], E: ['🎨', 'Drawing & Imagination'] };
const TASKS = { A: ['count', 'bridge', 'share', 'pattern'], B: ['spell', 'read', 'missing', 'scramble'], C: ['jigsaw', 'maze', 'order', 'odd'], D: ['feel', 'story', 'breathe', 'kind'], E: ['path', 'finish', 'cosy', 'dream'] };
const TITLES = { count: 'COUNT THE FOOD', bridge: 'BUILD THE BRIDGE', share: 'SHARE IT FAIRLY', pattern: 'WHAT COMES NEXT?', spell: 'SPELL THE NAME', read: 'READ THE NOTE', missing: 'MISSING LETTER', scramble: 'MIXED-UP WORDS',
  jigsaw: 'FIX THE PICTURE', maze: 'MAZE HOME', order: 'PUT IT IN ORDER', odd: 'ODD ONE OUT', feel: 'HOW DOES BABY FEEL?', story: 'FEELINGS I KNOW', breathe: 'CALM BREATHING', kind: 'THE KIND CHOICE',
  path: 'DRAW THE PATH HOME', finish: 'FINISH THE PICTURE', cosy: 'MAKE A COSY HOME', dream: 'DREAM TIME' };
const PRAISE = ['Yes! Well done!', 'Brilliant!', 'You got it!', 'Super thinking!', 'Spot on!'];
const TRY = ['Not quite. Try again!', 'Nearly! Have another go.', 'Good try. Look again.'];
const PRAISE_END = ['Fantastic work, Ranger!', 'You are a superstar!', 'What a clever ranger!', 'Brilliant thinking!'];
const FOODW = { fruit: 'pieces of fruit', fish: 'fish', greens: 'leaves', meat: 'pieces of meat', shrimp: 'shrimp', bugs: 'bugs', seeds: 'seeds' };
const FOODSPELL = { fruit: 'FRUIT', fish: 'FISH', greens: 'LEAVES', meat: 'MEAT', shrimp: 'SHRIMP', bugs: 'BUGS', seeds: 'SEEDS' };
const HOMEW = { jungle: 'JUNGLE', arctic: 'ICE', ocean: 'SEA', savanna: 'GRASS', amazon: 'RIVER', volcano: 'ISLAND', garden: 'GARDEN', pond: 'POND', mountain: 'ROCKS', desert: 'SAND' };
const READQ = {
  gorilla: { q: 'What do gorillas build every night?', a: 'A new nest', w: ['A boat', 'A sandcastle'] },
  polarbear: { q: "What colour is a polar bear's skin?", a: 'Black', w: ['Pink', 'Green'] },
  turtle: { q: 'When do baby sea turtles hatch?', a: 'At night', w: ['At lunchtime', 'In the snow'] },
  lion: { q: 'What is a lion family called?', a: 'A pride', w: ['A school', 'A flock'] },
  capybara: { q: 'What is the capybara very good at?', a: 'Swimming', w: ['Flying', 'Climbing trees'] },
  flamingo: { q: 'What makes flamingos turn pink?', a: 'The shrimp they eat', w: ['Pink paint', 'The hot sun'] },
  hedgehog: { q: 'What does a hedgehog do when it is scared?', a: 'Rolls into a ball', w: ['Sings a song', 'Flies away'] },
  duck: { q: 'When can ducklings first swim?', a: 'The day they hatch', w: ['When they are ten', 'Never'] },
  snowleopard: { q: 'What does a snow leopard use like a scarf?', a: 'Its fluffy tail', w: ['A woolly hat', 'Its ears'] },
  camel: { q: "What is stored in a camel's hump?", a: 'Fat', w: ['Water', 'Sand'] }
};
const WORDS = [['🐟', 'FISH'], ['🥚', 'EGG'], ['🌳', 'TREE'], ['🐸', 'FROG'], ['🌞', 'SUN'], ['🌙', 'MOON'], ['🐝', 'BEE'], ['🦆', 'DUCK'], ['🐻', 'BEAR'], ['🍃', 'LEAF'], ['🐜', 'ANT'], ['🐷', 'PIG'], ['🐱', 'CAT'], ['🐶', 'DOG'], ['⭐', 'STAR'], ['🌧️', 'RAIN'],
  ['🐢', 'TURTLE'], ['🦁', 'LION'], ['🐫', 'CAMEL'], ['🌵', 'CACTUS'], ['🐒', 'MONKEY'], ['🐰', 'RABBIT'], ['🐘', 'ELEPHANT'], ['🌋', 'VOLCANO'], ['🦒', 'GIRAFFE'], ['🐧', 'PENGUIN'], ['🐯', 'TIGER'], ['🦓', 'ZEBRA']];
const ORDERS = [
  ['How does a chick grow?', [['🥚', 'Egg'], ['🐣', 'Hatching'], ['🐥', 'Chick'], ['🐔', 'Hen']]],
  ['How does a tree grow?', [['🌰', 'Seed'], ['🌱', 'Shoot'], ['🌿', 'Plant'], ['🌳', 'Tree']]],
  ['What happens in a day?', [['🌅', 'Wake up'], ['🥣', 'Breakfast'], ['⚽', 'Play'], ['🌙', 'Bedtime']]],
  ['How does a frog grow?', [['🥚', 'Frogspawn'], ['🐟', 'Tadpole'], ['🐸', 'Frog']]],
  ['A rainy day.', [['☁️', 'Clouds'], ['🧥', 'Coat on'], ['🌧️', 'Rain'], ['🌈', 'Rainbow']]],
  ['How does a butterfly grow?', [['🥚', 'Egg'], ['🐛', 'Caterpillar'], ['🦋', 'Butterfly']]],
  ['Smallest to biggest.', [['🐜', 'Ant'], ['🐈', 'Cat'], ['🐎', 'Horse'], ['🐘', 'Elephant']]]
];
const ODD = [
  ['Which one does NOT live in water?', [['🐟', 'Fish'], ['🐙', 'Octopus'], ['🐬', 'Dolphin'], ['🐫', 'Camel']], 3, 'Camels live in the dry desert.'],
  ['Which one can NOT fly?', [['🦅', 'Eagle'], ['🦋', 'Butterfly'], ['🐝', 'Bee'], ['🐢', 'Turtle']], 3, 'Turtles walk and swim, but they cannot fly.'],
  ['Which one is NOT a fruit?', [['🍎', 'Apple'], ['🍌', 'Banana'], ['🥕', 'Carrot'], ['🍇', 'Grapes']], 2, 'A carrot is a vegetable. It grows under the ground.'],
  ['Which one does NOT belong in the snow?', [['🐧', 'Penguin'], ['⛄', 'Snowman'], ['🌵', 'Cactus'], ['🧤', 'Gloves']], 2, 'A cactus grows in the hot desert.'],
  ['Which one is NOT an animal?', [['🐶', 'Dog'], ['🐸', 'Frog'], ['🚗', 'Car'], ['🐦', 'Bird']], 2, 'A car is a machine. It is not alive.'],
  ['Which one has NO legs?', [['🐍', 'Snake'], ['🐕', 'Dog'], ['🐓', 'Chicken'], ['🐜', 'Ant']], 0, 'Snakes slither along on their tummies.'],
  ['Which one is HOT?', [['❄️', 'Snowflake'], ['⛄', 'Snowman'], ['🔥', 'Fire'], ['🍦', 'Ice cream']], 2, 'Fire is hot. The others are cold.']
];
const FACES = { happy: '😀', sad: '😢', scared: '😨', angry: '😠', tired: '😴', lonely: '🥺', proud: '🤩', surprised: '😲' };
/* {b} is replaced with the baby animal's name. The FIRST "help" answer is the kind one. */
const SCENES = [
  { t: 'The {b} is lost and cannot see its mum.', f: 'scared', why: 'Being lost can feel scary.', help: ['Stay close and speak softly', 'Shout loudly', 'Run away'], kind: 'A calm, kind voice helps when someone is scared.' },
  { t: 'The {b} has found a brand new friend to play with.', f: 'happy', why: 'Friends make us feel happy.', help: ['Play together and share', 'Take the toys away', 'Ignore the friend'], kind: 'Sharing keeps the happy feeling going.' },
  { t: 'The {b} has walked a very long way and keeps yawning.', f: 'tired', why: 'A long day makes us sleepy.', help: ['A quiet, cosy rest', 'A loud drum', 'A long race'], kind: 'Rest helps a tired body feel better.' },
  { t: "Another animal took the {b}'s food without asking.", f: 'angry', why: 'It feels unfair when someone takes our things.', help: ['Take slow breaths, then ask for it back', 'Push the other animal', 'Scream and stamp'], kind: 'Calm breaths help an angry feeling get smaller.' },
  { t: "The {b}'s family has gone to find food. It is all by itself.", f: 'lonely', why: 'Being alone can feel lonely.', help: ['Sit with the baby and keep it company', 'Leave it alone', 'Laugh at it'], kind: 'Company helps when someone feels lonely.' },
  { t: 'The {b} climbed over a big log all by itself for the first time.', f: 'proud', why: 'Doing something hard makes us feel proud.', help: ['Say "Well done!"', 'Say "That was easy"', 'Say nothing'], kind: 'Kind words help others feel proud too.' },
  { t: "The {b} wanted to play, but it started to rain and everyone went home.", f: 'sad', why: 'We feel sad when fun things stop.', help: ['Give a cuddle and plan to play tomorrow', 'Say "Stop being silly"', 'Walk off'], kind: 'A cuddle and a plan can help a sad feeling.' },
  { t: "A butterfly landed right on the {b}'s nose!", f: 'surprised', why: 'Things we do not expect surprise us.', help: ['Smile and watch it gently', 'Swat it away', 'Shout at it'], kind: 'Staying gentle keeps everyone safe.' }
];
const STORIES = [
  { t: 'Arlo dropped his ice cream on the floor.', f: 'sad', why: 'Losing something nice makes us sad.', help: ['Tell a grown-up how you feel', 'Throw the cone', 'Kick the wall'], kind: 'Telling someone helps a sad feeling.' },
  { t: "Arlo's tower of blocks got knocked over.", f: 'angry', why: 'It is okay to feel angry when that happens.', help: ['Take three slow breaths', "Knock over someone else's tower", 'Shout at everyone'], kind: 'Slow breaths help your body calm down.' },
  { t: 'It is the first day at a new club. Arlo does not know anybody yet.', f: 'scared', why: 'New places can feel a bit scary.', help: ['Say hello to one person', 'Hide all day', 'Go home straight away'], kind: 'One small hello is a brave first step.' },
  { t: 'Arlo learned to ride his bike without any help.', f: 'proud', why: 'Practice paid off!', help: ['Tell someone you are proud', 'Say it does not matter', 'Never ride again'], kind: 'It is good to feel proud of hard work.' },
  { t: 'Grandma came to visit and nobody told Arlo she was coming!', f: 'surprised', why: 'A nice surprise!', help: ['Give her a big hug', 'Hide under the bed', 'Be grumpy'], kind: 'A hug shows how pleased you are.' },
  { t: "Arlo's best friend is away on holiday.", f: 'lonely', why: 'We miss our friends when they are away.', help: ['Draw a picture to give them later', 'Be cross with them', 'Stay in bed all day'], kind: 'Making something for a friend helps you feel close.' },
  { t: "It is Arlo's birthday party today.", f: 'happy', why: 'Parties with friends are happy times.', help: ['Thank your friends for coming', 'Keep all the cake', 'Send everyone home'], kind: 'Saying thank you spreads the happy feeling.' },
  { t: 'Arlo stayed up very late. Now it is morning.', f: 'tired', why: 'Our bodies need lots of sleep.', help: ['Have a calm, quiet morning', 'Run ten races', 'Skip breakfast'], kind: 'Calm time helps a tired body.' }
];
const KIND = [
  ['A friend falls over in the playground.', 'Help them up and ask "Are you okay?"', 'Laugh and walk away', 'Helping shows you care.'],
  ['Someone wants a turn on the swing.', 'Say "You can go after me" and share', 'Stay on it all day', 'Taking turns is fair and kind.'],
  ['A new child has nobody to play with.', 'Ask "Do you want to play with us?"', 'Pretend you did not see', 'Asking others to join in helps them feel welcome.'],
  ['Your sister shows you her drawing.', 'Say "I like your colours!"', 'Scribble on it', 'Kind words make people feel proud.'],
  ['A baby animal is fast asleep.', 'Tiptoe and whisper', 'Bang a drum', 'Being quiet lets others rest.'],
  ['You find a snail on the path.', 'Move it gently to the grass', 'Stamp near it', 'Being gentle keeps small creatures safe.']
];
const DREAMS = [['⭐', 'the stars'], ['🍰', 'a giant cake'], ['🚀', 'a rocket'], ['🌈', 'a rainbow'], ['🎈', 'balloons'], ['🐠', 'silly fish'], ['⚽', 'a football'], ['🦖', 'a friendly dinosaur'], ['🍦', 'ice cream']];
const NAMES = ['SUNNY', 'PIP', 'BISCUIT', 'ROCKY', 'LUNA', 'MOSS', 'ZIGGY', 'DOT', 'BEAN', 'STORM'];
const PADCOLS = ['#222222', '#e5342b', '#ff9a2e', '#ffd23f', '#4aa343', '#3f8fdc', '#b07af0', '#8a5a2a', '#ff8ab0', '#ffffff'];
/* ============ end of LEARN DATA ============ */

const lvl = () => ({ explorer: 0, ranger: 1, chief: 2 }[DB.set.diff] || 0);
const cap1 = s => s.charAt(0).toUpperCase() + s.slice(1);
function numOpts(ans, lo, hi) { const s = new Set([ans]); let guard = 0; while (s.size < 3 && guard++ < 60) { const v = clamp(ans + ri(-3, 3), lo, hi); if (v !== ans) s.add(v); } let k = 1; while (s.size < 3) { s.add(ans + k); k++; } return shuffle([...s]).map(v => ({ h: `<b>${v}</b>`, ok: v === ans })); }
const iconRow = (name, n) => `<div class="licons">${(`<img class="pix" src="${iconURL(name)}" alt="">`).repeat(n)}</div>`;
const faceH = f => `<span class="lem">${FACES[f]}</span><br>${cap1(f)}`;

const Learn = {
  cur: null, fast: false, _c: {},
  /* which task each of the 10 landscapes gets: every strand twice, never twice in a row */
  plan(seed) {
    const r = RNG((seed ^ 0x5ea1) >>> 0); let a;
    for (let k = 0; k < 300; k++) { a = shuffle(['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E'], r); if (a.every((s, i) => !i || s !== a[i - 1])) break; }
    if (!a.every((s, i) => !i || s !== a[i - 1])) a = ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'];
    const t = {}; for (const s in TASKS) t[s] = shuffle([0, 1, 2, 3], r);
    const seen = {}; return a.map(s => { seen[s] = (seen[s] || 0) + 1; return [s, t[s][seen[s] - 1]]; });
  },
  later(fn, ms) { const c = this.cur; setTimeout(() => { if (this.cur === c) fn(); }, this.fast ? Math.min(ms, 15) : ms); },
  seq(fns, end) { let i = 0; const step = () => { if (i < fns.length) fns[i++](step); else end(); }; step(); },
  msg(t, cls) { const m = $('lmsg'); if (m) { m.textContent = t || ' '; m.className = 'lmsg ' + (cls || ''); } },
  setQ(html, sayTxt, hintFn) { const c = this.cur; $('lt').innerHTML = html; c.say = sayTxt; c.sayFn = null; c.hintFn = hintFn || null; this.msg(''); $('panel').scrollTop = 0; },

  /* ----- run one task ----- */
  run(strand, ti, ctx, done, cancel) {
    const name = TASKS[strand][ti], c = this.cur = { strand, name, title: TITLES[name], an: ctx.an, gems: ctx.gems || 0, lv: lvl(), miss: 0, hints: 0, practice: !!ctx.practice, clean: [] };
    UI.modal(`<h2>${STRAND[strand][0]} ${c.title}</h2><div id="lt"></div><p class="lmsg" id="lmsg">&nbsp;</p><div class="lrow"><button class="btn sm" id="lsay">🔊 Read to me</button><button class="btn sm" id="lhint">💡 Hint</button><button class="btn sm" id="lskip">⏭ Hold to skip</button><button class="btn sm" id="lback">${ctx.practice ? 'Back' : 'Not now'}</button></div>`, { wide: true });
    $('lsay').onclick = () => { AU.init(); if (c.sayFn) c.sayFn(); else say(c.say || ''); };
    $('lhint').onclick = () => { AU.init(); SFX.sparkle(); c.hints++; if (c.hintFn) c.hintFn(); else this.msg('Take your time. You can do it!'); };
    const sk = $('lskip'); let st = 0;
    sk.onpointerdown = e => { e.preventDefault(); sk.classList.add('hold'); st = setTimeout(() => { if (this.cur === c) this.finish(c, done, true); }, 1300); };
    sk.onpointerup = sk.onpointerleave = sk.onpointercancel = () => { clearTimeout(st); sk.classList.remove('hold'); };
    $('lback').onclick = () => { SFX.click(); this.cleanup(c); this.cur = null; UI.close(); if (cancel) cancel(); };
    TASK[name](c, () => this.finish(c, done, false));
  },
  cleanup(c) { for (const f of c.clean) try { f(); } catch (e) { } c.clean.length = 0; },
  finish(c, done, skipped) {
    this.cleanup(c); const n = c.miss + c.hints, stars = skipped ? 1 : n === 0 ? 3 : n <= 2 ? 2 : 1;
    if (!skipped) DB.learn[c.strand] = (DB.learn[c.strand] || 0) + 1; SAVE.put(); this.cur = null;
    UI.modal(`<h1 class="lstars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</h1><p>${skipped ? 'That one was tricky. You can practise it any time from the main menu.' : pick(PRAISE_END)}</p><p class="small">${STRAND[c.strand][0]} ${STRAND[c.strand][1]}${skipped ? '' : ' badge +1'}</p><button class="btn go" id="lok">${c.practice ? 'OK' : 'OPEN THE GATE ▶'}</button>`);
    if (!skipped) { SFX.fanfare(); say(pick(PRAISE)); }
    UI.on('lok', () => { UI.close(); done(stars); });
  },

  /* ----- a question with tappable answers. Wrong answers fade away, so nobody gets stuck. ----- */
  ask(q, opts, next, o = {}) {
    const c = this.cur; let wrong = 0, locked = false;
    const fade = () => { const b = [...$('lt').querySelectorAll('.lopt:not(.out)')].find(e => !opts[+e.dataset.i].ok); if (b) b.classList.add('out'); };
    this.setQ(`${o.top || ''}<p class="lq">${q}</p><div class="lopts ${o.cls || ''}">${opts.map((p, i) => `<button class="lopt" data-i="${i}">${p.h}</button>`).join('')}</div>`, o.say || q, () => { fade(); this.msg(o.hint || 'I took one wrong answer away.'); });
    $('lt').querySelectorAll('.lopt').forEach(b => b.onclick = () => {
      AU.init(); if (locked || b.classList.contains('out')) return; const p = opts[+b.dataset.i];
      if (p.ok) { locked = true; SFX.yes(); b.classList.add('good'); const t = p.why || o.right || pick(PRAISE); this.msg(t, 'ok'); if (o.wait > 1500) say(t); this.later(next, o.wait || 1000); }
      else { wrong++; c.miss++; SFX.nope(); b.classList.add('bad'); this.msg(p.why || pick(TRY), 'no'); setTimeout(() => { b.classList.remove('bad'); b.classList.add('out'); }, 420); if (wrong >= 2) { const g2 = [...$('lt').querySelectorAll('.lopt')].find(e => opts[+e.dataset.i].ok); if (g2) g2.classList.add('glow'); } }
    });
  },
  countUp(n, next) {
    const el = $('lbr'); if (!el) { next(); return; } let k = 0; el.innerHTML = '';
    const step = () => { if (k >= n) { this.later(next, 700); return; } k++; el.insertAdjacentHTML('beforeend', '<i></i>'); this.msg(String(k), 'ok'); AU.tone(300 + k * 22, .08, { type: 'triangle', vol: .1 }); this.later(step, n > 14 ? 90 : 170); };
    step();
  },

  /* ----- letter tiles: used for spelling tasks, signs and names ----- */
  spell(host, word, o, done) {
    const L = word.split(''), need = L.filter(ch => ch !== ' '), tiles = need.slice();
    for (let i = 0; i < (o.extra || 0); i++) tiles.push('ABCDEFGHIJKLMNOPRSTUWY'[ri(0, 21)]);
    shuffle(tiles); if (tiles.length > 1 && tiles.join('') === need.join('')) tiles.reverse();
    let pos = 0;
    host.innerHTML = `<div class="lslots">${L.map(ch => ch === ' ' ? '<span class="lsp"></span>' : `<span class="lslot">${o.ghost ? `<i>${ch}</i>` : ''}</span>`).join('')}</div><div class="ltiles">${tiles.map(ch => `<button class="ltile" data-ch="${ch}">${ch}</button>`).join('')}</div>`;
    const slots = [...host.querySelectorAll('.lslot')];
    host.querySelectorAll('.ltile').forEach(b => b.onclick = () => {
      AU.init(); if (pos >= need.length || b.classList.contains('used')) return;
      if (b.dataset.ch === need[pos]) { b.classList.add('used'); slots[pos].textContent = need[pos]; slots[pos].classList.add('on'); SFX.pop(); say(need[pos].toLowerCase()); pos++; if (pos >= need.length) { SFX.yes(); const c = this.cur; setTimeout(() => { if (this.cur === c) { say(word.toLowerCase()); done(); } }, this.fast ? 10 : 600); } }
      else { b.classList.add('bad'); SFX.nope(); if (o.miss) o.miss(); setTimeout(() => b.classList.remove('bad'), 400); }
    });
    return { hint() { const b = [...host.querySelectorAll('.ltile:not(.used)')].find(q => q.dataset.ch === need[pos]); if (b) { b.classList.add('glow'); setTimeout(() => b.classList.remove('glow'), 1800); } } };
  },
  /* a free keyboard for naming things */
  typeName(title, cur, max, cb) {
    let v = (cur || '').toUpperCase().slice(0, max);
    const draw = () => {
      UI.modal(`<h2>${title}</h2><div class="lslots"><span class="lname">${v || '&nbsp;'}</span></div><div class="ltiles kb">${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(ch => `<button class="ltile" data-ch="${ch}">${ch}</button>`).join('')}<button class="ltile wide" data-ch="<">⌫</button></div><p class="small">Ideas: ${shuffle(NAMES.slice()).slice(0, 4).map(n => `<button class="btn sm" data-n="${n}">${n}</button>`).join('')}</p><button class="btn go" id="tnok">OK ✔</button><button class="btn sm" id="tnno">Cancel</button>`, { wide: true });
      $('panel').querySelectorAll('.ltile').forEach(b => b.onclick = () => { AU.init(); const ch = b.dataset.ch; if (ch === '<') v = v.slice(0, -1); else if (v.length < max) { v += ch; say(ch.toLowerCase()); } SFX.pop(); draw(); });
      $('panel').querySelectorAll('[data-n]').forEach(b => b.onclick = () => { AU.init(); SFX.click(); v = b.dataset.n.slice(0, max); draw(); });
      UI.on('tnok', () => cb(v)); UI.on('tnno', () => cb(null));
    };
    draw();
  },
  sayHL(el, text) {
    try {
      if (!window.speechSynthesis || AU.muted) return; speechSynthesis.cancel();
      const ws = [...el.querySelectorAll('span')], u = new SpeechSynthesisUtterance(text); u.rate = .85; u.pitch = 1.1;
      const clr = () => ws.forEach(w => w.classList.remove('hl'));
      u.onboundary = e => { if (e.name && e.name !== 'word') return; clr(); const i = text.slice(0, e.charIndex).split(' ').length - 1; if (ws[i]) ws[i].classList.add('hl'); };
      u.onend = clr; speechSynthesis.speak(u);
    } catch (e) { }
  },

  /* ----- pictures made from the game's own pixel art ----- */
  sprite(an, baby) { const k = 's' + an + baby; if (this._c[k]) return this._c[k]; const c = document.createElement('canvas'); c.width = 44; c.height = 34; withCtx(c.getContext('2d'), () => drawAnimal(an, 22, 32, { b: baby, t: 1 })); return this._c[k] = c; },
  paintScene(x, an, W, H, kind) {
    const B = BIOMES[ANIMALS[an].biome], gl = Math.round(H * .74);
    x.imageSmoothingEnabled = false;
    if (kind === 'half') {
      x.fillStyle = '#fdf8ec'; x.fillRect(0, 0, W, H); const s = Math.floor(Math.min(W / 50, H / 40)), sp = this.sprite(an, false), dx = Math.round(W / 2 - 22 * s), dy = Math.round(H / 2 - 17 * s);
      x.globalAlpha = .16; x.drawImage(sp, dx, dy, 44 * s, 34 * s); x.globalAlpha = 1;
      x.drawImage(sp, 0, 0, 22, 34, dx, dy, 22 * s, 34 * s);
      x.strokeStyle = '#999'; x.setLineDash([4, 4]); x.beginPath(); x.moveTo(W / 2, 4); x.lineTo(W / 2, H - 4); x.stroke(); x.setLineDash([]); return;
    }
    for (let k = 0; k < 8; k++) { x.fillStyle = mix(B.sky[0], B.sky[1], k / 7); x.fillRect(0, Math.floor(k * gl / 8), W, Math.ceil(gl / 8) + 1); }
    x.fillStyle = B.far[0]; for (let i = 0; i < W; i += 22) { const hh = 10 + Story.h01(i + hash(B.name) % 97) * 26; x.fillRect(i, gl - hh, 22, hh); }
    for (let i = 0; i < W; i += 16) { x.drawImage(sideTile(B.top, B.under), i, gl); for (let y = gl + 16; y < H; y += 16) x.drawImage(TILES[B.under], i, y); }
    withCtx(x, () => {
      if (kind === 'dream') { g.fillStyle = '#fff'; g.strokeStyle = '#555'; g.lineWidth = 2; g.beginPath(); g.ellipse(W * .58, H * .34, W * .36, H * .27, 0, 0, TAU); g.fill(); g.stroke(); for (const [bx, by, br] of [[W * .25, H * .62, 7], [W * .2, H * .7, 4]]) { g.beginPath(); g.arc(bx, by, br, 0, TAU); g.fill(); g.stroke(); } drawAnimal(an, 26, gl, { b: true, t: 1 }); px('#555', 30, gl - 22, 3, 1); px('#555', 35, gl - 26, 4, 1); return; }
      if (kind !== 'cosy') PROP[B.trees[0]](Math.round(W * .5), gl, 0, 3);
      if (kind === 'path') { drawAnimal(an, 22, gl, { b: true, t: 1 }); g.save(); g.translate(W - 34, gl); g.scale(1.6, 1.6); PROP.tent(0, 0, 0); g.restore(); }
      else if (kind === 'cosy') { g.save(); g.translate(W / 2, gl); g.scale(2, 2); drawAnimal(an, 0, 0, { b: true, t: 1 }); g.restore(); }
      else { PROP[B.hides[0]](Math.round(W * .82), gl, 0, 1); g.save(); g.translate(Math.round(W * .36), gl); g.scale(2, 2); drawAnimal(an, 0, 0, { b: false, t: 1 }); g.restore(); g.save(); g.translate(Math.round(W * .74), gl); g.scale(2, 2); drawAnimal(an, 0, 0, { b: true, t: 1 }); g.restore(); }
    });
  },
  scene(an) { const k = 'sc' + an; if (this._c[k]) return this._c[k]; const c = document.createElement('canvas'); c.width = 176; c.height = 132; this.paintScene(c.getContext('2d'), an, 176, 132, 'full'); return this._c[k] = c.toDataURL(); },
  hideBg() {
    if (this._c.hb) return this._c.hb; const c = document.createElement('canvas'); c.width = 160; c.height = 96;
    withCtx(c.getContext('2d'), () => {
      for (let y = 0; y < 72; y += 8) for (let x = -8 + (y % 16); x < 160; x += 32) box(x, y, 32, 8, y % 16 ? '#5a3c22' : '#62422a');
      for (let x = 0; x < 160; x += 20) box(x, 72, 20, 24, x % 40 ? '#3a2616' : '#42301c');
      box(60, 10, 40, 26, '#1a1c3a'); px('#f0f4ff', 86, 15, 6, 6); px('#fff', 68, 18, 1, 1); px('#fff', 76, 28, 1, 1); px('#fff', 72, 13, 1, 1); px('#3a2616', 79, 10, 2, 26); px('#3a2616', 60, 22, 40, 2);
      g.globalAlpha = .22; g.fillStyle = '#ffb03a'; g.beginPath(); g.arc(130, 22, 30, 0, TAU); g.fill(); g.globalAlpha = 1; px('#555', 129, 4, 2, 10); box(125, 14, 10, 12, '#ffd23f'); px('#fff6c8', 128, 17, 4, 5);
      box(4, 40, 28, 20, '#e8dcb8'); px('#b85a48', 8, 46, 10, 1); px('#b85a48', 14, 50, 12, 1); px('#e5342b', 24, 53, 3, 3);
      box(134, 66, 22, 18, '#8a5a2a'); px('#6a4420', 134, 74, 22, 2); box(116, 74, 16, 12, '#9a6a3a');
    });
    return this._c.hb = c.toDataURL();
  },

  /* ----- drawing pad ----- */
  pad(host, o = {}) {
    const W = o.w || 240, H = o.h || 180; host.classList.add('padhost');
    host.innerHTML = `<canvas class="lpad" width="${W}" height="${H}" style="aspect-ratio:${W}/${H}"></canvas><div class="lpal">${PADCOLS.map((c, i) => `<button class="lcol ${i === 0 ? 'sel' : ''}" data-c="${c}" style="background:${c}" aria-label="colour ${i + 1}"></button>`).join('')}</div><div class="lpal">${[2, 5, 11].map((s, i) => `<button class="lsz ${i === 1 ? 'sel' : ''}" data-s="${s}" aria-label="brush size"><i style="width:${s + 5}px;height:${s + 5}px"></i></button>`).join('')}${(o.stamps || []).map(e => `<button class="lstp" data-e="${e}">${e}</button>`).join('')}<button class="btn sm" data-b="undo">↩ Undo</button><button class="btn sm" data-b="clear">Clear</button></div>`;
    const cv2 = host.querySelector('canvas'), x = cv2.getContext('2d'), bg = document.createElement('canvas'); bg.width = W; bg.height = H;
    const bx = bg.getContext('2d'); bx.fillStyle = '#fdf8ec'; bx.fillRect(0, 0, W, H); if (o.bg) o.bg(bx, W, H);
    const ops = []; let col = PADCOLS[0], size = 5, stamp = null, cur = null;
    const drawOp = op => {
      if (op.e) { x.font = '24px serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(op.e, op.x, op.y); return; }
      x.strokeStyle = x.fillStyle = op.c; x.lineWidth = op.s; x.lineCap = x.lineJoin = 'round'; x.beginPath(); x.moveTo(op.p[0][0], op.p[0][1]); for (const q of op.p) x.lineTo(q[0], q[1]); x.stroke();
      if (op.p.length === 1) { x.beginPath(); x.arc(op.p[0][0], op.p[0][1], op.s / 2, 0, TAU); x.fill(); }
    };
    const redraw = () => { x.drawImage(bg, 0, 0); for (const op of ops) drawOp(op); };
    const pt = e => { const r = cv2.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; };
    cv2.onpointerdown = e => { e.preventDefault(); AU.init(); try { cv2.setPointerCapture(e.pointerId); } catch (_) { } const p = pt(e); if (stamp) { ops.push({ e: stamp, x: p[0], y: p[1] }); SFX.pop(); redraw(); return; } cur = { c: col, s: size, p: [p] }; ops.push(cur); redraw(); };
    cv2.onpointermove = e => { if (!cur) return; const p = pt(e), l = cur.p[cur.p.length - 1]; if (Math.hypot(p[0] - l[0], p[1] - l[1]) > 1.5) { cur.p.push(p); redraw(); } };
    cv2.onpointerup = cv2.onpointercancel = () => { cur = null; };
    const pick1 = (sel, el) => { host.querySelectorAll(sel).forEach(q => q.classList.remove('sel')); el.classList.add('sel'); };
    host.querySelectorAll('.lcol').forEach(b => b.onclick = () => { SFX.click(); col = b.dataset.c; stamp = null; host.querySelectorAll('.lstp').forEach(q => q.classList.remove('sel')); pick1('.lcol', b); });
    host.querySelectorAll('.lsz').forEach(b => b.onclick = () => { SFX.click(); size = +b.dataset.s; pick1('.lsz', b); });
    host.querySelectorAll('.lstp').forEach(b => b.onclick = () => { SFX.click(); stamp = b.dataset.e; pick1('.lstp', b); });
    host.querySelector('[data-b=undo]').onclick = () => { SFX.click(); ops.pop(); redraw(); };
    host.querySelector('[data-b=clear]').onclick = () => { SFX.click(); ops.length = 0; redraw(); };
    redraw();
    return { ops, canvas: cv2, ctx: x, redraw, data: () => cv2.toDataURL('image/jpeg', .72), lastStroke: () => [...ops].reverse().find(q => q.p) };
  },
  saveArt(url, caption) { DB.gallery.push({ u: url, c: caption }); while (DB.gallery.length > CONFIG.learn.galleryMax) DB.gallery.shift(); SAVE.put(); },

  /* ----- The Poacher's Hideout: maths questions give the code, then open the padlock ----- */
  mathQ(lv) {
    const t = ri(0, 3);
    if (lv === 0) {
      if (t === 0) { const n = ri(2, 9); return { q: 'How many keys can you count?', a: n, top: `<div class="lem2">${'🔑'.repeat(n)}</div>` }; }
      if (t === 1) { const a = ri(4, 9), b = ri(1, a - 1); return { q: `${a} − ${b} = ?`, a: a - b, say: `${a} take away ${b}` }; }
      const a = ri(1, 5), b = ri(1, 4); return { q: `${a} + ${b} = ?`, a: a + b, say: `${a} plus ${b}`, top: `<div class="lem2">${'🟡'.repeat(a)} ${'🔵'.repeat(b)}</div>` };
    }
    if (lv === 1) {
      if (t === 0) { const b = ri(2, 9), a = b + ri(4, 9); return { q: `${a} − ${b} = ?`, a: a - b, say: `${a} take away ${b}` }; }
      if (t === 1) { const d = ri(1, 4); return { q: `What is double ${d}?`, a: d * 2 }; }
      if (t === 2) { const a = ri(1, 9); return { q: `${a} + ? = 10`, a: 10 - a, say: `${a} plus what makes 10?` }; }
      const s = ri(1, 3), st = pick([1, 2]); return { q: `${s}, ${s + st}, ?, ${s + 3 * st}`, a: s + 2 * st, say: 'Which number is missing from the pattern?' };
    }
    if (t === 0) { const b = ri(11, 24), a = b + ri(2, 9); return { q: `${a} − ${b} = ?`, a: a - b, say: `${a} take away ${b}` }; }
    if (t === 1) { const n = ri(2, 4); return { q: `2 × ${n} = ?`, a: 2 * n, say: `2 times ${n}` }; }
    if (t === 2) { const h = ri(2, 9); return { q: `What is half of ${h * 2}?`, a: h }; }
    const a = ri(12, 25), r = ri(1, 9); return { q: `${a} + ? = ${a + r}`, a: r, say: `${a} plus what makes ${a + r}?` };
  },
  hideout(ctx, done) {
    const lv = lvl(), n = CONFIG.poacher.codeDigits[DB.set.diff] || 3, A = ANIMALS[ctx.an];
    const OBJ = [['📜', 'note', 6, 46], ['🧺', 'basket', 20, 76], ['⏰', 'clock', 70, 10], ['📦', 'box', 76, 74]].slice(0, n);
    const digits = OBJ.map(() => ri(1, 9)), found = OBJ.map(() => false), code = lv === 0 ? digits.slice() : digits.slice().sort((a, b) => a - b);
    const c = this.cur = { strand: 'A', miss: 0, hints: 0, clean: [], hide: true };
    const scene = open => `<div class="hide" style="background-image:url(${this.hideBg()})"><div class="hcage ${open ? 'open' : ''}"><img class="pix" src="${portrait(ctx.an, true)}" alt=""><div class="hbars"></div><div class="hlock">${open ? '🔓' : '🔒'}</div></div>${OBJ.map((o, i) => `<button class="hob ${found[i] ? 'done' : ''}" data-i="${i}" style="left:${o[2]}%;top:${o[3]}%">${found[i] ? digits[i] : o[0]}</button>`).join('')}</div>`;
    const home = () => {
      const left = found.filter(f => !f).length;
      UI.modal(`<h2>🏚 THE POACHER'S HIDEOUT</h2>${scene(false)}<p class="lmsg" id="lmsg">${left ? `The ${A.baby} is locked in! Tap the glowing things to find ${left === n ? 'the' : left + ' more'} secret number${left > 1 ? 's' : ''}.` : 'You found every number! Now open the padlock.'}</p><div id="lt"></div>${left ? '' : '<button class="btn go" id="hgo">🔒 OPEN THE PADLOCK</button>'}<div class="lrow"><button class="btn sm" id="lsay">🔊 Read to me</button></div>`, { wide: true });
      $('lsay').onclick = () => { AU.init(); say(c.say || $('lmsg').textContent); }; c.say = null;
      $('panel').querySelectorAll('.hob').forEach(b => b.onclick = () => { AU.init(); const i = +b.dataset.i; if (found[i]) { say(String(digits[i])); return; } SFX.click(); quiz(i); });
      if (!left) UI.on('hgo', lock);
    };
    const quiz = i => {
      let Q; do { Q = this.mathQ(lv); } while (Q.a < 0 || Q.a > 9); digits[i] = Q.a; if (lv > 0) { code.length = 0; code.push(...digits.slice().sort((a, b) => a - b)); } else code[i] = Q.a;
      const s = new Set([Q.a]); while (s.size < 4) s.add(ri(0, 9));
      UI.modal(`<h2>${OBJ[i][0]} SECRET NUMBER</h2><div id="lt"></div><p class="lmsg" id="lmsg">&nbsp;</p><div class="lrow"><button class="btn sm" id="lsay">🔊 Read to me</button><button class="btn sm" id="lhint">💡 Hint</button></div>`, { wide: true });
      $('lsay').onclick = () => { AU.init(); say(c.say || ''); }; $('lhint').onclick = () => { AU.init(); if (c.hintFn) c.hintFn(); };
      this.ask(`<span class="lbig">${Q.q}</span>`, shuffle([...s]).map(v => ({ h: `<b>${v}</b>`, ok: v === Q.a })), () => { found[i] = true; SFX.sparkle(); home(); }, { top: Q.top || '', say: Q.say || Q.q, right: `Yes! The secret number is ${Q.a}.` });
    };
    const lock = () => {
      const val = code.map(() => 0); let tries = 0;
      const rule = lv === 0 ? 'Turn each wheel to its number. The pictures show which wheel is which.' : 'Put the numbers on the wheels in order: the SMALLEST first and the BIGGEST last.';
      UI.modal(`<h2>🔒 THE PADLOCK</h2><p class="lq">${rule}</p><p class="small">Your numbers: ${OBJ.map((o, i) => `${o[0]} <b>${digits[i]}</b>`).join(' &nbsp; ')}</p><div class="hdials">${code.map((d, i) => `<div class="hdial"><div class="hic">${lv === 0 ? OBJ[i][0] : i + 1}</div><button class="btn sm" data-u="${i}" aria-label="up">▲</button><div class="hnum" id="hd${i}">0</div><button class="btn sm" data-d="${i}" aria-label="down">▼</button></div>`).join('')}</div><p class="lmsg" id="lmsg">&nbsp;</p><button class="btn go" id="hopen">🔓 OPEN</button><div class="lrow"><button class="btn sm" id="lsay">🔊 Read to me</button></div>`, { wide: true });
      $('lsay').onclick = () => { AU.init(); say(rule); };
      const turn = (i, d) => { val[i] = (val[i] + d + 10) % 10; $('hd' + i).textContent = val[i]; $('hd' + i).classList.remove('bad'); AU.tone(500 + val[i] * 40, .05, { vol: .08 }); };
      $('panel').querySelectorAll('[data-u]').forEach(b => b.onclick = () => { AU.init(); turn(+b.dataset.u, 1); });
      $('panel').querySelectorAll('[data-d]').forEach(b => b.onclick = () => { AU.init(); turn(+b.dataset.d, -1); });
      UI.on('hopen', () => {
        const bad = code.map((d, i) => val[i] !== d);
        if (bad.some(Boolean)) { tries++; SFX.nope(); bad.forEach((b, i) => { if (b) { $('hd' + i).classList.add('bad'); if (tries >= 2) $('hd' + i).setAttribute('data-g', code[i]); } }); this.msg(tries >= 2 ? 'The small numbers show what each red wheel should be.' : 'The red wheels are not right yet. Try again!', 'no'); return; }
        SFX.clang(); setTimeout(() => SFX.fanfare(), 350); this.cur = null;
        UI.modal(`<h2>THE LOCK POPS OPEN!</h2>${scene(true)}<p>You cracked the code, Ranger Arlo! The ${A.baby} is free and so happy to see you.</p><button class="btn go" id="hfree">TAKE ${A.pro === 'He' ? 'HIM' : 'HER'} BACK ❤</button>`, { wide: true });
        say(`You cracked the code! The ${A.baby} is free.`); UI.on('hfree', () => { UI.close(); done(); });
      });
    };
    home();
  }
};

/* ============ the 20 learning tasks ============ */
const TASK = {
  /* ---------- A: counting and maths ---------- */
  count(c, end) {
    const A = ANIMALS[c.an], f = A.food, mx = [6, 10, 14][c.lv], n = ri(3, mx - 1), more = ri(1, [3, 5, 8][c.lv]), a = ri(2, mx - 1), b = a + pick([-1, 1, 2]);
    const bowl = k => `${iconRow(f, k)}`;
    Learn.seq([
      nx => Learn.ask(`How many ${FOODW[f]} can you count?`, numOpts(n, 1, mx + 2), nx, { top: iconRow(f, n), right: `Yes! There are ${n}.`, hint: 'Touch each one as you count. I took one wrong answer away.' }),
      nx => Learn.ask(`You have ${n}. The ${A.baby} wants ${n + more}. How many MORE do you need?`, numOpts(more, 1, 12), nx, { top: iconRow(f, n), right: `${n} and ${more} more makes ${n + more}!` }),
      nx => Learn.ask('Which pile has MORE?', shuffle([{ h: bowl(a), ok: a > b }, { h: bowl(b), ok: b > a }]), nx, { cls: 'big', right: `${Math.max(a, b)} is more than ${Math.min(a, b)}.` })
    ], end);
  },
  bridge(c, end) {
    const mk = () => {
      if (c.lv === 0) { const a = ri(1, 5), b = ri(1, 5); return [`${a} + ${b}`, a + b]; }
      if (c.lv === 1) { if (rnd() < .5) { const a = ri(4, 12), b = ri(2, 8); return [`${a} + ${b}`, a + b]; } const a = ri(9, 20), b = ri(2, 7); return [`${a} − ${b}`, a - b]; }
      const q = ri(0, 2); if (q === 0) { const a = ri(10, 20), b = ri(5, 10); return [`${a} + ${b}`, a + b]; } if (q === 1) { const a = ri(16, 30), b = ri(4, 12); return [`${a} − ${b}`, a - b]; } const a = ri(3, 9); return [`double ${a}`, a * 2];
    };
    const round = nx => { const [q, ans] = mk(); Learn.ask(`The bridge needs <b>${q}</b> planks. How many is that?`, numOpts(ans, 1, 32), () => Learn.countUp(ans, nx), { top: '<div class="lbridge" id="lbr"></div>', say: `The bridge needs ${q.replace('−', 'take away').replace('+', 'plus')} planks. How many is that?`, wait: 400 }); };
    Learn.seq([round, round, round], end);
  },
  share(c, end) {
    const A = ANIMALS[c.an], f = A.food, each = ri(2, [3, 5, 6][c.lv]), kids = c.lv === 2 ? pick([2, 3]) : 2, tot = each * kids, d = ri(2, [5, 9, 12][c.lv]), x = ri(1, [4, 8, 12][c.lv]), y = ri(1, [5, 9, 12][c.lv]);
    Learn.seq([
      nx => Learn.ask(`Share ${tot} ${FOODW[f]} fairly between ${kids} babies. How many does each baby get?`, numOpts(each, 1, 9), nx, { top: iconRow(f, tot) + `<div>${(`<img class="pix lport" src="${portrait(c.an, true)}" alt="">`).repeat(kids)}</div>`, right: `${each} each. That is fair!` }),
      nx => Learn.ask(`What is double ${d}?`, numOpts(d * 2, 2, 26), nx, { top: `<div class="ldbl">${iconRow(f, d)}${iconRow(f, d)}</div>`, right: `${d} + ${d} = ${d * 2}` }),
      nx => Learn.ask(`<span class="lbig">${x} + ? = ${x + y}</span>`, numOpts(y, 1, 14), nx, { say: `${x} plus what makes ${x + y}?`, right: `${x} + ${y} = ${x + y}` })
    ], end);
  },
  pattern(c, end) {
    const E = ['🔴', '🔵', '🟡', '🟢', '🟣', '🟠'];
    const shapes = nx => {
      const s = shuffle(E.slice()), unit = pick(c.lv === 0 ? [[0, 1]] : c.lv === 1 ? [[0, 1], [0, 0, 1], [0, 1, 2]] : [[0, 0, 1], [0, 1, 2], [0, 1, 1, 2], [0, 1, 0, 2]]), len = unit.length * 2 + ri(0, unit.length - 1), sq = [];
      for (let i = 0; i <= len; i++) sq.push(s[unit[i % unit.length]]); const ans = sq.pop();
      Learn.ask('What comes next in the pattern?', shuffle([ans, ...s.filter(e => e !== ans).slice(0, 2)]).map(e => ({ h: `<span class="lem">${e}</span>`, ok: e === ans })), nx, { top: `<div class="lpat">${sq.join(' ')} <b>?</b></div>`, hint: 'Say the colours out loud. Listen for the part that repeats.' });
    };
    const nums = nx => { const st = pick([[1, 2], [2, 5, 10], [2, 3, 5, 10]][c.lv]), s0 = st * ri(0, 3) + (c.lv === 0 ? 1 : 0), sq = [0, 1, 2, 3].map(i => s0 + i * st), ans = s0 + 4 * st; Learn.ask('Which number comes next?', numOpts(ans, 0, 99), nx, { top: `<div class="lpat">${sq.join(', ')}, <b>?</b></div>`, right: `Yes! It goes up by ${st} each time.`, hint: `The numbers go up by ${st} each time.` }); };
    Learn.seq([shapes, shapes, nums], end);
  },

  /* ---------- B: spelling and reading ---------- */
  spell(c, end) {
    const A = ANIMALS[c.an], w = A.name.toUpperCase();
    Learn.setQ(`<img class="pix lpic" src="${portrait(c.an, true)}" alt=""><p class="lq">Spell the animal's name. Tap the letters in order.</p><div id="lsp"></div>`, `Spell ${A.name}. Tap the letters in order.`);
    const sp = Learn.spell($('lsp'), w, { extra: [0, 2, 4][c.lv], ghost: c.lv === 0, miss: () => { c.miss++; Learn.msg(pick(TRY), 'no'); } }, () => { Learn.msg(`${w}! Brilliant spelling!`, 'ok'); Learn.later(end, 1300); });
    c.hintFn = () => { sp.hint(); Learn.msg('The glowing letter comes next.'); };
  },
  read(c, end) {
    const A = ANIMALS[c.an], R = READQ[c.an], babies = shuffle(AIDS.filter(i => i !== c.an)).slice(0, 2).map(i => ANIMALS[i].baby);
    const words = A.fact.split(' ').map(w => `<span>${w}</span>`).join(' ');
    Learn.seq([
      nx => { Learn.setQ(`<img class="pix lpic" src="${portrait(c.an, true)}" alt=""><p class="lread" id="lrd">${words}</p><button class="btn go" id="lgo">I HAVE READ IT ✔</button>`, A.fact); c.sayFn = () => Learn.sayHL($('lrd'), A.fact); c.hintFn = () => { c.sayFn(); Learn.msg('Listen and follow the yellow word.'); }; $('lgo').onclick = () => { SFX.click(); nx(); }; },
      nx => Learn.ask(R.q, shuffle([{ h: R.a, ok: true }, ...R.w.map(h => ({ h }))]), nx, { top: `<p class="lread sm">${A.fact}</p>`, say: `${A.fact} ${R.q}` }),
      nx => Learn.ask(`What is a baby ${A.name.toLowerCase()} called?`, shuffle([{ h: cap1(A.baby), ok: true }, ...babies.map(h => ({ h: cap1(h) }))]), nx, { top: `<img class="pix lpic" src="${portrait(c.an, true)}" alt="">` })
    ], end);
  },
  missing(c, end) {
    const pool = shuffle(WORDS.filter(w => w[1].length >= [3, 4, 5][c.lv] && w[1].length <= [4, 6, 8][c.lv])).slice(0, 3);
    Learn.seq(pool.map(([em, w]) => nx => {
      const i = ri(0, w.length - 1), ch = w[i], opts = [ch]; while (opts.length < 3) { const q = 'ABCDEFGHIKLMNOPRSTUW'[ri(0, 19)]; if (!opts.includes(q)) opts.push(q); }
      Learn.ask('Which letter is missing?', shuffle(opts.map(q => ({ h: `<b>${q}</b>`, ok: q === ch }))), nx, { top: `<div class="lem big">${em}</div><div class="lword">${w.slice(0, i)}<u>_</u>${w.slice(i + 1)}</div>`, right: `${w}! Well done.`, say: `Which letter is missing from the word ${w.toLowerCase()}?` });
    }), end);
  },
  scramble(c, end) {
    const A = ANIMALS[c.an];
    const one = (w, pic, q) => nx => {
      Learn.setQ(`${pic}<p class="lq">${q}</p><div id="lsp"></div>`, `${q} The word is ${w.toLowerCase()}.`);
      const sp = Learn.spell($('lsp'), w, { extra: c.lv === 2 ? 2 : 0, ghost: c.lv === 0, miss: () => { c.miss++; Learn.msg(pick(TRY), 'no'); } }, () => { Learn.msg(`${w}! You unscrambled it!`, 'ok'); Learn.later(nx, 1200); });
      c.hintFn = () => { sp.hint(); Learn.msg('The glowing letter comes next.'); };
    };
    Learn.seq([one(FOODSPELL[A.food], `<img class="pix lpic sm" src="${iconURL(A.food)}" alt="">`, `The letters are mixed up! Spell what the ${A.name.toLowerCase()} eats.`), one(HOMEW[A.biome], `<img class="pix lpic" src="${Learn.scene(c.an)}" alt="">`, `Now spell where the ${A.name.toLowerCase()} lives.`)], end);
  },

  /* ---------- C: problem solving ---------- */
  jigsaw(c, end) {
    const [cols, rows] = [[2, 2], [3, 2], [3, 3]][c.lv], n = cols * rows, url = Learn.scene(c.an), ord = shuffle([...Array(n).keys()]);
    if (ord.every((v, i) => v === i)) ord.reverse();
    let sel = -1, num = false;
    const draw = () => {
      $('ljig').innerHTML = ord.map((p, i) => `<div class="lpc ${sel === i ? 'sel' : ''}" data-i="${i}" style="background-image:url(${url});background-size:${cols * 100}% ${rows * 100}%;background-position:${(p % cols) / (cols - 1) * 100}% ${((p / cols) | 0) / (rows - 1) * 100}%">${num ? `<b>${p + 1}</b>` : ''}</div>`).join('');
      $('ljig').querySelectorAll('.lpc').forEach(el => el.onclick = () => {
        AU.init(); const i = +el.dataset.i;
        if (sel < 0) { sel = i; SFX.click(); draw(); return; }
        [ord[sel], ord[i]] = [ord[i], ord[sel]]; sel = -1; SFX.place(); draw();
        if (ord.every((v, k) => v === k)) { SFX.yes(); Learn.msg('You fixed the picture!', 'ok'); $('ljig').classList.add('done'); Learn.later(end, 1400); }
      });
    };
    Learn.setQ(`<p class="lq">The picture is all mixed up! Tap two pieces to swap them.</p><div id="ljig" class="ljig" style="grid-template-columns:repeat(${cols},1fr)"></div>`, 'The picture is all mixed up! Tap two pieces to swap them.', () => { num = true; draw(); Learn.msg('The numbers show where each piece goes: 1, 2, 3…'); });
    draw();
  },
  maze(c, end) {
    const [w, h] = [[5, 4], [7, 5], [9, 6]][c.lv], CS = 30, open = new Uint8Array(w * h), seen = new Uint8Array(w * h), D = [[0, -1, 1, 4], [1, 0, 2, 8], [0, 1, 4, 1], [-1, 0, 8, 2]];
    const stack = [[0, 0]]; seen[0] = 1;
    while (stack.length) { const [x, y] = stack[stack.length - 1], opts = D.filter(d => x + d[0] >= 0 && y + d[1] >= 0 && x + d[0] < w && y + d[1] < h && !seen[(y + d[1]) * w + x + d[0]]); if (!opts.length) { stack.pop(); continue; } const d = pick(opts); open[y * w + x] |= d[2]; open[(y + d[1]) * w + x + d[0]] |= d[3]; seen[(y + d[1]) * w + x + d[0]] = 1; stack.push([x + d[0], y + d[1]]); }
    let px0 = 0, py0 = 0, hint = [], won = false; const gx = w - 1, gy = h - 1;
    Learn.setQ(`<p class="lq">Help the ${ANIMALS[c.an].baby} through the maze to the tent!</p><canvas id="lmz" class="lmz" width="${w * CS}" height="${h * CS}" style="aspect-ratio:${w}/${h}"></canvas><div class="lpadbtn"><button class="btn sm" data-m="3">◀</button><button class="btn sm" data-m="0">▲</button><button class="btn sm" data-m="2">▼</button><button class="btn sm" data-m="1">▶</button></div>`, 'Help the baby through the maze to the tent. Use the arrows, or tap the way you want to go.');
    const cvm = $('lmz'), x = cvm.getContext('2d'), sp = Learn.sprite(c.an, true);
    const draw = () => {
      x.imageSmoothingEnabled = false; x.fillStyle = '#8fd060'; x.fillRect(0, 0, w * CS, h * CS);
      for (let i = 0; i < w * h; i++) if ((i % w + ((i / w) | 0)) % 2) { x.fillStyle = '#84c556'; x.fillRect((i % w) * CS, ((i / w) | 0) * CS, CS, CS); }
      x.fillStyle = '#ffe27a'; for (const [hx, hy] of hint) x.fillRect(hx * CS + CS / 2 - 3, hy * CS + CS / 2 - 3, 6, 6);
      withCtx(x, () => { g.save(); g.translate(gx * CS + CS / 2, gy * CS + CS - 4); PROP.tent(0, 0, 0); g.restore(); });
      x.fillStyle = '#2f6b25';
      for (let cy = 0; cy < h; cy++) for (let cx = 0; cx < w; cx++) { const o = open[cy * w + cx], X = cx * CS, Y = cy * CS; if (!(o & 1)) x.fillRect(X - 2, Y - 2, CS + 4, 4); if (!(o & 8)) x.fillRect(X - 2, Y - 2, 4, CS + 4); if (cx === w - 1) x.fillRect(X + CS - 2, Y - 2, 4, CS + 4); if (cy === h - 1) x.fillRect(X - 2, Y + CS - 2, CS + 4, 4); }
      x.drawImage(sp, px0 * CS + CS / 2 - 15, py0 * CS + CS - 26, 30, 23);
    };
    const move = k => {
      if (won) return; const d = D[k];
      if (open[py0 * w + px0] & d[2]) { px0 += d[0]; py0 += d[1]; hint = []; SFX.click(); draw(); if (px0 === gx && py0 === gy) { won = true; SFX.yes(); Learn.msg('Home, safe and sound!', 'ok'); Learn.later(end, 1300); } }
      else { AU.tone(160, .06, { vol: .06 }); Learn.msg('A hedge is in the way. Try another way!'); }
    };
    const key = e => { const k = { ArrowUp: 0, KeyW: 0, ArrowRight: 1, KeyD: 1, ArrowDown: 2, KeyS: 2, ArrowLeft: 3, KeyA: 3 }[e.code]; if (k != null) { e.preventDefault(); move(k); } };
    addEventListener('keydown', key); c.clean.push(() => removeEventListener('keydown', key));
    $('lt').querySelectorAll('[data-m]').forEach(b => b.onclick = () => { AU.init(); move(+b.dataset.m); });
    cvm.onpointerdown = e => { e.preventDefault(); AU.init(); const r = cvm.getBoundingClientRect(), tx = (e.clientX - r.left) / r.width * w - (px0 + .5), ty = (e.clientY - r.top) / r.height * h - (py0 + .5); move(Math.abs(tx) > Math.abs(ty) ? (tx > 0 ? 1 : 3) : (ty > 0 ? 2 : 0)); };
    c.hintFn = () => { const prev = new Int16Array(w * h).fill(-1), q = [py0 * w + px0]; prev[q[0]] = q[0]; while (q.length) { const i = q.shift(), cx = i % w, cy = (i / w) | 0; for (const d of D) if (open[i] & d[2]) { const j = (cy + d[1]) * w + cx + d[0]; if (prev[j] < 0) { prev[j] = i; q.push(j); } } } const path = []; let i = gy * w + gx; while (i !== py0 * w + px0 && prev[i] >= 0) { path.push([i % w, (i / w) | 0]); i = prev[i]; } hint = path.reverse().slice(0, 4); draw(); Learn.msg('Follow the yellow dots.'); };
    c.move = move; draw();
  },
  order(c, end) {
    const sets = shuffle(ORDERS.slice()).slice(0, 2);
    Learn.seq(sets.map(([q, items]) => nx => {
      const sh = shuffle(items.map((t, i) => ({ t, i }))); if (sh.every((p, k) => p.i === k)) sh.reverse(); let pos = 0;
      Learn.setQ(`<p class="lq">${q} Tap them in the right order.</p><div class="lopts big">${sh.map(p => `<button class="lopt" data-i="${p.i}"><span class="lem">${p.t[0]}</span><br>${p.t[1]}<em></em></button>`).join('')}</div>`, `${q} Tap them in the right order.`, () => { const b = $('lt').querySelector(`.lopt[data-i="${pos}"]`); if (b) b.classList.add('glow'); Learn.msg('The glowing one comes next.'); });
      $('lt').querySelectorAll('.lopt').forEach(b => b.onclick = () => {
        AU.init(); const i = +b.dataset.i; if (b.classList.contains('good')) return;
        if (i === pos) { b.classList.add('good'); b.classList.remove('glow'); b.querySelector('em').textContent = pos + 1; pos++; SFX.pop(); if (pos === items.length) { SFX.yes(); Learn.msg(items.map(t => t[1]).join(' → '), 'ok'); Learn.later(nx, 1500); } }
        else { c.miss++; b.classList.add('bad'); SFX.nope(); Learn.msg(pos ? 'Not yet. What comes next?' : 'Which one comes first?', 'no'); setTimeout(() => b.classList.remove('bad'), 400); }
      });
    }), end);
  },
  odd(c, end) { const sets = shuffle(ODD.slice()).slice(0, 3); Learn.seq(sets.map(([q, items, odd, why]) => nx => Learn.ask(q, shuffle(items.map((t, i) => ({ h: `<span class="lem">${t[0]}</span><br>${t[1]}`, ok: i === odd }))), nx, { cls: 'big', right: why, wait: 2000 })), end); },

  /* ---------- D: understanding feelings ---------- */
  _feel(c, end, list, who, pic) {
    const A = ANIMALS[c.an], fs = Object.keys(FACES), rounds = [];
    shuffle(list.slice()).slice(0, 2).forEach(s => {
      const txt = s.t.replace(/\{b\}/g, A.baby);
      rounds.push(nx => Learn.ask(`${txt} How does ${who} feel?`, shuffle([s.f, ...shuffle(fs.filter(f => f !== s.f)).slice(0, 2)]).map(f => ({ h: faceH(f), ok: f === s.f })), nx, { top: pic, cls: 'big', right: `Yes, ${s.f}. ${s.why}`, wait: 2400, hint: 'Imagine it was you. How would your face look?' }));
      rounds.push(nx => Learn.ask(`${cap1(who)} feels ${s.f}. What is a kind thing to do?`, shuffle(s.help.map((h, i) => ({ h, ok: i === 0, why: i ? 'Hmm. Would that help? Try another one.' : '' }))), nx, { top: `<div class="lem big">${FACES[s.f]}</div>`, right: s.kind, wait: 2400 }));
    });
    Learn.seq(rounds, end);
  },
  feel(c, end) { TASK._feel(c, end, SCENES, 'the baby', `<img class="pix lpic" src="${portrait(c.an, true)}" alt="">`); },
  story(c, end) { TASK._feel(c, end, STORIES, 'Arlo', ''); },
  breathe(c, end) {
    const A = ANIMALS[c.an], n = 3, ms = Learn.fast ? 20 : CONFIG.learn.breath * 1000, q = `The ${A.baby} feels worried. Slow breathing helps us feel calm. Breathe in as the bubble grows. Breathe out as it shrinks.`;
    Learn.setQ(`<p class="lq">${q}</p><div class="lbrw"><div class="lbub" id="lbub"><img class="pix" src="${portrait(c.an, true)}" alt=""></div></div><p class="lq" id="lbt">Ready?</p><button class="btn go" id="lgo">START</button>`, q);
    const after = () => Learn.ask('Lovely calm breathing! The baby feels calm now. How do YOU feel?', ['happy', 'tired', 'proud', 'sad'].map(f => ({ h: faceH(f), ok: true, why: 'Thank you for telling me. All feelings are okay.' })), end, { cls: 'big', wait: 2000 });
    $('lgo').onclick = () => {
      SFX.click(); $('lgo').style.display = 'none'; const bub = $('lbub'); bub.style.transitionDuration = ms + 'ms'; let k = 0;
      const step = () => { if (k >= n) { after(); return; } k++; bub.classList.add('in'); $('lbt').textContent = `Breathe in… (${k} of ${n})`; AU.tone(196, ms / 1000, { to: 294, type: 'sine', vol: .05, attack: .5 }); Learn.later(() => { bub.classList.remove('in'); $('lbt').textContent = 'And slowly breathe out…'; AU.tone(294, ms / 1000, { to: 196, type: 'sine', vol: .05, attack: .5 }); Learn.later(step, ms); }, ms); };
      step();
    };
  },
  kind(c, end) { const sets = shuffle(KIND.slice()).slice(0, 3); Learn.seq(sets.map(([q, good, bad, why]) => nx => Learn.ask(`${q} Which is the kind choice?`, shuffle([{ h: good, ok: true }, { h: bad, why: 'Hmm. How would that make them feel? Try the other one.' }]), nx, { right: why, wait: 2400 })), end); },

  /* ---------- E: drawing and imagination ---------- */
  _draw(c, end, q, kind, o = {}) {
    Learn.setQ(`<p class="lq">${q}</p><div id="lpd"></div><button class="btn go" id="lgo">DONE ✔</button>`, q, () => Learn.msg(o.tip || 'There is no wrong way to draw. Have fun!'));
    const P = Learn.pad($('lpd'), { bg: (x, W, H) => { Learn.paintScene(x, c.an, W, H, kind); if (o.bg) o.bg(x, W, H); }, stamps: o.stamps });
    c.padRef = P;
    $('lgo').onclick = () => {
      SFX.click(); if (o.need && !P.ops.length) { Learn.msg('Draw something first. Use your finger!', 'no'); return; }
      const fin = () => { Learn.saveArt(P.data(), o.cap); Learn.msg('Beautiful! I saved it in your Art Gallery.', 'ok'); SFX.sparkle(); Learn.later(end, 1300); };
      if (o.after) o.after(P, fin); else fin();
    };
  },
  path(c, end) {
    const A = ANIMALS[c.an];
    TASK._draw(c, end, `Draw a path with your finger to take the ${A.baby} home to the tent!`, 'path', { need: true, cap: `The ${A.baby}'s path home`, tip: 'Start at the baby and draw a line all the way to the tent.',
      after: (P, fin) => { const s = P.lastStroke(); if (!s || Learn.fast) { fin(); return; } const sp = Learn.sprite(c.an, true), pts = s.p, cur = Learn.cur; let i = 0; $('lgo').disabled = true; const tick = () => { if (Learn.cur !== cur) return; P.redraw(); const p = pts[Math.min(pts.length - 1, Math.floor(i))]; P.ctx.drawImage(sp, p[0] - 22, p[1] - 30); i += Math.max(1, pts.length / 70); if (i < pts.length + 8) requestAnimationFrame(tick); else { P.redraw(); fin(); } }; SFX.cry(c.an, true, .12); tick(); } });
  },
  finish(c, end) { const A = ANIMALS[c.an]; TASK._draw(c, end, `Half of the ${A.name.toLowerCase()} is missing! Draw the other half.`, 'half', { need: true, cap: `My ${A.name.toLowerCase()}`, tip: 'Look at the faint shape and copy it, or make up your own!' }); },
  cosy(c, end) { const A = ANIMALS[c.an]; TASK._draw(c, end, `Make a cosy home for the ${A.baby}. Use the stickers and draw what it needs.`, 'cosy', { stamps: ['🌿', '🌸', '🍄', '⭐', '❄️', '💧', '🍎', '🧸'], cap: `A cosy home for the ${A.baby}`, tip: `Think: what does a ${A.name.toLowerCase()} like? It lives in ${A.home}.` }); },
  dream(c, end) {
    const A = ANIMALS[c.an], chosen = [];
    const drawPick = () => {
      Learn.setQ(`<img class="pix lpic" src="${portrait(c.an, true)}" alt=""><p class="lq">The ${A.baby} is fast asleep. What is it dreaming about? Pick 3 things.</p><div class="lopts big">${DREAMS.map((d, i) => `<button class="lopt ${chosen.includes(i) ? 'good' : ''}" data-i="${i}"><span class="lem">${d[0]}</span></button>`).join('')}</div>`, `The ${A.baby} is fast asleep. What is it dreaming about? Pick 3 things.`, () => Learn.msg('Pick any three. It is your story!'));
      $('lt').querySelectorAll('.lopt').forEach(b => b.onclick = () => { AU.init(); const i = +b.dataset.i; if (chosen.includes(i)) return; chosen.push(i); SFX.pop(); b.classList.add('good'); if (chosen.length === 3) Learn.later(tell, 500); });
    };
    const tell = () => {
      const d = chosen.map(i => DREAMS[i]), st = `The little ${A.name.toLowerCase()} dreams of ${d[0][1]}, ${d[1][1]} and ${d[2][1]}!`; say(st);
      TASK._draw(c, end, `${st} Now draw the dream.`, 'dream', { cap: st, bg: (x, W, H) => { x.font = '26px serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; d.forEach((e, k) => x.fillText(e[0], W * (.4 + k * .18), H * .34)); } });
    };
    drawPick();
  }
};

/* ============ badges, gallery and practice screens ============ */
function showBadges(back) {
  const rows = Object.keys(STRAND).map(s => `<div class="li"><span class="lem">${STRAND[s][0]}</span><b>${STRAND[s][1]}</b><i>${'🎖'.repeat(Math.min(5, DB.learn[s] || 0)) || '—'} x${DB.learn[s] || 0}</i></div>`).join('');
  UI.modal(`<h2>🎖 LEARNING BADGES</h2><p class="small">Finish the tasks at the end of each landscape to earn badges.</p><div class="list">${rows}<div class="li"><span class="lem">🏚</span><b>Rescues from the Hideout</b><i>x${DB.hideout || 0}</i></div><div class="li"><span class="lem">👋</span><b>Times you scared the Poacher away</b><i>x${DB.scared || 0}</i></div></div><button class="btn" id="bb">BACK</button>`);
  UI.on('bb', () => { UI.close(); if (back) back(); });
}
function showGallery(back) {
  const pics = DB.gallery.slice().reverse().map(p => `<figure class="gal"><img src="${p.u}" alt=""><figcaption>${p.c || ''}</figcaption></figure>`).join('') || '<p>No pictures yet. Finish a drawing task, or take a photo in your Sanctuary!</p>';
  UI.modal(`<h2>🖼 ARLO'S ART GALLERY</h2><div class="galw">${pics}</div><button class="btn" id="gb">BACK</button>`, { wide: true });
  UI.on('gb', () => { UI.close(); if (back) back(); });
}
function showPractice(back) {
  const rows = Object.keys(STRAND).map(s => `<div class="lbl">${STRAND[s][0]} ${STRAND[s][1].toUpperCase()}</div>${TASKS[s].map((t, i) => `<button class="btn sm" data-s="${s}" data-t="${i}">${TITLES[t]}</button>`).join('')}`).join('');
  UI.modal(`<h2>🎓 PRACTICE</h2><p class="small">Play any task just for fun.</p>${rows}<br><button class="btn" id="pb">BACK</button>`, { wide: true, clear: true });
  $('panel').querySelectorAll('[data-s]').forEach(b => b.onclick = () => { AU.init(); SFX.click(); Learn.run(b.dataset.s, +b.dataset.t, { an: pick(AIDS), practice: true }, () => showPractice(back), () => showPractice(back)); });
  UI.on('pb', () => { UI.close(); if (back) back(); });
}
