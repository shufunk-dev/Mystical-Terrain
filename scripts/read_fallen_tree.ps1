Add-Type -AssemblyName System.IO.Compression.FileSystem
$jar = "C:\Users\shufu\.gradle\caches\fabric-loom\minecraftMaven\net\minecraft\minecraft-merged-deobf\26.3\minecraft-merged-deobf-26.3.jar"
$zip = [System.IO.Compression.ZipFile]::OpenRead($jar)
foreach ($e in $zip.Entries) {
    if ($e.FullName -match "fallen_.*\.json") {
        Write-Host "=== $($e.FullName) ==="
        $s = $e.Open()
        $r = New-Object System.IO.StreamReader($s)
        Write-Host $r.ReadToEnd()
        $r.Close()
        $s.Close()
        break
    }
}
$zip.Dispose()
