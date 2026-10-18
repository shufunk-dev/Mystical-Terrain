const fs = require('fs');
const path = require('path');

const WORLDGEN_DIR = path.resolve('src/main/resources/data/mysticalterrain/worldgen');
const CONFIGURED_DIR = path.join(WORLDGEN_DIR, 'configured_feature');
const FEATURE_DIR = path.join(WORLDGEN_DIR, 'feature');

// Step 1: Rename configured_feature directory to feature if it exists
if (fs.existsSync(CONFIGURED_DIR)) {
  if (fs.existsSync(FEATURE_DIR)) {
    console.log('Target feature directory already exists, merging...');
    // copy all files from configured_feature to feature
    fs.cpSync(CONFIGURED_DIR, FEATURE_DIR, { recursive: true });
    fs.rmSync(CONFIGURED_DIR, { recursive: true, force: true });
  } else {
    console.log('Renaming configured_feature to feature...');
    fs.renameSync(CONFIGURED_DIR, FEATURE_DIR);
  }
}

// Function to recursively transform JSON objects
function transformNode(node) {
  if (node === null || typeof node !== 'object') {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(transformNode);
  }

  // 1. Convert BlockState: { "Name": "...", "Properties": { ... } } -> { "id": "...", "properties": { ... } }
  if (typeof node.Name === 'string' && (node.Properties !== undefined || Object.keys(node).length <= 2)) {
    const id = node.Name;
    const props = node.Properties;
    delete node.Name;
    delete node.Properties;
    node.id = id;
    if (props && typeof props === 'object' && Object.keys(props).length > 0) {
      node.properties = props;
    }
  }

  // 2. BlockStateProvider renames
  if (node.type === 'minecraft:simple_state_provider') {
    node.type = 'minecraft:simple';
  } else if (node.type === 'minecraft:weighted_state_provider') {
    node.type = 'minecraft:weighted';
  } else if (node.type === 'minecraft:noise_provider') {
    node.type = 'minecraft:noise';
  } else if (node.type === 'minecraft:dual_noise_provider') {
    node.type = 'minecraft:dual_noise';
  } else if (node.type === 'minecraft:randomized_int_state_provider') {
    node.type = 'minecraft:randomized_int';
  } else if (node.type === 'minecraft:noise_threshold_provider') {
    node.type = 'minecraft:noise_threshold';
  } else if (node.type === 'minecraft:rule_based_state_provider') {
    node.type = 'minecraft:rule_based';
  }

  // 3. PlacementModifier renames: random_offset -> offset
  if (node.type === 'minecraft:random_offset') {
    node.type = 'minecraft:offset';
    const xz = node.xz_spread ?? 0;
    const y = node.y_spread ?? 0;
    delete node.xz_spread;
    delete node.y_spread;
    node.x = xz === 0 ? 0 : { type: 'minecraft:trapezoid', min: -Math.abs(xz), max: Math.abs(xz), plateau: 0 };
    node.y = y === 0 ? 0 : { type: 'minecraft:trapezoid', min: -Math.abs(y), max: Math.abs(y), plateau: 0 };
    node.z = xz === 0 ? 0 : { type: 'minecraft:trapezoid', min: -Math.abs(xz), max: Math.abs(xz), plateau: 0 };
  }

  // 4. Feature renames: forest_rock -> block_blob
  if (node.type === 'minecraft:forest_rock') {
    node.type = 'minecraft:block_blob';
    node.can_place_on = {
      type: 'minecraft:matching_block_tag',
      tag: 'minecraft:forest_rock_can_place_on'
    };
    if (node.config && node.config.state) {
      node.state = node.config.state;
      delete node.config;
    }
  }

  // 5. Flatten vanilla features with "config" (NOT mysticalterrain:* features)
  if (node.type && typeof node.type === 'string' && node.type.startsWith('minecraft:') && node.config && typeof node.config === 'object') {
    const config = node.config;
    delete node.config;
    for (const [k, v] of Object.entries(config)) {
      if (node[k] === undefined) {
        node[k] = v;
      }
    }
  }

  // Recursively transform remaining properties
  for (const key of Object.keys(node)) {
    node[key] = transformNode(node[key]);
  }

  return node;
}

// Function to handle placed_feature files specially for random_patch and flower
function transformPlacedFeatureFile(data) {
  // If feature is random_patch or flower
  if (data.feature && typeof data.feature === 'object') {
    const f = data.feature;
    if (f.type === 'minecraft:random_patch' || f.type === 'minecraft:flower') {
      const config = f.config || {};
      const tries = config.tries || (f.type === 'minecraft:flower' ? 64 : 96);
      const xz = config.xz_spread ?? 7;
      const y = config.y_spread ?? 3;
      
      let innerFeature = null;
      let innerPlacement = [];

      if (config.feature) {
        if (config.feature.feature) {
          innerFeature = config.feature.feature;
          innerPlacement = config.feature.placement || [];
        } else {
          innerFeature = config.feature;
        }
      }

      if (innerFeature) {
        data.feature = innerFeature;
        data.placement = data.placement || [];
        data.placement.push({
          type: 'minecraft:count',
          count: tries
        });
        data.placement.push({
          type: 'minecraft:offset',
          x: xz === 0 ? 0 : { type: 'minecraft:trapezoid', min: -Math.abs(xz), max: Math.abs(xz), plateau: 0 },
          y: y === 0 ? 0 : { type: 'minecraft:trapezoid', min: -Math.abs(y), max: Math.abs(y), plateau: 0 },
          z: xz === 0 ? 0 : { type: 'minecraft:trapezoid', min: -Math.abs(xz), max: Math.abs(xz), plateau: 0 }
        });
        if (Array.isArray(innerPlacement)) {
          for (const p of innerPlacement) {
            data.placement.push(p);
          }
        }
      }
    }
  }

  return transformNode(data);
}

// Walk all json files in a directory
function walkAndTransform(dir, isPlacedFeature = false) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkAndTransform(fullPath, isPlacedFeature);
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const parsed = JSON.parse(content);
        const transformed = isPlacedFeature ? transformPlacedFeatureFile(parsed) : transformNode(parsed);
        fs.writeFileSync(fullPath, JSON.stringify(transformed, null, 2), 'utf8');
      } catch (err) {
        console.error(`Error processing ${fullPath}:`, err.message);
      }
    }
  }
}

console.log('Processing feature files...');
walkAndTransform(FEATURE_DIR, false);

console.log('Processing placed_feature files...');
walkAndTransform(path.join(WORLDGEN_DIR, 'placed_feature'), true);

console.log('Processing biome files...');
walkAndTransform(path.join(WORLDGEN_DIR, 'biome'), false);

console.log('Processing structure files...');
walkAndTransform(path.join(WORLDGEN_DIR, 'structure'), false);
walkAndTransform(path.join(WORLDGEN_DIR, 'structure_set'), false);

console.log('Migration completed successfully!');
