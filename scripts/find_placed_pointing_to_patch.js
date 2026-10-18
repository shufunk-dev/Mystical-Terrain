const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full, fileList);
    else if (full.endsWith('.json')) fileList.push(full);
  }
  return fileList;
}

const files = walk('src/main/resources/data/mysticalterrain/worldgen/placed_feature');
const missing = {
  'minecraft:patch_berry_bush': 'minecraft:berry_bush',
  'minecraft:patch_cactus': 'minecraft:cactus',
  'minecraft:patch_dead_bush': 'minecraft:dead_bush',
  'minecraft:patch_dry_grass': 'minecraft:dry_grass',
  'minecraft:patch_firefly_bush': 'minecraft:firefly_bush',
  'minecraft:patch_leaf_litter': 'minecraft:leaf_litter',
  'minecraft:patch_melon': 'minecraft:melon',
  'minecraft:patch_pumpkin': 'minecraft:pumpkin',
  'minecraft:patch_sugar_cane': 'minecraft:sugar_cane',
  'minecraft:patch_waterlily': 'minecraft:waterlily'
};

const matches = [];
for (const f of files) {
  try {
    const json = JSON.parse(fs.readFileSync(f, 'utf8'));
    if (typeof json.feature === 'string' && missing[json.feature]) {
      matches.push({ file: f, oldFeat: json.feature, newFeat: missing[json.feature] });
    }
  } catch(e) {}
}

console.log('Placed features pointing to missing configured features:', matches.length);
for (const m of matches) {
  console.log(m.file, ':', m.oldFeat, '->', m.newFeat);
}
