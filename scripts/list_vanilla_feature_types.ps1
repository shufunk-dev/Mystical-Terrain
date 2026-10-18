Add-Type -AssemblyName System.IO.Compression.FileSystem
$jar = "C:\Users\shufu\.gradle\caches\fabric-loom\minecraftMaven\net\minecraft\minecraft-merged-deobf\26.3\minecraft-merged-deobf-26.3.jar"
$zip = [System.IO.Compression.ZipFile]::OpenRead($jar)
$types = @{}
foreach ($e in $zip.Entries) {
    if ($e.FullName -match "data/minecraft/worldgen/feature/[^/]+\.json") {
        $s = $e.Open()
        $r = New-Object System.IO.StreamReader($s)
        $content = $r.ReadToEnd()
        $r.Close()
        $s.Close()
        if ($content -match '"type":\s*"([^"]+)"') {
            $types[$matches[1]] = 1
        }
    }
}
$zip.Dispose()
$types.Keys | Sort-Object | ForEach-Object { Write-Host $_ }
