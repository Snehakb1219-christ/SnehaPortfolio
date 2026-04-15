// Multi-Page Navigation System
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon();
}

// Theme toggle function
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Update icon
        updateThemeIcon();
        
        // Add animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Function to show specific page
function showPage(pageId) {
    // Remove active class from all pages
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.opacity = '0';
    });
    
    // Add active class to selected page with delay for animation
    setTimeout(() => {
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            setTimeout(() => {
                targetPage.style.opacity = '1';
            }, 50);
        }
    }, 100);
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu if open
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Update URL hash
    window.location.hash = pageId;
}

// Navigation link click handlers
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        showPage(pageId);
    });
});

// Logo click handler
const logoLink = document.querySelector('.logo');
if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('home');
    });
}

// Hero button click handlers
document.querySelectorAll('.btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
        const pageId = btn.getAttribute('data-page');
        showPage(pageId);
    });
});

// Hamburger menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Handle initial page load based on URL hash
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    } else {
        showPage('home');
    }
    
    // Create particles
    createParticles();
    
    // Animate skill bars when skills page is shown
    animateSkillBars();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize scroll progress bar
    initScrollProgress();
});

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Handle browser back/forward buttons
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    }
});

// Particle Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(99, 102, 241, ${Math.random() * 0.3})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(10px, -15px);
            }
            50% {
                transform: translate(-15px, -25px);
            }
            75% {
                transform: translate(-20px, 10px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Animate skill bars
function animateSkillBars() {
    const skillsPage = document.getElementById('skills');
    if (!skillsPage) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.style.width || '0%';
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 50);
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillsPage);
}

// Enhanced scroll reveal with stagger effect
function initScrollAnimations() {
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    document.querySelectorAll('.timeline-item, .project-card, .stat-card, .exp-card, .info-card, .hobby-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        animateOnScroll.observe(el);
    });
}

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && !this.hasAttribute('data-page')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.transform = 'translateY(0)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
    }
    
    // Hide navbar on scroll down, show on scroll up (mobile)
    if (window.innerWidth <= 768) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    lastScroll = currentScroll;
});

// Add smooth reveal for page transitions
function addPageTransition() {
    pages.forEach(page => {
        page.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
}

// Typing effect for hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle && window.location.hash === '' || window.location.hash === '#home') {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);
}
