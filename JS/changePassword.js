// Toggle password visibility by input id; updates icon to eye / eye-slash
function togglePasswordById(inputId, eyeSvg) {
    const input = document.getElementById(inputId);
    if (!input || !eyeSvg) return;
  
    if (input.type === 'password') {
      input.type = 'text';
      // eye-slash
      eyeSvg.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
      `;
    } else {
      input.type = 'password';
      // eye
      eyeSvg.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
      `;
    }
  }
  
  // Setup delegated listeners for eye buttons (uses data-toggle attribute)
  function initEyeToggles() {
    document.querySelectorAll('button[data-toggle]').forEach(btn => {
      const targetId = btn.getAttribute('data-toggle');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const svg = btn.querySelector('svg');
        togglePasswordById(targetId, svg);
      });
    });
  }
  
  // Floating labels: ensure labels float if inputs are prefilled (autofill)
  function initFloatingInputs() {
    document.querySelectorAll('.floating-input input').forEach(input => {
      const lbl = input.parentElement.querySelector('label');
      if (!lbl) return;
      const update = () => {
        // rely on peer-placeholder-shown for usual behaviour; handle autofill/prefill
        if (input.value && input.value.trim() !== '') {
          lbl.style.top = '-0.625rem';
          lbl.style.fontSize = '0.75rem';
          lbl.style.background = getComputedStyle(document.documentElement).getPropertyValue('--card') || '#fff';
          lbl.style.padding = '0 0.25rem';
          lbl.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#01284C';
        } else {
          lbl.style.top = '';
          lbl.style.fontSize = '';
          lbl.style.background = '';
          lbl.style.padding = '';
          lbl.style.color = '';
        }
      };
      update();
      input.addEventListener('input', update);
    });
  }
  
  // Form submit logic (same behaviour as original)
  function initFormHandler() {
    const form = document.getElementById('changePasswordForm');
    if (!form) return;
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const current = document.getElementById('currentPassword').value;
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
  
      if (!current || !newPassword || !confirmPassword) {
        alert('Please fill all required fields.');
        return;
      }
  
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      // In production: call your API to change password here
      alert('Password changed successfully!');
      // simulate navigate('/dashboard')
      window.location.href = '/dashboard';
    });
  
    // Cancel button behaviour
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function () {
        window.location.href = '/dashboard';
      });
    }
  }
  
  // Init all on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initEyeToggles();
    initFloatingInputs();
    initFormHandler();
  });
  