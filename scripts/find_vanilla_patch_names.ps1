Add-Type -AssemblyName System.IO.Compression.FileSystem
$jar = "C:\Users\shufu\.gradle\caches\fabric-loom\minecraftMaven\net\minecraft\minecraft-merged-deobf\26.3\minecraft-merged-deobf-26.3.jar"
$zip = [System.IO.Compression.ZipFile]::OpenRead($jar)
$targets = @("berry", "cactus", "dead_bush", "dry_grass", "firefly", "leaf_litter", "melon", "pumpkin", "sugar_cane", "waterlily")
foreach ($e in $zip.Entries) {
    if ($e.FullName -match "data/minecraft/worldgen/feature/.*\.json") {
        foreach ($t in $targets) {
            if ($e.FullName -match $t) {
                Write-Host "Feature: $($e.FullName)"
            }
        }
    }
    if ($e.FullName -match "data/minecraft/worldgen/placed_feature/.*\.json") {
        foreach ($t in $targets) {
            if ($e.FullName -match $t) {
                Write-Host "PlacedFeature: $($e.FullName)"
            }
        }
    }
}
$zip.Dispose()
