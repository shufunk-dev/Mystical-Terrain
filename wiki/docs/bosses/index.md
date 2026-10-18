# The 10 Realm Colossi

Confront 10 colossal, multi-phase world bosses built with animated GeckoLib models, cinematic entry sequences, telegraphed combat spells, and dedicated boss bars.

---

## 🏛️ Overworld Colossi

<BossCard
  name="Archon"
  title="The Ancient Rune Sentinel"
  dimension="Overworld (Ancient Ruins)"
  health="450 HP"
  phases="Phase 1: Kinetic Stomp / Phase 2: Arcane Barrage / Phase 3: Rune Overload"
  catalyst="Archon Focus"
  catalystTexture="/textures/item/archon_focus.png"
  :drops="['Sigil Hammer', 'Runeblade', 'Runeplate Ingot', 'Archon Essence']"
  description="A monolithic stone golem inscribed with ancient glowing runes. Archon channels raw kinetic shockwaves through the earth and summons orbiting rune shields."
/>

<BossCard
  name="Grothmaw"
  title="The Primal Jungle Leviathan"
  dimension="Overworld (Dense Jungle)"
  health="500 HP"
  phases="Phase 1: Trample Charge / Phase 2: Pack Call / Phase 3: Frenzied Roar"
  catalyst="Primal Egg"
  catalystTexture="/textures/item/primal_egg.png"
  :drops="['Tyrants Fang', 'Tyrant Hide', 'Fossil Greataxe', 'Primal Core']"
  description="An apex prehistoric beast slumbering deep within the ancient jungle floor. Commands razor raptor packs and unleashes devastating ground-slam charges."
/>

<BossCard
  name="Hrimthane"
  title="The Frozen Warlord"
  dimension="Overworld (Titan Peaks)"
  health="480 HP"
  phases="Phase 1: Glacial Cleave / Phase 2: Howling Blizzard / Phase 3: Frost Bell Resonance"
  catalyst="Frost Bell"
  catalystTexture="/textures/block/frost_bell.png"
  :drops="['Rimebreaker Axe', 'Glacial Lance', 'Icicle Repeater', 'Frozen Heart']"
  description="A towering frost giant clad in rimestone plate. Rings resonant frost bells across the peaks that freeze players in place and call down avalanches."
/>

<BossCard
  name="Lirael"
  title="The Blooming Seraph"
  dimension="Overworld (Blossom Vale)"
  health="420 HP"
  phases="Phase 1: Petal Volley / Phase 2: Thorn Briars / Phase 3: Solar Bloom Beam"
  catalyst="Thorn Queen Scepter"
  catalystTexture="/textures/item/thornqueen_scepter.png"
  :drops="['Petalstorm Fan', 'Briar Rapier', 'Thorn Regalia', 'Seraphic Blossom']"
  description="A radiant winged seraph ruling over sacred floral meadows. Casts vortexes of razor cherry petals and entangles intruders in venomous briar roots."
/>

<BossCard
  name="Sekhmar"
  title="The Desert Pharaoh"
  dimension="Overworld (Desert Necropolis)"
  health="460 HP"
  phases="Phase 1: Sand Whip / Phase 2: Canopic Curse / Phase 3: Solar Eclipse Judgment"
  catalyst="Canopic Jars"
  catalystTexture="/textures/item/jackal_canopic_jar.png"
  :drops="['Pharaohs Khopesh', 'Scarab Flail', 'Crook of Sekhmar', 'Sunstone Core']"
  description="Awakened from subterranean desert pyramids, Sekhmar manipulates sand currents, summons ancient mummies, and channels divine solar wrath."
/>

<BossCard
  name="Bogrot"
  title="The Murk Colossus"
  dimension="Overworld (Sunken Mires)"
  health="440 HP"
  phases="Phase 1: Mud Sludge / Phase 2: Noxious Geyser / Phase 3: Submerged Ambush"
  catalyst="Drowned Idol"
  catalystTexture="/textures/item/drowned_idol.png"
  :drops="['Bogspitter', 'Leechblade', 'Mireroot Armor', 'Bog Mire Pearl']"
  description="A lumbering swamp monstrosity made of rotten roots and mire mud. Lurks beneath stagnant bog water and pulls players into toxic mud traps."
/>

<BossCard
  name="Hollow Warden"
  title="The Umbral Terror"
  dimension="Overworld (Deep Caverns)"
  health="520 HP"
  phases="Phase 1: Shadowstep Ambush / Phase 2: Sonic Wail / Phase 3: Void Eruption"
  catalyst="Eye of the Void"
  catalystTexture="/textures/item/eye_of_the_void.png"
  :drops="['Shadowstep Dagger', 'Lantern of Souls', 'Hollow Shroud', 'Umbral Core']"
  description="A terrifying phantom entity prowling the deepest underground chasms. Teleports through darkness and blinds targets with deafening shrieks."
/>

---

## 🔥 Nether & Void Colossi

<BossCard
  name="Pyraxis"
  title="The Infernal Sovereign"
  dimension="The Nether (Ember Wastes)"
  health="550 HP"
  phases="Phase 1: Magma Wave / Phase 2: Cinder Barrage / Phase 3: Supernova Core"
  catalyst="Cinder Heart"
  catalystTexture="/textures/item/cinder_heart.png"
  :drops="['Emberlord Maul', 'Magmaheart Staff', 'Cinderfang', 'Infernal Plate']"
  description="The molten overlord residing in the subterranean magma chambers of the Nether. Summons waves of liquid fire and raining volcanic meteors."
/>

<BossCard
  name="Mycelord"
  title="The Fungal Spore Patriarch"
  dimension="Subterranean / Nether (Fungal Depths)"
  health="460 HP"
  phases="Phase 1: Spore Burst / Phase 2: Mycelial Tendrils / Phase 3: Fungal Frenzy"
  catalyst="Spore Heart"
  catalystTexture="/textures/item/spore_heart.png"
  :drops="['Sporeblade', 'Sporecaster', 'Mycelial Maul', 'Fungal Carapace']"
  description="A hivemind fungal monstrosity connected to the root system of all cavern mushrooms. Emits spore clouds that reverse healing and cause hallucination."
/>

<BossCard
  name="Astrael"
  title="The Starlit Emissary"
  dimension="The End (Astral Spires)"
  health="600 HP"
  phases="Phase 1: Cosmic Lance / Phase 2: Starlight Ring / Phase 3: Supernova Convergence"
  catalyst="Starlight Vial"
  catalystTexture="/textures/item/starlight_vial.png"
  :drops="['Nova Greatsword', 'Halo Chakram', 'Starspear', 'Celestial Aegis']"
  description="The guardian of the celestial void islands in The End. Wields raw starlight energy and warps gravitational fields to pull challengers into the abyss."
/>
