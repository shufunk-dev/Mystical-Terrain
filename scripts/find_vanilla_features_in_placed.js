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
const vanillaFeatures = new Set();
for (const f of files) {
  try {
    const json = JSON.parse(fs.readFileSync(f, 'utf8'));
    if (typeof json.feature === 'string' && json.feature.startsWith('minecraft:')) {
      vanillaFeatures.add(json.feature);
    }
  } catch(e) {}
}

console.log('Vanilla configured features referenced in placed_feature:');
for (const vf of Array.from(vanillaFeatures).sort()) {
  console.log(vf);
}
