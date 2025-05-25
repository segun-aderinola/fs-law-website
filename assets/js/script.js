/**
 * FS Law - Consolidated JavaScript
 * Main script file for all pages
 */

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP and ScrollTrigger
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initializeAnimations();
    }
    
    // Initialize other functionality
    initializeScrollReveal();
    initializeBackToTop();
    initializeSmoothScrolling();
});

/**
 * Initialize GSAP Animations
 */
function initializeAnimations() {
    // Animate elements with .animate-fadeInUp class
    gsap.utils.toArray('.animate-fadeInUp').forEach(element => {
        gsap.from(element, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // Animate service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 50,
            scale: 0.95
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate accordion items
    gsap.utils.toArray('.accordion-item').forEach((item, i) => {
        gsap.fromTo(item, {
            opacity: 0,
            x: -30
        }, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate team cards
    gsap.utils.toArray('.team-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 60
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate feature cards
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 40
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate values cards
    gsap.utils.toArray('.values-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Counter animation for statistics
    gsap.utils.toArray('.stat-number').forEach(counter => {
        const target = parseInt(counter.textContent);
        if (!isNaN(target)) {
            gsap.fromTo(counter, {
                textContent: 0
            }, {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    });
}

/**
 * Initialize Scroll Reveal using Intersection Observer
 */
function initializeScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize Back to Top Button
 */
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', throttle(() => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('opacity-0', 'translate-y-10');
                backToTopBtn.classList.add('opacity-100', 'translate-y-0');
            } else {
                backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
                backToTopBtn.classList.add('opacity-0', 'translate-y-10');
            }
        }, 100));
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize Smooth Scrolling for Anchor Links
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Utility Functions
 */

// Throttle function to limit function calls
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function to delay function calls
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Additional Utility Functions for Enhanced UX
 */

// Initialize form validation (if forms exist)
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Remove error styling when user starts typing
                    field.addEventListener('input', function() {
                        this.classList.remove('border-red-500');
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Show error message or focus first invalid field
                const firstInvalid = form.querySelector('.border-red-500');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        });
    });
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButtons = document.querySelectorAll('[data-mobile-menu-toggle]');
    
    mobileMenuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menu = document.querySelector('[data-mobile-menu]');
            if (menu) {
                menu.classList.toggle('hidden');
            }
        });
    });
}

// Initialize lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize accessibility features
function initializeAccessibility() {
    // Add keyboard navigation for custom elements
    document.querySelectorAll('[role="button"]').forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add focus management for modals
    document.querySelectorAll('[data-modal]').forEach(modal => {
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close modal logic here
                this.style.display = 'none';
            }
        });
    });
}

// Initialize all additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeFormValidation();
    initializeMobileMenu();
    initializeLazyLoading();
    initializeAccessibility();
});

// Handle window resize events
window.addEventListener('resize', debounce(function() {
    // Refresh ScrollTrigger on resize if GSAP is available
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}, 250));

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations or videos when page is hidden
        if (typeof gsap !== 'undefined') {
            gsap.globalTimeline.pause();
        }
    } else {
        // Resume animations when page becomes visible
        if (typeof gsap !== 'undefined') {
            gsap.globalTimeline.resume();
        }
    }
});

// Export functions for external use if needed
window.FSLaw = {
    initializeAnimations,
    initializeScrollReveal,
    initializeBackToTop,
    initializeSmoothScrolling,
    throttle,
    debounce
};