/**
 * BSI UMKM Centre - Katalog JavaScript
 * Following BSI UMKM Centre AI Coding Agent Guidelines
 * Exact Figma specifications with performance optimizations
 */

// ===============================
// PRODUCT DATA - Sample Indonesian UMKM products
// ===============================
const productData = [
    {
        id: 1,
        name: "Gudeg Kaleng Bu Tjitro",
        category: "makanan",
        price: 25000,
        image: "assets/images/produk-gudeg.jpg",
        seller: "UMKM Bu Tjitro",
        description: "Gudeg khas Yogyakarta dalam kemasan kaleng praktis"
    },
    {
        id: 2,
        name: "Batik Tulis Jogja Premium",
        category: "batik",
        price: 450000,
        image: "assets/images/produk-batik.jpg",
        seller: "Batik Nusantara",
        description: "Batik tulis asli Jogja dengan motif tradisional"
    },
    {
        id: 3,
        name: "Kerajinan Bambu Set Dapur",
        category: "bambu",
        price: 85000,
        image: "assets/images/produk-bambu.jpg",
        seller: "Bamboo Art Jogja",
        description: "Set peralatan dapur dari bambu ramah lingkungan"
    },
    {
        id: 4,
        name: "Bakpia Pathok 25",
        category: "makanan",
        price: 35000,
        image: "assets/images/produk-bakpia.jpg",
        seller: "Bakpia Pathok",
        description: "Bakpia khas Yogyakarta dengan berbagai rasa"
    },
    {
        id: 5,
        name: "Tas Tenun Tradisional",
        category: "aksesoris",
        price: 120000,
        image: "assets/images/produk-tas-tenun.jpg",
        seller: "Tenun Nusantara",
        description: "Tas tenun handmade dengan motif etnik"
    },
    {
        id: 6,
        name: "Keramik Kasongan Set",
        category: "keramik",
        price: 150000,
        image: "assets/images/produk-keramik.jpg",
        seller: "Keramik Kasongan",
        description: "Set keramik hias dan fungsi dari Kasongan"
    },
    // Tambah produk lainnya untuk demonstrasi pagination
    ...Array.from({length: 84}, (_, i) => ({
        id: i + 7,
        name: `Produk UMKM ${i + 7}`,
        category: ['makanan', 'batik', 'bambu', 'aksesoris', 'keramik'][i % 5],
        price: Math.floor(Math.random() * 500000) + 10000,
        image: "assets/images/Frame 3.png",
        seller: `UMKM Partner ${i + 7}`,
        description: `Deskripsi produk UMKM berkualitas tinggi nomor ${i + 7}`
    }))
];

// ===============================
// GLOBAL VARIABLES
// ===============================
let currentPage = 1;
const productsPerPage = 9;
let filteredProducts = [...productData];
let totalPages = Math.ceil(filteredProducts.length / productsPerPage);

// ===============================
// MOBILE MENU FUNCTIONALITY - Following BSI Guidelines
// ===============================
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu && navToggle) {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Prevent body scroll when menu is open
        document.body.classList.toggle('menu-open', !isExpanded);
    }
}

// ===============================
// FILTER FUNCTIONALITY - Enhanced UX
// ===============================
function toggleFilter(filterType) {
    const filterContent = document.getElementById(`${filterType}-filter`);
    const filterHeader = filterContent.previousElementSibling;
    const chevron = filterHeader.querySelector('.chevron-icon');
    
    if (filterContent.style.display === 'none' || !filterContent.style.display) {
        filterContent.style.display = 'block';
        chevron.style.transform = 'rotate(180deg)';
        filterHeader.classList.add('active');
    } else {
        filterContent.style.display = 'none';
        chevron.style.transform = 'rotate(0deg)';
        filterHeader.classList.remove('active');
    }
}

function toggleSubcategory(category) {
    const subcategoryList = document.getElementById(`${category}-sub`);
    const categoryItem = subcategoryList.previousElementSibling;
    const chevron = categoryItem.querySelector('.chevron-icon');
    
    if (subcategoryList.style.display === 'none') {
        subcategoryList.style.display = 'block';
        chevron.style.transform = 'rotate(180deg)';
        categoryItem.classList.add('active');
    } else {
        subcategoryList.style.display = 'none';
        chevron.style.transform = 'rotate(0deg)';
        categoryItem.classList.remove('active');
    }
}

