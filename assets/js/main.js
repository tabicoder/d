/**
 * TABISH ALI PORTFOLIO - MAIN JAVASCRIPT
 * Advanced interactive functionality and animations
 */

// Global variables
let isPreloaderVisible = true;
let currentTheme = localStorage.getItem('theme') || 'light';
let typingIndex = 0;
let typingTexts = [
    'Creative Developer',
    'UI/UX Designer', 
    'Digital Innovator',
    'Problem Solver'
];
let isTyping = false;

// DOM Elements
const preloader = document.getElementById('preloader');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const typingElement = document.querySelector('.typing-text');
const progressPercentage = document.querySelector('.progress-percentage');
const progressBar = document.querySelector('.progress-bar');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    initializePreloader();
    initializeNavigation();
    initializeTheme();
    initializeCursor();
    initializeAnimations();
    initializeTyping();
    initializeScrollEffects();
    initializeCounters();
    initializeSkills();
    initializeParticles();
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
}

/**
 * Initialize preloader with animations
 */
function initializePreloader() {
    // Check if preloader should be shown (only on first visit)
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (hasVisited) {
        hidePreloader();
        return;
    }
    
    // Animate logo circle
    const logoCircle = document.querySelector('.logo-circle');
    if (logoCircle) {
        logoCircle.style.strokeDashoffset = '0';
    }
    
    // Animate progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressPercentage.textContent = Math.floor(progress) + '%';
        
        if (progressBar) {
            const circumference = 2 * Math.PI * 45; // radius = 45
            const offset = circumference - (progress / 100) * circumference;
            progressBar.style.strokeDashoffset = offset;
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                hidePreloader();
                localStorage.setItem('hasVisited', 'true');
            }, 500);
        }
    }, 100);
}

/**
 * Hide preloader with animation
 */
function hidePreloader() {
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
            isPreloaderVisible = false;
        }, 500);
    }
}

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Active section detection
    window.addEventListener('scroll', updateActiveSection);
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

/**
 * Handle navigation link clicks
 */
function handleNavClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}

/**
 * Handle navbar scroll effects
 */
function handleNavbarScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/**
 * Update active section in navigation
 */
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section's nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

/**
 * Initialize theme functionality
 */
function initializeTheme() {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Theme toggle event
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            currentTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
        }
    });
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Animate theme icon
    const themeIcon = themeToggle.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeIcon.style.transform = 'rotate(0deg)';
            themeIcon.className = currentTheme === 'light' ? 'fas fa-moon theme-icon' : 'fas fa-sun theme-icon';
        }, 300);
    }
}

/**
 * Initialize custom cursor
 */
function initializeCursor() {
    // Only show custom cursor on desktop
    if (window.innerWidth <= 1024) {
        if (cursor) cursor.style.display = 'none';
        return;
    }
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .social-link');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorOutline.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        });
    });
    
    // Cursor click effects
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        cursorOutline.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
        cursorOutline.classList.remove('click');
    });
}

/**
 * Initialize animations
 */
function initializeAnimations() {
    // Hero section animations
    animateHeroElements();
    
    // Floating elements animation
    animateFloatingElements();
    
    // Skill badges animation
    animateSkillBadges();
}

/**
 * Animate hero section elements
 */
function animateHeroElements() {
    const heroShapes = document.querySelectorAll('.shape');
    heroShapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Animate hero SVG elements
    const svgElements = document.querySelectorAll('.hero-svg .floating-element');
    svgElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

/**
 * Animate floating elements
 */
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(element => {
        // Add random floating animation
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
    });
}

/**
 * Animate skill badges
 */
