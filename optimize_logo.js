const sharp = require('sharp');
const path = require('path');

const inputImagePath = path.join(__dirname, 'images', 'Spiral_logo.png');
const outputLogoPath = path.join(__dirname, 'images', 'logo_optimized.webp');
const outputFaviconPath = path.join(__dirname, 'images', 'favicon.png');

async function processImages() {
    try {
        // 1. Optimize Logo as WebP
        await sharp(inputImagePath)
            .webp({ quality: 85 })
            .toFile(outputLogoPath);
        console.log(`Saved optimized logo to ${outputLogoPath}`);

        // 2. Generate Favicon
        const metadata = await sharp(inputImagePath).metadata();
        const size = Math.max(metadata.width, metadata.height);

        await sharp(inputImagePath)
            .resize({
                width: size,
                height: size,
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .resize(64, 64)
            .png()
            .toFile(outputFaviconPath);

        console.log(`Saved favicon to ${outputFaviconPath}`);

    } catch (error) {
        console.error('Error processing image:', error);
    }
}

processImages();
