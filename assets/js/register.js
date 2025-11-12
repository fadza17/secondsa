// BSI UMKM Centre - Registration Form Script
// Following exact Figma design specifications

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const registrationForm = document.getElementById('registrationForm');
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('nama');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Error message elements
    const emailError = document.getElementById('emailError');
    const nameError = document.getElementById('namaError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[a-zA-Z\s]{2,50}$/;

    // Validation functions
    function validateEmail(email) {
        if (!email.trim()) {
            return 'Email wajib diisi';
        }
        if (!emailPattern.test(email)) {
            return 'Format email tidak valid';
        }
        return null;
    }

    function validateName(name) {
        if (!name.trim()) {
            return 'Nama wajib diisi';
        }
        if (name.trim().length < 2) {
            return 'Nama minimal 2 karakter';
        }
        if (!namePattern.test(name)) {
            return 'Nama hanya boleh berisi huruf dan spasi';
        }
        return null;
    }

    function validatePassword(password) {
        if (!password) {
            return 'Password wajib diisi';
        }
        if (password.length < 6) {
            return 'Password minimal 6 karakter';
        }
        return null;
    }

    function validateConfirmPassword(password, confirmPassword) {
        if (!confirmPassword) {
            return 'Konfirmasi password wajib diisi';
        }
        if (password !== confirmPassword) {
            return 'Konfirmasi password tidak sesuai';
        }
        return null;
    }

    // Real-time validation
    function showError(input, errorElement, message) {
        input.classList.add('error');
        input.classList.remove('success');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    function clearError(input, errorElement) {
        input.classList.remove('error', 'success');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Input event listeners for real-time validation
    emailInput.addEventListener('input', function() {
        const error = validateEmail(this.value);
        if (this.value === '') {
            clearError(this, emailError);
        } else if (error) {
            showError(this, emailError, error);
        } else {
            showSuccess(this, emailError);
        }
    });

    nameInput.addEventListener('input', function() {
        const error = validateName(this.value);
        if (this.value === '') {
            clearError(this, nameError);
        } else if (error) {
            showError(this, nameError, error);
        } else {
            showSuccess(this, nameError);
        }
    });

    passwordInput.addEventListener('input', function() {
        const error = validatePassword(this.value);
        if (this.value === '') {
            clearError(this, passwordError);
        } else if (error) {
            showError(this, passwordError, error);
        } else {
            showSuccess(this, passwordError);
        }
        
        // Re-validate confirm password if it has value
        if (confirmPasswordInput.value) {
            const confirmError = validateConfirmPassword(this.value, confirmPasswordInput.value);
            if (confirmError) {
                showError(confirmPasswordInput, confirmPasswordError, confirmError);
            } else {
                showSuccess(confirmPasswordInput, confirmPasswordError);
            }
        }
    });

    confirmPasswordInput.addEventListener('input', function() {
        const error = validateConfirmPassword(passwordInput.value, this.value);
        if (this.value === '') {
            clearError(this, confirmPasswordError);
        } else if (error) {
            showError(this, confirmPasswordError, error);
        } else {
            showSuccess(this, confirmPasswordError);
        }
    });

    // Form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const email = emailInput.value.trim();
        const name = nameInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validate all fields
        const emailErr = validateEmail(email);
        const nameErr = validateName(name);
        const passwordErr = validatePassword(password);
        const confirmPasswordErr = validateConfirmPassword(password, confirmPassword);

        // Show errors if any
        let hasError = false;

        if (emailErr) {
            showError(emailInput, emailError, emailErr);
            hasError = true;
        } else {
            showSuccess(emailInput, emailError);
        }

        if (nameErr) {
            showError(nameInput, nameError, nameErr);
            hasError = true;
        } else {
            showSuccess(nameInput, nameError);
        }

        if (passwordErr) {
            showError(passwordInput, passwordError, passwordErr);
            hasError = true;
        } else {
            showSuccess(passwordInput, passwordError);
        }

        if (confirmPasswordErr) {
            showError(confirmPasswordInput, confirmPasswordError, confirmPasswordErr);
            hasError = true;
        } else {
            showSuccess(confirmPasswordInput, confirmPasswordError);
        }

        // If no errors, proceed with registration
        if (!hasError) {
            handleRegistration(email, name, password);
        } else {
            // Focus on first error field
            const firstError = document.querySelector('.form-input.error');
            if (firstError) {
                firstError.focus();
            }
        }
    });

    // Handle registration process
    async function handleRegistration(email, name, password) {
        const submitButton = document.querySelector('.btn-register');
        const originalText = submitButton.textContent;

        try {
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Mendaftarkan...';
            submitButton.classList.add('loading');

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Store user data (simulate database)
            const userData = {
                email: email,
                name: name,
                password: password, // In real app, this should be hashed
                registeredAt: new Date().toISOString()
            };

            // Store in localStorage (simulate database)
            localStorage.setItem('bsi_user_data', JSON.stringify(userData));

            // Show success message
            showSuccessMessage('Registrasi berhasil! Mengalihkan ke halaman login...');

            // Redirect to login page after delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);

        } catch (error) {
            console.error('Registration error:', error);
            showErrorMessage('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.classList.remove('loading');
        }
    }

    // Show success message
    function showSuccessMessage(message) {
        removeExistingMessage();
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message success';
        messageDiv.textContent = message;
        registrationForm.insertBefore(messageDiv, registrationForm.firstChild);
    }

    // Show error message
    function showErrorMessage(message) {
        removeExistingMessage();
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message error';
        messageDiv.textContent = message;
        registrationForm.insertBefore(messageDiv, registrationForm.firstChild);
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Remove existing message
    function removeExistingMessage() {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    // Handle login link navigation
    document.querySelector('.btn-login-link').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
    });

    // Focus first input on load
    setTimeout(() => {
        emailInput.focus();
    }, 500);

    console.log('BSI UMKM Centre Registration form initialized');
});