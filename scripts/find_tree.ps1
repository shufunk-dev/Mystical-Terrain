Add-Type -AssemblyName System.IO.Compression.FileSystem
$jar = "C:\Users\shufu\.gradle\caches\fabric-loom\minecraftMaven\net\minecraft\minecraft-merged-deobf\26.3\minecraft-merged-deobf-26.3.jar"
$zip = [System.IO.Compression.ZipFile]::OpenRead($jar)
foreach ($e in $zip.Entries) {
    if ($e.FullName.EndsWith(".class")) {
        $s = $e.Open()
        $buf = New-Object byte[] $e.Length
        $read = 0
        while ($read -lt $e.Length) {
            $r = $s.Read($buf, $read, $e.Length - $read)
            if ($r -le 0) { break }
            $read += $r
        }
        $s.Close()
        $str = [System.Text.Encoding]::ASCII.GetString($buf)
        if ($str -match "below_trunk_provider") {
            Write-Host "Found match: $($e.FullName)"
        }
    }
}
$zip.Dispose()