function animateSkillBadges() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.5}s`;
        
        // Add hover effect
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'scale(1.1) translateY(-5px)';
            badge.style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.3)';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'scale(1) translateY(0)';
            badge.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });
}

/**
 * Initialize typing animation
 */
function initializeTyping() {
    if (!typingElement) return;
    
    setTimeout(() => {
        startTypingAnimation();
    }, 2000);
}

/**
 * Start typing animation
 */
function startTypingAnimation() {
    if (isTyping) return;
    
    isTyping = true;
    typeText(typingTexts[typingIndex], () => {
        setTimeout(() => {
            deleteText(() => {
                typingIndex = (typingIndex + 1) % typingTexts.length;
                isTyping = false;
                setTimeout(() => {
                    startTypingAnimation();
                }, 1000);
            });
        }, 2000);
    });
}

/**
 * Type text character by character
 */
function typeText(text, callback) {
    let index = 0;
    const cursor = typingElement.querySelector('.typing-cursor');
    
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            typingElement.textContent = text.substring(0, index + 1);
            typingElement.appendChild(cursor);
            index++;
        } else {
            clearInterval(typeInterval);
            if (callback) callback();
        }
    }, 100);
}

/**
 * Delete text character by character
 */
function deleteText(callback) {
    let text = typingElement.textContent.replace('|', '');
    let index = text.length;
    
    const deleteInterval = setInterval(() => {
        if (index > 0) {
            typingElement.textContent = text.substring(0, index - 1);
            typingElement.appendChild(document.createElement('span')).textContent = '|';
            typingElement.lastElementChild.className = 'typing-cursor';
            index--;
        } else {
            clearInterval(deleteInterval);
            if (callback) callback();
        }
    }, 50);
}

/**
 * Initialize scroll effects
 */
function initializeScrollEffects() {
    // Parallax effect for hero shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat-item, .timeline-item, .skill-badge');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize counter animations
 */
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Initialize skills section functionality
 */
function initializeSkills() {
    initializeSkillsFilter();
    initializeSkillsProgress();
}

/**
 * Initialize skills filter functionality
 */
function initializeSkillsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillItems = document.querySelectorAll('.skill-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter skill items
            skillItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 100);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Initialize skills progress bar animations
 */
function initializeSkillsProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target;
                const width = progressFill.getAttribute('data-width');
                
                setTimeout(() => {
                    progressFill.style.width = width + '%';
                }, 500);
                
                progressObserver.unobserve(progressFill);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

/**
 * Animate counter from 0 to target value
 */
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target >= 1000 ? '+' : '');
    }, 16);
}

/**
 * Initialize particle systems
 */
function initializeParticles() {
    // Preloader particles
    initializePreloaderParticles();
    
    // Hero particles
    initializeHeroParticles();
}

/**
 * Initialize preloader particles
 */
function initializePreloaderParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
            ctx.fill();
        });
        
        if (isPreloaderVisible) {
            requestAnimationFrame(animateParticles);
        }
    }
    
    animateParticles();
}

/**
 * Initialize hero particles
 */
function initializeHeroParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 30;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.3 + 0.1,
            color: ['#6366F1', '#8B5CF6', '#EC4899'][Math.floor(Math.random() * 3)]
        });
    }
    
    function animateHeroParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateHeroParticles);
    }
    
    animateHeroParticles();
}

/**
 * Handle window resize
 */
window.addEventListener('resize', () => {
    // Update canvas sizes
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Hide/show custom cursor based on screen size
    if (window.innerWidth <= 1024) {
        if (cursor) cursor.style.display = 'none';
    } else {
        if (cursor) cursor.style.display = 'block';
    }
});

/**
 * Handle button ripple effects
 */
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        const ripple = button.querySelector('.btn-ripple');
        
        if (ripple) {
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            
            setTimeout(() => {
                ripple.style.width = '300px';
                ripple.style.height = '300px';
            }, 10);
        }
    }
});

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Add loading states to external links
 */
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        // Add loading indicator
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 1000);
    });
});

/**
 * Initialize form validation (for future contact form)
 */
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('Message sent successfully!', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#6366F1'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * Initialize lazy loading for images
 */
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

/**
 * Performance optimization: Throttle scroll events
 */
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    handleNavbarScroll();
    updateActiveSection();
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

/**
 * Initialize tooltips
 */
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.dataset.tooltip;
    
    tooltip.style.cssText = `
        position: absolute;
        background: var(--dark);
        color: var(--white);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    e.target._tooltip = tooltip;
}

function hideTooltip(e) {
    if (e.target._tooltip) {
        e.target._tooltip.style.opacity = '0';
        setTimeout(() => {
            if (e.target._tooltip && e.target._tooltip.parentNode) {
                e.target._tooltip.parentNode.removeChild(e.target._tooltip);
            }
        }, 300);
    }
}

// Initialize tooltips when DOM is ready
document.addEventListener('DOMContentLoaded', initializeTooltips);

/**
 * Add loading animation for external resources
 */
function showLoadingState(element) {
    element.style.opacity = '0.5';
    element.style.pointerEvents = 'none';
    
    const loader = document.createElement('div');
    loader.className = 'loading-spinner';
    loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    loader.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: var(--primary);
    `;
    
    element.style.position = 'relative';
    element.appendChild(loader);
}

function hideLoadingState(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
    
    const loader = element.querySelector('.loading-spinner');
    if (loader) {
        loader.remove();
    }
}

/**
 * Initialize error handling
 */
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send error to analytics service
});

/**
 * Initialize service worker for PWA features
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

/**
 * Add Easter egg: Konami code
 */
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Add special animation or effect
    document.body.style.animation = 'rainbow 2s infinite';
    
    showNotification('🎉 Easter egg activated! You found the secret!', 'success');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
}

// Add rainbow animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('🚀 Tabish Ali Portfolio loaded successfully!');
console.log('💡 Try the Konami code for a surprise!');