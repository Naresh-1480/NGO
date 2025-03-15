document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }

    // Logout functionality
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Add confirmation dialog
            if (confirm('Are you sure you want to logout?')) {
                // Perform logout logic here
                window.location.href = '/frontend/public/Homepage/index.html';
            }
        });
    }

    // Profile tab switching
    const tabs = document.querySelectorAll('.profile-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Copy wallet address to clipboard
    const copyWalletBtn = document.getElementById('copy-wallet-btn');
    if (copyWalletBtn) {
        copyWalletBtn.addEventListener('click', function() {
            const walletAddress = document.querySelector('.wallet-address').textContent.trim();
            
            // Create a temporary input element
            const tempInput = document.createElement('input');
            tempInput.value = walletAddress;
            document.body.appendChild(tempInput);
            
            // Select and copy the text
            tempInput.select();
            document.execCommand('copy');
            
            // Remove the temporary element
            document.body.removeChild(tempInput);
            
            // Show feedback
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
            }, 2000);
        });
    }

    // Toggle switches for security and notification settings
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const securityStatus = this.closest('.security-status').querySelector('.status-indicator');
            
            if (this.checked) {
                securityStatus.classList.remove('disabled');
                securityStatus.classList.add('enabled');
                securityStatus.innerHTML = '<i class="fas fa-check-circle"></i> Enabled';
            } else {
                securityStatus.classList.remove('enabled');
                securityStatus.classList.add('disabled');
                securityStatus.innerHTML = '<i class="fas fa-times-circle"></i> Disabled';
            }
        });
    });

    // Handle profile form submission
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            // Basic validation
            if (!firstName || !lastName || !email) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show success message
            alert('Profile updated successfully!');
            
            // Update profile name in the header
            document.querySelector('.profile-name').textContent = `${firstName} ${lastName}`;
            
            // Update profile info in the header
            const profileInfo = document.querySelector('.profile-info');
            profileInfo.innerHTML = `
                <p><i class="fas fa-envelope"></i> ${email}</p>
                <p><i class="fas fa-phone"></i> ${phone}</p>
            `;
        });
    }

    // Handle download PDF buttons
    const downloadButtons = document.querySelectorAll('.download-btn');
    if (downloadButtons) {
        downloadButtons.forEach(button => {
            button.addEventListener('click', function() {
                // In a real application, this would trigger a download
                // For this demo, we'll just show an alert
                alert('Tax receipt PDF download started!');
            });
        });
    }

    // Handle donate buttons for saved NGOs
    const donateButtons = document.querySelectorAll('.ngo-card .btn-primary');
    if (donateButtons) {
        donateButtons.forEach(button => {
            button.addEventListener('click', function() {
                const ngoName = this.closest('.ngo-card').querySelector('h4').textContent;
                window.location.href = `/frontend/public/Donation/index.html?ngo=${encodeURIComponent(ngoName)}`;
            });
        });
    }

    // Handle profile picture upload functionality
    const profilePicture = document.querySelector('.profile-picture');
    if (profilePicture) {
        profilePicture.addEventListener('click', function() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            
            fileInput.addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        // Replace the icon with the uploaded image
                        profilePicture.innerHTML = `<img src="${event.target.result}" alt="Profile Picture">`;
                    };
                    
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
            
            fileInput.click();
        });
    }

    // Handle change password button
    const changePasswordBtn = document.querySelector('.profile-actions .btn-outline');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            // Create a modal for password change
            const modalHTML = `
                <div class="modal" id="password-modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>Change Password</h2>
                            <span class="close-modal">&times;</span>
                        </div>
                        <div class="modal-body">
                            <form id="password-form">
                                <div class="form-group">
                                    <label for="current-password">Current Password</label>
                                    <input type="password" id="current-password" required>
                                </div>
                                <div class="form-group">
                                    <label for="new-password">New Password</label>
                                    <input type="password" id="new-password" required>
                                </div>
                                <div class="form-group">
                                    <label for="confirm-password">Confirm New Password</label>
                                    <input type="password" id="confirm-password" required>
                                </div>
                                <button type="submit" class="btn btn-primary">Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            
            // Add modal to the body
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Add modal styling
            const style = document.createElement('style');
            style.textContent = `
                .modal {
                    display: block;
                    position: fixed;
                    z-index: 1000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.5);
                }
                .modal-content {
                    background-color: white;
                    margin: 10% auto;
                    padding: 20px;
                    border-radius: 10px;
                    width: 80%;
                    max-width: 500px;
                    animation: modalFade 0.3s ease;
                }
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .close-modal {
                    font-size: 28px;
                    font-weight: bold;
                    cursor: pointer;
                }
                @keyframes modalFade {
                    from {opacity: 0; transform: translateY(-20px);}
                    to {opacity: 1; transform: translateY(0);}
                }
            `;
            document.head.appendChild(style);
            
            // Handle modal close
            const modal = document.getElementById('password-modal');
            const closeBtn = document.querySelector('.close-modal');
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Handle click outside modal
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    document.body.removeChild(modal);
                }
            });
            
            // Handle password form submission
            const passwordForm = document.getElementById('password-form');
            passwordForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const currentPassword = document.getElementById('current-password').value;
                const newPassword = document.getElementById('new-password').value;
                const confirmPassword = document.getElementById('confirm-password').value;
                
                // Basic validation
                if (!currentPassword || !newPassword || !confirmPassword) {
                    alert('Please fill in all fields');
                    return;
                }
                
                if (newPassword !== confirmPassword) {
                    alert('New passwords do not match');
                    return;
                }
                
                // In a real application, send this to the server
                // For this demo, just show success message
                alert('Password changed successfully!');
                
                // Close the modal
                document.body.removeChild(modal);
            });
        });
    }

    // Handle account deactivation button
    const deactivateBtn = document.querySelector('.btn-danger');
    if (deactivateBtn) {
        deactivateBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to deactivate your account? This action can be reversed by contacting support.')) {
                alert('Account deactivated. You will be logged out now.');
                window.location.href = '/frontend/public/Homepage/index.html';
            }
        });
    }
});