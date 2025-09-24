// Advanced animations and effects
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.initTypewriterEffect();
        this.initParticleSystem();
        this.initGradientOrbs();
        this.initScrollReveal();
        this.initCounterAnimations();
        this.initProgressBars();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: [0.1, 0.5, 0.9],
            rootMargin: '-50px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target, entry.intersectionRatio);
                }
            });
        }, options);

        // Observe all sections and animated elements
        const elementsToObserve = document.querySelectorAll(
            'section, .project-card, .skill-item, .cert-card, .gallery-item'
        );
        
        elementsToObserve.forEach(el => this.observer.observe(el));
    }

    triggerAnimation(element, ratio) {
        const animationType = element.dataset.animation || 'fadeIn';
        
        switch (animationType) {
            case 'slideUp':
                this.slideUpAnimation(element);
                break;
            case 'slideLeft':
                this.slideLeftAnimation(element);
                break;
            case 'slideRight':
                this.slideRightAnimation(element);
                break;
            case 'scale':
                this.scaleAnimation(element);
                break;
            default:
                this.fadeInAnimation(element);
        }
    }

    fadeInAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    slideUpAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    slideLeftAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    slideRightAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    scaleAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid var(--primary-color)';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Blinking cursor animation
                    setInterval(() => {
                        element.style.borderRight = element.style.borderRight === 'none' 
                            ? '2px solid var(--primary-color)' 
                            : 'none';
                    }, 500);
                }
            };
            
            setTimeout(typeWriter, 1000);
        });
    }

    initParticleSystem() {
        const particleContainer = document.querySelector('.particles');
        if (!particleContainer) return;

        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background-color: rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                animation: particle-float ${Math.random() * 10 + 8}s linear infinite;
                animation-delay: ${Math.random() * 8}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    initGradientOrbs() {
        const orbs = document.querySelectorAll('.gradient-orb');
        
        orbs.forEach((orb, index) => {
            const moveOrb = () => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                const scale = Math.random() * 0.5 + 0.8;
                
                orb.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            };
            
            // Initial random position
            moveOrb();
            
            // Move every 10 seconds
            setInterval(moveOrb, 10000 + index * 2000);
        });
    }

    initScrollReveal() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);
                }
            });
        }, { threshold: 0.2 });
        
        revealElements.forEach(el => {
            el.classList.add('reveal-element');
            revealObserver.observe(el);
        });
    }

    initCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        const animateCounter = (element) => {
            const target = parseInt(element.dataset.target);
            const duration = parseInt(element.dataset.duration) || 2000;
            const increment = target / (duration / 16);
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }

    initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const animateProgress = (bar) => {
            const fill = bar.querySelector('.progress-fill');
            const percentage = bar.dataset.percentage || 0;
            
            setTimeout(() => {
                fill.style.width = `${percentage}%`;
            }, 500);
        };
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgress(entry.target);
                    progressObserver.unobserve(entry.target);
                }
            });
        });
        
        progressBars.forEach(bar => progressObserver.observe(bar));
    }
}

// Mouse follower effect
class MouseFollower {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'mouse-follower';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(59, 130, 246, 0.3);
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(this.cursor);
        
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            this.cursor.style.opacity = '1';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });

        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.cursor.style.background = 'rgba(59, 130, 246, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                this.cursor.style.background = 'rgba(59, 130, 246, 0.3)';
            });
        });
    }
}

// Smooth page transitions
class PageTransitions {
    constructor() {
        this.init();
    }

    init() {
        // Add page transition overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'page-transition';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            z-index: 10000;
            transform: translateY(-100%);
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        document.body.appendChild(this.overlay);
        
        this.setupTransitions();
    }

    setupTransitions() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                
                this.transitionTo(target);
            });
        });
    }

    transitionTo(target) {
        // Show overlay
        this.overlay.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            // Scroll to target
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Hide overlay
            setTimeout(() => {
                this.overlay.style.transform = 'translateY(-100%)';
            }, 300);
        }, 300);
    }
}

// Advanced scroll effects
class ScrollEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupParallax();
        this.setupScrollTriggers();
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.parallax || 0.5;
                const yPos = -(scrollY * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupScrollTriggers() {
        const triggers = document.querySelectorAll('[data-scroll-trigger]');
        
        const triggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const trigger = entry.target.dataset.scrollTrigger;
                
                if (entry.isIntersecting) {
                    document.documentElement.classList.add(trigger);
                } else {
                    document.documentElement.classList.remove(trigger);
                }
            });
        }, { threshold: 0.5 });
        
        triggers.forEach(trigger => triggerObserver.observe(trigger));
    }
}

// Initialize all animation systems
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    
    // Initialize mouse follower only on desktop
    if (window.innerWidth > 768) {
        new MouseFollower();
    }
    
    new PageTransitions();
    new ScrollEffects();
});

// Add CSS for reveal animations
const animationStyles = `
    .reveal-element {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .reveal-element.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .progress-fill {
        width: 0;
        transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);