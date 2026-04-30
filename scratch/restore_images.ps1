Add-Type -AssemblyName System.Drawing

function Optimize-Image($source, $target) {
    if (-not (Test-Path $source)) {
        Write-Host "Source $source not found, skipping."
        return
    }
    Write-Host "Optimizing $source to $target..."
    $img = [System.Drawing.Image]::FromFile($source)
    $maxWidth = 1600 # Slightly smaller for these secondary images
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
    
    $codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
    $jpgCodec = $codecs | Where-Object { $_.FormatDescription -eq "JPEG" }
    $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 75)

    $newImg.Save($target, $jpgCodec, $params)
    
    $graphics.Dispose()
    $newImg.Dispose()
    $img.Dispose()
}

for ($i=1; $i -le 10; $i++) {
    Optimize-Image "images/ALTA/$i.jpg" "images/yoga_hero_$i.jpg"
}
