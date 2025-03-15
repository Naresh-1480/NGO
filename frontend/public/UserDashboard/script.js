// Configuration and Constants
const CONFIG = {
    currentUser: 'Abuzar90916',
    currentTime: '2025-03-15 15:55:40',
    mockWalletAddress: 'xdc71C7656EC7ab88b098defB751B7401B5f6d8976f',
    apiEndpoint: 'https://api.ngotrust.org/v1' // Placeholder API endpoint
};

// Mock Data
const MOCK_NGOS = [
    {
        id: 1,
        name: "Education For All",
        category: "Education",
        description: "Providing quality education to underprivileged children",
        image: "https://picsum.photos/id/24/300/200",
        totalRaised: 25000,
        donors: 156,
        verified: true
    },
    {
        id: 2,
        name: "Green Earth Initiative",
        category: "Environment",
        description: "Fighting climate change through local action",
        image: "https://picsum.photos/id/28/300/200",
        totalRaised: 18500,
        donors: 89,
        verified: true
    },
    {
        id: 3,
        name: "Healthcare Access",
        category: "Healthcare",
        description: "Making healthcare accessible to remote communities",
        image: "https://picsum.photos/id/27/300/200",
        totalRaised: 32000,
        donors: 245,
        verified: true
    }
];

const MOCK_DONATIONS = [
    {
        id: 1,
        ngoId: 1,
        amount: 500,
        date: "2025-03-15 14:30:00",
        txHash: "0xabcd1234...",
        status: "Confirmed"
    },
    {
        id: 2,
        ngoId: 2,
        amount: 750,
        date: "2025-03-14 09:15:00",
        txHash: "0xdef5678...",
        status: "Confirmed"
    },
    {
        id: 3,
        ngoId: 3,
        amount: 1000,
        date: "2025-03-13 16:45:00",
        txHash: "0xghi91011...",
        status: "Confirmed"
    }
];

// Utility Functions
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const formatAmount = (amount) => {
    return `${amount.toLocaleString()} XRC20`;
};

const shortenAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    setupEventListeners();
    updateCurrentTime();
});

function initializeDashboard() {
    // Update welcome message for consistency
    document.querySelector('.welcome-text h1').textContent = `Welcome back, ${CONFIG.currentUser}!`;
    
    // Initialize all sections
    updateDashboardStats();
    updateRecentActivities();
    loadFeaturedNGOs();
    loadNGOGrid(); // Added to initialize the NGO grid
    updateDonationHistory();
    initializeWallet();
}

function updateCurrentTime() {
    const timeElement = document.getElementById('current-time');
    timeElement.textContent = CONFIG.currentTime;
    
    // Update time every second
    setInterval(() => {
        const now = new Date();
        timeElement.textContent = now.toISOString().replace('T', ' ').split('.')[0];
    }, 1000);
}

function updateDashboardStats() {
    const totalDonated = MOCK_DONATIONS.reduce((sum, d) => sum + d.amount, 0);
    const uniqueNGOs = new Set(MOCK_DONATIONS.map(d => d.ngoId)).size;

    document.querySelector('.impact-summary').innerHTML = `
        <div class="impact-stat">
            <h3>${formatAmount(totalDonated)}</h3>
            <span>Total Donated</span>
        </div>
        <div class="impact-stat">
            <h3>${uniqueNGOs}</h3>
            <span>NGOs Supported</span>
        </div>
        <div class="impact-stat">
            <h3>Silver</h3>
            <span>Donor Level</span>
        </div>
    `;
}

function updateRecentActivities() {
    const activityFeed = document.getElementById('recent-activities');
    if (!activityFeed) return; // Safety check
    
    const recentDonations = MOCK_DONATIONS.slice(0, 5);

    activityFeed.innerHTML = recentDonations.map(donation => {
        const ngo = MOCK_NGOS.find(n => n.id === donation.ngoId);
        return `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-hand-holding-heart"></i>
                </div>
                <div class="activity-details">
                    <p>Donated ${formatAmount(donation.amount)} to ${ngo.name}</p>
                    <small>${formatDate(donation.date)}</small>
                </div>
                <a href="https://explorer.xinfin.network/tx/${donation.txHash}" 
                   target="_blank" 
                   class="btn btn-sm btn-outline">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        `;
    }).join('');
}

