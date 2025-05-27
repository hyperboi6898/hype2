// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.primary-nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Blog slider functionality
    initBlogSlider();
    
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
    try {
        // Wait for stylesheets to load
        setTimeout(() => {
            // Find a valid stylesheet
            let styleSheet = null;
            for (let i = 0; i < document.styleSheets.length; i++) {
                try {
                    const ss = document.styleSheets[i];
                    // Test if we can access rules
                    const rules = ss.cssRules || ss.rules;
                    if (rules) {
                        styleSheet = ss;
                        break;
                    }
                } catch (e) {
                    // Skip stylesheets we can't access (like cross-origin ones)
                    continue;
                }
            }
            
            // If no stylesheet found, create one
            if (!styleSheet) {
                const style = document.createElement('style');
                document.head.appendChild(style);
                styleSheet = style.sheet;
            }
            
            // Add each rule individually
            try {
                styleSheet.insertRule('.feature-card, .blog-card, .about-content > div, .hero-content, .hero-image { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }', styleSheet.cssRules.length);
                styleSheet.insertRule('.feature-card.animate, .blog-card.animate, .about-content > div.animate, .hero-content.animate, .hero-image.animate { opacity: 1; transform: translateY(0); }', styleSheet.cssRules.length);
                styleSheet.insertRule('.feature-card:nth-child(2), .blog-card:nth-child(2), .about-content > div:nth-child(2) { transition-delay: 0.2s; }', styleSheet.cssRules.length);
                styleSheet.insertRule('.feature-card:nth-child(3), .blog-card:nth-child(3) { transition-delay: 0.4s; }', styleSheet.cssRules.length);
            } catch (e) {
                console.log('Could not insert animation rules: ' + e.message);
            }
        }, 500); // Wait 500ms for stylesheets to load
    } catch (e) {
        console.log('Animation setup error: ' + e.message);
    }
    
    // Check elements on load and scroll
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
    
    // Initialize animations
    checkIfInView();
    
    // Blog slider functionality
    function initBlogSlider() {
        const sliderContainer = document.querySelector('.blog-slider-container');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');
        const dots = document.querySelectorAll('.slider-dot');
        const blogPosts = document.querySelectorAll('.blog-slider .blog-post');
        
        if (!sliderContainer || !blogPosts.length) return;
        
        let currentSlide = 0;
        const slideWidth = blogPosts[0].offsetWidth + 30; // Width + gap
        const slidesPerView = getVisibleSlides();
        const maxSlides = Math.ceil(blogPosts.length / slidesPerView);
        
        // Set initial width for container
        updateSliderLayout();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            updateSliderLayout();
            goToSlide(currentSlide);
        });
        
        // Previous slide button
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                goToSlide(currentSlide - 1);
            });
        }
        
        // Next slide button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                goToSlide(currentSlide + 1);
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                goToSlide(index);
            });
        });
        
        // Auto slide every 5 seconds
        let autoSlideInterval = setInterval(function() {
            goToSlide(currentSlide + 1);
        }, 5000);
        
        // Pause auto slide on hover
        sliderContainer.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', function() {
            autoSlideInterval = setInterval(function() {
                goToSlide(currentSlide + 1);
            }, 5000);
        });
        
        // Go to specific slide
        function goToSlide(slideIndex) {
            // Handle circular navigation
            if (slideIndex < 0) {
                slideIndex = maxSlides - 1;
            } else if (slideIndex >= maxSlides) {
                slideIndex = 0;
            }
            
            currentSlide = slideIndex;
            
            // Calculate translation distance
            const translateX = -currentSlide * slidesPerView * slideWidth;
            sliderContainer.style.transform = `translateX(${translateX}px)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Get number of visible slides based on viewport width
        function getVisibleSlides() {
            const viewportWidth = window.innerWidth;
            if (viewportWidth < 768) {
                return 1;
            } else if (viewportWidth < 992) {
                return 2;
            } else {
                return 3;
            }
        }
        
        // Update slider layout based on viewport
        function updateSliderLayout() {
            const visibleSlides = getVisibleSlides();
            
            // Set width for each blog post
            const containerWidth = sliderContainer.parentElement.offsetWidth;
            const postWidth = (containerWidth / visibleSlides) - 30;
            
            blogPosts.forEach(post => {
                post.style.width = `${postWidth}px`;
                post.style.flexShrink = '0';
            });
        }
    }
    
    // Blog filter functionality for blog.html page
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-page-grid .blog-post');
    
    if (filterBtns.length && blogPosts.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide blog posts based on filter
                blogPosts.forEach(post => {
                    if (filter === 'all' || post.getAttribute('data-category') === filter) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });
    }
});
