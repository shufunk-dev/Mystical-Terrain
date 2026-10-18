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

let swappedCount = 0;

function fixNode(node) {
  if (!node || typeof node !== 'object') return false;
  let modified = false;

  if (Array.isArray(node)) {
    for (const item of node) {
      if (fixNode(item)) modified = true;
    }
    return modified;
  }

  // Check min vs max
  if (typeof node.min === 'number' && typeof node.max === 'number') {
    if (node.min > node.max) {
      const temp = node.min;
      node.min = node.max;
      node.max = temp;
      swappedCount++;
      modified = true;
    }
  }

  // Check min_inclusive vs max_inclusive (numbers)
  if (typeof node.min_inclusive === 'number' && typeof node.max_inclusive === 'number') {
    if (node.min_inclusive > node.max_inclusive) {
      const temp = node.min_inclusive;
      node.min_inclusive = node.max_inclusive;
      node.max_inclusive = temp;
      swappedCount++;
      modified = true;
    }
  }

  // Check min_inclusive vs max_inclusive ({ absolute: number })
  if (
    node.min_inclusive && typeof node.min_inclusive.absolute === 'number' &&
    node.max_inclusive && typeof node.max_inclusive.absolute === 'number'
  ) {
    if (node.min_inclusive.absolute > node.max_inclusive.absolute) {
      const temp = node.min_inclusive;
      node.min_inclusive = node.max_inclusive;
      node.max_inclusive = temp;
      swappedCount++;
      modified = true;
    }
  }

  for (const key of Object.keys(node)) {
    if (fixNode(node[key])) modified = true;
  }

  return modified;
}

const baseDir = path.resolve('src/main/resources/data/mysticalterrain');
const allFiles = walk(baseDir);

let filesFixed = 0;
for (const file of allFiles) {
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(raw);
    if (fixNode(json)) {
      fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8');
      filesFixed++;
    }
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
  }
}

console.log(`Fix complete!`);
console.log(`Files fixed: ${filesFixed}`);
console.log(`Ranges swapped: ${swappedCount}`);
