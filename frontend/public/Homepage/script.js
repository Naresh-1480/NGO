document.addEventListener("DOMContentLoaded", function() {
    // Explore Dashboard button handling
    const exploreDashboardButton = document.getElementById("explore-dashboard-button");
    if (exploreDashboardButton) {
        exploreDashboardButton.addEventListener("click", function() {
            // Check if user is logged in
            const currentUser = localStorage.getItem("ngotrust_current_user") || sessionStorage.getItem("ngotrust_current_user");
            if (currentUser) {
                // Redirect to dashboard if logged in
                window.location.href = "/frontend/public/Dashboard/index.html";
            } else {
                // Redirect to authentication if not logged in
                window.location.href = "/frontend/public/Authentication/index.html";
            }
        });
    }
    
    // Check if user is logged in (from localStorage or sessionStorage)
    const currentUser = localStorage.getItem("ngotrust_current_user") || sessionStorage.getItem("ngotrust_current_user");
    console.log("Current user from storage:", currentUser);
    
    // Query the mobile menu element first
    const mobileMenu = document.querySelector(".mobile-menu");
    
    // Existing mobile menu logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    const closeBtn = document.querySelector('.mobile-menu-close');
    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close mobile menu when clicking a link
    if (mobileMenu) {
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Demo Tabs
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');
    
    if (demoTabs.length > 0 && demoPanels.length > 0) {
        demoTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                demoTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all panels
                demoPanels.forEach(panel => panel.classList.remove('active'));
                
                // Show the corresponding panel
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (featureCards.length > 0) {
        // Initial setup: hide all cards
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Function to check if element is in viewport
        const isInViewport = function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9
            );
        };
        
        // Function to handle scroll animation
        const handleScroll = function() {
            featureCards.forEach(card => {
                if (isInViewport(card) && card.style.opacity === '0') {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100 * Array.from(featureCards).indexOf(card));
                }
            });
        };
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        
        // Trigger once on load
        handleScroll();
    }
    
    // Add testimonial carousel if there are testimonials
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    
    if (testimonialCarousel) {
        const testimonials = testimonialCarousel.querySelectorAll('.testimonial');
        const prevBtn = testimonialCarousel.querySelector('.prev-btn');
        const nextBtn = testimonialCarousel.querySelector('.next-btn');
        let currentIndex = 0;
        
        // Function to show testimonial at index
        const showTestimonial = function(index) {
            testimonials.forEach((testimonial, i) => {
                if (i === index) {
                    testimonial.classList.add('active');
                } else {
                    testimonial.classList.remove('active');
                }
            });
        };
        
        // Initialize carousel
        showTestimonial(currentIndex);
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentIndex);
            });
        }
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(currentIndex);
            });
        }
        
        // Auto advance carousel
        setInterval(function() {
            if (document.visibilityState === 'visible') {
                currentIndex = (currentIndex + 1) % testimonials.length;
                showTestimonial(currentIndex);
            }
        }, 5000);
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                // Simulate form submission
                const originalText = this.querySelector('button').textContent;
                this.querySelector('button').textContent = 'Subscribing...';
                
                // Simulate API call
                setTimeout(() => {
                    emailInput.value = '';
                    this.querySelector('button').textContent = 'Done!';
                    
                    // Reset button text after 2 seconds
                    setTimeout(() => {
                        this.querySelector('button').textContent = originalText;
                    }, 2000);
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Thank you for subscribing!';
                    successMessage.style.color = 'var(--secondary-color)';
                    successMessage.style.marginTop = '10px';
                    successMessage.style.fontSize = '0.9rem';
                    
                    // Remove existing message if any
                    const existingMessage = this.parentNode.querySelector('.success-message');
                    if (existingMessage) {
                        this.parentNode.removeChild(existingMessage);
                    }
                    
                    this.parentNode.appendChild(successMessage);
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        if (successMessage.parentNode) {
                            successMessage.parentNode.removeChild(successMessage);
                        }
                    }, 5000);
                }, 1500);
            } else {
                // Show error for invalid email
                emailInput.style.borderColor = 'red';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 3000);
            }
        });
    }
    
    // Add sticky header behavior
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                
                if (scrollTop > lastScrollTop) {
                    // Scrolling down
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Donation functionality 
    const donateButton = document.getElementById('donate-button');
    if (donateButton) {
        donateButton.addEventListener('click', function() {
            // Placeholder for donation modal
            alert('Donation functionality will be implemented in the next phase of the project.');
        });
    }
    
    // CTA Donate button
    const ctaDonateButton = document.getElementById('cta-donate-button');
    if (ctaDonateButton) {
        ctaDonateButton.addEventListener('click', function() {
            // Placeholder for donation modal
            alert('Donation functionality will be implemented in the next phase of the project.');
        });
    }
});