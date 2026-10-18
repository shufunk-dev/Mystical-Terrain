Add-Type -AssemblyName System.IO.Compression.FileSystem
$jar = "C:\Users\shufu\.gradle\caches\fabric-loom\minecraftMaven\net\minecraft\minecraft-merged-deobf\26.3\minecraft-merged-deobf-26.3.jar"
$zip = [System.IO.Compression.ZipFile]::OpenRead($jar)
foreach ($e in $zip.Entries) {
    if ($e.FullName -match "data/minecraft/worldgen/feature/.*\.json") {
        $s = $e.Open()
        $r = New-Object System.IO.StreamReader($s)
        $c = $r.ReadToEnd()
        $r.Close()
        $s.Close()
        if ($c -match '"type":\s*"minecraft:simple_block"') {
            Write-Host "=== $($e.FullName) ==="
            Write-Host $c
            break
        }
    }
}
$zip.Dispose()
