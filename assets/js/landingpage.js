// Memastikan bahwa semua elemen HTML telah dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    const navButtons = document.querySelectorAll('.nav-btn');

    // 1. Fungsi untuk menavigasi ke bagian halaman (scroll-to-section)
    window.scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            // Tutup menu mobile setelah navigasi
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        }
    };

    // 2. Fungsi untuk menampilkan/menyembunyikan menu mobile (toggleMenu)
    window.toggleMenu = () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    };

    // 3. Fungsi untuk membuka Google Maps
    window.openMaps = () => {
        const address = 'Jl. Doktor Sutomo No.8, Baciro, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55225';
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(url, '_blank');
    };

    // 4. Implementasi Intersection Observer untuk Animasi Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Mulai animasi ketika 10% elemen terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Hentikan observasi setelah dianimasikan
            }
        });
    }, observerOptions);

    // Amati elemen-elemen yang memiliki kelas untuk animasi
    document.querySelectorAll('.hero-text, .hero-card, .about-text, .about-image, .product-card, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // 5. Page Load Animation
    document.body.classList.add('page-loaded');

    // 6. Event listener untuk toggle menu
    navToggle.addEventListener('click', window.toggleMenu);

    // 7. Event listener untuk menutup menu saat klik salah satu tombol di menu
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}); 