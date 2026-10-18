const fs = require('fs');
const path = require('path');

const lootDir = path.join(__dirname, '../src/main/resources/data/mysticalterrain/loot_table');

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
    if (Array.isArray(obj)) return obj.map(transform);

    const res = {};
    for (const [k, v] of Object.entries(obj)) {
        res[k] = transform(v);
    }

    if (res.type === 'minecraft:block_state_property') {
        const blocks = res.blocks || res.block;
        const state = res.state || res.properties;
        const newObj = {
            type: 'minecraft:match_block',
            blocks: blocks,
            state: state
        };
        return newObj;
    }

    return res;
}

let modified = 0;
for (const file of getFiles(lootDir)) {
    const raw = fs.readFileSync(file, 'utf8');
    if (raw.includes('minecraft:block_state_property')) {
        const data = JSON.parse(raw);
        const transformed = transform(data);
        fs.writeFileSync(file, JSON.stringify(transformed, null, 2), 'utf8');
        modified++;
    }
}

console.log(`Migrated block_state_property to match_block in ${modified} files.`);
