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

const files = walk('src/main/resources/data/mysticalterrain');
const missing = [
  'patch_berry_bush',
  'patch_cactus',
  'patch_dead_bush',
  'patch_dry_grass',
  'patch_firefly_bush',
  'patch_leaf_litter',
  'patch_melon',
  'patch_pumpkin',
  'patch_sugar_cane',
  'patch_waterlily'
];

const found = {};
for (const m of missing) found[m] = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  for (const m of missing) {
    if (content.includes('minecraft:' + m)) {
      found[m].push(f);
    }
  }
}

for (const m of missing) {
  console.log(`=== minecraft:${m} (${found[m].length} files) ===`);
  for (const f of found[m].slice(0, 5)) {
    console.log('  ', f);
  }
}
