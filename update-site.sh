#!/bin/bash

echo "🔄 Updating all pages with latest template and navigation..."
node update-all-pages.js

echo ""
echo "✅ Site update complete!"
echo ""
echo "📝 What was updated:"
echo "   • All pages now have critical meta tags and favicon inline"
echo "   • Navigation is now inlined for faster loading"
echo "   • Favicon will load immediately on all pages"
echo ""
echo "🔄 To update navigation or meta tags in the future:"
echo "   1. Edit nav.html for navigation changes"
echo "   2. Edit template-head.html for head changes"
echo "   3. Run: ./update-site.sh"
echo ""
echo "🚀 Your site should now load much faster!"