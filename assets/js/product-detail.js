// Pastikan semua elemen HTML sudah dimuat
document.addEventListener('DOMContentLoaded', () => {
  /* ===============================
     1. NAVBAR (RESPONSIF & SCROLL)
  =============================== */
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.querySelector('.nav-toggle');
  const navButtons = document.querySelectorAll('.nav-btn');

  // Fungsi membuka/menutup menu mobile
  window.toggleMenu = () => {
    if (!navMenu || !navToggle) return;
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  };

  // Navigasi scroll-to-section (smooth)
  window.scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      if (navMenu?.classList.contains('active')) toggleMenu();
    }
  };

  // Event: klik tombol toggle (jika ada)
  if (navToggle) {
    navToggle.addEventListener('click', window.toggleMenu);
  }

  // Tutup menu setelah klik tombol navigasi
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (navMenu?.classList.contains('active')) toggleMenu();
    });
  });

  /* ===============================
     2. FITUR KUANTITAS PRODUK
  =============================== */
  const qtyInput = document.getElementById('qty');
  const plusBtn = document.querySelector('.btn-plus');
  const minusBtn = document.querySelector('.btn-minus');

  if (qtyInput && plusBtn && minusBtn) {
    plusBtn.addEventListener('click', () => {
      qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    minusBtn.addEventListener('click', () => {
      if (parseInt(qtyInput.value) > 1) qtyInput.value--;
    });
  }

  /* ===============================
     3. ANIMASI SCROLL
  =============================== */
  const observerOptions = { root: null, threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll('.product-card, .page-title, .product-specs-section')
    .forEach(el => observer.observe(el));

  /* ===============================
     4. PAGE LOAD EFFECT
  =============================== */
  document.body.classList.add('page-loaded');
});
