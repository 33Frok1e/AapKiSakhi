// Ensure labels float when inputs are prefilled (autofill or value present)
function initFloatingInputs() {
    document.querySelectorAll('input.peer').forEach(input => {
      const lbl = input.parentElement.querySelector('label');
      if (!lbl) return;
      const update = () => {
        if (input.value && input.value.trim() !== '') {
          // When input has value, :placeholder-shown is false and peer selectors handle the style.
          // Add fallback visual adjustment for some autofill cases.
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
  
  // Mock auth logic on submit (same behaviour as original file)
  function initFormHandler() {
    const form = document.getElementById('loginForm');
    if (!form) return;
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
  
      if (!email || !password) {
        alert('Please enter email and password.');
        return;
      }
  
      // Mock authentication - set localStorage and redirect to /dashboard
      localStorage.setItem('isAuthenticated', 'true');
      const userName = email.includes('@') ? email.split('@')[0] : email;
      localStorage.setItem('userName', userName);
  
      // simulate navigate('/dashboard')
      window.location.href = '/dashboard';
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    initFloatingInputs();
    initFormHandler();
  });
  