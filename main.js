// --- Continuous Fullscreen Falling Petals Engine ---
const canvas = document.getElementById('petal-canvas');
const ctx = canvas.getContext('2d');

let petalsArray = [];
let maxPetals = 45; // Starts dense on presentation splash card

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Petal {
  constructor() {
    this.reset();
    // Scatter across initial height randomly at start run
    this.y = Math.random() * canvas.height; 
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -15;
    this.size = Math.random() * 6 + 4;
    this.speedY = Math.random() * 1.0 + 0.6; 
    this.speedX = Math.random() * 0.4 - 0.2; 
    this.angle = Math.random() * 360;
    this.spinSpeed = Math.random() * 1.0 - 0.5;
    this.color = `rgba(140, 123, 100, ${Math.random() * 0.12 + 0.05})`; 
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.angle += this.spinSpeed;

    if (this.y > canvas.height) {
      this.reset();
    }
    if (this.x > canvas.width) this.x = 0;
    else if (this.x < 0) this.x = canvas.width;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size / 1.6, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}

function initPetals() {
  petalsArray = [];
  for (let i = 0; i < maxPetals; i++) {
    petalsArray.push(new Petal());
  }
}

function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Match length dynamically if truncated later
  for (let i = 0; i < petalsArray.length; i++) {
    petalsArray[i].update();
    petalsArray[i].draw();
  }
  requestAnimationFrame(animatePetals);
}

initPetals();
animatePetals();


// --- Photo Slideshow Carousel System ---
let slideIndex = 1;
showSlides(slideIndex);

function moveSlide(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (slides.length === 0) return;
  
  if (n > slides.length) { slideIndex = 1 }    
  if (n < 1) { slideIndex = slides.length }
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  if (dots[slideIndex-1]) {
    dots[slideIndex-1].className += " active";
  }
}

document.getElementById('prevSlide')?.addEventListener('click', () => moveSlide(-1));
document.getElementById('nextSlide')?.addEventListener('click', () => moveSlide(1));

document.querySelectorAll('.slideshow-dots .dot').forEach(dot => {
  dot.addEventListener('click', (e) => {
    const targetIndex = parseInt(e.target.getAttribute('data-index'));
    currentSlide(targetIndex);
  });
});

setInterval(() => {
  moveSlide(1);
}, 4000);


// --- Envelope Reveal Transition & Audio Engine ---
const music = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');
const volumeSlider = document.getElementById('volume-control');
const revealBtn = document.getElementById('hero-reveal-btn');
const envelopeOverlay = document.getElementById('envelope-overlay');
const mainContent = document.getElementById('invitation-main-content');
const heroSection = document.getElementById('hero');

let isPlaying = false;

if (music && volumeSlider) {
  music.volume = volumeSlider.value;
  
  // FIXED: Added real-time reactive volume slider listener tracking input mutations
  volumeSlider.addEventListener('input', (e) => {
    music.volume = e.target.value;
  });
}

function playMusic() {
  music.play().then(() => {
    if (toggleBtn) toggleBtn.innerHTML = '🎼';
    isPlaying = true;
  }).catch(err => console.log("Audio awaiting user interaction:", err));
}

if (toggleBtn && music) {
  toggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      music.pause();
      toggleBtn.innerHTML = '🎵';
    } else {
      music.play();
      toggleBtn.innerHTML = '🎼';
    }
    isPlaying = !isPlaying;
  });
}

if (revealBtn && envelopeOverlay) {
  revealBtn.addEventListener('click', () => {
    playMusic();
    
    // REDUCE PETAL COUNT: Truncates array instantly so reading text is clear
    maxPetals = 12; 
    petalsArray.length = maxPetals; 
    
    envelopeOverlay.classList.add('unlocked');
    mainContent.classList.remove('fade-out-content');
    
    setTimeout(() => {
      heroSection.classList.add('animate-active');
    }, 400);

    document.body.classList.remove('no-scroll');
  });
}


// --- Target Wedding Countdown Clock ---
const targetDate = new Date("August 1, 2026 11:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference < 0) {
    document.querySelector(".countdown-container").innerHTML = "<h3>Majlis Telah Berlangsung</h3>";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days.toString().padStart(2, '0');
  document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}

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
setInterval(updateCountdown, 1000);
updateCountdown();