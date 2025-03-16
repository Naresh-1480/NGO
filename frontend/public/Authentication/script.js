document.addEventListener('DOMContentLoaded', function() {
    // Get role from URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    let userRole = urlParams.get('role');
    
    // If not in URL, check localStorage (this is what your homepage is using)
    if (!userRole) {
        const storedRole = localStorage.getItem('ngotrust_preselected_role');
        if (storedRole === 'NGO') {
            userRole = 'ngo';
        } else if (storedRole === 'DONOR') {
            userRole = 'donor';
        }
    }
    
    // Now proceed with your existing code, but using the updated userRole
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const donorSignupForm = document.getElementById('donor-signup-form');
    const ngoSignupForm = document.getElementById('ngo-signup-form');
    
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.add('active');
        donorSignupForm.classList.remove('active');
        ngoSignupForm.classList.remove('active');
    });
    
    signupTab.addEventListener('click', function() {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        loginForm.classList.remove('active');
        
        // Show appropriate signup form based on role
        if (userRole === 'ngo') {
            ngoSignupForm.classList.add('active');
            donorSignupForm.classList.remove('active');
        } else {
            donorSignupForm.classList.add('active');
            ngoSignupForm.classList.remove('active');
        }
    });
    
    // Initial form setup based on role
    if (userRole) {
        signupTab.click();
        if (userRole === 'ngo') {
            // Explicitly show NGO form
            loginForm.classList.remove('active');
            donorSignupForm.classList.remove('active');
            ngoSignupForm.classList.add('active');
        }
    }
    
    // Form validation and submission
    const donorSignupButton = document.getElementById('donor-signup-button');
    const ngoSignupButton = document.getElementById('ngo-signup-button');
    const loginButton = document.getElementById('login-button');
    
    // Donor signup form submission
    donorSignupButton.addEventListener('click', function() {
        const name = document.getElementById('donor-name').value.trim();
        const email = document.getElementById('donor-email').value.trim();
        const phone = document.getElementById('donor-phone').value.trim();
        const wallet = document.getElementById('donor-wallet').value.trim(); // Optional
        const password = document.getElementById('donor-password').value;
        const confirmPassword = document.getElementById('donor-confirm-password').value;
        const termsChecked = document.getElementById('donor-terms').checked;
        
        // Simple validation
        if (!name || !email || !phone || !password || !confirmPassword) {
            showNotification('error', 'Please fill in all required fields');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('error', 'Passwords do not match');
            return;
        }
        
        if (!termsChecked) {
            showNotification('error', 'Please agree to terms and conditions');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('error', 'Please enter a valid email address');
            return;
        }
        
        if (password.length < 8) {
            showNotification('error', 'Password must be at least 8 characters');
            return;
        }
        
        // Store user data (in localStorage for demo purposes)
        // In a real application, this would be sent to a server
        const userData = {
            name: name,
            email: email,
            phone: phone,
            wallet: wallet,
            password: password, // In a real app, never store passwords in plain text
            role: 'donor',
            dateCreated: new Date().toISOString()
        };
        
        // Get existing users or initialize new array
        const users = JSON.parse(localStorage.getItem('ngotrust_users') || '[]');
        
        // Check if email already exists
        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
            showNotification('error', 'This email is already registered');
            return;
        }
        
        // Add new user
        users.push(userData);
        
        // Save back to localStorage
        localStorage.setItem('ngotrust_users', JSON.stringify(users));
        
        // Show success message
        showNotification('success', 'Donor account created successfully! Redirecting to login...');
        
        // Switch to login tab after 2 seconds
        setTimeout(() => {
            loginTab.click();
            // Auto-fill the email in login form
            document.getElementById('login-email').value = email;
        }, 2000);
    });
    
    // NGO signup form submission
    ngoSignupButton.addEventListener('click', function() {
        const ngoName = document.getElementById('ngo-name').value.trim();
        const email = document.getElementById('ngo-email').value.trim();
        const registration = document.getElementById('ngo-registration').value.trim();
        const contactName = document.getElementById('ngo-contact-name').value.trim();
        const contactPhone = document.getElementById('ngo-contact-phone').value.trim();
        const address = document.getElementById('ngo-address').value.trim();
        const website = document.getElementById('ngo-website').value.trim(); // Optional
        const mission = document.getElementById('ngo-mission').value.trim();
        const wallet = document.getElementById('ngo-wallet').value.trim();
        const password = document.getElementById('ngo-password').value;
        const confirmPassword = document.getElementById('ngo-confirm-password').value;
        const termsChecked = document.getElementById('ngo-terms').checked;
        
        // Get file input
        const certificateInput = document.getElementById('ngo-certificate');
        const hasCertificate = certificateInput.files.length > 0;
        
        // Simple validation for required fields
        if (!ngoName || !email || !registration || !contactName || !contactPhone || 
            !address || !mission || !wallet || !password || !confirmPassword) {
            showNotification('error', 'Please fill in all required fields');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('error', 'Passwords do not match');
            return;
        }
        
        if (!termsChecked) {
            showNotification('error', 'Please agree to terms and conditions');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('error', 'Please enter a valid email address');
            return;
        }
        
        if (password.length < 8) {
            showNotification('error', 'Password must be at least 8 characters');
            return;
        }
        
        // Store NGO data (in localStorage for demo purposes)
        // In a real application, this would be sent to a server along with the certificate file
        const ngoData = {
            ngoName: ngoName,
            email: email,
            registration: registration,
            hasCertificate: hasCertificate,
            contactName: contactName,
            contactPhone: contactPhone,
            address: address,
            website: website,
            mission: mission,
            wallet: wallet,
            password: password, // In a real app, never store passwords in plain text
            role: 'ngo',
            verified: false, // NGOs might need verification before full access
            dateCreated: new Date().toISOString()
        };
        
        // Get existing users or initialize new array
        const users = JSON.parse(localStorage.getItem('ngotrust_users') || '[]');
        
        // Check if email already exists
        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
            showNotification('error', 'This email is already registered');
            return;
        }
        
        // Add new NGO
        users.push(ngoData);
        
        // Save back to localStorage
        localStorage.setItem('ngotrust_users', JSON.stringify(users));
        
        // Show success message
        showNotification('success', 'NGO registered successfully! Redirecting to login...');
        
        // Switch to login tab after 2 seconds
        setTimeout(() => {
            loginTab.click();
            // Auto-fill the email in login form
            document.getElementById('login-email').value = email;
        }, 2000);
    });
    
    // Login form submission
    loginButton.addEventListener('click', function() {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // Simple validation
        if (!email || !password) {
            showNotification('error', 'Please enter both email and password');
            return;
        }
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('ngotrust_users') || '[]');
        
        // Check if user exists and password matches
        const user = users.find(user => user.email === email && user.password === password);
        
        if (!user) {
            showNotification('error', 'Invalid email or password');
            return;
        }
        
        // Login successful, store current user
        const currentUser = {
            name: user.name || user.ngoName,
            email: user.email,
            role: user.role,
            isLoggedIn: true,
            loginTime: new Date().toISOString()
        };
        
        if (rememberMe) {
            // Store in localStorage for persistent login
            localStorage.setItem('ngotrust_current_user', JSON.stringify(currentUser));
        } else {
            // Store in sessionStorage for session-only login
            sessionStorage.setItem('ngotrust_current_user', JSON.stringify(currentUser));
        }
        
        // Show success message
        showNotification('success', 'Login successful! Redirecting to dashboard...');
        
        // Role-based redirection
        setTimeout(() => {
            if (user.role === 'ngo') {
                // Redirect to NGO dashboard
                window.location.href = '/frontend/public/NGODashboard/index.html';
            } else {
                // Redirect to User dashboard
                window.location.href = '/frontend/public/UserDashboard/index.html';
            }
        }, 2000);
    });
    
    // Utility function to validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Function to show notification
    function showNotification(type, message) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add close button
        const closeBtn = document.createElement('span');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', function() {
            notification.remove();
        });
        
        notification.appendChild(closeBtn);
        
        // Add to document
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Modified checkLoggedInUser function
    function checkLoggedInUser() {
        // Get role from URL or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const attemptedRole = urlParams.get('role') || 
                             (localStorage.getItem('ngotrust_preselected_role') === 'NGO' ? 'ngo' : 
                              localStorage.getItem('ngotrust_preselected_role') === 'DONOR' ? 'donor' : null);
        
        // Check both localStorage and sessionStorage for logged in user
        const localUser = JSON.parse(localStorage.getItem('ngotrust_current_user') || 'null');
        const sessionUser = JSON.parse(sessionStorage.getItem('ngotrust_current_user') || 'null');
        
        const currentUser = localUser || sessionUser;
        
        if (currentUser && currentUser.isLoggedIn) {
            // Only redirect if user is not trying to access a different role's registration
            if (!attemptedRole || currentUser.role === attemptedRole) {
                // User is already logged in with same role, redirect based on role
                setTimeout(() => {
                    if (currentUser.role === 'ngo') {
                        // Redirect to NGO dashboard
                        window.location.href = '/frontend/public/NGODashboard/index.html';
                    } else {
                        // Redirect to User dashboard
                        window.location.href = '/frontend/public/UserDashboard/index.html';
                    }
                }, 100);
            } else if (attemptedRole && currentUser.role !== attemptedRole) {
                // User is trying to access a different role's registration
                // Ask if they want to log out first
                const confirmLogout = confirm(`You are currently logged in as a ${currentUser.role}. Do you want to log out and register as a ${attemptedRole}?`);
                
                if (confirmLogout) {
                    // Log out the user
                    localStorage.removeItem('ngotrust_current_user');
                    sessionStorage.removeItem('ngotrust_current_user');
                    
                    // Show notification
                    showNotification('info', 'Logged out successfully. You can now register with a new role.');
                    
                    // Force page reload to reset forms
                    window.location.reload();
                } else {
                    // Redirect to current role's dashboard
                    setTimeout(() => {
                        if (currentUser.role === 'ngo') {
                            window.location.href = '/frontend/public/NGODashboard/index.html';
                        } else {
                            window.location.href = '/frontend/public/UserDashboard/index.html';
                        }
                    }, 100);
                }
            }
        }
        
        // Clear the localStorage value after reading it to prevent it affecting future visits
        // We only clear it after the check is complete to ensure the attempted role is preserved
        if (!attemptedRole) {
            localStorage.removeItem('ngotrust_preselected_role');
        }
    }
    
    // Run initial check
    checkLoggedInUser();
});