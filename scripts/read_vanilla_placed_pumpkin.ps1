Add-Type -AssemblyName System.IO.Compression.FileSystem
$jar = "C:\Users\shufu\.gradle\caches\fabric-loom\minecraftMaven\net\minecraft\minecraft-merged-deobf\26.3\minecraft-merged-deobf-26.3.jar"
$zip = [System.IO.Compression.ZipFile]::OpenRead($jar)
$e = $zip.GetEntry("data/minecraft/worldgen/placed_feature/patch_pumpkin.json")
if ($e) {
    $s = $e.Open()
    $r = New-Object System.IO.StreamReader($s)
    Write-Host $r.ReadToEnd()
    $r.Close()
    $s.Close()
}
$zip.Dispose()
