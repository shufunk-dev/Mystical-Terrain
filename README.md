# Mystical Terrain (Community Patch Edition)

[![Release](https://img.shields.io/badge/Version-v1.0.9--(Unofficial)--Patch-purple.svg)](README.md)
[![Minecraft 1.21.2+](https://img.shields.io/badge/Minecraft-1.21.2%20--%201.21.11-brightgreen.svg)](https://fabricmc.net/)
[![Fabric Loader](https://img.shields.io/badge/Fabric-0.16.0+-blue.svg)](https://fabricmc.net/)
[![GeckoLib](https://img.shields.io/badge/GeckoLib-5.4.5+-orange.svg)](https://geckolib.com/)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg)](LICENSE)

A standalone, community-maintained, and heavily patched edition of the legendary Minecraft mod **Mystical Terrain**, originally conceived and developed by **Vexira**.

This repository serves as the unofficial **v1.0.9** patch release, succeeding the latest official CurseForge release (v1.0.8, Sept 30, 2026). It captures all modern assets, worldgen structures, and combat mechanics missing from outdated upstream source trees while resolving critical crashes, dedicated server mixin leaks, and 1.21.2+ / 1.21.11 Fabric syntax requirements.

---

## 🌟 Core Features

### 🌲 Majestic World Generation & Flora
- **Space-Colonization Procedural Trees**: Colossal trees, world trees, elder trees, and sprawling canopies generated with mathematical space-colonization algorithms.
- **Formations & Landscape Anomalies**: Monolithic spires, hollow boulders, layered rock shelves, and grand terrain formations.
- **Over 1,600 Distinct Biomes**: Spanning across the Overworld, Nether, and The End with customized vegetation, ambient particles, and atmospheric lighting.
- **Data-Driven TerraBlender Integration**: Native support for TerraBlender surface rules, biome regions, and placement parameters.

### ⚔️ Realm Colossi & Boss Fights
Confront 10 colossal bosses with multi-phase mechanics, telegraphed combat telegraphs, custom soundscapes, and GeckoLib animations:
- **Archon**: The Ancient Rune Sentinel of arcane stone and kinetic shockwaves.
- **Astrael**: The Starlit Emissary guarding the high End islands with cosmic smites.
- **Bogrot**: The Murk Colossus lurking in noxious swamps and sunken mires.
- **Grothmaw**: The Primal Jungle Leviathan commanding ferocious beast packs.
- **Hollow Warden**: The Umbral Terror awakened from the deep dark caverns.
- **Hrimthane**: The Frozen Warlord of glacial peaks, blizzard gusts, and frost bells.
- **Lirael**: The Blooming Seraph reigning over floral sanctuaries and cherry meadows.
- **Mycelord**: The Fungal Spore Patriarch emitting debilitating spores and restorative blooms.
- **Pyraxis**: The Infernal Sovereign ruling over the Nether's scorched badlands and lava lakes.
- **Sekhmar**: The Desert Pharaoh and master of suffocating sandstorms and ancient curses.

### 🐉 Reworked Void Dragon Encounter
- Complete mechanical and visual overhaul of the vanilla Ender Dragon fight into the **Void Dragon**.
- Dynamic flight pathing, aerial strafing, ground sitting phases, and breath trails.
- Built-in GeckoLib entity renderer replacing legacy cuboid models with animated dragon geometry.
- Authentic Void Pedestal summoning ritual requiring Void Eyes without interfering with vanilla End crystal respawn loops.

### 🛡️ Mystic Arsenals & Gear Mechanics
- **Unique Weapon Archetypes**: Greatswords, scythes, staves, bows, and arcane focuses.
- **Active & Set Abilities**: Right-click abilities, charge states, cooldown tracking, and combo finishers.
- **Custom HUD Overlays**: Real-time ability timers, charge bars, and animated multi-phase boss health displays.

---

## 🛠️ Key Patches & Bug Fixes in this Edition

1. **Dragon Fight & Phase Stability**:
   - `DragonLandingPhaseMixin` & `DragonStrafePlayerPhaseMixin`: Fixed target cast exceptions, null pointer checks during landing/strafing, and corrected Yarn method mappings (`launchLivingEntities`).
   - `EndDragonFightAccessor` & `EndDragonFightInvoker`: Clean accessors for fight origin, portal locations, and crystal count updates.
   - `EnderDragonRendererInvoker` & `DragonGeoRenderer`: Fixed client rendering layer setup, death ray rendering pipelines, and model texture lookups.
   - `DragonRitual` & `DragonRework`: Resolved sound NPE on void pedestals, added in-chat ritual progression messages, and ensured clean eye detection.

2. **Boss Rituals, Invocations & Cleanup**:
   - `RitualAltarBlock` & `RitualAltarBlockEntity`: Fixed altar state synchronization, item consumption, relaxed moon phase restrictions, and added status hints on altar right-click.
   - `GloomBrazierBlock` & `RunePillarBlock`: Expanded detection radius and added support for torches and candles.
   - `FrostBellBlock`: Resolved blockstate property equality and bell resonance tuning.
   - `ItemEntityMixin`: Properly mapped entity tick injection to allow item-drop summoning rituals (Pyraxis, Bogrot) to trigger reliably.
   - **Entity Cleanup Integration**: Full `/boss despawn` and `/boss reset` support to cleanly discard active or test bosses without leaving phantom markers.

3. **Modern Minecraft 1.21.2+ Standards**:
   - **Strict Recipe Syntax**: All crafting recipes updated to modern 1.21.2+ format (direct strings for ingredient keys, `{ "id": ..., "count": ... }` for results).
   - **Server / Client Mixin Isolation**: Complete separation between common (`mysticalterrain.mixins.json`) and dedicated client mixins (`mysticalterrain.client.mixins.json`), preventing dedicated server crashes.
   - **Clean Dimension Spawning**: Realm minions naturally spawn across intended vanilla dimensions (Overworld, Nether, and The End) without external pack dependencies.

---

## ⌨️ Commands

| Command | Permission | Description |
|---|---|---|
| `/boss despawn` | All / OP | Safely dismiss all active Mystical Terrain bosses in the dimension. |
| `/boss reset` | All / OP | Alias for despawn; resets any active encounters. |
| `/mysticalterrain summon <boss>` | OP (Level 2) | Summons the designated Colossus with full entrance cinematic. |
| `/mysticalterrain lair <boss>` | OP (Level 2) | Places the boss lair structure at the current position. |
| `/mysticalterrain phase <0-9>` | OP (Level 2) | Manually shifts the nearest boss into a specific combat phase. |
| `/mysticalterrain cast <move>` | OP (Level 2) | Forces the nearest boss to execute a specific move or spell. |
| `/mysticalterrain skipintro` | OP (Level 2) | Skips the current boss's entrance cinematic animation. |
| `/mysticalterrain debug` | OP (Level 2) | Dumps real-time AI context, threat table, and boss state to chat. |

---

## 🏗️ Building from Source

### Prerequisites
- **JDK 21** or newer (Eclipse Temurin, Microsoft JDK, or OpenJDK).
- Modern Fabric-compatible launcher or development environment.

### Compile & Build JAR
```bash
./gradlew.bat build
```
The compiled, remapped JAR will be generated in `build/libs/mysticalterrain-<version>.jar`.

### Run Development Client
```bash
./gradlew.bat runClient
```

---

## 📜 License & Attribution

- **Original Mod Creator**: **Vexira** — Designer and creator of Mystical Terrain, its bosses, models, world generation features, and core mechanics.
- **Community Maintainers & Contributors**: Bug fixes, Minecraft 1.21.2+ modernization, mixin remappings, ritual stability improvements, and standalone packaging.
- **License**: Dedicated to the public domain under [CC0-1.0](LICENSE). This repository was established to provide an open, accessible codebase and community patches for anyone to freely build upon, modify, and redistribute.
- **Dependencies**: Built on [Fabric Loader & Fabric API](https://fabricmc.net/) and [GeckoLib 5](https://geckolib.com/).
