// Dashboard Admin JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if user is logged in and is admin
    checkAuth();
    
    // Initialize Chart
    initVisitorsChart();
    
    // Load user data
    loadUserData();
});

// Authentication check
function checkAuth() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn || !userData || userData.role !== 'admin') {
        alert('Anda tidak memiliki akses ke halaman ini. Silakan login sebagai admin.');
        window.location.href = 'login.html';
        return;
    }
}

// Load user data into header
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (userData) {
        // Update user name and role in header
        const userNameElement = document.querySelector('.user-name');
        const userRoleElement = document.querySelector('.user-role');
        
        if (userNameElement) {
            userNameElement.textContent = userData.fullName || 'Administrator';
        }
        
        if (userRoleElement) {
            userRoleElement.textContent = userData.role === 'admin' ? 'Administrator' : 'User';
        }
    }
}

// Initialize Visitors Analytics Chart
function initVisitorsChart() {
    const ctx = document.getElementById('visitorsChart');
    
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Desktop', 'Mobile', 'Tablet', 'Unknown'],
            datasets: [{
                data: [65, 45, 34, 12],
                backgroundColor: [
                    '#00A39D', // Teal
                    '#F8AD3C', // Orange
                    '#3B82F6', // Blue
                    '#FF6B6B'  // Red
                ],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            }
        }
    });
}

// Logout function
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    }
}

// Tab switching functionality
document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Star icon toggle
document.querySelectorAll('.star-icon').forEach(star => {
    star.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

// Checkbox handlers
document.querySelectorAll('.users-table tbody input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const row = this.closest('tr');
        if (this.checked) {
            row.classList.add('row-active');
        } else {
            row.classList.remove('row-active');
        }
    });
});

// Master checkbox handler
const masterCheckbox = document.querySelector('.users-table thead input[type="checkbox"]');
if (masterCheckbox) {
    masterCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.users-table tbody input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.checked = this.checked;
            const row = cb.closest('tr');
            if (this.checked) {
                row.classList.add('row-active');
            } else {
                row.classList.remove('row-active');
            }
        });
    });
}