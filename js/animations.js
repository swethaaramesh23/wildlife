document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- Hero Parallax & Layers ---
        const heroTl = gsap.timeline();
        
        // Parallax depth effect on mouse move
        const heroGrid = document.querySelector('.hero');
        if (heroGrid) {
            heroGrid.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                
                const percentX = (clientX - centerX) / centerX;
                const percentY = (clientY - centerY) / centerY;
                
                gsap.utils.toArray('.hero-layer, .hero-layer-front').forEach(layer => {
                    const depth = parseFloat(layer.getAttribute('data-depth')) || 0;
                    gsap.to(layer, {
                        x: percentX * depth * 50,
                        y: percentY * depth * 50,
                        duration: 1,
                        ease: "power2.out"
                    });
                });
            });

            // Cinematic Ken Burns Background
            gsap.to('.hero-layer-bg img', {
                scale: 1.15,
                duration: 20,
                ease: 'none',
                repeat: -1,
                yoyo: true
            });

            // Particles System
            const particlesContainer = document.getElementById('particles');
            if (particlesContainer) {
                for(let i = 0; i < 30; i++) {
                    const particle = document.createElement('div');
                    particle.style.position = 'absolute';
                    particle.style.width = Math.random() * 4 + 1 + 'px';
                    particle.style.height = particle.style.width;
                    particle.style.background = 'rgba(255, 255, 255, 0.5)';
                    particle.style.borderRadius = '50%';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 100 + '%';
                    particle.style.filter = 'blur(1px)';
                    particlesContainer.appendChild(particle);

                    gsap.to(particle, {
                        y: `-${Math.random() * 100 + 50}px`,
                        x: `+=${Math.random() * 40 - 20}px`,
                        opacity: 0,
                        duration: Math.random() * 5 + 3,
                        repeat: -1,
                        ease: "none",
                        delay: Math.random() * 5
                    });
                }
            }
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

        // --- 3D Hover Tilt Effect ---
        const tiltWrappers = document.querySelectorAll('.tilt-wrapper');
        tiltWrappers.forEach(wrapper => {
            const tiltElement = wrapper.querySelector('.tilt-element');
            if(!tiltElement) return;

            wrapper.addEventListener('mousemove', (e) => {
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg
                const rotateY = ((x - centerX) / centerX) * 15;

                gsap.to(tiltElement, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });

            wrapper.addEventListener('mouseleave', () => {
                gsap.to(tiltElement, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });

        // --- Timeline Animations Removed ---
        // (Expeditions section reverted to a horizontal stagger grid)

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
