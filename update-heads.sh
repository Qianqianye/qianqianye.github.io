#!/bin/bash

# Find all HTML files except templates
find . -name "*.html" ! -name "head-meta.html" ! -name "nav.html" ! -name "template-head.html" -type f | while read -r file; do
    # Get the title from the existing file
    title=$(grep -o '<title>.*</title>' "$file")
    
    # Create new head section
    new_head="<head>\n    $title\n$(cat template-head.html)\n</head>"
    
    # Replace everything between <head> and </head> with new content
    sed -i '' -e '/<head>/,/<\/head>/c\
'"$new_head"'' "$file"
    
    # Remove LESS.js from the bottom of the file
    sed -i '' '/less-1.4.0.min.js/d' "$file"
done 