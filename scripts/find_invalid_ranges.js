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
const matches = [];

for (const f of files) {
  try {
    const json = JSON.parse(fs.readFileSync(f, 'utf8'));
    function check(obj) {
      if (!obj || typeof obj !== 'object') return;
      if (Array.isArray(obj)) { obj.forEach(check); return; }
      if (typeof obj.min === 'number' && typeof obj.max === 'number' && obj.min > obj.max) {
        matches.push({ file: f, obj });
      }
      if (typeof obj.min_inclusive === 'number' && typeof obj.max_inclusive === 'number' && obj.min_inclusive > obj.max_inclusive) {
        matches.push({ file: f, obj });
      }
      for (const k of Object.keys(obj)) check(obj[k]);
    }
    check(json);
  } catch(e) {}
}

console.log('Total objects with min > max:', matches.length);
for (const m of matches) {
  console.log(m.file, JSON.stringify(m.obj));
}
