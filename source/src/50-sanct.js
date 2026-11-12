/* ============ ANIMAL SANCTUARY: gather, dig and build on a tile grid ============ */
const G = { GRASS: 0, DRY: 1, SNOW: 2, SAND: 3, MUD: 4, ROCK: 5, VOLC: 6, MOSS: 7, WATER: 8, PIT: 9, PLANK: 10, LEAF: 11, HEATH: 12, SHINGLE: 13, REDSAND: 14, GRAVEL: 15 };
const GT = ['grass', 'dry', 'snow', 'sand', 'mud', 'rock', 'volc', 'moss', 'water0', 'pit', 'plank', 'leaf', 'heath', 'shingle', 'redsand', 'gravel'];
const GBLOCK = ['b_grass', 'b_dry', 'b_snow', 'b_sand', 'b_mud', 'b_rock', 'b_volc', 'b_moss', null, null, null, 'b_leaf', 'b_heath', 'b_shingle', 'b_redsand', null];
const O = { NONE: 0, TREE: 1, FRUIT: 2, PALM: 3, PINE: 4, SAP: 5, SAPF: 6, SAPP: 7, BUSH: 8, REEDS: 9, BOULDER: 10, FLOWER: 11, TALL: 12, OLDLOG: 13, CACTUS: 14, FENCE: 15, GATE: 16, SIGN: 17, TROUGH: 18, TROUGHF: 19, BOWL: 20, BOWLF: 21, SHELTER: 22, LOGPILE: 23, HUT: 24, STUMP: 25, FIRE: 26, BLOCK: 27, BOAT: 28, LANTERN: 29, BENCH: 30, FLAG: 31, BALL: 32, LILY: 33,
  CAVE: 34, SETT: 35, NESTBOX: 36, BUGHOTEL: 37, ROCKPOOL: 38, SEAWEED: 39, MUSH: 40, SHELLS: 41, STORE: 42, JOBS: 43, BIRCH: 44, HAZEL: 45, HEATHER: 46,
  FOUNTAIN: 47, STATUE: 48, CHEST: 49, SWING: 50, ARCH: 51 };
const SOLID = new Set([O.TREE, O.FRUIT, O.PALM, O.PINE, O.BUSH, O.REEDS, O.BOULDER, O.OLDLOG, O.CACTUS, O.FENCE, O.SIGN, O.TROUGH, O.TROUGHF, O.BOWL, O.BOWLF, O.SHELTER, O.LOGPILE, O.HUT, O.FIRE, O.BLOCK, O.LANTERN, O.BENCH, O.FLAG, O.CAVE, O.SETT, O.NESTBOX, O.BUGHOTEL, O.STORE, O.JOBS, O.BIRCH, O.HAZEL, O.FOUNTAIN, O.STATUE, O.CHEST, O.SWING]);
const DECOR = [O.FLOWER, O.LANTERN, O.BENCH, O.FLAG, O.BALL, O.LILY, O.MUSH, O.SHELLS, O.SEAWEED, O.HEATHER, O.FOUNTAIN, O.STATUE, O.CHEST, O.SWING, O.ARCH];
const DENS = [O.CAVE, O.SETT, O.NESTBOX, O.LOGPILE, O.SHELTER];
const BUILDZ = new Set(['meadow', 'park', 'plains', 'beach', 'sea']);
const FCOLS = ['#c79a5a', '#f4f4f4', '#e5342b', '#3f8fdc', '#4aa343', '#ffd23f'];
const FSTYLES = ['Wood rails', 'Picket', 'Stone wall', 'Hedge'];
const ITEM = {
  wood: { n: 'Wood' }, fence: { n: 'Fence', obj: O.FENCE }, gate: { n: 'Gate', obj: O.GATE }, sign: { n: 'Habitat sign', obj: O.SIGN }, trough: { n: 'Water trough', obj: O.TROUGH }, bowl: { n: 'Food bowl', obj: O.BOWL },
  shelter: { n: 'Shelter', obj: O.SHELTER }, logpile: { n: 'Log pile', obj: O.LOGPILE }, sapling: { n: 'Tree sapling', obj: O.SAP }, fruitsap: { n: 'Fruit sapling', obj: O.SAPF }, palmsap: { n: 'Palm sapling', obj: O.SAPP },
  boat: { n: 'Boat', obj: O.BOAT, water: 1 }, plank: { n: 'Plank path / bridge', gnd: G.PLANK }, lantern: { n: 'Lantern', obj: O.LANTERN }, bench: { n: 'Bench', obj: O.BENCH }, flag: { n: 'Flag', obj: O.FLAG }, ball: { n: 'Play ball', obj: O.BALL }, lily: { n: 'Water lily', obj: O.LILY, water: 1 },
  bush: { n: 'Bush', obj: O.BUSH }, reeds: { n: 'Reeds', obj: O.REEDS }, boulder: { n: 'Boulder', obj: O.BOULDER }, flower: { n: 'Flower', obj: O.FLOWER },
  cave: { n: 'Boulder cave', obj: O.CAVE }, sett: { n: 'Sett tunnel', obj: O.SETT }, nestbox: { n: 'Nest box', obj: O.NESTBOX }, bughotel: { n: 'Bug and bee hotel', obj: O.BUGHOTEL }, rockpool: { n: 'Rock pool', obj: O.ROCKPOOL },
  seaweed: { n: 'Seaweed', obj: O.SEAWEED, water: 1 }, shells: { n: 'Shells', obj: O.SHELLS }, mushroom: { n: 'Mushrooms', obj: O.MUSH }, heather: { n: 'Heather', obj: O.HEATHER }, tallgrass: { n: 'Long grass', obj: O.TALL },
  fountain: { n: 'Fountain', obj: O.FOUNTAIN }, statue: { n: 'Golden Arlo statue', obj: O.STATUE }, chest: { n: 'Treasure chest', obj: O.CHEST }, swing: { n: 'Swing', obj: O.SWING }, arch: { n: 'Rainbow arch', obj: O.ARCH },
  b_leaf: { n: 'Leaf litter block', gnd: G.LEAF }, b_heath: { n: 'Heather block', gnd: G.HEATH }, b_shingle: { n: 'Pebble block', gnd: G.SHINGLE }, b_redsand: { n: 'Red sand block', gnd: G.REDSAND },
  nuts: { n: 'Nuts', food: 1 }, nectar: { n: 'Flower nectar', food: 1 },
  b_grass: { n: 'Grass block', gnd: G.GRASS }, b_dry: { n: 'Dry grass block', gnd: G.DRY }, b_snow: { n: 'Snow block', gnd: G.SNOW }, b_sand: { n: 'Sand block', gnd: G.SAND }, b_mud: { n: 'Mud block', gnd: G.MUD }, b_rock: { n: 'Rock block', gnd: G.ROCK }, b_volc: { n: 'Volcanic block', gnd: G.VOLC }, b_moss: { n: 'Moss block', gnd: G.MOSS },
  fruit: { n: 'Fruit', food: 1 }, fish: { n: 'Fish', food: 1 }, greens: { n: 'Leafy greens', food: 1 }, meat: { n: 'Meat', food: 1 }, shrimp: { n: 'Shrimp', food: 1 }, bugs: { n: 'Bugs & worms', food: 1 }, seeds: { n: 'Seeds', food: 1 }
};
const RECIPE = { fence: { wood: 1, gives: 2 }, gate: { wood: 2, gives: 1 }, sign: { wood: 1, gives: 1 }, bowl: { wood: 1, gives: 1 }, trough: { wood: 3, gives: 1 }, logpile: { wood: 3, gives: 1 }, shelter: { wood: 6, gives: 1 }, boat: { wood: 6, gives: 1 }, plank: { wood: 1, gives: 3 }, lantern: { wood: 2, gives: 1 }, bench: { wood: 3, gives: 1 }, flag: { wood: 1, gives: 1 }, ball: { wood: 1, gives: 1 },
  nestbox: { wood: 2, gives: 1 }, bughotel: { need: { wood: 2, reeds: 1 }, gives: 1 }, sett: { need: { wood: 2, boulder: 1 }, gives: 1 }, cave: { need: { boulder: 4 }, gives: 1 }, rockpool: { need: { boulder: 2 }, gives: 1 } };
const need = R => R.need || { wood: R.wood };
const TOOLS = ['hands', 'axe', 'shovel', 'bucket', 'item', 'fence'];
const SWIM = new Set(['polarbear', 'turtle', 'capybara', 'flamingo', 'duck', 'otter', 'frog', 'seal', 'puffin', 'crab', 'elephant']);
const AQUA = new Set(['shark', 'starfish']);
const REQ = {
  gorilla: [['g', G.MOSS, 6, 'Jungle moss floor', 'Dig MOSS in the jungle (west).'], ['o', [O.TREE, O.SAP], 3, 'Trees', 'Chop trees to get saplings, then plant them.'], ['o', [O.FRUIT, O.SAPF], 1, 'Fruit tree', 'Chop a red fruit tree to get a fruit sapling.'], ['w', 2, 'Pond tiles'], ['f', 'fruit']],
  polarbear: [['g', G.SNOW, 8, 'Snow floor', 'Dig SNOW in the snowy mountain tops (north).'], ['w', 4, 'Icy pond tiles'], ['f', 'fish']],
  turtle: [['g', G.SAND, 6, 'Sandy beach', 'Dig SAND in the desert (south-west corner).'], ['w', 6, 'Lagoon tiles'], ['f', 'greens']],
  lion: [['g', G.DRY, 8, 'Dry grass floor', 'Dig DRY GRASS in the savanna (west, between the jungle and the desert).'], ['o', [O.TREE, O.SAP], 2, 'Shady trees', 'Chop trees to get saplings, then plant them.'], ['t'], ['f', 'meat']],
  capybara: [['g', G.MUD, 4, 'Muddy bank', 'Dig MUD in the marsh (south of the lake).'], ['w', 6, 'River tiles'], ['o', [O.REEDS], 2, 'Reeds', 'Dig up REEDS in the marsh with your shovel.'], ['f', 'greens']],
  flamingo: [['g', G.VOLC, 4, 'Volcanic rock', 'Dig VOLCANIC ROCK at the volcano (north-east corner).'], ['w', 4, 'Shallow pond tiles'], ['f', 'shrimp']],
  hedgehog: [['o', [O.BUSH], 2, 'Bushes', 'Dig up BUSHES with your shovel.'], ['o', [O.LOGPILE], 1, 'Log pile', 'Make a LOG PILE in your bag.'], ['f', 'bugs']],
  duck: [['w', 4, 'Pond tiles'], ['o', [O.REEDS], 2, 'Reeds', 'Dig up REEDS by the lake with your shovel.'], ['o', [O.SHELTER], 1, 'Duck house', 'Make a SHELTER in your bag.'], ['f', 'seeds']],
  snowleopard: [['g', G.ROCK, 6, 'Rocky floor', 'Dig ROCK in the mountains (north).'], ['g', G.SNOW, 3, 'Snow patch', 'Dig SNOW in the snowy mountain tops (north).'], ['o', [O.BOULDER], 2, 'Boulders', 'Dig up BOULDERS in the mountains.'], ['o', [O.SHELTER], 1, 'Cave shelter', 'Make a SHELTER in your bag.'], ['f', 'meat']],
  camel: [['g', G.SAND, 8, 'Sand floor', 'Dig SAND in the desert (south-west corner).'], ['w', 2, 'Oasis pond tiles'], ['o', [O.PALM, O.SAPP], 1, 'Palm tree', 'Chop a palm in the desert to get a palm sapling.'], ['t'], ['f', 'greens']],
  fox: [['g', G.LEAF, 6, 'Woodland floor', 'Dig LEAF LITTER in the Wild Wood (east).'], ['o', [O.CAVE, O.SETT], 1, 'A den', 'Make a BOULDER CAVE or a SETT in your bag.'], ['f', 'bugs']],
  badger: [['g', G.LEAF, 6, 'Woodland floor', 'Dig LEAF LITTER in the Wild Wood (east).'], ['o', [O.SETT], 1, 'Sett tunnel', 'Make a SETT in your bag (wood and a boulder).'], ['f', 'bugs']],
  redsquirrel: [['o', [O.PINE, O.TREE, O.BIRCH, O.SAP], 3, 'Trees to climb', 'Plant saplings. Chop trees to get them.'], ['o', [O.NESTBOX], 1, 'Drey box', 'Make a NEST BOX in your bag.'], ['f', 'nuts']],
  dormouse: [['o', [O.BUSH, O.HAZEL], 3, 'Hedge bushes', 'Dig up BUSHES with your shovel and plant them.'], ['o', [O.NESTBOX], 1, 'Nest box', 'Make a NEST BOX in your bag.'], ['f', 'nuts']],
  barnowl: [['o', [O.NESTBOX], 1, 'Owl box', 'Make a NEST BOX in your bag.'], ['o', [O.TALL], 3, 'Long grass', 'Dig up LONG GRASS with your shovel and plant it inside. Voles live there!'], ['f', 'meat']],
  otter: [['w', 6, 'River tiles'], ['o', [O.LOGPILE], 1, 'Holt (log pile)', 'Make a LOG PILE in your bag.'], ['f', 'fish']],
  kingfisher: [['w', 4, 'Stream tiles'], ['g', G.MUD, 2, 'Muddy bank', 'Dig MUD in the marsh (south of the lake).'], ['o', [O.TREE, O.SAP, O.BIRCH], 1, 'Perch tree', 'Plant a sapling for a perch.'], ['f', 'fish']],
  frog: [['w', 4, 'Pond tiles'], ['o', [O.REEDS, O.LILY], 2, 'Reeds or lilies', 'Dig up REEDS or collect LILIES from the lake.'], ['o', [O.LOGPILE], 1, 'Log pile to hide in', 'Make a LOG PILE in your bag.'], ['f', 'bugs']],
  ladybird: [['o', [O.FLOWER], 4, 'Flowers', 'Pick FLOWERS with your hands and plant them.'], ['o', [O.BUGHOTEL], 1, 'Bug hotel', 'Make a BUG HOTEL in your bag.'], ['f', 'bugs']],
  bumblebee: [['o', [O.FLOWER, O.HEATHER], 6, 'Flowers and heather', 'Pick FLOWERS, and dig up HEATHER on the moor.'], ['o', [O.BUGHOTEL], 1, 'Bee hotel', 'Make a BUG HOTEL in your bag.'], ['f', 'nectar']],
  puffin: [['g', G.GRASS, 4, 'Cliff-top grass', 'Use GRASS blocks. Dig them in the meadow or park.'], ['w', 4, 'Sea or pond tiles'], ['o', [O.NESTBOX], 1, 'Burrow box', 'Make a NEST BOX in your bag.'], ['f', 'fish']],
  seal: [['g', G.SAND, 4, 'Beach to rest on', 'Build on the BEACH bay (south-east corner).'], ['w', 10, 'Sea tiles'], ['f', 'fish']],
  crab: [['g', G.SAND, 3, 'Sandy floor', 'Build on the BEACH.'], ['o', [O.ROCKPOOL], 2, 'Rock pools', 'Make ROCK POOLS in your bag (2 boulders each).'], ['f', 'shrimp']],
  starfish: [['o', [O.ROCKPOOL], 2, 'Rock pools', 'Make ROCK POOLS in your bag (2 boulders each).'], ['w', 3, 'Water tiles'], ['f', 'shrimp']],
  shark: [['w', CONFIG.sanct.seaPen, 'Sea tiles (a BIG net pen)', 'Row out to sea from the beach bay. Use the fence tool on the water to make nets.'], ['o', [O.SEAWEED], 2, 'Seaweed', 'Collect SEAWEED in the sea from your boat, then place it.'], ['f', 'fish']],
  elephant: [['g', G.DRY, 10, 'Grassland', 'Build on the GREAT PLAINS (south). Its floor is dry grass.'], ['w', 6, 'Water hole tiles'], ['o', [O.TREE, O.SAP], 2, 'Shady trees', 'Plant tree saplings.'], ['f', 'greens']],
  rhino: [['g', G.DRY, 8, 'Grassland', 'Build on the GREAT PLAINS (south).'], ['g', G.MUD, 4, 'Mud wallow', 'Dig MUD in the marsh (south of the lake) and place it.'], ['o', [O.TREE, O.SAP], 1, 'Shade tree', 'Plant a tree sapling.'], ['t'], ['f', 'greens']],
  kangaroo: [['g', G.REDSAND, 8, 'Red sand', 'Dig RED SAND in the Outback (along the south coast).'], ['o', [O.BUSH], 2, 'Shrubs for shade', 'Dig up BUSHES with your shovel.'], ['t'], ['f', 'greens']],
  eagle: [['o', [O.PINE, O.TREE, O.SAP], 2, 'Tall trees', 'Plant tree saplings.'], ['o', [O.NESTBOX], 1, 'Big nest', 'Make a NEST BOX in your bag.'], ['w', 4, 'Fishing water'], ['f', 'fish']],
  tortoise: [['g', G.VOLC, 4, 'Volcanic rock', 'Dig VOLCANIC ROCK at the volcano (north-east corner).'], ['o', [O.BOULDER], 1, 'A rock to rest by', 'Dig up a BOULDER.'], ['o', [O.SHELTER], 1, 'Shelter', 'Make a SHELTER in your bag.'], ['f', 'greens']]
};
/* what each animal enjoys: these decorations give extra Happy Points */
const LIKES = { fox: [O.MUSH, O.BALL, O.LOGPILE], badger: [O.MUSH, O.LOGPILE], redsquirrel: [O.MUSH, O.HAZEL], dormouse: [O.FLOWER, O.HAZEL], barnowl: [O.LANTERN, O.FLAG], otter: [O.LILY, O.BALL], kingfisher: [O.LILY, O.FLOWER], frog: [O.LILY, O.MUSH],
  ladybird: [O.FLOWER, O.HEATHER], bumblebee: [O.FLOWER, O.HEATHER], puffin: [O.FLOWER, O.SHELLS], seal: [O.SHELLS, O.BALL], crab: [O.SHELLS, O.SEAWEED], starfish: [O.SEAWEED, O.SHELLS], shark: [O.SEAWEED], elephant: [O.BALL, O.FLAG], rhino: [O.FLAG, O.BALL],
  kangaroo: [O.BALL, O.BENCH], eagle: [O.FLAG, O.LANTERN], tortoise: [O.FLOWER, O.BENCH], gorilla: [O.BALL, O.FLOWER], polarbear: [O.BALL], turtle: [O.LILY, O.SHELLS], lion: [O.BALL], capybara: [O.LILY], flamingo: [O.LILY, O.FLOWER], hedgehog: [O.MUSH, O.FLOWER], duck: [O.LILY], snowleopard: [O.FLAG], camel: [O.LANTERN] };
