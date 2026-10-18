import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root is one level up from wiki/scripts
const projectRoot = path.resolve(__dirname, '../../');
const modAssetsDir = path.join(projectRoot, 'src/main/resources/assets/mysticalterrain');
const texturesSource = path.join(modAssetsDir, 'textures');
const iconSource = path.join(modAssetsDir, 'icon.png');

const wikiPublicDir = path.resolve(__dirname, '../docs/public');
const texturesDest = path.join(wikiPublicDir, 'textures');

console.log('🔄 [Sync Assets] Synchronizing mod assets & textures...');

if (!fs.existsSync(texturesSource)) {
  console.error(`❌ Source textures directory not found: ${texturesSource}`);
  process.exit(1);
}

fs.mkdirSync(texturesDest, { recursive: true });

function copyRecursive(src, dest) {
  let count = 0;
  if (!fs.existsSync(src)) return 0;
  const entries = fs.readdirSync(src, { withFileTypes: true });
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      count += copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }
  return count;
}

const copiedCount = copyRecursive(texturesSource, texturesDest);
console.log(`✅ [Sync Assets] Synced ${copiedCount} textures to docs/public/textures`);

if (fs.existsSync(iconSource)) {
  fs.copyFileSync(iconSource, path.join(wikiPublicDir, 'icon.png'));
  fs.copyFileSync(iconSource, path.join(texturesDest, 'icon.png'));
  console.log(`✅ [Sync Assets] Synced mod icon.png to docs/public/`);
}
