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
const issues = [];
for (const f of files) {
  try {
    const json = JSON.parse(fs.readFileSync(f, 'utf8'));
    function check(obj) {
      if (!obj || typeof obj !== 'object') return;
      if (Array.isArray(obj)) { obj.forEach(check); return; }
      if (obj.type === 'minecraft:trapezoid') {
        if (typeof obj.min !== 'number' || typeof obj.max !== 'number') {
          issues.push({ file: f, obj });
        }
      }
      if (obj.type === 'minecraft:uniform') {
        if (obj.min_inclusive !== undefined && obj.max_inclusive !== undefined) {
          // ok
        } else if (obj.min !== undefined && obj.max !== undefined) {
          // ok
        } else {
          issues.push({ file: f, obj });
        }
      }
      for (const k of Object.keys(obj)) check(obj[k]);
    }
    check(json);
  } catch(e) {}
}

console.log('Total distribution issues:', issues.length);
for (const i of issues) console.log(i.file, JSON.stringify(i.obj));
