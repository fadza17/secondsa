// Kelola Produk JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Load user data
    loadUserData();
    
    // Initialize products
    loadProducts();
    
    // Setup search functionality
    setupSearch();
    
    // Setup form submission
    setupFormSubmission();
});

// Sample products data
let products = [
    {
        id: 'A001',
        name: 'Basreng Turbo 4 silinder',
        category: 'FnB',
        umkm: 'Basreng goreng...',
        price: 100000,
        sold: 22,
        stock: 100
    },
    {
        id: 'A002',
        name: 'Keripik Singkong Pedas',
        category: 'FnB',
        umkm: 'Snack Nusantara',
        price: 25000,
        sold: 45,
        stock: 150
    },
    {
        id: 'A003',
        name: 'Batik Tulis Jogja',
        category: 'Fashion',
        umkm: 'Batik Sekar',
        price: 350000,
        sold: 12,
        stock: 30
    },
    {
        id: 'A004',
        name: 'Tas Anyaman Mendong',
        category: 'Kerajinan',
        umkm: 'Anyaman Kreasi',
        price: 125000,
        sold: 18,
        stock: 45
    },
    {
        id: 'A005',
        name: 'Kopi Arabika Gayo',
        category: 'FnB',
        umkm: 'Kopi Nusantara',
        price: 85000,
        sold: 67,
        stock: 200
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

// Load products into table
function loadProducts(filteredProducts = null) {
    const tbody = document.getElementById('productsTableBody');
    const productsToDisplay = filteredProducts || products;
    
    tbody.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>
                <div class="product-name-cell">
                    <div class="product-image-box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 4h4v3h-4V4zm10 16H4V9h16v11z"/>
                        </svg>
                    </div>
                    <span>${product.name}</span>
                </div>
            </td>
            <td>${product.category}</td>
            <td>${product.umkm}</td>
            <td>Rp. ${product.price.toLocaleString('id-ID')}</td>
            <td>${product.sold}</td>
            <td>${product.stock}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-edit" onclick="editProduct('${product.id}')" title="Edit">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-action btn-delete" onclick="deleteProduct('${product.id}')" title="Delete">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Update pagination text
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        const displayCount = productsToDisplay.length;
        footerText.textContent = `1-${displayCount} of ${products.length}`;
    }
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchProduct');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            if (searchTerm === '') {
                loadProducts();
            } else {
                const filtered = products.filter(product => 
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.id.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm) ||
                    product.umkm.toLowerCase().includes(searchTerm)
                );
                loadProducts(filtered);
            }
        });
    }
}

// Open add product modal
function openAddProductModal() {
    const modal = document.getElementById('addProductModal');
    modal.classList.add('active');
}

// Close add product modal
function closeAddProductModal() {
    const modal = document.getElementById('addProductModal');
    modal.classList.remove('active');
    document.getElementById('addProductForm').reset();
}

// Setup form submission
function setupFormSubmission() {
    const form = document.getElementById('addProductForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const newProduct = {
                id: form.querySelector('input[placeholder*="A001"]').value,
                name: form.querySelector('input[placeholder*="nama produk"]').value,
                category: form.querySelector('select').value,
                umkm: form.querySelector('input[placeholder*="UMKM"]').value,
                price: parseInt(form.querySelector('input[type="number"][placeholder*="100000"]').value),
                sold: 0,
                stock: parseInt(form.querySelector('input[type="number"][placeholder*="100"]').value)
            };
            
            products.push(newProduct);
            loadProducts();
            closeAddProductModal();
            
            alert('Produk berhasil ditambahkan!');
        });
    }
}

// Edit product
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const newName = prompt('Edit Nama Produk:', product.name);
        if (newName) {
            product.name = newName;
            loadProducts();
            alert('Produk berhasil diupdate!');
        }
    }
}

// Delete product
function deleteProduct(productId) {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        products = products.filter(p => p.id !== productId);
        loadProducts();
        alert('Produk berhasil dihapus!');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addProductModal');
    if (event.target === modal) {
        closeAddProductModal();
    }
}