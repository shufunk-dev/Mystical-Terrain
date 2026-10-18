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

let treeUpdated = 0;
let sculkUpdated = 0;

function transformNode(node) {
  if (!node || typeof node !== 'object') return false;
  let modified = false;

  if (Array.isArray(node)) {
    for (const item of node) {
      if (transformNode(item)) modified = true;
    }
    return modified;
  }

  // Handle tree
  if (node.type === 'minecraft:tree') {
    if (node.dirt_provider) {
      const dp = node.dirt_provider;
      if (dp.state && dp.state.id === 'minecraft:dirt') {
        node.below_trunk_provider = 'minecraft:soil_beneath_tree';
      } else if (dp.state && dp.state.id) {
        node.below_trunk_provider = { id: dp.state.id };
        if (dp.state.properties) {
          node.below_trunk_provider.properties = dp.state.properties;
        }
      } else if (typeof dp === 'string') {
        node.below_trunk_provider = dp;
      } else {
        node.below_trunk_provider = 'minecraft:soil_beneath_tree';
      }
      delete node.dirt_provider;
      modified = true;
      treeUpdated++;
    } else if (!node.below_trunk_provider) {
      node.below_trunk_provider = 'minecraft:soil_beneath_tree';
      modified = true;
      treeUpdated++;
    }

    if (node.force_dirt !== undefined) {
      delete node.force_dirt;
      modified = true;
    }
  }

  // Handle sculk_patch
  if (node.type === 'minecraft:sculk_patch') {
    if (node.catalyst_chance !== undefined) {
      delete node.catalyst_chance;
      modified = true;
      sculkUpdated++;
    }
    if (node.extra_rare_growths !== undefined) {
      delete node.extra_rare_growths;
      modified = true;
    }
  }

  for (const key of Object.keys(node)) {
    if (transformNode(node[key])) modified = true;
  }

  return modified;
}

const baseDir = path.resolve('src/main/resources/data/mysticalterrain');
const allFiles = walk(baseDir);

let filesModified = 0;
for (const file of allFiles) {
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(raw);
    if (transformNode(json)) {
      fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8');
      filesModified++;
    }
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
  }
}

console.log(`Migration complete!`);
console.log(`Files modified: ${filesModified}`);
console.log(`Trees updated: ${treeUpdated}`);
console.log(`Sculk patches updated: ${sculkUpdated}`);
