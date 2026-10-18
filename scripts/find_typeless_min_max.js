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
const typeless = [];

for (const f of files) {
  try {
    const json = JSON.parse(fs.readFileSync(f, 'utf8'));
    function check(obj, path = '') {
      if (!obj || typeof obj !== 'object') return;
      if (Array.isArray(obj)) {
        obj.forEach((item, idx) => check(item, `${path}[${idx}]`));
        return;
      }
      if (obj.min !== undefined && obj.max !== undefined && obj.type === undefined) {
        typeless.push({ file: f, path, obj });
      }
      for (const k of Object.keys(obj)) {
        check(obj[k], `${path}.${k}`);
      }
    }
    check(json);
  } catch(e) {}
}

console.log('Total typeless min/max objects:', typeless.length);
const filesSet = new Set(typeless.map(t => t.file));
console.log('Across files:', filesSet.size);
for (const t of typeless.slice(0, 15)) {
  console.log(t.file, t.path, JSON.stringify(t.obj));
}
