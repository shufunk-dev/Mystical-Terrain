Add-Type -AssemblyName System.IO.Compression.FileSystem
$jar = "C:\Users\shufu\.gradle\caches\fabric-loom\minecraftMaven\net\minecraft\minecraft-merged-deobf\26.3\minecraft-merged-deobf-26.3.jar"
$zip = [System.IO.Compression.ZipFile]::OpenRead($jar)
$count = 0
foreach ($e in $zip.Entries) {
    if ($e.FullName -match "data/minecraft/worldgen/feature/.*\.json" -and $count -lt 10) {
        $s = $e.Open()
        $r = New-Object System.IO.StreamReader($s)
        $content = $r.ReadToEnd()
        $r.Close()
        $s.Close()
        if ($content -match "below_trunk_provider") {
            Write-Host "=== $($e.FullName) ==="
            Write-Host $content
            $count++
        }
    }
}
$zip.Dispose()
