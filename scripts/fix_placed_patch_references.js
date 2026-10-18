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

let count = 0;
for (const f of files) {
  try {
    const raw = fs.readFileSync(f, 'utf8');
    const json = JSON.parse(raw);
    if (typeof json.feature === 'string' && missing[json.feature]) {
      const oldVal = json.feature;
      json.feature = missing[oldVal];
      fs.writeFileSync(f, JSON.stringify(json, null, 2) + '\n', 'utf8');
      console.log(`Updated ${f}: ${oldVal} -> ${json.feature}`);
      count++;
    }
  } catch(e) {}
}

console.log(`Updated ${count} files.`);
