/**
 * BSI UMKM Centre - Dashboard JavaScript
 * Handles user authentication, data loading, and interactive features
 */

// ===============================
// AUTHENTICATION & USER DATA
// ===============================

/**
 * Check if user is authenticated
 * Redirects to login if not authenticated
 */
const checkAuth = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!user || !token) {
        showMessage('Akses tidak valid. Silakan login terlebih dahulu.', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return false;
    }
    return true;
};

/**
 * Load and display user information
 */
const loadUserInfo = () => {
    const user = localStorage.getItem('user');
    
    if (user) {
        try {
            const userData = JSON.parse(user);
            
            // Update user name in header
            const userNameElement = document.getElementById('userName');
            if (userNameElement) {
                userNameElement.textContent = userData.name || 'Pengguna';
            }
            
            // Update user info details
            updateUserInfoField('userFullName', userData.name || '-');
            updateUserInfoField('userEmail', userData.email || '-');
            updateUserInfoField('userPhone', userData.phone || '-');
            updateUserInfoField('userRole', userData.role || 'Member');
            updateUserInfoField('userJoinDate', formatDate(userData.joinDate) || 'Hari ini');
            updateUserInfoField('loginTime', getCurrentDateTime());
            
            // Update stats (mock data for demo)
            updateStats(userData);
            
        } catch (error) {
            console.error('Error parsing user data:', error);
            showMessage('Terjadi kesalahan saat memuat data pengguna.', 'error');
        }
    }
};

/**
 * Update individual user info field
 */
const updateUserInfoField = (elementId, value) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
};

/**
 * Update statistics cards with user data
 */
const updateStats = (userData) => {
    // Mock statistics - replace with actual API calls
    const stats = {
        totalProducts: userData.totalProducts || Math.floor(Math.random() * 50) + 10,
        totalOrders: userData.totalOrders || Math.floor(Math.random() * 100) + 5,
        revenue: userData.revenue || 'Rp ' + (Math.floor(Math.random() * 10000000) + 1000000).toLocaleString('id-ID'),
        activeProjects: userData.activeProjects || Math.floor(Math.random() * 10) + 1
    };
    
    updateUserInfoField('statProducts', stats.totalProducts);
    updateUserInfoField('statOrders', stats.totalOrders);
    updateUserInfoField('statRevenue', stats.revenue);
    updateUserInfoField('statProjects', stats.activeProjects);
};

// ===============================
// LOGOUT FUNCTIONALITY
// ===============================

/**
 * Handle user logout
 */
const logout = () => {
    if (confirm('Apakah Anda yakin ingin keluar dari dashboard?')) {
        // Clear all user data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('sessionTime');
        
        showMessage('Anda telah berhasil logout. Sampai jumpa!', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }
};

// ===============================
// UTILITY FUNCTIONS
// ===============================

/**
 * Display toast message
 */
const showMessage = (message, type = 'info') => {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.toast-message');
    existingMessages.forEach(msg => msg.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    
    const colors = {
        success: { bg: '#d4edda', text: '#155724', border: '#c3e6cb' },
        error: { bg: '#f8d7da', text: '#721c24', border: '#f5c6cb' },
        warning: { bg: '#fff3cd', text: '#856404', border: '#ffeaa7' },
        info: { bg: '#d1ecf1', text: '#0c5460', border: '#bee5eb' }
    };
    
    const color = colors[type] || colors.info;
    
    toast.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        background: ${color.bg};
        color: ${color.text};
        border: 1px solid ${color.border};
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-family: 'Lato', sans-serif;
        font-weight: 500;
        font-size: 14px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    // Add icon based on type
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    toast.innerHTML = `
        <span style="font-size: 18px; font-weight: 700;">${icons[type] || icons.info}</span>
        <span>${message}</span>
    `;
    
    // Add animation styles if not exists
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { 
                    opacity: 0; 
                    transform: translateX(100%); 
                }
                to { 
                    opacity: 1; 
                    transform: translateX(0); 
                }
            }
            @keyframes slideOutRight {
                from { 
                    opacity: 1; 
                    transform: translateX(0); 
                }
                to { 
                    opacity: 0; 
                    transform: translateX(100%); 
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 4000);
};

/**
 * Format date to Indonesian format
 */
const formatDate = (dateString) => {
    if (!dateString) return 'Hari ini';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return 'Hari ini';
    }
};

/**
 * Get current date and time in Indonesian format
 */
const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

/**
 * Update clock in real-time
 */
const updateClock = () => {
    const clockElement = document.getElementById('currentTime');
    if (clockElement) {
        clockElement.textContent = getCurrentDateTime();
    }
};

// ===============================
// ANIMATIONS
// ===============================

/**
 * Animate elements on page load
 */
const animateOnLoad = () => {
    const elements = document.querySelectorAll('.fade-in-up');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
};

/**
 * Add hover effects to cards
 */
const addCardEffects = () => {
    const cards = document.querySelectorAll('.stat-card, .action-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
};

// ===============================
// NAVIGATION
// ===============================

/**
 * Navigate to specific page
 */
const navigateTo = (page) => {
    window.location.href = page;
};

/**
 * Scroll to section
 */
const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

// ===============================
// MOBILE MENU TOGGLE
// ===============================

/**
 * Toggle mobile navigation menu
 */
const toggleMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
};

// ===============================
// SESSION MANAGEMENT
// ===============================

/**
 * Check session validity
 * Auto logout after 1 hour of inactivity
 */
const checkSession = () => {
    const sessionTime = localStorage.getItem('sessionTime');
    const currentTime = new Date().getTime();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    
    if (sessionTime && (currentTime - sessionTime > oneHour)) {
        showMessage('Sesi Anda telah berakhir. Silakan login kembali.', 'warning');
        setTimeout(() => {
            logout();
        }, 2000);
    } else {
        // Update session time on activity
        localStorage.setItem('sessionTime', currentTime);
    }
};

/**
 * Reset session timer on user activity
 */
const resetSessionTimer = () => {
    localStorage.setItem('sessionTime', new Date().getTime());
};

// ===============================
// INITIALIZATION
// ===============================

/**
 * Initialize dashboard
 */
const initDashboard = () => {
    // Check authentication
    if (!checkAuth()) {
        return;
    }
    
    // Load user data
    loadUserInfo();
    
    // Start clock updates
    updateClock();
    setInterval(updateClock, 1000);
    
    // Animate elements
    setTimeout(() => {
        animateOnLoad();
        addCardEffects();
    }, 100);
    
    // Check session validity
    checkSession();
    
    // Reset session timer on user activity
    document.addEventListener('click', resetSessionTimer);
    document.addEventListener('keypress', resetSessionTimer);
    document.addEventListener('scroll', resetSessionTimer);
    
    // Show welcome message
    setTimeout(() => {
        showMessage('Selamat datang di Dashboard BSI UMKM Centre!', 'success');
    }, 500);
    
    console.log('Dashboard initialized successfully');
};

// ===============================
// EVENT LISTENERS
// ===============================

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initDashboard);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        checkSession();
        updateClock();
    }
});

// Prevent back button after logout
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        checkAuth();
    }
});

// Export functions for use in HTML onclick attributes
window.logout = logout;
window.navigateTo = navigateTo;
window.scrollToSection = scrollToSection;
window.toggleMobileMenu = toggleMobileMenu;
