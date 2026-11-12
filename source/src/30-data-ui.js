/* ============ DATA: animals, landscapes, facts ============ */
const FOODS = { fruit: 'Fruit', fish: 'Fish', greens: 'Leafy greens', meat: 'Meat', shrimp: 'Shrimp', bugs: 'Bugs & worms', seeds: 'Seeds' };
const ANIMALS = {
  gorilla: { name: 'Gorilla', baby: 'gorilla infant', biome: 'jungle', col: '#3c3c44', pro: 'He', food: 'fruit', eats: 'fruit, leaves and shoots', home: 'the misty rainforests of Africa',
    fact: 'Gorillas build a brand new nest of leaves to sleep in every single night.',
    note: 'A baby gorilla wandered off while his family looked for fruit. Now he is all alone and wants a cuddle. He likes to hide where it is green and leafy. Can you find him?' },
  polarbear: { name: 'Polar Bear', baby: 'polar bear cub', biome: 'arctic', col: '#f1f4f7', pro: 'She', food: 'fish', eats: 'seals and fish', home: 'the frozen Arctic, at the top of the world',
    fact: 'A polar bear looks white, but the skin under its fur is black to soak up the sun.',
    note: 'A little polar bear cub lost her mum in the snow. She is cold, hungry and all alone. White fur is very hard to spot in the snow! Can you find her?' },
  turtle: { name: 'Sea Turtle', baby: 'sea turtle hatchling', biome: 'ocean', col: '#3f8f5a', pro: 'He', food: 'greens', eats: 'sea grass and jellyfish', home: 'warm oceans all around the world',
    fact: 'Baby sea turtles hatch on the beach at night and race across the sand to the sea.',
    note: 'A tiny sea turtle has just hatched, but he walked the wrong way up the beach. He is lost and needs help to reach the sea. Look near the things on the sand!' },
  lion: { name: 'Lion', baby: 'lion cub', biome: 'savanna', col: '#dba545', pro: 'She', food: 'meat', eats: 'meat', home: 'the grassy savanna of Africa',
    fact: 'Lions live in a family called a pride, and lion cubs are born with spots.',
    note: 'A tiny lion cub lost her mum in the long grass. She is hungry and all alone. Her golden fur blends in with the dry grass. Can you find her and keep her safe?' },
  capybara: { name: 'Capybara', baby: 'capybara pup', biome: 'amazon', col: '#9a6b3c', pro: 'He', food: 'greens', eats: 'grass and water plants', home: 'rivers and wetlands in South America',
    fact: 'The capybara is the biggest rodent in the world, and it is a brilliant swimmer.',
    note: 'A capybara pup slipped away from his family by the river. He is frightened without them. Capybaras love to be near water. Can you find him?' },
  flamingo: { name: 'Flamingo', baby: 'flamingo chick', biome: 'volcano', col: '#cfd3d8', pro: 'She', food: 'shrimp', eats: 'tiny shrimp and algae', home: 'salty lakes and lagoons, some beside volcanoes',
    fact: 'Flamingo chicks are grey. They turn pink because of the shrimp they eat!',
    note: 'A fluffy flamingo chick is lost on the volcanic island. She is grey, not pink, so she is tricky to see against the dark rocks. Can you find her?' },
  hedgehog: { name: 'Hedgehog', baby: 'hedgehog hoglet', biome: 'garden', col: '#7a5a3a', pro: 'He', food: 'bugs', eats: 'beetles, worms and slugs', home: 'gardens, hedges and woods',
    fact: 'A hedgehog has about 5,000 spikes and rolls into a ball when it is scared.',
    note: 'A baby hedgehog, called a hoglet, is lost in the back garden. He is tiny and all alone. Hedgehogs like to tuck themselves away in cosy corners. Can you find him?' },
  duck: { name: 'Duck', baby: 'duckling', biome: 'pond', col: '#ffd84a', pro: 'She', food: 'seeds', eats: 'seeds, plants and little bugs', home: 'ponds, lakes and rivers',
    fact: 'Ducklings can swim on the very day they hatch, and a duck\'s feathers are waterproof.',
    note: 'A fluffy yellow duckling has lost her brothers and sisters at the village pond. She is cheeping for help. Listen for her peep-peep! Can you find her?' },
  snowleopard: { name: 'Snow Leopard', baby: 'snow leopard cub', biome: 'mountain', col: '#d9dce1', pro: 'He', food: 'meat', eats: 'meat', home: 'the high, snowy mountains of Asia',
    fact: 'A snow leopard wraps its long fluffy tail around itself like a warm scarf.',
    note: 'A snow leopard cub is lost high up in the mountains. He is shivering and all alone. His spotty grey coat hides him among the rocks. Can you find him?' },
  camel: { name: 'Camel', baby: 'camel calf', biome: 'desert', col: '#cfa56a', pro: 'She', food: 'greens', eats: 'tough desert plants', home: 'the hot deserts of Africa and Asia',
    fact: 'A camel\'s hump stores fat, not water. A camel can go for days without a drink.',
    note: 'A camel calf wandered away from the caravan in the desert. She is thirsty and all alone in the hot sand. Can you find her before the sun gets too hot?' }
};
const AIDS = Object.keys(ANIMALS);
PROP.minicactus = PROP.bones;
const BIOMES = {
  jungle: { name: 'Jungle', an: 'gorilla', top: 'moss', under: 'dirt', sky: ['#5fc4e0', '#c8f0d8'], far: ['#2f7a4a', '#3f9458'], trees: ['jungle', 'jungle', 'oak'], hides: ['bush', 'fern', 'log'], decor: ['flower', 'mushroom', 'tuft'], water: 1, fx: 'leaves', amb: 'jungle', decoys: ['butterfly', 'frog', 'snail', 'bird'] },
  arctic: { name: 'Arctic', an: 'polarbear', top: 'snow', under: 'icy', sky: ['#0c1a3a', '#2a4a7a'], far: ['#7fa4c8', '#b0cce4'], trees: ['snowpine'], hides: ['igloo', 'snowpile', 'iceblock'], decor: ['snowman', 'pebble'], water: 1, fx: 'snow', amb: 'wind', night: 1, decoys: ['rabbit', 'bird'] },
  ocean: { name: 'Ocean Lagoon', an: 'turtle', top: 'sand', under: 'sandstone', sky: ['#3aa8f0', '#bfeaff'], far: ['#e8d8a0', '#f0e0b0'], trees: ['palm'], hides: ['shell', 'sandcastle', 'driftwood'], decor: ['starfish', 'pebble'], water: 1, fx: 'sparkle', amb: 'sea', sea: 1, decoys: ['crab', 'bird', 'snail'] },
  savanna: { name: 'Savanna', an: 'lion', top: 'dry', under: 'clay', sky: ['#f0a04a', '#ffe0a0'], far: ['#b8843a', '#d0a050'], trees: ['acacia'], hides: ['tallgrass', 'termite', 'rock'], decor: ['drytuft', 'pebble'], fx: 'dust', amb: 'quiet', decoys: ['lizard', 'bird', 'butterfly'] },
  amazon: { name: 'Amazon River', an: 'capybara', top: 'grass', under: 'mud', sky: ['#5ac0d0', '#d8f0c0'], far: ['#2a6a3a', '#3a8448'], trees: ['jungle', 'oak', 'palm'], hides: ['reeds', 'log', 'fern'], decor: ['flower', 'tuft', 'tuft'], water: 2, fx: 'fireflies', amb: 'jungle', sea: 1, decoys: ['frog', 'butterfly', 'snail'] },
  volcano: { name: 'Volcanic Island', an: 'flamingo', top: 'volc', under: 'basalt', sky: ['#2a1428', '#c8503a'], far: ['#2a1a22', '#4a2a30'], trees: ['dead', 'palm'], hides: ['lavarock', 'vent', 'driftwood'], decor: ['ember', 'pebble'], water: 1, fx: 'embers', amb: 'fire', volcano: 1, decoys: ['lizard', 'crab'] },
  garden: { name: 'Back Garden', an: 'hedgehog', top: 'grass', under: 'dirt', sky: ['#5ab0f0', '#d0f0ff'], far: ['#b85a48', '#d8c8a0'], trees: ['apple', 'oak'], hides: ['flowerpot', 'barrel', 'bush'], decor: ['flower', 'flower', 'mushroom', 'fencebit', 'birdhouse'], fx: 'butterflies', amb: 'quiet', houses: 1, decoys: ['snail', 'ladybird', 'butterfly', 'bird'] },
  pond: { name: 'Village Pond', an: 'duck', top: 'grass', under: 'dirt', sky: ['#6ab8f0', '#e0f4ff'], far: ['#5a9a4a', '#7ab860'], trees: ['oak', 'apple'], hides: ['reeds', 'crate', 'bush'], decor: ['flower', 'tuft', 'flower'], water: 2, fx: 'butterflies', amb: 'quiet', houses: 1, decoys: ['frog', 'ladybird', 'snail'] },
  mountain: { name: 'Mountain Peaks', an: 'snowleopard', top: 'snow', under: 'stone', sky: ['#4a8ae0', '#d8ecff'], far: ['#6a7484', '#8a94a4'], trees: ['pine', 'snowpine'], hides: ['boulder', 'snowpile', 'log'], decor: ['pebble', 'pebble'], fx: 'snow', amb: 'wind', peaks: 1, decoys: ['rabbit', 'bird'] },
  desert: { name: 'Desert Dunes', an: 'camel', top: 'sand', under: 'sandstone', sky: ['#f0b050', '#ffe8b0'], far: ['#d09a48', '#e8b868'], trees: ['cactus', 'palm'], hides: ['urn', 'sandrock', 'cactusclump'], decor: ['minicactus', 'pebble', 'drytuft'], fx: 'dust', amb: 'wind', decoys: ['lizard', 'snail'] },
  cage: { name: "The Poacher's Cage", top: 'night', under: 'darkdirt', sky: ['#1e1838', '#6a4a6a'], far: ['#17122a', '#241c3a'], trees: ['dead', 'pine', 'dead'], hides: [], decor: ['pebble', 'mushroom'], fx: 'fireflies', amb: 'fire', night: 1 },
  station: { name: 'Ranger Station', top: 'grass', under: 'dirt', sky: ['#5ab0f0', '#d0f0ff'], far: ['#5a9a4a', '#7ab860'], trees: ['oak', 'apple'], hides: [], decor: ['flower', 'flower', 'tuft'], fx: 'butterflies', amb: 'quiet' }
};
const BIDS = ['jungle', 'arctic', 'ocean', 'savanna', 'amazon', 'volcano', 'garden', 'pond', 'mountain', 'desert'];
const DECOY = {
  butterfly: 'A butterfly! Butterflies taste with their feet.', frog: 'A frog! Frogs drink through their skin.', rabbit: 'A hare! Its big ears help it hear danger.',
  ladybird: 'A ladybird! Its spots tell birds "I taste yucky!"', crab: 'A crab! Crabs walk sideways.', lizard: 'A lizard! Some lizards can grow a new tail.',
  snail: 'A snail! It carries its home on its back.', bird: 'A little bird! Only birds have feathers.'
};
const DIFF = {
  explorer: { name: 'Explorer', spots: [3, 5], hints: 5, moveT: [2.3, 1.9], moves: 12, taps: [1, 1], chance: [.5, .7], feint: 0, peek: 3, second: 99, cryR: 999 },
  ranger: { name: 'Ranger', spots: [4, 7], hints: 3, moveT: [1.5, 1.15], moves: 10, taps: [1, 2], chance: [.7, 1], feint: .15, peek: 2, second: 4, cryR: 999 },
  chief: { name: 'Chief Ranger', spots: [6, 9], hints: 2, moveT: [1.2, .9], moves: 10, taps: [2, 3], chance: [1, 1], feint: .3, peek: 1, second: 0, cryR: 360 }
};
const dif = () => DIFF[DB.set.diff] || DIFF.explorer;

