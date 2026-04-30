Add-Type -AssemblyName System.Drawing

function Optimize-Image($source, $target) {
    Write-Host "Optimizing $source to $target..."
    $img = [System.Drawing.Image]::FromFile($source)
    $maxWidth = 1920
    $newWidth = $img.Width
    $newHeight = $img.Height

    if ($img.Width -gt $maxWidth) {
        $ratio = $maxWidth / $img.Width
        $newWidth = $maxWidth
        $newHeight = [int]($img.Height * $ratio)
    }

    $newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($newImg)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
    
    # Setup JPG encoding with quality
    $codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
    $jpgCodec = $codecs | Where-Object { $_.FormatDescription -eq "JPEG" }
    $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 80)

    $newImg.Save($target, $jpgCodec, $params)
    
    $graphics.Dispose()
    $newImg.Dispose()
    $img.Dispose()
    Write-Host "Done."
}

$cwd = Get-Location
Write-Host "Current Directory: $cwd"

Optimize-Image "images/26.jpg" "images/yogaHero1.jpg"
Optimize-Image "images/41.jpg" "images/yogaHero2.jpg"
Optimize-Image "images/47.jpg" "images/yogaHero3.jpg"

Write-Host "Deleting original large images..."
Remove-Item "images/26.jpg" -ErrorAction SilentlyContinue
Remove-Item "images/41.jpg" -ErrorAction SilentlyContinue
Remove-Item "images/47.jpg" -ErrorAction SilentlyContinue
Write-Host "Process complete."
