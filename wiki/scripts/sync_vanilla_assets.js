import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../../');
const recipeDir = path.join(projectRoot, 'src/main/resources/data/mysticalterrain/recipe');
const wikiPublicDir = path.resolve(__dirname, '../docs/public');
const vanillaDestDir = path.join(wikiPublicDir, 'textures/minecraft');
const cacheDir = path.resolve(__dirname, 'cache/vanilla');

fs.mkdirSync(path.join(vanillaDestDir, 'item'), { recursive: true });
fs.mkdirSync(path.join(vanillaDestDir, 'block'), { recursive: true });
fs.mkdirSync(cacheDir, { recursive: true });

console.log('🔄 [Sync Vanilla Assets] Discovering referenced vanilla items & textures...');

const ignoredKeys = new Set([
  'crafting_shaped',
  'crafting_shapeless',
  'stonecutting',
  'smelting',
  'blasting',
  'campfire_cooking',
  'smoking',
  'smithing_transform'
]);

// Scan all recipes for minecraft: references
const vanillaItems = new Set([
  'stick',
  'blaze_rod',
  'blaze_powder',
  'netherite_ingot',
  'gold_ingot',
  'diamond',
  'amethyst_shard',
  'ender_eye',
  'leather',
  'bone',
  'bone_block',
  'feather',
  'glass_bottle',
  'fermented_spider_eye',
  'heart_of_the_sea',
  'nautilus_shell',
  'crying_obsidian',
  'magma_block',
  'decorated_pot',
  'turtle_egg',
  'black_dye',
  'blue_dye',
  'cyan_dye',
  'light_blue_dye',
  'magenta_dye',
  'orange_dye',
  'purple_dye',
  'red_dye',
  'white_dye',
  'yellow_dye'
]);

if (fs.existsSync(recipeDir)) {
  const files = fs.readdirSync(recipeDir);
  for (const f of files) {
    if (!f.endsWith('.json')) continue;
    try {
      const content = fs.readFileSync(path.join(recipeDir, f), 'utf8');
      const matches = content.match(/minecraft:([a-z0-9_]+)/g);
      if (matches) {
        for (const match of matches) {
          const id = match.replace('minecraft:', '');
          if (!ignoredKeys.has(id)) {
            vanillaItems.add(id);
          }
        }
      }
    } catch {
      // Ignore parse errors on individual files
    }
  }
}

console.log(`📦 [Sync Vanilla Assets] Found ${vanillaItems.size} referenced vanilla item(s)`);

const BASE_URLS = [
  'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.1/assets/minecraft/textures/item',
  'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.1/assets/minecraft/textures/block'
];

async function syncVanillaTexture(itemName) {
  const cachePath = path.join(cacheDir, `${itemName}.png`);
  const destItemPath = path.join(vanillaDestDir, 'item', `${itemName}.png`);
  const destBlockPath = path.join(vanillaDestDir, 'block', `${itemName}.png`);

  if (fs.existsSync(cachePath)) {
    fs.copyFileSync(cachePath, destItemPath);
    fs.copyFileSync(cachePath, destBlockPath);
    return true;
  }

  // Fetch online if not cached
  for (const baseUrl of BASE_URLS) {
    const url = `${baseUrl}/${itemName}.png`;
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(3500) });
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(cachePath, buffer);
        fs.writeFileSync(destItemPath, buffer);
        fs.writeFileSync(destBlockPath, buffer);
        return true;
      }
    } catch {
      // Continue to next baseUrl or fallback
    }
  }

  // Fallback: 1x1 transparent PNG if fetch fails or offline
  const fallbackPng = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVDhPY/z//z8DJYCJgUIwagENjCMAfOIGfg2y7b0AAAAASUVORK5CYII=',
    'base64'
  );
  fs.writeFileSync(destItemPath, fallbackPng);
  return false;
}

async function run() {
  const promises = [];
  for (const item of vanillaItems) {
    promises.push(syncVanillaTexture(item));
  }
  const results = await Promise.all(promises);
  const fetchedCount = results.filter(Boolean).length;
  console.log(`✅ [Sync Vanilla Assets] Successfully synced ${fetchedCount}/${vanillaItems.size} vanilla textures.`);
}

run().catch((err) => {
  console.warn('⚠️ [Sync Vanilla Assets] Completed with warnings:', err.message);
});