/* ============ UI: panels, toasts, journal ============ */
const UI = {
  open: false, tq: [], tt: 0, onClose: null,
  modal(html, o = {}) {
    const p = $('panel'); p.innerHTML = html; p.className = 'panel' + (o.wide ? ' wide' : ''); p.scrollTop = 0;
    $('ov').className = 'on' + (o.clear ? ' clear' : ''); this.open = true;
    for (const k in K) K[k] = 0;
    p.querySelectorAll('[data-say]').forEach(b => b.onclick = () => { AU.init(); say(b.dataset.say); });
  },
  close() { $('ov').className = ''; this.open = false; try { speechSynthesis.cancel(); } catch (e) { } },
  on(id, fn) { const e = $(id); if (e) e.onclick = ev => { AU.init(); SFX.click(); fn(ev); }; },
  toast(msg, ms) { if (this.tq.length && this.tq[this.tq.length - 1].msg === msg) return; if ($('toast').textContent === msg && this.tt > 0) return; this.tq.push({ msg, ms: ms || 2600 }); if (this.tq.length > 2) this.tq.shift(); if (this.tt > 900) this.tt = 900; },
  update(dt) {
    this.tt -= dt * 1000; const t = $('toast');
    if (this.tt <= 0) { if (this.tq.length) { const q = this.tq.shift(); t.textContent = q.msg; t.classList.add('on'); this.tt = q.ms; } else t.classList.remove('on'); }
  }
};
const sayBtn = txt => `<button class="btn sm" data-say="${txt.replace(/"/g, '&quot;')}">🔊 Read to me</button>`;
function setBar(show, txt, frac, col) { const b = $('bar'); b.style.display = show ? 'block' : 'none'; if (show) { $('barT').textContent = txt; $('barF').style.width = Math.round(clamp(frac, 0, 1) * 100) + '%'; $('barF').style.background = col || '#e53935'; } }

