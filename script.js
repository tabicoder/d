// ===================================
// MAGIC BENTO UI - JAVASCRIPT
// Portfolio Website for Tabish Ali
// ===================================

// ===== GLOBAL VARIABLES =====
let currentTestimonial = 0;
const particles = [];
let cursorX = 0;
let cursorY = 0;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
  initCursorSpotlight();
  initScrollAnimations();
  initCardHoverEffects();
  initCounterAnimations();
  initTestimonialCarousel();
  initContactForm();
  initProjectFilters();
  initParticleSystem();
  initNavHighlight();
});

// ===== MOBILE MENU =====
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const menuOverlay = document.querySelector('.mobile-menu-overlay');
  const menuClose = document.querySelector('.mobile-menu-close');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

  if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', () => {
      menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    menuClose?.addEventListener('click', closeMenu);

    mobileNavItems.forEach(item => {
      item.addEventListener('click', closeMenu);
    });

    function closeMenu() {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== CURSOR SPOTLIGHT =====
function initCursorSpotlight() {
  const spotlight = document.querySelector('.cursor-spotlight');
  
  if (!spotlight) return;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    spotlight.style.left = `${cursorX}px`;
    spotlight.style.top = `${cursorY}px`;
  });

  // Update glow position on bento cards
  const bentoCards = document.querySelectorAll('.bento-card');
  
  bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--glow-x', `${x}%`);
      card.style.setProperty('--glow-y', `${y}%`);
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with animation
  const animatedElements = document.querySelectorAll(`
    .bento-card,
    .timeline-card,
    .section-header,
    .about-text,
    .project-card,
    .service-card
  `);

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
}

// ===== CARD HOVER EFFECTS =====
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.bento-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      createParticles(card);
    });

    card.addEventListener('mouseleave', () => {
      removeParticles(card);
    });

    // Tilt effect (optional)
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      // Subtle tilt - can be disabled
      // card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ===== PARTICLE SYSTEM =====
function initParticleSystem() {
  // Particles are created dynamically on hover
}

