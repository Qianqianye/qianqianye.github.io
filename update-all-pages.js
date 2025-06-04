const fs = require('fs');
const path = require('path');

// Get all HTML files in the current directory
const files = fs.readdirSync('.')
    .filter(file => file.endsWith('.html'))
    .filter(file => !['nav.html', 'head-meta.html'].includes(file));

// Function to generate page title
function getPageTitle(filename) {
    if (filename === 'index.html') return 'Qianqian Ye - Artist, Creative Technologist & Educator';
    
    // Convert filename to title
    const baseName = path.basename(filename, '.html');
    const words = baseName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return `${words.join(' ')} - Qianqian Ye`;
}

// New head section template
const newHeadSection = `<head>
    <meta charset="utf-8">
    <title>PAGE_TITLE</title>
    <script src="js/load-head-meta.js"></script>
</head>`;

// New header section template
const newHeaderSection = `<section id="header">
    <div class="container">
        <!-- Navigation will be loaded here -->
    </div>
</section>

`;

// Process each file
files.forEach(file => {
    console.log(`Processing ${file}...`);
    let content = fs.readFileSync(file, 'utf8');

    // Generate page title
    const pageTitle = getPageTitle(file);

    // Replace head section with the correct title
    content = content.replace(/<head>[\s\S]*?<\/head>/i, newHeadSection.replace('PAGE_TITLE', pageTitle));

    // Add header section after body tag if it doesn't exist
    if (!content.includes('id="header"')) {
        content = content.replace(/<body[^>]*>/, match => `${match}\n${newHeaderSection}`);
    }

    // Add load-nav.js script before closing body tag if it's not already there
    if (!content.includes('load-nav.js')) {
        content = content.replace('</body>', '    <script src="js/load-nav.js"></script>\n</body>');
    }

    // Write the updated content back to the file
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
}); 