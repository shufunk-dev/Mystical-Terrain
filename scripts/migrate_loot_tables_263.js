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

let modifiedFiles = 0;
let functionsConverted = 0;
let conditionsConverted = 0;
let uniformConverted = 0;

function transformLoot(obj) {
  if (!obj || typeof obj !== 'object') return false;
  let modified = false;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (transformLoot(item)) modified = true;
    }
    return modified;
  }

  // 1. Rename 'functions' to 'modifier'
  if (obj.functions !== undefined) {
    obj.modifier = obj.functions;
    delete obj.functions;
    modified = true;
    functionsConverted++;
  }

  // 2. In any function/modifier, rename 'function' to 'type'
  if (typeof obj.function === 'string') {
    obj.type = obj.function;
    delete obj.function;
    modified = true;
  }

  // 3. Rename 'conditions' to 'condition'
  if (obj.conditions !== undefined) {
    obj.condition = obj.conditions;
    delete obj.conditions;
    modified = true;
    conditionsConverted++;
  }

  // 4. In any condition object where 'condition' is a string type name
  if (typeof obj.condition === 'string') {
    obj.type = obj.condition;
    delete obj.condition;
    modified = true;
  }

  // 5. Convert typeless {min, max} to {type: 'minecraft:uniform', min, max}
  if (obj.min !== undefined && obj.max !== undefined && obj.type === undefined) {
    obj.type = 'minecraft:uniform';
    if (typeof obj.min === 'number' && typeof obj.max === 'number' && obj.min > obj.max) {
      const t = obj.min;
      obj.min = obj.max;
      obj.max = t;
    }
    modified = true;
    uniformConverted++;
  }

  // Recurse into all children
  for (const key of Object.keys(obj)) {
    if (transformLoot(obj[key])) modified = true;
  }

  return modified;
}

const dir = path.resolve('src/main/resources/data/mysticalterrain/loot_table');
const files = walk(dir);

for (const f of files) {
  try {
    const raw = fs.readFileSync(f, 'utf8');
    const json = JSON.parse(raw);
    if (transformLoot(json)) {
      fs.writeFileSync(f, JSON.stringify(json, null, 2) + '\n', 'utf8');
      modifiedFiles++;
    }
  } catch (err) {
    console.error(`Error processing ${f}:`, err);
  }
}

console.log(`Loot table migration complete!`);
console.log(`Files modified: ${modifiedFiles}`);
console.log(`functions -> modifier: ${functionsConverted}`);
console.log(`conditions -> condition: ${conditionsConverted}`);
console.log(`Uniform min/max converted: ${uniformConverted}`);
