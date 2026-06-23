document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- Hero Animations ---
        const heroTl = gsap.timeline();
        
        // Parallax Background
        gsap.to('.parallax-bg', {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Hero Text Reveal
        heroTl.fromTo('.reveal-text', 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5 }
        );

        // Silhouettes floating
        gsap.to('.silhouette', {
            y: -30,
            x: 20,
            duration: 4,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        // --- Scroll Animations ---
        
        // Fade Up Elements
        const fadeUpElements = gsap.utils.toArray('.fade-up');
        fadeUpElements.forEach(el => {
            gsap.fromTo(el, 
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Fade Right Elements
        const fadeRightElements = gsap.utils.toArray('.fade-right');
        fadeRightElements.forEach(el => {
            gsap.fromTo(el, 
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Parallax Image (About Section)
        gsap.to('.parallax-img img', {
            y: '15%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-preview',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
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
                        const target = +stat.getAttribute('data-target');
                        gsap.to(stat, {
                            innerHTML: target,
                            duration: 2.5,
                            snap: { innerHTML: 1 },
                            ease: "power1.out",
                            onUpdate: function() {
                                stat.innerHTML = Math.round(this.targets()[0].innerHTML).toLocaleString() + "+";
                            }
                        });
                    });
                }
            });
        }
    }
});
