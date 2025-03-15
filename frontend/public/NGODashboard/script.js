// Constants
const MOCK_DONATIONS = [
    { date: '2025-03-15', donor: 'Anonymous', amount: 500, txId: '0x123...abc', status: 'Confirmed' },
    { date: '2025-03-14', donor: 'John Doe', amount: 1000, txId: '0x456...def', status: 'Confirmed' },
    { date: '2025-03-13', donor: 'Jane Smith', amount: 750, txId: '0x789...ghi', status: 'Confirmed' }
];

const MOCK_WITHDRAWALS = [
    { date: '2025-03-12', amount: 1000, status: 'Completed', txId: '0xabc...123' },
    { date: '2025-03-10', amount: 500, status: 'Pending', txId: '0xdef...456' }
];

// Utility Functions
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const formatCurrency = (amount) => {
    return `${amount.toLocaleString()} XRC20`;
};

const updateCurrentTime = () => {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

// Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize current user
    document.getElementById('ngo-name').textContent = 'NGO Demo Account';
    
    // Setup navigation
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        if (link.id !== 'logout-btn') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                showSection(targetId);
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        }
    });

    // Initialize dashboard data
    initializeDashboard();
    
    // Start time updates
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Setup event listeners
    setupEventListeners();
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function initializeDashboard() {
    // Update stats
    const totalDonations = MOCK_DONATIONS.reduce((sum, d) => sum + d.amount, 0);
    document.getElementById('total-donations').textContent = formatCurrency(totalDonations);
    document.getElementById('available-balance').textContent = formatCurrency(totalDonations - 1500); // Subtracting mock withdrawals
    document.getElementById('total-donors').textContent = new Set(MOCK_DONATIONS.map(d => d.donor)).size;

    // Initialize donations table
    updateDonationsTable(MOCK_DONATIONS);

    // Initialize withdrawal history
    updateWithdrawalHistory(MOCK_WITHDRAWALS);

    // Initialize recent activities
    updateRecentActivities();
}

function updateDonationsTable(donations) {
    const tbody = document.getElementById('donations-list');
    tbody.innerHTML = donations.map(donation => `
        <tr>
            <td>${formatDate(donation.date)}</td>
            <td>${donation.donor}</td>
            <td>${formatCurrency(donation.amount)}</td>
            <td><a href="#" class="tx-link">${donation.txId}</a></td>
            <td><span class="status ${donation.status.toLowerCase()}">${donation.status}</span></td>
        </tr>
    `).join('');
}

function updateWithdrawalHistory(withdrawals) {
    const tbody = document.getElementById('withdrawal-history');
    tbody.innerHTML = withdrawals.map(withdrawal => `
        <tr>
            <td>${formatDate(withdrawal.date)}</td>
            <td>${formatCurrency(withdrawal.amount)}</td>
            <td><span class="status ${withdrawal.status.toLowerCase()}">${withdrawal.status}</span></td>
            <td><a href="#" class="tx-link">${withdrawal.txId}</a></td>
        </tr>
    `).join('');
}

function updateRecentActivities() {
    const activities = [...MOCK_DONATIONS, ...MOCK_WITHDRAWALS]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    const activityList = document.getElementById('recent-activities');
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas ${activity.donor ? 'fa-hand-holding-heart' : 'fa-wallet'}"></i>
            </div>
            <div class="activity-details">
                <p>${activity.donor ? 
                    `Received ${formatCurrency(activity.amount)} from ${activity.donor}` :
                    `Withdrew ${formatCurrency(activity.amount)}`}</p>
                <small>${formatDate(activity.date)}</small>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Withdrawal form handling
    const withdrawalForm = document.getElementById('withdrawal-form');
    const modal = document.getElementById('confirmation-modal');

    withdrawalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = document.getElementById('withdrawal-amount').value;
        document.getElementById('confirm-amount').textContent = formatCurrency(parseFloat(amount));
        modal.style.display = 'flex';
    });

    // Modal buttons
    document.getElementById('cancel-withdrawal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.getElementById('confirm-withdrawal').addEventListener('click', () => {
        const amount = parseFloat(document.getElementById('withdrawal-amount').value);
        const walletAddress = document.getElementById('wallet-address').value;
        
        // Add new withdrawal to history
        const newWithdrawal = {
            date: new Date().toISOString().split('T')[0],
            amount: amount,
            status: 'Pending',
            txId: '0x' + Math.random().toString(16).substr(2, 10) + '...'
        };

        MOCK_WITHDRAWALS.unshift(newWithdrawal);
        updateWithdrawalHistory(MOCK_WITHDRAWALS);
        updateRecentActivities();

        // Reset form and close modal
        withdrawalForm.reset();
        modal.style.display = 'none';
    });

    // Profile form handling
    const profileForm = document.getElementById('profile-form');
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate saving profile changes
        alert('Profile changes saved successfully!');
    });

    // Document upload handling
    const documentInput = document.getElementById('document-input');
    documentInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        const uploadedDocs = document.getElementById('uploaded-documents');
        
        files.forEach(file => {
            const docElement = document.createElement('div');
            docElement.className = 'uploaded-doc';
            docElement.innerHTML = `
                <i class="fas fa-file-alt"></i>
                <span>${file.name}</span>
                <small>${(file.size / 1024).toFixed(1)} KB</small>
            `;
            uploadedDocs.appendChild(docElement);
        });
    });

    // Donation filters
    const dateFilter = document.getElementById('date-filter');
    const donorFilter = document.getElementById('donor-filter');
    const amountFilter = document.getElementById('amount-filter');

    [dateFilter, donorFilter, amountFilter].forEach(filter => {
        filter.addEventListener('change', () => {
            let filteredDonations = [...MOCK_DONATIONS];

            if (dateFilter.value) {
                filteredDonations = filteredDonations.filter(d => d.date === dateFilter.value);
            }

            if (donorFilter.value) {
                filteredDonations = filteredDonations.filter(d => 
                    d.donor.toLowerCase().includes(donorFilter.value.toLowerCase())
                );
            }

            if (amountFilter.value) {
                const [min, max] = amountFilter.value.split('-').map(v => 
                    v.includes('+') ? Infinity : parseInt(v)
                );
                filteredDonations = filteredDonations.filter(d => 
                    d.amount >= min && (max === Infinity || d.amount <= max)
                );
            }

            updateDonationsTable(filteredDonations);
        });
    });

    // Logout handling
    document.getElementById('logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        // Clear user session and redirect to login
        localStorage.removeItem('ngotrust_current_user');
        sessionStorage.removeItem('ngotrust_current_user');
        window.location.href = '/frontend/public/Authentication/index.html';
    });
}