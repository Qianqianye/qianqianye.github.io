import os
import re
from pathlib import Path

# Read the template head content
with open('template-head.html', 'r') as f:
    template_head = f.read()

# Get all HTML files
html_files = list(Path('.').rglob('*.html'))
excluded_files = {'head-meta.html', 'nav.html', 'template-head.html'}

for file_path in html_files:
    if file_path.name not in excluded_files:
        print(f"Processing {file_path}")
        
        # Read the file
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Get the title
        title_match = re.search(r'<title>(.*?)</title>', content)
        title = title_match.group(0) if title_match else '<title>Qianqian Ye</title>'
        
        # Create new head section
        new_head = f'<head>\n    {title}\n{template_head}\n</head>'
        
        # Replace old head section
        new_content = re.sub(r'<head>.*?</head>', new_head, content, flags=re.DOTALL)
        
        # Remove LESS.js
        new_content = re.sub(r'<script.*?less-1\.4\.0\.min\.js.*?</script>\n?', '', new_content)
        
        # Write back to file
        with open(file_path, 'w') as f:
            f.write(new_content)
            
print("Done updating all HTML files!") 