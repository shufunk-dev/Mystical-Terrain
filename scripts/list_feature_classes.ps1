Add-Type -AssemblyName System.IO.Compression.FileSystem
$jar = "C:\Users\shufu\.gradle\caches\fabric-loom\minecraftMaven\net\minecraft\minecraft-merged-deobf\26.3\minecraft-merged-deobf-26.3.jar"
$zip = [System.IO.Compression.ZipFile]::OpenRead($jar)
foreach ($e in $zip.Entries) {
    if ($e.FullName -match "FeatureType" -or $e.FullName -match "feature/.*Feature\.class") {
        # check class names
        $name = [System.IO.Path]::GetFileNameWithoutExtension($e.FullName)
        Write-Host $name
    }
}
$zip.Dispose()
