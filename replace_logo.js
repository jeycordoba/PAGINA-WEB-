const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = ['youth.html', 'pricing.html', 'index.html', 'healing.html', 'gallery.html', 'corporate.html', 'contact.html', 'about.html'];

for (const file of files) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace favicon href
    content = content.replace(/href="images\/logo2\.png"/g, 'href="images/favicon.png"');
    // It's possible some files have no favicon, let's inject it before </head> if missing
    if (!content.includes('href="images/favicon.png"')) {
        content = content.replace(/<\/head>/i, '    <link rel="icon" type="image/png" href="images/favicon.png">\n</head>');
    }

    // Replace image src
    content = content.replace(/src="images\/logo2\.png"/g, 'src="images/logo_optimized.webp"');

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
}