/* the biome a pen feels like, from its floor */
const BIOMEOF = { [G.GRASS]: 'meadow', [G.DRY]: 'savannah', [G.SNOW]: 'snowy', [G.SAND]: 'beach', [G.MUD]: 'wetland', [G.ROCK]: 'rocky', [G.VOLC]: 'volcanic', [G.MOSS]: 'jungle', [G.LEAF]: 'woodland', [G.HEATH]: 'heath', [G.SHINGLE]: 'beach', [G.REDSAND]: 'outback', [G.PLANK]: 'meadow', [G.GRAVEL]: 'meadow' };
const HOMEBIO = { gorilla: 'jungle', polarbear: 'snowy', turtle: 'beach', lion: 'savannah', capybara: 'wetland', flamingo: 'volcanic', hedgehog: 'meadow', duck: 'wetland', snowleopard: 'rocky', camel: 'beach',
  fox: 'woodland', badger: 'woodland', redsquirrel: 'woodland', dormouse: 'meadow', barnowl: 'meadow', otter: 'wetland', kingfisher: 'wetland', frog: 'wetland', ladybird: 'meadow', bumblebee: 'meadow',
  puffin: 'meadow', seal: 'sea', crab: 'beach', starfish: 'beach', shark: 'sea', elephant: 'savannah', rhino: 'savannah', kangaroo: 'outback', eagle: 'woodland', tortoise: 'volcanic' };
const FOODTIP = { fruit: 'Pick FRUIT from red fruit trees with your hands.', fish: 'Row your BOAT onto the lake (west of the meadow) and press USE to go fishing.', greens: 'Pick LEAFY GREENS from bushes with your hands.', meat: 'Buy MEAT at the Ranger Hut with 💎 treasures, or at the Food Store with coins.', shrimp: 'Catch SHRIMP in the marsh water (bottom left).', bugs: 'Find BUGS in old logs in the forest (north of the meadow).', seeds: 'Collect SEEDS from tall golden grass.',
  nuts: 'Pick NUTS from hazel bushes in the Wild Wood, or pine cones from pine trees.', nectar: 'Collect NECTAR from heather on the moor, or buy it at the FOOD STORE.' };
const ZONES = {
  meadow: ['Sanctuary Meadow', 'Build your animal homes here.'], jungle: ['Jungle', 'Dig MOSS here. Chop red fruit trees for fruit saplings.'], forest: ['Forest', 'Lots of trees to chop. Old logs hide bugs.'],
  mountain: ['Mountains', 'Dig ROCK here. Dig up boulders to carry home.'], snow: ['Snowy Tundra', 'Dig SNOW here.'], volcano: ['Volcano', 'Dig black VOLCANIC ROCK here.'],
  desert: ['Desert', 'Dig SAND here. Chop a palm for a palm sapling.'], savanna: ['Savanna', 'Dig DRY GRASS here. Tall grass has seeds.'], marsh: ['Marsh', 'Dig MUD here. Dig up reeds. The water has shrimp.'], lake: ['Lake', 'Fill your bucket here. Walk into your boat to row out and go fishing.'],
  wildwood: ['Wild Wood', 'Dig LEAF LITTER here. Pick nuts from hazel bushes. Find mushrooms.'], park: ['Woodland Park', 'A building area for British wildlife.'], moor: ['Heather Moor', 'Dig HEATHER blocks. Bees love heather nectar.'],
  plains: ['Great Plains', 'A huge building area for elephants, rhinos and kangaroos.'], outback: ['Red Outback', 'Dig RED SAND here. Boulders and bushes too.'], beach: ['Beach', 'A building area. Collect shells. Seals and crabs live by the sea.'], sea: ['Open Sea', 'Use your boat. Fences on the water become nets for a sea pen. Press 🤿 to Look Below!']
};
const ZCOL = { meadow: '#6fbb48', jungle: '#2f7a3a', forest: '#3f9a3a', mountain: '#8b8f96', snow: '#eef4fa', volcano: '#4a4350', desert: '#e6d08a', savanna: '#c8b257', marsh: '#70553a', lake: '#3f8fdc',
  wildwood: '#8a6a32', park: '#8fd060', moor: '#9a6a9a', plains: '#d8c56c', outback: '#c8642e', beach: '#f0dc9c', sea: '#2a6ac0' };
const ZSPOT = { meadow: [32, 22], park: [80, 36], plains: [32, 80], beach: [68, 80], wildwood: [80, 9], moor: [80, 58], outback: [2, 80], jungle: [8, 6], forest: [26, 8], mountain: [38, 8], snow: [56, 14], volcano: [55, 32], desert: [52, 56], savanna: [30, 56], marsh: [6, 52], lake: [13, 28] };