function loadFeaturedNGOs() {
    const featuredNGOs = document.getElementById('featured-ngos');
    if (!featuredNGOs) return; // Safety check
    
    const featured = MOCK_NGOS.slice(0, 3);

    featuredNGOs.innerHTML = featured.map(ngo => `
        <div class="ngo-card">
            <div class="ngo-image">
                <img src="${ngo.image}" alt="${ngo.name}">
            </div>
            <div class="ngo-info">
                <h3>${ngo.name}</h3>
                <p>${ngo.description}</p>
                <div class="ngo-stats">
                    <span><i class="fas fa-coins"></i> ${formatAmount(ngo.totalRaised)} raised</span>
                    <span><i class="fas fa-users"></i> ${ngo.donors} donors</span>
                </div>
                <button class="btn btn-primary btn-block donate-btn" data-ngo-id="${ngo.id}">
                    Donate Now
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to newly created buttons
    document.querySelectorAll('.donate-btn').forEach(btn => {
        btn.addEventListener('click', handleDonation);
    });
}

function loadNGOGrid() {
    const grid = document.getElementById('ngo-grid');
    if (!grid) return; // Safety check
    
    updateNGOGrid(MOCK_NGOS);
}

function updateDonationHistory() {
    const tbody = document.getElementById('donations-list');
    if (!tbody) return; // Safety check
    
    tbody.innerHTML = MOCK_DONATIONS.map(donation => {
        const ngo = MOCK_NGOS.find(n => n.id === donation.ngoId);
        return `
            <tr>
                <td>${formatDate(donation.date)}</td>
                <td>
                    <div class="ngo-cell">
                        <img src="${ngo.image}" alt="${ngo.name}">
                        <span>${ngo.name}</span>
                    </div>
                </td>
                <td>${formatAmount(donation.amount)}</td>
                <td>
                    <a href="https://explorer.xinfin.network/tx/${donation.txHash}" 
                       target="_blank" 
                       class="tx-link">
                        ${shortenAddress(donation.txHash)}
                    </a>
                </td>
                <td>
                    <span class="status ${donation.status.toLowerCase()}">
                        ${donation.status}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

function initializeWallet() {
    const addressElement = document.getElementById('wallet-address');
    const balanceElement = document.getElementById('wallet-balance');
    
    if (addressElement) {
        addressElement.textContent = shortenAddress(CONFIG.mockWalletAddress);
    }
    
    if (balanceElement) {
        balanceElement.textContent = formatAmount(2500);
    }
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Donation buttons are now set in loadFeaturedNGOs and updateNGOGrid

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleCategoryFilter);
    });

    // Profile form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }

    // Wallet connect button
    const connectWalletBtn = document.getElementById('connect-wallet');
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', handleConnectWallet);
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Modal close
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            document.getElementById('donation-modal').style.display = 'none';
        });
    }

    // Cancel donation button
    const cancelDonationBtn = document.getElementById('cancel-donation');
    if (cancelDonationBtn) {
        cancelDonationBtn.addEventListener('click', () => {
            document.getElementById('donation-modal').style.display = 'none';
        });
    }

    // Donation form
    const donationForm = document.getElementById('donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', handleDonationSubmit);
    }

    // Refresh balance button
    const refreshBalanceBtn = document.getElementById('refresh-balance');
    if (refreshBalanceBtn) {
        refreshBalanceBtn.addEventListener('click', handleRefreshBalance);
    }

    // Copy wallet address button
    const copyAddressBtn = document.querySelector('.copy-address');
    if (copyAddressBtn) {
        copyAddressBtn.addEventListener('click', handleCopyAddress);
    }
}

// Event Handlers
function handleNavigation(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    
    // Update active states
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    e.currentTarget.classList.add('active');
}

