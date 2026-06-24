document.addEventListener('DOMContentLoaded', () => {
    // Cinematic Preloader Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        document.body.style.overflow = 'hidden'; // Lock scroll
        const loadingText = document.getElementById('loading-text');
        const shutterFlash = document.getElementById('shutter-flash');
        
        const textSequence = ["Exploring the Wild...", "Capturing Nature...", "Loading Adventure..."];
        let textIndex = 0;
        
        const triggerFlash = () => {
            shutterFlash.classList.remove('flash-active');
            void shutterFlash.offsetWidth; // trigger reflow
            shutterFlash.classList.add('flash-active');
        };

        const textInterval = setInterval(() => {
            textIndex++;
            if (textIndex < textSequence.length) {
                loadingText.style.animation = 'none';
                void loadingText.offsetWidth; // trigger reflow
                loadingText.textContent = textSequence[textIndex];
                loadingText.style.animation = 'text-fade-in-out 0.8s forwards';
                triggerFlash();
            }
        }, 800);

        setTimeout(() => {
            clearInterval(textInterval);
            triggerFlash();
            setTimeout(() => {
                preloader.classList.add('exit');
                document.body.style.overflow = ''; // Unlock scroll
                setTimeout(() => { preloader.remove(); }, 1000);
            }, 200);
        }, 2400);
    }

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
        const hoverElements = document.querySelectorAll('a, button, .hover-target, .masonry-item, .collection-card, .lightbox-trigger');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
                cursorOutline.style.width = '80px';
                cursorOutline.style.height = '80px';
                cursorOutline.style.backgroundColor = 'rgba(203, 163, 88, 0.1)';
                cursorOutline.style.borderColor = 'rgba(203, 163, 88, 0.8)';
                cursorDot.style.width = '0px';
                cursorDot.style.height = '0px';
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
                cursorOutline.style.width = '50px';
                cursorOutline.style.height = '50px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = 'rgba(203, 163, 88, 0.4)';
                cursorDot.style.width = '8px';
                cursorDot.style.height = '8px';
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

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        
        document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const img = trigger.querySelector('img');
                const caption = trigger.querySelector('.item-overlay span')?.textContent || trigger.querySelector('img').alt;
                
                if(img) {
                    lightboxImg.src = img.src;
                    lightboxCaption.textContent = caption;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => { lightboxImg.src = ''; }, 500); // clear after transition
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
        });
    }
});
