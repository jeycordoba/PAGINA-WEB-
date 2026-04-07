const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToProcess = [
    {
        source: 'images/ALTA/121B.jpg',
        target: 'images/jeniffer_portrait.jpg',
        width: 1000
    }
];

async function optimizeImages() {
    for (const img of imagesToProcess) {
        const sourcePath = path.join(__dirname, img.source);
        const targetPath = path.join(__dirname, img.target);

        console.log(`Optimizing ${img.source} -> ${img.target}...`);
        
        try {
            if (!fs.existsSync(sourcePath)) {
                console.error(`Source file not found: ${sourcePath}`);
                continue;
            }

            await sharp(sourcePath)
                .resize(img.width)
                .jpeg({ quality: 85, mozjpeg: true })
                .toFile(targetPath);
            
            console.log(`Successfully optimized ${img.target}`);
        } catch (error) {
            console.error(`Error processing ${img.source}:`, error);
        }
    }
}

optimizeImages();
