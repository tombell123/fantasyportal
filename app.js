/* ================= DATA ================= */
// ---------- DATA ----------

const ABILS = ['str','dex','con','int','wis','cha'];

// Converts a display name into the kebab-case index the SRD API uses,
// e.g. "Explorer's Pack" -> "explorers-pack", "Fire Bolt" -> "fire-bolt".
function slugify(s){
  return s.toLowerCase()
    .replace(/[\u2019']/g,'')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/(^-|-$)/g,'');
}
const ABIL_NAMES = {str:'Strength',dex:'Dexterity',con:'Constitution',int:'Intelligence',wis:'Wisdom',cha:'Charisma'};

const SKILL_ABILITY = {
  Acrobatics:'dex', 'Animal Handling':'wis', Arcana:'int', Athletics:'str',
  Deception:'cha', History:'int', Insight:'wis', Intimidation:'cha',
  Investigation:'int', Medicine:'wis', Nature:'int', Perception:'wis',
  Performance:'cha', Persuasion:'cha', Religion:'int', 'Sleight of Hand':'dex',
  Stealth:'dex', Survival:'wis'
};

const RACES = [
  { name:'Human', bonuses:{str:1,dex:1,con:1,int:1,wis:1,cha:1}, speed:30,
    traits:['One extra language','Adaptable, ambitious, everywhere'] },

  { name:'High Elf', nameGroup:'Elf', bonuses:{dex:2,int:1}, speed:30,
    traits:['Darkvision 60 ft.','Fey Ancestry (advantage vs. charm, immune to magical sleep)','Trance (4-hr rest)','Elf Weapon Training (longsword, shortsword, shortbow, longbow)','Knows one wizard cantrip','One extra language'] },
  { name:'Wood Elf', nameGroup:'Elf', bonuses:{dex:2,wis:1}, speed:35,
    traits:['Darkvision 60 ft.','Fey Ancestry (advantage vs. charm, immune to magical sleep)','Trance (4-hr rest)','Elf Weapon Training (longsword, shortsword, shortbow, longbow)','Mask of the Wild (hide in light natural foliage)'] },
  { name:'Dark Elf (Drow)', nameGroup:'Elf', bonuses:{dex:2,cha:1}, speed:30,
    traits:['Superior Darkvision 120 ft.','Fey Ancestry (advantage vs. charm, immune to magical sleep)','Trance (4-hr rest)','Drow Magic (dancing lights, later faerie fire and darkness)','Drow Weapon Training (rapier, shortsword, hand crossbow)','Sunlight Sensitivity (disadvantage in direct sunlight)'] },

  { name:'Hill Dwarf', nameGroup:'Dwarf', bonuses:{con:2,wis:1}, speed:25,
    traits:['Darkvision 60 ft.','Dwarven Resilience (advantage and resistance vs. poison)','Dwarven Combat Training (battleaxe, handaxe, light hammer, warhammer)','Tool Proficiency (one artisan\u2019s tool)','Stonecunning (double proficiency on stonework History checks)','Dwarven Toughness (+1 HP per level)'] },
  { name:'Mountain Dwarf', nameGroup:'Dwarf', bonuses:{con:2,str:2}, speed:25,
    traits:['Darkvision 60 ft.','Dwarven Resilience (advantage and resistance vs. poison)','Dwarven Combat Training (battleaxe, handaxe, light hammer, warhammer)','Tool Proficiency (one artisan\u2019s tool)','Stonecunning (double proficiency on stonework History checks)','Dwarven Armor Training (light and medium armor)'] },

  { name:'Lightfoot Halfling', nameGroup:'Halfling', bonuses:{dex:2,cha:1}, speed:25,
    traits:['Lucky (reroll 1s on d20)','Brave (advantage vs. fear)','Halfling Nimbleness (move through larger creatures)','Naturally Stealthy (can hide behind a larger creature)'] },
  { name:'Stout Halfling', nameGroup:'Halfling', bonuses:{dex:2,con:1}, speed:25,
    traits:['Lucky (reroll 1s on d20)','Brave (advantage vs. fear)','Halfling Nimbleness (move through larger creatures)','Stout Resilience (advantage and resistance vs. poison)'] },

  { name:'Half-Orc', bonuses:{str:2,con:1}, speed:30,
    traits:['Darkvision 60 ft.','Relentless Endurance (drop to 1 hp instead of 0, 1/long rest)','Savage Attacks'] },
  { name:'Half-Elf', bonuses:{cha:2}, speed:30, extraChoice:2,
    traits:['Darkvision 60 ft.','Fey Ancestry','Skill Versatility (+2 skills)'] },
  { name:'Tiefling', bonuses:{cha:2,int:1}, speed:30,
    traits:['Darkvision 60 ft.','Hellish Resistance (resist fire)','Thaumaturgy cantrip'] },
  { name:'Dragonborn', bonuses:{str:2,cha:1}, speed:30,
    traits:['Draconic ancestry','Breath weapon','Damage resistance (by ancestry)'] },

  { name:'Forest Gnome', nameGroup:'Gnome', bonuses:{int:2,dex:1}, speed:25,
    traits:['Darkvision 60 ft.','Gnome Cunning (advantage on INT/WIS/CHA saves vs. magic)','Natural Illusionist (knows minor illusion cantrip)','Speak with Small Beasts'] },
  { name:'Rock Gnome', nameGroup:'Gnome', bonuses:{int:2,con:1}, speed:25,
    traits:['Darkvision 60 ft.','Gnome Cunning (advantage on INT/WIS/CHA saves vs. magic)','Artificer\u2019s Lore (bonus on History checks about magic/alchemical/tech items)','Tinker (can build tiny clockwork devices)'] },
];

const NAME_PARTS = {
  Human: { first:['Rowan','Elara','Bran','Mireille','Corvin','Yusuf','Talia','Osric','Marren','Idris','Selwyn','Gwenna','Aldric','Briony','Cassian','Delphine','Edmund','Fenna','Garrick','Halla','Ivo','Jessamine','Kellan','Lior','Magda','Norrin','Odalys','Percival','Quenby','Ragnar','Sabine','Tobias'], last:['Ashford','Vale','Marrow','Sterling','Blackwood','Thorne','Ridley','Nash','Harrow','Winters','Fairweather','Duskwood','Halloway','Merrick','Osgood','Wren','Castellan','Larkspur'] },
  Elf: { first:['Faelar','Silvani','Erevan','Thia','Caelynn','Lucan','Aravae','Miriel','Thalanil','Elenwe','Galinndan','Ilyrae','Naivara','Quildor','Sylvaine','Theriad','Varis','Ylenna','Aramil','Beiro','Caelith','Drannor','Enna','Filsaelin','Immeral','Lamlis'], last:['Moonwhisper','Silverleaf','Duskwalker','Starsong','Nightbreeze','Amakiir','Galanodel','Holimion','Liadon','Meliamne','Siannodel','Xiloscient','Nightwind','Everbloom','Farwind','Thistledown'] },
  Dwarf: { first:['Thorin','Brenna','Durgan','Kildra','Bofur','Yorvik','Marta','Gundren','Balin','Dagna','Eberk','Fara','Grista','Harbek','Ilde','Jorunn','Kathra','Loris','Morgran','Nara','Oskar','Rurik','Sannl','Torbin','Ulfgar','Vistra'], last:['Ironfist','Stonehammer','Battlehorn','Gravelbeard','Anvilheart','Balderk','Dankil','Fireforge','Loderr','Rumnaheim','Strakeln','Torunn','Ungart','Brawnanvil','Deepdelve','Ironshoulder'] },
  Halfling: { first:['Pip','Rosie','Milo','Tansy','Corrin','Willa','Bram','Dova','Alton','Bree','Cade','Dell','Euphemia','Finnan','Gilly','Harmon','Ivy','Jasper','Lavender','Merric','Nedda','Ottilie','Perrin','Quill','Rilla','Sander','Tessaly','Vinnie'], last:['Underbough','Goodbarrel','Greenbottle','Tealeaf','Brushgather','Highhill','Leagallow','Tosscobble','Sweetwater','Warmwater','Applebrook','Cobblecrumb','Fennelbrook','Mossfoot','Pennywhistle','Thistlewool'] },
  'Half-Orc': { first:['Grosh','Uldar','Kesh','Thraga','Vharn','Mogra','Drask','Yena','Argok','Bruga','Dush','Grask','Karga','Muzgash','Ovak','Ruska','Shagrath','Thokk','Urzul','Voth','Yagra','Zurga'], last:['Skullcrusher','Ironhide','Bloodfang','Grimtusk','Ashclaw','Bonegrinder','Deathstrike','Ironjaw','Rockfist','Warhide','Blackscar','Direfang','Grimhowl','Stonecrush'] },
  'Half-Elf': { first:['Sariel','Devon','Aelith','Nyra','Corin','Lyssa','Aldous','Branwen','Cyrus','Elowen','Finnian','Isolde','Jarek','Kestrel','Liora','Marek','Nissa','Orin','Perrivale','Quinlan','Rosalind','Sylas'], last:['Faewood','Brightwater','Amberly','Rosewind','Duskharrow','Emberfall','Greywillow','Hallowmere','Larkwood','Oakenshade','Silverbrook','Thornwild'] },
  Tiefling: { first:['Kairon','Lilith','Zephyrine','Malchor','Seraphine','Damakos','Akmenos','Beleth','Carrion','Damaia','Ekemon','Faux','Ishtara','Kallista','Leucis','Mordai','Nirith','Orianna','Puriel','Rieta','Sorrow','Therai','Vess','Zariel'], last:['Ashborn','Duskmere','Hellcrest','Cinderfall','Bloodmark','Grimveil','Nightsworn','Ravenshade','Shadowend','Soulrend','Emberthorn','Wraithmoor'] },
  Dragonborn: { first:['Vraxis','Torinn','Kriv','Sethra','Balasar','Nemmonis','Arjhan','Bharash','Donaar','Ghesh','Heskan','Kava','Medrash','Nadarr','Pandjed','Rhogar','Shamash','Tarhun','Verthax','Zhorvakk'], last:['Emberscale','Stormclaw','Ironwing','Cinderscale','Clethtinthiallor','Daardendrian','Fenkenkabradon','Kepeshkmolik','Prexijandilin','Verthisathurgiesh','Yarjerit','Ashscale','Duskwing','Stormtail'] },
  Gnome: { first:['Fizwick','Nyla','Boddynock','Ellywick','Zook','Fennela','Alston','Brocc','Dimble','Eldon','Fonkin','Gimble','Ivo','Jebeddo','Kellen','Loopmottin','Namfoodle','Orryn','Podge','Roondar','Seebo','Tinnil','Wrenn','Zanna'], last:['Cogsprocket','Tinkertop','Sparkwrench','Nackle','Fizzlebang','Gearwhistle','Nackledorf','Peeblespout','Rocketflint','Timbers','Turnbuckle','Bramblefoot'] },
};

const ALIGNMENTS = ['Lawful Good','Neutral Good','Chaotic Good','Lawful Neutral','True Neutral','Chaotic Neutral','Lawful Evil','Neutral Evil','Chaotic Evil'];

const BACKGROUNDS = [
  { name:'Acolyte', skills:['Insight','Religion'], gear:[{n:1,name:'Holy Symbol'},{n:1,name:'Incense'},{n:1,name:'Vestments'},{n:1,name:'Common Clothes'}], gold:15, feature:'Shelter of the Faithful: clergy of your faith will lodge and feed you.' },
  { name:'Criminal', skills:['Deception','Stealth'], gear:[{n:1,name:'Crowbar'},{n:1,name:'Common Clothes'}], gold:15, feature:'Criminal Contact: a trusted fence for stolen goods and local rumor.' },
  { name:'Folk Hero', skills:['Animal Handling','Survival'], gear:[{n:1,name:'Smith\u2019s Tools'},{n:1,name:'Shovel'},{n:1,name:'Iron Pot'}], gold:10, feature:'Rustic Hospitality: common folk will hide and aid you.' },
  { name:'Noble', skills:['History','Persuasion'], gear:[{n:1,name:'Fine Clothes'},{n:1,name:'Signet Ring'}], gold:25, feature:'Position of Privilege: welcomed by high society, and merchants defer to you.' },
  { name:'Sage', skills:['Arcana','History'], gear:[{n:1,name:'Ink'},{n:1,name:'Ink Pen'},{n:1,name:'Knife'}], gold:10, feature:'Researcher: you know where to find lore, even if you don\u2019t know it yourself.' },
  { name:'Soldier', skills:['Athletics','Intimidation'], gear:[{n:1,name:'Playing Card Set'}], gold:10, feature:'Military Rank: soldiers of your former army defer to your authority.' },
  { name:'Charlatan', skills:['Deception','Sleight of Hand'], gear:[{n:1,name:'Fine Clothes'},{n:1,name:'Disguise Kit'}], gold:15, feature:'False Identity: a second identity, complete with documentation.' },
  { name:'Sailor', skills:['Athletics','Perception'], gear:[{n:1,name:'Rope, Silk (50 feet)'}], gold:10, feature:"Ship's Passage: you can secure free passage on a ship for yourself and companions." },
  { name:'Hermit', skills:['Medicine','Religion'], gear:[{n:1,name:'Herbalism Kit'},{n:1,name:'Blanket'}], gold:5, feature:'Discovery: you\u2019ve uncovered a great and unique truth in your isolation.' },
  { name:'Entertainer', skills:['Acrobatics','Performance'], gear:[{n:1,name:'Lute'},{n:1,name:'Costume'}], gold:15, feature:'By Popular Demand: you can always find a place to perform, with food and lodging.' },
];

const FLAVOR_HOOKS = [
  'Owes a debt to someone they refuse to name.',
  'Left home after a dream they still don\u2019t understand.',
  'Collects small trophies from every fight they walk away from.',
  'Talks to their weapon like it can talk back.',
  'Has a rival somewhere who thinks they\u2019re dead.',
  'Never sleeps in the same direction twice.',
  'Keeps a list of every place they\u2019ve been asked to leave.',
  'Was declared a bad omen by a village they can\u2019t go back to.',
  'Sends a coin home every full moon, to someone.',
  'Lost a bet that they still haven\u2019t paid off.',
  'Swears an old oath they\u2019ve started to doubt.',
  'Is looking for the person who taught them everything they know.',
];

// class: hitDie, primary ability priority for stat placement, saves, skill list + count,
// armor/weapon text, caster type (none/full/half/pact), spell ability, gear
const CLASSES = [
  { name:'Barbarian', hitDie:12, primary:['str','con','dex','wis','cha','int'], saves:['str','con'],
    skillChoices:['Animal Handling','Athletics','Intimidation','Nature','Perception','Survival'], skillCount:2,
    profs:'Light & medium armor, shields, simple & martial weapons', caster:'none',
    gear:[{n:1,name:'Greataxe'},{n:2,name:'Handaxe'},{n:1,name:'Explorer\u2019s Pack'},{n:4,name:'Javelin'}], subclassLabel:'Primal Path', subclassLevel:3,
    subclasses:['Path of the Berserker','Path of the Totem Warrior','Path of the Ancestral Guardian'] },
  { name:'Bard', hitDie:8, primary:['cha','dex','con','wis','int','str'], saves:['dex','cha'],
    skillChoices:Object.keys(SKILL_ABILITY), skillCount:3,
    profs:'Light armor, simple weapons, hand crossbows, longswords, rapiers, shortswords', caster:'known', spellAbility:'cha', cantripBase:2,
    gear:[{n:1,name:'Rapier'},{n:1,name:'Diplomat\u2019s Pack'},{n:1,name:'Lute'},{n:1,name:'Leather Armor'},{n:1,name:'Dagger'}], subclassLabel:'Bard College', subclassLevel:3,
    subclasses:['College of Lore','College of Valor','College of Glamour'] },
  { name:'Cleric', hitDie:8, primary:['wis','str','con','dex','cha','int'], saves:['wis','cha'],
    skillChoices:['History','Insight','Medicine','Persuasion','Religion'], skillCount:2,
    profs:'Light & medium armor, shields, simple weapons', caster:'prepared', spellAbility:'wis', cantripBase:3,
    gear:[{n:1,name:'Mace'},{n:1,name:'Scale Mail'},{n:1,name:'Shield'},{n:1,name:'Holy Symbol'},{n:1,name:'Priest\u2019s Pack'}], subclassLabel:'Divine Domain', subclassLevel:1,
    subclasses:['Life Domain','Light Domain','Trickery Domain','War Domain'] },
  { name:'Druid', hitDie:8, primary:['wis','con','dex','int','cha','str'], saves:['int','wis'],
    skillChoices:['Arcana','Animal Handling','Insight','Medicine','Nature','Perception','Religion','Survival'], skillCount:2,
    profs:'Light & medium armor (nonmetal), shields (nonmetal), clubs, daggers, sickles, spears', caster:'prepared', spellAbility:'wis', cantripBase:2,
    gear:[{n:1,name:'Shield'},{n:1,name:'Scimitar'},{n:1,name:'Leather Armor'},{n:1,name:'Explorer\u2019s Pack'},{n:1,name:'Sprig of Mistletoe'}], subclassLabel:'Druid Circle', subclassLevel:2,
    subclasses:['Circle of the Land','Circle of the Moon','Circle of Spores'] },
  { name:'Fighter', hitDie:10, primary:['str','dex','con','wis','cha','int'], saves:['str','con'],
    skillChoices:['Acrobatics','Animal Handling','Athletics','History','Insight','Intimidation','Perception','Survival'], skillCount:2,
    profs:'All armor, shields, simple & martial weapons', caster:'none',
    gear:[{n:1,name:'Chain Mail'},{n:1,name:'Longsword'},{n:1,name:'Shield'},{n:1,name:'Light Crossbow'},{n:20,name:'Crossbow Bolt'},{n:1,name:'Dungeoneer\u2019s Pack'}], subclassLabel:'Martial Archetype', subclassLevel:3,
    subclasses:['Champion','Battle Master','Eldritch Knight'] },
  { name:'Monk', hitDie:8, primary:['dex','wis','con','str','int','cha'], saves:['str','dex'],
    skillChoices:['Acrobatics','Athletics','History','Insight','Religion','Stealth'], skillCount:2,
    profs:'Simple weapons, shortswords', caster:'none',
    gear:[{n:1,name:'Shortsword'},{n:10,name:'Dart'},{n:1,name:'Explorer\u2019s Pack'}], subclassLabel:'Monastic Tradition', subclassLevel:3,
    subclasses:['Way of the Open Hand','Way of Shadow','Way of the Four Elements'] },
  { name:'Paladin', hitDie:10, primary:['str','cha','con','wis','dex','int'], saves:['wis','cha'],
    skillChoices:['Athletics','Insight','Intimidation','Medicine','Persuasion','Religion'], skillCount:2,
    profs:'All armor, shields, simple & martial weapons', caster:'half', spellAbility:'cha',
    gear:[{n:1,name:'Longsword'},{n:1,name:'Shield'},{n:5,name:'Javelin'},{n:1,name:'Chain Mail'},{n:1,name:'Priest\u2019s Pack'},{n:1,name:'Holy Symbol'}], subclassLabel:'Sacred Oath', subclassLevel:3,
    subclasses:['Oath of Devotion','Oath of the Ancients','Oath of Vengeance'] },
  { name:'Ranger', hitDie:10, primary:['dex','wis','con','str','int','cha'], saves:['str','dex'],
    skillChoices:['Animal Handling','Athletics','Insight','Investigation','Nature','Perception','Stealth','Survival'], skillCount:3,
    profs:'Light & medium armor, shields, simple & martial weapons', caster:'half', spellAbility:'wis',
    gear:[{n:1,name:'Studded Leather Armor'},{n:2,name:'Shortsword'},{n:1,name:'Longbow'},{n:20,name:'Arrow'},{n:1,name:'Explorer\u2019s Pack'}], subclassLabel:'Ranger Conclave', subclassLevel:3,
    subclasses:['Hunter','Beast Master','Gloom Stalker'] },
  { name:'Rogue', hitDie:8, primary:['dex','int','wis','con','cha','str'], saves:['dex','int'],
    skillChoices:['Acrobatics','Athletics','Deception','Insight','Intimidation','Investigation','Perception','Performance','Persuasion','Sleight of Hand','Stealth'], skillCount:4,
    profs:'Light armor, simple weapons, hand crossbows, longswords, rapiers, shortswords, thieves\u2019 tools', caster:'none',
    gear:[{n:1,name:'Rapier'},{n:1,name:'Shortbow'},{n:20,name:'Arrow'},{n:1,name:'Burglar\u2019s Pack'},{n:1,name:'Leather Armor'},{n:2,name:'Dagger'},{n:1,name:'Thieves\u2019 Tools'}], subclassLabel:'Roguish Archetype', subclassLevel:3,
    subclasses:['Thief','Assassin','Arcane Trickster'] },
  { name:'Sorcerer', hitDie:6, primary:['cha','con','dex','wis','int','str'], saves:['con','cha'],
    skillChoices:['Arcana','Deception','Insight','Intimidation','Persuasion','Religion'], skillCount:2,
    profs:'Daggers, darts, slings, quarterstaffs, light crossbows', caster:'known', spellAbility:'cha', cantripBase:4,
    gear:[{n:1,name:'Light Crossbow'},{n:20,name:'Crossbow Bolt'},{n:1,name:'Component Pouch'},{n:1,name:'Dungeoneer\u2019s Pack'},{n:2,name:'Dagger'}], subclassLabel:'Sorcerous Origin', subclassLevel:1,
    subclasses:['Draconic Bloodline','Wild Magic','Divine Soul'] },
  { name:'Warlock', hitDie:8, primary:['cha','con','dex','wis','int','str'], saves:['wis','cha'],
    skillChoices:['Arcana','Deception','History','Intimidation','Investigation','Nature','Religion'], skillCount:2,
    profs:'Light armor, simple weapons', caster:'pact', spellAbility:'cha', cantripBase:2,
    gear:[{n:1,name:'Light Crossbow'},{n:20,name:'Crossbow Bolt'},{n:1,name:'Component Pouch'},{n:1,name:'Scholar\u2019s Pack'},{n:2,name:'Dagger'},{n:1,name:'Leather Armor'}], subclassLabel:'Otherworldly Patron', subclassLevel:1,
    subclasses:['The Fiend','The Archfey','The Great Old One'] },
  { name:'Wizard', hitDie:6, primary:['int','con','dex','wis','cha','str'], saves:['int','wis'],
    skillChoices:['Arcana','History','Insight','Investigation','Medicine','Religion'], skillCount:2,
    profs:'Daggers, darts, slings, quarterstaffs, light crossbows', caster:'prepared', spellAbility:'int', cantripBase:3,
    gear:[{n:1,name:'Quarterstaff'},{n:1,name:'Component Pouch'},{n:1,name:'Scholar\u2019s Pack'},{n:1,name:'Spellbook'}], subclassLabel:'Arcane Tradition', subclassLevel:2,
    subclasses:['School of Evocation','School of Abjuration','School of Illusion'] },
];

// Multiclass ability score prerequisites and reduced starting proficiencies,
// per the 2014 Player's Handbook multiclassing rules (verified via search
// before implementing, not recalled from memory). Fighter is the one class
// with an "either/or" prerequisite rather than needing every listed score.
const MULTICLASS_PREREQS = {
  Barbarian: { str:13 },
  Bard: { cha:13 },
  Cleric: { wis:13 },
  Druid: { wis:13 },
  Fighter: { anyOf:['str','dex'] },
  Monk: { dex:13, wis:13 },
  Paladin: { str:13, cha:13 },
  Ranger: { dex:13, wis:13 },
  Rogue: { dex:13 },
  Sorcerer: { cha:13 },
  Warlock: { cha:13 },
  Wizard: { int:13 },
};
const MULTICLASS_PROFICIENCIES = {
  Barbarian: 'Shields, simple weapons, martial weapons',
  Bard: 'Light armor, one skill of your choice, one musical instrument of your choice',
  Cleric: 'Light armor, medium armor, shields',
  Druid: 'Shields (nonmetal), light armor, medium armor (nonmetal)',
  Fighter: 'Light armor, medium armor, shields, simple weapons, martial weapons',
  Monk: 'Simple weapons, shortswords',
  Paladin: 'Light armor, medium armor, shields, simple weapons, martial weapons',
  Ranger: 'Light armor, medium armor, shields, simple weapons, martial weapons, one skill of your choice',
  Rogue: 'Light armor, one skill of your choice, thieves\u2019 tools',
  Sorcerer: 'None',
  Warlock: 'Light armor, simple weapons',
  Wizard: 'None',
};
function meetsMulticlassPrereq(scores, className){
  const req = MULTICLASS_PREREQS[className];
  if(!req) return false;
  if(req.anyOf) return req.anyOf.some(a => scores[a] >= 13);
  return Object.keys(req).every(a => scores[a] >= 13);
}

// ---------- FEATS (offline, full mechanical detail) ----------
// Real feat names, prerequisites, and mechanical effects are game rules
// (not copyrightable expression); every description below is written in
// my own words, same practice as the spell/monster/magic item registries.

function classHasProf(cls, kind){
  const p = cls.profs.toLowerCase();
  if(kind === 'heavy') return p.includes('all armor') || p.includes('heavy armor');
  if(kind === 'medium') return p.includes('all armor') || p.includes('medium armor');
  if(kind === 'light') return p.includes('all armor') || p.includes('light armor');
  if(kind === 'shield') return p.includes('shield');
  if(kind === 'martial') return p.includes('martial weapons');
  return false;
}
function isCaster(cls){ return !!(cls.caster && cls.caster !== 'none'); }
function FEAT(prereq, desc){ return { prereq, desc }; }

const FEAT_REGISTRY = {
  'Alert': FEAT(null, 'You\u2019re always ready for danger: +5 bonus to initiative, you can\u2019t be surprised while conscious, and other creatures don\u2019t gain advantage on attack rolls against you for being unseen.'),
  'Athlete': FEAT(null, 'Improves your physicality: standing up from prone costs only 5 feet of movement, climbing no longer costs extra movement, and you get a running start bonus to long and high jumps even without a running start.'),
  'Actor': FEAT(null, 'Your Charisma score increases by 1, to a maximum of 20. You have advantage on Deception and Performance checks made to pass yourself off as a different person, and can mimic other people\u2019s speech or sounds you\u2019ve heard.'),
  'Charger': FEAT(null, 'When you use your action to Dash, you can use a bonus action to make one melee weapon attack or shove a creature, gaining a bonus to the attack\u2019s damage or the shove\u2019s distance if you moved at least 10 feet in a straight line first.'),
  'Crossbow Expert': FEAT((scores,cls) => true, 'You ignore the loading property of crossbows you\u2019re proficient with, being within 5 feet of a hostile creature doesn\u2019t impose disadvantage on your ranged attacks, and when you attack with a one-handed weapon you can make a bonus-action attack with a hand crossbow in your other hand.'),
  'Defensive Duelist': FEAT((scores) => mod(scores.dex) >= 1, 'When wielding a finesse weapon you\u2019re proficient with, you can use your reaction to add your proficiency bonus to your AC against one melee attack, potentially causing it to miss.'),
  'Dual Wielder': FEAT(null, 'You gain a +1 bonus to AC while wielding two melee weapons, can two-weapon fight even when the weapons aren\u2019t light, and can draw or stow two one-handed weapons at once.'),
  'Dungeon Delver': FEAT(null, 'You have advantage on saves against traps and on checks to detect secret doors or hidden traps, and traps deal less damage to you when you fail a save against them. Difficult terrain doesn\u2019t slow your travel pace.'),
  'Durable': FEAT(null, 'Your Constitution score increases by 1, to a maximum of 20. When you roll a Hit Die to regain hit points, the total can never be less than twice your Constitution modifier.'),
  'Elemental Adept': FEAT((scores,cls) => isCaster(cls), 'Choose acid, cold, fire, lightning, or thunder. Spells you cast that deal that damage type ignore resistance to it, and you treat any 1 rolled on its damage dice as a 2.'),
  'Grappler': FEAT((scores) => mod(scores.str) >= 1, 'You have advantage on attack rolls against a creature you\u2019re grappling, and can use an action to try to pin a creature you\u2019re already grappling, restraining both of you until the grapple ends.'),
  'Great Weapon Master': FEAT((scores,cls) => classHasProf(cls,'martial'), 'On your turn, when you score a critical hit or reduce a creature to 0 hit points with a melee weapon, you can make one bonus-action melee attack. You can also take a \u22125 penalty to a melee attack with a heavy weapon for a +10 bonus to its damage.'),
  'Healer': FEAT(null, 'With a healer\u2019s kit, you can stabilize a dying creature without expending a use of the kit, and can spend a use to let a creature regain hit points, plus extra based on its level, once per short or long rest per creature.'),
  'Heavily Armored': FEAT((scores,cls) => classHasProf(cls,'medium') && !classHasProf(cls,'heavy'), 'Your Strength score increases by 1, to a maximum of 20, and you gain proficiency with heavy armor.'),
  'Heavy Armor Master': FEAT((scores,cls) => classHasProf(cls,'heavy'), 'Your Strength score increases by 1, to a maximum of 20. While wearing heavy armor, nonmagical bludgeoning, piercing, and slashing damage you take from weapon attacks is reduced by 3.'),
  'Inspiring Leader': FEAT((scores) => mod(scores.cha) >= 3, 'Spend 10 minutes inspiring your companions, and up to six of them who can see and hear you each gain temporary hit points equal to your level plus your Charisma modifier.'),
  'Keen Mind': FEAT(null, 'Your Intelligence score increases by 1, to a maximum of 20. You always know which way is north, how many hours remain until sunrise or sunset, and can accurately recall anything you\u2019ve seen or heard within the past month.'),
  'Lightly Armored': FEAT((scores,cls) => !classHasProf(cls,'light'), 'You gain proficiency with light armor, and your Strength or Dexterity score increases by 1 (to a maximum of 20).'),
  'Linguist': FEAT(null, 'Your Intelligence score increases by 1, to a maximum of 20. You learn three languages of your choice, and can create written ciphers others can\u2019t decipher without your help or a magical means of understanding.'),
  'Lucky': FEAT(null, 'You have 3 luck points. When you make an attack roll, ability check, or saving throw, or a creature makes an attack roll against you, you can spend one to roll an extra d20 and choose which result to use. You regain spent points after a long rest.'),
  'Mage Slayer': FEAT(null, 'When a creature within 5 feet casts a spell, you can use your reaction to make a melee attack against it. You also have advantage on saves against spells cast by creatures within 5 feet, and can impose disadvantage on a caster\u2019s concentration saves when you damage it.'),
  'Magic Initiate': FEAT(null, 'Choose a class with spells. You learn two cantrips and one 1st-level spell from that class\u2019s list, castable once per long rest without a spell slot (or using a slot as normal thereafter), using the ability that class uses for spellcasting.'),
  'Martial Adept': FEAT(null, 'You learn two maneuvers of your choice from those available to the Battle Master fighter archetype, gaining one superiority die (a d6) to fuel them, regained on a short or long rest.'),
  'Medium Armor Master': FEAT((scores,cls) => classHasProf(cls,'medium'), 'Wearing medium armor no longer imposes disadvantage on Dexterity (Stealth) checks, and the maximum Dexterity bonus you can add to your AC in medium armor increases from 2 to 3.'),
  'Mobile': FEAT(null, 'Your speed increases by 10 feet. When you use the Dash action, difficult terrain doesn\u2019t cost you extra movement that turn, and making a melee attack against a creature doesn\u2019t provoke opportunity attacks from it for the rest of your turn.'),
  'Moderately Armored': FEAT((scores,cls) => classHasProf(cls,'light') && !classHasProf(cls,'medium'), 'You gain proficiency with medium armor and shields, and your Strength or Dexterity score increases by 1 (to a maximum of 20).'),
  'Mounted Combatant': FEAT(null, 'While mounted and not the target of an attack, you can force an attacker to target you instead of your mount, and you have advantage on melee attacks against unmounted creatures smaller than your mount. You and your mount can also both avoid failed Dexterity saves that would only deal half damage.'),
  'Observant': FEAT(null, 'Your Intelligence or Wisdom score increases by 1, to a maximum of 20. If you can see a creature\u2019s mouth while it speaks a language you know, you can read its lips, and you gain a +5 bonus to passive Perception and passive Investigation.'),
  'Polearm Master': FEAT(null, 'With a glaive, halberd, quarterstaff, or spear, you can make a bonus-action attack with the opposite end of the weapon, and creatures provoke an opportunity attack from you when they enter your reach with that weapon.'),
  'Resilient': FEAT(null, 'Choose one ability score. It increases by 1, to a maximum of 20, and you gain proficiency in saving throws using that ability.'),
  'Ritual Caster': FEAT((scores) => mod(scores.int)>=1 || mod(scores.wis)>=1 || mod(scores.cha)>=1, 'You learn two 1st-level ritual spells from a chosen class\u2019s spell list, which you can cast as rituals but not otherwise, using a ritual book and the ability score that grants the highest bonus among Intelligence, Wisdom, and Charisma.'),
  'Savage Attacker': FEAT(null, 'Once per turn when you hit with a weapon attack, you can reroll the weapon\u2019s damage dice and use either total.'),
  'Sentinel': FEAT(null, 'When you hit a creature with an opportunity attack, its speed drops to 0 for the rest of the turn. Creatures provoke an opportunity attack from you even if they Disengage, and you can make an opportunity attack when a creature within 5 feet attacks someone other than you.'),
  'Sharpshooter': FEAT((scores,cls) => classHasProf(cls,'martial'), 'Attacking at long range doesn\u2019t impose disadvantage, your ranged weapon attacks ignore half and three-quarters cover, and you can take a \u22125 penalty to a ranged attack for a +10 bonus to its damage.'),
  'Shield Master': FEAT((scores,cls) => classHasProf(cls,'shield'), 'If you take the Attack action, you can use a bonus action to shove a creature with your shield. You can also add your shield\u2019s AC bonus to Dexterity saves against effects that target only you, and can use your reaction to take no damage on a successful Dexterity save that would deal half damage.'),
  'Skilled': FEAT(null, 'You gain proficiency in any combination of three skills or tools of your choice.'),
  'Skulker': FEAT((scores) => mod(scores.dex) >= 1, 'You can try to hide when only lightly obscured, missing with a ranged attack doesn\u2019t reveal your position, and dim light doesn\u2019t worsen your passive Perception when trying to see something.'),
  'Spell Sniper': FEAT((scores,cls) => isCaster(cls), 'The range of spells you cast that require an attack roll doubles, your spell attacks ignore half and three-quarters cover, and you learn one attack-roll cantrip from a class on your spell list.'),
  'Tavern Brawler': FEAT(null, 'Your Strength or Constitution score increases by 1, to a maximum of 20. You\u2019re proficient with improvised weapons, your unarmed strike uses a d4 for damage, and hitting with an unarmed strike or improvised weapon lets you attempt to grapple the target as a bonus action.'),
  'Tough': FEAT(null, 'Your hit point maximum increases by an amount equal to twice your character level when you gain this feat, and increases by 2 again every time you gain a level thereafter.'),
  'War Caster': FEAT((scores,cls) => isCaster(cls), 'You have advantage on Constitution saves to maintain concentration, can perform spells with somatic components even with your hands full of weapon or shield, and can cast a spell as an opportunity attack in place of a melee attack.'),
  'Weapon Master': FEAT(null, 'You gain proficiency with four weapons of your choice, and your Strength or Dexterity score increases by 1 (to a maximum of 20).'),
};

// copyrightable). Descriptions are written by Claude from familiarity with
// the SRD rather than copy-pasted verbatim — treat as accurate rules
// summaries, not a guaranteed byte-exact quote of any official text.

function SP(level, school, time, range, comp, dur, desc, higher){
  const o = { level, school, time, range, comp, dur, desc };
  if(higher) o.higher = higher;
  return o;
}

const SPELL_REGISTRY = {
  // ---- Cantrips (batch 2 additions) ----
  'Acid Splash': SP(0,'Conjuration','1 action','60 feet','V, S','Instantaneous','You hurl a bubble of acid at one or two creatures within 5 feet of each other. Each target takes 1d6 acid damage on a failed Dexterity save.','The damage increases by 1d6 at 5th, 11th, and 17th level.'),
  'Blade Ward': SP(0,'Abjuration','1 action','Self','V, S','1 round','You extend a hand and trace a sigil of warding in the air, giving you resistance against bludgeoning, piercing, and slashing damage from weapon attacks until the end of your next turn.'),
  'Control Flames': SP(0,'Transmutation','1 action','60 feet','S','Instantaneous or 1 hour','You choose a nonmagical flame within range and cause a minor, harmless effect: make it flicker, brighten, dim, change color, or shape it into a form for up to an hour.'),
  'Create Bonfire': SP(0,'Conjuration','1 action','60 feet','V, S','Concentration, up to 1 minute','You create a bonfire on ground you can see, dealing 1d8 fire damage to any creature in its space.','The damage increases by 1d8 at 5th, 11th, and 17th level.'),
  'Frostbite': SP(0,'Evocation','1 action','60 feet','V, S','Instantaneous','You cause numbing frost to form on a creature, dealing 1d6 cold damage on a failed Constitution save, and giving it disadvantage on its next weapon attack roll.','The damage increases by 1d6 at 5th, 11th, and 17th level.'),
  'Gust': SP(0,'Transmutation','1 action','30 feet','V, S','Instantaneous','You seize the air and compel it to create one of a few effects: blow out flames, disperse gas or fog, or create a small gust that pushes a creature 5 feet.'),
  'Mending': SP(0,'Transmutation','1 minute','Touch','V, S, M','Instantaneous','This spell repairs a single break or tear in an object you touch, such as a torn cloak or a broken key, mending it without a trace.'),
  'Message': SP(0,'Transmutation','1 action','120 feet','V, S, M','1 round','You point at a creature within range and whisper a short message it alone hears, and it can reply in a whisper you alone hear.'),
  'Mold Earth': SP(0,'Transmutation','1 action','30 feet','S','Instantaneous or 1 hour','You choose a portion of dirt or stone you can see and cause one of several minor effects, such as excavating, leveling, or shaping it.'),
  'Poison Spray': SP(0,'Conjuration','1 action','10 feet','V, S','Instantaneous','You project a puff of noxious gas at a creature, dealing 1d12 poison damage on a failed Constitution save.','The damage increases by 1d12 at 5th, 11th, and 17th level.'),
  'Resistance': SP(0,'Abjuration','1 action','Touch','V, S, M','Concentration, up to 1 minute','You touch a willing creature, who can add 1d4 to one saving throw of its choice before the spell ends.'),
  'Shape Water': SP(0,'Transmutation','1 action','30 feet','S','Instantaneous or 1 hour','You choose an area of water you can see and cause one of several minor effects, such as moving it, changing its color, or freezing it.'),
  'Word of Radiance': SP(0,'Evocation','1 action','5 feet','V, S, M','Instantaneous','You speak a word of divine power, and light bursts out from you in a five-foot ring. Each creature you can see in that radius, chosen by you, must succeed on a Constitution save or take 1d6 radiant damage.','The damage increases to 2d6 at 5th level, 3d6 at 11th level, and 4d6 at 17th level.'),
  'Infestation': SP(0,'Conjuration','1 action','30 feet','V, S, M','Instantaneous','You summon a swarm of biting mites and fleas onto a creature you can see within range. It makes a Constitution save, taking 1d6 poison damage on a failure and being shoved 5 feet in a random direction if it\u2019s able to move, though this never provokes an opportunity attack and fails quietly if the path is blocked.','The damage increases to 2d6 at 5th level, 3d6 at 11th level, and 4d6 at 17th level.'),
  'Magic Stone': SP(0,'Transmutation','1 bonus action','Touch','V, S','1 minute','You charge up to three pebbles with magic, ready to be thrown or slung. Whoever wields one adds your spellcasting ability modifier to the attack, dealing 1d6 plus that same modifier in bludgeoning damage on a hit. Thrown by hand, a stone has a range of 60 feet.'),
  // ---- Cantrips ----
  'Friends': SP(0,'Enchantment','1 action','Self','S, M','Concentration, up to 1 minute','For the duration, you have advantage on Charisma checks directed at one creature of your choice within 30 feet, who is unaware the spell is affecting it. When the spell ends, the target realizes magic was used to influence it and may become hostile toward you.'),
  'Vicious Mockery': SP(0,'Enchantment','1 action','60 feet','V','Instantaneous','You unleash a string of insults laced with subtle enchantments at a creature you can see. If the target can hear you, it takes 1d4 psychic damage and has disadvantage on the next attack roll it makes before the end of its next turn.','The damage increases by 1d4 at 5th, 11th, and 17th level.'),
  'Minor Illusion': SP(0,'Illusion','1 action','30 feet','S, M','1 minute','You create a sound or an image of an object within range that lasts for the duration. The illusion ends if you dismiss it or cast this spell again.'),
  'Mage Hand': SP(0,'Conjuration','1 action','30 feet','V, S','1 minute','A spectral, floating hand appears at a point you choose within range. It can manipulate objects, open unlocked doors, and carry up to 10 pounds, but can\u2019t attack or activate magic items.'),
  'Dancing Lights': SP(0,'Evocation','1 action','120 feet','V, S, M','1 minute','You create up to four torch-sized lights within range, shaped as glowing orbs, flames, or humanoid shapes. You can move them anywhere within range as a bonus action.'),
  'Prestidigitation': SP(0,'Transmutation','1 action','10 feet','V, S','Up to 1 hour','A minor magical trick: light or snuff a small flame, clean or soil an object, chill or warm a small amount of material, create a harmless sensory effect, or similar minor tricks.'),
  'True Strike': SP(0,'Divination','1 action','30 feet','S','Concentration, up to 1 round','You extend your hand and point a finger at a target. On your next turn, you gain advantage on your first attack roll against that target.'),
  'Sacred Flame': SP(0,'Evocation','1 action','60 feet','V, S','Instantaneous','Radiant flame descends on a creature you can see, dealing 1d8 radiant damage on a failed Dexterity save. The target gains no benefit from cover for this save.','The damage increases by 1d8 at 5th, 11th, and 17th level.'),
  'Guidance': SP(0,'Divination','1 action','Touch','V, S','Concentration, up to 1 minute','You touch a willing creature, who can add 1d4 to one ability check of its choice before the spell ends.'),
  'Spare the Dying': SP(0,'Necromancy','1 action','Touch','V, S','Instantaneous','You touch a living creature with 0 hit points, stabilizing it.'),
  'Thaumaturgy': SP(0,'Transmutation','1 action','30 feet','V','Up to 1 minute','You manifest a minor wonder: your voice booms, harmless tremors shake the ground, flames flicker or change color, doors slam, or similar minor supernatural effects.'),
  'Toll the Dead': SP(0,'Necromancy','1 action','60 feet','V, S','Instantaneous','You point at a creature, and a sound like a tolling bell fills the area. On a failed Wisdom save it takes 1d12 necrotic damage if it\u2019s already missing hit points, or 1d8 otherwise.','The damage increases by one die at 5th, 11th, and 17th level.'),
  'Light': SP(0,'Evocation','1 action','Touch','V, M','1 hour','You touch an object no larger than 10 feet in any dimension, causing it to shed bright light in a 20-foot radius.'),
  'Produce Flame': SP(0,'Conjuration','1 action','Self','V, S','10 minutes','A flickering flame appears in your hand, sheds light, and can be hurled to deal 1d8 fire damage.','The damage increases by 1d8 at 5th, 11th, and 17th level.'),
  'Shillelagh': SP(0,'Transmutation','1 bonus action','Touch','V, S, M','1 minute','The wood of a club or quarterstaff you are holding is imbued with nature\u2019s power. For the duration you can use your spellcasting ability instead of Strength for its attack and damage rolls, and the damage die becomes a d8.'),
  'Thorn Whip': SP(0,'Transmutation','1 action','30 feet','V, S, M','Instantaneous','You create a vine-like whip that deals 1d6 piercing damage and pulls the target up to 10 feet closer to you.','The damage increases by 1d6 at 5th, 11th, and 17th level.'),
  'Druidcraft': SP(0,'Transmutation','1 action','30 feet','V, S','Instantaneous','You create a minor, harmless nature effect: predict the weather, make a flower bloom, create a sensory effect, or instantly light or snuff a small flame.'),
  'Fire Bolt': SP(0,'Evocation','1 action','120 feet','V, S','Instantaneous','You hurl a mote of fire at a creature or object. On a hit it takes 1d10 fire damage, and flammable objects it hits ignite.','The damage increases by 1d10 at 5th, 11th, and 17th level.'),
  'Ray of Frost': SP(0,'Evocation','1 action','60 feet','V, S','Instantaneous','A beam of frigid air streaks toward a creature. On a hit it takes 1d8 cold damage and its speed is reduced by 10 feet until the start of your next turn.','The damage increases by 1d8 at 5th, 11th, and 17th level.'),
  'Shocking Grasp': SP(0,'Evocation','1 action','Touch','V, S','Instantaneous','Lightning springs from your hand into a creature you touch. The attack has advantage if the target is wearing metal armor, deals 1d8 lightning damage, and the target can\u2019t take reactions until its next turn.','The damage increases by 1d8 at 5th, 11th, and 17th level.'),
  'Eldritch Blast': SP(0,'Evocation','1 action','120 feet','V, S','Instantaneous','A beam of crackling energy streaks toward a creature. Make a ranged spell attack against the target; on a hit, it takes 1d10 force damage.','You gain an additional beam at 5th, 11th, and 17th level, each of which can target the same or a different creature.'),
  'Chill Touch': SP(0,'Necromancy','1 action','120 feet','V, S','1 round','A ghostly, skeletal hand reaches out to a creature, dealing 1d8 necrotic damage. Until the start of your next turn the target can\u2019t regain hit points, and if it\u2019s undead it also has disadvantage on attacks against you.','The damage increases by 1d8 at 5th, 11th, and 17th level.'),

  // ---- Level 1 ----
  'Ceremony': SP(1,'Abjuration','1 hour','Touch','V, S, M','Instantaneous','You perform a religious rite infused with magic, choosing one of six occasions to mark, with the target staying within 10 feet of you throughout the hour it takes to cast. Atonement restores a willing creature\u2019s original alignment on a successful DC 20 Wisdom (Insight) check. Bless Water turns a touched vial into holy water. Coming of Age grants a young adult a d4 bonus on ability checks for the next day, usable once per creature. Dedication grants the same bonus on saving throws instead, also once per creature. Funeral Rite protects a corpse from becoming undead for a week. Wedding grants a pair of willing humanoids +2 AC for a week whenever they\u2019re within 30 feet of each other, renewable only if one of them is later widowed.'),
  'Chaos Bolt': SP(1,'Evocation','1 action','120 feet','V, S','Instantaneous','You hurl a warbling mass of unstable magic at a creature in range and make a ranged spell attack. On a hit, it takes 2d8 plus 1d6 damage. Pick one of the two eight-sided dice: whatever number comes up on it decides the type of damage dealt, cycling through acid, cold, fire, force, lightning, poison, psychic, and thunder from 1 through 8. If both eight-sided dice land on the same number, the chaos leaps onward to another creature of your choice within 30 feet of the first, repeating the attack and damage roll, and continuing to jump as long as the dice keep matching.'),
  'Absorb Elements': SP(1,'Abjuration','1 reaction','Self','S','1 round','You throw up a ward that catches some of an incoming attack\u2019s energy and turns it against your foe. When you take acid, cold, fire, lightning, or thunder damage, you gain resistance to that damage type until the start of your next turn. The next time you hit with a melee attack before then, the target takes an extra 1d6 damage of the same type.','The extra damage increases to 2d6 at 5th level, 3d6 at 11th level, and 4d6 at 17th level.'),
  'Ice Knife': SP(1,'Conjuration','1 action','60 feet','S, M','Instantaneous','You form a shard of ice and hurl it at a creature within range, making a ranged spell attack. On a hit, the target takes 1d10 piercing damage. Whether or not it hits, the shard then shatters, and the target along with everyone within 5 feet of it rolls a Dexterity save, taking 2d6 cold damage on a failure.','The cold damage increases by 1d6 for each slot level above 1st.'),
  'Zephyr Strike': SP(1,'Transmutation','1 bonus action','Self','V','1 minute','You move like the wind. Until the spell ends, your movement doesn\u2019t provoke opportunity attacks. Once during the spell\u2019s duration, you can give yourself advantage on one weapon attack roll, dealing an extra 1d8 force damage on a hit. Whether or not that attack hits, your walking speed increases by 30 feet until the end of that turn.'),
  'Snare': SP(1,'Abjuration','10 minutes','Touch','S, M','8 hours','You weave a bit of cord or wire into an invisible magical trap covering a five-foot square of ground you can see. Any creature that steps onto it must succeed on a Dexterity save or be hoisted three feet into the air, restrained and dangling there until the spell ends. A trapped creature, or someone within its reach, can use an action to make a Strength check against your spell save DC to cut it free. The snare stays invisible except to anyone with truesight, unless you choose to point it out.'),
  'Cause Fear': SP(1,'Necromancy','1 action','60 feet','V','Concentration, up to 1 minute','You stir a primal fear of death in a creature you can see, though constructs and undead are immune. It must succeed on a Wisdom save or become frightened of you for as long as you concentrate, repeating the save at the end of each of its turns to try to shake the feeling off.'),
  'Beast Bond': SP(1,'Divination','1 action','Touch','V, S, M','Concentration, up to 10 minutes','You touch a beast that\u2019s friendly toward you or under your charm and forge a telepathic link with it, so long as its intelligence isn\u2019t too far removed from an animal\u2019s. While the link holds and you\u2019re within sight of each other, you can communicate simple thoughts and ideas back and forth, and the beast fights fiercely at your side, gaining advantage on attacks against any creature within 5 feet of you that means you harm.'),
  'Earth Tremor': SP(1,'Evocation','1 action','Self (10-foot radius)','V, S','Instantaneous','You stamp the ground and send a shockwave rippling outward in a 10-foot radius around you. Everyone else caught in it rolls a Dexterity save, taking 1d6 bludgeoning damage and falling prone on a failure. If the ground there is loose earth or stone, it stays torn up as difficult terrain until someone spends a minute clearing each five-foot patch of it.'),
  'Catapult': SP(1,'Transmutation','1 action','60 feet','S','Instantaneous','You fling a loose, unattended object weighing up to 5 pounds in a straight line up to 90 feet. If it strikes a creature along that path, the creature makes a Dexterity save, taking 3d8 bludgeoning damage on a failure or half as much on a success, and the object drops wherever it hit. If nothing\u2019s in the way, it simply lands at the far end of its arc.','The damage increases by 1d8 for each spell slot level above 1st.'),
  'Healing Word': SP(1,'Evocation','1 bonus action','60 feet','V','Instantaneous','A creature of your choice you can see within range regains 1d4 + your spellcasting ability modifier hit points.','The healing increases by 1d4 for each slot level above 1st.'),
  'Arms of Hadar': SP(1,'Conjuration','1 action','Self (10-foot radius)','V, S','Instantaneous','You invoke the power of Hadar, sending tendrils of dark energy out from yourself. Each creature of your choice within range takes 2d6 necrotic damage and can\u2019t take reactions until the start of its next turn, unless it succeeds on a Strength save, which halves the damage.','The damage increases by 1d6 for each slot level above 1st.'),
  'Faerie Fire': SP(1,'Evocation','1 action','60 feet','V','Concentration, up to 1 minute','Every creature in a cube-shaped area is outlined in light unless it succeeds a Dexterity save. Affected creatures shed dim light and attacks against them have advantage, and they can\u2019t benefit from being invisible.'),
  'Hail of Thorns': SP(1,'Conjuration','1 bonus action','Self','V','Concentration, up to 1 minute','The next time you hit a creature with a ranged weapon attack before this spell ends, it creates a burst of thorny vines at the target\u2019s location. The target and each creature within 5 feet of it must succeed on a Dexterity save or take 1d10 piercing damage.','The damage increases by 1d10 for each slot level above 1st, to a maximum of 6d10.'),
  'Dissonant Whispers': SP(1,'Enchantment','1 action','60 feet','V','Instantaneous','A target hears a discordant melody in its mind, taking 3d6 psychic damage on a failed Wisdom save (half as much on a success) and immediately using its reaction to move away from you.','The damage increases by 1d6 for each slot level above 1st.'),
  'Charm Person': SP(1,'Enchantment','1 action','30 feet','V, S','1 hour','You attempt to charm a humanoid you can see. On a failed Wisdom save it regards you as a friendly acquaintance for the duration, or until you or your allies do anything harmful to it.'),
  'Thunderwave': SP(1,'Evocation','1 action','Self (15-foot cube)','V, S','Instantaneous','A wave of thunderous force sweeps out from you. Each creature in the area takes 2d8 thunder damage and is pushed back 10 feet on a failed Constitution save, or takes half damage and isn\u2019t pushed on a success.','The damage increases by 1d8 for each slot level above 1st.'),
  'Sleep': SP(1,'Enchantment','1 action','90 feet','V, S, M','1 minute','This spell sends creatures in the area into a magical slumber, affecting the weakest creatures first, up to a total of 5d8 hit points worth of creatures.','You can affect an extra 2d8 hit points of creatures for each slot level above 1st.'),
  'Tasha\u2019s Hideous Laughter': SP(1,'Enchantment','1 action','30 feet','V, S, M','Concentration, up to 1 minute','A target creature perceives everything as hilarious and falls prone, incapacitated with laughter, unless it succeeds on a Wisdom save; it can retry the save when it takes damage.'),
  'Comprehend Languages': SP(1,'Divination','1 action','Self','V, S, M','1 hour','For the duration you understand the literal meaning of any spoken language you hear, and any written language you touch, though you don\u2019t gain the ability to speak unknown languages.'),
  'Cure Wounds': SP(1,'Evocation','1 action','Touch','V, S','Instantaneous','A creature you touch regains 1d8 + your spellcasting ability modifier hit points.','The healing increases by 1d8 for each slot level above 1st.'),
  'Bless': SP(1,'Enchantment','1 action','30 feet','V, S, M','Concentration, up to 1 minute','You bless up to three creatures of your choice. Whenever a target makes an attack roll or saving throw before the spell ends, it adds 1d4 to the roll.','You can target one additional creature for each slot level above 1st.'),
  'Guiding Bolt': SP(1,'Evocation','1 action','120 feet','V, S','1 round','A flash of light streaks toward a creature, dealing 4d6 radiant damage on a hit, and the next attack roll against that target before the end of your next turn has advantage.','The damage increases by 1d6 for each slot level above 1st.'),
  'Shield of Faith': SP(1,'Abjuration','1 bonus action','60 feet','V, S, M','Concentration, up to 10 minutes','A shimmering field surrounds a creature of your choice, granting it a +2 bonus to AC for the duration.'),
  'Command': SP(1,'Enchantment','1 action','60 feet','V','1 round','You speak a one-word command to a creature you can see. On a failed Wisdom save it follows the command (such as Drop, Flee, Grovel, or Halt) on its next turn.','You can target one additional creature for each slot level above 1st.'),
  'Detect Evil and Good': SP(1,'Divination','1 action','Self','V, S','Concentration, up to 10 minutes','For the duration you sense the presence and general direction of celestials, fiends, undead, and consecrated or desecrated places within 30 feet.'),
  'Sanctuary': SP(1,'Abjuration','1 bonus action','30 feet','V, S, M','1 minute','You ward a creature, forcing any attacker to first succeed on a Wisdom save before targeting it, though the warded creature loses the protection if it attacks or casts a harmful spell.'),
  'Entangle': SP(1,'Conjuration','1 action','90 feet','V, S','Concentration, up to 1 minute','Grasping weeds and vines sprout across a 20-foot square, restraining any creature there that fails a Strength save.'),
  'Goodberry': SP(1,'Transmutation','1 action','Touch','V, S, M','Instantaneous','Up to ten berries appear in your hand, magically infused. Each berry provides sustenance for a day and restores 1 hit point when eaten, up to ten berries eaten in 24 hours.'),
  'Fog Cloud': SP(1,'Conjuration','1 action','120 feet','V, S','Concentration, up to 1 hour','You create a 20-foot-radius sphere of fog that heavily obscures its area, and can be spread further by wind.'),
  'Speak with Animals': SP(1,'Divination','1 action','Self','V, S','10 minutes','For the duration you can comprehend and verbally communicate with beasts, though their intelligence limits what they can tell you.'),
  'Magic Missile': SP(1,'Evocation','1 action','120 feet','V, S','Instantaneous','You create three glowing darts of magical force. Each dart automatically hits a creature of your choice and deals 1d4+1 force damage.','You create one additional dart for each slot level above 1st.'),
  'Shield': SP(1,'Abjuration','1 reaction','Self','V, S','1 round','An invisible barrier of force appears around you until the start of your next turn, granting +5 AC (including against the triggering attack) and immunity to magic missile.'),
  'Chromatic Orb': SP(1,'Evocation','1 action','90 feet','V, S, M','Instantaneous','You hurl a 4-inch sphere of energy of a damage type you choose (acid, cold, fire, lightning, poison, or thunder) at a target. Make a ranged spell attack against it; on a hit, it takes 3d8 damage of the chosen type.','The damage increases by 1d8 for each slot level above 1st.'),
  'Burning Hands': SP(1,'Evocation','1 action','Self (15-foot cone)','V, S','Instantaneous','A thin sheet of flame shoots from your fingertips, dealing 3d6 fire damage to each creature in the cone on a failed Dexterity save, half as much on a success, and igniting flammable objects there.','The damage increases by 1d6 for each slot level above 1st.'),
  'Feather Fall': SP(1,'Transmutation','1 reaction','60 feet','V, M','1 minute','You choose up to five falling creatures, slowing their descent to 60 feet per round so they take no falling damage.'),
  'Silent Image': SP(1,'Illusion','1 action','60 feet','V, S, M','Concentration, up to 10 minutes','You create a purely visual illusion of an object, creature, or phenomenon in a 15-foot cube, which you can mentally cause to move as long as you concentrate.'),
  'Detect Magic': SP(1,'Divination','1 action','Self','V, S','Concentration, up to 10 minutes','For the duration you sense the presence of magic within 30 feet, and can use your action to see a faint aura around any visible magical object or creature and learn its school.'),
  'Identify': SP(1,'Divination','1 minute','Touch','V, S, M','Instantaneous','You choose one object you touch and learn its magical properties, how to use them, whether it requires attunement, and how many charges it has left.'),
  'Find Familiar': SP(1,'Conjuration','1 hour','10 feet','V, S, M','Instantaneous','You gain the service of a spirit that takes the animal form you choose, acting independently but obeying your commands, and through which you can see and hear at will.'),
  'Hex': SP(1,'Enchantment','1 bonus action','90 feet','V, S, M','Concentration, up to 1 hour','You place a curse on a creature. Whenever you hit it with an attack, it takes an extra 1d6 damage, and you choose one ability score on which it has disadvantage for checks.','The duration extends to 8 hours at 3rd level and 24 hours at 5th level.'),
  'Armor of Agathys': SP(1,'Abjuration','1 action','Self','V, S, M','1 hour','A protective frost surrounds you, granting 5 temporary hit points; while any of those remain, a creature that hits you with a melee attack takes 5 cold damage.','Both the temporary hit points and the cold damage increase by 5 for each slot level above 1st.'),
  'Witch Bolt': SP(1,'Evocation','1 action','30 feet','V, S, M','Concentration, up to 1 minute','A beam of crackling energy lances toward a target, dealing 1d12 lightning damage, and you can deal the same damage again automatically each turn you maintain concentration.'),
  'Unseen Servant': SP(1,'Conjuration','1 action','60 feet','V, S, M','1 hour','You create an invisible, mindless force that performs simple tasks at your command, such as fetching things, cleaning, or opening doors, within 60 feet of you.'),
  'Divine Favor': SP(1,'Evocation','1 bonus action','Self','V, S','Concentration, up to 1 minute','Your prayer imbues you with divine energy. Until the spell ends, your weapon attacks deal an extra 1d4 radiant damage on a hit.'),
  'Compelled Duel': SP(1,'Enchantment','1 bonus action','30 feet','V','Concentration, up to 1 minute','You attempt to compel a creature to attack only you, giving it disadvantage on attacks against anyone else and requiring a Wisdom save to move more than 30 feet from you.'),
  'Hunter\u2019s Mark': SP(1,'Divination','1 bonus action','90 feet','V','Concentration, up to 1 hour','You mark a creature as your quarry. Whenever you hit it with a weapon attack, it takes an extra 1d6 damage, and you have advantage on Perception or Survival checks to find it.','The duration extends to 8 hours at 3rd level and 24 hours at 5th level.'),
  'Ensnaring Strike': SP(1,'Conjuration','1 bonus action','Self','V','Concentration, up to 1 minute','The next time you hit a creature with a weapon attack before the spell ends, grasping vines restrain it unless it succeeds on a Strength save, dealing 1d6 piercing damage each turn it remains restrained.'),
  'Alarm': SP(1,'Abjuration','1 minute','30 feet','V, S, M','8 hours','You set an audible or mental alarm to alert you when a creature touches or enters an area you designate, even while you sleep.'),
  'Animal Friendship': SP(1,'Enchantment','1 action','30 feet','V, S, M','24 hours','You convince a beast that you mean it no harm, preventing it from attacking you for the duration unless you harm it first.'),
  'Bane': SP(1,'Enchantment','1 action','30 feet','V, S, M','Concentration, up to 1 minute','You target up to three creatures, who must succeed on a Charisma save or subtract 1d4 from their attack rolls and saving throws for the duration.'),
  'Color Spray': SP(1,'Illusion','1 action','Self (15-foot cone)','V, S, M','1 round','A dazzling array of flashing, colored light blinds creatures in the cone, blinding a total of 6d10 hit points worth of creatures, starting with those with the lowest hit points.'),
  'Create or Destroy Water': SP(1,'Transmutation','1 action','30 feet','V, S, M','Instantaneous','You either create up to 10 gallons of clean water, or destroy water in an open container or in a 30-foot cube of fog.'),
  'Detect Poison and Disease': SP(1,'Divination','1 action','Self','V, S, M','Concentration, up to 10 minutes','For the duration you can sense the presence and location of poisons, poisonous creatures, and diseases within 30 feet.'),
  'Disguise Self': SP(1,'Illusion','1 action','Self','V, S','1 hour','You alter your appearance, including clothing and gear, until the spell ends or you use an action to dismiss it. Physical inspection can reveal the illusion.'),
  'Expeditious Retreat': SP(1,'Transmutation','1 bonus action','Self','V, S','Concentration, up to 10 minutes','This spell lets you move at an incredible pace, letting you take the Dash action as a bonus action on each of your turns for the duration.'),
  'False Life': SP(1,'Necromancy','1 action','Self','V, S, M','1 hour','You bolster yourself with a necromantic surge, gaining 1d4+4 temporary hit points for the duration.'),
  'Grease': SP(1,'Conjuration','1 action','60 feet','V, S, M','1 minute','Slick grease covers the ground in a 10-foot square, forcing creatures there to make a Dexterity save or fall prone; the area remains difficult terrain for the duration.'),
  'Hellish Rebuke': SP(1,'Evocation','1 reaction','60 feet','V, S','Instantaneous','You point at a creature that just damaged you, wreathing it in hellish flames that deal 2d10 fire damage on a failed Dexterity save, or half as much on a success.','The damage increases by 1d10 for each slot level above 1st.'),
  'Heroism': SP(1,'Enchantment','1 action','Touch','V, S','Concentration, up to 1 minute','A willing creature gains immunity to being frightened and gains temporary hit points at the start of each of its turns for the duration.'),
  'Illusory Script': SP(1,'Illusion','1 minute','Touch','S, M','10 days','You write text that appears mundane to anyone but the creatures you designate, who see the message you intended in their own language.'),
  'Inflict Wounds': SP(1,'Necromancy','1 action','Touch','V, S','Instantaneous','Your touch channels negative energy, dealing 3d10 necrotic damage to the target on a successful melee spell attack.','The damage increases by 1d10 for each slot level above 1st.'),
  'Jump': SP(1,'Transmutation','1 action','Touch','V, S, M','1 minute','You touch a creature, tripling its jump distance for the duration.'),
  'Longstrider': SP(1,'Transmutation','1 action','Touch','V, S, M','1 hour','You touch a creature, increasing its walking speed by 10 feet for the duration.'),
  'Mage Armor': SP(1,'Abjuration','1 action','Touch','V, S, M','8 hours','You touch a willing creature not wearing armor, surrounding it with a protective magical force that sets its base AC to 13 + its Dexterity modifier for the duration.'),
  'Protection from Evil and Good': SP(1,'Abjuration','1 action','Touch','V, S, M','Concentration, up to 10 minutes','You protect a willing creature against aberrations, celestials, elementals, fey, fiends, and undead, imposing disadvantage on their attacks against the target and other effects.'),
  'Purify Food and Drink': SP(1,'Transmutation','1 action','10 feet','V, S','Instantaneous','All nonmagical food and drink within a 5-foot-radius sphere centered on a point you choose becomes purified and free of poison and disease.'),
  'Ray of Sickness': SP(1,'Necromancy','1 action','60 feet','V, S','Instantaneous','A ray of sickening greenish energy lashes toward a target, dealing 2d8 poison damage and poisoning it until the end of your next turn on a failed Constitution save.','The damage increases by 1d8 for each slot level above 1st.'),
  'Searing Smite': SP(1,'Evocation','1 bonus action','Self','V','Concentration, up to 1 minute','The next time you hit a creature with a weapon attack before the spell ends, your weapon flares with fire, dealing an extra 1d6 fire damage and igniting the target unless it makes a Constitution save.'),
  'Tenser\u2019s Floating Disk': SP(1,'Conjuration','1 action','30 feet','V, S, M','1 hour','This spell creates a horizontal disk of shimmering force that follows you and can hold up to 500 pounds, hovering 3 feet above the ground.'),
  'Thunderous Smite': SP(1,'Evocation','1 bonus action','Self','V','Concentration, up to 1 minute','The next time you hit a creature with a weapon attack before the spell ends, your weapon rings with thunder, dealing an extra 2d6 thunder damage and potentially knocking the target prone.'),
  'Wrathful Smite': SP(1,'Evocation','1 bonus action','Self','V','Concentration, up to 1 minute','The next time you hit a creature with a weapon attack before the spell ends, your weapon deals an extra 1d6 psychic damage and can frighten the target unless it succeeds on a Wisdom save.'),

  // ---- Level 2 ----
  'Pyrotechnics': SP(2,'Transmutation','1 action','60 feet','V, S','Instantaneous','You choose a spot of nonmagical fire you can see, small enough to fit in a five-foot cube, and snuff it out to trigger one of two effects. Fireworks send up a burst of dazzling color, forcing everyone within 10 feet to succeed on a Constitution save or be blinded until the end of your next turn. Smoke instead pours out in a 20-foot radius, spreading around corners and heavily obscuring the area for a minute or until a strong wind clears it.'),
  'Warding Wind': SP(2,'Evocation','1 action','Self (10-foot radius)','V','Concentration, up to 10 minutes','A strong wind swirls around you in a 10-foot radius and moves with you for as long as you concentrate. It deafens you and anyone else caught in it, snuffs out unprotected flames no bigger than a torch, and scatters vapor, gas, and fog. The wind makes the area difficult terrain for everyone but you, and any ranged weapon attack that passes into or out of it is made with disadvantage.'),
  'Shadow Blade': SP(2,'Illusion','1 bonus action','Self','V, S','Concentration, up to 1 minute','You knit strands of shadow into a sword of solid darkness that appears in your hand and lasts as long as you concentrate. It counts as a simple melee weapon you\u2019re proficient with, finesse and light, dealing 2d8 psychic damage and able to be thrown up to 60 feet. Striking a target that\u2019s in dim light or darkness with it gives you advantage on the attack roll. Dropping or throwing the sword causes it to dissolve at the end of the turn, though you can bring it back into your hand with a bonus action while the spell lasts.','The damage increases to 3d8 with a 3rd or 4th level slot, 4d8 with a 5th or 6th, and 5d8 with a 7th level slot or higher.'),
  'Skywrite': SP(2,'Transmutation','1 action','Sight','V, S','Concentration, up to 1 hour','You write up to ten words across a stretch of sky you can see, formed from wisps of cloud that hold their shape for as long as you concentrate. A strong enough wind can scatter the clouds and end the message early.'),
  'Dragon\u2019s Breath': SP(2,'Transmutation','1 bonus action','Touch','V, S, M','Concentration, up to 1 minute','You touch a willing creature and grant it a breath weapon, provided it has a mouth to breathe from. Choose acid, cold, fire, lightning, or poison. Until the spell ends, the creature can use its action to exhale that energy in a 15-foot cone. Anyone caught in it rolls a Dexterity save, taking 3d6 damage of the chosen type on a failure or half as much on a success.'),
  'Shatter': SP(2,'Evocation','1 action','60 feet','V, S, M','Instantaneous','A sudden loud ringing noise painfully intense in a 10-foot-radius sphere deals 3d8 thunder damage to each creature there on a failed Constitution save, half as much on a success, and objects there take double damage.','The damage increases by 1d8 for each slot level above 2nd.'),
  'Suggestion': SP(2,'Enchantment','1 action','30 feet','V, M','Concentration, up to 8 hours','You suggest a reasonable-sounding course of activity to a creature you can see, describing it in a sentence or two. Unless it succeeds on a Wisdom saving throw, it pursues the suggested course of action as best it can for the duration, so long as the suggestion isn\u2019t obviously harmful to it.'),
  'Invisibility': SP(2,'Illusion','1 action','Touch','V, S, M','Concentration, up to 1 hour','A creature you touch becomes invisible until the spell ends or the target attacks or casts a spell.','You can target one additional creature for each slot level above 2nd.'),
  'Heat Metal': SP(2,'Transmutation','1 action','60 feet','V, S, M','Concentration, up to 1 minute','You cause a manufactured metal object to glow red-hot, dealing 2d8 fire damage to whoever is touching it, and you can repeat the damage each turn you maintain concentration.'),
  'Hold Person': SP(2,'Enchantment','1 action','60 feet','V, S, M','Concentration, up to 1 minute','A humanoid you can see must succeed a Wisdom save or be paralyzed for the duration, repeating the save at the end of each of its turns.','You can target one additional humanoid for each slot level above 2nd.'),
  'Enhance Ability': SP(2,'Transmutation','1 action','Touch','V, S, M','Concentration, up to 1 hour','You touch a creature and grant it advantage on ability checks of one chosen ability score, along with a minor extra benefit depending on the ability.'),
  'Silence': SP(2,'Illusion','1 action','120 feet','V, S','Concentration, up to 10 minutes','No sound can be created within or pass through a 20-foot-radius sphere, deafening anyone entirely inside it and preventing verbal spellcasting there.'),
  'Spiritual Weapon': SP(2,'Evocation','1 bonus action','60 feet','V, S','1 minute','You create a floating, spectral weapon that can make a melee spell attack against a creature within 5 feet of it, dealing force damage equal to 1d8 + your spellcasting ability modifier on a hit; you can move it and attack again as a bonus action on later turns.','The damage increases by 1d8 for every two slot levels above 2nd.'),
  'Prayer of Healing': SP(2,'Evocation','10 minutes','30 feet','V','Instantaneous','Up to six creatures of your choice regain 2d8 + your spellcasting ability modifier hit points.','The healing increases by 1d8 for each slot level above 2nd.'),
  'Lesser Restoration': SP(2,'Abjuration','1 action','Touch','V, S','Instantaneous','You touch a creature and end either one disease or one condition afflicting it: blinded, deafened, paralyzed, or poisoned.'),
  'Zone of Truth': SP(2,'Enchantment','1 action','60 feet','V, S','10 minutes','Creatures in a 15-foot-radius zone that fail a Charisma save can\u2019t speak a deliberate lie while inside it, though they can still avoid answering or speak misleadingly.'),
  'Aid': SP(2,'Abjuration','1 action','30 feet','V, S, M','8 hours','You touch up to three creatures, each of whose hit point maximum and current hit points increase by 5 for the duration.','The increase is 5 more for each slot level above 2nd.'),
  'Moonbeam': SP(2,'Evocation','1 action','120 feet','V, S, M','Concentration, up to 1 minute','A silvery beam of pale light shines in a 5-foot-radius cylinder, dealing 2d10 radiant damage to any creature there on a failed Constitution save (double damage to shapechangers), and you can move the beam as a bonus action.','The damage increases by 1d10 for each slot level above 2nd.'),
  'Barkskin': SP(2,'Transmutation','1 action','Touch','V, S, M','Concentration, up to 1 hour','You touch a willing creature, toughening its skin. Its AC can\u2019t be less than 16 for the duration, regardless of what armor it\u2019s wearing.'),
  'Flame Blade': SP(2,'Evocation','1 bonus action','Self','V, S, M','Concentration, up to 10 minutes','You evoke a fiery blade in your hand, usable as a melee weapon that deals 3d6 fire damage on a hit and sheds bright light.','The damage increases by 1d6 for every two slot levels above 2nd.'),
  'Animal Messenger': SP(2,'Enchantment','1 action','30 feet','V, S, M','24 hours','You use a Tiny beast to deliver a short message to a location you designate, the messenger finding its way there as best it can.'),
  'Spike Growth': SP(2,'Transmutation','1 action','150 feet','V, S, M','Concentration, up to 10 minutes','The ground in a 20-foot radius sprouts hidden spikes, dealing 2d4 piercing damage per 5 feet a creature moves there and reducing the terrain to difficult terrain.'),
  'Scorching Ray': SP(2,'Evocation','1 action','120 feet','V, S','Instantaneous','You create three rays of fire, each an individual ranged spell attack dealing 2d6 fire damage on a hit.','You create one additional ray for each slot level above 2nd.'),
  'Mirror Image': SP(2,'Illusion','1 action','Self','V, S','1 minute','Three illusory duplicates of yourself appear in your space. Each time a creature attacks you while at least one duplicate remains, roll a d20 to see if it hits a duplicate instead: you need a 6+ with three duplicates left, an 8+ with two, or an 11+ with one. A duplicate has an AC of 10 + your Dexterity modifier and is destroyed if hit. The spell ends once all three are gone.'),
  'Misty Step': SP(2,'Conjuration','1 bonus action','Self','V','Instantaneous','Surrounded briefly by silvery mist, you teleport up to 30 feet to an unoccupied space you can see.'),
  'Web': SP(2,'Conjuration','1 action','60 feet','V, S, M','Concentration, up to 1 hour','Thick, sticky webbing fills a 20-foot cube, restraining any creature there that fails a Dexterity save; the area becomes difficult terrain.'),
  'Find Steed': SP(2,'Conjuration','10 minutes','30 feet','V, S','Instantaneous','You summon a spirit that assumes the form of a loyal, intelligent steed, which you can ride and communicate with telepathically.'),
  'Magic Weapon': SP(2,'Transmutation','1 bonus action','Touch','V, S','Concentration, up to 1 hour','You touch a nonmagical weapon, which becomes a magic weapon with a +1 bonus to attack and damage rolls for the duration.','The bonus increases to +2 at 4th level and +3 at 6th level.'),
  'Pass without Trace': SP(2,'Abjuration','1 action','Self','V, S, M','Concentration, up to 1 hour','A veil of shadows and silence radiates from you, granting a +10 bonus to Stealth checks to you and nearby allies, who also can\u2019t be tracked except by magical means.'),
  'Alter Self': SP(2,'Transmutation','1 action','Self','V, S','Concentration, up to 1 hour','You assume a new form, choosing one option each time you cast it: growing gills and webbing, sprouting a natural weapon, or changing your appearance.'),
  'Arcane Lock': SP(2,'Abjuration','1 action','Touch','V, S, M','Until dispelled','You touch a closable object and magically lock it, so that only you or creatures you designate can open it.'),
  'Augury': SP(2,'Divination','1 minute','Self','V, S, M','Instantaneous','You receive an omen about the results of a specific course of action you plan to take within the next 30 minutes, from weal to woe.'),
  'Beast Sense': SP(2,'Divination','1 action','Touch','S','Concentration, up to 1 hour','You touch a willing beast, letting you use your action to see and hear through its senses until the spell ends.'),
  'Blindness/Deafness': SP(2,'Necromancy','1 action','30 feet','V','1 minute','You can blind or deafen a creature you can see, unless it succeeds on a Constitution save.'),
  'Blur': SP(2,'Illusion','1 action','Self','V','Concentration, up to 1 minute','Your body becomes blurred, wavering and shifting in appearance, giving attackers disadvantage against you unless they don\u2019t rely on sight to fight.'),
  'Branding Smite': SP(2,'Evocation','1 bonus action','Self','V','Concentration, up to 1 minute','The next time you hit a creature with a weapon attack before the spell ends, the weapon deals an extra 2d6 radiant damage and the target becomes visible even if invisible.'),
  'Calm Emotions': SP(2,'Enchantment','1 action','60 feet','V, S','Concentration, up to 1 minute','You attempt to suppress strong emotion in a group of people, either suppressing hostility to prevent violence or suppressing a specific emotion in creatures.'),
  'Cloud of Daggers': SP(2,'Conjuration','1 action','60 feet','V, S, M','Concentration, up to 1 minute','You fill the air with spinning daggers in a 5-foot cube, dealing 4d4 slashing damage to any creature that enters or ends its turn there.'),
  'Continual Flame': SP(2,'Evocation','1 action','Touch','V, S, M','Until dispelled','A flame springs up on an object you touch, shedding bright light like a torch but producing no heat or fuel need.'),
  'Cordon of Arrows': SP(2,'Transmutation','1 action','5 feet','V, S, M','8 hours','You plant four ordinary arrows in the ground, imbuing them to fire at intruding creatures other than ones you designate, dealing 1d6 piercing damage each.'),
  'Crown of Madness': SP(2,'Enchantment','1 action','120 feet','V, S','Concentration, up to 1 minute','A creature\u2019s head is crowned with a phantasmal set of antlers unless it succeeds on a Wisdom save, letting you direct which creature it attacks on its turn.'),
  'Darkness': SP(2,'Evocation','1 action','60 feet','V, M','Concentration, up to 10 minutes','Magical darkness spreads from a point you choose, spreading around corners, and heavily obscuring the area unless a creature has darkvision that can see through magical darkness.'),
  'Darkvision': SP(2,'Transmutation','1 action','Touch','V, S, M','8 hours','You touch a willing creature, granting it darkvision out to 60 feet for the duration.'),
  'Detect Thoughts': SP(2,'Divination','1 action','Self','V, S, M','Concentration, up to 1 minute','For the duration you can read the surface thoughts of a creature you can see within 30 feet, though it can resist with an Intelligence save.'),
  'Enlarge/Reduce': SP(2,'Transmutation','1 action','30 feet','V, S, M','Concentration, up to 1 minute','You cause a creature or object to grow larger, gaining advantage on Strength checks and dealing an extra 1d4 damage with weapon attacks, or shrink smaller, dealing 1d4 less damage with weapon attacks and gaining disadvantage on Strength checks, unless it succeeds on a Constitution save.'),
  'Enthrall': SP(2,'Enchantment','1 action','60 feet','V, S','1 minute','You weave a distracting message that can captivate anyone able to hear you, giving Perception checks disadvantage against anyone else.'),
  'Find Traps': SP(2,'Divination','1 action','120 feet','V, S','Instantaneous','You sense the presence of any trap within range that is within line of sight, though you don\u2019t learn its location precisely.'),
  'Flaming Sphere': SP(2,'Conjuration','1 action','60 feet','V, S, M','Concentration, up to 1 minute','A 5-foot-diameter sphere of fire appears, dealing 2d6 fire damage to anything it touches, and can be rolled around the battlefield as a bonus action.'),
  'Gentle Repose': SP(2,'Necromancy','1 action','Touch','V, S, M','10 days','You touch a corpse, protecting it from decay and preventing it from becoming undead for the duration.'),
  'Gust of Wind': SP(2,'Evocation','1 action','Self (60-foot line)','V, S, M','Concentration, up to 1 minute','A line of strong wind blasts from you, pushing creatures back, extinguishing small flames, and giving ranged attacks disadvantage through the area.'),
  'Knock': SP(2,'Transmutation','1 action','60 feet','V','Instantaneous','You choose a locked object you can see and cause it to become unlocked, unstuck, or unbarred, with a loud knock audible from far away.'),
  'Levitate': SP(2,'Transmutation','1 action','60 feet','V, S, M','Concentration, up to 10 minutes','One creature or object of your choice rises vertically up to 20 feet and remains suspended there for the duration.'),
  'Locate Animals or Plants': SP(2,'Divination','1 action','Self','V, S, M','Instantaneous','You describe a species of beast or plant, learning the direction and distance to the closest example within a mile if any are present.'),
  'Locate Object': SP(2,'Divination','1 action','Self','V, S, M','Concentration, up to 10 minutes','You sense the direction to a specific object you\u2019re familiar with, or the closest of a general kind, as long as it isn\u2019t behind lead.'),
  'Magic Mouth': SP(2,'Illusion','1 minute','30 feet','V, S, M','Until dispelled','You implant a message in an object or creature, triggered to speak the message aloud when a condition you specify is met.'),
  'Melf\u2019s Acid Arrow': SP(2,'Evocation','1 action','90 feet','V, S, M','Instantaneous','A shimmering green arrow streaks toward a target, dealing 4d4 acid damage on a hit, plus 2d4 more damage at the end of its next turn.'),
  'Nystul\u2019s Magic Aura': SP(2,'Illusion','1 action','Touch','V, S, M','24 hours','You place an illusion on a creature or object, disguising it from magical detection, such as making a cursed item seem to be non-magical.'),
  'Phantasmal Force': SP(2,'Illusion','1 action','60 feet','V, S, M','Concentration, up to 1 minute','You craft an illusion that takes root in the mind of a creature it targets, unless it succeeds on an Intelligence save. The target takes 1d6 psychic damage each time it takes damage from interacting with the illusion.'),
  'Protection from Poison': SP(2,'Abjuration','1 action','Touch','V, S','1 hour','You touch a creature, neutralizing any poison affecting it and granting advantage on saves against being poisoned for the duration, along with resistance to poison damage.'),
  'Ray of Enfeeblement': SP(2,'Necromancy','1 action','60 feet','V, S','Concentration, up to 1 minute','A black ray of enervating energy drains strength from a target, halving the damage dealt by its Strength-based weapon attacks unless it succeeds on a Constitution save.'),
  'Rope Trick': SP(2,'Transmutation','1 action','Touch','V, S, M','1 hour','You touch a rope, making it hang in the air, leading to an extradimensional space where up to eight creatures can hide.'),
  'See Invisibility': SP(2,'Divination','1 action','Self','V, S, M','1 hour','For the duration, you see invisible creatures and objects as if they were visible, and can see into the Ethereal Plane.'),
  'Spider Climb': SP(2,'Transmutation','1 action','Touch','V, S, M','Concentration, up to 1 hour','A creature you touch gains the ability to move up, down, and across vertical surfaces and upside down along ceilings, leaving its hands free.'),
  'Warding Bond': SP(2,'Abjuration','1 action','Touch','V, S, M','1 hour','You link yourself to a willing creature, granting it a +1 bonus to AC and saving throws and resistance to all damage, while you take the same damage it takes.'),

  // ---- Level 3 ----
  'Wall of Water': SP(3,'Evocation','1 action','60 feet','V, S, M','Concentration, up to 10 minutes','You conjure a wall of water on the ground at a point you can see within range, either a straight span up to 30 feet long and 10 feet high or a ring up to 20 feet across and 20 feet high, a foot thick either way. It vanishes when the spell ends. The wall\u2019s space counts as difficult terrain, ranged attacks passing through it are made with disadvantage, and fire that passes through has its damage halved. Cold damage passing through the wall instead freezes a five-foot section of it solid, giving that section AC 5 and 15 hit points; destroying it stops water from ever filling that gap.'),
  'Erupting Earth': SP(3,'Transmutation','1 action','120 feet','V, S, M','Instantaneous','You choose a point on the ground you can see within range, and the earth there bursts upward in a fountain of churned stone filling a 20-foot cube. Everyone caught in it rolls a Dexterity save, taking 3d12 bludgeoning damage on a failure or half as much on a success. The torn-up ground becomes difficult terrain, taking at least a minute of clearing by hand for every five-foot square of it.'),
  'Melf\u2019s Minute Meteors': SP(3,'Evocation','1 action','Self','V, S, M','Concentration, up to 10 minutes','You conjure six tiny meteors that hover in the air around you for as long as you concentrate. On the turn you cast this and as a bonus action on later turns, you can send one or two of them streaking toward a point within 120 feet. Each one bursts on arrival or on hitting something solid, and anyone within 5 feet of the blast rolls a Dexterity save, taking 2d6 fire damage on a failure or half as much on a success.','Casting this at 4th level or higher creates two additional meteors for each slot level above 3rd.'),
  'Catnap': SP(3,'Enchantment','1 action','30 feet','V, S, M','10 minutes','You make a calming gesture, and up to three willing creatures you can see within range fall into an enchanted sleep for up to ten minutes. The spell ends early for a target if it takes damage or someone spends an action shaking or slapping it awake. Anyone who sleeps through the full duration wakes up as refreshed as if they\u2019d taken a short rest.'),
  'Tiny Servant': SP(3,'Transmutation','1 minute','Touch','V, S','8 hours','You touch a tiny, unattended, nonmagical object and bring it to life, growing spindly little arms and legs until the spell ends or it\u2019s reduced to nothing. It fights and works on your behalf, following whatever instructions you give it, or defending itself if left with no orders at all. As a bonus action, you can direct it mentally as long as it\u2019s within 120 feet of you.','Casting this at 4th level or higher animates one additional object for each slot level above 3rd.'),
  'Hypnotic Pattern': SP(3,'Illusion','1 action','120 feet','S, M','Concentration, up to 1 minute','A twisting pattern of colors weaves through a 30-foot cube. Each creature there that fails a Wisdom save becomes charmed and incapacitated for the duration.'),
  'Life Transference': SP(3,'Necromancy','1 action','30 feet','V, S','Instantaneous','You channel your own vitality into someone else\u2019s wounds. You take 4d8 necrotic damage that can\u2019t be reduced in any way, and one creature you can see within range regains hit points equal to twice that amount.','The healing increases by 2d8 for each slot level above 3rd.'),
  'Enemies Abound': SP(3,'Enchantment','1 action','90 feet','V','Concentration, up to 1 minute','You reach into a creature\u2019s mind and force an Intelligence save, automatically succeeding if it\u2019s immune to being frightened. On a failure, it can no longer tell friend from foe, treating every creature it can see as an enemy for the duration.'),
  'Flame Arrows': SP(3,'Transmutation','1 action','Touch','V, S','Concentration, up to 1 hour','You touch a quiver and enchant up to twelve pieces of ammunition inside it. The next time one of them hits a target in a ranged weapon attack, it deals an extra 1d6 fire damage before its magic fades. The spell ends once all twelve pieces have been drawn and used.','You can enchant an extra dozen pieces of ammunition for each slot level above 3rd.'),
  'Tidal Wave': SP(3,'Conjuration','1 action','120 feet','V, S, M','Instantaneous','You summon a surging wall of water that crashes down across an area up to 30 feet long, 10 feet wide, and 10 feet tall. Everyone caught in it rolls a Dexterity save: failure means 4d8 bludgeoning damage and being knocked prone, while success halves the damage and keeps them standing. The water then rushes outward, dousing any unshielded fire in the area and within 30 feet of it.','Casting this at 6th level or higher sends out an extra wave for every 3 slot levels above 3rd, up to three waves total at 9th level. Any Huge or smaller creature that fails its save against a second or third wave also picks up a level of exhaustion.'),
  'Fear': SP(3,'Illusion','1 action','Self (30-foot cone)','V, S, M','Concentration, up to 1 minute','You project a phantasmal image of a creature\u2019s worst fears. Each creature in the cone must drop what it\u2019s holding and become frightened, using its turns to flee from you.'),
  'Dispel Magic': SP(3,'Abjuration','1 action','120 feet','V, S','Instantaneous','You attempt to end one spell active on a creature, object, or magical effect you can see, automatically succeeding against spells of 3rd level or lower.'),
  'Speak with Plants': SP(3,'Transmutation','1 action','Self','V, S','10 minutes','You imbue plants within 30 feet with limited sentience, letting them ask you for water or sunlight, and letting you request them to grasp, entangle, or part for creatures.'),
  'Clairvoyance': SP(3,'Divination','10 minutes','1 mile','V, S, M','Concentration, up to 10 minutes','You create an invisible sensor within range, letting you see or hear (your choice) through it as though you were there.'),
  'Stinking Cloud': SP(3,'Conjuration','1 action','90 feet','V, S, M','Concentration, up to 1 minute','You create a 20-foot-radius sphere of nauseating gas. Any creature there that fails a Constitution save spends its turn retching and reeling, unable to act.'),
  'Spirit Guardians': SP(3,'Conjuration','1 action','Self (15-foot radius)','V, S, M','Concentration, up to 10 minutes','Protective spirits flit around you. Any creature you designate as an enemy that enters or starts its turn there takes 3d8 radiant or necrotic damage (your choice) on a failed Wisdom save, half as much on a success.','The damage increases by 1d8 for each slot level above 3rd.'),
  'Revivify': SP(3,'Necromancy','1 action','Touch','V, S, M','Instantaneous','You touch a creature that has died within the last minute, and it returns to life with 1 hit point, though this doesn\u2019t restore missing body parts.'),
  'Mass Healing Word': SP(3,'Evocation','1 bonus action','60 feet','V','Instantaneous','Up to six creatures of your choice that you can see regain 1d4 + your spellcasting ability modifier hit points.','The healing increases by 1d4 for each slot level above 3rd.'),
  'Beacon of Hope': SP(3,'Abjuration','1 action','30 feet','V, S','Concentration, up to 1 minute','Chosen creatures gain advantage on Wisdom saves and death saves, and regain the maximum possible from any healing they receive, for the duration.'),
  'Remove Curse': SP(3,'Abjuration','1 action','Touch','V, S','Instantaneous','You touch a creature and end all curses affecting it, or if touching a cursed object, break its curse.'),
  'Call Lightning': SP(3,'Conjuration','1 action','120 feet','V, S','Concentration, up to 10 minutes','A storm cloud forms above the battlefield. Each turn you can call down a bolt of lightning to strike a point you choose, dealing 3d10 lightning damage to creatures within 5 feet on a failed Dexterity save, half as much on a success.','The damage increases by 1d10 for each slot level above 3rd.'),
  'Plant Growth': SP(3,'Transmutation','1 action or 8 hours','150 feet','V, S','Instantaneous','You either overgrow a 100-foot-radius area with thick vegetation, making it difficult terrain, or enrich the plant life of a much larger area to yield twice the normal food.'),
  'Conjure Animals': SP(3,'Conjuration','1 action','60 feet','V, S','Concentration, up to 1 hour','You summon fey spirits that take the form of beasts, appearing as one creature of challenge rating 2 or lower, or several smaller beasts, that fight on your side.'),
  'Sleet Storm': SP(3,'Conjuration','1 action','150 feet','V, S, M','Concentration, up to 1 minute','Freezing rain and sleet fall in a 40-foot-radius cylinder, heavily obscuring the area, coating the ground in slick ice, and possibly knocking prone anyone that enters.'),
  'Fireball': SP(3,'Evocation','1 action','150 feet','V, S, M','Instantaneous','A bright streak flashes to a point you choose, then blossoms into a 20-foot-radius explosion, dealing 8d6 fire damage to each creature there on a failed Dexterity save, half as much on a success. Flammable objects there ignite.','The damage increases by 1d6 for each slot level above 3rd.'),
  'Lightning Bolt': SP(3,'Evocation','1 action','Self (100-foot line)','V, S, M','Instantaneous','A stroke of lightning forming a line 100 feet long and 5 feet wide blasts out from you, dealing 8d6 lightning damage to each creature there on a failed Dexterity save, half as much on a success.','The damage increases by 1d6 for each slot level above 3rd.'),
  'Haste': SP(3,'Transmutation','1 action','30 feet','V, S, M','Concentration, up to 1 minute','A willing creature\u2019s speed doubles, it gains +2 AC, advantage on Dexterity saves, and an additional action limited to attack, dash, disengage, hide, or use an object.'),
  'Counterspell': SP(3,'Reaction','60 feet','1 reaction','S','Instantaneous','You attempt to interrupt a creature in the process of casting a spell. If the interrupted spell is 3rd level or lower it fails automatically; otherwise you make an ability check to determine success.'),
  'Fly': SP(3,'Transmutation','1 action','Touch','V, S, M','Concentration, up to 10 minutes','You touch a willing creature, granting it a flying speed of 60 feet for the duration.'),
  'Hunger of Hadar': SP(3,'Conjuration','1 action','150 feet','V, S, M','Concentration, up to 1 minute','A 20-foot-radius zone of cold, dark emptiness appears. Anything there is lightly obscured, and any creature there at the start of its turn takes 2d6 cold damage and is attacked by grasping tendrils.'),
  'Aura of Vitality': SP(3,'Evocation','1 action','Self','V','Concentration, up to 1 minute','Healing energy radiates from you. As a bonus action each turn you can restore 2d6 hit points to a creature within 30 feet.'),
  'Conjure Barrage': SP(3,'Conjuration','1 action','Self (60-foot cone)','V, S, M','Instantaneous','You throw a nonmagical weapon or fire a piece of nonmagical ammunition into the air to create a cone of identical weapons. Each creature in the area takes 3d8 damage of a type appropriate to the weapon, or half as much on a successful Dexterity save.'),
  'Blinding Smite': SP(3,'Evocation','1 bonus action','Self','V','Concentration, up to 1 minute','The next time you hit with a melee weapon attack before the spell ends, your weapon flares with light, dealing an extra 3d8 radiant damage and potentially blinding the target.'),
  'Wind Wall': SP(3,'Evocation','1 action','120 feet','V, S, M','Concentration, up to 1 minute','A wall of strong wind rises, deflecting arrows and other ordinary projectiles, and dealing 3d8 bludgeoning damage to anyone who tries to force their way through it on a failed Dexterity save, half as much on a success.'),
  'Lightning Arrow': SP(3,'Transmutation','1 bonus action','Self','V','Concentration, up to 1 hour','The next time you make a ranged weapon attack, the ammunition transforms into a bolt of lightning, dealing 4d8 lightning damage to the target and lesser damage to nearby creatures on a hit.','The damage increases by 1d8 for each slot level above 3rd.'),
  'Animate Dead': SP(3,'Necromancy','1 minute','10 feet','V, S, M','Instantaneous','This spell reanimates a corpse or bones into a skeleton or zombie under your control, obeying your verbal commands as best it can.'),
  'Bestow Curse': SP(3,'Necromancy','1 action','Touch','V, S','Concentration, up to 1 minute','You touch a creature, which must succeed on a Wisdom save or be cursed with one of several effects of your choice, such as disadvantage on checks and attacks with a chosen ability, or an extra 1d8 necrotic damage whenever you hit it with a weapon attack.'),
  'Blink': SP(3,'Transmutation','1 action','Self','V, S','1 minute','Roll a d20 at the end of each of your turns; on an 11 or higher, you vanish to the Ethereal Plane until your next turn, becoming difficult to target.'),
  'Create Food and Water': SP(3,'Conjuration','1 action','30 feet','V, S','Instantaneous','You create enough food and water to sustain up to 15 humanoids or 5 steeds for 24 hours.'),
  'Crusader\u2019s Mantle': SP(3,'Evocation','1 action','Self','V','Concentration, up to 1 minute','Sacred power radiates from you in a 30-foot radius, causing weapon attacks by you and allies there to deal an extra 1d4 radiant damage on a hit.'),
  'Daylight': SP(3,'Evocation','1 action','60 feet','V, S','1 hour','A 60-foot-radius sphere of bright sunlight spreads out from a point you choose, which can dispel magical darkness and harm certain creatures vulnerable to sunlight.'),
  'Elemental Weapon': SP(3,'Transmutation','1 action','Touch','V, S','Concentration, up to 1 hour','A nonmagical weapon you touch becomes magical, gaining a +1 bonus to attack rolls and dealing an extra 1d4 damage of an elemental type you choose (acid, cold, fire, lightning, or thunder).','At 5th level the bonus becomes +2 and the extra damage 2d4; at 7th level, +3 and 3d4.'),
  'Feign Death': SP(3,'Necromancy','1 action','Touch','V, S, M','1 hour','You touch a willing creature and put it into a cataleptic state indistinguishable from death, granting resistance to all damage except psychic for the duration.'),
  'Gaseous Form': SP(3,'Transmutation','1 action','Touch','V, S, M','Concentration, up to 1 hour','You transform a willing creature into a misty cloud, resistant to nonmagical damage, able to fly slowly and squeeze through tiny gaps.'),
  'Glyph of Warding': SP(3,'Abjuration','1 hour','Touch','V, S, M','Until dispelled or triggered','You inscribe a glyph on a surface or object that unleashes a magical effect when triggered, whether an explosive rune or a spell you cast into it.'),
  'Magic Circle': SP(3,'Abjuration','1 minute','10 feet','V, S, M','1 hour','You create a 10-foot-radius cylinder of magical energy that hinders specific types of creatures you choose from entering or attacking through it.'),
  'Major Image': SP(3,'Illusion','1 action','120 feet','V, S, M','Concentration, up to 10 minutes','You create a realistic illusion of an object, creature, or phenomenon in a 20-foot cube, including sound, smell, and thermal effects.'),
  'Meld into Stone': SP(3,'Transmutation','1 action','Touch','V, S','8 hours','You step into a stone object or surface large enough to fully contain your body, merging with it and becoming indistinguishable from ordinary stone.'),
  'Nondetection': SP(3,'Abjuration','1 action','Touch','V, S, M','8 hours','For the duration, you hide a target from divination magic, preventing it from being targeted by such magic or perceived through magical scrying sensors.'),
  'Phantom Steed': SP(3,'Illusion','1 minute','30 feet','V, S','1 hour','A large, quasi-real, horselike creature appears on the ground, which you or a creature you choose can ride, moving quickly over land.'),
  'Protection from Energy': SP(3,'Abjuration','1 action','Touch','V, S','Concentration, up to 1 hour','You touch a willing creature to grant it resistance to one damage type of your choice: acid, cold, fire, lightning, or thunder.'),
  'Sending': SP(3,'Evocation','1 action','Unlimited','V, S, M','1 round','You send a short telepathic message of 25 words or fewer to a creature you know, wherever it is, and it can send a brief reply.'),
  'Slow': SP(3,'Transmutation','1 action','120 feet','V, S, M','Concentration, up to 1 minute','You alter time around up to six creatures, halving their speed and imposing penalties to AC, Dexterity saves, and their available actions each turn.'),
  'Speak with Dead': SP(3,'Necromancy','1 action','10 feet','V, S, M','10 minutes','You grant a corpse the semblance of life and intelligence, letting you ask it up to five questions which it answers to the best of its knowledge.'),
  'Tongues': SP(3,'Divination','1 action','Touch','V, M','1 hour','This spell grants the creature you touch the ability to understand any spoken language it hears, and to be understood by any creature that knows at least one language.'),
  'Vampiric Touch': SP(3,'Necromancy','1 action','Self','V, S','Concentration, up to 1 minute','Your touch deals 3d6 necrotic damage and you regain half the damage dealt as hit points, repeatable each turn you maintain concentration.','The damage increases by 1d6 for each slot level above 3rd.'),
  'Water Breathing': SP(3,'Transmutation','1 action','30 feet','V, S, M','24 hours','This spell grants up to ten willing creatures the ability to breathe underwater for the duration.'),
  'Water Walk': SP(3,'Transmutation','1 action','30 feet','V, S, M','1 hour','This spell grants up to ten willing creatures the ability to move across any liquid surface as though it were solid ground for the duration.'),
  'Leomund\u2019s Tiny Hut': SP(3,'Evocation','1 minute','Self (10-foot-radius hemisphere)','V, S, M','8 hours','A shimmering, opaque dome of force springs up around you, blocking weather and physical entry while letting you and up to nine others rest safely inside.'),

  // ---- Level 4 ----
  'Elemental Bane': SP(4,'Transmutation','1 action','90 feet','V, S','Concentration, up to 1 minute','You choose a creature you can see within range and a damage type: acid, cold, fire, lightning, or thunder. Unless it succeeds on a Constitution save, the target is affected for the duration. The first time each turn it takes damage of the chosen type, it takes an extra 2d6 damage of that type, and it loses any resistance it has to that damage type while the spell lasts.','The extra damage increases by 1d6 for each slot level above 4th.'),
  'Find Greater Steed': SP(4,'Conjuration','10 minutes','30 feet','V, S','Instantaneous','You summon a spirit that takes the form of an unusually strong, intelligent, and loyal mount, choosing whether it appears as a dragonnel, griffon, pegasus, peryton, dire wolf, rhinoceros, or saber-toothed tiger, and whether its true nature is celestial, fey, or fiendish. It uses the normal statistics for that creature, shares your initiative, fights as an ally, and can be ridden and communicated with telepathically within a mile. It vanishes if it drops to 0 hit points or if you dismiss it as an action, and casting this spell again while it\u2019s gone brings it back at full health. You can\u2019t have more than one mount bound this way at a time.'),
  'Shadow of Moil': SP(4,'Necromancy','1 action','Self','V, S, M','Concentration, up to 1 minute','Flame-like shadows wreathe your body for as long as the spell lasts, leaving you heavily obscured to anyone looking at you. The shadows turn dim light within 10 feet of you into darkness, and bright light in that same area into dim light. You gain resistance to radiant damage, and whenever a creature within 10 feet of you hits you with an attack, the shadows lash back at it for 2d8 necrotic damage.'),
  'Sickening Radiance': SP(4,'Evocation','1 action','120 feet','V, S','Concentration, up to 10 minutes','A dim green light spreads through a 30-foot sphere centered on a point you choose, seeping around corners and lingering for as long as you concentrate. Anyone who enters the area for the first time on their turn, or starts their turn there, must succeed on a Constitution save or take 4d10 radiant damage, gain a level of exhaustion, and begin shedding a faint light of their own that strips away any invisibility they\u2019re relying on.'),
  'Polymorph': SP(4,'Transmutation','1 action','60 feet','V, S, M','Concentration, up to 1 hour','You transform a creature into a new form (a beast of challenge rating equal to or less than its level) unless it is unwilling and succeeds on a Wisdom saving throw. The target\u2019s game statistics are replaced by the beast\u2019s, though its mind and personality remain.'),
  'Arcane Eye': SP(4,'Divination','1 action','30 feet','V, S, M','Concentration, up to 1 hour','You create an invisible, magical eye that hovers and flies at your command, letting you see through it as if you were there.'),
  'Evard\u2019s Black Tentacles': SP(4,'Conjuration','1 action','90 feet','V, S, M','Concentration, up to 1 minute','Squirming, ropelike tentacles fill a 20-foot square, dealing 3d6 bludgeoning damage and restraining any creature there on a failed Dexterity save.'),
  'Blight': SP(4,'Necromancy','1 action','30 feet','V, S','Instantaneous','Necromantic energy sears a creature, dealing 8d8 necrotic damage on a failed Constitution save, or half as much on a success. Plants take maximum damage.'),
  'Compulsion': SP(4,'Enchantment','1 action','30 feet','V, S','Concentration, up to 1 minute','You compel a creature you can see to move in a direction of your choice on its turn, unless it succeeds on a Wisdom save.'),
  'Conjure Minor Elementals': SP(4,'Conjuration','1 minute','90 feet','V, S','Concentration, up to 1 hour','You summon lesser elemental spirits, appearing as one creature of challenge rating 2 or lower, or several smaller elementals, that fight on your side.'),
  'Conjure Woodland Beings': SP(4,'Conjuration','1 action','60 feet','V, S, M','Concentration, up to 1 hour','You summon fey creatures of the forest, appearing as one creature of challenge rating 2 or lower, or several smaller fey, that fight on your side.'),
  'Control Water': SP(4,'Transmutation','1 action','300 feet','V, S, M','Concentration, up to 10 minutes','You control water in an area, choosing to flood it, part it, redirect a current, or create a whirlpool, up to a specified volume.'),
  'Divination': SP(4,'Divination','1 action','Self','V, S, M','Instantaneous','You contact a deity or its servants to receive a truthful, though sometimes cryptic, answer to a single question about a specific goal, event, or activity within 7 days.'),
  'Dominate Beast': SP(4,'Enchantment','1 action','60 feet','V, S','Concentration, up to 1 minute','You attempt to beguile a beast you can see, forcing it to make a Wisdom save or become charmed, letting you issue it commands telepathically.'),
  'Fabricate': SP(4,'Transmutation','10 minutes','120 feet','V, S','Instantaneous','You convert raw materials into products of the same material, such as turning wood into a bridge or cloth into a tent, all in an instant.'),
  'Mordenkainen\u2019s Faithful Hound': SP(4,'Conjuration','1 action','30 feet','V, S, M','8 hours','You conjure an invisible watchdog in an unoccupied space, which barks loudly at intruders and can bite anyone else who approaches.'),
  'Fire Shield': SP(4,'Evocation','1 action','Self','V, S, M','10 minutes','Wispy flames wreathe your body, shedding light and granting resistance to either cold or fire damage (your choice), while dealing 2d8 fire damage back to anyone who hits you with a melee attack.'),
  'Giant Insect': SP(4,'Transmutation','1 action','30 feet','V, S','Concentration, up to 10 minutes','You transform up to ten centipedes, three spiders, five wasps, or one scorpion within range into giant versions of themselves for the duration.'),
  'Hallucinatory Terrain': SP(4,'Illusion','10 minutes','300 feet','V, S, M','24 hours','You make a 150-foot cube of terrain look, sound, and smell like different terrain, such as turning a field into a swamp, though physical interaction reveals the illusion.'),
  'Locate Creature': SP(4,'Divination','1 action','Self','V, S, M','Concentration, up to 1 hour','You sense the direction to a specific creature you know or a creature of a specific kind, as long as it\u2019s within a mile and not behind lead.'),
  'Phantasmal Killer': SP(4,'Illusion','1 action','120 feet','V, S','Concentration, up to 1 minute','You tap into a creature\u2019s deepest fears, creating an illusory monster only it can see, dealing 4d10 psychic damage each turn it fails a Wisdom save.'),
  'Mordenkainen\u2019s Private Sanctum': SP(4,'Abjuration','10 minutes','120 feet','V, S, M','24 hours','You make an area within a 100-foot cube magically secure against sound, sight, teleportation, and other forms of intrusion you choose.'),
  'Otiluke\u2019s Resilient Sphere': SP(4,'Evocation','1 action','30 feet','V, S, M','Concentration, up to 1 minute','A sphere of shimmering force encloses a creature or object, protecting it from all outside damage and attacks and preventing it from leaving. An unwilling creature can avoid the effect with a successful Dexterity saving throw.'),
  'Leomund\u2019s Secret Chest': SP(4,'Conjuration','1 action','Touch','V, S, M','Instantaneous','You hide a Tiny chest and its contents on the Ethereal Plane, retrievable at will as an action, so long as you have the chest\u2019s replica.'),
  'Stone Shape': SP(4,'Transmutation','1 action','Touch','V, S, M','Instantaneous','You touch a stone object or surface no larger than 5 feet in any dimension, reshaping it into any form you like within that volume.'),
  'Wall of Fire': SP(4,'Evocation','1 action','120 feet','V, S, M','Concentration, up to 1 minute','You create a wall of fire on a solid surface, dealing 5d8 fire damage to creatures that end their turn within 10 feet of one side you designate.'),
  'Greater Invisibility': SP(4,'Illusion','1 action','Touch','V, S','Concentration, up to 1 minute','You or a creature you touch becomes invisible for the duration, even while attacking or casting spells.'),
  'Dimension Door': SP(4,'Conjuration','1 action','500 feet','V','Instantaneous','You teleport yourself, and optionally one willing creature within 5 feet, to any spot within range that you can visualize, with no need for line of sight.'),
  'Confusion': SP(4,'Enchantment','1 action','90 feet','V, S, M','Concentration, up to 1 minute','Creatures in a 10-foot-radius sphere that fail a Wisdom save have their minds wrenched, rolling on a table each turn to determine erratic, sometimes harmful behavior.'),
  'Freedom of Movement': SP(4,'Abjuration','1 action','Touch','V, S, M','1 hour','You touch a willing creature, granting it immunity to being paralyzed or restrained, and its movement is never reduced by difficult terrain for the duration.'),
  'Guardian of Faith': SP(4,'Conjuration','1 action','30 feet','V','8 hours','A Large spectral guardian appears and hovers for the duration, dealing 20 radiant damage to any hostile creature that moves within 10 feet of it for the first time on a turn, until it has dealt 60 total damage.'),
  'Death Ward': SP(4,'Abjuration','1 action','Touch','V, S','8 hours','You touch a willing creature, granting it a ward against death: the first time it would drop to 0 hit points, it instead drops to 1 hit point instead.'),
  'Aura of Life': SP(4,'Abjuration','1 action','Self (30-foot radius)','V','Concentration, up to 10 minutes','While this aura is active, you and nonhostile creatures within it have resistance to necrotic damage, and their hit point maximums can\u2019t be reduced. A nonhostile creature at 0 hit points that starts its turn in the aura regains 1 hit point.'),
  'Aura of Purity': SP(4,'Abjuration','1 action','Self (30-foot radius)','V','Concentration, up to 10 minutes','While this aura is active, you and nonhostile creatures within it can\u2019t become diseased, have resistance to poison damage, and have advantage on saves against conditions other than exhaustion.'),
  'Banishment': SP(4,'Abjuration','1 action','60 feet','V, S, M','Concentration, up to 1 minute','You attempt to send one creature you can see to a harmless demiplane, removing it from the fight for the duration; if it\u2019s native to another plane, the banishment can become permanent.','You can target one additional creature for each slot level above 4th.'),
  'Staggering Smite': SP(4,'Evocation','1 bonus action','Self','V','Concentration, up to 1 minute','The next time you hit a creature with a melee weapon attack before this spell ends, the attack deals an extra 4d6 psychic damage. The target must also succeed on a Wisdom save or have disadvantage on attack rolls and ability checks and be unable to take reactions until the end of its next turn.'),
  'Ice Storm': SP(4,'Evocation','1 action','300 feet','V, S, M','Instantaneous','A hail of rock-hard ice pounds a 20-foot-radius cylinder, dealing 2d8 bludgeoning and 4d6 cold damage to each creature there on a failed Dexterity save, half as much on a success.','The bludgeoning damage increases by 1d8 for each slot level above 4th.'),
  'Stoneskin': SP(4,'Abjuration','1 action','Touch','V, S, M','Concentration, up to 1 hour','A willing creature\u2019s skin has a stony appearance for the duration, granting resistance to nonmagical bludgeoning, piercing, and slashing damage.'),
  'Grasping Vine': SP(4,'Conjuration','1 bonus action','30 feet','V, S','Concentration, up to 1 minute','You conjure a vine that lashes toward a creature you can see, pulling it up to 20 feet toward you on a failed Strength save; you can repeat this on later turns.'),

  // ---- Level 5 ----
  'Skill Empowerment': SP(5,'Transmutation','1 action','Touch','V, S, M','Instantaneous','You touch a willing creature and sharpen its instincts in a skill of your choice, granting it expertise: until the spell ends, it doubles its proficiency bonus for any ability check using that skill, provided it\u2019s already proficient in it.'),
  'Maelstrom': SP(5,'Conjuration','1 action','120 feet','V, S','Concentration, up to 1 minute','A churning column of water rises up to five feet deep in a 30-foot radius around a point you choose, on the ground or in a body of water. The area becomes difficult terrain, and anyone who starts their turn there must succeed on a Strength save or take 6d6 bludgeoning damage and get dragged 10 feet toward the center.'),
  'Mislead': SP(5,'Illusion','1 action','Self','S','Concentration, up to 1 hour','You become invisible, and at the same time an illusory double of yourself appears where you stood, which you can move and speak through for the duration.'),
  'Legend Lore': SP(5,'Divination','10 minutes','Self','V, S, M','Instantaneous','You speak the name, or hold an object or place a hand on a location, of a person, place, or object of legend, and learn some important lore about it.'),
  'Mass Cure Wounds': SP(5,'Evocation','1 action','60 feet','V, S','Instantaneous','A burst of healing energy washes over up to six creatures in a 30-foot sphere, each regaining 3d8 + your spellcasting ability modifier hit points.','The healing increases by 1d8 for each slot level above 5th.'),
  'Modify Memory': SP(5,'Enchantment','1 action','30 feet','V, S','Concentration, up to 1 minute','You attempt to reshape a creature\u2019s memory of an event from the last 24 hours, eliminating it, changing details, or implanting a false memory.'),
  'Dream': SP(5,'Illusion','1 minute','Special','V, S, M','8 hours','You or a willing companion send a message to a target creature through its dreams, and can also cause it to have a nightmare that leaves it fatigued if you wish.'),
  'Flame Strike': SP(5,'Evocation','1 action','60 feet','V, S, M','Instantaneous','A vertical column of divine fire roars down in a 10-foot-radius cylinder, dealing 4d6 fire damage and 4d6 radiant damage to each creature there on a failed Dexterity save, half as much on a success.','Either damage type increases by 1d6 for each slot level above 5th.'),
  'Raise Dead': SP(5,'Necromancy','1 hour','Touch','V, S, M','Instantaneous','You return a creature that has died within the last 10 days to life, restoring it to 1 hit point, so long as its soul is willing and free.'),
  'Greater Restoration': SP(5,'Abjuration','1 action','Touch','V, S, M','Instantaneous','You touch a creature and can end one of the following: exhaustion, a curse, a reduced ability score, or petrification, among other powerful negative effects.'),
  'Insect Plague': SP(5,'Conjuration','1 action','300 feet','V, S, M','Concentration, up to 10 minutes','A swarm of biting, stinging insects fills a 20-foot-radius sphere, dealing 4d10 piercing damage to each creature there on a failed Constitution save, half as much on a success.','The damage increases by 1d10 for each slot level above 5th.'),
  'Tree Stride': SP(5,'Conjuration','1 action','Self','V, S','Concentration, up to 1 minute','You step into a tree and can then, as a bonus action, step out of any other tree of the same species within 500 feet, effectively teleporting between them.'),
  'Wall of Stone': SP(5,'Evocation','1 action','120 feet','V, S, M','Concentration, up to 10 minutes','You conjure a nonmagical wall of solid stone up to 10 panels, which can be shaped to form angles and can include openings.'),
  'Cone of Cold': SP(5,'Evocation','1 action','Self (60-foot cone)','V, S, M','Instantaneous','A blast of cold air erupts from your hands, dealing 8d8 cold damage to each creature in the cone on a failed Constitution save, half as much on a success.','The damage increases by 1d8 for each slot level above 5th.'),
  'Wall of Force': SP(5,'Evocation','1 action','120 feet','V, S, M','Concentration, up to 10 minutes','An invisible wall of force springs into existence, made of ten panels that can\u2019t be physically or magically passed through, and is immune to damage.'),
  'Telekinesis': SP(5,'Transmutation','1 action','60 feet','V, S','Concentration, up to 10 minutes','You gain the ability to move or manipulate creatures or objects at range using your mind, either grappling a creature or moving an object up to 30 feet each turn.'),
  'Hold Monster': SP(5,'Enchantment','1 action','90 feet','V, S, M','Concentration, up to 1 minute','A creature you can see must succeed a Wisdom save or be paralyzed for the duration, repeating the save at the end of each of its turns.','You can target one additional creature for each slot level above 5th.'),
  'Contact Other Plane': SP(5,'Divination','1 minute','Self','V','1 minute','You mentally contact a powerful extraplanar entity, risking your sanity, in order to ask it up to five questions it can answer.'),
  'Circle of Power': SP(5,'Abjuration','1 action','Self (30-foot radius)','V','Concentration, up to 10 minutes','Divine energy surrounds you and your allies within 30 feet, granting advantage on saves against spells, and halving the effect of a failed save against a spell that only does half on a success.'),
  'Steel Wind Strike': SP(5,'Conjuration','1 action','30 feet','S, M','Instantaneous','You flourish a weapon and then teleport to up to five creatures you can see within range, making a melee attack against each and dealing 6d10 force damage total split among your hits, then teleporting next to one of them.'),
  'Animate Objects': SP(5,'Transmutation','1 action','120 feet','V, S','Concentration, up to 1 minute','Up to ten nonmagical objects animate at your command, becoming animated constructs that fight for you until the spell ends or they\u2019re destroyed.'),
  'Antilife Shell': SP(5,'Abjuration','1 action','Self','V, S','Concentration, up to 1 hour','A shimmering barrier extends out from you in a 10-foot radius, preventing most living creatures from passing through or reaching in to attack.'),
  'Bigby\u2019s Hand': SP(5,'Evocation','1 action','120 feet','V, S, M','Concentration, up to 1 minute','You create a Large hand of shimmering force that obeys your commands each turn: it can grasp a creature (Strength save to avoid being restrained), push or strike one (Strength or Dexterity save, or 4d8 force damage on a hit), or interpose itself as a shield.'),
  'Awaken': SP(5,'Transmutation','8 hours','Touch','V, S, M','Instantaneous','You touch a beast or plant and infuse it with a spark of intelligence, granting it an Intelligence of 10 and the ability to speak one language you know.'),
  'Cloudkill': SP(5,'Conjuration','1 action','120 feet','V, S','Concentration, up to 10 minutes','You create a 20-foot-radius sphere of poisonous yellow-green fog, dealing 5d8 poison damage on a failed Constitution save to anyone inside, and moves away from you each turn.'),
  'Conjure Volley': SP(5,'Conjuration','1 action','150 feet','V, S, M','Instantaneous','You fire a piece of nonmagical ammunition or throw a nonmagical weapon into the air to create a hail of identical weapons that shower down in a 40-foot-radius, 20-foot-tall cylinder. Each creature in the area takes 8d8 damage of a type appropriate to the weapon, or half as much on a successful Dexterity save.'),
  'Swift Quiver': SP(5,'Transmutation','1 bonus action','Touch','V, S, M','Concentration, up to 1 minute','You transmute a quiver so it produces an endless supply of nonmagical ammunition. Whenever you make a ranged weapon attack using ammunition from the quiver, it creates more to replace what was used, and you can use a bonus action to make two additional attacks with a weapon that uses that ammunition.'),
  'Commune': SP(5,'Divination','1 minute','Self','V, S, M','1 minute','You contact a deity or its servants, asking up to three yes-or-no questions within the duration, which are answered to the best of the entity\u2019s knowledge.'),
  'Commune with Nature': SP(5,'Divination','1 minute','Self','V, S','Instantaneous','You become one with nature, gaining knowledge of the surrounding terrain out to several miles, such as the location of settlements, bodies of water, and creatures.'),
  'Conjure Elemental': SP(5,'Conjuration','1 minute','90 feet','V, S, M','Concentration, up to 1 hour','You summon an elemental spirit, appearing as a creature of challenge rating 5 or lower native to a plane you choose, that fights on your side.'),
  'Contagion': SP(5,'Necromancy','1 action','Touch','V, S','7 days','Your touch inflicts a horrible disease on a creature, unless it succeeds on repeated Constitution saves, imposing worsening effects over time.'),
  'Creation': SP(5,'Illusion','1 minute','30 feet','V, S, M','Special','You pull wisps of shadow material to create an object of vegetable or mineral matter within range, its size limited to a 5-foot cube.'),
  'Dispel Evil and Good': SP(5,'Abjuration','1 action','Self','V, S, M','Concentration, up to 1 minute','Aberrations, celestials, elementals, fey, fiends, and undead have disadvantage on attacks against you, and you can attempt to break a charm, paralysis, or possession affecting a creature.'),
  'Dominate Person': SP(5,'Enchantment','1 action','60 feet','V, S','Concentration, up to 1 minute','You attempt to beguile a humanoid you can see, forcing it to make a Wisdom save or become charmed, letting you issue it commands telepathically.'),
  'Banishing Smite': SP(5,'Abjuration','1 bonus action','Self','V','Concentration, up to 1 minute','The next time you hit a creature with a weapon attack before the spell ends, your weapon deals an extra 5d10 force damage. If this damage reduces the target (other than a construct or undead) to 50 hit points or fewer, it is banished to a harmless demiplane for the duration, with no saving throw allowed against the banishment.'),
  'Destructive Wave': SP(5,'Evocation','1 action','Self (30-foot radius)','V','Instantaneous','You call forth divine energy that erupts around you. Each creature you choose within range takes 5d6 thunder damage plus 5d6 radiant or necrotic damage (your choice) and is knocked prone, unless it succeeds on a Constitution save, which halves the damage and avoids the prone effect.'),
  'Geas': SP(5,'Enchantment','1 minute','60 feet','V','30 days','You place a magical command on a creature, compelling it to carry out a service or refrain from an action of your choice, unless it succeeds on a Wisdom saving throw. While the effect lasts, the target takes 5d10 psychic damage each time it acts in a way that directly disobeys your command, and can\u2019t take that action again while affected.'),
  'Holy Weapon': SP(5,'Evocation','1 bonus action','Touch','V, S','Concentration, up to 1 hour','You imbue a weapon you touch with holy power. Until the spell ends, the weapon becomes magical if it isn\u2019t already, sheds bright light in a 30-foot radius and dim light for another 30 feet, and deals an extra 2d8 radiant damage on a hit. You can dismiss the spell early as a bonus action to unleash a burst of radiance: each creature you choose within 30 feet takes 4d8 radiant damage and is blinded for 1 minute on a failed Constitution save, or takes half damage and isn\u2019t blinded on a success.'),
  'Hallow': SP(5,'Evocation','24 hours','Touch','V, S, M','Until dispelled','You touch a point and imbue an area up to a 60-foot radius with sanctity, warding off certain creature types and optionally binding an additional magical effect to the area.'),
  'Passwall': SP(5,'Transmutation','1 action','30 feet','V, S, M','1 hour','A passage appears at a point you choose that you can see on a wooden, plaster, or stone surface, remaining until the spell ends.'),
  'Planar Binding': SP(5,'Abjuration','1 hour','60 feet','V, S, M','24 hours','You attempt to bind a celestial, elemental, fey, or fiend to your service, forcing it to make a Charisma save or be magically bound to serve you for the duration.'),
  'Reincarnate': SP(5,'Transmutation','1 hour','Touch','V, S, M','Instantaneous','You touch a creature that has died within the last day, and it is reborn in a new body of a random humanoid race, its personality and memories intact.'),
  'Scrying': SP(5,'Divination','10 minutes','Self','V, S, M','Concentration, up to 10 minutes','You can see and hear a particular creature you choose, wherever it is, so long as it fails a Wisdom save, using a scrying sensor that appears near it.'),
  'Seeming': SP(5,'Illusion','1 action','30 feet','V, S','8 hours','This spell disguises the appearance of any number of creatures you choose, changing their apparent height, weight, features, and clothing for the duration.'),
  'Rary\u2019s Telepathic Bond': SP(5,'Divination','1 action','30 feet','V, S, M','1 hour','You forge a telepathic link among up to eight willing creatures, letting them communicate silently with each other for the duration, regardless of language.'),
  'Teleportation Circle': SP(5,'Conjuration','1 minute','10 feet','V, M','1 round','You draw a 10-foot-diameter circle that opens a portal to a permanent teleportation circle you\u2019ve seen, letting creatures step through to that location.'),

  // ---- Level 6 ----
  'Scatter': SP(6,'Conjuration','1 action','30 feet','V, S, M','Instantaneous','The air quivers around up to five creatures of your choice that you can see within range. Any unwilling target gets a Wisdom save to resist. Everyone affected is teleported to a separate unoccupied space of your choice that you can see within 120 feet of you, provided it\u2019s somewhere with solid ground or floor beneath it.'),
  'Move Earth': SP(6,'Transmutation','1 action','120 feet','V, S, M','Concentration, up to 2 hours','You choose an area of terrain no larger than 40 feet on a side within range, which you can reshape over time, digging trenches, raising hills, and more.'),
  'Blade Barrier': SP(6,'Evocation','1 action','90 feet','V, S','Concentration, up to 10 minutes','You create a wall of whirling, razor-sharp blades in a line or ring, dealing 6d10 slashing damage to anyone who tries to pass through it.'),
  'Arcane Gate': SP(6,'Conjuration','1 action','500 feet','V, S','Concentration, up to 10 minutes','You create linked teleportation portals, each a 10-foot circle. Anything that enters one portal instantly exits the other. You can choose the orientation of both portals, and can move each up to 10 feet as an action.'),
  'Chain Lightning': SP(6,'Evocation','1 action','150 feet','V, S, M','Instantaneous','You launch a bolt of lightning at a target, which arcs to up to three additional targets, each taking 10d8 lightning damage on a failed Dexterity save.'),
  'Circle of Death': SP(6,'Necromancy','1 action','150 feet','V, S, M','Instantaneous','A sphere of negative energy fills a 60-foot-radius area, dealing 8d6 necrotic damage to each creature there on a failed Constitution save, or half as much on a success.'),
  'Conjure Fey': SP(6,'Conjuration','1 minute','90 feet','V, S','Concentration, up to 1 hour','You summon a fey creature, appearing as one creature of challenge rating 6 or lower, or several smaller fey, that fights on your side.'),
  'Contingency': SP(6,'Evocation','10 minutes','Self','V, S, M','10 days','You choose a spell of 5th level or lower that targets you and stipulate a trigger, so that the spell automatically casts when the trigger occurs.'),
  'Create Undead': SP(6,'Necromancy','1 minute','10 feet','V, S, M','Instantaneous','You can create up to three ghouls, or more powerful undead at higher levels, from corpses, which serve you as long as you renew their control periodically.'),
  'Disintegrate': SP(6,'Transmutation','1 action','60 feet','V, S, M','Instantaneous','A thin green ray springs from your finger toward a target, which takes 10d6+40 force damage on a failed Dexterity saving throw, disintegrating entirely into dust if this reduces it to 0 hit points.'),
  'Eyebite': SP(6,'Necromancy','1 action','Self','V, S','Concentration, up to 1 minute','For the duration, you can use your action each turn to target one creature you can see, forcing a Wisdom save or become asleep, panicked, or sickened.'),
  'Drawmij\u2019s Instant Summons': SP(6,'Conjuration','1 minute','Touch','V, S, M','Until dispelled','You touch an object weighing 10 pounds or less, which you can then summon to your hand from any distance with a specific word as an action.'),
  'Find the Path': SP(6,'Divination','1 minute','Self','V, S, M','Concentration, up to 1 day','This spell lets you find the shortest, most direct physical route to a specific fixed location you name, so long as it exists on the same plane.'),
  'Flesh to Stone': SP(6,'Transmutation','1 action','60 feet','V, S, M','Concentration, up to 1 minute','You attempt to turn a creature into stone, restraining it on a failed Constitution save, and fully petrifying it after further failed saves.'),
  'Forbiddance': SP(6,'Abjuration','10 minutes','Touch','V, S, M','1 day','You create a ward against magical travel that blocks teleportation and planar travel into an area you designate, up to 40,000 square feet.'),
  'Otiluke\u2019s Freezing Sphere': SP(6,'Evocation','1 action','300 feet','V, S, M','Instantaneous','A frigid globe of blue-white energy flies to a point you choose, exploding into a 60-foot-radius sphere, dealing 10d6 cold damage to each creature there.'),
  'Globe of Invulnerability': SP(6,'Abjuration','1 action','Self','V, S, M','Concentration, up to 1 minute','An immobile, transparent sphere of force surrounds you, blocking spells of 5th level or lower cast from outside the sphere.'),
  'Guards and Wards': SP(6,'Abjuration','10 minutes','Touch','V, S, M','24 hours','This spell creates a magical ward over an area up to 2,500 square feet, layering multiple minor magical effects such as fog, locked doors, and false illusions.'),
  'Harm': SP(6,'Necromancy','1 action','60 feet','V, S','Instantaneous','You unleash a virulent magic that deals 14d6 necrotic damage to a creature on a failed Constitution save, reducing its hit point maximum by the same amount.'),
  'Heal': SP(6,'Evocation','1 action','60 feet','V, S','Instantaneous','A creature you can see is restored to full health, regaining 70 hit points, and any blindness or disease affecting it ends.'),
  'Heroes\u2019 Feast': SP(6,'Conjuration','10 minutes','30 feet','V, S, M','Instantaneous','You bring forth a great feast, which grants those who eat it immunity to poison and fear, advantage on Wisdom saves, and increased hit points for the next 24 hours.'),
  'Otto\u2019s Irresistible Dance': SP(6,'Enchantment','1 action','30 feet','V','Concentration, up to 1 minute','A creature you can see is compelled to begin a comical dance, unable to willingly stop, with disadvantage on Dexterity saves and attack rolls made against it.'),
  'Magic Jar': SP(6,'Necromancy','1 minute','Self','V, S, M','Until dispelled','Your body falls unconscious as your soul enters an object, from which you can attempt to possess a nearby humanoid; it can resist with a successful Wisdom saving throw. Your old body is left behind, breathing but helpless.'),
  'Mass Suggestion': SP(6,'Enchantment','1 action','60 feet','V, M','24 hours','You suggest a reasonable-sounding course of activity to up to twelve creatures you can see, which they follow as best they can unless obviously harmful.'),
  'Planar Ally': SP(6,'Conjuration','10 minutes','60 feet','V, S','Instantaneous','You beseech a celestial, elemental, or fiend for aid, which appears and can perform a task for you in exchange for an offering of treasure or service.'),
  'Programmed Illusion': SP(6,'Illusion','1 action','120 feet','V, S, M','Until dispelled','You create an illusion of an object, creature, or phenomenon that activates when a specific condition occurs, playing out as scripted for up to 5 minutes.'),
  'Sunbeam': SP(6,'Evocation','1 action','Self (60-foot line)','V, S, M','Concentration, up to 1 minute','A beam of brilliant light flashes out, dealing 6d8 radiant damage and potentially blinding creatures in the line, and can be re-triggered on later turns.'),
  'Transport via Plants': SP(6,'Conjuration','1 action','10 feet','V, S','1 round','This spell creates a magical link between a large plant near you and another plant you\u2019ve seen before, letting you and others step from one to the other.'),
  'True Seeing': SP(6,'Divination','1 action','Touch','V, S, M','1 hour','This spell gives a willing creature the ability to see in normal and magical darkness, see invisible creatures, see through illusions, and perceive the true form of shapechangers.'),
  'Wall of Ice': SP(6,'Evocation','1 action','120 feet','V, S, M','Concentration, up to 10 minutes','You create a wall of ice on a solid surface, which can also form as a hemispherical dome or sphere. Creatures in the wall\u2019s space when it appears take 10d6 cold damage on a failed Dexterity save, half as much on a success.'),
  'Wall of Thorns': SP(6,'Conjuration','1 action','120 feet','V, S, M','Concentration, up to 10 minutes','You create a wall of tangled brush bristling with thorns, dealing 7d8 piercing damage to any creature that forces its way through.'),
  'Wind Walk': SP(6,'Transmutation','1 minute','30 feet','V, S, M','8 hours','You and up to ten willing creatures within range transform into a gaseous form, gaining a flying speed of 300 feet per round for the duration.'),
  'Word of Recall': SP(6,'Conjuration','1 action','5 feet','V','Instantaneous','You and up to five willing creatures within 5 feet instantly teleport to a previously designated sanctuary, so long as you have prepared such a link.'),

  // ---- Level 7 ----
  'Mordenkainen\u2019s Sword': SP(7,'Evocation','1 action','60 feet','V, S, M','Concentration, up to 1 minute','You create a sword-shaped plane of force that hovers near a target of your choice, dealing 3d10 force damage each time you command it to attack.'),
  'Conjure Celestial': SP(7,'Conjuration','1 minute','90 feet','V, S','Concentration, up to 1 hour','You summon a celestial of challenge rating 4 or lower, which appears in an unoccupied space you can see and fights on your side for the duration.'),
  'Delayed Blast Fireball': SP(7,'Evocation','1 action','150 feet','V, S, M','Concentration, up to 1 minute','A beam of yellow light forms into a glowing bead that explodes into flame when the spell ends, dealing up to 12d6 fire damage, growing stronger the longer it\u2019s delayed.'),
  'Divine Word': SP(7,'Evocation','1 bonus action','30 feet','V','Instantaneous','You utter a divine word, forcing up to six creatures you can see within range to suffer an effect based on their remaining hit points, from deafness to instant banishment.'),
  'Etherealness': SP(7,'Transmutation','1 action','Self','V, S','Up to 8 hours','You step into the Ethereal Plane, becoming able to move in any direction and see and hear the Material Plane, though only within 60 feet.'),
  'Finger of Death': SP(7,'Necromancy','1 action','60 feet','V, S','Instantaneous','You send negative energy coursing through a creature, dealing 7d8+30 necrotic damage on a failed Constitution save; a humanoid slain this way rises as a zombie under your control.'),
  'Fire Storm': SP(7,'Evocation','1 action','150 feet','V, S','Instantaneous','A storm of fire fills up to ten 10-foot cubes you choose within range, dealing 7d10 fire damage to each creature there on a failed Dexterity save.'),
  'Forcecage': SP(7,'Evocation','1 action','100 feet','V, S, M','1 hour','An immobile, invisible cube of force springs into existence, either as a solid cage that blocks movement or a solid box that fully imprisons anything inside.'),
  'Mordenkainen\u2019s Magnificent Mansion': SP(7,'Conjuration','1 minute','300 feet','V, S, M','24 hours','You conjure an extradimensional dwelling that lasts for the duration, complete with furnishings and phantom servants to attend to you and your guests.'),
  'Mirage Arcane': SP(7,'Illusion','10 minutes','Sight','V, S','10 days','You make terrain in a large area look, sound, smell, and even feel like different terrain, transforming the landscape as thoroughly as major image transforms a small area.'),
  'Plane Shift': SP(7,'Conjuration','1 action','Touch','V, S, M','Instantaneous','You and up to eight willing creatures who link hands are transported to a different plane of existence, or you can banish an unwilling creature there instead.'),
  'Prismatic Spray': SP(7,'Evocation','1 action','Self (60-foot cone)','V, S','Instantaneous','Eight multicolored rays of light flash from your hand. Each creature in the cone must make a Dexterity save against each ray that strikes it, with the color of the ray determining the effect, ranging from acid or fire damage to blindness, banishment, or instant petrification.'),
  'Project Image': SP(7,'Illusion','1 action','500 miles','V, S, M','Concentration, up to 1 day','You create an illusory copy of yourself that lasts for the duration, which you can see and hear through and speak through, appearing anywhere you\u2019ve visited.'),
  'Regenerate': SP(7,'Transmutation','1 minute','Touch','V, S, M','1 hour','You touch a creature, causing it to regain hit points each turn for the duration, and letting it regrow lost body parts over the course of a few minutes.'),
  'Resurrection': SP(7,'Necromancy','1 hour','Touch','V, S, M','Instantaneous','You touch a creature that has died within the last century, restoring it fully to life with all its hit points, so long as its soul is free and willing.'),
  'Reverse Gravity': SP(7,'Transmutation','1 action','100 feet','V, S, M','Concentration, up to 1 minute','Gravity reverses in a 50-foot-radius cylinder, causing unsecured objects and creatures to fall upward and reach the top of the area.'),
  'Sequester': SP(7,'Transmutation','1 action','Touch','V, S, M','Until dispelled','You hide a willing creature or object, placing it into a state of suspended animation and making it undetectable by most forms of divination, until a trigger condition ends the spell.'),
  'Simulacrum': SP(7,'Illusion','12 hours','Touch','V, S, M','Until dispelled','You create a duplicate of a beast or humanoid out of ice or snow, which has half the original\u2019s hit points and obeys your commands, though it can\u2019t regain lost hit points.'),
  'Symbol': SP(7,'Abjuration','1 minute','Touch','V, S, M','Until dispelled or triggered','You inscribe a harmful glyph on a surface, which unleashes a powerful magical effect on nearby creatures when triggered, such as fear, insanity, or death.'),
  'Teleport': SP(7,'Conjuration','1 action','10 feet','V','Instantaneous','This spell instantly transports you and up to eight willing creatures to a destination you\u2019re familiar with, with accuracy depending on your familiarity with the location.'),

  // ---- Level 8 ----
  'Mighty Fortress': SP(8,'Conjuration','1 minute','1 mile','V, S, M','Instantaneous','A stone fortress erupts from a clear 120-foot-square patch of ground you choose within range, harmlessly lifting any creatures standing there as it rises. The keep comes furnished, staffed by a hundred invisible servants, and stocked with a banquet\u2019s worth of food each day, though anything created by the spell crumbles to dust if taken outside it. The stonework can be damaged, and destroying enough of it may cause connected sections to collapse.'),
  'Animal Shapes': SP(8,'Transmutation','1 action','30 feet','V, S','Concentration, up to 24 hours','You transform up to one willing creature per level you have into a beast form of your choice, of challenge rating 4 or lower.'),
  'Antimagic Field': SP(8,'Abjuration','1 action','Self','V, S, M','Concentration, up to 1 hour','An invisible, 10-foot-radius sphere of antimagic surrounds you, suppressing most spells and magical effects within it.'),
  'Telepathy': SP(8,'Evocation','1 action','Unlimited','V, S, M','24 hours','You create a telepathic link with a creature you know, letting either of you send short messages to the other for the duration, regardless of distance, as long as you\u2019re on the same plane of existence.'),
  'Tsunami': SP(8,'Conjuration','1 minute','Sight','V, S','Concentration, up to 6 rounds','A wall of water rises within range, up to 300 feet long, 300 feet high, and 50 feet thick. Creatures caught in its area when it appears take 6d10 bludgeoning damage, or half as much on a successful Strength save. On subsequent rounds, the wall moves 50 feet away from you, shrinking and continuing to damage anything caught in it, until it dissipates.'),
  'Antipathy/Sympathy': SP(8,'Enchantment','1 hour','60 feet','V, S, M','10 days','You imbue a location or object with an aura that either repels or attracts a specific kind of creature you designate, for the duration.'),
  'Clone': SP(8,'Necromancy','1 hour','Touch','V, S, M','Instantaneous','You grow an inert duplicate of a living creature in a vessel, which can be later grown to full size if the original dies, transferring its soul to the clone.'),
  'Control Weather': SP(8,'Transmutation','10 minutes','Self (5-mile radius)','V, S, M','Concentration, up to 8 hours','You take control of the weather within range for the duration, shifting it toward a stage of your choosing, such as clear skies, rain, or a storm.'),
  'Demiplane': SP(8,'Conjuration','1 action','60 feet','S','1 hour','You create a shadowy door on a flat surface within range, which leads to a demiplane consisting of a single 30-foot room.'),
  'Dominate Monster': SP(8,'Enchantment','1 action','60 feet','V, S','Concentration, up to 1 hour','You attempt to beguile a creature you can see, forcing it to make a Wisdom save or become charmed, letting you issue it commands telepathically.'),
  'Earthquake': SP(8,'Evocation','1 action','500 feet','V, S, M','Concentration, up to 1 minute','You create a seismic disturbance in a 100-foot-radius circle, cracking the ground, knocking creatures prone, and potentially opening fissures beneath them.'),
  'Feeblemind': SP(8,'Enchantment','1 action','150 feet','V, S, M','Instantaneous','You attempt to shatter a creature\u2019s intellect and personality with a psychic assault, reducing its Intelligence and Charisma to 1 on a failed Intelligence save.'),
  'Glibness': SP(8,'Transmutation','1 action','Self','V','1 hour','Until the spell ends, when you make a Charisma check, you can replace the number you roll with a 15, and lie detection magic indicates you\u2019re being truthful.'),
  'Holy Aura': SP(8,'Abjuration','1 action','Self','V, S, M','Concentration, up to 1 minute','Divine light flares out from you and nearby allies, granting advantage on saving throws and imposing disadvantage on attack rolls made against you by fiends and undead.'),
  'Incendiary Cloud': SP(8,'Conjuration','1 action','150 feet','V, S','Concentration, up to 1 minute','A swirling cloud of smoke shot through with white-hot embers appears in a 20-foot-radius sphere, dealing 10d8 fire damage each turn to creatures inside.'),
  'Maze': SP(8,'Conjuration','1 action','60 feet','V, S','Concentration, up to 10 minutes','You banish a creature into a labyrinthine demiplane, which must use its action to escape with a successful Intelligence check or remain trapped until the spell ends.'),
  'Mind Blank': SP(8,'Abjuration','1 action','Touch','V, S','24 hours','You touch a willing creature, granting it immunity to psychic damage, any effect that would sense its emotions or read its thoughts, and to charm effects.'),
  'Power Word Stun': SP(8,'Enchantment','1 action','60 feet','V','Instantaneous','You speak a word of power that instantly stuns a creature, so long as its current hit points are 150 or fewer. No saving throw is allowed against this effect.'),
  'Sunburst': SP(8,'Evocation','1 action','150 feet','V, S, M','Instantaneous','Brilliant sunlight flashes in a 60-foot radius, dealing 12d6 radiant damage to each creature there on a failed Constitution save, and potentially blinding them.'),

  // ---- Level 9 ----
  'Wish': SP(9,'Conjuration','1 action','Self','V','Instantaneous','The most powerful spell a mortal can cast, letting you alter reality itself to grant nearly any effect you can imagine, at significant personal risk for the most demanding requests.'),
  'Astral Projection': SP(9,'Necromancy','1 hour','10 feet','V, S, M','Special','You and up to eight willing creatures project your astral bodies onto the Astral Plane, leaving your physical bodies behind in a state of suspended animation.'),
  'Power Word Heal': SP(9,'Evocation','1 action','Touch','V, S','Instantaneous','A wave of healing energy washes over the creature you touch, restoring it to its hit point maximum. If the creature is charmed, frightened, paralyzed, or stunned, the condition ends. If it is prone, it can use its reaction to stand. This spell has no effect on constructs or undead.'),
  'Time Stop': SP(9,'Transmutation','1 action','Self','V','Instantaneous','You briefly stop the flow of time for everyone but yourself, taking 1d4+1 turns in a row while other creatures remain frozen. This turn sequence ends early if you use an action or effect that affects a creature other than yourself, or move more than 1,000 feet from where you cast the spell.'),
  'Foresight': SP(9,'Divination','1 minute','Touch','V, S, M','8 hours','You touch a willing creature and grant it a powerful sense of what is about to happen, granting advantage on attack rolls, ability checks, and saving throws, and imposing disadvantage on attacks against it.'),
  'Gate': SP(9,'Conjuration','1 action','60 feet','V, S, M','Concentration, up to 1 minute','You conjure a portal linking an unoccupied space you can see to a precise location on a different plane of existence, through which creatures and objects can pass.'),
  'Imprisonment': SP(9,'Abjuration','1 minute','30 feet','V, S, M','Until dispelled','You place a powerful restraint on a creature, choosing a specific method such as burying it, chaining it, or trapping it in a slab, unless it succeeds on a Wisdom save.'),
  'Mass Heal': SP(9,'Evocation','1 action','60 feet','V, S','Instantaneous','A flood of healing energy flows from you into injured creatures around you, restoring up to 700 hit points divided as you choose among any number of creatures.'),
  'Meteor Swarm': SP(9,'Evocation','1 action','1 mile','V, S','Instantaneous','Blazing orbs of fire plummet to the ground at up to four points you choose, each dealing 20d6 fire and 20d6 bludgeoning damage split between two 40-foot-radius spheres.'),
  'Power Word Kill': SP(9,'Enchantment','1 action','60 feet','V','Instantaneous','You speak a word of power that can instantly kill a creature outright, so long as its current hit points are 100 or fewer.'),
  'Prismatic Wall': SP(9,'Abjuration','1 action','60 feet','V, S, M','10 minutes','A shimmering, multicolored plane of light blocks all view and passage through it, made of seven layers each with a different magical effect that must be overcome to pass.'),
  'Shapechange': SP(9,'Transmutation','1 action','Self','V, S, M','Concentration, up to 1 hour','You assume the form of a different creature for the duration, transforming into virtually any creature you\u2019ve seen, gaining its statistics and capabilities.'),
  'Storm of Vengeance': SP(9,'Conjuration','1 action','Sight','V, S','Concentration, up to 1 minute','A churning storm cloud forms overhead, unleashing escalating effects each round (thunder, acid rain, hail, and lightning) across a 360-foot-radius area.'),
  'True Polymorph': SP(9,'Transmutation','1 action','30 feet','V, S, M','Concentration, up to 1 hour','You transform a creature or nonmagical object into a different creature or object, unless an unwilling target succeeds on a Wisdom saving throw. The transformation becomes permanent if the spell lasts a full hour.'),
  'True Resurrection': SP(9,'Necromancy','1 hour','Touch','V, S, M','Instantaneous','You touch a creature that has died, or speak the name of a creature whose remains no longer exist, restoring it fully to life regardless of how long it has been dead.'),
  'Weird': SP(9,'Illusion','1 action','120 feet','V, S','Concentration, up to 1 minute','You tap into the deepest fears of a group of creatures, creating illusory monsters that deal 4d10 psychic damage each turn a target fails a Wisdom save.'),
};

// Backward-compat shims: SPELL_DESC_LOOKUP is just the registry itself
// (already keyed by name, level, desc).
const SPELL_DESC_LOOKUP = SPELL_REGISTRY;

// SPELL_DB still defines which spells each class actually gets, but now
// just as name lists (full detail lives in SPELL_REGISTRY above).
function N(names){ return names.map(n => ({ name:n })); }
// Maps every spell in SPELL_REGISTRY to the classes that can cast it, for the
// Spellbook's class filter. Kept as a standalone lookup (name -> class array)
// rather than a field on SP() itself, so a missing/misplaced entry here can
// never shift the arguments of an SP() call the way it did once before.
const SPELL_CLASSES = {
  'Acid Splash':['Sorcerer','Wizard'],'Blade Ward':['Bard','Sorcerer','Warlock','Wizard'],'Chill Touch':['Sorcerer','Warlock','Wizard'],'Control Flames':['Druid','Sorcerer','Wizard'],'Create Bonfire':['Druid','Sorcerer','Warlock','Wizard'],'Dancing Lights':['Bard','Sorcerer','Wizard'],'Druidcraft':['Druid'],'Eldritch Blast':['Warlock'],'Fire Bolt':['Sorcerer','Wizard'],'Friends':['Bard','Sorcerer','Warlock','Wizard'],'Frostbite':['Druid','Sorcerer','Warlock','Wizard'],'Guidance':['Cleric','Druid'],'Gust':['Druid','Sorcerer','Wizard'],'Light':['Bard','Cleric','Sorcerer','Wizard'],'Mage Hand':['Bard','Sorcerer','Warlock','Wizard'],'Mending':['Bard','Cleric','Druid','Sorcerer','Wizard'],'Message':['Bard','Sorcerer','Wizard'],'Minor Illusion':['Bard','Sorcerer','Warlock','Wizard'],'Mold Earth':['Druid','Sorcerer','Wizard'],'Poison Spray':['Druid','Sorcerer','Warlock','Wizard'],'Prestidigitation':['Bard','Sorcerer','Warlock','Wizard'],'Produce Flame':['Druid'],'Ray of Frost':['Sorcerer','Wizard'],'Resistance':['Cleric','Druid'],'Sacred Flame':['Cleric'],'Shape Water':['Druid','Sorcerer','Wizard'],'Shillelagh':['Druid'],'Word of Radiance':['Cleric'],'Infestation':['Druid','Sorcerer','Warlock','Wizard'],'Magic Stone':['Druid'],'Shocking Grasp':['Sorcerer','Wizard'],'Spare the Dying':['Cleric'],'Thaumaturgy':['Cleric'],'Thorn Whip':['Druid'],'Toll the Dead':['Cleric','Warlock','Wizard'],'True Strike':['Bard','Sorcerer','Warlock','Wizard'],'Vicious Mockery':['Bard'],

  'Alarm':['Ranger','Wizard'],'Earth Tremor':['Bard','Druid','Sorcerer','Wizard'],'Catapult':['Sorcerer','Wizard'],'Animal Friendship':['Bard','Druid','Ranger'],'Armor of Agathys':['Warlock'],'Arms of Hadar':['Warlock'],'Bane':['Bard','Cleric'],'Bless':['Cleric','Paladin'],'Burning Hands':['Sorcerer','Wizard'],'Charm Person':['Bard','Druid','Sorcerer','Warlock','Wizard'],'Chromatic Orb':['Sorcerer','Wizard'],'Chaos Bolt':['Sorcerer'],'Ceremony':['Cleric','Paladin'],'Absorb Elements':['Druid','Ranger','Sorcerer','Wizard'],'Ice Knife':['Druid','Sorcerer','Wizard'],'Zephyr Strike':['Ranger'],'Snare':['Druid','Ranger'],'Cause Fear':['Warlock','Wizard'],'Color Spray':['Sorcerer','Wizard'],'Command':['Cleric','Paladin'],'Compelled Duel':['Paladin'],'Comprehend Languages':['Bard','Sorcerer','Warlock','Wizard'],'Create or Destroy Water':['Cleric','Druid'],'Cure Wounds':['Bard','Cleric','Druid','Paladin','Ranger'],'Detect Evil and Good':['Cleric','Paladin'],'Detect Magic':['Bard','Cleric','Druid','Paladin','Ranger','Sorcerer','Wizard'],'Detect Poison and Disease':['Cleric','Druid','Paladin','Ranger'],'Disguise Self':['Bard','Sorcerer','Wizard'],'Dissonant Whispers':['Bard'],'Divine Favor':['Paladin'],'Ensnaring Strike':['Ranger'],'Entangle':['Druid','Ranger'],'Expeditious Retreat':['Sorcerer','Warlock','Wizard'],'Faerie Fire':['Bard','Druid'],'False Life':['Sorcerer','Wizard'],'Feather Fall':['Bard','Sorcerer','Wizard'],'Find Familiar':['Wizard'],'Fog Cloud':['Druid','Ranger','Sorcerer','Wizard'],'Goodberry':['Druid','Ranger'],'Grease':['Wizard'],'Guiding Bolt':['Cleric'],'Hail of Thorns':['Ranger'],'Healing Word':['Bard','Cleric','Druid'],'Hellish Rebuke':['Warlock'],'Heroism':['Bard','Paladin'],'Hex':['Warlock'],'Hunter\u2019s Mark':['Ranger'],'Identify':['Bard','Wizard'],'Illusory Script':['Bard','Warlock','Wizard'],'Inflict Wounds':['Cleric'],'Jump':['Druid','Ranger','Sorcerer','Wizard'],'Longstrider':['Bard','Druid','Ranger','Wizard'],'Mage Armor':['Sorcerer','Wizard'],'Magic Missile':['Sorcerer','Wizard'],'Protection from Evil and Good':['Cleric','Paladin','Warlock','Wizard'],'Purify Food and Drink':['Cleric','Druid','Paladin'],'Ray of Sickness':['Sorcerer','Wizard'],'Sanctuary':['Cleric'],'Searing Smite':['Paladin'],'Shield':['Sorcerer','Wizard'],'Shield of Faith':['Cleric','Paladin'],'Silent Image':['Bard','Sorcerer','Wizard'],'Sleep':['Bard','Sorcerer','Wizard'],'Speak with Animals':['Bard','Druid','Ranger'],'Tasha\u2019s Hideous Laughter':['Bard','Wizard'],'Tenser\u2019s Floating Disk':['Wizard'],'Thunderous Smite':['Paladin'],'Thunderwave':['Bard','Druid','Sorcerer','Wizard'],'Unseen Servant':['Bard','Warlock','Wizard'],'Witch Bolt':['Sorcerer','Warlock','Wizard'],'Wrathful Smite':['Paladin'],

  'Aid':['Cleric','Paladin'],'Alter Self':['Sorcerer','Wizard'],'Animal Messenger':['Bard','Druid','Ranger'],'Arcane Lock':['Wizard'],'Augury':['Cleric'],'Barkskin':['Druid','Ranger'],'Beast Sense':['Druid','Ranger'],'Beast Bond':['Druid','Ranger'],'Skywrite':['Bard','Druid','Wizard'],'Blindness/Deafness':['Bard','Cleric','Sorcerer','Wizard'],'Blur':['Sorcerer','Wizard'],'Branding Smite':['Paladin'],'Calm Emotions':['Bard','Cleric'],'Cloud of Daggers':['Bard','Sorcerer','Warlock','Wizard'],'Shadow Blade':['Bard','Sorcerer','Warlock','Wizard'],'Warding Wind':['Bard','Druid'],'Pyrotechnics':['Bard','Sorcerer','Wizard'],'Continual Flame':['Cleric','Wizard'],'Cordon of Arrows':['Ranger'],'Crown of Madness':['Bard','Sorcerer','Warlock','Wizard'],'Darkness':['Sorcerer','Warlock','Wizard'],'Darkvision':['Druid','Ranger','Sorcerer','Wizard'],'Dragon’s Breath':['Sorcerer','Wizard'],'Detect Thoughts':['Bard','Sorcerer','Wizard'],'Enhance Ability':['Bard','Cleric','Druid','Sorcerer'],'Enlarge/Reduce':['Sorcerer','Wizard'],'Enthrall':['Bard','Warlock'],'Find Steed':['Paladin'],'Find Traps':['Cleric','Druid','Ranger'],'Flame Blade':['Druid'],'Flaming Sphere':['Druid','Wizard'],'Gentle Repose':['Cleric','Wizard'],'Gust of Wind':['Druid','Sorcerer','Wizard'],'Heat Metal':['Bard','Druid'],'Hold Person':['Bard','Cleric','Druid','Sorcerer','Warlock','Wizard'],'Invisibility':['Bard','Sorcerer','Warlock','Wizard'],'Knock':['Bard','Sorcerer','Wizard'],'Lesser Restoration':['Bard','Cleric','Druid','Paladin','Ranger'],'Levitate':['Sorcerer','Wizard'],'Locate Animals or Plants':['Bard','Druid','Ranger'],'Locate Object':['Bard','Cleric','Druid','Paladin','Ranger','Wizard'],'Magic Mouth':['Bard','Wizard'],'Magic Weapon':['Paladin','Wizard'],'Melf\u2019s Acid Arrow':['Wizard'],'Mirror Image':['Sorcerer','Warlock','Wizard'],'Misty Step':['Sorcerer','Warlock','Wizard'],'Moonbeam':['Druid'],'Nystul\u2019s Magic Aura':['Wizard'],'Pass without Trace':['Druid','Ranger'],'Phantasmal Force':['Bard','Sorcerer','Warlock','Wizard'],'Prayer of Healing':['Cleric'],'Protection from Poison':['Cleric','Druid','Paladin','Ranger'],'Ray of Enfeeblement':['Warlock','Wizard'],'Rope Trick':['Wizard'],'Scorching Ray':['Sorcerer','Wizard'],'See Invisibility':['Bard','Sorcerer','Wizard'],'Shatter':['Bard','Sorcerer','Warlock','Wizard'],'Silence':['Bard','Cleric','Ranger'],'Spider Climb':['Sorcerer','Warlock','Wizard'],'Spike Growth':['Druid','Ranger'],'Spiritual Weapon':['Cleric'],'Suggestion':['Bard','Sorcerer','Warlock','Wizard'],'Warding Bond':['Cleric'],'Web':['Sorcerer','Wizard'],'Zone of Truth':['Bard','Cleric','Paladin'],

  'Animate Dead':['Cleric','Wizard'],'Aura of Vitality':['Paladin'],'Beacon of Hope':['Cleric'],'Bestow Curse':['Bard','Cleric','Wizard'],'Blinding Smite':['Paladin'],'Blink':['Sorcerer','Wizard'],'Call Lightning':['Druid'],'Clairvoyance':['Bard','Cleric','Sorcerer','Wizard'],'Conjure Animals':['Druid','Ranger'],'Conjure Barrage':['Ranger'],'Counterspell':['Sorcerer','Warlock','Wizard'],'Create Food and Water':['Cleric','Paladin'],'Crusader\u2019s Mantle':['Paladin'],'Daylight':['Cleric','Druid','Paladin','Ranger','Sorcerer'],'Dispel Magic':['Bard','Cleric','Druid','Paladin','Sorcerer','Warlock','Wizard'],'Elemental Weapon':['Paladin'],'Fear':['Bard','Sorcerer','Warlock','Wizard'],'Feign Death':['Bard','Cleric','Druid','Wizard'],'Fireball':['Sorcerer','Wizard'],'Fly':['Sorcerer','Warlock','Wizard'],'Gaseous Form':['Sorcerer','Warlock','Wizard'],'Glyph of Warding':['Bard','Cleric','Wizard'],'Haste':['Sorcerer','Wizard'],'Hunger of Hadar':['Warlock'],'Catnap':['Bard','Sorcerer','Wizard'],'Erupting Earth':['Druid','Sorcerer','Wizard'],'Wall of Water':['Druid','Sorcerer','Wizard'],'Melf’s Minute Meteors':['Wizard'],'Hypnotic Pattern':['Bard','Sorcerer','Warlock','Wizard'],'Life Transference':['Cleric','Wizard'],'Enemies Abound':['Bard','Sorcerer','Warlock','Wizard'],'Tiny Servant':['Wizard'],'Flame Arrows':['Druid','Ranger','Sorcerer','Wizard'],'Tidal Wave':['Druid','Sorcerer','Wizard'],'Leomund\u2019s Tiny Hut':['Bard','Wizard'],'Lightning Arrow':['Ranger'],'Lightning Bolt':['Sorcerer','Wizard'],'Magic Circle':['Cleric','Paladin','Warlock','Wizard'],'Major Image':['Bard','Sorcerer','Warlock','Wizard'],'Mass Healing Word':['Cleric'],'Meld into Stone':['Cleric','Druid'],'Nondetection':['Bard','Cleric','Ranger','Wizard'],'Phantom Steed':['Wizard'],'Plant Growth':['Bard','Druid','Ranger'],'Protection from Energy':['Cleric','Druid','Ranger','Sorcerer','Wizard'],'Remove Curse':['Cleric','Paladin','Warlock','Wizard'],'Revivify':['Cleric','Paladin'],'Sending':['Bard','Cleric','Warlock','Wizard'],'Sleet Storm':['Druid','Sorcerer','Wizard'],'Slow':['Sorcerer','Wizard'],'Speak with Dead':['Bard','Cleric'],'Speak with Plants':['Bard','Druid','Ranger'],'Spirit Guardians':['Cleric'],'Stinking Cloud':['Bard','Sorcerer','Wizard'],'Tongues':['Bard','Cleric','Sorcerer','Warlock','Wizard'],'Vampiric Touch':['Warlock','Wizard'],'Water Breathing':['Druid','Ranger','Sorcerer','Wizard'],'Water Walk':['Cleric','Druid','Ranger','Sorcerer'],'Wind Wall':['Druid','Ranger'],

  'Arcane Eye':['Wizard'],'Aura of Life':['Paladin'],'Aura of Purity':['Paladin'],'Banishment':['Cleric','Paladin','Sorcerer','Warlock','Wizard'],'Blight':['Druid','Sorcerer','Warlock','Wizard'],'Compulsion':['Bard'],'Confusion':['Bard','Druid','Sorcerer','Wizard'],'Conjure Minor Elementals':['Druid','Wizard'],'Conjure Woodland Beings':['Druid','Ranger'],'Control Water':['Cleric','Druid','Wizard'],'Death Ward':['Cleric','Paladin'],'Dimension Door':['Bard','Sorcerer','Warlock','Wizard'],'Divination':['Cleric'],'Dominate Beast':['Druid','Sorcerer'],'Evard\u2019s Black Tentacles':['Wizard'],'Fabricate':['Wizard'],'Fire Shield':['Wizard'],'Freedom of Movement':['Bard','Cleric','Druid','Paladin','Ranger'],'Giant Insect':['Druid'],'Grasping Vine':['Druid','Ranger'],'Greater Invisibility':['Bard','Sorcerer','Wizard'],'Guardian of Faith':['Cleric'],'Sickening Radiance':['Sorcerer','Warlock','Wizard'],'Shadow of Moil':['Warlock'],'Find Greater Steed':['Paladin'],'Elemental Bane':['Druid','Warlock','Wizard'],'Hallucinatory Terrain':['Bard','Druid','Sorcerer','Warlock','Wizard'],'Ice Storm':['Druid','Sorcerer','Wizard'],'Leomund\u2019s Secret Chest':['Wizard'],'Locate Creature':['Bard','Cleric','Druid','Paladin','Ranger','Wizard'],'Mordenkainen\u2019s Faithful Hound':['Wizard'],'Mordenkainen\u2019s Private Sanctum':['Wizard'],'Otiluke\u2019s Resilient Sphere':['Wizard'],'Phantasmal Killer':['Wizard'],'Polymorph':['Bard','Druid','Sorcerer','Wizard'],'Staggering Smite':['Paladin'],'Stone Shape':['Cleric','Druid','Wizard'],'Stoneskin':['Druid','Ranger','Sorcerer','Wizard'],'Wall of Fire':['Druid','Sorcerer','Wizard'],

  'Animate Objects':['Bard','Sorcerer','Wizard'],'Antilife Shell':['Druid'],'Awaken':['Bard','Druid'],'Banishing Smite':['Paladin'],'Bigby\u2019s Hand':['Wizard'],'Circle of Power':['Paladin'],'Cloudkill':['Sorcerer','Wizard'],'Commune':['Cleric'],'Commune with Nature':['Druid','Ranger'],'Cone of Cold':['Sorcerer','Wizard'],'Conjure Elemental':['Druid','Wizard'],'Conjure Volley':['Ranger'],'Contact Other Plane':['Warlock','Wizard'],'Contagion':['Cleric','Druid'],'Creation':['Sorcerer','Wizard'],'Destructive Wave':['Paladin'],'Dispel Evil and Good':['Cleric','Paladin'],'Dominate Person':['Bard','Sorcerer','Wizard'],'Dream':['Bard','Warlock','Wizard'],'Flame Strike':['Cleric'],'Geas':['Bard','Cleric','Druid','Paladin','Warlock','Wizard'],'Greater Restoration':['Bard','Cleric','Druid'],'Hallow':['Cleric'],'Hold Monster':['Bard','Sorcerer','Warlock','Wizard'],'Holy Weapon':['Cleric','Paladin'],'Insect Plague':['Cleric','Druid','Sorcerer'],'Legend Lore':['Bard','Cleric','Wizard'],'Mass Cure Wounds':['Bard','Cleric','Druid'],'Mislead':['Bard','Wizard'],'Skill Empowerment':['Bard','Sorcerer','Wizard'],'Maelstrom':['Druid'],'Modify Memory':['Bard','Wizard'],'Passwall':['Wizard'],'Planar Binding':['Bard','Cleric','Druid','Warlock','Wizard'],'Raise Dead':['Bard','Cleric','Paladin'],'Rary\u2019s Telepathic Bond':['Wizard'],'Reincarnate':['Druid'],'Scrying':['Bard','Cleric','Druid','Warlock','Wizard'],'Seeming':['Bard','Sorcerer','Wizard'],'Steel Wind Strike':['Ranger'],'Swift Quiver':['Ranger'],'Telekinesis':['Sorcerer','Wizard'],'Teleportation Circle':['Bard','Sorcerer','Wizard'],'Tree Stride':['Druid','Ranger'],'Wall of Force':['Wizard'],'Wall of Stone':['Druid','Sorcerer','Wizard'],

  'Arcane Gate':['Sorcerer','Warlock','Wizard'],'Blade Barrier':['Cleric'],'Chain Lightning':['Sorcerer','Wizard'],'Circle of Death':['Sorcerer','Warlock','Wizard'],'Conjure Fey':['Druid','Warlock'],'Contingency':['Wizard'],'Create Undead':['Cleric','Warlock','Wizard'],'Disintegrate':['Sorcerer','Wizard'],'Drawmij\u2019s Instant Summons':['Wizard'],'Eyebite':['Bard','Sorcerer','Warlock','Wizard'],'Find the Path':['Bard','Cleric','Druid'],'Flesh to Stone':['Sorcerer','Warlock','Wizard'],'Forbiddance':['Cleric'],'Globe of Invulnerability':['Sorcerer','Wizard'],'Guards and Wards':['Bard','Wizard'],'Harm':['Cleric'],'Heal':['Cleric','Druid'],'Heroes\u2019 Feast':['Cleric','Druid'],'Magic Jar':['Wizard'],'Mass Suggestion':['Bard','Sorcerer','Warlock','Wizard'],'Move Earth':['Druid','Sorcerer','Wizard'],'Scatter':['Sorcerer','Warlock','Wizard'],'Otiluke\u2019s Freezing Sphere':['Wizard'],'Otto\u2019s Irresistible Dance':['Bard','Sorcerer','Warlock','Wizard'],'Planar Ally':['Cleric'],'Programmed Illusion':['Bard','Wizard'],'Sunbeam':['Druid','Sorcerer','Wizard'],'Transport via Plants':['Druid'],'True Seeing':['Bard','Cleric','Sorcerer','Warlock','Wizard'],'Wall of Ice':['Wizard'],'Wall of Thorns':['Druid'],'Wind Walk':['Druid'],'Word of Recall':['Cleric'],

  'Conjure Celestial':['Cleric'],'Delayed Blast Fireball':['Sorcerer','Wizard'],'Divine Word':['Cleric'],'Etherealness':['Bard','Cleric','Sorcerer','Warlock','Wizard'],'Finger of Death':['Sorcerer','Warlock','Wizard'],'Fire Storm':['Cleric','Druid','Sorcerer'],'Forcecage':['Bard','Warlock','Wizard'],'Mirage Arcane':['Bard','Druid','Wizard'],'Mordenkainen\u2019s Magnificent Mansion':['Bard','Wizard'],'Mordenkainen\u2019s Sword':['Bard','Wizard'],'Plane Shift':['Cleric','Druid','Sorcerer','Warlock','Wizard'],'Prismatic Spray':['Sorcerer','Wizard'],'Project Image':['Bard','Wizard'],'Regenerate':['Bard','Cleric','Druid'],'Resurrection':['Bard','Cleric'],'Reverse Gravity':['Druid','Sorcerer','Wizard'],'Sequester':['Wizard'],'Simulacrum':['Wizard'],'Symbol':['Bard','Cleric','Wizard'],'Teleport':['Bard','Sorcerer','Wizard'],

  'Animal Shapes':['Druid'],'Mighty Fortress':['Wizard'],'Antimagic Field':['Cleric','Wizard'],'Antipathy/Sympathy':['Druid','Wizard'],'Clone':['Wizard'],'Control Weather':['Cleric','Druid','Wizard'],'Demiplane':['Warlock','Wizard'],'Dominate Monster':['Bard','Sorcerer','Warlock','Wizard'],'Earthquake':['Cleric','Druid','Sorcerer'],'Feeblemind':['Bard','Druid','Warlock','Wizard'],'Glibness':['Bard','Warlock'],'Holy Aura':['Cleric'],'Incendiary Cloud':['Sorcerer','Wizard'],'Maze':['Wizard'],'Mind Blank':['Bard','Wizard'],'Power Word Stun':['Bard','Sorcerer','Warlock','Wizard'],'Sunburst':['Druid','Sorcerer','Wizard'],'Telepathy':['Wizard'],'Tsunami':['Druid'],

  'Astral Projection':['Cleric','Warlock','Wizard'],'Foresight':['Bard','Druid','Warlock','Wizard'],'Gate':['Cleric','Sorcerer','Wizard'],'Imprisonment':['Warlock','Wizard'],'Mass Heal':['Cleric'],'Meteor Swarm':['Sorcerer','Wizard'],'Power Word Heal':['Bard'],'Power Word Kill':['Bard','Sorcerer','Warlock','Wizard'],'Prismatic Wall':['Wizard'],'Shapechange':['Druid','Wizard'],'Storm of Vengeance':['Druid'],'Time Stop':['Sorcerer','Wizard'],'True Polymorph':['Bard','Warlock','Wizard'],'True Resurrection':['Bard','Cleric','Druid'],'Weird':['Sorcerer','Wizard'],'Wish':['Sorcerer','Wizard'],
};

const SPELL_DB = {
  Bard: { cantrips: N(["Blade Ward","Dancing Lights","Friends","Light","Mage Hand","Mending","Message","Minor Illusion","Prestidigitation","True Strike","Vicious Mockery"]),
    1: N(["Animal Friendship","Bane","Charm Person","Comprehend Languages","Cure Wounds","Detect Magic","Disguise Self","Dissonant Whispers","Earth Tremor","Faerie Fire","Feather Fall","Healing Word","Heroism","Identify","Illusory Script","Longstrider","Silent Image","Sleep","Speak with Animals","Tasha’s Hideous Laughter","Thunderwave","Unseen Servant"]),
    2: N(["Animal Messenger","Blindness/Deafness","Calm Emotions","Cloud of Daggers","Crown of Madness","Detect Thoughts","Enhance Ability","Enthrall","Heat Metal","Hold Person","Invisibility","Knock","Lesser Restoration","Locate Animals or Plants","Locate Object","Magic Mouth","Phantasmal Force","Pyrotechnics","See Invisibility","Shadow Blade","Shatter","Silence","Skywrite","Suggestion","Warding Wind","Zone of Truth"]),
    3: N(["Bestow Curse","Catnap","Clairvoyance","Dispel Magic","Enemies Abound","Fear","Feign Death","Glyph of Warding","Hypnotic Pattern","Leomund’s Tiny Hut","Major Image","Nondetection","Plant Growth","Sending","Speak with Dead","Speak with Plants","Stinking Cloud","Tongues"]),
    4: N(["Compulsion","Confusion","Dimension Door","Freedom of Movement","Greater Invisibility","Hallucinatory Terrain","Locate Creature","Polymorph"]),
    5: N(["Animate Objects","Awaken","Dominate Person","Dream","Geas","Greater Restoration","Hold Monster","Legend Lore","Mass Cure Wounds","Mislead","Modify Memory","Planar Binding","Raise Dead","Scrying","Seeming","Skill Empowerment","Teleportation Circle"]),
    6: N(["Eyebite","Find the Path","Guards and Wards","Mass Suggestion","Otto’s Irresistible Dance","Programmed Illusion","True Seeing"]),
    7: N(["Etherealness","Forcecage","Mirage Arcane","Mordenkainen’s Magnificent Mansion","Mordenkainen’s Sword","Project Image","Regenerate","Resurrection","Symbol","Teleport"]),
    8: N(["Dominate Monster","Feeblemind","Glibness","Mind Blank","Power Word Stun"]),
    9: N(["Foresight","Power Word Heal","Power Word Kill","True Polymorph","True Resurrection"]),
  },
  Cleric: { cantrips: N(["Guidance","Light","Mending","Resistance","Sacred Flame","Spare the Dying","Thaumaturgy","Toll the Dead","Word of Radiance"]),
    1: N(["Bane","Bless","Ceremony","Command","Create or Destroy Water","Cure Wounds","Detect Evil and Good","Detect Magic","Detect Poison and Disease","Guiding Bolt","Healing Word","Inflict Wounds","Protection from Evil and Good","Purify Food and Drink","Sanctuary","Shield of Faith"]),
    2: N(["Aid","Augury","Blindness/Deafness","Calm Emotions","Continual Flame","Enhance Ability","Find Traps","Gentle Repose","Hold Person","Lesser Restoration","Locate Object","Prayer of Healing","Protection from Poison","Silence","Spiritual Weapon","Warding Bond","Zone of Truth"]),
    3: N(["Animate Dead","Beacon of Hope","Bestow Curse","Clairvoyance","Create Food and Water","Daylight","Dispel Magic","Feign Death","Glyph of Warding","Life Transference","Magic Circle","Mass Healing Word","Meld into Stone","Nondetection","Protection from Energy","Remove Curse","Revivify","Sending","Speak with Dead","Spirit Guardians","Tongues","Water Walk"]),
    4: N(["Banishment","Control Water","Death Ward","Divination","Freedom of Movement","Guardian of Faith","Locate Creature","Stone Shape"]),
    5: N(["Commune","Contagion","Dispel Evil and Good","Flame Strike","Geas","Greater Restoration","Hallow","Holy Weapon","Insect Plague","Legend Lore","Mass Cure Wounds","Planar Binding","Raise Dead","Scrying"]),
    6: N(["Blade Barrier","Create Undead","Find the Path","Forbiddance","Harm","Heal","Heroes’ Feast","Planar Ally","True Seeing","Word of Recall"]),
    7: N(["Conjure Celestial","Divine Word","Etherealness","Fire Storm","Plane Shift","Regenerate","Resurrection","Symbol"]),
    8: N(["Antimagic Field","Control Weather","Earthquake","Holy Aura"]),
    9: N(["Astral Projection","Gate","Mass Heal","True Resurrection"]),
  },
  Druid: { cantrips: N(["Control Flames","Create Bonfire","Druidcraft","Frostbite","Guidance","Gust","Infestation","Magic Stone","Mending","Mold Earth","Poison Spray","Produce Flame","Resistance","Shape Water","Shillelagh","Thorn Whip"]),
    1: N(["Absorb Elements","Animal Friendship","Beast Bond","Charm Person","Create or Destroy Water","Cure Wounds","Detect Magic","Detect Poison and Disease","Earth Tremor","Entangle","Faerie Fire","Fog Cloud","Goodberry","Healing Word","Ice Knife","Jump","Longstrider","Purify Food and Drink","Snare","Speak with Animals","Thunderwave"]),
    2: N(["Animal Messenger","Barkskin","Beast Sense","Darkvision","Enhance Ability","Find Traps","Flame Blade","Flaming Sphere","Gust of Wind","Heat Metal","Hold Person","Lesser Restoration","Locate Animals or Plants","Locate Object","Moonbeam","Pass without Trace","Protection from Poison","Skywrite","Spike Growth","Warding Wind"]),
    3: N(["Call Lightning","Conjure Animals","Daylight","Dispel Magic","Erupting Earth","Feign Death","Flame Arrows","Meld into Stone","Plant Growth","Protection from Energy","Sleet Storm","Speak with Plants","Tidal Wave","Wall of Water","Water Breathing","Water Walk","Wind Wall"]),
    4: N(["Blight","Confusion","Conjure Minor Elementals","Conjure Woodland Beings","Control Water","Dominate Beast","Elemental Bane","Freedom of Movement","Giant Insect","Grasping Vine","Hallucinatory Terrain","Ice Storm","Locate Creature","Polymorph","Stone Shape","Stoneskin","Wall of Fire"]),
    5: N(["Antilife Shell","Awaken","Commune with Nature","Conjure Elemental","Contagion","Geas","Greater Restoration","Insect Plague","Maelstrom","Mass Cure Wounds","Planar Binding","Reincarnate","Scrying","Tree Stride","Wall of Stone"]),
    6: N(["Conjure Fey","Find the Path","Heal","Heroes’ Feast","Move Earth","Sunbeam","Transport via Plants","Wall of Thorns","Wind Walk"]),
    7: N(["Fire Storm","Mirage Arcane","Plane Shift","Regenerate","Reverse Gravity"]),
    8: N(["Animal Shapes","Antipathy/Sympathy","Control Weather","Earthquake","Feeblemind","Sunburst","Tsunami"]),
    9: N(["Foresight","Shapechange","Storm of Vengeance","True Resurrection"]),
  },
  Paladin: { cantrips: N([]),
    1: N(["Bless","Ceremony","Command","Compelled Duel","Cure Wounds","Detect Evil and Good","Detect Magic","Detect Poison and Disease","Divine Favor","Heroism","Protection from Evil and Good","Purify Food and Drink","Searing Smite","Shield of Faith","Thunderous Smite","Wrathful Smite"]),
    2: N(["Aid","Branding Smite","Find Steed","Lesser Restoration","Locate Object","Magic Weapon","Protection from Poison","Zone of Truth"]),
    3: N(["Aura of Vitality","Blinding Smite","Create Food and Water","Crusader’s Mantle","Daylight","Dispel Magic","Elemental Weapon","Magic Circle","Remove Curse","Revivify"]),
    4: N(["Aura of Life","Aura of Purity","Banishment","Death Ward","Find Greater Steed","Freedom of Movement","Locate Creature","Staggering Smite"]),
    5: N(["Banishing Smite","Circle of Power","Destructive Wave","Dispel Evil and Good","Geas","Holy Weapon","Raise Dead"]),
  },
  Ranger: { cantrips: N([]),
    1: N(["Absorb Elements","Alarm","Animal Friendship","Beast Bond","Cure Wounds","Detect Magic","Detect Poison and Disease","Ensnaring Strike","Entangle","Fog Cloud","Goodberry","Hail of Thorns","Hunter’s Mark","Jump","Longstrider","Snare","Speak with Animals","Zephyr Strike"]),
    2: N(["Animal Messenger","Barkskin","Beast Sense","Cordon of Arrows","Darkvision","Find Traps","Lesser Restoration","Locate Animals or Plants","Locate Object","Pass without Trace","Protection from Poison","Silence","Spike Growth"]),
    3: N(["Conjure Animals","Conjure Barrage","Daylight","Flame Arrows","Lightning Arrow","Nondetection","Plant Growth","Protection from Energy","Speak with Plants","Water Breathing","Water Walk","Wind Wall"]),
    4: N(["Conjure Woodland Beings","Freedom of Movement","Grasping Vine","Locate Creature","Stoneskin"]),
    5: N(["Commune with Nature","Conjure Volley","Steel Wind Strike","Swift Quiver","Tree Stride"]),
  },
  Sorcerer: { cantrips: N(["Acid Splash","Blade Ward","Chill Touch","Control Flames","Create Bonfire","Dancing Lights","Fire Bolt","Friends","Frostbite","Gust","Infestation","Light","Mage Hand","Mending","Message","Minor Illusion","Mold Earth","Poison Spray","Prestidigitation","Ray of Frost","Shape Water","Shocking Grasp","True Strike"]),
    1: N(["Absorb Elements","Burning Hands","Catapult","Chaos Bolt","Charm Person","Chromatic Orb","Color Spray","Comprehend Languages","Detect Magic","Disguise Self","Earth Tremor","Expeditious Retreat","False Life","Feather Fall","Fog Cloud","Ice Knife","Jump","Mage Armor","Magic Missile","Ray of Sickness","Shield","Silent Image","Sleep","Thunderwave","Witch Bolt"]),
    2: N(["Alter Self","Blindness/Deafness","Blur","Cloud of Daggers","Crown of Madness","Darkness","Darkvision","Detect Thoughts","Dragon’s Breath","Enhance Ability","Enlarge/Reduce","Gust of Wind","Hold Person","Invisibility","Knock","Levitate","Mirror Image","Misty Step","Phantasmal Force","Pyrotechnics","Scorching Ray","See Invisibility","Shadow Blade","Shatter","Spider Climb","Suggestion","Web"]),
    3: N(["Blink","Catnap","Clairvoyance","Counterspell","Daylight","Dispel Magic","Enemies Abound","Erupting Earth","Fear","Fireball","Flame Arrows","Fly","Gaseous Form","Haste","Hypnotic Pattern","Lightning Bolt","Major Image","Protection from Energy","Sleet Storm","Slow","Stinking Cloud","Tidal Wave","Tongues","Wall of Water","Water Breathing","Water Walk"]),
    4: N(["Banishment","Blight","Confusion","Dimension Door","Dominate Beast","Greater Invisibility","Hallucinatory Terrain","Ice Storm","Polymorph","Sickening Radiance","Stoneskin","Wall of Fire"]),
    5: N(["Animate Objects","Cloudkill","Cone of Cold","Creation","Dominate Person","Hold Monster","Insect Plague","Seeming","Skill Empowerment","Telekinesis","Teleportation Circle","Wall of Stone"]),
    6: N(["Arcane Gate","Chain Lightning","Circle of Death","Disintegrate","Eyebite","Flesh to Stone","Globe of Invulnerability","Mass Suggestion","Move Earth","Otto’s Irresistible Dance","Scatter","Sunbeam","True Seeing"]),
    7: N(["Delayed Blast Fireball","Etherealness","Finger of Death","Fire Storm","Plane Shift","Prismatic Spray","Reverse Gravity","Teleport"]),
    8: N(["Dominate Monster","Earthquake","Incendiary Cloud","Power Word Stun","Sunburst"]),
    9: N(["Gate","Meteor Swarm","Power Word Kill","Time Stop","Weird","Wish"]),
  },
  Warlock: { cantrips: N(["Blade Ward","Chill Touch","Create Bonfire","Eldritch Blast","Friends","Frostbite","Infestation","Mage Hand","Minor Illusion","Poison Spray","Prestidigitation","Toll the Dead","True Strike"]),
    1: N(["Armor of Agathys","Arms of Hadar","Cause Fear","Charm Person","Comprehend Languages","Expeditious Retreat","Hellish Rebuke","Hex","Illusory Script","Protection from Evil and Good","Unseen Servant","Witch Bolt"]),
    2: N(["Cloud of Daggers","Crown of Madness","Darkness","Enthrall","Hold Person","Invisibility","Mirror Image","Misty Step","Phantasmal Force","Ray of Enfeeblement","Shadow Blade","Shatter","Spider Climb","Suggestion"]),
    3: N(["Counterspell","Dispel Magic","Enemies Abound","Fear","Fly","Gaseous Form","Hunger of Hadar","Hypnotic Pattern","Magic Circle","Major Image","Remove Curse","Sending","Tongues","Vampiric Touch"]),
    4: N(["Banishment","Blight","Dimension Door","Elemental Bane","Hallucinatory Terrain","Shadow of Moil","Sickening Radiance"]),
    5: N(["Contact Other Plane","Dream","Geas","Hold Monster","Planar Binding","Scrying"]),
    6: N(["Arcane Gate","Circle of Death","Conjure Fey","Create Undead","Eyebite","Flesh to Stone","Mass Suggestion","Otto’s Irresistible Dance","Scatter","True Seeing"]),
    7: N(["Etherealness","Finger of Death","Forcecage","Plane Shift"]),
    8: N(["Demiplane","Dominate Monster","Feeblemind","Glibness","Power Word Stun"]),
    9: N(["Astral Projection","Foresight","Imprisonment","Power Word Kill","True Polymorph"]),
  },
  Wizard: { cantrips: N(["Acid Splash","Blade Ward","Chill Touch","Control Flames","Create Bonfire","Dancing Lights","Fire Bolt","Friends","Frostbite","Gust","Infestation","Light","Mage Hand","Mending","Message","Minor Illusion","Mold Earth","Poison Spray","Prestidigitation","Ray of Frost","Shape Water","Shocking Grasp","Toll the Dead","True Strike"]),
    1: N(["Absorb Elements","Alarm","Burning Hands","Catapult","Cause Fear","Charm Person","Chromatic Orb","Color Spray","Comprehend Languages","Detect Magic","Disguise Self","Earth Tremor","Expeditious Retreat","False Life","Feather Fall","Find Familiar","Fog Cloud","Grease","Ice Knife","Identify","Illusory Script","Jump","Longstrider","Mage Armor","Magic Missile","Protection from Evil and Good","Ray of Sickness","Shield","Silent Image","Sleep","Tasha’s Hideous Laughter","Tenser’s Floating Disk","Thunderwave","Unseen Servant","Witch Bolt"]),
    2: N(["Alter Self","Arcane Lock","Blindness/Deafness","Blur","Cloud of Daggers","Continual Flame","Crown of Madness","Darkness","Darkvision","Detect Thoughts","Dragon’s Breath","Enlarge/Reduce","Flaming Sphere","Gentle Repose","Gust of Wind","Hold Person","Invisibility","Knock","Levitate","Locate Object","Magic Mouth","Magic Weapon","Melf’s Acid Arrow","Mirror Image","Misty Step","Nystul’s Magic Aura","Phantasmal Force","Pyrotechnics","Ray of Enfeeblement","Rope Trick","Scorching Ray","See Invisibility","Shadow Blade","Shatter","Skywrite","Spider Climb","Suggestion","Web"]),
    3: N(["Animate Dead","Bestow Curse","Blink","Catnap","Clairvoyance","Counterspell","Dispel Magic","Enemies Abound","Erupting Earth","Fear","Feign Death","Fireball","Flame Arrows","Fly","Gaseous Form","Glyph of Warding","Haste","Hypnotic Pattern","Leomund’s Tiny Hut","Life Transference","Lightning Bolt","Magic Circle","Major Image","Melf’s Minute Meteors","Nondetection","Phantom Steed","Protection from Energy","Remove Curse","Sending","Sleet Storm","Slow","Stinking Cloud","Tidal Wave","Tiny Servant","Tongues","Vampiric Touch","Wall of Water","Water Breathing"]),
    4: N(["Arcane Eye","Banishment","Blight","Confusion","Conjure Minor Elementals","Control Water","Dimension Door","Elemental Bane","Evard’s Black Tentacles","Fabricate","Fire Shield","Greater Invisibility","Hallucinatory Terrain","Ice Storm","Leomund’s Secret Chest","Locate Creature","Mordenkainen’s Faithful Hound","Mordenkainen’s Private Sanctum","Otiluke’s Resilient Sphere","Phantasmal Killer","Polymorph","Sickening Radiance","Stone Shape","Stoneskin","Wall of Fire"]),
    5: N(["Animate Objects","Bigby’s Hand","Cloudkill","Cone of Cold","Conjure Elemental","Contact Other Plane","Creation","Dominate Person","Dream","Geas","Hold Monster","Legend Lore","Mislead","Modify Memory","Passwall","Planar Binding","Rary’s Telepathic Bond","Scrying","Seeming","Skill Empowerment","Telekinesis","Teleportation Circle","Wall of Force","Wall of Stone"]),
    6: N(["Arcane Gate","Chain Lightning","Circle of Death","Contingency","Create Undead","Disintegrate","Drawmij’s Instant Summons","Eyebite","Flesh to Stone","Globe of Invulnerability","Guards and Wards","Magic Jar","Mass Suggestion","Move Earth","Otiluke’s Freezing Sphere","Otto’s Irresistible Dance","Programmed Illusion","Scatter","Sunbeam","True Seeing","Wall of Ice"]),
    7: N(["Delayed Blast Fireball","Etherealness","Finger of Death","Forcecage","Mirage Arcane","Mordenkainen’s Magnificent Mansion","Mordenkainen’s Sword","Plane Shift","Prismatic Spray","Project Image","Reverse Gravity","Sequester","Simulacrum","Symbol","Teleport"]),
    8: N(["Antimagic Field","Antipathy/Sympathy","Clone","Control Weather","Demiplane","Dominate Monster","Feeblemind","Incendiary Cloud","Maze","Mighty Fortress","Mind Blank","Power Word Stun","Sunburst","Telepathy"]),
    9: N(["Astral Projection","Foresight","Gate","Imprisonment","Meteor Swarm","Power Word Kill","Prismatic Wall","Shapechange","Time Stop","True Polymorph","Weird","Wish"]),
  },
};

// ---------- MAGIC ITEM REGISTRY (offline, full detail) ----------

function MI(category, rarity, attune, desc, stats){
  const o = { category, rarity, attune, desc };
  if(stats) o.stats = stats;
  return o;
}

const MAGIC_ITEM_REGISTRY = {
  'Potion of Healing': MI('Potion','Common',false,'A vial of red liquid that glimmers when agitated. Drinking it as an action restores 2d4 + 2 hit points.'),
  'Potion of Climbing': MI('Potion','Common',false,'This gritty, dense liquid tastes of damp soil. For 1 hour after drinking it, you gain a climbing speed equal to your walking speed, and advantage on Strength (Athletics) checks made to climb.'),
  'Potion of Water Breathing': MI('Potion','Common',false,'Drinking this transparent, faintly fishy-smelling liquid lets you breathe underwater for 1 hour.'),
  'Alchemist\u2019s Fire': MI('Adventuring Gear','Common',false,'This sticky, adhesive fluid ignites when exposed to air. As an action you can throw a flask up to 20 feet, dealing 1d4 fire damage immediately and 1d4 more at the start of each of the target\u2019s turns until someone uses an action to put out the fire.'),
  'Cloak of Billowing': MI('Wondrous Item','Common',false,'While wearing this cloak, you can use a bonus action to make it billow dramatically for 1 minute. Purely cosmetic, it has no combat effect, but it always looks fantastic.'),
  'Bead of Nourishment': MI('Wondrous Item','Common',false,'This small, dense bead can be crushed and eaten as an action, providing enough nourishment to sustain a creature for one day.'),
  'Spell Scroll (Cantrip)': MI('Scroll','Common',false,'A scroll bearing a single inscribed cantrip. Any creature that can read the scroll\u2019s language can cast the cantrip from it without needing to know the spell or expend a spell slot.'),
  'Candle of the Deep': MI('Wondrous Item','Common',false,'This candle burns normally even underwater, shedding light in a 30-foot radius for 6 hours, unaffected by wind or water.'),

  'Bag of Holding': MI('Wondrous Item','Uncommon',false,'This bag\u2019s interior is an extradimensional space that can hold up to 500 pounds, not exceeding 64 cubic feet, weighing only 15 pounds regardless of contents. If overloaded, or if a creature climbs inside, it must save or be pulled into the Astral Plane.'),
  'Cloak of Protection': MI('Wondrous Item','Uncommon',true,'You gain a +1 bonus to Armor Class and saving throws while wearing this cloak.','+1 AC, +1 to all saving throws'),
  'Boots of Elvenkind': MI('Wondrous Item','Uncommon',false,'While wearing these boots, your steps make no sound, regardless of the surface you\u2019re moving across, and you have advantage on Dexterity (Stealth) checks that rely on moving silently.'),
  'Wand of Magic Missiles': MI('Wand','Uncommon',false,'This wand has 7 charges. You can expend 1 or more charges to cast magic missile (1 charge per spell level, up to 4th), regaining 1d6+1 charges each dawn.'),
  'Gauntlets of Ogre Power': MI('Wondrous Item','Uncommon',true,'Your Strength score is 19 while you wear these gauntlets, with no effect if your Strength is already 19 or higher.'),
  'Ring of Protection': MI('Ring','Uncommon',true,'You gain a +1 bonus to Armor Class and saving throws while wearing this ring.','+1 AC, +1 to all saving throws'),
  'Bag of Tricks': MI('Wondrous Item','Uncommon',false,'This furry bag appears empty, but reaching inside and pulling out a bit of fur summons a Small or smaller animal that acts on your turn as an ally, then disappears after 10 minutes. Usable three times before recharging the next dawn.'),
  'Boots of Striding and Springing': MI('Wondrous Item','Uncommon',true,'While wearing these boots your walking speed becomes 30 feet unless higher, your long jump distance triples, and your high jump doubles.'),
  'Headband of Intellect': MI('Wondrous Item','Uncommon',true,'Your Intelligence score is 19 while wearing this headband, with no effect if your Intelligence is already 19 or higher.'),
  'Driftglobe': MI('Wondrous Item','Uncommon',false,'This 6-inch crystal orb can be commanded to shed light like a torch, and can also be programmed to float in place and glow in response to a trigger you set, such as sound or movement nearby.'),
  'Potion of Greater Healing': MI('Potion','Uncommon',false,'A more potent brew than a basic healing potion. Drinking it restores 4d4 + 4 hit points.'),
  'Potion of Fire Breath': MI('Potion','Uncommon',false,'Drinking this bubbling, red-flecked liquid lets you exhale fire as an action, dealing 4d6 fire damage to everyone in a 15-foot cone unless they succeed on a Dexterity save. The effect can be used again within the hour before the potion is spent.'),
  'Potion of Growth': MI('Potion','Uncommon',false,'Drinking this bittersweet liquid causes you to grow one size category for 1d4 hours, as though affected by the enlarge effect of the enlarge/reduce spell.'),
  'Elemental Gem': MI('Wondrous Item','Uncommon',false,'This gem contains a bound elemental spirit tied to its color. Crushing the gem summons an elemental of the matching type, which serves you loyally for 1 hour.'),
  'Instrument of Illusions': MI('Wondrous Item (instrument)','Uncommon',true,'While you play this instrument, you can create harmless, illusory sensory effects, such as faint music, glowing shapes, ghostly images, as an action, similar to a minor illusion spell.'),
  'Sending Stones': MI('Wondrous Item','Uncommon',false,'This item comes in a pair of matched stones, each attuned to the other. Once per day, the holder of one can send a short telepathic message to the holder of the other, regardless of distance, so long as they\u2019re on the same plane.'),
  'Necklace of Fireballs': MI('Wondrous Item','Uncommon',false,'This cord holds a number of golden beads. Pulling a bead free and throwing it detonates it into a fireball of varying strength depending on the necklace\u2019s remaining beads.'),
  'Immovable Rod': MI('Rod','Uncommon',false,'This iron rod has a button on one end. Pressing it fixes the rod immovably in place in midair or against a surface, able to support up to 8,000 pounds before breaking free, until the button is pressed again.'),
  'Bracers of Archery': MI('Wondrous Item','Uncommon',true,'While wearing these bracers, you gain proficiency with the longbow and shortbow, and you gain a +2 bonus to damage rolls on ranged attacks made with such weapons.','+2 damage on ranged attacks with longbows/shortbows (no bonus to hit)'),
  'Pearl of Power': MI('Wondrous Item','Uncommon',true,'While holding this pearl, you can use it once per day to regain one expended spell slot of up to 3rd level.'),
  'Cloak of Elvenkind': MI('Wondrous Item','Uncommon',true,'While wearing this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage, and you have advantage on Dexterity (Stealth) checks to hide, as the cloak shifts to match its surroundings.'),
  'Boots of the Winterlands': MI('Wondrous Item','Uncommon',true,'These fur-lined boots grant resistance to cold damage, let you tolerate cold environments without penalty, and your walking speed isn\u2019t reduced by ice or snow difficult terrain.'),
  'Eyes of the Eagle': MI('Wondrous Item','Uncommon',true,'While wearing these crystal lenses, you have advantage on Wisdom (Perception) checks that rely on sight, and can see up to a mile away as clearly as within 100 feet.'),
  'Gloves of Thievery': MI('Wondrous Item','Uncommon',false,'While wearing these gloves, you gain a +5 bonus to Dexterity (Sleight of Hand) checks and to any check made to pick a lock.'),
  'Hat of Disguise': MI('Wondrous Item','Uncommon',true,'While wearing this hat, you can cast disguise self at will, changing your appearance until you use an action to dismiss the effect.'),
  'Rope of Climbing': MI('Wondrous Item','Uncommon',false,'This 60-foot rope can animate at a command word, climbing, coiling, knotting, or moving as you direct, and can lift up to 3,000 pounds.'),
  'Wand of Web': MI('Wand','Uncommon',true,'This wand has 7 charges. You can expend 1 to cast the web spell, regaining 1d6+1 charges each dawn.'),
  'Alchemy Jug': MI('Wondrous Item','Uncommon',false,'Once per day this jug can produce two gallons of a chosen mundane liquid (vinegar, oil, fresh water, and more) pouring out at a controlled rate.'),
  'Decanter of Endless Water': MI('Wondrous Item','Uncommon',false,'This jug produces fresh or salt water when a command word is spoken, ranging from a gentle stream to a raging flood depending on the word used.'),
  'Circlet of Blasting': MI('Wondrous Item','Uncommon',true,'While wearing this circlet, you can cast scorching ray once per day, using an attack bonus of +5.'),
  'Goggles of Night': MI('Wondrous Item','Uncommon',false,'While wearing these dark lenses, you gain darkvision out to 60 feet, or your existing darkvision is extended by that much.'),
  'Medallion of Thoughts': MI('Wondrous Item','Uncommon',true,'While wearing this medallion, you can use an action to cast detect thoughts (save DC 13) 3 times per day, regaining all uses at dawn.'),

  '+1 Weapon': MI('Weapon (any)','Uncommon',false,'A weapon of your choice, sword, axe, bow, whatever base weapon you\u2019re carrying, humming faintly with enchantment. Use the base weapon\u2019s normal damage die and type; this bonus applies on top of it.','+1 to attack and damage rolls. Damage dice and type follow whatever weapon it\u2019s applied to (e.g. a +1 Longsword deals 1d8+1 slashing).'),
  '+1 Armor': MI('Armor (any)','Uncommon',false,'A suit of armor, light, medium, or heavy, whichever base armor you\u2019re wearing, subtly reinforced by enchantment.','+1 to AC on top of the base armor\u2019s AC (e.g. +1 Chain Mail is AC 17).'),
  '+1 Shield': MI('Armor (shield)','Uncommon',false,'An ordinary shield reinforced by enchantment.','+1 AC on top of a shield\u2019s normal +2 (so +3 AC total while held).'),
  'Ammunition, +1': MI('Weapon (ammunition)','Uncommon',false,'A set of arrows, bolts, or sling bullets etched with faint runes. The bonus is lost once the ammunition is used, unless it\u2019s recovered undamaged.','+1 to attack and damage rolls when fired. Non-magical once it hits (for resistance purposes) until drawn again.'),

  'Flame Tongue': MI('Weapon (any sword)','Rare',true,'While holding this sword, you can use a bonus action to speak its command word, causing flames to engulf the blade, shedding bright light in a 40-foot radius and dealing an extra 2d6 fire damage on a hit. Another command word, or sheathing the sword, ends the effect.','No inherent bonus to attack/damage rolls, deals the base sword\u2019s normal damage, plus +2d6 fire damage while ignited.'),
  'Ring of Spell Storing': MI('Ring','Rare',true,'This ring stores spells cast into it, holding up to 5 total spell levels at once. Any creature wearing the ring can cast a stored spell, using the ring\u2019s stored charge instead of expending its own spell slot.'),
  'Sun Blade': MI('Weapon (longsword)','Rare',true,'This item appears as a longsword hilt; grasping it and speaking its command word causes a blade of pure radiance to spring forth, dealing radiant instead of slashing damage and shedding bright light in a 15-foot radius. It deals extra radiant damage against undead.','+2 to attack and damage rolls. 1d8 radiant damage (1d10 two-handed) in place of the longsword\u2019s normal slashing damage. Extra 1d8 radiant damage against undead.'),
  'Wand of Fireballs': MI('Wand','Rare',true,'This wand has 7 charges. You can expend 1 or more charges to cast fireball (1 charge per spell level above 3rd), regaining 1d6+1 charges each dawn.'),
  'Cloak of Displacement': MI('Wondrous Item','Rare',true,'While wearing this cloak, it projects an illusion that makes you appear to be standing in a spot near your actual location, giving attackers disadvantage on attack rolls against you, until you take damage or use an action to suppress the effect for a turn.'),
  'Boots of Speed': MI('Wondrous Item','Rare',true,'While wearing these boots, you can click their heels together as a bonus action to double your walking speed and impose disadvantage on melee attacks against you, for up to 10 minutes total per day, usable in 1-minute increments.'),
  'Belt of Hill Giant Strength': MI('Wondrous Item','Rare',true,'Your Strength score is 21 while you wear this belt, with no effect if your Strength is already 21 or higher.'),
  'Wand of Wonder': MI('Wand','Rare',true,'This wand has 7 charges. Expending a charge unleashes a random, unpredictable magical effect from a wide table of possibilities, anything from a burst of flowers to a lightning bolt.'),
  'Wand of Paralysis': MI('Wand','Rare',true,'This wand has 7 charges. You can expend one to fire a shimmering ray at a creature, paralyzing it for 1 minute unless it succeeds on a Constitution save.'),
  'Chime of Opening': MI('Wondrous Item','Rare',false,'This hollow metal tube has 10 charges. Striking it against a surface and expending a charge causes a door, lid, or similar barrier within 120 feet to unlock and swing open, even bypassing many forms of magical locking.'),
  'Boots of Levitation': MI('Wondrous Item','Rare',true,'While wearing these boots, you can use an action to cast the levitate spell on yourself at will, requiring no components and no concentration to maintain.'),
  'Cloak of the Bat': MI('Wondrous Item','Rare',true,'While wearing this cloak you gain advantage on Dexterity (Stealth) checks in dim light or darkness. In dim light or darkness you can also cast darkvision on yourself, and once per day, transform into a bat for up to 1 hour, able to revert early as a bonus action.'),
  'Dwarven Thrower': MI('Weapon (warhammer)','Rare',true,'This dwarf-forged warhammer grants a +1 bonus to attack and damage rolls, and when thrown it returns to your hand immediately after the attack. Against giants, it deals an extra 2d6 damage.','+1 to attack and damage rolls. 1d8 bludgeoning (warhammer, one-handed) or 1d10 (two-handed). +2d6 extra damage against giants.'),
  'Amulet of Health': MI('Wondrous Item','Rare',true,'Your Constitution score is 19 while you wear this amulet, with no effect if your Constitution is already 19 or higher.'),
  'Belt of Fire Giant Strength': MI('Wondrous Item','Rare',true,'Your Strength score is 25 while you wear this belt, with no effect if your Strength is already 25 or higher.'),
  'Ring of Free Action': MI('Ring','Rare',true,'While wearing this ring, difficult terrain doesn\u2019t cost you extra movement, and magic can\u2019t reduce your speed or cause you to be paralyzed or restrained.'),
  'Helm of Telepathy': MI('Wondrous Item','Rare',true,'While wearing this helm, you can cast detect thoughts at will, and can communicate telepathically with any creature within 30 feet that you can see.'),
  'Necklace of Adaptation': MI('Wondrous Item','Rare',true,'While wearing this necklace, you can breathe normally in any environment and gain resistance to harmful gases and vapors.'),
  'Wings of Flying': MI('Wondrous Item','Rare',true,'While wearing this cloak-like item, you can speak a command word to sprout feathered wings, granting a flying speed of 60 feet for up to an hour of total use per day.'),
  'Instant Fortress': MI('Wondrous Item','Rare',false,'This tiny model tower expands into a full stone fortress when thrown to the ground and its command word spoken, complete with a lockable door and arrow slits.'),
  'Rope of Entanglement': MI('Wondrous Item','Rare',false,'This rope animates on command to grapple and restrain a creature, wrapping tightly around it and any others nearby.'),
  'Ring of X-ray Vision': MI('Ring','Rare',true,'While wearing this ring, you can use an action to see through solid objects out to 30 feet, though prolonged use risks exhaustion.'),
  'Ring of Water Walking': MI('Ring','Rare',false,'While wearing this ring, you can stand on and move across any liquid surface as though it were solid ground.'),
  'Robe of Scintillating Colors': MI('Wondrous Item','Rare',true,'This robe can be activated to shimmer with dazzling, shifting colors, potentially blinding nearby creatures who look at you.'),

  '+2 Weapon': MI('Weapon (any)','Rare',false,'A weapon of your choice, more strongly enchanted than a +1 weapon. Use the base weapon\u2019s normal damage die and type; this bonus applies on top of it.','+2 to attack and damage rolls. Damage dice and type follow whatever weapon it\u2019s applied to (e.g. a +2 Shortsword deals 1d6+2 piercing).'),
  '+2 Armor': MI('Armor (any)','Rare',false,'A suit of armor, light, medium, or heavy, more strongly enchanted than +1 armor.','+2 to AC on top of the base armor\u2019s AC (e.g. +2 Studded Leather is AC 14 + Dex modifier).'),
  '+2 Shield': MI('Armor (shield)','Rare',false,'A shield more strongly enchanted than a +1 shield.','+2 AC on top of a shield\u2019s normal +2 (so +4 AC total while held).'),
  'Ammunition, +2': MI('Weapon (ammunition)','Rare',false,'Arrows, bolts, or sling bullets bearing a stronger enchantment than +1 ammunition. The bonus is lost once the ammunition is used, unless it\u2019s recovered undamaged.','+2 to attack and damage rolls when fired.'),

  'Frost Brand': MI('Weapon (any sword)','Very Rare',true,'This sword deals an extra 1d6 cold damage on a hit and extinguishes flames within 30 feet when drawn. While you hold it, you have resistance to fire damage.','No inherent bonus to attack/damage rolls, deals the base sword\u2019s normal damage, plus +1d6 cold damage. Resistance to fire damage while holding it.'),
  'Staff of Power': MI('Staff','Very Rare',true,'This staff has 20 charges and can be used as a spellcasting focus, adding +2 to your spell attack rolls and spell save DC while you hold it. It can be expended to cast a variety of powerful spells such as cone of cold or lightning bolt.','+2 to spell attack rolls and spell save DC while held (as a spellcasting focus). Also usable as a magic quarterstaff: +2 to attack and damage rolls, 1d6+2 bludgeoning (1d8+2 two-handed).'),
  'Ring of Regeneration': MI('Ring','Very Rare',true,'While wearing this ring you regain 1d6 hit points every 10 minutes, so long as you have at least 1 hit point. Given enough time, it can even regrow a severed body part.'),
  'Manual of Bodily Health': MI('Wondrous Item','Very Rare',false,'A book of exercises and diet regimens. Studying it for 48 hours over a period of 6 days permanently increases your Constitution score by 2, up to a maximum of 30, and the book then loses its magic.'),
  'Carpet of Flying': MI('Wondrous Item','Very Rare',false,'This carpet flies at a speed depending on its size, carrying passengers up to a weight limit, and obeys the verbal commands of anyone standing or sitting on it.'),
  'Rod of Absorption': MI('Rod','Very Rare',false,'This rod can absorb spell energy directed at you, negating the spell and storing its levels for you to later expend to power your own spellcasting.'),
  'Robe of Stars': MI('Wondrous Item','Very Rare',true,'This black robe is spangled with sparkling dots like the night sky. You gain resistance to piercing damage while wearing it, and can pluck up to 6 stars from it, throwing each as a ranged attack that deals 4d8 force damage, or once per day using two stars to cast the spell shooting star for greater effect.'),
  'Horn of Valhalla': MI('Wondrous Item','Very Rare',true,'Blowing this drinking horn summons spectral warriors (2 to 4 depending on the horn\u2019s type) who fight on your behalf for 1 hour before disappearing. It can only be used once every 7 days, and repeated use risks the horn becoming permanently non-magical before vanishing, usable a limited number of times before it needs a long rest to recharge.'),
  'Ring of Telekinesis': MI('Ring','Very Rare',true,'While wearing this ring, you can cast the telekinesis spell at will, targeting only objects that aren\u2019t being worn or carried, without requiring concentration to maintain for its full duration.'),
  'Belt of Cloud Giant Strength': MI('Wondrous Item','Very Rare',true,'Your Strength score is 27 while you wear this belt, with no effect if your Strength is already 27 or higher.'),
  'Mantle of Spell Resistance': MI('Wondrous Item','Very Rare',true,'While wearing this cloak, you have advantage on saving throws against spells, and resistance to the damage they deal.'),
  'Ring of Shooting Stars': MI('Ring','Very Rare',true,'This ring has charges. You can expend 1 to cast light for an hour, 2 to hurl a glowing mote that deals 2d4 force damage, 5 to cast wall of light, or use its final rare property once per month to summon a swirling cloud of light at night, and once per day, invoke a shower of shooting stars that deals significant damage in a wide area.'),
  'Mirror of Life Trapping': MI('Wondrous Item','Very Rare',false,'This ornate mirror can trap a creature that sees its own reflection within an extradimensional space inside the glass, unless it succeeds on a saving throw.'),
  'Cube of Force': MI('Wondrous Item','Very Rare',true,'This cube can generate an invisible cubic wall of force around itself, selectively blocking damage, gas, or living creatures depending on how it\u2019s configured.'),
  'Crystal Ball': MI('Wondrous Item','Very Rare',true,'Gazing into this orb lets you cast scrying at will, without requiring a material component focus for the spell.'),
  'Manual of Quickness of Action': MI('Wondrous Item','Very Rare',false,'A book of exercises. Studying it for 48 hours over 6 days permanently increases your Dexterity score by 2, up to a maximum of 30, after which the book loses its magic.'),
  'Tome of Clear Thought': MI('Wondrous Item','Very Rare',false,'A book of logic puzzles. Studying it for 48 hours over 6 days permanently increases your Intelligence score by 2, up to a maximum of 30, after which the book loses its magic.'),
  'Sword of Sharpness': MI('Weapon (any sword)','Very Rare',true,'This sword grants a bonus to attack and damage rolls. On an unmodified attack roll of 20 that hits, it deals a large amount of extra damage and can sever a limb from certain creatures, potentially killing them outright.','+3 to attack and damage rolls. Damage dice and type follow whatever sword it\u2019s applied to. On an unmodified attack roll of 20 that hits, deals an extra 4d6 damage and may sever a limb.'),
  'Cloak of Arachnida': MI('Wondrous Item','Very Rare',true,'This cloak grants resistance to poison damage, a climbing speed equal to your walking speed, and has charges usable to cast web (up to 3 times per day) or to make a poisonous bite attack dealing 4d8 poison damage, once per turn.'),

  '+3 Weapon': MI('Weapon (any)','Very Rare',false,'A weapon of your choice, powerfully enchanted. Use the base weapon\u2019s normal damage die and type; this bonus applies on top of it.','+3 to attack and damage rolls. Damage dice and type follow whatever weapon it\u2019s applied to (e.g. a +3 Greatsword deals 2d6+3 slashing).'),
  '+3 Armor': MI('Armor (any)','Very Rare',false,'A suit of armor, light, medium, or heavy, powerfully enchanted.','+3 to AC on top of the base armor\u2019s AC (e.g. +3 Plate is AC 21).'),
  '+3 Shield': MI('Armor (shield)','Very Rare',false,'A powerfully enchanted shield.','+3 AC on top of a shield\u2019s normal +2 (so +5 AC total while held).'),
  'Ammunition, +3': MI('Weapon (ammunition)','Very Rare',false,'Arrows, bolts, or sling bullets bearing a powerful enchantment. The bonus is lost once the ammunition is used, unless it\u2019s recovered undamaged.','+3 to attack and damage rolls when fired.'),

  'Vorpal Sword': MI('Weapon (any sword)','Legendary',true,'This sword scores a critical hit on an attack roll of 19 or 20. On a critical hit against a creature with a head, that creature is decapitated if it has none left to live without its head, instantly killing it.','+3 to attack and damage rolls. Damage dice and type follow whatever sword it\u2019s applied to. Critical hit on a roll of 19 or 20; decapitates on a critical hit.'),
  'Deck of Many Things': MI('Wondrous Item','Legendary',false,'A deck of 22 enchanted cards. Drawing one and following its instructions triggers a powerful, often unpredictable effect, good or bad, determined by that card, ranging from bestowing wishes to summoning enemies or draining levels.'),
  'Staff of the Magi': MI('Staff','Legendary',true,'This staff has 50 charges and functions as a spellcasting focus granting advantage on saves against spells. It can absorb spell energy directed at you, cast a wide range of powerful spells, and even has an emergency retributive strike as a last resort.','+2 to spell attack rolls and spell save DC while held. Also usable as a magic quarterstaff: +2 to attack and damage rolls, 1d6+2 bludgeoning (1d8+2 two-handed).'),
  'Ring of Three Wishes': MI('Ring','Legendary',false,'This ring has 3 charges. While wearing it, you can expend one charge to cast the wish spell, and the ring loses all magic once its charges are exhausted.'),
  'Armor of Invulnerability': MI('Armor (plate)','Legendary',true,'While wearing this plate armor, you have resistance to nonmagical damage. You can also use an action to gain temporary immunity to nonmagical damage for 10 minutes, usable once per long rest.','AC 18 (base plate armor, no Dex bonus) + resistance to nonmagical bludgeoning/piercing/slashing damage.'),
  'Belt of Storm Giant Strength': MI('Wondrous Item','Legendary',true,'Your Strength score is 29 while you wear this belt, with no effect if your Strength is already 29 or higher.'),
  'Plate Armor of Etherealness': MI('Armor (plate)','Legendary',true,'This plate armor lets you use an action to become ethereal, along with everything you are wearing and carrying, allowing you to see and move through the Ethereal Plane.','AC 18 (base plate armor, no Dex bonus). No inherent AC bonus beyond that of plate itself.'),
  'Rod of Lordly Might': MI('Rod','Legendary',true,'This heavy rod bears six sharp buttons, each activating it as a different weapon type, flail, battleaxe, and more, along with additional powerful properties, including one that can drain a foe\u2019s life force to temporarily boost your own.','+3 to attack and damage rolls in any of its weapon forms (flail 1d8+3, battleaxe 1d8+3, and others), each also dealing an extra 2d6 damage of a type matching the button pressed.'),
  'Robe of the Archmagi': MI('Wondrous Item','Legendary',true,'A robe worked with sigils of arcane power. While you wear it without armor, your base Armor Class is 15 + your Dexterity modifier, you have advantage on saving throws against spells and other magical effects, and your spell save DC and spell attack bonus each increase by 2.','Unarmored AC 15 + DEX, advantage on saves vs. spells, +2 spell save DC and spell attack'),
  'Ring of Invisibility': MI('Ring','Legendary',true,'While wearing this ring, you can turn invisible as an action, remaining so until you attack, cast a spell, or use an action to become visible again.'),
  'Iron Flask': MI('Wondrous Item','Legendary',false,'This heavy flask can be used to trap an extraplanar creature that fails a saving throw, holding it captive until the flask is opened or destroyed.'),
  'Ring of Elemental Command': MI('Ring','Legendary',true,'This powerful ring is attuned to one of the four elements, granting immunity to that element\u2019s damage, influence over related creatures, and other potent abilities.'),
  'Sphere of Annihilation': MI('Wondrous Item','Legendary',true,'This 2-foot-diameter sphere of absolute blackness is a hole in the fabric of reality, disintegrating anything that touches it, and requires immense concentration to control.'),
  'Talisman of the Sphere': MI('Wondrous Item','Legendary',true,'While holding this talisman, you gain advantage on the Intelligence (Arcana) check made to control a nearby sphere of annihilation.'),

  // Common
  'Armor of Gleaming': MI('Armor','Common',false,'This armor resists staining and dirt, always looking freshly polished no matter how it\u2019s treated.'),
  'Bead of Refreshment': MI('Wondrous Item','Common',false,'Crushing this bead transforms up to a pint of nonmagical liquid into cool, fresh drinking water.'),
  'Boots of False Tracks': MI('Wondrous Item','Common',false,'These boots leave tracks resembling a different type of creature of the same size as you, useful for throwing off pursuers.'),
  'Cloak of Many Fashions': MI('Wondrous Item','Common',false,'As an action, you can change the style, color, and apparent quality of this cloak, along with any garment worn beneath it.'),
  'Clothes of Mending': MI('Wondrous Item','Common',false,'This set of ordinary traveler\u2019s clothes magically mends itself over the course of a day, undoing daily wear and tear.'),
  'Dread Helm': MI('Wondrous Item','Common',false,'This helm can be activated to make your eyes glow with a menacing red light, granting advantage on Intimidation checks for as long as you keep it active.'),
  'Ersatz Eye': MI('Wondrous Item','Common',true,'This artificial eye can replace a real one that\u2019s been lost, letting you see normally through it once attuned.'),
  'Hat of Wizardry': MI('Wondrous Item','Common',true,'While wearing this hat, you can cast one wizard cantrip of your choice, using Intelligence as your spellcasting ability, subject to a check if you\u2019re not already a spellcaster.'),
  'Mystery Key': MI('Wondrous Item','Common',false,'This ordinary-looking key has a small but real chance of unlocking any one lock, once, before losing its magic.'),
  'Orb of Direction': MI('Wondrous Item','Common',false,'Holding this orb and concentrating for a moment reveals which direction is north.'),
  'Pole of Collapsing': MI('Wondrous Item','Common',false,'As an action, this 10-foot pole can be collapsed into a compact 1-foot rod, or extended back to its full length.'),
  'Ruby of the War Mage': MI('Wondrous Item','Common',true,'This ruby can be fixed to a simple or martial weapon, letting you use that weapon as a spellcasting focus.'),
  'Talking Doll': MI('Wondrous Item','Common',true,'This doll can be set to speak a short scripted line, up to six sentences, whenever a condition you\u2019ve specified is triggered.'),
  'Unbreakable Arrow': MI('Weapon','Common',false,'This arrow cannot be broken by any means short of an antimagic field, though it functions as a normal arrow in all other respects.'),
  'Veteran\u2019s Cane': MI('Wondrous Item','Common',false,'This unassuming wooden cane can be transformed, once, into a fully functional longsword, and back again.'),
  'Wand of Pyrotechnics': MI('Wand','Common',false,'This wand has 7 charges, usable to create a harmless burst of colorful sparks or a puff of thick smoke from an existing fire source.'),

  // Uncommon
  'Bracers of Defense': MI('Wondrous Item','Uncommon',true,'While wearing these bracers and not using a shield or armor, you gain a +2 bonus to your Armor Class.'),
  'Brooch of Shielding': MI('Wondrous Item','Uncommon',true,'While wearing this brooch, you gain resistance to force damage and immunity to damage from the magic missile spell.'),
  'Broom of Flying': MI('Wondrous Item','Uncommon',false,'This flying broom can carry a rider (or two at reduced speed) at a flying speed of 50 feet, obeying spoken commands to fly toward a named destination.'),
  'Cap of Water Breathing': MI('Wondrous Item','Uncommon',false,'While wearing this cap underwater, you can breathe normally, as though on dry land.'),
  'Cast-off Armor': MI('Armor','Common',false,'This armor can be removed as a single action, far faster than armor normally allows.'),
  'Cloak of the Manta Ray': MI('Wondrous Item','Uncommon',false,'While wearing this cloak, you can breathe underwater and gain a swimming speed of 60 feet.'),
  'Dagger of Venom': MI('Weapon','Rare',false,'This magic dagger grants a +1 bonus to attack and damage rolls. Once per day, you can coat the blade in poison before striking, forcing a Constitution save or dealing extra poison damage and poisoning the target for a minute.'),
  'Dust of Disappearance': MI('Wondrous Item','Uncommon',false,'Throwing a pinch of this dust into the air turns you and everything you\u2019re wearing or carrying invisible for several minutes.'),
  'Dust of Dryness': MI('Wondrous Item','Uncommon',false,'This pouch holds several pinches of dust. Each pinch thrown onto water absorbs up to 100 gallons into a small pellet, which can later be crushed to release the water again.'),
  'Eversmoking Bottle': MI('Wondrous Item','Uncommon',false,'Opening this bottle releases a cloud of thick smoke that fills a large area, heavily obscuring it until the bottle is stoppered again.'),
  'Eyes of Charming': MI('Wondrous Item','Uncommon',true,'This item grants 3 charges you can use to cast charm person (save DC 13), regaining all expended charges each dawn.'),
  'Eyes of Minute Seeing': MI('Wondrous Item','Uncommon',false,'While wearing these small lenses over your eyes, you have advantage on Intelligence (Investigation) checks that rely on close-up sight.'),
  'Figurine of Wondrous Power': MI('Wondrous Item','Rare',false,'This small statuette can be animated into a real, obedient creature (the exact type depending on the figurine) for up to 12 hours a day, usable once every several days depending on the specific figurine.'),
  'Gem of Brightness': MI('Wondrous Item','Uncommon',false,'This crystal prism has 50 charges. Spending 1 sheds light in a 30-foot radius for an hour, and spending 4 as an action creates a blinding flash in a 30-foot cone, forcing a Constitution save or blindness for 1 minute.'),
  'Gloves of Missile Snaring': MI('Wondrous Item','Uncommon',true,'While wearing these gloves, you can use your reaction to catch a ranged weapon attack that would hit you, reducing its damage by 1d10 plus your Dexterity modifier (potentially to 0), and negating it entirely if that reduces it to 0.'),
  'Gloves of Swimming and Climbing': MI('Wondrous Item','Uncommon',true,'While wearing these gloves, you have a climbing speed and a swimming speed equal to your walking speed.'),
  'Helm of Comprehending Languages': MI('Wondrous Item','Uncommon',false,'While wearing this helm, you can understand the literal meaning of any spoken language you hear.'),
  'Javelin of Lightning': MI('Weapon','Uncommon',false,'When thrown, this javelin transforms into a bolt of lightning, forming a 5-foot-wide, 120-foot-long line that deals 4d6 lightning damage to anyone caught in it, half on a successful DC 13 Dexterity save, before the javelin is destroyed.'),
  'Keoghtom\u2019s Ointment': MI('Wondrous Item','Uncommon',false,'This jar of ointment holds a few doses. Applying one to a creature\u2019s skin heals a modest amount of damage, cures poison, and ends any disease.'),
  'Lantern of Revealing': MI('Wondrous Item','Uncommon',false,'While lit, this lantern sheds normal light and also causes invisible creatures and objects within that light to become visible.'),
  'Mariner\u2019s Armor': MI('Armor','Uncommon',false,'This sea-worn armor grants a swimming speed equal to your walking speed, and lets you breathe water for a short time each day.'),
  'Mithral Armor': MI('Armor','Uncommon',false,'This finely wrought armor is so light that wearing it never imposes disadvantage on Dexterity (Stealth) checks, nor does it count against your Strength requirement.'),
  'Periapt of Health': MI('Wondrous Item','Uncommon',false,'While wearing this pendant, you are immune to contracting any disease.'),
  'Periapt of Wound Closure': MI('Wondrous Item','Uncommon',true,'While wearing this pendant, you stabilize automatically whenever you drop to 0 hit points, and you regain extra hit points whenever you heal naturally.'),
  'Pipes of Haunting': MI('Wondrous Item','Uncommon',false,'Playing these pipes for 1 minute creates an eerie, spectral sound, forcing each creature within 30 feet to succeed on a DC 15 Wisdom save or become frightened for that minute.'),
  'Potion of Animal Friendship': MI('Potion','Uncommon',false,'Drinking this potion lets you cast animal friendship (save DC 13) at will for 1 hour, letting you calm and befriend nearby beasts.'),
  'Potion of Poison': MI('Potion','Uncommon',false,'This vial looks and smells like a potion of healing, but is actually a poison. Whoever drinks it takes 3d6 poison damage and must succeed on a DC 13 Constitution save or become poisoned for 1 hour.'),
  'Potion of Resistance': MI('Potion','Uncommon',false,'Drinking this potion grants you resistance to one type of damage (fixed when the potion is brewed) for 1 hour.'),
  'Quiver of Ehlonna': MI('Wondrous Item','Uncommon',false,'This quiver contains three extradimensional compartments, capable of holding far more arrows, bolts, or slim weapons than its size suggests.'),
  'Robe of Useful Items': MI('Wondrous Item','Uncommon',false,'This patchwork robe is covered in cloth patches, each of which can be pulled off and thrown to the ground, transforming into a useful item or tool.'),
  'Sentinel Shield': MI('Armor','Uncommon',false,'While carrying this shield, you have advantage on initiative rolls and on Wisdom (Perception) checks, in addition to its normal +2 AC.'),
  'Slippers of Spider Climbing': MI('Wondrous Item','Uncommon',true,'While wearing these slippers, you can move up, down, and across vertical surfaces and upside down along ceilings, leaving your hands free.'),
  'Stone of Good Luck': MI('Wondrous Item','Uncommon',true,'While carrying this stone (also called a luckstone), you gain a +1 bonus to ability checks and saving throws.'),
  'Trident of Fish Command': MI('Weapon','Uncommon',true,'This trident grants a +1 bonus to attack and damage rolls, and has 3 charges usable to cast dominate beast (save DC 15) on a fish or fish-like beast, regaining all charges each dawn.'),
  'Wand of Enemy Detection': MI('Wand','Rare',true,'This wand has 7 charges. While holding it, you can expend a charge to sense the direction of the nearest hostile creature within 60 feet for a minute.'),
  'Wand of Magic Detection': MI('Wand','Uncommon',false,'This wand has 3 charges, usable to cast detect magic, sensing magical auras within range.'),
  'Wand of Secrets': MI('Wand','Uncommon',false,'This wand has 3 charges, usable to sense the direction of the nearest secret door or trap within 30 feet.'),
  'Winged Boots': MI('Wondrous Item','Uncommon',true,'While wearing these boots, you can use them to fly at your walking speed for up to 4 hours total per day, usable in shorter bursts.'),
  'Wind Fan': MI('Wondrous Item','Uncommon',false,'When you use an action to fan this item open, it creates a powerful gust of wind, useful for filling a sail or blowing away gas and fog.'),

  // Rare
  'Berserker Axe': MI('Weapon','Rare',true,'This magic axe grants a +1 bonus to attack and damage rolls, and lets you fly into a rage similar to a barbarian\u2019s, though the item resists being unattuned once you\u2019ve raged with it.'),
  'Cape of the Mountebank': MI('Wondrous Item','Rare',false,'This cape lets you cast dimension door once per day, appearing and vanishing in a small puff of smoke with a smell of brimstone.'),
  'Dancing Sword': MI('Weapon','Very Rare',true,'This magic sword grants a +1 bonus to attack and damage rolls, and can be commanded to spring into the air and fight on its own, dancing and attacking independently for a short time.'),
  'Dimensional Shackles': MI('Wondrous Item','Rare',false,'These metal shackles can bind a creature so that it cannot teleport or travel to another plane of existence while wearing them, in addition to their mundane restraining function.'),
  'Elven Chain': MI('Armor','Rare',false,'This finely wrought chain shirt grants a +1 bonus to AC, and anyone can wear it as though proficient, regardless of their actual training.'),
  'Folding Boat': MI('Wondrous Item','Rare',false,'This small wooden box can be unfolded into one of three sizes of boat, complete with oars, anchor, and mast, and folded back down for easy carrying.'),
  'Giant Slayer': MI('Weapon','Rare',false,'This magic weapon grants a +1 bonus to attack and damage rolls, dealing extra damage against giants, who must also succeed on a save or be knocked prone.'),
  'Glamoured Studded Leather': MI('Armor','Rare',false,'This armor grants a +1 bonus to AC, and can be commanded to take on the appearance of ordinary clothing or a different kind of armor entirely.'),
  'Heward\u2019s Handy Haversack': MI('Wondrous Item','Rare',false,'This backpack has three extradimensional compartments capable of holding far more than its size suggests, while always weighing the same small amount and letting you retrieve items with ease.'),
  'Horn of Blasting': MI('Wondrous Item','Rare',false,'Blowing this horn (usable twice, ever) unleashes a thunderous blast in a 30-foot cone, dealing 5d6 thunder damage (half on a successful DC 15 Constitution save) and automatically shattering any nonmagical objects made of glass or crystal caught inside.'),
  'Mace of Disruption': MI('Weapon','Rare',true,'This mace grants a +1 bonus to attack and damage rolls, dealing an extra 2d6 radiant damage against fiends and undead, who must also succeed on a DC 15 Wisdom save or flee for 1 minute, and are destroyed outright if the hit reduces them to 0 hit points.'),
  'Mace of Smiting': MI('Weapon','Rare',false,'This mace grants a +1 bonus to attack and damage rolls (+3 against constructs), and can deal a devastating blow against constructs on a critical hit.'),
  'Mace of Terror': MI('Weapon','Rare',true,'This mace grants a +1 bonus to attack and damage rolls, and can be used to force nearby creatures to make a saving throw or become frightened of you.'),
  'Necklace of Prayer Beads': MI('Wondrous Item','Rare',true,'This necklace has several magic beads strung among ordinary ones, each usable once to trigger a different beneficial divine effect, from healing to blessing.'),
  'Oathbow': MI('Weapon','Very Rare',true,'When you nock an arrow with this bow and speak the name of a target, that target becomes your sworn enemy for a week, giving you advantage and bonus damage against it, at the cost of disadvantage against everyone else.'),
  'Portable Hole': MI('Wondrous Item','Rare',false,'This flat circle of black cloth can be unfolded into a 6-foot-wide hole leading to an extradimensional space, capable of storing a great deal of cargo.'),
  'Quaal\u2019s Feather Token': MI('Wondrous Item','Rare',false,'This small carved object can be activated to transform into one of several useful effects, such as an anchor, a bird, a fan, a swan boat, a tree, or a whip.'),
  'Robe of Eyes': MI('Wondrous Item','Rare',true,'This robe is covered in dozens of eyes, granting you all-around vision, darkvision, and the ability to see invisible creatures, though at the cost of vulnerability to bright-light-based attacks.'),
  'Rod of Rulership': MI('Rod','Rare',true,'Using this rod forces creatures within 120 feet to make a save or become charmed by you, obeying your commands for several hours.'),
  'Scroll of Protection': MI('Scroll','Rare',false,'Reading this scroll creates a 5-foot-radius warding circle around you lasting 5 minutes, granting advantage on saving throws against a chosen type of creature and imposing disadvantage on their attacks against you.'),
  'Shield of Missile Attraction': MI('Armor','Rare',true,'This shield grants resistance to damage from ranged weapon attacks, but is cursed to draw ranged attacks toward you preferentially over anyone else nearby, once you learn of the curse.'),
  'Stone of Controlling Earth Elementals': MI('Wondrous Item','Rare',false,'This gray stone can be used to speak with and exert magical control over an earth elemental within range.'),
  'Sword of Life Stealing': MI('Weapon','Rare',true,'This magic sword grants a +1 bonus to attack and damage rolls, and deals an extra 3d6 necrotic damage on a critical hit (unless the target is a construct or undead), which you can convert into that many temporary hit points for yourself.'),
  'Sword of Wounding': MI('Weapon','Rare',true,'This magic sword grants a +1 bonus to attack and damage rolls, and causes wounds that continue to bleed, dealing ongoing necrotic damage until magically healed.'),
  'Vicious Weapon': MI('Weapon','Rare',false,'This magic weapon deals an extra 2d6 damage of its normal type whenever you score a critical hit with it.'),
  'Wand of Binding': MI('Wand','Rare',true,'This wand has 7 charges, usable to cast hold monster or hold person, and grants advantage on saves against being paralyzed or restrained while you hold it.'),
  'Wand of Fear': MI('Wand','Rare',true,'This wand has 7 charges, usable to force a single creature to drop what it\u2019s holding and flee, or to create a cone that frightens everyone caught within it.'),
  'Wand of Lightning Bolts': MI('Wand','Rare',true,'This wand has 7 charges, usable to cast lightning bolt, regaining charges each dawn.'),
  'Wand of the War Mage +1': MI('Wand','Uncommon',true,'This wand grants a +1 bonus to attack rolls made with spells while you\u2019re holding it, and can\u2019t be seen through by counterspell or similar detection.'),

  // Very Rare / Legendary / Artifact
  'Dwarven Plate': MI('Armor','Very Rare',false,'This ornately carved plate armor grants a +2 bonus to AC, and reduces the distance you\u2019re forcibly moved by any effect.'),
  'Efreeti Bottle': MI('Wondrous Item','Very Rare',false,'Opening the stopper on this bottle has a chance of summoning a genie who serves you for an hour, though there\u2019s also a chance you instead find yourself transported to its home plane.'),
  'Horseshoes of a Zephyr': MI('Wondrous Item','Very Rare',false,'A full set of these horseshoes lets the mount wearing them fly at their normal speed, hovering safely above the ground.'),
  'Manual of Gainful Exercise': MI('Wondrous Item','Very Rare',false,'Spending a long period of time studying and following this manual\u2019s regimen permanently increases your Strength score, before the book loses its magic.'),
  'Nine Lives Stealer': MI('Weapon','Very Rare',true,'This magic sword grants a +2 bonus to attack and damage rolls, and has charges that can be expended on a critical hit to force the target to make a Constitution save or be slain instantly.'),
  'Nolzur\u2019s Marvelous Pigments': MI('Wondrous Item','Very Rare',false,'This small pot of paint can be used to create three-dimensional, fully real objects or terrain features simply by painting them, limited by the volume of pigment remaining.'),
  'Rod of Alertness': MI('Rod','Very Rare',true,'While holding this rod, you gain advantage on Wisdom (Perception) checks and initiative rolls, and can activate it as an action to grant a +1 bonus to AC and saves to yourself and allies within 10 feet, plus cast detect evil and good, see invisibility, or one of several other detection spells once per day.'),
  'Rod of Security': MI('Rod','Very Rare',false,'Activating this rod transports you and a large group of willing creatures to a paradisiacal extradimensional retreat for an extended stay, safe from harm.'),
  'Scimitar of Speed': MI('Weapon','Very Rare',true,'This magic scimitar grants a +2 bonus to attack and damage rolls, and lets you make one additional attack with it each round as a bonus action.'),
  'Staff of Fire': MI('Staff','Very Rare',true,'This staff has 10 charges, usable to cast burning hands, fireball, or wall of fire, and grants resistance to fire damage while you hold it.'),
  'Staff of Frost': MI('Staff','Very Rare',true,'This staff has 10 charges, usable to cast cone of cold, fog cloud, ice storm, or wall of ice, and grants resistance to cold damage while you hold it.'),
  'Staff of Striking': MI('Staff','Very Rare',true,'This staff functions as a magic quarterstaff with a +3 bonus to attack and damage rolls. It has 10 charges; you can expend 1 to 3 on a hit to deal an extra 1d6 force damage per charge spent, regaining 1d6+4 charges each dawn.'),
  'Staff of Thunder and Lightning': MI('Staff','Very Rare',true,'This staff functions as a magic quarterstaff with a +2 bonus to attack and damage rolls, and its charges can unleash bursts of thunder or bolts of lightning.'),
  'Staff of the Woodlands': MI('Staff','Rare',true,'This staff functions as a magic quarterstaff with a +2 bonus to attack and damage rolls for a druid, and its charges can cast a variety of nature-themed spells.'),
  'Sword of Answering': MI('Weapon','Legendary',true,'This intelligent magic sword grants a +3 bonus to attack and damage rolls, has advantage on attacks against a particular sworn nemesis, and can converse telepathically with its wielder.'),
  'Weapon of Warning': MI('Weapon','Uncommon',true,'This magic weapon grants advantage on initiative rolls, and prevents you and any allies within 30 feet from ever being surprised while it\u2019s within reach.'),

  // Common
  'Charlatan\u2019s Die': MI('Wondrous Item','Common',true,'This six-sided die can be secretly controlled to roll whatever result you want, up to 3 times per day.'),
  'Clockwork Amulet': MI('Wondrous Item','Common',false,'Once per day, this amulet can be used to replace an attack roll with a flat result of 10, in case the natural roll would have been worse.'),
  'Dark Shard Amulet': MI('Wondrous Item','Common',true,'While wearing this amulet, you can cast a warlock cantrip of your choice, subject to a check if you\u2019re not already a spellcaster.'),
  'Ear Horn of Hearing': MI('Wondrous Item','Common',false,'While holding this horn to your ear, you suppress the effects of the deafened condition on yourself.'),
  'Enduring Spellbook': MI('Wondrous Item','Common',false,'This wizard\u2019s spellbook is immune to damage from fire, water, and the passage of time.'),
  'Hat of Vermin': MI('Wondrous Item','Common',false,'This hat has 3 charges, usable to summon an ordinary bat, frog (or toad), or rat within 10 feet, regaining all charges each dawn. The summoned creature obeys your simple commands for up to 30 minutes.'),
  'Heward\u2019s Handy Spice Pouch': MI('Wondrous Item','Common',false,'This pouch has enough seasoning inside to flavor up to 5 pounds of food a day, restocking itself automatically each dawn.'),
  'Horn of Silent Alarm': MI('Wondrous Item','Common',false,'This horn has 3 charges. Sounding it alerts only a creature you designate within a mile, silently and instantly, regaining all charges each dawn.'),
  'Lock of Trickery': MI('Wondrous Item','Common',false,'This magical lock imposes disadvantage on any check made to pick it.'),
  'Moon-touched Sword': MI('Weapon','Common',false,'This sword sheds bright light in a 15-foot radius and dim light beyond that, and functions as a magic weapon.'),
  'Orb of Time': MI('Wondrous Item','Common',false,'Holding this orb and concentrating reveals roughly what time of day it currently is outside.'),
  'Perfume of Bwitching': MI('Wondrous Item','Common',false,'Wearing this perfume grants advantage on Charisma checks directed at humanoids with a challenge rating of 1 or lower, for 8 hours after applying it.'),
  'Pipe of Smoke Monsters': MI('Wondrous Item','Common',false,'Smoking from this pipe produces a puff of smoke that briefly takes the shape of a small creature before dispersing.'),
  'Pole of Angling': MI('Wondrous Item','Common',false,'This item can transform into a complete, functional fishing pole, complete with line, hook, and bait.'),
  'Pot of Awakening': MI('Wondrous Item','Common',false,'Planting a shrub in this pot and tending it causes it to grow into an awakened shrub after about a month.'),
  'Tankard of Sobriety': MI('Wondrous Item','Common',false,'Drinking alcohol from this tankard lets you enjoy the taste without becoming intoxicated.'),
  'Walloping Ammunition': MI('Weapon','Common',false,'A creature hit by this ammunition must succeed on a DC 13 Strength save or be knocked prone.'),
  'Wand of Conducting': MI('Wand','Common',false,'This wand has 3 charges, usable to create the sound of a full orchestra performing for 1 minute, following your gestures like a conductor, regaining all charges each dawn.'),
  'Wand of Scowls': MI('Wand','Common',false,'This wand has 3 charges, usable to force a humanoid within 30 feet to scowl unpleasantly for 1 minute, regaining all charges each dawn.'),
  'Wand of Smiles': MI('Wand','Common',false,'This wand has 3 charges, usable to force a humanoid within 30 feet to smile pleasantly for 1 minute, regaining all charges each dawn.'),

  // Uncommon
  'Adamantine Armor': MI('Armor','Uncommon',false,'This armor is reinforced with adamantine, turning any critical hit scored against you while you wear it into a normal hit instead.'),
  'Amulet of Proof against Detection and Location': MI('Wondrous Item','Uncommon',true,'While wearing this amulet, you are hidden from divination magic, and can\u2019t be targeted by magical scrying sensors.'),
  'Deck of Illusions': MI('Wondrous Item','Uncommon',false,'This deck of 34 cards, when one is drawn and thrown to the ground, creates a lifelike illusion of the creature depicted, lasting until it takes damage or you use an action to end it.'),
  'Dust of Sneezing and Choking': MI('Wondrous Item','Uncommon',false,'Anyone caught in the 30-foot cloud created by throwing this dust must succeed on a DC 15 Constitution save or begin coughing and retching, becoming incapacitated for 1 minute.'),
  'Instrument of Scribing': MI('Wondrous Item','Uncommon',true,'This musical instrument has 3 charges, usable to inscribe a message of up to 25 words on an object, readable only by those you designate, regaining all charges each dawn.'),
  'Iron Bands of Bilarro': MI('Wondrous Item','Uncommon',false,'Thrown at a Huge or smaller creature, this compact mass of black metal springs open and wraps around it, restraining it unless it succeeds on a DC 20 Strength save.'),
  'Oil of Slipperiness': MI('Potion','Uncommon',false,'This oil covers one Medium or smaller creature (or a 10-foot-square surface). Poured on a creature, it grants the effect of freedom of movement for 8 hours; poured on the ground, it covers a 10-foot square with the effect of the grease spell for 8 hours.'),
  'Periapt of Proof against Poison': MI('Wondrous Item','Uncommon',false,'While wearing this pendant, you are immune to poison damage and the poisoned condition.'),
  'Philter of Love': MI('Potion','Uncommon',false,'Drinking this brew charms you for 1 hour, causing you to become infatuated with the first creature you see once the potion takes effect.'),
  'Pipes of the Sewers': MI('Wondrous Item','Uncommon',true,'Playing these pipes can summon giant rats to serve you for a time, or drive away rats already present.'),
  'Potion of Giant Strength': MI('Potion','Rare',false,'Drinking this potion sets your Strength score for 1 hour, the exact value depending on the type brewed: 21 for hill giant, 23 for stone or frost, 25 for fire, 27 for cloud, or 29 for storm giant strength.'),
  'Ring of Animal Influence': MI('Ring','Rare',false,'This ring has 3 charges, usable to cast animal friendship (1 charge), fear targeting only beasts (2 charges), or speak with animals (1 charge), regaining all charges each dawn.'),
  'Ring of Feather Falling': MI('Ring','Rare',true,'While wearing this ring, you take no damage from falling, and descend at a rate of 60 feet per round.'),
  'Ring of Jumping': MI('Ring','Uncommon',true,'While wearing this ring, you can cast jump on yourself at will, using no spell slot.'),
  'Ring of Mind Shielding': MI('Ring','Uncommon',true,'While wearing this ring, you are immune to magic that would let another creature read your thoughts, determine if you\u2019re lying, or know your alignment or creature type.'),
  'Ring of Poison Resistance': MI('Ring','Rare',true,'While wearing this ring, you have resistance to poison damage and advantage on saving throws against being poisoned.'),
  'Ring of Resistance': MI('Ring','Rare',true,'While wearing this ring, you have resistance to one type of damage, fixed when the ring is made.'),
  'Ring of Swimming': MI('Ring','Uncommon',false,'While wearing this ring, you gain a swimming speed of 40 feet.'),
  'Ring of Warmth': MI('Ring','Uncommon',true,'While wearing this ring, you have resistance to cold damage, and can comfortably tolerate temperatures as low as -50 degrees Fahrenheit without additional protection.'),
  'Rod of the Pact Keeper': MI('Rod','Uncommon',true,'While holding this rod, you gain a +1 bonus (or higher for rarer versions, up to +3) to the attack rolls and saving throw DC of your warlock spells, and can use it once per day to regain a single expended spell slot.'),
  'Rope of Mending': MI('Wondrous Item','Common',false,'This rope can be cut into any number of pieces and later rejoined by holding the pieces together, restoring it to a single length.'),
  'Saddle of the Cavalier': MI('Wondrous Item','Uncommon',false,'While in this saddle, you can\u2019t be dismounted against your will unless you\u2019re incapacitated.'),
  'Smoldering Armor': MI('Armor','Common',false,'This armor continuously emits faint wisps of harmless, odorless smoke, purely for aesthetic effect.'),
  'Staff of the Adder': MI('Staff','Uncommon',true,'As an action, this staff can transform into a live, venomous snake for 1 minute, which you can command to make a melee attack dealing 1d6 piercing plus 3d6 poison damage, before you revert it back to a staff (or it reverts on its own if it takes any damage).'),
  'Staff of the Python': MI('Staff','Uncommon',true,'As an action, this staff can transform into a giant constrictor snake under your control for a time, later reverting to a staff.'),
  'Wand of the War Mage +1, +2, or +3': MI('Wand','Uncommon',true,'While holding this wand, you gain a +1, +2, or +3 bonus (matching the wand\u2019s rarity) to attack rolls made with spells, and casting a spell through it can\u2019t be seen through by counterspell or similar detection.'),

  // Rare
  'Animated Shield': MI('Armor','Very Rare',true,'As a bonus action, this shield can animate to float in your space, granting the same +2 AC benefit as holding it normally, and freeing both your hands, for as long as you remain within 5 feet of it.'),
  'Armor of Resistance': MI('Armor','Rare',true,'While wearing this armor, you have resistance to one type of damage, fixed when the armor is made.'),
  'Armor of Vulnerability': MI('Armor','Rare',true,'This cursed armor grants resistance to one of bludgeoning, piercing, or slashing damage, but also inflicts vulnerability to the other two damage types once you learn of the curse.'),
  'Arrow of Slaying': MI('Weapon','Very Rare',false,'This arrow is keyed to a particular type of creature. On a hit against that type, the target takes an extra 6d10 piercing damage unless it succeeds on a DC 17 Constitution save, after which the arrow loses its magic regardless of the save\u2019s outcome.'),
  'Arrow-Catching Shield': MI('Armor','Rare',true,'While carrying this shield, you gain the normal +2 AC from the shield, and ranged attacks that could target a creature within 5 feet of you are often magically drawn toward you instead.'),
  'Bag of Beans': MI('Wondrous Item','Rare',false,'This bag holds 3d4 dried beans. Digging a hole, planting one, and pouring water on it triggers a random effect after 1 minute, ranging from harmless to hazardous, determined by chance.'),
  'Bag of Devouring': MI('Wondrous Item','Very Rare',false,'This bag resembles a normal bag of holding, but organic matter placed inside is slowly consumed, and there\u2019s a chance any creature reaching inside gets pulled in and devoured too.'),
  'Bead of Force': MI('Wondrous Item','Rare',false,'Thrown at a point within 60 feet, this bead deals 5d4 force damage to each creature within a 10-foot radius, and any that fail a DC 15 Dexterity save become trapped inside an immobile, impenetrable magical sphere for 1 minute.'),
  'Belt of Dwarvenkind': MI('Wondrous Item','Rare',true,'While wearing this belt, you gain advantage on saving throws against poison and resistance to poison damage, and grow a full beard if you\u2019re able to.'),
  'Cloak of Invisibility': MI('Wondrous Item','Legendary',true,'While wearing this cloak, you can turn invisible at will, for up to 2 hours at a time, ending early if you attack or cast a spell, and needing 10 minutes to recharge afterward.'),
  'Daern\u2019s Instant Fortress': MI('Wondrous Item','Rare',false,'This iron cube can be activated to instantly expand into a small stone tower, complete with arrow slits and a lockable door, and can later be collapsed back down.'),
  'Demon Armor': MI('Armor','Very Rare',true,'This cursed, demonic-looking armor grants a +1 bonus to AC and turns your unarmed strikes into 1d8 slashing damage claw attacks, but is nearly impossible to remove once worn, and imposes disadvantage on saving throws against being frightened.'),
  'Dragon Slayer': MI('Weapon','Rare',false,'This magic weapon grants a +1 bonus to attack and damage rolls, dealing an extra 3d6 damage against dragons specifically.'),
  'Efreeti Chain': MI('Armor','Legendary',true,'This ornate chain shirt grants a +5 bonus to AC, immunity to fire damage, and the ability to speak and understand Primordial.'),
  'Elixir of Health': MI('Potion','Rare',false,'Drinking this elixir cures any disease you\u2019re suffering from and removes the blinded, deafened, paralyzed, and poisoned conditions.'),
  'Gem of Seeing': MI('Wondrous Item','Rare',true,'This gem has charges, usable to grant yourself truesight out to 120 feet for several minutes.'),
  'Helm of Brilliance': MI('Wondrous Item','Very Rare',true,'This helm is set with gemstones and has up to 10 charges (lost permanently as its gems shatter with use), spendable for effects including a blinding burst of light in a 30-foot radius (DC 15 Constitution save) or a 60-foot cone of fire dealing 6d6 fire damage.'),
  'Helm of Teleportation': MI('Wondrous Item','Rare',true,'This helm has 3 charges, usable to cast the teleport spell, regaining 1 charge each dawn.'),
  'Horseshoes of Speed': MI('Wondrous Item','Rare',false,'A full set of these horseshoes increases the wearer\u2019s speed by 30 feet while galloping.'),
  'Instrument of the Bards': MI('Wondrous Item','Rare',true,'One of several legendary musical instruments, each letting a bard cast a variety of powerful spells through music.'),
  'Ioun Stone': MI('Wondrous Item','Rare',true,'This small stone orbits your head and grants a benefit depending on its specific type, from enhanced ability scores to protection or awareness.'),
  'Oil of Etherealness': MI('Potion','Rare',false,'Coating yourself in this oil grants the effect of the etherealness spell for 1 hour.'),
  'Oil of Sharpness': MI('Potion','Very Rare',false,'This oil coats one weapon or up to 5 pieces of ammunition, granting a +3 bonus to attack and damage rolls for 1 hour, or until the coated item is used to hit a creature or object.'),
  'Ring of Djinni Summoning': MI('Ring','Legendary',true,'While wearing this ring, you can summon a friendly djinni to serve you for 1 hour, once per day.'),
  'Ring of Evasion': MI('Ring','Rare',true,'This ring has 2 charges, usable to automatically succeed on a failed Dexterity saving throw, regaining 1 charge each dawn.'),
  'Ring of Spell Turning': MI('Ring','Legendary',true,'While wearing this ring, you have advantage on saving throws against any spell that targets you specifically, and on a roll of 20 for that save, the spell instead targets its original caster.'),
  'Ring of the Ram': MI('Ring','Rare',true,'This ring has 3 charges, usable to make a ranged attack (+7 to hit) that deals 2d10 force damage per charge spent, potentially pushing the target back 5 feet per charge, regaining 1d3 charges each dawn.'),
  'Rod of Resurrection': MI('Rod','Legendary',true,'This rod has 5 charges, usable to cast heal (1 charge) or resurrection (5 charges), regaining 1 charge every 7 days.'),
  'Scarab of Protection': MI('Wondrous Item','Legendary',true,'While wearing this scarab, you gain a +2 bonus to all saving throws, and it has 12 charges that can be spent to automatically negate a spell cast by an aberration, fiend, or undead that specifically targets you.'),
  'Shield of Expression': MI('Armor','Common',false,'This shield is carved in the likeness of a face, and can be commanded to shift its expression for dramatic effect.'),
  'Sovereign Glue': MI('Wondrous Item','Legendary',false,'This viscous, gray adhesive permanently bonds any two objects together within 1 minute of application, and is nearly impossible to dissolve short of using a universal solvent.'),
  'Spellguard Shield': MI('Armor','Very Rare',true,'While carrying this shield, you have advantage on saving throws against spells and other magical effects, and any spell attack roll against you has disadvantage, in addition to the shield\u2019s normal +2 AC.'),
  'Staff of Charming': MI('Staff','Rare',true,'This staff has 10 charges, usable to cast charm person (1 charge), command (1 charge), or comprehend languages (2 charges), regaining 1d8+2 charges each dawn.'),
  'Staff of Healing': MI('Staff','Rare',true,'This staff has 10 charges, usable to cast cure wounds (1 charge per spell level above 1st), lesser restoration (2 charges), or mass cure wounds (5 charges), regaining 1d6+4 charges each dawn.'),
  'Staff of Swarming Insects': MI('Staff','Rare',true,'This staff has 10 charges, usable to cast giant insect (4 charges) or insect plague (5 charges), or to create a harmless swarm of flying insects that heavily obscures a 15-foot cube for 1 charge, regaining 1d8+2 charges each dawn.'),
  'Staff of Withering': MI('Staff','Rare',true,'This staff has 3 charges. As an action, you can expend 1 to make a melee spell attack dealing 2d10 necrotic damage; on a hit, the target has disadvantage on Strength checks, Strength saves, and damage rolls that use Strength for 1 hour. Charges are regained slowly, one every 1d3 days.'),
  'Sword of Vengeance': MI('Weapon','Uncommon',true,'This cursed magic sword grants a +1 bonus to attack and damage rolls, but compels you to attack the nearest creature each turn once you draw it, and can\u2019t be willingly put away once drawn.'),
  'Talisman of Pure Good': MI('Wondrous Item','Legendary',true,'This talisman can only be used by a good-aligned creature, granting a powerful defensive benefit against evil, and can be expended once to cast wish for a good-aligned purpose.'),
  'Talisman of Ultimate Evil': MI('Wondrous Item','Legendary',true,'This talisman can only be used by an evil-aligned creature, granting the ability to smite good-aligned foes, though it corrupts and eventually consumes those who aren\u2019t sufficiently evil.'),
  'Tentacle Rod': MI('Rod','Rare',true,'This rod ends in a cluster of tentacles that lash out when you make a melee spell attack with it, dealing 1d6 bludgeoning damage, and forcing the target to succeed on a DC 15 Constitution save or be slowed until the end of its next turn.'),
  'Tome of Leadership and Influence': MI('Wondrous Item','Very Rare',false,'Spending a long period of time studying this tome permanently increases your Charisma score, before the book loses its magic.'),
  'Tome of Understanding': MI('Wondrous Item','Very Rare',false,'Spending a long period of time studying this tome permanently increases your Wisdom score, before the book loses its magic.'),

  // Very Rare
  'Amulet of the Planes': MI('Wondrous Item','Very Rare',true,'While wearing this amulet, you can name a planar destination you know and attempt to cast plane shift, though failure sends you somewhere random instead.'),
  'Book of Exalted Deeds': MI('Wondrous Item','Artifact',true,'This ancient tome of good-aligned lore grants powerful benefits to a good-aligned reader who studies it, growing in power as they use it for virtuous ends.'),
  'Book of Vile Darkness': MI('Wondrous Item','Artifact',true,'This corrupt tome of evil lore grants powerful benefits to an evil-aligned reader who studies it, growing in power as they use it for wicked ends.'),
  'Candle of Invocation': MI('Wondrous Item','Very Rare',true,'Lighting this candle in a place tied to your deity or patron grants advantage on ability checks, attack rolls, and saving throws to good- or evil-aligned creatures (matching the candle\u2019s own alignment) for as long as it burns, up to 4 hours total across a maximum of 6 uses.'),
  'Manual of Golems': MI('Wondrous Item','Very Rare',false,'This tome contains the knowledge needed to construct a specific type of golem, along with instructions for the rare materials required.'),
  'Moonblade': MI('Weapon','Legendary',true,'This intelligent elven sword grants a +1 to +3 bonus to attack and damage rolls (increasing as it recognizes you as a worthy heir over time), and forces anyone else who tries to wield it to succeed on a DC 15 Charisma save or be paralyzed for 1 hour.'),
  'Orb of Dragonkind': MI('Wondrous Item','Legendary',true,'One of several fabled orbs tied to dragonkind, granting powerful magic to whoever holds it, along with an unfortunate pull toward tyranny and corruption.'),

  // Legendary / Artifact
  'Apparatus of Kwalish': MI('Wondrous Item','Legendary',false,'This unassuming iron barrel can transform into an armored, submersible mechanical vessel shaped like a giant lobster, capable of exploring underwater and defending itself with powerful claws.'),
  'Axe of the Dwarvish Lords': MI('Weapon','Artifact',true,'This legendary dwarven axe grants a +3 bonus to attack and damage rolls, deals an extra 2d12 damage against giants and an extra 1d12 against orcs, and holds several other powerful properties tied to dwarven lore, growing more attuned to its wielder\u2019s deeds over time.'),
  'Blackrazor': MI('Weapon','Legendary',true,'This sentient, hungry greatsword grants a +3 bonus to attack and damage rolls, and devours the soul of any creature it reduces to 0 hit points, granting you temporary hit points equal to the slain creature\u2019s hit point maximum and a brief boost to your own combat prowess.'),
  'Cubic Gate': MI('Wondrous Item','Legendary',false,'This cube has six faces, each keyed to a different plane of existence. Pressing a face opens a portal to that plane, or summons a powerful being from it.'),
  'Defender': MI('Weapon','Legendary',true,'This intelligent magic sword grants a +3 bonus to attack and damage rolls, up to 2 points of which you can instead apply to your Armor Class each turn as a bonus action.'),
  'Dragon Scale Mail': MI('Armor','Very Rare',true,'This armor is crafted from the scales of a dragon, granting a base AC of 14 (13 for a copper or brass dragon) plus your Dexterity modifier, advantage on saves against that dragon type\u2019s breath weapon, and resistance to its associated damage type.'),
  'Eye and Hand of Vecna': MI('Wondrous Item','Artifact',true,'These grisly relics can be surgically implanted to replace your own eye and hand, granting the wielder tremendous, corrupting magical power tied to the lich-god Vecna.'),
  'Hammer of Thunderbolts': MI('Weapon','Legendary',false,'This mighty warhammer grants a +1 bonus to attack and damage rolls (+3 against giants), and can unleash a thunderclap dealing an extra 2d10 thunder damage on a hit against a giant, potentially knocking it prone, a limited number of times before losing its magic.'),
  'Holy Avenger': MI('Weapon','Legendary',true,'This magic sword grants a +3 bonus to attack and damage rolls, plus an extra 2d10 radiant damage against fiends and undead, for a paladin. It also grants a 10-foot protective aura of advantage on saving throws to nearby allies, and advantage on your own attack rolls against fiends and undead.'),
  'Luck Blade': MI('Weapon','Legendary',true,'This magic sword grants a +1 bonus to attack and damage rolls and a +1 bonus to saving throws. Most versions hold 1d4-1 (minimum 1) charges of the wish spell, each usable once per week.'),
  'Sword of Kas': MI('Wondrous Item','Artifact',true,'This legendary sentient blade grants tremendous combat power to its wielder, along with a corrupting, prideful influence tied to its infamous former owner.'),
  'Universal Solvent': MI('Wondrous Item','Legendary',false,'A single application of this rare liquid can dissolve any adhesive, including sovereign glue, though only a small amount can ever be created at once.'),
  'Wand of Orcus': MI('Wondrous Item','Artifact',true,'This grim artifact, said to be an extension of the demon prince Orcus himself, grants tremendous necromantic power to its wielder, along with a measure of Orcus\u2019s attention and influence.'),
  'Wand of Polymorph': MI('Wand','Very Rare',true,'This wand has 7 charges, usable to cast the polymorph spell (save DC 15), regaining 1d6+1 charges each dawn.'),
  'Well of Many Worlds': MI('Wondrous Item','Legendary',false,'Unfolded and laid flat, this black cloth creates a portal into a formless void connecting many different worlds, letting travelers step through to a plane of their choosing.'),
  'Whelm': MI('Weapon','Legendary',true,'This intelligent magic warhammer grants a +3 bonus to attack and damage rolls, can return to your hand when thrown, and can unleash a shock wave on a critical hit, forcing the target to succeed on a DC 18 Constitution save or be stunned until the end of its next turn.'),
};

// Backward-compat shim + tier grouping derived from the registry above.
const MAGIC_ITEM_DESC_LOOKUP = {};
const MAGIC_ITEMS_DB = { Common:[], Uncommon:[], Rare:[], 'Very Rare':[], Legendary:[] };
Object.entries(MAGIC_ITEM_REGISTRY).forEach(([name, item]) => {
  MAGIC_ITEM_DESC_LOOKUP[name] = item;
  (MAGIC_ITEMS_DB[item.rarity] || (MAGIC_ITEMS_DB[item.rarity]=[])).push({ name });
});

// ---------- EQUIPMENT REGISTRY (offline, full detail) ----------

function EQ(category, meta, desc){
  return { category, meta, desc };
}

const EQUIPMENT_REGISTRY = {
  'Greataxe': EQ('Weapon (martial melee)', '30 gp, 7 lb, 1d12 slashing', 'A heavy, two-handed axe favored for its sheer damage output. Heavy weapons are hard for Small creatures to use effectively.'),
  'Handaxe': EQ('Weapon (simple melee)', '5 gp, 2 lb, 1d6 slashing', 'A light axe balanced for melee use or for throwing up to 60 feet.'),
  'Explorer\u2019s Pack': EQ('Adventuring Gear (pack)', '10 gp, 59 lb', 'Includes a backpack, a bedroll, a mess kit, a tinderbox, 10 torches, 10 days of rations, and a waterskin. The pack also has 50 feet of hempen rope strapped to the side.'),
  'Javelin': EQ('Weapon (simple melee)', '5 sp, 2 lb, 1d6 piercing', 'A simple spear balanced for throwing up to 120 feet, or usable in melee.'),
  'Rapier': EQ('Weapon (martial melee)', '25 gp, 2 lb, 1d8 piercing', 'A finesse weapon, meaning you can use Dexterity instead of Strength for its attack and damage rolls, a favorite of duelists.'),
  'Diplomat\u2019s Pack': EQ('Adventuring Gear (pack)', '39 gp, 39 lb', 'Includes a chest, two cases for maps and scrolls, fine clothes, a bottle of ink, an ink pen, a lamp, 2 flasks of oil, 5 sheets of paper, a vial of perfume, sealing wax, and soap.'),
  'Lute': EQ('Adventuring Gear (instrument)', '35 gp, 2 lb', 'A stringed instrument. A bard can use a musical instrument as a spellcasting focus, and proficiency lets you add your proficiency bonus to ability checks made to play it.'),
  'Leather Armor': EQ('Armor (light)', '10 gp, 10 lb, AC 11 + Dex modifier', 'The breastplate and shoulder protectors are made of stiffened, boiled leather, while the rest is softer and more flexible.'),
  'Dagger': EQ('Weapon (simple melee)', '2 gp, 1 lb, 1d4 piercing', 'A finesse weapon that can also be thrown up to 60 feet, making it useful in melee or at range.'),
  'Mace': EQ('Weapon (simple melee)', '5 gp, 4 lb, 1d6 bludgeoning', 'A simple, sturdy bludgeoning weapon, a heavy metal head mounted on a shaft.'),
  'Scale Mail': EQ('Armor (medium)', '50 gp, 45 lb, AC 14 + Dex modifier (max 2)', 'This armor consists of a coat of leather covered with overlapping pieces of metal, similar to fish scales. Wearing it imposes disadvantage on Stealth checks.'),
  'Shield': EQ('Armor', '10 gp, 6 lb, +2 AC', 'A shield is made from wood or metal and is carried in one hand. Wielding a shield increases your Armor Class by 2 while you hold it.'),
  'Holy Symbol': EQ('Adventuring Gear (focus)', '5 gp, 1 lb', 'An amulet, reliquary, or emblem representing a faith. A holy symbol serves as a spellcasting focus for a paladin or cleric.'),
  'Priest\u2019s Pack': EQ('Adventuring Gear (pack)', '19 gp, 24 lb', 'Includes a backpack, a blanket, 10 candles, a tinderbox, an alms box, 2 blocks of incense, a censer, vestments, 2 days of rations, and a waterskin.'),
  'Scimitar': EQ('Weapon (martial melee)', '25 gp, 3 lb, 1d6 slashing', 'A curved, finesse blade, light enough to use with Dexterity for its attack and damage rolls.'),
  'Sprig of Mistletoe': EQ('Adventuring Gear (focus)', '1 gp, 0 lb', 'A druidic focus, a sprig of dried, sacred mistletoe used to channel nature magic instead of material components.'),
  'Chain Mail': EQ('Armor (heavy)', '75 gp, 55 lb, AC 16', 'Made of interlocking metal rings, this armor is stiff, heavy, and requires 13 Strength to wear without a speed penalty. It imposes disadvantage on Stealth checks.'),
  'Longsword': EQ('Weapon (martial melee)', '15 gp, 3 lb, 1d8 slashing (1d10 two-handed)', 'A versatile blade that can be wielded in one hand or gripped with both for slightly more damage.'),
  'Light Crossbow': EQ('Weapon (simple ranged)', '25 gp, 5 lb, 1d8 piercing, range 80/320', 'A two-handed ranged weapon that requires ammunition and takes a hand to reload, so you can\u2019t use another weapon in the same hand.'),
  'Crossbow Bolt': EQ('Adventuring Gear (ammunition)', '1 gp per 20, 1.5 lb per 20', 'Ammunition for a crossbow. A fired bolt is destroyed or lost roughly half the time it\u2019s used.'),
  'Dungeoneer\u2019s Pack': EQ('Adventuring Gear (pack)', '12 gp, 61.5 lb', 'Includes a backpack, a crowbar, a hammer, 10 pitons, 10 torches, a tinderbox, 10 days of rations, a waterskin, and 50 feet of hempen rope.'),
  'Shortsword': EQ('Weapon (martial melee)', '10 gp, 2 lb, 1d6 piercing', 'A finesse weapon, light and quick, letting you use Dexterity for its attack and damage rolls.'),
  'Dart': EQ('Weapon (simple ranged)', '5 cp, 0.25 lb, 1d4 piercing, range 20/60', 'A small, balanced blade meant to be thrown, using Dexterity for its attack roll.'),
  'Studded Leather Armor': EQ('Armor (light)', '45 gp, 13 lb, AC 12 + Dex modifier', 'Made from tough but flexible leather reinforced with close-set rivets or spikes.'),
  'Longbow': EQ('Weapon (martial ranged)', '50 gp, 2 lb, 1d8 piercing, range 150/600', 'A tall, powerful bow requiring 13 Strength to use without penalty, prized for its long range.'),
  'Arrow': EQ('Adventuring Gear (ammunition)', '1 gp per 20, 1 lb per 20', 'Ammunition for a bow. A fired arrow is destroyed or lost roughly half the time it\u2019s used.'),
  'Burglar\u2019s Pack': EQ('Adventuring Gear (pack)', '16 gp, 44.5 lb', 'Includes a backpack, a bag of 1,000 ball bearings, 10 feet of string, a bell, 5 candles, a crowbar, a hammer, 10 pitons, a hooded lantern, 2 flasks of oil, 5 days of rations, a tinderbox, a waterskin, and 50 feet of hempen rope.'),
  'Thieves\u2019 Tools': EQ('Tools', '25 gp, 1 lb', 'A set of lockpicks and small implements, a file, pliers, and a probe, used to pick locks and disarm traps. Proficiency lets you add your proficiency bonus to related checks.'),
  'Component Pouch': EQ('Adventuring Gear (focus)', '25 gp, 2 lb', 'A small, watertight leather pouch holding the material components and other special items a spellcaster needs, short of specific listed exceptions.'),
  'Scholar\u2019s Pack': EQ('Adventuring Gear (pack)', '40 gp, 11 lb', 'Includes a backpack, a book of lore, a bottle of ink, an ink pen, 10 sheets of parchment, a small bag of sand, and a small knife.'),
  'Quarterstaff': EQ('Weapon (simple melee)', '2 sp, 4 lb, 1d6 bludgeoning (1d8 two-handed)', 'A simple, versatile staff, usable one-handed, or two-handed for slightly more damage, and a common spellcasting focus.'),
  'Spellbook': EQ('Adventuring Gear (focus)', '50 gp, 3 lb', 'A leather-bound book with 100 blank vellum pages, used by a wizard to record the spells they know. A wizard must have this in hand to prepare their spells from it.'),
  'Crowbar': EQ('Tools', '2 gp, 5 lb', 'Using a crowbar grants advantage on Strength checks made to force open doors, chests, and other stuck or locked objects.'),
  'Common Clothes': EQ('Adventuring Gear (clothing)', '5 sp, 3 lb', 'An unremarkable outfit worn by peasants, laborers, and townsfolk that doesn\u2019t draw attention.'),
  'Smith\u2019s Tools': EQ('Tools', '20 gp, 8 lb', 'Hammers, tongs, and other tools for forging and repairing metal items. Proficiency lets you add your proficiency bonus to related checks.'),
  'Iron Pot': EQ('Adventuring Gear', '2 gp, 10 lb', 'A sturdy metal pot suitable for cooking meals over a campfire.'),
  'Fine Clothes': EQ('Adventuring Gear (clothing)', '15 gp, 6 lb', 'An expensive, well-tailored outfit suited to court, high society, or convincing someone you belong there.'),
  'Signet Ring': EQ('Adventuring Gear', '5 gp, 0 lb', 'A ring bearing a personal or family crest, used to stamp a seal of authenticity into wax on official documents.'),
  'Ink': EQ('Adventuring Gear', '10 gp per ounce bottle, 0 lb', 'A small bottle of ink for writing, enough for many pages.'),
  'Ink Pen': EQ('Adventuring Gear', '2 cp, 0 lb', 'A simple pen used with ink for writing.'),
  'Knife': EQ('Adventuring Gear', '5 cp, 0.2 lb', 'A small utility blade for everyday tasks, distinct from a dagger meant for combat.'),
  'Playing Card Set': EQ('Gaming Set', '5 sp, 0 lb', 'A deck of cards used for games of chance. Proficiency lets you add your proficiency bonus to ability checks related to games played with it.'),
  'Disguise Kit': EQ('Tools', '25 gp, 3 lb', 'Cosmetics, hair dye, and props for altering your physical appearance. Proficiency lets you add your proficiency bonus to related checks.'),
  'Rope, Silk (50 feet)': EQ('Adventuring Gear', '10 gp, 5 lb', 'Fifty feet of strong, lightweight silk rope, less bulky and more reliable than hempen rope.'),
  'Herbalism Kit': EQ('Tools', '5 gp, 3 lb', 'Includes a variety of instruments druids and apothecaries use to create remedies and potions. Proficiency lets you add your proficiency bonus to related checks, and is required to create potions of healing.'),
  'Blanket': EQ('Adventuring Gear', '5 sp, 3 lb', 'A simple wool blanket for warmth on the road.'),
  'Incense': EQ('Adventuring Gear', '1 sp per stick, 0 lb', 'Fragrant sticks burned during religious rites and rituals.'),
  'Vestments': EQ('Adventuring Gear (clothing)', 'no set cost, 0 lb', 'Ceremonial robes worn by clergy during religious services.'),
  'Costume': EQ('Adventuring Gear (clothing)', '5 gp, 4 lb', 'An outfit that lets you portray a different character, useful for performances or simple disguises.'),
  'Shovel': EQ('Tools', '2 gp, 5 lb', 'A simple digging implement.'),
  'Shortbow': EQ('Weapon (simple ranged)', '25 gp, 2 lb, 1d6 piercing, range 80/320', 'A compact bow, quicker to draw than a longbow though shorter-ranged, and usable without a Strength requirement.'),
};

// Backward-compat shim for the click handler / generateCharacter.
const EQUIPMENT_DESC = EQUIPMENT_REGISTRY;

// ---------- LEVEL-SCALED MAGIC ITEMS (offline) ----------

// Shared rarity gating: what tiers of magic item a character/party of a
// given level should plausibly encounter. Cumulative — higher levels keep
// access to everything below them, not just the newly unlocked tier.
function magicItemTiersForLevel(level){
  if(level <= 1) return ['Common'];
  if(level <= 5) return ['Common','Uncommon'];
  if(level <= 10) return ['Common','Uncommon','Rare'];
  if(level <= 15) return ['Common','Uncommon','Rare','Very Rare'];
  return ['Common','Uncommon','Rare','Very Rare','Legendary','Artifact'];
}

function tiersForLevel(level){
  let count = 0;
  if(level>=1 && level<5) count = 1;
  else if(level>=5 && level<9) count = 1;
  else if(level>=9 && level<13) count = 2;
  else if(level>=13 && level<17) count = 2;
  else if(level>=17) count = 3;
  if(count===0) return { tiers:[], count:0 };
  return { tiers: magicItemTiersForLevel(level), count };
}

function getMagicItemsForLevel(level){
  const { tiers, count } = tiersForLevel(level);
  if(count===0) return [];
  let optionsPool = [];
  tiers.forEach(t => { (MAGIC_ITEMS_DB[t]||[]).forEach(it => optionsPool.push({ name:it.name, rarity:t })); });
  const bagKey = 'char-magicitem:' + tiers.slice().sort().join(',');
  const chosen = drawNFromBag(bagKey, optionsPool, count);
  return chosen.map(it => ({ n:1, name:it.name, isMagic:true, rarity:it.rarity, kind:'magic-item' }));
}

// ---------- LOOT TABLE ----------
// Unlike character equipment (which withholds magic items below level 5 for
// pacing), a loot roll can reasonably turn up a Common item at any level.
// A real hoard is mostly coin, trinkets, and mundane gear — magic items are
// the exception, not the rule — so each item slot rolls a category first.

function lootTiersForLevel(level){
  return magicItemTiersForLevel(level);
}

// Gemstones and art objects, tiered by value like a real treasure table.
function TG(name, desc){ return { name, desc }; }
const TRADE_GOODS = {
  10: [ TG('Garnet','A deep red gemstone, cut and polished.'), TG('Amber Bead','A chunk of fossilized tree resin, warm amber in color.'), TG('Freshwater Pearl','A small, irregular pearl.'), TG('Tiger Eye','A banded brown gemstone with a silky luster.'), TG('Silver Ring','A plain but well-made band of silver.'), TG('Carved Bone Die Set','A set of dice carved from polished bone.'), TG('Polished Agate','A banded stone polished to a smooth shine.'), TG('Copper Bracelet','A simple bracelet of hammered copper.'), TG('Small Ivory Comb','A comb carved from a sliver of ivory.'), TG('Turquoise Bead','A single bead of pale blue-green stone.'), TG('Onyx Chip','A small, glassy black stone.'), TG('Brass Locket','A tarnished locket with no portrait inside.'), TG('Painted Clay Figurine','A crude but charming little figurine.'), TG('Hematite Stone','A dark, metallic-grey polished stone.') ],
  50: [ TG('Bloodstone','A dark green gem flecked with red.'), TG('Carnelian','A reddish-orange gemstone.'), TG('Moonstone','A pale, faintly glowing gemstone.'), TG('Silver Bracelet','An engraved silver bracelet set with a small stone.'), TG('Ceremonial Dagger','A decorative dagger, more ornament than weapon.'), TG('Chrysoberyl','A yellow-green gemstone with a soft sheen.'), TG('Silver Hair Comb','An ornate comb of polished silver.'), TG('Malachite','A banded green stone, often carved.'), TG('Obsidian Pendant','A pendant of glassy black volcanic stone.'), TG('Fine Wool Tapestry','A small woven tapestry in rich colors.'), TG('Engraved Bronze Mirror','A hand mirror of polished bronze.'), TG('Star Rose Quartz','A pale pink stone with a faint starlike glimmer.') ],
  100: [ TG('Amethyst','A rich purple quartz gemstone.'), TG('Topaz','A golden-yellow gemstone.'), TG('Pearl','A lustrous, well-formed pearl.'), TG('Gold Ring','A simple band of solid gold.'), TG('Small Gold Idol','A palm-sized idol cast in gold.'), TG('Citrine','A warm, honey-colored gemstone.'), TG('Jasper','A dense, richly patterned stone.'), TG('Peridot','A pale green gemstone with a glassy shine.'), TG('Silver Chalice','A small drinking chalice of polished silver.'), TG('Carved Jade Pendant','A pendant carved from pale green jade.'), TG('Gold-Plated Hairpin','An ornate hairpin plated in gold.'), TG('Fine Silk Scarf','A scarf of dyed, imported silk.'), TG('Antique Coin Set','A small set of foreign coins, prized by collectors.'), TG('Ornate Music Box','A small music box with a delicate mechanism.') ],
  500: [ TG('Sapphire','A deep blue gemstone of notable clarity.'), TG('Ruby','A vivid red gemstone.'), TG('Fine Gold Necklace','An ornate necklace of woven gold links.'), TG('Jeweled Anklet','A gold anklet set with small colored stones.'), TG('Black Pearl','A rare pearl of deep, iridescent black.'), TG('Zircon','A brilliant, clear gemstone with a sharp sparkle.'), TG('Carved Ivory Statuette','A finely carved statuette of pale ivory.'), TG('Gold Filigree Brooch','An intricate brooch of woven gold wire.'), TG('Silk and Gold Tapestry','A large tapestry woven with gold thread.'), TG('Engraved Silver Platter','A ceremonial platter etched with fine engravings.'), TG('Amethyst Diadem','A small circlet set with amethyst stones.') ],
  1000: [ TG('Emerald','A vivid green gemstone, cut for display.'), TG('Diamond','A brilliant, flawless-cut diamond.'), TG('Jade Statuette','A finely carved statuette of polished jade.'), TG('Golden Chalice','An ornate drinking chalice of solid gold.'), TG('Fire Opal','A gemstone that seems to glow with inner flame.'), TG('Alexandrite','A rare gemstone that shifts color in different light.'), TG('Jeweled Gold Circlet','A delicate circlet of gold set with gemstones.'), TG('Painted Porcelain Vase','An imported vase, painted in intricate detail.'), TG('Gilded Ceremonial Mask','A mask of carved wood, gilded and jeweled.'), TG('Platinum Ring Set','A matched set of rings in polished platinum.') ],
  5000: [ TG('Star Ruby','A large ruby with a rare six-pointed light effect.'), TG('Black Sapphire','A rare, near-black sapphire of exceptional clarity.'), TG('Jeweled Crown','A small ceremonial crown set with many gemstones.'), TG('Flawless Diamond','A diamond of exceptional size and clarity.'), TG('Ancient Gold Reliquary','An ornate reliquary of solid gold, centuries old.'), TG('Painted Masterwork Portrait','A portrait by a renowned, long-dead artist.'), TG('Jeweled Ceremonial Blade','A ceremonial blade sheathed in gold and gemstones.'), TG('Star Sapphire Pendant','A rare sapphire with a shimmering starlike core.') ],
};
function tradeGoodTierForLevel(level){
  if(level<5) return 10;
  if(level<9) return 50;
  if(level<13) return 100;
  if(level<17) return 500;
  return pick([1000, 5000]);
}

const HOARD_ITEM_COUNTS = { small:2, medium:4, large:6, huge:9 };
const HOARD_GOLD_MULT = { small:1, medium:2, large:3.5, huge:6 };
// Magic items are capped and guaranteed at this exact count per hoard —
// everything else in the hoard is mundane gear or trade goods/gems.
const HOARD_MAGIC_COUNT = { small:1, medium:1, large:1, huge:2 };

// Odds between mundane gear and trade goods for the non-magic item slots,
// by level bracket (higher level parties skew toward finer trade goods).
function nonMagicWeightsForLevel(level){
  if(level<5) return { mundane:0.6, trade:0.4 };
  if(level<9) return { mundane:0.5, trade:0.5 };
  if(level<13) return { mundane:0.4, trade:0.6 };
  if(level<17) return { mundane:0.3, trade:0.7 };
  return { mundane:0.2, trade:0.8 };
}

function rollDice(n, sides){
  let sum = 0;
  for(let i=0;i<n;i++){ sum += roll(sides)+1; }
  return sum;
}

function rollGold(level, hoardKey){
  let n, sides, mult;
  if(level<5){ n=2; sides=6; mult=10; }
  else if(level<9){ n=4; sides=6; mult=100; }
  else if(level<13){ n=6; sides=6; mult=100; }
  else if(level<17){ n=4; sides=6; mult=1000; }
  else { n=12; sides=6; mult=1000; }
  const hoardMult = HOARD_GOLD_MULT[hoardKey] || 1;
  return Math.round(rollDice(n, sides) * mult * hoardMult);
}

function rollNonMagicLootItem(level){
  const w = nonMagicWeightsForLevel(level);
  if(Math.random() < w.mundane){
    const names = Object.keys(EQUIPMENT_DESC);
    return { name: drawFromBag('loot-equipment', names), kind:'equipment' };
  }
  const value = tradeGoodTierForLevel(level);
  const good = drawFromBag('tradegood:'+value, TRADE_GOODS[value]);
  return { name: good.name, kind:'trade-good', value, desc: good.desc };
}

function rollMagicLootItem(level, locationKey){
  const tiers = lootTiersForLevel(level);
  let pool = [];
  tiers.forEach(t => (MAGIC_ITEMS_DB[t]||[]).forEach(it => pool.push({ name:it.name, rarity:t })));

  let usingThemedPool = false;
  if(locationKey && locationKey !== 'any'){
    const themedPool = pool.filter(it => (LOOT_ENVIRONMENTS[it.name] || []).includes(locationKey));
    // Bias toward the curated, thematic set rather than guaranteeing
    // it — some variety keeps a location's loot from feeling
    // identical every single roll, and this also gracefully covers
    // the case where no themed item happens to fall within this
    // level's rarity range (themedPool.length === 0).
    if(themedPool.length && Math.random() < 0.7){
      pool = themedPool;
      usingThemedPool = true;
    }
  }

  // drawFromBag caches whatever pool it's first given under a key
  // into a shuffle bag, then ignores the pool argument on every
  // later call with that same key until the bag empties — so the
  // themed/full split above has to be part of the key itself, not
  // just the pool passed in, or the very first roll's coin-flip
  // would silently decide every subsequent roll too.
  const bagKey = 'loot-magicitem:' + tiers.slice().sort().join(',') + ':' + (locationKey||'any') + ':' + (usingThemedPool ? 'themed' : 'full');
  const chosen = drawFromBag(bagKey, pool);
  return { name: chosen.name, kind:'magic-item', rarity: chosen.rarity };
}

// Environment tags for every magic item — unlike monsters, there's
// no established canonical 5e table for this, so these are genuine
// thematic judgment calls based on each item's name and effect, not
// a rules citation. Generic items with no specific environmental tie
// (a plain +1 weapon, a ring of protection) default to
// ['dungeon','urban'] — the two settings virtually any adventure
// passes through — rather than being left untagged.
const LOOT_ENVIRONMENTS = {
  'Potion of Healing': ['dungeon','urban'],
  'Potion of Climbing': ['mountain','hill'],
  'Potion of Water Breathing': ['coastal','underwater','swamp'],
  'Alchemist’s Fire': ['dungeon','urban'],
  'Cloak of Billowing': ['desert','urban'],
  'Bead of Nourishment': ['desert','dungeon'],
  'Spell Scroll (Cantrip)': ['dungeon','urban'],
  'Candle of the Deep': ['underwater','coastal'],
  'Bag of Holding': ['dungeon','urban'],
  'Cloak of Protection': ['dungeon','urban'],
  'Boots of Elvenkind': ['forest','hill'],
  'Wand of Magic Missiles': ['dungeon','urban'],
  'Gauntlets of Ogre Power': ['dungeon','mountain'],
  'Ring of Protection': ['dungeon','urban'],
  'Bag of Tricks': ['dungeon','forest'],
  'Boots of Striding and Springing': ['mountain','hill','grassland'],
  'Headband of Intellect': ['urban','dungeon'],
  'Driftglobe': ['dungeon','underdark'],
  'Potion of Greater Healing': ['dungeon','urban'],
  'Potion of Fire Breath': ['mountain','dungeon'],
  'Potion of Growth': ['forest','dungeon'],
  'Elemental Gem': ['planar','mountain'],
  'Instrument of Illusions': ['urban','dungeon'],
  'Sending Stones': ['urban','dungeon'],
  'Necklace of Fireballs': ['dungeon','mountain'],
  'Immovable Rod': ['dungeon','mountain'],
  'Bracers of Archery': ['forest','grassland'],
  'Pearl of Power': ['dungeon','urban'],
  'Cloak of Elvenkind': ['forest'],
  'Boots of the Winterlands': ['arctic'],
  'Eyes of the Eagle': ['mountain','grassland'],
  'Gloves of Thievery': ['urban'],
  'Hat of Disguise': ['urban'],
  'Rope of Climbing': ['mountain','dungeon'],
  'Wand of Web': ['dungeon','underdark'],
  'Alchemy Jug': ['dungeon','urban'],
  'Decanter of Endless Water': ['desert','coastal'],
  'Circlet of Blasting': ['dungeon','urban'],
  'Goggles of Night': ['underdark','dungeon'],
  'Medallion of Thoughts': ['urban','dungeon'],
  '+1 Weapon': ['dungeon','urban'],
  '+1 Armor': ['dungeon','urban'],
  '+1 Shield': ['dungeon','urban'],
  'Ammunition, +1': ['dungeon','urban'],
  'Flame Tongue': ['dungeon','mountain'],
  'Ring of Spell Storing': ['urban','dungeon'],
  'Sun Blade': ['underdark','dungeon'],
  'Wand of Fireballs': ['dungeon','mountain'],
  'Cloak of Displacement': ['forest','underdark'],
  'Boots of Speed': ['grassland','urban'],
  'Belt of Hill Giant Strength': ['hill'],
  'Wand of Wonder': ['planar','dungeon'],
  'Wand of Paralysis': ['dungeon','underdark'],
  'Chime of Opening': ['dungeon'],
  'Boots of Levitation': ['mountain','underdark'],
  'Cloak of the Bat': ['dungeon','underdark'],
  'Dwarven Thrower': ['mountain','hill','underdark'],
  'Amulet of Health': ['dungeon','urban'],
  'Belt of Fire Giant Strength': ['mountain','underdark'],
  'Ring of Free Action': ['swamp','dungeon'],
  'Helm of Telepathy': ['urban','dungeon'],
  'Necklace of Adaptation': ['swamp','underdark','desert'],
  'Wings of Flying': ['mountain','coastal'],
  'Instant Fortress': ['grassland','hill'],
  'Rope of Entanglement': ['dungeon','forest'],
  'Ring of X-ray Vision': ['underdark','dungeon'],
  'Ring of Water Walking': ['coastal','swamp','underwater'],
  'Robe of Scintillating Colors': ['urban','dungeon'],
  '+2 Weapon': ['dungeon','urban'],
  '+2 Armor': ['dungeon','urban'],
  '+2 Shield': ['dungeon','urban'],
  'Ammunition, +2': ['dungeon','urban'],
  'Frost Brand': ['arctic','mountain'],
  'Staff of Power': ['urban','dungeon'],
  'Ring of Regeneration': ['dungeon','mountain'],
  'Manual of Bodily Health': ['urban','dungeon'],
  'Carpet of Flying': ['mountain','desert','grassland'],
  'Rod of Absorption': ['urban','dungeon'],
  'Robe of Stars': ['planar','mountain'],
  'Horn of Valhalla': ['grassland','arctic'],
  'Ring of Telekinesis': ['urban','dungeon'],
  'Belt of Cloud Giant Strength': ['mountain','planar'],
  'Mantle of Spell Resistance': ['urban','dungeon'],
  'Ring of Shooting Stars': ['arctic','mountain'],
  'Mirror of Life Trapping': ['dungeon','urban'],
  'Cube of Force': ['dungeon','urban'],
  'Crystal Ball': ['urban','dungeon'],
  'Manual of Quickness of Action': ['urban','dungeon'],
  'Tome of Clear Thought': ['urban','dungeon'],
  'Sword of Sharpness': ['dungeon','urban'],
  'Cloak of Arachnida': ['underdark','forest'],
  '+3 Weapon': ['dungeon','urban'],
  '+3 Armor': ['dungeon','urban'],
  '+3 Shield': ['dungeon','urban'],
  'Ammunition, +3': ['dungeon','urban'],
  'Vorpal Sword': ['dungeon','urban'],
  'Deck of Many Things': ['planar','urban'],
  'Staff of the Magi': ['urban','dungeon'],
  'Ring of Three Wishes': ['planar'],
  'Armor of Invulnerability': ['dungeon','mountain'],
  'Belt of Storm Giant Strength': ['coastal','mountain','planar'],
  'Plate Armor of Etherealness': ['planar','dungeon'],
  'Rod of Lordly Might': ['dungeon','mountain'],
  'Robe of the Archmagi': ['urban','dungeon'],
  'Ring of Invisibility': ['urban','dungeon'],
  'Iron Flask': ['planar','dungeon'],
  'Ring of Elemental Command': ['planar'],
  'Sphere of Annihilation': ['planar','dungeon'],
  'Talisman of the Sphere': ['planar','dungeon'],
  'Armor of Gleaming': ['urban','dungeon'],
  'Bead of Refreshment': ['desert','grassland'],
  'Boots of False Tracks': ['forest','grassland','hill'],
  'Cloak of Many Fashions': ['urban'],
  'Clothes of Mending': ['urban','dungeon'],
  'Dread Helm': ['dungeon','underdark'],
  'Ersatz Eye': ['urban','dungeon'],
  'Hat of Wizardry': ['urban','dungeon'],
  'Mystery Key': ['dungeon','urban'],
  'Orb of Direction': ['desert','forest','mountain'],
  'Pole of Collapsing': ['dungeon','urban'],
  'Ruby of the War Mage': ['urban','dungeon'],
  'Talking Doll': ['urban','dungeon'],
  'Unbreakable Arrow': ['forest','grassland'],
  'Veteran’s Cane': ['urban'],
  'Wand of Pyrotechnics': ['dungeon','urban'],
  'Bracers of Defense': ['dungeon','urban'],
  'Brooch of Shielding': ['dungeon','urban'],
  'Broom of Flying': ['mountain','grassland'],
  'Cap of Water Breathing': ['coastal','underwater','swamp'],
  'Cast-off Armor': ['dungeon','urban'],
  'Cloak of the Manta Ray': ['coastal','underwater'],
  'Dagger of Venom': ['swamp','underdark'],
  'Dust of Disappearance': ['urban','dungeon'],
  'Dust of Dryness': ['swamp','desert','underwater'],
  'Eversmoking Bottle': ['dungeon','urban'],
  'Eyes of Charming': ['urban','dungeon'],
  'Eyes of Minute Seeing': ['dungeon','urban'],
  'Figurine of Wondrous Power': ['dungeon','urban'],
  'Gem of Brightness': ['dungeon','underdark'],
  'Gloves of Missile Snaring': ['dungeon','urban'],
  'Gloves of Swimming and Climbing': ['coastal','underwater','mountain'],
  'Helm of Comprehending Languages': ['urban','dungeon'],
  'Javelin of Lightning': ['grassland','mountain'],
  'Keoghtom’s Ointment': ['dungeon','urban'],
  'Lantern of Revealing': ['dungeon','underdark'],
  'Mariner’s Armor': ['coastal','underwater'],
  'Mithral Armor': ['dungeon','underdark'],
  'Periapt of Health': ['dungeon','urban'],
  'Periapt of Wound Closure': ['dungeon','urban'],
  'Pipes of Haunting': ['dungeon','swamp'],
  'Potion of Animal Friendship': ['forest','grassland'],
  'Potion of Poison': ['swamp','underdark'],
  'Potion of Resistance': ['dungeon','urban'],
  'Quiver of Ehlonna': ['forest'],
  'Robe of Useful Items': ['dungeon','urban'],
  'Sentinel Shield': ['dungeon','urban'],
  'Slippers of Spider Climbing': ['underdark','mountain'],
  'Stone of Good Luck': ['dungeon','urban'],
  'Trident of Fish Command': ['coastal','underwater'],
  'Wand of Enemy Detection': ['dungeon','underdark'],
  'Wand of Magic Detection': ['dungeon','urban'],
  'Wand of Secrets': ['dungeon','urban'],
  'Winged Boots': ['mountain','coastal'],
  'Wind Fan': ['coastal','desert'],
  'Berserker Axe': ['mountain','hill'],
  'Cape of the Mountebank': ['urban'],
  'Dancing Sword': ['dungeon','urban'],
  'Dimensional Shackles': ['planar','dungeon'],
  'Elven Chain': ['forest'],
  'Folding Boat': ['coastal','underwater'],
  'Giant Slayer': ['mountain','hill'],
  'Glamoured Studded Leather': ['urban'],
  'Heward’s Handy Haversack': ['dungeon','urban'],
  'Horn of Blasting': ['dungeon','mountain'],
  'Mace of Disruption': ['dungeon','underdark'],
  'Mace of Smiting': ['dungeon','mountain'],
  'Mace of Terror': ['dungeon','underdark'],
  'Necklace of Prayer Beads': ['urban','dungeon'],
  'Oathbow': ['forest','grassland'],
  'Portable Hole': ['dungeon','urban'],
  'Quaal’s Feather Token': ['forest','coastal','mountain'],
  'Robe of Eyes': ['dungeon','underdark'],
  'Rod of Rulership': ['urban'],
  'Scroll of Protection': ['dungeon','urban'],
  'Shield of Missile Attraction': ['dungeon','urban'],
  'Stone of Controlling Earth Elementals': ['mountain','underdark'],
  'Sword of Life Stealing': ['dungeon','underdark'],
  'Sword of Wounding': ['dungeon','urban'],
  'Vicious Weapon': ['dungeon','urban'],
  'Wand of Binding': ['dungeon','urban'],
  'Wand of Fear': ['dungeon','underdark'],
  'Wand of Lightning Bolts': ['mountain','coastal'],
  'Wand of the War Mage +1': ['urban','dungeon'],
  'Dwarven Plate': ['mountain','hill','underdark'],
  'Efreeti Bottle': ['desert','planar'],
  'Horseshoes of a Zephyr': ['grassland','mountain'],
  'Manual of Gainful Exercise': ['urban','dungeon'],
  'Nine Lives Stealer': ['dungeon','urban'],
  'Nolzur’s Marvelous Pigments': ['urban','dungeon'],
  'Rod of Alertness': ['urban','dungeon'],
  'Rod of Security': ['urban','dungeon'],
  'Scimitar of Speed': ['desert','urban'],
  'Staff of Fire': ['mountain','desert'],
  'Staff of Frost': ['arctic'],
  'Staff of Striking': ['dungeon','urban'],
  'Staff of Thunder and Lightning': ['mountain','coastal'],
  'Staff of the Woodlands': ['forest'],
  'Sword of Answering': ['dungeon','urban'],
  'Weapon of Warning': ['dungeon','urban'],
  'Charlatan’s Die': ['urban'],
  'Clockwork Amulet': ['urban','dungeon'],
  'Dark Shard Amulet': ['underdark','dungeon'],
  'Ear Horn of Hearing': ['urban','dungeon'],
  'Enduring Spellbook': ['urban','dungeon'],
  'Hat of Vermin': ['urban','dungeon'],
  'Heward’s Handy Spice Pouch': ['urban','desert'],
  'Horn of Silent Alarm': ['urban','dungeon'],
  'Lock of Trickery': ['urban','dungeon'],
  'Moon-touched Sword': ['forest','grassland'],
  'Orb of Time': ['urban','dungeon'],
  'Perfume of Bwitching': ['urban'],
  'Pipe of Smoke Monsters': ['urban','dungeon'],
  'Pole of Angling': ['coastal','swamp'],
  'Pot of Awakening': ['forest','urban'],
  'Tankard of Sobriety': ['urban'],
  'Walloping Ammunition': ['dungeon','urban'],
  'Wand of Conducting': ['urban'],
  'Wand of Scowls': ['urban','dungeon'],
  'Wand of Smiles': ['urban','dungeon'],
  'Adamantine Armor': ['mountain','underdark','dungeon'],
  'Amulet of Proof against Detection and Location': ['dungeon','urban'],
  'Deck of Illusions': ['urban','dungeon'],
  'Dust of Sneezing and Choking': ['dungeon','urban'],
  'Instrument of Scribing': ['urban','dungeon'],
  'Iron Bands of Bilarro': ['dungeon','urban'],
  'Oil of Slipperiness': ['dungeon','underdark'],
  'Periapt of Proof against Poison': ['swamp','underdark'],
  'Philter of Love': ['urban'],
  'Pipes of the Sewers': ['urban','dungeon'],
  'Potion of Giant Strength': ['mountain','hill'],
  'Ring of Animal Influence': ['forest','grassland'],
  'Ring of Feather Falling': ['mountain','underdark'],
  'Ring of Jumping': ['mountain','hill','grassland'],
  'Ring of Mind Shielding': ['urban','dungeon'],
  'Ring of Poison Resistance': ['swamp','underdark'],
  'Ring of Resistance': ['dungeon','urban'],
  'Ring of Swimming': ['coastal','underwater','swamp'],
  'Ring of Warmth': ['arctic'],
  'Rod of the Pact Keeper': ['planar','urban'],
  'Rope of Mending': ['dungeon','urban'],
  'Saddle of the Cavalier': ['grassland'],
  'Smoldering Armor': ['mountain','dungeon'],
  'Staff of the Adder': ['swamp','desert'],
  'Staff of the Python': ['forest','swamp'],
  'Wand of the War Mage +1, +2, or +3': ['urban','dungeon'],
  'Animated Shield': ['dungeon','urban'],
  'Armor of Resistance': ['dungeon','urban'],
  'Armor of Vulnerability': ['dungeon','urban'],
  'Arrow of Slaying': ['forest','grassland'],
  'Arrow-Catching Shield': ['dungeon','urban'],
  'Bag of Beans': ['forest','grassland'],
  'Bag of Devouring': ['dungeon','underdark'],
  'Bead of Force': ['dungeon','urban'],
  'Belt of Dwarvenkind': ['mountain','hill','underdark'],
  'Cloak of Invisibility': ['urban','dungeon'],
  'Daern’s Instant Fortress': ['grassland','hill'],
  'Demon Armor': ['planar','underdark'],
  'Dragon Slayer': ['mountain','hill'],
  'Efreeti Chain': ['desert','planar'],
  'Elixir of Health': ['dungeon','urban'],
  'Gem of Seeing': ['dungeon','underdark'],
  'Helm of Brilliance': ['dungeon','urban'],
  'Helm of Teleportation': ['urban','dungeon'],
  'Horseshoes of Speed': ['grassland'],
  'Instrument of the Bards': ['urban'],
  'Ioun Stone': ['urban','dungeon'],
  'Oil of Etherealness': ['planar','dungeon'],
  'Oil of Sharpness': ['dungeon','urban'],
  'Ring of Djinni Summoning': ['desert','planar'],
  'Ring of Evasion': ['dungeon','urban'],
  'Ring of Spell Turning': ['urban','dungeon'],
  'Ring of the Ram': ['dungeon','mountain'],
  'Rod of Resurrection': ['urban','dungeon'],
  'Scarab of Protection': ['desert','dungeon'],
  'Shield of Expression': ['urban','dungeon'],
  'Sovereign Glue': ['dungeon','urban'],
  'Spellguard Shield': ['urban','dungeon'],
  'Staff of Charming': ['urban'],
  'Staff of Healing': ['dungeon','urban'],
  'Staff of Swarming Insects': ['swamp','forest'],
  'Staff of Withering': ['underdark','dungeon'],
  'Sword of Vengeance': ['dungeon','urban'],
  'Talisman of Pure Good': ['planar'],
  'Talisman of Ultimate Evil': ['planar'],
  'Tentacle Rod': ['underdark','dungeon'],
  'Tome of Leadership and Influence': ['urban'],
  'Tome of Understanding': ['urban','dungeon'],
  'Amulet of the Planes': ['planar'],
  'Book of Exalted Deeds': ['planar','urban'],
  'Book of Vile Darkness': ['planar','underdark'],
  'Candle of Invocation': ['planar','urban'],
  'Manual of Golems': ['urban','dungeon'],
  'Moonblade': ['forest','underdark'],
  'Orb of Dragonkind': ['mountain','dungeon'],
  'Apparatus of Kwalish': ['underwater','coastal'],
  'Axe of the Dwarvish Lords': ['mountain','hill','underdark'],
  'Blackrazor': ['dungeon','underdark'],
  'Cubic Gate': ['planar'],
  'Defender': ['dungeon','urban'],
  'Dragon Scale Mail': ['mountain','hill'],
  'Eye and Hand of Vecna': ['underdark','dungeon'],
  'Hammer of Thunderbolts': ['mountain','hill'],
  'Holy Avenger': ['urban','planar'],
  'Luck Blade': ['dungeon','urban'],
  'Sword of Kas': ['underdark','planar'],
  'Universal Solvent': ['dungeon','urban'],
  'Wand of Orcus': ['planar','underdark'],
  'Wand of Polymorph': ['dungeon','urban'],
  'Well of Many Worlds': ['planar'],
  'Whelm': ['mountain','hill'],
};
function generateLoot(level, hoardKey, locationKey){
  const totalCount = HOARD_ITEM_COUNTS[hoardKey] || 2;
  const magicCount = Math.min(HOARD_MAGIC_COUNT[hoardKey] || 1, totalCount);
  const items = [];
  for(let i=0;i<totalCount-magicCount;i++){ items.push(rollNonMagicLootItem(level)); }
  for(let i=0;i<magicCount;i++){ items.push(rollMagicLootItem(level, locationKey)); }
  return { level, hoardKey, gold: rollGold(level, hoardKey), items };
}

// ---------- MONSTER REGISTRY (offline, full stat blocks) ----------
// Real official D&D 5e monsters (names/mechanics are game rules, not
// copyrightable). Stat blocks are written by Claude from familiarity with
// the Monster Manual/SRD rather than copy-pasted verbatim — treat as
// accurate best-effort recreations, not a guaranteed byte-exact quote.

function MO(m){ return m; }

const MONSTER_TIERS = {
  1: [ // CR 0 - 1 ("Trivial")
    'Rat','Raven','Goblin','Kobold','Skeleton','Zombie','Giant Rat','Stirge',
    'Wolf','Orc','Hobgoblin','Bandit','Scout','Bugbear','Brown Bear','Ghoul',
    'Harpy','Giant Spider','Gnoll','Lizardfolk',
    'Giant Centipede','Giant Frog','Pseudodragon','Twig Blight','Boar','Specter',
    'Badger','Bat','Cat','Crab','Deer','Frog','Goat','Hawk',
    'Jackal','Lizard','Octopus','Owl','Spider','Vulture','Weasel','Camel',
    'Cultist','Giant Crab','Giant Weasel','Guard','Mastiff','Mule','Poisonous Snake','Pony',
    'Acolyte','Blink Dog','Constrictor Snake','Draft Horse','Dretch','Elk','Giant Badger','Giant Bat',
    'Giant Lizard','Giant Owl','Giant Poisonous Snake','Panther','Riding Horse','Sprite','Ape','Black Bear',
    'Cockatrice','Crocodile','Reef Shark','Satyr','Shadow','Warhorse','Brass Dragon Wyrmling','Copper Dragon Wyrmling',
    'Dire Wolf','Dryad','Giant Eagle','Giant Octopus','Giant Toad','Giant Vulture','Imp','Lion',
    'Quasit','Tiger','Awakened Shrub','Shrieker','Gray Ooze','Violet Fungus',
  ],
  2: [ // CR 2 - 5 ("Low")
    'Ogre','Ochre Jelly','Ankheg','Giant Scorpion','Wight','Manticore','Owlbear',
    'Minotaur','Basilisk','Griffon','Doppelganger','Night Hag','Roper','Troll',
    'Bulette','Hill Giant',
    'Displacer Beast','Gargoyle','Werewolf','Green Hag','Water Elemental','Shambling Mound',
    'Mimic','Ghast','Hell Hound','Yeti','Ettin','Ghost','Gorgon','Wraith','Umber Hulk',
    'Black Dragon Wyrmling','Bronze Dragon Wyrmling','Cave Bear','Gelatinous Cube','Giant Boar','Giant Constrictor Snake','Giant Elk','Green Dragon Wyrmling',
    'Hunter Shark','Pegasus','Polar Bear','Rhinoceros','Saber-Toothed Tiger','Silver Dragon Wyrmling','White Dragon Wyrmling','Bearded Devil',
    'Blue Dragon Wyrmling','Gold Dragon Wyrmling','Killer Whale','Mummy','Couatl','Elephant','Red Dragon Wyrmling','Air Elemental',
    'Earth Elemental','Fire Elemental','Flesh Golem','Giant Shark','Otyugh','Unicorn','Vampire Spawn','Sea Hag','Awakened Tree','Black Pudding',
  ],
  3: [ // CR 6 - 10 ("Mid")
    'Chimera','Medusa','Wyvern','Invisible Stalker','Stone Giant','Frost Giant',
    'Hydra','Young Green Dragon','Aboleth','Stone Golem',
    'Cyclops','Spirit Naga','Young Blue Dragon','Young White Dragon','Death Slaad',
    'Fire Giant','Cloud Giant','Young Red Dragon',
    'Mind Flayer','Oni','Young Black Dragon','Yuan-ti Abomination','Chain Devil',
    'Tyrannosaurus Rex','Bone Devil','Glabrezu','Treant','Young Silver Dragon',
    'Vrock','Hezrou','Clay Golem','Guardian Naga',
  ],
  4: [ // CR 11 - 16 ("High")
    'Beholder','Vampire',
    'Storm Giant','Adult Black Dragon','Iron Golem',
    'Behir','Erinyes','Horned Devil','Adult Blue Dragon',
    'Djinni','Efreeti','Gynosphinx','Marid','Remorhaz','Roc','Archmage',
    'Adult White Dragon','Nalfeshnee','Rakshasa','Ice Devil','Adult Bronze Dragon',
    'Adult Green Dragon','Mummy Lord','Purple Worm','Adult Silver Dragon','Marilith','Planetar',
  ],
  5: [ // CR 17+ ("Epic")
    'Adult Red Dragon','Death Knight','Balor','Pit Fiend',
    'Ancient White Dragon','Lich','Kraken','Tarrasque',
    'Adult Gold Dragon','Ancient Black Dragon','Solar',
    'Androsphinx','Dragon Turtle','Goristro','Demilich','Ancient Brass Dragon',
    'Ancient Copper Dragon','Ancient Bronze Dragon','Ancient Green Dragon',
    'Ancient Blue Dragon','Ancient Silver Dragon','Empyrean','Ancient Gold Dragon',
    'Ancient Red Dragon','Adult Blue Dracolich',
  ],
};

// Environment tags for the location filter — grounded in the real 5e
// Monster Manual / DMG Appendix B environment associations (verified
// against those tables, not guessed). A monster can appear in more than
// one environment (a Troll fits swamp, mountain, forest, and coastal all
// at once), so this maps each name to an array, not a single tag.
const MONSTER_ENVIRONMENTS = {
  'Rat': ['urban','dungeon','swamp'],
  'Raven': ['forest','urban','grassland'],
  'Goblin': ['forest','hill','mountain','underdark'],
  'Kobold': ['underdark','mountain','hill'],
  'Skeleton': ['dungeon','urban','grassland'],
  'Zombie': ['dungeon','urban','swamp','coastal'],
  'Giant Rat': ['urban','dungeon','swamp'],
  'Stirge': ['swamp','underdark','forest'],
  'Wolf': ['forest','arctic','grassland','hill','mountain'],
  'Orc': ['grassland','hill','mountain','forest'],
  'Hobgoblin': ['grassland','hill','forest','underdark'],
  'Bandit': ['urban','grassland','forest','hill','coastal'],
  'Scout': ['forest','grassland','hill','mountain','urban'],
  'Bugbear': ['forest','hill','underdark','mountain'],
  'Brown Bear': ['forest','hill','mountain'],
  'Ghoul': ['dungeon','urban','swamp','desert'],
  'Harpy': ['mountain','coastal','hill','swamp'],
  'Giant Spider': ['forest','underdark','swamp'],
  'Gnoll': ['desert','grassland','hill'],
  'Lizardfolk': ['swamp','coastal'],
  'Ogre': ['hill','mountain','forest','grassland'],
  'Ochre Jelly': ['dungeon','underdark'],
  'Ankheg': ['grassland','forest','hill'],
  'Giant Scorpion': ['desert','underdark'],
  'Wight': ['dungeon','arctic','grassland'],
  'Manticore': ['mountain','hill','grassland'],
  'Owlbear': ['forest','hill','mountain'],
  'Minotaur': ['underdark','dungeon','mountain'],
  'Basilisk': ['underdark','mountain','dungeon','desert'],
  'Griffon': ['mountain','hill','grassland'],
  'Doppelganger': ['urban','dungeon'],
  'Night Hag': ['swamp','forest','planar'],
  'Roper': ['underdark','dungeon'],
  'Troll': ['swamp','mountain','forest','coastal'],
  'Bulette': ['hill','grassland','desert'],
  'Hill Giant': ['hill','grassland'],
  'Chimera': ['mountain','hill'],
  'Medusa': ['underdark','dungeon','mountain'],
  'Wyvern': ['mountain','hill','desert','swamp'],
  'Invisible Stalker': ['planar'],
  'Stone Giant': ['mountain','underdark','hill'],
  'Frost Giant': ['arctic','mountain'],
  'Hydra': ['swamp','coastal','grassland'],
  'Young Green Dragon': ['forest','swamp'],
  'Aboleth': ['underdark','underwater'],
  'Stone Golem': ['dungeon','underdark'],
  'Fire Giant': ['mountain','underdark'],
  'Cloud Giant': ['mountain','planar'],
  'Young Red Dragon': ['mountain','hill'],
  'Beholder': ['underdark','dungeon'],
  'Vampire': ['urban','dungeon'],
  'Storm Giant': ['coastal','mountain','planar'],
  'Adult Black Dragon': ['swamp','coastal'],
  'Iron Golem': ['dungeon','urban'],
  'Adult Red Dragon': ['mountain','hill'],
  'Death Knight': ['dungeon','grassland'],
  'Balor': ['planar'],
  'Pit Fiend': ['planar'],
  'Ancient White Dragon': ['arctic'],
  'Lich': ['dungeon','urban'],
  'Kraken': ['underwater','coastal'],
  'Tarrasque': ['grassland','mountain'],
  'Giant Centipede': ['underdark','forest','dungeon'],
  'Giant Frog': ['swamp'],
  'Pseudodragon': ['forest'],
  'Twig Blight': ['forest','swamp'],
  'Boar': ['forest','grassland','hill'],
  'Specter': ['dungeon','urban'],
  'Displacer Beast': ['forest','underdark'],
  'Gargoyle': ['urban','dungeon','mountain'],
  'Werewolf': ['forest','grassland','hill','urban'],
  'Green Hag': ['swamp','forest'],
  'Water Elemental': ['coastal','underwater','planar'],
  'Shambling Mound': ['swamp','forest'],
  'Mimic': ['dungeon','underdark'],
  'Ghast': ['dungeon','urban','desert'],
  'Hell Hound': ['planar','mountain'],
  'Yeti': ['arctic','mountain'],
  'Ettin': ['hill','mountain','forest'],
  'Ghost': ['dungeon','urban'],
  'Gorgon': ['grassland','hill'],
  'Wraith': ['dungeon','urban'],
  'Umber Hulk': ['underdark'],
  'Cyclops': ['hill','mountain','coastal'],
  'Spirit Naga': ['swamp','underdark'],
  'Young Blue Dragon': ['desert'],
  'Young White Dragon': ['arctic'],
  'Death Slaad': ['planar','underdark'],
  'Mind Flayer': ['underdark'],
  'Oni': ['hill','mountain','grassland'],
  'Young Black Dragon': ['swamp','coastal'],
  'Yuan-ti Abomination': ['underdark','swamp'],
  'Chain Devil': ['planar'],
  'Tyrannosaurus Rex': ['swamp','forest','grassland'],
  'Bone Devil': ['planar'],
  'Glabrezu': ['planar'],
  'Treant': ['forest'],
  'Young Silver Dragon': ['mountain'],
  'Behir': ['underdark','mountain'],
  'Erinyes': ['planar'],
  'Horned Devil': ['planar'],
  'Adult Blue Dragon': ['desert'],
  'Djinni': ['planar','desert'],
  'Efreeti': ['planar','desert'],
  'Gynosphinx': ['desert'],
  'Marid': ['planar','coastal','underwater'],
  'Remorhaz': ['arctic','underdark'],
  'Roc': ['mountain'],
  'Archmage': ['urban'],
  'Adult White Dragon': ['arctic'],
  'Nalfeshnee': ['planar'],
  'Rakshasa': ['urban','forest'],
  'Ice Devil': ['planar','arctic'],
  'Adult Bronze Dragon': ['coastal'],
  'Adult Green Dragon': ['forest','swamp'],
  'Mummy Lord': ['desert','dungeon'],
  'Purple Worm': ['underdark','desert','hill'],
  'Adult Silver Dragon': ['mountain'],
  'Marilith': ['planar'],
  'Planetar': ['planar'],
  'Adult Gold Dragon': ['hill'],
  'Ancient Black Dragon': ['swamp','coastal'],
  'Solar': ['planar'],
  'Androsphinx': ['desert'],
  'Dragon Turtle': ['underwater','coastal'],
  'Goristro': ['planar'],
  'Demilich': ['dungeon'],
  'Ancient Brass Dragon': ['desert'],
  'Ancient Copper Dragon': ['hill','mountain'],
  'Ancient Bronze Dragon': ['coastal'],
  'Ancient Green Dragon': ['forest','swamp'],
  'Ancient Blue Dragon': ['desert'],
  'Ancient Silver Dragon': ['mountain','arctic'],
  'Empyrean': ['planar'],
  'Ancient Gold Dragon': ['hill','mountain'],
  'Ancient Red Dragon': ['mountain','hill'],
  'Adult Blue Dracolich': ['desert','dungeon'],
  'Lion': ['grassland','desert'],
  'Tiger': ['forest','grassland'],
  'Panther': ['forest','underdark'],
  'Black Bear': ['forest'],
  'Cave Bear': ['underdark','mountain','arctic'],
  'Polar Bear': ['arctic','coastal'],
  'Dire Wolf': ['forest','arctic','grassland'],
  'Ape': ['forest'],
  'Crocodile': ['swamp','coastal'],
  'Elephant': ['grassland'],
  'Saber-Toothed Tiger': ['arctic','forest','grassland'],
  'Killer Whale': ['underwater','coastal'],
  'Rhinoceros': ['grassland'],
  'Cat': ['urban'],
  'Goat': ['hill','mountain'],
  'Hawk': ['forest','grassland','mountain'],
  'Owl': ['forest'],
  'Vulture': ['desert','grassland','hill'],
  'Jackal': ['desert','grassland'],
  'Mastiff': ['urban','grassland'],
  'Constrictor Snake': ['forest','swamp'],
  'Giant Octopus': ['underwater','coastal'],
  'Octopus': ['underwater','coastal'],
  'Giant Eagle': ['mountain'],
  'Giant Owl': ['forest'],
  'Giant Vulture': ['desert','grassland','hill'],
  'Giant Toad': ['swamp'],
  'Warhorse': ['grassland','urban'],
  'Riding Horse': ['grassland','urban'],
  'Elk': ['forest','grassland'],
  'Giant Elk': ['forest','arctic','grassland'],
  'Reef Shark': ['underwater','coastal'],
  'Hunter Shark': ['underwater','coastal'],
  'Giant Shark': ['underwater','coastal'],
  'Poisonous Snake': ['forest','swamp','desert'],
  'Giant Poisonous Snake': ['swamp','forest','desert'],
  'Giant Constrictor Snake': ['swamp','forest'],
  'Giant Boar': ['forest','grassland'],
  'Badger': ['forest','grassland','hill'],
  'Giant Badger': ['forest','grassland','hill'],
  'Weasel': ['forest','grassland'],
  'Giant Weasel': ['forest','grassland','underdark'],
  'Bat': ['dungeon','underdark','forest'],
  'Giant Bat': ['underdark','mountain','dungeon'],
  'Lizard': ['desert','swamp','mountain'],
  'Giant Lizard': ['underdark','desert','swamp'],
  'Frog': ['swamp'],
  'Crab': ['coastal','underwater'],
  'Giant Crab': ['coastal','underwater'],
  'Deer': ['forest','grassland'],
  'Draft Horse': ['grassland','urban'],
  'Pony': ['grassland','urban','hill'],
  'Camel': ['desert'],
  'Mule': ['mountain','hill','urban'],
  'Spider': ['forest','dungeon','underdark'],
  'Mummy': ['desert','dungeon'],
  'Cultist': ['urban','dungeon'],
  'Acolyte': ['urban'],
  'Guard': ['urban'],
  'Gelatinous Cube': ['dungeon','underdark'],
  'Cockatrice': ['forest','hill','swamp'],
  'Vampire Spawn': ['urban','dungeon'],
  'Dryad': ['forest'],
  'Sprite': ['forest'],
  'Black Dragon Wyrmling': ['swamp','coastal'],
  'White Dragon Wyrmling': ['arctic'],
  'Gold Dragon Wyrmling': ['hill'],
  'Bronze Dragon Wyrmling': ['coastal'],
  'Brass Dragon Wyrmling': ['desert'],
  'Green Dragon Wyrmling': ['forest','swamp'],
  'Red Dragon Wyrmling': ['mountain','hill'],
  'Blue Dragon Wyrmling': ['desert'],
  'Copper Dragon Wyrmling': ['hill','mountain'],
  'Silver Dragon Wyrmling': ['mountain'],
  'Air Elemental': ['planar','mountain'],
  'Earth Elemental': ['planar','underdark','mountain'],
  'Fire Elemental': ['planar','mountain'],
  'Imp': ['planar'],
  'Quasit': ['planar'],
  'Dretch': ['planar'],
  'Bearded Devil': ['planar'],
  'Clay Golem': ['dungeon','urban'],
  'Flesh Golem': ['dungeon','urban'],
  'Hezrou': ['planar'],
  'Vrock': ['planar'],
  'Pegasus': ['grassland','mountain'],
  'Unicorn': ['forest'],
  'Otyugh': ['underdark','dungeon','urban'],
  'Shadow': ['dungeon','underdark'],
  'Guardian Naga': ['dungeon','grassland'],
  'Couatl': ['planar','forest'],
  'Blink Dog': ['forest','grassland'],
  'Satyr': ['forest'],
  'Sea Hag': ['coastal','swamp','underwater'],
  'Black Pudding': ['dungeon','underdark'],
  'Gray Ooze': ['dungeon','underdark'],
  'Awakened Shrub': ['forest'],
  'Awakened Tree': ['forest'],
  'Shrieker': ['underdark','dungeon'],
  'Violet Fungus': ['underdark','dungeon'],
};
const MONSTER_REGISTRY = {
  'Rat': MO({
    size:'Tiny', type:'beast', alignment:'Unaligned',
    ac:10, hp:1, hitDice:'1d4-1', speed:'20 ft., climb 20 ft.',
    scores:{str:2,dex:11,con:9,int:2,wis:10,cha:4},
    senses:'darkvision 30 ft., passive Perception 10', languages:'None',
    cr:'0', xp:0,
    actions:[{name:'Bite', desc:'Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage.'}],
  }),
  'Raven': MO({
    size:'Tiny', type:'beast', alignment:'Unaligned',
    ac:12, hp:1, hitDice:'1d4-1', speed:'10 ft., fly 50 ft.',
    scores:{str:2,dex:14,con:8,int:2,wis:12,cha:6},
    skills:'Perception +3', senses:'passive Perception 13', languages:'None',
    cr:'0', xp:0,
    traits:[{name:'Mimicry', desc:'The raven can mimic simple sounds it has heard, such as a person whispering, a baby crying, or an animal chittering. A creature that hears the sounds can tell they are imitations with a successful Wisdom (Insight) check against the raven\u2019s deception.'}],
    actions:[{name:'Beak', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 1 piercing damage.'}],
  }),
  'Goblin': MO({
    size:'Small', type:'humanoid (goblinoid)', alignment:'Neutral Evil',
    ac:15, acNote:'leather armor, shield', hp:7, hitDice:'2d6', speed:'30 ft.',
    scores:{str:8,dex:14,con:10,int:10,wis:8,cha:8},
    skills:'Stealth +6', senses:'darkvision 60 ft., passive Perception 9', languages:'Common, Goblin',
    cr:'1/4', xp:50,
    traits:[{name:'Nimble Escape', desc:'The goblin can take the Disengage or Hide action as a bonus action on each of its turns.'}],
    actions:[
      {name:'Scimitar', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6+2) slashing damage.'},
      {name:'Shortbow', desc:'Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6+2) piercing damage.'},
    ],
  }),
  'Kobold': MO({
    size:'Small', type:'humanoid (kobold)', alignment:'Lawful Evil',
    ac:12, hp:5, hitDice:'2d6-2', speed:'30 ft.',
    scores:{str:7,dex:15,con:9,int:8,wis:7,cha:8},
    senses:'darkvision 60 ft., passive Perception 8', languages:'Common, Draconic',
    cr:'1/8', xp:25,
    traits:[
      {name:'Sunlight Sensitivity', desc:'While in sunlight, the kobold has disadvantage on attack rolls and Perception checks that rely on sight.'},
      {name:'Pack Tactics', desc:'The kobold has advantage on an attack roll against a creature if at least one of the kobold\u2019s allies is within 5 feet of the creature and the ally isn\u2019t incapacitated.'},
    ],
    actions:[
      {name:'Dagger', desc:'Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4+2) piercing damage.'},
    ],
  }),
  'Skeleton': MO({
    size:'Medium', type:'undead', alignment:'Lawful Evil',
    ac:13, acNote:'armor scraps', hp:13, hitDice:'2d8+4', speed:'30 ft.',
    scores:{str:10,dex:14,con:15,int:6,wis:8,cha:5},
    immune:'poison; poisoned', senses:'darkvision 60 ft., passive Perception 9', languages:'understands the languages it knew in life but can\u2019t speak',
    cr:'1/4', xp:50,
    actions:[
      {name:'Shortsword', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6+2) piercing damage.'},
      {name:'Shortbow', desc:'Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6+2) piercing damage.'},
    ],
  }),
  'Zombie': MO({
    size:'Medium', type:'undead', alignment:'Neutral Evil',
    ac:8, hp:22, hitDice:'3d8+9', speed:'20 ft.',
    scores:{str:13,dex:6,con:16,int:3,wis:6,cha:5},
    saves:'Wis +0', immune:'poison; poisoned', senses:'darkvision 60 ft., passive Perception 8', languages:'understands the languages it knew in life but can\u2019t speak',
    cr:'1/4', xp:50,
    traits:[{name:'Undead Fortitude', desc:'If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead.'}],
    actions:[{name:'Slam', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6+1) bludgeoning damage.'}],
  }),
  'Giant Rat': MO({
    size:'Small', type:'beast', alignment:'Unaligned',
    ac:12, hp:7, hitDice:'2d6', speed:'30 ft.',
    scores:{str:7,dex:15,con:11,int:2,wis:10,cha:4},
    senses:'darkvision 60 ft., passive Perception 10', languages:'None',
    cr:'1/8', xp:25,
    traits:[{name:'Pack Tactics', desc:'The rat has advantage on an attack roll against a creature if at least one of the rat\u2019s allies is within 5 feet of the creature and the ally isn\u2019t incapacitated.'}],
    actions:[{name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4+2) piercing damage.'}],
  }),
  'Stirge': MO({
    size:'Tiny', type:'beast', alignment:'Unaligned',
    ac:14, hp:2, hitDice:'1d4', speed:'10 ft., fly 40 ft.',
    scores:{str:4,dex:16,con:11,int:2,wis:8,cha:6},
    senses:'darkvision 60 ft., passive Perception 9', languages:'None',
    cr:'1/8', xp:25,
    actions:[{name:'Blood Drain', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 5 (1d4+3) piercing damage, and the stirge attaches to the target, automatically dealing the same damage each subsequent turn until removed or the target dies.'}],
  }),
  'Wolf': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:13, hp:11, hitDice:'2d8+2', speed:'40 ft.',
    scores:{str:12,dex:15,con:12,int:3,wis:12,cha:6},
    skills:'Perception +3, Stealth +4', senses:'passive Perception 13', languages:'None',
    cr:'1/4', xp:50,
    traits:[
      {name:'Keen Hearing and Smell', desc:'The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.'},
      {name:'Pack Tactics', desc:'The wolf has advantage on an attack roll against a creature if at least one of the wolf\u2019s allies is within 5 feet of the creature and the ally isn\u2019t incapacitated.'},
    ],
    actions:[{name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4+2) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone.'}],
  }),
  'Orc': MO({
    size:'Medium', type:'humanoid (orc)', alignment:'Chaotic Evil',
    ac:13, acNote:'hide armor', hp:15, hitDice:'2d8+6', speed:'30 ft.',
    scores:{str:16,dex:12,con:16,int:7,wis:11,cha:10},
    skills:'Intimidation +2', senses:'darkvision 60 ft., passive Perception 10', languages:'Common, Orc',
    cr:'1/2', xp:100,
    traits:[{name:'Aggressive', desc:'As a bonus action, the orc can move up to its speed toward a hostile creature it can see.'}],
    actions:[
      {name:'Greataxe', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d12+3) slashing damage.'},
      {name:'Javelin', desc:'Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 6 (1d6+3) piercing damage.'},
    ],
  }),
  'Hobgoblin': MO({
    size:'Medium', type:'humanoid (goblinoid)', alignment:'Lawful Evil',
    ac:18, acNote:'chain mail, shield', hp:11, hitDice:'2d8+2', speed:'30 ft.',
    scores:{str:13,dex:12,con:12,int:10,wis:10,cha:9},
    senses:'darkvision 60 ft., passive Perception 10', languages:'Common, Goblin',
    cr:'1/2', xp:100,
    traits:[{name:'Martial Advantage', desc:'Once per turn, the hobgoblin can deal an extra 7 (2d6) damage to a creature it hits with a weapon attack if that creature is within 5 feet of an ally of the hobgoblin that isn\u2019t incapacitated.'}],
    actions:[
      {name:'Longsword', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8+1) slashing damage.'},
      {name:'Longbow', desc:'Ranged Weapon Attack: +3 to hit, range 150/600 ft., one target. Hit: 5 (1d8+1) piercing damage.'},
    ],
  }),
  'Bandit': MO({
    size:'Medium', type:'humanoid (any race)', alignment:'Any Non-Lawful',
    ac:12, acNote:'leather armor', hp:11, hitDice:'2d8+2', speed:'30 ft.',
    scores:{str:11,dex:12,con:12,int:10,wis:10,cha:10},
    senses:'passive Perception 10', languages:'any one language (usually Common)',
    cr:'1/8', xp:25,
    actions:[
      {name:'Scimitar', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6+1) slashing damage.'},
      {name:'Light Crossbow', desc:'Ranged Weapon Attack: +3 to hit, range 80/320 ft., one target. Hit: 5 (1d8+1) piercing damage.'},
    ],
  }),
  'Scout': MO({
    size:'Medium', type:'humanoid (any race)', alignment:'Any Alignment',
    ac:13, acNote:'leather armor', hp:16, hitDice:'3d8+3', speed:'30 ft.',
    scores:{str:11,dex:14,con:12,int:11,wis:13,cha:11},
    skills:'Nature +4, Perception +5, Stealth +6, Survival +5', senses:'passive Perception 15', languages:'any one language (usually Common)',
    cr:'1/2', xp:100,
    traits:[{name:'Keen Hearing and Sight', desc:'The scout has advantage on Wisdom (Perception) checks that rely on hearing or sight.'}],
    actions:[
      {name:'Shortsword', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6+2) piercing damage.'},
      {name:'Longbow', desc:'Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8+2) piercing damage.'},
    ],
  }),
  'Bugbear': MO({
    size:'Medium', type:'humanoid (goblinoid)', alignment:'Chaotic Evil',
    ac:16, acNote:'hide armor, shield', hp:27, hitDice:'5d8+5', speed:'30 ft.',
    scores:{str:15,dex:14,con:13,int:8,wis:11,cha:9},
    skills:'Stealth +6, Survival +1', senses:'darkvision 60 ft., passive Perception 10', languages:'Common, Goblin',
    cr:'1', xp:200,
    traits:[
      {name:'Brute', desc:'A melee weapon deals one extra die of its damage when the bugbear hits with it (included below).'},
      {name:'Surprise Attack', desc:'If the bugbear surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 7 (2d6) damage.'},
    ],
    actions:[{name:'Morningstar', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8+2) piercing damage.'}],
  }),
  'Brown Bear': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:11, hp:34, hitDice:'4d10+12', speed:'40 ft., climb 30 ft.',
    scores:{str:19,dex:10,con:16,int:2,wis:13,cha:7},
    skills:'Perception +3', senses:'passive Perception 13', languages:'None',
    cr:'1', xp:200,
    traits:[{name:'Keen Smell', desc:'The bear has advantage on Wisdom (Perception) checks that rely on smell.'}],
    actions:[
      {name:'Multiattack', desc:'The bear makes two attacks: one with its bite and one with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8+4) piercing damage.'},
      {name:'Claws', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) slashing damage.'},
    ],
  }),
  'Ghoul': MO({
    size:'Medium', type:'undead', alignment:'Chaotic Evil',
    ac:12, hp:22, hitDice:'5d8', speed:'30 ft.',
    scores:{str:13,dex:15,con:10,int:7,wis:10,cha:6},
    immune:'poison; charmed, exhaustion, paralyzed, poisoned', senses:'darkvision 60 ft., passive Perception 10', languages:'Common',
    cr:'1', xp:200,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 9 (2d6+2) piercing damage.'},
      {name:'Claws', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target that isn\u2019t undead. Hit: 7 (2d4+2) slashing damage. The target must succeed on a DC 10 Constitution save or be paralyzed for 1 minute.'},
    ],
  }),
  'Harpy': MO({
    size:'Medium', type:'monstrosity', alignment:'Chaotic Evil',
    ac:11, hp:38, hitDice:'7d8+7', speed:'20 ft., fly 40 ft.',
    scores:{str:12,dex:13,con:12,int:7,wis:10,cha:13},
    senses:'passive Perception 10', languages:'Common',
    cr:'1', xp:200,
    traits:[{name:'Luring Song', desc:'The harpy sings a magical melody. Every humanoid and giant within 300 feet that hears it must succeed on a DC 11 Wisdom saving throw or be charmed, drawn irresistibly toward the harpy.'}],
    actions:[
      {name:'Multiattack', desc:'The harpy makes two attacks: one with its claws and one with its club.'},
      {name:'Claws', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 8 (2d4+3) slashing damage.'},
      {name:'Club', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d4+3) bludgeoning damage.'},
    ],
  }),
  'Giant Spider': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:14, hp:26, hitDice:'4d10+4', speed:'30 ft., climb 30 ft.',
    scores:{str:14,dex:16,con:12,int:2,wis:11,cha:4},
    skills:'Stealth +7', senses:'darkvision 60 ft., passive Perception 10', languages:'None',
    cr:'1', xp:200,
    traits:[
      {name:'Spider Climb', desc:'The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.'},
      {name:'Web Sense', desc:'While in contact with its web, the spider knows the exact location of any other creature in contact with the same web.'},
    ],
    actions:[{name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 7 (1d8+3) piercing damage, and the target must make a DC 11 Constitution save, taking 9 (2d8) poison damage on a failure.'}],
  }),
  'Gnoll': MO({
    size:'Medium', type:'humanoid (gnoll)', alignment:'Chaotic Evil',
    ac:15, acNote:'hide armor, shield', hp:22, hitDice:'5d8', speed:'30 ft.',
    scores:{str:14,dex:12,con:11,int:6,wis:10,cha:7},
    senses:'darkvision 60 ft., passive Perception 10', languages:'Gnoll',
    cr:'1/2', xp:100,
    traits:[{name:'Rampage', desc:'When the gnoll reduces a creature to 0 hit points with a melee attack on its turn, it can take a bonus action to move up to half its speed and make a bite attack.'}],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4+2) piercing damage.'},
      {name:'Spear', desc:'Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d6+2) piercing damage.'},
    ],
  }),
  'Lizardfolk': MO({
    size:'Medium', type:'humanoid (lizardfolk)', alignment:'Neutral',
    ac:15, acNote:'natural armor, shield', hp:22, hitDice:'4d8+4', speed:'30 ft., swim 30 ft.',
    scores:{str:15,dex:10,con:13,int:7,wis:12,cha:7},
    skills:'Perception +3, Stealth +2, Survival +5', senses:'passive Perception 13', languages:'Draconic',
    cr:'1/2', xp:100,
    traits:[{name:'Hold Breath', desc:'The lizardfolk can hold its breath for 15 minutes.'}],
    actions:[
      {name:'Multiattack', desc:'The lizardfolk makes two melee attacks, each of which can be a claw or spear attack.'},
      {name:'Claw', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4+2) slashing damage.'},
      {name:'Spear', desc:'Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 6 (1d8+2) piercing damage, or 7 (1d10+2) piercing if used with two hands.'},
    ],
  }),
  'Ogre': MO({
    size:'Large', type:'giant', alignment:'Chaotic Evil',
    ac:11, acNote:'hide armor', hp:59, hitDice:'7d10+21', speed:'40 ft.',
    scores:{str:19,dex:8,con:16,int:5,wis:7,cha:7},
    senses:'darkvision 60 ft., passive Perception 8', languages:'Common, Giant',
    cr:'2', xp:450,
    actions:[
      {name:'Greatclub', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8+4) bludgeoning damage.'},
      {name:'Javelin', desc:'Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 11 (2d6+4) piercing damage.'},
    ],
  }),
  'Ochre Jelly': MO({
    size:'Large', type:'ooze', alignment:'Unaligned',
    ac:8, hp:45, hitDice:'6d10+12', speed:'10 ft., climb 10 ft.',
    scores:{str:15,dex:6,con:14,int:2,wis:6,cha:1},
    resist:'acid', immune:'lightning, slashing; blinded, charmed, deafened, exhausted, frightened, prone', senses:'blindsight 60 ft. (blind beyond this radius), passive Perception 8', languages:'None',
    cr:'2', xp:450,
    traits:[
      {name:'Amorphous', desc:'The jelly can move through a space as narrow as 1 inch wide without squeezing.'},
      {name:'Split', desc:'When the jelly is subjected to lightning or slashing damage and has 10 hit points or more, it splits into two new jellies if it has enough space, each with half the original\u2019s hit points.'},
    ],
    actions:[{name:'Pseudopod', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (2d6+2) bludgeoning damage plus 4 (1d8) acid damage.'}],
  }),
  'Ankheg': MO({
    size:'Large', type:'monstrosity', alignment:'Unaligned',
    ac:14, acNote:'natural armor', hp:39, hitDice:'6d10+6', speed:'30 ft., burrow 10 ft.',
    scores:{str:17,dex:11,con:13,int:1,wis:13,cha:6},
    senses:'darkvision 60 ft., tremorsense 60 ft., passive Perception 11', languages:'None',
    cr:'2', xp:450,
    actions:[{name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) slashing damage plus 3 (1d6) acid damage. If the target is Large or smaller, it is grappled (escape DC 13).'}],
  }),
  'Giant Scorpion': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:15, acNote:'natural armor', hp:52, hitDice:'7d10+14', speed:'40 ft.',
    scores:{str:15,dex:13,con:15,int:1,wis:9,cha:3},
    senses:'blindsight 60 ft., passive Perception 9', languages:'None',
    cr:'3', xp:700,
    actions:[
      {name:'Multiattack', desc:'The scorpion makes three attacks: two with its claws and one with its sting.'},
      {name:'Claw', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8+2) bludgeoning damage, and the target is grappled (escape DC 12).'},
      {name:'Sting', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10+2) piercing damage, and the target must make a DC 12 Constitution save, taking 22 (4d10) poison damage on a failure, or half as much on a success.'},
    ],
  }),
  'Wight': MO({
    size:'Medium', type:'undead', alignment:'Neutral Evil',
    ac:14, acNote:'studded leather armor', hp:45, hitDice:'6d8+18', speed:'30 ft.',
    skills:'Perception +3, Stealth +4',
    scores:{str:15,dex:14,con:16,int:10,wis:13,cha:15},
    resist:'necrotic; bludgeoning, piercing, and slashing from nonmagical attacks', immune:'poison; exhaustion, poisoned',
    senses:'darkvision 60 ft., passive Perception 13', languages:'the languages it knew in life',
    cr:'3', xp:700,
    traits:[{name:'Sunlight Sensitivity', desc:'While in sunlight, the wight has disadvantage on attack rolls and Perception checks that rely on sight.'}],
    actions:[
      {name:'Multiattack', desc:'The wight makes two longsword attacks, or it makes two longbow attacks. It can use its Life Drain in place of one longsword attack.'},
      {name:'Life Drain', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d6+3) necrotic damage. The target must succeed on a DC 13 Constitution save or its hit point maximum is reduced by an amount equal to the damage taken. A humanoid slain this way rises as a zombie under the wight\u2019s control.'},
      {name:'Longsword', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8+2) slashing damage, or 7 (1d10+2) if used with two hands.'},
    ],
  }),
  'Manticore': MO({
    size:'Large', type:'monstrosity', alignment:'Lawful Evil',
    ac:14, acNote:'natural armor', hp:68, hitDice:'8d10+24', speed:'30 ft., fly 50 ft.',
    scores:{str:17,dex:16,con:17,int:7,wis:12,cha:8},
    senses:'darkvision 60 ft., passive Perception 11', languages:'Common',
    cr:'3', xp:700,
    actions:[
      {name:'Multiattack', desc:'The manticore makes three attacks: one with its bite and two with its claws, or two with its claws and one with its tail spike volley.'},
      {name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8+3) piercing damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6+3) slashing damage.'},
      {name:'Tail Spike Volley', desc:'Ranged Weapon Attack: +5 to hit, range 100/200 ft., up to three targets. Hit: 7 (1d8+3) piercing damage each.'},
    ],
  }),
  'Owlbear': MO({
    size:'Large', type:'monstrosity', alignment:'Unaligned',
    ac:13, acNote:'natural armor', hp:59, hitDice:'7d10+21', speed:'40 ft.',
    scores:{str:20,dex:12,con:17,int:3,wis:12,cha:7},
    skills:'Perception +3', senses:'darkvision 60 ft., passive Perception 13', languages:'None',
    cr:'3', xp:700,
    traits:[{name:'Keen Sight and Smell', desc:'The owlbear has advantage on Wisdom (Perception) checks that rely on sight or smell.'}],
    actions:[
      {name:'Multiattack', desc:'The owlbear makes two attacks: one with its beak and one with its claws.'},
      {name:'Beak', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 10 (1d10+5) piercing damage.'},
      {name:'Claws', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8+5) slashing damage.'},
    ],
  }),
  'Minotaur': MO({
    size:'Large', type:'monstrosity', alignment:'Chaotic Evil',
    ac:14, acNote:'natural armor', hp:76, hitDice:'9d10+27', speed:'40 ft.',
    scores:{str:18,dex:11,con:16,int:6,wis:16,cha:9},
    skills:'Perception +5', senses:'darkvision 60 ft., passive Perception 15', languages:'Abyssal',
    cr:'3', xp:700,
    traits:[
      {name:'Charge', desc:'If the minotaur moves at least 10 feet straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) piercing damage.'},
      {name:'Labyrinthine Recall', desc:'The minotaur can perfectly recall any path it has traveled.'},
    ],
    actions:[{name:'Greataxe', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 17 (2d12+4) slashing damage.'}, {name:'Gore', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8+4) piercing damage.'}],
  }),
  'Basilisk': MO({
    size:'Medium', type:'monstrosity', alignment:'Unaligned',
    ac:15, acNote:'natural armor', hp:52, hitDice:'8d8+16', speed:'20 ft.',
    scores:{str:16,dex:8,con:15,int:2,wis:8,cha:7},
    senses:'darkvision 60 ft., passive Perception 9', languages:'None',
    cr:'3', xp:700,
    traits:[{name:'Petrifying Gaze', desc:'When a creature that can see the basilisk\u2019s eyes starts its turn within 30 feet, the basilisk can force it to make a DC 12 Constitution save if it isn\u2019t already petrified, or the target begins turning to stone and is restrained, then fully petrified after failing again on its next turn.'}],
    actions:[{name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) piercing damage plus 7 (2d6) poison damage.'}],
  }),
  'Griffon': MO({
    size:'Large', type:'monstrosity', alignment:'Unaligned',
    ac:12, hp:59, hitDice:'7d10+21', speed:'30 ft., fly 80 ft.',
    scores:{str:18,dex:15,con:16,int:2,wis:13,cha:8},
    skills:'Perception +4', senses:'darkvision 60 ft., passive Perception 14', languages:'None',
    cr:'2', xp:450,
    actions:[
      {name:'Multiattack', desc:'The griffon makes two attacks: one with its beak and one with its claws.'},
      {name:'Beak', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) piercing damage.'},
      {name:'Claws', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 14 (2d8+5) slashing damage.'},
    ],
  }),
  'Doppelganger': MO({
    size:'Medium', type:'monstrosity', alignment:'Neutral',
    ac:14, hp:52, hitDice:'8d8+16', speed:'30 ft.',
    scores:{str:11,dex:18,con:14,int:11,wis:12,cha:14},
    skills:'Deception +6, Insight +3', senses:'darkvision 60 ft., passive Perception 11', languages:'Common',
    cr:'3', xp:700,
    traits:[
      {name:'Shapechanger', desc:'The doppelganger can use its action to polymorph into a Small or Medium humanoid it has seen, or back into its true form. Its statistics are the same in each form except its speed.'},
      {name:'Ambusher', desc:'In the first round of combat, the doppelganger has advantage on attack rolls against any creature it has surprised.'},
    ],
    actions:[{name:'Multiattack', desc:'The doppelganger makes two melee attacks.'}, {name:'Slam', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d6+4) bludgeoning damage.'}],
  }),
  'Night Hag': MO({
    size:'Medium', type:'fiend', alignment:'Neutral Evil',
    ac:17, acNote:'natural armor', hp:112, hitDice:'15d8+45', speed:'30 ft.',
    scores:{str:18,dex:15,con:16,int:16,wis:14,cha:16},
    skills:'Deception +6, Insight +5, Perception +5', resist:'cold, fire; bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons',
    senses:'darkvision 120 ft., passive Perception 15', languages:'Abyssal, Common, Infernal, Primordial',
    cr:'5', xp:1800,
    traits:[
      {name:'Innate Spellcasting', desc:'The hag can innately cast detect magic and magic missile at will, requiring no material components.'},
      {name:'Magic Resistance', desc:'The hag has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[{name:'Claws', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 13 (3d6+3) slashing damage.'}, {name:'Change Shape', desc:'The night hag magically polymorphs into a Small or Medium female humanoid, or back into her true form.'}],
  }),
  'Roper': MO({
    size:'Large', type:'monstrosity', alignment:'Neutral Evil',
    ac:20, acNote:'natural armor', hp:93, hitDice:'11d10+33', speed:'10 ft., climb 10 ft.',
    scores:{str:18,dex:8,con:17,int:7,wis:16,cha:6},
    skills:'Perception +6, Stealth +3', senses:'darkvision 60 ft., passive Perception 16', languages:'Deep Speech',
    cr:'5', xp:1800,
    traits:[{name:'False Appearance', desc:'While the roper remains motionless, it is indistinguishable from a normal cave formation such as a stalagmite.'}],
    actions:[
      {name:'Tendril', desc:'Melee Weapon Attack: +7 to hit, reach 50 ft., one creature. Hit: the target is grappled (escape DC 15), and pulled 25 feet toward the roper.'},
      {name:'Bite', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8+4) piercing damage.'},
    ],
  }),
  'Troll': MO({
    size:'Large', type:'giant', alignment:'Chaotic Evil',
    ac:15, acNote:'natural armor', hp:84, hitDice:'8d10+40', speed:'30 ft.',
    scores:{str:18,dex:13,con:20,int:7,wis:9,cha:7},
    skills:'Perception +2', senses:'darkvision 60 ft., passive Perception 12', languages:'Giant',
    cr:'5', xp:1800,
    traits:[{name:'Regeneration', desc:'The troll regains 10 hit points at the start of its turn, unless it has taken acid or fire damage since its last turn. Only if it starts its turn with 0 hit points does it die, and it doesn\u2019t if it hasn\u2019t taken acid or fire damage this cycle.'}],
    actions:[
      {name:'Multiattack', desc:'The troll makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6+4) piercing damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) slashing damage.'},
    ],
  }),
  'Bulette': MO({
    size:'Large', type:'monstrosity', alignment:'Unaligned',
    ac:17, acNote:'natural armor', hp:94, hitDice:'9d10+45', speed:'40 ft., burrow 40 ft.',
    scores:{str:19,dex:11,con:21,int:2,wis:10,cha:5},
    skills:'Perception +3', senses:'darkvision 60 ft., tremorsense 60 ft., passive Perception 13', languages:'None',
    cr:'5', xp:1800,
    traits:[{name:'Standing Leap', desc:'The bulette\u2019s long jump is up to 30 feet and its high jump is up to 15 feet, with or without a running start.'}],
    actions:[{name:'Bite', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 30 (4d12+4) piercing damage.'}],
  }),
  'Hill Giant': MO({
    size:'Huge', type:'giant', alignment:'Chaotic Evil',
    ac:13, acNote:'natural armor', hp:105, hitDice:'10d12+40', speed:'40 ft.',
    scores:{str:21,dex:8,con:19,int:5,wis:9,cha:6},
    skills:'Perception +2', senses:'passive Perception 12', languages:'Giant',
    cr:'5', xp:1800,
    actions:[
      {name:'Multiattack', desc:'The giant makes two greatclub attacks.'},
      {name:'Greatclub', desc:'Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 18 (3d8+5) bludgeoning damage.'},
      {name:'Rock', desc:'Ranged Weapon Attack: +8 to hit, range 60/240 ft., one target. Hit: 21 (3d10+5) bludgeoning damage.'},
    ],
  }),
  'Chimera': MO({
    size:'Large', type:'monstrosity', alignment:'Chaotic Evil',
    ac:14, acNote:'natural armor', hp:114, hitDice:'12d10+48', speed:'30 ft., fly 60 ft.',
    scores:{str:19,dex:11,con:19,int:3,wis:14,cha:10},
    skills:'Perception +6', senses:'darkvision 60 ft., passive Perception 16', languages:'understands Draconic but can\u2019t speak it',
    cr:'6', xp:2300,
    actions:[
      {name:'Multiattack', desc:'The chimera makes three attacks: one with its bite, one with its horns, and one with its claws. When its fire breath is available, it can use the breath in place of the bite.'},
      {name:'Bite', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d6+4) piercing damage.'},
      {name:'Horns', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (1d12+3) bludgeoning damage.'},
      {name:'Claws', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6+3) slashing damage.'},
      {name:'Fire Breath', desc:'The dragon head exhales fire in a 15-foot cone. Each creature there takes 31 (7d8) fire damage on a failed DC 15 Dexterity save, or half as much on a success. Usable once per short or long rest.'},
    ],
  }),
  'Medusa': MO({
    size:'Medium', type:'monstrosity', alignment:'Lawful Evil',
    ac:15, acNote:'natural armor', hp:127, hitDice:'17d8+51', speed:'30 ft.',
    scores:{str:10,dex:15,con:16,int:12,wis:13,cha:15},
    skills:'Deception +5, Insight +4, Perception +4, Stealth +5', senses:'darkvision 60 ft., passive Perception 14', languages:'Common',
    cr:'6', xp:2300,
    traits:[{name:'Petrifying Gaze', desc:'When a creature that can see the medusa\u2019s eyes starts its turn within 30 feet, the medusa can force it to make a DC 14 Constitution save if the medusa isn\u2019t incapacitated, or the target begins turning to stone.'}],
    actions:[
      {name:'Multiattack', desc:'The medusa makes either three snake hair attacks or two attacks with her shortsword, and can use Petrifying Gaze.'},
      {name:'Snake Hair', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 4 (1d4+2) piercing damage plus 14 (4d6) poison damage.'},
      {name:'Shortsword', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6+3) piercing damage plus 14 (4d6) poison damage.'},
    ],
  }),
  'Wyvern': MO({
    size:'Large', type:'dragon', alignment:'Unaligned',
    ac:13, acNote:'natural armor', hp:110, hitDice:'13d10+39', speed:'20 ft., fly 80 ft.',
    scores:{str:19,dex:10,con:16,int:5,wis:12,cha:6},
    skills:'Perception +4', senses:'darkvision 60 ft., passive Perception 14', languages:'None',
    cr:'6', xp:2300,
    actions:[
      {name:'Multiattack', desc:'The wyvern makes two attacks: one with its bite and one with its stinger, or two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 11 (2d6+4) piercing damage.'},
      {name:'Claws', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (2d4+4) slashing damage.'},
      {name:'Stinger', desc:'Melee Weapon Attack: +7 to hit, reach 10 ft., one creature. Hit: 11 (2d6+4) piercing damage, and the target must make a DC 15 Constitution save, taking 24 (7d6) poison damage on a failure, or half as much on a success.'},
    ],
  }),
  'Invisible Stalker': MO({
    size:'Medium', type:'elemental', alignment:'Neutral',
    ac:14, hp:104, hitDice:'16d8+32', speed:'50 ft., fly 50 ft. (hover)',
    scores:{str:16,dex:19,con:14,int:10,wis:15,cha:11},
    skills:'Perception +6, Stealth +9', senses:'darkvision 60 ft., passive Perception 16', languages:'Auran, understands Common but doesn\u2019t speak it',
    cr:'6', xp:2300,
    traits:[
      {name:'Invisibility', desc:'The stalker is invisible.'},
      {name:'Faultless Tracker', desc:'The stalker is given a quarry by its summoner. It always knows the direction and distance to that quarry, even across planes, and can\u2019t lose the trail except across a proper planar boundary.'},
    ],
    actions:[{name:'Multiattack', desc:'The stalker makes two slam attacks.'}, {name:'Slam', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) bludgeoning damage.'}],
  }),
  'Stone Giant': MO({
    size:'Huge', type:'giant', alignment:'Neutral',
    ac:17, acNote:'natural armor', hp:126, hitDice:'11d12+55', speed:'40 ft.',
    scores:{str:23,dex:15,con:20,int:10,wis:12,cha:9},
    skills:'Athletics +9, Perception +4', senses:'darkvision 60 ft., passive Perception 14', languages:'Giant',
    cr:'7', xp:2900,
    traits:[{name:'Stone Camouflage', desc:'The giant has advantage on Dexterity (Stealth) checks made to hide in rocky terrain.'}],
    actions:[
      {name:'Multiattack', desc:'The giant makes two greatclub attacks.'},
      {name:'Greatclub', desc:'Melee Weapon Attack: +9 to hit, reach 15 ft., one target. Hit: 19 (3d8+6) bludgeoning damage.'},
      {name:'Rock', desc:'Ranged Weapon Attack: +9 to hit, range 60/240 ft., one target. Hit: 28 (4d10+6) bludgeoning damage.'},
    ],
  }),
  'Frost Giant': MO({
    size:'Huge', type:'giant', alignment:'Neutral Evil',
    ac:15, acNote:'patchwork armor', hp:138, hitDice:'12d12+60', speed:'40 ft.',
    scores:{str:23,dex:9,con:21,int:9,wis:10,cha:12},
    skills:'Athletics +9, Perception +3', resist:'cold', senses:'passive Perception 13', languages:'Giant',
    cr:'8', xp:3900,
    actions:[
      {name:'Multiattack', desc:'The giant makes two greataxe attacks.'},
      {name:'Greataxe', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 25 (3d12+6) slashing damage.'},
      {name:'Rock', desc:'Ranged Weapon Attack: +9 to hit, range 60/240 ft., one target. Hit: 30 (4d12+6) bludgeoning damage.'},
    ],
  }),
  'Hydra': MO({
    size:'Huge', type:'monstrosity', alignment:'Unaligned',
    ac:15, acNote:'natural armor', hp:172, hitDice:'15d12+75', speed:'30 ft., swim 30 ft.',
    scores:{str:20,dex:12,con:20,int:2,wis:10,cha:7},
    skills:'Perception +6', senses:'darkvision 60 ft., passive Perception 16', languages:'None',
    cr:'8', xp:3900,
    traits:[
      {name:'Multiple Heads', desc:'The hydra has five heads. It dies only if all its heads are destroyed. For every 25 damage a head takes in a single turn, one head is destroyed. At the end of its turn, it grows two heads for each one destroyed that turn, unless it took fire damage to the stump since its last turn.'},
      {name:'Wakeful', desc:'While the hydra sleeps, at least one head is awake.'},
    ],
    actions:[{name:'Multiattack', desc:'The hydra makes as many bite attacks as it has heads.'}, {name:'Bite', desc:'Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10+5) piercing damage.'}],
  }),
  'Young Green Dragon': MO({
    size:'Large', type:'dragon', alignment:'Lawful Evil',
    ac:18, acNote:'natural armor', hp:136, hitDice:'16d10+48', speed:'40 ft., fly 80 ft., swim 40 ft.',
    scores:{str:19,dex:12,con:17,int:16,wis:13,cha:15},
    saves:'Dex +4, Con +6, Wis +4, Cha +5', skills:'Deception +5, Perception +7, Stealth +4',
    immune:'poison; poisoned', senses:'darkvision 120 ft., passive Perception 17', languages:'Common, Draconic',
    cr:'8', xp:3900,
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10+4) piercing damage plus 3 (1d6) poison damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) slashing damage.'},
      {name:'Poison Breath', desc:'The dragon exhales poisonous gas in a 30-foot cone. Each creature there takes 42 (12d6) poison damage on a failed DC 14 Constitution save, or half as much on a success. Usable once per short or long rest.'},
    ],
  }),
  'Aboleth': MO({
    size:'Large', type:'aberration', alignment:'Lawful Evil',
    ac:17, acNote:'natural armor', hp:135, hitDice:'18d10+36', speed:'10 ft., swim 40 ft.',
    scores:{str:21,dex:9,con:15,int:18,wis:15,cha:18},
    saves:'Con +6, Int +8, Wis +6', skills:'History +12, Perception +10',
    senses:'darkvision 120 ft., passive Perception 20', languages:'Deep Speech, telepathy 120 ft.',
    cr:'10', xp:5900,
    traits:[
      {name:'Amphibious', desc:'The aboleth can breathe air and water.'},
      {name:'Mucous Cloud', desc:'While underwater, the aboleth is surrounded by mucus. A creature that touches it or hits it with a melee attack while within 5 feet of it must save or be afflicted with a disease.'},
    ],
    actions:[{name:'Multiattack', desc:'The aboleth makes three tentacle attacks.'}, {name:'Tentacle', desc:'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 12 (2d6+5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution save or become diseased.'}],
  }),
  'Stone Golem': MO({
    size:'Large', type:'construct', alignment:'Unaligned',
    ac:17, acNote:'natural armor', hp:178, hitDice:'17d10+85', speed:'30 ft.',
    scores:{str:22,dex:9,con:20,int:3,wis:11,cha:1},
    immune:'poison, psychic; charmed, exhaustion, frightened, paralyzed, petrified, poisoned', senses:'darkvision 120 ft., passive Perception 10', languages:'understands the languages of its creator but can\u2019t speak',
    cr:'10', xp:5900,
    traits:[{name:'Immutable Form', desc:'The golem is immune to any spell or effect that would alter its form.'}],
    actions:[
      {name:'Multiattack', desc:'The golem makes two slam attacks.'},
      {name:'Slam', desc:'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 19 (3d8+6) bludgeoning damage.'},
      {name:'Slow', desc:'The golem targets one or more creatures it can see within 10 feet. Each target must make a DC 17 Wisdom save or be slowed for 1 minute, halving its speed and taking other penalties. Usable once per short or long rest.'},
    ],
  }),
  'Fire Giant': MO({
    size:'Huge', type:'giant', alignment:'Lawful Evil',
    ac:18, acNote:'plate armor', hp:162, hitDice:'13d12+78', speed:'30 ft.',
    scores:{str:25,dex:9,con:23,int:10,wis:14,cha:13},
    saves:'Dex +3, Con +10, Wis +6, Cha +5', skills:'Athletics +11, Perception +6',
    senses:'passive Perception 16', languages:'Giant',
    cr:'9', xp:5000,
    actions:[
      {name:'Multiattack', desc:'The giant makes two greatsword attacks.'},
      {name:'Greatsword', desc:'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 28 (6d6+7) slashing damage.'},
      {name:'Rock', desc:'Ranged Weapon Attack: +11 to hit, range 60/240 ft., one target. Hit: 29 (4d10+7) bludgeoning damage.'},
    ],
  }),
  'Cloud Giant': MO({
    size:'Huge', type:'giant', alignment:'Neutral Good',
    ac:14, acNote:'natural armor', hp:200, hitDice:'16d12+96', speed:'40 ft.',
    scores:{str:27,dex:10,con:22,int:12,wis:16,cha:16},
    saves:'Con +10, Wis +7, Cha +7', skills:'Insight +7, Perception +11',
    senses:'passive Perception 21', languages:'Common, Giant',
    cr:'9', xp:5000,
    traits:[{name:'Keen Smell', desc:'The giant has advantage on Wisdom (Perception) checks that rely on smell.'}],
    actions:[
      {name:'Multiattack', desc:'The giant makes two morningstar attacks.'},
      {name:'Morningstar', desc:'Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 21 (3d8+8) piercing damage.'},
      {name:'Rock', desc:'Ranged Weapon Attack: +12 to hit, range 60/240 ft., one target. Hit: 30 (4d10+8) bludgeoning damage.'},
    ],
  }),
  'Young Red Dragon': MO({
    size:'Large', type:'dragon', alignment:'Chaotic Evil',
    ac:18, acNote:'natural armor', hp:178, hitDice:'17d10+85', speed:'40 ft., climb 40 ft., fly 80 ft.',
    scores:{str:23,dex:10,con:21,int:14,wis:11,cha:19},
    saves:'Dex +4, Con +9, Wis +4, Cha +8', skills:'Perception +8, Stealth +4',
    immune:'fire', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 18', languages:'Common, Draconic',
    cr:'10', xp:5900,
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (2d10+6) piercing damage plus 3 (1d6) fire damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6+6) slashing damage.'},
      {name:'Fire Breath', desc:'The dragon exhales fire in a 30-foot cone. Each creature there takes 56 (16d6) fire damage on a failed DC 17 Dexterity save, or half as much on a success. Usable once per short or long rest.'},
    ],
  }),
  'Beholder': MO({
    size:'Large', type:'aberration', alignment:'Lawful Evil',
    ac:18, acNote:'natural armor', hp:180, hitDice:'19d10+76', speed:'0 ft., fly 20 ft. (hover)',
    scores:{str:10,dex:14,con:18,int:17,wis:15,cha:17},
    saves:'Int +7, Wis +6, Cha +7', skills:'Perception +11',
    senses:'darkvision 120 ft., passive Perception 21', languages:'Deep Speech, Undercommon',
    cr:'13', xp:10000,
    traits:[{name:'Antimagic Cone', desc:'The beholder\u2019s central eye creates an area of antimagic in a 150-foot cone, as in the antimagic field spell, whenever it isn\u2019t incapacitated.'}],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 14 (4d6) piercing damage.'},
      {name:'Eye Rays', desc:'The beholder shoots three of eleven possible magical eye rays at random, choosing one to three targets it can see within 120 feet, each ray forcing a save against a different powerful effect (such as paralysis, disintegration, or fear).'},
    ],
  }),
  'Vampire': MO({
    size:'Medium', type:'undead', alignment:'Lawful Evil',
    ac:16, acNote:'natural armor', hp:144, hitDice:'17d8+68', speed:'30 ft., climb 30 ft.',
    scores:{str:18,dex:18,con:18,int:17,wis:15,cha:18},
    saves:'Dex +9, Wis +7, Cha +9', skills:'Perception +7, Stealth +9',
    resist:'necrotic; bludgeoning, piercing, and slashing from nonmagical attacks', senses:'darkvision 120 ft., passive Perception 17', languages:'the languages it knew in life',
    cr:'13', xp:10000,
    traits:[
      {name:'Shapechanger', desc:'The vampire can polymorph into a Tiny bat or a Medium cloud of mist, or back into its true form.'},
      {name:'Regeneration', desc:'The vampire regains 20 hit points at the start of its turn if it has at least 1 hit point, unless it took radiant damage or damage from holy water since its last turn.'},
    ],
    actions:[{name:'Multiattack', desc:'The vampire makes two attacks, only one of which can be a bite.'}, {name:'Bite', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one willing creature or one that is grappled. Hit: 7 (1d6+4) piercing damage plus 10 (3d6) necrotic damage, and the vampire regains hit points equal to the necrotic damage dealt.'}, {name:'Unarmed Strike', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one creature. Hit: 8 (1d8+4) bludgeoning damage, and if the target is Medium or smaller it is grappled.'}],
  }),
  'Storm Giant': MO({
    size:'Huge', type:'giant', alignment:'Chaotic Good',
    ac:16, acNote:'scale mail', hp:230, hitDice:'20d12+100', speed:'50 ft., swim 50 ft.',
    scores:{str:29,dex:14,con:20,int:16,wis:18,cha:18},
    saves:'Str +14, Con +10, Wis +9, Cha +9', skills:'Arcana +8, Athletics +14, History +8, Perception +9',
    resist:'cold', immune:'lightning, thunder', senses:'passive Perception 19', languages:'Common, Giant',
    cr:'13', xp:10000,
    traits:[
      {name:'Amphibious', desc:'The giant can breathe air and water.'},
      {name:'Innate Spellcasting', desc:'The giant\u2019s innate spellcasting ability is Charisma (spell save DC 17). It can innately cast the following spells, requiring no material components: at will: detect magic, feather fall, levitate, light; 3/day each: control weather, water breathing.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The giant makes two greatsword attacks.'},
      {name:'Greatsword', desc:'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 30 (6d6+9) slashing damage.'},
      {name:'Rock', desc:'Ranged Weapon Attack: +14 to hit, range 60/240 ft., one target. Hit: 35 (4d12+9) bludgeoning damage.'},
      {name:'Lightning Strike (Recharge 5-6)', desc:'The giant hurls a lightning bolt at a point it can see within 500 feet, forcing creatures within 10 feet of that point to make a DC 17 Dexterity save, taking 54 (12d8) lightning damage on a failure, or half as much on a success.'},
    ],
  }),
  'Adult Black Dragon': MO({
    size:'Huge', type:'dragon', alignment:'Chaotic Evil',
    ac:19, acNote:'natural armor', hp:195, hitDice:'17d12+85', speed:'40 ft., fly 80 ft., swim 40 ft.',
    scores:{str:23,dex:14,con:21,int:14,wis:13,cha:17},
    saves:'Dex +7, Con +10, Wis +6, Cha +8', skills:'Perception +11, Stealth +7',
    immune:'acid', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 21', languages:'Common, Draconic',
    cr:'14', xp:11500,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10+6) piercing damage plus 4 (1d8) acid damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6+6) slashing damage.'},
      {name:'Acid Breath', desc:'The dragon exhales acid in a 60-foot line. Each creature there takes 54 (12d8) acid damage on a failed DC 18 Dexterity save, or half as much on a success. Usable once per short or long rest.'},
    ],
  }),
  'Iron Golem': MO({
    size:'Large', type:'construct', alignment:'Unaligned',
    ac:20, acNote:'natural armor', hp:210, hitDice:'20d10+100', speed:'30 ft.',
    scores:{str:24,dex:9,con:20,int:3,wis:11,cha:1},
    immune:'fire, poison, psychic; charmed, exhaustion, frightened, paralyzed, petrified, poisoned', senses:'darkvision 120 ft., passive Perception 10', languages:'understands the languages of its creator but can\u2019t speak',
    cr:'16', xp:15000,
    traits:[{name:'Immutable Form', desc:'The golem is immune to any spell or effect that would alter its form.'}],
    actions:[
      {name:'Multiattack', desc:'The golem makes two melee attacks.'},
      {name:'Slam', desc:'Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 20 (3d8+7) bludgeoning damage.'},
      {name:'Sword', desc:'Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 23 (3d10+7) slashing damage.'},
      {name:'Poison Breath', desc:'The golem exhales poisonous gas in a 15-foot cone. Each creature there takes 45 (10d8) poison damage on a failed DC 19 Constitution save, or half as much on a success. Usable once per short or long rest.'},
    ],
  }),
  'Adult Red Dragon': MO({
    size:'Huge', type:'dragon', alignment:'Chaotic Evil',
    ac:19, acNote:'natural armor', hp:256, hitDice:'19d12+133', speed:'40 ft., climb 40 ft., fly 80 ft.',
    scores:{str:27,dex:10,con:25,int:16,wis:13,cha:21},
    saves:'Dex +6, Con +13, Wis +7, Cha +11', skills:'Perception +13, Stealth +6',
    immune:'fire', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 23', languages:'Common, Draconic',
    cr:'17', xp:18000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 21 (2d10+10) piercing damage plus 7 (2d6) fire damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 17 (2d6+10) slashing damage.'},
      {name:'Fire Breath', desc:'The dragon exhales fire in a 60-foot cone. Each creature there takes 63 (18d6) fire damage on a failed DC 21 Dexterity save, or half as much on a success. Usable once per short or long rest.'},
    ],
    legendary:[
      {name:'Detect', desc:'The dragon makes a Wisdom (Perception) check.'},
      {name:'Tail Attack', desc:'Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 17 (2d8+8) bludgeoning damage.'},
      {name:'Wing Attack (Costs 2 Actions)', desc:'Each creature within 10 feet must succeed on a DC 22 Dexterity save or take 15 (2d6+8) bludgeoning damage and be knocked prone; the dragon can then fly up to half its speed.'},
    ],
  }),
  'Death Knight': MO({
    size:'Medium', type:'undead', alignment:'Lawful Evil',
    ac:20, acNote:'plate armor', hp:180, hitDice:'19d8+95', speed:'30 ft.',
    scores:{str:20,dex:11,con:20,int:12,wis:16,cha:18},
    saves:'Con +10, Wis +8, Cha +9', skills:'Intimidation +9, Perception +8, Religion +6',
    resist:'necrotic; bludgeoning, piercing, and slashing from nonmagical attacks', immune:'poison; frightened, poisoned',
    senses:'darkvision 120 ft., passive Perception 18', languages:'Common plus up to five other languages',
    cr:'17', xp:18000,
    traits:[
      {name:'Legendary Resistance (3/Day)', desc:'If the death knight fails a saving throw, it can choose to succeed instead.'},
      {name:'Aura of Despair', desc:'Any hostile creature that starts its turn within 10 feet of the death knight must succeed on a DC 16 Wisdom save or become frightened for 1 minute.'},
      {name:'Magic Resistance', desc:'The death knight has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The death knight makes three greatsword attacks.'},
      {name:'Greatsword', desc:'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 12 (2d6+5) slashing damage plus 18 (4d8) necrotic damage.'},
      {name:'Hellfire Orb', desc:'The death knight hurls a magical ball of fire at a point within 120 feet. Each creature within 20 feet of that point takes 55 (10d10) fire damage on a failed DC 16 Dexterity save, or half as much on a success. Usable twice per long rest.'},
    ],
    legendary:[
      {name:'Move', desc:'The death knight moves up to its speed without provoking opportunity attacks.'},
      {name:'Attack', desc:'The death knight makes a greatsword attack.'},
      {name:'Unholy Command (Costs 2 Actions)', desc:'One creature the death knight can see within 30 feet must succeed on a DC 16 Wisdom save or use its reaction to make a melee attack against a creature of the death knight\u2019s choice.'},
    ],
  }),
  'Balor': MO({
    size:'Huge', type:'fiend (demon)', alignment:'Chaotic Evil',
    ac:19, acNote:'natural armor', hp:262, hitDice:'21d12+126', speed:'40 ft., fly 80 ft.',
    scores:{str:26,dex:15,con:22,int:20,wis:16,cha:22},
    saves:'Str +14, Con +12, Wis +9, Cha +12', resist:'cold, lightning', immune:'fire, poison; poisoned',
    senses:'truesight 120 ft., passive Perception 13', languages:'Abyssal, telepathy 120 ft.',
    cr:'19', xp:22000,
    traits:[
      {name:'Legendary Resistance (3/Day)', desc:'If the balor fails a saving throw, it can choose to succeed instead.'},
      {name:'Death Throes', desc:'When the balor dies, it explodes, and each creature within 30 feet must save or take 70 (20d6) fire damage, and the area becomes difficult terrain choked with lingering fire for a time.'},
      {name:'Fire Aura', desc:'At the start of each of the balor\u2019s turns, each creature within 5 feet takes 10 (3d6) fire damage, and flammable objects that aren\u2019t worn or carried ignite.'},
      {name:'Magic Resistance', desc:'The balor has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The balor makes two attacks: one with its longsword and one with its whip.'},
      {name:'Longsword', desc:'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 21 (3d8+8) slashing damage plus 13 (3d8) fire damage.'},
      {name:'Whip', desc:'Melee Weapon Attack: +14 to hit, reach 30 ft., one target. Hit: 15 (2d6+8) slashing damage plus 10 (3d6) fire damage, and the target is pulled up to 25 feet toward the balor.'},
    ],
  }),
  'Pit Fiend': MO({
    size:'Large', type:'fiend (devil)', alignment:'Lawful Evil',
    ac:19, acNote:'natural armor', hp:300, hitDice:'24d10+168', speed:'30 ft., fly 60 ft.',
    scores:{str:26,dex:14,con:24,int:22,wis:18,cha:24},
    saves:'Dex +8, Con +13, Wis +10', resist:'cold; bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons', immune:'fire, poison; poisoned',
    senses:'truesight 120 ft., passive Perception 14', languages:'Infernal, telepathy 120 ft.',
    cr:'20', xp:25000,
    traits:[
      {name:'Legendary Resistance (3/Day)', desc:'If the pit fiend fails a saving throw, it can choose to succeed instead.'},
      {name:'Magic Resistance', desc:'The pit fiend has advantage on saving throws against spells and other magical effects.'},
      {name:'Fear Aura', desc:'Any creature hostile to the pit fiend that starts its turn within 20 feet of it must succeed on a DC 21 Wisdom save, unless the pit fiend is incapacitated, or become frightened until the start of its next turn. A creature that succeeds is immune to this aura for 24 hours.'},
      {name:'Innate Spellcasting', desc:'The pit fiend\u2019s spellcasting ability is Charisma (spell save DC 21). It can innately cast the following spells, requiring no material components: at will: detect magic, fireball; 3/day each: hold monster, wall of fire.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The pit fiend makes four attacks: one with its bite, one with its claw, one with its mace, and one with its tail.'},
      {name:'Bite', desc:'Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 22 (4d6+8) piercing damage, and the target must save or take 21 (6d6) poison damage and become poisoned for a time.'},
      {name:'Claw', desc:'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 17 (2d8+8) slashing damage.'},
      {name:'Mace', desc:'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 15 (2d6+8) bludgeoning damage plus 21 (6d6) fire damage.'},
      {name:'Tail', desc:'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 24 (3d10+8) bludgeoning damage.'},
    ],
  }),
  'Ancient White Dragon': MO({
    size:'Gargantuan', type:'dragon', alignment:'Chaotic Evil',
    ac:20, acNote:'natural armor', hp:333, hitDice:'18d20+144', speed:'40 ft., burrow 30 ft., fly 80 ft., swim 40 ft.',
    scores:{str:26,dex:10,con:26,int:10,wis:13,cha:14},
    saves:'Dex +6, Con +14, Wis +7, Cha +8', skills:'Perception +13, Stealth +6',
    immune:'cold', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 23', languages:'Common, Draconic',
    cr:'20', xp:25000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 21 (2d10+10) piercing damage plus 9 (2d8) cold damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 17 (2d6+10) slashing damage.'},
      {name:'Cold Breath', desc:'The dragon exhales an icy blast in a 90-foot cone. Each creature there takes 72 (16d8) cold damage on a failed DC 22 Constitution save, or half as much on a success. Usable once per short or long rest.'},
    ],
    legendary:[
      {name:'Detect', desc:'The dragon makes a Wisdom (Perception) check.'},
      {name:'Tail Attack', desc:'Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 19 (2d8+10) bludgeoning damage.'},
      {name:'Wing Attack (Costs 2 Actions)', desc:'Each creature within 15 feet must succeed on a DC 23 Dexterity save or take 17 (2d6+10) bludgeoning damage and be knocked prone; the dragon can then fly up to half its speed.'},
    ],
  }),
  'Lich': MO({
    size:'Medium', type:'undead', alignment:'Any Evil',
    ac:17, acNote:'natural armor', hp:135, hitDice:'18d8+54', speed:'30 ft.',
    scores:{str:11,dex:16,con:16,int:20,wis:14,cha:16},
    saves:'Con +10, Int +12, Wis +9', skills:'Arcana +18, History +12, Insight +9, Perception +9',
    resist:'cold, lightning, necrotic', immune:'poison; bludgeoning, piercing, and slashing from nonmagical attacks; charmed, exhaustion, frightened, paralyzed, poisoned',
    senses:'truesight 120 ft., passive Perception 19', languages:'Common plus up to five other languages',
    cr:'21', xp:33000,
    traits:[
      {name:'Legendary Resistance (3/Day)', desc:'If the lich fails a saving throw, it can choose to succeed instead.'},
      {name:'Rejuvenation', desc:'If it has a phylactery, a destroyed lich gains a new body in 1d10 days, regaining all its hit points and becoming active again.'},
      {name:'Turn Resistance', desc:'The lich has advantage on saving throws against any effect that turns undead.'},
    ],
    actions:[
      {name:'Paralyzing Touch', desc:'Melee Spell Attack: +12 to hit, reach 5 ft., one creature. Hit: 21 (3d8+8) cold damage. The target must succeed on a DC 18 Constitution save or be paralyzed for 1 minute.'},
    ],
    legendary:[
      {name:'Cantrip', desc:'The lich casts a cantrip.'},
      {name:'Paralyzing Touch (Costs 2 Actions)', desc:'The lich uses its Paralyzing Touch.'},
      {name:'Frightening Gaze (Costs 2 Actions)', desc:'The lich fixes its gaze on one creature within 10 feet, who must succeed on a DC 18 Wisdom save or become frightened for 1 minute.'},
    ],
  }),
  'Kraken': MO({
    size:'Gargantuan', type:'monstrosity (titan)', alignment:'Chaotic Evil',
    ac:18, acNote:'natural armor', hp:472, hitDice:'27d20+189', speed:'20 ft., swim 60 ft.',
    scores:{str:30,dex:11,con:25,int:22,wis:18,cha:20},
    saves:'Dex +7, Con +14, Int +13, Wis +11, Cha +12', resist:'bludgeoning, piercing, and slashing from nonmagical attacks', immune:'lightning; frightened, paralyzed',
    senses:'truesight 120 ft., passive Perception 14', languages:'understands Abyssal, Celestial, Infernal, and Primordial but can\u2019t speak; telepathy 120 ft.',
    cr:'23', xp:50000,
    traits:[
      {name:'Legendary Resistance (3/Day)', desc:'If the kraken fails a saving throw, it can choose to succeed instead.'},
      {name:'Siege Monster', desc:'The kraken deals double damage to objects and structures.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The kraken makes three tentacle attacks.'},
      {name:'Bite', desc:'Melee Weapon Attack: +16 to hit, reach 30 ft., one target. Hit: 23 (3d8+10) piercing damage.'},
      {name:'Tentacle', desc:'Melee Weapon Attack: +16 to hit, reach 30 ft., one target. Hit: 19 (3d6+9) bludgeoning damage, and the target is grappled if it\u2019s a Huge or smaller creature.'},
      {name:'Lightning Storm', desc:'The kraken magically creates three bolts of lightning, each of which can strike a target it can see within 120 feet, dealing 22 (4d10) lightning damage on a failed DC 23 Dexterity save, or half as much on a success. Usable once per short or long rest.'},
    ],
    legendary:[
      {name:'Tentacle Attack', desc:'The kraken makes one tentacle attack.'},
      {name:'Fling', desc:'One Large or smaller creature the kraken is grappling is thrown up to 60 feet, taking 16 (3d6+6) bludgeoning damage on impact and landing prone.'},
      {name:'Lightning Storm (Costs 3 Actions)', desc:'The kraken uses Lightning Storm.'},
    ],
  }),
  'Tarrasque': MO({
    size:'Gargantuan', type:'monstrosity (titan)', alignment:'Unaligned',
    ac:25, acNote:'natural armor', hp:676, hitDice:'33d20+330', speed:'40 ft.',
    scores:{str:30,dex:11,con:30,int:3,wis:11,cha:11},
    saves:'Wis +6', immune:'fire, poison; frightened, paralyzed, poisoned', senses:'blindsight 120 ft., passive Perception 10', languages:'None',
    cr:'30', xp:155000,
    traits:[
      {name:'Legendary Resistance (3/Day)', desc:'If the tarrasque fails a saving throw, it can choose to succeed instead.'},
      {name:'Magic Resistance', desc:'The tarrasque has advantage on saving throws against spells and other magical effects.'},
      {name:'Reflective Carapace', desc:'Any time the tarrasque is targeted by a spell that requires an attack roll, roll a die; on an even result, the tarrasque is unaffected and the spell instead targets the caster.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The tarrasque makes four attacks: one with its bite and three with its claws. It can use Swallow instead of its bite.'},
      {name:'Bite', desc:'Melee Weapon Attack: +19 to hit, reach 10 ft., one target. Hit: 36 (4d12+10) piercing damage. If the target is a creature, it is swallowed on a critical hit or if already gravely wounded.'},
      {name:'Claw', desc:'Melee Weapon Attack: +19 to hit, reach 15 ft., one target. Hit: 28 (4d8+10) slashing damage.'},
      {name:'Tail', desc:'Melee Weapon Attack: +19 to hit, reach 20 ft., one target. Hit: 24 (3d8+10) bludgeoning damage, and if the target is a creature it must succeed on a DC 20 Strength save or be knocked prone.'},
    ],
    legendary:[
      {name:'Attack', desc:'The tarrasque makes one claw attack.'},
      {name:'Move', desc:'The tarrasque moves up to half its speed.'},
      {name:'Chomp (Costs 2 Actions)', desc:'The tarrasque makes one bite attack.'},
    ],
  }),

  // ---- Tier 1 additions ----
  'Giant Centipede': MO({
    size:'Small', type:'beast', alignment:'Unaligned',
    ac:13, acNote:'natural armor', hp:4, hitDice:'1d6+1', speed:'30 ft., climb 30 ft.',
    scores:{str:5,dex:14,con:12,int:1,wis:7,cha:3},
    senses:'blindsight 30 ft., passive Perception 8', languages:'None',
    cr:'1/4', xp:50,
    actions:[{name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4+2) piercing damage, and the target must succeed on a DC 11 Constitution save or take 10 (3d6) poison damage, or half as much on a success. If reduced to 0 hp, the target is poisoned for 1 hour, paralyzed while poisoned this way.'}],
  }),
  'Giant Frog': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:11, hp:18, hitDice:'4d8', speed:'30 ft., swim 30 ft.',
    scores:{str:12,dex:13,con:11,int:2,wis:10,cha:3},
    skills:'Perception +2, Stealth +3', senses:'darkvision 30 ft., passive Perception 12', languages:'None',
    cr:'1/4', xp:50,
    traits:[{name:'Amphibious', desc:'The frog can breathe air and water.'},{name:'Standing Leap', desc:'The frog\u2019s long jump is up to 20 feet and its high jump is up to 10 feet, with or without a running start.'}],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6+1) piercing damage, and the target is grappled (escape DC 11).'},
      {name:'Swallow', desc:'The frog swallows a Small or smaller target it is grappling, ending the grapple; the swallowed target is blinded and restrained, and takes 5 (2d4) acid damage at the start of each of the frog\u2019s turns.'},
    ],
  }),
  'Pseudodragon': MO({
    size:'Tiny', type:'dragon', alignment:'Neutral Good',
    ac:13, acNote:'natural armor', hp:7, hitDice:'2d4+2', speed:'15 ft., fly 60 ft.',
    scores:{str:6,dex:15,con:13,int:10,wis:12,cha:10},
    skills:'Perception +3, Stealth +4', senses:'blindsight 60 ft., darkvision 60 ft., passive Perception 13', languages:'understands Common and Draconic but can\u2019t speak',
    cr:'1/4', xp:50,
    traits:[
      {name:'Keen Senses', desc:'The pseudodragon has advantage on Wisdom (Perception) checks that rely on sight, hearing, or smell.'},
      {name:'Magic Resistance', desc:'The pseudodragon has advantage on saving throws against spells and other magical effects.'},
      {name:'Limited Telepathy', desc:'The pseudodragon can magically communicate simple ideas, emotions, and images telepathically with any creature within 100 feet that can understand a language.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4+2) piercing damage.'},
      {name:'Sting', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4+2) piercing damage, and the target must succeed on a DC 11 Constitution save or become poisoned for 1 hour; if the save fails by 5 or more, the target falls unconscious for the same duration.'},
    ],
  }),
  'Twig Blight': MO({
    size:'Small', type:'plant', alignment:'Neutral Evil',
    ac:13, acNote:'natural armor', hp:4, hitDice:'1d6+1', speed:'20 ft.',
    scores:{str:6,dex:13,con:12,int:4,wis:8,cha:3},
    resist:'None', vulnerable:'fire', senses:'passive Perception 9', languages:'understands Common and Druidic but can\u2019t speak',
    cr:'1/8', xp:25,
    traits:[{name:'False Appearance', desc:'While the blight remains motionless, it is indistinguishable from a dead shrub or sapling.'}],
    actions:[{name:'Claw', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4+1) slashing damage.'}],
  }),
  'Boar': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:11, acNote:'natural armor', hp:11, hitDice:'2d8+2', speed:'40 ft.',
    scores:{str:13,dex:11,con:12,int:2,wis:9,cha:5},
    senses:'passive Perception 9', languages:'None',
    cr:'1/4', xp:50,
    traits:[{name:'Relentless (Recharges after a Short or Long Rest)', desc:'If the boar takes 7 damage or less that would reduce it to 0 hit points, it is instead reduced to 1 hit point.'}],
    actions:[{name:'Tusk', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6+1) slashing damage. If the boar moved at least 20 feet straight toward the target first, the tusk deals double damage.'}],
  }),
  'Specter': MO({
    size:'Medium', type:'undead', alignment:'Chaotic Evil',
    ac:12, hp:22, hitDice:'5d8', speed:'0 ft., fly 50 ft. (hover)',
    scores:{str:1,dex:14,con:11,int:10,wis:10,cha:11},
    resist:'acid, cold, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks', immune:'necrotic, poison; charmed, exhaustion, frightened, grappled, paralyzed, petrified, poisoned, prone, restrained',
    senses:'darkvision 60 ft., passive Perception 10', languages:'understands the languages it knew in life but can\u2019t speak',
    cr:'1', xp:200,
    traits:[{name:'Incorporeal Movement', desc:'The specter can move through other creatures and objects as if they were difficult terrain, taking 5 force damage if it ends its turn inside an object.'}],
    actions:[{name:'Life Drain', desc:'Melee Spell Attack: +4 to hit, reach 5 ft., one creature. Hit: 10 (3d6) necrotic damage. The target\u2019s hit point maximum is reduced by an amount equal to the damage taken, and the specter regains hit points equal to that amount.'}],
  }),

  // ---- Tier 2 additions ----
  'Displacer Beast': MO({
    size:'Large', type:'monstrosity', alignment:'Lawful Evil',
    ac:13, acNote:'natural armor', hp:85, hitDice:'10d10+30', speed:'40 ft.',
    scores:{str:18,dex:15,con:16,int:6,wis:12,cha:8},
    senses:'darkvision 60 ft., passive Perception 11', languages:'None',
    cr:'3', xp:700,
    traits:[
      {name:'Avoidance', desc:'If the displacer beast is subjected to an effect that allows it to make a saving throw to take only half damage, it instead takes no damage on a success.'},
      {name:'Displacement', desc:'The beast projects a magical illusion that makes it appear to be standing near its actual location, giving disadvantage to attacks against it, unless the attacker can somehow see through the illusion.'},
    ],
    actions:[{name:'Multiattack', desc:'The beast makes two tentacle attacks.'},{name:'Tentacle', desc:'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 11 (2d6+4) bludgeoning damage.'}],
  }),
  'Gargoyle': MO({
    size:'Medium', type:'elemental', alignment:'Chaotic Evil',
    ac:15, acNote:'natural armor', hp:52, hitDice:'7d8+21', speed:'30 ft., fly 60 ft.',
    scores:{str:15,dex:11,con:16,int:6,wis:11,cha:7},
    resist:'bludgeoning, piercing, and slashing from nonmagical attacks not made with adamantine weapons', immune:'poison; exhaustion, petrified, poisoned',
    senses:'darkvision 60 ft., passive Perception 10', languages:'Terran',
    cr:'2', xp:450,
    traits:[{name:'False Appearance', desc:'While the gargoyle remains motionless, it is indistinguishable from an inanimate statue.'}],
    actions:[{name:'Multiattack', desc:'The gargoyle makes two attacks: one with its bite and one with its claws.'},{name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d6+1) piercing damage.'},{name:'Claws', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d6+1) slashing damage.'}],
  }),
  'Werewolf': MO({
    size:'Medium', type:'humanoid (human, shapechanger)', alignment:'Chaotic Evil',
    ac:11, hp:58, hitDice:'9d8+18', speed:'30 ft. (40 ft., bite/claws in wolf form)',
    scores:{str:15,dex:13,con:14,int:10,wis:11,cha:10},
    skills:'Perception +4, Stealth +3', resist:'bludgeoning, piercing, and slashing from nonmagical attacks not made of silver',
    senses:'passive Perception 14', languages:'Common (can\u2019t speak in wolf form)',
    cr:'3', xp:700,
    traits:[
      {name:'Shapechanger', desc:'The werewolf can polymorph into a wolf-humanoid hybrid or a wolf, or back into its true form. Its statistics are the same in each form, other than the speed changes noted, and it retains its gear.'},
      {name:'Keen Hearing and Smell', desc:'The werewolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.'},
    ],
    actions:[
      {name:'Multiattack (Humanoid or Hybrid Form Only)', desc:'The werewolf makes two attacks: one with its bite and one with its claws, or two with its spear.'},
      {name:'Bite (Wolf or Hybrid Form Only)', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d8+2) piercing damage. The target must succeed on a DC 12 Constitution save or be cursed with werewolf lycanthropy.'},
      {name:'Claws (Hybrid Form Only)', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4+2) slashing damage.'},
    ],
  }),
  'Green Hag': MO({
    size:'Medium', type:'fey', alignment:'Neutral Evil',
    ac:17, acNote:'natural armor', hp:82, hitDice:'11d8+33', speed:'30 ft., swim 30 ft.',
    scores:{str:18,dex:12,con:16,int:13,wis:14,cha:14},
    skills:'Arcana +3, Deception +4, Perception +4, Stealth +3', senses:'darkvision 60 ft., passive Perception 14', languages:'Common, Draconic, Sylvan',
    cr:'3', xp:700,
    traits:[
      {name:'Amphibious', desc:'The hag can breathe air and water.'},
      {name:'Innate Spellcasting', desc:'The hag\u2019s innate spellcasting ability is Charisma. It can innately cast the following spells, requiring no material components: at will: dancing lights, minor illusion, vicious mockery.'},
      {name:'Mimicry', desc:'The hag can mimic animal sounds and humanoid voices, with a listener detecting the ruse only by succeeding on a Wisdom (Insight) check against the hag\u2019s Deception.'},
    ],
    actions:[{name:'Claws', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8+4) slashing damage.'}],
  }),
  'Water Elemental': MO({
    size:'Large', type:'elemental', alignment:'Neutral',
    ac:14, hp:114, hitDice:'12d10+48', speed:'30 ft., swim 90 ft.',
    scores:{str:18,dex:14,con:18,int:5,wis:10,cha:8},
    resist:'acid; bludgeoning, piercing, and slashing from nonmagical attacks', immune:'poison; exhaustion, grappled (escape from itself), paralyzed, petrified, poisoned, prone, restrained, unconscious',
    senses:'darkvision 60 ft., passive Perception 10', languages:'Aquan',
    cr:'5', xp:1800,
    traits:[
      {name:'Water Form', desc:'The elemental can enter a hostile creature\u2019s space and stop there, and can move through a space as narrow as 1 inch wide without squeezing.'},
      {name:'Freeze', desc:'If the elemental takes cold damage, it partially freezes, its speed reduced by 20 feet until the end of its next turn.'},
    ],
    actions:[{name:'Multiattack', desc:'The elemental makes two slam attacks.'},{name:'Slam', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8+4) bludgeoning damage.'},{name:'Whelm (Recharge 4-6)', desc:'Each creature in the elemental\u2019s space must make a DC 15 Strength save. On a failure, a target is engulfed, restrained, and at risk of suffocating, taking 13 (2d8+4) bludgeoning damage at the start of each of its turns.'}],
  }),
  'Shambling Mound': MO({
    size:'Large', type:'plant', alignment:'Unaligned',
    ac:15, acNote:'natural armor', hp:136, hitDice:'16d10+48', speed:'20 ft., swim 20 ft.',
    scores:{str:18,dex:8,con:16,int:5,wis:10,cha:5},
    resist:'cold, fire', immune:'lightning; blinded, deafened', senses:'blindsight 60 ft. (blind beyond this radius), passive Perception 10', languages:'None',
    cr:'5', xp:1800,
    traits:[{name:'Lightning Absorption', desc:'Whenever the shambling mound is subjected to lightning damage, it regains hit points equal to the lightning damage dealt instead of taking damage.'}],
    actions:[{name:'Multiattack', desc:'The mound makes two slam attacks.'},{name:'Slam', desc:'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 13 (2d8+4) bludgeoning damage, and if the target is Medium or smaller it is grappled (escape DC 14) if the mound isn\u2019t already grappling a creature.'},{name:'Engulf', desc:'The mound engulfs a Medium or smaller creature grappled by it, automatically dealing 13 (2d8+4) bludgeoning damage and restraining and blinding the target until it escapes.'}],
  }),

  // ---- Tier 2 additions (batch 2) ----
  'Mimic': MO({
    size:'Medium', type:'monstrosity (shapechanger)', alignment:'Neutral',
    ac:12, acNote:'natural armor', hp:58, hitDice:'9d8+18', speed:'15 ft.',
    scores:{str:17,dex:12,con:15,int:5,wis:13,cha:8},
    skills:'Stealth +5', immune:'acid; prone', senses:'darkvision 60 ft., passive Perception 11', languages:'None',
    cr:'2', xp:450,
    traits:[
      {name:'Shapechanger', desc:'The mimic can use its action to polymorph into an object or back into its true, amorphous form.'},
      {name:'Adhesive', desc:'While in object form, the mimic adheres to anything that touches it; a creature stuck to it is also grappled (escape DC 13).'},
      {name:'False Appearance', desc:'While the mimic remains motionless, it is indistinguishable from an ordinary object.'},
    ],
    actions:[{name:'Pseudopod', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8+3) bludgeoning damage, and if the mimic is in object form the target is subjected to Adhesive.'},{name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8+3) piercing damage plus 4 (1d8) acid damage.'}],
  }),
  'Ghast': MO({
    size:'Medium', type:'undead', alignment:'Chaotic Evil',
    ac:13, hp:36, hitDice:'8d8', speed:'30 ft.',
    scores:{str:16,dex:17,con:10,int:11,wis:10,cha:8},
    skills:'Perception +2, Stealth +3', immune:'poison; charmed, exhaustion, poisoned', senses:'darkvision 60 ft., passive Perception 12', languages:'Common',
    cr:'2', xp:450,
    traits:[{name:'Stench', desc:'Any creature that starts its turn within 5 feet of the ghast must succeed on a DC 10 Constitution save or be poisoned until the start of its next turn.'},{name:'Turning Defiance', desc:'The ghast and any ghouls within 30 feet of it have advantage on saving throws against effects that turn undead.'}],
    actions:[{name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 12 (2d8+3) piercing damage.'},{name:'Claws', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target that isn\u2019t undead. Hit: 10 (2d6+3) slashing damage, and the target must succeed on a DC 10 Constitution save or be paralyzed for 1 minute.'}],
  }),
  'Hell Hound': MO({
    size:'Medium', type:'fiend', alignment:'Lawful Evil',
    ac:15, acNote:'natural armor', hp:45, hitDice:'7d8+14', speed:'50 ft.',
    scores:{str:17,dex:12,con:14,int:6,wis:13,cha:6},
    skills:'Perception +5', immune:'fire', senses:'darkvision 60 ft., passive Perception 15', languages:'understands Infernal but can\u2019t speak',
    cr:'3', xp:700,
    traits:[{name:'Keen Hearing and Smell', desc:'The hound has advantage on Wisdom (Perception) checks that rely on hearing or smell.'},{name:'Pack Tactics', desc:'The hound has advantage on an attack roll against a creature if at least one of the hound\u2019s allies is within 5 feet of the creature and the ally isn\u2019t incapacitated.'}],
    actions:[{name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8+3) piercing damage plus 7 (2d6) fire damage.'},{name:'Fire Breath (Recharge 5-6)', desc:'The hound exhales fire in a 15-foot cone. Each creature there takes 21 (6d6) fire damage on a failed DC 12 Dexterity save, or half as much on a success.'}],
  }),
  'Yeti': MO({
    size:'Large', type:'monstrosity', alignment:'Chaotic Evil',
    ac:12, acNote:'natural armor', hp:51, hitDice:'6d10+18', speed:'40 ft., climb 30 ft.',
    scores:{str:18,dex:13,con:16,int:8,wis:12,cha:7},
    skills:'Perception +5, Stealth +3', resist:'cold', senses:'darkvision 60 ft., passive Perception 15', languages:'Yeti',
    cr:'3', xp:700,
    traits:[
      {name:'Cold Immunity Camouflage', desc:'The yeti has advantage on Dexterity (Stealth) checks made to hide in snowy terrain.'},
      {name:'Chilling Gaze', desc:'The yeti can target one creature it can see within 30 feet, which must succeed on a DC 13 Constitution save or take 10 (3d6) cold damage and be paralyzed until the end of the yeti\u2019s next turn.'},
    ],
    actions:[{name:'Multiattack', desc:'The yeti makes two claw attacks.'},{name:'Claw', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8+4) slashing damage plus 3 (1d6) cold damage.'}],
  }),
  'Ettin': MO({
    size:'Huge', type:'giant', alignment:'Chaotic Evil',
    ac:12, acNote:'natural armor', hp:85, hitDice:'10d12+20', speed:'40 ft.',
    scores:{str:21,dex:8,con:17,int:6,wis:10,cha:8},
    skills:'Perception +6', senses:'darkvision 60 ft., passive Perception 16', languages:'Giant, Orc',
    cr:'4', xp:1100,
    traits:[{name:'Two Heads', desc:'The ettin has advantage on Wisdom (Perception) checks and on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.'},{name:'Wakeful', desc:'While one of the ettin\u2019s heads sleeps, the other is awake.'}],
    actions:[{name:'Multiattack', desc:'The ettin makes two attacks: one with its battleaxe and one with its morningstar.'},{name:'Battleaxe', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8+5) slashing damage.'},{name:'Morningstar', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8+5) piercing damage.'}],
  }),
  'Ghost': MO({
    size:'Medium', type:'undead', alignment:'Any Alignment',
    ac:11, hp:45, hitDice:'10d8', speed:'0 ft., fly 40 ft. (hover)',
    scores:{str:7,dex:13,con:10,int:10,wis:12,cha:17},
    skills:'Perception +4, Stealth +3', resist:'acid, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks', immune:'cold, necrotic, poison; charmed, exhaustion, frightened, grappled, paralyzed, petrified, poisoned, prone, restrained',
    senses:'darkvision 60 ft., passive Perception 14', languages:'the languages it knew in life',
    cr:'4', xp:1100,
    traits:[
      {name:'Etherealness', desc:'The ghost can move between the Ethereal Plane and the Material Plane, and can see and hear across the boundary between them, though only see 60 feet into the other plane.'},
      {name:'Incorporeal Movement', desc:'The ghost can move through other creatures and objects as if they were difficult terrain, taking 5 force damage if it ends its turn inside an object.'},
    ],
    actions:[{name:'Withering Touch', desc:'Melee Spell Attack: +5 to hit, reach 5 ft., one target. Hit: 17 (4d6+3) necrotic damage.'},{name:'Horrifying Visage', desc:'Each non-undead creature within 60 feet that can see the ghost must succeed on a DC 13 Wisdom save or become frightened for 1 minute, aging 1d4 years on a failure by 5 or more.'},{name:'Possession (Recharge 6)', desc:'The ghost attempts to possess a humanoid it can see within 5 feet, forcing a DC 13 Charisma save; on a failure, the ghost takes control of the target\u2019s body.'}],
  }),
  'Gorgon': MO({
    size:'Large', type:'monstrosity', alignment:'Unaligned',
    ac:19, acNote:'natural armor', hp:114, hitDice:'12d10+48', speed:'40 ft.',
    scores:{str:20,dex:11,con:18,int:2,wis:12,cha:7},
    immune:'petrified', senses:'darkvision 60 ft., passive Perception 11', languages:'None',
    cr:'5', xp:1800,
    traits:[{name:'Trampling Charge', desc:'If the gorgon moves at least 20 feet straight toward a creature and then hits it with a gore attack on the same turn, the target must succeed on a DC 16 Strength save or be knocked prone, and the gorgon can make a hooves attack against it as a bonus action.'}],
    actions:[{name:'Gore', desc:'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 18 (2d12+5) piercing damage.'},{name:'Hooves', desc:'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (2d10+5) bludgeoning damage.'},{name:'Petrifying Breath (Recharge 5-6)', desc:'The gorgon exhales petrifying gas in a 30-foot cone. Each creature there must succeed on a DC 16 Constitution save or begin turning to stone, becoming restrained and then petrified on a second failed save.'}],
  }),
  'Wraith': MO({
    size:'Medium', type:'undead', alignment:'Neutral Evil',
    ac:13, hp:67, hitDice:'9d8+27', speed:'0 ft., fly 60 ft. (hover)',
    scores:{str:6,dex:16,con:16,int:12,wis:14,cha:15},
    resist:'acid, cold, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks', immune:'necrotic, poison; charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained',
    senses:'darkvision 60 ft., passive Perception 12', languages:'the languages it knew in life',
    cr:'5', xp:1800,
    traits:[{name:'Incorporeal Movement', desc:'The wraith can move through other creatures and objects as if they were difficult terrain, taking 5 force damage if it ends its turn inside an object.'},{name:'Sunlight Sensitivity', desc:'While in sunlight, the wraith has disadvantage on attack rolls and Perception checks that rely on sight.'}],
    actions:[{name:'Life Drain', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 21 (4d8+3) necrotic damage. The target\u2019s hit point maximum is reduced by an amount equal to the damage taken, and the wraith regains hit points equal to that amount. A humanoid slain this way rises as a specter under the wraith\u2019s control.'},{name:'Create Specter', desc:'The wraith targets a humanoid corpse within 10 feet that has been dead no longer than 1 minute; the corpse rises as a specter under the wraith\u2019s control.'}],
  }),
  'Umber Hulk': MO({
    size:'Large', type:'monstrosity', alignment:'Unaligned',
    ac:18, acNote:'natural armor', hp:93, hitDice:'11d10+33', speed:'30 ft., burrow 20 ft.',
    scores:{str:20,dex:12,con:17,int:9,wis:13,cha:9},
    senses:'darkvision 120 ft., tremorsense 60 ft., passive Perception 15', languages:'Umber Hulk',
    cr:'5', xp:1800,
    traits:[{name:'Confusing Gaze', desc:'When a creature within 30 feet looks at the umber hulk\u2019s eyes, the umber hulk can force it to make a DC 15 Wisdom save unless it is already confused, or become confused for 1 minute.'},{name:'Tunneler', desc:'The umber hulk can burrow through solid rock at half its burrow speed, leaving a tunnel behind it.'}],
    actions:[{name:'Multiattack', desc:'The umber hulk makes three attacks: one with its mandibles and two with its claws.'},{name:'Mandibles', desc:'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 15 (2d10+4) slashing damage.'},{name:'Claw', desc:'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) slashing damage.'}],
  }),

  // ---- Tier 3 additions ----
  'Cyclops': MO({
    size:'Huge', type:'giant', alignment:'Chaotic Neutral',
    ac:14, acNote:'natural armor', hp:138, hitDice:'12d12+60', speed:'30 ft.',
    scores:{str:22,dex:11,con:20,int:8,wis:6,cha:10},
    saves:'Wis -1 (with disadvantage due to blindness where relevant)', senses:'passive Perception 8', languages:'Giant',
    cr:'6', xp:2300,
    actions:[{name:'Multiattack', desc:'The cyclops makes two greatclub attacks.'},{name:'Greatclub', desc:'Melee Weapon Attack: +9 to hit, reach 15 ft., one target. Hit: 19 (3d8+6) bludgeoning damage.'},{name:'Rock', desc:'Ranged Weapon Attack: +9 to hit, range 60/240 ft., one target. Hit: 22 (4d8+4) bludgeoning damage.'}],
  }),
  'Spirit Naga': MO({
    size:'Large', type:'monstrosity', alignment:'Chaotic Evil',
    ac:17, acNote:'natural armor', hp:75, hitDice:'10d10+20', speed:'40 ft., swim 40 ft.',
    scores:{str:18,dex:17,con:14,int:16,wis:15,cha:16},
    saves:'Con +5, Int +6, Wis +5, Cha +6', resist:'None', immune:'poison; charmed, paralyzed, poisoned',
    senses:'darkvision 60 ft., passive Perception 12', languages:'Abyssal, Celestial, Infernal, Common',
    cr:'8', xp:3900,
    traits:[{name:'Rejuvenation', desc:'If it dies, the naga returns to life in 1d6 days and regains all its hit points unless holy water is poured on its remains.'}],
    actions:[{name:'Bite', desc:'Melee Weapon Attack: +8 to hit, reach 10 ft., one creature. Hit: 7 (1d6+4) piercing damage, and the target must succeed on a DC 13 Constitution save or take 31 (7d8) poison damage, or half as much on a success.'}],
  }),
  'Young Blue Dragon': MO({
    size:'Large', type:'dragon', alignment:'Lawful Evil',
    ac:18, acNote:'natural armor', hp:152, hitDice:'16d10+64', speed:'40 ft., burrow 20 ft., fly 80 ft.',
    scores:{str:25,dex:10,con:23,int:16,wis:15,cha:19},
    saves:'Dex +4, Con +10, Wis +6, Cha +8', skills:'Perception +10, Stealth +4',
    immune:'lightning', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 20', languages:'Common, Draconic',
    cr:'9', xp:5000,
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 16 (2d10+5) piercing damage plus 5 (1d10) lightning damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 12 (2d6+5) slashing damage.'},
      {name:'Lightning Breath (Recharge 5-6)', desc:'The dragon exhales lightning in a 60-foot line that is 5 feet wide. Each creature there takes 55 (10d10) lightning damage on a failed DC 16 Dexterity save, or half as much on a success.'},
    ],
  }),
  'Young White Dragon': MO({
    size:'Large', type:'dragon', alignment:'Chaotic Evil',
    ac:17, acNote:'natural armor', hp:133, hitDice:'14d10+56', speed:'40 ft., burrow 20 ft., fly 80 ft., swim 40 ft.',
    scores:{str:18,dex:10,con:18,int:6,wis:11,cha:12},
    saves:'Dex +3, Con +7, Wis +3, Cha +4', skills:'Perception +6, Stealth +3',
    immune:'cold', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 16', languages:'Common, Draconic',
    cr:'6', xp:2300,
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10+4) piercing damage plus 4 (1d8) cold damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) slashing damage.'},
      {name:'Cold Breath (Recharge 5-6)', desc:'The dragon exhales an icy blast in a 30-foot cone. Each creature there takes 45 (10d8) cold damage on a failed DC 15 Constitution save, or half as much on a success.'},
    ],
  }),
  'Death Slaad': MO({
    size:'Large', type:'aberration', alignment:'Chaotic Evil',
    ac:16, acNote:'natural armor', hp:127, hitDice:'15d10+45', speed:'30 ft.',
    scores:{str:22,dex:13,con:17,int:13,wis:14,cha:14},
    saves:'Str +9, Con +6, Wis +5', resist:'acid, cold, fire, lightning, thunder', senses:'darkvision 60 ft., passive Perception 12', languages:'Deep Speech, telepathy 60 ft.',
    cr:'10', xp:5900,
    traits:[
      {name:'Regeneration', desc:'The slaad regains 10 hit points at the start of its turn, unless it took radiant damage or was reduced to 0 hit points this turn.'},
      {name:'Magic Resistance', desc:'The slaad has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[{name:'Multiattack', desc:'The slaad makes three attacks: one with its bite and two with its claws.'},{name:'Bite', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 14 (2d10+3) piercing damage.'},{name:'Claw', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 11 (2d6+3) slashing damage, and the target is infected with slaad spawn eggs unless it succeeds on a DC 17 Constitution save.'}],
  }),

  // ---- Tier 3 additions (batch 2) ----
  'Mind Flayer': MO({
    size:'Medium', type:'aberration', alignment:'Lawful Evil',
    ac:15, acNote:'natural armor', hp:71, hitDice:'13d8+13', speed:'30 ft.',
    scores:{str:11,dex:12,con:12,int:19,wis:17,cha:17},
    skills:'Arcana +7, Deception +6, Insight +6, Perception +6, Persuasion +6', senses:'darkvision 120 ft., passive Perception 16', languages:'Deep Speech, telepathy 120 ft.',
    cr:'7', xp:2900,
    traits:[
      {name:'Magic Resistance', desc:'The mind flayer has advantage on saving throws against spells and other magical effects.'},
      {name:'Innate Spellcasting', desc:'The mind flayer\u2019s innate spellcasting ability is Intelligence. It can innately cast the following spells, requiring no material components: at will: detect thoughts, levitate; 1/day: dominate monster (humanoids only), plane shift (self only).'},
    ],
    actions:[{name:'Tentacles', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one incapacitated humanoid. Hit: 15 (2d10+4) psychic damage, and if the target is Medium or smaller it is stunned until the grapple ends.'},{name:'Extract Brain', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one incapacitated humanoid the mind flayer is grappling. Hit: 55 (10d10) piercing damage, which is instantly lethal if it destroys the target\u2019s brain.'},{name:'Mind Blast (Recharge 5-6)', desc:'The mind flayer emits psychic energy in a 60-foot cone. Each creature there must succeed on a DC 15 Intelligence save or take 22 (4d8+4) psychic damage and be stunned for 1 minute, or half damage and not stunned on a success.'}],
  }),
  'Oni': MO({
    size:'Large', type:'giant', alignment:'Lawful Evil',
    ac:16, acNote:'natural armor, chain shirt', hp:110, hitDice:'13d10+39', speed:'30 ft., fly 30 ft.',
    scores:{str:19,dex:11,con:16,int:14,wis:12,cha:15},
    skills:'Arcana +5, Deception +5, Perception +4', senses:'darkvision 60 ft., passive Perception 14', languages:'Common, Giant',
    cr:'7', xp:2900,
    traits:[
      {name:'Innate Spellcasting', desc:'The oni\u2019s innate spellcasting ability is Charisma. It can innately cast the following spells, requiring no material components: at will: darkness, invisibility (self only); 1/day each: charm person, cone of cold, gaseous form, sleep.'},
      {name:'Regeneration', desc:'The oni regains 10 hit points at the start of its turn if it has at least 1 hit point.'},
      {name:'Shapechanger', desc:'The oni can polymorph into a Small or Medium humanoid, or into a Large giant, or back into its true form.'},
    ],
    actions:[{name:'Multiattack', desc:'The oni makes two claw attacks, or two glaive attacks if wielding one.'},{name:'Claw', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) slashing damage.'},{name:'Glaive', desc:'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10+4) slashing damage.'}],
  }),
  'Young Black Dragon': MO({
    size:'Large', type:'dragon', alignment:'Chaotic Evil',
    ac:18, acNote:'natural armor', hp:127, hitDice:'15d10+45', speed:'40 ft., fly 80 ft., swim 40 ft.',
    scores:{str:19,dex:14,con:17,int:12,wis:11,cha:15},
    saves:'Dex +5, Con +6, Wis +3, Cha +5', skills:'Perception +6, Stealth +5',
    immune:'acid', senses:'blindsight 30 ft., darkvision 120 ft., passive Perception 16', languages:'Common, Draconic',
    cr:'7', xp:2900,
    actions:[{name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},{name:'Bite', desc:'Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 15 (2d10+4) piercing damage plus 4 (1d8) acid damage.'},{name:'Claw', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) slashing damage.'},{name:'Acid Breath (Recharge 5-6)', desc:'The dragon exhales acid in a 30-foot line. Each creature there takes 49 (11d8) acid damage on a failed DC 14 Dexterity save, or half as much on a success.'}],
  }),
  'Yuan-ti Abomination': MO({
    size:'Large', type:'monstrosity', alignment:'Neutral Evil',
    ac:15, acNote:'natural armor', hp:127, hitDice:'15d10+45', speed:'30 ft., swim 30 ft.',
    scores:{str:19,dex:16,con:17,int:14,wis:15,cha:16},
    skills:'Deception +6, Stealth +6', immune:'poison; poisoned', senses:'darkvision 60 ft., passive Perception 12', languages:'Abyssal, Common, Draconic',
    cr:'7', xp:2900,
    traits:[
      {name:'Innate Spellcasting', desc:'The yuan-ti\u2019s innate spellcasting ability is Wisdom. It can innately cast the following spells, requiring no material components: at will: animal friendship (snakes only), poison spray; 3/day each: suggestion.'},
      {name:'Magic Resistance', desc:'The yuan-ti has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[{name:'Multiattack', desc:'The yuan-ti makes four attacks: one with its bite and three with its claws or constrict.'},{name:'Bite', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 6 (1d6+3) piercing damage plus 7 (2d6) poison damage.'},{name:'Claw', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 6 (1d6+3) slashing damage.'},{name:'Constrict', desc:'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 10 (2d6+3) bludgeoning damage, and the target is grappled and restrained until the grapple ends.'}],
  }),
  'Chain Devil': MO({
    size:'Medium', type:'fiend (devil)', alignment:'Lawful Evil',
    ac:16, acNote:'natural armor', hp:85, hitDice:'10d8+40', speed:'30 ft.',
    scores:{str:18,dex:15,con:18,int:11,wis:12,cha:14},
    resist:'cold; bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons', immune:'fire, poison; poisoned',
    senses:'darkvision 120 ft., passive Perception 11', languages:'Infernal, telepathy 120 ft.',
    cr:'8', xp:3900,
    traits:[{name:'Chain Master', desc:'The devil can use a bonus action to command a chain it has hit a creature with, dealing extra damage or moving the creature.'},{name:'Magic Resistance', desc:'The devil has advantage on saving throws against spells and other magical effects.'}],
    actions:[{name:'Multiattack', desc:'The devil makes two chain attacks.'},{name:'Chain', desc:'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 13 (3d6+3) slashing damage, and the devil can grapple the target instead of dealing damage.'},{name:'Animate Chains (Recharge 4-6)', desc:'Up to four chains the devil can see animate at its command and attack; each makes a melee attack against a target within 15 feet.'}],
  }),
  'Tyrannosaurus Rex': MO({
    size:'Huge', type:'beast', alignment:'Unaligned',
    ac:13, acNote:'natural armor', hp:136, hitDice:'13d12+52', speed:'50 ft.',
    scores:{str:25,dex:10,con:19,int:2,wis:12,cha:9},
    skills:'Perception +5', senses:'passive Perception 15', languages:'None',
    cr:'8', xp:3900,
    actions:[{name:'Multiattack', desc:'The tyrannosaurus makes two attacks: one with its bite and one with its tail. It can\u2019t make both attacks against the same target.'},{name:'Bite', desc:'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 33 (4d12+7) piercing damage. If the target is a Medium or smaller creature, it is grappled (escape DC 17) and restrained until the grapple ends.'},{name:'Tail', desc:'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 20 (3d8+7) bludgeoning damage.'}],
  }),
  'Bone Devil': MO({
    size:'Large', type:'fiend (devil)', alignment:'Lawful Evil',
    ac:19, acNote:'natural armor', hp:142, hitDice:'15d10+60', speed:'40 ft., fly 40 ft.',
    scores:{str:18,dex:16,con:18,int:13,wis:14,cha:16},
    resist:'cold; bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons', immune:'fire, poison; poisoned',
    senses:'darkvision 120 ft., passive Perception 12', languages:'Infernal, telepathy 120 ft.',
    cr:'9', xp:5000,
    traits:[{name:'Magic Resistance', desc:'The devil has advantage on saving throws against spells and other magical effects.'}],
    actions:[{name:'Multiattack', desc:'The devil makes two claw attacks and one sting attack.'},{name:'Claw', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) slashing damage.'},{name:'Sting', desc:'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 8 (1d8+4) piercing damage plus 17 (5d6) poison damage, and the target must succeed on a DC 14 Constitution save or become poisoned for 1 minute.'}],
  }),
  'Glabrezu': MO({
    size:'Large', type:'fiend (demon)', alignment:'Chaotic Evil',
    ac:17, acNote:'natural armor', hp:157, hitDice:'15d10+75', speed:'40 ft.',
    scores:{str:20,dex:15,con:21,int:19,wis:17,cha:16},
    saves:'Str +9, Con +9, Wis +7, Cha +7', resist:'cold, fire, lightning', immune:'poison; poisoned',
    senses:'darkvision 120 ft., passive Perception 13', languages:'Abyssal, telepathy 120 ft.',
    cr:'9', xp:5000,
    traits:[
      {name:'Innate Spellcasting', desc:'The glabrezu\u2019s innate spellcasting ability is Intelligence. It can innately cast the following spells, requiring no material components: at will: darkness, detect magic, dispel magic; 1/day each: confusion, fly, power word stun.'},
      {name:'Magic Resistance', desc:'The glabrezu has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[{name:'Multiattack', desc:'The glabrezu makes four attacks: two with its pincers and two with its fists, or it makes two pincer attacks and casts one spell.'},{name:'Pincer', desc:'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 16 (2d10+5) bludgeoning damage, and the target is grappled (escape DC 15) if the glabrezu doesn\u2019t already have two creatures grappled.'},{name:'Fist', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 7 (2d4+2) bludgeoning damage.'}],
  }),
  'Treant': MO({
    size:'Huge', type:'plant', alignment:'Chaotic Good',
    ac:16, acNote:'natural armor', hp:138, hitDice:'12d12+60', speed:'30 ft.',
    scores:{str:23,dex:8,con:21,int:12,wis:16,cha:12},
    resist:'bludgeoning, piercing', vulnerable:'fire', senses:'passive Perception 13', languages:'Common, Druidic, Elvish, Sylvan',
    cr:'9', xp:5000,
    traits:[{name:'False Appearance', desc:'While the treant remains motionless, it is indistinguishable from a normal tree.'},{name:'Siege Monster', desc:'The treant deals double damage to objects and structures.'}],
    actions:[{name:'Multiattack', desc:'The treant makes two slam attacks.'},{name:'Slam', desc:'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 16 (3d6+6) bludgeoning damage.'},{name:'Rock', desc:'Ranged Weapon Attack: +10 to hit, range 60/180 ft., one target. Hit: 28 (4d10+6) bludgeoning damage.'},{name:'Animate Trees', desc:'The treant magically animates one or two trees it can see within 60 feet, which act as treants under its control until the treant dies or dismisses them.'}],
  }),
  'Young Silver Dragon': MO({
    size:'Large', type:'dragon', alignment:'Lawful Good',
    ac:18, acNote:'natural armor', hp:168, hitDice:'16d10+80', speed:'40 ft., fly 80 ft.',
    scores:{str:23,dex:10,con:21,int:14,wis:11,cha:19},
    saves:'Dex +4, Con +9, Wis +4, Cha +8', skills:'Perception +8, Stealth +4',
    immune:'cold', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 18', languages:'Common, Draconic',
    cr:'9', xp:5000,
    actions:[{name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},{name:'Bite', desc:'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 17 (2d10+6) piercing damage.'},{name:'Claw', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 13 (2d6+6) slashing damage.'},{name:'Cold Breath (Recharge 5-6)', desc:'The dragon exhales an icy blast in a 60-foot cone. Each creature there takes 54 (12d8) cold damage on a failed DC 17 Constitution save, or half as much on a success.'}],
  }),

  // ---- Tier 4 additions ----
  'Behir': MO({
    size:'Huge', type:'monstrosity', alignment:'Neutral Evil',
    ac:17, acNote:'natural armor', hp:168, hitDice:'16d12+64', speed:'50 ft., climb 40 ft.',
    scores:{str:23,dex:16,con:18,int:7,wis:14,cha:12},
    skills:'Perception +6, Stealth +7', senses:'darkvision 90 ft., passive Perception 16', languages:'Draconic',
    cr:'11', xp:7200,
    actions:[
      {name:'Multiattack', desc:'The behir makes two attacks: one with its bite and one to constrict.'},
      {name:'Bite', desc:'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 22 (3d10+6) piercing damage.'},
      {name:'Constrict', desc:'Melee Weapon Attack: +10 to hit, reach 5 ft., one Large or smaller creature. Hit: 17 (2d10+6) bludgeoning damage, and the target is grappled and restrained until the grapple ends.'},
      {name:'Lightning Breath (Recharge 5-6)', desc:'The behir exhales a line of lightning 20 feet by 5 feet. Each creature there takes 66 (12d10) lightning damage on a failed DC 16 Dexterity save, or half as much on a success.'},
    ],
  }),
  'Erinyes': MO({
    size:'Medium', type:'fiend (devil)', alignment:'Lawful Evil',
    ac:18, acNote:'natural armor', hp:153, hitDice:'18d8+72', speed:'30 ft., fly 60 ft.',
    scores:{str:18,dex:16,con:18,int:14,wis:14,cha:18},
    saves:'Dex +7, Wis +6, Cha +8', resist:'cold; bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons', immune:'fire, poison; poisoned',
    senses:'truesight 120 ft., passive Perception 12', languages:'Infernal, telepathy 120 ft.',
    cr:'12', xp:8400,
    traits:[
      {name:'Hellish Weapons', desc:'The erinyes\u2019 weapon attacks are magical and deal an extra 13 (3d8) poison damage on a hit (already included).'},
      {name:'Magic Resistance', desc:'The erinyes has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[{name:'Multiattack', desc:'The erinyes makes three longsword attacks or uses its Longbow twice.'},{name:'Longsword', desc:'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 8 (1d8+4) slashing damage plus 13 (3d8) poison damage.'},{name:'Longbow', desc:'Ranged Weapon Attack: +7 to hit, range 150/600 ft., one target. Hit: 7 (1d8+3) piercing damage plus 13 (3d8) poison damage.'}],
  }),
  'Horned Devil': MO({
    size:'Large', type:'fiend (devil)', alignment:'Lawful Evil',
    ac:18, acNote:'natural armor', hp:178, hitDice:'17d10+85', speed:'20 ft., fly 60 ft.',
    scores:{str:22,dex:17,con:21,int:12,wis:16,cha:17},
    resist:'cold; bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons', immune:'fire, poison; poisoned',
    senses:'darkvision 120 ft., passive Perception 13', languages:'Infernal, telepathy 120 ft.',
    cr:'11', xp:7200,
    traits:[{name:'Magic Resistance', desc:'The devil has advantage on saving throws against spells and other magical effects.'}],
    actions:[
      {name:'Multiattack', desc:'The devil makes three melee attacks: one with its fork and two with its tail, or two with its fork and one with its hurled flame.'},
      {name:'Fork', desc:'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 15 (2d8+6) piercing damage.'},
      {name:'Tail', desc:'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 11 (2d6+4) piercing damage, and the target must succeed on a DC 17 Constitution save or lose 10 (3d6) hit points at the start of each of its turns from an infernal wound, until treated by a DC 12 Wisdom (Medicine) check or magical healing.'},
      {name:'Hurl Flame', desc:'Ranged Spell Attack: +6 to hit, range 150 ft., one target. Hit: 14 (4d6) fire damage.'},
    ],
  }),
  'Adult Blue Dragon': MO({
    size:'Huge', type:'dragon', alignment:'Lawful Evil',
    ac:19, acNote:'natural armor', hp:212, hitDice:'17d12+102', speed:'40 ft., burrow 30 ft., fly 80 ft.',
    scores:{str:27,dex:10,con:25,int:16,wis:15,cha:19},
    saves:'Dex +6, Con +13, Wis +8, Cha +10', skills:'Perception +14, Stealth +6',
    immune:'lightning', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 24', languages:'Common, Draconic',
    cr:'16', xp:15000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 19 (2d10+8) piercing damage plus 5 (1d10) lightning damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 15 (2d6+8) slashing damage.'},
      {name:'Lightning Breath (Recharge 5-6)', desc:'The dragon exhales lightning in a 90-foot line that is 5 feet wide. Each creature there takes 66 (12d10) lightning damage on a failed DC 21 Dexterity save, or half as much on a success.'},
    ],
  }),

  // ---- Tier 4 additions (batch 2) ----
  'Djinni': MO({
    size:'Large', type:'elemental', alignment:'Chaotic Good',
    ac:17, acNote:'natural armor', hp:161, hitDice:'14d10+84', speed:'30 ft., fly 90 ft.',
    scores:{str:21,dex:15,con:22,int:15,wis:16,cha:20},
    skills:'Perception +7', senses:'darkvision 120 ft., passive Perception 17', languages:'Auran',
    cr:'11', xp:7200,
    traits:[
      {name:'Elemental Demise', desc:'If the djinni dies, its body dissolves into a warm breeze, leaving behind only equipment it was wearing or carrying.'},
      {name:'Innate Spellcasting', desc:'The djinni\u2019s innate spellcasting ability is Charisma. It can innately cast the following spells, requiring no material components: at will: detect evil and good, creation (2/day), gaseous form, invisibility (self only); 1/day each: conjure elemental (air only), create food and water, plane shift, wind walk.'},
    ],
    actions:[{name:'Multiattack', desc:'The djinni makes three scimitar attacks.'},{name:'Scimitar', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) slashing damage plus 3 (1d6) lightning or thunder damage (djinni\u2019s choice).'},{name:'Create Whirlwind', desc:'A whirlwind of air forms at a point the djinni can see within 60 feet, moving each turn and dealing bludgeoning damage to creatures caught inside.'}],
  }),
  'Efreeti': MO({
    size:'Large', type:'elemental', alignment:'Lawful Evil',
    ac:17, acNote:'natural armor', hp:200, hitDice:'16d10+112', speed:'40 ft., fly 60 ft.',
    scores:{str:22,dex:12,con:24,int:16,wis:15,cha:16},
    senses:'darkvision 120 ft., passive Perception 12', languages:'Ignan',
    cr:'11', xp:7200,
    traits:[
      {name:'Elemental Demise', desc:'If the efreeti dies, its body disintegrates in a flash of fire, leaving behind only equipment it was wearing or carrying.'},
      {name:'Innate Spellcasting', desc:'The efreeti\u2019s innate spellcasting ability is Charisma. It can innately cast the following spells, requiring no material components: at will: detect magic; 1/day each: conjure elemental (fire only), gaseous form, invisibility, major image, plane shift, wall of fire.'},
    ],
    actions:[{name:'Multiattack', desc:'The efreeti makes two scimitar attacks or uses its Hurl Flame twice.'},{name:'Scimitar', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 13 (2d6+6) slashing damage plus 7 (2d6) fire damage.'},{name:'Hurl Flame', desc:'Ranged Spell Attack: +7 to hit, range 120 ft., one target. Hit: 17 (5d6) fire damage.'}],
  }),
  'Gynosphinx': MO({
    size:'Large', type:'monstrosity', alignment:'Lawful Neutral',
    ac:17, acNote:'natural armor', hp:136, hitDice:'16d10+48', speed:'40 ft., fly 60 ft.',
    scores:{str:18,dex:15,con:16,int:18,wis:18,cha:18},
    saves:'Dex +6, Wis +8, Cha +8', skills:'Arcana +10, Perception +8', immune:'psychic; charmed, frightened',
    senses:'darkvision 120 ft., passive Perception 18', languages:'Common, Sphinx',
    cr:'11', xp:7200,
    traits:[
      {name:'Inscrutable', desc:'The sphinx is immune to any effect that would sense its emotions or read its thoughts, and telepathic messages sent to it are read only if it allows.'},
      {name:'Magic Weapons', desc:'The sphinx\u2019s weapon attacks are magical.'},
      {name:'Spellcasting', desc:'The sphinx is a 12th-level spellcaster whose spellcasting ability is Intelligence (spell save DC 16), able to cast spells like detect magic, mind blank, and legend lore.'},
    ],
    actions:[{name:'Claw', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8+4) slashing damage.'},{name:'Roar (3/Day)', desc:'The sphinx emits a magical roar; creatures within 500 feet may be forced to make Wisdom saves against being frightened or stunned, effects scaling with how many times the sphinx has roared that day.'}],
  }),
  'Marid': MO({
    size:'Large', type:'elemental', alignment:'Chaotic Neutral',
    ac:17, acNote:'natural armor', hp:229, hitDice:'17d10+136', speed:'30 ft., swim 90 ft.',
    scores:{str:22,dex:15,con:24,int:16,wis:18,cha:19},
    senses:'darkvision 120 ft., passive Perception 14', languages:'Aquan',
    cr:'11', xp:7200,
    traits:[
      {name:'Elemental Demise', desc:'If the marid dies, its body dissolves into water and vapor, leaving behind only equipment it was wearing or carrying.'},
      {name:'Innate Spellcasting', desc:'The marid\u2019s innate spellcasting ability is Charisma. It can innately cast the following spells, requiring no material components: at will: create or destroy water, detect magic, fog cloud, water breathing; 1/day each: conjure elemental (water only), control water, plane shift, wall of water, water walk.'},
    ],
    actions:[{name:'Multiattack', desc:'The marid makes three trident attacks, or two trident attacks and one water gust.'},{name:'Trident', desc:'Melee or Ranged Weapon Attack: +10 to hit, reach 10 ft. or range 20/60 ft., one target. Hit: 16 (2d10+5) piercing damage.'},{name:'Water Gust', desc:'Ranged Spell Attack: +8 to hit, range 60 ft., one target. Hit: 25 (5d8+3) bludgeoning damage, and a Large or smaller target may be pushed back and knocked prone.'}],
  }),
  'Remorhaz': MO({
    size:'Huge', type:'monstrosity', alignment:'Unaligned',
    ac:17, acNote:'natural armor', hp:195, hitDice:'17d12+85', speed:'30 ft., burrow 20 ft.',
    scores:{str:24,dex:13,con:21,int:4,wis:10,cha:5},
    resist:'cold', immune:'fire', senses:'darkvision 60 ft., tremorsense 60 ft., passive Perception 10', languages:'None',
    cr:'11', xp:7200,
    traits:[{name:'Heated Body', desc:'A creature that touches the remorhaz or hits it with a melee attack while within 5 feet of it takes 10 (3d6) fire damage.'}],
    actions:[{name:'Bite', desc:'Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 40 (6d10+7) piercing damage plus 10 (3d6) fire damage, and if the target is Large or smaller it is grappled and restrained until the grapple ends.'},{name:'Swallow', desc:'The remorhaz swallows a Medium or smaller creature it is grappling, ending the grapple; the swallowed creature is blinded, restrained, and takes ongoing acid and fire damage.'}],
  }),
  'Roc': MO({
    size:'Gargantuan', type:'monstrosity', alignment:'Unaligned',
    ac:15, hp:248, hitDice:'16d20+80', speed:'20 ft., fly 120 ft.',
    scores:{str:28,dex:10,con:20,int:3,wis:10,cha:9},
    senses:'passive Perception 10', languages:'None',
    cr:'11', xp:7200,
    actions:[{name:'Multiattack', desc:'The roc makes two attacks: one with its beak and one with its talons.'},{name:'Beak', desc:'Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 27 (4d10+9) piercing damage.'},{name:'Talons', desc:'Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 23 (4d6+9) slashing damage, and the target is grappled (escape DC 19) if it is a Large or smaller creature, restrained until the grapple ends.'}],
  }),
  'Archmage': MO({
    size:'Medium', type:'humanoid (any race)', alignment:'Any Alignment',
    ac:12, acNote:'15 with mage armor', hp:99, hitDice:'18d8+18', speed:'30 ft.',
    scores:{str:10,dex:14,con:12,int:20,wis:15,cha:16},
    saves:'Int +9, Wis +6', skills:'Arcana +13, History +9', senses:'passive Perception 12', languages:'any six languages',
    cr:'12', xp:8400,
    traits:[{name:'Magic Resistance', desc:'The archmage has advantage on saving throws against spells and other magical effects.'},{name:'Spellcasting', desc:'The archmage is an 18th-level spellcaster whose spellcasting ability is Intelligence (spell save DC 17, +9 to hit with spell attacks), with access to a wide range of spells up to 9th level, including fireball, cone of cold, and time stop.'}],
    actions:[{name:'Dagger', desc:'Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4+2) piercing damage.'}],
  }),
  'Adult White Dragon': MO({
    size:'Huge', type:'dragon', alignment:'Chaotic Evil',
    ac:18, acNote:'natural armor', hp:200, hitDice:'16d12+96', speed:'40 ft., burrow 30 ft., fly 80 ft., swim 40 ft.',
    scores:{str:22,dex:10,con:22,int:8,wis:12,cha:12},
    saves:'Dex +4, Con +10, Wis +5, Cha +5', skills:'Perception +9, Stealth +4',
    immune:'cold', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 19', languages:'Common, Draconic',
    cr:'13', xp:10000,
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 20 (2d10+9) piercing damage plus 9 (2d8) cold damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 15 (2d6+9) slashing damage.'},
      {name:'Cold Breath (Recharge 5-6)', desc:'The dragon exhales an icy blast in a 60-foot cone. Each creature there takes 54 (12d8) cold damage on a failed DC 18 Constitution save, or half as much on a success.'},
    ],
  }),
  'Nalfeshnee': MO({
    size:'Huge', type:'fiend (demon)', alignment:'Chaotic Evil',
    ac:18, acNote:'natural armor', hp:184, hitDice:'16d12+80', speed:'20 ft., fly 30 ft.',
    scores:{str:21,dex:10,con:22,int:19,wis:12,cha:15},
    saves:'Con +10, Int +8, Wis +5', resist:'cold, fire, lightning', immune:'poison; poisoned',
    senses:'truesight 120 ft., passive Perception 11', languages:'Abyssal, telepathy 120 ft.',
    cr:'13', xp:10000,
    traits:[
      {name:'Innate Spellcasting', desc:'The nalfeshnee\u2019s innate spellcasting ability is Intelligence. It can innately cast the following spells, requiring no material components: at will: dispel magic, fear, fly, magic missile, telekinesis.'},
      {name:'Magic Resistance', desc:'The nalfeshnee has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[{name:'Multiattack', desc:'The nalfeshnee makes two bite attacks.'},{name:'Bite', desc:'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 32 (5d10+5) piercing damage.'},{name:'Horror Nimbus (Recharge 5-6)', desc:'Each non-demon within 15 feet must succeed on a DC 16 Wisdom save or become frightened for 1 minute.'}],
  }),
  'Rakshasa': MO({
    size:'Medium', type:'fiend', alignment:'Lawful Evil',
    ac:16, acNote:'natural armor', hp:110, hitDice:'13d8+52', speed:'40 ft.',
    scores:{str:14,dex:17,con:18,int:13,wis:16,cha:20},
    skills:'Deception +10, Insight +7', resist:'bludgeoning, piercing, and slashing from nonmagical attacks', vulnerable:'piercing from magic weapons wielded by good creatures',
    senses:'darkvision 60 ft., passive Perception 13', languages:'Common, Infernal',
    cr:'13', xp:10000,
    traits:[
      {name:'Limited Magic Immunity', desc:'The rakshasa can\u2019t be affected or detected by spells of 6th level or lower unless it wishes to be, and has advantage on saves against all other spells and magical effects.'},
      {name:'Innate Spellcasting', desc:'The rakshasa\u2019s innate spellcasting ability is Charisma. It can innately cast the following spells, requiring no material components: at will: detect thoughts, disguise self, mage hand, minor illusion; 1/day each: fly, invisibility, major image, plane shift, true seeing.'},
    ],
    actions:[{name:'Multiattack', desc:'The rakshasa makes two claw attacks.'},{name:'Claw', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 15 (2d10+4) slashing damage, and the wound magically festers if the target was reduced below half its hit point maximum.'}],
  }),
  'Ice Devil': MO({
    size:'Large', type:'fiend (devil)', alignment:'Lawful Evil',
    ac:18, acNote:'natural armor', hp:180, hitDice:'19d10+76', speed:'40 ft.',
    scores:{str:21,dex:14,con:18,int:18,wis:15,cha:18},
    resist:'cold; bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons', immune:'fire, poison; poisoned',
    senses:'darkvision 120 ft., passive Perception 12', languages:'Infernal, telepathy 120 ft.',
    cr:'14', xp:11500,
    traits:[{name:'Devil\u2019s Sight', desc:'Magical darkness doesn\u2019t impede the ice devil\u2019s darkvision.'},{name:'Magic Resistance', desc:'The ice devil has advantage on saving throws against spells and other magical effects.'}],
    actions:[{name:'Multiattack', desc:'The ice devil makes three attacks: two with its claws and one with its tail.'},{name:'Claw', desc:'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) piercing damage plus 5 (1d10) cold damage.'},{name:'Tail', desc:'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (2d8+6) piercing damage plus 5 (1d10) cold damage.'},{name:'Wall of Ice (Recharge 6)', desc:'The devil creates a wall of ice on a solid surface it can see within 60 feet, which can block movement and deals cold damage to creatures within 5 feet of it when created.'}],
  }),
  'Adult Bronze Dragon': MO({
    size:'Huge', type:'dragon', alignment:'Lawful Good',
    ac:19, acNote:'natural armor', hp:212, hitDice:'17d12+102', speed:'40 ft., fly 80 ft., swim 40 ft.',
    scores:{str:25,dex:10,con:23,int:16,wis:15,cha:20},
    saves:'Dex +5, Con +11, Wis +7, Cha +10', skills:'Insight +7, Perception +12, Stealth +5',
    immune:'lightning', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 22', languages:'Common, Draconic',
    cr:'15', xp:13000,
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 19 (2d10+8) piercing damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 15 (2d6+8) slashing damage.'},
      {name:'Lightning Breath (Recharge 5-6)', desc:'The dragon exhales lightning in a 90-foot line that is 5 feet wide. Each creature there takes 66 (12d10) lightning damage on a failed DC 19 Dexterity save, or half as much on a success.'},
    ],
  }),
  'Adult Green Dragon': MO({
    size:'Huge', type:'dragon', alignment:'Lawful Evil',
    ac:19, acNote:'natural armor', hp:207, hitDice:'18d12+90', speed:'40 ft., fly 80 ft., swim 40 ft.',
    scores:{str:23,dex:12,con:21,int:18,wis:15,cha:17},
    saves:'Dex +6, Con +10, Wis +7, Cha +8', skills:'Deception +8, Insight +7, Perception +12, Persuasion +8, Stealth +6',
    immune:'poison; poisoned', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 22', languages:'Common, Draconic',
    cr:'15', xp:13000,
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 19 (2d10+8) piercing damage plus 7 (2d6) poison damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 15 (2d6+8) slashing damage.'},
      {name:'Poison Breath (Recharge 5-6)', desc:'The dragon exhales poisonous gas in a 60-foot cone. Each creature there takes 56 (16d6) poison damage on a failed DC 18 Constitution save, or half as much on a success.'},
    ],
  }),
  'Mummy Lord': MO({
    size:'Medium', type:'undead', alignment:'Lawful Evil',
    ac:17, acNote:'natural armor', hp:97, hitDice:'13d8+39', speed:'20 ft.',
    scores:{str:18,dex:10,con:17,int:11,wis:18,cha:16},
    saves:'Con +7, Int +4, Wis +8, Cha +7', resist:'bludgeoning, piercing, and slashing from nonmagical attacks', immune:'necrotic, poison; charmed, exhaustion, frightened, paralyzed, poisoned',
    senses:'darkvision 60 ft., passive Perception 14', languages:'the languages it knew in life',
    cr:'15', xp:13000,
    traits:[
      {name:'Legendary Resistance (3/Day)', desc:'If the mummy lord fails a saving throw, it can choose to succeed instead.'},
      {name:'Magic Resistance', desc:'The mummy lord has advantage on saving throws against spells and other magical effects.'},
      {name:'Rejuvenation', desc:'A destroyed mummy lord gains a new body in 24 hours if its heart is intact, regaining all its hit points and becoming active again.'},
    ],
    actions:[{name:'Multiattack', desc:'The mummy lord makes two attacks: one with its rotting fist and one with its channel negative energy, or two rotting fist attacks.'},{name:'Rotting Fist', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 15 (3d6+5) bludgeoning damage plus 21 (6d6) necrotic damage, and the target must succeed on a DC 16 Constitution save or its hit point maximum is reduced by an amount equal to the necrotic damage taken.'},{name:'Dreadful Glare', desc:'The mummy lord targets one creature it can see within 60 feet, forcing a DC 16 Wisdom save or the target becomes frightened and paralyzed until the spell ends.'}],
  }),
  'Purple Worm': MO({
    size:'Gargantuan', type:'monstrosity', alignment:'Unaligned',
    ac:18, acNote:'natural armor', hp:247, hitDice:'15d20+90', speed:'50 ft., burrow 30 ft.',
    scores:{str:28,dex:7,con:22,int:1,wis:8,cha:4},
    senses:'blindsight 30 ft., tremorsense 60 ft., passive Perception 9', languages:'None',
    cr:'15', xp:13000,
    actions:[{name:'Multiattack', desc:'The worm makes two attacks: one with its bite and one with its sting.'},{name:'Bite', desc:'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 22 (3d8+9) piercing damage. If the target is a Large or smaller creature, it must succeed a DC 19 Dexterity save or be swallowed.'},{name:'Sting', desc:'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (3d6+9) piercing damage, and the target must succeed on a DC 19 Constitution save or take 42 (12d6) poison damage, or half as much on a success.'}],
  }),
  'Adult Silver Dragon': MO({
    size:'Huge', type:'dragon', alignment:'Lawful Good',
    ac:19, acNote:'natural armor', hp:243, hitDice:'18d12+126', speed:'40 ft., fly 80 ft.',
    scores:{str:27,dex:10,con:25,int:16,wis:13,cha:21},
    saves:'Dex +5, Con +12, Wis +6, Cha +10', skills:'Arcana +8, History +8, Perception +11, Stealth +5',
    immune:'cold', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 21', languages:'Common, Draconic',
    cr:'16', xp:15000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10+8) piercing damage plus 9 (2d8) cold damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6+8) slashing damage.'},
      {name:'Cold Breath (Recharge 5-6)', desc:'The dragon exhales an icy blast in a 60-foot cone. Each creature there takes 58 (13d8) cold damage on a failed DC 20 Constitution save, or half as much on a success.'},
    ],
  }),
  'Marilith': MO({
    size:'Large', type:'fiend (demon)', alignment:'Chaotic Evil',
    ac:18, acNote:'natural armor', hp:189, hitDice:'18d10+90', speed:'40 ft.',
    scores:{str:18,dex:20,con:20,int:18,wis:16,cha:20},
    saves:'Str +9, Con +10, Wis +8, Cha +10', resist:'cold, fire, lightning', immune:'poison; poisoned',
    senses:'truesight 120 ft., passive Perception 13', languages:'Abyssal, telepathy 120 ft.',
    cr:'16', xp:15000,
    traits:[
      {name:'Magic Resistance', desc:'The marilith has advantage on saving throws against spells and other magical effects.'},
      {name:'Reactive', desc:'The marilith can take one reaction on every turn in combat.'},
    ],
    actions:[{name:'Multiattack', desc:'The marilith makes six longsword attacks, or it makes seven attacks including a tail attack.'},{name:'Longsword', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8+4) slashing damage plus 3d6 poison, force, or another type depending on variant, generally 7 (2d6) poison damage.'},{name:'Tail', desc:'Melee Weapon Attack: +9 to hit, reach 10 ft., one creature. Hit: 15 (2d10+4) bludgeoning damage, and the target is grappled (escape DC 19).'}],
  }),
  'Planetar': MO({
    size:'Large', type:'celestial', alignment:'Lawful Good',
    ac:19, acNote:'natural armor', hp:200, hitDice:'16d10+112', speed:'40 ft., fly 120 ft.',
    scores:{str:24,dex:20,con:24,int:19,wis:22,cha:25},
    saves:'Con +13, Wis +12, Cha +13', resist:'radiant; bludgeoning, piercing, and slashing from nonmagical attacks', immune:'charmed, exhaustion, frightened',
    senses:'truesight 120 ft., passive Perception 16', languages:'all, telepathy 120 ft.',
    cr:'16', xp:15000,
    traits:[
      {name:'Angelic Weapons', desc:'The planetar\u2019s weapon attacks are magical and deal an extra 5d8 radiant damage on a hit (already included).'},
      {name:'Divine Awareness', desc:'The planetar knows if it hears a lie.'},
      {name:'Innate Spellcasting', desc:'The planetar\u2019s spellcasting ability is Charisma (spell save DC 21). It can innately cast detect evil and good, invisibility (self only), and several other spells, plus raise dead once per day.'},
      {name:'Magic Resistance', desc:'The planetar has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[{name:'Multiattack', desc:'The planetar makes two melee attacks.'},{name:'Greatsword', desc:'Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 21 (4d6+7) slashing damage plus 22 (5d8) radiant damage.'}],
  }),

  // ---- Tier 5 additions ----
  'Adult Gold Dragon': MO({
    size:'Huge', type:'dragon', alignment:'Lawful Good',
    ac:19, acNote:'natural armor', hp:256, hitDice:'19d12+133', speed:'40 ft., swim 40 ft., fly 80 ft.',
    scores:{str:27,dex:14,con:25,int:16,wis:15,cha:24},
    saves:'Dex +8, Con +13, Wis +8, Cha +13', skills:'Insight +8, Perception +14, Persuasion +13, Stealth +8',
    immune:'fire', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 24', languages:'Common, Draconic',
    cr:'17', xp:18000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10+8) piercing damage plus 9 (2d8) fire damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6+8) slashing damage.'},
      {name:'Fire Breath (Recharge 5-6)', desc:'The dragon exhales fire in a 60-foot cone. Each creature there takes 66 (12d10) fire damage on a failed DC 21 Dexterity save, or half as much on a success.'},
    ],
  }),
  'Ancient Black Dragon': MO({
    size:'Gargantuan', type:'dragon', alignment:'Chaotic Evil',
    ac:22, acNote:'natural armor', hp:367, hitDice:'21d20+147', speed:'40 ft., fly 80 ft., swim 40 ft.',
    scores:{str:27,dex:14,con:25,int:16,wis:15,cha:19},
    saves:'Dex +9, Con +14, Wis +9, Cha +11', skills:'Perception +16, Stealth +9',
    immune:'acid', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 26', languages:'Common, Draconic',
    cr:'21', xp:33000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'},{name:'Amphibious', desc:'The dragon can breathe air and water.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 22 (2d10+11) piercing damage plus 11 (2d10) acid damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 18 (2d6+11) slashing damage.'},
      {name:'Acid Breath', desc:'The dragon exhales acid in a 90-foot line. Each creature there takes 67 (15d8) acid damage on a failed DC 22 Dexterity save, or half as much on a success. Usable once per short or long rest.'},
    ],
  }),
  'Solar': MO({
    size:'Large', type:'celestial', alignment:'Lawful Good',
    ac:21, acNote:'natural armor', hp:243, hitDice:'18d10+144', speed:'50 ft., fly 150 ft.',
    scores:{str:26,dex:22,con:26,int:25,wis:25,cha:30},
    saves:'Int +14, Wis +14, Cha +17', resist:'radiant; bludgeoning, piercing, and slashing from nonmagical attacks', immune:'poison; charmed, exhaustion, frightened, poisoned',
    senses:'truesight 120 ft., passive Perception 17', languages:'all, telepathy 120 ft.',
    cr:'21', xp:33000,
    traits:[
      {name:'Angelic Weapons', desc:'The solar\u2019s weapon attacks are magical and deal an extra 6 (1d12) radiant damage on a hit (already included).'},
      {name:'Divine Awareness', desc:'The solar knows if it hears a lie.'},
      {name:'Innate Spellcasting', desc:'The solar\u2019s spellcasting ability is Charisma (spell save DC 25). It can innately cast detect evil and good, invisibility (self only), and see invisibility at will, and greater restoration and raise dead once each per day.'},
      {name:'Magic Resistance', desc:'The solar has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[{name:'Multiattack', desc:'The solar makes two greatsword attacks.'},{name:'Greatsword', desc:'Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 22 (4d6+8) slashing damage plus 9 (2d8) radiant damage.'},{name:'Slaying Longbow', desc:'Ranged Weapon Attack: +13 to hit, range 150/600 ft., one target. Hit: 15 (2d8+6) piercing damage plus 9 (2d8) radiant damage. A non-celestial hit by this attack must succeed on a DC 15 Constitution save or die.'}],
  }),

  // ---- Tier 5 additions (batch 2) ----
  'Androsphinx': MO({
    size:'Large', type:'monstrosity', alignment:'Lawful Neutral',
    ac:17, acNote:'natural armor', hp:199, hitDice:'19d10+95', speed:'40 ft., fly 60 ft.',
    scores:{str:22,dex:10,con:20,int:16,wis:18,cha:23},
    saves:'Dex +6, Con +11, Wis +10, Cha +12', skills:'Arcana +9, Religion +9', immune:'psychic; charmed, frightened',
    senses:'darkvision 120 ft., passive Perception 14', languages:'Common, Sphinx',
    cr:'17', xp:18000,
    traits:[
      {name:'Inscrutable', desc:'The sphinx is immune to any effect that would sense its emotions or read its thoughts, and telepathic messages sent to it are read only if it allows.'},
      {name:'Magic Weapons', desc:'The sphinx\u2019s weapon attacks are magical.'},
    ],
    actions:[{name:'Multiattack', desc:'The sphinx makes two claw attacks.'},{name:'Claw', desc:'Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 17 (2d10+6) slashing damage.'},{name:'Roar (3/Day)', desc:'The sphinx emits a magical roar; creatures within 500 feet may be forced to make Wisdom saves against being frightened or stunned, effects scaling with how many times the sphinx has roared that day.'}],
  }),
  'Dragon Turtle': MO({
    size:'Gargantuan', type:'dragon', alignment:'Neutral',
    ac:20, acNote:'natural armor', hp:341, hitDice:'22d20+110', speed:'20 ft., swim 40 ft.',
    scores:{str:25,dex:10,con:20,int:10,wis:12,cha:12},
    resist:'fire', senses:'darkvision 120 ft., passive Perception 11', languages:'Aquan, Draconic',
    cr:'17', xp:18000,
    traits:[{name:'Amphibious', desc:'The dragon turtle can breathe air and water.'}],
    actions:[{name:'Multiattack', desc:'The dragon turtle makes three attacks: one with its bite and two with its claws.'},{name:'Bite', desc:'Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 26 (3d12+7) piercing damage.'},{name:'Claw', desc:'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 16 (2d8+7) slashing damage.'},{name:'Steam Breath (Recharge 5-6)', desc:'The turtle exhales scalding steam in a 60-foot cone. Each creature there takes 52 (15d6) fire damage on a failed DC 18 Constitution save, or half as much on a success.'}],
  }),
  'Goristro': MO({
    size:'Huge', type:'fiend (demon)', alignment:'Chaotic Evil',
    ac:18, acNote:'natural armor', hp:310, hitDice:'20d12+180', speed:'40 ft.',
    scores:{str:28,dex:6,con:28,int:3,wis:10,cha:8},
    resist:'cold, fire, lightning', immune:'poison; poisoned', senses:'truesight 120 ft., passive Perception 10', languages:'understands Abyssal but can\u2019t speak; telepathy 120 ft.',
    cr:'17', xp:18000,
    traits:[{name:'Magic Resistance', desc:'The goristro has advantage on saving throws against spells and other magical effects.'},{name:'Trampling Charge', desc:'If the goristro moves at least 20 feet straight toward a creature and hits it with a gore attack, the target must succeed on a DC 24 Strength save or be knocked prone, letting the goristro make a stomp attack against it as a bonus action.'}],
    actions:[{name:'Multiattack', desc:'The goristro makes two gore attacks.'},{name:'Gore', desc:'Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 32 (4d12+6) piercing damage.'},{name:'Stomp', desc:'Melee Weapon Attack: +16 to hit, reach 5 ft., one prone creature. Hit: 36 (4d16+6) bludgeoning damage.'}],
  }),
  'Demilich': MO({
    size:'Tiny', type:'undead', alignment:'Neutral Evil',
    ac:20, hp:80, hitDice:'23d4+23', speed:'0 ft., fly 30 ft. (hover)',
    scores:{str:1,dex:20,con:12,int:20,wis:17,cha:15},
    saves:'Dex +11, Con +7, Wis +9', immune:'acid, cold, fire, lightning, necrotic, thunder, poison; blinded, charmed, deafened, exhaustion, frightened, grappled, paralyzed, petrified, poisoned, prone, restrained, stunned',
    senses:'truesight 60 ft., passive Perception 13', languages:'understands the languages it knew in life but can\u2019t speak',
    cr:'18', xp:20000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the demilich fails a saving throw, it can choose to succeed instead.'},{name:'Discorporation', desc:'If reduced to 0 hit points, the demilich\u2019s skull is destroyed but its soul lingers, potentially able to reform after a year unless truly destroyed.'}],
    actions:[{name:'Howling Skull', desc:'The demilich forces one creature within 30 feet to make a DC 19 Wisdom save, taking 55 (10d10) psychic damage and becoming frightened on a failure.'},{name:'Life Drain (Recharge 5-6)', desc:'Each creature in a 30-foot cone must make a DC 19 Constitution save, taking 21 (6d6) necrotic damage on a failure and having its hit point maximum reduced by the same amount, or half as much and no reduction on a success. The demilich regains hit points equal to the total damage dealt.'}],
  }),
  'Ancient Brass Dragon': MO({
    size:'Gargantuan', type:'dragon', alignment:'Chaotic Good',
    ac:20, acNote:'natural armor', hp:297, hitDice:'17d20+119', speed:'40 ft., burrow 40 ft., fly 80 ft.',
    scores:{str:27,dex:10,con:25,int:16,wis:15,cha:19},
    saves:'Dex +6, Con +13, Wis +8, Cha +10', skills:'History +9, Perception +14, Persuasion +10, Stealth +6',
    immune:'fire', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 24', languages:'Common, Draconic',
    cr:'20', xp:25000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 22 (2d10+11) piercing damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 17 (2d6+11) slashing damage.'},
      {name:'Fire Breath (Recharge 5-6)', desc:'The dragon exhales fire in a 90-foot line. Each creature there takes 56 (16d6) fire damage on a failed DC 21 Dexterity save, or half as much on a success.'},
    ],
  }),
  'Ancient Copper Dragon': MO({
    size:'Gargantuan', type:'dragon', alignment:'Chaotic Good',
    ac:21, acNote:'natural armor', hp:350, hitDice:'20d20+140', speed:'40 ft., climb 40 ft., fly 80 ft.',
    scores:{str:27,dex:12,con:25,int:20,wis:17,cha:19},
    saves:'Dex +7, Con +14, Wis +10, Cha +11', skills:'Deception +11, Perception +17, Stealth +7',
    immune:'acid', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 27', languages:'Common, Draconic',
    cr:'21', xp:33000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 23 (2d10+12) piercing damage plus 4 (1d8) acid damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 18 (2d6+12) slashing damage.'},
      {name:'Acid Breath', desc:'The dragon exhales acid in a 60-foot line. Each creature there takes 54 (12d8) acid damage on a failed DC 22 Dexterity save, or half as much on a success. Usable once per short or long rest.'},
    ],
  }),
  'Ancient Bronze Dragon': MO({
    size:'Gargantuan', type:'dragon', alignment:'Lawful Good',
    ac:22, acNote:'natural armor', hp:444, hitDice:'24d20+192', speed:'40 ft., fly 80 ft., swim 40 ft.',
    scores:{str:29,dex:10,con:27,int:18,wis:17,cha:22},
    saves:'Dex +7, Con +15, Wis +10, Cha +13', skills:'Insight +10, Perception +17, Stealth +7',
    immune:'lightning', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 27', languages:'Common, Draconic',
    cr:'22', xp:41000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 24 (2d10+13) piercing damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 19 (2d6+13) slashing damage.'},
      {name:'Lightning Breath (Recharge 5-6)', desc:'The dragon exhales lightning in a 120-foot line that is 10 feet wide. Each creature there takes 88 (16d10) lightning damage on a failed DC 23 Dexterity save, or half as much on a success.'},
    ],
  }),
  'Ancient Green Dragon': MO({
    size:'Gargantuan', type:'dragon', alignment:'Lawful Evil',
    ac:21, acNote:'natural armor', hp:385, hitDice:'22d20+154', speed:'40 ft., fly 80 ft., swim 40 ft.',
    scores:{str:27,dex:12,con:25,int:20,wis:17,cha:19},
    saves:'Dex +7, Con +14, Wis +10, Cha +11', skills:'Deception +11, Insight +10, Perception +17, Persuasion +11, Stealth +7',
    immune:'poison; poisoned', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 27', languages:'Common, Draconic',
    cr:'22', xp:41000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 23 (2d10+12) piercing damage plus 10 (3d6) poison damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 18 (2d6+12) slashing damage.'},
      {name:'Poison Breath (Recharge 5-6)', desc:'The dragon exhales poisonous gas in a 90-foot cone. Each creature there takes 77 (22d6) poison damage on a failed DC 22 Constitution save, or half as much on a success.'},
    ],
  }),
  'Ancient Blue Dragon': MO({
    size:'Gargantuan', type:'dragon', alignment:'Lawful Evil',
    ac:22, acNote:'natural armor', hp:481, hitDice:'26d20+208', speed:'40 ft., burrow 40 ft., fly 80 ft.',
    scores:{str:29,dex:10,con:27,int:18,wis:17,cha:21},
    saves:'Dex +7, Con +15, Wis +10, Cha +12', skills:'Perception +17, Stealth +7',
    immune:'lightning', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 27', languages:'Common, Draconic',
    cr:'23', xp:50000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 24 (2d10+13) piercing damage plus 9 (2d8) lightning damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 19 (2d6+13) slashing damage.'},
      {name:'Lightning Breath (Recharge 5-6)', desc:'The dragon exhales lightning in a 120-foot line that is 10 feet wide. Each creature there takes 88 (16d10) lightning damage on a failed DC 23 Dexterity save, or half as much on a success.'},
    ],
  }),
  'Ancient Silver Dragon': MO({
    size:'Gargantuan', type:'dragon', alignment:'Lawful Good',
    ac:22, acNote:'natural armor', hp:487, hitDice:'25d20+225', speed:'40 ft., fly 80 ft.',
    scores:{str:30,dex:10,con:29,int:18,wis:15,cha:23},
    saves:'Dex +7, Con +16, Wis +9, Cha +13', skills:'Arcana +11, History +11, Perception +16, Stealth +7',
    immune:'cold', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 26', languages:'Common, Draconic',
    cr:'23', xp:50000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10+10) piercing damage plus 9 (2d8) cold damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6+10) slashing damage.'},
      {name:'Cold Breath (Recharge 5-6)', desc:'The dragon exhales an icy blast in a 90-foot cone. Each creature there takes 67 (15d8) cold damage on a failed DC 22 Constitution save, or half as much on a success.'},
    ],
  }),
  'Empyrean': MO({
    size:'Gargantuan', type:'celestial (titan)', alignment:'Any Alignment',
    ac:22, acNote:'natural armor', hp:391, hitDice:'17d20+204', speed:'50 ft., fly 90 ft.',
    scores:{str:30,dex:21,con:27,int:21,wis:21,cha:25},
    saves:'Dex +12, Con +15, Wis +12, Cha +14', resist:'radiant; bludgeoning, piercing, and slashing from nonmagical attacks',
    senses:'truesight 120 ft., passive Perception 15', languages:'all, telepathy 120 ft.',
    cr:'23', xp:50000,
    traits:[{name:'Divine Awareness', desc:'The empyrean knows if it hears a lie.'},{name:'Innate Spellcasting', desc:'The empyrean\u2019s innate spellcasting ability is Charisma (spell save DC 22), able to cast powerful spells such as commune, control weather, and earthquake.'},{name:'Magic Resistance', desc:'The empyrean has advantage on saving throws against spells and other magical effects.'}],
    actions:[{name:'Multiattack', desc:'The empyrean makes three fist attacks, or two if it also throws a rock.'},{name:'Fist', desc:'Melee Weapon Attack: +18 to hit, reach 15 ft., one target. Hit: 25 (4d6+11) force damage.'},{name:'Hurl Rock', desc:'Ranged Weapon Attack: +18 to hit, range 120/240 ft., one target. Hit: 30 (6d6+11) bludgeoning damage.'}],
  }),
  'Ancient Gold Dragon': MO({
    size:'Gargantuan', type:'dragon', alignment:'Lawful Good',
    ac:22, acNote:'natural armor', hp:546, hitDice:'28d20+252', speed:'40 ft., swim 40 ft., fly 80 ft.',
    scores:{str:30,dex:14,con:29,int:18,wis:17,cha:28},
    saves:'Dex +9, Con +16, Wis +10, Cha +16', skills:'Insight +10, Perception +17, Persuasion +16, Stealth +9',
    immune:'fire', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 27', languages:'Common, Draconic',
    cr:'24', xp:62000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10+10) piercing damage plus 9 (2d8) fire damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6+10) slashing damage.'},
      {name:'Fire Breath (Recharge 5-6)', desc:'The dragon exhales fire in a 90-foot cone. Each creature there takes 71 (13d10) fire damage on a failed DC 24 Dexterity save, or half as much on a success.'},
    ],
  }),
  'Ancient Red Dragon': MO({
    size:'Gargantuan', type:'dragon', alignment:'Chaotic Evil',
    ac:22, acNote:'natural armor', hp:546, hitDice:'28d20+252', speed:'40 ft., climb 40 ft., fly 80 ft.',
    scores:{str:30,dex:10,con:29,int:18,wis:15,cha:23},
    saves:'Dex +7, Con +16, Wis +9, Cha +13', skills:'Perception +16, Stealth +7',
    immune:'fire', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 26', languages:'Common, Draconic',
    cr:'24', xp:62000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dragon fails a saving throw, it can choose to succeed instead.'}],
    actions:[
      {name:'Multiattack', desc:'The dragon makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10+10) piercing damage plus 14 (4d6) fire damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6+10) slashing damage.'},
      {name:'Fire Breath (Recharge 5-6)', desc:'The dragon exhales fire in a 90-foot cone. Each creature there takes 91 (26d6) fire damage on a failed DC 24 Dexterity save, or half as much on a success.'},
    ],
  }),
  'Adult Blue Dracolich': MO({
    size:'Huge', type:'undead', alignment:'Lawful Evil',
    ac:19, acNote:'natural armor', hp:225, hitDice:'18d12+108', speed:'40 ft., burrow 30 ft., fly 80 ft.',
    scores:{str:25,dex:10,con:23,int:16,wis:15,cha:19},
    saves:'Dex +5, Con +11, Wis +7, Cha +9', skills:'Perception +12, Stealth +5',
    immune:'lightning, poison; exhaustion, poisoned', senses:'blindsight 60 ft., darkvision 120 ft., passive Perception 22', languages:'Common, Draconic',
    cr:'17', xp:18000,
    traits:[{name:'Legendary Resistance (3/Day)', desc:'If the dracolich fails a saving throw, it can choose to succeed instead.'},{name:'Turn Resistance', desc:'The dracolich has advantage on saving throws against any effect that turns undead.'}],
    actions:[
      {name:'Multiattack', desc:'The dracolich makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 17 (2d10+6) piercing damage plus 5 (1d10) lightning damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 13 (2d6+6) slashing damage.'},
      {name:'Lightning Breath (Recharge 5-6)', desc:'The dracolich exhales lightning in a 90-foot line that is 5 feet wide. Each creature there takes 66 (12d10) lightning damage on a failed DC 19 Dexterity save, or half as much on a success.'},
    ],
  }),
  'Lion': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:12, hp:26, hitDice:'4d10+4', speed:'50 ft.',
    scores:{str:17,dex:15,con:13,int:3,wis:12,cha:8},
    skills:'Perception +3, Stealth +6', senses:'passive Perception 13', languages:'None',
    cr:'1', xp:200,
    traits:[
      {name:'Keen Smell', desc:'The lion has advantage on Wisdom (Perception) checks that rely on smell.'},
      {name:'Pack Tactics', desc:'The lion has advantage on an attack roll against a creature if at least one of the lion\u2019s allies is within 5 feet of the creature and the ally isn\u2019t incapacitated.'},
      {name:'Pounce', desc:'If the lion moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength save or be knocked prone. If the target is prone, the lion can make one bite attack against it as a bonus action.'},
      {name:'Running Leap', desc:'With a 10-foot running start, the lion can long jump up to 25 feet.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The lion makes two attacks: one with its bite and one with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8+3) piercing damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6+3) slashing damage.'},
    ],
  }),
  'Tiger': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:12, hp:37, hitDice:'5d10+10', speed:'40 ft.',
    scores:{str:17,dex:15,con:14,int:3,wis:12,cha:8},
    skills:'Perception +3, Stealth +6', senses:'darkvision 60 ft., passive Perception 13', languages:'None',
    cr:'1', xp:200,
    traits:[
      {name:'Keen Smell', desc:'The tiger has advantage on Wisdom (Perception) checks that rely on smell.'},
      {name:'Pounce', desc:'If the tiger moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength save or be knocked prone. If the target is prone, the tiger can make one bite attack against it as a bonus action.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The tiger makes two attacks: one with its bite and one with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10+3) piercing damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8+3) slashing damage.'},
    ],
  }),
  'Panther': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:12, hp:13, hitDice:'3d8', speed:'50 ft., climb 40 ft.',
    scores:{str:14,dex:15,con:10,int:3,wis:14,cha:7},
    skills:'Perception +4, Stealth +6', senses:'passive Perception 14', languages:'None',
    cr:'1/4', xp:50,
    traits:[
      {name:'Keen Smell', desc:'The panther has advantage on Wisdom (Perception) checks that rely on smell.'},
      {name:'Pounce', desc:'If the panther moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 12 Strength save or be knocked prone. If the target is prone, the panther can make one bite attack against it as a bonus action.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6+2) piercing damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4+2) slashing damage.'},
    ],
  }),
  'Black Bear': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:11, hp:19, hitDice:'3d8+6', speed:'40 ft., climb 30 ft.',
    scores:{str:15,dex:10,con:14,int:2,wis:12,cha:7},
    skills:'Perception +3', senses:'passive Perception 13', languages:'None',
    cr:'1/2', xp:100,
    traits:[
      {name:'Keen Smell', desc:'The bear has advantage on Wisdom (Perception) checks that rely on smell.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The bear makes two attacks: one with its bite and one with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d6+2) piercing damage.'},
      {name:'Claws', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 7 (2d4+2) slashing damage.'},
    ],
  }),
  'Cave Bear': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:12, hp:42, hitDice:'5d10+15', speed:'40 ft., swim 30 ft.',
    scores:{str:20,dex:10,con:16,int:2,wis:13,cha:7},
    skills:'Perception +3', senses:'darkvision 60 ft., passive Perception 13', languages:'None',
    cr:'2', xp:450,
    traits:[
      {name:'Keen Smell', desc:'The bear has advantage on Wisdom (Perception) checks that rely on smell.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The bear makes two attacks: one with its bite and one with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 10 (1d8+6) piercing damage.'},
      {name:'Claws', desc:'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d6+6) slashing damage.'},
    ],
  }),
  'Polar Bear': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:12, hp:42, hitDice:'5d10+15', speed:'40 ft., swim 30 ft.',
    scores:{str:20,dex:10,con:16,int:2,wis:13,cha:7},
    skills:'Perception +3', senses:'passive Perception 13', languages:'None',
    cr:'2', xp:450,
    traits:[
      {name:'Keen Smell', desc:'The bear has advantage on Wisdom (Perception) checks that rely on smell.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The bear makes two attacks: one with its bite and one with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 10 (1d8+6) piercing damage.'},
      {name:'Claws', desc:'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d6+6) slashing damage.'},
    ],
  }),
  'Dire Wolf': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:14, hp:37, hitDice:'5d10+10', speed:'50 ft.',
    scores:{str:17,dex:15,con:15,int:3,wis:12,cha:7},
    skills:'Perception +3, Stealth +4', senses:'passive Perception 13', languages:'None',
    cr:'1', xp:200,
    traits:[
      {name:'Keen Hearing and Smell', desc:'The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.'},
      {name:'Pack Tactics', desc:'The wolf has advantage on an attack roll against a creature if at least one of the wolf\u2019s allies is within 5 feet of the creature and the ally isn\u2019t incapacitated.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength save or be knocked prone.'},
    ],
  }),
  'Ape': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:12, hp:19, hitDice:'3d8+6', speed:'30 ft., climb 30 ft.',
    scores:{str:16,dex:14,con:14,int:6,wis:12,cha:7},
    skills:'Athletics +5, Perception +3', senses:'passive Perception 13', languages:'None',
    cr:'1/2', xp:100,
    actions:[
      {name:'Multiattack', desc:'The ape makes two fist attacks.'},
      {name:'Fist', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6+3) bludgeoning damage.'},
      {name:'Rock', desc:'Ranged Weapon Attack: +5 to hit, range 25/50 ft., one target. Hit: 6 (1d6+3) bludgeoning damage.'},
    ],
  }),
  'Crocodile': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:12, hp:19, hitDice:'3d10+3', speed:'20 ft., swim 30 ft.',
    scores:{str:15,dex:10,con:13,int:2,wis:10,cha:5},
    skills:'Stealth +2', senses:'passive Perception 10', languages:'None',
    cr:'1/2', xp:100,
    traits:[
      {name:'Hold Breath', desc:'The crocodile can hold its breath for 15 minutes.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10+2) piercing damage, and the target is grappled (escape DC 12). Until this grapple ends, the target is restrained, and the crocodile can\u2019t bite another target.'},
    ],
  }),
  'Elephant': MO({
    size:'Huge', type:'beast', alignment:'Unaligned',
    ac:12, hp:76, hitDice:'8d12+24', speed:'40 ft.',
    scores:{str:22,dex:9,con:17,int:3,wis:11,cha:6},
    senses:'passive Perception 10', languages:'None',
    cr:'4', xp:1100,
    actions:[
      {name:'Gore', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 19 (3d8+6) piercing damage.'},
      {name:'Stomp', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one prone creature. Hit: 22 (3d10+6) bludgeoning damage.'},
    ],
  }),
  'Saber-Toothed Tiger': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:12, hp:52, hitDice:'7d10+14', speed:'40 ft.',
    scores:{str:18,dex:14,con:15,int:3,wis:12,cha:8},
    skills:'Perception +3, Stealth +6', senses:'passive Perception 13', languages:'None',
    cr:'2', xp:450,
    traits:[
      {name:'Keen Smell', desc:'The tiger has advantage on Wisdom (Perception) checks that rely on smell.'},
      {name:'Pounce', desc:'If the tiger moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 14 Strength save or be knocked prone. If the target is prone, the tiger can make one bite attack against it as a bonus action.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (1d10+5) piercing damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8+4) slashing damage.'},
    ],
  }),
  'Killer Whale': MO({
    size:'Huge', type:'beast', alignment:'Unaligned',
    ac:12, hp:90, hitDice:'12d12+12', speed:'0 ft., swim 60 ft.',
    scores:{str:19,dex:10,con:13,int:3,wis:12,cha:7},
    senses:'blindsight 120 ft., passive Perception 11', languages:'None',
    cr:'3', xp:700,
    traits:[
      {name:'Echolocation', desc:'The whale can\u2019t use its blindsight while deafened.'},
      {name:'Hold Breath', desc:'The whale can hold its breath for 30 minutes.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 21 (5d6+4) piercing damage.'},
    ],
  }),
  'Rhinoceros': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:11, hp:45, hitDice:'6d10+12', speed:'40 ft.',
    scores:{str:21,dex:8,con:15,int:2,wis:12,cha:6},
    senses:'passive Perception 11', languages:'None',
    cr:'2', xp:450,
    traits:[
      {name:'Charge', desc:'If the rhinoceros moves at least 20 feet straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) damage. If the target is a creature, it must succeed on a DC 15 Strength save or be knocked prone.'},
    ],
    actions:[
      {name:'Gore', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8+5) bludgeoning damage.'},
    ],
  }),
  'Cat': MO({
    size:'Tiny', type:'beast', alignment:'Unaligned',
    ac:12, hp:2, hitDice:'1d4', speed:'40 ft., climb 30 ft.',
    scores:{str:3,dex:15,con:10,int:3,wis:12,cha:7},
    skills:'Perception +3, Stealth +4', senses:'passive Perception 13', languages:'None',
    cr:'0', xp:10,
    traits:[
      {name:'Keen Smell', desc:'The cat has advantage on Wisdom (Perception) checks that rely on smell.'},
    ],
    actions:[
      {name:'Claws', desc:'Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 slashing damage.'},
    ],
  }),
  'Goat': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:10, hp:4, hitDice:'1d8', speed:'40 ft.',
    scores:{str:12,dex:10,con:11,int:2,wis:10,cha:5},
    senses:'passive Perception 10', languages:'None',
    cr:'0', xp:10,
    actions:[
      {name:'Ram', desc:'Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.'},
    ],
  }),
  'Hawk': MO({
    size:'Tiny', type:'beast', alignment:'Unaligned',
    ac:13, hp:1, hitDice:'1d4-1', speed:'10 ft., fly 60 ft.',
    scores:{str:5,dex:16,con:8,int:2,wis:14,cha:6},
    skills:'Perception +4', senses:'passive Perception 14', languages:'None',
    cr:'0', xp:10,
    traits:[
      {name:'Keen Sight', desc:'The hawk has advantage on Wisdom (Perception) checks that rely on sight.'},
    ],
    actions:[
      {name:'Talons', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 slashing damage.'},
    ],
  }),
  'Owl': MO({
    size:'Tiny', type:'beast', alignment:'Unaligned',
    ac:11, hp:1, hitDice:'1d4-1', speed:'5 ft., fly 60 ft.',
    scores:{str:3,dex:13,con:8,int:2,wis:12,cha:7},
    skills:'Perception +3, Stealth +3', senses:'darkvision 120 ft., passive Perception 13', languages:'None',
    cr:'0', xp:10,
    traits:[
      {name:'Flyby', desc:'The owl doesn\u2019t provoke an opportunity attack when it flies out of an enemy\u2019s reach.'},
      {name:'Keen Hearing and Sight', desc:'The owl has advantage on Wisdom (Perception) checks that rely on hearing or sight.'},
    ],
    actions:[
      {name:'Talons', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 1 slashing damage.'},
    ],
  }),
  'Vulture': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:10, hp:5, hitDice:'1d8+1', speed:'10 ft., fly 50 ft.',
    scores:{str:7,dex:10,con:13,int:2,wis:12,cha:4},
    skills:'Perception +3', senses:'passive Perception 13', languages:'None',
    cr:'0', xp:10,
    traits:[
      {name:'Keen Sight and Smell', desc:'The vulture has advantage on Wisdom (Perception) checks that rely on sight or smell.'},
      {name:'Pack Tactics', desc:'The vulture has advantage on an attack roll against a creature if at least one of the vulture\u2019s allies is within 5 feet of the creature and the ally isn\u2019t incapacitated.'},
    ],
    actions:[
      {name:'Beak', desc:'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage.'},
    ],
  }),
  'Jackal': MO({
    size:'Small', type:'beast', alignment:'Unaligned',
    ac:12, hp:3, hitDice:'1d6', speed:'40 ft.',
    scores:{str:8,dex:15,con:11,int:3,wis:12,cha:6},
    skills:'Perception +3', senses:'passive Perception 13', languages:'None',
    cr:'0', xp:10,
    traits:[
      {name:'Keen Hearing and Smell', desc:'The jackal has advantage on Wisdom (Perception) checks that rely on hearing or smell.'},
      {name:'Pack Tactics', desc:'The jackal has advantage on an attack roll against a creature if at least one of the jackal\u2019s allies is within 5 feet of the creature and the ally isn\u2019t incapacitated.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 1 (1d4-1) piercing damage.'},
    ],
  }),
  'Mastiff': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:12, hp:5, hitDice:'1d8+1', speed:'40 ft.',
    scores:{str:13,dex:14,con:12,int:3,wis:12,cha:7},
    skills:'Perception +3', senses:'passive Perception 13', languages:'None',
    cr:'1/8', xp:25,
    traits:[
      {name:'Keen Hearing and Smell', desc:'The mastiff has advantage on Wisdom (Perception) checks that rely on hearing or smell.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6+1) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength save or be knocked prone.'},
    ],
  }),
  'Constrictor Snake': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:12, hp:13, hitDice:'2d10+2', speed:'30 ft., swim 30 ft.',
    scores:{str:15,dex:14,con:12,int:1,wis:10,cha:3},
    skills:'Perception +2', senses:'passive Perception 12', languages:'None',
    cr:'1/4', xp:50,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6+2) piercing damage.'},
      {name:'Constrict', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d8+2) bludgeoning damage, and the target is grappled (escape DC 14). Until this grapple ends, the creature is restrained, and the snake can\u2019t constrict another target.'},
    ],
  }),
  'Giant Octopus': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:11, hp:52, hitDice:'8d10+8', speed:'10 ft., swim 60 ft.',
    scores:{str:17,dex:13,con:13,int:4,wis:10,cha:4},
    skills:'Perception +2, Stealth +5', senses:'darkvision 60 ft., passive Perception 12', languages:'None',
    cr:'1', xp:200,
    traits:[
      {name:'Hold Breath', desc:'While out of water, the octopus can hold its breath for 1 hour.'},
      {name:'Underwater Camouflage', desc:'The octopus has advantage on Dexterity (Stealth) checks made while underwater.'},
      {name:'Water Breathing', desc:'The octopus can breathe only underwater.'},
    ],
    actions:[
      {name:'Tentacles', desc:'Melee Weapon Attack: +5 to hit, reach 15 ft., one target. Hit: 10 (2d6+3) bludgeoning damage, and the target is grappled (escape DC 16). Until this grapple ends, the target is restrained, and the octopus can\u2019t use its tentacles on another target.'},
      {name:'Ink Cloud (Recharges after a Short or Long Rest)', desc:'A 20-foot-radius cloud of ink extends all around the octopus if it is underwater. The area is heavily obscured for 1 minute, although a significant current can disperse the ink. After releasing the ink, the octopus can use the Dash action as a bonus action.'},
    ],
  }),
  'Octopus': MO({
    size:'Small', type:'beast', alignment:'Unaligned',
    ac:12, hp:3, hitDice:'1d6', speed:'5 ft., swim 30 ft.',
    scores:{str:4,dex:15,con:11,int:3,wis:10,cha:4},
    skills:'Perception +2, Stealth +4', senses:'darkvision 30 ft., passive Perception 12', languages:'None',
    cr:'0', xp:10,
    traits:[
      {name:'Hold Breath', desc:'While out of water, the octopus can hold its breath for 30 minutes.'},
      {name:'Underwater Camouflage', desc:'The octopus has advantage on Dexterity (Stealth) checks made while underwater.'},
      {name:'Water Breathing', desc:'The octopus can breathe only underwater.'},
    ],
    actions:[
      {name:'Tentacles', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 1 bludgeoning damage.'},
    ],
  }),
  'Giant Eagle': MO({
    size:'Large', type:'beast', alignment:'Neutral Good',
    ac:13, hp:26, hitDice:'4d10+4', speed:'10 ft., fly 80 ft.',
    scores:{str:16,dex:17,con:13,int:8,wis:14,cha:10},
    skills:'Perception +4', senses:'passive Perception 14', languages:'Giant Eagle, understands Common and Auran but can\u2019t speak them',
    cr:'1', xp:200,
    traits:[
      {name:'Keen Sight', desc:'The eagle has advantage on Wisdom (Perception) checks that rely on sight.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The eagle makes two attacks: one with its beak and one with its talons.'},
      {name:'Beak', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6+3) piercing damage.'},
      {name:'Talons', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) slashing damage.'},
    ],
  }),
  'Giant Owl': MO({
    size:'Large', type:'beast', alignment:'Neutral',
    ac:12, hp:19, hitDice:'3d10+3', speed:'5 ft., fly 60 ft.',
    scores:{str:13,dex:15,con:12,int:8,wis:13,cha:10},
    skills:'Perception +5, Stealth +4', senses:'darkvision 120 ft., passive Perception 15', languages:'Giant Owl, understands Common, Elvish, and Sylvan but can\u2019t speak them',
    cr:'1/4', xp:50,
    traits:[
      {name:'Flyby', desc:'The owl doesn\u2019t provoke an opportunity attack when it flies out of an enemy\u2019s reach.'},
      {name:'Keen Hearing and Sight', desc:'The owl has advantage on Wisdom (Perception) checks that rely on hearing or sight.'},
    ],
    actions:[
      {name:'Talons', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 8 (2d6+1) slashing damage.'},
    ],
  }),
  'Giant Vulture': MO({
    size:'Large', type:'beast', alignment:'Neutral Evil',
    ac:10, hp:22, hitDice:'3d10+6', speed:'10 ft., fly 60 ft.',
    scores:{str:15,dex:10,con:15,int:6,wis:12,cha:7},
    skills:'Perception +5', senses:'passive Perception 15', languages:'understands Common and Draconic but can\u2019t speak them',
    cr:'1', xp:200,
    traits:[
      {name:'Keen Sight and Smell', desc:'The vulture has advantage on Wisdom (Perception) checks that rely on sight or smell.'},
      {name:'Pack Tactics', desc:'The vulture has advantage on an attack roll against a creature if at least one of the vulture\u2019s allies is within 5 feet of the creature and the ally isn\u2019t incapacitated.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The vulture makes two attacks: one with its beak and one with its talons.'},
      {name:'Beak', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4+2) piercing damage.'},
      {name:'Talons', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) slashing damage.'},
    ],
  }),
  'Giant Toad': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:11, hp:39, hitDice:'6d10+6', speed:'20 ft., swim 40 ft.',
    scores:{str:15,dex:13,con:13,int:2,wis:10,cha:3},
    senses:'darkvision 30 ft., passive Perception 10', languages:'None',
    cr:'1', xp:200,
    traits:[
      {name:'Amphibious', desc:'The toad can breathe air and water.'},
      {name:'Standing Leap', desc:'The toad\u2019s long jump is up to 20 feet and its high jump is up to 10 feet, with or without a running start.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6+2) piercing damage plus 5 (2d4) poison damage, and the target is grappled (escape DC 13). Until this grapple ends, the target is restrained, and the toad can\u2019t bite another target.'},
      {name:'Swallow', desc:'The toad makes one bite attack against a Medium or smaller target it is grappling. If the attack hits, the target is swallowed, and the grapple ends. A swallowed creature is blinded and restrained, has total cover against attacks and other effects outside the toad, and takes 5 (2d4) acid damage at the start of each of the toad\u2019s turns.'},
    ],
  }),
  'Warhorse': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:11, hp:19, hitDice:'3d10+3', speed:'60 ft.',
    scores:{str:18,dex:12,con:13,int:2,wis:12,cha:7},
    senses:'passive Perception 11', languages:'None',
    cr:'1/2', xp:100,
    actions:[
      {name:'Hooves', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) bludgeoning damage.'},
    ],
  }),
  'Riding Horse': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:10, hp:13, hitDice:'2d10+2', speed:'60 ft.',
    scores:{str:16,dex:10,con:12,int:2,wis:11,cha:7},
    senses:'passive Perception 10', languages:'None',
    cr:'1/4', xp:50,
    actions:[
      {name:'Hooves', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4+3) bludgeoning damage.'},
    ],
  }),
  'Elk': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:10, hp:13, hitDice:'2d10+2', speed:'50 ft.',
    scores:{str:16,dex:10,con:12,int:2,wis:10,cha:6},
    senses:'passive Perception 10', languages:'None',
    cr:'1/4', xp:50,
    traits:[
      {name:'Charge', desc:'If the elk moves at least 20 feet straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) damage. If the target is a creature, it must succeed on a DC 13 Strength save or be knocked prone.'},
    ],
    actions:[
      {name:'Ram', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6+3) bludgeoning damage.'},
      {name:'Hooves', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one prone creature. Hit: 8 (2d4+3) bludgeoning damage.'},
    ],
  }),
  'Giant Elk': MO({
    size:'Huge', type:'beast', alignment:'Unaligned',
    ac:14, hp:42, hitDice:'5d12+10', speed:'60 ft.',
    scores:{str:19,dex:16,con:14,int:7,wis:14,cha:10},
    skills:'Perception +4', senses:'passive Perception 14', languages:'Giant Elk, understands Common, Elvish, and Sylvan but can\u2019t speak them',
    cr:'2', xp:450,
    traits:[
      {name:'Charge', desc:'If the elk moves at least 20 feet straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) damage. If the target is a creature, it must succeed on a DC 14 Strength save or be knocked prone.'},
    ],
    actions:[
      {name:'Ram', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) bludgeoning damage.'},
      {name:'Hooves', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one prone creature. Hit: 22 (4d8+4) bludgeoning damage.'},
    ],
  }),
  'Reef Shark': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:12, hp:22, hitDice:'4d8+4', speed:'0 ft., swim 40 ft.',
    scores:{str:14,dex:13,con:13,int:1,wis:9,cha:4},
    skills:'Perception +2', senses:'blindsight 30 ft., passive Perception 12', languages:'None',
    cr:'1/2', xp:100,
    traits:[
      {name:'Pack Tactics', desc:'The shark has advantage on an attack roll against a creature if at least one of the shark\u2019s allies is within 5 feet of the creature and the ally isn\u2019t incapacitated.'},
      {name:'Water Breathing', desc:'The shark can breathe only underwater.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8+2) piercing damage.'},
    ],
  }),
  'Hunter Shark': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:12, hp:45, hitDice:'6d10+12', speed:'0 ft., swim 40 ft.',
    scores:{str:18,dex:13,con:15,int:1,wis:10,cha:4},
    senses:'blindsight 60 ft., passive Perception 10', languages:'None',
    cr:'2', xp:450,
    traits:[
      {name:'Blood Frenzy', desc:'The shark has advantage on melee attack rolls against any creature that doesn\u2019t have all its hit points.'},
      {name:'Water Breathing', desc:'The shark can breathe only underwater.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 14 (3d6+4) piercing damage.'},
    ],
  }),
  'Giant Shark': MO({
    size:'Huge', type:'beast', alignment:'Unaligned',
    ac:13, hp:126, hitDice:'11d12+55', speed:'0 ft., swim 50 ft.',
    scores:{str:23,dex:11,con:21,int:1,wis:10,cha:5},
    senses:'blindsight 60 ft., passive Perception 10', languages:'None',
    cr:'5', xp:1800,
    traits:[
      {name:'Blood Frenzy', desc:'The shark has advantage on melee attack rolls against any creature that doesn\u2019t have all its hit points.'},
      {name:'Water Breathing', desc:'The shark can breathe only underwater.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 22 (3d10+6) piercing damage.'},
    ],
  }),
  'Poisonous Snake': MO({
    size:'Tiny', type:'beast', alignment:'Unaligned',
    ac:13, hp:2, hitDice:'1d4', speed:'30 ft., swim 30 ft.',
    scores:{str:2,dex:16,con:11,int:1,wis:10,cha:3},
    skills:'Perception +2', senses:'blindsight 10 ft., passive Perception 12', languages:'None',
    cr:'1/8', xp:25,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 piercing damage, and the target must make a DC 10 Constitution save, taking 5 (2d4) poison damage on a failure, or half as much on a success.'},
    ],
  }),
  'Giant Poisonous Snake': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:14, hp:11, hitDice:'2d8+2', speed:'30 ft., swim 30 ft.',
    scores:{str:10,dex:18,con:13,int:2,wis:10,cha:3},
    skills:'Perception +2', senses:'blindsight 10 ft., passive Perception 12', languages:'None',
    cr:'1/4', xp:50,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 6 (1d4+4) piercing damage, and the target must make a DC 11 Constitution save, taking 10 (3d6) poison damage on a failure, or half as much on a success.'},
    ],
  }),
  'Giant Constrictor Snake': MO({
    size:'Huge', type:'beast', alignment:'Unaligned',
    ac:12, hp:60, hitDice:'8d12+8', speed:'30 ft., swim 30 ft.',
    scores:{str:19,dex:14,con:12,int:1,wis:10,cha:3},
    skills:'Perception +2', senses:'blindsight 10 ft., passive Perception 12', languages:'None',
    cr:'2', xp:450,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 11 (2d6+4) piercing damage.'},
      {name:'Constrict', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 13 (2d8+4) bludgeoning damage, and the target is grappled (escape DC 16). Until this grapple ends, the creature is restrained, and the snake can\u2019t constrict another target.'},
    ],
  }),
  'Giant Boar': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:12, hp:42, hitDice:'5d10+15', speed:'40 ft.',
    scores:{str:17,dex:10,con:16,int:2,wis:7,cha:5},
    senses:'passive Perception 8', languages:'None',
    cr:'2', xp:450,
    traits:[
      {name:'Charge', desc:'If the boar moves at least 20 feet straight toward a target and then hits it with a tusk attack on the same turn, the target takes an extra 7 (2d6) damage. If the target is a creature, it must succeed on a DC 13 Strength save or be knocked prone.'},
      {name:'Relentless (Recharges after a Short or Long Rest)', desc:'If the boar takes 10 damage or less that would reduce it to 0 hit points, it is instead reduced to 1 hit point.'},
    ],
    actions:[
      {name:'Gore', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) slashing damage.'},
    ],
  }),
  'Badger': MO({
    size:'Tiny', type:'beast', alignment:'Unaligned',
    ac:10, hp:3, hitDice:'1d4+1', speed:'20 ft., burrow 5 ft.',
    scores:{str:4,dex:11,con:12,int:2,wis:12,cha:5},
    senses:'darkvision 30 ft., passive Perception 11', languages:'None',
    cr:'0', xp:10,
    traits:[
      {name:'Keen Smell', desc:'The badger has advantage on Wisdom (Perception) checks that rely on smell.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 1 piercing damage.'},
    ],
  }),
  'Giant Badger': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:10, hp:13, hitDice:'2d8+4', speed:'30 ft., burrow 10 ft.',
    scores:{str:13,dex:10,con:15,int:2,wis:12,cha:6},
    senses:'darkvision 30 ft., passive Perception 11', languages:'None',
    cr:'1/4', xp:50,
    traits:[
      {name:'Keen Smell', desc:'The badger has advantage on Wisdom (Perception) checks that rely on smell.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The badger makes two attacks: one with its bite and one with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6+1) piercing damage.'},
      {name:'Claws', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4+1) slashing damage.'},
    ],
  }),
  'Weasel': MO({
    size:'Tiny', type:'beast', alignment:'Unaligned',
    ac:13, hp:1, hitDice:'1d4-1', speed:'30 ft.',
    scores:{str:3,dex:16,con:8,int:2,wis:12,cha:3},
    skills:'Perception +3, Stealth +5', senses:'passive Perception 13', languages:'None',
    cr:'0', xp:10,
    traits:[
      {name:'Keen Hearing and Smell', desc:'The weasel has advantage on Wisdom (Perception) checks that rely on hearing or smell.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 piercing damage.'},
    ],
  }),
  'Giant Weasel': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:13, hp:9, hitDice:'2d8', speed:'40 ft.',
    scores:{str:11,dex:16,con:10,int:4,wis:12,cha:5},
    skills:'Perception +3, Stealth +5', senses:'passive Perception 13', languages:'None',
    cr:'1/8', xp:25,
    traits:[
      {name:'Keen Hearing and Smell', desc:'The weasel has advantage on Wisdom (Perception) checks that rely on hearing or smell.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d4+2) piercing damage.'},
    ],
  }),
  'Bat': MO({
    size:'Tiny', type:'beast', alignment:'Unaligned',
    ac:12, hp:1, hitDice:'1d4-1', speed:'5 ft., fly 30 ft.',
    scores:{str:2,dex:15,con:8,int:2,wis:12,cha:4},
    senses:'blindsight 60 ft., passive Perception 11', languages:'None',
    cr:'0', xp:10,
    traits:[
      {name:'Echolocation', desc:'The bat can\u2019t use its blindsight while deafened.'},
      {name:'Keen Hearing', desc:'The bat has advantage on Wisdom (Perception) checks that rely on hearing.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage.'},
    ],
  }),
  'Giant Bat': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:13, hp:22, hitDice:'4d10', speed:'10 ft., fly 60 ft.',
    scores:{str:15,dex:16,con:11,int:2,wis:12,cha:6},
    senses:'blindsight 60 ft., passive Perception 11', languages:'None',
    cr:'1/4', xp:50,
    traits:[
      {name:'Echolocation', desc:'The bat can\u2019t use its blindsight while deafened.'},
      {name:'Keen Hearing', desc:'The bat has advantage on Wisdom (Perception) checks that rely on hearing.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d6+2) piercing damage.'},
    ],
  }),
  'Lizard': MO({
    size:'Tiny', type:'beast', alignment:'Unaligned',
    ac:10, hp:2, hitDice:'1d4', speed:'20 ft., climb 20 ft.',
    scores:{str:2,dex:11,con:10,int:1,wis:8,cha:3},
    senses:'darkvision 30 ft., passive Perception 9', languages:'None',
    cr:'0', xp:10,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage.'},
    ],
  }),
  'Giant Lizard': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:12, hp:19, hitDice:'3d10+3', speed:'30 ft., climb 30 ft.',
    scores:{str:15,dex:12,con:13,int:2,wis:10,cha:5},
    senses:'darkvision 30 ft., passive Perception 10', languages:'None',
    cr:'1/4', xp:50,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8+2) piercing damage.'},
    ],
  }),
  'Frog': MO({
    size:'Tiny', type:'beast', alignment:'Unaligned',
    ac:11, hp:1, hitDice:'1d4-1', speed:'20 ft., swim 20 ft.',
    scores:{str:1,dex:13,con:8,int:1,wis:8,cha:3},
    skills:'Perception +1, Stealth +3', senses:'darkvision 30 ft., passive Perception 11', languages:'None',
    cr:'0', xp:10,
    traits:[
      {name:'Amphibious', desc:'The frog can breathe air and water.'},
      {name:'Standing Leap', desc:'The frog\u2019s long jump is up to 10 feet and its high jump is up to 5 feet, with or without a running start.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage.'},
    ],
  }),
  'Crab': MO({
    size:'Tiny', type:'beast', alignment:'Unaligned',
    ac:11, hp:2, hitDice:'1d4', speed:'20 ft., swim 20 ft.',
    scores:{str:2,dex:11,con:10,int:1,wis:8,cha:2},
    skills:'Stealth +2', senses:'blindsight 30 ft., passive Perception 9', languages:'None',
    cr:'0', xp:10,
    traits:[
      {name:'Amphibious', desc:'The crab can breathe air and water.'},
    ],
    actions:[
      {name:'Claw', desc:'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 1 bludgeoning damage.'},
    ],
  }),
  'Giant Crab': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:15, hp:13, hitDice:'3d8', speed:'30 ft., swim 30 ft.',
    scores:{str:13,dex:15,con:11,int:1,wis:9,cha:3},
    skills:'Stealth +4', senses:'blindsight 30 ft., passive Perception 9', languages:'None',
    cr:'1/8', xp:25,
    traits:[
      {name:'Amphibious', desc:'The crab can breathe air and water.'},
    ],
    actions:[
      {name:'Claw', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6+1) bludgeoning damage, and the target is grappled (escape DC 11). The crab has two claws, each of which can grapple only one target.'},
    ],
  }),
  'Deer': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:13, hp:4, hitDice:'1d8', speed:'50 ft.',
    scores:{str:11,dex:16,con:11,int:2,wis:14,cha:5},
    skills:'Perception +4', senses:'passive Perception 14', languages:'None',
    cr:'0', xp:10,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage.'},
    ],
  }),
  'Draft Horse': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:10, hp:19, hitDice:'3d10+3', speed:'40 ft.',
    scores:{str:18,dex:10,con:12,int:2,wis:11,cha:7},
    senses:'passive Perception 10', languages:'None',
    cr:'1/4', xp:50,
    actions:[
      {name:'Hooves', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4+4) bludgeoning damage.'},
    ],
  }),
  'Pony': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:10, hp:11, hitDice:'2d8+2', speed:'40 ft.',
    scores:{str:15,dex:10,con:13,int:2,wis:11,cha:7},
    senses:'passive Perception 10', languages:'None',
    cr:'1/8', xp:25,
    actions:[
      {name:'Hooves', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 3 (1d4+1) bludgeoning damage.'},
    ],
  }),
  'Camel': MO({
    size:'Large', type:'beast', alignment:'Unaligned',
    ac:9, hp:15, hitDice:'2d10+4', speed:'50 ft.',
    scores:{str:16,dex:8,con:14,int:2,wis:8,cha:5},
    senses:'passive Perception 9', languages:'None',
    cr:'1/8', xp:25,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.'},
    ],
  }),
  'Mule': MO({
    size:'Medium', type:'beast', alignment:'Unaligned',
    ac:10, hp:11, hitDice:'2d8+2', speed:'40 ft.',
    scores:{str:14,dex:10,con:13,int:2,wis:10,cha:5},
    senses:'passive Perception 10', languages:'None',
    cr:'1/8', xp:25,
    traits:[
      {name:'Beast of Burden', desc:'The mule is considered to be a Large animal for the purpose of determining its carrying capacity.'},
      {name:'Sure-Footed', desc:'The mule has advantage on Strength and Dexterity saving throws made against effects that would knock it prone.'},
    ],
    actions:[
      {name:'Hooves', desc:'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.'},
    ],
  }),
  'Spider': MO({
    size:'Tiny', type:'beast', alignment:'Unaligned',
    ac:12, hp:1, hitDice:'1d4-1', speed:'20 ft., climb 20 ft.',
    scores:{str:2,dex:14,con:8,int:1,wis:10,cha:2},
    skills:'Stealth +4', senses:'darkvision 30 ft., passive Perception 10', languages:'None',
    cr:'0', xp:10,
    traits:[
      {name:'Spider Climb', desc:'The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.'},
      {name:'Web Sense', desc:'While in contact with a web, the spider knows the exact location of any other creature in contact with the same web.'},
      {name:'Web Walker', desc:'The spider ignores movement restrictions caused by webbing.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 1 piercing damage, and the target must succeed on a DC 9 Constitution save or take 2 (1d4) poison damage.'},
    ],
  }),
  'Mummy': MO({
    size:'Medium', type:'undead', alignment:'Lawful Evil',
    ac:11, hp:58, hitDice:'9d8+18', speed:'20 ft.',
    scores:{str:16,dex:8,con:15,int:6,wis:10,cha:12},
    skills:'', senses:'darkvision 60 ft., passive Perception 10', languages:'the languages it knew in life',
    cr:'3', xp:700,
    resist:'bludgeoning, piercing, and slashing from nonmagical weapons',
    immune:'necrotic, poison; charmed, exhaustion, frightened, paralyzed, poisoned',
    actions:[
      {name:'Multiattack', desc:'The mummy can use its Dreadful Glare and makes one attack with its rotting fist.'},
      {name:'Rotting Fist', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) bludgeoning damage plus 10 (3d6) necrotic damage. If the target is a creature, it must succeed on a DC 12 Constitution saving throw or be cursed with mummy rot. The cursed target can\u2019t regain hit points, and its hit point maximum decreases by 10 (3d6) for every 24 hours that elapse. If the curse reduces the target\u2019s hit point maximum to 0, the target dies, and its body turns to dust. The curse lasts until removed by the remove curse spell or other magic.'},
      {name:'Dreadful Glare', desc:'The mummy targets one creature it can see within 60 feet of it. If the target can see the mummy, it must succeed on a DC 11 Wisdom saving throw against this magic or become frightened until the end of the mummy\u2019s next turn. If the target fails the saving throw by 5 or more, it is also paralyzed for the same duration. A target that succeeds on the saving throw is immune to the Dreadful Glare of all mummies for the next 24 hours.'},
    ],
  }),
  'Cultist': MO({
    size:'Medium', type:'humanoid', alignment:'Any non-good alignment',
    ac:12, hp:9, hitDice:'2d8', speed:'30 ft.',
    scores:{str:11,dex:12,con:10,int:10,wis:11,cha:10},
    senses:'passive Perception 10', languages:'any one language (usually Common)',
    cr:'1/8', xp:25,
    traits:[
      {name:'Dark Devotion', desc:'The cultist has advantage on saving throws against being charmed or frightened.'},
    ],
    actions:[
      {name:'Scimitar', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 4 (1d6+1) slashing damage.'},
    ],
  }),
  'Acolyte': MO({
    size:'Medium', type:'humanoid', alignment:'Any alignment',
    ac:10, hp:9, hitDice:'2d8', speed:'30 ft.',
    scores:{str:10,dex:10,con:10,int:10,wis:14,cha:11},
    senses:'passive Perception 12', languages:'any one language (usually Common)',
    cr:'1/4', xp:50,
    traits:[
      {name:'Spellcasting', desc:'The acolyte is a 1st-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). It has the following cleric spells prepared: cantrips (at will): light, sacred flame, thaumaturgy; 1st level (3 slots): bless, cure wounds, sanctuary.'},
    ],
    actions:[
      {name:'Club', desc:'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.'},
    ],
  }),
  'Guard': MO({
    size:'Medium', type:'humanoid', alignment:'Any alignment',
    ac:16, hp:11, hitDice:'2d8+2', speed:'30 ft.',
    scores:{str:13,dex:12,con:12,int:10,wis:11,cha:10},
    skills:'Perception +2', senses:'passive Perception 12', languages:'any one language (usually Common)',
    cr:'1/8', xp:25,
    actions:[
      {name:'Spear', desc:'Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6+1) piercing damage, or 5 (1d8+1) piercing damage if used with two hands to make a melee attack.'},
    ],
  }),
  'Gelatinous Cube': MO({
    size:'Large', type:'ooze', alignment:'Unaligned',
    ac:6, hp:84, hitDice:'8d10+40', speed:'15 ft.',
    scores:{str:14,dex:3,con:20,int:1,wis:6,cha:1},
    senses:'blindsight 60 ft. (blind beyond this radius), passive Perception 8', languages:'None',
    cr:'2', xp:450,
    immune:'blinded, charmed, deafened, exhausted, frightened, prone',
    traits:[
      {name:'Ooze Cube', desc:'The cube takes up its entire space. Other creatures can enter the space, but a creature that does so is subjected to the cube\u2019s Engulf and has disadvantage on the saving throw. Creatures inside the cube can be seen but have total cover, and the cube can hold only one Large creature or up to four Medium or smaller creatures inside it at a time. As an action, a creature within 5 feet of the cube can pull a creature or object out of it by succeeding on a DC 12 Strength check, taking 10 (3d6) acid damage if the cube is currently taking its turn.'},
      {name:'Transparent', desc:'Even when the cube is in plain sight, it takes a successful DC 15 Wisdom (Perception) check to spot a cube that hasn\u2019t moved or attacked. A creature that tries to enter the cube\u2019s space while unaware of the cube is surprised by the cube.'},
    ],
    actions:[
      {name:'Pseudopod', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 10 (3d6) acid damage.'},
      {name:'Engulf', desc:'The cube moves up to its speed. While doing so, it can enter Large or smaller creatures\u2019 spaces. Whenever the cube enters a creature\u2019s space, the creature must make a DC 12 Dexterity saving throw. On a successful save, the creature can choose to be pushed out of the cube\u2019s way and isn\u2019t engulfed. On a failed save, the cube enters the creature\u2019s space, and the creature takes 10 (3d6) acid damage and is engulfed. The engulfed creature can\u2019t breathe, is restrained, and takes 10 (3d6) acid damage at the start of each of the cube\u2019s turns. When the cube moves, the engulfed creature moves with it. An engulfed creature can try to escape by taking an action to make a DC 12 Strength check, escaping on a success.'},
    ],
  }),
  'Cockatrice': MO({
    size:'Small', type:'monstrosity', alignment:'Unaligned',
    ac:11, hp:27, hitDice:'6d6+6', speed:'20 ft., fly 40 ft.',
    scores:{str:6,dex:12,con:12,int:2,wis:13,cha:5},
    senses:'darkvision 60 ft., passive Perception 11', languages:'None',
    cr:'1/2', xp:100,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 3 (1d4+1) piercing damage, and the target must succeed on a DC 11 Constitution saving throw against being petrified. On a failed save, the creature begins to turn to stone and is restrained. It must repeat the saving throw at the end of its next turn. On a success, the effect ends. On a failure, the creature is petrified for 24 hours, after which it turns to stone permanently unless freed by a greater restoration spell or similar magic.'},
    ],
  }),
  'Vampire Spawn': MO({
    size:'Medium', type:'undead', alignment:'Neutral Evil',
    ac:15, hp:82, hitDice:'11d8+33', speed:'30 ft.',
    scores:{str:16,dex:16,con:16,int:11,wis:10,cha:12},
    skills:'Perception +3, Stealth +6', resist:'necrotic; bludgeoning, piercing, and slashing from nonmagical attacks',
    senses:'darkvision 60 ft., passive Perception 13', languages:'the languages it knew in life',
    cr:'5', xp:1800,
    traits:[
      {name:'Regeneration', desc:'The vampire regains 10 hit points at the start of its turn if it has at least 1 hit point and isn\u2019t in sunlight or running water. If the vampire takes radiant damage or damage from holy water, this trait doesn\u2019t function at the start of the vampire\u2019s next turn.'},
      {name:'Spider Climb', desc:'The vampire can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.'},
      {name:'Vampire Weaknesses', desc:'The vampire has the following flaws. Forbiddance: the vampire can\u2019t enter a residence without an invitation from an occupant. Harmed by Running Water: the vampire takes 20 acid damage when it ends its turn in running water. Stake to the Heart: the vampire is destroyed if a piercing weapon made of wood is driven into its heart while it is incapacitated in its resting place. Sunlight Hypersensitivity: the vampire takes 20 radiant damage when it starts its turn in sunlight and has disadvantage on attack rolls and ability checks while in sunlight.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The vampire makes two attacks, only one of which can be a bite attack.'},
      {name:'Bite', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained. Hit: 6 (1d6+3) piercing damage plus 7 (2d6) necrotic damage. The target\u2019s hit point maximum is reduced by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. The reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.'},
      {name:'Claws', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 8 (2d4+3) slashing damage. Instead of dealing damage, the vampire can grapple the target (escape DC 13).'},
    ],
  }),
  'Dryad': MO({
    size:'Medium', type:'fey', alignment:'Neutral',
    ac:11, hp:22, hitDice:'5d8', speed:'30 ft.',
    scores:{str:10,dex:12,con:11,int:14,wis:15,cha:18},
    skills:'Perception +4, Stealth +5', senses:'darkvision 60 ft., passive Perception 14', languages:'Elvish, Sylvan',
    cr:'1', xp:200,
    traits:[
      {name:'Innate Spellcasting', desc:'The dryad\u2019s innate spellcasting ability is Charisma (spell save DC 14). The dryad can innately cast the following spells, requiring no material components: at will: druidcraft; 3/day each: entangle, goodberry; 1/day each: barkskin, pass without trace, shillelagh.'},
      {name:'Magic Resistance', desc:'The dryad has advantage on saving throws against spells and other magical effects.'},
      {name:'Speak with Beasts and Plants', desc:'The dryad can communicate with beasts and plants as if they shared a language.'},
      {name:'Tree Stride', desc:'Once on her turn, the dryad can use 10 feet of her movement to step magically into one living tree within her reach and emerge from a second living tree within 60 feet of the first tree, appearing in an unoccupied space within 5 feet of the second tree. Both trees must be Large or bigger.'},
    ],
    actions:[
      {name:'Club', desc:'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.'},
      {name:'Fey Charm', desc:'The dryad targets one humanoid or beast she can see within 30 feet. If the target can see the dryad, it must succeed on a DC 14 Wisdom saving throw or be magically charmed. The charmed creature regards the dryad as a trusted friend to be heeded and protected. Although the target isn\u2019t under the dryad\u2019s control, it takes her requests or actions in the most favorable way it can, and can repeat the save whenever the dryad or her allies do anything harmful to it. Otherwise, the effect lasts 24 hours or until the dryad dies, is on a different plane, or ends the effect as a bonus action. The dryad can have no more than one humanoid and up to three beasts charmed at a time.'},
    ],
  }),
  'Sprite': MO({
    size:'Tiny', type:'fey', alignment:'Neutral Good',
    ac:15, hp:2, hitDice:'1d4', speed:'10 ft., fly 40 ft.',
    scores:{str:3,dex:18,con:10,int:14,wis:13,cha:11},
    skills:'Perception +3, Stealth +8', senses:'passive Perception 13', languages:'Elvish, Sylvan',
    cr:'1/4', xp:50,
    traits:[
      {name:'Flight', desc:'The sprite can hover.'},
      {name:'Superior Invisibility', desc:'As a bonus action, the sprite can magically turn invisible, along with any equipment it is wearing or carrying. This invisibility lasts until the sprite attacks, casts a spell, or uses its Heart Sight, or until its concentration ends (as if concentrating on a spell).'},
    ],
    actions:[
      {name:'Longsword', desc:'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 1 slashing damage.'},
      {name:'Shortbow', desc:'Ranged Weapon Attack: +6 to hit, range 40/160 ft., one target. Hit: 1 piercing damage, and the target must succeed on a DC 10 Constitution saving throw or become poisoned for 1 minute. If the saving throw fails by 5 or more, the target falls unconscious for the same duration, or until it takes damage or another creature uses an action to shake it awake.'},
      {name:'Heart Sight', desc:'The sprite touches a creature and magically knows the creature\u2019s current emotional state. If the target fails a DC 10 Charisma saving throw, the sprite also knows the creature\u2019s alignment. Celestials, fiends, and undead automatically succeed on the saving throw.'},
    ],
  }),
  'Black Dragon Wyrmling': MO({
    size:'Medium', type:'dragon', alignment:'Chaotic Evil',
    ac:17, hp:33, hitDice:'5d8+10', speed:'30 ft., swim 30 ft.',
    scores:{str:15,dex:14,con:13,int:10,wis:11,cha:13},
    skills:'Stealth +4, Perception +3', immune:'acid',
    senses:'blindsight 10 ft., darkvision 60 ft., passive Perception 13', languages:'Draconic',
    cr:'2', xp:450,
    traits:[
      {name:'Amphibious', desc:'The dragon can breathe air and water.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10+2) piercing damage plus 2 (1d4) acid damage.'},
      {name:'Acid Breath (Recharge 5-6)', desc:'The dragon exhales acid in a 15-foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 22 (5d8) acid damage on a failed save, or half as much damage on a successful one.'},
    ],
  }),
  'White Dragon Wyrmling': MO({
    size:'Medium', type:'dragon', alignment:'Chaotic Evil',
    ac:16, hp:32, hitDice:'5d8+10', speed:'30 ft., burrow 15 ft., fly 60 ft., swim 30 ft.',
    scores:{str:14,dex:10,con:14,int:5,wis:10,cha:11},
    skills:'Perception +2, Stealth +2', immune:'cold',
    senses:'blindsight 10 ft., darkvision 60 ft., passive Perception 12', languages:'Draconic',
    cr:'2', xp:450,
    traits:[
      {name:'Ice Walk', desc:'The dragon can move across and climb icy terrain without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn\u2019t cost it extra movement.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10+2) piercing damage plus 2 (1d4) cold damage.'},
      {name:'Cold Breath (Recharge 5-6)', desc:'The dragon exhales an icy blast of hail in a 15-foot cone. Each creature in that area must make a DC 12 Constitution saving throw, taking 22 (5d8) cold damage on a failed save, or half as much damage on a successful one.'},
    ],
  }),
  'Gold Dragon Wyrmling': MO({
    size:'Medium', type:'dragon', alignment:'Lawful Good',
    ac:17, hp:60, hitDice:'8d8+24', speed:'30 ft., fly 60 ft., swim 60 ft.',
    scores:{str:19,dex:14,con:17,int:12,wis:11,cha:16},
    skills:'Insight +2, Perception +4, Persuasion +4, Stealth +3', immune:'fire',
    senses:'blindsight 10 ft., darkvision 60 ft., passive Perception 14', languages:'Draconic',
    cr:'3', xp:700,
    traits:[
      {name:'Amphibious', desc:'The dragon can breathe air and water.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (1d10+4) piercing damage.'},
      {name:'Breath Weapons (Recharge 5-6)', desc:'The dragon uses one of the following breath weapons. Fire Breath: the dragon exhales fire in a 15-foot cone. Each creature there must make a DC 13 Dexterity saving throw, taking 22 (4d10) fire damage on a failed save, or half as much on a success. Weakening Breath: the dragon exhales gas in a 15-foot cone. Each creature there must succeed on a DC 13 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.'},
    ],
  }),
  'Bronze Dragon Wyrmling': MO({
    size:'Medium', type:'dragon', alignment:'Lawful Good',
    ac:17, hp:32, hitDice:'5d8+10', speed:'30 ft., fly 60 ft., swim 60 ft.',
    scores:{str:17,dex:10,con:15,int:12,wis:11,cha:15},
    skills:'Insight +2, Perception +2, Persuasion +4, Stealth +2', immune:'lightning',
    senses:'blindsight 10 ft., darkvision 60 ft., passive Perception 12', languages:'Draconic',
    cr:'2', xp:450,
    traits:[
      {name:'Amphibious', desc:'The dragon can breathe air and water.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10+3) piercing damage.'},
      {name:'Breath Weapons (Recharge 5-6)', desc:'The dragon uses one of the following breath weapons. Lightning Breath: the dragon exhales lightning in a 40-foot line that is 5 feet wide. Each creature there must make a DC 12 Dexterity saving throw, taking 16 (3d10) lightning damage on a failed save, or half as much on a success. Repulsion Breath: the dragon exhales repulsion energy in a 30-foot cone. Each creature there must succeed on a DC 12 Strength saving throw or be pushed 30 feet away from the dragon.'},
    ],
  }),
  'Brass Dragon Wyrmling': MO({
    size:'Medium', type:'dragon', alignment:'Chaotic Good',
    ac:16, hp:16, hitDice:'3d8+3', speed:'30 ft., burrow 15 ft., fly 60 ft.',
    scores:{str:15,dex:10,con:13,int:10,wis:11,cha:13},
    skills:'Perception +2, Persuasion +3, Stealth +2', immune:'fire',
    senses:'blindsight 10 ft., darkvision 60 ft., passive Perception 12', languages:'Draconic',
    cr:'1', xp:200,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10+2) piercing damage.'},
      {name:'Breath Weapons (Recharge 5-6)', desc:'The dragon uses one of the following breath weapons. Fire Breath: the dragon exhales fire in a 20-foot line that is 5 feet wide. Each creature there must make a DC 11 Dexterity saving throw, taking 14 (4d6) fire damage on a failed save, or half as much on a success. Sleep Breath: the dragon exhales sleep gas in a 15-foot cone. Each creature there must succeed on a DC 11 Constitution saving throw or fall unconscious for 1 minute. This effect ends for a creature if it takes damage or someone uses an action to wake it.'},
    ],
  }),
  'Green Dragon Wyrmling': MO({
    size:'Medium', type:'dragon', alignment:'Lawful Evil',
    ac:17, hp:38, hitDice:'7d8+7', speed:'30 ft., fly 60 ft., swim 30 ft.',
    scores:{str:15,dex:12,con:13,int:14,wis:12,cha:13},
    skills:'Deception +3, Insight +3, Perception +4, Stealth +3', immune:'poison; poisoned',
    senses:'blindsight 10 ft., darkvision 60 ft., passive Perception 14', languages:'Draconic',
    cr:'2', xp:450,
    traits:[
      {name:'Amphibious', desc:'The dragon can breathe air and water.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10+2) piercing damage plus 3 (1d6) poison damage.'},
      {name:'Poison Breath (Recharge 5-6)', desc:'The dragon exhales poisonous gas in a 15-foot cone. Each creature there must make a DC 11 Constitution saving throw, taking 21 (6d6) poison damage on a failed save, or half as much on a success.'},
    ],
  }),
  'Red Dragon Wyrmling': MO({
    size:'Medium', type:'dragon', alignment:'Chaotic Evil',
    ac:17, hp:75, hitDice:'10d8+30', speed:'30 ft., climb 30 ft., fly 60 ft.',
    scores:{str:19,dex:10,con:17,int:12,wis:11,cha:15},
    skills:'Perception +4, Stealth +2', immune:'fire',
    senses:'blindsight 10 ft., darkvision 60 ft., passive Perception 14', languages:'Draconic',
    cr:'4', xp:1100,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (1d10+4) piercing damage plus 3 (1d6) fire damage.'},
      {name:'Fire Breath (Recharge 5-6)', desc:'The dragon exhales fire in a 15-foot cone. Each creature there must make a DC 13 Dexterity saving throw, taking 24 (7d6) fire damage on a failed save, or half as much on a success.'},
    ],
  }),
  'Blue Dragon Wyrmling': MO({
    size:'Medium', type:'dragon', alignment:'Lawful Evil',
    ac:17, hp:52, hitDice:'8d8+16', speed:'30 ft., burrow 15 ft., fly 60 ft.',
    scores:{str:17,dex:10,con:15,int:12,wis:11,cha:15},
    skills:'Perception +4, Stealth +2', immune:'lightning',
    senses:'blindsight 10 ft., darkvision 60 ft., passive Perception 14', languages:'Draconic',
    cr:'3', xp:700,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10+3) piercing damage plus 3 (1d6) lightning damage.'},
      {name:'Lightning Breath (Recharge 5-6)', desc:'The dragon exhales lightning in a 30-foot line that is 5 feet wide. Each creature there must make a DC 12 Dexterity saving throw, taking 22 (4d10) lightning damage on a failed save, or half as much on a success.'},
    ],
  }),
  'Copper Dragon Wyrmling': MO({
    size:'Medium', type:'dragon', alignment:'Chaotic Good',
    ac:16, hp:22, hitDice:'4d8+4', speed:'30 ft., climb 30 ft., fly 60 ft.',
    scores:{str:15,dex:12,con:13,int:14,wis:12,cha:14},
    skills:'Deception +4, Perception +3, Stealth +3', immune:'acid',
    senses:'blindsight 10 ft., darkvision 60 ft., passive Perception 13', languages:'Draconic',
    cr:'1', xp:200,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10+2) piercing damage.'},
      {name:'Breath Weapons (Recharge 5-6)', desc:'The dragon uses one of the following breath weapons. Acid Breath: the dragon exhales acid in a 20-foot line that is 5 feet wide. Each creature there must make a DC 12 Dexterity saving throw, taking 18 (4d8) acid damage on a failed save, or half as much on a success. Slowing Breath: the dragon exhales gas in a 15-foot cone. Each creature there must succeed on a DC 12 Constitution saving throw. On a failure, a creature can\u2019t use reactions, its speed is halved, and it can\u2019t make more than one attack on its turn for 1 minute. It can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.'},
    ],
  }),
  'Silver Dragon Wyrmling': MO({
    size:'Medium', type:'dragon', alignment:'Lawful Good',
    ac:17, hp:45, hitDice:'6d8+18', speed:'30 ft., fly 60 ft.',
    scores:{str:19,dex:10,con:17,int:12,wis:11,cha:15},
    skills:'Perception +4, Stealth +2', immune:'cold',
    senses:'blindsight 10 ft., darkvision 60 ft., passive Perception 14', languages:'Draconic',
    cr:'2', xp:450,
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (1d10+4) piercing damage.'},
      {name:'Cold Breath (Recharge 5-6)', desc:'The dragon exhales an icy blast in a 15-foot cone. Each creature there must make a DC 13 Constitution saving throw, taking 18 (4d8) cold damage on a failed save, or half as much on a success.'},
    ],
  }),
  'Air Elemental': MO({
    size:'Large', type:'elemental', alignment:'Neutral',
    ac:15, hp:90, hitDice:'12d10+24', speed:'0 ft., fly 90 ft. (hover)',
    scores:{str:14,dex:20,con:14,int:6,wis:10,cha:6},
    resist:'lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks',
    immune:'poison; exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious',
    senses:'darkvision 60 ft., passive Perception 10', languages:'Auran',
    cr:'5', xp:1800,
    traits:[
      {name:'Air Form', desc:'The elemental can enter a hostile creature\u2019s space and stop there. It can move through a space as narrow as 1 inch wide without squeezing.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The elemental makes two slam attacks.'},
      {name:'Slam', desc:'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 14 (2d8+5) bludgeoning damage.'},
      {name:'Whirlwind (Recharge 4-6)', desc:'Each creature in the elemental\u2019s space must make a DC 13 Strength saving throw. On a failure, a target takes 15 (3d8+2) bludgeoning damage and is flung up 20 feet away from the elemental in a random direction and knocked prone. If a thrown target strikes an object, the target takes 3 (1d6) bludgeoning damage for every 10 feet it was thrown. If the target is thrown at another creature, that creature must succeed on a DC 13 Dexterity saving throw or take the same damage and be knocked prone. On a successful save, the target takes half the bludgeoning damage and isn\u2019t flung or knocked prone.'},
    ],
  }),
  'Earth Elemental': MO({
    size:'Large', type:'elemental', alignment:'Neutral',
    ac:17, hp:126, hitDice:'12d10+60', speed:'30 ft., burrow 30 ft.',
    scores:{str:20,dex:8,con:20,int:5,wis:10,cha:5},
    resist:'lightning, slashing; bludgeoning and piercing from nonmagical attacks',
    immune:'poison; exhaustion, paralyzed, petrified, poisoned, prone, unconscious',
    senses:'darkvision 60 ft., tremorsense 60 ft., passive Perception 10', languages:'Terran',
    cr:'5', xp:1800,
    traits:[
      {name:'Earth Glide', desc:'The elemental can burrow through nonmagical, unworked earth and stone. While doing so, the elemental doesn\u2019t disturb the material it moves through.'},
      {name:'Siege Monster', desc:'The elemental deals double damage to objects and structures.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The elemental makes two slam attacks.'},
      {name:'Slam', desc:'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 14 (2d8+5) bludgeoning damage.'},
    ],
  }),
  'Fire Elemental': MO({
    size:'Large', type:'elemental', alignment:'Neutral',
    ac:13, hp:102, hitDice:'12d10+36', speed:'50 ft.',
    scores:{str:10,dex:17,con:16,int:6,wis:10,cha:7},
    resist:'bludgeoning, piercing, and slashing from nonmagical attacks',
    immune:'fire, poison; exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious',
    senses:'darkvision 60 ft., passive Perception 10', languages:'Ignan',
    cr:'5', xp:1800,
    traits:[
      {name:'Fire Form', desc:'The elemental can move through a space as narrow as 1 inch wide without squeezing. A creature that touches the elemental or hits it with a melee attack while within 5 feet of it takes 5 (1d10) fire damage. In addition, the elemental can enter a hostile creature\u2019s space and stop there. The first time it enters a creature\u2019s space on a turn, that creature takes 5 (1d10) fire damage and catches fire; until someone takes an action to douse the fire, the creature takes 5 (1d10) fire damage at the start of each of its turns.'},
      {name:'Illumination', desc:'The elemental sheds bright light in a 30-foot radius and dim light in an additional 30 feet.'},
      {name:'Water Susceptibility', desc:'For every 5 feet the elemental moves in water, or for every gallon of water splashed on it, it takes 1 cold damage.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The elemental makes two touch attacks.'},
      {name:'Touch', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) fire damage. If the target is a creature or a flammable object, it ignites. Until a creature takes an action to douse the fire, the target takes 5 (1d10) fire damage at the start of each of its turns.'},
    ],
  }),
  'Imp': MO({
    size:'Tiny', type:'fiend', alignment:'Lawful Evil',
    ac:13, hp:10, hitDice:'3d4+3', speed:'20 ft., fly 40 ft.',
    scores:{str:6,dex:17,con:13,int:11,wis:12,cha:14},
    skills:'Deception +4, Insight +3, Persuasion +2, Stealth +5',
    resist:'cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren\u2019t silvered',
    immune:'fire, poison; poisoned',
    senses:'darkvision 120 ft., passive Perception 11', languages:'Infernal, Common',
    cr:'1', xp:200,
    traits:[
      {name:'Shapechanger', desc:'The imp can use its action to polymorph into a beast form that resembles a rat (speed 20 ft.), a raven (20 ft., fly 60 ft.), or a spider (20 ft., climb 20 ft.), or back into its true form. Its statistics are the same in each form, except for the speed changes noted. Any equipment it\u2019s wearing or carrying isn\u2019t transformed. It reverts to its true form if it dies.'},
      {name:'Devil\u2019s Sight', desc:'Magical darkness doesn\u2019t impede the imp\u2019s darkvision.'},
      {name:'Magic Resistance', desc:'The imp has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[
      {name:'Sting (Bite in Beast Form)', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4+3) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one.'},
      {name:'Invisibility', desc:'The imp magically turns invisible until it attacks or uses its Sting, or until its concentration ends (as if concentrating on a spell). Any equipment the imp wears or carries is invisible with it.'},
    ],
  }),
  'Quasit': MO({
    size:'Tiny', type:'fiend', alignment:'Chaotic Evil',
    ac:13, hp:7, hitDice:'3d4', speed:'40 ft.',
    scores:{str:5,dex:17,con:10,int:7,wis:10,cha:10},
    skills:'Stealth +5',
    resist:'cold, fire, lightning; bludgeoning, piercing, and slashing from nonmagical attacks',
    immune:'poison; poisoned',
    senses:'darkvision 120 ft., passive Perception 10', languages:'Abyssal, Common',
    cr:'1', xp:200,
    traits:[
      {name:'Shapechanger', desc:'The quasit can use its action to polymorph into a beast form that resembles a bat (speed 10 ft., fly 40 ft.), a centipede (40 ft., climb 40 ft.), or a toad (40 ft., swim 40 ft.), or back into its true form. Its statistics are the same in each form, except for the speed changes noted. Any equipment it\u2019s wearing or carrying isn\u2019t transformed. It reverts to its true form if it dies.'},
      {name:'Magic Resistance', desc:'The quasit has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[
      {name:'Claws (Bite in Beast Form)', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d4+2) piercing damage, and the target must succeed on a DC 10 Constitution saving throw or take 5 (2d4) poison damage and become poisoned for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.'},
      {name:'Scare', desc:'One creature of the quasit\u2019s choice within 20 feet of it must succeed on a DC 10 Wisdom saving throw or be frightened for 1 minute. The target can repeat the saving throw at the end of each of its turns, with disadvantage if the quasit is within line of sight, ending the effect on itself on a success.'},
      {name:'Invisibility', desc:'The quasit magically turns invisible until it attacks or uses Scare, or until its concentration ends (as if concentrating on a spell). Any equipment the quasit wears or carries is invisible with it.'},
    ],
  }),
  'Dretch': MO({
    size:'Small', type:'fiend', alignment:'Chaotic Evil',
    ac:11, hp:18, hitDice:'4d6+4', speed:'20 ft.',
    scores:{str:11,dex:11,con:12,int:5,wis:8,cha:3},
    resist:'cold, fire, lightning',
    immune:'poison; poisoned',
    senses:'darkvision 60 ft., passive Perception 9', languages:'Abyssal, telepathy 60 ft.',
    cr:'1/4', xp:50,
    actions:[
      {name:'Multiattack', desc:'The dretch makes two attacks: one with its bite and one with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) piercing damage.'},
      {name:'Claws', desc:'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 5 (2d4) slashing damage.'},
      {name:'Fetid Cloud (1/Day)', desc:'A 10-foot radius of disgusting green gas extends out from the dretch. The gas spreads around corners, and its area is lightly obscured. It lasts for 1 minute or until a strong wind disperses it. Any creature that starts its turn in that area must succeed on a DC 11 Constitution saving throw or be poisoned until the start of its next turn.'},
    ],
  }),
  'Bearded Devil': MO({
    size:'Medium', type:'fiend', alignment:'Lawful Evil',
    ac:13, hp:52, hitDice:'8d8+16', speed:'30 ft.',
    scores:{str:16,dex:15,con:15,int:9,wis:11,cha:11},
    resist:'cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren\u2019t silvered',
    immune:'fire, poison; poisoned',
    senses:'darkvision 120 ft., passive Perception 10', languages:'Infernal, telepathy 120 ft.',
    cr:'3', xp:700,
    traits:[
      {name:'Devil\u2019s Sight', desc:'Magical darkness doesn\u2019t impede the devil\u2019s darkvision.'},
      {name:'Magic Resistance', desc:'The devil has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The devil makes two attacks: one with its beard and one with its glaive.'},
      {name:'Beard', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 5 (1d6+2) piercing damage. The target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.'},
      {name:'Glaive', desc:'Melee Weapon Attack: +5 to hit, reach 10 ft., one target. Hit: 6 (1d10+1) slashing damage. If the target is a creature that isn\u2019t a devil, it must succeed on a DC 12 Constitution saving throw or lose 5 (1d10) hit points at the start of each of its turns due to an infernal wound. Each time the devil hits the wounded target with this attack, the damage dealt by the wound increases by 5 (1d10). Any creature can take an action to stanch the wound with a successful DC 12 Wisdom (Medicine) check. The wound also closes if the target receives magical healing.'},
    ],
  }),
  'Clay Golem': MO({
    size:'Large', type:'construct', alignment:'Unaligned',
    ac:14, hp:133, hitDice:'14d10+56', speed:'20 ft.',
    scores:{str:20,dex:9,con:18,int:3,wis:8,cha:1},
    immune:'poison, psychic; charmed, exhaustion, frightened, paralyzed, petrified, poisoned',
    senses:'darkvision 60 ft., passive Perception 9', languages:'understands the languages of its creator but can\u2019t speak',
    cr:'9', xp:5000,
    traits:[
      {name:'Acid Absorption', desc:'Whenever the golem is subjected to acid damage, it takes no damage and instead regains a number of hit points equal to the acid damage dealt.'},
      {name:'Berserk', desc:'Whenever the golem starts its turn with 60 hit points or fewer, roll a d6. On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object, with preference for an object smaller than itself. Once the golem goes berserk, it remains berserk until it is destroyed or regains all its hit points.'},
      {name:'Immutable Form', desc:'The golem is immune to any spell or effect that would alter its form.'},
      {name:'Magic Resistance', desc:'The golem has advantage on saving throws against spells and other magical effects.'},
      {name:'Magic Weapons', desc:'The golem\u2019s weapon attacks are magical.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The golem makes two slam attacks.'},
      {name:'Slam', desc:'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 9 (2d6+2) bludgeoning damage plus 4 (1d8) acid damage.'},
      {name:'Haste (Recharge 5-6)', desc:'Until the end of its next turn, the golem magically gains a +2 bonus to AC, has advantage on Dexterity saving throws, and can use its slam attack as a bonus action.'},
    ],
  }),
  'Flesh Golem': MO({
    size:'Medium', type:'construct', alignment:'Neutral',
    ac:9, hp:93, hitDice:'11d8+44', speed:'30 ft.',
    scores:{str:19,dex:9,con:18,int:6,wis:10,cha:5},
    immune:'lightning, poison; charmed, exhaustion, frightened, paralyzed, petrified, poisoned',
    senses:'darkvision 60 ft., passive Perception 10', languages:'understands the languages of its creator but can\u2019t speak',
    cr:'5', xp:1800,
    traits:[
      {name:'Berserk', desc:'Whenever the golem starts its turn with 40 hit points or fewer, roll a d6. On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object, with preference for an object smaller than itself. Once the golem goes berserk, it remains berserk until it is destroyed or regains all its hit points. A creature within 60 feet of a berserk golem that damages it with fire spurs it to go berserk if it isn\u2019t already.'},
      {name:'Aversion of Fire', desc:'If the golem takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn.'},
      {name:'Immutable Form', desc:'The golem is immune to any spell or effect that would alter its form.'},
      {name:'Lightning Absorption', desc:'Whenever the golem is subjected to lightning damage, it takes no damage and instead regains a number of hit points equal to the lightning damage dealt.'},
      {name:'Magic Resistance', desc:'The golem has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The golem makes two slam attacks.'},
      {name:'Slam', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8+4) bludgeoning damage.'},
    ],
  }),
  'Hezrou': MO({
    size:'Large', type:'fiend', alignment:'Chaotic Evil',
    ac:16, hp:136, hitDice:'13d10+65', speed:'30 ft.',
    scores:{str:19,dex:17,con:20,int:5,wis:12,cha:13},
    resist:'cold, fire, lightning; bludgeoning, piercing, and slashing from nonmagical attacks',
    immune:'poison; poisoned',
    senses:'darkvision 120 ft., passive Perception 11', languages:'Abyssal, telepathy 120 ft.',
    cr:'8', xp:3900,
    traits:[
      {name:'Magic Resistance', desc:'The hezrou has advantage on saving throws against spells and other magical effects.'},
      {name:'Stench', desc:'Any creature that starts its turn within 10 feet of the hezrou must succeed on a DC 14 Constitution saving throw or be poisoned until the start of its next turn. On a successful saving throw, the creature is immune to the hezrou\u2019s stench for 24 hours.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The hezrou makes three attacks: one with its bite and two with its claws.'},
      {name:'Bite', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 15 (2d10+4) piercing damage.'},
      {name:'Claw', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) slashing damage.'},
    ],
  }),
  'Vrock': MO({
    size:'Large', type:'fiend', alignment:'Chaotic Evil',
    ac:15, hp:104, hitDice:'11d10+44', speed:'40 ft., fly 60 ft.',
    scores:{str:17,dex:15,con:18,int:8,wis:13,cha:8},
    resist:'cold, fire, lightning; bludgeoning, piercing, and slashing from nonmagical attacks',
    immune:'poison; poisoned',
    senses:'darkvision 120 ft., passive Perception 11', languages:'Abyssal, telepathy 120 ft.',
    cr:'6', xp:2300,
    traits:[
      {name:'Magic Resistance', desc:'The vrock has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The vrock makes two attacks: one with its beak and one with its talons.'},
      {name:'Beak', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d8+3) piercing damage.'},
      {name:'Talons', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) slashing damage.'},
      {name:'Spores (Recharge 6)', desc:'A 15-foot-radius cloud of toxic spores extends out from the vrock, filling the area for 1 minute. The spores spread around corners. Each creature that starts its turn in that area must succeed on a DC 14 Constitution saving throw or take 5 (1d10) poison damage and become poisoned. While poisoned in this way, the target takes 5 (1d10) poison damage at the start of each of its turns. A target can repeat the saving throw at the end of each of its turns, ending the effect on a success.'},
      {name:'Stunning Screech (1/Day)', desc:'The vrock emits a horrific screech. Each creature within 20 feet of it that can hear it and that isn\u2019t a demon must succeed on a DC 14 Constitution saving throw or be stunned until the end of the vrock\u2019s next turn.'},
    ],
  }),
  'Pegasus': MO({
    size:'Large', type:'celestial', alignment:'Chaotic Good',
    ac:12, hp:59, hitDice:'7d10+21', speed:'60 ft., fly 90 ft.',
    scores:{str:18,dex:15,con:16,int:10,wis:15,cha:13},
    skills:'Perception +4', senses:'passive Perception 14', languages:'understands Common, Elvish, and Sylvan but can\u2019t speak',
    cr:'2', xp:450,
    actions:[
      {name:'Hooves', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) bludgeoning damage.'},
    ],
  }),
  'Unicorn': MO({
    size:'Large', type:'celestial', alignment:'Lawful Good',
    ac:12, hp:67, hitDice:'9d10+18', speed:'50 ft.',
    scores:{str:18,dex:14,con:15,int:11,wis:17,cha:16},
    skills:'Perception +6', immune:'poison; charmed, paralyzed, poisoned',
    senses:'darkvision 60 ft., passive Perception 16', languages:'Celestial, Elvish, Sylvan, telepathy 60 ft.',
    cr:'5', xp:1800,
    traits:[
      {name:'Charge', desc:'If the unicorn moves at least 20 feet straight toward a target and then hits it with a horn attack on the same turn, the target takes an extra 9 (2d8) piercing damage. If the target is a creature, it must succeed on a DC 15 Strength saving throw or be knocked prone.'},
      {name:'Innate Spellcasting', desc:'The unicorn\u2019s innate spellcasting ability is Charisma (spell save DC 14). The unicorn can innately cast the following spells, requiring no components: at will: detect evil and good, druidcraft, pass without trace; 1/day each: calm emotions, dispel evil and good, entangle.'},
      {name:'Magic Resistance', desc:'The unicorn has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The unicorn makes two attacks: one with its hooves and one with its horn.'},
      {name:'Hooves', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6+4) bludgeoning damage.'},
      {name:'Horn', desc:'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8+4) piercing damage.'},
    ],
  }),
  'Otyugh': MO({
    size:'Large', type:'aberration', alignment:'Neutral',
    ac:14, hp:114, hitDice:'12d10+48', speed:'30 ft.',
    scores:{str:16,dex:11,con:19,int:6,wis:13,cha:6},
    skills:'Perception +5', senses:'darkvision 120 ft., passive Perception 15', languages:'Otyugh',
    cr:'5', xp:1800,
    traits:[
      {name:'Limited Telepathy', desc:'The otyugh can magically transmit simple messages and images to any creature within 120 feet of it that can understand a language. This form of telepathy doesn\u2019t allow the recipient to answer.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The otyugh makes three attacks: one with its bite and two with its tentacles.'},
      {name:'Bite', desc:'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d8+3) piercing damage. If the target is a creature, it must succeed on a DC 15 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the target must repeat the saving throw, reducing its hit point maximum by 5 (1d10) on a failure. This reduction lasts until the disease is cured. The target dies if the disease reduces its hit point maximum to 0.'},
      {name:'Tentacle', desc:'Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 7 (1d6+3) bludgeoning damage. If the target is a creature, it is grappled (escape DC 13). Until this grapple ends, the target is restrained, and the otyugh can\u2019t use this tentacle on another target.'},
    ],
  }),
  'Shadow': MO({
    size:'Medium', type:'undead', alignment:'Chaotic Evil',
    ac:12, hp:16, hitDice:'3d8+3', speed:'40 ft.',
    skills:'Stealth +4 (+6 in dim light or darkness)',
    scores:{str:6,dex:14,con:13,int:6,wis:10,cha:8},
    resist:'acid, cold, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks',
    immune:'necrotic, poison; exhaustion, frightened, grappled, paralyzed, petrified, poisoned, prone, restrained',
    senses:'darkvision 60 ft., passive Perception 10', languages:'None',
    cr:'1/2', xp:100,
    traits:[
      {name:'Amorphous', desc:'The shadow can move through a space as narrow as 1 inch wide without squeezing.'},
      {name:'Shadow Stealth', desc:'While in dim light or darkness, the shadow can take the Hide action as a bonus action.'},
      {name:'Sunlight Weakness', desc:'While in sunlight, the shadow has disadvantage on attack rolls, ability checks, and saving throws.'},
    ],
    actions:[
      {name:'Strength Drain', desc:'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 9 (2d6+2) necrotic damage, and the target\u2019s Strength score is reduced by 1d4. The target dies if this reduces its Strength to 0. Otherwise, the reduction lasts until the target finishes a short or long rest. If a non-evil humanoid dies from this attack, a new shadow rises from the corpse 1d4 hours later.'},
    ],
  }),
  'Guardian Naga': MO({
    size:'Large', type:'celestial', alignment:'Lawful Good',
    ac:18, hp:127, hitDice:'15d10+45', speed:'40 ft.',
    scores:{str:19,dex:18,con:16,int:16,wis:19,cha:18},
    skills:'Arcana +7, History +7', immune:'poison; charmed, paralyzed, poisoned',
    senses:'truesight 120 ft., passive Perception 14', languages:'Celestial, Common',
    cr:'10', xp:5900,
    traits:[
      {name:'Rejuvenation', desc:'If it dies, the naga returns to life in 1d6 days and regains all its hit points. Only a wish spell can prevent this trait from functioning.'},
      {name:'Spellcasting', desc:'The naga is an 11th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 16, +8 to hit with spell attacks), and it needs only verbal components to cast its spells. It has the following cleric spells prepared: cantrips (at will): mending, sacred flame, thaumaturgy; 1st level (4 slots): command, cure wounds, shield of faith; 2nd level (3 slots): calm emotions, hold person; 3rd level (3 slots): beacon of hope, dispel magic; 4th level (3 slots): banishment, freedom of movement; 5th level (2 slots): flame strike, geas; 6th level (1 slot): true seeing.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +9 to hit, reach 10 ft., one creature. Hit: 15 (2d10+4) piercing damage, and the target must make a DC 13 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one.'},
      {name:'Spit Poison', desc:'Ranged Weapon Attack: +9 to hit, range 15/30 ft., one creature. Hit: the target must make a DC 13 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one.'},
    ],
  }),
  'Couatl': MO({
    size:'Medium', type:'celestial', alignment:'Lawful Good',
    ac:19, hp:97, hitDice:'13d8+39', speed:'30 ft., fly 90 ft.',
    scores:{str:16,dex:20,con:17,int:18,wis:20,cha:18},
    resist:'radiant', immune:'psychic; bludgeoning, piercing, and slashing from nonmagical attacks',
    senses:'truesight 120 ft., passive Perception 15', languages:'all, telepathy 120 ft.',
    cr:'4', xp:1100,
    traits:[
      {name:'Innate Spellcasting', desc:'The couatl\u2019s spellcasting ability is Charisma (spell save DC 14). It can innately cast the following spells, requiring only verbal components: at will: detect evil and good, detect magic, detect thoughts; 3/day each: bless, create food and water, cure wounds, lesser restoration, protection from poison, sanctuary, shield; 1/day each: dream, greater restoration, scrying.'},
      {name:'Magic Weapons', desc:'The couatl\u2019s weapon attacks are magical.'},
      {name:'Shielded Mind', desc:'The couatl is immune to scrying and to any effect that would sense its emotions, read its thoughts, or detect its location.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +8 to hit, reach 5 ft., one creature. Hit: 8 (1d6+5) piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 24 hours. Until this poison ends, the target is unconscious. Another creature can use an action to shake the target awake.'},
      {name:'Constrict', desc:'Melee Weapon Attack: +6 to hit, reach 10 ft., one Medium or smaller creature. Hit: 10 (2d6+3) bludgeoning damage, and the target is grappled (escape DC 15). Until this grapple ends, the target is restrained, and the couatl can\u2019t constrict another target.'},
      {name:'Change Shape', desc:'The couatl magically polymorphs into a humanoid or beast that has a challenge rating equal to or less than its own, or back into its true form. It reverts to its true form if it dies. In a new form, the couatl retains its game statistics and ability to speak, but its AC, movement modes, Strength, Dexterity, and other actions are replaced by those of the new form.'},
    ],
  }),
  'Blink Dog': MO({
    size:'Medium', type:'fey', alignment:'Lawful Good',
    ac:13, hp:22, hitDice:'5d8', speed:'40 ft.',
    scores:{str:12,dex:17,con:12,int:10,wis:13,cha:11},
    skills:'Perception +3', senses:'passive Perception 13', languages:'Blink Dog, understands Elvish and Sylvan but can\u2019t speak them',
    cr:'1/4', xp:50,
    traits:[
      {name:'Keen Hearing and Smell', desc:'The dog has advantage on Wisdom (Perception) checks that rely on hearing or smell.'},
    ],
    actions:[
      {name:'Bite', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6+1) piercing damage.'},
      {name:'Teleport (Recharge 4-6)', desc:'The dog magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see.'},
    ],
  }),
  'Satyr': MO({
    size:'Medium', type:'fey', alignment:'Chaotic Neutral',
    ac:14, acNote:'leather armor', hp:31, hitDice:'7d8', speed:'40 ft.',
    scores:{str:12,dex:16,con:13,int:12,wis:10,cha:14},
    skills:'Perception +2, Performance +6, Stealth +5', senses:'passive Perception 12', languages:'Common, Elvish, Sylvan',
    cr:'1/2', xp:100,
    traits:[
      {name:'Magic Resistance', desc:'The satyr has advantage on saving throws against spells and other magical effects.'},
    ],
    actions:[
      {name:'Ram', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4+1) bludgeoning damage.'},
      {name:'Shortsword', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6+3) piercing damage.'},
      {name:'Shortbow', desc:'Ranged Weapon Attack: +5 to hit, range 80/320 ft., one target. Hit: 6 (1d6+3) piercing damage.'},
    ],
  }),
  'Sea Hag': MO({
    size:'Medium', type:'fey', alignment:'Chaotic Evil',
    ac:14, hp:52, hitDice:'7d8', speed:'30 ft., swim 40 ft.',
    scores:{str:16,dex:13,con:16,int:12,wis:12,cha:13},
    senses:'darkvision 60 ft., passive Perception 11', languages:'Common, Giant',
    cr:'2', xp:450,
    traits:[
      {name:'Amphibious', desc:'The hag can breathe air and water.'},
      {name:'Horrific Appearance', desc:'Any humanoid that starts its turn within 30 feet of the hag and can see the hag\u2019s true form must make a DC 11 Wisdom saving throw. On a failed save, the creature is frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, with disadvantage if the hag is within line of sight, ending the effect on itself on a success. If a creature\u2019s saving throw is successful or the effect ends for it, the creature is immune to the hag\u2019s Horrific Appearance for the next 24 hours, unless the target is surprised or the revelation of the hag\u2019s true form is sudden.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The hag makes two attacks with her claws, and can replace one attack with her Death Glare.'},
      {name:'Claws', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) slashing damage.'},
      {name:'Death Glare', desc:'The hag targets one frightened creature she can see within 30 feet of her. If the target can see the hag, it must succeed on a DC 11 Wisdom saving throw against this magic or drop to 0 hit points.'},
      {name:'Illusory Appearance', desc:'The hag covers herself and anything she is wearing or carrying with a magical illusion that makes her look like an ugly creature of her general size and humanoid shape. The effect ends if the hag takes a bonus action to end it or if she dies.'},
      {name:'Invisible Passage', desc:'The hag magically turns invisible until she attacks or casts a spell, or until her concentration ends (as if concentrating on a spell). Any equipment she wears or carries is invisible with her.'},
    ],
  }),
  'Black Pudding': MO({
    size:'Large', type:'ooze', alignment:'Unaligned',
    ac:7, hp:85, hitDice:'10d10+30', speed:'20 ft., climb 20 ft.',
    scores:{str:16,dex:5,con:16,int:1,wis:6,cha:1},
    resist:'bludgeoning, piercing from nonmagical attacks',
    immune:'acid, cold, lightning, slashing; blinded, charmed, deafened, exhaustion, frightened, prone',
    senses:'blindsight 60 ft. (blind beyond this radius), passive Perception 8', languages:'None',
    cr:'4', xp:1100,
    traits:[
      {name:'Amorphous', desc:'The pudding can move through a space as narrow as 1 inch wide without squeezing.'},
      {name:'Corrosive Form', desc:'A creature that touches the pudding or hits it with a melee attack while within 5 feet of it takes 4 (1d8) acid damage. Any nonmagical weapon made of metal or wood that hits the pudding corrodes, taking a permanent and cumulative -1 penalty to damage rolls after dealing damage, and is destroyed if the penalty drops to -5. Nonmagical ammunition made of metal or wood is destroyed after dealing damage. The pudding can eat through 2-inch-thick, nonmagical wood or metal in 1 round.'},
      {name:'Spider Climb', desc:'The pudding can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.'},
      {name:'Split', desc:'When a pudding that is Medium or larger is subjected to lightning or slashing damage, it splits into two new puddings if it has at least 10 hit points. Each new pudding has hit points equal to half the original\u2019s, rounded down, and is one size smaller than the original.'},
    ],
    actions:[
      {name:'Pseudopod', desc:'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6+3) bludgeoning damage plus 18 (4d8) acid damage. Nonmagical armor worn by the target takes a permanent and cumulative -1 penalty to the AC it offers, and is destroyed if the penalty reduces its AC to 10.'},
    ],
  }),
  'Gray Ooze': MO({
    size:'Medium', type:'ooze', alignment:'Unaligned',
    ac:8, hp:22, hitDice:'3d8+9', speed:'10 ft., climb 10 ft.',
    scores:{str:12,dex:6,con:16,int:1,wis:6,cha:2},
    resist:'acid, cold, fire',
    immune:'blinded, charmed, deafened, exhaustion, frightened, prone',
    senses:'blindsight 60 ft. (blind beyond this radius), passive Perception 8', languages:'None',
    cr:'1/2', xp:100,
    traits:[
      {name:'Amorphous', desc:'The ooze can move through a space as narrow as 1 inch wide without squeezing.'},
      {name:'False Appearance', desc:'While the ooze remains motionless, it is indistinguishable from an oily pool or wet rock.'},
      {name:'Corrosive Form', desc:'A creature that touches the ooze or hits it with a melee attack while within 5 feet of it takes 2 (1d4) acid damage. Any nonmagical weapon made of metal or wood that hits the ooze corrodes, taking a permanent and cumulative -1 penalty to damage rolls after dealing damage, and is destroyed if the penalty drops to -5. Nonmagical ammunition made of metal or wood is destroyed after dealing damage.'},
    ],
    actions:[
      {name:'Pseudopod', desc:'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6+1) acid damage. Nonmagical armor worn by the target takes a permanent and cumulative -1 penalty to the AC it offers, and is destroyed if the penalty reduces its AC to 10.'},
    ],
  }),
  'Awakened Shrub': MO({
    size:'Small', type:'plant', alignment:'Unaligned',
    ac:9, hp:10, hitDice:'3d6', speed:'20 ft.',
    scores:{str:3,dex:8,con:11,int:10,wis:10,cha:6},
    senses:'passive Perception 10', languages:'one language known by its creator',
    cr:'0', xp:10,
    traits:[
      {name:'False Appearance', desc:'While the shrub remains motionless, it is indistinguishable from a normal shrub.'},
    ],
    actions:[
      {name:'Rake', desc:'Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4-1) slashing damage.'},
    ],
  }),
  'Awakened Tree': MO({
    size:'Huge', type:'plant', alignment:'Unaligned',
    ac:13, hp:59, hitDice:'7d12+14', speed:'20 ft.',
    scores:{str:19,dex:6,con:15,int:10,wis:10,cha:7},
    senses:'passive Perception 10', languages:'one language known by its creator',
    cr:'2', xp:450,
    traits:[
      {name:'False Appearance', desc:'While the tree remains motionless, it is indistinguishable from a normal tree.'},
    ],
    actions:[
      {name:'Slam', desc:'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 14 (3d6+4) bludgeoning damage.'},
    ],
  }),
  'Shrieker': MO({
    size:'Medium', type:'plant', alignment:'Unaligned',
    ac:5, hp:13, hitDice:'3d8', speed:'0 ft.',
    scores:{str:1,dex:1,con:10,int:1,wis:3,cha:1},
    immune:'blinded, deafened, frightened',
    senses:'blindsight 30 ft. (blind beyond this radius), passive Perception 6', languages:'None',
    cr:'0', xp:10,
    traits:[
      {name:'False Appearance', desc:'While the shrieker remains motionless, it is indistinguishable from an ordinary fungus.'},
    ],
    actions:[
      {name:'Shriek', desc:'When there is a bright light source within 30 feet of it, or a creature touches it or comes within 5 feet of it, the shrieker emits a shriek audible up to 300 feet away for as long as the stimulus persists, ending its turn on subsequent rounds only if the stimulus is gone. Each monster within 30 feet of the shrieker that can hear it has advantage on the initiative roll for the encounter that follows.'},
    ],
  }),
  'Violet Fungus': MO({
    size:'Medium', type:'plant', alignment:'Unaligned',
    ac:5, hp:18, hitDice:'4d8', speed:'5 ft.',
    scores:{str:3,dex:1,con:10,int:1,wis:3,cha:1},
    immune:'blinded, deafened, frightened',
    senses:'blindsight 30 ft. (blind beyond this radius), passive Perception 6', languages:'None',
    cr:'1/4', xp:50,
    traits:[
      {name:'False Appearance', desc:'While the violet fungus remains motionless, it is indistinguishable from an ordinary fungus.'},
    ],
    actions:[
      {name:'Multiattack', desc:'The fungus makes three attacks with its tentacles.'},
      {name:'Tentacle', desc:'Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 4 (1d4+2) poison damage. If the target is a creature, it must succeed on a DC 10 Constitution saving throw or become poisoned. The poisoned target takes 3 (1d6) poison damage at the start of each of its turns. The poisoned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.'},
    ],
  }),
};

// ---------- LOGIC ----------

function roll(n){ return Math.floor(Math.random()*n); }
function pick(arr){ return arr[roll(arr.length)]; }
function pickN(arr, n){
  const pool = arr.slice();
  const out = [];
  n = Math.min(n, pool.length);
  for(let i=0;i<n;i++){ out.push(pool.splice(roll(pool.length),1)[0]); }
  return out;
}

// ---------- SHUFFLE BAGS ----------
// Each keyed bag draws items without replacement until the pool is
// exhausted, then reshuffles and starts a fresh cycle. This guarantees
// real variety (no item repeats until everything else has come up)
// rather than just probabilistic variety. Bags live for the current
// page session only — a reload starts every pool fresh, same as
// everything else that isn't the roll history.
const SHUFFLE_BAGS = {};

function fisherYates(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = roll(i + 1);
    const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

function drawFromBag(key, items){
  if(!items || items.length === 0) return undefined;
  let bag = SHUFFLE_BAGS[key];
  if(!bag || bag.length === 0){
    bag = fisherYates(items);
    SHUFFLE_BAGS[key] = bag;
  }
  return bag.pop();
}

function drawNFromBag(key, items, n){
  n = Math.min(n, items ? items.length : 0);
  const out = [];
  for(let i=0;i<n;i++){ out.push(drawFromBag(key, items)); }
  return out;
}

function mod(score){ return Math.floor((score-10)/2); }
function fmtMod(m){ return (m>=0?'+':'') + m; }

// Real armor AC values and Dex-bonus rules (light gets full Dex, medium caps
// it at +2, heavy gets none at all) — used to compute AC from whatever the
// character actually has in their gear, rather than guessing from class name.
const ARMOR_TABLE = {
  'Padded': { ac:11, type:'light' },
  'Leather Armor': { ac:11, type:'light' },
  'Studded Leather Armor': { ac:12, type:'light' },
  'Hide Armor': { ac:12, type:'medium' },
  'Chain Shirt': { ac:13, type:'medium' },
  'Scale Mail': { ac:14, type:'medium' },
  'Breastplate': { ac:14, type:'medium' },
  'Half Plate': { ac:15, type:'medium' },
  'Ring Mail': { ac:14, type:'heavy' },
  'Chain Mail': { ac:16, type:'heavy' },
  'Splint': { ac:17, type:'heavy' },
  'Plate': { ac:18, type:'heavy' },
  // Magic plate armors (DMG): plate's AC 18, heavy.
  'Armor of Invulnerability': { ac:18, type:'heavy' },
  'Plate Armor of Etherealness': { ac:18, type:'heavy' },
};

// Armor Class with a step-by-step breakdown. opts (all optional):
//   classes: class names whose Unarmored Defense applies (defaults to cls)
//   draconic: Draconic Bloodline sorcerer (unarmored AC 13 + DEX)
//   mediumArmorMaster: medium armor lets in up to +3 DEX instead of +2
function armorClassBreakdown(scores, cls, gear, opts){
  opts = opts || {};
  const classes = opts.classes || [cls.name];
  const dexMod = mod(scores.dex);
  const names = gear.map(g => g.name);

  const baseArmorName = names.find(n => ARMOR_TABLE[n]);
  const hasMundaneShield = names.includes('Shield');
  const magicArmorBonus = names.reduce((best, n) => {
    const match = /^\+(\d) Armor$/.exec(n);
    return match ? Math.max(best, Number(match[1])) : best;
  }, 0);
  const magicShieldBonus = names.reduce((best, n) => {
    const match = /^\+(\d) Shield$/.exec(n);
    return match ? Math.max(best, Number(match[1])) : best;
  }, 0);
  const hasShield = hasMundaneShield || magicShieldBonus > 0;

  let parts;
  let shieldAllowed = true;
  if(baseArmorName){
    const armor = ARMOR_TABLE[baseArmorName];
    parts = [[baseArmorName+' ('+armor.type+' armor)', armor.ac, 'base']];
    if(armor.type === 'light') parts.push(['DEX modifier (light armor adds all of it)', dexMod]);
    else if(armor.type === 'medium'){
      const cap = opts.mediumArmorMaster ? 3 : 2;
      parts.push(['DEX modifier (medium armor adds up to +'+cap+(opts.mediumArmorMaster ? ', Medium Armor Master' : '')+')', Math.min(dexMod, cap)]);
    } else parts.push(['DEX modifier (heavy armor adds none)', 0]);
    if(magicArmorBonus) parts.push(['+'+magicArmorBonus+' Armor (magic)', magicArmorBonus]);
  } else {
    // No armor: use whichever unarmored formula gives the best AC.
    const options = [{ parts:[['Unarmored base', 10, 'base'], ['DEX modifier', dexMod]], shieldOk:true }];
    if(classes.includes('Barbarian')) options.push({ parts:[['Unarmored Defense (Barbarian)', 10, 'base'], ['DEX modifier', dexMod], ['CON modifier', mod(scores.con)]], shieldOk:true });
    if(classes.includes('Monk')) options.push({ parts:[['Unarmored Defense (Monk)', 10, 'base'], ['DEX modifier', dexMod], ['WIS modifier', mod(scores.wis)]], shieldOk:false });
    if(opts.draconic) options.push({ parts:[['Draconic Resilience (unarmored)', 13, 'base'], ['DEX modifier', dexMod]], shieldOk:true });
    if(names.includes('Robe of the Archmagi')) options.push({ parts:[['Robe of the Archmagi (unarmored)', 15, 'base'], ['DEX modifier', dexMod]], shieldOk:true });
    const score = o => sumParts(o.parts) + (o.shieldOk && hasShield ? 2 + magicShieldBonus : 0);
    const best = options.reduce((a, b) => score(b) > score(a) ? b : a);
    parts = best.parts.slice();
    shieldAllowed = best.shieldOk;
  }
  if(hasShield && shieldAllowed){
    parts.push(['Shield', 2]);
    if(magicShieldBonus) parts.push(['+'+magicShieldBonus+' Shield (magic)', magicShieldBonus]);
  }
  ['Cloak of Protection', 'Ring of Protection'].forEach(item => { if(names.includes(item)) parts.push([item, 1]); });
  return { total: sumParts(parts), parts };
}

function computeArmorClass(scores, cls, gear, opts){
  return armorClassBreakdown(scores, cls, gear, opts).total;
}

// Adds up a breakdown. A part's value is a number, or {set:N} for items that
// set a score to N (only recorded when that raised it).
function sumParts(parts){
  return parts.reduce((t, p) => (p[1] && typeof p[1] === 'object') ? p[1].set : t + p[1], 0);
}

function proficiencyBonus(level){
  if(level>=17) return 6;
  if(level>=13) return 5;
  if(level>=9) return 4;
  if(level>=5) return 3;
  return 2;
}

function maxSpellLevelFull(level){
  if(level>=17) return 9;
  if(level>=15) return 8;
  if(level>=13) return 7;
  if(level>=11) return 6;
  if(level>=9) return 5;
  if(level>=7) return 4;
  if(level>=5) return 3;
  if(level>=3) return 2;
  return 1;
}
function maxSpellLevelHalf(level){
  if(level<2) return 0;
  if(level>=17) return 5;
  if(level>=13) return 4;
  if(level>=9) return 3;
  if(level>=5) return 2;
  return 1;
}

function cantripsKnown(base, level){
  if(base===0) return 0;
  let n = base;
  if(level>=4) n++;
  if(level>=10) n++;
  return n;
}

function assignAbilityScores(cls, order){
  const array = [15,14,13,12,10,8];
  order = (order || cls.primary).slice();
  const scores = {};
  order.forEach((a,i)=>{ scores[a] = array[i]; });
  return scores;
}

function applyRacialBonuses(scores, race){
  const out = Object.assign({}, scores);
  ABILS.forEach(a=>{ out[a] += (race.bonuses[a]||0); });
  if(race.extraChoice){
    const remaining = ABILS.filter(a=>!race.bonuses[a]);
    const chosen = pickN(remaining, race.extraChoice);
    chosen.forEach(a=>{ out[a]+=1; });
  }
  return out;
}

// Levels at which a class gets an Ability Score Improvement (or a feat, which
// we treat as a straight +2 for stat-generation purposes). Fighter and Rogue
// get the two well-known bonus ASIs on top of the standard progression.
function asiLevelsForClass(clsName){
  if(clsName === 'Fighter') return [4,6,8,12,14,16,19];
  if(clsName === 'Rogue') return [4,8,10,12,16,19];
  return [4,8,12,16,19];
}

// At each ASI level, there's a chance the character took a feat instead of
// the flat ability bump — but only from feats whose real prerequisites the
// character actually meets at that point in their career, which is what
// keeps the choice making sense for that class/build rather than being
// arbitrary. Iterates level-by-level so prerequisites are checked against
// the character's scores as they stood at that level, not their eventual
// final scores.
// Most players push their main stat to 20 before spending ASIs on feats,
// so feats are uncommon until it's maxed and common afterwards.
const FEAT_CHANCE_BEFORE_MAX = 0.15;
const FEAT_CHANCE_AFTER_MAX = 0.6;

// Feats that also raise one ability score by 1 (the "half feats"), and
// which abilities each can raise. Resilient can be any ability.
const FEAT_ABILITY_OPTIONS = {
  'Actor':['cha'], 'Athlete':['str','dex'], 'Durable':['con'], 'Heavily Armored':['str'],
  'Heavy Armor Master':['str'], 'Keen Mind':['int'], 'Linguist':['int'], 'Lightly Armored':['str','dex'],
  'Moderately Armored':['str','dex'], 'Observant':['int','wis'], 'Tavern Brawler':['str','con'],
  'Resilient':['str','dex','con','int','wis','cha'],
};

// asiLabels: one label per ASI the character has earned, e.g. "Fighter 4".
// scoreParts (optional): per-ability breakdown lists to append to.
function applyAbilityScoreImprovements(scores, cls, asiLabels, order, scoreParts){
  let out = Object.assign({}, scores);
  const feats = [];
  const extraSaves = [];
  order = order || cls.primary;
  const note = (ab, label, v) => { if(scoreParts) scoreParts[ab].push([label, v]); };

  for(let i = 0; i < asiLabels.length; i++){
    const asiLabel = asiLabels[i];
    const featChance = out[order[0]] >= 20 ? FEAT_CHANCE_AFTER_MAX : FEAT_CHANCE_BEFORE_MAX;
    const tryFeat = Math.random() < featChance;
    const eligible = tryFeat ? Object.keys(FEAT_REGISTRY).filter(name => {
      if(feats.includes(name)) return false;
      const f = FEAT_REGISTRY[name];
      return !f.prereq || f.prereq(out, cls);
    }) : [];

    if(eligible.length > 0){
      const chosen = drawFromBag('feat:'+cls.name, eligible);
      feats.push(chosen);
      const options = FEAT_ABILITY_OPTIONS[chosen];
      if(options){
        // Raise the most useful allowed ability that isn't already 20. For
        // Resilient, prefer one the class isn't already proficient in saving with.
        let ranked = order.filter(a => options.includes(a) && out[a] < 20);
        if(chosen === 'Resilient'){
          const fresh = ranked.filter(a => !cls.saves.includes(a));
          if(fresh.length) ranked = fresh;
        }
        const ab = ranked[0] || options.find(a => !(chosen === 'Resilient' && cls.saves.includes(a))) || options[0];
        if(out[ab] < 20){ out[ab] += 1; note(ab, chosen+' feat ('+asiLabel+')', 1); }
        if(chosen === 'Resilient') extraSaves.push(ab);
      }
      continue;
    }

    let points = 2;
    let idx = 0;
    const gained = {};
    while(points > 0 && idx < order.length){
      const stat = order[idx];
      if(out[stat] >= 20){ idx++; continue; }
      out[stat] += 1;
      gained[stat] = (gained[stat] || 0) + 1;
      points -= 1;
    }
    Object.keys(gained).forEach(ab => note(ab, 'Ability Score Improvement ('+asiLabel+')', gained[ab]));
  }

  return { scores: out, feats, extraSaves };
}

// Some magic items set an ability score to a fixed value while worn (no
// effect if the character's own score is already higher) — applied here
// once we know what's actually in the character's gear, same principle as
// the armor class fix.
const STAT_ITEM_TABLE = {
  'Gauntlets of Ogre Power': { ability:'str', value:19 },
  'Belt of Hill Giant Strength': { ability:'str', value:21 },
  'Belt of Fire Giant Strength': { ability:'str', value:25 },
  'Belt of Cloud Giant Strength': { ability:'str', value:27 },
  'Belt of Storm Giant Strength': { ability:'str', value:29 },
  'Headband of Intellect': { ability:'int', value:19 },
  'Amulet of Health': { ability:'con', value:19 },
};

function applyMagicItemStatBonuses(scores, gear){
  const out = Object.assign({}, scores);
  gear.forEach(g => {
    const item = STAT_ITEM_TABLE[g.name];
    if(item) out[item.ability] = Math.max(out[item.ability], item.value);
  });
  return out;
}

const MULTICLASS_SKILL_COUNT = { Bard:1, Ranger:1, Rogue:1 };

// 2014 PHB "Spells Known" columns, indexed by class level (index 0 unused).
// Classes not listed here prepare spells instead (see spellCountFor).
const SPELLS_KNOWN_TABLE = {
  Bard:     [0,4,5,6,7,8,9,10,11,12,14,15,15,16,18,19,19,20,22,22,22],
  Sorcerer: [0,2,3,4,5,6,7,8,9,10,11,12,12,13,13,14,14,15,15,15,15],
  Warlock:  [0,2,3,4,5,6,7,8,9,10,10,11,11,12,12,13,13,14,14,15,15],
  Ranger:   [0,0,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11],
};

// Warlock Pact Magic: all slots are one level, which tops out at 5th.
function warlockSlotLevel(level){
  if(level>=9) return 5;
  if(level>=7) return 4;
  if(level>=5) return 3;
  if(level>=3) return 2;
  return 1;
}
// Mystic Arcanum: one 6th/7th/8th/9th level spell at Warlock 11/13/15/17.
function warlockArcanumLevels(level){
  return [11,13,15,17].filter(l => level >= l).map((l, i) => 6 + i);
}

// How many leveled spells the class knows (or has prepared) at this class level.
function spellCountFor(cls, classLevel, abilityMod){
  if(SPELLS_KNOWN_TABLE[cls.name]) return SPELLS_KNOWN_TABLE[cls.name][Math.min(classLevel, 20)];
  if(cls.name === 'Paladin') return Math.max(1, abilityMod + Math.floor(classLevel / 2));
  return Math.max(1, abilityMod + classLevel); // Cleric, Druid, Wizard
}

// Slots per spell level for this class at this class level, used to weight
// how many spells of each level a character carries. Half casters use the
// full-caster row at half their level (rounded up), which matches the PHB.
function slotWeightsFor(cls, classLevel, maxLvl){
  if(cls.caster === 'pact') return Array.from({ length: maxLvl }, () => 1);
  const row = cls.caster === 'half'
    ? (classLevel < 2 ? [] : FULL_CASTER_SLOTS_BY_LEVEL[Math.ceil(classLevel / 2)])
    : FULL_CASTER_SLOTS_BY_LEVEL[Math.min(classLevel, 20)];
  return (row || []).slice(0, maxLvl);
}

// Splits `count` spells across spell levels 1..maxLvl. Every level the
// character can cast gets at least one spell (highest first, so a level 20
// wizard always has a 9th-level spell), and the rest are spread in
// proportion to spell slots, which is roughly how real players build a list.
function spreadSpellCounts(count, weights, pool){
  const levels = weights.map((w, i) => i + 1).filter(l => (pool[l] || []).length);
  const counts = {};
  levels.forEach(l => counts[l] = 0);
  let left = count;
  for(const l of levels.slice().reverse()){
    if(left <= 0) break;
    counts[l]++; left--;
  }
  while(left > 0){
    const open = levels.filter(l => counts[l] < pool[l].length);
    if(!open.length) break;
    const total = open.reduce((t, l) => t + weights[l - 1], 0);
    let r = Math.random() * total;
    let chosen = open[open.length - 1];
    for(const l of open){ r -= weights[l - 1]; if(r < 0){ chosen = l; break; } }
    counts[chosen]++; left--;
  }
  return counts;
}

// Eldritch Knight (Fighter) and Arcane Trickster (Rogue) cast wizard spells
// from 3rd level, mostly from two schools. 2014 PHB tables.
const THIRD_CASTER_SUBCLASSES = {
  'Eldritch Knight':  { schools:['Abjuration','Evocation'], cantripBase:2, mandatoryCantrip:null,
                        // EKs keep INT behind STR and CON rather than dumping it.
                        primary:['str','con','int','dex','wis','cha'] },
  'Arcane Trickster': { schools:['Enchantment','Illusion'], cantripBase:3, mandatoryCantrip:'Mage Hand',
                        primary:null },
};
const THIRD_CASTER_KNOWN = [0,0,0,3,4,4,4,5,6,6,7,8,8,9,10,10,11,11,11,12,13];
const THIRD_CASTER_SLOTS = {
  3:[2],4:[3],5:[3],6:[3],7:[4,2],8:[4,2],9:[4,2],10:[4,3],11:[4,3],12:[4,3],
  13:[4,3,2],14:[4,3,2],15:[4,3,2],16:[4,3,3],17:[4,3,3],18:[4,3,3],19:[4,3,3,1],20:[4,3,3,1],
};
// At these class levels the new spell can come from any school.
const THIRD_CASTER_FREE_PICK_LEVELS = [3, 8, 14, 20];

function buildThirdCasterSpellBlock(subclassName, classLevel, scores, prof){
  const sub = THIRD_CASTER_SUBCLASSES[subclassName];
  if(!sub || classLevel < 3) return null;
  const wiz = SPELL_DB.Wizard;
  const lvl = Math.min(classLevel, 20);
  const slots = THIRD_CASTER_SLOTS[lvl];
  const maxLvl = slots.length;
  const abilityMod = mod(scores.int);
  const schoolOf = name => (SPELL_DESC_LOOKUP[name] || {}).school;

  // Cantrips: any wizard cantrip; Arcane Tricksters always know Mage Hand.
  const cantripCount = sub.cantripBase + (lvl >= 10 ? 1 : 0);
  const others = wiz.cantrips.map(sp => sp.name).filter(n => n !== sub.mandatoryCantrip);
  const cantrips = (sub.mandatoryCantrip ? [sub.mandatoryCantrip] : [])
    .concat(pickN(others, cantripCount - (sub.mandatoryCantrip ? 1 : 0)));

  // Free picks: one per free-pick level reached, at the highest spell level
  // available then (what most players take).
  const freePicks = THIRD_CASTER_FREE_PICK_LEVELS.filter(l => lvl >= l)
    .map(l => THIRD_CASTER_SLOTS[l].length);
  const restrictedCount = THIRD_CASTER_KNOWN[lvl] - freePicks.length;

  const restrictedPool = {};
  for(let l = 1; l <= maxLvl; l++){
    restrictedPool[l] = (wiz[l] || []).filter(sp => sub.schools.includes(schoolOf(sp.name)));
  }
  const counts = spreadSpellCounts(restrictedCount, slots, restrictedPool);
  let known = [];
  Object.keys(counts).map(Number).forEach(l => {
    known = known.concat(pickN(restrictedPool[l].map(sp => sp.name), counts[l]));
  });
  freePicks.forEach(l => {
    const choices = (wiz[l] || []).map(sp => sp.name)
      .filter(n => !known.includes(n) && !sub.schools.includes(schoolOf(n)));
    if(choices.length) known.push(pick(choices));
  });
  const levelOf = {};
  for(let l = 1; l <= 9; l++) (wiz[l] || []).forEach(sp => { levelOf[sp.name] = l; });
  known.sort((a, b) => levelOf[a] - levelOf[b]);

  return {
    ability: 'int',
    saveDC: 8 + prof + abilityMod,
    attackBonus: prof + abilityMod,
    maxSpellLevel: maxLvl,
    cantrips,
    known,
    arcanum: [],
    list: 'Wizard',
    label: subclassName + ' Spellcasting',
  };
}

// Multiclassed characters learn and prepare spells for each class as if
// single-classed at that class's own level (PHB p.164), so classLevel is
// always the class's own level here.
function buildSpellBlockForClass(cls, classLevel, scores, prof){
  if(cls.caster === 'none' || classLevel < 1) return null;
  const pool = SPELL_DB[cls.name] || { cantrips:[] };
  const abilityMod = mod(scores[cls.spellAbility]);
  let maxLvl;
  if(cls.caster === 'half') maxLvl = maxSpellLevelHalf(classLevel);
  else if(cls.caster === 'pact') maxLvl = warlockSlotLevel(classLevel);
  else maxLvl = maxSpellLevelFull(classLevel);
  if(maxLvl <= 0) return null;

  const cantripNames = pool.cantrips.map(s=>s.name);
  const cantrips = cls.cantripBase ? pickN(cantripNames, cantripsKnown(cls.cantripBase, classLevel)) : [];

  const counts = spreadSpellCounts(spellCountFor(cls, classLevel, abilityMod), slotWeightsFor(cls, classLevel, maxLvl), pool);
  let known = [];
  Object.keys(counts).map(Number).sort((a, b) => a - b).forEach(l => {
    known = known.concat(pickN(pool[l].map(sp => sp.name), counts[l]));
  });

  const arcanum = cls.caster === 'pact'
    ? warlockArcanumLevels(classLevel).filter(l => (pool[l] || []).length).map(l => pick(pool[l]).name)
    : [];

  return {
    ability: cls.spellAbility,
    saveDC: 8 + prof + abilityMod,
    attackBonus: prof + abilityMod,
    maxSpellLevel: maxLvl,
    cantrips,
    known,
    arcanum,
  };
}

async function generateCharacter(level, locks, multiclassCls){
  locks = locks || {};
  const race = locks.race || drawFromBag('race', RACES);
  const cls = locks.cls || drawFromBag('cls', CLASSES);
  const bg = locks.bg || drawFromBag('bg', BACKGROUNDS);
  const alignment = locks.alignment || drawFromBag('alignment', ALIGNMENTS);

  // Subclass is planned up front because Eldritch Knights want a usable INT.
  // (It's dropped later if multiclassing leaves too few levels for one.)
  const plannedSubclass = level >= cls.subclassLevel ? pick(cls.subclasses) : null;
  const statOrder = (THIRD_CASTER_SUBCLASSES[plannedSubclass] || {}).primary || null;
  let scores = assignAbilityScores(cls, statOrder);
  const baseScores = Object.assign({}, scores);
  scores = applyRacialBonuses(scores, race);
  // Where each ability score came from, for the sheet's "how is this worked out" view.
  const scoreParts = {};
  ABILS.forEach(a => {
    scoreParts[a] = [['Standard array', baseScores[a], 'base']];
    if(scores[a] !== baseScores[a]) scoreParts[a].push(['Race ('+race.name+')', scores[a] - baseScores[a]]);
  });

  // Multiclassing: only offered at level 3+ so both classes get at least
  // one meaningful level, and only when the rolled ability scores actually
  // meet both classes' prerequisites (2014 PHB rules, verified via search).
  let cls2 = null, level1 = level, level2 = 0;
  if(level >= 3){
    let candidates;
    if(multiclassCls){
      candidates = (multiclassCls !== 'any') ? [multiclassCls] : CLASSES.filter(c => c.name !== cls.name);
    } else {
      candidates = [];
    }
    const eligible = candidates.filter(c =>
      c.name !== cls.name &&
      meetsMulticlassPrereq(scores, cls.name) &&
      meetsMulticlassPrereq(scores, c.name)
    );
    if(eligible.length){
      cls2 = pick(eligible);
      level2 = 1 + Math.floor(Math.random() * Math.floor(level/2));
      level1 = level - level2;
    }
  }

  // ASIs come from each class's own levels (a Fighter 6 / Wizard 4 gets
  // Fighter's 4 and 6 plus Wizard's 4).
  const asiLabels = asiLevelsForClass(cls.name).filter(l => l <= level1).map(l => cls.name+' '+l)
    .concat(cls2 ? asiLevelsForClass(cls2.name).filter(l => l <= level2).map(l => cls2.name+' '+l) : []);
  const asiResult = applyAbilityScoreImprovements(scores, cls, asiLabels, statOrder, scoreParts);
  scores = asiResult.scores;
  const feats = asiResult.feats;
  const extraSaves = asiResult.extraSaves;

  const mundaneGear = cls.gear.concat(bg.gear).map(g => ({
    n:g.n, name:g.name, isMagic:false, kind:'equipment'
  }));
  const magicGear = await getMagicItemsForLevel(level);
  const gear = mundaneGear.concat(magicGear);
  const beforeItems = Object.assign({}, scores);
  scores = applyMagicItemStatBonuses(scores, gear);
  ABILS.forEach(a => {
    if(scores[a] !== beforeItems[a]){
      const item = gear.map(g => g.name).find(n => STAT_ITEM_TABLE[n] && STAT_ITEM_TABLE[n].ability === a && STAT_ITEM_TABLE[n].value === scores[a]);
      scoreParts[a].push([(item || 'Magic item')+' (sets it to '+scores[a]+')', { set: scores[a] }]);
    }
  });

  const prof = proficiencyBonus(level);

  // hp: max at level 1 (first class only), average roll (rounded up) each
  // level after, using whichever class that level was taken in, plus CON
  // every level and any per-level bonuses.
  const hpParts = [['Level 1 ('+cls.name+'): maximum of a d'+cls.hitDie, cls.hitDie, 'base']];
  const dieAvg1 = Math.ceil((cls.hitDie/2)+0.5);
  if(level1 > 1) hpParts.push(['Levels 2\u2013'+level1+' ('+cls.name+'): average d'+cls.hitDie+' roll, rounded up ('+dieAvg1+') \u00d7 '+(level1-1), dieAvg1*(level1-1)]);
  if(cls2){
    const dieAvg2 = Math.ceil((cls2.hitDie/2)+0.5);
    hpParts.push([cls2.name+' levels: average d'+cls2.hitDie+' roll, rounded up ('+dieAvg2+') \u00d7 '+level2, dieAvg2*level2]);
  }
  hpParts.push(['CON modifier ('+fmtMod(mod(scores.con))+') \u00d7 '+level+' levels', mod(scores.con)*level]);
  if(feats.includes('Tough')) hpParts.push(['Tough feat (+2 per level) \u00d7 '+level, 2*level]);
  if(race.name === 'Hill Dwarf') hpParts.push(['Dwarven Toughness (+1 per level) \u00d7 '+level, level]);
  const sorcLevel = cls.name === 'Sorcerer' ? level1 : (cls2 && cls2.name === 'Sorcerer' ? level2 : 0);
  let hp = sumParts(hpParts);
  if(hp < level){ hpParts.push(['Minimum of 1 HP per level', level - hp]); hp = level; }

  let skills = pickN(cls.skillChoices, cls.skillCount).concat(bg.skills);
  if(cls2 && MULTICLASS_SKILL_COUNT[cls2.name]){
    skills = skills.concat(pickN(cls2.skillChoices, MULTICLASS_SKILL_COUNT[cls2.name]));
  }
  const uniqueSkills = Array.from(new Set(skills));

  const nameSet = NAME_PARTS[race.nameGroup || race.name];
  const name = drawFromBag('name-first:'+race.name, nameSet.first) + ' ' + drawFromBag('name-last:'+race.name, nameSet.last);

  // Spellcasting: each class's spells are worked out at its own class level
  // (PHB multiclass rules: you learn and prepare spells for each class as if
  // single-classed; only the shared slot pool uses the combined level).
  const subclass = level1 >= cls.subclassLevel ? plannedSubclass : null;
  const subclass2 = cls2 && level2 >= cls2.subclassLevel ? pick(cls2.subclasses) : null;
  if(sorcLevel && (subclass === 'Draconic Bloodline' || subclass2 === 'Draconic Bloodline')){
    hpParts.push(['Draconic Resilience (+1 per Sorcerer level) \u00d7 '+sorcLevel, sorcLevel]);
    hp += sorcLevel;
  }

  // Skilled feat: three more skill proficiencies.
  if(feats.includes('Skilled')){
    const extra = pickN(Object.keys(SKILL_ABILITY).filter(sk => !uniqueSkills.includes(sk)), 3);
    uniqueSkills.push(...extra);
  }
  // Expertise: Rogue 1 and 6, Bard 3 and 10, two proficient skills each.
  const levelIn = name => cls.name === name ? level1 : (cls2 && cls2.name === name ? level2 : 0);
  const expertiseCount = (levelIn('Rogue') >= 1 ? 2 : 0) + (levelIn('Rogue') >= 6 ? 2 : 0) +
    (levelIn('Bard') >= 3 ? 2 : 0) + (levelIn('Bard') >= 10 ? 2 : 0);
  // Players pick Expertise in skills they're already good at: rank proficient
  // skills by their ability modifier (random among ties) and take the best.
  const expertise = uniqueSkills.map(sk => ({ sk, r: mod(scores[SKILL_ABILITY[sk]]) + Math.random() * 0.9 }))
    .sort((a, b) => b.r - a.r).slice(0, expertiseCount).map(x => x.sk);
  const spellBlock = buildSpellBlockForClass(cls, level1, scores, prof) ||
    buildThirdCasterSpellBlock(subclass, level1, scores, prof);
  const spellBlock2 = cls2 ? (buildSpellBlockForClass(cls2, level2, scores, prof) ||
    buildThirdCasterSpellBlock(subclass2, level2, scores, prof)) : null;

  const ac = computeArmorClass(scores, cls, gear, {
    classes: [cls.name].concat(cls2 ? [cls2.name] : []),
    draconic: subclass === 'Draconic Bloodline' || subclass2 === 'Draconic Bloodline',
    mediumArmorMaster: feats.includes('Medium Armor Master'),
  });

  return {
    name, level, race, bg, alignment, scores, prof, hp, ac, cls,
    speed: race.speed, skills: uniqueSkills, spellBlock, subclass, feats,
    expertise, extraSaves, scoreParts, hpParts,
    hook: pick(FLAVOR_HOOKS),
    gold: bg.gold,
    gear,
    multiclass: cls2 ? { cls2, level1, level2, subclass2, spellBlock2 } : null,
  };
}

/* ============================================================
   DUNGEON RUN — combat engine (v1: Fighter, Rogue supported;
   Cleric/Wizard to follow once this slice is tested and working)
   ============================================================ */

// Combat-relevant stats for weapons that generated characters can
// actually be given. Mirrors EQUIPMENT_REGISTRY's dice/damage type,
// which lives there as flavor text rather than structured data, so
// this is a small, separate, additive lookup rather than a change
// to the existing registry.
const WEAPON_COMBAT_STATS = {
  'Greataxe':       { dice:'1d12', type:'slashing',   finesse:false, ranged:false },
  'Handaxe':        { dice:'1d6',  type:'slashing',   finesse:false, ranged:false },
  'Javelin':        { dice:'1d6',  type:'piercing',   finesse:false, ranged:false },
  'Rapier':         { dice:'1d8',  type:'piercing',   finesse:true,  ranged:false },
  'Dagger':         { dice:'1d4',  type:'piercing',   finesse:true,  ranged:false },
  'Mace':           { dice:'1d6',  type:'bludgeoning',finesse:false, ranged:false },
  'Scimitar':       { dice:'1d6',  type:'slashing',   finesse:true,  ranged:false },
  'Longsword':      { dice:'1d8',  type:'slashing',   finesse:false, ranged:false },
  'Light Crossbow': { dice:'1d8',  type:'piercing',   finesse:false, ranged:true },
  'Shortsword':     { dice:'1d6',  type:'piercing',   finesse:true,  ranged:false },
  'Dart':           { dice:'1d4',  type:'piercing',   finesse:true,  ranged:true },
  'Longbow':        { dice:'1d8',  type:'piercing',   finesse:false, ranged:true },
  'Quarterstaff':   { dice:'1d6',  type:'bludgeoning',finesse:false, ranged:false },
  'Shortbow':       { dice:'1d6',  type:'piercing',   finesse:false, ranged:true },
  // Named magic weapons — same base stats as their mundane
  // counterpart, since the elemental effect (see
  // DUNGEON_NAMED_WEAPON_RIDERS below) is bonus damage riding on top
  // of the normal attack, not a replacement for it.
  'Dagger of Flames':      { dice:'1d4',  type:'piercing',   finesse:true,  ranged:false },
  'Frostbite Shortsword':  { dice:'1d6',  type:'piercing',   finesse:true,  ranged:false },
  'Venomfang Rapier':      { dice:'1d8',  type:'piercing',   finesse:true,  ranged:false },
  'Thunderous Mace':       { dice:'1d6',  type:'bludgeoning',finesse:false, ranged:false },
  'Shadowbite Longsword':  { dice:'1d8',  type:'slashing',   finesse:false, ranged:false },
  'Sunfire Scimitar':      { dice:'1d6',  type:'slashing',   finesse:true,  ranged:false },
  'Bow of Poison':         { dice:'1d6',  type:'piercing',   finesse:false, ranged:true },
  'Stormbolt Crossbow':    { dice:'1d8',  type:'piercing',   finesse:false, ranged:true },
};

// Bonus elemental damage each named magic weapon adds on every hit,
// on top of its normal weapon damage — reuses the same rider
// mechanism Sneak Attack already relies on (action.damage.extra),
// just applied unconditionally per-hit rather than once per round.
const DUNGEON_NAMED_WEAPON_RIDERS = {
  'Dagger of Flames':     { dice:'1d6', type:'fire' },
  'Frostbite Shortsword': { dice:'1d6', type:'cold' },
  'Venomfang Rapier':     { dice:'1d6', type:'poison' },
  'Thunderous Mace':      { dice:'1d6', type:'thunder' },
  'Shadowbite Longsword': { dice:'1d6', type:'necrotic' },
  'Sunfire Scimitar':     { dice:'1d6', type:'radiant' },
  'Bow of Poison':        { dice:'1d6', type:'poison' },
  'Stormbolt Crossbow':   { dice:'1d6', type:'lightning' },
};

// Which weapons and armor each class can actually use, matching real
// 5e proficiencies. Fighter gets everything; Rogue gets simple
// weapons plus the finesse/light martial weapons (Rapier, Scimitar,
// Shortsword) and light armor only; Cleric gets simple weapons plus
// light/medium armor and shields; Wizard gets the narrow classic
// wizard weapon list (dagger, dart, quarterstaff, light crossbow)
// and no armor at all. Named magic weapons follow the same rule as
// their mundane counterpart (a Dagger of Flames is still a dagger
// for proficiency purposes).
const DUNGEON_CLASS_WEAPON_PROFICIENCY = {
  Fighter: new Set(Object.keys(WEAPON_COMBAT_STATS)),
  Rogue: new Set([
    'Handaxe','Javelin','Dagger','Mace','Light Crossbow','Dart','Quarterstaff','Shortbow',
    'Rapier','Scimitar','Shortsword',
    'Dagger of Flames','Thunderous Mace','Bow of Poison','Stormbolt Crossbow',
    'Frostbite Shortsword','Venomfang Rapier','Sunfire Scimitar',
  ]),
  Cleric: new Set([
    'Handaxe','Javelin','Dagger','Mace','Light Crossbow','Dart','Quarterstaff','Shortbow',
    'Dagger of Flames','Thunderous Mace','Bow of Poison','Stormbolt Crossbow',
  ]),
  Wizard: new Set([
    'Dagger','Dart','Quarterstaff','Light Crossbow',
    'Dagger of Flames','Stormbolt Crossbow',
  ]),
};
const DUNGEON_CLASS_ARMOR_PROFICIENCY = {
  Fighter: { armorTypes: ['light','medium','heavy'], shield: true },
  Rogue: { armorTypes: ['light'], shield: false },
  Cleric: { armorTypes: ['light','medium'], shield: true },
  Wizard: { armorTypes: [], shield: false },
};
function classCanUseWeapon(className, weaponName){
  const set = DUNGEON_CLASS_WEAPON_PROFICIENCY[className];
  return !!set && set.has(weaponName);
}
function classCanUseArmor(className, armorName){
  const prof = DUNGEON_CLASS_ARMOR_PROFICIENCY[className];
  const armor = ARMOR_TABLE[armorName];
  return !!prof && !!armor && prof.armorTypes.indexOf(armor.type) !== -1;
}

// Finds the first weapon in a character's gear that we have combat
// stats for. Generated characters carry a mix of weapons, armor, and
// packs in one flat list (see mundaneGear in generateCharacter), so
// this just walks it looking for a name match.
function findEquippedWeapon(character){
  for(const item of character.gear){
    if(WEAPON_COMBAT_STATS[item.name]) return item.name;
  }
  return null;
}

// All distinct weapons a character carries, not just the first
// match — lets the player genuinely choose which weapon to attack
// with (e.g. Fighter's Longsword vs their Light Crossbow) rather
// than always defaulting to whichever appears first in their gear.
function findAllWeapons(character){
  const seen = new Set();
  const names = [];
  for(const item of character.gear){
    if(WEAPON_COMBAT_STATS[item.name] && !seen.has(item.name)){
      seen.add(item.name);
      names.push(item.name);
    }
  }
  return names;
}

// Mirrors computeArmorClass()'s magicArmorBonus pattern — the +1/+2/+3
// Weapon items are generic ("whatever base weapon you're carrying"),
// not a specific physical weapon, so this checks gear for the
// highest matching enchantment rather than a named item.
function getMagicWeaponBonus(character){
  const names = character.gear.map(g => g.name);
  return names.reduce((best, n) => {
    const match = /^\+(\d) Weapon$/.exec(n);
    return match ? Math.max(best, Number(match[1])) : best;
  }, 0);
}

function weaponAttackAction(weaponName, opts){
  opts = opts || {};
  const stats = WEAPON_COMBAT_STATS[weaponName];
  const ability = (stats.finesse || stats.ranged) ? 'dex' : 'str';
  const magicBonus = opts.magicBonus || 0;
  const action = {
    id: 'weapon_' + weaponName.toLowerCase().replace(/\s+/g,'_'),
    name: weaponName + (magicBonus ? ' (+' + magicBonus + ')' : ''),
    slot: 'action',
    kind: 'attack',
    attackRoll: { ability, proficient: true, magicBonus },
    damage: { dice: stats.dice.split(' ')[0], bonusAbility: ability, type: stats.type, extra: [], magicBonus },
    target: 'enemy',
    resourceCost: null,
  };
  if(DUNGEON_NAMED_WEAPON_RIDERS[weaponName]){
    const rider = DUNGEON_NAMED_WEAPON_RIDERS[weaponName];
    action.damage.extra.push({ dice: rider.dice, type: rider.type }); // no condition — applies on every hit
  }
  return action;
}

// Fighter's Extra Attack progression — 2 attacks at level 5, 3 at
// level 11, 4 at level 20, matching CLASS_FEATURES exactly.
function fighterAttackCount(level){
  if(level >= 20) return 4;
  if(level >= 11) return 3;
  if(level >= 5) return 2;
  return 1;
}

// Fighter: weapon attack as the action, Second Wind as the bonus
// action. Second Wind is a real, existing level-1 Fighter feature
// already in CLASS_FEATURES (1d10 + fighter level) — reused here
// rather than inventing a separate combat-only version. Limited to
// once per combat (see the reset in beginDungeonEncounter) rather
// than the real rule's "once per short/long rest", since Dungeon Run
// has no rest mechanic at all — a fight is the natural unit here.
function buildFighterActions(character){
  const weapons = findAllWeapons(character);
  if(!weapons.length) weapons.push('Longsword');
  const magicBonus = getMagicWeaponBonus(character);
  const actions = weapons.map(name => {
    const a = weaponAttackAction(name, { magicBonus });
    a.attackCount = fighterAttackCount(character.level);
    return a;
  });
  actions.push({
    id: 'second_wind',
    name: 'Second Wind',
    slot: 'bonus',
    kind: 'heal',
    heal: { dice: '1d10', bonusAbility: null, flatBonus: character.level },
    target: 'self',
    resourceCost: { type:'limited_use', key:'second_wind', max:1, refresh:'combat' },
  });
  return actions;
}


// Rogue: weapon attack as the action. Sneak Attack is a deliberate
// house-rule departure from the real 5e rule (where it's a free
// rider on any hit, once per turn) — here it's its own standalone
// bonus-action strike, limited to once per combat, matching how
// Second Wind works for Fighter. Uses the Rogue's primary weapon for
// its to-hit and damage type, but its own Xd6 damage dice rather
// than the weapon's normal damage die. Cunning Action's Dash/
// Disengage/Hide options are all movement-related, which v1 combat
// doesn't model (no positioning), so that's still correctly absent.
function buildRogueActions(character){
  const weapons = findAllWeapons(character).filter(name => classCanUseWeapon('Rogue', name));
  if(!weapons.length) weapons.push('Shortsword');
  const magicBonus = getMagicWeaponBonus(character);
  const actions = weapons.map(name => weaponAttackAction(name, { magicBonus }));

  const primaryWeapon = weapons[0];
  const stats = WEAPON_COMBAT_STATS[primaryWeapon];
  const ability = (stats.finesse || stats.ranged) ? 'dex' : 'str';
  const dieCount = Math.ceil(character.level / 2);
  actions.push({
    id: 'sneak_attack',
    name: 'Sneak Attack',
    slot: 'bonus',
    kind: 'attack',
    attackRoll: { ability, proficient: true, magicBonus },
    damage: { dice: dieCount+'d6', bonusAbility: ability, type: stats.type, extra: [], magicBonus },
    target: 'enemy',
    resourceCost: { type:'limited_use', key:'sneak_attack', max:1, refresh:'combat' },
  });
  return actions;
}

// A curated subset of each caster's spell list that's actually usable
// in this v1 combat model (direct damage or healing only — no buffs,
// debuffs, or control spells yet, since those need duration tracking
// we haven't built). Mechanics here are pulled directly from this
// site's own SPELL_REGISTRY entries, not re-derived, so they stay
// consistent with what the Spellbook already shows for these spells.
// One simplification: Toll the Dead's "1d12 if target is already
// hurt" condition is flattened to a flat 1d8, since checking a
// target's missing-HP state mid-resolution isn't something the
// action schema supports yet — noted here rather than silently
// under-implemented.
const COMBAT_SPELL_DEFS = {
  'Sacred Flame': { level:0, slot:'action', kind:'save',
    save:{ ability:'dex', onFail:{ damage:{dice:'1d8', type:'radiant'} }, onSuccess:null } },
  'Toll the Dead': { level:0, slot:'action', kind:'save',
    save:{ ability:'wis', onFail:{ damage:{dice:'1d8', type:'necrotic'} }, onSuccess:null } },
  'Guiding Bolt': { level:1, slot:'action', kind:'attack', upcast:{dice:'1d6', perSlots:1},
    attackRoll:{ ability:null, proficient:true }, damage:{ dice:'4d6', bonusAbility:null, type:'radiant', extra:[] } },
  'Inflict Wounds': { level:1, slot:'action', kind:'attack', upcast:{dice:'1d10', perSlots:1},
    attackRoll:{ ability:null, proficient:true }, damage:{ dice:'3d10', bonusAbility:null, type:'necrotic', extra:[] } },
  'Cure Wounds': { level:1, slot:'action', kind:'heal', upcast:{dice:'1d8', perSlots:1},
    heal:{ dice:'1d8', bonusAbility:'spellcasting', target:'ally' } },
  'Healing Word': { level:1, slot:'bonus', kind:'heal', upcast:{dice:'1d4', perSlots:1},
    heal:{ dice:'1d4', bonusAbility:'spellcasting', target:'ally' } },
  'Fire Bolt': { level:0, slot:'action', kind:'attack',
    attackRoll:{ ability:null, proficient:true }, damage:{ dice:'1d10', bonusAbility:null, type:'fire', extra:[] } },
  'Magic Missile': { level:1, slot:'action', kind:'attack', upcast:{dice:'1d4+1', perSlots:1},
    attackRoll:{ ability:null, proficient:true, auto:true }, damage:{ dice:'3d4+3', bonusAbility:null, type:'force', extra:[] } },
  'Burning Hands': { level:1, slot:'action', kind:'save', upcast:{dice:'1d6', perSlots:1},
    save:{ ability:'dex', onFail:{ damage:{dice:'3d6', type:'fire'} }, onSuccess:{ damage:{dice:'3d6', type:'fire', half:true} } } },
  'Chromatic Orb': { level:1, slot:'action', kind:'attack', upcast:{dice:'1d8', perSlots:1},
    attackRoll:{ ability:null, proficient:true }, damage:{ dice:'3d8', bonusAbility:null, type:'force', extra:[] } },
  'Acid Splash': { level:0, slot:'action', kind:'save',
    save:{ ability:'dex', onFail:{ damage:{dice:'1d6', type:'acid'} }, onSuccess:null } },
  'Chill Touch': { level:0, slot:'action', kind:'attack',
    attackRoll:{ ability:null, proficient:true }, damage:{ dice:'1d8', bonusAbility:null, type:'necrotic', extra:[] } },
  'Frostbite': { level:0, slot:'action', kind:'save',
    save:{ ability:'con', onFail:{ damage:{dice:'1d6', type:'cold'} }, onSuccess:null } },
  'Poison Spray': { level:0, slot:'action', kind:'save',
    save:{ ability:'con', onFail:{ damage:{dice:'1d12', type:'poison'} }, onSuccess:null } },
  'Ray of Frost': { level:0, slot:'action', kind:'attack',
    attackRoll:{ ability:null, proficient:true }, damage:{ dice:'1d8', bonusAbility:null, type:'cold', extra:[] } },
  'Shocking Grasp': { level:0, slot:'action', kind:'attack',
    attackRoll:{ ability:null, proficient:true }, damage:{ dice:'1d8', bonusAbility:null, type:'lightning', extra:[] } },
  'Word of Radiance': { level:0, slot:'action', kind:'save',
    save:{ ability:'con', onFail:{ damage:{dice:'1d6', type:'radiant'} }, onSuccess:null } },
  'Infestation': { level:0, slot:'action', kind:'save',
    save:{ ability:'con', onFail:{ damage:{dice:'1d6', type:'poison'} }, onSuccess:null } },
  // Level 2-5 additions. A caster's combat damage should scale with
  // character level the same way Fighter/Rogue's does — this closes
  // that gap. Two honest simplifications, noted rather than hidden:
  // Spiritual Weapon deals force damage from a floating weapon, but
  // here it's just resolved as the caster's own bonus-action attack.
  // Scorching Ray's three separate ray attacks are combined into one
  // attack roll for 6d6 (the sum of three 2d6 hits) rather than three
  // independent rolls, since the schema resolves one roll per action.
  // Flame Strike's fire+radiant split is likewise combined into a
  // single 8d6 fire roll rather than two separate damage types.
  'Spiritual Weapon': { level:2, slot:'bonus', kind:'attack', upcast:{dice:'1d8', perSlots:2},
    attackRoll:{ ability:null, proficient:true }, damage:{ dice:'1d8', bonusAbility:'spellcasting', type:'force', extra:[] } },
  'Scorching Ray': { level:2, slot:'action', kind:'attack', upcast:{dice:'2d6', perSlots:1},
    attackRoll:{ ability:null, proficient:true }, damage:{ dice:'6d6', bonusAbility:null, type:'fire', extra:[] } },
  'Shatter': { level:2, slot:'action', kind:'save', upcast:{dice:'1d8', perSlots:1},
    save:{ ability:'con', onFail:{ damage:{dice:'3d8', type:'thunder'} }, onSuccess:{ damage:{dice:'3d8', type:'thunder', half:true} } } },
  'Fireball': { level:3, slot:'action', kind:'save', upcast:{dice:'1d6', perSlots:1},
    save:{ ability:'dex', onFail:{ damage:{dice:'8d6', type:'fire'} }, onSuccess:{ damage:{dice:'8d6', type:'fire', half:true} } } },
  'Lightning Bolt': { level:3, slot:'action', kind:'save', upcast:{dice:'1d6', perSlots:1},
    save:{ ability:'dex', onFail:{ damage:{dice:'8d6', type:'lightning'} }, onSuccess:{ damage:{dice:'8d6', type:'lightning', half:true} } } },
  'Blight': { level:4, slot:'action', kind:'save',
    save:{ ability:'con', onFail:{ damage:{dice:'8d8', type:'necrotic'} }, onSuccess:{ damage:{dice:'8d8', type:'necrotic', half:true} } } },
  'Flame Strike': { level:5, slot:'action', kind:'save', upcast:{dice:'1d6', perSlots:1},
    save:{ ability:'dex', onFail:{ damage:{dice:'8d6', type:'fire'} }, onSuccess:{ damage:{dice:'8d6', type:'fire', half:true} } } },
  'Cone of Cold': { level:5, slot:'action', kind:'save', upcast:{dice:'1d8', perSlots:1},
    save:{ ability:'con', onFail:{ damage:{dice:'8d8', type:'cold'} }, onSuccess:{ damage:{dice:'8d8', type:'cold', half:true} } } },
  'Mass Cure Wounds': { level:5, slot:'action', kind:'heal', upcast:{dice:'1d8', perSlots:1},
    heal:{ dice:'3d8', bonusAbility:'spellcasting', target:'ally' } },
  // Wizard-only. The real spell conjures six floating meteors from
  // one action-cost cast, then lets you launch one or two as a bonus
  // action on later turns — a "summon a pool, then spend from it"
  // mechanic this schema doesn't model. Simplified here to a
  // standalone bonus-action attack for one meteor's worth of damage
  // (2d6 fire) each turn, which is the honest core of what the spell
  // gives a Wizard in a fight: unlike every other class, Wizard had
  // no bonus-action combat option at all in this system, which
  // simulation confirmed was leaving them well behind Cleric despite
  // near-identical HP once spell coverage was otherwise equal.
  'Melf\u2019s Minute Meteors': { level:3, slot:'bonus', kind:'attack',
    attackRoll:{ ability:null, proficient:true }, damage:{ dice:'2d6', bonusAbility:null, type:'fire', extra:[] } },
};

// Shared by Cleric and Wizard. Looks at what the character actually
// rolled (cantrips + known spells), matches against the curated combat
// list above, and fills in the caster's own spellcasting ability and
// available slots per option. A caster always has at least one cantrip
// action (no resource cost), so there's no "stuck with nothing to do"
// case once at least one combat cantrip is known — the fallback below
// only fires in the rare case none of the known spells overlap with
// this curated list at all.
function buildCasterActions(character){
  const sb = character.spellBlock;
  const actions = [];
  if(sb){
    const ability = sb.ability;
    const knownNames = [].concat(sb.cantrips || [], sb.known || []);
    for(const name of knownNames){
      const def = COMBAT_SPELL_DEFS[name];
      if(!def) continue;
      const action = JSON.parse(JSON.stringify(def)); // deep copy, the def is a shared template
      action.id = 'spell_' + name.toLowerCase().replace(/\s+/g,'_');
      action.name = name;
      action.target = (action.kind === 'heal') ? 'ally' : 'enemy';
      if(action.kind === 'attack' && action.attackRoll) action.attackRoll.ability = ability;
      if(action.kind === 'heal' && action.heal) action.heal.bonusAbility = ability;
      if(action.level > 0) action.resourceCost = { type:'spell_slot', level: action.level };
      delete action.level;
      actions.push(action);
    }
  }
  // Weapon attacks for anything the character is actually carrying
  // that their class is proficient with — a Cleric with a Mace (or
  // one they later find) should be able to swing it, same as any
  // other class. Previously this function only ever built spell
  // actions, so a caster's own weapons never showed up at all.
  const clsName = character.cls.name;
  const magicBonus = getMagicWeaponBonus(character);
  const carriedWeapons = findAllWeapons(character).filter(name => classCanUseWeapon(clsName, name));
  for(const name of carriedWeapons){
    actions.push(weaponAttackAction(name, { magicBonus }));
  }
  if(!actions.some(a => a.slot === 'action')){
    // Fallback: no known spell overlapped the curated combat list,
    // and no proficient weapon either. An unarmed strike keeps the
    // character from being stuck with nothing to do, matching the
    // real 5e unarmed strike (1 + STR).
    actions.push({
      id:'unarmed_strike', name:'Unarmed Strike', slot:'action', kind:'attack',
      attackRoll:{ ability:'str', proficient:true },
      damage:{ dice:'1d1', bonusAbility:'str', type:'bludgeoning', extra:[] },
      target:'enemy', resourceCost:null,
    });
  }
  return actions;
}

// Dispatches by class. Barbarian/Druid/etc. still intentionally
// unimplemented — throws clearly rather than silently returning an
// empty or wrong action set.
function getAvailableActions(character){
  if(character.multiclass) throw new Error('Dungeon Run does not support multiclassed characters yet.');
  const clsName = character.cls.name;
  if(clsName === 'Fighter') return buildFighterActions(character);
  if(clsName === 'Rogue') return buildRogueActions(character);
  if(clsName === 'Cleric' || clsName === 'Wizard') return buildCasterActions(character);
  throw new Error('getAvailableActions: ' + clsName + ' is not a supported Dungeon Run class.');
}

/* ---------- Combat resolution ---------- */

// Parses "XdY", "XdY+Z", "XdY-Z" into an actual roll, reusing the
// site's existing rollDice(n, sides) rather than a new RNG path.
function rollDiceString(str, opts){
  opts = opts || {};
  const m = String(str).match(/^(\d+)d(\d+)([+-]\d+)?$/);
  if(!m) throw new Error('Bad dice string: ' + str);
  const n = parseInt(m[1], 10) * (opts.crit ? 2 : 1);
  const sides = parseInt(m[2], 10);
  const bonus = m[3] ? parseInt(m[3], 10) : 0;
  return rollDice(n, sides) + bonus;
}

function abilityMod(character, abilityKey){
  if(!abilityKey || abilityKey === 'spellcasting') return 0; // resolved separately, see resolveAction
  return mod(character.scores[abilityKey]);
}

// Monster Forge stores attacks as narrative text ("Melee Weapon
// Attack: +5 to hit, ... Hit: 5 (1d6+3) piercing damage.") rather
// than structured data, so this extracts what combat resolution
// needs. Verified against all 361 attack-style actions across the
// full monster registry (99.4% parse rate); the two exceptions were
// genuinely non-standard effects (a grapple, a save-based "attack"),
// not parser failures, so the fallback below only ever fires for
// those rare, legitimately-different cases.
function parseMonsterAttack(action){
  const re = /(?:Melee|Ranged) (?:Weapon|Spell) Attack: ([+-]\d+) to hit,.*?Hit: \d+(?: \((\d+)d(\d+)([+-]\d+)?\))? (\w+) damage/;
  const match = action.desc.match(re);
  if(!match){
    return { toHitBonus: 3, dice: '1d6', type: 'bludgeoning' }; // safe generic fallback
  }
  const [, toHit, n, sides, bonus, type] = match;
  const dice = n ? (n + 'd' + sides + (bonus || '')) : '1d1'; // flat-damage attacks (e.g. "Hit: 1 piercing")
  return { toHitBonus: parseInt(toHit, 10), dice, type };
}

function findMonsterAttackAction(monster){
  return (monster.actions || []).find(a => a.desc.includes('to hit'));
}

// Finds the highest spell slot level the caster has available that's
// at or above the given base level — the slot actually used for a
// cast, which may be higher than the spell's minimum if no lower
// slot remains (or if upcasting is simply the better play).
function pickBestSlotLevel(actor, baseLevel){
  const slots = actor.resources.spell_slots || {};
  let best = null;
  for(const lvl of Object.keys(slots)){
    const n = Number(lvl);
    if(n >= baseLevel && slots[lvl] > 0 && (best === null || n > best)) best = n;
  }
  return best;
}

function canAfford(actor, cost){
  if(!cost) return true;
  if(cost.type === 'spell_slot') return pickBestSlotLevel(actor, cost.level) !== null;
  if(cost.type === 'limited_use') return (actor.resources[cost.key] || 0) > 0;
  if(cost.type === 'inventory_item') return !!(actor.inventory && actor.inventory.some(it => it.name === cost.name));
  return true;
}

// Returns the slot level actually spent (for spell_slot costs) so
// the caller can apply the right upcast bonus, or null for anything
// else. Always spends the highest available slot at or above the
// spell's base level — matching a v1 "use the biggest hammer
// available" policy rather than offering a slot-choice UI.
function spendResource(actor, cost){
  if(!cost) return null;
  if(cost.type === 'spell_slot'){
    const slotUsed = pickBestSlotLevel(actor, cost.level);
    if(slotUsed !== null) actor.resources.spell_slots[slotUsed] -= 1;
    return slotUsed;
  }
  if(cost.type === 'limited_use') actor.resources[cost.key] -= 1;
  if(cost.type === 'inventory_item' && actor.inventory){
    const idx = actor.inventory.findIndex(it => it.name === cost.name);
    if(idx !== -1) actor.inventory.splice(idx, 1);
  }
  return null;
}

// Curated effects for items a Dungeon Run character can actually use
// mid-fight — matches DUNGEON_LOOT_POOL's item list. Drinking a
// potion is an action in the real rules (not a bonus action), so
// these compete with spells/weapons for the same action slot rather
// than being a separate resource.
const DUNGEON_ITEM_EFFECTS = {
  'Potion of Healing': { slot:'bonus', kind:'heal', heal:{ dice:'2d4', bonusAbility:null, flatBonus:2 } },
  'Potion of Greater Healing': { slot:'bonus', kind:'heal', heal:{ dice:'4d4', bonusAbility:null, flatBonus:4 } },
  'Potion of Fire Breath': { slot:'bonus', kind:'save',
    save:{ ability:'dex', onFail:{ damage:{dice:'4d6', type:'fire'} }, onSuccess:{ damage:{dice:'4d6', type:'fire', half:true} } } },
  'Oil of Sharpness': { slot:'bonus', kind:'buff' }, // applying a weapon coating isn't modeled yet; excluded from getUsableItemActions below
};

// Builds one action per usable item actually in the run's inventory
// (deduplicated by name — having three potions doesn't offer three
// buttons, using one just doesn't remove the option if more remain).
// Oil of Sharpness is deliberately excluded: it's a passive buff this
// engine doesn't model yet, not a direct damage/heal effect.
function getUsableItemActions(inventory){
  const seen = new Set();
  const actions = [];
  for(const item of (inventory || [])){
    const def = DUNGEON_ITEM_EFFECTS[item.name];
    if(!def || def.kind === 'buff' || seen.has(item.name)) continue;
    seen.add(item.name);
    actions.push(Object.assign({
      id: 'item_' + item.name.toLowerCase().replace(/\s+/g,'_'),
      name: item.name,
      target: def.kind === 'heal' ? 'self' : 'enemy',
      resourceCost: { type:'inventory_item', name:item.name },
    }, JSON.parse(JSON.stringify(def))));
  }
  return actions;
}

// Resolves one action against one target, mutating target.hp and the
// actor's resources/round-tracking in place. Returns a plain result
// object for logging/UI — never throws for a miss or a failed save,
// those are normal outcomes, not errors.
// One weapon/spell attack roll against one target — the original
// single-attack logic, now callable multiple times per action for
// Extra Attack. Sneak Attack's "first attack this round" condition
// still applies correctly across multiple swings from the same
// action, since actor.hasAttackedThisRound only flips true once.
function resolveSingleAttack(actor, action, target){
  const isAuto = action.attackRoll && action.attackRoll.auto;
  let crit = false, hit = isAuto;
  let rawRoll = null, toHit = null;
  if(!isAuto){
    rawRoll = roll(20) + 1;
    crit = (rawRoll === 20);
    toHit = rawRoll + abilityMod(actor, action.attackRoll.ability)
                + (action.attackRoll.proficient ? actor.prof : 0)
                + (action.attackRoll.magicBonus || 0);
    hit = crit || toHit >= target.ac;
  }
  if(!hit) return { hit:false, damage:0, rawRoll, toHit, targetAc:target.ac };

  let dmg = rollDiceString(action.damage.dice, { crit }) + abilityMod(actor, action.damage.bonusAbility) + (action.damage.magicBonus || 0);
  const riders = [];
  for(const rider of (action.damage.extra || [])){
    const applies = !rider.condition || (rider.condition === 'sneak_attack' && !actor.hasAttackedThisRound);
    if(applies){
      const riderDmg = rollDiceString(rider.dice, { crit });
      dmg += riderDmg;
      riders.push({ type: rider.type, amount: riderDmg });
    }
  }
  actor.hasAttackedThisRound = true;
  target.hp = Math.max(0, target.hp - dmg);
  return { hit:true, crit, damage:dmg, riders, rawRoll, toHit, targetAc:target.ac };
}

function resolveAction(actor, action, target, combatState){
  if(!canAfford(actor, action.resourceCost)){
    return { ok:false, reason:'cannot_afford' };
  }
  const slotUsed = spendResource(actor, action.resourceCost);

  // How many "extra dice" this cast earns from being cast at a
  // higher slot than the spell's base level. 0 for non-spell actions
  // (weapon attacks), for spells cast at their base slot, and for
  // the handful of spells (like Blight) that genuinely don't scale
  // with upcasting in the real rules — those just never get an
  // `upcast` field on their COMBAT_SPELL_DEFS entry.
  let upcastInstances = 0;
  if(action.upcast && action.resourceCost && slotUsed != null){
    const levelsAbove = slotUsed - action.resourceCost.level;
    upcastInstances = Math.floor(levelsAbove / (action.upcast.perSlots || 1));
  }

  if(action.kind === 'attack'){
    const attackCount = action.attackCount || 1;
    const attacks = [];
    for(let i=0;i<attackCount;i++){
      if(target.hp <= 0) break; // target already down — stop swinging
      attacks.push(resolveSingleAttack(actor, action, target));
    }
    let totalDamage = attacks.reduce((sum,a) => sum + (a.damage||0), 0);
    if(upcastInstances > 0 && attacks.some(a=>a.hit) && target.hp > 0){
      let upcastDamage = 0;
      for(let i=0;i<upcastInstances;i++) upcastDamage += rollDiceString(action.upcast.dice);
      totalDamage += upcastDamage;
      target.hp = Math.max(0, target.hp - upcastDamage);
    }
    const anyHit = attacks.some(a => a.hit);
    return {
      ok:true, hit:anyHit, damage:totalDamage,
      damageType: action.damage.type, attacks,
      actorName:actor.name, targetName:target.name,
    };
  }

  if(action.kind === 'save'){
    const casterAbility = actor.spellBlock ? actor.spellBlock.ability : 'wis';
    const dc = 8 + actor.prof + abilityMod(actor, casterAbility);
    const saveRoll = roll(20) + 1 + abilityMod(target, action.save.ability);
    const succeeded = saveRoll >= dc;
    const outcome = succeeded ? action.save.onSuccess : action.save.onFail;
    if(!outcome || !outcome.damage) return { ok:true, saved:succeeded, damage:0, saveRoll, dc, actorName:actor.name, targetName:target.name };
    let dmg = rollDiceString(outcome.damage.dice);
    for(let i=0;i<upcastInstances;i++) dmg += rollDiceString(action.upcast.dice);
    if(outcome.damage.half) dmg = Math.floor(dmg / 2);
    target.hp = Math.max(0, target.hp - dmg);
    return { ok:true, saved:succeeded, damage:dmg, damageType:outcome.damage.type, saveRoll, dc, actorName:actor.name, targetName:target.name };
  }

  if(action.kind === 'heal'){
    const bonus = action.heal.bonusAbility === 'spellcasting'
      ? abilityMod(actor, actor.spellBlock ? actor.spellBlock.ability : null)
      : (action.heal.flatBonus != null ? action.heal.flatBonus : abilityMod(actor, action.heal.bonusAbility));
    let healed = rollDiceString(action.heal.dice) + bonus;
    for(let i=0;i<upcastInstances;i++) healed += rollDiceString(action.upcast.dice);
    target.hp = Math.min(target.maxHp, target.hp + healed);
    return { ok:true, healed, actorName:actor.name, targetName:target.name };
  }

  throw new Error('resolveAction: unknown action kind ' + action.kind);
}

// Simple v1 enemy AI: attacks the lowest-HP living player-side
// target, or the sole player if solo. Uses the monster's own first
// parseable attack action. Supports an optional enemy.attackCount
// for boss-style multiattack (regular Monster Forge monsters don't
// set this, so they default to exactly the single-attack behavior
// this always had).
function resolveEnemyTurn(enemy, combatants){
  const targets = combatants.filter(c => c.side === 'player' && c.hp > 0);
  if(targets.length === 0) return { ok:false, reason:'no_targets' };
  const target = targets.reduce((lowest, c) => c.hp < lowest.hp ? c : lowest, targets[0]);

  const attackAction = findMonsterAttackAction(enemy);
  if(!attackAction) return { ok:false, reason:'no_attack_action' };
  const parsed = parseMonsterAttack(attackAction);

  const action = {
    kind:'attack', target:'enemy',
    attackRoll:{ ability:null, proficient:false, flatBonus: parsed.toHitBonus },
    damage:{ dice: parsed.dice, bonusAbility:null, type: parsed.type, extra:[] },
    resourceCost: null,
  };
  const attackCount = enemy.attackCount || 1;
  const attacks = [];
  for(let i=0;i<attackCount;i++){
    if(target.hp <= 0) break;
    attacks.push(resolveMonsterAction(enemy, action, target));
  }
  const totalDamage = attacks.reduce((sum,a) => sum + (a.damage||0), 0);
  const anyHit = attacks.some(a => a.hit);
  return { ok:true, hit:anyHit, damage:totalDamage, damageType: action.damage.type, attacks, actorName:enemy.name, targetName:target.name, actionName: attackAction.name };
}

// Monster to-hit uses a flat published bonus rather than an ability
// score + proficiency (that's already baked into the stat block), so
// this is a thin variant of resolveAction's attack branch rather than
// forcing monsters through the character-shaped ability-mod path.
function resolveMonsterAction(actor, action, target){
  const rawRoll = roll(20) + 1;
  const crit = (rawRoll === 20);
  const toHit = rawRoll + action.attackRoll.flatBonus;
  const hit = crit || toHit >= target.ac;
  if(!hit) return { ok:true, hit:false, actorName:actor.name, targetName:target.name, rawRoll, toHit, targetAc:target.ac };
  const dmg = rollDiceString(action.damage.dice, { crit });
  target.hp = Math.max(0, target.hp - dmg);
  return { ok:true, hit:true, crit, damage:dmg, damageType:action.damage.type, actorName:actor.name, targetName:target.name, rawRoll, toHit, targetAc:target.ac };
}

function startCombat(player, enemyList){
  const combatants = [
    Object.assign({ side:'player', hasAttackedThisRound:false, maxHp: player.hp }, player),
    ...enemyList.map((m, i) => Object.assign({}, m, {
      side:'enemy', name: enemyList.length > 1 ? m.name + ' ' + (i+1) : m.name,
      hp: m.hp, maxHp: m.hp, hasAttackedThisRound:false,
    })),
  ];
  for(const c of combatants) c.initiative = roll(20) + 1 + abilityMod(c, 'dex');
  combatants.sort((a, b) => b.initiative - a.initiative || abilityMod(b,'dex') - abilityMod(a,'dex'));
  return { combatants, round: 1, log: [] };
}

function isCombatOver(combatState){
  const playerAlive = combatState.combatants.some(c => c.side === 'player' && c.hp > 0);
  const enemiesAlive = combatState.combatants.some(c => c.side === 'enemy' && c.hp > 0);
  if(!playerAlive) return 'defeat';
  if(!enemiesAlive) return 'victory';
  return null;
}

function startNewRound(combatState){
  combatState.round += 1;
  for(const c of combatState.combatants) c.hasAttackedThisRound = false;
}

/* ---------- Solo encounter difficulty scaling ---------- */

// Per-character XP thresholds from the DMG's "XP Thresholds by
// Character Level" table (p.82). These are already per-character —
// the DMG has you multiply by party size for a group, so for a solo
// Dungeon Run character these apply directly with no adjustment.
const SOLO_XP_THRESHOLDS = {
  1:{easy:25,medium:50,hard:75,deadly:100},       2:{easy:50,medium:100,hard:150,deadly:200},
  3:{easy:75,medium:150,hard:225,deadly:400},     4:{easy:125,medium:250,hard:375,deadly:500},
  5:{easy:250,medium:500,hard:750,deadly:1100},   6:{easy:300,medium:600,hard:900,deadly:1400},
  7:{easy:350,medium:750,hard:1100,deadly:1700},  8:{easy:450,medium:900,hard:1400,deadly:2100},
  9:{easy:550,medium:1100,hard:1600,deadly:2400}, 10:{easy:600,medium:1200,hard:1900,deadly:2800},
  11:{easy:800,medium:1600,hard:2400,deadly:3600},12:{easy:1000,medium:2000,hard:3000,deadly:4500},
  13:{easy:1100,medium:2200,hard:3400,deadly:5100},14:{easy:1250,medium:2500,hard:3800,deadly:5700},
  15:{easy:1400,medium:2800,hard:4300,deadly:6400},16:{easy:1600,medium:3200,hard:4800,deadly:7200},
  17:{easy:2000,medium:3900,hard:5900,deadly:8800},18:{easy:2100,medium:4200,hard:6300,deadly:9500},
  19:{easy:2400,medium:4900,hard:7300,deadly:10900},20:{easy:2800,medium:5700,hard:8500,deadly:12700},
};

// Average result of a dice string like "5d6+4", for filtering
// purposes — not an actual roll. Reuses the same parsing shape as
// rollDiceString rather than a separate implementation.
function averageDiceString(str){
  const m = String(str).match(/^(\d+)d(\d+)([+-]\d+)?$/);
  if(!m) return 0;
  const n = parseInt(m[1],10), sides = parseInt(m[2],10), bonus = m[3] ? parseInt(m[3],10) : 0;
  return n * (sides+1)/2 + bonus;
}

// Estimates a monster's expected damage on a single hit, from its
// first parseable attack action. Deliberately single-hit, not
// Multiattack-adjusted: resolveEnemyTurn() only ever resolves one
// attack per enemy turn right now (Multiattack itself isn't wired up
// yet), so this filter is calibrated against what combat actually
// does today rather than a truer per-round total that would only be
// accurate once Multiattack is implemented.
function estimateMonsterHitDamage(monster){
  const action = findMonsterAttackAction(monster);
  if(!action) return 0;
  return averageDiceString(parseMonsterAttack(action).dice);
}

// Picks a single monster whose XP sits near the "Medium" threshold
// for a solo character at this level (see SOLO_XP_THRESHOLDS above),
// and whose single-hit damage isn't disproportionate to the
// character's own HP pool. XP alone doesn't capture how swingy a
// monster is — a high-damage, low-HP-pool matchup (a squishy caster
// against a hard-hitting brute) can two-shot a character even when
// the XP value looks fair on paper, since the DMG's thresholds
// assume that kind of hit gets absorbed across a 4-person party, not
// survived solo. Capping single-hit damage at 40% of max HP keeps a
// worst-case unlucky streak (two hits in a row) survivable rather
// than an instant, un-counterplayable death.

// Mundane pack animals and ambient wildlife that share low-level XP
// values with genuine weak threats (Kobold, Shrieker) but were added
// to the registry as NPC/environmental flavor, not as dungeon
// encounters — a level-1 character should never roll "Mule" or
// "Camel" as their opponent. Deliberately a short, curated list
// rather than a data-driven heuristic (like "low CR"), since that
// would risk also excluding genuinely weak but real monsters.
// Mundane, non-threatening beasts excluded from every generator that
// rolls combat encounters (Encounter Generator, Monster Forge's
// random roll, Dungeon Run) — nobody wants "you encounter a camel."
// Predators, venomous animals, and "Giant" variants all stay in the
// pool since those are genuinely dangerous or distinct monsters, not
// reskinned pack animals — a Giant Rat or Giant Spider is a real
// threat even though a plain Rat or regular Spider isn't.
const MUNDANE_BEAST_EXCLUDE = new Set([
  'Mule','Camel','Horse','Draft Horse','Riding Horse','Pony','Warhorse',
  'Rat','Raven','Cat','Goat','Hawk','Owl','Vulture','Jackal','Mastiff',
  'Octopus','Badger','Weasel','Bat','Lizard','Frog','Crab','Deer',
  'Boar','Ape','Elephant','Rhinoceros','Elk','Giant Elk','Spider',
]);
// Kept as an alias — Dungeon Run's own code still refers to this name.
const DUNGEON_ENCOUNTER_EXCLUDE = MUNDANE_BEAST_EXCLUDE;

function pickSoloEncounterMonster(characterLevel, characterMaxHp){
  const t = SOLO_XP_THRESHOLDS[Math.min(20, Math.max(1, characterLevel))];
  const lo = t.easy, hi = t.hard; // between Easy and Hard, centered on Medium
  const dmgCap = characterMaxHp * 0.4;

  const byXpAndDamage = Object.entries(MONSTER_REGISTRY).filter(([name, m]) =>
    !DUNGEON_ENCOUNTER_EXCLUDE.has(name) && m.xp >= lo && m.xp <= hi && estimateMonsterHitDamage(m) <= dmgCap);
  if(byXpAndDamage.length){
    const [name, m] = byXpAndDamage[roll(byXpAndDamage.length)];
    return Object.assign({ name }, m);
  }
  // Relax the XP band first, keeping the damage cap — a slightly
  // weaker or stronger fight is a better fallback than one that can
  // two-shot the character.
  const byDamageOnly = Object.entries(MONSTER_REGISTRY).filter(([name, m]) =>
    !DUNGEON_ENCOUNTER_EXCLUDE.has(name) && m.xp <= hi * 1.5 && estimateMonsterHitDamage(m) <= dmgCap);
  if(byDamageOnly.length){
    const [name, m] = byDamageOnly[roll(byDamageOnly.length)];
    return Object.assign({ name }, m);
  }
  // Last resort: no monster in range respects the damage cap at all
  // (plausible for a very low-HP 1st-level caster). Fall back to the
  // weakest XP-appropriate option available rather than crash.
  const weakest = Object.entries(MONSTER_REGISTRY)
    .filter(([name, m]) => !DUNGEON_ENCOUNTER_EXCLUDE.has(name) && m.xp <= hi * 1.5)
    .sort((a,b) => estimateMonsterHitDamage(a[1]) - estimateMonsterHitDamage(b[1]));
  const [name, m] = weakest[0];
  return Object.assign({ name }, m);
}

/* ---------- Dungeon Run: starting a fresh run ---------- */

const DUNGEON_RUN_CLASSES = ['Fighter','Rogue','Cleric','Wizard'];

// Reads a fresh set of actions and builds the resource pool a
// character needs to track through combat (spell slots, Second
// Wind uses, etc.) — full values, since this always runs against a
// brand-new level-1 character. The same shape resolveAction()
// already reads from and spendResource() already writes to.
function initCombatResources(actions){
  const resources = { spell_slots: {} };
  for(const a of actions){
    if(a.resourceCost && a.resourceCost.type === 'spell_slot'){
      // Level 1 characters have exactly 2 first-level slots (Cleric/
      // Wizard both use the standard PHB level-1 caster table); no
      // other slot levels exist yet to initialize at this point.
      resources.spell_slots[a.resourceCost.level] = 2;
    }
    if(a.resourceCost && a.resourceCost.type === 'limited_use'){
      resources[a.resourceCost.key] = a.resourceCost.max;
    }
  }
  return resources;
}

// Dungeon Run always starts at level 1 with a random race/background/
// alignment — the player only chooses class. This is deliberately its
// own generator, not a reuse of a My Rolls character: run characters
// are disposable by design (permadeath, per the run rules already
// agreed on), so there's no character-picking or exclusion-filtering
// step to build here at all.
// Guarantees the character knows at least one COMBAT_SPELL_DEFS spell
// at the given level, adding one if their randomly-rolled known list
// doesn't already include one. This exists specifically for Dungeon
// Run, not regular Character Forge generation (which should stay
// genuinely random) — diagnosed via simulation that 30/30 level-20
// Wizards had zero level-3+ combat spells available despite having
// slots up to 9th level, since known spells are drawn from a ~180
// spell pool where only a handful are combat-relevant. Fighter/Rogue
// never have this problem (their weapon is always guaranteed), so
// casters need the same guarantee for their spells to be a fair
// comparison. Specifically checks the action slot — a spell's main,
// every-turn damage option — rather than "any spell at this level",
// since some spells at this level (Melf's Minute Meteors) are
// bonus-slot options that shouldn't be able to satisfy the guarantee
// on their own and leave the action slot empty.
function ensureCombatSpellCoverage(character, level, slotType){
  slotType = slotType || 'action';
  const sb = character.spellBlock;
  if(!sb) return;
  const known = level === 0 ? sb.cantrips : sb.known;
  const alreadyCovered = known.some(name => {
    const def = COMBAT_SPELL_DEFS[name];
    return def && def.level === level && def.slot === slotType;
  });
  if(alreadyCovered) return;
  const choices = offerSpellChoices(character, level).filter(name => COMBAT_SPELL_DEFS[name].slot === slotType);
  if(choices.length) known.push(choices[roll(choices.length)]);
}

async function startDungeonRun(className){
  if(!DUNGEON_RUN_CLASSES.includes(className)){
    throw new Error('startDungeonRun: ' + className + ' is not a supported Dungeon Run class.');
  }
  const cls = CLASSES.find(c => c.name === className);
  const character = await generateCharacter(1, { cls });
  ensureCombatSpellCoverage(character, 0);
  ensureCombatSpellCoverage(character, 1);
  const actions = getAvailableActions(character);

  // Starting inventory: pull in any combat-useful item the character
  // already happened to roll as starting gear (a background can grant
  // a potion), then guarantee at least one Potion of Healing so no
  // run starts with zero usable items while waiting on the first win.
  const startingInventory = character.gear
    .filter(g => DUNGEON_ITEM_EFFECTS[g.name] && DUNGEON_ITEM_EFFECTS[g.name].kind !== 'buff')
    .map(g => ({ name: g.name, kind:'magic-item' }));
  if(!startingInventory.some(it => it.name === 'Potion of Healing')){
    startingInventory.push({ name:'Potion of Healing', kind:'magic-item' });
  }

  const run = {
    characterSnapshot: character,
    status: 'in-progress',
    runLevel: 1,
    runXp: 0,
    currentHp: character.hp,
    maxHp: character.hp,
    resources: initCombatResources(actions),
    runGold: 0,
    runInventory: startingInventory,
    shopInventory: [],
    xpApplied: false,
    step: 0,
    history: [],
  };
  restockDungeonShop(run);
  return run;
}

/* ---------- Dungeon Run: leveling up ---------- */

// Full-caster spell slots by character level (index 0 = 1st-level
// slots, index 8 = 9th-level slots). Verified against the standard
// PHB progression — Cleric and Wizard share this table, same as
// every other full caster.
const FULL_CASTER_SLOTS_BY_LEVEL = {
  1:[2],2:[3],3:[4,2],4:[4,3],5:[4,3,2],6:[4,3,3],7:[4,3,3,1],8:[4,3,3,2],
  9:[4,3,3,3,1],10:[4,3,3,3,2],11:[4,3,3,3,2,1],12:[4,3,3,3,2,1],
  13:[4,3,3,3,2,1,1],14:[4,3,3,3,2,1,1],15:[4,3,3,3,2,1,1,1],16:[4,3,3,3,2,1,1,1],
  17:[4,3,3,3,2,1,1,1,1],18:[4,3,3,3,3,1,1,1,1],19:[4,3,3,3,3,2,1,1,1],20:[4,3,3,3,3,2,2,1,1],
};

// Character levels where a full caster unlocks their first slot of a
// new spell level (3rd level spells at character level 5, and so on)
// — these are exactly the moments the spell-choice popup should fire.
const SPELL_TIER_UNLOCK_LEVELS = [3,5,7,9];

// Grows the run's character snapshot in place by exactly one level,
// per the "incremental growth, à la real D&D" design: same race,
// background, ability scores, gear, and already-known spells as
// before, just older. HP gain uses the same average-roll-rounded-up
// convention generateCharacter() already uses for consistency, and
// per the agreed rule, that HP gain heals the character by the same
// amount rather than just raising the ceiling. Returns the updated
// character alongside metadata describing what changed, so the
// caller (run-state code, eventually UI) can react — offer a spell
// choice, trigger the level-20 boss, etc. — without this function
// needing to know anything about Firestore or the UI itself.
// Real 5e ability score improvement levels — +2 total per level,
// prioritizing the class's main stat (cls.primary, the same order
// Character Forge uses for stat generation) first. Capped at 20 per
// stat (standard 5e max without magic items or epic boons); if the
// top-priority stat can't take the full +2 without exceeding the
// cap, the remainder spills to the next-priority stat rather than
// being wasted.
const DUNGEON_ASI_LEVELS = [4, 8, 12, 16, 19];
function applyAbilityScoreImprovement(character){
  let remaining = 2;
  const gains = {};
  for(const stat of character.cls.primary){
    if(remaining <= 0) break;
    const room = Math.max(0, 20 - character.scores[stat]);
    const gain = Math.min(remaining, room);
    if(gain > 0){
      character.scores[stat] += gain;
      gains[stat] = gain;
      remaining -= gain;
    }
  }
  return gains; // e.g. { str: 2 } or { str: 1, dex: 1 } if the first stat hit the cap
}

function levelUpDungeonRun(run){
  const character = run.characterSnapshot;
  const cls = character.cls;
  const newLevel = run.runLevel + 1;

  const dieAvg = Math.ceil((cls.hitDie/2) + 0.5);
  const conMod = mod(character.scores.con);
  const hpGain = Math.max(1, dieAvg + conMod);

  character.level = newLevel;
  character.hp += hpGain;
  character.prof = proficiencyBonus(newLevel);

  const abilityGains = DUNGEON_ASI_LEVELS.includes(newLevel) ? applyAbilityScoreImprovement(character) : null;
  // AC isn't otherwise recalculated on level-up, but a Dex increase
  // from an ASI needs to be reflected immediately, not just the next
  // time gear changes.
  character.ac = computeArmorClass(character.scores, character.cls, character.gear);

  let spellTierUnlocked = null;
  if(character.spellBlock){
    const slots = FULL_CASTER_SLOTS_BY_LEVEL[newLevel];
    character.spellBlock.maxSpellLevel = maxSpellLevelFull(newLevel);
    character.spellBlock.saveDC = 8 + character.prof + mod(character.scores[character.spellBlock.ability]);
    character.spellBlock.attackBonus = character.prof + mod(character.scores[character.spellBlock.ability]);
    // Refill slots to the new level's full values — levelling up
    // strengthens the character right away for what's next, matching
    // the same spirit as the HP heal rather than just raising a cap
    // the character can't yet benefit from.
    run.resources.spell_slots = {};
    slots.forEach((count, i) => { if(count > 0) run.resources.spell_slots[i+1] = count; });

    if(SPELL_TIER_UNLOCK_LEVELS.includes(newLevel)){
      spellTierUnlocked = maxSpellLevelFull(newLevel);
      // Auto-grants one option for now — once real UI exists to let
      // the player choose from offerSpellChoices() themselves, this
      // becomes the fallback for an unmade choice rather than the
      // only path. Without this, a newly-unlocked tier could sit
      // empty if the character's random known-spells roll didn't
      // happen to include anything from it.
      ensureCombatSpellCoverage(character, spellTierUnlocked);
      // Also try to guarantee a bonus-slot option at this level —
      // covers Cleric's Spiritual Weapon (level 2) and Wizard's
      // Melf's Minute Meteors (level 3). Simulation showed Wizard
      // was the only one of the 4 classes with zero bonus-action
      // combat value, leaving them well behind Cleric despite
      // near-identical HP once action-slot coverage was otherwise
      // equal. No-ops harmlessly for levels/classes with no
      // bonus-slot option in COMBAT_SPELL_DEFS.
      ensureCombatSpellCoverage(character, spellTierUnlocked, 'bonus');
    }
  }

  run.runLevel = newLevel;
  run.maxHp += hpGain;
  run.currentHp = Math.min(run.maxHp, run.currentHp + hpGain);

  return {
    hpGained: hpGain,
    newProf: character.prof,
    spellTierUnlocked, // null, or the newly-unlocked spell level (e.g. 2, 3, 4, 5)
    abilityGains, // null, or e.g. { str: 2 } / { str: 1, dex: 1 }
    bossLevel: newLevel === 20, // level 20 is the run's final fight, not a normal encounter
  };
}

// Offers 2-3 random options from the newly-unlocked spell tier, for
// the spell-choice popup to present. Doesn't mutate anything itself
// — the caller applies whichever the player picks (adding it to a
// run-scoped learned-spells list, separate from the character's
// original spellBlock.known, matching the "additive until banked"
// principle already used for run gold/loot).
function offerSpellChoices(character, spellLevel){
  const pool = Object.entries(COMBAT_SPELL_DEFS)
    .filter(([name, def]) => def.level === spellLevel)
    .map(([name]) => name)
    .filter(name => {
      // Only offer spells this class can actually cast — reuse the
      // same SPELL_CLASSES tagging the Spellbook and Character Forge
      // already rely on, so this stays consistent with them.
      const classes = SPELL_CLASSES[name] || [];
      return classes.includes(character.cls.name);
    });
  const count = Math.min(3, pool.length);
  return pickN(pool, count);
}

// The run's final, level-20 fight — a homebrewed stat block rather
// than an unmodified Monster Forge entry, per an explicit decision
// to prioritize a thematically strong boss over being constrained to
// existing numbers. Real simulation drove every value here, not
// guesswork, across two full rounds of tuning:
//
// Round 1 found the "one big hit" problem: Tarrasque (676 HP) was
// unwinnable by any class, and every single-attack boss either
// bounced off tanky Fighter/Rogue or nearly one-shot fragile Wizard —
// no HP number threads that needle. Splitting the same damage across
// two moderate hits per turn (the same lever real 5e uses) fixed
// that shape of the problem.
//
// Round 2 found the real reason casters still lagged even then: two
// separate, deeper bugs, not a boss-tuning problem at all. First,
// simulation showed 30/30 level-20 Wizards had literally zero
// level-3+ combat spells available despite having slots up to 9th
// level — their known spells are drawn from a ~180-spell pool where
// only a handful are combat-relevant, so the (correctly-implemented)
// upcasting system had nothing to upcast. Second, Wizard was the
// only one of the 4 classes with zero bonus-action combat option at
// all — Fighter has Second Wind, Rogue's Sneak Attack rides their
// attack, Cleric has Healing Word and Spiritual Weapon — while Wizard
// got nothing extra each turn despite near-identical HP to Cleric.
// Fixed both directly (ensureCombatSpellCoverage() guarantees a
// combat spell in both the action and bonus slot at every unlocked
// tier) rather than papering over them with boss numbers.
//
// Final simulation (60 trials/class): Fighter 48%, Rogue 42%,
// Cleric 55%, Wizard 28% — spread of 27 points, down from 80-100 on
// every early attempt. Not perfectly uniform — Wizard is still the
// softest seat — but this is the best balance found, achieved by
// fixing the actual causes rather than only tuning the boss around
// them.
function pickBossMonster(){
  return {
    name: 'The Lich King',
    size: 'Medium', type: 'undead', alignment: 'Lawful Evil',
    ac: 16, hp: 175, maxHp: 175,
    scores: { str:10, dex:14, con:18, int:20, wis:16, cha:16 },
    senses: 'darkvision 120 ft., passive Perception 13', languages: 'all, telepathy 120 ft.',
    cr: '—', xp: 0,
    traits: [
      { name:'Undying Malice', desc:'Countless adventurers have fallen to this creature\u2019s throne room, and its power has only grown with each one. It fights with the cold certainty of something that has already won this fight before.' },
    ],
    actions: [
      { name:'Withering Touch', desc:'Melee Spell Attack: +8 to hit, reach 5 ft., one target. Hit: 15 (3d6+5) necrotic damage.' },
    ],
    attackCount: 2, // resolveEnemyTurn() resolves this as two separate Withering Touch attacks each turn
  };
}

function generateMonster(tierKey, locationKey){
  const rawTierPool = (tierKey === 'any')
    ? Object.values(MONSTER_TIERS).reduce((all, names) => all.concat(names), [])
    : (MONSTER_TIERS[tierKey] || []);
  const excluded = rawTierPool.filter(name => !MUNDANE_BEAST_EXCLUDE.has(name));
  const tierPool = excluded.length ? excluded : rawTierPool;
  let pool = tierPool;
  if(locationKey && locationKey !== 'any'){
    const filtered = tierPool.filter(name => (MONSTER_ENVIRONMENTS[name] || []).includes(locationKey));
    // Some tier+location combinations are genuinely empty (there's no
    // Epic-tier Underwater monster in this registry) — fall back to
    // the unfiltered tier pool rather than the roll simply failing.
    pool = filtered.length ? filtered : tierPool;
  }
  const name = drawFromBag('monster:'+tierKey+':'+(locationKey||'any'), pool);
  return Object.assign({ name }, MONSTER_REGISTRY[name]);
}

/* ================= ENCOUNTER GENERATOR ================= */
// XP thresholds and the encounter multiplier rules below are the real DMG
// numbers (2014 ruleset) — verified directly against the official rules
// text before implementing, not recalled from memory.

const XP_THRESHOLDS = {
  1:[25,50,75,100], 2:[50,100,150,200], 3:[75,150,225,400], 4:[125,250,375,500],
  5:[250,500,750,1100], 6:[300,600,900,1400], 7:[350,750,1100,1700], 8:[450,900,1400,2100],
  9:[550,1100,1600,2400], 10:[600,1200,1900,2800], 11:[800,1600,2400,3600], 12:[1000,2000,3000,4500],
  13:[1100,2200,3400,5100], 14:[1250,2500,3800,5700], 15:[1400,2800,4300,6400], 16:[1600,3200,4800,7200],
  17:[2000,3900,5900,8800], 18:[2100,4200,6300,9500], 19:[2400,4900,7300,10900], 20:[2800,5700,8500,12700],
};
const DIFFICULTY_INDEX = { easy:0, medium:1, hard:2, deadly:3 };
const DIFFICULTY_LABELS = { easy:'easy', medium:'medium', hard:'hard', deadly:'deadly' };

// Ordered multiplier values; band index shifts up for small parties (<3) and
// down for large parties (6+), exactly matching the DMG's party-size rule.
const MULTIPLIER_VALUES = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5];
function multiplierBandIndex(monsterCount){
  if(monsterCount <= 1) return 1;
  if(monsterCount === 2) return 2;
  if(monsterCount <= 6) return 3;
  if(monsterCount <= 10) return 4;
  if(monsterCount <= 14) return 5;
  return 6;
}
function getEncounterMultiplier(monsterCount, partySize){
  let idx = multiplierBandIndex(monsterCount);
  if(partySize < 3) idx += 1;
  else if(partySize >= 6) idx -= 1;
  idx = Math.max(0, Math.min(MULTIPLIER_VALUES.length-1, idx));
  return MULTIPLIER_VALUES[idx];
}

function tierForLevel(level){
  if(level <= 4) return 1;
  if(level <= 10) return 2;
  if(level <= 16) return 3;
  return 4;
}

function actualDifficultyForXP(adjustedXP, partySize, partyLevel){
  const t = XP_THRESHOLDS[partyLevel].map(v => v * partySize);
  if(adjustedXP >= t[3]) return 'deadly';
  if(adjustedXP >= t[2]) return 'hard';
  if(adjustedXP >= t[1]) return 'medium';
  if(adjustedXP >= t[0]) return 'easy';
  return 'trivial';
}

// Scene-setting openers, each ending in a natural reveal — combined with
// whichever creature(s) actually got generated, this gives far more real
// variety than writing one hook per possible monster ever could.
const ENCOUNTER_HOOKS = [
  'You duck into a cave to escape the rain, cobwebs pulling at your boots. Before you know it, you\u2019re face to face with',
  'The old bridge creaks under your feet as fog rolls in off the water. From the mist emerges',
  'Firelight flickers from a clearing ahead. Rounding the last tree, you find yourselves staring down',
  'The tavern door swings open, letting in a blast of cold air, and',
  'Halfway down the crumbling stairwell, the torchlight catches movement below:',
  'A trail of broken branches leads you off the path, straight into',
  'The market square falls silent as townsfolk scatter. Standing in the empty street is',
  'Deep in the crypt, the sound of shifting stone gives way to',
  'The wagon wheels lurch to a stop. The road ahead is blocked by',
  'Something has been tracking you through the trees. It finally shows itself:',
  'The cellar door creaks open on its own. Waiting in the dark is',
  'A shrill horn sounds from the watchtower moments before you spot',
  'The swamp mud sucks at your boots as reeds part ahead of you, revealing',
  'Candlelight gutters out all at once in the abandoned manor. In the sudden dark, you hear',
  'The mountain pass narrows to a single file line, and that\u2019s when you see',
  'Something ancient stirs beneath the ruined temple floor as',
  'The ship\u2019s hull groans against something unseen below, and then',
  'A child\u2019s scream cuts through the market crowd, and you turn to find',
  'The campfire dies to embers in an instant. Standing at the tree line is',
  'Water drips somewhere in the dark of the sewer tunnel, then you hear breathing, and',
  'The library\u2019s dust settles as a shelf topples on its own, and from behind it steps',
  'Your torch gutters low just as the corridor opens into a wide chamber, home to',
  'The caravan guards go quiet all at once. Ahead on the road stands',
  'Snow crunches under a weight far too heavy to be one of your own, and',
  'The shrine\u2019s offerings are still warm, whoever left them hasn\u2019t gone far, and neither has',
  'A rope bridge sways though no wind is blowing. On the far side waits',
  'The abandoned mine shaft exhales cold, stale air, and something else, in the shape of',
  'Moonlight catches on wet stone as the cave narrows, opening suddenly onto',
  'The festival music stops mid-note. Every head turns toward',
  'Roots crack through the temple floor as the ground itself seems to shift, and from the rubble climbs',
  'The lighthouse beam sweeps past and catches something clinging to the rocks below.',
  'Ice groans beneath your boots as a dark shape rises from beneath the frozen lake, revealing itself as',
  'The orchard\u2019s fallen fruit is crawling with more than insects, and standing among the trees is',
  'You climb over the ridge onto an old battlefield, bones scattered among the rusted steel, and waiting there is',
  'The windmill\u2019s blades turn though there\u2019s no wind at all, and from its shadow steps',
  'High in the forest canopy, branches bend under a weight that shouldn\u2019t be there.',
  'The chasm\u2019s edge crumbles beneath your foot, and from the darkness below rises',
  'The abandoned watchpost\u2019s bell rings once, on its own, moments before you spot',
  'Hedges close in around you as the maze narrows to a single path, ending at',
  'Broken glass crunches underfoot in the ruined greenhouse, home now to',
  'The opera house\u2019s stage curtain sways though the theater is supposedly empty, and from behind it steps',
  'Sparks fly from the abandoned forge as the bellows pump on their own, worked by',
  'The old well\u2019s rope goes taut, pulled from somewhere far below by',
  'A hidden passage behind the bookshelf leads somewhere it shouldn\u2019t, and waiting at its end is',
  'The alchemist\u2019s abandoned lab still bubbles and hisses, and among the broken vials moves',
  'The wizard\u2019s tower door creaks open on its own, and from the darkness within emerges',
  'Deep in the druid grove, the trees themselves seem to be watching, and then one of them moves, revealing',
  'Steam hisses from cracks in the volcanic cavern floor, and stepping through it comes',
  'The colosseum\u2019s ancient arena floor is stained old and new, and standing at its center, waiting, is',
  'The chapel bell tolls though there\u2019s no one left to ring it, and from the pews rises',
];

function buildEncounterCandidate(partySize, partyLevel, targetAdjustedXP, candidateNames){
  const countWeights = [0,3,3,2,2,1,1];
  let monsterCount = 1;
  const totalWeight = countWeights.reduce((a,b)=>a+b,0);
  let roll_ = Math.random() * totalWeight;
  for(let i=1;i<countWeights.length;i++){
    roll_ -= countWeights[i];
    if(roll_ <= 0){ monsterCount = i; break; }
  }

  const multiplier = getEncounterMultiplier(monsterCount, partySize);
  const targetRawXP = targetAdjustedXP / multiplier;

  // Cap how many of any single creature can appear, so bigger encounters
  // come out varied instead of a uniform swarm — a trio can still match,
  // but six of the same thing never will.
  const maxOfOneKind = Math.min(3, monsterCount);

  const shuffled = candidateNames.slice().sort(() => Math.random() - 0.5);
  const usedCounts = {};
  let chosen = [];
  let remaining = targetRawXP;
  for(let i=0;i<monsterCount;i++){
    const slotsLeft = monsterCount - i;
    const perSlotTarget = remaining / slotsLeft;
    const eligible = shuffled.filter(n => (usedCounts[n] || 0) < maxOfOneKind);
    const pool = eligible.length ? eligible : shuffled;
    let best = pool[0];
    let bestDiff = Infinity;
    pool.forEach(n => {
      const xp = (MONSTER_REGISTRY[n] || {}).xp || 0;
      const diff = Math.abs(xp - perSlotTarget);
      if(diff < bestDiff){ bestDiff = diff; best = n; }
    });
    chosen.push(best);
    usedCounts[best] = (usedCounts[best] || 0) + 1;
    remaining -= (MONSTER_REGISTRY[best] || {}).xp || 0;
  }

  const monsters = chosen.map(name => Object.assign({ name }, MONSTER_REGISTRY[name]));
  const rawXP = monsters.reduce((sum, m) => sum + (m.xp || 0), 0);
  const adjustedXP = Math.round(rawXP * multiplier);
  return { monsters, rawXP, adjustedXP, multiplier };
}

function generateEncounter(partySize, partyLevel, difficulty, includeHook){
  const diffIdx = DIFFICULTY_INDEX[difficulty];
  const targetLow = XP_THRESHOLDS[partyLevel][diffIdx] * partySize;
  const targetHigh = diffIdx < 3 ? XP_THRESHOLDS[partyLevel][diffIdx+1] * partySize : targetLow * 1.3;
  const targetAdjustedXP = (targetLow + targetHigh) / 2;

  const primaryTier = tierForLevel(partyLevel);
  const rawCandidateNames = Array.from(new Set(
    (MONSTER_TIERS[primaryTier] || []).concat(MONSTER_TIERS[Math.max(1, primaryTier-1)] || [])
  ));
  const filteredCandidateNames = rawCandidateNames.filter(name => !MUNDANE_BEAST_EXCLUDE.has(name));
  const candidateNames = filteredCandidateNames.length ? filteredCandidateNames : rawCandidateNames;

  // Try several candidate compositions and keep whichever one's real,
  // fully-computed difficulty actually lands closest to what was asked for.
  let bestCandidate = null;
  let bestScore = Infinity;
  const targetIdx = diffIdx;
  for(let attempt=0; attempt<10; attempt++){
    const candidate = buildEncounterCandidate(partySize, partyLevel, targetAdjustedXP, candidateNames);
    const resultDiff = actualDifficultyForXP(candidate.adjustedXP, partySize, partyLevel);
    const resultIdx = resultDiff === 'trivial' ? -1 : DIFFICULTY_INDEX[resultDiff];
    const score = Math.abs(resultIdx - targetIdx);
    if(score < bestScore){
      bestScore = candidate.monsters.length ? score : Infinity;
      bestCandidate = candidate;
      if(score === 0) break;
    }
  }

  const { monsters, rawXP, adjustedXP, multiplier } = bestCandidate;
  const resultDifficulty = actualDifficultyForXP(adjustedXP, partySize, partyLevel);

  let hookText = null;
  if(includeHook){
    const opener = pick(ENCOUNTER_HOOKS);
    const uniqueNames = Array.from(new Set(monsters.map(m => m.name)));
    let creatureText;
    if(uniqueNames.length === 1 && monsters.length > 1){
      creatureText = monsters.length + ' ' + uniqueNames[0] + (uniqueNames[0].endsWith('s') ? '' : 's');
    } else if(uniqueNames.length === 1){
      creatureText = 'a ' + uniqueNames[0].toLowerCase();
    } else {
      creatureText = uniqueNames.slice(0,-1).join(', ') + ' and ' + uniqueNames[uniqueNames.length-1];
    }
    hookText = opener + ' ' + creatureText + '.';
  }

  return {
    partySize, partyLevel, requestedDifficulty: difficulty, resultDifficulty,
    monsters, rawXP, adjustedXP, multiplier, hookText,
  };
}


/* ================= RENDER ================= */

/* ============================================================
   SHEET MATHS — every number on the character sheet, with the
   steps that produce it. The sheet shows .total and clicking a
   number shows .parts, so the two can never disagree.
   Each part is [label, value, kind?]; kind 'base' = a starting
   number rather than a bonus.
   ============================================================ */
function classLevelOf(c, name){
  if(c.cls && c.cls.name === name) return c.multiclass ? c.multiclass.level1 : c.level;
  if(c.multiclass && c.multiclass.cls2 && c.multiclass.cls2.name === name) return c.multiclass.level2;
  return 0;
}
function hasSubclass(c, name){ return c.subclass === name || !!(c.multiclass && c.multiclass.subclass2 === name); }
function hasFeat(c, name){ return (c.feats || []).includes(name); }
function gearNamesOf(c){ return (c.gear || []).map(g => g.name); }
function calcResult(parts, extra){ return Object.assign({ total: sumParts(parts), parts }, extra || {}); }

function sheetArmorClass(c){
  return armorClassBreakdown(c.scores, c.cls, c.gear || [], {
    classes: [c.cls.name].concat(c.multiclass ? [c.multiclass.cls2.name] : []),
    draconic: hasSubclass(c, 'Draconic Bloodline'),
    mediumArmorMaster: hasFeat(c, 'Medium Armor Master'),
  });
}

function sheetSpeed(c){
  const parts = [['Base walking speed ('+c.race.name+')', c.race.speed, 'base']];
  const names = gearNamesOf(c);
  const armor = ARMOR_TABLE[names.find(n => ARMOR_TABLE[n])];
  const shield = names.includes('Shield') || names.some(n => /^\+\d Shield$/.test(n));
  if(names.includes('Boots of Striding and Springing') && c.race.speed < 30) parts.push(['Boots of Striding and Springing (walking speed becomes 30 ft)', 30 - c.race.speed]);
  const monk = classLevelOf(c, 'Monk');
  if(monk >= 2 && !armor && !shield){
    const bonus = monk >= 18 ? 30 : monk >= 14 ? 25 : monk >= 10 ? 20 : monk >= 6 ? 15 : 10;
    parts.push(['Unarmored Movement (Monk '+monk+', no armor or shield)', bonus]);
  }
  if(classLevelOf(c, 'Barbarian') >= 5 && !(armor && armor.type === 'heavy')) parts.push(['Fast Movement (Barbarian 5+, not in heavy armor)', 10]);
  if(hasFeat(c, 'Mobile')) parts.push(['Mobile feat', 10]);
  return calcResult(parts);
}

// Half proficiency on checks you aren't proficient in: Jack of All Trades
// (Bard 2+, any ability, rounded down) or Remarkable Athlete (Champion 7+,
// STR/DEX/CON only, rounded up). They don't stack; the better one applies.
function halfProficiencyPart(c, ability){
  const options = [];
  if(classLevelOf(c, 'Bard') >= 2) options.push(['Jack of All Trades (half proficiency, rounded down)', Math.floor(c.prof / 2)]);
  if(hasSubclass(c, 'Champion') && classLevelOf(c, 'Fighter') >= 7 && ['str','dex','con'].includes(ability))
    options.push(['Remarkable Athlete (half proficiency, rounded up)', Math.ceil(c.prof / 2)]);
  return options.sort((a, b) => b[1] - a[1])[0] || null;
}

function sheetInitiative(c){
  const parts = [['DEX modifier', mod(c.scores.dex)]];
  const half = halfProficiencyPart(c, 'dex');
  if(half) parts.push(half);
  if(hasFeat(c, 'Alert')) parts.push(['Alert feat', 5]);
  return calcResult(parts);
}

function sheetSkill(c, skill){
  const ab = SKILL_ABILITY[skill];
  const parts = [[ABIL_NAMES[ab]+' modifier ('+skill+' uses '+ab.toUpperCase()+')', mod(c.scores[ab])]];
  const proficient = c.skills.includes(skill);
  const expert = proficient && (c.expertise || []).includes(skill);
  if(expert) parts.push(['Proficiency bonus × 2 (Expertise)', c.prof * 2]);
  else if(proficient) parts.push(['Proficiency bonus (proficient)', c.prof]);
  else { const half = halfProficiencyPart(c, ab); if(half) parts.push(half); }
  return calcResult(parts, { proficient, expert });
}

function sheetPassivePerception(c){
  const skill = sheetSkill(c, 'Perception');
  const parts = [['Base', 10, 'base']].concat(skill.parts);
  if(hasFeat(c, 'Observant')) parts.push(['Observant feat', 5]);
  return calcResult(parts);
}

function sheetSave(c, ab){
  const parts = [[ABIL_NAMES[ab]+' modifier', mod(c.scores[ab])]];
  let proficient = true;
  if(c.cls.saves.includes(ab)) parts.push(['Proficiency bonus ('+c.cls.name+'s are proficient in '+ab.toUpperCase()+' saves)', c.prof]);
  else if((c.extraSaves || []).includes(ab)) parts.push(['Proficiency bonus (Resilient feat)', c.prof]);
  else if(classLevelOf(c, 'Monk') >= 14) parts.push(['Proficiency bonus (Diamond Soul: all saves)', c.prof]);
  else proficient = false;
  if(classLevelOf(c, 'Paladin') >= 6) parts.push(['Aura of Protection (CHA modifier, minimum +1)', Math.max(1, mod(c.scores.cha))]);
  const names = gearNamesOf(c);
  ['Cloak of Protection', 'Ring of Protection'].forEach(item => { if(names.includes(item)) parts.push([item, 1]); });
  return calcResult(parts, { proficient });
}

function spellItemBonusParts(c){
  const names = gearNamesOf(c);
  return ['Staff of Power', 'Staff of the Magi', 'Robe of the Archmagi'].filter(n => names.includes(n)).map(n => [n, 2]);
}
function sheetSpellDC(c, sb){
  return calcResult([['Base', 8, 'base'], ['Proficiency bonus', c.prof], [ABIL_NAMES[sb.ability]+' modifier', mod(c.scores[sb.ability])]].concat(spellItemBonusParts(c)));
}
function sheetSpellAttack(c, sb){
  return calcResult([['Proficiency bonus', c.prof], [ABIL_NAMES[sb.ability]+' modifier', mod(c.scores[sb.ability])]].concat(spellItemBonusParts(c)));
}

// Recomputes every derived number on the character so the sheet, exports and
// tracker all agree (older saved rolls predate some of these rules).
function refreshDerivedStats(c){
  c.ac = sheetArmorClass(c).total;
  c.speed = sheetSpeed(c).total;
  [c.spellBlock, c.multiclass && c.multiclass.spellBlock2].forEach(sb => {
    if(!sb) return;
    sb.saveDC = sheetSpellDC(c, sb).total;
    sb.attackBonus = sheetSpellAttack(c, sb).total;
  });
  return c;
}

const CALC_NOTES = {
  hp: 'At 1st level you get the highest number on your class’s hit die. Each level after, you add the average roll rounded up (many tables roll instead). Your CON modifier is added for every level, so raising CON later raises HP for all of them.',
  ac: 'Armor sets your base AC. Light armor adds your full DEX modifier, medium adds up to +2, heavy adds none. Without armor it’s 10 + DEX, unless a class feature gives a better formula. A shield adds +2.',
  speed: 'How many feet you can move on your turn.',
  prof: 'Your proficiency bonus comes from your total character level, even if you’re multiclassed: +2 at levels 1–4, +3 at 5–8, +4 at 9–12, +5 at 13–16, +6 at 17–20. You add it to anything you’re proficient in.',
  init: 'Initiative decides turn order. At the start of combat everyone rolls a d20 and adds this bonus.',
  passive: 'Passive Perception is what you notice without actively looking: 10 + your Perception bonus. The DM compares it with how well something is hidden.',
  skill: 'For a skill check, roll a d20 and add this. You add your proficiency bonus only for skills you’re proficient in (twice with Expertise).',
  save: 'When something forces a saving throw, roll a d20 and add this. Every class is proficient in two saving throws.',
  spelldc: 'When one of your spells forces a saving throw, the target has to roll this number or higher.',
  spellatk: 'For a spell that makes an attack, roll a d20 and add this.',
};

function abilityCalc(c, ab){
  const score = c.scores[ab];
  const m = mod(score);
  const recorded = c.scoreParts && c.scoreParts[ab] && sumParts(c.scoreParts[ab]) === score;
  const parts = recorded ? c.scoreParts[ab] : [[ABIL_NAMES[ab]+' score', score, 'base']];
  const modLine = 'Modifier = (score − 10) ÷ 2, rounded down: ('+score+' − 10) ÷ 2 = '+((score-10)/2)+(Number.isInteger((score-10)/2) ? '' : ' → '+m)+', so '+fmtMod(m)+'.';
  const note = (recorded ? 'Starting scores use the standard array (15, 14, 13, 12, 10, 8), assigned to the abilities this class relies on most. ' : 'Where each point came from isn\u2019t included for this character (share links and older saves leave it out). ') + modLine;
  return { title: ABIL_NAMES[ab]+' '+score+' ('+fmtMod(m)+')', total: score, parts, note };
}

// key: 'hp' | 'ac' | 'speed' | 'prof' | 'init' | 'passive' | 'abil:str' |
//      'save:str' | 'skill:Stealth' | 'spelldc:1' | 'spellatk:2'
function sheetCalc(c, key){
  const [kind, arg] = key.split(':');
  if(kind === 'abil') return abilityCalc(c, arg);
  if(kind === 'hp'){
    const ok = c.hpParts && sumParts(c.hpParts) === c.hp;
    return { title:'Hit Points: '+c.hp, total:c.hp, parts: ok ? c.hpParts : [['Hit points', c.hp, 'base']],
      note: (ok ? '' : 'The level-by-level breakdown isn\u2019t included for this character (share links and older saves leave it out). ') + CALC_NOTES.hp };
  }
  if(kind === 'ac'){ const r = sheetArmorClass(c); return Object.assign(r, { title:'Armor Class: '+r.total, note:CALC_NOTES.ac }); }
  if(kind === 'speed'){ const r = sheetSpeed(c); return Object.assign(r, { title:'Speed: '+r.total+' ft', note:CALC_NOTES.speed, unit:' ft' }); }
  if(kind === 'prof') return { title:'Proficiency Bonus: '+fmtMod(c.prof), total:c.prof, parts:[['Character level '+c.level, c.prof]], note:CALC_NOTES.prof, signedTotal:true };
  if(kind === 'init'){ const r = sheetInitiative(c); return Object.assign(r, { title:'Initiative: '+fmtMod(r.total), note:CALC_NOTES.init, signedTotal:true }); }
  if(kind === 'passive'){ const r = sheetPassivePerception(c); return Object.assign(r, { title:'Passive Perception: '+r.total, note:CALC_NOTES.passive }); }
  if(kind === 'skill'){ const r = sheetSkill(c, arg); return Object.assign(r, { title:arg+': '+fmtMod(r.total), note:CALC_NOTES.skill, signedTotal:true }); }
  if(kind === 'save'){ const r = sheetSave(c, arg); return Object.assign(r, { title:ABIL_NAMES[arg]+' Saving Throw: '+fmtMod(r.total), note:CALC_NOTES.save, signedTotal:true }); }
  if(kind === 'spelldc' || kind === 'spellatk'){
    const sb = arg === '2' ? c.multiclass.spellBlock2 : c.spellBlock;
    const r = kind === 'spelldc' ? sheetSpellDC(c, sb) : sheetSpellAttack(c, sb);
    return Object.assign(r, kind === 'spelldc'
      ? { title:'Spell Save DC: '+r.total, note:CALC_NOTES.spelldc }
      : { title:'Spell Attack: '+fmtMod(r.total), note:CALC_NOTES.spellatk, signedTotal:true });
  }
  return null;
}

function calcBreakdownHTML(r){
  const fmtVal = (p) => (p[1] && typeof p[1] === 'object') ? 'becomes '+p[1].set : (p[2] === 'base' ? String(p[1]) : fmtMod(p[1]));
  const rows = r.parts.map(p => '<tr><td>'+p[0]+'</td><td class="calc-num">'+fmtVal(p)+'</td></tr>').join('');
  const total = r.signedTotal ? fmtMod(r.total) : r.total + (r.unit || '');
  return '<table class="calc-table"><tbody>'+rows+'</tbody>' +
    '<tfoot><tr><td>Total</td><td class="calc-num">'+total+'</td></tr></tfoot></table>' +
    (r.note ? '<p class="calc-note">'+r.note+'</p>' : '');
}

// The character currently on the sheet, for the breakdown pop-up.
let sheetCharacter = null;
function showSheetCalc(key){
  if(!sheetCharacter) return;
  const r = sheetCalc(sheetCharacter, key);
  if(!r) return;
  openModal(r.title);
  modalMeta.innerHTML = '<b>How this is worked out</b>';
  modalBody.innerHTML = calcBreakdownHTML(r);
}
function calcBtn(key, text, extraClass){
  return '<button type="button" class="calc-btn'+(extraClass ? ' '+extraClass : '')+'" data-kind="calc" data-name="'+key+'" title="How is this worked out?">'+text+'</button>';
}

function scoreRow(scores, clickable){
  return ABILS.map(a=>{
    const m = mod(scores[a]);
    const inner = '<div class="a-name">'+a.toUpperCase()+'</div>'+
      '<div class="a-score">'+scores[a]+'</div>'+
      '<div class="a-mod">'+fmtMod(m)+'</div>';
    return clickable
      ? '<button type="button" class="ability calc-box" data-kind="calc" data-name="abil:'+a+'" title="How is this worked out?">'+inner+'</button>'
      : '<div class="ability">'+inner+'</div>';
  }).join('');
}

function savesRow(c){
  return ABILS.map(a=>{
    const r = sheetSave(c, a);
    return '<button type="button" class="ability save-ability calc-box'+(r.proficient?' proficient':'')+'" data-kind="calc" data-name="save:'+a+'" title="How is this worked out?"><div class="a-name">'+a.toUpperCase()+'</div>'+
      '<div class="a-mod save-mod">'+fmtMod(r.total)+'</div>'+
      (r.proficient ? '<div class="save-dot" title="Proficient"></div>' : '') +
      '</button>';
  }).join('');
}

function skillTags(c){
  return '<div class="tag-row">' + c.skills.map(s=>{
    const r = sheetSkill(c, s);
    return '<button type="button" class="tag skill-tag" data-kind="calc" data-name="skill:'+s+'" title="How is this worked out?">'+s+' '+fmtMod(r.total)+(r.expert ? ' <span class="skill-expert">Expertise</span>' : '')+'</button>';
  }).join('') + '</div>';
}

function spellTagBtn(name){
  return '<button type="button" class="tag spell-tag" data-kind="spell" data-name="'+name+'">'+name+'</button>';
}

function featTagBtn(name){
  return '<button type="button" class="tag feat-tag" data-kind="feat" data-name="'+name+'">'+name+'</button>';
}

// Class and subclass features, by level. Ability Score Improvement levels are
// deliberately omitted here since ASIs and feats already have their own
// section on the sheet — repeating them here would just be clutter.
const CLASS_FEATURES = {
  'Fighter': [
    {level:1, name:'Fighting Style', desc:'You adopt a particular style of fighting as your specialty, such as Archery, Defense, Dueling, Great Weapon Fighting, Protection, or Two-Weapon Fighting, each granting a distinct combat benefit.'},
    {level:1, name:'Second Wind', desc:'You have a limited well of stamina you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain 1d10 plus your fighter level in hit points. Once you use this feature, you must finish a short or long rest before using it again.'},
    {level:2, name:'Action Surge', desc:'You can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action. Once you use this feature, you must finish a short or long rest before using it again.'},
    {level:5, name:'Extra Attack', desc:'You can attack twice, instead of once, whenever you take the Attack action on your turn.'},
    {level:9, name:'Indomitable', desc:'You can reroll a saving throw that you fail. If you do so, you must use the new roll. Once you use this feature, you must finish a long rest before using it again.'},
    {level:11, name:'Extra Attack (2)', desc:'You can attack three times, instead of twice, whenever you take the Attack action on your turn.'},
    {level:13, name:'Indomitable (2 uses)', desc:'You can now use Indomitable twice between long rests.'},
    {level:17, name:'Action Surge (2 uses)', desc:'You can now use Action Surge twice before a rest, but only once on the same turn.'},
    {level:17, name:'Indomitable (3 uses)', desc:'You can now use Indomitable three times between long rests.'},
    {level:20, name:'Extra Attack (3)', desc:'You can attack four times, instead of three, whenever you take the Attack action on your turn.'},
  ],
  'Barbarian': [
    {level:1, name:'Rage', desc:'On your turn, you can enter a rage as a bonus action, giving you advantage on Strength checks and saving throws, a bonus to melee damage with Strength-based weapons, and resistance to bludgeoning, piercing, and slashing damage. It lasts up to 1 minute, and ends early if you go a full turn without attacking or taking damage, or if you become incapacitated.'},
    {level:1, name:'Unarmored Defense', desc:'While not wearing armor, your AC equals 10 plus your Dexterity modifier plus your Constitution modifier. You can use a shield and still gain this benefit.'},
    {level:2, name:'Reckless Attack', desc:'You can throw aside all concern for defense to attack with fierce desperation. Attack rolls using Strength have advantage during your turn, but attack rolls against you have advantage until your next turn.'},
    {level:2, name:'Danger Sense', desc:'You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells, as long as you aren\u2019t blinded, deafened, or incapacitated.'},
    {level:5, name:'Extra Attack', desc:'You can attack twice, instead of once, whenever you take the Attack action on your turn.'},
    {level:5, name:'Fast Movement', desc:'Your speed increases by 10 feet while you aren\u2019t wearing heavy armor.'},
    {level:7, name:'Feral Instinct', desc:'You have advantage on initiative rolls, and can act normally on your first turn even if surprised, as long as you enter your rage before doing anything else on that turn.'},
    {level:9, name:'Brutal Critical', desc:'You can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack.'},
    {level:11, name:'Relentless Rage', desc:'If you drop to 0 hit points while raging and don\u2019t die outright, you can make a DC 10 Constitution save to drop to 1 hit point instead. The DC increases each time you use this feature between rests.'},
    {level:13, name:'Brutal Critical (2 dice)', desc:'You now roll two additional weapon damage dice on a critical hit with a melee attack.'},
    {level:15, name:'Persistent Rage', desc:'Your rage is now so fierce it ends early only if you fall unconscious or choose to end it.'},
    {level:17, name:'Brutal Critical (3 dice)', desc:'You now roll three additional weapon damage dice on a critical hit with a melee attack.'},
    {level:18, name:'Indomitable Might', desc:'If your total for a Strength check is less than your Strength score, you can use that score in place of the total.'},
    {level:20, name:'Primal Champion', desc:'Your Strength and Constitution scores increase by 4, and their maximum becomes 24.'},
  ],
  'Bard': [
    {level:1, name:'Bardic Inspiration', desc:'You can use a bonus action to give one creature within 60 feet a Bardic Inspiration die (a d6), which they can add to one ability check, attack roll, or saving throw made within the next 10 minutes.'},
    {level:2, name:'Jack of All Trades', desc:'You can add half your proficiency bonus, rounded down, to any ability check you make that doesn\u2019t already include your proficiency bonus.'},
    {level:2, name:'Song of Rest', desc:'You can use soothing music during a short rest to help your companions regain additional hit points. Anyone who spends a Hit Die to heal regains an extra 1d6 hit points.'},
    {level:3, name:'Expertise', desc:'You choose two of your skill proficiencies (or one skill and thieves\u2019 tools), and your proficiency bonus is doubled for any ability check you make using them.'},
    {level:5, name:'Font of Inspiration', desc:'You now regain your uses of Bardic Inspiration when you finish a short or long rest, rather than only a long rest.'},
    {level:5, name:'Bardic Inspiration (d8)', desc:'Your Bardic Inspiration die becomes a d8.'},
    {level:6, name:'Countercharm', desc:'As an action, you can perform to give yourself and any friendly creatures within 30 feet advantage on saving throws against being frightened or charmed for as long as you keep performing, up to 1 minute.'},
    {level:10, name:'Expertise (2 more skills)', desc:'You choose two more of your skill proficiencies to gain expertise in.'},
    {level:10, name:'Magical Secrets', desc:'You learn two spells of your choice from any class\u2019s spell list, ignoring the normal restriction that a spell must be on the bard spell list. They count as bard spells for you.'},
    {level:10, name:'Bardic Inspiration (d10)', desc:'Your Bardic Inspiration die becomes a d10.'},
    {level:14, name:'Magical Secrets (2 more)', desc:'You learn two more spells from any class\u2019s spell list.'},
    {level:15, name:'Bardic Inspiration (d12)', desc:'Your Bardic Inspiration die becomes a d12.'},
    {level:18, name:'Magical Secrets (2 more)', desc:'You learn two more spells from any class\u2019s spell list.'},
    {level:20, name:'Superior Inspiration', desc:'When you roll initiative and have no uses of Bardic Inspiration left, you regain one use.'},
  ],
  'Cleric': [
    {level:2, name:'Channel Divinity (1/rest)', desc:'You can channel divine energy to fuel magical effects once per short or long rest, including Turn Undead, presenting your holy symbol to force undead creatures within 30 feet to make a Wisdom save or flee for 1 minute, plus an additional option granted by your Divine Domain.'},
    {level:5, name:'Destroy Undead', desc:'When an undead creature fails its save against your Turn Undead and has a challenge rating of 1/2 or lower, it is destroyed instead of fleeing.'},
    {level:6, name:'Channel Divinity (2/rest)', desc:'You can now use Channel Divinity twice between rests.'},
    {level:8, name:'Destroy Undead (CR 1)', desc:'Turned undead with a challenge rating of 1 or lower are now destroyed instead of fleeing.'},
    {level:10, name:'Divine Intervention', desc:'You can call on your deity to intervene on your behalf. There\u2019s a percentage chance equal to your cleric level that your deity grants your request, producing an effect of the DM\u2019s choosing. Once used, you must wait 7 days before trying again.'},
    {level:11, name:'Destroy Undead (CR 2)', desc:'Turned undead with a challenge rating of 2 or lower are now destroyed instead of fleeing.'},
    {level:14, name:'Destroy Undead (CR 3)', desc:'Turned undead with a challenge rating of 3 or lower are now destroyed instead of fleeing.'},
    {level:17, name:'Destroy Undead (CR 4)', desc:'Turned undead with a challenge rating of 4 or lower are now destroyed instead of fleeing.'},
    {level:18, name:'Channel Divinity (3/rest)', desc:'You can now use Channel Divinity three times between rests.'},
    {level:20, name:'Divine Intervention (guaranteed)', desc:'Invoking your deity\u2019s aid now automatically succeeds, no roll required.'},
  ],
  'Druid': [
    {level:2, name:'Wild Shape', desc:'You can use your action to magically assume the shape of a beast you\u2019ve seen before, twice per short or long rest. Your game statistics are replaced by the beast\u2019s, though your Intelligence, Wisdom, and Charisma stay the same, and you can\u2019t cast spells while transformed (though transforming doesn\u2019t end your concentration on an existing spell).'},
    {level:4, name:'Wild Shape (swimming beasts)', desc:'You can now transform into beasts with a swimming speed.'},
    {level:8, name:'Wild Shape (flying beasts)', desc:'You can now transform into beasts with a flying speed.'},
    {level:18, name:'Timeless Body', desc:'For every 10 years that pass, your body ages only 1 year.'},
    {level:18, name:'Beast Spells', desc:'You can cast many of your druid spells in any shape you assume with Wild Shape.'},
    {level:20, name:'Archdruid', desc:'You can use Wild Shape an unlimited number of times, and can ignore the verbal and somatic components of your druid spells, as well as any material components that lack a cost and aren\u2019t consumed by the spell.'},
  ],
  'Monk': [
    {level:1, name:'Unarmored Defense', desc:'While not wearing armor or wielding a shield, your AC equals 10 plus your Dexterity modifier plus your Wisdom modifier.'},
    {level:1, name:'Martial Arts', desc:'Your unarmed strikes and monk weapons use a d4 for damage (scaling up as you gain levels), can use Dexterity instead of Strength, and hitting with one lets you make an unarmed strike as a bonus action.'},
    {level:2, name:'Ki', desc:'You gain a number of ki points, usable to fuel Flurry of Blows (make two unarmed strikes as a bonus action), Patient Defense (Dodge as a bonus action), and Step of the Wind (Disengage or Dash as a bonus action, with a jump distance boost).'},
    {level:2, name:'Unarmored Movement', desc:'Your speed increases while you aren\u2019t wearing armor or wielding a shield, growing further as you gain monk levels.'},
    {level:3, name:'Deflect Missiles', desc:'You can use your reaction to deflect or catch a ranged weapon attack that hits you, reducing its damage, and potentially catching and throwing it back at a creature within range.'},
    {level:4, name:'Slow Fall', desc:'You can use your reaction when you fall to reduce any falling damage you take by an amount equal to five times your monk level.'},
    {level:5, name:'Extra Attack', desc:'You can attack twice, instead of once, whenever you take the Attack action on your turn.'},
    {level:5, name:'Stunning Strike', desc:'When you hit another creature with a melee weapon attack, you can spend 1 ki point to attempt to stun it. It must succeed on a Constitution save or be stunned until the end of your next turn.'},
    {level:6, name:'Ki-Empowered Strikes', desc:'Your unarmed strikes count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.'},
    {level:7, name:'Evasion', desc:'When you\u2019re subjected to an effect that lets you make a Dexterity save to take only half damage, you instead take no damage on a success, and only half damage on a failure.'},
    {level:7, name:'Stillness of Mind', desc:'You can use your action to end one effect on yourself that is causing you to be charmed or frightened.'},
    {level:10, name:'Purity of Body', desc:'You are immune to disease and poison.'},
    {level:13, name:'Tongue of the Sun and Moon', desc:'You can understand all spoken languages, and any creature that can understand a language can understand you.'},
    {level:14, name:'Diamond Soul', desc:'You gain proficiency in all saving throws. Additionally, you can spend 1 ki point to reroll a failed save.'},
    {level:15, name:'Timeless Body', desc:'You no longer suffer the frailty of old age and can\u2019t be aged magically. You still can die of old age, however.'},
    {level:18, name:'Empty Body', desc:'You can spend 4 ki points to become invisible for 1 minute, with resistance to all damage but force damage. You can also spend 8 ki points to cast astral projection, without needing material components.'},
    {level:20, name:'Perfect Self', desc:'When you roll initiative and have no ki points left, you regain 4 ki points.'},
  ],
  'Paladin': [
    {level:1, name:'Divine Sense', desc:'As an action, you can open your awareness to detect strong evil and good, sensing the location of any celestial, fiend, or undead within 60 feet, a limited number of times per long rest.'},
    {level:1, name:'Lay on Hands', desc:'You have a pool of healing power, equal to five times your paladin level, that you can draw on with a touch to restore hit points, or expend 5 points to cure one disease or neutralize one poison.'},
    {level:2, name:'Fighting Style', desc:'You adopt a particular style of fighting as your specialty, granting a distinct combat benefit.'},
    {level:2, name:'Divine Smite', desc:'When you hit a creature with a melee weapon attack, you can expend a spell slot to deal extra radiant damage, more against undead and fiends.'},
    {level:3, name:'Divine Health', desc:'The divine magic flowing through you makes you immune to disease.'},
    {level:5, name:'Extra Attack', desc:'You can attack twice, instead of once, whenever you take the Attack action on your turn.'},
    {level:6, name:'Aura of Protection', desc:'You and friendly creatures within 10 feet of you add your Charisma modifier to all saving throws, so long as you aren\u2019t incapacitated.'},
    {level:10, name:'Aura of Courage', desc:'You and friendly creatures within 10 feet of you can\u2019t be frightened while you aren\u2019t incapacitated.'},
    {level:11, name:'Improved Divine Smite', desc:'All of your melee weapon strikes now deal an extra 1d8 radiant damage, whether or not you expend a spell slot.'},
    {level:14, name:'Cleansing Touch', desc:'You can use your action to end one spell on yourself or a willing creature you touch, a limited number of times per long rest.'},
    {level:18, name:'Aura Improvements', desc:'The range of your Aura of Protection and Aura of Courage increases to 30 feet.'},
  ],
  'Ranger': [
    {level:1, name:'Favored Enemy', desc:'You have significant experience studying a type of enemy, giving you advantage on Wisdom (Survival) checks to track them and Intelligence checks to recall information about them, along with learning one language they typically speak if any.'},
    {level:1, name:'Natural Explorer', desc:'You are particularly familiar with one type of natural environment, gaining a range of travel and survival benefits while there, including double proficiency on many relevant checks.'},
    {level:2, name:'Fighting Style', desc:'You adopt a particular style of fighting as your specialty, granting a distinct combat benefit.'},
    {level:3, name:'Primeval Awareness', desc:'You can expend a spell slot to sense whether certain types of creatures are present within a mile (or six miles in your favored terrain).'},
    {level:5, name:'Extra Attack', desc:'You can attack twice, instead of once, whenever you take the Attack action on your turn.'},
    {level:8, name:'Land\u2019s Stride', desc:'Moving through nonmagical difficult terrain costs you no extra movement, and you can pass through nonmagical plants without being slowed or harmed by their thorns. You also have advantage on saves against magically created or manipulated plants.'},
    {level:10, name:'Hide in Plain Sight', desc:'You can spend a minute creating camouflage for yourself, granting a +10 bonus to Dexterity (Stealth) checks as long as you remain there without moving or attacking.'},
    {level:14, name:'Vanish', desc:'You can use the Hide action as a bonus action, and can\u2019t be tracked by nonmagical means unless you choose to leave a trail.'},
    {level:18, name:'Feral Senses', desc:'You gain the ability to attack creatures you can\u2019t see without disadvantage, as long as they aren\u2019t hidden from you entirely by magic, and you\u2019re aware of their location.'},
    {level:20, name:'Foe Slayer', desc:'Once per turn, you can add your Wisdom modifier to an attack roll or damage roll made against a favored enemy.'},
  ],
  'Rogue': [
    {level:1, name:'Expertise', desc:'You choose two of your skill proficiencies (or one skill and thieves\u2019 tools), and your proficiency bonus is doubled for any ability check you make using them.'},
    {level:1, name:'Sneak Attack', desc:'Once per turn, you deal extra damage to one creature you hit with an attack if you have advantage on the roll, or if another enemy of the target is within 5 feet of it. This starts at 1d6 and grows as you gain rogue levels, eventually reaching 10d6 at 19th level.'},
    {level:1, name:'Thieves\u2019 Cant', desc:'You know a secret mix of dialect, jargon, and code that lets you hide messages in seemingly normal conversation.'},
    {level:2, name:'Cunning Action', desc:'Your quick thinking lets you take a bonus action on each of your turns to Dash, Disengage, or Hide.'},
    {level:5, name:'Uncanny Dodge', desc:'When an attacker you can see hits you with an attack, you can use your reaction to halve the attack\u2019s damage against you.'},
    {level:7, name:'Evasion', desc:'When you\u2019re subjected to an effect that lets you make a Dexterity save to take only half damage, you instead take no damage on a success, and only half damage on a failure.'},
    {level:11, name:'Reliable Talent', desc:'Whenever you make an ability check that lets you add your proficiency bonus, you can treat a d20 roll of 9 or lower as a 10.'},
    {level:14, name:'Blindsense', desc:'If you can hear, you are aware of the location of any hidden or invisible creature within 10 feet of you.'},
    {level:15, name:'Slippery Mind', desc:'You gain proficiency in Wisdom saving throws.'},
    {level:18, name:'Elusive', desc:'No attack roll has advantage against you while you aren\u2019t incapacitated.'},
    {level:20, name:'Stroke of Luck', desc:'You can turn a failed attack roll into a hit, or a failed ability check into a success, once per short or long rest.'},
  ],
  'Sorcerer': [
    {level:2, name:'Font of Magic', desc:'You gain a number of sorcery points, which you can convert into spell slots, or spend to create various metamagic effects.'},
    {level:3, name:'Metamagic', desc:'You gain the ability to twist your spells to suit your needs, choosing two options such as Quickened Spell, Twinned Spell, or Subtle Spell.'},
    {level:10, name:'Metamagic (3rd option)', desc:'You learn an additional Metamagic option of your choice.'},
    {level:17, name:'Metamagic (4th option)', desc:'You learn an additional Metamagic option of your choice.'},
    {level:20, name:'Sorcerous Restoration', desc:'You regain 4 expended sorcery points whenever you finish a short rest.'},
  ],
  'Warlock': [
    {level:2, name:'Eldritch Invocations', desc:'You learn magical secrets called eldritch invocations, granting you special abilities of your choosing, with more becoming available as you gain warlock levels.'},
    {level:3, name:'Pact Boon', desc:'Your otherworldly patron bestows a gift upon you for your loyal service: the Pact of the Chain (a special familiar), the Pact of the Blade (conjure a magical weapon), or the Pact of the Tome (a Book of Shadows granting extra cantrips).'},
    {level:11, name:'Mystic Arcanum (6th level)', desc:'You learn one 6th-level spell of your choice from the warlock spell list, which you can cast once without a spell slot, regaining the ability after a long rest.'},
    {level:13, name:'Mystic Arcanum (7th level)', desc:'You learn one 7th-level spell of your choice from the warlock spell list, castable once per long rest without a spell slot.'},
    {level:15, name:'Mystic Arcanum (8th level)', desc:'You learn one 8th-level spell of your choice from the warlock spell list, castable once per long rest without a spell slot.'},
    {level:17, name:'Mystic Arcanum (9th level)', desc:'You learn one 9th-level spell of your choice from the warlock spell list, castable once per long rest without a spell slot.'},
    {level:20, name:'Eldritch Master', desc:'You can spend 1 minute entreating your patron for the return of expended pact magic spell slots, once per long rest.'},
  ],
  'Wizard': [
    {level:1, name:'Arcane Recovery', desc:'Once per day when you finish a short rest, you can recover expended spell slots with a combined level equal to or less than half your wizard level (rounded up), none of them 6th level or higher.'},
    {level:18, name:'Spell Mastery', desc:'You choose a 1st-level and a 2nd-level spell from your spellbook that you\u2019ve mastered, letting you cast them at their lowest level without expending a spell slot.'},
    {level:20, name:'Signature Spells', desc:'You choose two 3rd-level spells from your spellbook as signature spells, always prepared and requiring only one spell slot to cast, the lowest level slot you have, or for free once each per short rest.'},
  ],
};
const SUBCLASS_FEATURES = {
  'Champion': [
    {level:3, name:'Improved Critical', desc:'Your weapon attacks score a critical hit on a roll of 19 or 20.'},
    {level:7, name:'Remarkable Athlete', desc:'You can add half your proficiency bonus (round up) to any Strength, Dexterity, or Constitution check that doesn\u2019t already use your proficiency bonus. Your running long jump distance increases by a number of feet equal to your Strength modifier.'},
    {level:10, name:'Additional Fighting Style', desc:'You can choose a second option from the Fighting Style class feature.'},
    {level:15, name:'Superior Critical', desc:'Your weapon attacks now score a critical hit on a roll of 18-20.'},
    {level:18, name:'Survivor', desc:'At the start of each of your turns, you regain hit points equal to 5 plus your Constitution modifier if you have no more than half your hit points left, so long as you have at least 1 hit point.'},
  ],
  'Battle Master': [
    {level:3, name:'Combat Superiority', desc:'You learn maneuvers fueled by superiority dice, letting you trip, disarm, feint, and more, adding extra effects to your weapon attacks.'},
    {level:3, name:'Student of War', desc:'You gain proficiency with one type of artisan\u2019s tools of your choice.'},
    {level:7, name:'Know Your Enemy', desc:'If you spend at least 1 minute observing or interacting with a creature outside combat, you can learn certain information about its capabilities compared to your own.'},
    {level:10, name:'Improved Combat Superiority', desc:'Your superiority dice turn into d10s.'},
    {level:15, name:'Relentless', desc:'When you roll initiative and have no superiority dice remaining, you regain one.'},
  ],
  'Eldritch Knight': [
    {level:3, name:'Spellcasting', desc:'You augment your martial prowess with the ability to cast wizard spells, primarily from the abjuration and evocation schools.'},
    {level:3, name:'Weapon Bond', desc:'You can bond with up to two weapons, letting you summon a bonded weapon to your hand as a bonus action, and making it nearly impossible to be disarmed of it.'},
    {level:7, name:'War Magic', desc:'When you use your action to cast a cantrip, you can make one weapon attack as a bonus action.'},
    {level:10, name:'Eldritch Strike', desc:'When you hit a creature with a weapon attack, that creature has disadvantage on the next saving throw it makes against a spell you cast before the end of your next turn.'},
    {level:15, name:'Arcane Charge', desc:'You gain the ability to teleport up to 30 feet to an unoccupied space you can see when you use your Action Surge.'},
    {level:18, name:'Improved War Magic', desc:'You can now use War Magic when you cast any wizard spell of your action, not just a cantrip.'},
  ],
  'Path of the Berserker': [
    {level:3, name:'Frenzy', desc:'While raging, you can go into a frenzy, letting you make a single melee weapon attack as a bonus action on each of your turns. When your rage ends this way, you suffer a level of exhaustion.'},
    {level:6, name:'Mindless Rage', desc:'You can\u2019t be charmed or frightened while raging. If you\u2019re already charmed or frightened when you enter your rage, the effect is suspended for its duration.'},
    {level:10, name:'Intimidating Presence', desc:'You can use your action to frighten someone with your menacing presence, forcing a Wisdom save or the target becomes frightened of you for 1 minute.'},
    {level:14, name:'Retaliation', desc:'When you take damage from a creature within 5 feet, you can use your reaction to make a melee weapon attack against that creature.'},
  ],
  'Path of the Totem Warrior': [
    {level:3, name:'Totem Spirit', desc:'You choose a totem spirit (Bear, Eagle, or Wolf) and gain a benefit while raging: resistance to all damage but psychic (Bear), advantage on Perception checks and disadvantage against you for opportunity attacks (Eagle), or advantage on melee attacks against creatures within 5 feet of allies (Wolf).'},
    {level:3, name:'Spirit Seeker', desc:'You gain the ability to cast beast sense and speak with animals as rituals.'},
    {level:6, name:'Aspect of the Beast', desc:'You gain a magical benefit based on your totem animal, such as tracking prey with ease (Bear... wait Eagle) or carrying great loads (Bear).'},
    {level:10, name:'Spirit Walker', desc:'You can cast commune with nature as a ritual, communing with a spirit of nature instead of the exact normal casting method.'},
    {level:14, name:'Totemic Attunement', desc:'You gain a further magical benefit tied to your totem animal, active while you rage.'},
  ],
  'Path of the Ancestral Guardian': [
    {level:3, name:'Ancestral Protectors', desc:'While raging, the first creature you hit with an attack on your turn becomes marked by spectral guardians until the start of your next turn. While marked, it has disadvantage on attacks against anyone but you, and any creature it hits besides you takes reduced damage.'},
    {level:6, name:'Spirit Shield', desc:'You can use your reaction while raging to reduce the damage taken by a creature within 30 feet, other than yourself.'},
    {level:10, name:'Consult the Spirits', desc:'You can cast augury or clairvoyance without using a spell slot, once per short or long rest.'},
    {level:14, name:'Vengeful Ancestors', desc:'When Spirit Shield reduces damage taken by an ally, the creature that dealt it takes an equal amount of force damage in return.'},
  ],
  'College of Lore': [
    {level:3, name:'Bonus Proficiencies', desc:'You gain proficiency with three skills of your choice.'},
    {level:3, name:'Cutting Words', desc:'You can use your reaction to expend a Bardic Inspiration die and subtract it from an attack roll, ability check, or damage roll made by a creature within 60 feet that just missed, failed, or hit.'},
    {level:6, name:'Additional Magical Secrets', desc:'You learn two spells of your choice from any class\u2019s spell list, which count as bard spells for you.'},
    {level:14, name:'Peerless Skill', desc:'You can expend a Bardic Inspiration die to add to your own ability check.'},
  ],
  'College of Valor': [
    {level:3, name:'Bonus Proficiencies', desc:'You gain proficiency with medium armor, shields, and martial weapons.'},
    {level:3, name:'Combat Inspiration', desc:'A creature you\u2019ve given a Bardic Inspiration die can use it to add extra damage to a weapon attack, or add it to their AC against one attack.'},
    {level:6, name:'Extra Attack', desc:'You can attack twice, instead of once, whenever you take the Attack action on your turn.'},
    {level:14, name:'Battle Magic', desc:'When you use your action to cast a bard spell, you can make one weapon attack as a bonus action.'},
  ],
  'College of Glamour': [
    {level:3, name:'Mantle of Inspiration', desc:'As a bonus action, you can grant a number of creatures temporary hit points, and any of them who use a Bardic Inspiration die before your next turn can also use their reaction to move up to their speed.'},
    {level:3, name:'Enthralling Performance', desc:'After performing for at least 1 minute, you can attempt to charm your audience, one of whom must fail a Wisdom save to be charmed for 1 hour.'},
    {level:6, name:'Mantle of Majesty', desc:'You can cast command as a bonus action, without a spell slot, and any creature charmed by you automatically fails its save if you use it against them.'},
    {level:14, name:'Unbreakable Majesty', desc:'You can assume a magically majestic presence for 1 minute, forcing anyone who tries to attack you to make a Charisma save first or be unable to.'},
  ],
  'Life Domain': [
    {level:1, name:'Bonus Proficiency', desc:'You gain proficiency with heavy armor.'},
    {level:1, name:'Disciple of Life', desc:'Whenever you use a spell of 1st level or higher to restore hit points, the target regains additional hit points.'},
    {level:2, name:'Channel Divinity: Preserve Life', desc:'You can use Channel Divinity to restore a pool of hit points, divided as you choose among any number of injured creatures within 30 feet, up to half their hit point maximum each.'},
    {level:6, name:'Blessed Healer', desc:'When you cast a spell of 1st level or higher that restores hit points to another creature, you also regain hit points.'},
    {level:8, name:'Divine Strike', desc:'Once per turn, you can deal extra radiant damage to a creature you hit with a weapon attack.'},
    {level:17, name:'Supreme Healing', desc:'Whenever you would roll dice to restore hit points with a spell, you instead use the highest possible result for each die.'},
  ],
  'Light Domain': [
    {level:1, name:'Bonus Cantrip', desc:'You learn the light cantrip if you don\u2019t already know it.'},
    {level:1, name:'Warding Flare', desc:'When you\u2019re attacked by a creature you can see, you can use your reaction to impose disadvantage on the attack roll, a limited number of times per long rest.'},
    {level:2, name:'Channel Divinity: Radiance of the Dawn', desc:'You can use Channel Divinity to dispel magical darkness near you, and deal radiant damage to hostile creatures within 30 feet, halved on a successful Constitution save.'},
    {level:6, name:'Improved Flare', desc:'You can now also use Warding Flare to protect a creature you can see other than yourself.'},
    {level:8, name:'Potent Spellcasting', desc:'You add your Wisdom modifier to the damage you deal with any cleric cantrip.'},
    {level:17, name:'Corona of Light', desc:'You can use your action to activate an aura of sunlight for 1 minute, giving enemies within it disadvantage on saves against spells that deal fire or radiant damage.'},
  ],
  'Trickery Domain': [
    {level:1, name:'Blessing of the Trickster', desc:'You can touch a willing creature other than yourself to give it advantage on Dexterity (Stealth) checks for up to 1 hour.'},
    {level:2, name:'Channel Divinity: Invoke Duplicity', desc:'You can use Channel Divinity to create an illusory duplicate of yourself for up to 1 minute, which you can speak, cast spells, and move through as though it weren\u2019t there.'},
    {level:6, name:'Channel Divinity: Cloak of Shadows', desc:'You can use Channel Divinity to become invisible until the end of your next turn, or until you attack, deal damage, or force a saving throw.'},
    {level:8, name:'Divine Strike', desc:'Once per turn, you can deal extra poison damage to a creature you hit with a weapon attack.'},
    {level:17, name:'Improved Duplicity', desc:'You can create up to four duplicates of yourself with Invoke Duplicity, instead of one.'},
  ],
  'War Domain': [
    {level:1, name:'Bonus Proficiencies', desc:'You gain proficiency with martial weapons and heavy armor.'},
    {level:1, name:'War Priest', desc:'When you use the Attack action, you can make one weapon attack as a bonus action, a limited number of times per day.'},
    {level:2, name:'Channel Divinity: Guided Strike', desc:'You can use Channel Divinity to add +10 to an attack roll you just made.'},
    {level:6, name:'Channel Divinity: War God\u2019s Blessing', desc:'When a creature within 30 feet makes an attack roll, you can use your reaction and Channel Divinity to grant a +10 bonus to it.'},
    {level:8, name:'Divine Strike', desc:'Once per turn, you can deal extra weapon-type damage to a creature you hit with a weapon attack.'},
    {level:17, name:'Avatar of Battle', desc:'You gain resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons.'},
  ],
  'Circle of the Land': [
    {level:2, name:'Bonus Cantrip', desc:'You learn one additional druid cantrip of your choice.'},
    {level:2, name:'Natural Recovery', desc:'Once per day during a short rest, you can recover some of your expended spell slots, of a combined level up to half your druid level (rounded up), none of them 6th level or higher.'},
    {level:3, name:'Circle Spells', desc:'You gain access to additional spells tied to the terrain you chose, always prepared and not counting against the number of spells you can prepare.'},
    {level:6, name:'Land\u2019s Stride', desc:'Moving through nonmagical difficult terrain costs you no extra movement, and you have advantage on saves against magically manipulated plants.'},
    {level:10, name:'Nature\u2019s Ward', desc:'You can\u2019t be charmed or frightened by elementals or fey, and you\u2019re immune to poison and disease.'},
    {level:14, name:'Nature\u2019s Sanctuary', desc:'Creatures of the natural world sense your connection to nature and hesitate to attack you, needing to succeed on a Wisdom save to target you with an attack or harmful spell.'},
  ],
  'Circle of the Moon': [
    {level:2, name:'Combat Wild Shape', desc:'You can use Wild Shape as a bonus action instead of an action, and can expend a spell slot while transformed to regain hit points.'},
    {level:2, name:'Circle Forms', desc:'You can transform into beasts with a higher challenge rating than other druids can at your level.'},
    {level:6, name:'Primal Strike', desc:'Your attacks in beast form count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.'},
    {level:10, name:'Elemental Wild Shape', desc:'You can expend two Wild Shape uses at once to transform into an air, earth, fire, or water elemental.'},
    {level:14, name:'Thousand Forms', desc:'You can cast the alter self spell at will.'},
  ],
  'Circle of Spores': [
    {level:2, name:'Circle Spells', desc:'You gain access to additional necromancy-flavored spells, always prepared and not counting against the number of spells you can prepare.'},
    {level:2, name:'Halo of Spores', desc:'You are surrounded by spores in a 10-foot radius, and can use your reaction to deal necrotic damage to a creature that starts its turn there.'},
    {level:2, name:'Symbiotic Entity', desc:'You can expend a Wild Shape use to awaken the spores covering your body instead of transforming, gaining temporary hit points and increasing your Halo of Spores damage and unarmed strike damage.'},
    {level:6, name:'Fungal Infestation', desc:'When a beast or humanoid you can see dies within 10 feet of you, you can spend a reaction to animate it as a Tiny zombie under your control.'},
    {level:10, name:'Spreading Spores', desc:'You can use a bonus action to hurl your Halo of Spores into a 10-foot cube within 30 feet for 1 minute.'},
    {level:14, name:'Fungal Body', desc:'You are immune to being blinded, deafened, frightened, and poisoned, and you\u2019re resistant to necrotic damage.'},
  ],
  'Way of the Open Hand': [
    {level:3, name:'Open Hand Technique', desc:'Whenever you hit a creature with one of the attacks granted by Flurry of Blows, you can impose one of several effects: knock it prone, push it back 15 feet, or prevent it from taking reactions until the end of your next turn.'},
    {level:6, name:'Wholeness of Body', desc:'You can use your action to regain a number of hit points equal to three times your monk level, once per long rest.'},
    {level:11, name:'Tranquility', desc:'At the end of a long rest, you gain the effect of a sanctuary spell that lasts until the start of your next long rest.'},
    {level:17, name:'Quivering Palm', desc:'When you hit a creature with an unarmed strike, you can spend 3 ki points to set up lethal vibrations, which you can trigger later to force a Constitution save or take heavy necrotic damage, potentially dropping the creature to 0 hit points.'},
  ],
  'Way of Shadow': [
    {level:3, name:'Shadow Arts', desc:'You can spend 2 ki points to cast darkness, darkvision, pass without trace, or silence, without material components. You also learn the minor illusion cantrip if you don\u2019t already know it.'},
    {level:6, name:'Shadow Step', desc:'When you\u2019re in dim light or darkness, you can teleport up to 60 feet to an unoccupied space you can also see in dim light or darkness, and gain advantage on the first melee attack you make before the end of that turn.'},
    {level:11, name:'Cloak of Shadows', desc:'When you\u2019re in an area of dim light or darkness, you can use your action to become invisible until you make an attack, cast a spell, or enter an area of bright light.'},
    {level:17, name:'Opportunist', desc:'Whenever a creature within 5 feet of you is hit by an attack from someone other than you, you can use your reaction to make a melee attack against that creature.'},
  ],
  'Way of the Four Elements': [
    {level:3, name:'Disciple of the Elements', desc:'You learn magical disciplines that harness the power of the four elements, spending ki points to cast them, unlocking more disciplines as you gain monk levels.'},
  ],
  'Oath of Devotion': [
    {level:3, name:'Channel Divinity: Sacred Weapon', desc:'You can use Channel Divinity to imbue a weapon you\u2019re holding with positive energy, adding your Charisma modifier to attack rolls with it and causing it to emit bright light, for 1 minute.'},
    {level:3, name:'Channel Divinity: Turn the Unholy', desc:'You can use Channel Divinity to force fiends and undead within 30 feet to make a Wisdom save or flee from you for 1 minute.'},
    {level:7, name:'Aura of Devotion', desc:'You and friendly creatures within 10 feet of you can\u2019t be charmed while you aren\u2019t incapacitated.'},
    {level:15, name:'Purity of Spirit', desc:'You are always under the effect of a protection from evil and good spell.'},
    {level:20, name:'Holy Nimbus', desc:'As an action, you can emanate an aura of sunlight for 1 minute, dealing radiant damage to hostile creatures that start their turn within 30 feet, and granting advantage on saving throws against spells cast by fiends or undead.'},
  ],
  'Oath of the Ancients': [
    {level:3, name:'Channel Divinity: Nature\u2019s Wrath', desc:'You can use Channel Divinity to summon spectral vines that force a creature within 10 feet to make a save or become restrained.'},
    {level:3, name:'Channel Divinity: Turn the Faithless', desc:'You can use Channel Divinity to force fey and fiends within 30 feet to make a Wisdom save or flee from you for 1 minute.'},
    {level:7, name:'Aura of Warding', desc:'You and friendly creatures within 10 feet of you have resistance to damage from spells while you aren\u2019t incapacitated.'},
    {level:15, name:'Undying Sentinel', desc:'When you\u2019re reduced to 0 hit points and not killed outright, you can instead drop to 1 hit point, once per long rest. You also don\u2019t suffer the frailty of old age.'},
    {level:20, name:'Elder Champion', desc:'As an action, you can transform for 1 minute, regaining hit points each turn, casting spells as a bonus action, and forcing enemies within 10 feet to have disadvantage on saves against your spells and Channel Divinity.'},
  ],
  'Oath of Vengeance': [
    {level:3, name:'Channel Divinity: Abjure Enemy', desc:'You can use Channel Divinity to force a creature within 60 feet to make a Wisdom save or become frightened and have its speed reduced to 0 for 1 minute.'},
    {level:3, name:'Channel Divinity: Vow of Enmity', desc:'You can use Channel Divinity as a bonus action to gain advantage on attack rolls against one creature within 10 feet for 1 minute.'},
    {level:7, name:'Relentless Avenger', desc:'When you hit a creature with an opportunity attack, you can move up to half your speed as part of the same reaction.'},
    {level:15, name:'Soul of Vengeance', desc:'When a creature under the effect of your Vow of Enmity makes an attack, you can use your reaction to make a melee weapon attack against it, if you can see it.'},
    {level:20, name:'Avenging Angel', desc:'As an action, you can grow spectral wings for 1 hour, gaining a flying speed of 60 feet, and radiating an aura that frightens enemies within 30 feet who fail a Wisdom save.'},
  ],
  'Hunter': [
    {level:3, name:'Hunter\u2019s Prey', desc:'You choose a specialized combat technique against your favored quarry: Colossus Slayer (extra damage to a wounded target once per turn), Giant Killer (a reaction attack against a Large or bigger creature that misses you), or Horde Breaker (an extra attack against a different nearby creature).'},
    {level:7, name:'Defensive Tactics', desc:'You choose a defensive technique: Escape the Horde (harder for enemies to gain advantage against you from being surrounded), Multiattack Defense (harder to be hit multiple times by the same attacker), or Steel Will (advantage on saves against being frightened).'},
    {level:11, name:'Multiattack', desc:'You choose an advanced combat option: Volley (attack every creature within 10 feet of a point you can see) or Whirlwind Attack (attack every creature within 5 feet of you).'},
    {level:15, name:'Superior Hunter\u2019s Defense', desc:'You choose a powerful defensive option, such as Evasion, Stand Against the Tide, or Uncanny Dodge.'},
  ],
  'Beast Master': [
    {level:3, name:'Ranger\u2019s Companion', desc:'You gain a beast companion that accompanies and fights alongside you, obeying your commands as a bonus action.'},
    {level:7, name:'Exceptional Training', desc:'Your companion can take the Dash, Disengage, Dodge, or Help action instead of attacking on any turn you don\u2019t issue it a command, and its attacks count as magical.'},
    {level:11, name:'Bestial Fury', desc:'Your companion can make two attacks when you command it to attack.'},
    {level:15, name:'Share Spells', desc:'When you cast a spell targeting yourself, you can also affect your companion, if it\u2019s within 30 feet.'},
  ],
  'Gloom Stalker': [
    {level:3, name:'Dread Ambusher', desc:'You gain a bonus to initiative, and can make an extra weapon attack against one creature within 5 feet on the first turn of combat, dealing extra damage.'},
    {level:3, name:'Umbral Sight', desc:'You gain darkvision, or an increase to your existing darkvision by 30 feet, and you\u2019re invisible to any creature relying on darkvision to see you in darkness.'},
    {level:7, name:'Iron Mind', desc:'You gain proficiency in Wisdom saving throws.'},
    {level:11, name:'Stalker\u2019s Flurry', desc:'Once per turn when you miss with a weapon attack, you can make another weapon attack against a different target.'},
    {level:15, name:'Shadowy Dodge', desc:'Whenever a creature you can\u2019t see attacks you, you can use your reaction to impose disadvantage on the attack roll.'},
  ],
  'Thief': [
    {level:3, name:'Fast Hands', desc:'You can use the bonus action granted by Cunning Action to make a Dexterity (Sleight of Hand) check, pick a lock or disarm a trap, or use an object.'},
    {level:3, name:'Second-Story Work', desc:'Climbing no longer costs you extra movement, and your running long jump distance increases by a number of feet equal to your Dexterity modifier.'},
    {level:9, name:'Supreme Sneak', desc:'You have advantage on Dexterity (Stealth) checks if you move no more than half your speed on the same turn.'},
    {level:13, name:'Use Magic Device', desc:'You ignore all class, race, and level requirements on the use of magic items.'},
    {level:17, name:'Thief\u2019s Reflexes', desc:'You can take two turns during the first round of any combat, one at your normal initiative and a second at your initiative minus 10.'},
  ],
  'Assassin': [
    {level:3, name:'Bonus Proficiencies', desc:'You gain proficiency with the disguise kit and poisoner\u2019s kit.'},
    {level:3, name:'Assassinate', desc:'You have advantage on attack rolls against any creature that hasn\u2019t taken a turn yet in combat, and any hit you score against a surprised creature is a critical hit.'},
    {level:9, name:'Infiltration Expertise', desc:'You can spend 25 gold pieces and 7 days crafting a false identity, complete with documentation and established history.'},
    {level:13, name:'Impostor', desc:'You can unerringly mimic the speech, writing, and behavior of another person you\u2019ve studied.'},
    {level:17, name:'Death Strike', desc:'When you hit a surprised creature, it must make a Constitution save or take double damage from the attack.'},
  ],
  'Arcane Trickster': [
    {level:3, name:'Spellcasting', desc:'You augment your roguish skills with the ability to cast wizard spells, primarily from the enchantment and illusion schools.'},
    {level:3, name:'Mage Hand Legerdemain', desc:'Your mage hand cantrip becomes invisible, and you can perform additional sleight-of-hand tasks with it, like stowing or retrieving an object from a container, or picking a lock or disarming a trap remotely.'},
    {level:9, name:'Magical Ambush', desc:'If you\u2019re hidden from a creature when you cast a spell on it, the creature has disadvantage on any saving throw against the spell this turn.'},
    {level:13, name:'Versatile Trickster', desc:'You can use your mage hand to distract a target within 5 feet of it, giving you advantage on attack rolls against that target until the end of the turn.'},
    {level:17, name:'Spell Thief', desc:'You can use your reaction when a creature casts a spell targeting you to force a save, potentially negating the spell\u2019s effect on you and letting you learn and cast that spell yourself once before losing the ability.'},
  ],
  'Draconic Bloodline': [
    {level:1, name:'Dragon Ancestor', desc:'You choose a dragon type as your ancestor, learning to speak, read, and write Draconic, and doubling your proficiency bonus on Charisma checks made when interacting with dragons.'},
    {level:1, name:'Draconic Resilience', desc:'Your hit point maximum increases by 1 per sorcerer level, and your AC equals 13 plus your Dexterity modifier when you aren\u2019t wearing armor.'},
    {level:6, name:'Elemental Affinity', desc:'When you cast a spell dealing damage of the type associated with your draconic ancestry, you add your Charisma modifier to one damage roll, and can spend a sorcery point to gain resistance to that damage type for 1 hour.'},
    {level:14, name:'Dragon Wings', desc:'You can sprout dragon wings as a bonus action, giving you a flying speed equal to your current speed, as long as you aren\u2019t wearing armor.'},
    {level:18, name:'Draconic Presence', desc:'You can spend an action and a sorcery point to exude an aura of awe or fear for 1 minute, up to a 60-foot radius.'},
  ],
  'Wild Magic': [
    {level:1, name:'Wild Magic Surge', desc:'Your spellcasting can unleash surges of untamed magic. After you cast a sorcerer spell of 1st level or higher, the DM may have you roll on the wild magic surge table for a random magical effect.'},
    {level:1, name:'Tides of Chaos', desc:'You can gain advantage on one attack roll, ability check, or saving throw before your next long rest, though doing so may trigger a wild magic surge on your next spell.'},
    {level:6, name:'Bend Luck', desc:'You can spend 2 sorcery points as a reaction when another creature you can see makes an attack roll, ability check, or saving throw, adding or subtracting 1d4 from the total.'},
    {level:14, name:'Controlled Chaos', desc:'Whenever you roll on the wild magic surge table, you can roll twice and choose which result to apply.'},
    {level:18, name:'Spell Bombardment', desc:'When you roll damage for a spell and roll the highest number possible on any of the dice, you can roll one of those dice again and add it to the damage.'},
  ],
  'Divine Soul': [
    {level:1, name:'Divine Magic', desc:'You gain access to the cleric spell list in addition to the sorcerer spell list when learning spells, and you learn an extra spell tied to your affinity for law, chaos, good, or evil.'},
    {level:1, name:'Favored by the Gods', desc:'If you fail a saving throw or miss with an attack roll, you can add 2d4 to the total, potentially turning it into a success, once per short or long rest.'},
    {level:6, name:'Empowered Healing', desc:'Once per turn when you or an ally within 5 feet rolls dice to restore hit points, you can spend 1 sorcery point to reroll any number of those dice.'},
    {level:14, name:'Otherworldly Wings', desc:'You can manifest a pair of spectral wings as a bonus action, giving you a flying speed of 30 feet, as long as you aren\u2019t wearing heavy armor.'},
    {level:18, name:'Unearthly Recovery', desc:'You can regain hit points equal to half your hit point maximum, once per long rest, if you have fewer than half your hit points remaining.'},
  ],
  'The Fiend': [
    {level:1, name:'Dark One\u2019s Blessing', desc:'When you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier plus your warlock level.'},
    {level:6, name:'Dark One\u2019s Own Luck', desc:'You can add a d10 to an ability check or saving throw you make, once per short or long rest.'},
    {level:10, name:'Fiendish Resilience', desc:'You can choose one damage type at the end of a short or long rest, and you have resistance to it until you choose a different type on your next rest.'},
    {level:14, name:'Hurl Through Hell', desc:'When you hit a creature with an attack, you can banish it briefly to a hellish plane, dealing psychic damage and possibly leaving it frightened, once per long rest.'},
  ],
  'The Archfey': [
    {level:1, name:'Fey Presence', desc:'You can cause each creature in a 10-foot cube originating from you to make a Wisdom save or be charmed or frightened until the end of your next turn, once per short or long rest.'},
    {level:6, name:'Misty Escape', desc:'When you take damage, you can use your reaction to turn invisible and teleport up to 60 feet, once per short or long rest.'},
    {level:10, name:'Beguiling Defenses', desc:'You are immune to being charmed, and when a creature tries to charm you, you can turn the tables and force it to make a save or become charmed by you instead.'},
    {level:14, name:'Dark Delirium', desc:'You can plunge a creature within 60 feet into an illusory realm, incapacitating and isolating it for up to 1 minute, once per short or long rest.'},
  ],
  'The Great Old One': [
    {level:1, name:'Awakened Mind', desc:'You can telepathically speak to any creature you can see within 30 feet, and it can respond in kind even without a shared language.'},
    {level:6, name:'Entropic Ward', desc:'When a creature makes an attack roll against you, you can use your reaction to impose disadvantage on it. If the attack misses, your next attack against that creature has advantage.'},
    {level:10, name:'Thought Shield', desc:'Your thoughts can\u2019t be read by telepathy or other means unless you allow it, you have resistance to psychic damage, and any creature dealing psychic damage to you takes the same amount in return.'},
    {level:14, name:'Create Thrall', desc:'You can touch an incapacitated humanoid to charm it indefinitely, and telepathically communicate with it while it\u2019s on the same plane.'},
  ],
  'School of Evocation': [
    {level:2, name:'Evocation Savant', desc:'The gold and time you must spend to copy an evocation spell into your spellbook is halved.'},
    {level:2, name:'Sculpt Spells', desc:'When you cast an evocation spell that affects other creatures you can see, you can choose a number of them to automatically succeed on their saves and take no damage, if they would normally take half damage on a success.'},
    {level:6, name:'Potent Cantrip', desc:'When a creature succeeds on a saving throw against your cantrip, it still takes half the cantrip\u2019s damage, if any.'},
    {level:10, name:'Empowered Evocation', desc:'You add your Intelligence modifier to the damage of any wizard evocation spell you cast.'},
    {level:14, name:'Overchannel', desc:'You can deal maximum damage with a wizard spell of 5th level or lower, though casting a second spell this way before a long rest starts to harm you.'},
  ],
  'School of Abjuration': [
    {level:2, name:'Abjuration Savant', desc:'The gold and time you must spend to copy an abjuration spell into your spellbook is halved.'},
    {level:2, name:'Arcane Ward', desc:'When you cast an abjuration spell of 1st level or higher, you create a magical ward around yourself with hit points equal to twice your wizard level plus your Intelligence modifier, absorbing damage that would otherwise hit you.'},
    {level:6, name:'Projected Ward', desc:'When a creature you can see within 30 feet takes damage, you can use your reaction to have your Arcane Ward absorb it instead.'},
    {level:10, name:'Improved Abjuration', desc:'You add your proficiency bonus to any ability check made as part of casting an abjuration spell.'},
    {level:14, name:'Spell Resistance', desc:'You have advantage on saving throws against spells, and resistance to damage from spells.'},
  ],
  'School of Illusion': [
    {level:2, name:'Illusion Savant', desc:'The gold and time you must spend to copy an illusion spell into your spellbook is halved.'},
    {level:2, name:'Improved Minor Illusion', desc:'You can now create both a sound and an image with a single casting of the minor illusion cantrip.'},
    {level:6, name:'Malleable Illusions', desc:'You can use your action to change the nature of an illusion you\u2019ve created, as long as it\u2019s still within range.'},
    {level:10, name:'Illusory Self', desc:'You can create an illusory duplicate of yourself as a reaction when a creature attacks you, causing the attack to miss and using up the duplicate, once per short or long rest.'},
    {level:14, name:'Illusory Reality', desc:'Once per turn when you cast an illusion spell, you can make one inanimate, nonmagical object within the illusion real for 1 minute.'},
  ],
};


function classFeaturesSection(c){
  const mc = c.multiclass;
  const lvl1 = mc ? mc.level1 : c.level;
  let all = (CLASS_FEATURES[c.cls.name] || []).filter(f => f.level <= lvl1)
    .concat(c.subclass ? (SUBCLASS_FEATURES[c.subclass] || []).filter(f => f.level <= lvl1) : [])
    .map(f => Object.assign({}, f, { clsLabel: mc ? c.cls.name : null }));

  if(mc){
    const lvl2 = mc.level2;
    const cls2Features = (CLASS_FEATURES[mc.cls2.name] || []).filter(f => f.level <= lvl2)
      .concat(mc.subclass2 ? (SUBCLASS_FEATURES[mc.subclass2] || []).filter(f => f.level <= lvl2) : [])
      .map(f => Object.assign({}, f, { clsLabel: mc.cls2.name }));
    all = all.concat(cls2Features);
  }
  all.sort((a,b) => a.level - b.level);
  if(!all.length) return '';

  return '<details class="class-features-details">' +
    '<summary>Class Features</summary>' +
    all.map(f =>
      '<div class="class-feature-item">' +
        '<span class="cf-level">Lvl ' + f.level + (f.clsLabel ? ' ('+f.clsLabel+')' : '') + '</span><span class="cf-name">' + f.name + '</span>' +
        '<p>' + f.desc + '</p>' +
      '</div>'
    ).join('') +
  '</details>';
}

function spellSection(sb, cls, showClassName, c, which){
  if(!sb) return '';
  const title = sb.label || (showClassName ? (cls.name+' Spellcasting') : 'Spellcasting');
  let html = '<div class="section"><h3 class="section-title">'+title+'</h3>';
  const dc = c ? calcBtn('spelldc:'+which, '<b>'+sb.saveDC+'</b>') : '<b>'+sb.saveDC+'</b>';
  const atk = c ? calcBtn('spellatk:'+which, '<b>'+fmtMod(sb.attackBonus)+'</b>') : '<b>'+fmtMod(sb.attackBonus)+'</b>';
  html += '<div class="spell-meta">Ability <b>'+ABIL_NAMES[sb.ability]+'</b> &nbsp;·&nbsp; Save DC '+dc+' &nbsp;·&nbsp; Attack '+atk+' &nbsp;·&nbsp; Max spell level <b>'+sb.maxSpellLevel+'</b></div>';
  if(sb.cantrips.length){
    html += '<div class="spell-group-label">Cantrips</div><div class="tag-row">'+sb.cantrips.map(spellTagBtn).join('')+'</div>';
  }
  groupSpellsByLevel(sb.list || cls.name, sb.known).forEach(([lvl, names]) => {
    html += '<div class="spell-group-label">'+(lvl ? ordinal(lvl)+' level' : 'Spells')+'</div><div class="tag-row">'+names.map(spellTagBtn).join('')+'</div>';
  });
  if(sb.arcanum && sb.arcanum.length){
    html += '<div class="spell-group-label">Mystic Arcanum (once per long rest)</div><div class="tag-row">'+sb.arcanum.map(spellTagBtn).join('')+'</div>';
  }
  html += '</div>';
  return html;
}

// [[level, [names...]], ...] in level order, using the class's own spell list.
// Spells not found on that list (older saved rolls) land in a level-0 group.
function groupSpellsByLevel(clsName, names){
  const pool = SPELL_DB[clsName] || {};
  const levelOf = {};
  Object.keys(pool).forEach(k => { if(k !== 'cantrips') pool[k].forEach(sp => { levelOf[sp.name] = +k; }); });
  const groups = {};
  names.forEach(n => { const l = levelOf[n] || 0; (groups[l] = groups[l] || []).push(n); });
  return Object.keys(groups).map(Number).sort((a, b) => a - b).map(l => [l, groups[l]]);
}
function ordinal(n){ return n + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'); }

function gearItemBtn(g){
  const label = (g.n && g.n>1 ? g.n+'\u00d7 ' : '') + g.name;
  const rarityClass = g.isMagic ? ' rarity-'+slugify(g.rarity||'common') : '';
  return '<button type="button" class="tag gear-tag'+rarityClass+'" data-kind="'+g.kind+'" data-name="'+g.name+'">'+label+
    (g.isMagic ? '<span class="rarity-label">'+g.rarity+'</span>' : '') +
    '</button>';
}

function equipmentSection(gear){
  const mundane = gear.filter(g=>!g.isMagic);
  const magic = gear.filter(g=>g.isMagic);
  let html = '<div class="section">' +
    '<h3 class="section-title">Equipment</h3>' +
    '<div class="tag-row">' + mundane.map(gearItemBtn).join('') + '</div>';
  if(magic.length){
    html += '<div class="spell-group-label">Items Found</div>' +
      '<div class="tag-row">' + magic.map(gearItemBtn).join('') + '</div>';
  }
  html += '</div>';
  return html;
}

function renderSheet(c){
  const el = document.getElementById('sheetContainer');
  const mc = c.multiclass;
  refreshDerivedStats(c);
  sheetCharacter = c;
  const subclassLine = c.subclass ? (c.cls.subclassLabel+': <b>'+c.subclass+'</b>') : (c.cls.subclassLabel+' not yet chosen');
  const subclassLine2 = mc && mc.subclass2 ? (mc.cls2.subclassLabel+': <b>'+mc.subclass2+'</b>') : (mc ? mc.cls2.subclassLabel+' not yet chosen' : '');
  const classLabel = mc
    ? c.cls.name+' '+mc.level1+' / '+mc.cls2.name+' '+mc.level2
    : c.cls.name;

  el.innerHTML =
    '<div class="sheet-toolbar">' +
      '<button type="button" class="toolbar-btn" data-action="copy-text" id="copyTextBtn">Copy as Text</button>' +
      '<button type="button" class="toolbar-btn" data-action="export-pdf-character">Export as PDF</button>' +
      '<button type="button" class="toolbar-btn" data-action="share-character">Share</button>' +
      '<button type="button" class="toolbar-btn" data-action="save-character" id="saveCharacterBtn">Save</button>' +
      '<button type="button" class="toolbar-btn" data-action="send-to-tracker-character">Send to Tracker</button>' +
    '</div>' +
    '<div class="sheet">' +
      '<div class="sheet-header">' +
        '<div>' +
          '<h2 class="char-name">'+c.name+'</h2>' +
          '<p class="char-sub">Level '+c.level+', <b>'+c.race.name+' '+classLabel+'</b> \u00b7 '+c.bg.name+'<span class="char-align-sep"> \u00b7 </span><span class="char-alignment">'+c.alignment+'</span></p>' +
        '</div>' +
        '<div class="level-badge">Level '+c.level+'</div>' +
      '</div>' +

      '<div class="core-stats">' +
        '<div class="core-stat"><span class="cs-label">Hit Points</span>'+calcBtn('hp', c.hp, 'cs-value')+'</div>' +
        '<div class="core-stat"><span class="cs-label">Armor Class</span>'+calcBtn('ac', c.ac, 'cs-value')+'</div>' +
        '<div class="core-stat"><span class="cs-label">Speed</span>'+calcBtn('speed', c.speed+' ft', 'cs-value')+'</div>' +
        '<div class="core-stat"><span class="cs-label">Proficiency</span>'+calcBtn('prof', fmtMod(c.prof), 'cs-value')+'</div>' +
      '</div>' +

      '<p class="mini-stats">Initiative '+calcBtn('init', '<b>'+fmtMod(sheetInitiative(c).total)+'</b>')+'<span class="mini-stats-sep">\u00b7</span>Passive Perception '+calcBtn('passive', '<b>'+sheetPassivePerception(c).total+'</b>')+'</p>' +
      '<p class="calc-hint">Click any number to see how it\u2019s worked out.</p>' +

      '<div class="abilities">' + scoreRow(c.scores, true) + '</div>' +

      '<div class="section">' +
        '<h3 class="section-title">Saving Throws</h3>' +
        '<div class="abilities saves-grid">' + savesRow(c) + '</div>' +
      '</div>' +

      '<div class="two-col">' +
        '<div class="section">' +
          '<h3 class="section-title">Race &amp; Traits</h3>' +
          '<ul class="trait-list">' + c.race.traits.map(t=>'<li>'+t+'</li>').join('') + '</ul>' +
        '</div>' +
        '<div class="section">' +
          '<h3 class="section-title">Class</h3>' +
          '<p style="margin:0 0 10px;font-size:14.5px;line-height:1.6;">'+c.cls.profs+'</p>' +
          '<p style="margin:0;font-size:14.5px;">'+subclassLine+'</p>' +
          (mc ? (
            '<p style="margin:14px 0 10px;font-size:14.5px;line-height:1.6;"><b>'+mc.cls2.name+' (multiclass):</b> '+MULTICLASS_PROFICIENCIES[mc.cls2.name]+'</p>' +
            '<p style="margin:0;font-size:14.5px;">'+subclassLine2+'</p>'
          ) : '') +
        '</div>' +
      '</div>' +

      classFeaturesSection(c) +

      (c.feats && c.feats.length ? (
        '<div class="section">' +
          '<h3 class="section-title">Feats</h3>' +
          '<div class="tag-row">' + c.feats.map(featTagBtn).join('') + '</div>' +
        '</div>'
      ) : '') +

      '<div class="section">' +
        '<h3 class="section-title">Skill Proficiencies</h3>' +
        skillTags(c) +
      '</div>' +

      spellSection(c.spellBlock, c.cls, !!mc, c, 1) +
      (mc ? spellSection(mc.spellBlock2, mc.cls2, true, c, 2) : '') +

      equipmentSection(c.gear) +

      '<div class="section" style="margin-bottom:0;">' +
        '<h3 class="section-title">Hook</h3>' +
        '<p class="hook">'+c.hook+'</p>' +
      '</div>' +

      '<div class="section" style="margin-bottom:0;">' +
        '<h3 class="section-title">Notes</h3>' +
        '<textarea class="character-notes" id="characterNotesInput" placeholder="Jot down anything you want to remember about this character\u2026">'+escapeHtml(c.notes || '')+'</textarea>' +
      '</div>' +
    '</div>';
}

function statBlockEntries(list, title){
  if(!list || !list.length) return '';
  let html = '<div class="section"><h3 class="section-title">'+title+'</h3>';
  html += list.map(t => '<p style="margin:0 0 10px;font-size:14.5px;line-height:1.6;"><b>'+t.name+'.</b> '+t.desc+'</p>').join('');
  html += '</div>';
  return html;
}

function monsterStatBlockHTML(m){
  const metaBits = [];
  if(m.saves) metaBits.push('<b>Saving Throws</b> '+m.saves);
  if(m.skills) metaBits.push('<b>Skills</b> '+m.skills);
  if(m.resist) metaBits.push('<b>Damage Resistances</b> '+m.resist);
  if(m.immune) metaBits.push('<b>Immunities</b> '+m.immune);
  const metaLine = metaBits.length ? '<p style="margin:0 0 8px;font-size:14px;line-height:1.7;">'+metaBits.join('<br>')+'</p>' : '';

  const legendaryIntro = m.legendary ? '<p style="margin:0 0 10px;font-size:14px;font-style:italic;color:var(--ink-text-soft);">The '+m.name.toLowerCase()+' can take 3 legendary actions, choosing from the options below. Only one legendary action can be used at a time, and only at the end of another creature\u2019s turn. The '+m.name.toLowerCase()+' regains spent legendary actions at the start of its turn.</p>' : '';

  return (
    '<div class="sheet-header">' +
      '<div>' +
        '<h2 class="char-name">'+m.name+'</h2>' +
        '<p class="char-sub">CR '+m.cr+' ('+m.xp.toLocaleString()+' XP), <b>'+m.size+' '+m.type+'</b>, '+m.alignment+'</p>' +
      '</div>' +
      '<div class="level-badge cr-badge">CR '+m.cr+' ('+m.xp.toLocaleString()+' XP)</div>' +
    '</div>' +

    '<div class="core-stats" style="grid-template-columns:repeat(3,1fr);">' +
      '<div class="core-stat"><span class="cs-label">Armor Class</span><span class="cs-value">'+m.ac+'</span>'+(m.acNote?'<div style="font-size:10.5px;color:var(--ink-text-soft);margin-top:2px;">'+m.acNote+'</div>':'')+'</div>' +
      '<div class="core-stat"><span class="cs-label">Hit Points</span><span class="cs-value">'+m.hp+'</span><div style="font-size:10.5px;color:var(--ink-text-soft);margin-top:2px;">('+m.hitDice+')</div></div>' +
      '<div class="core-stat"><span class="cs-label">Speed</span><span class="cs-value" style="font-size:16px;">'+m.speed+'</span></div>' +
    '</div>' +

    '<div class="abilities">' + scoreRow(m.scores) + '</div>' +

    metaLine +
    '<p style="margin:0 0 20px;font-size:13px;color:var(--ink-text-soft);line-height:1.7;">' +
      '<b>Senses</b> '+m.senses+'<br>' +
      '<b>Languages</b> '+m.languages +
    '</p>' +

    statBlockEntries(m.traits, 'Traits') +
    statBlockEntries(m.actions, 'Actions') +
    (m.legendary ? '<div class="section" style="margin-bottom:0;"><h3 class="section-title">Legendary Actions</h3>'+legendaryIntro+m.legendary.map(t=>'<p style="margin:0 0 10px;font-size:14.5px;line-height:1.6;"><b>'+t.name+'.</b> '+t.desc+'</p>').join('')+'</div>' : '')
  );
}

function renderMonsterSheet(m){
  const el = document.getElementById('monsterSheetContainer');
  el.innerHTML =
    '<div class="sheet-toolbar">' +
      '<button type="button" class="toolbar-btn" data-action="copy-monster-text" id="copyMonsterTextBtn">Copy as Text</button>' +
      '<button type="button" class="toolbar-btn" data-action="export-pdf-monster">Export as PDF</button>' +
      '<button type="button" class="toolbar-btn" data-action="share-monster">Share</button>' +
      '<button type="button" class="toolbar-btn" data-action="save-monster" id="saveMonsterBtn">Save</button>' +
      '<button type="button" class="toolbar-btn" data-action="send-to-tracker-monster">Send to Tracker</button>' +
    '</div>' +
    '<div class="sheet">' + monsterStatBlockHTML(m) + '</div>';
}

const HOARD_LABELS = { small:'Small', medium:'Medium', large:'Large', huge:'Huge' };

function lootItemBtn(item){
  if(item.kind === 'magic-item'){
    return '<button type="button" class="tag gear-tag rarity-'+slugify(item.rarity)+'" data-kind="magic-item" data-name="'+item.name+'">'+item.name+
      '<span class="rarity-label">'+item.rarity+'</span></button>';
  }
  if(item.kind === 'trade-good'){
    if(!TRADE_GOOD_DESC[item.name]) TRADE_GOOD_DESC[item.name] = { value:item.value, desc:item.desc };
    return '<button type="button" class="tag gear-tag rarity-uncommon" data-kind="trade-good" data-name="'+item.name+'">'+item.name+
      '<span class="rarity-label">'+item.value+' gp</span></button>';
  }
  return '<button type="button" class="tag gear-tag" data-kind="equipment" data-name="'+item.name+'">'+item.name+'</button>';
}
const TRADE_GOOD_DESC = {};

function renderLootSheet(loot){
  const el = document.getElementById('lootSheetContainer');

  el.innerHTML =
    '<div class="sheet-toolbar">' +
      '<button type="button" class="toolbar-btn" data-action="copy-loot-text" id="copyLootTextBtn">Copy as Text</button>' +
      '<button type="button" class="toolbar-btn" data-action="export-pdf-loot">Export as PDF</button>' +
      '<button type="button" class="toolbar-btn" data-action="share-loot">Share</button>' +
      '<button type="button" class="toolbar-btn" data-action="save-loot" id="saveLootBtn">Save</button>' +
    '</div>' +
    '<div class="sheet">' +
      '<div class="sheet-header">' +
        '<div>' +
          '<h2 class="char-name">'+HOARD_LABELS[loot.hoardKey]+' Hoard</h2>' +
          '<p class="char-sub">Party Level '+loot.level+'</p>' +
        '</div>' +
        '<div class="level-badge">'+loot.gold.toLocaleString()+' gp</div>' +
      '</div>' +

      '<div class="section">' +
        '<h3 class="section-title">Items Found</h3>' +
        '<div class="tag-row">' + loot.items.map(lootItemBtn).join('') + '</div>' +
      '</div>' +
    '</div>';
}

/* ================= WIRING ================= */

const levelSlider = document.getElementById('levelSlider');
const levelValue = document.getElementById('levelValue');
const rollBtn = document.getElementById('rollBtn');
const sealLabel = document.getElementById('sealLabel');
const lockRow = document.getElementById('lockRow');
const historyList = document.getElementById('historyList');
const raceChoice = document.getElementById('raceChoice');
const classChoice = document.getElementById('classChoice');

RACES.forEach(r => {
  const opt = document.createElement('option');
  opt.value = r.name;
  opt.textContent = r.name;
  raceChoice.appendChild(opt);
});
CLASSES.forEach(c => {
  const opt = document.createElement('option');
  opt.value = c.name;
  opt.textContent = c.name;
  classChoice.appendChild(opt);
});

const multiclassToggle = document.getElementById('multiclassToggle');
const multiclassChoiceWrap = document.getElementById('multiclassChoiceWrap');
const multiclassChoice = document.getElementById('multiclassChoice');
CLASSES.forEach(c => {
  const opt = document.createElement('option');
  opt.value = c.name;
  opt.textContent = c.name;
  multiclassChoice.appendChild(opt);
});
multiclassToggle.addEventListener('click', () => {
  const active = multiclassToggle.getAttribute('data-active') !== 'true';
  multiclassToggle.setAttribute('data-active', String(active));
  multiclassToggle.classList.toggle('active', active);
  multiclassChoiceWrap.hidden = !active;
});

levelSlider.addEventListener('input', () => {
  levelValue.textContent = levelSlider.value;
});

/* ---------- Locks ---------- */

const locks = { bg:false, alignment:false };
let currentCharacter = null;
// Tracks which savedRolls document (if any) the currently-displayed
// character corresponds to, so the Save button can update that same
// entry instead of always creating a fresh duplicate. null means this
// character has never been saved (or was freshly rolled/shared), so
// the next save creates a new document.
let currentCharacterRollId = null;

lockRow.addEventListener('click', (e) => {
  const chip = e.target.closest('.lock-chip');
  if(!chip) return;
  const key = chip.getAttribute('data-lock');
  locks[key] = !locks[key];
  chip.classList.toggle('locked', locks[key]);
});

/* ---------- History (persisted via artifact storage) ---------- */

const HISTORY_KEY = 'roll-history';
const HISTORY_MAX = 20;
let rollHistory = [];

function renderHistory(){
  if(rollHistory.length === 0){
    historyList.innerHTML = '<p class="history-empty">Rolls you forge will appear here.</p>';
    return;
  }
  historyList.innerHTML = rollHistory.map((c, i) => {
    const active = (currentCharacter && currentCharacter.__historyId === c.__historyId) ? ' active' : '';
    const pinned = c.pinned ? ' pinned' : '';
    return '<div class="history-item'+active+pinned+'">' +
      '<button type="button" class="history-item-main" data-history-index="'+i+'">' +
        '<span class="hi-name">'+c.name+'</span>' +
        '<span class="hi-sub">Lv'+c.level+' '+c.race.name+' '+c.cls.name+'</span>' +
      '</button>' +
      '<button type="button" class="history-star'+pinned+'" data-history-pin="'+i+'" aria-label="'+(c.pinned ? 'Unpin this roll' : 'Pin this roll')+'" title="'+(c.pinned ? 'Unpin' : 'Pin so it isn\u2019t pushed out of history') +'">'+(c.pinned ? '\u2605' : '\u2606')+'</button>' +
      '</div>';
  }).join('');
}

// Keeps history at HISTORY_MAX total, but never evicts a pinned entry —
// only the oldest unpinned entries are trimmed once the cap is exceeded.
function enforceHistoryCap(){
  const pinnedCount = rollHistory.filter(c => c.pinned).length;
  const remainingSlots = Math.max(0, HISTORY_MAX - pinnedCount);
  let unpinnedSeen = 0;
  rollHistory = rollHistory.filter(c => {
    if(c.pinned) return true;
    unpinnedSeen++;
    return unpinnedSeen <= remainingSlots;
  });
}

async function saveHistory(){
  if(!window.storage) return;
  try{
    await window.storage.set(HISTORY_KEY, JSON.stringify(rollHistory), false);
  }catch(e){ /* best-effort — history still works for this session */ }
}

async function loadHistory(){
  if(!window.storage) return;
  try{
    const result = await window.storage.get(HISTORY_KEY, false);
    if(result && result.value){
      rollHistory = JSON.parse(result.value);
      renderHistory();
    }
  }catch(e){ /* no saved history yet, or storage unavailable */ }
}
loadHistory();

historyList.addEventListener('click', (e) => {
  const pinBtn = e.target.closest('[data-history-pin]');
  if(pinBtn){
    const idx = parseInt(pinBtn.getAttribute('data-history-pin'), 10);
    const entry = rollHistory[idx];
    if(!entry) return;
    entry.pinned = !entry.pinned;
    enforceHistoryCap();
    renderHistory();
    saveHistory();
    return;
  }
  const btn = e.target.closest('[data-history-index]');
  if(!btn) return;
  const idx = parseInt(btn.getAttribute('data-history-index'), 10);
  const entry = rollHistory[idx];
  if(!entry) return;
  currentCharacter = entry;
  levelSlider.value = entry.level;
  levelValue.textContent = entry.level;
  renderSheet(entry);
  renderHistory();
});

/* ---------- Roll ---------- */

rollBtn.addEventListener('click', async () => {
  const level = parseInt(levelSlider.value, 10);
  rollBtn.classList.add('stamping');
  rollBtn.disabled = true;
  sealLabel.textContent = 'Forging…';
  const minWait = new Promise(r => setTimeout(r, 420));

  const effectiveLocks = {};
  if(currentCharacter){
    if(locks.bg) effectiveLocks.bg = currentCharacter.bg;
    if(locks.alignment) effectiveLocks.alignment = currentCharacter.alignment;
  }
  if(raceChoice.value) effectiveLocks.race = RACES.find(r => r.name === raceChoice.value);
  if(classChoice.value) effectiveLocks.cls = CLASSES.find(c => c.name === classChoice.value);

  let multiclassCls = null;
  if(multiclassToggle.getAttribute('data-active') === 'true'){
    multiclassCls = multiclassChoice.value === 'any'
      ? 'any'
      : CLASSES.find(c => c.name === multiclassChoice.value);
  }

  try{
    const [character] = await Promise.all([generateCharacter(level, effectiveLocks, multiclassCls), minWait]);
    character.__historyId = Date.now() + '-' + Math.random().toString(36).slice(2,7);
    currentCharacter = character;
    currentCharacterRollId = null; // a freshly rolled character isn't saved anywhere yet
    renderSheet(character);
    sealLabel.textContent = 'Strike again';

    rollHistory.unshift(character);
    enforceHistoryCap();
    renderHistory();
    saveHistory();
  }catch(e){
    sealLabel.textContent = 'Something went wrong, try again';
  }finally{
    rollBtn.classList.remove('stamping');
    rollBtn.disabled = false;
  }
});

/* ---------- Export as text ---------- */

function characterToText(c){
  const lines = [];
  lines.push(c.name+', Level '+c.level+' '+c.race.name+' '+c.cls.name);
  lines.push(c.bg.name+' · '+c.alignment);
  lines.push('');
  refreshDerivedStats(c);
  lines.push('HP '+c.hp+'   AC '+c.ac+'   Speed '+c.speed+'ft   Proficiency '+fmtMod(c.prof));
  lines.push('Initiative '+fmtMod(sheetInitiative(c).total)+'   Passive Perception '+sheetPassivePerception(c).total);
  lines.push('');
  lines.push(ABILS.map(a => a.toUpperCase()+' '+c.scores[a]+' ('+fmtMod(mod(c.scores[a]))+')').join('   '));
  lines.push('');
  lines.push('SAVING THROWS');
  lines.push(ABILS.map(a => {
    const r = sheetSave(c, a);
    return a.toUpperCase()+' '+fmtMod(r.total)+(r.proficient?'*':'');
  }).join('   ') + '   (* = proficient)');
  lines.push('');
  lines.push('RACE TRAITS');
  c.race.traits.forEach(t => lines.push('- '+t));
  lines.push('');
  if(c.feats && c.feats.length){
    lines.push('FEATS');
    c.feats.forEach(f => lines.push('- '+f));
    lines.push('');
  }
  lines.push('CLASS');
  lines.push(c.cls.profs);
  lines.push(c.subclass ? (c.cls.subclassLabel+': '+c.subclass) : (c.cls.subclassLabel+' not yet chosen'));
  lines.push('');
  lines.push('SKILLS');
  lines.push(c.skills.map(s => { const r = sheetSkill(c, s); return s+' '+fmtMod(r.total)+(r.expert ? ' (expertise)' : ''); }).join(', '));
  if(c.spellBlock){
    lines.push('');
    lines.push('SPELLCASTING');
    lines.push('Ability '+ABIL_NAMES[c.spellBlock.ability]+'   Save DC '+c.spellBlock.saveDC+'   Attack '+fmtMod(c.spellBlock.attackBonus)+'   Max Spell Level '+c.spellBlock.maxSpellLevel);
    if(c.spellBlock.cantrips.length) lines.push('Cantrips: '+c.spellBlock.cantrips.join(', '));
    groupSpellsByLevel(c.spellBlock.list || c.cls.name, c.spellBlock.known).forEach(([lvl, names]) => {
      lines.push((lvl ? ordinal(lvl)+' level' : 'Spells')+': '+names.join(', '));
    });
    if(c.spellBlock.arcanum && c.spellBlock.arcanum.length) lines.push('Mystic Arcanum: '+c.spellBlock.arcanum.join(', '));
  }
  lines.push('');
  lines.push('EQUIPMENT');
  c.gear.filter(g=>!g.isMagic).forEach(g => lines.push('- '+(g.n>1?g.n+'x ':'')+g.name));
  const magic = c.gear.filter(g=>g.isMagic);
  if(magic.length){
    lines.push('Items Found:');
    magic.forEach(g => {
      const info = MAGIC_ITEM_DESC_LOOKUP[g.name];
      lines.push('- '+g.name+' ('+g.rarity+')'+(info && info.stats ? ': '+info.stats : ''));
    });
  }
  lines.push('');
  lines.push('HOOK');
  lines.push(c.hook);
  if(c.notes && c.notes.trim()){
    lines.push('');
    lines.push('NOTES');
    lines.push(c.notes);
  }
  return lines.join('\n');
}

function copyTextFallback(text){
  openModal('Character Sheet Text');
  modalMeta.innerHTML = 'Copy didn\u2019t run automatically. Select the text below and copy manually.';
  modalBody.innerHTML = '';
  const ta = document.createElement('textarea');
  ta.className = 'copy-textarea';
  ta.readOnly = true;
  ta.value = text;
  modalBody.appendChild(ta);
  ta.focus();
  ta.select();
}

async function copyCharacterText(){
  const text = characterToText(currentCharacter);
  try{
    if(navigator.clipboard && navigator.clipboard.writeText){
      await navigator.clipboard.writeText(text);
      const btn = document.getElementById('copyTextBtn');
      if(btn){
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = original; }, 1500);
      }
      return;
    }
    throw new Error('Clipboard API unavailable');
  }catch(e){
    // Fall back to select-and-copy via a hidden textarea, then a visible one if that fails too.
    try{
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if(!ok) throw new Error('execCommand failed');
      const btn = document.getElementById('copyTextBtn');
      if(btn){
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = original; }, 1500);
      }
    }catch(e2){
      copyTextFallback(text);
    }
  }
}

/* ---------- Description modal ---------- */

const modalOverlay = document.getElementById('modalOverlay');
const modalPanel = document.getElementById('modalPanel');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
let lastFocusedEl = null;

function openModal(title){
  modalTitle.textContent = title;
  modalMeta.innerHTML = '';
  modalBody.innerHTML = '';
  lastFocusedEl = document.activeElement;
  modalOverlay.hidden = false;
  modalPanel.focus();
}
function closeModal(){
  modalOverlay.hidden = true;
  if(lastFocusedEl && lastFocusedEl.focus) lastFocusedEl.focus();
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e)=>{ if(e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !modalOverlay.hidden) closeModal(); });

/* ---------- Feedback form ---------- */

const feedbackTrigger = document.getElementById('feedbackTrigger');
const feedbackOverlay = document.getElementById('feedbackOverlay');
const feedbackPanel = document.getElementById('feedbackPanel');
const feedbackClose = document.getElementById('feedbackClose');
const feedbackForm = document.getElementById('feedbackForm');
const feedbackSubmit = document.getElementById('feedbackSubmit');
const feedbackStatus = document.getElementById('feedbackStatus');
let feedbackLastFocusedEl = null;

function openFeedback(){
  feedbackLastFocusedEl = document.activeElement;
  feedbackOverlay.hidden = false;
  feedbackPanel.focus();
}
function closeFeedback(){
  feedbackOverlay.hidden = true;
  if(feedbackLastFocusedEl && feedbackLastFocusedEl.focus) feedbackLastFocusedEl.focus();
}
feedbackTrigger.addEventListener('click', openFeedback);
feedbackClose.addEventListener('click', closeFeedback);
feedbackOverlay.addEventListener('click', (e)=>{ if(e.target === feedbackOverlay) closeFeedback(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !feedbackOverlay.hidden) closeFeedback(); });

/* ---------- Privacy policy modal ---------- */
// Uses localStorage rather than window.storage: this needs to actually work
// on the real deployed site, not just when previewed inside Claude.ai.

const privacyTrigger = document.getElementById('privacyTrigger');
const privacyOverlay = document.getElementById('privacyOverlay');
const privacyPanel = document.getElementById('privacyPanel');
const privacyClose = document.getElementById('privacyClose');
let privacyLastFocusedEl = null;

function openPrivacy(){
  privacyLastFocusedEl = document.activeElement;
  privacyOverlay.hidden = false;
  privacyPanel.focus();
}
function closePrivacy(){
  privacyOverlay.hidden = true;
  if(privacyLastFocusedEl && privacyLastFocusedEl.focus) privacyLastFocusedEl.focus();
}
privacyTrigger.addEventListener('click', openPrivacy);
privacyClose.addEventListener('click', closePrivacy);
privacyOverlay.addEventListener('click', (e)=>{ if(e.target === privacyOverlay) closePrivacy(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !privacyOverlay.hidden) closePrivacy(); });

/* ---------- Cookie consent banner ---------- */
// Ads (AdSense) and analytics (Google Analytics, Microsoft Clarity) all
// set non-essential cookies, so the actual tracking scripts
// (loadAdsAndAnalytics, defined in <head>) only ever run after a stored
// "accepted" choice — never on page load itself. "Necessary only" simply
// never calls that function, so no non-essential cookie is set at all
// until the user opts in.
const cookieBanner = document.getElementById('cookieBanner');
const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
const cookieRejectBtn = document.getElementById('cookieRejectBtn');
const cookieSettingsTrigger = document.getElementById('cookieSettingsTrigger');
const cookieBannerPrivacyLink = document.getElementById('cookieBannerPrivacyLink');

function showCookieBanner(){ cookieBanner.hidden = false; }
function hideCookieBanner(){ cookieBanner.hidden = true; }

function setCookieConsent(choice){
  try{ localStorage.setItem('cookie-consent', choice); }catch(e){ /* storage unavailable, non-fatal — banner will just reappear next visit */ }
  if(choice === 'accepted') loadAdsAndAnalytics();
  hideCookieBanner();
}

cookieAcceptBtn.addEventListener('click', () => setCookieConsent('accepted'));
cookieRejectBtn.addEventListener('click', () => setCookieConsent('rejected'));
cookieSettingsTrigger.addEventListener('click', showCookieBanner);
cookieBannerPrivacyLink.addEventListener('click', openPrivacy);

(function initCookieConsent(){
  let saved = null;
  try{ saved = localStorage.getItem('cookie-consent'); }catch(e){ /* storage unavailable — treat as undecided, banner shows every visit */ }
  if(saved === 'accepted') loadAdsAndAnalytics();
  else if(saved !== 'rejected') showCookieBanner();
})();

feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  feedbackSubmit.disabled = true;
  feedbackSubmit.textContent = 'Sending…';
  feedbackStatus.hidden = true;
  feedbackStatus.classList.remove('success');

  const formData = new FormData(feedbackForm);
  const payload = JSON.stringify(Object.fromEntries(formData));

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: payload,
  })
    .then((res) => {
      if(!res.ok) throw new Error('bad response');
      feedbackStatus.textContent = 'Sent, thank you! I read every one of these.';
      feedbackStatus.classList.add('success');
      feedbackStatus.hidden = false;
      feedbackForm.reset();
      feedbackSubmit.textContent = 'Send it';
      feedbackSubmit.disabled = false;
    })
    .catch(() => {
      feedbackStatus.textContent = 'That didn\u2019t go through, mind trying again in a moment?';
      feedbackStatus.hidden = false;
      feedbackSubmit.textContent = 'Send it';
      feedbackSubmit.disabled = false;
    });
});

function handleTagClick(kind, name){
  if(kind === 'calc'){ showSheetCalc(name); return; }
  openModal(name);

  if(kind === 'spell'){
    const info = SPELL_DESC_LOOKUP[name];
    if(info){
      const levelLabel = info.level===0 ? 'Cantrip' : ('Level '+info.level);
      modalMeta.innerHTML =
        '<b>'+levelLabel+' \u00b7 '+info.school+'</b><br>' +
        'Casting Time: '+info.time+' &nbsp;\u00b7&nbsp; Range: '+info.range+'<br>' +
        'Components: '+info.comp+' &nbsp;\u00b7&nbsp; Duration: '+info.dur;
      let body = '<p>'+info.desc+'</p>';
      if(info.higher) body += '<p><b>At Higher Levels.</b> '+info.higher+'</p>';
      modalBody.innerHTML = body;
    } else {
      modalMeta.innerHTML = '';
      modalBody.innerHTML = '<p>No description on file for this spell.</p>';
    }
    return;
  }

  if(kind === 'feat'){
    const info = FEAT_REGISTRY[name];
    if(info){
      modalMeta.innerHTML = '<b>Feat</b>';
      modalBody.innerHTML = '<p>'+info.desc+'</p>';
    } else {
      modalMeta.innerHTML = '';
      modalBody.innerHTML = '<p>No description on file for this feat.</p>';
    }
    return;
  }

  if(kind === 'magic-item'){
    const info = MAGIC_ITEM_DESC_LOOKUP[name];
    if(info){
      modalMeta.innerHTML = '<b>'+info.category+', '+info.rarity+(info.attune ? ' (requires attunement)' : '')+'</b>';
      let body = '';
      if(info.stats) body += '<p style="background:rgba(122,46,40,0.08);border:1px solid rgba(122,46,40,0.25);border-radius:6px;padding:10px 12px;font-family:\'JetBrains Mono\', monospace;font-size:13px;color:var(--sigil-red);margin:0 0 14px;">'+info.stats+'</p>';
      body += '<p>'+info.desc+'</p>';
      modalBody.innerHTML = body;
    } else {
      modalMeta.innerHTML = '';
      modalBody.innerHTML = '<p>No description on file for this item.</p>';
    }
    return;
  }

  if(kind === 'trade-good'){
    const info = TRADE_GOOD_DESC[name];
    if(info){
      modalMeta.innerHTML = '<b>Trade Good \u00b7 worth roughly '+info.value+' gp</b>';
      modalBody.innerHTML = '<p>'+info.desc+'</p>';
    } else {
      modalMeta.innerHTML = '';
      modalBody.innerHTML = '<p>No description on file for this item.</p>';
    }
    return;
  }

  // mundane equipment
  const info = EQUIPMENT_DESC[name];
  if(info){
    modalMeta.innerHTML = '<b>'+info.category+'</b><br>'+info.meta;
    modalBody.innerHTML = '<p>'+info.desc+'</p>';
  } else {
    modalMeta.innerHTML = '';
    modalBody.innerHTML = '<p>No description on file for this item. It\u2019s likely a simple piece of gear without special mechanics.</p>';
  }
}

/* ---------- Share links ---------- */
// Encodes just the *result* of a roll (not the whole reference data behind
// it) into the URL, so a shared link reconstructs the exact same character,
// monster, or loot hoard someone else rolled, rather than re-rolling fresh.

function buildShareUrl(type, payload){
  const packed = { t: type, d: payload };
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(packed))));
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('share', encoded);
  return url.toString();
}

function decodeShareParam(encoded){
  try{
    const json = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(json);
  }catch(e){
    return null;
  }
}

// Breakdown parts are [label, value, kind] in memory; Firestore can't store
// arrays inside arrays, so they're saved as {l, v, k} objects.
function partsToStore(parts){ return parts ? parts.map(p => ({ l:p[0], v:p[1], k:p[2] || null })) : null; }
function partsFromStore(arr){ return Array.isArray(arr) ? arr.map(o => Array.isArray(o) ? o : [o.l, o.v, o.k || undefined]) : null; }

// withBreakdowns: include where each score/HP point came from. Saved rolls
// keep it; share links leave it out to keep URLs short.
function characterToSharePayload(c, withBreakdowns){
  const mc = c.multiclass;
  return {
    race: c.race.name, cls: c.cls.name, bg: c.bg.name,
    alignment: c.alignment, level: c.level, name: c.name,
    scores: c.scores, prof: c.prof, hp: c.hp, ac: c.ac,
    skills: c.skills, subclass: c.subclass, feats: c.feats || [],
    expertise: c.expertise || [], extraSaves: c.extraSaves || [],
    scoreParts: (withBreakdowns && c.scoreParts) ? Object.fromEntries(ABILS.map(a => [a, partsToStore(c.scoreParts[a])])) : null,
    hpParts: withBreakdowns ? partsToStore(c.hpParts) : null,
    spellBlock: c.spellBlock ? {
      ability: c.spellBlock.ability, saveDC: c.spellBlock.saveDC,
      attackBonus: c.spellBlock.attackBonus, maxSpellLevel: c.spellBlock.maxSpellLevel,
      cantrips: c.spellBlock.cantrips, known: c.spellBlock.known, arcanum: c.spellBlock.arcanum || [],
      list: c.spellBlock.list || null, label: c.spellBlock.label || null,
    } : null,
    hook: c.hook, gold: c.gold, notes: c.notes || '',
    gear: c.gear.map(g => ({ n: g.n || null, name:g.name, isMagic: g.isMagic || false, kind: g.kind || null, rarity: g.rarity || null })),
    multiclass: mc ? {
      cls2: mc.cls2.name, level1: mc.level1, level2: mc.level2, subclass2: mc.subclass2,
      spellBlock2: mc.spellBlock2 ? {
        ability: mc.spellBlock2.ability, saveDC: mc.spellBlock2.saveDC,
        attackBonus: mc.spellBlock2.attackBonus, maxSpellLevel: mc.spellBlock2.maxSpellLevel,
        cantrips: mc.spellBlock2.cantrips, known: mc.spellBlock2.known, arcanum: mc.spellBlock2.arcanum || [],
        list: mc.spellBlock2.list || null, label: mc.spellBlock2.label || null,
      } : null,
    } : null,
  };
}
function characterFromSharePayload(d){
  const race = RACES.find(r => r.name === d.race);
  const cls = CLASSES.find(c => c.name === d.cls);
  const bg = BACKGROUNDS.find(b => b.name === d.bg);
  if(!race || !cls || !bg) return null;
  let multiclass = null;
  if(d.multiclass && d.multiclass.cls2){
    const cls2 = CLASSES.find(c => c.name === d.multiclass.cls2);
    if(cls2){
      multiclass = {
        cls2, level1: d.multiclass.level1, level2: d.multiclass.level2,
        subclass2: d.multiclass.subclass2, spellBlock2: d.multiclass.spellBlock2,
      };
    }
  }
  return {
    name: d.name, level: d.level, race, cls, bg, alignment: d.alignment,
    scores: d.scores, prof: d.prof, hp: d.hp, ac: d.ac, speed: race.speed,
    skills: d.skills, spellBlock: d.spellBlock, subclass: d.subclass, feats: d.feats || [],
    expertise: d.expertise || [], extraSaves: d.extraSaves || [],
    scoreParts: d.scoreParts ? Object.fromEntries(ABILS.map(a => [a, partsFromStore(d.scoreParts[a])])) : null,
    hpParts: partsFromStore(d.hpParts),
    hook: d.hook, gold: d.gold, gear: d.gear, notes: d.notes || '',
    multiclass,
  };
}

function monsterToSharePayload(m){ return { name: m.name }; }
function monsterFromSharePayload(d){
  if(!MONSTER_REGISTRY[d.name]) return null;
  return Object.assign({ name: d.name }, MONSTER_REGISTRY[d.name]);
}

function lootToSharePayload(l){ return { level: l.level, hoardKey: l.hoardKey, gold: l.gold, items: l.items }; }
function lootFromSharePayload(d){ return d; }

function shareCurrentRoll(type, obj, buttonEl){
  let payload;
  if(type === 'c') payload = characterToSharePayload(obj);
  else if(type === 'm') payload = monsterToSharePayload(obj);
  else payload = lootToSharePayload(obj);

  const url = buildShareUrl(type, payload);
  const originalText = buttonEl ? buttonEl.textContent : null;

  const showCopied = () => {
    if(!buttonEl) return;
    buttonEl.textContent = 'Link copied!';
    setTimeout(() => { buttonEl.textContent = originalText; }, 1800);
  };
  const showFailed = () => {
    if(!buttonEl) return;
    buttonEl.textContent = 'Copy failed';
    setTimeout(() => { buttonEl.textContent = originalText; }, 1800);
  };

  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(showCopied).catch(showFailed);
  } else {
    try{
      const ta = document.createElement('textarea');
      ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showCopied();
    }catch(e){ showFailed(); }
  }
}

/* ---------- PDF export (html2pdf.js, with window.print() as fallback) ---------- */

function slugForFilename(name){
  return (name || 'sheet').toLowerCase().replace(/[\u2019']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'sheet';
}

function exportSheetAsPDF(containerId, filenameBase, buttonEl){
  const container = document.getElementById(containerId);
  const sheet = container ? container.querySelector('.sheet') : null;
  if(!sheet) return;

  if(typeof html2pdf === 'undefined'){
    // Library didn't load (e.g. no network) — fall back to the browser's print dialog.
    window.print();
    return;
  }

  const originalText = buttonEl ? buttonEl.textContent : null;
  if(buttonEl){ buttonEl.textContent = 'Exporting…'; buttonEl.disabled = true; }

  const opt = {
    margin: 0.4,
    filename: slugForFilename(filenameBase) + '.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: '#EDE2C8',
      // The PDF is for printing, so drop the "click a number" hint and underlines.
      onclone: (doc) => {
        doc.querySelectorAll('.calc-hint').forEach(el => el.remove());
        doc.querySelectorAll('.calc-btn, .calc-box, .skill-tag').forEach(el => el.classList.add('calc-static'));
      } },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  html2pdf().set(opt).from(sheet).save()
    .catch(() => { window.print(); })
    .finally(() => {
      if(buttonEl){ buttonEl.textContent = originalText; buttonEl.disabled = false; }
    });
}

document.getElementById('sheetContainer').addEventListener('click', (e)=>{
  const actionBtn = e.target.closest('[data-action]');
  if(actionBtn){
    const action = actionBtn.getAttribute('data-action');
    if(action === 'copy-text') copyCharacterText();
    else if(action === 'export-pdf-character') exportSheetAsPDF('sheetContainer', currentCharacter ? currentCharacter.name : 'character', actionBtn);
    else if(action === 'share-character' && currentCharacter) shareCurrentRoll('c', currentCharacter, actionBtn);
    else if(action === 'save-character' && currentCharacter) saveCurrentRollToAccount('character', currentCharacter, actionBtn);
    else if(action === 'send-to-tracker-character' && currentCharacter) sendCharacterToTracker(currentCharacter);
    return;
  }
  const btn = e.target.closest('[data-kind]');
  if(!btn) return;
  const kind = btn.getAttribute('data-kind');
  const name = btn.getAttribute('data-name');
  handleTagClick(kind, name);
});

let characterNotesAutoSaveTimer = null;
document.getElementById('sheetContainer').addEventListener('input', (e) => {
  if(e.target.id === 'characterNotesInput' && currentCharacter){
    currentCharacter.notes = e.target.value;
    // Only auto-save if this character has already been explicitly
    // saved once (currentCharacterRollId is set) — typing notes on a
    // character that was never saved shouldn't silently create a
    // save the person never asked for. For an already-saved
    // character, though, notes are exactly the kind of thing someone
    // edits after the fact and expects to just stick, so this
    // debounces a background update a second after they stop typing
    // rather than requiring a manual re-save.
    if(currentCharacterRollId && currentUser){
      clearTimeout(characterNotesAutoSaveTimer);
      characterNotesAutoSaveTimer = setTimeout(() => {
        fbDb.collection('users').doc(currentUser.uid).collection('savedRolls').doc(currentCharacterRollId).update({
          data: rollPayload('character', currentCharacter),
        }).catch((err) => console.error('Notes auto-save failed', err));
      }, 1000);
    }
  }
});

/* ================= TABS ================= */

const tabCharacter = document.getElementById('tabCharacter');
const tabMonster = document.getElementById('tabMonster');
const tabLoot = document.getElementById('tabLoot');
const tabSpellbook = document.getElementById('tabSpellbook');
const tabMyRolls = document.getElementById('tabMyRolls');
const tabEncounters = document.getElementById('tabEncounters');
const tabTracker = document.getElementById('tabTracker');
const tabDungeon = document.getElementById('tabDungeon');
const tabDonate = document.getElementById('tabDonate');
const tabBlog = document.getElementById('tabBlog');
const tabGenerators = document.getElementById('tabGenerators');
const generatorsDropdown = document.getElementById('generatorsDropdown');
const tabReference = document.getElementById('tabReference');
const referenceDropdown = document.getElementById('referenceDropdown');
const tabBestiary = document.getElementById('tabBestiary');
const characterView = document.getElementById('characterView');
const monsterView = document.getElementById('monsterView');
const lootView = document.getElementById('lootView');
const spellbookView = document.getElementById('spellbookView');
const bestiaryView = document.getElementById('bestiaryView');
const myrollsView = document.getElementById('myrollsView');
const accountView = document.getElementById('accountView');
const tabAccount = document.getElementById('tabAccount');
const encountersView = document.getElementById('encountersView');
const trackerView = document.getElementById('trackerView');
const dungeonView = document.getElementById('dungeonView');
const donateView = document.getElementById('donateView');
const blogView = document.getElementById('blogView');

const GENERATOR_TABS = ['character','monster','loot','encounters'];
const REFERENCE_TABS = ['spellbook','bestiary'];
const TAB_VIEWS = { character: characterView, monster: monsterView, loot: lootView, spellbook: spellbookView, bestiary: bestiaryView, myrolls: myrollsView, encounters: encountersView, tracker: trackerView, dungeon: dungeonView, donate: donateView, blog: blogView, account: accountView };
const TAB_BTNS = { character: tabCharacter, monster: tabMonster, loot: tabLoot, spellbook: tabSpellbook, bestiary: tabBestiary, myrolls: tabMyRolls, encounters: tabEncounters, tracker: tabTracker, dungeon: tabDungeon, donate: tabDonate, blog: tabBlog, account: tabAccount };
const TAB_LABELS = { character: 'Character Forge', monster: 'Monster Forge', loot: 'Loot Table', spellbook: 'Spellbook', bestiary: 'Bestiary', myrolls: 'My Rolls', encounters: 'Encounters', tracker: 'Initiative Tracker', dungeon: 'Dungeon Run', donate: 'About Me', blog: 'Blog', account: 'My Account' };

const navHamburger = document.getElementById('navHamburger');
const navBackdrop = document.getElementById('navBackdrop');
const mobileNavCurrent = document.getElementById('mobileNavCurrent');
const tabBar = document.getElementById('tabBar');

function setMobileNavOpen(open){
  tabBar.classList.toggle('open', open);
  navBackdrop.classList.toggle('open', open);
  navHamburger.setAttribute('aria-expanded', String(open));
}
navHamburger.addEventListener('click', () => setMobileNavOpen(!tabBar.classList.contains('open')));
navBackdrop.addEventListener('click', () => setMobileNavOpen(false));
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && tabBar.classList.contains('open')) setMobileNavOpen(false);
});

/* ---------- Landing page ---------- */

const landingPage = document.getElementById('landingPage');
const mobileNavHeader = document.getElementById('mobileNavHeader');
const scrollCueBtn = document.getElementById('scrollCueBtn');
const landingToolsPage = document.getElementById('landingToolsPage');

scrollCueBtn.addEventListener('click', () => {
  scrollCueBtn.classList.remove('pulse');
  scrollCueBtn.blur();
  landingToolsPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

function enterSite(tab){
  landingPage.hidden = true;
  mobileNavHeader.hidden = false;
  tabBar.hidden = false;
  if(tab === 'myrolls') openMyRollsTab();
  else if(tab === 'dungeon') openDungeonTab();
  else if(tab === 'account') openAccountTab();
  else switchTab(tab);
}
document.querySelectorAll('[data-enter]').forEach(el => {
  el.addEventListener('click', () => enterSite(el.getAttribute('data-enter')));
});

function switchTab(tab){
  Object.keys(TAB_VIEWS).forEach(key => {
    const active = key === tab;
    TAB_VIEWS[key].hidden = !active;
    TAB_VIEWS[key].style.display = active ? 'grid' : 'none';
    TAB_BTNS[key].classList.toggle('active', active);
  });
  tabGenerators.classList.toggle('active', GENERATOR_TABS.includes(tab));
  generatorsDropdown.classList.remove('open');
  tabReference.classList.toggle('active', REFERENCE_TABS.includes(tab));
  referenceDropdown.classList.remove('open');
  mobileNavCurrent.textContent = TAB_LABELS[tab];
  setMobileNavOpen(false);
  window.scrollTo(0, 0);

  // First-time visitors land on an empty sheet otherwise ("No hero yet" etc.),
  // which shows neither the visitor nor Google anything useful. Auto-roll a
  // sample the first time each generator tab is opened; a real user action
  // (rolling again, or loading a saved roll, which sets current* before
  // calling switchTab) always takes precedence over this.
  if(tab === 'character' && !currentCharacter) rollBtn.click();
  else if(tab === 'monster' && !currentMonster) monsterRollBtn.click();
  else if(tab === 'loot' && !currentLoot) lootRollBtn.click();
  else if(tab === 'encounters' && !currentEncounter) encRollBtn.click();
}

tabGenerators.addEventListener('click', (e) => {
  e.stopPropagation();
  referenceDropdown.classList.remove('open');
  generatorsDropdown.classList.toggle('open');
});
tabReference.addEventListener('click', (e) => {
  e.stopPropagation();
  generatorsDropdown.classList.remove('open');
  referenceDropdown.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if(!generatorsDropdown.contains(e.target)) generatorsDropdown.classList.remove('open');
  if(!referenceDropdown.contains(e.target)) referenceDropdown.classList.remove('open');
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){ generatorsDropdown.classList.remove('open'); referenceDropdown.classList.remove('open'); }
});
tabCharacter.addEventListener('click', () => switchTab('character'));
tabMonster.addEventListener('click', () => switchTab('monster'));
tabLoot.addEventListener('click', () => switchTab('loot'));
tabSpellbook.addEventListener('click', () => switchTab('spellbook'));
tabBestiary.addEventListener('click', () => switchTab('bestiary'));
function openMyRollsTab(){
  switchTab('myrolls');
  if(authReady){ renderMyRollsList(); renderCampaignNotes(); }
  else myrollsListContainer.innerHTML = '<p style="color:var(--ink-text-soft);">Checking your account…</p>';
}
tabMyRolls.addEventListener('click', openMyRollsTab);
tabAccount.addEventListener('click', openAccountTab);
tabEncounters.addEventListener('click', () => switchTab('encounters'));
tabTracker.addEventListener('click', () => switchTab('tracker'));

let currentDungeonRun = null;   // { run, runId } for the active run in this session
let currentDungeonRunId = null;

function openDungeonTab(){
  switchTab('dungeon');
  if(!authReady){
    dungeonMainContent.innerHTML = '<p style="color:var(--ink-text-soft);">Checking your account…</p>';
    return;
  }
  if(!currentUser){
    showDungeonClassPicker();
    return;
  }
  dungeonMainContent.innerHTML = '<p style="color:var(--ink-text-soft);">Checking for a run in progress…</p>';
  loadActiveDungeonRun().then((found) => {
    if(found){
      currentDungeonRun = found.run;
      currentDungeonRunId = found.id;
      renderDungeonRunState();
    } else {
      showDungeonClassPicker();
    }
  }).catch((e) => {
    console.error('Failed to check for an active run', e);
    showDungeonClassPicker();
  });
}
tabDungeon.addEventListener('click', openDungeonTab);

function openAccountTab(){
  switchTab('account');
  if(!authReady){
    document.getElementById('accountStatsGrid').innerHTML = '<p style="color:var(--ink-text-soft);">Checking your account…</p>';
    return;
  }
  // Signed out: show the sign-in prompt rather than opening a popup the browser would block.
  renderAccountPage();
}

const dungeonMainContent = document.getElementById('dungeonMainContent');
const dungeonClassRow = document.getElementById('dungeonClassRow');
const dungeonClassPickerBlock = document.getElementById('dungeonClassPickerBlock');
const dungeonRailFooter = document.getElementById('dungeonRailFooter');

function showDungeonClassPicker(){
  currentDungeonRun = null;
  currentDungeonRunId = null;
  dungeonClassPickerBlock.hidden = false;
  Array.from(dungeonClassRow.children).forEach(c => c.classList.remove('active'));
  dungeonMainContent.innerHTML =
    '<div style="text-align:center; padding:48px 24px;">' +
    '<p style="color:var(--ink-text-soft);">Pick a class in the sidebar to roll a fresh level-1 character and start your descent.</p>' +
    '</div>';
}

dungeonClassRow.addEventListener('click', (e) => {
  const btn = e.target.closest('.dungeon-class-btn');
  if(!btn) return;
  onDungeonClassPicked(btn.getAttribute('data-dungeon-class'));
});

async function onDungeonClassPicked(className){
  Array.from(dungeonClassRow.children).forEach(c => c.classList.toggle('active', c.getAttribute('data-dungeon-class') === className));
  dungeonMainContent.innerHTML = '<p style="color:var(--ink-text-soft);">Rolling your ' + className + '\u2026</p>';

  let run;
  try{
    run = await startDungeonRun(className);
  }catch(e){
    console.error('Failed to start Dungeon Run', e);
    dungeonMainContent.innerHTML = '<p style="color:var(--ink-text-soft);">Something went wrong starting the run: ' + escapeHtml(e.message || String(e)) + '</p>';
    return;
  }

  currentDungeonRun = run;
  currentDungeonRunId = null;
  // The cloud save is best-effort and kept separate from the run
  // itself — a network blip here shouldn't block the player from
  // actually playing a run that's already valid locally. If this
  // fails, the run just isn't persisted yet; the next action that
  // saves (or a manual retry) picks it up.
  if(currentUser){
    try{
      currentDungeonRunId = await saveDungeonRun(run, null);
    }catch(e){
      console.error('Failed to save the new Dungeon Run (continuing unsaved)', e);
    }
  }
  renderDungeonRunState();
  showDungeonRunIntro(run);
}

// Generic quest-hook openers, class-flavored where it's easy to do
// so without needing per-class variants of every line. Combined with
// the character's own personality hook (already generated by
// Character Forge, not a separate system) for a bit of specific
// flavor on top of the generic frame.
const DUNGEON_INTRO_HOOKS = {
  Fighter: [
    'Word reached you of a dungeon no one has returned from \u2014 which is, more or less, exactly why you\u2019re here.',
    'A tavern rumor about buried gold turned into something you couldn\u2019t walk away from.',
    'You\u2019ve fought for coin, for pride, and once for reasons you\u2019d rather not explain. This one\u2019s just for you.',
    'The last mercenary company you rode with is gone. This dungeon is where the trail ended.',
    'Someone bet you couldn\u2019t clear it. You intend to make them regret that.',
    'A noble house is paying handsomely for whatever\u2019s down there. You didn\u2019t ask too many questions.',
    'You\u2019ve stood at the mouth of worse places than this. Probably.',
  ],
  Rogue: [
    'You heard the rumors the same way you hear everything worth hearing: from someone who shouldn\u2019t have been talking.',
    'A locked door and an unclaimed vault \u2014 you were never going to say no to that combination.',
    'You owe someone a favor, and this dungeon is apparently how you pay it off.',
    'The map was stolen, the seller was nervous, and the price was suspiciously low. You bought it anyway.',
    'Word is something valuable went missing down there decades ago. You intend to un-lose it.',
    'You\u2019re not supposed to be here. That\u2019s usually when the good finds turn up.',
    'A rival went in looking for the same thing you\u2019re after. You\u2019d like to get there first.',
  ],
  Cleric: [
    'A vision, or something close enough to one, pointed you toward the dark beneath these ruins.',
    'Your order sent you to look into the silence coming from below \u2014 no one who went to check ever wrote back.',
    'Something down there is wrong in a way your faith won\u2019t let you ignore.',
    'A dying pilgrim\u2019s last words were a warning about this place. You came to see for yourself.',
    'The shrine above these ruins has been dark for a generation. You mean to find out why.',
    'You were called here, in the quiet, specific way that doesn\u2019t leave room for arguing.',
    'A plague of nightmares in the nearest village all trace back to this dungeon. You\u2019re here to end it.',
  ],
  Wizard: [
    'Old notes in an older book led you here \u2014 whatever\u2019s below, you mean to understand it before you leave.',
    'A colleague\u2019s research ended abruptly at these ruins. You\u2019re finishing what they started.',
    'Something down there is emitting magic your instruments have never measured before.',
    'You theorized this place existed for years. Actually finding it was the easy part.',
    'A forbidden text mentioned this dungeon exactly once, in a footnote you couldn\u2019t stop thinking about.',
    'The academy denied your request to investigate. You came anyway.',
    'Whatever\u2019s down there, it\u2019s older than anything in your spellbook \u2014 and that\u2019s exactly the appeal.',
  ],
};

function showDungeonRunIntro(run){
  const c = run.characterSnapshot;
  const pool = DUNGEON_INTRO_HOOKS[c.cls.name];
  const opener = pool ? pool[roll(pool.length)] : 'Whatever brought you here, the descent starts now.';
  openModal(c.name + '\u2019s Descent');
  modalBody.innerHTML =
    '<p>' + escapeHtml(opener) + '</p>' +
    '<button type="button" class="dungeon-modal-end-turn" id="dungeonIntroBeginBtn" style="margin-top:16px;">Begin</button>';
  document.getElementById('dungeonIntroBeginBtn').addEventListener('click', closeModal);
}

// Basic character-state display for now — the full choice/combat
// flow (CYOA branches, the actual fight screen, level-up popups)
// builds on top of this same render function in later slices.
function renderDungeonRunState(){
  const run = currentDungeonRun;
  const c = run.characterSnapshot;
  dungeonClassPickerBlock.hidden = true;
  dungeonRailFooter.textContent = run.characterSnapshot.name + ', level ' + run.runLevel + ' ' + c.cls.name + '. Permanent death: if this character falls, the run ends for good.';

  const gearNames = c.gear.map(g => g.name);
  const wornArmorName = gearNames.find(n => ARMOR_TABLE[n]);
  const armorEnchant = gearNames.find(n => /^\+\d Armor$/.test(n));
  const shieldEnchant = gearNames.find(n => /^\+\d Shield$/.test(n));
  const weaponNames = gearNames.filter(n => WEAPON_COMBAT_STATS[n]);
  const weaponEnchant = gearNames.find(n => /^\+\d Weapon$/.test(n));

  const armorLine = wornArmorName
    ? escapeHtml(wornArmorName) + ' (AC ' + ARMOR_TABLE[wornArmorName].ac + ')' + (armorEnchant ? ', ' + escapeHtml(armorEnchant) : '')
    : 'None (unarmored)';
  const weaponsLine = weaponNames.length
    ? weaponNames.map(escapeHtml).join(', ') + (weaponEnchant ? ' (' + escapeHtml(weaponEnchant) + ')' : '')
    : 'None';

  const equipmentHtml =
    '<div style="margin-top:12px;">' +
      '<p style="margin:4px 0;"><strong>Armor:</strong> ' + armorLine + (shieldEnchant ? ' \u00b7 ' + escapeHtml(shieldEnchant) : '') + '</p>' +
      '<p style="margin:4px 0;"><strong>Weapons:</strong> ' + weaponsLine + '</p>' +
    '</div>';

  const inventoryHtml = run.runInventory.length
    ? '<div style="margin-top:12px;">' + run.runInventory.map(it => '<span class="tag" style="margin:2px 4px 2px 0; display:inline-block;">' + escapeHtml(it.name) + '</span>').join('') + '</div>'
    : '<p style="margin-top:12px; color:var(--ink-text-soft); font-size:14px;">No items carried.</p>';

  dungeonMainContent.innerHTML =
    '<div class="sheet-toolbar">' +
      '<button type="button" class="toolbar-btn" id="dungeonBeginFightBtn">Continue</button>' +
      '<button type="button" class="toolbar-btn" id="dungeonShopBtn">Shop</button>' +
    '</div>' +
    '<div class="sheet">' +
      '<h3 style="margin-top:0;">' + c.name + '</h3>' +
      '<p style="color:var(--ink-text-soft);">Level ' + run.runLevel + ' ' + c.race.name + ' ' + c.cls.name + '</p>' +
      '<div class="core-stats" style="margin-top:16px;">' +
        '<div class="core-stat"><span class="cs-label">Hit Points</span><span class="cs-value">' + run.currentHp + ' / ' + run.maxHp + '</span></div>' +
        '<div class="core-stat"><span class="cs-label">Armor Class</span><span class="cs-value">' + c.ac + '</span></div>' +
        '<div class="core-stat"><span class="cs-label">Gold</span><span class="cs-value">' + run.runGold + '</span></div>' +
      '</div>' +
      '<h4 style="margin-bottom:4px;">Equipment</h4>' +
      equipmentHtml +
      '<h4 style="margin-bottom:4px;">Inventory</h4>' +
      inventoryHtml +
    '</div>';

  document.getElementById('dungeonBeginFightBtn').addEventListener('click', openDungeonPathChoiceModal);
  document.getElementById('dungeonShopBtn').addEventListener('click', renderDungeonShop);
}

/* ---------- Dungeon Run: combat screen ---------- */

let currentCombatState = null;
let dungeonCombatLog = [];
let dungeonUsedActionThisRound = false;
let dungeonUsedBonusThisRound = false;

function dungeonLog(lineOrLines){
  if(Array.isArray(lineOrLines)) dungeonCombatLog.push(...lineOrLines);
  else dungeonCombatLog.push(lineOrLines);
}

// A brief, purely visual overlay — the real roll has already been
// determined by the time this runs (resolveAction/resolveEnemyTurn
// already happened), this just gives the player something to watch
// land rather than jumping straight to a text log line. Flickers
// through random numbers, then settles on the actual rolled value.
/* ---------- Dungeon Run: 8-bit combat sound effects ---------- */
// Synthesized live via the Web Audio API rather than audio files —
// this is a single self-contained HTML page with nowhere to host
// sound assets, but a few short square-wave tones with a quick
// volume envelope reproduce that classic retro "blip" sound just
// fine, the same basic technique old 8-bit consoles used.
let dungeonAudioCtx = null;
let dungeonSoundMuted = false;
try{ dungeonSoundMuted = localStorage.getItem('dungeon-sound-muted') === 'true'; }catch(e){ /* storage unavailable — default to sound on */ }

function getDungeonAudioCtx(){
  // Browsers refuse to play audio before a user gesture, so this is
  // created lazily on first use (always inside a click-triggered
  // combat action) rather than at page load, and resumed here too in
  // case the tab auto-suspended it.
  if(!dungeonAudioCtx){
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if(!Ctx) return null;
    dungeonAudioCtx = new Ctx();
  }
  if(dungeonAudioCtx.state === 'suspended') dungeonAudioCtx.resume();
  return dungeonAudioCtx;
}

// One short square-wave tone with a quick linear decay to silence —
// the basic building block every effect below is made from.
function dungeonPlayTone(freq, duration, startOffset, volume){
  if(dungeonSoundMuted) return;
  const ctx = getDungeonAudioCtx();
  if(!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.value = freq;
  const startTime = ctx.currentTime + (startOffset || 0);
  gain.gain.setValueAtTime(volume != null ? volume : 0.15, startTime);
  gain.gain.linearRampToValueAtTime(0, startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

function playDungeonHitSound(){
  // A quick descending two-note blip — a satisfying little "thwack".
  dungeonPlayTone(320, 0.09, 0, 0.16);
  dungeonPlayTone(180, 0.11, 0.05, 0.14);
}
function playDungeonMissSound(){
  // A single short, higher, breathier blip — deliberately less
  // satisfying than a hit, so it reads as "nothing happened".
  dungeonPlayTone(500, 0.06, 0, 0.08);
}
function playDungeonCritSound(){
  // A brighter, three-note ascending flourish for a crit.
  dungeonPlayTone(392, 0.08, 0, 0.18);
  dungeonPlayTone(523, 0.08, 0.07, 0.18);
  dungeonPlayTone(659, 0.14, 0.14, 0.2);
}
function playDungeonHurtSound(){
  // Lower and harsher than the player's own hit sound, so a hit
  // landing on you reads as distinct from one you land on the enemy.
  dungeonPlayTone(140, 0.15, 0, 0.18);
}
function playDungeonVictorySound(){
  dungeonPlayTone(392, 0.1, 0, 0.16);
  dungeonPlayTone(523, 0.1, 0.1, 0.16);
  dungeonPlayTone(659, 0.22, 0.2, 0.18);
}
function playDungeonDefeatSound(){
  dungeonPlayTone(220, 0.18, 0, 0.16);
  dungeonPlayTone(196, 0.18, 0.16, 0.16);
  dungeonPlayTone(147, 0.35, 0.32, 0.16);
}

function toggleDungeonSoundMute(){
  dungeonSoundMuted = !dungeonSoundMuted;
  try{ localStorage.setItem('dungeon-sound-muted', String(dungeonSoundMuted)); }catch(e){ /* storage unavailable, non-fatal */ }
  const btn = document.getElementById('dungeonSoundToggle');
  if(btn) btn.textContent = dungeonSoundMuted ? '\ud83d\udd07' : '\ud83d\udd0a';
}
(function initDungeonSoundToggle(){
  const btn = document.getElementById('dungeonSoundToggle');
  if(!btn) return;
  btn.textContent = dungeonSoundMuted ? '\ud83d\udd07' : '\ud83d\udd0a';
  btn.addEventListener('click', toggleDungeonSoundMute);
})();

function showDiceRollAnimation(finalValue){
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'dungeon-dice-overlay';
    const die = document.createElement('div');
    die.className = 'dungeon-die';
    die.textContent = '?';
    overlay.appendChild(die);
    document.body.appendChild(overlay);

    let ticks = 0;
    const maxTicks = 7;
    const interval = setInterval(() => {
      ticks++;
      if(ticks < maxTicks){
        die.textContent = 1 + Math.floor(Math.random() * 20);
      } else {
        clearInterval(interval);
        die.textContent = finalValue;
        die.classList.add('settled');
        setTimeout(() => { overlay.remove(); resolve(); }, 450);
      }
    }, 70);
  });
}

// Narrative flourishes shown alongside the mechanical roll detail —
// picked from a pool so the same attack doesn't read identically
// every time. Split by melee/ranged and hit/miss/crit, since "swings"
// doesn't fit a bow and "looses an arrow" doesn't fit a mace.
const DUNGEON_MELEE_HIT_FLAVOR = [
  '{actor} swings {weapon} and strikes hard!',
  '{actor}\u2019s {weapon} finds its mark.',
  '{actor} drives {weapon} home.',
  '{actor} lands a solid blow with {weapon}.',
  '{actor} closes the distance and connects with {weapon}.',
  '{actor}\u2019s {weapon} bites deep.',
  '{actor} puts their full weight behind {weapon}.',
  '{actor} catches an opening and makes it count with {weapon}.',
];
const DUNGEON_MELEE_MISS_FLAVOR = [
  '{actor} swings {weapon} through empty air.',
  '{actor}\u2019s {weapon} is turned aside at the last moment.',
  '{actor} lunges, but {weapon} finds nothing.',
  '{actor}\u2019s {weapon} glances off harmlessly.',
  '{actor} overextends, and {weapon} misses its target entirely.',
  '{actor}\u2019s strike with {weapon} is a hair too slow.',
  '{actor} commits to the swing, but {weapon} never connects.',
];
const DUNGEON_RANGED_HIT_FLAVOR = [
  '{actor} looses a shot with {weapon} that finds its mark!',
  '{actor}\u2019s {weapon} strikes true from a distance.',
  '{actor} fires {weapon}, and it lands hard.',
  '{actor} takes aim with {weapon} and doesn\u2019t miss.',
  '{actor}\u2019s shot with {weapon} threads the gap perfectly.',
  '{actor} lets {weapon} fly, and it connects clean.',
  '{actor}\u2019s aim with {weapon} proves true.',
];
const DUNGEON_RANGED_MISS_FLAVOR = [
  '{actor} fires {weapon} wide of the mark.',
  '{actor}\u2019s shot with {weapon} sails past, missing entirely.',
  '{actor}\u2019s aim with {weapon} is thrown off at the last second.',
  '{actor} looses {weapon} too early, and it goes astray.',
  '{actor}\u2019s {weapon} clatters harmlessly off stone.',
];
const DUNGEON_SPELL_HIT_FLAVOR = [
  '{actor} unleashes {weapon}, and it strikes true!',
  '{actor} weaves {weapon} into a devastating blow.',
  '{actor}\u2019s {weapon} crackles and connects.',
  '{actor} channels {weapon} with precision.',
  '{actor}\u2019s {weapon} tears through the air and lands.',
  '{actor} calls on {weapon}, and the magic answers.',
  '{actor}\u2019s {weapon} finds its target with terrible clarity.',
];
const DUNGEON_SPELL_MISS_FLAVOR = [
  '{actor} calls on {weapon}, but the magic fizzles harmlessly.',
  '{actor}\u2019s {weapon} goes wide, doing nothing.',
  '{actor} loses the thread of {weapon} at the last moment.',
  '{actor}\u2019s {weapon} dissipates before it can connect.',
  '{actor} misjudges the timing of {weapon} entirely.',
];
const DUNGEON_CRIT_FLAVOR = [
  '{actor} finds a devastating opening \u2014 a perfect strike!',
  '{actor} lands a blow that will be felt for a long time.',
  '{actor} strikes with textbook precision \u2014 a brutal hit!',
  '{actor} catches the perfect angle and makes it count.',
  '{actor} lands a blow that staggers everything nearby.',
];
// Monster attacks (Bite, Claw, Slam) aren't "swung" the way a
// weapon is, so this stays deliberately generic rather than reusing
// the melee-weapon pool's wording.
const DUNGEON_MONSTER_HIT_FLAVOR = [
  '{actor} lashes out with {weapon} and connects!',
  '{actor}\u2019s {weapon} lands hard.',
  '{actor} strikes with {weapon}, and it tells.',
  '{actor} closes in and makes {weapon} count.',
  '{actor}\u2019s {weapon} finds an opening.',
  '{actor} catches you off guard with {weapon}.',
  '{actor}\u2019s {weapon} lands with brutal force.',
];
const DUNGEON_MONSTER_MISS_FLAVOR = [
  '{actor} lunges with {weapon}, but misses.',
  '{actor}\u2019s {weapon} comes up short.',
  '{actor} overextends, and {weapon} finds nothing.',
  '{actor}\u2019s {weapon} whiffs past entirely.',
  '{actor} misjudges the distance, and {weapon} lands wide.',
];

// Tracks the last line picked from each pool, keyed by the pool
// itself — simpler than threading actor objects through every call
// site, and sufficient in practice since each pool (melee, ranged,
// spell, monster) is used predominantly by one side of the fight at
// a time. Deliberately never reset — carrying "last line" state
// across fights only ever helps variety, never hurts it.
let dungeonLastFlavorLines = new WeakMap();

function pickFlavorLine(pool){
  let line = pool[roll(pool.length)];
  if(pool.length > 1 && line === dungeonLastFlavorLines.get(pool)){
    line = pool[roll(pool.length)];
  }
  dungeonLastFlavorLines.set(pool, line);
  return line;
}

function attackFlavorLine(actorName, weaponName, isSpell, hit, crit, isMonster){
  const pool = crit ? DUNGEON_CRIT_FLAVOR
    : isMonster ? (hit ? DUNGEON_MONSTER_HIT_FLAVOR : DUNGEON_MONSTER_MISS_FLAVOR)
    : isSpell ? (hit ? DUNGEON_SPELL_HIT_FLAVOR : DUNGEON_SPELL_MISS_FLAVOR)
    : (WEAPON_COMBAT_STATS[weaponName] && WEAPON_COMBAT_STATS[weaponName].ranged)
      ? (hit ? DUNGEON_RANGED_HIT_FLAVOR : DUNGEON_RANGED_MISS_FLAVOR)
      : (hit ? DUNGEON_MELEE_HIT_FLAVOR : DUNGEON_MELEE_MISS_FLAVOR);
  const line = pickFlavorLine(pool);
  return line.replace('{actor}', actorName).replace('{weapon}', weaponName);
}

/* ---------- Dungeon Run: enemy dialogue ---------- */

// Voice category is derived primarily from the monster's `type`
// field (already consistent across the registry), with a handful of
// name-based overrides for groups that need to sound distinct from
// their broader type — a Cultist and a Guard are both "humanoid",
// but shouldn't share a dialogue pool, and Death Knight/Vampire need
// to sound different from a mindless Zombie despite both being
// "undead". Beasts, plants, oozes, and constructs are silent —
// mindless or non-verbal creatures don't get combat dialogue at all.
const DUNGEON_VOICE_NAME_OVERRIDES = {
  'Cultist': 'cultist',
  'Death Knight': 'undead_intelligent', 'Vampire': 'undead_intelligent', 'Lich': 'undead_intelligent',
  'Mummy Lord': 'undead_intelligent', 'Ghost': 'undead_intelligent',
  'Djinni': 'genie', 'Efreeti': 'genie', 'Marid': 'genie',
};
const DUNGEON_VOICE_TYPE_MAP = {
  'beast': 'silent', 'plant': 'silent', 'ooze': 'silent', 'construct': 'silent',
  'dragon': 'roar', 'monstrosity': 'roar', 'elemental': 'roar',
  'undead': 'undead_mindless',
  'giant': 'giant',
  'fey': 'fey',
  'celestial': 'celestial',
  'aberration': 'aberration',
};

function getMonsterVoiceCategory(monster){
  if(DUNGEON_VOICE_NAME_OVERRIDES[monster.name]) return DUNGEON_VOICE_NAME_OVERRIDES[monster.name];
  const type = (monster.type || '').split(' ')[0]; // strip parenthetical subtypes like "humanoid (goblinoid)"
  if(type === 'fiend') return 'fiend';
  if(type === 'humanoid') return 'humanoid';
  return DUNGEON_VOICE_TYPE_MAP[type] || 'silent';
}

const DUNGEON_VOICE_LINES = {
  undead_mindless: [
    '*a low, hungry groan*', '*rattling bones, no words*', '*a wet, rasping hiss*',
    '*a shuffling moan, closer now*', '*dry, cracked breathing that shouldn\u2019t be possible*',
    '*a scraping sound, claws on stone*', '*an empty, echoing wail*', '*teeth clicking together, again and again*',
  ],
  undead_intelligent: [
    '"You reek of the living. That won\u2019t last."', '"Another one, come to feed the dark."',
    '"I remember dying too. It won\u2019t take you as long."', '"Do you feel that chill? That\u2019s me, deciding."',
    '"Warmth is wasted on the living. I\u2019ll take yours."', '"I\u2019ve had centuries to get good at this."',
    '"Kneel. It\u2019ll go faster."', '"You have the look of someone who hasn\u2019t died yet."',
  ],
  fiend: [
    '"Your soul will make a fine trophy."', '"Run. It\u2019s more fun that way."', '"You smell like fear. Good."',
    '"I\u2019ve tormented better than you."', '"Every scream sounds the same down here. Let\u2019s hear yours."',
    '"You\u2019ll beg. They always do."', '"Delicious. You\u2019re already afraid."', '"This won\u2019t take long. Pity."',
  ],
  giant: [
    '"SMALL THING COME CLOSER."', '"YOU DIE NOW, LITTLE ONE."', '"CRUSH!"',
    '"TINY THING THINKS IT CAN FIGHT."', '"I SQUASH BIGGER THINGS THAN YOU."',
    '"STAND STILL. HURTS LESS."', '"GRRAAAGH!"', '"YOU BROUGHT A KNIFE. I BROUGHT A ROCK."',
  ],
  fey: [
    '"Oh, how delightful \u2014 a new toy."', '"Shall we play a little longer?"', '"You dance so clumsily."',
    '"How wonderfully fragile you are."', '"I do so love a guest who fights back."',
    '"This will be over far too quickly."', '"You have such a interesting little life. Let\u2019s see how it ends."',
    '"Careful now \u2014 I bite when bored."',
  ],
  celestial: [
    '"Your path ends here, mortal."', '"I take no joy in this."', '"Stand down. This is your only warning."',
    '"I have judged worse than you and shown more mercy."', '"You chose this path. I did not choose it for you."',
    '"There is no glory in what happens next."', '"Turn back, while you still can."', '"So be it."',
  ],
  aberration: [
    '*a sound that isn\u2019t quite a voice*', '"Ssseee... the shape you wear..."', '*your thoughts feel briefly not your own*',
    '"Whyyy do you wear... that shape..."', '*a wrongness presses at the edge of your mind*',
    '"I have alwaysss been watching."', '*a whisper in a language that hurts to hear*', '"Come closssser, little thought."',
  ],
  cultist: [
    '"The dark ones demand your blood!"', '"You cannot stop what has already begun!"', '"For the old powers!"',
    '"Your death is already written!"', '"The ritual will not be interrupted!"', '"You\u2019ll thank me, in the end!"',
    '"Kneel before what\u2019s coming!"', '"We were promised this moment!"',
  ],
  humanoid: [
    '"You picked the wrong dungeon, friend."', '"Should\u2019ve stayed home."', '"Get \u2018em!"',
    '"Nothing personal \u2014 well, maybe a little."', '"You\u2019re not the first to try this. Won\u2019t be the last, either."',
    '"This is my territory now."', '"Should\u2019ve brought more friends."', '"Last chance to walk away."',
  ],
  genie: [
    '"You dare disturb my rest?"', '"Mortal insolence, answered in kind."', '"I have crushed empires. You are less than that."',
    '"Such arrogance, for something so brief-lived."', '"I grant no wishes today. Only endings."',
  ],
  roar: [
    '*a bone-shaking roar*', '*a guttural, echoing snarl*', '*a screeching cry*',
    '*a deep, rumbling growl*', '*a shriek that rattles the walls*', '*a low, threatening hiss*',
    '*an earsplitting bellow*', '*a snarl thick with menace*',
  ],
};

// Silent voice types deliberately return null rather than a line —
// beasts, plants, oozes, and constructs stay quiet during combat.
// Avoids repeating the monster's own immediately-previous line where
// the pool allows it — even an 8-line pool can land on the same
// entry twice in a row by chance over a long fight, which reads as a
// stuck record rather than genuine variety.
function monsterVoiceLine(monster){
  const category = getMonsterVoiceCategory(monster);
  if(category === 'silent') return null;
  const pool = DUNGEON_VOICE_LINES[category];
  if(!pool || !pool.length) return null;
  let line = pool[roll(pool.length)];
  if(pool.length > 1 && line === monster.lastVoiceLine){
    line = pool[roll(pool.length)];
  }
  monster.lastVoiceLine = line;
  return line;
}

function showEnemySpeechBubble(text){
  const panel = document.getElementById('dungeonEnemyPanel');
  if(!panel || !text) return null;
  const bubble = document.createElement('div');
  bubble.className = 'dungeon-speech-bubble';
  bubble.textContent = text;
  panel.appendChild(bubble);
  return new Promise(resolve => setTimeout(() => { bubble.remove(); resolve(); }, 1600));
}

function describeActionResult(actorName, action, result){
  if(!result.ok) return [actorName + ' couldn\u2019t use ' + action.name + '.'];
  if(action.kind === 'attack'){
    const isSpell = action.id && action.id.indexOf('spell_') === 0;
    const isMonster = !action.id; // player weapon/spell/item actions all get an id; the synthetic monster-turn action doesn't
    const lines = (result.attacks || []).map(a => {
      if(a.rawRoll == null) return actorName + '\u2019s ' + action.name + ' auto-hits for ' + a.damage + ' damage.';
      const rollLabel = a.crit ? 'natural 20' : ('rolled ' + a.rawRoll + ', total ' + a.toHit + ' vs AC ' + a.targetAc);
      const flavor = attackFlavorLine(actorName, action.name, isSpell, a.hit, a.crit, isMonster);
      if(!a.hit) return flavor + ' (' + rollLabel + ' \u2014 miss.)';
      const riderText = a.riders && a.riders.length
        ? (' (+' + a.riders.map(r => r.type === result.damageType ? r.amount : (r.amount + ' ' + r.type)).join(', ') + ')')
        : '';
      return flavor + ' (' + rollLabel + (a.crit ? ' \u2014 CRIT!' : '') + ' \u2014 ' + a.damage + ' ' + result.damageType + ' damage' + riderText + '.)';
    });
    return lines.length ? lines : [actorName + '\u2019s ' + action.name + ' finds nothing left to hit.'];
  }
  if(action.kind === 'save'){
    const outcomeText = result.saved ? 'saves' : 'fails';
    return [action.name + ': target rolls ' + result.saveRoll + ' vs DC ' + result.dc + ' \u2014 ' + outcomeText + ', taking ' + result.damage + ' ' + (result.damageType||'') + ' damage.'];
  }
  if(action.kind === 'heal'){
    return [actorName + ' uses ' + action.name + ', healing ' + result.healed + ' HP.'];
  }
  return [actorName + ' uses ' + action.name + '.'];
}

let pendingEncounterMonster = null;

function previewDungeonEncounter(){
  const run = currentDungeonRun;
  pendingEncounterMonster = run.runLevel >= 20 ? pickBossMonster() : pickSoloEncounterMonster(run.runLevel, run.maxHp);
  renderDungeonEncounterPreview();
}

function renderDungeonEncounterPreview(){
  const m = pendingEncounterMonster;

  dungeonMainContent.innerHTML =
    '<div class="sheet-toolbar">' +
      '<button type="button" class="toolbar-btn" id="dungeonFightBtn">Fight</button>' +
      '<button type="button" class="toolbar-btn" id="dungeonRetreatBtn">Turn back</button>' +
    '</div>' +
    '<div class="sheet">' +
      '<h3 style="margin-top:0;">' + escapeHtml(m.name) + '</h3>' +
      '<p style="color:var(--ink-text-soft);">' + escapeHtml(m.size||'') + ' ' + escapeHtml(m.type||'') + ', ' + escapeHtml(m.alignment||'') + '</p>' +
      '<div class="core-stats" style="margin-top:16px;">' +
        '<div class="core-stat"><span class="cs-label">Hit Points</span><span class="cs-value">' + m.hp + '</span></div>' +
      '</div>' +
    '</div>';

  document.getElementById('dungeonFightBtn').addEventListener('click', beginDungeonEncounter);
  document.getElementById('dungeonRetreatBtn').addEventListener('click', renderDungeonRunState);
}

// Resets once-per-combat resources (Second Wind, Sneak Attack) back
// to full at the start of each new fight. Deliberately only touches
// limited_use entries, not spell_slots — those stay a run-long
// resource, unaffected by this change.
// Called at the start of every new encounter. Resets once-per-combat
// resources (Second Wind, Sneak Attack) back to full, and also
// refills spell slots to the caster's current-level full amount —
// levelUpDungeonRun() already does this on a combat win, but relying
// on that alone leaves slots stale if the player retreats from an
// encounter preview or otherwise starts a new fight without having
// just leveled up. This guarantees full slots at the start of every
// fight unconditionally, which is what "refresh after every combat"
// actually requires.
function resetCombatLimitedUses(character, resources){
  const actions = getAvailableActions(character);
  for(const a of actions){
    if(a.resourceCost && a.resourceCost.type === 'limited_use'){
      resources[a.resourceCost.key] = a.resourceCost.max;
    }
  }
  if(character.spellBlock){
    const slots = FULL_CASTER_SLOTS_BY_LEVEL[character.level] || [];
    resources.spell_slots = {};
    slots.forEach((count, i) => { if(count > 0) resources.spell_slots[i+1] = count; });
  }
}

async function beginDungeonEncounter(){
  const run = currentDungeonRun;
  const enemy = pendingEncounterMonster;
  resetCombatLimitedUses(run.characterSnapshot, run.resources);
  const player = Object.assign({}, run.characterSnapshot, {
    hp: run.currentHp, maxHp: run.maxHp, resources: run.resources, hasAttackedThisRound:false,
    inventory: run.runInventory, // reference, not a copy — using an item here consumes it from the run directly
  });
  currentCombatState = startCombat(player, [enemy]);
  dungeonCombatLog = [];
  dungeonUsedActionThisRound = false;
  dungeonUsedBonusThisRound = false;
  dungeonLog('Combat begins against ' + enemy.name + '.');
  renderCombatScreen(false);
  // A brief pause before anything resolves — without this, if the
  // enemy wins initiative, their attack lands the instant the
  // screen appears with no beat in between, which reads as abrupt.
  // The panel is deliberately non-interactive during this pause
  // (see renderCombatScreen's interactive param) — it isn't really
  // the player's turn yet if the enemy is about to act first, so
  // tapping ahead here shouldn't let them jump the turn order.
  await new Promise(resolve => setTimeout(resolve, 1400));
  advanceUntilPlayerTurn();
}

// Auto-resolves enemy turns in initiative order until it's the
// player's turn or combat ends — handles the case where the enemy
// won initiative and acts first.
async function advanceUntilPlayerTurn(){
  const cs = currentCombatState;
  while(true){
    const outcome = isCombatOver(cs);
    if(outcome){ finishDungeonCombat(outcome); return; }
    const nextActor = cs.combatants.find(c => c.hp > 0);
    if(nextActor.side === 'player'){ renderCombatScreen(); return; }
    const result = resolveEnemyTurn(nextActor, cs.combatants);
    await showEnemySpeechBubble(monsterVoiceLine(nextActor));
    for(const swing of (result.attacks || [])){
      if(swing.rawRoll != null) await showDiceRollAnimation(swing.rawRoll);
      if(swing.hit) playDungeonHurtSound();
      else playDungeonMissSound();
    }
    dungeonLog(describeActionResult(nextActor.name, { name: result.actionName || 'attack', kind:'attack' }, result));
    // Rotate the resolved enemy to the back so the next find() reaches the player
    cs.combatants.push(cs.combatants.shift());
  }
}

function dungeonHpBarHtml(current, max){
  const pct = Math.max(0, Math.min(100, Math.round((current / max) * 100)));
  const tier = pct <= 25 ? 'low' : (pct <= 50 ? 'mid' : '');
  return '<div class="dungeon-hp-bar-track"><div class="dungeon-hp-bar-fill ' + tier + '" style="width:' + pct + '%;"></div></div>' +
    '<div class="dungeon-hp-label">' + current + ' / ' + max + ' HP</div>';
}

function renderCombatScreen(interactive){
  if(interactive === undefined) interactive = true;
  const run = currentDungeonRun;
  const cs = currentCombatState;
  const player = cs.combatants.find(c => c.side === 'player');
  const enemy = cs.combatants.find(c => c.side === 'enemy');
  const c = run.characterSnapshot;

  const economyStrip =
    '<div class="dungeon-economy-strip">' +
      '<span class="dungeon-economy-pill' + (dungeonUsedActionThisRound ? ' used' : '') + '">Action</span>' +
      '<span class="dungeon-economy-pill' + (dungeonUsedBonusThisRound ? ' used' : '') + '">Bonus Action</span>' +
    '</div>';

  // Visual spell slot tracker — a row of pips per spell level, filled
  // for slots still available and empty for ones already spent this
  // combat. Reads live from player.resources.spell_slots (the actual
  // combat-time state), not a static max, so it updates as the
  // player casts.
  const spellSlotHtml = c.spellBlock ? (() => {
    const maxSlots = FULL_CASTER_SLOTS_BY_LEVEL[c.level] || [];
    const rows = maxSlots.map((max, i) => {
      if(max <= 0) return '';
      const remaining = (player.resources.spell_slots && player.resources.spell_slots[i+1]) || 0;
      const pips = Array.from({length: max}, (_, p) => '<span class="dungeon-slot-pip' + (p < remaining ? ' filled' : '') + '"></span>').join('');
      return '<div class="dungeon-slot-row"><span class="dungeon-slot-label">Lvl ' + (i+1) + '</span>' + pips + '</div>';
    }).join('');
    return rows ? '<div class="dungeon-slot-tracker">' + rows + '</div>' : '';
  })() : '';

  const fightScreen =
    '<div class="dungeon-fight-screen">' +
      '<div class="dungeon-combatant-panel' + (interactive ? ' clickable' : '') + '" id="dungeonPlayerPanel">' +
        '<p class="dungeon-combatant-name">' + escapeHtml(player.name) + '</p>' +
        '<p class="dungeon-combatant-sub">Level ' + run.runLevel + ' ' + escapeHtml(c.race.name) + ' ' + escapeHtml(c.cls.name) + '</p>' +
        dungeonHpBarHtml(player.hp, player.maxHp) +
        '<div class="dungeon-combatant-extra">Armor Class ' + player.ac + '</div>' +
        (interactive ? '<div class="dungeon-tap-hint">Tap to act</div>' : '') +
      '</div>' +
      '<span class="dungeon-vs">VS</span>' +
      '<div class="dungeon-combatant-panel" id="dungeonEnemyPanel">' +
        '<p class="dungeon-combatant-name">' + escapeHtml(enemy.name) + '</p>' +
        '<p class="dungeon-combatant-sub">' + escapeHtml(enemy.size||'') + ' ' + escapeHtml(enemy.type||'') + '</p>' +
        dungeonHpBarHtml(enemy.hp, enemy.maxHp) +
      '</div>' +
    '</div>';

  dungeonMainContent.innerHTML =
    fightScreen +
    economyStrip +
    spellSlotHtml +
    '<div class="sheet">' +
      '<p class="brand-eyebrow" style="margin-top:0;">Round ' + cs.round + '</p>' +
      '<h4 style="margin-bottom:8px;">Log</h4>' +
      '<div style="max-height:200px; overflow-y:auto; font-size:14px; color:var(--ink-text-soft);">' +
        dungeonCombatLog.slice().reverse().map(l => '<p style="margin:4px 0;">' + escapeHtml(l) + '</p>').join('') +
      '</div>' +
    '</div>';

  if(interactive) document.getElementById('dungeonPlayerPanel').addEventListener('click', openDungeonActionModal);
}

// The single place any in-combat decision happens — actions, bonus
// actions, items, and ending the turn, all inside one modal rather
// than scattered inline below the fight screen. Keeps the main
// screen to just the VS display and log, avoiding the long scroll a
// full inline action list would force on narrow (mobile) viewports.
function openDungeonActionModal(){
  openModal('Your Turn');
  renderDungeonActionModalBody();
}

function renderDungeonActionModalBody(){
  const cs = currentCombatState;
  const player = cs.combatants.find(c => c.side === 'player');
  const actions = getAvailableActions(player);
  const itemActions = getUsableItemActions(player.inventory);

  // Items fold directly into whichever group they actually belong to
  // (an action-slot potion sits alongside spells/weapons, a
  // bonus-slot one alongside Second Wind/Healing Word) rather than
  // getting a separate "Items" heading — there are only ever two
  // real groups, Action and Bonus Action, matching the economy strip.
  const actionOptions = actions.filter(a => a.slot === 'action').concat(itemActions.filter(a => a.slot === 'action'));
  const bonusOptions = actions.filter(a => a.slot === 'bonus').concat(itemActions.filter(a => a.slot === 'bonus'));

  // Formats the real damage/heal dice for an action so the player
  // can actually compare options — "Attack" alone doesn't tell you
  // whether a Longsword beats a Light Crossbow, but "1d8 slashing"
  // vs "1d8 piercing" does. Includes magic bonuses and riders (named
  // weapon elemental damage, Sneak Attack) since those meaningfully
  // change the comparison too.
  function actionDamageLabel(a){
    if(a.kind === 'attack'){
      const d = a.damage;
      let label = d.dice + (d.magicBonus ? '+' + d.magicBonus : '') + ' ' + d.type;
      if(d.extra && d.extra.length){
        label += ' + ' + d.extra.map(r => r.dice + ' ' + r.type).join(' + ');
      }
      return label;
    }
    if(a.kind === 'save'){
      const dmg = (a.save.onFail && a.save.onFail.damage) || null;
      return dmg ? (dmg.dice + ' ' + dmg.type + ' (half on save)') : 'Save';
    }
    if(a.kind === 'heal'){
      const h = a.heal;
      return h.dice + (h.flatBonus ? '+' + h.flatBonus : '') + ' HP';
    }
    return '';
  }

  function actionCardHtml(a, slotType){
    const affordable = canAfford(player, a.resourceCost);
    const used = slotType === 'action' ? dungeonUsedActionThisRound : dungeonUsedBonusThisRound;
    const disabled = !affordable || used;
    const costPrefix = a.resourceCost && a.resourceCost.type === 'spell_slot' ? 'Slot ' + a.resourceCost.level + '+ \u00b7 ' : (a.resourceCost && a.resourceCost.type === 'inventory_item' ? 'Item \u00b7 ' : '');
    const costLabel = costPrefix + actionDamageLabel(a);
    return '<button type="button" class="dungeon-modal-action-card" data-action-id="' + a.id + '" data-slot-type="' + slotType + '"' + (disabled ? ' disabled' : '') + '>' + escapeHtml(a.name) + '<span class="dac-cost">' + escapeHtml(costLabel) + '</span></button>';
  }

  const recentLog = dungeonCombatLog.slice(-3).reverse();

  modalBody.innerHTML =
    (recentLog.length ? (
      '<div style="background: rgba(43,32,19,0.05); border: 1px solid rgba(140,95,38,0.3); border-radius: 8px; padding: 10px 14px; margin-bottom: 18px;">' +
        recentLog.map(l => '<p style="margin:4px 0; font-size:14px; color:var(--ink-text-soft);">' + escapeHtml(l) + '</p>').join('') +
      '</div>'
    ) : '') +
    '<p class="brand-eyebrow" style="margin-top:0;">Action</p>' +
    '<div class="dungeon-modal-action-grid">' + actionOptions.map(a => actionCardHtml(a, 'action')).join('') + '</div>' +
    (bonusOptions.length ? (
      '<p class="brand-eyebrow">Bonus Action</p>' +
      '<div class="dungeon-modal-action-grid">' + bonusOptions.map(a => actionCardHtml(a, 'bonus')).join('') + '</div>'
    ) : '') +
    '<button type="button" class="dungeon-modal-end-turn" id="dungeonEndTurnBtn"' + (dungeonUsedActionThisRound ? '' : ' disabled') + '>End turn</button>';

  Array.from(modalBody.querySelectorAll('.dungeon-modal-action-card')).forEach(btn => {
    btn.addEventListener('click', () => onDungeonActionClick(btn.getAttribute('data-action-id'), btn.getAttribute('data-slot-type')));
  });
  document.getElementById('dungeonEndTurnBtn').addEventListener('click', onDungeonEndTurn);
}

async function onDungeonActionClick(actionId, slotType){
  const cs = currentCombatState;
  const player = cs.combatants.find(c => c.side === 'player');
  const enemy = cs.combatants.find(c => c.side === 'enemy');
  const actions = getAvailableActions(player).concat(getUsableItemActions(player.inventory));
  const action = actions.find(a => a.id === actionId && a.slot === slotType);
  if(!action) return;

  const target = action.target === 'enemy' ? enemy : player;
  const result = resolveAction(player, action, target, cs);

  if(action.kind === 'attack'){
    for(const swing of (result.attacks || [])){
      if(swing.rawRoll != null) await showDiceRollAnimation(swing.rawRoll);
      if(swing.hit){ swing.crit ? playDungeonCritSound() : playDungeonHitSound(); }
      else playDungeonMissSound();
    }
  } else if(action.kind === 'save' && result.saveRoll != null){
    await showDiceRollAnimation(result.saveRoll);
  }

  dungeonLog(describeActionResult(player.name, action, result));

  if(slotType === 'action') dungeonUsedActionThisRound = true;
  else dungeonUsedBonusThisRound = true;

  const outcome = isCombatOver(cs);
  if(outcome){ closeModal(); finishDungeonCombat(outcome); return; }
  // Refresh both the modal (still open, so the player can use their
  // remaining action/bonus action) and the screen behind it (HP
  // bars and log need to reflect what just happened too).
  renderDungeonActionModalBody();
  renderCombatScreen();
}

function onDungeonEndTurn(){
  closeModal();
  const cs = currentCombatState;
  startNewRound(cs);
  dungeonUsedActionThisRound = false;
  dungeonUsedBonusThisRound = false;
  // Move to the next actor after the player for this new round's sweep
  const playerIdx = cs.combatants.findIndex(c => c.side === 'player');
  cs.combatants.push(...cs.combatants.splice(0, playerIdx + 1));
  advanceUntilPlayerTurn();
}

// Dungeon Run's own loot pool — deliberately not the full loot table.
// generateLoot() pulls from the whole MAGIC_ITEMS_DB, which is built
// for tabletop campaigns and includes plenty of purely narrative
// items (Sending Stones, Horn of Silent Alarm) that a solo,
// combat-only crawl has no use for. This is a small, curated set of
// items that are actually usable here — mostly healing potions,
// since survival matters most, plus a couple of offensive options.
const DUNGEON_LOOT_POOL = [
  { name:'Potion of Healing', weight:5 },
  { name:'Potion of Greater Healing', weight:3 },
  { name:'Potion of Fire Breath', weight:1 },
  { name:'Oil of Sharpness', weight:1 },
];

function rollDungeonLootItems(count){
  const pool = [];
  DUNGEON_LOOT_POOL.forEach(entry => { for(let i=0;i<entry.weight;i++) pool.push(entry.name); });
  const items = [];
  for(let i=0;i<count;i++) items.push({ name: pool[roll(pool.length)], kind:'magic-item' });
  return items;
}

// A dedicated, gentle gold curve for Dungeon Run — deliberately not
// rollGold()'s tabletop hoard table, which is built for gold
// accumulated across a full campaign and produces genuinely absurd
// absolute numbers when compressed into a single fight's drop (a
// ~600x jump in per-fight gold from level 1 to 20, tens of thousands
// of gold for a single potion by the late game).
// Boosted further from an earlier pass after direct feedback that
// prices still felt out of reach in practice — players don't
// perfectly hoard every gold piece, they spend on potions along the
// way, so "proportionate to one fight's gold" alone wasn't generous
// enough against a realistic accumulated balance.
function dungeonGoldForLevel(level){
  const base = 15 + level * 19;
  const variance = roll(level * 5 + 12);
  return base + variance;
}

function generateDungeonLoot(level){
  return { gold: dungeonGoldForLevel(level), items: rollDungeonLootItems(1) };
}

/* ---------- Dungeon Run: shop ---------- */

// Base prices at level 1, scaled gently with level to match
// dungeonGoldForLevel()'s own growth curve (roughly 12x from level 1
// to 20) rather than the old tabletop-hoard-derived tier jumps that
// produced five- and six-figure prices at high levels.
function shopPriceForLevel(basePrice, level){
  const multiplier = 1 + (level - 1) * 0.45;
  return Math.max(5, Math.round(basePrice * multiplier / 5) * 5);
}

// Potions derive from DUNGEON_ITEM_EFFECTS itself, filtered the same
// way getUsableItemActions() filters it (excluding kind:'buff') —
// deliberately not a separate hardcoded list, so a shop item can
// never drift out of sync with what's actually usable in combat
// again. Oil of Sharpness (a buff this engine doesn't model) is
// excluded here for exactly that reason, not sold elsewhere either.
const DUNGEON_SHOP_POTIONS = [
  { name:'Potion of Healing', basePrice:25 },
  { name:'Potion of Greater Healing', basePrice:90 },
  { name:'Potion of Fire Breath', basePrice:90 },
].filter(it => DUNGEON_ITEM_EFFECTS[it.name] && DUNGEON_ITEM_EFFECTS[it.name].kind !== 'buff');

// Prices roughly proportionate to real 5e equipment costs, scaled to
// the same base range as the potions above.
const DUNGEON_SHOP_WEAPONS = [
  { name:'Dagger', basePrice:2 }, { name:'Handaxe', basePrice:3 }, { name:'Javelin', basePrice:3 },
  { name:'Mace', basePrice:3 }, { name:'Quarterstaff', basePrice:2 }, { name:'Shortsword', basePrice:5 },
  { name:'Scimitar', basePrice:13 }, { name:'Rapier', basePrice:13 }, { name:'Light Crossbow', basePrice:13 },
  { name:'Shortbow', basePrice:13 }, { name:'Longsword', basePrice:8 }, { name:'Longbow', basePrice:25 },
  { name:'Greataxe', basePrice:15 }, { name:'Dart', basePrice:1 },
];
const DUNGEON_SHOP_ARMOR = [
  { name:'Padded', basePrice:2 }, { name:'Leather Armor', basePrice:3 }, { name:'Studded Leather Armor', basePrice:8 },
  { name:'Hide Armor', basePrice:4 }, { name:'Ring Mail', basePrice:7 }, { name:'Chain Shirt', basePrice:10 },
  { name:'Scale Mail', basePrice:10 }, { name:'Chain Mail', basePrice:15 }, { name:'Breastplate', basePrice:40 },
  { name:'Splint', basePrice:27 }, { name:'Half Plate', basePrice:67 }, { name:'Plate', basePrice:120 },
];

// Generic enchantment items — +1 Weapon applies to whatever weapon
// you're carrying rather than being tied to one weapon name (same
// idea as +1/+2/+3 Armor, which computeArmorClass() already
// supported before this). Priced above mundane gear since these are
// genuine magic items (Uncommon/Rare/Very Rare), not simple mundane
// equipment, and level-gated to roughly match when the DMG considers
// each rarity tier appropriate treasure — a level 1 character
// shouldn't be able to buy a +3 weapon.
const DUNGEON_SHOP_WEAPON_ENCHANTMENTS = [
  { name:'+1 Weapon', basePrice:100, minLevel:1 },
  { name:'+2 Weapon', basePrice:170, minLevel:6 },
  { name:'+3 Weapon', basePrice:260, minLevel:12 },
];
const DUNGEON_SHOP_ARMOR_ENCHANTMENTS = [
  { name:'+1 Armor', basePrice:100, minLevel:1 },
  { name:'+1 Shield', basePrice:75, minLevel:1 },
  { name:'+2 Armor', basePrice:170, minLevel:6 },
  { name:'+3 Armor', basePrice:260, minLevel:12 },
];

// Named magic weapons — priced comparably to a +1 Weapon (slightly
// below, since these only add bonus damage rather than boosting both
// attack rolls and damage the way a true +N enchantment does).
// Gated to level 3+ rather than available from the very first fight,
// so they read as a genuine find rather than an immediate option.
const DUNGEON_SHOP_NAMED_WEAPONS = [
  { name:'Dagger of Flames', basePrice:85, minLevel:3 },
  { name:'Frostbite Shortsword', basePrice:85, minLevel:3 },
  { name:'Venomfang Rapier', basePrice:85, minLevel:3 },
  { name:'Thunderous Mace', basePrice:85, minLevel:3 },
  { name:'Shadowbite Longsword', basePrice:85, minLevel:3 },
  { name:'Sunfire Scimitar', basePrice:85, minLevel:3 },
  { name:'Bow of Poison', basePrice:85, minLevel:3 },
  { name:'Stormbolt Crossbow', basePrice:85, minLevel:3 },
];

/* ---------- Dungeon Run: narrative ---------- */

// Short vignettes offered on the 20% of path choices that aren't a
// straight fight. Each has its own flavor text and a reward — gold,
// a free weapon/armor (drawn from the same shop pools rather than a
// separate list, so anything granted here is guaranteed usable), or
// a permanent +1 to one ability score, which is what the user meant
// by a "stat boost affecting your skills" (skills derive from
// ability modifiers in 5e).
const DUNGEON_NARRATIVE_EVENTS = [
  { text:'A collapsed shrine holds a small offering bowl, coins still glinting inside. No one has claimed them in a long time.', reward:'gold' },
  { text:'A traveling quartermaster\u2019s cart lies abandoned, one wheel broken. Whatever they couldn\u2019t carry, they left behind.', reward:'gold' },
  { text:'A loose stone in the wall gives way, revealing a small hidden cache.', reward:'gold' },
  { text:'You find a purse someone dropped in a hurry \u2014 and never came back for.', reward:'gold' },
  { text:'A dry fountain has coins scattered across its bottom, tossed in for wishes long forgotten.', reward:'gold' },
  { text:'An old strongbox, its lock long since rusted through, sits half-buried in rubble.', reward:'gold' },
  { text:'Tucked into a crevice, a weapon still gleams beneath a thin layer of dust \u2014 someone\u2019s, once.', reward:'weapon' },
  { text:'A weapon rack, mostly picked clean, still holds one piece no one bothered to take.', reward:'weapon' },
  { text:'Embedded in an old training post, a well-made weapon waits for someone to pull it free.', reward:'weapon' },
  { text:'A suit of armor stands propped against the wall, as if its owner simply stepped out of it and never came back.', reward:'armor' },
  { text:'A quartermaster\u2019s chest, untouched by time, holds a full set of well-kept armor.', reward:'armor' },
  { text:'Draped over a fallen statue, a set of armor looks like it was left mid-repair.', reward:'armor' },
  { text:'You find a quiet moment to catch your breath, and something about the stillness sharpens your focus.', reward:'stat' },
  { text:'An old training dummy, long since forgotten, gives you the chance to run through your forms uninterrupted.', reward:'stat' },
  { text:'A strange, still calm settles over you here \u2014 and when it passes, you feel sharper for it.', reward:'stat' },
  { text:'A faint magical aura clings to a hidden alcove \u2014 something interesting waits inside.', reward:'special_item' },
  { text:'A locked chest, warm to the touch, hums faintly with old enchantment.', reward:'special_item' },
  { text:'A skeletal hand still clutches something that glimmers with a magic all its own.', reward:'special_item' },
  { text:'Etched runes mark a small pedestal, and whatever rested there once still lingers, waiting to be claimed.', reward:'special_item' },
  { text:'A merchant\u2019s strongbox, abandoned mid-journey, holds something far more interesting than coin.', reward:'special_item' },
];

const DUNGEON_ABILITY_NAMES = { str:'Strength', dex:'Dexterity', con:'Constitution', int:'Intelligence', wis:'Wisdom', cha:'Charisma' };

async function resolveNarrativeEvent(){
  const run = currentDungeonRun;
  const event = DUNGEON_NARRATIVE_EVENTS[roll(DUNGEON_NARRATIVE_EVENTS.length)];
  let rewardText = '';

  if(event.reward === 'gold'){
    const gold = dungeonGoldForLevel(run.runLevel);
    run.runGold += gold;
    rewardText = 'You gain ' + gold + ' gold.';
  } else if(event.reward === 'weapon'){
    const clsName = run.characterSnapshot.cls.name;
    const ownedNames = new Set(run.characterSnapshot.gear.map(g => g.name));
    const pool = DUNGEON_SHOP_WEAPONS.filter(w => !ownedNames.has(w.name) && classCanUseWeapon(clsName, w.name));
    if(pool.length){
      const chosen = pool[roll(pool.length)];
      run.characterSnapshot.gear.push({ name:chosen.name, isMagic:false, kind:'equipment' });
      rewardText = 'You gain a ' + chosen.name + '.';
    } else {
      const gold = dungeonGoldForLevel(run.runLevel);
      run.runGold += gold; rewardText = 'You gain ' + gold + ' gold.'; // fallback if every usable weapon is already owned
    }
  } else if(event.reward === 'armor'){
    const clsName = run.characterSnapshot.cls.name;
    const currentArmorName = run.characterSnapshot.gear.map(g => g.name).find(n => ARMOR_TABLE[n]);
    const currentArmorAc = currentArmorName ? ARMOR_TABLE[currentArmorName].ac : 0;
    const pool = DUNGEON_SHOP_ARMOR.filter(a => ARMOR_TABLE[a.name].ac > currentArmorAc && classCanUseArmor(clsName, a.name));
    if(pool.length){
      const chosen = pool[roll(pool.length)];
      run.characterSnapshot.gear = run.characterSnapshot.gear.filter(g => !ARMOR_TABLE[g.name]);
      run.characterSnapshot.gear.push({ name:chosen.name, isMagic:false, kind:'equipment' });
      run.characterSnapshot.ac = computeArmorClass(run.characterSnapshot.scores, run.characterSnapshot.cls, run.characterSnapshot.gear);
      rewardText = 'You gain ' + chosen.name + ', an improvement over what you were wearing.';
    } else {
      const gold = dungeonGoldForLevel(run.runLevel);
      run.runGold += gold; rewardText = 'You gain ' + gold + ' gold.'; // fallback if no upgrade is available
    }
  } else if(event.reward === 'stat'){
    // Weighted toward the character's actual main stat (cls.primary[0],
    // the same field Character Forge itself uses to prioritize stat
    // generation) rather than a fully random ability — a flat 1-in-6
    // chance across all six meant a Wizard could easily land a
    // Strength boost they'd never use. Constitution gets a real but
    // smaller share, since more HP is always useful regardless of class.
    const mainStat = run.characterSnapshot.cls.primary[0];
    const chosen = roll(10) < 7 ? mainStat : 'con';
    run.characterSnapshot.scores[chosen] += 1;
    // Ability changes ripple into AC, spell save DC, and every
    // attack/damage roll that reads from these scores at combat
    // time — nothing else needs to be recalculated here, since n
    // getAvailableActions() and computeArmorClass() both read the
    // score fresh each time they're called instead of caching it.
    run.characterSnapshot.ac = computeArmorClass(run.characterSnapshot.scores, run.characterSnapshot.cls, run.characterSnapshot.gear);
    rewardText = 'Your ' + DUNGEON_ABILITY_NAMES[chosen] + ' permanently increases by 1.';
  } else if(event.reward === 'special_item'){
    // A genuinely varied "special find" — either one of the named
    // magic weapons or a potion, rather than every non-gold,
    // non-stat reward being mundane gear. Falls back to gold in the
    // rare case every named weapon is already owned.
    const clsName = run.characterSnapshot.cls.name;
    const ownedNames = new Set(run.characterSnapshot.gear.map(g => g.name));
    const ownableWeapons = DUNGEON_SHOP_NAMED_WEAPONS.filter(w => !ownedNames.has(w.name) && classCanUseWeapon(clsName, w.name));
    const pool = [...ownableWeapons.map(w => ({ kind:'weapon', name:w.name })), ...DUNGEON_SHOP_POTIONS.map(p => ({ kind:'potion', name:p.name }))];
    if(pool.length){
      const chosen = pool[roll(pool.length)];
      if(chosen.kind === 'weapon'){
        run.characterSnapshot.gear.push({ name:chosen.name, isMagic:true, kind:'equipment' });
      } else {
        run.runInventory.push({ name:chosen.name, kind:'magic-item' });
      }
      rewardText = 'You find ' + chosen.name + '.';
    } else {
      const gold = dungeonGoldForLevel(run.runLevel);
      run.runGold += gold; rewardText = 'You gain ' + gold + ' gold.';
    }
  }

  if(currentUser && currentDungeonRunId) await saveDungeonRun(run, currentDungeonRunId);

  openModal('A Quiet Moment');
  modalBody.innerHTML =
    '<p>' + escapeHtml(event.text) + '</p>' +
    '<p style="margin-top:12px; color:var(--ink-text-soft);">' + escapeHtml(rewardText) + '</p>' +
    '<button type="button" class="dungeon-modal-end-turn" id="dungeonNarrativeContinueBtn" style="margin-top:16px;">Continue</button>';
  document.getElementById('dungeonNarrativeContinueBtn').addEventListener('click', () => { closeModal(); renderDungeonRunState(); });
}

// Varied scene framings so the same "pick a path" moment doesn't
// read identically every time, even though the underlying mechanic
// (an 80/20 roll toward combat vs. a narrative event) never changes.
const DUNGEON_PATH_SCENES = [
  { text:'The passage splits ahead \u2014 two ways forward, and no telling what waits down either.', left:'Take the left path', right:'Take the right path' },
  { text:'You reach a fork in the trail, one way overgrown, the other worn smooth by older footsteps.', left:'Follow the worn path', right:'Push through the overgrowth' },
  { text:'Two doorways stand side by side, both equally dark, both equally silent.', left:'Open the left door', right:'Open the right door' },
  { text:'The corridor forks around a fallen pillar \u2014 you\u2019ll have to choose a side.', left:'Go around the left', right:'Go around the right' },
  { text:'A stairwell splits in two directions, one spiraling up, one down into darker air.', left:'Climb upward', right:'Descend further' },
  { text:'You find a junction with two archways, each carved with symbols you don\u2019t recognize.', left:'Pass through the left arch', right:'Pass through the right arch' },
  { text:'A narrow bridge crosses a chasm, but it splits halfway across into two paths.', left:'Cross to the left', right:'Cross to the right' },
  { text:'The tunnel forks around a cave-in, leaving two uncertain routes forward.', left:'Climb over the rubble', right:'Squeeze through the gap' },
  { text:'Two passages breathe faintly different air \u2014 one cold, one carrying something like smoke.', left:'Follow the cold air', right:'Follow the smoke' },
  { text:'A crossroads deep in the dark offers no clues about which way is safer.', left:'Head left', right:'Head right' },
  { text:'The floor splits around a wide crack, forcing you to choose which side to walk.', left:'Walk the left edge', right:'Walk the right edge' },
  { text:'You come to a chamber with two unlit torches, each marking a different exit.', left:'Take the left exit', right:'Take the right exit' },
];

function openDungeonPathChoiceModal(){
  const scene = DUNGEON_PATH_SCENES[roll(DUNGEON_PATH_SCENES.length)];
  openModal('The Descent Continues');
  modalBody.innerHTML =
    '<p>' + escapeHtml(scene.text) + '</p>' +
    '<button type="button" class="dungeon-modal-end-turn" id="dungeonPathLeftBtn" style="margin-top:16px; display:block; width:100%;">' + escapeHtml(scene.left) + '</button>' +
    '<button type="button" class="dungeon-modal-end-turn" id="dungeonPathRightBtn" style="margin-top:10px; display:block; width:100%;">' + escapeHtml(scene.right) + '</button>';
  document.getElementById('dungeonPathLeftBtn').addEventListener('click', onDungeonPathChosen);
  document.getElementById('dungeonPathRightBtn').addEventListener('click', onDungeonPathChosen);
}

// Deliberately not a 50/50 — the user wanted most choices to lead to
// a fight (80%), with a narrative event as the less common outcome
// (20%), and which path the player picks doesn't change the odds:
// the choice is flavor, not a hidden "correct" answer to find.
function onDungeonPathChosen(){
  closeModal();
  if(roll(100) <= 80){
    previewDungeonEncounter();
  } else {
    resolveNarrativeEvent();
  }
}

// Rebuilds what's currently for sale — a random handful from each
// category, excluding weapons the character already owns (a
// duplicate does nothing useful), armor that isn't an actual upgrade
// over what's currently equipped (buying armor replaces the current
// suit, so offering a downgrade would just waste gold), and magic
// enchantments below the character's already-owned tier (the +N
// bonuses don't stack, so a +1 Weapon is worthless once you have a
// +2). Called at run start and after every combat win, so the shop
// genuinely restocks rather than offering the same fixed list the
// whole run.
function restockDungeonShop(run){
  const clsName = run.characterSnapshot.cls.name;
  const armorProf = DUNGEON_CLASS_ARMOR_PROFICIENCY[clsName];
  const ownedNames = new Set(run.characterSnapshot.gear.map(g => g.name));
  const currentArmorName = run.characterSnapshot.gear.map(g => g.name).find(n => ARMOR_TABLE[n]);
  const currentArmorAc = currentArmorName ? ARMOR_TABLE[currentArmorName].ac : 0;
  const currentWeaponEnchant = getMagicWeaponBonus(run.characterSnapshot);
  const currentArmorEnchant = run.characterSnapshot.gear.reduce((best, g) => {
    const match = /^\+(\d) Armor$/.exec(g.name);
    return match ? Math.max(best, Number(match[1])) : best;
  }, 0);
  const currentShieldEnchant = run.characterSnapshot.gear.reduce((best, g) => {
    const match = /^\+(\d) Shield$/.exec(g.name);
    return match ? Math.max(best, Number(match[1])) : best;
  }, 0);

  const availableWeapons = DUNGEON_SHOP_WEAPONS.filter(w => !ownedNames.has(w.name) && classCanUseWeapon(clsName, w.name));
  const availableArmor = DUNGEON_SHOP_ARMOR.filter(a => ARMOR_TABLE[a.name].ac > currentArmorAc && classCanUseArmor(clsName, a.name));
  const availableWeaponEnchants = DUNGEON_SHOP_WEAPON_ENCHANTMENTS.filter(e =>
    run.runLevel >= e.minLevel && Number(/^\+(\d)/.exec(e.name)[1]) > currentWeaponEnchant);
  // Armor enchantments are pointless for a class that can't wear any
  // armor at all (Wizard) — they apply on top of worn armor, not
  // standalone. Shield enchantments specifically need shield
  // proficiency (neither Rogue nor Wizard has it).
  const availableArmorEnchants = armorProf.armorTypes.length === 0 ? [] : DUNGEON_SHOP_ARMOR_ENCHANTMENTS.filter(e => {
    if(run.runLevel < e.minLevel) return false;
    if(e.name.endsWith('Shield') && !armorProf.shield) return false;
    const tier = Number(/^\+(\d)/.exec(e.name)[1]);
    return e.name.endsWith('Shield') ? tier > currentShieldEnchant : tier > currentArmorEnchant;
  });
  const availableNamedWeapons = DUNGEON_SHOP_NAMED_WEAPONS.filter(w => run.runLevel >= w.minLevel && !ownedNames.has(w.name) && classCanUseWeapon(clsName, w.name));

  run.shopInventory = [
    ...pickN(DUNGEON_SHOP_POTIONS, 2).map(it => Object.assign({ type:'potion' }, it)),
    ...pickN(availableWeapons, 1).map(it => Object.assign({ type:'weapon' }, it)),
    ...pickN(availableArmor, 1).map(it => Object.assign({ type:'armor' }, it)),
    ...pickN(availableWeaponEnchants, 1).map(it => Object.assign({ type:'weapon' }, it)),
    ...pickN(availableArmorEnchants, 1).map(it => Object.assign({ type:'armor' }, it)),
    ...pickN(availableNamedWeapons, 1).map(it => Object.assign({ type:'weapon' }, it)),
  ];
}

function renderDungeonShop(){
  const run = currentDungeonRun;
  const c = run.characterSnapshot;
  const stock = run.shopInventory || [];

  const gearNames = c.gear.map(g => g.name);
  const wornArmorName = gearNames.find(n => ARMOR_TABLE[n]);
  const currentArmorLine = wornArmorName
    ? escapeHtml(wornArmorName) + ' (AC ' + ARMOR_TABLE[wornArmorName].ac + ')'
    : 'None (unarmored)';

  function itemLabel(it){
    const weaponMatch = /^\+(\d) Weapon$/.exec(it.name);
    if(weaponMatch) return 'Enchanted Weapon (+' + weaponMatch[1] + ' damage)';
    const armorMatch = /^\+(\d) (Armor|Shield)$/.exec(it.name);
    if(armorMatch){
      const resultingAc = computeArmorClass(c.scores, c.cls, c.gear.concat([{ name: it.name }]));
      const kind = armorMatch[2] === 'Shield' ? 'Enchanted Shield' : 'Enchanted Armor';
      return kind + ' (AC ' + resultingAc + ')';
    }
    if(it.type === 'armor' && ARMOR_TABLE[it.name]) return escapeHtml(it.name) + ' (AC ' + ARMOR_TABLE[it.name].ac + ')';
    return escapeHtml(it.name);
  }

  const rows = stock.map(it => {
    const price = shopPriceForLevel(it.basePrice, run.runLevel);
    const affordable = run.runGold >= price;
    return '<button type="button" class="core-stat core-stat-clickable dungeon-buy-tile" data-item-name="' + escapeHtml(it.name) + '" data-item-type="' + it.type + '" data-price="' + price + '"' + (affordable ? '' : ' disabled') + '>' +
      '<span class="cs-label">' + itemLabel(it) + '</span><span class="cs-value">' + price + ' gp</span>' +
    '</button>';
  }).join('');

  dungeonMainContent.innerHTML =
    '<div class="sheet-toolbar">' +
      '<button type="button" class="toolbar-btn" id="dungeonLeaveShopBtn">Leave shop</button>' +
    '</div>' +
    '<div class="sheet">' +
      '<h3 style="margin-top:0;">Shop</h3>' +
      '<p style="color:var(--ink-text-soft);">You have ' + run.runGold + ' gold. New stock arrives after your next fight.</p>' +
      '<p style="margin-top:8px; font-size:14px;"><strong>Currently wearing:</strong> ' + currentArmorLine + '</p>' +
      (rows ? '<div class="core-stats" style="margin-top:16px;">' + rows + '</div>' : '<p style="color:var(--ink-text-soft);">Nothing in stock right now.</p>') +
    '</div>';

  Array.from(document.querySelectorAll('.dungeon-buy-tile')).forEach(btn => {
    btn.addEventListener('click', () => onDungeonBuyItem(btn.getAttribute('data-item-name'), btn.getAttribute('data-item-type'), parseInt(btn.getAttribute('data-price'), 10)));
  });
  document.getElementById('dungeonLeaveShopBtn').addEventListener('click', renderDungeonRunState);
}

async function onDungeonBuyItem(itemName, itemType, price){
  const run = currentDungeonRun;
  if(run.runGold < price) return; // guard against a stale/disabled button being clicked anyway
  run.runGold -= price;

  if(itemType === 'weapon'){
    const isMagic = /^\+\d Weapon$/.test(itemName) || !!DUNGEON_NAMED_WEAPON_RIDERS[itemName];
    run.characterSnapshot.gear.push({ name:itemName, isMagic, kind:'equipment' });
  } else if(itemType === 'armor'){
    const isEnchantment = /^\+\d (Armor|Shield)$/.test(itemName);
    if(!isEnchantment){
      // Only one suit of armor can be worn at a time — replace any
      // existing base armor rather than stacking it, both because
      // that's how armor actually works and because
      // computeArmorClass() picks whichever armor appears first in
      // gear, so an old suit sitting ahead of the new one would
      // silently keep being used otherwise. Enchantments (+1 Armor,
      // +1 Shield) are separate, additive items that apply on top of
      // whatever base armor is worn — removing the base armor here
      // would leave the enchantment with nothing to enhance, since
      // computeArmorClass() only checks the magic bonus once it's
      // found a base armor to apply it to.
      run.characterSnapshot.gear = run.characterSnapshot.gear.filter(g => !ARMOR_TABLE[g.name]);
    }
    run.characterSnapshot.gear.push({ name:itemName, isMagic:isEnchantment, kind:'equipment' });
    run.characterSnapshot.ac = computeArmorClass(run.characterSnapshot.scores, run.characterSnapshot.cls, run.characterSnapshot.gear);
  } else {
    run.runInventory.push({ name:itemName, kind:'magic-item' });
  }

  // Remove the bought item from this visit's stock (mirrors a real
  // shop selling out, and stops the same weapon/armor being buyable
  // twice before the next restock).
  run.shopInventory = run.shopInventory.filter(it => it.name !== itemName || it.type !== itemType);

  if(currentUser && currentDungeonRunId) await saveDungeonRun(run, currentDungeonRunId);
  renderDungeonShop();
}

async function finishDungeonCombat(outcome){
  const run = currentDungeonRun;
  const cs = currentCombatState;
  const player = cs.combatants.find(c => c.side === 'player');
  run.currentHp = Math.max(0, player.hp);

  if(outcome === 'defeat'){
    run.status = 'dead';
    playDungeonDefeatSound();
    if(currentUser && currentDungeonRunId) await saveDungeonRun(run, currentDungeonRunId);
    renderDungeonDeathScreen();
    return;
  }

  playDungeonVictorySound();
  // Victory: loot, gold, a level-up, and a shop restock before
  // returning to the run screen.
  const loot = generateDungeonLoot(run.runLevel);
  run.runGold += loot.gold;
  run.runInventory = run.runInventory.concat(loot.items);
  run.history.push({ step: run.step, type:'combat', result:'won' });
  run.step += 1;
  const levelUpResult = run.runLevel < 20 ? levelUpDungeonRun(run) : null;
  restockDungeonShop(run);
  if(currentUser && currentDungeonRunId) await saveDungeonRun(run, currentDungeonRunId);
  renderDungeonVictoryScreen(loot, levelUpResult);
}

function renderDungeonVictoryScreen(loot, levelUpResult){
  const run = currentDungeonRun;
  dungeonMainContent.innerHTML =
    '<div class="sheet-toolbar">' +
      '<button type="button" class="toolbar-btn" id="dungeonContinueBtn">Continue</button>' +
    '</div>' +
    '<div class="sheet">' +
      '<h3 style="margin-top:0;">Victory</h3>' +
      '<p style="color:var(--ink-text-soft);">You found ' + loot.gold + ' gold' + (loot.items.length ? ' and ' + loot.items.length + ' item' + (loot.items.length>1?'s':'') + ':' : '.') + '</p>' +
      (loot.items.length ? '<div>' + loot.items.map(it => '<span class="tag" style="margin:2px 4px 2px 0; display:inline-block;">' + escapeHtml(it.name) + '</span>').join('') + '</div>' : '') +
      (levelUpResult ? '<p style="margin-top:16px; color:var(--ink-text-soft);">You reach level ' + run.runLevel + '! +' + levelUpResult.hpGained + ' HP' + (levelUpResult.spellTierUnlocked ? ', new spells unlocked' : '') + '.' + (levelUpResult.bossLevel ? ' A powerful presence awaits at the bottom of the dungeon.' : '') + '</p>' : '') +
    '</div>';
  document.getElementById('dungeonContinueBtn').addEventListener('click', renderDungeonRunState);
}

function renderDungeonDeathScreen(){
  const run = currentDungeonRun;
  const c = run.characterSnapshot;
  dungeonMainContent.innerHTML =
    '<div class="sheet-toolbar">' +
      '<button type="button" class="toolbar-btn" id="dungeonNewRunBtn">Start a new run</button>' +
    '</div>' +
    '<div class="sheet">' +
      '<h3 style="margin-top:0;">' + escapeHtml(c.name) + ' has fallen</h3>' +
      '<p style="color:var(--ink-text-soft);">Level ' + run.runLevel + ' ' + c.cls.name + ' \u2014 the run ends here. Death is permanent in this mode.</p>' +
    '</div>';
  document.getElementById('dungeonNewRunBtn').addEventListener('click', showDungeonClassPicker);
}

tabDonate.addEventListener('click', () => switchTab('donate'));
tabBlog.addEventListener('click', () => switchTab('blog'));

/* ---------- Theme toggle (dark / light) ---------- */

const themeToggles = Array.from(document.querySelectorAll('.theme-toggle'));

function applyTheme(theme){
  const isLight = theme === 'light';
  if(isLight) document.documentElement.setAttribute('data-theme', 'light');
  else document.documentElement.removeAttribute('data-theme');

  themeToggles.forEach(btn => {
    const sun = btn.querySelector('.theme-icon-sun');
    const moon = btn.querySelector('.theme-icon-moon');
    const label = btn.querySelector('span');
    sun.hidden = isLight;
    moon.hidden = !isLight;
    label.textContent = isLight ? 'Dark mode' : 'Light mode';
    btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    btn.setAttribute('aria-pressed', String(isLight));
  });
}

themeToggles.forEach(btn => {
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try{ localStorage.setItem('theme-preference', next); }catch(e){ /* storage unavailable, non-fatal */ }
  });
});

(function loadThemePreference(){
  try{
    const saved = localStorage.getItem('theme-preference');
    if(saved === 'light') applyTheme('light');
  }catch(e){ /* no saved preference yet — default (dark) stands */ }
})();

/* ================= MONSTER FORGE ================= */

const tierRow = document.getElementById('tierRow');
const monsterLocationRow = document.getElementById('monsterLocationRow');
const monsterRollBtn = document.getElementById('monsterRollBtn');
const monsterSealLabel = document.getElementById('monsterSealLabel');
let selectedTier = 'any';
let selectedMonsterLocation = 'any';
let currentMonster = null;
let currentMonsterRollId = null; // see currentCharacterRollId above for what this tracks and why

tierRow.addEventListener('click', (e) => {
  const chip = e.target.closest('.tier-chip');
  if(!chip) return;
  selectedTier = chip.getAttribute('data-tier');
  Array.from(tierRow.children).forEach(c => c.classList.toggle('active', c === chip));
});

monsterLocationRow.addEventListener('click', (e) => {
  const chip = e.target.closest('.location-chip');
  if(!chip) return;
  selectedMonsterLocation = chip.getAttribute('data-location');
  Array.from(monsterLocationRow.children).forEach(c => c.classList.toggle('active', c === chip));
});

monsterRollBtn.addEventListener('click', () => {
  monsterRollBtn.classList.add('stamping');
  monsterRollBtn.disabled = true;
  monsterSealLabel.textContent = 'Summoning…';
  setTimeout(() => {
    currentMonster = generateMonster(selectedTier, selectedMonsterLocation);
    currentMonsterRollId = null; // a freshly rolled monster isn't saved anywhere yet
    renderMonsterSheet(currentMonster);
    monsterSealLabel.textContent = 'Strike again';
    monsterRollBtn.classList.remove('stamping');
    monsterRollBtn.disabled = false;
  }, 420);
});

function monsterToText(m){
  const lines = [];
  lines.push(m.name);
  lines.push(m.size+' '+m.type+', '+m.alignment);
  lines.push('');
  lines.push('Armor Class '+m.ac+(m.acNote?' ('+m.acNote+')':''));
  lines.push('Hit Points '+m.hp+' ('+m.hitDice+')');
  lines.push('Speed '+m.speed);
  lines.push('');
  lines.push(ABILS.map(a => a.toUpperCase()+' '+m.scores[a]+' ('+fmtMod(mod(m.scores[a]))+')').join('   '));
  lines.push('');
  if(m.saves) lines.push('Saving Throws '+m.saves);
  if(m.skills) lines.push('Skills '+m.skills);
  if(m.resist) lines.push('Damage Resistances '+m.resist);
  if(m.immune) lines.push('Immunities '+m.immune);
  lines.push('Senses '+m.senses);
  lines.push('Languages '+m.languages);
  lines.push('Challenge '+m.cr+' ('+m.xp.toLocaleString()+' XP)');
  if(m.traits){
    lines.push('');
    lines.push('TRAITS');
    m.traits.forEach(t => lines.push(t.name+'. '+t.desc));
  }
  if(m.actions){
    lines.push('');
    lines.push('ACTIONS');
    m.actions.forEach(t => lines.push(t.name+'. '+t.desc));
  }
  if(m.legendary){
    lines.push('');
    lines.push('LEGENDARY ACTIONS');
    m.legendary.forEach(t => lines.push(t.name+'. '+t.desc));
  }
  return lines.join('\n');
}

async function copyMonsterText(){
  const text = monsterToText(currentMonster);
  try{
    if(navigator.clipboard && navigator.clipboard.writeText){
      await navigator.clipboard.writeText(text);
      const btn = document.getElementById('copyMonsterTextBtn');
      if(btn){
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = original; }, 1500);
      }
      return;
    }
    throw new Error('Clipboard API unavailable');
  }catch(e){
    try{
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if(!ok) throw new Error('execCommand failed');
      const btn = document.getElementById('copyMonsterTextBtn');
      if(btn){
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = original; }, 1500);
      }
    }catch(e2){
      copyTextFallback(text);
    }
  }
}

document.getElementById('monsterSheetContainer').addEventListener('click', (e) => {
  const actionBtn = e.target.closest('[data-action]');
  if(!actionBtn) return;
  const action = actionBtn.getAttribute('data-action');
  if(action === 'copy-monster-text') copyMonsterText();
  else if(action === 'export-pdf-monster') exportSheetAsPDF('monsterSheetContainer', currentMonster ? currentMonster.name : 'monster', actionBtn);
  else if(action === 'share-monster' && currentMonster) shareCurrentRoll('m', currentMonster, actionBtn);
  else if(action === 'save-monster' && currentMonster) saveCurrentRollToAccount('monster', currentMonster, actionBtn);
  else if(action === 'send-to-tracker-monster' && currentMonster) sendMonsterToTracker(currentMonster);
});

/* ================= LOOT TABLE ================= */

const lootLevelSlider = document.getElementById('lootLevelSlider');
const lootLevelValue = document.getElementById('lootLevelValue');
const hoardSizeRow = document.getElementById('hoardSizeRow');
const lootLocationRow = document.getElementById('lootLocationRow');
const lootRollBtn = document.getElementById('lootRollBtn');
const lootSealLabel = document.getElementById('lootSealLabel');
let selectedHoard = 'small';
let selectedLootLocation = 'any';
let currentLoot = null;
let currentLootRollId = null; // see currentCharacterRollId above for what this tracks and why

lootLevelSlider.addEventListener('input', () => {
  lootLevelValue.textContent = lootLevelSlider.value;
});

hoardSizeRow.addEventListener('click', (e) => {
  const chip = e.target.closest('.hoard-chip');
  if(!chip) return;
  selectedHoard = chip.getAttribute('data-hoard');
  Array.from(hoardSizeRow.children).forEach(c => c.classList.toggle('active', c === chip));
});

lootLocationRow.addEventListener('click', (e) => {
  const chip = e.target.closest('.location-chip');
  if(!chip) return;
  selectedLootLocation = chip.getAttribute('data-location');
  Array.from(lootLocationRow.children).forEach(c => c.classList.toggle('active', c === chip));
});

lootRollBtn.addEventListener('click', () => {
  lootRollBtn.classList.add('stamping');
  lootRollBtn.disabled = true;
  lootSealLabel.textContent = 'Cracking the vault…';
  const level = parseInt(lootLevelSlider.value, 10);
  setTimeout(() => {
    currentLoot = generateLoot(level, selectedHoard, selectedLootLocation);
    currentLootRollId = null; // a freshly rolled hoard isn't saved anywhere yet
    renderLootSheet(currentLoot);
    lootSealLabel.textContent = 'Strike again';
    lootRollBtn.classList.remove('stamping');
    lootRollBtn.disabled = false;
  }, 420);
});

function lootToText(loot){
  const lines = [];
  lines.push(HOARD_LABELS[loot.hoardKey]+' Hoard, Party Level '+loot.level);
  lines.push('');
  lines.push('Gold: '+loot.gold.toLocaleString()+' gp');
  lines.push('');
  lines.push('ITEMS FOUND');
  loot.items.forEach(it => {
    if(it.kind === 'magic-item'){
      const info = MAGIC_ITEM_DESC_LOOKUP[it.name];
      lines.push('- '+it.name+' ('+it.rarity+')'+(info && info.stats ? ': '+info.stats : ''));
    }
    else if(it.kind === 'trade-good') lines.push('- '+it.name+' (~'+it.value+' gp)');
    else lines.push('- '+it.name);
  });
  return lines.join('\n');
}

async function copyLootText(){
  const text = lootToText(currentLoot);
  try{
    if(navigator.clipboard && navigator.clipboard.writeText){
      await navigator.clipboard.writeText(text);
      const btn = document.getElementById('copyLootTextBtn');
      if(btn){
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = original; }, 1500);
      }
      return;
    }
    throw new Error('Clipboard API unavailable');
  }catch(e){
    try{
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if(!ok) throw new Error('execCommand failed');
      const btn = document.getElementById('copyLootTextBtn');
      if(btn){
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = original; }, 1500);
      }
    }catch(e2){
      copyTextFallback(text);
    }
  }
}

document.getElementById('lootSheetContainer').addEventListener('click', (e) => {
  const actionBtn = e.target.closest('[data-action]');
  if(actionBtn){
    const action = actionBtn.getAttribute('data-action');
    if(action === 'copy-loot-text') copyLootText();
    else if(action === 'export-pdf-loot') exportSheetAsPDF('lootSheetContainer', currentLoot ? (HOARD_LABELS[currentLoot.hoardKey]+'-hoard-lvl'+currentLoot.level) : 'loot', actionBtn);
    else if(action === 'share-loot' && currentLoot) shareCurrentRoll('l', currentLoot, actionBtn);
    else if(action === 'save-loot' && currentLoot) saveCurrentRollToAccount('loot', currentLoot, actionBtn);
    return;
  }
  const btn = e.target.closest('[data-kind]');
  if(!btn) return;
  const kind = btn.getAttribute('data-kind');
  const name = btn.getAttribute('data-name');
  handleTagClick(kind, name);
});

/* ================= ENCOUNTERS ================= */

const encPartySizeSlider = document.getElementById('encPartySizeSlider');
const encPartySizeValue = document.getElementById('encPartySizeValue');
const encPartyLevelSlider = document.getElementById('encPartyLevelSlider');
const encPartyLevelValue = document.getElementById('encPartyLevelValue');
const encDifficultyRow = document.getElementById('encDifficultyRow');
const encHookRow = document.getElementById('encHookRow');
const encRollBtn = document.getElementById('encRollBtn');
const encSealLabel = document.getElementById('encSealLabel');
let selectedEncDifficulty = 'medium';
let includeEncHook = true;
let currentEncounter = null;
let currentEncounterRollId = null; // see currentCharacterRollId above for what this tracks and why

encPartySizeSlider.addEventListener('input', () => { encPartySizeValue.textContent = encPartySizeSlider.value; });
encPartyLevelSlider.addEventListener('input', () => { encPartyLevelValue.textContent = encPartyLevelSlider.value; });

encDifficultyRow.addEventListener('click', (e) => {
  const chip = e.target.closest('.enc-diff-chip');
  if(!chip) return;
  selectedEncDifficulty = chip.getAttribute('data-diff');
  Array.from(encDifficultyRow.children).forEach(c => c.classList.toggle('active', c === chip));
});

encHookRow.addEventListener('click', (e) => {
  const chip = e.target.closest('.enc-hook-chip');
  if(!chip) return;
  includeEncHook = chip.getAttribute('data-hook') === 'yes';
  Array.from(encHookRow.children).forEach(c => c.classList.toggle('active', c === chip));
});

encRollBtn.addEventListener('click', () => {
  encRollBtn.classList.add('stamping');
  encRollBtn.disabled = true;
  encSealLabel.textContent = 'Springing the trap…';
  const partySize = parseInt(encPartySizeSlider.value, 10);
  const partyLevel = parseInt(encPartyLevelSlider.value, 10);
  setTimeout(() => {
    currentEncounter = generateEncounter(partySize, partyLevel, selectedEncDifficulty, includeEncHook);
    currentEncounterRollId = null; // a freshly rolled encounter isn't saved anywhere yet
    renderEncounterSheet(currentEncounter);
    encSealLabel.textContent = 'Strike again';
    encRollBtn.classList.remove('stamping');
    encRollBtn.disabled = false;
  }, 400);
});

function renderEncounterSheet(enc){
  const el = document.getElementById('encSheetContainer');
  const partyWord = enc.partySize === 1 ? 'a solo' : 'a party of ' + enc.partySize;
  const title = 'A ' + enc.resultDifficulty + ' encounter for ' + partyWord + ' level ' + enc.partyLevel + (enc.partySize > 1 ? 's' : '');

  // Group identical monsters so we show one stat block per unique creature,
  // not the same block repeated for every copy.
  const groups = [];
  enc.monsters.forEach(m => {
    const existing = groups.find(g => g.name === m.name);
    if(existing) existing.count++;
    else groups.push({ name: m.name, count: 1, monster: m });
  });

  let html =
    '<div class="sheet-toolbar">' +
      '<button type="button" class="toolbar-btn" data-action="copy-enc-text" id="copyEncTextBtn">Copy as Text</button>' +
      '<button type="button" class="toolbar-btn" data-action="export-pdf-enc">Export as PDF</button>' +
      '<button type="button" class="toolbar-btn" data-action="share-enc">Share</button>' +
      '<button type="button" class="toolbar-btn" data-action="save-enc" id="saveEncBtn">Save</button>' +
      '<button type="button" class="toolbar-btn" data-action="send-to-tracker">Send to Tracker</button>' +
    '</div>' +
    '<div class="sheet">' +
      '<div class="sheet-header">' +
        '<div><h2 class="char-name" style="text-transform:capitalize;">'+title+'</h2></div>' +
        '<div class="level-badge">'+enc.adjustedXP.toLocaleString()+' adj. XP</div>' +
      '</div>';

  if(enc.hookText){
    html += '<p style="margin:0 0 22px;font-size:15px;line-height:1.7;font-style:italic;color:var(--ink-text);">'+enc.hookText+'</p>';
  }

  groups.forEach((g, i) => {
    html += '<div class="section"'+(i < groups.length-1 ? ' style="border-bottom:1px solid var(--rule);padding-bottom:18px;margin-bottom:18px;"' : '')+'>';
    if(g.count > 1){
      html += '<p style="margin:0 0 6px;font-family:\'JetBrains Mono\', monospace;font-size:12px;color:var(--brass-bright);letter-spacing:0.04em;">\u00d7'+g.count+'</p>';
    }
    html += monsterStatBlockHTML(g.monster) + '</div>';
  });

  html += '</div>';
  el.innerHTML = html;
}

function encounterToText(enc){
  const partyWord = enc.partySize === 1 ? 'a solo' : 'a party of ' + enc.partySize;
  const lines = [];
  lines.push('A ' + enc.resultDifficulty.toUpperCase() + ' ENCOUNTER for ' + partyWord + ' level ' + enc.partyLevel + (enc.partySize > 1 ? 's' : ''));
  lines.push('Adjusted XP: ' + enc.adjustedXP.toLocaleString());
  lines.push('');
  if(enc.hookText){ lines.push(enc.hookText); lines.push(''); }
  const groups = [];
  enc.monsters.forEach(m => {
    const existing = groups.find(g => g.name === m.name);
    if(existing) existing.count++;
    else groups.push({ name: m.name, count: 1, monster: m });
  });
  groups.forEach(g => {
    lines.push((g.count > 1 ? g.count + 'x ' : '') + g.monster.name + ', CR ' + g.monster.cr + ', ' + g.monster.hp + ' HP, AC ' + g.monster.ac);
  });
  return lines.join('\n');
}

async function copyEncText(){
  const text = encounterToText(currentEncounter);
  const btn = document.getElementById('copyEncTextBtn');
  try{
    if(navigator.clipboard && navigator.clipboard.writeText){
      await navigator.clipboard.writeText(text);
      if(btn){ const original = btn.textContent; btn.textContent = 'Copied!'; setTimeout(() => { btn.textContent = original; }, 1500); }
      return;
    }
    throw new Error('Clipboard API unavailable');
  }catch(e){
    copyTextFallback(text);
  }
}

function encounterToSharePayload(enc){
  return {
    partySize: enc.partySize, partyLevel: enc.partyLevel,
    requestedDifficulty: enc.requestedDifficulty, resultDifficulty: enc.resultDifficulty,
    monsterNames: enc.monsters.map(m => m.name),
    rawXP: enc.rawXP, adjustedXP: enc.adjustedXP, multiplier: enc.multiplier,
    hookText: enc.hookText,
  };
}
function encounterFromSharePayload(d){
  const monsters = d.monsterNames.map(name => Object.assign({ name }, MONSTER_REGISTRY[name])).filter(m => m.cr !== undefined);
  if(!monsters.length) return null;
  return {
    partySize: d.partySize, partyLevel: d.partyLevel,
    requestedDifficulty: d.requestedDifficulty, resultDifficulty: d.resultDifficulty,
    monsters, rawXP: d.rawXP, adjustedXP: d.adjustedXP, multiplier: d.multiplier,
    hookText: d.hookText,
  };
}

document.getElementById('encSheetContainer').addEventListener('click', (e) => {
  const actionBtn = e.target.closest('[data-action]');
  if(!actionBtn) return;
  const action = actionBtn.getAttribute('data-action');
  if(action === 'copy-enc-text') copyEncText();
  else if(action === 'export-pdf-enc') exportSheetAsPDF('encSheetContainer', currentEncounter ? ('encounter-'+currentEncounter.resultDifficulty+'-lvl'+currentEncounter.partyLevel) : 'encounter', actionBtn);
  else if(action === 'share-enc' && currentEncounter) shareCurrentRoll('e', currentEncounter, actionBtn);
  else if(action === 'save-enc' && currentEncounter) saveCurrentRollToAccount('encounter', currentEncounter, actionBtn);
  else if(action === 'send-to-tracker' && currentEncounter) sendEncounterToTracker(currentEncounter);
});

/* ================= INITIATIVE TRACKER ================= */

const trackerNameInput = document.getElementById('trackerNameInput');
const trackerInitInput = document.getElementById('trackerInitInput');
const trackerHpInput = document.getElementById('trackerHpInput');
const trackerAcInput = document.getElementById('trackerAcInput');
const trackerMonsterNames = document.getElementById('trackerMonsterNames');
const trackerRoleRow = document.getElementById('trackerRoleRow');
const trackerAddBtn = document.getElementById('trackerAddBtn');
const trackerRoundLabel = document.getElementById('trackerRoundLabel');
const trackerNextBtn = document.getElementById('trackerNextBtn');
const trackerResetBtn = document.getElementById('trackerResetBtn');
const trackerListContainer = document.getElementById('trackerListContainer');

const TRACKER_CONDITIONS = ['Blinded','Charmed','Deafened','Exhaustion','Frightened','Grappled','Incapacitated','Invisible','Paralyzed','Petrified','Poisoned','Prone','Restrained','Stunned','Unconscious'];

let combatants = [];
let currentTurnId = null;
let roundNumber = 1;
let nextCombatantId = 1;
let selectedTrackerRole = 'monster';

function escapeHtml(str){
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

Object.keys(MONSTER_REGISTRY).forEach(name => {
  const opt = document.createElement('option');
  opt.value = name;
  trackerMonsterNames.appendChild(opt);
});

function updateTrackerNameSearchMode(){
  if(selectedTrackerRole === 'monster') trackerNameInput.setAttribute('list', 'trackerMonsterNames');
  else trackerNameInput.removeAttribute('list');
}
updateTrackerNameSearchMode();

trackerNameInput.addEventListener('input', () => {
  if(selectedTrackerRole !== 'monster') return;
  const match = MONSTER_REGISTRY[trackerNameInput.value.trim()];
  if(match){
    trackerHpInput.value = match.hp;
    trackerAcInput.value = match.ac;
  }
});

trackerRoleRow.addEventListener('click', (e) => {
  const chip = e.target.closest('.lock-chip');
  if(!chip) return;
  selectedTrackerRole = chip.getAttribute('data-role');
  Array.from(trackerRoleRow.children).forEach(c => c.classList.toggle('active', c === chip));
  updateTrackerNameSearchMode();
});

function addCombatant(){
  const name = trackerNameInput.value.trim();
  const initiative = parseInt(trackerInitInput.value, 10);
  const hp = parseInt(trackerHpInput.value, 10);
  const acRaw = parseInt(trackerAcInput.value, 10);
  const ac = isNaN(acRaw) ? null : acRaw;

  [trackerNameInput, trackerInitInput, trackerHpInput].forEach(el => el.classList.remove('tracker-input-invalid'));
  let invalid = false;
  if(!name){ trackerNameInput.classList.add('tracker-input-invalid'); invalid = true; }
  if(isNaN(initiative)){ trackerInitInput.classList.add('tracker-input-invalid'); invalid = true; }
  if(isNaN(hp) || hp < 1){ trackerHpInput.classList.add('tracker-input-invalid'); invalid = true; }
  if(invalid) return;

  combatants.push({
    id: nextCombatantId++,
    name, initiative, hp, maxHp: hp, ac,
    role: selectedTrackerRole,
    conditions: [],
  });
  if(currentTurnId === null) currentTurnId = combatants[0].id;

  trackerNameInput.value = '';
  trackerInitInput.value = '';
  trackerHpInput.value = '';
  trackerAcInput.value = '';
  trackerNameInput.focus();
  renderTracker();
}
[trackerNameInput, trackerInitInput, trackerHpInput].forEach(el => {
  el.addEventListener('input', () => el.classList.remove('tracker-input-invalid'));
});
trackerAddBtn.addEventListener('click', addCombatant);
[trackerNameInput, trackerInitInput, trackerHpInput, trackerAcInput].forEach(el => {
  el.addEventListener('keydown', (e) => { if(e.key === 'Enter') addCombatant(); });
});

function sortedCombatants(){
  return combatants.slice().sort((a,b) => b.initiative - a.initiative);
}

function nextTurn(){
  const sorted = sortedCombatants();
  if(!sorted.length) return;
  const idx = sorted.findIndex(c => c.id === currentTurnId);
  const nextIdx = idx === -1 ? 0 : (idx + 1) % sorted.length;
  if(nextIdx === 0 && idx !== -1) roundNumber++;
  currentTurnId = sorted[nextIdx].id;
  renderTracker();
}
trackerNextBtn.addEventListener('click', nextTurn);

function resetTracker(){
  combatants = [];
  currentTurnId = null;
  roundNumber = 1;
  renderTracker();
}
trackerResetBtn.addEventListener('click', resetTracker);

function adjustHp(id, delta){
  const c = combatants.find(c => c.id === id);
  if(!c) return;
  c.hp = Math.max(0, c.hp + delta);
  renderTracker();
}

function toggleCondition(id, condition){
  const c = combatants.find(c => c.id === id);
  if(!c) return;
  const idx = c.conditions.indexOf(condition);
  if(idx === -1) c.conditions.push(condition);
  else c.conditions.splice(idx, 1);
  renderTracker();
}

function removeCombatant(id){
  const wasCurrentTurn = currentTurnId === id;
  const sorted = sortedCombatants();
  const idx = sorted.findIndex(c => c.id === id);
  combatants = combatants.filter(c => c.id !== id);
  if(wasCurrentTurn){
    const remaining = sortedCombatants();
    currentTurnId = remaining.length ? remaining[idx % remaining.length].id : null;
  }
  renderTracker();
}

function renderTracker(){
  trackerRoundLabel.textContent = roundNumber;
  if(!combatants.length){
    trackerListContainer.innerHTML = '<div class="sheet-empty"><span class="glyph">&#9876;</span><h2>No combatants yet</h2><p>Add everyone in the fight on the left, then hit Next Turn to step through the round.</p></div>';
    return;
  }
  const sorted = sortedCombatants();
  trackerListContainer.innerHTML = sorted.map(c => {
    const isCurrent = c.id === currentTurnId;
    const hpClass = c.hp === 0 ? ' hp-zero' : '';
    const acHtml = (c.ac !== null && c.ac !== undefined) ? ' <span class="tracker-ac-value">AC '+c.ac+'</span>' : '';
    const hpDisplay = hpEditingId === c.id
      ? '<input type="number" class="tracker-input tracker-hp-edit-input" data-hp-edit-input="'+c.id+'" value="'+c.hp+'" min="0" style="width:64px;margin:0;padding:4px 6px;">'
      : '<span class="tracker-hp-value'+hpClass+'" data-edit-hp="'+c.id+'" title="Click to set an exact HP value">'+c.hp+' / '+c.maxHp+' HP</span>';
    const conditionsHtml = c.conditions.map(cond =>
      '<span class="tracker-condition-tag" data-remove-condition="'+c.id+'" data-condition="'+cond+'">'+cond+' \u00d7</span>'
    ).join('');
    const conditionOptionsHtml = TRACKER_CONDITIONS.map(cond =>
      '<button type="button" class="tracker-condition-option" data-add-condition="'+c.id+'" data-condition="'+cond+'">'+cond+'</button>'
    ).join('');
    return (
      '<div class="tracker-combatant'+(isCurrent ? ' current-turn' : '')+'">' +
        '<div class="tracker-init-badge">'+c.initiative+'</div>' +
        '<div class="tracker-combatant-main">' +
          '<div class="tracker-combatant-name">'+escapeHtml(c.name)+'<span class="tracker-role-tag">'+c.role+'</span>'+acHtml+'</div>' +
          '<div class="tracker-hp-row">' +
            '<button type="button" class="tracker-hp-btn" data-hp-delta="-1" data-id="'+c.id+'">\u2212</button>' +
            hpDisplay +
            '<button type="button" class="tracker-hp-btn" data-hp-delta="1" data-id="'+c.id+'">+</button>' +
          '</div>' +
          '<div class="tracker-conditions">' +
            conditionsHtml +
            '<div class="tracker-add-condition" data-condition-menu="'+c.id+'">' +
              '<span class="tracker-condition-tag" style="cursor:pointer;" data-toggle-condition-menu="'+c.id+'">+ Condition</span>' +
              '<div class="tracker-condition-menu">'+conditionOptionsHtml+'</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<button type="button" class="tracker-remove-btn" data-remove-combatant="'+c.id+'" aria-label="Remove combatant">&times;</button>' +
      '</div>'
    );
  }).join('');
  const editingInput = trackerListContainer.querySelector('[data-hp-edit-input]');
  if(editingInput){ editingInput.focus(); editingInput.select(); }
}

let hpEditingId = null;
function setExactHp(id, value){
  const c = combatants.find(c => c.id === id);
  if(!c) return;
  const parsed = parseInt(value, 10);
  if(!isNaN(parsed)) c.hp = Math.max(0, parsed);
  hpEditingId = null;
  renderTracker();
}

trackerListContainer.addEventListener('click', (e) => {
  const hpBtn = e.target.closest('[data-hp-delta]');
  if(hpBtn){
    adjustHp(parseInt(hpBtn.getAttribute('data-id'), 10), parseInt(hpBtn.getAttribute('data-hp-delta'), 10));
    return;
  }
  const editHpBtn = e.target.closest('[data-edit-hp]');
  if(editHpBtn){
    hpEditingId = parseInt(editHpBtn.getAttribute('data-edit-hp'), 10);
    renderTracker();
    return;
  }
  const removeBtn = e.target.closest('[data-remove-combatant]');
  if(removeBtn){
    removeCombatant(parseInt(removeBtn.getAttribute('data-remove-combatant'), 10));
    return;
  }
  const removeCondBtn = e.target.closest('[data-remove-condition]');
  if(removeCondBtn){
    toggleCondition(parseInt(removeCondBtn.getAttribute('data-remove-condition'), 10), removeCondBtn.getAttribute('data-condition'));
    return;
  }
  const addCondBtn = e.target.closest('[data-add-condition]');
  if(addCondBtn){
    toggleCondition(parseInt(addCondBtn.getAttribute('data-add-condition'), 10), addCondBtn.getAttribute('data-condition'));
    return;
  }
  const menuToggle = e.target.closest('[data-toggle-condition-menu]');
  if(menuToggle){
    const id = menuToggle.getAttribute('data-toggle-condition-menu');
    const wrap = trackerListContainer.querySelector('[data-condition-menu="'+id+'"]');
    const wasOpen = wrap.classList.contains('open');
    trackerListContainer.querySelectorAll('.tracker-add-condition.open').forEach(el => el.classList.remove('open'));
    if(!wasOpen) wrap.classList.add('open');
    return;
  }
  if(!e.target.closest('.tracker-add-condition')){
    trackerListContainer.querySelectorAll('.tracker-add-condition.open').forEach(el => el.classList.remove('open'));
  }
});

trackerListContainer.addEventListener('keydown', (e) => {
  const input = e.target.closest('[data-hp-edit-input]');
  if(!input) return;
  if(e.key === 'Enter'){
    setExactHp(parseInt(input.getAttribute('data-hp-edit-input'), 10), input.value);
  } else if(e.key === 'Escape'){
    hpEditingId = null;
    renderTracker();
  }
});
trackerListContainer.addEventListener('focusout', (e) => {
  const input = e.target.closest('[data-hp-edit-input]');
  if(!input) return;
  setExactHp(parseInt(input.getAttribute('data-hp-edit-input'), 10), input.value);
});

function addMonsterToTracker(m){
  const dexMod = mod(m.scores.dex);
  const initiative = roll(20) + 1 + dexMod;
  combatants.push({
    id: nextCombatantId++,
    name: m.name, initiative, hp: m.hp, maxHp: m.hp, ac: m.ac || null,
    role: 'monster', conditions: [],
  });
}

function sendEncounterToTracker(enc){
  enc.monsters.forEach(addMonsterToTracker);
  if(currentTurnId === null && combatants.length) currentTurnId = sortedCombatants()[0].id;
  switchTab('tracker');
  renderTracker();
}

function sendMonsterToTracker(m){
  addMonsterToTracker(m);
  if(currentTurnId === null) currentTurnId = sortedCombatants()[0].id;
  switchTab('tracker');
  renderTracker();
}

function sendCharacterToTracker(c){
  const initiative = roll(20) + 1 + sheetInitiative(c).total;
  combatants.push({
    id: nextCombatantId++,
    name: c.name, initiative, hp: c.hp, maxHp: c.hp, ac: c.ac || null,
    role: 'player', conditions: [],
  });
  if(currentTurnId === null) currentTurnId = sortedCombatants()[0].id;
  switchTab('tracker');
  renderTracker();
}

/* ================= DICE WIDGET ================= */

const diceWidget = document.getElementById('diceWidget');
const diceFab = document.getElementById('diceFab');
const dicePanel = document.getElementById('dicePanel');
const diceResult = document.getElementById('diceResult');
const diceLog = document.getElementById('diceLog');
let diceLogEntries = [];
let diceDragState = null;

function setDicePanelOpen(open){
  if(open){
    diceFab.classList.remove('pulse');
    positionDicePanel();
  }
  dicePanel.hidden = !open;
  diceFab.setAttribute('aria-expanded', String(open));
}

// The panel defaults to anchoring off the widget's right edge and expanding
// leftward/upward. If the widget has been dragged near the left or top edge
// of the viewport, that would push the panel off-screen — so before opening,
// check available space and flip the anchor side(s) that would overflow.
function positionDicePanel(){
  const panelWidth = 220; // matches .dice-panel CSS width
  const margin = 8;
  const fabRect = diceWidget.getBoundingClientRect();

  const roomLeft = fabRect.right; // space available if panel expands leftward from the right edge
  if(roomLeft < panelWidth + margin){
    dicePanel.style.right = 'auto';
    dicePanel.style.left = '0';
  } else {
    dicePanel.style.left = 'auto';
    dicePanel.style.right = '0';
  }

  const roomAbove = fabRect.top;
  const panelApproxHeight = dicePanel.offsetHeight || 260;
  if(roomAbove < panelApproxHeight + margin){
    dicePanel.style.bottom = 'auto';
    dicePanel.style.top = (fabRect.height + 12) + 'px';
  } else {
    dicePanel.style.top = 'auto';
    dicePanel.style.bottom = '68px';
  }
}

diceFab.addEventListener('pointerdown', (e) => {
  const rect = diceWidget.getBoundingClientRect();
  diceDragState = {
    startX: e.clientX, startY: e.clientY,
    startLeft: rect.left, startTop: rect.top,
    moved: false,
  };
  diceFab.setPointerCapture(e.pointerId);
});

diceFab.addEventListener('pointermove', (e) => {
  if(!diceDragState) return;
  const dx = e.clientX - diceDragState.startX;
  const dy = e.clientY - diceDragState.startY;
  if(!diceDragState.moved && Math.hypot(dx, dy) > 5){
    diceDragState.moved = true;
    diceWidget.style.right = 'auto';
    diceWidget.style.bottom = 'auto';
  }
  if(diceDragState.moved){
    const w = diceWidget.getBoundingClientRect();
    let newLeft = diceDragState.startLeft + dx;
    let newTop = diceDragState.startTop + dy;
    newLeft = Math.max(4, Math.min(window.innerWidth - w.width - 4, newLeft));
    newTop = Math.max(4, Math.min(window.innerHeight - w.height - 4, newTop));
    diceWidget.style.left = newLeft+'px';
    diceWidget.style.top = newTop+'px';
  }
});

diceFab.addEventListener('pointerup', (e) => {
  if(!diceDragState) return;
  const wasDrag = diceDragState.moved;
  try{ diceFab.releasePointerCapture(e.pointerId); }catch(err){}
  diceDragState = null;
  if(!wasDrag) setDicePanelOpen(dicePanel.hidden);
});

document.addEventListener('click', (e) => {
  if(dicePanel.hidden) return;
  if(!diceWidget.contains(e.target)) setDicePanelOpen(false);
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && !dicePanel.hidden) setDicePanelOpen(false);
});

dicePanel.addEventListener('click', (e) => {
  const btn = e.target.closest('.die-btn');
  if(!btn) return;
  const sides = parseInt(btn.getAttribute('data-die'), 10);
  const result = roll(sides) + 1;

  diceResult.textContent = result;
  diceResult.classList.remove('rolling', 'crit-high', 'crit-low');
  void diceResult.offsetWidth;
  diceResult.classList.add('rolling');
  if(sides === 20 && result === 20) diceResult.classList.add('crit-high');
  if(sides === 20 && result === 1) diceResult.classList.add('crit-low');

  diceLogEntries.unshift('d'+sides+': '+result);
  if(diceLogEntries.length > 5) diceLogEntries.length = 5;
  diceLog.textContent = diceLogEntries.join('   \u00b7   ');
});

/* ================= SPELLBOOK ================= */

const spellSearchInput = document.getElementById('spellSearchInput');
const spellNamesList = document.getElementById('spellNamesList');
const spellLevelRow = document.getElementById('spellLevelRow');
const spellClassRow = document.getElementById('spellClassRow');
const spellSchoolRow = document.getElementById('spellSchoolRow');
const spellbookListContainer = document.getElementById('spellbookListContainer');
const spellbookCount = document.getElementById('spellbookCount');
let spellLevelFilter = 'all';
let spellClassFilter = 'all';
let spellSchoolFilter = 'all';

const SPELL_LEVEL_LABELS = { 0:'Cantrips', 1:'Level 1', 2:'Level 2', 3:'Level 3', 4:'Level 4', 5:'Level 5', 6:'Level 6', 7:'Level 7', 8:'Level 8', 9:'Level 9' };

(function populateSpellDatalist(){
  const names = Object.keys(SPELL_REGISTRY).sort();
  spellNamesList.innerHTML = names.map(n => '<option value="'+n+'"></option>').join('');
  spellbookCount.textContent = names.length + ' spells on file. Click any spell to see its full details: casting time, range, components, duration, and effect.';
})();

function renderSpellbookList(filterText, levelFilter, classFilter, schoolFilter){
  const query = (filterText||'').trim().toLowerCase();

  if(!query && levelFilter === 'all' && classFilter === 'all' && schoolFilter === 'all'){
    spellbookListContainer.innerHTML = '<div class="sheet-empty">' +
      '<span class="glyph">\u2318</span>' +
      '<h2>Search the grimoire</h2>' +
      '<p>Start typing a spell name, or pick a level or class on the left to browse.</p>' +
    '</div>';
    return;
  }

  const byLevel = {};
  Object.entries(SPELL_REGISTRY).forEach(([name, info]) => {
    if(levelFilter !== 'all' && String(info.level) !== levelFilter) return;
    if(classFilter !== 'all' && !(SPELL_CLASSES[name]||[]).includes(classFilter)) return;
    if(schoolFilter !== 'all' && info.school !== schoolFilter) return;
    if(query && !name.toLowerCase().includes(query)) return;
    (byLevel[info.level] = byLevel[info.level] || []).push(name);
  });

  const levels = Object.keys(byLevel).map(Number).sort((a,b)=>a-b);
  if(levels.length === 0){
    spellbookListContainer.innerHTML = '<div class="sheet"><p class="spellbook-empty">No spells match that search.</p></div>';
    return;
  }

  let html = '<div class="sheet">';
  levels.forEach(lvl => {
    const names = byLevel[lvl].sort();
    html += '<div class="spellbook-section">' +
      '<h3 class="section-title">'+SPELL_LEVEL_LABELS[lvl]+'</h3>' +
      '<div class="tag-row">' + names.map(spellTagBtn).join('') + '</div>' +
    '</div>';
  });
  html += '</div>';
  spellbookListContainer.innerHTML = html;
}
renderSpellbookList('', 'all', 'all', 'all');

spellSearchInput.addEventListener('input', () => {
  renderSpellbookList(spellSearchInput.value, spellLevelFilter, spellClassFilter, spellSchoolFilter);
});
spellSearchInput.addEventListener('change', () => {
  const typed = spellSearchInput.value.trim();
  const exact = Object.keys(SPELL_REGISTRY).find(n => n.toLowerCase() === typed.toLowerCase());
  if(exact) handleTagClick('spell', exact);
});

spellLevelRow.addEventListener('click', (e) => {
  const chip = e.target.closest('.spell-level-chip');
  if(!chip) return;
  spellLevelFilter = chip.getAttribute('data-spell-level');
  Array.from(spellLevelRow.children).forEach(c => c.classList.toggle('active', c === chip));
  renderSpellbookList(spellSearchInput.value, spellLevelFilter, spellClassFilter, spellSchoolFilter);
});

spellClassRow.addEventListener('click', (e) => {
  const chip = e.target.closest('.spell-class-chip');
  if(!chip) return;
  spellClassFilter = chip.getAttribute('data-spell-class');
  Array.from(spellClassRow.children).forEach(c => c.classList.toggle('active', c === chip));
  renderSpellbookList(spellSearchInput.value, spellLevelFilter, spellClassFilter, spellSchoolFilter);
});

spellSchoolRow.addEventListener('click', (e) => {
  const chip = e.target.closest('.spell-school-chip');
  if(!chip) return;
  spellSchoolFilter = chip.getAttribute('data-spell-school');
  Array.from(spellSchoolRow.children).forEach(c => c.classList.toggle('active', c === chip));
  renderSpellbookList(spellSearchInput.value, spellLevelFilter, spellClassFilter, spellSchoolFilter);
});

spellbookListContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-kind]');
  if(!btn) return;
  const kind = btn.getAttribute('data-kind');
  const name = btn.getAttribute('data-name');
  handleTagClick(kind, name);
});

/* ---------- Bestiary ---------- */

const bestiarySearchInput = document.getElementById('bestiarySearchInput');
const bestiaryNamesList = document.getElementById('bestiaryNamesList');
const bestiaryTypeRow = document.getElementById('bestiaryTypeRow');
const bestiaryListContainer = document.getElementById('bestiaryListContainer');
const bestiaryCount = document.getElementById('bestiaryCount');
let bestiaryTypeFilter = 'all';

(function populateBestiaryDatalist(){
  const names = Object.keys(MONSTER_REGISTRY).sort();
  bestiaryNamesList.innerHTML = names.map(n => '<option value="'+n+'"></option>').join('');
  bestiaryCount.textContent = names.length + ' creatures on file. Click any creature to see its full stat block.';
})();

function bestiaryEntryBtn(name){
  const m = MONSTER_REGISTRY[name];
  return '<button type="button" class="landing-card" style="text-align:left;" data-bestiary-name="'+name+'">' +
    '<span class="landing-card-name">'+name+'</span>' +
    '<span class="landing-card-desc">'+m.size+' '+m.type+' \u00b7 CR '+m.cr+'</span>' +
  '</button>';
}

function renderBestiaryList(filterText, typeFilter){
  const query = (filterText||'').trim().toLowerCase();

  if(!query && typeFilter === 'all'){
    bestiaryListContainer.innerHTML = '<div class="sheet-empty">' +
      '<span class="glyph">\u2318</span>' +
      '<h2>Search the compendium</h2>' +
      '<p>Start typing a creature name, or pick a type on the left to browse.</p>' +
    '</div>';
    return;
  }

  const names = Object.keys(MONSTER_REGISTRY).filter(name => {
    const m = MONSTER_REGISTRY[name];
    if(typeFilter !== 'all' && m.type !== typeFilter) return false;
    if(query && !name.toLowerCase().includes(query)) return false;
    return true;
  }).sort();

  if(names.length === 0){
    bestiaryListContainer.innerHTML = '<div class="sheet"><p class="spellbook-empty">No creatures match that search.</p></div>';
    return;
  }

  bestiaryListContainer.innerHTML = '<div class="landing-grid" style="margin-bottom:0;">' + names.map(bestiaryEntryBtn).join('') + '</div>';
}
renderBestiaryList('', 'all');

function showBestiaryDetail(name){
  const m = MONSTER_REGISTRY[name];
  if(!m) return;
  bestiaryListContainer.innerHTML =
    '<div class="sheet-toolbar">' +
      '<button type="button" class="toolbar-btn" data-action="bestiary-back">\u2190 Back to list</button>' +
      '<button type="button" class="toolbar-btn" data-action="save-bestiary" data-bestiary-name="'+name+'">Save</button>' +
      '<button type="button" class="toolbar-btn" data-action="send-to-tracker-bestiary" data-bestiary-name="'+name+'">Send to Tracker</button>' +
    '</div>' +
    '<div class="sheet">' + monsterStatBlockHTML(Object.assign({name}, m)) + '</div>';
  bestiaryListContainer.scrollIntoView({ block: 'start' });
}

bestiarySearchInput.addEventListener('input', () => {
  renderBestiaryList(bestiarySearchInput.value, bestiaryTypeFilter);
});
bestiarySearchInput.addEventListener('change', () => {
  const typed = bestiarySearchInput.value.trim();
  const exact = Object.keys(MONSTER_REGISTRY).find(n => n.toLowerCase() === typed.toLowerCase());
  if(exact) showBestiaryDetail(exact);
});

bestiaryTypeRow.addEventListener('click', (e) => {
  const chip = e.target.closest('.bestiary-type-chip');
  if(!chip) return;
  bestiaryTypeFilter = chip.getAttribute('data-bestiary-type');
  Array.from(bestiaryTypeRow.children).forEach(c => c.classList.toggle('active', c === chip));
  renderBestiaryList(bestiarySearchInput.value, bestiaryTypeFilter);
});

bestiaryListContainer.addEventListener('click', (e) => {
  const entryBtn = e.target.closest('[data-bestiary-name]');
  if(entryBtn && !entryBtn.hasAttribute('data-action')){
    showBestiaryDetail(entryBtn.getAttribute('data-bestiary-name'));
    return;
  }
  const actionBtn = e.target.closest('[data-action]');
  if(!actionBtn) return;
  const action = actionBtn.getAttribute('data-action');
  if(action === 'bestiary-back'){
    bestiarySearchInput.value = '';
    renderBestiaryList('', bestiaryTypeFilter);
  }
  else if(action === 'save-bestiary'){
    const name = actionBtn.getAttribute('data-bestiary-name');
    const m = MONSTER_REGISTRY[name];
    if(m) saveCurrentRollToAccount('monster', Object.assign({name}, m), actionBtn);
  }
  else if(action === 'send-to-tracker-bestiary'){
    const name = actionBtn.getAttribute('data-bestiary-name');
    const m = MONSTER_REGISTRY[name];
    if(m) sendMonsterToTracker(Object.assign({name}, m));
  }
});

/* ---------- Restore a shared roll from the URL, if present ---------- */
(function restoreFromShareLink(){
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('share');
  if(!encoded) return;

  const packed = decodeShareParam(encoded);
  if(!packed || !packed.t || !packed.d) return;

  // A shared link should drop the visitor straight into the shared roll,
  // not the landing page — they already know what they clicked through for.
  landingPage.hidden = true;
  mobileNavHeader.hidden = false;
  tabBar.hidden = false;

  if(packed.t === 'c'){
    const character = characterFromSharePayload(packed.d);
    if(!character) return;
    currentCharacter = character;
    currentCharacterRollId = null; // a shared character isn't saved to this viewer's own account
    levelSlider.value = character.level;
    levelValue.textContent = character.level;
    switchTab('character');
    renderSheet(character);
    sealLabel.textContent = 'Strike again';
  } else if(packed.t === 'm'){
    const monster = monsterFromSharePayload(packed.d);
    if(!monster) return;
    currentMonster = monster;
    currentMonsterRollId = null; // a shared monster isn't saved to this viewer's own account
    switchTab('monster');
    renderMonsterSheet(monster);
    monsterSealLabel.textContent = 'Strike again';
  } else if(packed.t === 'l'){
    const loot = lootFromSharePayload(packed.d);
    if(!loot) return;
    currentLoot = loot;
    currentLootRollId = null; // a shared hoard isn't saved to this viewer's own account
    lootLevelSlider.value = loot.level;
    lootLevelValue.textContent = loot.level;
    switchTab('loot');
    renderLootSheet(loot);
    lootSealLabel.textContent = 'Strike again';
  } else if(packed.t === 'e'){
    const encounter = encounterFromSharePayload(packed.d);
    if(!encounter) return;
    currentEncounter = encounter;
    currentEncounterRollId = null; // a shared encounter isn't saved to this viewer's own account
    encPartySizeSlider.value = encounter.partySize;
    encPartySizeValue.textContent = encounter.partySize;
    encPartyLevelSlider.value = encounter.partyLevel;
    encPartyLevelValue.textContent = encounter.partyLevel;
    switchTab('encounters');
    renderEncounterSheet(encounter);
    encSealLabel.textContent = 'Strike again';
  }
})();

/* ================= ACCOUNTS: SIGN IN + SAVED ROLLS ================= */

const accountBtnLanding = document.getElementById('accountBtnLanding');
const accountBtnBar = document.getElementById('accountBtnBar');
const myrollsSignInBtn = document.getElementById('myrollsSignInBtn');
const myrollsSignedOutMsg = document.getElementById('myrollsSignedOutMsg');
const myrollsListContainer = document.getElementById('myrollsListContainer');

let currentUser = null;
let authReady = false;

function signInWithGoogle(){
  fbAuth.signInWithPopup(googleProvider).catch((e) => { console.error('Sign-in failed', e); });
}
function signOutOfAccount(){
  fbAuth.signOut();
}

function updateAccountUI(user){
  const nameLabel = user ? (user.displayName ? user.displayName.split(' ')[0] : 'Account') : 'Sign in';
  [accountBtnLanding, accountBtnBar].forEach(btn => {
    btn.querySelector('.account-name-label').textContent = nameLabel;
    btn.classList.toggle('is-signed-in', !!user);
  });
  myrollsSignedOutMsg.hidden = !!user;
  myrollsSignInBtn.hidden = !!user;
}

const signOutOverlay = document.getElementById('signOutOverlay');
const signOutPanel = document.getElementById('signOutPanel');
const signOutClose = document.getElementById('signOutClose');
const signOutCancelBtn = document.getElementById('signOutCancelBtn');
const signOutConfirmBtn = document.getElementById('signOutConfirmBtn');
let signOutLastFocusedEl = null;

function openSignOutConfirm(){
  signOutLastFocusedEl = document.activeElement;
  signOutOverlay.hidden = false;
  signOutPanel.focus();
}
function closeSignOutConfirm(){
  signOutOverlay.hidden = true;
  if(signOutLastFocusedEl && signOutLastFocusedEl.focus) signOutLastFocusedEl.focus();
}
signOutClose.addEventListener('click', closeSignOutConfirm);
signOutCancelBtn.addEventListener('click', closeSignOutConfirm);
signOutOverlay.addEventListener('click', (e) => { if(e.target === signOutOverlay) closeSignOutConfirm(); });
document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && !signOutOverlay.hidden) closeSignOutConfirm(); });
signOutConfirmBtn.addEventListener('click', () => { signOutOfAccount(); closeSignOutConfirm(); });

document.getElementById('accountSignOutBtn').addEventListener('click', openSignOutConfirm);

// My Account lives at /account/. From any other page, go there; on it, just re-render.
function goToAccount(){
  if(location.pathname === '/account/') openAccountTab();
  else location.href = '/account/';
}
accountBtnLanding.addEventListener('click', () => { currentUser ? goToAccount() : signInWithGoogle(); });
accountBtnBar.addEventListener('click', () => { currentUser ? goToAccount() : signInWithGoogle(); });
myrollsSignInBtn.addEventListener('click', signInWithGoogle);

fbAuth.onAuthStateChanged((user) => {
  authReady = true;
  currentUser = user;
  updateAccountUI(user);
  if(user) loadAccountProfile();
  if(!myrollsView.hidden) renderMyRollsList();
  if(!accountView.hidden) renderAccountPage();
});

function rollTypeLabel(type){
  if(type === 'character') return 'Character';
  if(type === 'monster') return 'Monster';
  if(type === 'encounter') return 'Encounter';
  return 'Loot';
}
function rollDisplayName(type, obj){
  if(type === 'character') return obj.name;
  if(type === 'monster') return obj.name;
  if(type === 'encounter') return obj.resultDifficulty.charAt(0).toUpperCase()+obj.resultDifficulty.slice(1)+', party of '+obj.partySize+' lvl '+obj.partyLevel;
  return (HOARD_LABELS[obj.hoardKey]||'') + ' hoard, level ' + obj.level;
}
function rollPayload(type, obj){
  if(type === 'character') return characterToSharePayload(obj, true);
  if(type === 'monster') return monsterToSharePayload(obj);
  if(type === 'encounter') return encounterToSharePayload(obj);
  return lootToSharePayload(obj);
}
function rollFromPayload(type, data){
  if(type === 'character') return characterFromSharePayload(data);
  if(type === 'monster') return monsterFromSharePayload(data);
  if(type === 'encounter') return encounterFromSharePayload(data);
  return lootFromSharePayload(data);
}

// let-declared variables can't be looked up dynamically by name
// (no window['current'+type+'RollId']), so these two small helpers
// do the type -> tracking-variable mapping explicitly in one place.
function getCurrentRollId(type){
  if(type === 'character') return currentCharacterRollId;
  if(type === 'monster') return currentMonsterRollId;
  if(type === 'encounter') return currentEncounterRollId;
  return currentLootRollId;
}
function setCurrentRollId(type, id){
  if(type === 'character') currentCharacterRollId = id;
  else if(type === 'monster') currentMonsterRollId = id;
  else if(type === 'encounter') currentEncounterRollId = id;
  else currentLootRollId = id;
}

function saveCurrentRollToAccount(type, obj, buttonEl){
  if(!currentUser){ signInWithGoogle(); return; }
  const originalText = buttonEl ? buttonEl.textContent : '';
  if(buttonEl){ buttonEl.textContent = 'Saving…'; buttonEl.disabled = true; }

  const collection = fbDb.collection('users').doc(currentUser.uid).collection('savedRolls');
  const existingId = getCurrentRollId(type);
  // If this roll was loaded from (or already saved to) an existing
  // document, update that same entry instead of always creating a
  // fresh duplicate — this is what makes edits after the fact (like
  // typing character notes) actually stick on a re-save, rather than
  // silently updating a second, orphaned copy nobody's looking at.
  const savePromise = existingId
    ? collection.doc(existingId).update({
        name: rollDisplayName(type, obj),
        data: rollPayload(type, obj),
      })
    : collection.add({
        type,
        name: rollDisplayName(type, obj),
        data: rollPayload(type, obj),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      }).then((docRef) => { setCurrentRollId(type, docRef.id); });

  savePromise.then(() => {
    if(buttonEl){ buttonEl.textContent = 'Saved!'; setTimeout(() => { buttonEl.textContent = originalText; buttonEl.disabled = false; }, 1500); }
  }).catch((e) => {
    console.error('Save failed', e);
    if(buttonEl){ buttonEl.textContent = 'Failed'; setTimeout(() => { buttonEl.textContent = originalText; buttonEl.disabled = false; }, 1500); }
  });
}

/* ---------- Dungeon Run: Firestore persistence ---------- */

// Converts a run object (as returned by startDungeonRun / mutated by
// levelUpDungeonRun) into a Firestore-safe payload. The character
// snapshot reuses characterToSharePayload — the exact same
// serialization savedRolls already relies on — rather than a new,
// parallel format, since run.characterSnapshot is shaped identically
// to any other generateCharacter() result.
function dungeonRunToFirestorePayload(run){
  return {
    characterSnapshot: characterToSharePayload(run.characterSnapshot),
    status: run.status,
    runLevel: run.runLevel,
    runXp: run.runXp,
    currentHp: run.currentHp,
    maxHp: run.maxHp,
    resources: run.resources,
    runGold: run.runGold,
    runInventory: run.runInventory,
    shopInventory: run.shopInventory,
    step: run.step,
    history: run.history,
  };
}

function dungeonRunFromFirestorePayload(data){
  return {
    characterSnapshot: characterFromSharePayload(data.characterSnapshot),
    status: data.status,
    runLevel: data.runLevel,
    runXp: data.runXp,
    currentHp: data.currentHp,
    maxHp: data.maxHp,
    resources: data.resources,
    runGold: data.runGold,
    runInventory: data.runInventory,
    shopInventory: data.shopInventory || [], // older saved runs predate this field
    step: data.step,
    history: data.history,
  };
}

// Creates a new run doc (runId is null) or updates an existing one.
// Callers should remember the returned/passed-in runId for
// subsequent saves — this mirrors savedRolls' add()-then-reuse-the-id
// pattern rather than re-querying to find the doc each time.
function saveDungeonRun(run, runId){
  if(!currentUser){ signInWithGoogle(); return Promise.reject(new Error('not signed in')); }
  const payload = Object.assign({ updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, dungeonRunToFirestorePayload(run));

  const coll = fbDb.collection('users').doc(currentUser.uid).collection('dungeonRuns');
  if(runId){
    return coll.doc(runId).set(payload, { merge:true }).then(() => runId);
  }
  payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  return coll.add(payload).then((doc) => doc.id);
}

// One active run per user (not per character — Dungeon Run
// characters are disposable and never saved to savedRolls, so
// there's no permanent character to key a run off of). Returns
// {id, run} for the most recent in-progress run, or null if none.
function loadActiveDungeonRun(){
  if(!currentUser) return Promise.resolve(null);
  return fbDb.collection('users').doc(currentUser.uid).collection('dungeonRuns')
    .where('status', '==', 'in-progress')
    .orderBy('updatedAt', 'desc')
    .limit(1)
    .get()
    .then((snap) => {
      if(snap.empty) return null;
      const doc = snap.docs[0];
      return { id: doc.id, run: dungeonRunFromFirestorePayload(doc.data()) };
    });
}

// Ends a run with a final status ('won', 'dead', or 'abandoned').
// No banking step — Dungeon Run characters were never permanent
// (savedRolls) characters to begin with, so there's nothing to merge
// gold/loot/XP back into. The run doc itself, with its history log,
// is the permanent record for the eventual summary screen.
function endDungeonRunInFirestore(run, runId, status){
  run.status = status;
  return saveDungeonRun(run, runId);
}

/* ================= ACCOUNT PAGE: AVATAR, ACCENT, STATS, JOURNAL ================= */

const ACCOUNT_AVATARS = [
  { id: 'wizard', icon: '\u{1F9D9}' },
  { id: 'warrior', icon: '⚔️' },
  { id: 'rogue', icon: '\u{1F5E1}️' },
  { id: 'ranger', icon: '\u{1F3F9}' },
  { id: 'cleric', icon: '\u{1F6E1}️' },
  { id: 'dragon', icon: '\u{1F409}' },
  { id: 'skull', icon: '\u{1F480}' },
  { id: 'owl', icon: '\u{1F989}' },
  { id: 'fire', icon: '\u{1F525}' },
  { id: 'moon', icon: '\u{1F319}' },
  { id: 'scroll', icon: '\u{1F4DC}' },
  { id: 'gem', icon: '\u{1F48E}' },
];
const ACCOUNT_ACCENTS = [
  { id: 'brass', label: 'Brass', swatch: '#D4A85C' },
  { id: 'crimson', label: 'Crimson', swatch: '#B85148' },
  { id: 'ledger', label: 'Ledger Green', swatch: '#6E8563' },
  { id: 'arcane', label: 'Arcane', swatch: '#7F6BB8' },
  { id: 'frost', label: 'Frost', swatch: '#5B95BD' },
];

let accountProfile = { avatarId: 'wizard', accentColor: 'brass' };

function loadAccountProfile(){
  if(!currentUser) return Promise.resolve();
  return fbDb.collection('users').doc(currentUser.uid).collection('profile').doc('settings').get()
    .then((doc) => {
      if(doc.exists){
        const d = doc.data();
        if(d.avatarId) accountProfile.avatarId = d.avatarId;
        if(d.accentColor) accountProfile.accentColor = d.accentColor;
      }
      applyAccentColor(accountProfile.accentColor);
    })
    .catch((e) => console.error('Failed to load account profile', e));
}

function saveAccountProfile(patch){
  Object.assign(accountProfile, patch);
  if(!currentUser) return;
  fbDb.collection('users').doc(currentUser.uid).collection('profile').doc('settings').set(accountProfile, { merge: true })
    .catch((e) => console.error('Failed to save account profile', e));
}

function applyAccentColor(accentId){
  if(!accentId || accentId === 'brass') document.documentElement.removeAttribute('data-accent');
  else document.documentElement.setAttribute('data-accent', accentId);
}

function computeAccountTitle(total){
  if(total >= 30) return 'Legendary Adventurer';
  if(total >= 15) return 'Veteran Adventurer';
  if(total >= 5) return 'Seasoned Adventurer';
  if(total >= 1) return 'Apprentice Adventurer';
  return 'Newcomer';
}

function accountStatCard(num, label){
  return '<div class="account-stat-card"><div class="account-stat-num">'+num+'</div><div class="account-stat-label">'+label+'</div></div>';
}

function renderAccountPage(){
  document.getElementById('accountView').classList.toggle('signed-out', !currentUser);
  if(!currentUser){
    // Signed out (e.g. a direct visit to /account/, or after signing out here).
    document.getElementById('accountDisplayName').textContent = 'Adventurer';
    document.getElementById('accountStatsGrid').innerHTML =
      '<div class="account-signin-prompt"><p>Sign in to see your stats, journal, and profile.</p>' +
      '<button type="button" class="toolbar-btn" id="accountSignInPromptBtn">Sign in with Google</button></div>';
    document.getElementById('accountSignInPromptBtn').addEventListener('click', signInWithGoogle);
    closeJournalEditor();
    document.getElementById('journalListContainer').innerHTML = '';
    return;
  }
  document.getElementById('accountDisplayName').textContent = currentUser.displayName ? currentUser.displayName.split(' ')[0] : 'Adventurer';
  document.getElementById('accountAvatarBig').textContent = (ACCOUNT_AVATARS.find(a => a.id === accountProfile.avatarId) || ACCOUNT_AVATARS[0]).icon;

  document.getElementById('accountAvatarGrid').innerHTML = ACCOUNT_AVATARS.map(a =>
    '<button type="button" class="account-avatar-choice'+(a.id === accountProfile.avatarId ? ' active' : '')+'" data-avatar-id="'+a.id+'" aria-label="'+a.id+' avatar">'+a.icon+'</button>'
  ).join('');

  document.getElementById('accountAccentRow').innerHTML = ACCOUNT_ACCENTS.map(a =>
    '<button type="button" class="account-accent-swatch'+(a.id === accountProfile.accentColor ? ' active' : '')+'" data-accent-id="'+a.id+'" style="background:'+a.swatch+';" aria-label="'+a.label+' accent" title="'+a.label+'"></button>'
  ).join('');

  document.getElementById('accountStatsGrid').innerHTML = '<p style="color:var(--ink-text-soft);">Loading your stats…</p>';

  const rollsPromise = fbDb.collection('users').doc(currentUser.uid).collection('savedRolls').get();
  // Dungeon Run history is optional for the stats: if it can't be read, still show the roll counts.
  const runsPromise = fbDb.collection('users').doc(currentUser.uid).collection('dungeonRuns').get()
    .catch((e) => { console.error('Failed to load dungeon runs for stats', e); return null; });

  Promise.all([rollsPromise, runsPromise]).then(([rollsSnap, runsSnap]) => {
    const counts = { character: 0, monster: 0, loot: 0, encounter: 0 };
    rollsSnap.forEach((doc) => {
      const d = doc.data();
      if(counts[d.type] !== undefined) counts[d.type]++;
    });
    let runsWon = 0;
    if(runsSnap) runsSnap.forEach((doc) => { if(doc.data().status === 'won') runsWon++; });
    const runsTotal = runsSnap ? runsSnap.size : 0;
    const total = counts.character + counts.monster + counts.loot + counts.encounter + runsTotal;

    document.getElementById('accountTitleBadge').textContent = computeAccountTitle(total);
    document.getElementById('accountStatsGrid').innerHTML =
      accountStatCard(counts.character, 'Characters') +
      accountStatCard(counts.monster, 'Monsters') +
      accountStatCard(counts.loot, 'Loot Hauls') +
      accountStatCard(counts.encounter, 'Encounters') +
      accountStatCard(runsSnap ? runsTotal : '–', 'Dungeon Runs') +
      accountStatCard(runsSnap ? runsWon : '–', 'Runs Survived');
  }).catch((e) => {
    console.error('Failed to load account stats', e);
    document.getElementById('accountStatsGrid').innerHTML = '<p style="color:var(--ink-text-soft);">Couldn’t load your stats. Try again in a moment.</p>';
  });

  closeJournalEditor();
  renderJournalList();
}

document.getElementById('accountAvatarGrid').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-avatar-id]');
  if(!btn) return;
  saveAccountProfile({ avatarId: btn.getAttribute('data-avatar-id') });
  renderAccountPage();
});

document.getElementById('accountAccentRow').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-accent-id]');
  if(!btn) return;
  const id = btn.getAttribute('data-accent-id');
  applyAccentColor(id);
  saveAccountProfile({ accentColor: id });
  renderAccountPage();
});

let journalEditingId = null;

// Firestore timestamps -> "1 Oct 2026, 23:45" in the reader's own locale.
function formatJournalDate(ts){
  const d = ts && typeof ts.toDate === 'function' ? ts.toDate() : (ts ? new Date(ts) : null);
  if(!d || isNaN(d)) return '';
  return d.toLocaleDateString(undefined, { day:'numeric', month:'short', year:'numeric' }) + ', ' +
    d.toLocaleTimeString(undefined, { hour:'2-digit', minute:'2-digit' });
}
// "Written 1 Oct 2026, 23:45 · edited 3 Oct 2026, 10:02" (edited only if
// changed more than a minute after it was written).
function journalDateLine(d){
  const created = formatJournalDate(d.createdAt);
  const toMs = ts => ts && typeof ts.toMillis === 'function' ? ts.toMillis() : (ts ? +new Date(ts) : 0);
  const edited = toMs(d.updatedAt) - toMs(d.createdAt) > 60000 ? formatJournalDate(d.updatedAt) : '';
  if(!created) return edited ? 'Edited '+edited : '';
  return 'Written '+created + (edited ? ' \u00b7 edited '+edited : '');
}

function renderJournalList(){
  if(!currentUser) return;
  const container = document.getElementById('journalListContainer');
  container.innerHTML = '<p style="color:var(--ink-text-soft);">Loading your journal…</p>';
  fbDb.collection('users').doc(currentUser.uid).collection('journal').orderBy('updatedAt', 'desc').get()
    .then((snapshot) => {
      if(snapshot.empty){
        container.innerHTML = '<p style="color:var(--ink-text-soft);">No journal entries yet. Jot down plot threads, NPC names, or where you left off.</p>';
        return;
      }
      let html = '';
      snapshot.forEach((doc) => {
        const d = doc.data();
        const content = d.content || '';
        const snippet = content.slice(0, 120);
        html += '<div class="journal-entry" data-journal-id="'+doc.id+'">' +
          '<p class="journal-entry-title">'+escapeHtml(d.title || 'Untitled')+'</p>' +
          (journalDateLine(d) ? '<p class="journal-entry-meta">'+journalDateLine(d)+'</p>' : '') +
          '<p class="journal-entry-snippet">'+escapeHtml(snippet)+(content.length > 120 ? '…' : '')+'</p>' +
        '</div>';
      });
      container.innerHTML = html;
    })
    .catch((e) => {
      console.error('Failed to load journal', e);
      container.innerHTML = '<p style="color:var(--ink-text-soft);">Couldn’t load your journal. Try again in a moment.</p>';
    });
}

function openJournalEditor(id, title, content, dateLine){
  journalEditingId = id || null;
  const editor = document.getElementById('journalEditorContainer');
  editor.innerHTML =
    '<div style="margin-bottom:14px;">' +
      (dateLine ? '<p class="journal-entry-meta" style="margin:0 0 8px;">'+dateLine+'</p>' : '') +
      '<input type="text" id="journalTitleInput" class="tracker-input" placeholder="Entry title" style="width:100%;margin-bottom:8px;" value="'+escapeHtml(title || '')+'" maxlength="80">' +
      '<textarea class="character-notes" id="journalContentInput" placeholder="Write your notes…" style="min-height:140px;">'+escapeHtml(content || '')+'</textarea>' +
      '<div style="display:flex;gap:8px;margin-top:8px;">' +
        '<button type="button" class="toolbar-btn" id="journalSaveBtn">Save</button>' +
        (id ? '<button type="button" class="toolbar-btn" id="journalDeleteBtn">Delete</button>' : '') +
        '<button type="button" class="toolbar-btn" id="journalCancelBtn">Cancel</button>' +
      '</div>' +
    '</div>';
  const titleInput = document.getElementById('journalTitleInput');
  if(titleInput) titleInput.focus();
}

function closeJournalEditor(){
  journalEditingId = null;
  const editor = document.getElementById('journalEditorContainer');
  if(editor) editor.innerHTML = '';
}

document.getElementById('journalNewEntryBtn').addEventListener('click', () => openJournalEditor(null, '', ''));

document.getElementById('journalListContainer').addEventListener('click', (e) => {
  const row = e.target.closest('[data-journal-id]');
  if(!row || !currentUser) return;
  const id = row.getAttribute('data-journal-id');
  fbDb.collection('users').doc(currentUser.uid).collection('journal').doc(id).get().then((doc) => {
    if(!doc.exists) return;
    const d = doc.data();
    openJournalEditor(id, d.title, d.content, journalDateLine(d));
  }).catch((e) => console.error('Failed to load journal entry', e));
});

document.getElementById('journalEditorContainer').addEventListener('click', (e) => {
  if(!currentUser) return;
  if(e.target.id === 'journalCancelBtn'){ closeJournalEditor(); return; }
  if(e.target.id === 'journalSaveBtn'){
    const title = document.getElementById('journalTitleInput').value.trim() || 'Untitled';
    const content = document.getElementById('journalContentInput').value;
    const coll = fbDb.collection('users').doc(currentUser.uid).collection('journal');
    const savePromise = journalEditingId
      ? coll.doc(journalEditingId).update({ title, content, updatedAt: firebase.firestore.FieldValue.serverTimestamp() })
      : coll.add({ title, content, createdAt: firebase.firestore.FieldValue.serverTimestamp(), updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    const saveBtn = e.target;
    saveBtn.textContent = 'Saving…';
    savePromise.then(() => { closeJournalEditor(); renderJournalList(); }).catch((err) => {
      console.error('Failed to save journal entry', err);
      // Keep the editor open so nothing typed is lost, and say so.
      saveBtn.textContent = 'Couldn’t save, try again';
    });
    return;
  }
  if(e.target.id === 'journalDeleteBtn'){
    if(!journalEditingId) return;
    fbDb.collection('users').doc(currentUser.uid).collection('journal').doc(journalEditingId).delete()
      .then(() => { closeJournalEditor(); renderJournalList(); })
      .catch((e) => console.error('Failed to delete journal entry', e));
  }
});

function renderCampaignNotes(){
  const el = document.getElementById('campaignNotesSection');
  if(!currentUser){ el.innerHTML = ''; return; }
  el.innerHTML = '<p style="color:var(--ink-text-soft);">Loading your campaign notes\u2026</p>';
  fbDb.collection('users').doc(currentUser.uid).collection('savedRolls').doc('_campaignNotes').get()
    .then((doc) => {
      const notes = (doc.exists && doc.data().notes) ? doc.data().notes : '';
      el.innerHTML =
        '<div class="sheet" style="margin-bottom:24px;">' +
          '<h3 class="section-title" style="margin-bottom:10px;">Campaign Notes</h3>' +
          '<textarea class="character-notes" id="campaignNotesInput" placeholder="Plot threads, NPCs, where the party left off\u2026" style="min-height:140px;">'+escapeHtml(notes)+'</textarea>' +
          '<button type="button" class="toolbar-btn" id="saveCampaignNotesBtn" style="margin-top:10px;">Save Notes</button>' +
        '</div>';
    })
    .catch((e) => {
      console.error('Load failed', e);
      el.innerHTML = '<p style="color:var(--ink-text-soft);">Couldn\u2019t load your campaign notes. Try again in a moment.</p>';
    });
}

function saveCampaignNotes(buttonEl){
  if(!currentUser) return;
  const input = document.getElementById('campaignNotesInput');
  const originalText = buttonEl.textContent;
  buttonEl.textContent = 'Saving\u2026';
  buttonEl.disabled = true;
  fbDb.collection('users').doc(currentUser.uid).collection('savedRolls').doc('_campaignNotes').set({ type: 'campaignNotes', notes: input.value }, { merge: true })
    .then(() => {
      buttonEl.textContent = 'Saved!';
      setTimeout(() => { buttonEl.textContent = originalText; buttonEl.disabled = false; }, 1500);
    })
    .catch((e) => {
      console.error('Save failed', e);
      buttonEl.textContent = 'Failed';
      setTimeout(() => { buttonEl.textContent = originalText; buttonEl.disabled = false; }, 1500);
    });
}
document.getElementById('campaignNotesSection').addEventListener('click', (e) => {
  if(e.target.id === 'saveCampaignNotesBtn') saveCampaignNotes(e.target);
});

function renderMyRollsList(){
  if(!currentUser){ myrollsListContainer.innerHTML = ''; return; }
  myrollsListContainer.innerHTML = '<p style="color:var(--ink-text-soft);">Loading your saved rolls…</p>';
  fbDb.collection('users').doc(currentUser.uid).collection('savedRolls').orderBy('createdAt', 'desc').get()
    .then((snapshot) => {
      if(snapshot.empty){
        myrollsListContainer.innerHTML = '<p style="color:var(--ink-text-soft);">Nothing saved yet. Roll something, then hit Save.</p>';
        return;
      }
      const rows = [];
      snapshot.forEach((doc) => {
        const d = doc.data();
        if(d.type === 'campaignNotes') return;
        rows.push({ id: doc.id, d });
      });
      // Pinned rolls float to the top; createdAt desc order is preserved within each group.
      rows.sort((a, b) => (b.d.pinned ? 1 : 0) - (a.d.pinned ? 1 : 0));
      let html = '';
      rows.forEach(({ id, d }) => {
        html += '<div class="history-item" style="display:flex;justify-content:space-between;align-items:center;gap:10px;" data-roll-row="'+id+'">' +
          '<button type="button" class="myroll-star'+(d.pinned ? ' pinned' : '')+'" data-pin-roll="'+id+'" aria-label="'+(d.pinned ? 'Unpin this roll' : 'Pin this roll')+'" title="'+(d.pinned ? 'Unpin' : 'Pin to the top') +'">'+(d.pinned ? '★' : '☆')+'</button>' +
          '<button type="button" class="toolbar-btn" data-load-roll="'+id+'" data-load-type="'+d.type+'" data-roll-name="'+d.name.replace(/"/g,'&quot;')+'" style="flex:1;text-align:left;">'+rollTypeLabel(d.type)+' : '+d.name+'</button>' +
          '<button type="button" class="toolbar-btn" data-rename-roll="'+id+'">Rename</button>' +
          '<button type="button" class="toolbar-btn" data-delete-roll="'+id+'">Delete</button>' +
        '</div>';
      });
      myrollsListContainer.innerHTML = html;
    })
    .catch((e) => {
      console.error('Load failed', e);
      myrollsListContainer.innerHTML = '<p style="color:var(--ink-text-soft);">Couldn\u2019t load your saved rolls. Try again in a moment.</p>';
    });
}

myrollsListContainer.addEventListener('click', (e) => {
  const pinBtn = e.target.closest('[data-pin-roll]');
  if(pinBtn){
    const id = pinBtn.getAttribute('data-pin-roll');
    const nowPinned = !pinBtn.classList.contains('pinned');
    fbDb.collection('users').doc(currentUser.uid).collection('savedRolls').doc(id).update({ pinned: nowPinned })
      .then(() => renderMyRollsList())
      .catch((e) => console.error('Failed to update pin', e));
    return;
  }
  const loadBtn = e.target.closest('[data-load-roll]');
  if(loadBtn){
    const id = loadBtn.getAttribute('data-load-roll');
    const type = loadBtn.getAttribute('data-load-type');
    fbDb.collection('users').doc(currentUser.uid).collection('savedRolls').doc(id).get().then((doc) => {
      if(!doc.exists) return;
      const d = doc.data();
      const obj = rollFromPayload(type, d.data);
      if(!obj) return;
      if(type === 'character'){ currentCharacter = obj; currentCharacterRollId = id; switchTab('character'); renderSheet(obj); sealLabel.textContent = 'Forge another'; }
      else if(type === 'monster'){ currentMonster = obj; currentMonsterRollId = id; switchTab('monster'); renderMonsterSheet(obj); monsterSealLabel.textContent = 'Strike again'; }
      else if(type === 'encounter'){ currentEncounter = obj; currentEncounterRollId = id; encPartySizeSlider.value = obj.partySize; encPartySizeValue.textContent = obj.partySize; encPartyLevelSlider.value = obj.partyLevel; encPartyLevelValue.textContent = obj.partyLevel; switchTab('encounters'); renderEncounterSheet(obj); encSealLabel.textContent = 'Strike again'; }
      else { currentLoot = obj; currentLootRollId = id; lootLevelSlider.value = obj.level; lootLevelValue.textContent = obj.level; switchTab('loot'); renderLootSheet(obj); lootSealLabel.textContent = 'Strike again'; }
    });
    return;
  }
  const delBtn = e.target.closest('[data-delete-roll]');
  if(delBtn){
    const id = delBtn.getAttribute('data-delete-roll');
    fbDb.collection('users').doc(currentUser.uid).collection('savedRolls').doc(id).delete().then(() => renderMyRollsList());
    return;
  }

  const renameBtn = e.target.closest('[data-rename-roll]');
  if(renameBtn){
    const id = renameBtn.getAttribute('data-rename-roll');
    const row = renameBtn.closest('[data-roll-row]');
    const loadBtn = row.querySelector('[data-load-roll]');
    const currentName = loadBtn.getAttribute('data-roll-name');
    row.innerHTML =
      '<input type="text" class="rename-input" value="'+currentName.replace(/"/g,'&quot;')+'" style="flex:1;" data-rename-input="'+id+'">' +
      '<button type="button" class="toolbar-btn" data-confirm-rename="'+id+'">Save</button>' +
      '<button type="button" class="toolbar-btn" data-cancel-rename="1">Cancel</button>';
    const input = row.querySelector('[data-rename-input]');
    input.focus();
    input.select();
    return;
  }

  const confirmBtn = e.target.closest('[data-confirm-rename]');
  if(confirmBtn){
    const id = confirmBtn.getAttribute('data-confirm-rename');
    const input = confirmBtn.closest('[data-roll-row]').querySelector('[data-rename-input]');
    const newName = input.value.trim();
    if(newName){
      fbDb.collection('users').doc(currentUser.uid).collection('savedRolls').doc(id).update({ name: newName }).then(() => renderMyRollsList());
    } else {
      renderMyRollsList();
    }
    return;
  }

  const cancelBtn = e.target.closest('[data-cancel-rename]');
  if(cancelBtn){
    renderMyRollsList();
  }
});

myrollsListContainer.addEventListener('keydown', (e) => {
  const input = e.target.closest('[data-rename-input]');
  if(!input) return;
  if(e.key === 'Enter'){
    const id = input.getAttribute('data-rename-input');
    const newName = input.value.trim();
    if(newName){
      fbDb.collection('users').doc(currentUser.uid).collection('savedRolls').doc(id).update({ name: newName }).then(() => renderMyRollsList());
    } else {
      renderMyRollsList();
    }
  } else if(e.key === 'Escape'){
    renderMyRollsList();
  }
});