const Sanct = {
  N: 96, Z: null, vis: [], visT: 10, jobT: 0, look: false, gnd: null, obj: null, a: null, animals: [], regrow: [], t: 0, evalT: 0, tipT: 0, zone: '', zoneT: {}, chop: null, P: null, fx: [], dark: null, hotK: '', hudK: '', saveT: 0, tap0: null, fmode: 'line', dragS: null, bp: null, bpPos: null, undo: [], fish: null, wmsgT: 0, flash: 0,
  idx(x, y) { return y * this.N + x; },
  inB(x, y) { return x >= 0 && y >= 0 && x < this.N && y < this.N; },
  /* can we build here? (the meadow, park, plains, beach and sea are building areas) */
  inM(x, y) { return this.inB(x, y) && BUILDZ.has(this.zoneAt(x, y)); },
  zoneAt(x, y) {
    if (x < 64 && y < 64) return this.zoneOld(x, y);
    if (y < 64) return y < 18 ? 'wildwood' : y >= 52 ? 'moor' : (x >= 67 && x <= 93 ? 'park' : 'wildwood');
    if (x < 64) return (y >= 67 && y <= 92 && x >= 3 && x <= 60) ? 'plains' : 'outback';
    return (x <= 73 || y <= 66) ? 'beach' : 'sea';
  },
  zoneOld(x, y) {
    if (x >= 16 && x <= 47 && y >= 16 && y <= 47) return 'meadow';
    if (y < 16) return x < 20 ? 'jungle' : x < 32 ? 'forest' : x < 44 ? 'mountain' : 'snow';
    if (x >= 48) return y < 24 ? 'snow' : y < 42 ? 'volcano' : 'desert';
    if (y >= 48) return x >= 40 ? 'desert' : x >= 22 ? 'savanna' : 'marsh';
    return y >= 42 ? 'marsh' : 'lake';
  },

  /* ----- start / save ----- */
  start() {
    const N = this.N;
    if (DB.sanct && DB.sanct.gnd && DB.sanct.gnd.length !== N * N) { const on = Math.round(Math.sqrt(DB.sanct.gnd.length)); if (OLDRECT[on]) this.migrateIsland(on); }
    if (!DB.sanct || !DB.sanct.gnd || DB.sanct.gnd.length !== N * N) this.newWorld();
    const Z = this.Z = DB.sanct;
    this.gnd = Uint8Array.from(Z.gnd, c => c.charCodeAt(0) - 65); this.obj = Uint8Array.from(Z.obj, c => c.charCodeAt(0) - 65);
    if (!Z.v3) {   // a sanctuary from an older version: add the new things without losing anything
      Z.v3 = 1; Z.inv.boat = (Z.inv.boat || 0) + 1; Z.plan = []; Z.fc = {}; Z.fcol = 0; Z.port = {}; Z.bps = [];
      for (const k in Z.meta) Z.port[k] = CONFIG.sanct.bowlPortions; for (const h of Z.habs) if (h.arrived) h.fedOnce = true;
      for (let i = 0; i < this.gnd.length; i++) if (this.gnd[i] === G.WATER && this.obj[i] === O.NONE && this.zoneAt(i % N, (i / N) | 0) === 'lake' && Story.h01(i * 31) < .04) this.obj[i] = O.LILY;
    }
    if (!Z.v4) this.upgrade4();
    this.a = { x: Z.px, y: Z.py, dir: 0, wk: 0, useT: 0, tx: null, ty: null, stuck: 0, boat: !!Z.boat };
    { const ti = this.idx(Math.floor(Z.px / TS), Math.floor((Z.py - 2) / TS)), wet = this.gnd[ti] === G.WATER; if (wet !== this.a.boat) { this.a.boat = false; this.a.x = 32 * TS + 8; this.a.y = 20 * TS + 8; } }
    this.dragS = null; this.bp = null; this.undo = []; this.fish = null; this.fmode = 'line';
    this.animals = []; this.regrow = []; this.vis = []; this.visT = 6; this.chop = null; this.P = null; this.fx = []; this.hotK = ''; this.hudK = ''; this.zone = ''; this.zoneT = {}; PT.length = 0; FT.length = 0;
    Z.habs.forEach((h, i) => { h.ck = null; h._img = null; if (h.arrived) this.spawnAnimal(i); });
    this.evalAll();
    CAM.x = clamp(this.a.x - VW / 2, 0, N * TS - VW); CAM.y = clamp(this.a.y - VH / 2, 0, N * TS - VH);
    setMode(this, 'm-sanct'); AMB.set('quiet'); this.buildHotbar(); this.miniK = ''; this.mapImg = null;
    if (Z.told.islandNews === 0) { Z.told.islandNews = 1; setTimeout(() => { if (MODE === this) UI.toast('🏝 Your Sanctuary is now an ISLAND! Everything you built has moved with you. Tap the map in the corner to explore.', 6000); }, 1200); }
    if (!DB.tips.hutIntro && Z.told.how) { DB.tips.hutIntro = 1; setTimeout(() => { if (MODE === this) UI.toast(`💎 NEW: the red Ranger Hut is now a Treasure Shop! Spend the 💎 you collect in the Story landscapes. You have ${DB.gems || 0}.`, 5500); }, 2500); }
    if (!Z.told.how) { Z.told.how = 1; showHow('sanct', () => UI.toast('Welcome to your Sanctuary, Ranger Arlo!')); }
  },
  newWorld() {
    const N = this.N, r = RNG((rnd() * 1e9) | 0), gnd = new Uint8Array(N * N), obj = new Uint8Array(N * N);
    const GZ = { meadow: G.GRASS, jungle: G.MOSS, forest: G.GRASS, mountain: G.ROCK, snow: G.SNOW, volcano: G.VOLC, desert: G.SAND, savanna: G.DRY, marsh: G.MUD, lake: G.WATER };
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const z = this.zoneAt(x, y), i = y * N + x, q = r(); let gg = GZ[z] || 0, o = 0;
      if (z === 'lake') { if (x >= 13) { gg = x === 13 && q < .5 ? G.WATER : G.SAND; if (gg === G.SAND && q > .88) o = O.REEDS; } }
      else if (z === 'marsh') { const cx = (x >> 1) * 7 + (y >> 1) * 13; if (Story.h01(cx) < .32) gg = G.WATER; else if (q < .2) o = O.REEDS; }
      else if (z === 'jungle') o = q < .12 ? O.TREE : q < .22 ? O.FRUIT : q < .3 ? O.BUSH : 0;
      else if (z === 'forest') o = q < .2 ? O.TREE : q < .25 ? O.FRUIT : q < .31 ? O.OLDLOG : q < .36 ? O.BUSH : q < .4 ? O.FLOWER : 0;
      else if (z === 'mountain') o = q < .14 ? O.BOULDER : q < .22 ? O.PINE : 0;
      else if (z === 'snow') { if (x >= 54 && x <= 57 && y >= 6 && y <= 9) gg = G.WATER; else o = q < .1 ? O.PINE : q < .13 ? O.BOULDER : 0; }
      else if (z === 'volcano') o = q < .07 ? O.BOULDER : 0;
      else if (z === 'desert') { if (x >= 54 && x <= 55 && y >= 54 && y <= 55) gg = G.WATER; else o = q < .07 ? O.PALM : q < .14 ? O.CACTUS : 0; }
      else if (z === 'savanna') o = q < .06 ? O.TREE : q < .26 ? O.TALL : 0;
      else if (z === 'meadow') { if (!(x >= 27 && x <= 37 && y >= 16 && y <= 24)) o = q < .035 ? O.TREE : q < .075 ? O.FLOWER : q < .105 ? O.TALL : q < .12 ? O.BUSH : 0; }
      if (x >= 64 || y >= 64) { this.genNew(x, y, gnd, obj, r); continue; }
      gnd[i] = gg; obj[i] = o;
    }
    for (let y = 18; y < 40; y++) for (let x = 1; x < 12; x++) if (r() < .04) obj[y * N + x] = O.LILY;
    for (let y = 27; y <= 29; y++) { gnd[y * N + 13] = G.SAND; obj[y * N + 13] = 0; gnd[y * N + 12] = G.WATER; } obj[28 * N + 12] = O.BOAT;
    obj[17 * N + 32] = O.HUT; obj[17 * N + 31] = O.BLOCK; obj[17 * N + 33] = O.BLOCK; obj[18 * N + 35] = O.FIRE;
    this.extras(gnd, obj);
    DB.sanct = { gnd: '', obj: '', inv: { wood: 6, fence: 16, gate: 1, sign: 1, bowl: 1 }, water: 0, habs: [], meta: {}, port: {}, plan: [], fc: {}, fcol: 0, fst: 0, bps: [], v3: 1, v4: 1, boat: false, time: 30, tool: 0, item: null, px: 32 * TS + 8, py: 20 * TS + 8, told: {}, doneAll: false };
    this.gnd = gnd; this.obj = obj; this.Z = DB.sanct; this.save(true);
  },
  save(skipPos) {
    const Z = this.Z; if (!Z || !this.gnd) return;
    let s1 = '', s2 = ''; for (let i = 0; i < this.gnd.length; i++) { s1 += String.fromCharCode(65 + this.gnd[i]); s2 += String.fromCharCode(65 + this.obj[i]); }
    Z.gnd = s1; Z.obj = s2; if (!skipPos && this.a) { Z.px = Math.round(this.a.x); Z.py = Math.round(this.a.y); Z.boat = !!this.a.boat; }
    const habs = Z.habs; Z.habs = habs.map(h => ({ an: h.an, x: h.x, y: h.y, arrived: h.arrived, grown: h.grown, age: h.age || 0, hung: h.hung || 0, fedOnce: !!h.fedOnce, art: h.art || '', spelt: !!h.spelt, nick: h.nick || '' }));
    SAVE.put(); Z.habs = habs;
  },

  /* ----- update ----- */
  update(dt) {
    const Z = this.Z, a = this.a, N = this.N; this.t += dt; Z.time = (Z.time + dt) % 240;
    for (let k = 1; k <= 6; k++) if (JP['Digit' + k]) this.setTool(k - 1);
    if (this.flash > 0) this.flash -= dt; this.wmsgT -= dt;
    if (JP.KeyE || JP.a_bag) { this.showBag(); return; }
    if (JP.KeyG) { this.showGoals(); return; }
    if (JP.Minus) this.zoom(-1); if (JP.Equal) this.zoom(1); if (JP.KeyM) { this.showMap(); return; }
    if (JP.Backquote && window.GAME.debug) { for (const k of ['boulder', 'b_leaf', 'b_heath', 'b_redsand', 'nuts', 'nectar', 'seaweed', 'shells', 'mushroom', 'heather'] ) Z.inv[k] = (Z.inv[k] || 0) + 30; for (const k of ['cave', 'sett', 'nestbox', 'bughotel', 'rockpool']) Z.inv[k] = (Z.inv[k] || 0) + 10; DB.coins += 50; for (const k of ['wood', 'fence', 'b_snow', 'b_sand', 'b_dry', 'b_mud', 'b_rock', 'b_volc', 'b_moss', 'fruit', 'fish', 'greens', 'meat', 'shrimp', 'bugs', 'seeds', 'reeds', 'bush', 'boulder', 'sapling', 'fruitsap', 'palmsap', 'flower']) Z.inv[k] = (Z.inv[k] || 0) + 30; for (const k of ['gate', 'sign', 'bowl', 'trough', 'shelter', 'logpile', 'boat', 'lantern', 'bench', 'flag', 'ball', 'plank']) Z.inv[k] = (Z.inv[k] || 0) + 10; Z.water = 99; this.hotK = ''; }
    // movement
    let mx = (K.right ? 1 : 0) - (K.left ? 1 : 0), my = (K.down ? 1 : 0) - (K.up ? 1 : 0);
    if (JP.left) a.dir = 2; else if (JP.right) a.dir = 3; else if (JP.up) a.dir = 1; else if (JP.down) a.dir = 0;
    if (mx || my) a.tx = null;
    else if (a.tx != null) { const dx = a.tx - a.x, dy = a.ty - a.y; if (Math.hypot(dx, dy) < 4) a.tx = null; else { mx = Math.abs(dx) > 2 ? Math.sign(dx) : 0; my = Math.abs(dy) > 2 ? Math.sign(dy) : 0; } }
    if (a.useT > 0) { a.useT -= dt; }
    if (mx || my) {
      a.dir = mx ? (mx < 0 ? 2 : 3) : (my < 0 ? 1 : 0); this.fish = null;
      const sp = (a.boat ? 60 : 74) * dt / (mx && my ? 1.414 : 1), ox = a.x, oy = a.y;
      if (this.canStand(a.x + mx * sp, a.y)) a.x += mx * sp; if (this.canStand(a.x, a.y + my * sp)) a.y += my * sp;
      a.wk += dt; if (a.x === ox && a.y === oy) { if (!this.hop(mx, my)) { a.stuck += dt; if (a.stuck > .3) a.tx = null; } } else a.stuck = 0;
      if (a.boat && rnd() < .25) part(a.x - mx * 6, a.y - 2 - my * 6, (rnd() - .5) * 20, -14, .45, '#bfe6ff', { gr: 30 });
      if (a.boat && ((a.wk * 2.2) | 0) !== (((a.wk - dt) * 2.2) | 0)) AU.noise(.12, { f: 1400, q: .8, vol: .05 });
      this.tap0 = null;
    } else a.wk = 0;
    // fishing: wait for the float to dip
    if (this.fish) { const F = this.fish; F.t -= dt; if (F.t <= 0) { if (F.st === 'wait') { F.st = 'bite'; F.t = CONFIG.sanct.fishWindow; SFX.splash(); ftext('!', F.x * TS + 8, F.y * TS - 6, '#ffe27a', { big: true, t: 1 }); UI.toast('🎣 A bite! Press USE now!', 1500); } else { F.st = 'wait'; F.t = lerp(CONFIG.sanct.fishBite[0], CONFIG.sanct.fishBite[1], rnd()); UI.toast('It got away. Wait for the next bite…', 1600); } } }
    if (JP.jump || JP.a_use) { const [tx, ty] = this.target(); if (this.bp) this.placeBp(tx + [0, 0, -1, 1][a.dir] * (this.bp.w >> 1), ty + [1, -1, 0, 0][a.dir] * (this.bp.h >> 1)); else this.act(tx, ty); }
    const tcx = clamp(a.x - VW / 2, 0, N * TS - VW), tcy = clamp(a.y - VH / 2 - 6, 0, N * TS - VH);
    CAM.x += (tcx - CAM.x) * Math.min(1, dt * 6); CAM.y += (tcy - CAM.y) * Math.min(1, dt * 6);
    // zone messages
    const z = this.zoneAt(Math.floor(a.x / TS), Math.floor((a.y - 2) / TS));
    if (z !== this.zone) { this.zone = z; if (!this.zoneT[z] || this.t - this.zoneT[z] > 45) { this.zoneT[z] = this.t; UI.toast(`📍 ${ZONES[z][0]}: ${ZONES[z][1]}`, 3200); } AMB.set(z === 'snow' || z === 'mountain' || z === 'desert' || z === 'moor' || z === 'outback' ? 'wind' : z === 'jungle' ? 'jungle' : z === 'lake' || z === 'sea' || z === 'beach' ? 'sea' : this.night() > .3 ? 'night' : 'quiet'); }
    // things growing back
    for (let i = this.regrow.length - 1; i >= 0; i--) { const g2 = this.regrow[i]; g2.t -= dt; if (g2.t <= 0) { if (this.obj[g2.i] === O.NONE || this.obj[g2.i] === O.STUMP) this.obj[g2.i] = g2.o; this.regrow.splice(i, 1); } }
    // saplings grow into trees
    if (rnd() < dt * 1.2) { const x = ri(0, N - 1), y = ri(0, N - 1), i = this.idx(x, y), o = this.obj[i]; if (this.inM(x, y) && o === O.SAP || o === O.SAPF || o === O.SAPP) { if (rnd() < .25 && !(Math.floor(a.x / TS) === x && Math.floor((a.y - 2) / TS) === y)) { this.obj[i] = o === O.SAP ? O.TREE : o === O.SAPF ? O.FRUIT : O.PALM; burst(x * TS + 8, y * TS + 4, ['#4bb043', '#8fd060'], 8); } } }
    // habitats and animals
    this.evalT -= dt; if (this.evalT <= 0) { this.evalT = .6; this.evalAll(); }
    for (const h of Z.habs) if (h.arrived) {
      const fed = h.ck && h.ck.fed; if (fed) h.fedOnce = true;
      if (h.fedOnce && !h.grown) { h.age = (h.age || 0) + dt; if (h.age > CONFIG.sanct.growTime) { h.grown = true; SFX.grow(); UI.toast(`🌟 The ${ANIMALS[h.an].name.toLowerCase()} has grown up big and strong!`, 3200); const A = this.animals.find(q => q.an === h.an); if (A) burst(A.x, A.y - 8, ['#ffe27a', '#fff'], 18, { sp: 70 }); } }
      // one meal a day; a full bowl lasts several days and an empty bowl never costs anything
      if (fed && h.ck.bowl >= 0) { h.hung = (h.hung || 0) + dt; if (h.hung > CONFIG.sanct.mealEvery) { h.hung = 0; const bi = h.ck.bowl; Z.port[bi] = (Z.port[bi] || 1) - 1; if (Z.port[bi] <= 0) { this.obj[bi] = O.BOWL; delete Z.meta[bi]; delete Z.port[bi]; UI.toast(`🍽 The ${ANIMALS[h.an].name.toLowerCase()}'s bowl is empty. Fill it when you are ready.`); } } }
    }
    // ghost fences build themselves as soon as there is wood
    if (Z.plan.length && this.evalT > .55) { for (let k = 0; k < 2 && Z.plan.length && this.fenceStock() > 0; k++) { const i = Z.plan.shift(), x = i % N, y = (i / N) | 0; if (this.okFence(x, y) && this.takeFence()) { this.obj[i] = O.FENCE; if (this.fcode()) Z.fc[i] = this.fcode(); SFX.place(); burst(x * TS + 8, y * TS + 8, ['#c79a5a', '#fff'], 5, { sp: 30 }); this.hotK = ''; } } }
    for (const A of this.animals) this.updAnimal(A, dt);
    this.updVisitors(dt); this.jobT += dt;
    // optional night raid
    if (DB.set.raid && !this.P && this.night() > .4 && this.animals.length && rnd() < dt / 45) this.spawnRaid();
    if (this.P) this.updRaid(dt);
    // night fireflies
    if (this.night() > .3 && this.fx.length < 14 && rnd() < dt * 4) this.fx.push({ x: rnd() * VW, y: rnd() * VH, vx: (rnd() - .5) * 10, vy: (rnd() - .5) * 8, l: 3 + rnd() * 3 });
    for (let i = this.fx.length - 1; i >= 0; i--) { const p = this.fx[i]; p.l -= dt; p.x += p.vx * dt; p.y += p.vy * dt; if (p.l <= 0) this.fx.splice(i, 1); }
    this.tipT -= dt; if (this.tipT <= 0) { this.tipT = .7; this.updTip(); this.updHud(); }
    this.miniT = (this.miniT || 0) - dt; if (this.miniT <= 0) { this.miniT = .5; this.miniDraw(); }
    this.saveT += dt; if (this.saveT > 8) { this.saveT = 0; this.save(); }
  },
  night() { const t = this.Z.time; return t < 150 ? 0 : t < 170 ? (t - 150) / 20 : t < 220 ? 1 : 1 - (t - 220) / 20; },
  /* Arlo walks on land and rows on water, never the other way round */
  canStand(x, y) {
    for (const [ox, oy] of [[-4, -5], [4, -5], [-4, 0], [4, 0]]) { const tx = Math.floor((x + ox) / TS), ty = Math.floor((y + oy) / TS); if (!this.inB(tx, ty)) return false; const i = this.idx(tx, ty); if (SOLID.has(this.obj[i]) || (this.gnd[i] === G.WATER) !== !!this.a.boat) return false; }
    return true;
  },
  /* step into the boat from the shore, or out of it onto land */
  hop(mx, my) {
    const a = this.a, Z = this.Z, cx = Math.floor(a.x / TS), cy = Math.floor((a.y - 2) / TS);
    for (const [dx, dy] of (mx && my ? [[mx, 0], [0, my]] : [[mx, my]])) {
      const tx = cx + dx, ty = cy + dy; if (!this.inB(tx, ty)) continue; const i = this.idx(tx, ty), w = this.gnd[i] === G.WATER;
      if (!a.boat && w && this.obj[i] === O.BOAT) { this.board(tx, ty); return true; }
      if (a.boat && !w && !SOLID.has(this.obj[i]) && this.gnd[i] !== G.PIT) { const bi = this.idx(cx, cy); if (this.obj[bi] === O.LILY) Z.inv.lily = (Z.inv.lily || 0) + 1; this.obj[bi] = O.BOAT; a.boat = false; this.fish = null; a.x = tx * TS + 8; a.y = ty * TS + 10; a.tx = null; SFX.place(); this.hotK = ''; return true; }
      if (!a.boat && w && this.wmsgT <= 0) { this.wmsgT = 5; UI.toast(Z.inv.boat > 0 ? '🌊 You cannot walk on water. Put your BOAT on the water (it is in your 🎒 bag).' : '🌊 You cannot walk on water. Walk into your boat, or make one in your 🎒 bag.', 3200); }
    }
    return false;
  },
  board(tx, ty) { const a = this.a; this.obj[this.idx(tx, ty)] = O.NONE; a.boat = true; a.x = tx * TS + 8; a.y = ty * TS + 10; a.tx = null; SFX.splash(); burst(a.x, a.y, '#bfe6ff', 8); if (!this.Z.told.boat) { this.Z.told.boat = 1; UI.toast('⛵ You are in the boat! Row with the arrows. Press USE to go fishing. Row into the shore to get out.', 4500); } },
  fenceStock() { const Z = this.Z; return (Z.inv.fence || 0) + (Z.inv.wood || 0) * 2; },
  takeFence() { const Z = this.Z; if (Z.inv.fence > 0) { Z.inv.fence--; return true; } if (Z.inv.wood > 0) { Z.inv.wood--; Z.inv.fence = (Z.inv.fence || 0) + 1; return true; } return false; },
  okFence(x, y) { if (!this.inM(x, y)) return false; const i = this.idx(x, y), a = this.a; const o = this.obj[i]; if ((o !== O.NONE && o !== O.TALL && o !== O.FLOWER && o !== O.STUMP && o !== O.SEAWEED && o !== O.SHELLS) || (this.gnd[i] === G.WATER && this.zoneAt(x, y) !== 'sea') || this.gnd[i] === G.PIT) return false; if (Math.floor(a.x / TS) === x && Math.floor((a.y - 2) / TS) === y) return false; return !this.animals.some(q => Math.floor(q.x / TS) === x && Math.floor((q.y - 2) / TS) === y); },
  target() {
    const a = this.a; if (this.tap0) return this.tap0;
    const d = [[0, 1], [0, -1], [-1, 0], [1, 0]][a.dir]; return [Math.floor(a.x / TS) + d[0], Math.floor((a.y - 2) / TS) + d[1]];
  },
  setTool(i) { const Z = this.Z; if (i === 4 && !Z.item) { this.showBag(); return; } Z.tool = i; SFX.click(); this.hotK = ''; this.dragS = null; if (i !== 5) this.bp = null; },
  gain(k, n, x, y) { const Z = this.Z; Z.inv[k] = (Z.inv[k] || 0) + n; ftext(`+${n} ${ITEM[k].n}`, x * TS + 8, y * TS, '#fff'); SFX.pop(); this.hotK = ''; },
  natural(i, o, t) { this.regrow.push({ i, o, t: t || 40 }); },

  /* ----- using tools ----- */
  act(tx, ty) {
    const Z = this.Z, a = this.a; if (a.useT > 0) return; a.useT = .3;
    if (!this.inB(tx, ty)) return;
    const i = this.idx(tx, ty), o = this.obj[i], gg = this.gnd[i], tool = TOOLS[Z.tool], inM = this.inM(tx, ty), wx = tx * TS + 8, wy = ty * TS + 8, z = this.zoneAt(tx, ty);
    const A = this.animals.find(q => q.sleep == null && Math.floor(q.x / TS) === tx && Math.floor((q.y - 2) / TS) === ty);
    if (A && tool !== 'item') { this.pet(A); return; }
    if (this.fish) { const F = this.fish; if (F.st === 'bite') { const q = rnd(), n = q < .6 ? 1 : q < .9 ? 2 : 3, k = F.z === 'marsh' ? 'shrimp' : 'fish'; this.fish = null; this.gain(k, n, F.x, F.y); SFX.splash(); SFX.yes(); burst(F.x * TS + 8, F.y * TS + 8, n === 3 ? ['#ffe27a', '#fff'] : '#bfe6ff', 12, { sp: 60 }); UI.toast(n === 3 ? '🌟 A GOLDEN catch! +3' : n === 2 ? '🎣 A big one! +2' : '🎣 You caught one! +1', 1800); } else UI.toast('Shh… wait for the float to dip, then press USE.', 1600); return; }
    if (o === O.BOAT && tool !== 'axe') { if (a.boat) return; if (Math.max(Math.abs(tx - Math.floor(a.x / TS)), Math.abs(ty - Math.floor((a.y - 2) / TS))) <= 2) this.board(tx, ty); return; }
    if (tool === 'fence') { this.fenceTap(tx, ty); return; }
    const isTree = o === O.TREE || o === O.FRUIT || o === O.PALM || o === O.PINE || o === O.BIRCH;
    if (DENS.includes(o) && tool === 'hands' && this.animals.some(q => q.sleep === i)) { this.peek(this.animals.find(q => q.sleep === i)); return; }
    if (tool === 'hands') {
      if (o === O.STORE) { this.showStore(); return; }
      if (o === O.JOBS) { this.showJobs(); return; }
      if (o === O.FRUIT) this.gain('fruit', 2, tx, ty);
      else if (o === O.PINE) { this.gain('nuts', 1, tx, ty); UI.toast('🌰 Pine cones! Squirrels love the seeds inside.', 1800); }
      else if (o === O.HAZEL) this.gain('nuts', 2, tx, ty);
      else if (o === O.HEATHER) { this.gain('nectar', 1, tx, ty); if (!inM) { this.obj[i] = O.NONE; this.natural(i, O.HEATHER, 25); } }
      else if (o === O.MUSH || o === O.SHELLS || o === O.SEAWEED) { const k = o === O.MUSH ? 'mushroom' : o === O.SHELLS ? 'shells' : 'seaweed'; this.obj[i] = O.NONE; this.gain(k, 1, tx, ty); if (!inM || z === 'sea' || z === 'beach') this.natural(i, o, 30); if (o === O.SEAWEED) SFX.splash(); }
      else if (o === O.BUSH) this.gain('greens', 2, tx, ty);
      else if (o === O.OLDLOG) this.gain('bugs', 2, tx, ty);
      else if (o === O.TALL) { this.gain('seeds', 2, tx, ty); this.obj[i] = O.NONE; if (!inM) this.natural(i, O.TALL, 20); }
      else if (o === O.FLOWER) { this.gain('flower', 1, tx, ty); this.obj[i] = O.NONE; if (!inM) this.natural(i, O.FLOWER, 30); }
      else if (o === O.HUT || o === O.BLOCK) { this.showGemShop(); return; }
      else if (o === O.SIGN) this.showHab(Z.habs.find(h => h.x === tx && h.y === ty));
      else if (o === O.BOWL || o === O.BOWLF) UI.toast('Pick a food from your 🎒 BAG, then USE it on the bowl.');
      else if (o === O.TROUGH) UI.toast('Use your BUCKET to fill the trough with water.');
      else if (isTree) UI.toast('Use your AXE to chop trees.');
      else if (o === O.REEDS || o === O.BOULDER) UI.toast('Use your SHOVEL to dig that up.');
      else if (o === O.LILY) { this.obj[i] = O.NONE; this.gain('lily', 1, tx, ty); SFX.splash(); }
      else if (gg === G.WATER && o === O.NONE) { if (a.boat) { this.fish = { st: 'wait', t: lerp(CONFIG.sanct.fishBite[0], CONFIG.sanct.fishBite[1], rnd()), x: tx, y: ty, z }; SFX.splash(); UI.toast('🎣 Fishing! Watch the float. When it dips, press USE.', 2600); } else if (z === 'marsh') { this.gain('shrimp', 1, tx, ty); SFX.splash(); burst(wx, wy, '#ffb0c0', 8); } else UI.toast('🎣 Fish live in deeper water. Hop in your boat and press USE to fish!'); }
      else if (o === O.LANTERN || o === O.BENCH || o === O.FLAG || o === O.BALL) UI.toast('Use your AXE to pick up things you built.');
      else UI.toast('Nothing to pick up here. Try a different tool!');
    } else if (tool === 'axe') {
      if (isTree) {
        if (!this.chop || this.chop.i !== i) this.chop = { i, n: 0 };
        this.chop.n++; SFX.chop(); shake(1); burst(wx, wy - 8, ['#c89a5a', '#7a4f2a', '#4bb043'], 6, { sp: 50 });
        if (this.chop.n >= 3) { this.chop = null; this.gain('wood', 6, tx, ty); const sp = o === O.TREE || o === O.BIRCH ? 'sapling' : o === O.FRUIT ? 'fruitsap' : o === O.PALM ? 'palmsap' : null; if (sp) Z.inv[sp] = (Z.inv[sp] || 0) + 1; if (inM) this.obj[i] = O.NONE; else { this.obj[i] = O.STUMP; this.natural(i, o, 40); } burst(wx, wy - 12, ['#4bb043', '#35862f', '#8fd060'], 16, { sp: 80, up: 50 }); }
      } else if (o === O.FENCE || o === O.GATE || o === O.SIGN || o === O.TROUGH || o === O.TROUGHF || o === O.BOWL || o === O.BOWLF || o === O.SHELTER || o === O.LOGPILE || o === O.BOAT || o === O.LANTERN || o === O.BENCH || o === O.FLAG || o === O.BALL || o === O.CAVE || o === O.SETT || o === O.NESTBOX || o === O.BUGHOTEL || o === O.ROCKPOOL || o === O.FOUNTAIN || o === O.STATUE || o === O.CHEST || o === O.SWING || o === O.ARCH) {
        if (this.animals.some(q => q.sleep === i)) { UI.toast('Shh! Someone is asleep in there.'); return; }
        const k = { [O.FOUNTAIN]: 'fountain', [O.STATUE]: 'statue', [O.CHEST]: 'chest', [O.SWING]: 'swing', [O.ARCH]: 'arch', [O.CAVE]: 'cave', [O.SETT]: 'sett', [O.NESTBOX]: 'nestbox', [O.BUGHOTEL]: 'bughotel', [O.ROCKPOOL]: 'rockpool', [O.BOAT]: 'boat', [O.LANTERN]: 'lantern', [O.BENCH]: 'bench', [O.FLAG]: 'flag', [O.BALL]: 'ball', [O.FENCE]: 'fence', [O.GATE]: 'gate', [O.SIGN]: 'sign', [O.TROUGH]: 'trough', [O.TROUGHF]: 'trough', [O.BOWL]: 'bowl', [O.BOWLF]: 'bowl', [O.SHELTER]: 'shelter', [O.LOGPILE]: 'logpile' }[o];
        if (o === O.SIGN) { const hi = Z.habs.findIndex(h => h.x === tx && h.y === ty); if (hi >= 0) { const h = Z.habs[hi]; this.animals = this.animals.filter(q => q.an !== h.an); Z.habs.splice(hi, 1); } }
        delete Z.meta[i]; delete Z.port[i]; delete Z.fc[i]; this.obj[i] = O.NONE; this.gain(k, 1, tx, ty); SFX.chop();
      } else if (o === O.CACTUS) UI.toast('Ouch! Too prickly to chop.');
      else if (o === O.BOULDER) UI.toast('Use your SHOVEL to dig up boulders.');
      else if (o === O.STORE || o === O.JOBS || o === O.HUT) UI.toast('That building belongs to the Sanctuary. Use your HANDS to go inside.');
      else UI.toast('Find a tree to chop.');
    } else if (tool === 'shovel') {
      const pick2 = { [O.BUSH]: 'bush', [O.REEDS]: 'reeds', [O.BOULDER]: 'boulder', [O.FLOWER]: 'flower', [O.SAP]: 'sapling', [O.SAPF]: 'fruitsap', [O.SAPP]: 'palmsap', [O.MUSH]: 'mushroom', [O.SHELLS]: 'shells', [O.HEATHER]: 'heather', [O.HAZEL]: 'bush', [O.TALL]: 'tallgrass' }[o];
      if (pick2) { this.obj[i] = O.NONE; this.gain(pick2, 1, tx, ty); SFX.dig(); burst(wx, wy, ['#8a5a33', '#6fbb48'], 8); if (!inM) this.natural(i, o, 35); }
      else if (o !== O.NONE && o !== O.STUMP && o !== O.TALL) UI.toast(isTree ? 'Use your AXE for trees.' : 'Something is in the way. Use your AXE to pick up things you built.');
      else if (gg === G.WATER) UI.toast(inM ? 'To fill in water, place a block from your bag.' : 'Use your BUCKET to collect water.');
      else if (gg === G.PIT) UI.toast('This is already a hole. Pour water in with your BUCKET!');
      else if (gg === G.PLANK) { this.gnd[i] = G.GRASS; this.gain('plank', 1, tx, ty); SFX.dig(); }
      else if (gg === G.GRAVEL) { this.gnd[i] = G.GRASS; SFX.dig(); UI.toast('Path tile taken up.', 1200); }
      else {
        SFX.dig(); shake(1); burst(wx, wy, [shade('#8a5a33', 0), '#75492a', '#9a683c'], 10, { sp: 55 }); this.gain(GBLOCK[gg], 1, tx, ty);
        if (inM) { this.gnd[i] = G.PIT; if (o === O.TALL) this.obj[i] = O.NONE; this.flood(tx, ty); }
      }
    } else if (tool === 'bucket') {
      if (gg === G.WATER && o === O.NONE) { Z.water = 5; SFX.splash(); ftext('Bucket full!', wx, wy - 8, '#7cc0f2'); burst(wx, wy, '#bfe6ff', 8); this.hotK = ''; }
      else if (o === O.TROUGH) { if (Z.water > 0) { Z.water--; this.obj[i] = O.TROUGHF; SFX.splash(); this.hotK = ''; } else UI.toast('Your bucket is empty. Fill it at the lake (west of the meadow).'); }
      else if (gg === G.PIT) { if (Z.water > 0) { Z.water--; this.gnd[i] = G.WATER; SFX.splash(); burst(wx, wy, '#bfe6ff', 10); this.floodFrom(tx, ty); this.hotK = ''; } else UI.toast('Your bucket is empty. Fill it at the lake (west of the meadow).'); }
      else UI.toast(Z.water > 0 ? 'Dig a hole with your SHOVEL first, then pour water in.' : 'Stand by water and USE the bucket to fill it.');
    } else if (tool === 'item') {
      const k = Z.item, I = ITEM[k]; if (!k || !(Z.inv[k] > 0)) { Z.item = null; Z.tool = 0; this.hotK = ''; return; }
      let ok = false;
      if (I.food) { if (o === O.BOWL || o === O.BOWLF) { this.obj[i] = O.BOWLF; Z.meta[i] = k; Z.port[i] = CONFIG.sanct.bowlPortions; ok = true; SFX.place(); const h = this.habAt(tx, ty); if (h) h.hung = 0; ftext(`${CONFIG.sanct.bowlPortions} meals`, wx, wy - 12, '#8fe085'); } else if (A) { this.pet(A); ok = true; } else UI.toast('Put food in a FOOD BOWL. Make one in your bag.'); }
      else if (I.water) { if (gg !== G.WATER || o !== O.NONE) UI.toast(k === 'boat' ? 'Put the boat on water, right next to the shore.' : k === 'seaweed' ? 'Seaweed grows in water. Place it from your boat, or on a pond.' : 'Water lilies float on water.'); else if (k !== 'boat' && !inM) UI.toast('Plant it on water inside a building area.'); else { this.obj[i] = I.obj; ok = true; SFX.splash(); burst(wx, wy, '#bfe6ff', 8); if (k === 'boat') UI.toast('⛵ Now walk into the boat to climb in!'); } }
      else if (!inM) UI.toast('Build inside a building area: the Meadow, Woodland Park, Great Plains, Beach or Sea. Tap the 🗺 map to see them.');
      else if (I.gnd != null) { if (o !== O.NONE && o !== O.TALL && o !== O.FLOWER) UI.toast('Something is in the way.'); else if (gg === I.gnd) UI.toast('That floor is already there.'); else { this.gnd[i] = I.gnd; ok = true; SFX.place(); burst(wx, wy, ['#fff', '#d8c56c'], 5, { sp: 30 }); } }
      else if (I.obj) {
        if (o !== O.NONE) UI.toast('Something is already there.');
        else if ((gg === G.WATER || gg === G.PIT) && k !== 'reeds' && !(gg === G.WATER && z === 'sea' && (k === 'sign' || k === 'bowl'))) UI.toast(gg === G.WATER && (k === 'sign' || k === 'bowl') ? 'Signs and feeding baskets can float only on the open sea.' : "You can't build on water or in a hole.");
        else if (Math.floor(a.x / TS) === tx && Math.floor((a.y - 2) / TS) === ty) UI.toast('Step back a little first.');
        else if (this.animals.some(q => Math.floor(q.x / TS) === tx && Math.floor((q.y - 2) / TS) === ty)) UI.toast('An animal is standing there!');
        else { this.obj[i] = I.obj; ok = true; SFX.place(); burst(wx, wy, ['#c79a5a', '#fff'], 5, { sp: 30 }); if (k === 'sign') { Z.inv[k]--; this.pickAnimal(tx, ty); this.hotK = ''; if (!(Z.inv[k] > 0)) { Z.item = null; Z.tool = 0; } return; } }
      }
      if (ok) { Z.inv[k]--; if (Z.inv[k] <= 0) { Z.item = null; Z.tool = 0; } this.hotK = ''; this.evalT = 0; }
    }
  },
  flood(x, y) { for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (this.inB(x + dx, y + dy) && this.gnd[this.idx(x + dx, y + dy)] === G.WATER) { this.gnd[this.idx(x, y)] = G.WATER; SFX.splash(); burst(x * TS + 8, y * TS + 8, '#bfe6ff', 8); this.floodFrom(x, y); return; } },
  floodFrom(x, y) { const st = [[x, y]]; while (st.length) { const [cx, cy] = st.pop(); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = cx + dx, ny = cy + dy; if (this.inM(nx, ny) && this.gnd[this.idx(nx, ny)] === G.PIT) { this.gnd[this.idx(nx, ny)] = G.WATER; st.push([nx, ny]); } } } },
  /* tapping an animal shows how it feels, and why */
  pet(A) {
    SFX.cry(A.an, !A.h.grown, .15); SFX.heart(); A.wait = 1.5; const h = A.h, nm = h.nick || `The ${ANIMALS[A.an].name.toLowerCase()}`, ck = h.ck || {};
    const m = !h.closed ? ['WORRIED', 'the fence has a gap. Can you fix it?'] : this.night() > .6 ? ['SLEEPY', 'it is night time. Shhh.'] : !ck.fed ? ['HUNGRY', 'the food bowl is empty.'] : (ck.decor || 0) >= 2 ? ['PLAYFUL', 'there are fun things in its home.'] : ['HAPPY', 'it has a safe, cosy home.'];
    ftext(m[0] === 'HAPPY' || m[0] === 'PLAYFUL' ? '❤' : m[0], A.x, A.y - 22, '#ff5a7a', { big: m[0] === 'HAPPY' || m[0] === 'PLAYFUL' }); UI.toast(`${nm} feels ${m[0]} because ${m[1]}`, 3000);
  },
  photo() {
    const c = document.createElement('canvas'); c.width = 240; c.height = Math.round(240 * VH / VW); const x = c.getContext('2d'); x.imageSmoothingEnabled = false; x.drawImage(lo, 0, 0, c.width, c.height);
    Learn.saveArt(c.toDataURL('image/jpeg', .8), 'A photo of my sanctuary'); this.flash = .35; AU.noise(.05, { f: 3000, vol: .2 }); AU.tone(1200, .05, { vol: .08, at: .06 }); UI.toast('📷 Snap! Saved in your Art Gallery (📖 BOOK).');
  },

  /* ----- fences: drag to draw a line or a whole pen ----- */
  fenceTap(tx, ty) {
    const Z = this.Z; if (!this.inB(tx, ty)) return; const i = this.idx(tx, ty), o = this.obj[i];
    if (this.fmode === 'erase') { this.eraseAt(tx, ty); return; }
    if (this.fmode === 'paint') { this.paintAt(tx, ty); return; }
    if (this.fmode === 'path') { this.layPath([[tx, ty]]); return; }
    if (o === O.FENCE) { this.obj[i] = O.GATE; SFX.gate(); UI.toast('🚪 Gate! Tap it again to turn it back into a fence.', 1800); this.evalT = 0; this.afterBuild([i]); }
    else if (o === O.GATE) { this.obj[i] = O.FENCE; SFX.place(); this.evalT = 0; }
    else this.buildFences([[tx, ty, 0]]);
  },
  fcode() { const Z = this.Z; return (Z.fcol || 0) + 10 * (Z.fst || 0); },
  eraseAt(tx, ty) { const Z = this.Z, i = this.idx(tx, ty), o = this.obj[i], pi = Z.plan.indexOf(i); if (pi >= 0) { Z.plan.splice(pi, 1); SFX.click(); } if (this.gnd[i] === G.GRAVEL && o === O.NONE) { this.gnd[i] = G.GRASS; SFX.dig(); } if (o === O.FENCE || o === O.GATE) { this.obj[i] = O.NONE; delete Z.fc[i]; Z.inv.fence = (Z.inv.fence || 0) + 1; SFX.chop(); burst(tx * TS + 8, ty * TS + 8, ['#c79a5a', '#7a4f2a'], 5, { sp: 40 }); this.hotK = ''; this.evalT = 0; } },
  paintAt(tx, ty) { const Z = this.Z, i = this.idx(tx, ty), o = this.obj[i], v = this.fcode(); if ((o === O.FENCE || o === O.GATE) && (Z.fc[i] || 0) !== v) { if (v) Z.fc[i] = v; else delete Z.fc[i]; SFX.pop(); burst(tx * TS + 8, ty * TS + 8, FCOLS[Z.fcol], 5, { sp: 30 }); } },
  /* gravel paths are free. Visitors walk along them. */
  layPath(tiles) {
    const Z = this.Z; let n = 0, bad = 0;
    for (const [x, y] of tiles) { if (!this.inM(x, y)) { bad++; continue; } const i = this.idx(x, y), o = this.obj[i], gg = this.gnd[i]; if (gg === G.WATER || gg === G.PIT || gg === G.GRAVEL || (o !== O.NONE && o !== O.TALL && o !== O.FLOWER && o !== O.STUMP)) { if (gg !== G.GRAVEL) bad++; continue; } if (o === O.FLOWER) Z.inv.flower = (Z.inv.flower || 0) + 1; this.obj[i] = O.NONE; this.gnd[i] = G.GRAVEL; n++; burst(x * TS + 8, y * TS + 8, ['#b8a888', '#e0d4b8'], 3, { sp: 25 }); }
    if (n) { SFX.dig(); this.undo.push({ built: [], planned: [], path: tiles.map(([x, y]) => this.idx(x, y)).filter(i => this.gnd[i] === G.GRAVEL) }); if (!Z.told.path) { Z.told.path = 1; UI.toast('🛤 A path! Visitors will come and walk along your paths. Happy animals earn coins from them.', 4200); } }
    else if (bad) { SFX.nope(); UI.toast('Paths go on clear ground inside a building area.'); }
    this.evalT = 0;
  },
  dragTiles() {
    const D = this.dragS; if (!D) return []; const x0 = Math.min(D.x0, D.x1), x1 = Math.max(D.x0, D.x1), y0 = Math.min(D.y0, D.y1), y1 = Math.max(D.y0, D.y1), out = [];
    if (this.fmode === 'pen') {
      if (x1 - x0 < 2 || y1 - y0 < 2) return [];
      for (let x = x0; x <= x1; x++) { out.push([x, y0, 0]); out.push([x, y1, 0]); } for (let y = y0 + 1; y < y1; y++) { out.push([x0, y, 0]); out.push([x1, y, 0]); }
      const ax = Math.floor(this.a.x / TS), ay = Math.floor((this.a.y - 2) / TS), mx = (x0 + x1) >> 1, my = (y0 + y1) >> 1, gs = [[mx, y1], [mx, y0], [x0, my], [x1, my]].sort((p, q) => Math.hypot(p[0] - ax, p[1] - ay) - Math.hypot(q[0] - ax, q[1] - ay))[0];
      for (const t of out) if (t[0] === gs[0] && t[1] === gs[1]) t[2] = 1;
    } else if (x1 - x0 >= y1 - y0) for (let x = x0; x <= x1; x++) out.push([x, D.y0, 0]); else for (let y = y0; y <= y1; y++) out.push([D.x0, y, 0]);
    return out;
  },
  /* build a list of [x, y, isGate]. Pieces we cannot afford yet stay as ghosts and build themselves later. */
  buildFences(tiles) {
    const Z = this.Z, e = { built: [], planned: [] }; let blocked = 0;
    for (const [x, y, gate] of tiles) { const i = this.idx(x, y), was = this.inB(x, y) ? this.obj[i] : 0; if (was === O.FENCE || was === O.GATE || Z.plan.includes(i)) continue; if (!this.okFence(x, y)) { blocked++; continue; } if (was === O.FLOWER) Z.inv.flower = (Z.inv.flower || 0) + 1; else if (was === O.TALL) Z.inv.seeds = (Z.inv.seeds || 0) + 1; else if (was === O.SEAWEED) Z.inv.seaweed = (Z.inv.seaweed || 0) + 1; else if (was === O.SHELLS) Z.inv.shells = (Z.inv.shells || 0) + 1; this.obj[i] = O.NONE; if (this.takeFence()) { this.obj[i] = gate ? O.GATE : O.FENCE; if (this.fcode()) Z.fc[i] = this.fcode(); e.built.push(i); burst(x * TS + 8, y * TS + 8, ['#c79a5a', '#fff'], 3, { sp: 30 }); } else { Z.plan.push(i); e.planned.push(i); } }
    if (!e.built.length && !e.planned.length) { if (blocked) { SFX.nope(); UI.toast('Something is in the way there. Build on clear ground inside the green meadow.'); } return; }
    SFX.place(); if (e.built.length > 3) SFX.yes(); this.undo.push(e); if (this.undo.length > 20) this.undo.shift(); this.hotK = ''; this.evalT = 0;
    if (blocked) UI.toast(`⚠ ${blocked} piece${blocked > 1 ? 's' : ''} could not be built. A tree, bush or water is in the way: move it, or draw around it.`, 3800);
    else if (e.planned.length) UI.toast(`🪵 ${e.built.length} built. ${e.planned.length} more are waiting as ghosts: chop trees and they will build themselves!`, 3600);
    this.afterBuild(e.built);
  },
  /* tell the builder when a pen is properly closed */
  afterBuild(tiles) {
    const N = this.N, seenAll = new Set(), D4 = [[1, 0], [-1, 0], [0, 1], [0, -1]], isF = i => this.obj[i] === O.FENCE || this.obj[i] === O.GATE;
    for (const t of tiles) for (const [dx, dy] of D4) {
      const sx = t % N + dx, sy = ((t / N) | 0) + dy; if (!this.inM(sx, sy)) continue; const s = this.idx(sx, sy); if (isF(s) || seenAll.has(s)) continue;
      const seen = new Set([s]), st = [s]; let closed = true, gate = false;
      while (st.length && closed) { const c = st.pop(), cx = c % N, cy = (c / N) | 0; for (const [ex, ey] of D4) { const nx = cx + ex, ny = cy + ey; if (!this.inM(nx, ny)) { closed = false; break; } const ni = this.idx(nx, ny); if (this.obj[ni] === O.GATE) { gate = true; continue; } if (this.obj[ni] === O.FENCE || seen.has(ni)) continue; seen.add(ni); st.push(ni); } if (seen.size > 420) closed = false; }
      seen.forEach(v => seenAll.add(v));
      if (closed && seen.size >= 4) { SFX.sparkle(); for (const c of seen) if (rnd() < .4) part((c % N) * TS + 8, ((c / N) | 0) * TS + 8, 0, -20, .7, '#8fe085', { gr: 0, s: 2 }); UI.toast(gate ? `✅ Closed pen with a gate! ${seen.size} tiles of room. Now put a SIGN inside (it is in your 🎒 bag).` : '✅ Closed pen! Now tap one fence piece to turn it into a GATE.', 4000); return; }
    }
  },
  undoFence() {
    const Z = this.Z, e = this.undo.pop(); if (!e) { UI.toast('Nothing to undo.'); SFX.nope(); return; }
    for (const i of e.built) if (this.obj[i] === O.FENCE || this.obj[i] === O.GATE) { this.obj[i] = O.NONE; delete Z.fc[i]; Z.inv.fence = (Z.inv.fence || 0) + 1; }
    if (e.path) for (const i of e.path) if (this.gnd[i] === G.GRAVEL) this.gnd[i] = G.GRASS;
    Z.plan = Z.plan.filter(i => !e.planned.includes(i)); SFX.chop(); this.hotK = ''; this.evalT = 0; UI.toast(e.path ? '↩ Undone. The path is gone.' : '↩ Undone. You got your fences back.', 1600);
  },
  drag(x, y) {
    const tx = Math.floor((x + CAM.x) / TS), ty = Math.floor((y + CAM.y) / TS);
    if (this.bp) { this.bpPos = [tx, ty]; return; }
    const D = this.dragS; if (!D || !this.inB(tx, ty)) return;
    if (tx !== D.x1 || ty !== D.y1) { D.x1 = tx; D.y1 = ty; if (this.fmode === 'erase') this.eraseAt(tx, ty); else if (this.fmode === 'paint') this.paintAt(tx, ty); }
  },
  hover(x, y) { if (this.bp) this.bpPos = [Math.floor((x + CAM.x) / TS), Math.floor((y + CAM.y) / TS)]; },
  dragEnd() {
    const D = this.dragS; if (!D) return; const tiles = this.dragTiles(); this.dragS = null;
    if (this.fmode === 'erase' || this.fmode === 'paint') return;
    if (this.fmode === 'path') { this.layPath(tiles); return; }
    if (D.x0 === D.x1 && D.y0 === D.y1 && this.fmode === 'line') { this.fenceTap(D.x0, D.y0); return; }
    if (!tiles.length) { UI.toast('Drag a bigger box: a pen needs to be at least 3 tiles wide and 3 tall.'); SFX.nope(); return; }
    this.buildFences(tiles);
  },
  /* place a design from the Designer: the ghost follows the pointer, a tap builds it */
  placeBp(tx, ty) {
    const B = this.bp, ox = tx - (B.w >> 1), oy = ty - (B.h >> 1); this.bp = null; this.hotK = '';
    this.buildFences(B.cells.map(([x, y, v]) => [ox + x, oy + y, v === 2 ? 1 : 0]));
  },
  designer() {
    const Z = this.Z, GW = 18, GH = 12, CS = 22, cells = new Uint8Array(GW * GH); let mode = 1, last = null;
    const shape = (fn) => { cells.fill(0); const m = new Uint8Array(GW * GH); for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) if (fn(x, y)) m[y * GW + x] = 1; const at = (x, y) => x >= 0 && y >= 0 && x < GW && y < GH && m[y * GW + x]; let low = -1; for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) if (at(x, y) && !(at(x + 1, y) && at(x - 1, y) && at(x, y + 1) && at(x, y - 1) && at(x + 1, y + 1) && at(x - 1, y - 1) && at(x + 1, y - 1) && at(x - 1, y + 1))) { cells[y * GW + x] = 1; if (x === 8) low = y * GW + x; } if (low >= 0) cells[low] = 2; };
    const PRE = { 'Square': (x, y) => x >= 5 && x <= 11 && y >= 2 && y <= 8, 'Long': (x, y) => x >= 2 && x <= 15 && y >= 3 && y <= 8, 'L-shape': (x, y) => (x >= 3 && x <= 8 && y >= 1 && y <= 10) || (x >= 3 && x <= 14 && y >= 6 && y <= 10), 'Round': (x, y) => Math.hypot(x - 8.5, y - 5.5) < 5.2, 'Heart': (x, y) => { const u = (x - 8.5) / 5.6, v = (5.2 - y) / 5.2; return Math.pow(u * u + v * v - 1, 3) - u * u * v * v * v <= 0; } };
    const render = () => {
      UI.modal(`<h2>✏️ FENCE DESIGNER</h2><p class="small">Draw your fence with your finger. Make a closed shape, and add a gate!</p><canvas id="dg" class="dgrid" width="${GW * CS}" height="${GH * CS}" style="aspect-ratio:${GW}/${GH}"></canvas>
      <div><button class="btn sm ${mode === 1 ? 'sel' : ''}" data-m="1">✏️ Draw</button><button class="btn sm ${mode === 2 ? 'sel' : ''}" data-m="2">🚪 Gate</button><button class="btn sm ${mode === 0 ? 'sel' : ''}" data-m="0">🧽 Rub out</button><button class="btn sm" id="dclr">Clear</button></div>
      <div class="lbl">READY-MADE SHAPES</div><div>${Object.keys(PRE).map(k => `<button class="btn sm" data-p="${k}">${k}</button>`).join('')}</div>
      ${Z.bps.length ? `<div class="lbl">MY SAVED PLANS</div><div>${Z.bps.map((b, i) => `<button class="btn sm" data-l="${i}">${b.n}</button>`).join('')}</div>` : ''}
      <p class="lmsg" id="dcost">&nbsp;</p><button class="btn go" id="dgo">🔨 BUILD IT!</button><button class="btn sm" id="dsave">💾 Save plan</button><button class="btn sm" id="dno">Close</button>`, { wide: true });
      const cvd = $('dg'), x = cvd.getContext('2d');
      const draw = () => {
        x.fillStyle = '#8fd060'; x.fillRect(0, 0, GW * CS, GH * CS); x.strokeStyle = 'rgba(0,0,0,.12)'; x.lineWidth = 1; x.beginPath(); for (let i = 1; i < GW; i++) { x.moveTo(i * CS + .5, 0); x.lineTo(i * CS + .5, GH * CS); } for (let i = 1; i < GH; i++) { x.moveTo(0, i * CS + .5); x.lineTo(GW * CS, i * CS + .5); } x.stroke();
        for (let i = 0; i < cells.length; i++) if (cells[i]) { const X = (i % GW) * CS, Y = ((i / GW) | 0) * CS; x.fillStyle = cells[i] === 2 ? '#ffd23f' : '#c79a5a'; x.fillRect(X + 2, Y + 2, CS - 4, CS - 4); x.fillStyle = cells[i] === 2 ? '#a67a10' : '#7a4f2a'; x.fillRect(X + 2, Y + CS - 6, CS - 4, 4); }
        const n = cells.reduce((s, v) => s + (v ? 1 : 0), 0), have = this.fenceStock(), c = $('dcost');
        c.textContent = !n ? 'Draw a fence line to begin.' : n <= have ? `You need ${n} fence pieces. You have ${have}. That is enough!` : `You need ${n}. You have ${have}.  ${n} − ${have} = ${n - have} more to make. (Ghosts will wait for wood.)`; c.className = 'lmsg ' + (n && n <= have ? 'ok' : '');
      };
      const cell = e => { const r = cvd.getBoundingClientRect(); return [clamp(Math.floor((e.clientX - r.left) / r.width * GW), 0, GW - 1), clamp(Math.floor((e.clientY - r.top) / r.height * GH), 0, GH - 1)]; };
      const put = (cx, cy) => { cells[cy * GW + cx] = mode; };
      const stroke = (cx, cy) => { if (!last) { put(cx, cy); last = [cx, cy]; return; } let [lx, ly] = last; while (lx !== cx || ly !== cy) { if (lx !== cx) { lx += Math.sign(cx - lx); put(lx, ly); } if (ly !== cy) { ly += Math.sign(cy - ly); put(lx, ly); } } last = [cx, cy]; };
      cvd.onpointerdown = e => { e.preventDefault(); AU.init(); try { cvd.setPointerCapture(e.pointerId); } catch (_) { } last = null; const [cx, cy] = cell(e); if (mode === 1 && cells[cy * GW + cx] === 1 && false) return; stroke(cx, cy); SFX.pop(); draw(); };
      cvd.onpointermove = e => { if (!last) return; const [cx, cy] = cell(e); if (cx !== last[0] || cy !== last[1]) { stroke(cx, cy); draw(); } };
      cvd.onpointerup = cvd.onpointercancel = () => { last = null; };
      $('panel').querySelectorAll('[data-m]').forEach(b => b.onclick = () => { SFX.click(); mode = +b.dataset.m; $('panel').querySelectorAll('[data-m]').forEach(q => q.classList.toggle('sel', q === b)); });
      $('panel').querySelectorAll('[data-p]').forEach(b => b.onclick = () => { SFX.click(); shape(PRE[b.dataset.p]); draw(); });
      $('panel').querySelectorAll('[data-l]').forEach(b => b.onclick = () => { SFX.click(); const s = Z.bps[+b.dataset.l].c; for (let i = 0; i < cells.length; i++) cells[i] = +s[i] || 0; draw(); });
      UI.on('dclr', () => { cells.fill(0); draw(); });
      UI.on('dno', () => UI.close());
      UI.on('dsave', () => { if (!cells.some(v => v)) { SFX.nope(); return; } Learn.typeName('NAME YOUR PLAN', '', 8, nm => { if (nm) { Z.bps.push({ n: nm, c: Array.from(cells).join('') }); if (Z.bps.length > 5) Z.bps.shift(); this.save(); } render(); }); });
      UI.on('dgo', () => {
        const list = []; let x0 = 99, y0 = 99, x1 = 0, y1 = 0; for (let i = 0; i < cells.length; i++) if (cells[i]) { const cx = i % GW, cy = (i / GW) | 0; list.push([cx, cy, cells[i]]); x0 = Math.min(x0, cx); y0 = Math.min(y0, cy); x1 = Math.max(x1, cx); y1 = Math.max(y1, cy); }
        if (!list.length) { SFX.nope(); $('dcost').textContent = 'Draw something first!'; return; }
        this.bp = { cells: list.map(([cx, cy, v]) => [cx - x0, cy - y0, v]), w: x1 - x0 + 1, h: y1 - y0 + 1 }; this.bpPos = null; Z.tool = 5; this.hotK = ''; UI.close(); UI.toast('👆 Tap the meadow where you want your design. (Or press USE to build it in front of you.)', 4500);
      });
      draw();
    };
    render();
  },
  tap(x, y) {
    const a = this.a, wx = x + CAM.x, wy = y + CAM.y, tx = Math.floor(wx / TS), ty = Math.floor(wy / TS), ax = Math.floor(a.x / TS), ay = Math.floor((a.y - 2) / TS);
    if (this.P) { const P = this.P; if (Math.abs(wx - P.x) < Math.max(26, 36 / SC) && wy > P.y - 80 && wy < P.y + 12) { this.hitRaid(); return; } }
    if (this.bp) { this.placeBp(tx, ty); return; }
    if (TOOLS[this.Z.tool] === 'fence' && this.inB(tx, ty)) { a.tx = null; this.dragS = { x0: tx, y0: ty, x1: tx, y1: ty }; if (this.fmode === 'erase') this.eraseAt(tx, ty); else if (this.fmode === 'paint') this.paintAt(tx, ty); return; }
    const A = this.animals.find(q => q.sleep == null && Math.abs(q.x - wx) < 12 && wy > q.y - 26 && wy < q.y + 4);
    if (A && Math.hypot(A.x - a.x, A.y - a.y) < 60) { this.pet(A); return; }
    if (Math.max(Math.abs(tx - ax), Math.abs(ty - ay)) <= 2 && !(tx === ax && ty === ay)) {
      const dx = tx - ax, dy = ty - ay; a.dir = Math.abs(dx) >= Math.abs(dy) ? (dx < 0 ? 2 : 3) : (dy < 0 ? 1 : 0); a.tx = null; this.tap0 = [tx, ty]; this.act(tx, ty);
    } else { a.tx = wx; a.ty = wy + 4; a.stuck = 0; this.tap0 = null; }
  },

  /* ----- habitats ----- */
  habAt(tx, ty) { const i = this.idx(tx, ty); return this.Z.habs.find(h => h.cells && h.cells.has(i)); },
  evalHab(h) {
    const N = this.N, seen = new Set(), st = [[h.x, h.y]], cnt = { g: {}, o: {}, w: 0, tr: 0, fl: 0 }, A0 = ANIMALS[h.an], cap = AQUA.has(h.an) || A0.size === 'giant' || A0.size === 'large' ? 1400 : 420; let closed = true, gate = false, bowl = -1, fed = false;
    seen.add(this.idx(h.x, h.y));
    while (st.length) {
      const [x, y] = st.pop(), i = this.idx(x, y), o = this.obj[i], gg = this.gnd[i];
      if (gg === G.WATER || o === O.ROCKPOOL) cnt.w++; else cnt.g[gg] = (cnt.g[gg] || 0) + 1;
      cnt.o[o] = (cnt.o[o] || 0) + 1; if (o === O.TROUGHF) cnt.tr++; if (o === O.FLOWER) cnt.fl++;
      if (o === O.BOWL && bowl < 0) bowl = i;
      if (o === O.BOWLF) { if (this.Z.meta[i] === ANIMALS[h.an].food) { fed = true; bowl = i; } else if (bowl < 0) bowl = i; }
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy; if (!this.inM(nx, ny)) { closed = false; continue; }
        const ni = this.idx(nx, ny), no = this.obj[ni]; if (no === O.GATE) { gate = true; continue; } if (no === O.FENCE) continue;
        if (!seen.has(ni)) { seen.add(ni); st.push([nx, ny]); }
      }
      if (seen.size > cap) { closed = false; break; }
    }
    const A = ANIMALS[h.an], list = [], room = A.ch > 1 ? CONFIG.sanct.room[A.size] || 12 : 12;
    list.push({ l: 'Fence loop with a gate', ok: closed && gate, tip: closed ? 'Add a GATE to the fence.' : 'Close every gap in the fence. The sign must be inside.' });
    list.push({ l: 'Room to roam', have: closed ? seen.size : 0, need: room, ok: closed && seen.size >= room, tip: A.size === 'giant' ? 'Giant animals need a BIG pen. The Great Plains has lots of room.' : 'Make the fence loop bigger.' });
    for (const q of REQ[h.an]) {
      if (q[0] === 'g') { const v = closed ? (cnt.g[q[1]] || 0) : 0; list.push({ l: q[3], have: v, need: q[2], ok: v >= q[2], tip: q[4] + ' Then place the blocks inside.', icon: GBLOCK[q[1]] }); }
      else if (q[0] === 'o') { const v = closed ? q[1].reduce((s, k) => s + (cnt.o[k] || 0), 0) : 0; list.push({ l: q[3], have: v, need: q[2], ok: v >= q[2], tip: q[4] }); }
      else if (q[0] === 'w') { const v = closed ? cnt.w : 0; list.push({ l: q[2], have: v, need: q[1], ok: v >= q[1], tip: q[3] || 'Dig holes with your SHOVEL, then pour in water with your BUCKET.', icon: 'bucketfull' }); }
      else if (q[0] === 't') list.push({ l: 'Water trough, filled', ok: closed && cnt.tr > 0, tip: 'Make a TROUGH in your bag, place it, then fill it with your BUCKET.', icon: 'trough' });
      else if (q[0] === 'f') list.push({ l: 'Bowl of ' + FOODS[q[1]].toLowerCase(), ok: closed && (fed || (h.arrived && bowl >= 0)), tip: FOODTIP[q[1]] + ' Then USE it on a FOOD BOWL.', icon: q[1] });
    }
    h.cells = seen; h.closed = closed && gate; const decor = DECOR.reduce((s, k) => s + (cnt.o[k] || 0), 0), liked = (LIKES[h.an] || []).reduce((s, k) => s + Math.min(2, cnt.o[k] || 0), 0);
    let bio = 'meadow', bn = 0; for (const k in cnt.g) if (cnt.g[k] > bn && BIOMEOF[k]) { bn = cnt.g[k]; bio = BIOMEOF[k]; } if (cnt.w > bn && closed) bio = this.zoneAt(h.x, h.y) === 'sea' ? 'sea' : 'wetland';
    const home = HOMEBIO[h.an], bioOk = bio === home || (home === 'wetland' && bio === 'sea') || (home === 'sea' && bio === 'wetland' && cnt.w > 0);
    const happy = closed ? Math.min(10, decor + liked * 2 + (fed ? 2 : 0) + (bioOk ? 2 : 0)) : 0;
    h.ck = { list, all: list.every(q => q.ok), fed, bowl, size: seen.size, stars: 0, decor, bio, bioOk, happy };
    if (fed) h.fedOnce = true;
    if (h.arrived) h.ck.stars = 1 + (h.fedOnce ? 1 : 0) + (h.art && h.spelt && decor >= 2 ? 1 : 0);
    return h.ck;
  },
  evalAll() {
    const Z = this.Z;
    Z.habs.forEach((h, i) => {
      if (h.away) return;
      const ck = this.evalHab(h);
      if (ck.all && !h.arrived) { h.arrived = true; h.age = 0; h.hung = 0; this.spawnAnimal(i); const A = ANIMALS[h.an]; DB.journal[h.an] = 1; SFX.jingle(); setTimeout(() => SFX.cry(h.an, true, .16), 600); UI.toast(`🎉 The ${A.baby} has moved into a new home!`, 3500); burst(h.x * TS + 8, h.y * TS, ['#ffe27a', '#fff', '#ff8ab0', '#8fe085'], 30, { sp: 100, up: 60, life: 1 }); shake(3); this.evalHab(h); this.save(); if (Z.habs.filter(q => q.arrived).length >= AIDS.length && !Z.doneAll) { Z.doneAll = true; setTimeout(() => this.celebrate(), 1800); } }
    });
  },
  spawnAnimal(hi) { const h = this.Z.habs[hi]; this.animals.push({ an: h.an, h, x: h.x * TS + 8, y: h.y * TS + 22, tx: null, ty: null, wait: 1, face: 1, wk: 0 }); },
  walkable(A, tx, ty) { const i = this.idx(tx, ty); if (!A.h.cells || !A.h.cells.has(i)) return false; const o = this.obj[i]; if (SOLID.has(o)) return false; const gg = this.gnd[i]; if (gg === G.PIT) return false; if (AQUA.has(A.an)) return gg === G.WATER || o === O.ROCKPOOL; if (gg === G.WATER && !SWIM.has(A.an)) return false; return true; },
  /* nocturnal animals nap in a den in the middle of the day */
  napTime() { const t = this.Z.time; return t > 50 && t < 130; },
  updAnimal(A, dt) {
    if (ANIMALS[A.an].noct && A.h.closed) {
      if (this.napTime() && A.sleep == null && A.tx == null && A.wait <= .2 && A.h.cells) { for (const c of A.h.cells) if (DENS.includes(this.obj[c]) && !this.animals.some(q => q !== A && q.sleep === c)) { A.sleep = c; A.x = (c % this.N) * TS + 8; A.y = ((c / this.N) | 0) * TS + 12; break; } }
      else if (!this.napTime() && A.sleep != null) { A.sleep = null; A.wait = 0; }
      if (A.sleep != null) { if (!DENS.includes(this.obj[A.sleep])) A.sleep = null; else return; }
    }
    const cx = Math.floor(A.x / TS), cy = Math.floor((A.y - 2) / TS);
    if (A.tx == null) {
      A.wk = 0; A.wait -= dt;
      if (A.wait <= 0) {
        if (!A.h.closed) { A.wait = 1; return; }
        const opts = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(d => this.walkable(A, cx + d[0], cy + d[1]));
        if (opts.length) { const d = pick(opts); A.tx = (cx + d[0]) * TS + 8; A.ty = (cy + d[1]) * TS + 12; if (d[0]) A.face = d[0]; } else if (!this.walkable(A, cx, cy)) { const c = [...A.h.cells].find(i => this.walkable(A, i % this.N, (i / this.N) | 0)); if (c != null) { A.x = (c % this.N) * TS + 8; A.y = ((c / this.N) | 0) * TS + 12; } }
        A.wait = .6 + rnd() * 2.5;
      }
    } else { const dx = A.tx - A.x, dy = A.ty - A.y, d = Math.hypot(dx, dy), sp = 16 * dt; A.wk += dt; if (d <= sp) { A.x = A.tx; A.y = A.ty; A.tx = null; } else { A.x += dx / d * sp; A.y += dy / d * sp; } }
  },
  pickAnimal(tx, ty) {
    const Z = this.Z, free = AIDS.filter(id => !Z.habs.some(h => h.an === id));
    if (!free.length) { UI.toast('Every animal already has a sign!'); this.obj[this.idx(tx, ty)] = O.NONE; Z.inv.sign = (Z.inv.sign || 0) + 1; return; }
    free.sort((a, b) => (DB.rescued.includes(b) ? 1 : 0) - (DB.rescued.includes(a) ? 1 : 0));
    UI.modal(`<h2>WHO WILL LIVE HERE?</h2><p class="small">Choose an animal. Then build what it needs inside the fence. ❤ = rescued by Arlo.${this.zoneAt(tx, ty) === 'sea' ? ' This sign floats on the sea: perfect for a nurse shark!' : ''}</p><div class="grid5">${free.map(id => `<div class="acell" data-id="${id}"><img class="pix" src="${portrait(id, true)}" alt="">${ANIMALS[id].name}${DB.rescued.includes(id) ? '<span class="tag">❤</span>' : ''}</div>`).join('')}</div><button class="btn sm" id="pc">Cancel</button>`, { wide: true });
    document.querySelectorAll('.acell').forEach(c => c.onclick = () => { AU.init(); SFX.yes(); const h = { an: c.dataset.id, x: tx, y: ty, arrived: false }; Z.habs.push(h); this.evalHab(h); this.showHab(h); this.save(); });
    UI.on('pc', () => { this.obj[this.idx(tx, ty)] = O.NONE; Z.inv.sign = (Z.inv.sign || 0) + 1; this.hotK = ''; UI.close(); });
  },
  ckHtml(h) { return h.ck.list.map(q => `<span class="ck ${q.ok ? 'ok' : 'no'}">${q.ok ? '✔' : '✘'} ${q.l}${q.need ? ` ${Math.min(q.have, q.need)}/${q.need}` : ''}</span>`).join(''); },
  showHab(h) {
    if (!h) return; this.evalHab(h); const A = ANIMALS[h.an], next = h.ck.list.find(q => !q.ok), tick = v => v ? '✔' : '☐';
    UI.modal(`<h2>${h.nick ? h.nick + ' THE ' : ''}${A.name.toUpperCase()}${h.nick ? '' : ' HOME'}</h2>${h.art ? `<img class="pix" style="width:120px;border:4px solid #7a5a34" src="${h.art}" alt="">` : `<img class="pix" style="width:120px" src="${portrait(h.an, !h.grown)}" alt="">`}<p class="small">Real home: ${A.home}. Eats ${A.eats}.</p>
    <div class="hab ${h.arrived ? 'done' : ''}" style="display:block">${this.ckHtml(h)}</div>
    ${h.ck.size ? `<p class="small">This home feels like: <b>${h.ck.bio.toUpperCase()}</b> ${h.ck.bioOk ? `✔ The ${A.name.toLowerCase()} feels at home here.` : `— a ${A.name.toLowerCase()} likes <b>${HOMEBIO[h.an].toUpperCase()}</b> best.`}</p>` : ''}
    <div class="happy" aria-label="Happy points ${h.ck.happy} of 10"><b>HAPPY</b>${'<i class="on">♥</i>'.repeat(h.ck.happy)}${'<i>♥</i>'.repeat(10 - h.ck.happy)}<span>${h.ck.happy}/10</span></div>
    <p class="small">Happy points: decorations, the right biome and a full bowl. Favourite things: ${(LIKES[h.an] || []).map(o => ITEM[Object.keys(ITEM).find(k => ITEM[k].obj === o)]?.n || '').filter(Boolean).join(', ') || 'anything fun'}.</p>
    ${AQUA.has(h.an) || this.zoneAt(h.x, h.y) === 'sea' ? '<button class="btn sm" id="hlook">🤿 Look Below</button>' : ''}${ANIMALS[h.an].release && h.grown ? '<button class="btn go" id="hrel">🌊 RELEASE DAY</button>' : ANIMALS[h.an].release ? '<p class="small">When it is fully grown it can have a Release Day and go back to the wild.</p>' : ''}${h.arrived ? `<p class="ok">Home complete! ${'★'.repeat(h.ck.stars)}${'☆'.repeat(3 - h.ck.stars)}</p><p class="small">★★ feed the animal. ★★★ paint the sign, spell the name and add 2 decorations (you have ${h.ck.decor}).</p>` : next ? `<p><b>Next:</b> ${next.tip}</p>` : ''}
    <div class="lbl">MAKE THE SIGN YOUR OWN</div><button class="btn sm" id="hs1">${tick(h.art)} 🎨 Paint the sign</button><button class="btn sm" id="hs2">${tick(h.spelt)} 🔤 Spell the name</button><button class="btn sm" id="hs3">${tick(h.nick)} 🏷 Give a name</button><br><button class="btn go" id="hb">OK</button>`);
    UI.on('hb', () => UI.close()); UI.on('hlook', () => this.lookBelow(h)); UI.on('hrel', () => this.release(h));
    UI.on('hs1', () => {
      UI.modal(`<h2>🎨 PAINT THE SIGN</h2><p class="lq">Draw the ${A.name.toLowerCase()} for the sign!</p><div id="spd"></div><button class="btn go" id="spok">DONE ✔</button><button class="btn sm" id="spno">Back</button>`, { wide: true });
      const P = Learn.pad($('spd'), { w: 160, h: 120, bg: (x, W, H) => { x.fillStyle = '#f4e4b8'; x.fillRect(0, 0, W, H); x.imageSmoothingEnabled = false; x.globalAlpha = .13; x.drawImage(Learn.sprite(h.an, false), W / 2 - 66, H / 2 - 51, 132, 102); x.globalAlpha = 1; } });
      UI.on('spok', () => { if (!P.ops.length) { SFX.nope(); return; } const c = document.createElement('canvas'); c.width = 64; c.height = 48; c.getContext('2d').drawImage(P.canvas, 0, 0, 64, 48); h.art = c.toDataURL('image/jpeg', .8); h._img = null; Learn.saveArt(P.data(), `My sign for the ${A.name.toLowerCase()}`); SFX.sparkle(); this.save(); this.showHab(h); });
      UI.on('spno', () => this.showHab(h));
    });
    UI.on('hs2', () => {
      const w = (A.sw || A.name).toUpperCase();
      UI.modal(`<h2>🔤 SPELL THE NAME</h2><img class="pix lpic" src="${portrait(h.an, true)}" alt=""><p class="lq">Tap the letters to write the name on the sign.</p><div id="ssp"></div><p class="lmsg" id="lmsg">&nbsp;</p><button class="btn sm" id="sshint">💡 Hint</button><button class="btn sm" data-say="${w.toLowerCase()}">🔊 Say the word</button><button class="btn sm" id="ssno">Back</button>`, { wide: true });
      $('panel').querySelectorAll('[data-say]').forEach(b => b.onclick = () => say(b.dataset.say));
      const sp = Learn.spell($('ssp'), w, { extra: [0, 2, 3][lvl()], ghost: lvl() === 0, miss: () => Learn.msg(pick(TRY), 'no') }, () => { h.spelt = true; this.save(); Learn.msg(`${w}! The sign is finished.`, 'ok'); setTimeout(() => { if (UI.open) this.showHab(h); }, Learn.fast ? 10 : 1100); });
      UI.on('sshint', () => sp.hint()); UI.on('ssno', () => this.showHab(h));
    });
    UI.on('hs3', () => Learn.typeName(`NAME YOUR ${A.baby.toUpperCase()}`, h.nick || '', 8, nm => { if (nm != null) { h.nick = nm; this.save(); } this.showHab(h); }));
  },
  showGoals() {
    const Z = this.Z; Z.habs.forEach(h => this.evalHab(h));
    const rows = AIDS.map((id, n) => {
      const h = Z.habs.find(q => q.an === id), A = ANIMALS[id];
      const body = h ? `${this.ckHtml(h)}${h.arrived ? `<div class="st">${'★'.repeat(h.ck.stars)}${'☆'.repeat(3 - h.ck.stars)}</div>` : ''}` : `<span class="small">Needs: fence loop with gate, ${REQ[id].map(q => q[0] === 'g' ? `${q[2]} ${q[3].toLowerCase()}` : q[0] === 'o' ? `${q[2]} ${q[3].toLowerCase()}` : q[0] === 'w' ? `${q[1]} ${q[2].toLowerCase()}` : q[0] === 't' ? 'water trough' : 'bowl of ' + FOODS[q[1]].toLowerCase()).join(', ')}.</span>`;
      const head = n === 0 || ANIMALS[id].ch !== ANIMALS[AIDS[n - 1]].ch ? `<div class="lbl">CHAPTER ${ANIMALS[id].ch}: ${CHAPTERS[ANIMALS[id].ch].name.toUpperCase()}</div>` : '';
      return `${head}<div class="hab ${h && h.arrived ? 'done' : ''}"><img class="pix" src="${portrait(id, !(h && h.grown))}" alt=""><div><b>${A.name}</b> ${DB.rescued.includes(id) ? '❤ rescued by Arlo' : ''}<br>${body}</div></div>`;
    }).join('');
    UI.modal(`<h2>📋 SANCTUARY GOALS</h2><p class="small">Build a home for all ${AIDS.length} animals. Homes built: ${Z.habs.filter(h => h.arrived).length} / ${AIDS.length}. Released to the wild: ${Object.values(DB.released).reduce((a, b) => a + b, 0)}</p>${rows}<button class="btn sm" id="gr">Night raids: ${DB.set.raid ? 'ON' : 'OFF'}</button><button class="btn go" id="gb">CLOSE</button>`, { wide: true });
    UI.on('gb', () => UI.close()); UI.on('gr', () => { DB.set.raid = !DB.set.raid; SAVE.put(); this.showGoals(); });
  },
  showBag() {
    const Z = this.Z, inv = Object.keys(ITEM).filter(k => Z.inv[k] > 0);
    const li = inv.map(k => `<div class="li ${k === 'wood' ? 'dis' : ''} ${Z.item === k ? 'sel' : ''}" data-k="${k}"><img class="pix" src="${iconURL(k)}" alt=""><b>${ITEM[k].n}</b><i>x${Z.inv[k]}</i></div>`).join('') || '<p class="small">Your bag is empty.</p>';
    const can = R => Object.entries(need(R)).every(([m, n]) => (Z.inv[m] || 0) >= n);
    const rc = Object.keys(RECIPE).map(k => { const R = RECIPE[k]; return `<div class="li ${can(R) ? '' : 'dis'}" data-r="${k}"><img class="pix" src="${iconURL(k)}" alt=""><b>${ITEM[k].n}${R.gives > 1 ? ' x' + R.gives : ''}</b><i>${Object.entries(need(R)).map(([m, n]) => `${n} ${m}`).join(' + ')}</i></div>`; }).join('');
    UI.modal(`<h2>🎒 ARLO'S BAG</h2><p class="small">🪙 ${DB.coins}p &nbsp; 💎 ${DB.gems || 0} &nbsp; 🪵 ${Z.inv.wood || 0} wood &nbsp; 🪨 ${Z.inv.boulder || 0} boulders</p><div><button class="btn sm" id="bst">🏪 Food Store</button><button class="btn sm" id="bgs">💎 Ranger Hut</button><button class="btn sm" id="bjo">📋 Ranger Jobs</button><button class="btn sm" id="bmp">🗺 Map</button></div><div class="two"><div><div class="lbl">MY THINGS (tap to hold)</div><div class="list">${li}</div></div><div><div class="lbl">MAKE THINGS</div><div class="list">${rc}</div></div></div><button class="btn go" id="bb">CLOSE</button>`, { wide: true });
    UI.on('bst', () => this.showStore()); UI.on('bgs', () => this.showGemShop()); UI.on('bjo', () => this.showJobs()); UI.on('bmp', () => this.showMap());
    document.querySelectorAll('[data-k]').forEach(el => el.onclick = () => { AU.init(); const k = el.dataset.k; if (k === 'wood') { SFX.nope(); return; } SFX.click(); if (k === 'fence') { UI.close(); this.setTool(5); UI.toast('Fence tool: drag on the ground to draw a fence.'); return; } Z.item = k; Z.tool = 4; this.hotK = ''; UI.close(); UI.toast(`Holding: ${ITEM[k].n}. Press USE to ${ITEM[k].food ? 'put it in a bowl' : 'place it'}.`); });
    document.querySelectorAll('[data-r]').forEach(el => el.onclick = () => { AU.init(); const k = el.dataset.r, R = RECIPE[k]; if (!can(R)) { SFX.nope(); UI.toast(`You need ${Object.entries(need(R)).map(([m, n]) => `${n} ${m}`).join(' and ')}.`); return; } for (const [m, n] of Object.entries(need(R))) Z.inv[m] -= n; Z.inv[k] = (Z.inv[k] || 0) + R.gives; SFX.place(); this.hotK = ''; const st = $('panel').scrollTop; this.showBag(); $('panel').scrollTop = st; });
    UI.on('bb', () => UI.close());
  },
  celebrate() {
    SFX.fanfare(); setTimeout(() => SFX.jingle(), 900);
    for (let i = 0; i < 140; i++) part(rnd() * VW, -rnd() * 60, (rnd() - .5) * 40, 20 + rnd() * 50, 3 + rnd() * 2, pick(['#ff5a7a', '#ffe27a', '#8fe085', '#7cc0f2', '#fff', '#b07af0']), { gr: 20, s: 2, scr: true, fade: false });
    UI.modal(`<h1>SANCTUARY COMPLETE!</h1><p>Every animal has a safe, happy home. You are a real ranger, Arlo!</p><div class="grid5">${AIDS.map(id => `<div class="acell"><img class="pix" src="${portrait(id, false)}" alt="">${ANIMALS[id].name}</div>`).join('')}</div><p class="small">All ${AIDS.length} animals! Now make each home special: paint the signs, spell the names and add decorations to earn 3 stars.</p><button class="btn go" id="cb">KEEP PLAYING</button>`, { clear: true, wide: true });
    UI.on('cb', () => UI.close());
  },
  updTip() {
    const Z = this.Z, wood = Z.inv.wood || 0, fences = (Z.inv.fence || 0); let t;
    const un = Z.habs.find(h => !h.arrived);
    if (un && un.ck) { const q = un.ck.list.find(x => !x.ok); t = `${ANIMALS[un.an].name} home: ${q ? q.l + (q.need ? ` ${Math.min(q.have, q.need)}/${q.need}` : '') + '. ' + q.tip : 'nearly ready!'}`; }
    else if (Z.habs.length >= AIDS.length) t = 'Every animal has a home! Tap a sign to paint it and spell the name. Add decorations for 3 stars.';
    else if ((Z.inv.sign || 0) > 0) t = 'Pick the FENCE tool (6) and choose PEN. Drag a box in the meadow to build a pen with a gate. Then place a SIGN inside it.';
    else if (wood < 1 && fences < 4) t = 'Pick your AXE and chop a tree to get wood.';
    else t = 'Open your 🎒 BAG and make a SIGN. Place it inside a new fence loop to start the next home.';
    if ($('tipT').textContent !== t) $('tipT').textContent = t;
  },
  updHud() {
    const Z = this.Z, a = this.a, sea = a.boat && this.zoneAt(Math.floor(a.x / TS), Math.floor((a.y - 2) / TS)) === 'sea'; document.body.classList.toggle('look', sea);
    const k = (Z.inv.wood || 0) + '|' + (Z.inv.fence || 0) + '|' + Z.water + '|' + Z.habs.filter(h => h.arrived).length + '|' + DB.coins + '|' + DB.gems; if (k === this.hudK) return; this.hudK = k;
    $('resC').textContent = `WOOD ${Z.inv.wood || 0}  FENCE ${Z.inv.fence || 0}  WATER ${Z.water}  🪙${DB.coins}p  💎${DB.gems || 0}`; $('bGoals').textContent = `📋 GOALS ${Z.habs.filter(h => h.arrived).length}/${AIDS.length}`;
  },
  buildHotbar() {
    const Z = this.Z, k = Z.tool + '|' + Z.item + '|' + (Z.item ? Z.inv[Z.item] : 0) + '|' + Z.water + '|' + this.fmode + '|' + Z.fcol + '|' + Z.fst + '|' + !!this.bp + '|' + this.fenceStock(); if (k === this.hotK) return; this.hotK = k;
    const hb = $('hotbar'); hb.innerHTML = '';
    TOOLS.forEach((t, i) => {
      const d = document.createElement('div'); d.className = 'hb' + (Z.tool === i ? ' sel' : '');
      const ic = t === 'item' ? (Z.item || 'book') : t === 'bucket' ? (Z.water > 0 ? 'bucketfull' : 'bucket') : t === 'fence' ? 'fencetool' : t;
      d.innerHTML = `<b>${i + 1}</b><img class="pix" src="${iconURL(ic)}" alt="${t}" style="${t === 'item' && !Z.item ? 'opacity:.25' : ''}">${t === 'bucket' ? `<i>${Z.water}</i>` : t === 'item' && Z.item ? `<i>${Z.inv[Z.item] || 0}</i>` : t === 'fence' ? `<i>${this.fenceStock()}</i>` : ''}`;
      d.onpointerdown = e => { e.preventDefault(); AU.init(); this.setTool(i); }; hb.appendChild(d);
    });
    $('useB').firstChild.textContent = ['✋', '🪓', '⛏', '🪣', '📦', '🔨'][Z.tool];
    const fence = TOOLS[Z.tool] === 'fence', fb = $('ftb'); document.body.classList.toggle('fence', fence);
    if (!fence) { fb.innerHTML = ''; return; }
    fb.innerHTML = this.bp ? `<span class="fb sel">TAP THE MEADOW TO PLACE</span><button class="fb" data-f="cancel">✖ CANCEL</button>` :
      [['line', '➖ LINE'], ['pen', '⬜ PEN'], ['path', '🛤 PATH'], ['erase', '🧽 RUB OUT'], ['paint', `🎨 PAINT <i style="background:${FCOLS[Z.fcol]}"></i>`]].map(([m, l]) => `<button class="fb ${this.fmode === m ? 'sel' : ''}" data-f="${m}">${l}</button>`).join('') + `<button class="fb" data-f="style">🧱 ${FSTYLES[Z.fst || 0].toUpperCase()}</button><button class="fb" data-f="undo">↩ UNDO</button><button class="fb" data-f="design">✏️ DESIGN</button>`;
    fb.querySelectorAll('[data-f]').forEach(b => b.onpointerdown = e => {
      e.preventDefault(); AU.init(); SFX.click(); const f = b.dataset.f;
      if (f === 'undo') this.undoFence(); else if (f === 'design') this.designer(); else if (f === 'cancel') { this.bp = null; }
      else if (f === 'style') { Z.fst = ((Z.fst || 0) + 1) % FSTYLES.length; this.fmode = 'paint'; UI.toast(`🧱 ${FSTYLES[Z.fst]}! New fences use this style. Drag over old fences to restyle them.`, 2800); }
      else { if (f === 'paint' && this.fmode === 'paint') Z.fcol = (Z.fcol + 1) % FCOLS.length; this.fmode = f; UI.toast({ line: 'LINE: drag to draw a fence. Tap a fence to make it a gate.', pen: 'PEN: drag a box to build a whole pen with a gate.', erase: 'RUB OUT: tap or drag over fences to pick them up.', paint: 'PAINT: drag over fences to colour them. Tap PAINT again to change colour.', path: 'PATH: drag to lay a gravel path. It is free!' }[f], 2800); }
      this.hotK = '';
    });
  },

  /* ----- optional night raid: the Poacher only ever takes food ----- */
  spawnRaid() { this.P = { x: CAM.x - 40, y: CAM.y + VH / 2, fx: 0, fy: 0, tx: 0, ty: 0, tw: 1, mt: .5, moves: 0, taps: 3, t: 0, st: 'move', weapon: 'net', rot: 0 }; this.raidTarget(); SFX.dun(); UI.toast('🎯 The Poacher is sneaking in! TAP him 3 times!', 3200); },
  raidTarget() { const P = this.P; P.fx = P.x; P.fy = P.y; P.tx = CAM.x + 40 + rnd() * (VW - 80); P.ty = CAM.y + 70 + rnd() * (VH - 130); P.tw = 0; },
  updRaid(dt) {
    const P = this.P; P.t += dt;
    if (P.st === 'move') { if (P.tw < 1) { P.tw = Math.min(1, P.tw + dt / .4); P.x = lerp(P.fx, P.tx, P.tw); P.y = lerp(P.fy, P.ty, P.tw) - Math.sin(Math.PI * P.tw) * 16; } P.mt -= dt; if (P.mt <= 0) { P.moves++; P.mt = 1.6; if (P.moves >= 10) { const i = this.obj.indexOf(O.BOWLF); if (i >= 0) { this.obj[i] = O.BOWL; delete this.Z.meta[i]; UI.toast('😱 The Poacher took the food from a bowl! Fill it again.'); } SFX.laugh(); P.st = 'out'; P.t = 0; } else this.raidTarget(); } }
    else { P.rot += dt * (P.st === 'caught' ? 20 : 0); P.x += (P.st === 'caught' ? 260 : -220) * dt; P.y -= (P.st === 'caught' ? 160 : 0) * dt; if (P.t > 1.2) this.P = null; }
  },
  hitRaid() { const P = this.P; if (P.st !== 'move') return; P.taps--; SFX.punch(); shake(3); burst(P.x, P.y - 30, ['#fff', '#ffe27a'], 10, { sp: 80 }); if (P.taps <= 0) { P.st = 'caught'; P.t = 0; SFX.caught(); UI.toast('👊 You chased the Poacher away!'); } else { ftext('AGAIN!', P.x, P.y - 70, '#ffe27a'); this.raidTarget(); P.mt = 1.6; } },

  /* ----- drawing ----- */
  drawObj(o, x, y, tx, ty, t) {
    const cx = x + 8, by = y + 15, N = this.N, z = this.zoneAt(tx, ty), s = (tx * 7 + ty * 13) % 10;
    switch (o) {
      case O.TREE: (z === 'savanna' || z === 'plains' ? PROP.acacia : z === 'outback' ? PROP.gum : z === 'jungle' ? PROP.jungle : PROP.oak)(cx, by, t, s); break;
      case O.BIRCH: PROP.birch(cx, by, t, s); break;
      case O.HAZEL: PROP.bush(cx, by, t, s); for (const [a, b] of [[-6, -8], [-1, -11], [4, -7], [6, -3]]) { px('#a0703a', cx + a, by + b, 2, 2); } break;
      case O.HEATHER: PROP.heather(cx - 3, by - 2); PROP.heather(cx + 3, by - 5); PROP.heather(cx + 1, by + 1); break;
      case O.MUSH: PROP.mushroom(cx - 3, by - 1); PROP.mushroom(cx + 3, by - 5); break;
      case O.SHELLS: box(x + 3, y + 9, 5, 4, '#f3c9b0'); px('#e0a088', x + 4, y + 10, 1, 3); box(x + 9, y + 6, 4, 5, '#f0e0d0'); PROP.starfish(cx + 2, by - 1); break;
      case O.SEAWEED: { const d = Math.round(Math.sin(t * 2 + tx)); for (let k = 0; k < 4; k++) px(k % 2 ? '#4a8a3a' : '#3a7a2a', x + 3 + k * 3 + (k % 2 ? d : 0), y + 4 + (k % 2) * 3, 2, 9 - (k % 2) * 3); break; }
      case O.ROCKPOOL: box(x, y + 4, 16, 11, '#8a8680'); px('#3f8fdc', x + 2, y + 6, 12, 7); px('#7cc0f2', x + 3 + ((t * 2 | 0) % 6), y + 7, 4, 1); px('#4a8a4a', x + 11, y + 9, 1, 3); box(x - 1, y + 2, 5, 4, '#9a9690'); box(x + 12, y + 1, 5, 5, '#9a9690'); break;
      case O.CAVE: { box(x - 4, y - 4, 24, 19, '#7f838b'); box(x - 1, y - 9, 18, 7, '#8f939b'); box(x + 3, y - 12, 10, 4, '#9da1a9'); px('#666a72', x - 2, y + 4, 5, 1); px('#666a72', x + 14, y, 4, 1); box(x + 3, y + 3, 10, 12, '#1c1c24'); px('#2a2a34', x + 4, y + 3, 8, 2); break; }
      case O.SETT: PROP.sett(cx, by); break;
      case O.FOUNTAIN: { box(x - 2, y + 6, 20, 9, '#a8acb4'); px('#3f8fdc', x, y + 7, 16, 4); px('#7cc0f2', x + 2 + ((t * 3 | 0) % 8), y + 7, 4, 1); box(x + 6, y - 2, 4, 10, '#b8bcc4'); const f = (t * 6 | 0) % 3; px('#bfe6ff', x + 7, y - 6 - f, 2, 4); px('#bfe6ff', x + 3 - f, y - 3 + f, 2, 2); px('#bfe6ff', x + 11 + f, y - 3 + f, 2, 2); break; }
      case O.STATUE: { box(x + 1, y + 8, 14, 7, '#8d9199'); px('#a2a6ae', x + 1, y + 8, 14, 1); const G2 = '#e8b830'; px(G2, x + 5, y + 2, 2, 6); px(G2, x + 9, y + 2, 2, 6); box(x + 4, y - 6, 8, 9, G2); box(x + 5, y - 13, 6, 7, '#f0c840'); px('#c89820', x + 3, y - 14, 10, 2); box(x + 5, y - 18, 6, 4, G2); px('#fff6c8', x + 6, y - 11, 1, 1); if (((t * 2) | 0) % 3 === 0) px('#fff', x + 13, y - 16, 1, 1); break; }
      case O.CHEST: { box(x + 1, y + 5, 14, 10, '#8a5a2a'); box(x + 1, y + 1, 14, 5, '#a06a34'); px('#ffd23f', x + 1, y + 5, 14, 1); px('#ffd23f', x + 4, y + 1, 1, 14); px('#ffd23f', x + 11, y + 1, 1, 14); box(x + 6, y + 4, 4, 4, '#ffd23f'); px('#7cf0ff', x + 3, y, 2, 2); px('#7cf0ff', x + 10, y - 1, 2, 2); break; }
      case O.SWING: { const sw = Math.round(Math.sin(t * 2.5 + tx) * 3); px('#8a5a2a', x, y - 10, 2, 25); px('#8a5a2a', x + 14, y - 10, 2, 25); px('#8a5a2a', x, y - 11, 16, 2); px('#ddd', x + 4 + sw, y - 9, 1, 14); px('#ddd', x + 11 + sw, y - 9, 1, 14); box(x + 3 + sw, y + 5, 10, 3, '#e5342b'); break; }
      case O.ARCH: { const C = ['#e5342b', '#ff9a2e', '#ffd23f', '#4aa343', '#3f8fdc', '#b07af0']; C.forEach((c, k) => { g.fillStyle = c; g.beginPath(); g.arc(x + 8, y + 15, 15 - k * 2, Math.PI, 0); g.arc(x + 8, y + 15, 13 - k * 2, 0, Math.PI, true); g.fill(); }); break; }
      case O.NESTBOX: px('#7a5a34', x + 7, y + 2, 2, 13); box(x + 3, y - 7, 10, 9, '#c08a4a'); px('#8a4a2a', x + 2, y - 8, 12, 2); box(x + 6, y - 4, 4, 4, '#2a1a0c'); break;
      case O.BUGHOTEL: box(x + 1, y - 2, 14, 17, '#a07040'); px('#8a4a2a', x, y - 4, 16, 3); for (let k = 0; k < 3; k++) for (let j = 0; j < 3; j++) px((k + j) % 2 ? '#5a3a1a' : '#e0c080', x + 3 + k * 4, y + 2 + j * 4, 2, 2); break;
      case O.STORE: { box(x - 8, y - 6, 32, 21, '#d8a05a'); px('#b88040', x - 8, y + 2, 32, 1); for (let k = 0; k < 8; k++) box(x - 9 + k * 4, y - 12, 4, 6, k % 2 ? '#fff' : '#3f8fdc'); box(x + 3, y + 3, 10, 12, '#5a3a1a'); px('#ffd23f', x + 10, y + 9, 2, 2); box(x - 6, y - 3, 8, 5, '#bfe6ff'); g.drawImage(iconCanvas('fruit'), x - 6, y - 3, 6, 6); box(x + 15, y - 3, 8, 5, '#bfe6ff'); g.drawImage(iconCanvas('fish'), x + 16, y - 3, 6, 6); break; }
      case O.JOBS: px('#7a5a34', x + 2, y + 4, 2, 11); px('#7a5a34', x + 12, y + 4, 2, 11); box(x, y - 6, 16, 12, '#d8b06a'); px('#3a2a10', x + 2, y - 3, 10, 1); px('#3a2a10', x + 2, y - 1, 8, 1); px('#3a2a10', x + 2, y + 1, 9, 1); if (this.jobsReady()) { const bb = Math.round(Math.sin(t * 6) * 2); px('#e5342b', x + 11, y - 10 + bb, 4, 4); px('#fff', x + 12, y - 9 + bb, 2, 2); } break;
      case O.FRUIT: PROP.apple(cx, by, t, s); break; case O.PALM: PROP.palm(cx, by, t, s); break;
      case O.PINE: (z === 'snow' ? PROP.snowpine : PROP.pine)(cx, by, t, s); break;
      case O.SAP: case O.SAPF: case O.SAPP: px('#7a4f2a', cx - 1, by - 6, 2, 6); box(cx - 4, by - 11, 8, 6, o === O.SAPP ? '#3f9a3a' : '#4bb043'); if (o === O.SAPF) px('#e5342b', cx - 2, by - 9, 2, 2); break;
      case O.BUSH: PROP.bush(cx, by, t, s); break; case O.REEDS: PROP.reeds(cx, by, t, s); break;
      case O.BOULDER: (z === 'volcano' ? PROP.lavarock : PROP.rock)(cx, by); break;
      case O.FLOWER: PROP.flower(cx - 3, by - 2, t, s); PROP.flower(cx + 4, by - 6, t, s + 2); break;
      case O.TALL: PROP.tallgrass(cx, by, t, s); break; case O.OLDLOG: PROP.log(cx, by); px('#5a3a8a', cx + 4, by - 10, 2, 2); break;
      case O.CACTUS: PROP.cactus(cx, by); break; case O.STUMP: box(cx - 4, by - 6, 8, 6, '#7a4f2a'); px('#c89a5a', cx - 3, by - 6, 6, 2); break;
      case O.FENCE: {
        const f = (dx, dy) => { const q = this.inB(tx + dx, ty + dy) ? this.obj[this.idx(tx + dx, ty + dy)] : 0; return q === O.FENCE || q === O.GATE; };
        const v = this.Z.fc[this.idx(tx, ty)] || 0, col = FCOLS[v % 10], st = (v / 10) | 0, rail = shade(col, -.2), u = f(0, -1), dn = f(0, 1), l = f(-1, 0), r = f(1, 0);
        if (this.gnd[this.idx(tx, ty)] === G.WATER) {   // a rope net held up by buoys
          g.fillStyle = 'rgba(240,236,220,.85)'; if (u) g.fillRect(x + 7, y - 2, 1, 9); if (dn) g.fillRect(x + 7, y + 9, 1, 8); if (l) g.fillRect(x, y + 8, 7, 1); if (r) g.fillRect(x + 9, y + 8, 7, 1);
          g.fillStyle = 'rgba(240,236,220,.35)'; if (l) for (let k = 1; k < 7; k += 2) g.fillRect(x + k, y + 9, 1, 3); if (r) for (let k = 10; k < 16; k += 2) g.fillRect(x + k, y + 9, 1, 3);
          const bob = Math.round(Math.sin(t * 2 + tx + ty)); box(x + 5, y + 5 + bob, 6, 5, col === FCOLS[0] ? '#e5342b' : col); px('#fff', x + 5, y + 7 + bob, 6, 1); px('#bfe6ff', x + 3, y + 11, 10, 1); break;
        }
        if (st === 2) { const sc = mix(col, '#8d9199', .7); if (l) box(x, y + 6, 8, 9, sc); if (r) box(x + 8, y + 6, 8, 9, sc); if (u) box(x + 4, y - 1, 8, 9, sc); if (dn) box(x + 4, y + 8, 8, 8, sc); box(x + 4, y + 4, 8, 11, sc); px(shade(sc, -.25), x + 4, y + 9, 8, 1); px(shade(sc, .25), x + 5, y + 5, 3, 2); break; }
        if (st === 3) { const hc = '#3a8a3a'; if (l) box(x, y + 3, 8, 12, hc); if (r) box(x + 8, y + 3, 8, 12, hc); if (u) box(x + 3, y - 2, 10, 9, hc); if (dn) box(x + 3, y + 8, 10, 8, hc); box(x + 3, y + 2, 10, 13, '#4a9a44'); if (v % 10) { px(col, x + 5, y + 5, 2, 2); px(col, x + 10, y + 9, 2, 2); } break; }
        if (u) px(rail, x + 7, y - 2, 2, 8); if (dn) px(rail, x + 7, y + 9, 2, 8);
        if (st === 1) { if (l) { px(rail, x, y + 8, 7, 2); box(x + 2, y + 3, 3, 12, col); px(col, x + 3, y + 2, 1, 1); } if (r) { px(rail, x + 9, y + 8, 7, 2); box(x + 11, y + 3, 3, 12, col); px(col, x + 12, y + 2, 1, 1); } box(x + 6, y + 2, 4, 13, col); px(col, x + 7, y + 1, 2, 1); }
        else { if (l) { px(rail, x, y + 5, 7, 2); px(rail, x, y + 10, 7, 2); } if (r) { px(rail, x + 9, y + 5, 7, 2); px(rail, x + 9, y + 10, 7, 2); } box(x + 6, y + 1, 4, 14, col); }
        if (TOOLS[this.Z.tool] === 'fence' && u + dn + l + r < 2 && ((t * 3) | 0) % 2) { px('#ff3b3b', x + 6, y - 6, 4, 3); px('#ff3b3b', x + 7, y - 2, 2, 2); }
        break;
      }
      case O.GATE: {
        const q1 = this.inB(tx - 1, ty) ? this.obj[this.idx(tx - 1, ty)] : 0, q2 = this.inB(tx + 1, ty) ? this.obj[this.idx(tx + 1, ty)] : 0, hor = q1 === O.FENCE || q2 === O.FENCE || q1 === O.GATE || q2 === O.GATE;
        if (hor) { box(x, y + 1, 3, 14, '#8a5a2a'); box(x + 13, y + 1, 3, 14, '#8a5a2a'); box(x + 3, y + 4, 10, 9, '#e0bd78'); px('#a67a40', x + 3, y + 8, 10, 1); px('#ffd23f', x + 10, y + 9, 2, 2); }
        else { box(x + 6, y - 1, 4, 4, '#8a5a2a'); box(x + 6, y + 13, 4, 4, '#8a5a2a'); box(x + 6, y + 3, 4, 10, '#e0bd78'); px('#ffd23f', x + 7, y + 8, 2, 2); } break;
      }
      case O.SIGN: {
        const h = this.Z.habs.find(q => q.x === tx && q.y === ty);
        if (this.gnd[this.idx(tx, ty)] === G.WATER) { const bob = Math.round(Math.sin(t * 2 + tx)); box(cx - 6, by - 4 + bob, 12, 5, '#ffd23f'); px('#e5342b', cx - 6, by - 2 + bob, 12, 1); px('#7a5a34', cx - 1, by - 12 + bob, 2, 8); box(cx - 7, by - 20 + bob, 14, 9, '#d8b06a'); if (h) px(ANIMALS[h.an].col, cx - 4, by - 18 + bob, 8, 5); px('#bfe6ff', cx - 8, by + 1, 16, 1); break; }
        if (h && (h.art || h.spelt)) { px('#7a5a34', cx - 1, by - 8, 2, 8); box(cx - 9, by - 22, 18, 15, '#d8b06a'); if (h.art) { if (!h._img) { h._img = new Image(); h._img.src = h.art; } if (h._img.complete && h._img.naturalWidth) g.drawImage(h._img, cx - 7, by - 20, 14, 10); } else px(ANIMALS[h.an].col, cx - 5, by - 19, 10, 8); if (h.spelt) { px('#3a2a10', cx - 6, by - 9, 5, 1); px('#3a2a10', cx, by - 9, 6, 1); } }
        else { PROP.sign(cx, by); if (h) px(ANIMALS[h.an].col, cx - 4, by - 14, 8, 5); }
        break;
      }
      case O.BOAT: box(x + 1, y + 6, 14, 6, '#a8642c'); px('#7a4420', x + 2, y + 12, 12, 1); px('#d89a54', x + 2, y + 6, 12, 1); px('#5a3418', x + 3, y + 8, 10, 2); px('#bfe6ff', x + ((t * 2 | 0) % 2 ? 0 : 13), y + 13, 3, 1); break;
      case O.LANTERN: px('#555', x + 7, y + 6, 2, 9); box(x + 5, y, 6, 7, '#ffd23f'); px('#fff6c8', x + 7, y + 2, 2, 3); px('#555', x + 4, y - 1, 8, 1); break;
      case O.BENCH: box(x + 1, y + 7, 14, 3, '#c79a5a'); px('#8a5a2a', x + 2, y + 10, 2, 5); px('#8a5a2a', x + 12, y + 10, 2, 5); box(x + 1, y + 2, 14, 3, '#b98545'); break;
      case O.FLAG: { const wv = Math.round(Math.sin(t * 5 + tx)); px('#8a5a2a', x + 4, y - 6, 2, 21); box(x + 6, y - 5 + wv, 9, 6, '#e5342b'); px('#fff', x + 8, y - 3 + wv, 3, 2); break; }
      case O.BALL: box(x + 4, y + 7, 8, 8, '#e5342b'); px('#fff', x + 4, y + 10, 8, 2); px('#ffd23f', x + 7, y + 7, 2, 8); break;
      case O.LILY: box(x + 3, y + 6, 10, 6, '#4aa04a'); px('#3a8a3a', x + 7, y + 6, 2, 3); px('#ff9ac8', x + 6, y + 3, 4, 4); px('#fff', x + 7, y + 4, 2, 2); break;
      case O.TROUGH: case O.TROUGHF: box(x + 1, y + 6, 14, 8, '#9a6a3a'); px(o === O.TROUGHF ? '#3f8fdc' : '#5a3a1a', x + 2, y + 7, 12, 4); if (o === O.TROUGHF) px('#7cc0f2', x + 3 + ((t * 3 | 0) % 6), y + 7, 3, 1); break;
      case O.BOWL: case O.BOWLF: if (this.gnd[this.idx(tx, ty)] === G.WATER) { const bob = Math.round(Math.sin(t * 2 + ty)); box(x + 2, y + 8 + bob, 12, 5, '#b98545'); px('#8a5a2a', x + 2, y + 10 + bob, 12, 1); px('#ffd23f', x + 1, y + 12 + bob, 3, 2); px('#ffd23f', x + 12, y + 12 + bob, 3, 2); if (o === O.BOWLF) g.drawImage(iconCanvas(this.Z.meta[this.idx(tx, ty)] || 'fish'), x + 4, y + 2 + bob, 8, 8); px('#bfe6ff', x + 1, y + 14, 14, 1); break; } box(x + 3, y + 8, 10, 6, '#c0623a'); px('#8a4226', x + 4, y + 8, 8, 2); if (o === O.BOWLF) { const bi = this.idx(tx, ty), f = this.Z.meta[bi]; g.drawImage(iconCanvas(f || 'fruit'), x + 4, y + 2, 8, 8); for (let k = 0; k < (this.Z.port[bi] || 0); k++) px('#8fe085', x + 3 + k * 2, y + 15, 1, 1); } break;
      case O.SHELTER: box(x + 1, y + 4, 14, 11, '#b98545'); box(x - 1, y - 2, 18, 7, '#b8483c'); px('#c9584a', x + 2, y - 4, 12, 2); px('#3a2a1a', x + 5, y + 8, 6, 7); break;
      case O.LOGPILE: box(x + 1, y + 9, 7, 6, '#7a4f2a'); box(x + 8, y + 9, 7, 6, '#7a4f2a'); box(x + 4, y + 3, 8, 6, '#8a5a30'); px('#c89a5a', x + 1, y + 9, 2, 6); px('#c89a5a', x + 8, y + 9, 2, 6); px('#c89a5a', x + 4, y + 3, 2, 6); break;
      case O.HUT: PROP.hut(cx, by, t); break; case O.FIRE: PROP.campfire(cx, by - 2, t); break;
    }
  },
  draw() {
    const Z = this.Z, a = this.a, N = this.N, t = this.t, x0 = Math.max(0, Math.floor(CAM.x / TS)), y0 = Math.max(0, Math.floor(CAM.y / TS)), x1 = Math.min(N - 1, x0 + Math.ceil(VW / TS) + 1), y1 = Math.min(N - 1, y0 + Math.ceil(VH / TS) + 3);
    const ox = Math.round(CAM.x), oy = Math.round(CAM.y), wf = ((t * 2) | 0) % 2;
    for (let y = y0; y <= Math.min(N - 1, y1); y++) for (let x = x0; x <= x1; x++) {
      const gg = this.gnd[y * N + x], sx = x * TS - ox, sy = y * TS - oy;
      g.drawImage(gg === G.WATER ? TILES['water' + ((wf + x + y) % 2)] : TILES[GT[gg]], sx, sy);
      if (gg === G.WATER) { if (y > 0 && this.gnd[(y - 1) * N + x] !== G.WATER) { g.fillStyle = 'rgba(0,0,40,.28)'; g.fillRect(sx, sy, TS, 3); } const zz = this.zoneAt(x, y); if (zz === 'snow') { g.fillStyle = 'rgba(220,245,255,.35)'; g.fillRect(sx, sy, TS, TS); } else if (zz === 'sea') { g.fillStyle = 'rgba(10,40,120,.28)'; g.fillRect(sx, sy, TS, TS);
          const i = y * N + x, up = y > 0 && this.gnd[(y - 1) * N + x] !== G.WATER, cl = up && this.zoneAt(x, y - 1) === 'cliffs';
          if (cl) { box(sx, sy, TS, 7, '#6e727a'); px('#8b8f96', sx + 2, sy + 1, 5, 2); px('#5a5e66', sx, sy + 6, TS, 1); }
          const ln = up || (x > 0 && this.gnd[i - 1] !== G.WATER) || (x + 1 < N && this.gnd[i + 1] !== G.WATER) || (y + 1 < N && this.gnd[i + N] !== G.WATER);
          if (ln) { const f = ((this.t * 2 + x * .7 + y * .3) % 2) | 0; g.fillStyle = 'rgba(255,255,255,.55)'; if (up) g.fillRect(sx + f * 3, sy + (cl ? 8 : 1) + f, TS - 6, 1); if (x > 0 && this.gnd[i - 1] !== G.WATER) g.fillRect(sx + 1 + f, sy + 3, 1, TS - 6); if (x + 1 < N && this.gnd[i + 1] !== G.WATER) g.fillRect(sx + 14 - f, sy + 3, 1, TS - 6); if (y + 1 < N && this.gnd[i + N] !== G.WATER) g.fillRect(sx + 3, sy + 14 - f, TS - 6, 1); } } }
      else if (y > 0 && this.gnd[(y - 1) * N + x] === G.WATER) { g.fillStyle = 'rgba(255,255,255,.18)'; g.fillRect(sx, sy, TS, 1); }
    }
    // borders between areas: white dashes round building areas, soft lines elsewhere
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const z = this.zoneAt(x, y), sx = x * TS - ox, sy = y * TS - oy, b = BUILDZ.has(z) && z !== 'sea'; if (z === 'sea') continue;
      if (x + 1 < N && this.zoneAt(x + 1, y) !== z && this.zoneAt(x + 1, y) !== 'sea') { const b2 = b || BUILDZ.has(this.zoneAt(x + 1, y)); g.fillStyle = b2 ? 'rgba(255,255,255,.7)' : 'rgba(0,0,0,.18)'; for (let k = 0; k < 16; k += b2 ? 6 : 4) g.fillRect(sx + 15, sy + k, 2, b2 ? 4 : 2); }
      if (y + 1 < N && this.zoneAt(x, y + 1) !== z && this.zoneAt(x, y + 1) !== 'sea') { const b2 = b || BUILDZ.has(this.zoneAt(x, y + 1)); g.fillStyle = b2 ? 'rgba(255,255,255,.7)' : 'rgba(0,0,0,.18)'; for (let k = 0; k < 16; k += b2 ? 6 : 4) g.fillRect(sx + k, sy + 15, b2 ? 4 : 2, 2); }
    }
    // ghost fences waiting for wood, and the preview of what is being drawn
    g.globalAlpha = .45; for (const i of Z.plan) { const x = i % N, y = (i / N) | 0; if (x >= x0 && x <= x1 && y >= y0 && y <= y1) { box(x * TS - ox + 6, y * TS - oy + 1, 4, 14, '#bfe6ff'); px('#bfe6ff', x * TS - ox + 1, y * TS - oy + 6, 14, 2); } } g.globalAlpha = 1;
    this._cost = 0; this._dim = '';
    {
      let tiles = [];
      if (this.bp) { const B = this.bp, tg = this.target(), c = this.bpPos || [tg[0] + [0, 0, -1, 1][a.dir] * (B.w >> 1), tg[1] + [1, -1, 0, 0][a.dir] * (B.h >> 1)], bx = c[0] - (B.w >> 1), by = c[1] - (B.h >> 1); tiles = B.cells.map(([x, y, v]) => [bx + x, by + y, v === 2]); }
      else if (this.dragS && this.fmode === 'path') { for (const [x, y] of this.dragTiles()) { const sx = x * TS - ox, sy = y * TS - oy; g.fillStyle = this.inM(x, y) ? 'rgba(224,212,184,.7)' : 'rgba(229,52,43,.4)'; g.fillRect(sx + 1, sy + 1, 14, 14); } }
      else if (this.dragS && (this.fmode === 'line' || this.fmode === 'pen')) { tiles = this.dragTiles(); const D = this.dragS; if (this.fmode === 'pen' && tiles.length) this._dim = `${Math.abs(D.x1 - D.x0) + 1} x ${Math.abs(D.y1 - D.y0) + 1}  `; }
      let stock = this.fenceStock();
      for (const [x, y, gt] of tiles) { const ob = this.inB(x, y) ? this.obj[this.idx(x, y)] : 0; if (ob === O.FENCE || ob === O.GATE) continue; const ok = this.okFence(x, y) && !Z.plan.includes(this.idx(x, y)), sx = x * TS - ox, sy = y * TS - oy; if (ok) this._cost++; g.fillStyle = !ok ? 'rgba(229,52,43,.4)' : stock-- > 0 ? 'rgba(143,224,133,.65)' : 'rgba(124,192,242,.65)'; g.fillRect(sx + 1, sy + 1, 14, 14); if (ok) { g.fillStyle = 'rgba(255,255,255,.7)'; g.fillRect(sx + 6, sy + 2, 4, 12); } if (gt) px('#ffd23f', sx + 4, sy + 5, 8, 6); }
    }
    // target cursor + ghost
    const [tx, ty] = this.target();
    if (this.inB(tx, ty)) {
      const sx = tx * TS - ox, sy = ty * TS - oy, I = TOOLS[Z.tool] === 'item' && Z.item ? ITEM[Z.item] : null;
      if (I && this.inM(tx, ty) && this.obj[ty * N + tx] === O.NONE) { g.globalAlpha = .5 + Math.sin(t * 6) * .15; if (I.gnd != null) g.drawImage(TILES[GT[I.gnd]], sx, sy); else if (I.obj) this.drawObj(I.obj, sx, sy, tx, ty, t); g.globalAlpha = 1; }
      g.fillStyle = ((t * 3) | 0) % 2 ? '#fff' : '#ffe27a';
      for (const [cx2, cy2, w, h] of [[0, 0, 5, 1], [0, 0, 1, 5], [11, 0, 5, 1], [15, 0, 1, 5], [0, 15, 5, 1], [0, 11, 1, 5], [11, 15, 5, 1], [15, 11, 1, 5]]) g.fillRect(sx + cx2, sy + cy2, w, h);
    }
    // objects and creatures, sorted by row
    const ents = this.animals.map(A => ({ y: A.y, A })); ents.push({ y: a.y, arlo: 1 }); for (const V of this.vis) ents.push({ y: V.y, V }); ents.sort((p, q) => p.y - q.y); let ei = 0;
    for (let y = y0; y <= y1 + 2; y++) {
      this.drawLandmarks(y, ox, oy, t);
      if (y < N) for (let x = Math.max(0, x0 - 1); x <= Math.min(N - 1, x1 + 1); x++) { const o = this.obj[y * N + x]; if (o && o !== O.BLOCK && o !== O.PEAK) this.drawObj(o, x * TS - ox, y * TS - oy, x, y, t); }
      while (ei < ents.length && ents[ei].y < (y + 1) * TS) {
        const e = ents[ei++];
        if (e.V) { this.drawVisitor(e.V, ox, oy, t); continue; }
        if (e.arlo) {
          const dir = a.dir === 0 ? 'front' : a.dir === 1 ? 'back' : 'side', X = Math.round(a.x - ox), Y = Math.round(a.y - oy);
          if (a.boat) {
            const bob = Math.round(Math.sin(t * 3)), pd = Math.round(Math.sin(a.wk * 7) * 3);
            g.save(); g.beginPath(); g.rect(X - 16, Y - 44, 32, 40 + bob); g.clip(); drawArlo(X, Y - 1 + bob, { dir, flip: a.dir === 2, wk: 0, t }); g.restore();
            box(X - 11, Y - 6 + bob, 22, 8, '#a8642c'); px('#d89a54', X - 10, Y - 6 + bob, 20, 1); px('#7a4420', X - 9, Y + 2 + bob, 18, 1); px('#bfe6ff', X - 13 + ((t * 4 | 0) % 3), Y + 3, 5, 1); px('#bfe6ff', X + 7 - ((t * 4 | 0) % 3), Y + 3, 5, 1);
            px('#d8b06a', X + (a.dir === 2 ? -14 : 12), Y - 12 + bob + pd, 2, 12); px('#c79a5a', X + (a.dir === 2 ? -15 : 11), Y - 2 + bob + pd, 4, 3);
            if (this.fish) { const F = this.fish, fx = F.x * TS + 8 - ox, fy = F.y * TS + 8 - oy + (F.st === 'bite' ? 3 + Math.round(Math.sin(t * 30)) : Math.round(Math.sin(t * 3))); g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 1; g.beginPath(); g.moveTo(X, Y - 26); g.lineTo(fx, fy - 3); g.stroke(); px('#e5342b', fx - 2, fy - 3, 4, 3); px('#fff', fx - 2, fy, 4, 2); if (F.st === 'bite') { px('#bfe6ff', fx - 6, fy + 2, 3, 1); px('#bfe6ff', fx + 4, fy + 2, 3, 1); } }
            continue;
          }
          g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(X - 5, Y - 1, 10, 3);
          drawArlo(X, Y, { dir, flip: a.dir === 2, wk: a.wk, pose: a.useT > 0 && dir === 'side' ? 'use' : '', t });
          if (a.useT > 0) { const d = [[0, 6], [0, -20], [-12, -8], [12, -8]][a.dir], ic = TOOLS[Z.tool] === 'item' ? Z.item : TOOLS[Z.tool]; if (ic) g.drawImage(iconCanvas(ic), X + d[0] - 5, Y + d[1] - 6 + Math.round(Math.sin(a.useT * 30) * 2), 10, 10); }
        } else {
          const A = e.A, X = Math.round(A.x - ox), Y = Math.round(A.y - oy);
          if (A.sleep != null) { const zt = (t * 1.5 + A.x) % 3; g.globalAlpha = 1 - zt / 3; px('#fff', X + 4 + zt * 2, Y - 26 - zt * 6, 4, 1); px('#fff', X + 7 + zt * 2, Y - 25 - zt * 6, 1, 1); px('#fff', X + 6 + zt * 2, Y - 24 - zt * 6, 1, 1); px('#fff', X + 4 + zt * 2, Y - 23 - zt * 6, 4, 1); g.globalAlpha = 1; continue; }
          const AQ = AQUA.has(A.an), wet = this.gnd[this.idx(Math.floor(A.x / TS), Math.floor((A.y - 2) / TS))] === G.WATER;
          if (X < -30 || X > VW + 30 || Y < -10 || Y > VH + 40) continue;
          if (wet && A.an === 'shark') { const sw = Math.round(Math.sin(t * 1.5 + A.x) * 2), s2 = A.h.grown ? 1 : 0, fl = A.face < 0 ? -1 : 1; g.globalAlpha = .45; px('#0e3060', X - 13 - s2 * 5, Y - 7, 26 + s2 * 10, 6); px('#0e3060', X - fl * (15 + s2 * 6) - 2, Y - 9, 4, 10); g.globalAlpha = 1; px('#8a6a3a', X + sw, Y - 13 - s2 * 4, 4, 8 + s2 * 4); px('#a08048', X + sw + (fl > 0 ? 2 : 0), Y - 15 - s2 * 4, 2, 2); px('#e0f4ff', X - 7, Y - 5, 14, 1); px('#e0f4ff', X + sw - 2, Y - 5, 8, 1); }
          else if (wet) { g.save(); g.beginPath(); g.rect(X - 24, Y - 40, 48, 37); g.clip(); drawAnimal(A.an, X, Y + 3, { b: !A.h.grown, t: t + A.x, wk: A.wk, flip: A.face < 0 }); g.restore(); px('#bfe6ff', X - 6, Y - 3, 12, 1); }
          else { g.fillStyle = 'rgba(0,0,0,.22)'; g.fillRect(X - 6, Y - 1, 12, 2); drawAnimal(A.an, X, Y, { b: !A.h.grown, t: t + A.x, wk: A.wk, flip: A.face < 0 }); }
          const ck = A.h.ck;
          if (ck && (!ck.fed || !A.h.closed)) { const by = Y - (A.h.grown ? 34 : 24) + Math.round(Math.sin(t * 4) * 1.5); box(X - 6, by - 6, 12, 12, '#fff'); if (!A.h.closed) { px('#e5342b', X - 1, by - 4, 2, 5); px('#e5342b', X - 1, by + 2, 2, 2); } else g.drawImage(iconCanvas(ANIMALS[A.an].food), X - 5, by - 5, 10, 10); }
        }
      }
    }
    drawParts();
    const P = this.P;
    if (P) { if (P.st === 'caught') { g.save(); g.translate(Math.round(P.x - ox), Math.round(P.y - oy) - 30); g.rotate(P.rot); g.drawImage(poacherSprite(P.weapon, 0), -30, -37, 60, 75); g.restore(); } else drawPoacher(P.x - ox, P.y - oy, { s: 1.5, weapon: P.weapon, t }); }
    // night
    const nt = this.night();
    if (nt > .02) {
      if (!this.dark) this.dark = document.createElement('canvas');
      const D = this.dark; if (D.width !== VW || D.height !== VH) { D.width = VW; D.height = VH; }
      const d = D.getContext('2d'); d.globalCompositeOperation = 'source-over'; d.clearRect(0, 0, VW, VH); d.fillStyle = `rgba(10,14,60,${nt * .5})`; d.fillRect(0, 0, VW, VH);
      d.globalCompositeOperation = 'destination-out';
      const lights = [[a.x - ox, a.y - oy - 10, 38], [35 * TS + 8 - ox, 18 * TS + 6 - oy, 46 + Math.sin(t * 9) * 2]];
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (this.obj[y * N + x] === O.LANTERN) lights.push([x * TS + 8 - ox, y * TS + 4 - oy, 34]);
      for (const [lx, ly, r] of lights) for (let k = 0; k < 3; k++) { d.fillStyle = 'rgba(0,0,0,.4)'; d.beginPath(); d.arc(lx, ly, r * (1 - k * .25), 0, TAU); d.fill(); }
      g.drawImage(D, 0, 0);
      for (const p of this.fx) if (((t * 4 + p.x) | 0) % 2) px('#f6ff8a', p.x, p.y, 1, 1);
    }
  },
  overlay() {
    this.buildHotbar();
    const a = this.a, Z = this.Z, k = SC * DPR, s = Math.round(7 * Math.max(1, SC / 2.4) * DPR); scr.textAlign = 'center'; scr.textBaseline = 'middle'; scr.font = s + "px 'Press Start 2P','Courier New',monospace";
    const label = (txt, wx, wy, col) => { const X = (wx - Math.round(CAM.x)) * k, Y = (wy - Math.round(CAM.y)) * k, w = scr.measureText(txt).width + s; scr.fillStyle = 'rgba(0,0,0,.62)'; scr.fillRect(X - w / 2, Y - s * .9, w, s * 1.8); scr.fillStyle = col; scr.fillText(txt, X, Y + 1); };
    for (const h of Z.habs) if (h.spelt && Math.hypot(h.x * TS + 8 - a.x, h.y * TS - a.y) < 96) label(ANIMALS[h.an].name.toUpperCase(), h.x * TS + 8, h.y * TS - 14, '#ffe27a');
    for (const A of this.animals) if (A.h.nick && Math.hypot(A.x - a.x, A.y - a.y) < 120) label(A.h.nick, A.x, A.y - (A.h.grown ? 42 : 30), '#fff');
    if (this._cost) label(`${this._dim}${this._cost} FENCES - YOU HAVE ${this.fenceStock()}`, CAM.x + VW / 2, CAM.y + VH * .32, this._cost <= this.fenceStock() ? '#8fe085' : '#7cc0f2');
    if (this.flash > 0) { scr.fillStyle = `rgba(255,255,255,${Math.min(1, this.flash * 2.6)})`; scr.fillRect(0, 0, cv.width, cv.height); }
  }
};
