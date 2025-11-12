// Kelola Keuangan JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Load user data
    loadUserData();
    
    // Initialize withdrawals
    loadWithdrawals();
    
    // Setup form submission
    setupFormSubmission();
});

// Sample withdrawal data
let withdrawals = [
    {
        id: 'B010',
        umkm: 'Basreng bakar by Hilmi',
        totalProducts: 3,
        balance: 120000,
        withdrawal: 120000,
        bank: 'Mandiri',
        accountNumber: '1020938091',
        date: '20/20/2025',
        status: 'pending'
    },
    {
        id: 'B011',
        umkm: 'Keripik Singkong Manis',
        totalProducts: 5,
        balance: 250000,
        withdrawal: 250000,
        bank: 'BCA',
        accountNumber: '8765432109',
        date: '21/11/2025',
        status: 'pending'
    },
    {
        id: 'B012',
        umkm: 'Batik Sekar Jogja',
        totalProducts: 8,
        balance: 500000,
        withdrawal: 500000,
        bank: 'BNI',
        accountNumber: '5432167890',
        date: '22/11/2025',
        status: 'pending'
    }
];

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

// Load user data
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (userData) {
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

// Load withdrawals into table
function loadWithdrawals() {
    const tbody = document.getElementById('financeTableBody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending');
    
    if (pendingWithdrawals.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 40px;">Tidak ada request pencairan dana</td></tr>';
        return;
    }
    
    pendingWithdrawals.forEach(withdrawal => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${withdrawal.id}</td>
            <td>${withdrawal.umkm}</td>
            <td>${withdrawal.totalProducts}</td>
            <td>Rp. ${withdrawal.balance.toLocaleString('id-ID')}</td>
            <td>Rp. ${withdrawal.withdrawal.toLocaleString('id-ID')}</td>
            <td>${withdrawal.bank}</td>
            <td>${withdrawal.accountNumber}</td>
            <td>${withdrawal.date}</td>
            <td>
                <button class="btn-approve" onclick="approveWithdrawal('${withdrawal.id}')">Setujui</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Update pagination text
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        const displayCount = pendingWithdrawals.length;
        footerText.textContent = `1-${displayCount} of ${withdrawals.length}`;
    }
}

// Approve withdrawal
function approveWithdrawal(withdrawalId) {
    const withdrawal = withdrawals.find(w => w.id === withdrawalId);
    
    if (!withdrawal) return;
    
    const confirmMessage = `Apakah Anda yakin ingin menyetujui pencairan dana untuk ${withdrawal.umkm}?\n\nJumlah: Rp. ${withdrawal.withdrawal.toLocaleString('id-ID')}\nBank: ${withdrawal.bank}\nRekening: ${withdrawal.accountNumber}`;
    
    if (confirm(confirmMessage)) {
        // Update status
        withdrawal.status = 'approved';
        
        // Reload table
        loadWithdrawals();
        
        alert(`Pencairan dana untuk ${withdrawal.umkm} berhasil disetujui!`);
    }
}

// Open add withdrawal modal
function openAddWithdrawalModal() {
    const modal = document.getElementById('addWithdrawalModal');
    modal.classList.add('active');
}

// Close add withdrawal modal
function closeAddWithdrawalModal() {
    const modal = document.getElementById('addWithdrawalModal');
    modal.classList.remove('active');
    document.getElementById('addWithdrawalForm').reset();
}

// Setup form submission
function setupFormSubmission() {
    const form = document.getElementById('addWithdrawalForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newWithdrawal = {
                id: form.querySelector('input[placeholder*="B010"]').value,
                umkm: form.querySelectorAll('input[type="text"]')[1].value,
                totalProducts: parseInt(form.querySelector('input[placeholder*="3"]').value),
                balance: parseInt(form.querySelector('input[placeholder*="120000"]').value),
                withdrawal: parseInt(form.querySelectorAll('input[type="number"]')[2].value),
                bank: form.querySelector('select').value,
                accountNumber: form.querySelectorAll('input[type="text"]')[2].value,
                date: formatDate(form.querySelector('input[type="date"]').value),
                status: 'pending'
            };
            
            withdrawals.push(newWithdrawal);
            loadWithdrawals();
            closeAddWithdrawalModal();
            
            alert('Request pencairan dana berhasil ditambahkan!');
        });
    }
}

// Format date to DD/MM/YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addWithdrawalModal');
    if (event.target === modal) {
        closeAddWithdrawalModal();
    }
}