// Function to load head meta content
function loadHeadMeta() {
    fetch('head-meta.html')
        .then(response => response.text())
        .then(data => {
            // Insert the meta tags at the beginning of head
            const headElement = document.head;
            if (headElement) {
                // Keep the existing title
                const title = document.title;
                headElement.innerHTML = data + `<title>${title}</title>`;
            }
        })
        .catch(error => {
            console.error('Error loading head meta:', error);
        });
}

// Load head meta content when the script runs
loadHeadMeta(); 