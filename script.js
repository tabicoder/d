// Global Variables
let isLoading = true;
let isAODActive = false;
let idleTimer = null;
let lastScrollPosition = 0;
let currentSection = 'hero';

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');
const aodScreen = document.getElementById('aod-screen');
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Start loading animation
    startLoadingAnimation();
    
    // Initialize components
    initializeCursor();
    initializeNavigation();
    initializeScrollEffects();
    initializeTypingAnimation();
    initializeSkillBars();
    initializePortfolioFilters();
    initializeContactForm();
    initializeAOD();
    initializeParticles();
    
    // Set up event listeners
    setupEventListeners();
}

// Loading Animation
function startLoadingAnimation() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const initials = document.getElementById('initials');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        progressText.textContent = Math.floor(progress) + '%';
        
        // Add glitch effect to initials
        if (progress > 50 && progress < 60) {
            initials.style.animation = 'glitch 0.1s infinite';
        } else {
            initials.style.animation = 'pulse 2s infinite';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                mainContent.classList.add('loaded');
                isLoading = false;
                createParticles();
            }, 500);
        }
    }, 100);
}

// Custom Cursor
function initializeCursor() {
    document.addEventListener('mousemove', (e) => {
        if (isLoading) return;
        
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX - 20 + 'px';
        cursorFollower.style.top = e.clientY - 20 + 'px';
    });
    
    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .skill-item, .timeline-content, .contact-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(0, 255, 245, 0.3)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        });
    });
}

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop.style.display = 'flex';
        } else {
            navbar.classList.remove('scrolled');
            backToTop.style.display = 'none';
        }
        
        // Update active navigation
        updateActiveNavigation();
    });
    
    // Back to top button
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll reveal
    const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .timeline-item, .skill-item, .contact-card');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Typing Animation
function initializeTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const texts = [
        'HTML/CSS Developer',
        'Computer Operator',
        'UI Enthusiast',
        'Frontend Specialist'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Start typing animation after loading
    setTimeout(typeText, 2000);
}

// Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Portfolio Filters
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            const filter = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Contact Form
function initializeContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset button
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Form validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrors);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error
    clearErrors(e);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function clearErrors(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderColor = '';
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ff6b6b';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
    field.style.borderColor = '#ff6b6b';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff41' : type === 'error' ? '#ff6b6b' : '#00fff5'};
        color: #0a192f;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Always-On Display
function initializeAOD() {
    // Reset idle timer on any user interaction
    const resetIdleTimer = () => {
        if (isAODActive) {
            exitAOD();
        }
        clearTimeout(idleTimer);
        idleTimer = setTimeout(activateAOD, 60000); // 60 seconds
    };
    
    // Set up event listeners for user activity
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
        document.addEventListener(event, resetIdleTimer, true);
    });
    
    // Start the idle timer
    resetIdleTimer();
    
    // Update AOD clock
    updateAODClock();
    setInterval(updateAODClock, 1000);
}

function activateAOD() {
    if (isLoading) return;
    
    lastScrollPosition = window.scrollY;
    isAODActive = true;
    
    // Create AOD particles
    createAODParticles();
    
    // Show AOD screen
    aodScreen.classList.add('active');
    
    // Hide main content
    mainContent.style.opacity = '0';
    
    // Disable scrolling
    document.body.style.overflow = 'hidden';
}

function exitAOD() {
    if (!isAODActive) return;
    
    isAODActive = false;
    
    // Hide AOD screen
    aodScreen.classList.remove('active');
    
    // Show main content
    mainContent.style.opacity = '1';
    
    // Enable scrolling
    document.body.style.overflow = 'auto';
    
    // Restore scroll position
    window.scrollTo(0, lastScrollPosition);
    
    // Clear AOD particles
    const aodParticles = document.getElementById('aod-particles');
    aodParticles.innerHTML = '';
}

function updateAODClock() {
    const timeElement = document.getElementById('aod-time');
    const dateElement = document.getElementById('aod-date');
    
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const date = now.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    if (timeElement) timeElement.textContent = time;
    if (dateElement) dateElement.textContent = date;
}

function createAODParticles() {
    const container = document.getElementById('aod-particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'aod-star';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(particle);
    }
}

// Particle System
function initializeParticles() {
    // This will be called after loading is complete
}

function createParticles() {
    const container = document.getElementById('hero-particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        container.appendChild(particle);
    }
}

// Event Listeners
function setupEventListeners() {
    // Prevent context menu on right click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Recalculate any size-dependent elements
        if (isAODActive) {
            exitAOD();
        }
    });
    
    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isAODActive) {
            exitAOD();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape key to exit AOD
        if (e.key === 'Escape' && isAODActive) {
            exitAOD();
        }
        
        // Space key to pause/resume animations
        if (e.key === ' ' && !isLoading) {
            e.preventDefault();
            toggleAnimations();
        }
    });
}

function toggleAnimations() {
    const animatedElements = document.querySelectorAll('*');
    animatedElements.forEach(el => {
        if (el.style.animationPlayState === 'paused') {
            el.style.animationPlayState = 'running';
        } else {
            el.style.animationPlayState = 'paused';
        }
    });
}

// Utility Functions
function debounce(func, wait) {
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
    };
}

// Performance optimization
const optimizedScrollHandler = throttle(() => {
    updateActiveNavigation();
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Easter egg - Konami code
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
        triggerEasterEgg();
        konamiCode = [];
    }
});

function triggerEasterEgg() {
    // Create rainbow effect
    const rainbow = document.createElement('div');
    rainbow.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, 
            #ff0000, #ff7f00, #ffff00, #00ff00, 
            #0000ff, #4b0082, #9400d3
        );
        z-index: 10000;
        pointer-events: none;
        animation: rainbowFade 3s ease-out forwards;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbowFade {
            0% { opacity: 0; }
            50% { opacity: 0.3; }
            100% { opacity: 0; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(rainbow);
    
    // Show message
    showNotification('🎉 Konami Code activated! You found the secret!', 'success');
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(rainbow);
        document.head.removeChild(style);
    }, 3000);
}

// Initialize everything when DOM is loaded
console.log('🚀 Tabish Ali Portfolio - Initialized Successfully!');
console.log('💡 Try the Konami code for a surprise!');
console.log('🌙 AOD activates after 60 seconds of inactivity');