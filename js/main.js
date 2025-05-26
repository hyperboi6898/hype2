// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                nav.style.display = 'block';
            } else {
                nav.style.display = 'none';
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    nav.style.display = 'none';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.feature-card, .blog-card, .about-content, .hero-content, .hero-image');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (elementPosition.top < windowHeight * 0.8) {
                element.classList.add('animate');
            }
        });
    }
    
    // Add animation classes to CSS
    const styleSheet = document.styleSheets[0];
    const animationRules = `
        .feature-card, .blog-card, .about-content > div, .hero-content, .hero-image {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .feature-card.animate, .blog-card.animate, .about-content > div.animate, .hero-content.animate, .hero-image.animate {
            opacity: 1;
            transform: translateY(0);
        }
        .feature-card:nth-child(2), .blog-card:nth-child(2), .about-content > div:nth-child(2) {
            transition-delay: 0.2s;
        }
        .feature-card:nth-child(3), .blog-card:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
    
    if (styleSheet.insertRule) {
        styleSheet.insertRule(animationRules, styleSheet.cssRules.length);
    } else if (styleSheet.addRule) {
        styleSheet.addRule(animationRules, -1);
    }
    
    // Check elements on load and scroll
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
    
    // Initialize animations
    checkIfInView();
});