function createParticles(card) {
  const particleCount = 12;
  const rect = card.getBoundingClientRect();
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'hover-particle';
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(132, 0, 255, 1);
      border-radius: 50%;
      box-shadow: 0 0 6px rgba(132, 0, 255, 0.6);
      pointer-events: none;
      z-index: 10;
    `;
    
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    card.appendChild(particle);
    
    animateParticle(particle);
  }
}

function animateParticle(particle) {
  const duration = 2000 + Math.random() * 2000;
  const moveX = (Math.random() - 0.5) * 100;
  const moveY = (Math.random() - 0.5) * 100;
  
  particle.animate([
    {
      transform: 'translate(0, 0) rotate(0deg)',
      opacity: 0.3
    },
    {
      transform: `translate(${moveX}px, ${moveY}px) rotate(360deg)`,
      opacity: 1
    },
    {
      transform: `translate(${moveX * 2}px, ${moveY * 2}px) rotate(720deg)`,
      opacity: 0
    }
  ], {
    duration: duration,
    iterations: Infinity,
    easing: 'linear'
  });
}

function removeParticles(card) {
  const particles = card.querySelectorAll('.hover-particle');
  particles.forEach(particle => {
    particle.style.transition = 'opacity 0.3s ease';
    particle.style.opacity = '0';
    setTimeout(() => particle.remove(), 300);
  });
}

// ===== COUNTER ANIMATIONS =====
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.floor(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, duration / steps);
}

// ===== TESTIMONIAL CAROUSEL =====
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const leftArrow = document.querySelector('.arrow-left');
  const rightArrow = document.querySelector('.arrow-right');
  
  if (!track || cards.length === 0) return;

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 24; // Include gap
  let autoplayInterval;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Arrow navigation
  leftArrow?.addEventListener('click', () => {
    prevSlide();
    stopAutoplay();
    startAutoplay();
  });

  rightArrow?.addEventListener('click', () => {
    nextSlide();
    stopAutoplay();
    startAutoplay();
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
      stopAutoplay();
      startAutoplay();
    });
  });

  // Touch/swipe support
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoplay();
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      isDragging = false;
    }
  });

  track.addEventListener('touchend', () => {
    isDragging = false;
    startAutoplay();
  });

  // Pause on hover
  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);

  // Start autoplay
  startAutoplay();
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm(form)) {
      return;
    }

    // Get form data
    const formData = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value
    };

    // Submit button
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.classList.add('success');
      submitBtn.querySelector('.btn-text').textContent = 'Message Sent! ✓';
      submitBtn.style.background = 'linear-gradient(135deg, #00c853, #64dd17)';
      
      // Reset form
      form.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.classList.remove('success');
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
      
      console.log('Form submitted:', formData);
    }, 2000);
  });

  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
    
    input.addEventListener('input', () => {
      if (input.parentElement.classList.contains('error')) {
        validateField(input);
      }
    });
  });
}

function validateForm(form) {
  let isValid = true;
  
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField(field) {
  const formGroup = field.parentElement;
  const errorMessage = formGroup.querySelector('.error-message');
  
  // Clear previous error
  formGroup.classList.remove('error');
  
  // Check if empty
  if (!field.value.trim()) {
    showError(formGroup, errorMessage, 'This field is required');
    return false;
  }
  
  // Email validation
  if (field.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      showError(formGroup, errorMessage, 'Please enter a valid email');
      return false;
    }
  }
  
  return true;
}

function showError(formGroup, errorElement, message) {
  formGroup.classList.add('error');
  if (errorElement) {
    errorElement.textContent = message;
  }
  
  // Shake animation
  formGroup.animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(-10px)' },
    { transform: 'translateX(10px)' },
    { transform: 'translateX(-10px)' },
    { transform: 'translateX(0)' }
  ], {
    duration: 400,
    easing: 'ease-in-out'
  });
}

// ===== PROJECT FILTERS =====
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ===== NAVIGATION HIGHLIGHT =====
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');
  
  if (sections.length === 0 || navItems.length === 0) return;

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// ===== CLICK RIPPLE EFFECT =====
function createRipple(e, element) {
  const ripple = document.createElement('div');
  const rect = element.getBoundingClientRect();
  
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(132, 0, 255, 0.3);
    left: ${x}px;
    top: ${y}px;
    pointer-events: none;
    z-index: 1;
  `;
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  
  ripple.animate([
    { transform: 'scale(0)', opacity: 1 },
    { transform: 'scale(1)', opacity: 0 }
  ], {
    duration: 800,
    easing: 'ease-out'
  }).onfinish = () => ripple.remove();
}

// Add ripple to buttons
document.querySelectorAll('.btn, .cta-button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    createRipple(e, btn);
  });
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.background = 'rgba(6, 0, 16, 0.95)';
    header.style.boxShadow = '0 4px 30px rgba(132, 0, 255, 0.1)';
  } else {
    header.style.background = 'rgba(6, 0, 16, 0.85)';
    header.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ===== LAZY LOADING IMAGES =====
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// ===== PROGRESS BAR ANIMATION =====
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  
  progressBars.forEach(bar => observer.observe(bar));
}

initProgressBars();

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    
    // Simulate subscription
    alert(`Thank you for subscribing with: ${email}`);
    newsletterForm.reset();
  });
}

// ===== CTA BUTTON ACTIONS =====
const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary');
ctaButtons.forEach(btn => {
  if (btn.textContent.includes('View') || btn.textContent.includes('Work')) {
    btn.addEventListener('click', () => {
      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (btn.textContent.includes('Talk') || btn.textContent.includes('Hire')) {
    btn.addEventListener('click', () => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
});

// ===== CONSOLE SIGNATURE =====
console.log('%c🚀 Magic Bento UI Portfolio', 'color: #8400FF; font-size: 20px; font-weight: bold;');
console.log('%cDesigned & Developed by Tabish Ali', 'color: #a855f7; font-size: 14px;');
console.log('%cInterested in working together? Let\'s talk!', 'color: #ffffff; font-size: 12px;');

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`⚡ Page loaded in ${(loadTime / 1000).toFixed(2)}s`);
});
