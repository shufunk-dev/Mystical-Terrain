# Ritual Altar Multiblock Setup

In Mystical Terrain, awakening ancient Colossi requires sanctifying an arena and activating a **Ritual Altar**. Altars are dynamic multiblocks that scan surrounding fixtures (Braziers, Rune Pillars, and Bells) before initiating the invocation.

---

## 🏛️ Altar Core & In-Game Feedback

When a player interacts with a Ritual Altar core:
- **Visual Particles**: The altar emits ascension particles scaled to the active ritual stage (`STAGE` 0 through 3).
- **Status Guidance**: If required peripheral fixtures are unlit or uncharged, the altar displays real-time chat guidance (e.g., *"3/6 Gloom Braziers lit"* or *"2/5 Rune Pillars charged"*).
- **In-Chat Cue**: When all requirements are met, the altar broadcasts an activation chant and triggers the boss entrance animation.

---

## 🕯️ Fixtures & Multiblock Components

### 1. Gloom Braziers (Hollow Warden Ritual)
- **Requirement**: **6 Gloom Braziers** arranged circularly within an 8-block radius of the Altar.
- **Activation**: Ignite each brazier using Flint and Steel, Fire Charge, or Fire Aspect weaponry.
- **Detection**: Once all 6 burn simultaneously with umbral fire, the Hollow Warden awakens from the deep dark caverns.

### 2. Rune Pillars (Archon Ritual)
- **Requirement**: **5 Rune Pillars** erected atop ancient Runestone platforms.
- **Activation**: Right-click each pillar with **Lapis Lazuli** to charge the embedded runes with arcane resonance.
- **Detection**: Once all 5 pillars are fully charged, the central Altar absorbs the energy, causing Archon to assemble from subterranean bedrock.

### 3. Frost Bells (Hrimthane Ritual)
- **Requirement**: **3 Resonant Frost Bells** hung from Rimestone archways.
- **Activation**: Strike the bells sequentially with heavy pickaxes or bludgeons to generate harmonic frost dissonance.
- **Detection**: Triggers a localized blizzard and calls down Hrimthane from the glacier peaks.

---

## 🌊 Item-Drop Summoning Rituals

Certain primal titans do not use static stone altars, but rather respond to item offerings sacrificed into natural environmental hazards:

| Boss | Catalyst Offering | Environmental Medium | Summoning Event |
|---|---|---|---|
| **Pyraxis** | **Cinder Heart** | Dropped into a deep lava pool in the Ember Wastes | Lava erupts upward and Pyraxis rises |
| **Bogrot** | **Drowned Idol** | Sacrificed into stagnant mud/water in Sunken Mires | Mud bubbling vortex draws in the idol |
