// ===============================
// FAQ ACCORDION FUNCTIONALITY
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ items
    const faqItems = document.querySelectorAll('.faq-item');

    // Add click event listener to each FAQ question
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // Check if this item is already active
            const isActive = item.classList.contains('active');

            // Close all FAQ items (optional: remove these lines if you want multiple items open)
            faqItems.forEach(function(otherItem) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            } else {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Optional: Close FAQ when clicking outside
    document.addEventListener('click', function(event) {
        // Check if click is outside all FAQ items
        const isClickInside = event.target.closest('.faq-item');

        if (!isClickInside) {
            // Uncomment the lines below if you want to close all FAQs when clicking outside
            // faqItems.forEach(function(item) {
            //     item.classList.remove('active');
            //     item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            // });
        }
    });

    // Keyboard accessibility: Enter and Space keys
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');

        question.addEventListener('keydown', function(event) {
            // Check if Enter or Space key is pressed
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                question.click();
            }
        });
    });
});

// ===============================
// SMOOTH SCROLL (BONUS)
// ===============================

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===============================
// FORM VALIDATION (BONUS)
// ===============================

const contactInput = document.querySelector('.contact-input');

if (contactInput) {
    contactInput.addEventListener('input', function() {
        // Remove error styling when user starts typing
        this.style.borderColor = '';
    });
}

// Email button validation
const emailButton = document.querySelector('.btn-email');
if (emailButton) {
    emailButton.addEventListener('click', function(e) {
        const input = document.querySelector('.contact-input');

        if (input && input.value.trim() === '') {
            e.preventDefault();
            input.style.borderColor = '#e74c3c';
            input.focus();

            // Show error message (you can customize this)
            alert('Mohon isi pertanyaan Anda terlebih dahulu!');
        }
    });
}

// WhatsApp button validation
const whatsappButton = document.querySelector('.btn-whatsapp');
if (whatsappButton) {
    whatsappButton.addEventListener('click', function(e) {
        const input = document.querySelector('.contact-input');

        if (input && input.value.trim() === '') {
            e.preventDefault();
            input.style.borderColor = '#e74c3c';
            input.focus();

            // Show error message (you can customize this)
            alert('Mohon isi pertanyaan Anda terlebih dahulu!');
        } else if (input) {
            // Append the question to WhatsApp link
            const question = encodeURIComponent(input.value);
            const currentHref = this.getAttribute('href');

            // Update href to include the message
            if (!currentHref.includes('?text=')) {
                this.setAttribute('href', currentHref + '?text=' + question);
            }
        }
    });
}

// ===============================
// NAVBAR SCROLL EFFECT (BONUS)
// ===============================

let lastScroll = 0;
const navbar = document.querySelector('.navbar-wrapper');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolling down
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0px 4px 20px rgba(20, 20, 43, 0.15)';
    } else {
        navbar.style.boxShadow = '0px 2px 12px rgba(20, 20, 43, 0.08)';
    }

    lastScroll = currentScroll;
});