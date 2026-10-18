# Commands & In-Game Cheatsheet

Mystical Terrain provides comprehensive administrator and debug commands to control boss states, test lair structures, and safely clean up entities.

## 👑 Boss Encounter Controls

| Command | Permission | Description |
|---|---|---|
| `/boss despawn` | All / OP | Safely removes all active Mystical Terrain bosses in the dimension without drop penalties. |
| `/boss reset` | All / OP | Cleanses any pending boss arenas, ritual markers, and resets encounters. |
| `/mysticalterrain summon <boss>` | OP (Level 2) | Spawns the specified boss with intro cinematic camera and fanfare. |
| `/mysticalterrain lair <boss>` | OP (Level 2) | Spawns the lair multiblock structure for the designated boss at your feet. |
| `/mysticalterrain phase <0-9>` | OP (Level 2) | Manually advances or rewinds the targeted boss's active combat phase. |
| `/mysticalterrain cast <move>` | OP (Level 2) | Forces the targeted boss to immediately trigger a specific spell or attack. |
| `/mysticalterrain skipintro` | OP (Level 2) | Skips any currently playing boss intro sequence. |
| `/mysticalterrain debug` | OP (Level 2) | Outputs live threat tables, pathfinder nodes, and AI state into chat. |

## 🧪 Valid Boss Identifiers

When running `/mysticalterrain summon <boss>`, use one of the following registered IDs:

- `archon`
- `astrael`
- `bogrot`
- `grothmaw`
- `hollow_warden`
- `hrimthane`
- `lirael`
- `mycelord`
- `pyraxis`
- `sekhmar`
- `void_dragon`