// ===============================
// PRODUCT RENDERING - Following BSI Design System
// ===============================
function renderProducts(products, page = 1) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = products.slice(startIndex, endIndex);
    
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-category="${product.category}" data-price="${product.price}">
                                 <!-- Decorative BSI Shapes -->
            <svg class="shape-right-up" width="77" height="78" viewBox="0 0 77 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M77 77.2465V0H0.43588C58.2201 0 77 21.2145 77 77.2465Z" fill="#00A39D"/>
            </svg>

            
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='assets/images/Frame 3.png'">
            </div>
            <div class="product-info">

                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-seller">${product.seller}</div>
                <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
                <button class="buy-button" onclick="buyProduct(${product.id})">Beli</button>
            </div>
            <svg class="shape-left-down" xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91" fill="none">
                <path d="M91 90.2465V0H0.43588C58.2201 0 91 31.2145 91 90.2465Z" fill="#F8AD3C"/>
            </svg>   
            
        </div>
    `).join('');
    
    // Update product count
    updateProductCount(products.length);
    
    // Update pagination
    updatePagination(page, Math.ceil(products.length / productsPerPage));
}

function getCategoryName(category) {
    const categoryNames = {
        'makanan': 'Makanan Tradisional',
        'minuman': 'Minuman Khas',
        'snack': 'Snack & Camilan',
        'batik': 'Batik & Tenun',
        'pakaian': 'Pakaian Tradisional',
        'aksesoris': 'Aksesoris Fashion',
        'bambu': 'Kerajinan Bambu',
        'kayu': 'Kerajinan Kayu',
        'keramik': 'Keramik & Gerabah'
    };
    return categoryNames[category] || 'Produk UMKM';
}

// ===============================
// PAGINATION FUNCTIONALITY - Enhanced UX
// ===============================
function updatePagination(currentPage, totalPages) {
    const paginationDots = document.getElementById('pagination-dots');
    const pageInfo = document.getElementById('page-info');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    if (!paginationDots) return;
    
    // Update page info
    if (pageInfo) {
        pageInfo.textContent = `${currentPage} dari ${totalPages} Halaman`;
    }
    
    // Update navigation buttons
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
    
    // Update pagination dots (show max 5 dots)
    const maxDots = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxDots / 2));
    let endPage = Math.min(totalPages, startPage + maxDots - 1);
    
    if (endPage - startPage + 1 < maxDots) {
        startPage = Math.max(1, endPage - maxDots + 1);
    }
    
    paginationDots.innerHTML = '';
    for (let i = startPage; i <= endPage; i++) {
        const dot = document.createElement('div');
        dot.className = `pagination-dot ${i === currentPage ? 'active' : ''}`;
        dot.onclick = () => goToPage(i);
        paginationDots.appendChild(dot);
    }
}

function changePage(direction) {
    const newPage = currentPage + direction;
    const maxPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (newPage >= 1 && newPage <= maxPages) {
        goToPage(newPage);
    }
}

function goToPage(page) {
    currentPage = page;
    renderProducts(filteredProducts, currentPage);
    
    // Smooth scroll to top of products section
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===============================
// FILTER IMPLEMENTATION - Performance Optimized
// ===============================
function applyFilters() {
    const selectedCategory = getSelectedCategory();
    const selectedPriceRange = getSelectedPriceRange();
    
    filteredProducts = productData.filter(product => {
        const categoryMatch = !selectedCategory || product.category === selectedCategory;
        const priceMatch = !selectedPriceRange || checkPriceRange(product.price, selectedPriceRange);
        
        return categoryMatch && priceMatch;
    });
    
    // Reset to first page
    currentPage = 1;
    renderProducts(filteredProducts, currentPage);
}

function getSelectedCategory() {
    const activeSubcategory = document.querySelector('.subcategory-item.active');
    return activeSubcategory ? activeSubcategory.dataset.category : null;
}

function getSelectedPriceRange() {
    const selectedPrice = document.querySelector('input[name="price"]:checked');
    return selectedPrice ? selectedPrice.value : null;
}

function checkPriceRange(price, range) {
    switch(range) {
        case '0-50000': return price < 50000;
        case '50000-100000': return price >= 50000 && price <= 100000;
        case '100000-500000': return price >= 100000 && price <= 500000;
        case '500000+': return price > 500000;
        default: return true;
    }
}

// ===============================
// UTILITY FUNCTIONS - BSI Guidelines
// ===============================
function updateProductCount(count) {
    const countElement = document.getElementById('product-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

function buyProduct(productId) {
    const product = productData.find(p => p.id === productId);
    if (product) {
        // Redirect to login if not authenticated, otherwise add to cart
        const isLoggedIn = localStorage.getItem('bsi_user_session');
        
        if (!isLoggedIn) {
            localStorage.setItem('redirect_after_login', `katalog.html?product=${productId}`);
            window.location.href = 'login.html';
        } else {
            // Add to cart logic
            addToCart(product);
        }
    }
}

function addToCart(product) {
    // Mock add to cart functionality
    console.log(`Added ${product.name} to cart`);
    
    // Show success notification
    showNotification(`${product.name} berhasil ditambahkan ke keranjang!`, 'success');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===============================
// EVENT LISTENERS - Performance Optimized
// ===============================
function setupEventListeners() {
    // Category filter event listeners
    document.querySelectorAll('.subcategory-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all subcategory items
            document.querySelectorAll('.subcategory-item').forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Apply filters
            applyFilters();
        });
    });
    
    // Price filter event listeners
    document.querySelectorAll('input[name="price"]').forEach(input => {
        input.addEventListener('change', applyFilters);
    });
    
    // Mobile menu close on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
        }
    }, { passive: true });
}

// ===============================
// INITIALIZATION - DOMContentLoaded
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderProducts(filteredProducts, currentPage);
    
    // Setup event listeners
    setupEventListeners();
    
    // Handle URL parameters (for deep linking)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    if (productId) {
        // Highlight specific product or show product detail
        const productElement = document.querySelector(`[data-product-id="${productId}"]`);
        if (productElement) {
            productElement.scrollIntoView({ behavior: 'smooth' });
            productElement.classList.add('highlighted');
        }
    }
    
    console.log('BSI UMKM Centre Katalog initialized successfully');
});

// ===============================
// GLOBAL EXPORTS - BSI Guidelines
// ===============================
window.BSIKatalog = {
    toggleMenu,
    toggleFilter,
    toggleSubcategory,
    changePage,
    goToPage,
    buyProduct,
    applyFilters
};

// Make functions globally available for onclick attributes
window.toggleMenu = toggleMenu;
window.toggleFilter = toggleFilter;
window.toggleSubcategory = toggleSubcategory;
window.changePage = changePage;
window.buyProduct = buyProduct;

// Mobile Navigation Functions
window.toggleMobileMenu = function() {
    const nav = document.getElementById('mobile-nav');
    const toggle = document.querySelector('.mobile-nav-toggle');
    
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('mobile-nav');
    const toggle = document.querySelector('.mobile-nav-toggle');
    
    // Check if the menu or the toggle button was clicked
    if (nav && toggle && !nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove('active');
        toggle.classList.remove('active');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-nav a').forEach(link => {
    link.addEventListener('click', function() {
        const nav = document.getElementById('mobile-nav');
        const toggle = document.querySelector('.mobile-nav-toggle');
        
        if (nav) nav.classList.remove('active');
        if (toggle) toggle.classList.remove('active');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Category toggle functionality
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', function() {
            const chevron = this.querySelector('.chevron-icon');
            // Find all siblings that are subcategory-item until the next category-item
            let nextSibling = this.nextElementSibling;
            const subcategories = [];
            while(nextSibling && !nextSibling.classList.contains('category-item')) {
                if (nextSibling.classList.contains('subcategory-item')) {
                    subcategories.push(nextSibling);
                }
                nextSibling = nextSibling.nextElementSibling;
            }
            
            // Toggle chevron rotation and subcategories display
            if (chevron.style.transform === 'rotate(180deg)') {
                chevron.style.transform = 'rotate(0deg)';
                subcategories.forEach(sub => sub.style.display = 'none');
            } else {
                chevron.style.transform = 'rotate(180deg)';
                subcategories.forEach(sub => sub.style.display = 'block');
            }
        });
    });

    // Pagination functionality
    document.querySelectorAll('.pagination-dot').forEach((dot) => {
        dot.addEventListener('click', function() {
            document.querySelectorAll('.pagination-dot').forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Product card hover effects (Redundant if using pure CSS, but kept for consistency with original JS)
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Buy button functionality
        const buyButton = card.querySelector('.buy-button');
        if (buyButton) {
            buyButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent product card click from being triggered
                alert('Produk ditambahkan ke keranjang!');
            });
        }

        // Product card click functionality - redirect to product detail
        card.addEventListener('click', function(e) {
            // Only redirect if the clicked element is not the buy button
            if (!e.target.classList.contains('buy-button')) {
                window.location.href = 'product-detail.html';
            }
        });
    });
});