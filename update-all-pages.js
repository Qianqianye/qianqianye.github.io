const fs = require('fs');
const path = require('path');

// Read the template files
const templateHead = fs.readFileSync('template-head.html', 'utf8');
const navContent = fs.readFileSync('nav.html', 'utf8');

// Get all HTML files except template files
const htmlFiles = fs.readdirSync('.')
    .filter(file => file.endsWith('.html'))
    .filter(file => !['nav.html', 'head-meta.html', 'template-head.html'].includes(file));

console.log(`Found ${htmlFiles.length} HTML files to update`);

htmlFiles.forEach(file => {
    console.log(`Processing ${file}...`);
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Find the head section and replace it with the optimized template
    const headMatch = content.match(/<head>([\s\S]*?)<\/head>/);
    if (headMatch) {
        const currentHead = headMatch[1];
        
        // Extract the title from the current head
        const titleMatch = currentHead.match(/<title>(.*?)<\/title>/);
        const title = titleMatch ? titleMatch[1] : 'Qianqian Ye - Artist, Creative Technologist & Educator';
        
        // Create the new head with the title and template content
        const newHead = `<head>
    <title>${title}</title>
${templateHead}
</head>`;
        
        // Replace the head section
        content = content.replace(/<head>[\s\S]*?<\/head>/, newHead);
        
        // Check if there's a header section that needs navigation
        if (content.includes('<section id="header">')) {
            // Replace the header section with navigation included
            const headerMatch = content.match(/<section id="header">[\s\S]*?<\/section>/);
            if (headerMatch) {
                const newHeader = `<section id="header">
        <div class="container">
${navContent}
        </div>
    </section>`;
                content = content.replace(/<section id="header">[\s\S]*?<\/section>/, newHeader);
            }
        }
        
        // Write the updated content back to the file
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✓ Updated ${file}`);
    } else {
        console.log(`⚠ No head section found in ${file}`);
    }
});

console.log('\nAll files updated successfully!');
console.log('\nNote: The navigation is now inlined in all pages for faster loading.');
console.log('To update navigation in the future, run this script again.'); 