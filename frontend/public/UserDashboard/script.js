document.addEventListener('DOMContentLoaded', function() {
    // User data - in a real app, this would come from a server
    const userData = {
        username: 'John Doe',
        walletBalance: 1250.00,
        totalDonations: 750.00,
        ngosSupported: 5
    };

    // Initialize the dashboard
    initDashboard();
    initNavigation();
    initProfileActions();
    initDonationFilters();
    initExploreFilters();
    initDonateButtons();
    
    // Update user info across the dashboard
    updateUserInfo(userData);

    // Functions
    function initDashboard() {
        // Set current date in activity items if needed
        const today = new Date();
        document.querySelectorAll('.activity-date').forEach(date => {
            if (date.textContent.includes('Today')) {
                date.textContent = today.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                });
            }
        });
    }

    function updateUserInfo(userData) {
        // Update username in all places
        document.getElementById('header-username').textContent = userData.username;
        document.getElementById('welcome-username').textContent = userData.username;
        document.getElementById('profile-username').textContent = userData.username;
        
        // Update wallet balance
        document.getElementById('wallet-balance').textContent = userData.walletBalance.toLocaleString();
        
        // Update total donations
        document.getElementById('total-donations').textContent = userData.totalDonations.toLocaleString();
        
        // Update NGOs supported count
        document.getElementById('ngos-supported').textContent = userData.ngosSupported;
    }

    function initNavigation() {
        // Handle sidebar navigation
        const navItems = document.querySelectorAll('.sidebar-nav a');
        
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the target section ID from the href
                const targetId = this.getAttribute('href').substring(1);
                
                // Remove active class from all nav items and sections
                document.querySelectorAll('.sidebar-nav li').forEach(li => {
                    li.classList.remove('active');
                });
                document.querySelectorAll('.dashboard-section').forEach(section => {
                    section.classList.remove('active');
                });
                
                // Add active class to the clicked nav item and its section
                this.parentElement.classList.add('active');
                document.getElementById(targetId).classList.add('active');
            });
        });

        // Handle logout button
        document.getElementById('logout-btn').addEventListener('click', function() {
            // In a real app, this would handle logout functionality
            if (confirm('Are you sure you want to logout?')) {
                alert('You have been logged out successfully.');
                // In a real app, redirect to login page or perform logout actions
            }
        });
    }

    function initProfileActions() {
        // Handle profile form submission
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const fullName = document.getElementById('full-name').value;
                const email = document.getElementById('email').value;
                
                // Update user data
                userData.username = fullName;
                updateUserInfo(userData);
                
                // Show success message
                alert('Profile updated successfully!');
            });
        }

        // Handle wallet address copy
        const copyAddressBtn = document.querySelector('.copy-address');
        if (copyAddressBtn) {
            copyAddressBtn.addEventListener('click', function() {
                const walletAddressInput = document.getElementById('wallet-address');
                walletAddressInput.select();
                document.execCommand('copy');
                
                // Show feedback
                this.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                }, 1500);
            });
        }
    }

    function initDonationFilters() {
        // Handle donation history filters
        const filterDate = document.querySelector('.filter-date select');
        if (filterDate) {
            filterDate.addEventListener('change', function() {
                // Filter logic would go here
                // In a real app, this would make an API call or filter existing data
                
                const selectedOption = this.options[this.selectedIndex].text;
                console.log(`Filtering donations by: ${selectedOption}`);
                
                // Example of dynamic filtering (in a real app, this would be more sophisticated)
                const tableRows = document.querySelectorAll('.transaction-table tbody tr');
                
                if (this.value === 'all') {
                    tableRows.forEach(row => {
                        row.style.display = '';
                    });
                } else {
                    // This is just a demonstration - would need real date logic
                    tableRows.forEach((row, index) => {
                        if (this.value === 'month' && index > 1) {
                            row.style.display = 'none';
                        } else if (this.value === 'quarter' && index > 2) {
                            row.style.display = 'none';
                        } else {
                            row.style.display = '';
                        }
                    });
                }
            });
        }
        
        // Handle donation search
        const donationSearch = document.querySelector('.donation-filters .filter-search input');
        if (donationSearch) {
            donationSearch.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const tableRows = document.querySelectorAll('.transaction-table tbody tr');
                
                tableRows.forEach(row => {
                    const ngoName = row.cells[1].textContent.toLowerCase();
                    if (ngoName.includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        }
        
        // Handle download report button
        const downloadReportBtn = document.querySelector('.download-report .btn');
        if (downloadReportBtn) {
            downloadReportBtn.addEventListener('click', function() {
                alert('Donation report is being generated and will download shortly.');
                // In a real app, this would trigger a download
            });
        }
    }

    function initExploreFilters() {
        // Handle NGO filters
        const categoryFilter = document.querySelector('.filter-options select:first-child');
        const sortFilter = document.querySelector('.filter-options select:last-child');
        const exploreSearch = document.querySelector('.filter-search input');
        const moreFiltersBtn = document.querySelector('.btn-filter');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', function() {
                filterNGOs();
            });
        }
        
        if (sortFilter) {
            sortFilter.addEventListener('change', function() {
                sortNGOs(this.value);
            });
        }
        
        if (exploreSearch) {
            exploreSearch.addEventListener('input', function() {
                filterNGOs();
            });
        }
        
        if (moreFiltersBtn) {
            moreFiltersBtn.addEventListener('click', function() {
                alert('Additional filters will appear here.');
                // In a real app, this might show a modal or expand additional filter options
            });
        }
        
        function filterNGOs() {
            // In a real app, this would filter NGOs based on criteria
            const searchTerm = exploreSearch ? exploreSearch.value.toLowerCase() : '';
            const category = categoryFilter ? categoryFilter.value : '';
            
            const ngoItems = document.querySelectorAll('.ngo-item');
            
            ngoItems.forEach(item => {
                const ngoName = item.querySelector('h3').textContent.toLowerCase();
                const ngoCategory = item.querySelector('.ngo-category').textContent.toLowerCase();
                
                const matchesSearch = searchTerm === '' || ngoName.includes(searchTerm);
                const matchesCategory = category === '' || ngoCategory.includes(category);
                
                if (matchesSearch && matchesCategory) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        function sortNGOs(sortOption) {
            // In a real app, this would sort NGOs based on the selected option
            console.log(`Sorting NGOs by: ${sortOption}`);
            
            // Example implementation (in a real app, this would have more sophisticated sorting logic)
            const ngoList = document.querySelector('.ngo-list');
            const ngoItems = Array.from(document.querySelectorAll('.ngo-item'));
            
            if (sortOption === 'funding') {
                // Sort by funding needed (lowest percentage first)
                ngoItems.sort((a, b) => {
                    const aProgress = parseInt(a.querySelector('.progress').style.width);
                    const bProgress = parseInt(b.querySelector('.progress').style.width);
                    return aProgress - bProgress;
                });
            } else if (sortOption === 'popularity') {
                // Sort by popularity (just as an example - randomly shuffle)
                for (let i = ngoItems.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [ngoItems[i], ngoItems[j]] = [ngoItems[j], ngoItems[i]];
                }
            }
            
            // Clear the list and re-append items in new order
            ngoItems.forEach(item => {
                ngoList.appendChild(item);
            });
        }
    }

    function initDonateButtons() {
        // Handle donate buttons
        const donateButtons = document.querySelectorAll('.btn-primary');
        
        donateButtons.forEach(button => {
            if (button.textContent.includes('Donate')) {
                button.addEventListener('click', function() {
                    // Find the NGO name
                    const ngoName = this.closest('.ngo-card') ? 
                        this.closest('.ngo-card').querySelector('h4').textContent :
                        this.closest('.ngo-item') ? 
                            this.closest('.ngo-item').querySelector('h3').textContent : 
                            'selected NGO';
                    
                    // Show donation modal (in a real app)
                    showDonationModal(ngoName);
                });
            }
        });
        
        // Add funds button
        const addFundsBtn = document.querySelector('.balance-actions .btn-primary');
        if (addFundsBtn) {
            addFundsBtn.addEventListener('click', function() {
                showAddFundsModal();
            });
        }
        
        function showDonationModal(ngoName) {
            // In a real app, this would show a modal with a form
            const amount = prompt(`Enter amount to donate to ${ngoName} (in XRC20):`);
            
            if (amount !== null) {
                const numAmount = parseFloat(amount);
                
                if (!isNaN(numAmount) && numAmount > 0) {
                    if (numAmount <= userData.walletBalance) {
                        // Update user data
                        userData.walletBalance -= numAmount;
                        userData.totalDonations += numAmount;
                        updateUserInfo(userData);
                        
                        alert(`Thank you for your donation of ${numAmount} XRC20 to ${ngoName}!`);
                        
                        // Add to recent activity (in a real app, this would be more sophisticated)
                        addDonationActivity(ngoName, numAmount);
                    } else {
                        alert('Insufficient funds in your wallet. Please add funds first.');
                    }
                } else {
                    alert('Please enter a valid amount.');
                }
            }
        }
        
        function showAddFundsModal() {
            // In a real app, this would show a modal with payment options
            const amount = prompt('Enter amount to add to your wallet (in XRC20):');
            
            if (amount !== null) {
                const numAmount = parseFloat(amount);
                
                if (!isNaN(numAmount) && numAmount > 0) {
                    // Update user data
                    userData.walletBalance += numAmount;
                    updateUserInfo(userData);
                    
                    alert(`${numAmount} XRC20 has been added to your wallet.`);
                    
                    // Add to recent activity (in a real app, this would be more sophisticated)
                    addFundsActivity(numAmount);
                } else {
                    alert('Please enter a valid amount.');
                }
            }
        }
        
        function addDonationActivity(ngoName, amount) {
            const activityList = document.querySelector('.activity-list');
            if (activityList) {
                const today = new Date().toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                });
                
                const newActivity = document.createElement('div');
                newActivity.classList.add('activity-item');
                newActivity.innerHTML = `
                    <div class="activity-icon">
                        <i class="fas fa-donate"></i>
                    </div>
                    <div class="activity-details">
                        <h4>Donation to ${ngoName}</h4>
                        <p>You donated ${amount} XRC20 tokens</p>
                        <span class="activity-date">${today}</span>
                    </div>
                    <div class="activity-status verified">
                        <i class="fas fa-check-circle"></i> Verified
                    </div>
                `;
                
                // Add to the beginning of the list
                activityList.insertBefore(newActivity, activityList.firstChild);
                
                // Remove the last item if there are more than 3
                if (activityList.children.length > 3) {
                    activityList.removeChild(activityList.lastChild);
                }
            }
        }
        
        function addFundsActivity(amount) {
            const activityList = document.querySelector('.activity-list');
            if (activityList) {
                const today = new Date().toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                });
                
                const newActivity = document.createElement('div');
                newActivity.classList.add('activity-item');
                newActivity.innerHTML = `
                    <div class="activity-icon">
                        <i class="fas fa-plus-circle"></i>
                    </div>
                    <div class="activity-details">
                        <h4>Added funds to wallet</h4>
                        <p>Added ${amount} XRC20 tokens to your wallet</p>
                        <span class="activity-date">${today}</span>
                    </div>
                    <div class="activity-status completed">
                        <i class="fas fa-check"></i> Completed
                    </div>
                `;
                
                // Add to the beginning of the list
                activityList.insertBefore(newActivity, activityList.firstChild);
                
                // Remove the last item if there are more than 3
                if (activityList.children.length > 3) {
                    activityList.removeChild(activityList.lastChild);
                }
            }
        }
    }

    // Handle pagination
    document.querySelectorAll('.pagination-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all pagination buttons
            this.parentElement.querySelectorAll('.pagination-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real app, this would load the corresponding page of data
            console.log(`Loading page ${this.textContent}`);
        });
    });

    // Initialize view details buttons
    document.querySelectorAll('.btn-outline').forEach(button => {
        if (button.textContent.includes('View Details')) {
            button.addEventListener('click', function() {
                // Find the NGO name
                const ngoName = this.closest('.ngo-item').querySelector('h3').textContent;
                
                // In a real app, this would navigate to the NGO details page
                alert(`Opening details page for ${ngoName}...`);
            });
        }
    });

    // Handle header search bar
    const headerSearch = document.querySelector('.header-search input');
    if (headerSearch) {
        headerSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // Navigate to explore section and set search term
                const exploreSearch = document.querySelector('.filter-search input');
                if (exploreSearch) {
                    exploreSearch.value = this.value;
                    
                    // Trigger filter
                    const event = new Event('input');
                    exploreSearch.dispatchEvent(event);
                }
                
                // Activate explore section
                document.querySelectorAll('.sidebar-nav li').forEach(li => {
                    li.classList.remove('active');
                });
                document.querySelectorAll('.dashboard-section').forEach(section => {
                    section.classList.remove('active');
                });
                
                document.querySelector('.sidebar-nav li:nth-child(2)').classList.add('active');
                document.getElementById('explore').classList.add('active');
            }
        });
    }

    // Handle notification bell
    const notificationBell = document.querySelector('.header-actions .btn-outline');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('You have 3 unread notifications:\n- Donation to Clean Water Initiative verified\n- Education for All posted a new project update\n- Your quarterly donation impact report is ready');
            
            // In a real app, this would show a dropdown with notifications
            const badge = this.querySelector('.notification-badge');
            badge.style.display = 'none';
        });
    }

    // Handle user profile dropdown
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            const dropdownMenu = document.createElement('div');
            dropdownMenu.classList.add('user-dropdown');
            dropdownMenu.innerHTML = `
                <ul>
                    <li><a href="#profile"><i class="fas fa-user"></i> Profile</a></li>
                    <li><a href="#"><i class="fas fa-cog"></i> Settings</a></li>
                    <li><a href="#" id="dropdown-logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                </ul>
            `;
            
            // Check if dropdown already exists
            const existingDropdown = document.querySelector('.user-dropdown');
            if (existingDropdown) {
                existingDropdown.remove();
                return;
            }
            
            // Position the dropdown
            document.body.appendChild(dropdownMenu);
            const rect = this.getBoundingClientRect();
            dropdownMenu.style.position = 'absolute';
            dropdownMenu.style.top = `${rect.bottom}px`;
            dropdownMenu.style.right = `${window.innerWidth - rect.right}px`;
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function closeDropdown(e) {
                if (!dropdownMenu.contains(e.target) && !userProfile.contains(e.target)) {
                    dropdownMenu.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
            
            // Handle dropdown links
            dropdownMenu.querySelector('a[href="#profile"]').addEventListener('click', function(e) {
                e.preventDefault();
                
                // Activate profile section
                document.querySelectorAll('.sidebar-nav li').forEach(li => {
                    li.classList.remove('active');
                });
                document.querySelectorAll('.dashboard-section').forEach(section => {
                    section.classList.remove('active');
                });
                
                document.querySelector('.sidebar-nav li:nth-child(4)').classList.add('active');
                document.getElementById('profile').classList.add('active');
                
                // Remove dropdown
                dropdownMenu.remove();
            });
            
            dropdownMenu.querySelector('#dropdown-logout').addEventListener('click', function(e) {
                e.preventDefault();
                
                // Handle logout
                if (confirm('Are you sure you want to logout?')) {
                    alert('You have been logged out successfully.');
                    // In a real app, redirect to login page
                }
                
                // Remove dropdown
                dropdownMenu.remove();
            });
        });
    }

    // Handle view all links
    document.querySelectorAll('.view-all').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section ID from href
            const targetId = this.getAttribute('href').substring(1);
            
            // Activate target section
            document.querySelectorAll('.sidebar-nav li').forEach(li => {
                li.classList.remove('active');
            });
            document.querySelectorAll('.dashboard-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Find the correct sidebar item and activate it
            document.querySelectorAll('.sidebar-nav a').forEach(a => {
                if (a.getAttribute('href') === `#${targetId}`) {
                    a.parentElement.classList.add('active');
                }
            });
            
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Impact data visualization (simplified example)
    // In a real app, this would use a proper charting library like Chart.js
    function createImpactVisualization() {
        // Check if the element exists on the page
        const impactContainer = document.createElement('div');
        impactContainer.classList.add('impact-visualization');
        impactContainer.innerHTML = `
            <div class="section-subheader">
                <h3>Your Impact</h3>
            </div>
            <div class="impact-metrics">
                <div class="impact-metric">
                    <div class="impact-icon">
                        <i class="fas fa-tint"></i>
                    </div>
                    <div class="impact-info">
                        <h4>Clean Water</h4>
                        <p>Provided access to 120 people</p>
                    </div>
                </div>
                <div class="impact-metric">
                    <div class="impact-icon">
                        <i class="fas fa-seedling"></i>
                    </div>
                    <div class="impact-info">
                        <h4>Trees Planted</h4>
                        <p>Contributed to planting 85 trees</p>
                    </div>
                </div>
                <div class="impact-metric">
                    <div class="impact-icon">
                        <i class="fas fa-book"></i>
                    </div>
                    <div class="impact-info">
                        <h4>Education</h4>
                        <p>Supported 45 students</p>
                    </div>
                </div>
            </div>
        `;
        
        // Append to overview section before recommended NGOs
        const recommendedNgos = document.querySelector('.recommended-ngos');
        if (recommendedNgos) {
            recommendedNgos.parentNode.insertBefore(impactContainer, recommendedNgos);
        }
    }
    
    // Call the function to create impact visualization
    createImpactVisualization();

    // Handle analytics tab if added in the future
    function setupAnalytics() {
        // Create analytics section if it doesn't exist
        const analyticsSection = document.createElement('section');
        analyticsSection.id = 'analytics';
        analyticsSection.classList.add('dashboard-section');
        analyticsSection.innerHTML = `
            <div class="section-header">
                <h2>Donation Analytics</h2>
            </div>
            <div class="analytics-container">
                <div class="analytics-card">
                    <h3>Donation Distribution by Category</h3>
                    <div class="chart-placeholder">
                        <!-- In a real app, this would be a chart -->
                        <div class="dummy-pie-chart">
                            <div class="pie-segment education" style="transform: rotate(0deg); clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%);">
                                <span>Education<br>40%</span>
                            </div>
                            <div class="pie-segment environment" style="transform: rotate(144deg); clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%, 50% 50%);">
                                <span>Environment<br>30%</span>
                            </div>
                            <div class="pie-segment health" style="transform: rotate(252deg); clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 25%, 50% 25%);">
                                <span>Health<br>20%</span>
                            </div>
                            <div class="pie-segment disaster" style="transform: rotate(324deg); clip-path: polygon(50% 50%, 50% 0%, 75% 0%, 75% 25%, 50% 25%);">
                                <span>Disaster<br>10%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="analytics-card">
                    <h3>Monthly Donation Trends</h3>
                    <div class="chart-placeholder">
                        <!-- In a real app, this would be a chart -->
                        <div class="dummy-bar-chart">
                            <div class="bar-container">
                                <div class="bar" style="height: 60%;">
                                    <div class="bar-label">Jan</div>
                                </div>
                                <div class="bar" style="height: 80%;">
                                    <div class="bar-label">Feb</div>
                                </div>
                                <div class="bar" style="height: 70%;">
                                    <div class="bar-label">Mar</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Append to main content
        const dashboardSections = document.querySelector('.dashboard-sections');
        if (dashboardSections) {
            dashboardSections.appendChild(analyticsSection);
        }
        
        // Add analytics link to sidebar if it doesn't exist
        const navList = document.querySelector('.sidebar-nav ul');
        if (navList) {
            const analyticsNavItem = document.createElement('li');
            analyticsNavItem.innerHTML = `
                <a href="#analytics"><i class="fas fa-chart-bar"></i> Analytics</a>
            `;
            
            // Add before the profile link
            const profileNavItem = document.querySelector('.sidebar-nav li:nth-child(4)');
            if (profileNavItem) {
                navList.insertBefore(analyticsNavItem, profileNavItem);
            } else {
                navList.appendChild(analyticsNavItem);
            }
            
            // Add click event
            analyticsNavItem.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                
                // Activate analytics section
                document.querySelectorAll('.sidebar-nav li').forEach(li => {
                    li.classList.remove('active');
                });
                document.querySelectorAll('.dashboard-section').forEach(section => {
                    section.classList.remove('active');
                });
                
                analyticsNavItem.classList.add('active');
                analyticsSection.classList.add('active');
            });
        }
    }
    
    // Uncomment to add analytics section
    // setupAnalytics();

    // Add mobile responsiveness enhancements
    function enhanceMobileResponsiveness() {
        // Add mobile menu toggle button
        const dashboardContainer = document.querySelector('.dashboard-container');
        if (dashboardContainer) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.classList.add('mobile-menu-toggle');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            dashboardContainer.appendChild(mobileMenuBtn);
            
            // Toggle sidebar on mobile
            mobileMenuBtn.addEventListener('click', function() {
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.toggle('mobile-visible');
                
                // Change icon based on state
                if (sidebar.classList.contains('mobile-visible')) {
                    this.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    this.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
            
            // Close sidebar when clicking on a link on mobile
            document.querySelectorAll('.sidebar-nav a').forEach(link => {
                link.addEventListener('click', function() {
                    const sidebar = document.querySelector('.sidebar');
                    if (window.innerWidth < 768 && sidebar.classList.contains('mobile-visible')) {
                        sidebar.classList.remove('mobile-visible');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            });
        }
    }
    
    // Call mobile responsiveness enhancements
    enhanceMobileResponsiveness();
});