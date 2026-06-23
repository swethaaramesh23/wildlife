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

    // Premium Mobile Menu Implementation
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    if(mobileToggle) {
        // Create elements
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Define navigation structure
        const links = [
            { name: 'Home', url: 'index.html' },
            { name: 'About', url: 'about.html' },
            { name: 'Portfolio', url: 'portfolio.html' },
            { name: 'Gallery', url: 'gallery.html' },
            { name: 'Expeditions', url: 'expeditions.html' },
            { name: 'Blog', url: 'blog.html' },
            { name: 'Contact', url: 'contact.html' },
            { name: 'Login', url: 'login.html' }
        ];
        
        // Build menu HTML
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.className = 'mobile-close-btn';
        closeBtn.setAttribute('aria-label', 'Close menu');

        const ul = document.createElement('ul');
        ul.className = 'nav-links';
        
        links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.name;
            li.appendChild(a);
            ul.appendChild(li);
        });
        
        mobileMenu.appendChild(closeBtn);
        mobileMenu.appendChild(ul);
        document.body.appendChild(overlay);
        document.body.appendChild(mobileMenu);

        // State
        let isMenuOpen = false;

        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        };

        // Event Listeners
        mobileToggle.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        
        ul.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if(isMenuOpen) toggleMenu();
            });
        });
    }
});
