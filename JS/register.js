// Password visibility toggle function
function togglePassword(inputId, eyeIconId) {
    const input = document.getElementById(inputId);
    const eyeIcon = document.getElementById(eyeIconId);
  
    if (!input || !eyeIcon) return;
  
    if (input.type === 'password') {
      input.type = 'text';
      // Change to eye-slash icon (hidden)
      eyeIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
      `;
    } else {
      input.type = 'password';
      // Change to eye icon (visible)
      eyeIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
      `;
    }
  }
  
  // Floating labels: if inputs are prefilled (e.g. browser autofill), force labels to float
  function initFloatingInputs() {
    document.querySelectorAll('.floating-input input').forEach(input => {
      const lbl = input.parentElement.querySelector('label');
      const update = () => {
        // :placeholder-shown is false when value present, but to be safe handle programmatically:
        if (input.value && input.value.trim() !== '') {
          // match visual effect of label floating: add inline style fallback if needed
          lbl.classList.add('!top-[-0.625rem]','!text-xs');
          // Note: Tailwind's "!" utilities may not be available via CDN; peer selectors handle most states.
        } else {
          // If empty, we don't force any class so peer-placeholder-shown can handle it
          lbl.classList.remove('!top-[-0.625rem]','!text-xs');
        }
      };
      // run on load and on input
      update();
      input.addEventListener('input', update);
    });
  }
  
  // Form submit handler: validate passwords and mock navigation
  function initFormHandler() {
    const form = document.getElementById('registerForm');
    if (!form) return;
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const contactNumber = document.getElementById('contactNumber').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
  
      if (!name || !email || !contactNumber || !password || !confirmPassword) {
        alert('Please fill all required fields.');
        return;
      }
  
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      // Mock registration success -> navigate to /login (simulate React navigate)
      // In a real app you would POST to your API and handle errors
      alert('Registration successful — redirecting to login');
      window.location.href = '/login';
    });
  }
  
  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initFloatingInputs();
    initFormHandler();
  });
  