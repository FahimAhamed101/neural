Add-Type -AssemblyName System.Drawing

$publicDir = Join-Path $PSScriptRoot "..\public"
New-Item -ItemType Directory -Force -Path $publicDir | Out-Null

function New-NeuralIcon {
  param([int]$Size, [string]$OutputPath)
  $bitmap = New-Object System.Drawing.Bitmap($Size, $Size)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear([System.Drawing.Color]::FromArgb(200, 255, 26))
  $font = New-Object System.Drawing.Font("Arial", ($Size * 0.50), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center
  $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(14, 15, 17))
  $graphics.DrawString("N", $font, $brush, (New-Object System.Drawing.RectangleF(0, 0, $Size, $Size)), $format)
  $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $brush.Dispose(); $format.Dispose(); $font.Dispose(); $graphics.Dispose(); $bitmap.Dispose()
}

$ogPath = Join-Path $publicDir "og-image.png"
$og = New-Object System.Drawing.Bitmap(1200, 630)
$g = [System.Drawing.Graphics]::FromImage($og)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gradient = New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.Rectangle(0, 0, 1200, 630)), [System.Drawing.Color]::White, [System.Drawing.Color]::FromArgb(224, 255, 130), 25)
$g.FillRectangle($gradient, 0, 0, 1200, 630)
$dark = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(14, 15, 17))
$muted = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(82, 83, 85))
$lime = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(200, 255, 26))
$g.FillEllipse($lime, 80, 70, 62, 62)
$markFont = New-Object System.Drawing.Font("Arial", 30, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$brandFont = New-Object System.Drawing.Font("Arial", 34, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$titleFont = New-Object System.Drawing.Font("Arial", 68, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$subFont = New-Object System.Drawing.Font("Arial", 26, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$smallFont = New-Object System.Drawing.Font("Arial", 21, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$center = New-Object System.Drawing.StringFormat
$center.Alignment = [System.Drawing.StringAlignment]::Center
$center.LineAlignment = [System.Drawing.StringAlignment]::Center
$g.DrawString("N", $markFont, $dark, (New-Object System.Drawing.RectangleF(80, 70, 62, 62)), $center)
$g.DrawString("Neural IT Limited", $brandFont, $dark, 162, 82)
$g.DrawString("Web, mobile, software,", $titleFont, $dark, 80, 220)
$g.DrawString("and AI solutions.", $titleFont, $dark, 80, 300)
$g.DrawString("Built in Bangladesh. Delivered worldwide.", $subFont, $muted, 84, 405)
$g.DrawString("neuralitlimited.com", $smallFont, $muted, 84, 535)
$g.DrawString("WhatsApp +880 1706 617723", $smallFont, $muted, 820, 535)
$og.Save($ogPath, [System.Drawing.Imaging.ImageFormat]::Png)
$center.Dispose(); $smallFont.Dispose(); $subFont.Dispose(); $titleFont.Dispose(); $brandFont.Dispose(); $markFont.Dispose(); $lime.Dispose(); $muted.Dispose(); $dark.Dispose(); $gradient.Dispose(); $g.Dispose(); $og.Dispose()

New-NeuralIcon -Size 64 -OutputPath (Join-Path $publicDir "icon-64.png")
New-NeuralIcon -Size 180 -OutputPath (Join-Path $publicDir "apple-icon-180.png")
Write-Output "Generated static SEO images in $publicDir"
