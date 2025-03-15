document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    });
    
    signupTab.addEventListener('click', function() {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });
    
    // Form validation and submission
    const signupButton = document.getElementById('signup-button');
    const loginButton = document.getElementById('login-button');
    
    // Sign up form submission
    signupButton.addEventListener('click', function() {
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const termsChecked = document.getElementById('terms').checked;
        
        // Get selected role
        const roleUser = document.getElementById('role-user');
        const roleNGO = document.getElementById('role-ngo');
        const userRole = roleUser.checked ? 'user' : (roleNGO.checked ? 'ngo' : '');
        
        // Simple validation
        if (!name || !email || !password || !confirmPassword) {
            showNotification('error', 'Please fill in all fields');
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
        
        if (!userRole) {
            showNotification('error', 'Please select your role');
            return;
        }
        
        // Store user data (in localStorage for demo purposes)
        // In a real application, this would be sent to a server
        const userData = {
            name: name,
            email: email,
            password: password, // In a real app, never store passwords in plain text
            role: userRole, // Store the user role
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
        showNotification('success', 'Account created successfully! Redirecting to login...');
        
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
            name: user.name,
            email: user.email,
            role: user.role, // Include the user role
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
    
    // Check if user is already logged in
    function checkLoggedInUser() {
        // Check both localStorage and sessionStorage for logged in user
        const localUser = JSON.parse(localStorage.getItem('ngotrust_current_user') || 'null');
        const sessionUser = JSON.parse(sessionStorage.getItem('ngotrust_current_user') || 'null');
        
        const currentUser = localUser || sessionUser;
        
        if (currentUser && currentUser.isLoggedIn) {
            // User is already logged in, redirect based on role
            setTimeout(() => {
                if (currentUser.role === 'ngo') {
                    // Redirect to NGO dashboard
                    window.location.href = '/frontend/public/NGODashboard/index.html';
                } else {
                    // Redirect to User dashboard
                    window.location.href = '/frontend/public/UserDashboard/index.html';
                }
            }, 100);
        }
    }
    
    // Run initial check
    checkLoggedInUser();
});

// Additional CSS for notifications
(function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.3s ease;
            max-width: 300px;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification.success {
            background-color: var(--secondary-color);
        }
        
        .notification.error {
            background-color: #ef4444;
        }
        
        .notification-close {
            margin-left: 10px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
})();