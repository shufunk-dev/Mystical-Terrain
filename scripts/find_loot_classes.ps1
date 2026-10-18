Add-Type -AssemblyName System.IO.Compression.FileSystem
$jar = "C:\Users\shufu\.gradle\caches\fabric-loom\minecraftMaven\net\minecraft\minecraft-merged-deobf\26.3\minecraft-merged-deobf-26.3.jar"
$zip = [System.IO.Compression.ZipFile]::OpenRead($jar)
foreach ($e in $zip.Entries) {
    if ($e.FullName -match "loot/.*Item.*Entry.*\.class" -or $e.FullName -match "loot/.*LootPool.*\.class") {
        Write-Host $e.FullName
    }
}
$zip.Dispose()