function showJournal(back) {
  const cells = AIDS.map((id, n) => { const k = DB.journal[id], head = (n === 0 || ANIMALS[id].ch !== ANIMALS[AIDS[n - 1]].ch) && typeof CHAPTERS !== 'undefined' ? `<div class="jh">CHAPTER ${ANIMALS[id].ch}: ${CHAPTERS[ANIMALS[id].ch].name.toUpperCase()}</div>` : ''; return `${head}<div class="acell ${k ? '' : 'off'}" data-id="${id}"><img class="pix" src="${portrait(id, true)}" alt="">${k ? ANIMALS[id].name : '???'}${DB.rescued.includes(id) ? '<span class="tag">❤</span>' : ''}</div>`; }).join('');
  const n = AIDS.filter(id => DB.journal[id]).length;
  UI.modal(`<h2>📖 ARLO'S FIELD JOURNAL</h2><p class="small">Animals discovered: ${n} / ${AIDS.length}. Tap one to read about it.</p><div class="grid5">${cells}</div><button class="btn sm" id="jbd">🎖 Badges</button><button class="btn sm" id="jgl">🖼 Art Gallery</button><button class="btn" id="jb">CLOSE</button>`, { wide: true });
  UI.on('jbd', () => showBadges(() => showJournal(back))); UI.on('jgl', () => showGallery(() => showJournal(back)));
  document.querySelectorAll('.acell').forEach(c => c.onclick = () => { AU.init(); if (DB.journal[c.dataset.id]) { SFX.click(); showAnimalCard(c.dataset.id, () => showJournal(back)); } else { SFX.nope(); } });
  UI.on('jb', () => { UI.close(); if (back) back(); });
}
function showAnimalCard(id, back) {
  const a = ANIMALS[id], txt = `${a.name}. ${a.fact} A baby is called a ${a.baby}. It lives in ${a.home}. It eats ${a.eats}.`;
  UI.modal(`<h2>${a.name.toUpperCase()}</h2><div><img class="pix" style="width:132px" src="${portrait(id, true)}" alt=""><img class="pix" style="width:132px" src="${portrait(id, false)}" alt=""></div>
  <p class="small">baby &nbsp;→&nbsp; grown-up</p><p>${a.fact}</p>
  <div class="list"><div class="li"><b>Baby name</b><span>${a.baby}</span></div><div class="li"><b>Real home</b><span>${a.home}</span></div><div class="li"><img class="pix" src="${iconURL(a.food)}" alt=""><b>Eats</b><span>${a.eats}</span></div></div>
  ${sayBtn(txt)}<button class="btn sm" id="cry">🔈 Hear it</button><button class="btn" id="cb">BACK</button>`);
  UI.on('cry', () => { SFX.cry(id, true, .16); setTimeout(() => SFX.cry(id, false, .16), 700); });
  UI.on('cb', () => { UI.close(); if (back) back(); });
}
const HOWTO = {
  story: `<h2>🔦 STORY ADVENTURE</h2><div class="list">
   <div class="li"><b>1. Walk</b><span>Use ◀ ▶ and ▲ JUMP, or the arrow keys. You can also tap the ground.</span></div>
   <div class="li"><b>2. Search</b><span>Stand by a bush, rock or log and press 🔍 SEARCH. Follow paw-print clues and listen for the baby! Collect 💎 treasures: every 5 gives a hint, and you can spend them at the Ranger Hut in your Sanctuary. Treasures sparkle back in finished landscapes after a while!</span></div>
   <div class="li"><b>3. Poacher!</b><span>Take too long and the Poacher comes looking too. TAP him before he reaches the baby! If he nets it, TAP him again as he runs.</span></div>
   <div class="li"><b>4. Care</b><span>Feed the baby the right food, then carry it to the orange Safe Tent.</span></div>
   <div class="li"><b>5. Task Gate</b><span>Walk to the stone gate on the far right. Finish the task to open it and move on.</span></div>
   <div class="li"><b>📋 Ranger Signs</b><span>Blue signs with a ? ask a quick question. Answer it for 3 💎 treasures.</span></div></div>
   <p class="small">Keys: arrows / A D to walk, Space to jump, E to search, H for a hint.</p>`,
  sanct: `<h2>🏡 ANIMAL SANCTUARY</h2><div class="list">
   <div class="li"><img class="pix" src="AXE" alt=""><b>Axe</b><span>Chop trees to get wood.</span></div>
   <div class="li"><img class="pix" src="SHOVEL" alt=""><b>Shovel</b><span>Dig holes for ponds. Dig up snow, sand, bushes and rocks to carry home.</span></div>
   <div class="li"><img class="pix" src="BUCKET" alt=""><b>Bucket</b><span>Scoop water from the lake and pour it into a hole.</span></div>
   <div class="li"><img class="pix" src="HANDS" alt=""><b>Hands</b><span>Pick fruit, catch fish and collect food.</span></div>
   <div class="li"><img class="pix" src="FENCE" alt=""><b>Fences</b><span>Pick the fence tool, then drag on the ground to draw a fence. PEN draws a whole pen with a gate. ✏️ DESIGN lets you draw your own shape.</span></div>
   <div class="li"><img class="pix" src="BOAT" alt=""><b>Boat</b><span>You cannot walk on water. Walk into your boat to row. In the boat, press USE to go fishing.</span></div>
   <div class="li"><b>🎒 Bag</b><span>Make signs, bowls, boats and decorations from wood. Pick something, then press USE to place it.</span></div>
   <div class="li"><b>💎 Ranger Hut</b><span>Tap the red Ranger Hut with your hands to open the Treasure Shop. Pay with 💎 treasures. You can only find treasures in the Story landscapes, so go exploring to get more!</span></div>
   <div class="li"><b>🗺 Map</b><span>The Sanctuary is huge! Tap the little map in the corner to travel. Use ＋ and − to zoom. Build in the white-edged areas: Meadow, Woodland Park, Great Plains, Beach and Sea.</span></div>
   <div class="li"><b>🛤 Paths and visitors</b><span>In the fence tool, PATH lays free gravel paths. Visitors walk them and give coins to happy homes.</span></div>
   <div class="li"><b>🏪 Shop and jobs</b><span>Spend coins at the Food Store. Do Ranger Jobs on the board to earn more.</span></div>
   <div class="li"><b>🌊 The sea</b><span>Take the boat at the beach. Fences on the sea become nets. A nurse shark needs a big net pen. Press 🤿 to Look Below!</span></div>
   <div class="li"><b>Build a home</b><span>Make a pen with a gate. Put a SIGN inside and choose the animal. Check 📋 GOALS to see what it needs. Tap the sign to paint it and spell the name!</span></div></div>
   <p class="small">Keys: arrows / WASD to walk, Space to use, 1-6 for tools, E for the bag, G for goals.</p>`
};
function showHow(which, back) {
  let h = HOWTO[which]; if (which === 'sanct') h = h.replace('AXE', iconURL('axe')).replace('SHOVEL', iconURL('shovel')).replace('BUCKET', iconURL('bucket')).replace('HANDS', iconURL('hands')).replace('FENCE', iconURL('fencetool')).replace('BOAT', iconURL('boat'));
  UI.modal(h + `<button class="btn go" id="hb">OK!</button>`); UI.on('hb', () => { UI.close(); if (back) back(); });
}
function showPause() {
  const m = MODE === Story ? 'story' : 'sanct';
  UI.modal(`<h2>PAUSED</h2><button class="btn go big" id="pr">▶ KEEP PLAYING</button><br><button class="btn sm" id="ph">How to play</button><button class="btn sm" id="pj">Journal</button><br>
  <button class="btn sm" id="ps">Sound: ${AU.muted ? 'OFF' : 'ON'}</button><button class="btn sm" id="pm">Music: ${AU.music ? 'ON' : 'OFF'}</button><br><button class="btn sm red" id="pq">Main menu</button>`);
  UI.on('pr', () => UI.close()); UI.on('ph', () => showHow(m, showPause)); UI.on('pj', () => showJournal(showPause));
  UI.on('ps', () => { AU.setMute(!AU.muted); DB.set.mute = AU.muted; SAVE.put(); showPause(); });
  UI.on('pm', () => { AU.music = !AU.music; DB.set.music = AU.music; SAVE.put(); showPause(); });
  UI.on('pq', () => { if (MODE && MODE.save) MODE.save(); UI.close(); goMenu(); });
}
