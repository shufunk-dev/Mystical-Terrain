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
const nullMins = [];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('"min": null') || content.includes('"min":null')) {
    nullMins.push(f);
  }
}
console.log('Files with min: null:', nullMins.length);
for (const f of nullMins) console.log(f);
