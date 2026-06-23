document.addEventListener('DOMContentLoaded', () => {
    // Handle floating labels for pre-filled inputs or autocomplete
    const inputs = document.querySelectorAll('.input-group input');
    
    const checkInput = (input) => {
        if (input.value.trim() !== '') {
            input.classList.add('has-val');
        } else {
            input.classList.remove('has-val');
        }
    };

    inputs.forEach(input => {
        // Check initial state
        checkInput(input);
        
        // Check on change/input
        input.addEventListener('input', () => checkInput(input));
        input.addEventListener('change', () => checkInput(input));
    });

    // Password Strength Meter
    const pwdInput = document.getElementById('password');
    const pwdContainer = document.querySelector('.pwd-strength-container');
    const pwdFill = document.querySelector('.pwd-strength-fill');
    const pwdText = document.querySelector('.pwd-strength-text');

    if (pwdInput && pwdContainer) {
        // Only show container on signup page where these elements exist
        pwdInput.addEventListener('input', () => {
            const val = pwdInput.value;
            
            if (val.length === 0) {
                pwdContainer.style.display = 'none';
                return;
            }
            
            pwdContainer.style.display = 'block';
            
            let strength = 0;
            if (val.length > 5) strength += 1;
            if (val.length > 8) strength += 1;
            if (/[A-Z]/.test(val)) strength += 1;
            if (/[0-9]/.test(val)) strength += 1;
            if (/[^A-Za-z0-9]/.test(val)) strength += 1;

            let color = '';
            let text = '';
            let width = '';

            switch(strength) {
                case 0:
                case 1:
                case 2:
                    color = '#ff4d4d';
                    text = 'Weak';
                    width = '33%';
                    break;
                case 3:
                case 4:
                    color = '#ffd700';
                    text = 'Medium';
                    width = '66%';
                    break;
                case 5:
                    color = '#00cc66';
                    text = 'Strong';
                    width = '100%';
                    break;
            }

            if (pwdFill && pwdText) {
                pwdFill.style.width = width;
                pwdFill.style.background = color;
                pwdText.textContent = text;
                pwdText.style.color = color;
            }
        });
    }

    // Form Validation (Basic)
    const form = document.querySelector('.auth-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const confirmPwd = document.getElementById('confirm_password');
            if (confirmPwd && pwdInput) {
                if (pwdInput.value !== confirmPwd.value) {
                    e.preventDefault();
                    alert('Passwords do not match.');
                    confirmPwd.focus();
                    return;
                }
            }
            
            // Save username to localStorage
            const emailInput = form.querySelector('input[type="email"]');
            let userName = 'User';
            if (emailInput && emailInput.value) {
                userName = emailInput.value.split('@')[0];
                userName = userName.charAt(0).toUpperCase() + userName.slice(1);
            }
            localStorage.setItem('userName', userName);
            
            // For static demo, force redirect
            e.preventDefault();
            const roleInput = document.querySelector('input[name="role"]:checked');
            const role = roleInput ? roleInput.value : 'photographer';
            window.location.href = (form.getAttribute('action') || 'dashboard.html') + '?role=' + role;
        });
    }
});
