// Handle floating label initial state for autofilled/prefilled inputs
function initFloatingInputs() {
    document.querySelectorAll('.floating-input input').forEach(input => {
      const lbl = input.parentElement.querySelector('label');
      if (!lbl) return;
      const update = () => {
        // If input has a value, the :placeholder-shown pseudo-class becomes false.
        // Ensure label floats visually for autofill situations by toggling a small class if needed.
        if (input.value && input.value.trim() !== '') {
          lbl.classList.add('!top-[-0.625rem]');
          lbl.classList.add('!text-xs');
        } else {
          lbl.classList.remove('!top-[-0.625rem]');
          lbl.classList.remove('!text-xs');
        }
      };
      update();
      input.addEventListener('input', update);
    });
  }
  
  // Form submission: toggle UI to "submitted" view and show email
  function initFormHandler() {
    const form = document.getElementById('forgotForm');
    const success = document.getElementById('success');
    const subtitle = document.getElementById('subtitle');
    const sentEmail = document.getElementById('sentEmail');
  
    if (!form || !success || !subtitle || !sentEmail) return;
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = document.getElementById('email');
      const email = emailInput.value.trim();
  
      if (!email) {
        alert('Please enter your email address.');
        return;
      }
  
      // Simulate sending reset link
      // In production call your API to send the email
      sentEmail.textContent = email;
      // hide form and show success message
      form.classList.add('hidden');
      success.classList.remove('hidden');
      subtitle.textContent = 'Check your email for reset instructions';
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    initFloatingInputs();
    initFormHandler();
  });
  