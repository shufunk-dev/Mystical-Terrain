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
const lakeFiles = [];
for (const f of files) {
  try {
    const json = JSON.parse(fs.readFileSync(f, 'utf8'));
    function check(obj) {
      if (!obj || typeof obj !== 'object') return;
      if (Array.isArray(obj)) { obj.forEach(check); return; }
      if (obj.type === 'minecraft:lake') {
        lakeFiles.push(f);
      }
      for (const k of Object.keys(obj)) check(obj[k]);
    }
    check(json);
  } catch(e) {}
}

console.log('Total lake files:', lakeFiles.length);
for (const f of lakeFiles) console.log(f);
