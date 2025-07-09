document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu functionality
    function initMobileMenu() {
//        console.log('Initializing mobile menu...');
        const toggleMenu = document.getElementById('toggle-menu');
        const mobileWrapper = document.getElementById('menu-mobile-wrapper');
        const mobileMenu = document.getElementById('menu-mobile');

//        console.log('Elements found:', {
//            toggleMenu: !!toggleMenu,
//            mobileWrapper: !!mobileWrapper,
//            mobileMenu: !!mobileMenu
//        });

        if (toggleMenu && mobileWrapper && mobileMenu) {
            toggleMenu.addEventListener('click', function(e) {
                console.log('Toggle menu clicked');
                e.stopPropagation(); // Prevent click from bubbling to document
                
                // Toggle the menu wrapper class
                mobileWrapper.classList.toggle('toggle-open');
                
                // If opening the menu
                if (mobileWrapper.classList.contains('toggle-open')) {
                    console.log('Opening menu');
                    mobileMenu.style.display = 'block';
                    // Give the browser a moment to register the display change
                    requestAnimationFrame(() => {
                        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
                        console.log('Menu height set to:', mobileMenu.scrollHeight);
                    });
                } else {
                    console.log('Closing menu');
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
                    console.log('Closing menu from outside click');
                    mobileWrapper.classList.remove('toggle-open');
                    mobileMenu.style.maxHeight = '0';
                    setTimeout(() => {
                        mobileMenu.style.display = 'none';
                    }, 300);
                }
            });
        }
    }

    // Get the header section
    const headerSection = document.getElementById('header');
    if (!headerSection) {
        // If no header section, we might be on a page that already has the navigation
        initMobileMenu();
        return;
    }

    // Fetch the navigation content
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            // Create a container for the navigation
            const container = headerSection.querySelector('.container');
            if (container) {
                container.innerHTML = data;
                initMobileMenu();
            }
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
        });
}); 