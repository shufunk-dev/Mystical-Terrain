Add-Type -AssemblyName System.IO.Compression.FileSystem
$jar = "C:\Users\shufu\.gradle\caches\fabric-loom\minecraftMaven\net\minecraft\minecraft-merged-deobf\26.3\minecraft-merged-deobf-26.3.jar"
$zip = [System.IO.Compression.ZipFile]::OpenRead($jar)
$vanilla = @{}
foreach ($e in $zip.Entries) {
    if ($e.FullName -match "data/minecraft/worldgen/feature/(.*)\.json") {
        $vanilla[$matches[1]] = 1
    }
}
$zip.Dispose()

$refs = @(
"bamboo_vegetation", "birch_tall", "cave_vine", "cherry_bees_005", "chorus_plant", "crimson_fungus", "dark_forest_vegetation",
"disk_clay", "dripstone_cluster", "fallen_birch_tree", "fallen_jungle_tree", "fallen_oak_tree", "fallen_spruce_tree",
"glow_lichen", "glowstone_extra", "huge_brown_mushroom", "huge_red_mushroom", "ice_patch", "ice_spike", "iceberg_blue",
"iceberg_packed", "kelp", "lake_lava", "large_basalt_columns", "large_dripstone", "mangrove_vegetation", "meadow_trees",
"moss_patch", "moss_patch_ceiling", "mushroom_island_vegetation", "ore_nether_gold", "ore_quartz", "pale_garden_vegetation",
"pale_moss_patch", "patch_berry_bush", "patch_cactus", "patch_dead_bush", "patch_dry_grass", "patch_firefly_bush",
"patch_leaf_litter", "patch_melon", "patch_pumpkin", "patch_soul_fire", "patch_sugar_cane", "patch_waterlily",
"pointed_dripstone", "rooted_azalea_tree", "sea_pickle", "seagrass_tall", "small_basalt_columns", "spore_blossom",
"spring_water", "swamp_oak", "trees_badlands", "trees_birch", "trees_birch_and_oak_leaf_litter", "trees_flower_forest",
"trees_grove", "trees_jungle", "trees_old_growth_pine_taiga", "trees_old_growth_spruce_taiga", "trees_plains",
"trees_savanna", "trees_snowy", "trees_taiga", "trees_windswept_hills", "twisting_vines", "warm_ocean_vegetation",
"weeping_vines"
)

Write-Host "--- MISSING CONFIGURED FEATURES ---"
foreach ($r in $refs) {
    if (-not $vanilla.ContainsKey($r)) {
        Write-Host "MISSING: $r"
    }
}
