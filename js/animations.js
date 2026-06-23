document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- Hero Animations ---
        const heroTl = gsap.timeline();
        
        // Cinematic Ken Burns Background
        if(document.querySelector('.hero-bg')) {
            gsap.to('.hero-bg img', {
                scale: 1.15,
                duration: 20,
                ease: 'none',
                repeat: -1,
                yoyo: true
            });
        }

        // Hero Text Reveal
        if(document.querySelector('.reveal-text')) {
            heroTl.fromTo('.reveal-text', 
                { y: 60, opacity: 0, filter: 'blur(10px)' },
                { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.5 }
            );
        }

        // --- Generic Scroll Animations ---
        const initScrollAnimations = (selector, fromVars) => {
            const elements = gsap.utils.toArray(selector);
            elements.forEach(el => {
                gsap.fromTo(el, 
                    fromVars,
                    {
                        x: 0, y: 0, opacity: 1, filter: 'blur(0px)', scale: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        };

        initScrollAnimations('.fade-up', { y: 60, opacity: 0 });
        initScrollAnimations('.fade-right', { x: -60, opacity: 0 });
        initScrollAnimations('.fade-left', { x: 60, opacity: 0 });
        initScrollAnimations('.zoom-in', { scale: 0.9, opacity: 0 });
        initScrollAnimations('.blur-reveal', { opacity: 0, filter: 'blur(15px)' });

        // Staggered Animations for Collections/Gallery
        const staggerContainers = document.querySelectorAll('.stagger-container');
        staggerContainers.forEach(container => {
            const items = container.querySelectorAll('.stagger-item');
            if(items.length > 0) {
                gsap.fromTo(items,
                    { y: 50, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: container,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

        // Parallax Image (About Section / General)
        const parallaxImgs = document.querySelectorAll('.parallax-img img');
        parallaxImgs.forEach(img => {
            gsap.to(img, {
                y: '15%',
                ease: 'none',
                scrollTrigger: {
                    trigger: img.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });

        // Animated Statistics
        const stats = document.querySelectorAll('.stat-number');
        if(stats.length > 0) {
            ScrollTrigger.create({
                trigger: '.stats',
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    stats.forEach(stat => {
                        const targetStr = stat.getAttribute('data-target').replace(/,/g, '');
                        const target = +targetStr;
                        const prefix = stat.getAttribute('data-prefix') || '';
                        const suffix = stat.getAttribute('data-suffix') || '+';
                        
                        gsap.to(stat, {
                            innerHTML: target,
                            duration: 2.5,
                            snap: { innerHTML: 1 },
                            ease: "power2.out",
                            onUpdate: function() {
                                stat.innerHTML = prefix + Math.round(this.targets()[0].innerHTML).toLocaleString() + suffix;
                            }
                        });
                    });
                }
            });
        }
    }
});
