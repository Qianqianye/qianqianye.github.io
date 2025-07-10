// Preload navigation content for faster rendering
let navContent = null;
let navLoaded = false;

// Preload the navigation content immediately
fetch('nav.html')
    .then(response => response.text())
    .then(data => {
        navContent = data;
        navLoaded = true;
        
        // If DOM is already loaded, insert immediately
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', insertNavigation);
        } else {
            insertNavigation();
        }
    })
    .catch(error => {
        console.error('Error preloading navigation:', error);
    });

function insertNavigation() {
    const headerSection = document.getElementById('header');
    if (!headerSection) {
        // If no header section, we might be on a page that already has the navigation
        initMobileMenu();
        return;
    }

    // If navigation is already loaded, insert immediately
    if (navLoaded && navContent) {
        const container = headerSection.querySelector('.container');
        if (container) {
            container.innerHTML = navContent;
            initMobileMenu();
        }
    } else {
        // Fallback: wait for navigation to load
        const checkNavLoaded = setInterval(() => {
            if (navLoaded && navContent) {
                const container = headerSection.querySelector('.container');
                if (container) {
                    container.innerHTML = navContent;
                    initMobileMenu();
                }
                clearInterval(checkNavLoaded);
            }
        }, 10);
    }
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const toggleMenu = document.getElementById('toggle-menu');
    const mobileWrapper = document.getElementById('menu-mobile-wrapper');
    const mobileMenu = document.getElementById('menu-mobile');

    if (toggleMenu && mobileWrapper && mobileMenu) {
        toggleMenu.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from bubbling to document
            
            // Toggle the menu wrapper class
            mobileWrapper.classList.toggle('toggle-open');
            
            // If opening the menu
            if (mobileWrapper.classList.contains('toggle-open')) {
                mobileMenu.style.display = 'block';
                // Give the browser a moment to register the display change
                requestAnimationFrame(() => {
                    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
                });
            } else {
                mobileMenu.style.maxHeight = '0';
                // Wait for animation to finish before hiding
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                }, 300); // Match the CSS transition duration
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileWrapper.contains(event.target) && mobileWrapper.classList.contains('toggle-open')) {
                mobileWrapper.classList.remove('toggle-open');
                mobileMenu.style.maxHeight = '0';
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Ensure mobile menu is initialized even if navigation is already present
document.addEventListener('DOMContentLoaded', function() {
    // If navigation is already present (not loaded via JS), initialize mobile menu
    const existingNav = document.querySelector('#nav');
    if (existingNav) {
        initMobileMenu();
    }
}); 