window.onload = function() {
    localStorage.clear();  // Clears data when the page loads
};

document.addEventListener("DOMContentLoaded", function() {
    // Explore Dashboard button handling
    const exploreDashboardButton = document.getElementById("explore-dashboard-button");
    if (exploreDashboardButton) {
        exploreDashboardButton.addEventListener("click", function() {
            // When "Register NGO" button is clicked, set role to NGO and redirect to authentication
            localStorage.setItem("ngotrust_preselected_role", "NGO");
            window.location.href = "../Authentication/index.html";
        });
    }

    // Check if user is logged in (from localStorage or sessionStorage)
    const currentUser = localStorage.getItem("ngotrust_current_user") || sessionStorage.getItem("ngotrust_current_user");
    console.log("Current user from storage:", currentUser);
    
    // Mobile menu handling
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Create mobile menu dynamically if it doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                const menuHTML = `
                    <div class="mobile-menu-header">
                        <div class="logo">
                            <span>NGOTrust</span>
                        </div>
                        <div class="mobile-menu-close"></div>
                    </div>
                    <div class="mobile-menu-links">
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How It Works</a>
                        <a href="#for-ngos">For NGOs</a>
                        <a href="#about">About</a>
                    </div>
                    <div class="mobile-menu-cta">
                        <button class="btn btn-primary" id="mobile-donate-button">Make a Donation</button>
                        <button class="btn btn-outline" id="mobile-explore-button">Register NGO</button>
                    </div>
                `;
                
                mobileMenu.innerHTML = menuHTML;
                document.body.appendChild(mobileMenu);
                
                // Add event listeners to new elements
                const closeBtn = mobileMenu.querySelector('.mobile-menu-close');
                if (closeBtn) {
                    closeBtn.addEventListener('click', function() {
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    });
                }
                
                const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-menu-links a');
                mobileMenuLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    });
                });
                
                // Mobile donate button
                const mobileDonateButton = document.getElementById('mobile-donate-button');
                if (mobileDonateButton) {
                    mobileDonateButton.addEventListener('click', function() {
                        // When "Make a Donation" button is clicked, set role to DONOR and redirect to authentication
                        localStorage.setItem("ngotrust_preselected_role", "DONOR");
                        window.location.href = "../Authentication/index.html";
                    });
                }
                
                // Mobile explore button (for NGO registration)
                const mobileExploreButton = document.getElementById('mobile-explore-button');
                if (mobileExploreButton) {
                    mobileExploreButton.addEventListener('click', function() {
                        // When "Register NGO" button is clicked, set role to NGO and redirect to authentication
                        localStorage.setItem("ngotrust_preselected_role", "NGO");
                        window.location.href = "../Authentication/index.html";
                    });
                }
            }
            
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
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
    
    // Donation functionality for buttons - now redirect to authentication with DONOR role
    const donateButtons = document.querySelectorAll('#donate-button, #cta-donate-button');
    donateButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function() {
                // Set preselected role to DONOR and redirect to authentication
                localStorage.setItem("ngotrust_preselected_role", "DONOR");
                window.location.href = "../Authentication/index.html";
            });
        }
    });
    
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
});