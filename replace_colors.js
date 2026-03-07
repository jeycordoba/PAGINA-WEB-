const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = ['kids.html', 'pricing.html', 'index.html', 'healing.html', 'essence.html', 'corporate.html', 'contact.html', 'about.html'];

// Replace Tailwind Config block
const oldConfigStr = `colors: {
                        'primary': '#87A96A',
                        'deep': '#2D4F1E',
                        'sage': '#9CAF88',
                        'alabaster': '#F2F2EB',
                        'mint': '#DDEBDB'
                    }`;

const newConfigStr = `colors: {
                        'primary': '#955031',
                        'deep': '#504c33',
                        'sage': '#b69c75',
                        'alabaster': '#ede1c9',
                        'mint': '#9b9773',
                        'espresso': '#322F20'
                    }`;

for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace Config
    // Since spacing might vary, we do a regex or replace the exact known string
    // It's safer to use regex for the whole colors object
    content = content.replace(/colors:\s*\{[^}]+\}/, newConfigStr);

    // Replace hardcoded hexes directly in class strings
    content = content.replace(/#A7BEA9/g, '#9b9773');
    // Both these dark green/blue-grey tones map to deep olive/espresso
    content = content.replace(/#2F3E46/g, '#504c33');
    content = content.replace(/#2D4F1E/g, '#322F20');
    content = content.replace(/#87A96A/g, '#955031');

    fs.writeFileSync(filePath, content);
    console.log(`Updated colors in ${file}`);
}

// Update main.css
const cssPath = path.join(dir, 'main.css');
if (fs.existsSync(cssPath)) {
    let cssContent = fs.readFileSync(cssPath, 'utf8');
    cssContent = cssContent.replace(/#A7BEA9/ig, '#9b9773');
    cssContent = cssContent.replace(/#2F3E46/ig, '#504c33');
    cssContent = cssContent.replace(/#2D4F1E/ig, '#322F20');
    cssContent = cssContent.replace(/#87A96A/ig, '#955031');
    fs.writeFileSync(cssPath, cssContent);
    console.log('Updated colors in main.css');
}
