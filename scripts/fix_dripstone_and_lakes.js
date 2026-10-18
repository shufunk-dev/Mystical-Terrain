const fs = require('fs');
const path = require('path');

// 1. Fix pointed_dripstone.json
const dripstonePath = path.resolve('src/main/resources/data/mysticalterrain/worldgen/placed_feature/heartland/sparse/pointed_dripstone.json');
const dripJson = JSON.parse(fs.readFileSync(dripstonePath, 'utf8'));
for (const p of dripJson.placement) {
  if (p.type === 'minecraft:offset') {
    p.x = {
      type: "minecraft:clamped_normal",
      deviation: 3,
      max_inclusive: 10,
      mean: 0,
      min_inclusive: -10
    };
    p.y = {
      type: "minecraft:clamped_normal",
      deviation: 0.6,
      max_inclusive: 2,
      mean: 0,
      min_inclusive: -2
    };
    p.z = {
      type: "minecraft:clamped_normal",
      deviation: 3,
      max_inclusive: 10,
      mean: 0,
      min_inclusive: -10
    };
  }
}
fs.writeFileSync(dripstonePath, JSON.stringify(dripJson, null, 2) + '\n', 'utf8');
console.log('Fixed pointed_dripstone.json');

// 2. Fix the 4 lake files
const lakeFiles = [
  'src/main/resources/data/mysticalterrain/worldgen/placed_feature/heartland/marshy/cave_pools_clay.json',
  'src/main/resources/data/mysticalterrain/worldgen/placed_feature/heartland/marshy/cave_pools_stone.json',
  'src/main/resources/data/mysticalterrain/worldgen/placed_feature/heartland/marshy/ponds_mud.json',
  'src/main/resources/data/mysticalterrain/worldgen/placed_feature/heartland/marshy/ponds_sand.json'
];

for (const lf of lakeFiles) {
  const full = path.resolve(lf);
  const json = JSON.parse(fs.readFileSync(full, 'utf8'));
  if (json.feature && json.feature.type === 'minecraft:lake') {
    json.feature.can_place_feature = {
      type: "minecraft:true"
    };
    json.feature.can_replace_with_air_or_fluid = {
      type: "minecraft:not",
      predicate: {
        type: "minecraft:matching_block_tag",
        tag: "minecraft:features_cannot_replace"
      }
    };
    json.feature.can_replace_with_barrier = {
      type: "minecraft:not",
      predicate: {
        type: "minecraft:matching_block_tag",
        tag: "minecraft:features_cannot_replace"
      }
    };
    fs.writeFileSync(full, JSON.stringify(json, null, 2) + '\n', 'utf8');
    console.log('Fixed lake in:', lf);
  }
}
