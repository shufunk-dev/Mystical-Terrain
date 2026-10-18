import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../../');
const langFile = path.join(projectRoot, 'src/main/resources/assets/mysticalterrain/lang/en_us.json');
const gradlePropsFile = path.join(projectRoot, 'gradle.properties');
const recipesDir = path.join(projectRoot, 'src/main/resources/data/mysticalterrain/recipe');

const docsDir = path.resolve(__dirname, '../docs');
const dataDir = path.join(docsDir, '.vitepress/data');
const publicDataDir = path.join(docsDir, 'public/data');
const publicTexturesDir = path.join(docsDir, 'public/textures');

fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(publicDataDir, { recursive: true });

console.log('🔄 [Sync Data] Parsing lang, properties, and recipes...');

// 1. Parse gradle.properties
const gradleProps = {};
if (fs.existsSync(gradlePropsFile)) {
  const content = fs.readFileSync(gradlePropsFile, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key && rest.length > 0) {
      gradleProps[key.trim()] = rest.join('=').trim();
    }
  }
}

// 2. Parse lang/en_us.json
let langData = {};
if (fs.existsSync(langFile)) {
  try {
    langData = JSON.parse(fs.readFileSync(langFile, 'utf8'));
    console.log(`📖 [Sync Data] Loaded ${Object.keys(langData).length} translations from en_us.json`);
  } catch (err) {
    console.error('❌ Failed to parse en_us.json:', err.message);
  }
}

