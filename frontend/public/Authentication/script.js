document.addEventListener('DOMContentLoaded', function () {
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

    // Tabs and forms
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const donorSignupForm = document.getElementById('donor-signup-form');
    const ngoSignupForm = document.getElementById('ngo-signup-form');

    loginTab.addEventListener('click', function () {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.add('active');
        donorSignupForm.classList.remove('active');
        ngoSignupForm.classList.remove('active');
    });

    signupTab.addEventListener('click', function () {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        loginForm.classList.remove('active');

        if (userRole === 'ngo') {
            ngoSignupForm.classList.add('active');
            donorSignupForm.classList.remove('active');
        } else {
            donorSignupForm.classList.add('active');
            ngoSignupForm.classList.remove('active');
        }
    });

    // Initial form setup
    if (userRole) {
        signupTab.click();
        if (userRole === 'ngo') {
            loginForm.classList.remove('active');
            donorSignupForm.classList.remove('active');
            ngoSignupForm.classList.add('active');
        }
    }

    // Donor Signup
    document.getElementById('donor-signup-button').addEventListener('click', async function (e) {
        e.preventDefault();

        const fullName = document.getElementById('donor-name').value.trim();
        const email = document.getElementById('donor-email').value.trim();
        const phone = document.getElementById('donor-phone').value.trim();
        const walletAddress = document.getElementById('donor-wallet').value.trim();
        const password = document.getElementById('donor-password').value;
        const confirmPassword = document.getElementById('donor-confirm-password').value;
        const termsChecked = document.getElementById('donor-terms').checked;

        if (!fullName || !email || !phone || !password || !confirmPassword) {
            showNotification('error', 'Please fill in all required fields.');
            return;
        }

        if (password !== confirmPassword) {
            showNotification('error', 'Passwords do not match.');
            return;
        }

        if (!termsChecked) {
            showNotification('error', 'Please agree to the terms and conditions.');
            return;
        }

        const donorData = { fullName, email, phone, walletAddress, password };

        try {
            const response = await fetch('http://localhost:5000/api/donors/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(donorData)
            });

            const data = await response.json();

            if (response.ok) {
                showNotification('success', 'Donor account created successfully! Redirecting to login...');
                setTimeout(() => loginTab.click(), 2000);
            } else {
                showNotification('error', data.error || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('error', 'Server error. Try again later.');
        }
    });

    // NGO Signup
    document.getElementById('ngo-signup-button').addEventListener('click', async function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('ngoName', document.getElementById('ngo-name').value.trim());
        formData.append('email', document.getElementById('ngo-email').value.trim());
        formData.append('registrationNumber', document.getElementById('ngo-registration').value.trim());
        formData.append('contactPersonName', document.getElementById('ngo-contact-name').value.trim());
        formData.append('contactPersonPhone', document.getElementById('ngo-contact-phone').value.trim());
        formData.append('ngoAddress', document.getElementById('ngo-address').value.trim());
        formData.append('website', document.getElementById('ngo-website').value.trim());
        formData.append('mission', document.getElementById('ngo-mission').value.trim());
        formData.append('walletAddress', document.getElementById('ngo-wallet').value.trim());
        formData.append('password', document.getElementById('ngo-password').value);
        
        const certificateInput = document.getElementById('ngo-certificate').files[0];
        if (certificateInput) {
            formData.append('governmentApprovalCertificate', certificateInput);
        }

        try {
            const response = await fetch('http://localhost:5000/api/ngos/register', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                showNotification('success', 'NGO registered successfully! Redirecting to login...');
                setTimeout(() => loginTab.click(), 2000);
            } else {
                showNotification('error', data.error || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('error', 'Server error. Try again later.');
        }
    });

    // Login
    document.getElementById('login-button').addEventListener('click', async function (e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            showNotification('error', 'Please enter both email and password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                showNotification('success', 'Login successful! Redirecting...');
                localStorage.setItem('token', data.token);
                localStorage.setItem('ngotrust_user', JSON.stringify(data.user));

                setTimeout(() => {
                    if (data.user.role === 'ngo') {
                        window.location.href = '/NGODashboard.html';
                    } else {
                        window.location.href = '/UserDashboard.html';
                    }
                }, 2000);
            } else {
                showNotification('error', data.error || 'Invalid email or password.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            showNotification('error', 'Server error. Try again later.');
        }
    });

    function showNotification(type, message) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) existingNotification.remove();

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        const closeBtn = document.createElement('span');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => notification.remove());

        notification.appendChild(closeBtn);
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 5000);
    }
});
