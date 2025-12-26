// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Reveal Animation
// Targets .parallax-content AND .section-decor
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.parallax-content, .section-decor').forEach(el => observer.observe(el));

// Form Handling
const form = document.getElementById('rsvp-form');
const successMessage = document.getElementById('success-message');
const scriptURL = 'https://script.google.com/macros/s/AKfycbyX4Q7UYKqY63jtxD5zwaI4RhlaR4QJUw3qS_jRYSaZyrN_TcZkL0J0cE5K0Q6dtROZ/exec';

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        // Google Apps Script returns opaque response usually, or redirects. 
        // We assume success if fetch works.
        console.log('Success!', response);
        form.style.display = 'none';
        successMessage.classList.remove('hidden');
      })
      .catch(error => {
        console.error('Error!', error.message);
        // Fallback or alert user
        submitBtn.textContent = 'Error! Try again.';
        submitBtn.disabled = false;
      });
  });
}

console.log('Wedding RSVP Parallax Edition Initialized');