// Helper to format title case
function toTitleCase(str) {
  return str
    .replace(/^#/, '')
    .split(/[:_]/)
    .pop()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Helper to resolve display name
function resolveName(id) {
  if (!id) return '';
  if (id.startsWith('#')) {
    const rawTag = id.slice(1);
    const tagKey = `tag.item.${rawTag.replace(':', '.')}`;
    return langData[tagKey] || `Any ${toTitleCase(rawTag)}`;
  }

  const [namespace, pathName] = id.includes(':') ? id.split(':') : ['minecraft', id];

  if (namespace === 'mysticalterrain') {
    return (
      langData[`item.mysticalterrain.${pathName}`] ||
      langData[`block.mysticalterrain.${pathName}`] ||
      langData[`entity.mysticalterrain.${pathName}`] ||
      toTitleCase(pathName)
    );
  }

  return toTitleCase(pathName);
}

// Helper to resolve texture URL
function resolveTexture(id) {
  if (!id || id.startsWith('#')) return '/textures/item/default.png';
  const [namespace, pathName] = id.includes(':') ? id.split(':') : ['minecraft', id];

  if (namespace === 'mysticalterrain') {
    if (fs.existsSync(path.join(publicTexturesDir, 'item', `${pathName}.png`))) {
      return `/textures/item/${pathName}.png`;
    }
    if (fs.existsSync(path.join(publicTexturesDir, 'block', `${pathName}.png`))) {
      return `/textures/block/${pathName}.png`;
    }
    return `/textures/item/${pathName}.png`;
  }

  // Vanilla item or block
  if (fs.existsSync(path.join(publicTexturesDir, 'minecraft/item', `${pathName}.png`))) {
    return `/textures/minecraft/item/${pathName}.png`;
  }
  if (fs.existsSync(path.join(publicTexturesDir, 'minecraft/block', `${pathName}.png`))) {
    return `/textures/minecraft/block/${pathName}.png`;
  }

  return `/textures/minecraft/item/${pathName}.png`;
}

// 3. Parse recipe JSONs
const recipes = [];
const recipesById = {};

if (fs.existsSync(recipesDir)) {
  const files = fs.readdirSync(recipesDir);
  for (const f of files) {
    if (!f.endsWith('.json')) continue;
    const recipeId = f.replace('.json', '');
    try {
      const raw = JSON.parse(fs.readFileSync(path.join(recipesDir, f), 'utf8'));
      const type = raw.type;

      let resultId = '';
      let resultCount = 1;
      if (typeof raw.result === 'string') {
        resultId = raw.result;
      } else if (raw.result && typeof raw.result === 'object') {
        resultId = raw.result.id;
        resultCount = raw.result.count || 1;
      }

      const recipe = {
        id: recipeId,
        type,
        category: raw.category || 'misc',
        group: raw.group || '',
        result: {
          id: resultId,
          count: resultCount,
          name: resolveName(resultId),
          texture: resolveTexture(resultId)
        }
      };

      if (type === 'minecraft:crafting_shaped') {
        // Build 3x3 grid
        const pattern = raw.pattern || [];
        const keyMap = raw.key || {};
        const grid = Array(9).fill(null);

        // Normalize pattern up to 3x3
        for (let row = 0; row < pattern.length && row < 3; row++) {
          const rowStr = pattern[row];
          for (let col = 0; col < rowStr.length && col < 3; col++) {
            const char = rowStr[col];
            if (char && char !== ' ' && keyMap[char]) {
              const rawKey = keyMap[char];
              let itemId = typeof rawKey === 'string' ? rawKey : rawKey.item || rawKey.tag || '';
              if (rawKey.tag && !itemId.startsWith('#')) {
                itemId = `#${itemId}`;
              }
              const slotIdx = row * 3 + col;
              grid[slotIdx] = {
                id: itemId,
                name: resolveName(itemId),
                texture: resolveTexture(itemId)
              };
            }
          }
        }
        recipe.grid = grid;
      } else if (type === 'minecraft:crafting_shapeless') {
        const ingredients = (raw.ingredients || []).map((ing) => {
          let itemId = '';
          if (typeof ing === 'string') {
            itemId = ing;
          } else if (ing && typeof ing === 'object') {
            itemId = ing.item || (ing.tag ? `#${ing.tag}` : '');
          }
          return {
            id: itemId,
            name: resolveName(itemId),
            texture: resolveTexture(itemId)
          };
        });
        recipe.ingredients = ingredients;
      } else if (type === 'minecraft:stonecutting') {
        const ingredientRaw = raw.ingredient;
        let ingId = '';
        if (typeof ingredientRaw === 'string') {
          ingId = ingredientRaw;
        } else if (ingredientRaw && typeof ingredientRaw === 'object') {
          ingId = ingredientRaw.item || (ingredientRaw.tag ? `#${ingredientRaw.tag}` : '');
        }
        recipe.ingredient = {
          id: ingId,
          name: resolveName(ingId),
          texture: resolveTexture(ingId)
        };
      }

      recipes.push(recipe);
      recipesById[recipeId] = recipe;
      if (resultId) {
        const cleanResult = resultId.replace('mysticalterrain:', '');
        if (!recipesById[cleanResult]) {
          recipesById[cleanResult] = recipe;
        }
      }
    } catch (e) {
      console.warn(`⚠️ Error parsing recipe ${f}:`, e.message);
    }
  }
}

console.log(`🍳 [Sync Data] Parsed ${recipes.length} recipes.`);

// Write out modInfo.json
const modInfo = {
  name: 'Mystical Terrain',
  modVersion: gradleProps['mod_version'] || '1.0.9-1.21.11',
  minecraftVersion: gradleProps['minecraft_version'] || '1.21.11',
  loaderVersion: gradleProps['loader_version'] || '0.19.3',
  fabricVersion: gradleProps['fabric_version'] || '0.141.6+1.21.11',
  totalRecipes: recipes.length,
  totalTranslations: Object.keys(langData).length
};

fs.writeFileSync(path.join(dataDir, 'modInfo.json'), JSON.stringify(modInfo, null, 2));
fs.writeFileSync(path.join(publicDataDir, 'modInfo.json'), JSON.stringify(modInfo, null, 2));

// Write out recipes.json
fs.writeFileSync(path.join(dataDir, 'recipes.json'), JSON.stringify({ list: recipes, byId: recipesById }, null, 2));
fs.writeFileSync(path.join(publicDataDir, 'recipes.json'), JSON.stringify({ list: recipes, byId: recipesById }, null, 2));

console.log('✅ [Sync Data] Data synchronization complete!');
