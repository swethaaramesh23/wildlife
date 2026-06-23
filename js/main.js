document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline && window.innerWidth > 1024) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 400, fill: "forwards" });
        });

        // Add hover effect for links and buttons
        const hoverElements = document.querySelectorAll('a, button, .hover-target, .masonry-item, .collection-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '70px';
                cursorOutline.style.height = '70px';
                cursorOutline.style.backgroundColor = 'rgba(203, 163, 88, 0.1)';
                cursorOutline.style.borderColor = 'rgba(203, 163, 88, 0.8)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '44px';
                cursorOutline.style.height = '44px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = 'rgba(203, 163, 88, 0.4)';
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileToggle) {
        // Create mobile menu container if it doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');
        if(!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            const cloneLinks = navLinks.cloneNode(true);
            const closeBtn = document.createElement('button');
            closeBtn.className = 'mobile-toggle';
            closeBtn.innerHTML = '✕';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '28px';
            closeBtn.style.right = '4%';
            mobileMenu.appendChild(closeBtn);
            mobileMenu.appendChild(cloneLinks);
            document.body.appendChild(mobileMenu);

            mobileToggle.addEventListener('click', () => {
                mobileMenu.classList.add('active');
            });
            
            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });

            cloneLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                });
            });
        }
    }
});
