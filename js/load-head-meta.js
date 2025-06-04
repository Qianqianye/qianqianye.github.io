// Function to load head meta content
function loadHeadMeta() {
    fetch('head-meta.html')
        .then(response => response.text())
        .then(data => {
            // Parse the meta content
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const metaTags = doc.querySelectorAll('meta');
            
            // Insert only the meta tags after the existing meta tags
            const head = document.head;
            const lastMeta = head.querySelector('meta:last-of-type');
            
            metaTags.forEach(meta => {
                // Only add if the meta tag doesn't already exist
                const name = meta.getAttribute('name');
                const property = meta.getAttribute('property');
                if (name && !head.querySelector(`meta[name="${name}"]`)) {
                    head.insertBefore(meta.cloneNode(true), lastMeta.nextSibling);
                } else if (property && !head.querySelector(`meta[property="${property}"]`)) {
                    head.insertBefore(meta.cloneNode(true), lastMeta.nextSibling);
                }
            });
        })
        .catch(error => {
            console.error('Error loading head meta:', error);
        });
}

// Load head meta content when the script runs
loadHeadMeta(); 