function handleDonation(e) {
    const ngoId = e.currentTarget.dataset.ngoId;
    const ngo = MOCK_NGOS.find(n => n.id === parseInt(ngoId));
    
    if (!ngo) return; // Safety check
    
    // Show donation modal
    const modal = document.getElementById('donation-modal');
    if (modal) {
        modal.style.display = 'flex';
        const modalHeader = modal.querySelector('h3');
        if (modalHeader) {
            modalHeader.textContent = `Donate to ${ngo.name}`;
        }
    }
}

function handleDonationSubmit(e) {
    e.preventDefault();
    
    // Get amount from form
    const amountInput = e.target.querySelector('input[type="number"]');
    const amount = amountInput ? parseFloat(amountInput.value) : 0;
    
    if (amount <= 0) {
        showToast('Please enter a valid amount');
        return;
    }
    
    // Simulate donation process
    setTimeout(() => {
        document.getElementById('donation-modal').style.display = 'none';
        showToast(`Thank you for donating ${formatAmount(amount)}`);
        
        // Reset form
        e.target.reset();
    }, 1000);
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredNGOs = MOCK_NGOS.filter(ngo => 
        ngo.name.toLowerCase().includes(searchTerm) ||
        ngo.description.toLowerCase().includes(searchTerm)
    );
    updateNGOGrid(filteredNGOs);
}

function handleCategoryFilter(e) {
    const category = e.target.dataset.category;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    const filteredNGOs = category === 'all' 
        ? MOCK_NGOS 
        : MOCK_NGOS.filter(ngo => ngo.category.toLowerCase() === category);
    updateNGOGrid(filteredNGOs);
}

function handleProfileUpdate(e) {
    e.preventDefault();
    // Simulate profile update
    showToast('Profile updated successfully!');
}

function handleConnectWallet() {
    // Simulate wallet connection
    showToast('Wallet connected successfully!');
}

function handleRefreshBalance() {
    // Simulate balance refresh
    const newBalance = Math.floor(Math.random() * 1000) + 2000;
    document.getElementById('wallet-balance').textContent = formatAmount(newBalance);
    showToast('Balance updated!');
}

function handleCopyAddress() {
    const addressElement = document.getElementById('wallet-address');
    if (!addressElement) return;
    
    // Copy address to clipboard
    navigator.clipboard.writeText(CONFIG.mockWalletAddress)
        .then(() => {
            showToast('Wallet address copied to clipboard');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
            showToast('Failed to copy address');
        });
}

function handleLogout(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
        window.location.href = '/login.html';
    }
}

// Helper Functions
function showToast(message) {
    // Create and show toast notification
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Add styles if not in CSS
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '1000';
    toast.style.minWidth = '200px';
    toast.style.textAlign = 'center';
    toast.style.animation = 'fadeIn 0.3s, fadeOut 0.3s 2.7s';
    
    // Add animation keyframes if not in CSS
    if (!document.querySelector('#toast-animations')) {
        const style = document.createElement('style');
        style.id = 'toast-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(20px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function updateNGOGrid(ngos) {
    const grid = document.getElementById('ngo-grid');
    if (!grid) return; // Safety check
    
    grid.innerHTML = ngos.map(ngo => `
        <div class="ngo-card">
            <div class="ngo-image">
                <img src="${ngo.image}" alt="${ngo.name}">
            </div>
            <div class="ngo-info">
                <h3>${ngo.name}</h3>
                <p>${ngo.description}</p>
                <div class="ngo-stats">
                    <span><i class="fas fa-coins"></i> ${formatAmount(ngo.totalRaised)} raised</span>
                    <span><i class="fas fa-users"></i> ${ngo.donors} donors</span>
                </div>
                <button class="btn btn-primary btn-block donate-btn" data-ngo-id="${ngo.id}">
                    Donate Now
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to newly created buttons
    document.querySelectorAll('#ngo-grid .donate-btn').forEach(btn => {
        btn.addEventListener('click', handleDonation);
    });
}