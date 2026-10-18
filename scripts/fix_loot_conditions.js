const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../src/main/resources/data/mysticalterrain/loot_table');

function getFiles(dir) {
    let results = [];
    for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            results = results.concat(getFiles(full));
        } else if (f.endsWith('.json')) {
            results.push(full);
        }
    }
    return results;
}

function transform(obj) {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => transform(item));
    }

    const res = {};
    for (const [k, v] of Object.entries(obj)) {
        res[k] = transform(v);
    }

    if (res.condition) {
        if (Array.isArray(res.condition)) {
            if (res.condition.length === 0) {
                delete res.condition;
            } else if (res.condition.length === 1) {
                res.condition = res.condition[0];
            } else {
                res.condition = {
                    type: "minecraft:all_of",
                    terms: res.condition
                };
            }
        }
    }

    return res;
}

let modifiedFiles = 0;
for (const file of getFiles(rootDir)) {
    const raw = fs.readFileSync(file, 'utf8');
    const data = JSON.parse(raw);
    const updated = transform(data);
    const updatedRaw = JSON.stringify(updated, null, 2);
    if (raw !== updatedRaw) {
        fs.writeFileSync(file, updatedRaw, 'utf8');
        modifiedFiles++;
    }
}

console.log(`Transformed condition in ${modifiedFiles} files.`);
