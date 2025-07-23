// PENJELASAN: Semua kode digabung dalam satu event listener agar lebih rapi.
document.addEventListener('DOMContentLoaded', () => {
    // --- Caching Selectors ---
    const darkBtn = document.getElementById('darkmode-toggle');
    const heroTitle = document.querySelector('#hero .hero-text h2');
    const contactForm = document.querySelector('footer form');
    const chatbotBtn = document.getElementById('clara-chatbot-btn');
    const chatbotModal = document.getElementById('clara-chatbot-modal');
    const chatbotClose = document.querySelector('.clara-modal-close');
    const chatbotForm = document.querySelector('.clara-chatbot-form');
    const heroImg = document.querySelector('.hero-preview img.parallax');
    const reveals = document.querySelectorAll('.reveal');
    const rippleButtons = document.querySelectorAll('.cta-button, .clara-chatbot-form button, #clara-chatbot-btn');

    // --- Typing Effect ---
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        function typeChar() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, 38);
            }
        }
        typeChar();
    }

    // --- Contact Form Notification ---
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var notif = document.createElement('div');
            notif.textContent = 'Terima kasih! Pesan Anda sudah terkirim.';
            notif.style.background = '#E94E89';
            notif.style.color = '#fff';
            notif.style.padding = '14px 24px';
            notif.style.borderRadius = '8px';
            notif.style.margin = '18px auto 0';
            notif.style.maxWidth = '350px';
            notif.style.textAlign = 'center';
            notif.style.fontWeight = '600';
            notif.style.boxShadow = '0 4px 16px rgba(233,78,137,0.13)';
            contactForm.parentNode.insertBefore(notif, contactForm.nextSibling);
            setTimeout(function(){ notif.remove(); }, 3000);
            contactForm.reset();
        });
    }

    // --- Reveal on Scroll ---
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - 80) {
                reveal.classList.add('reveal-visible');
            } else {
                reveal.classList.remove('reveal-visible');
            }
        });
    }

    // --- Parallax Hero Image ---
    function parallaxScroll() {
        if (heroImg) {
            const y = window.scrollY;
            heroImg.style.transform = `translateY(${y * 0.13}px) scale(1)`;
        }
    }

    // --- Event Listeners for Scroll ---
    window.addEventListener('scroll', () => {
        revealOnScroll();
        parallaxScroll();
    });
    revealOnScroll();

    // --- Ripple Effect ---
    function addRipple(e) {
        const btn = e.currentTarget;
        const circle = document.createElement('span');
        circle.className = 'ripple';
        const rect = btn.getBoundingClientRect();
        circle.style.left = (e.clientX - rect.left) + 'px';
        circle.style.top = (e.clientY - rect.top) + 'px';
        btn.appendChild(circle);
        setTimeout(() => circle.remove(), 500);
    }
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', addRipple);
    });

    // --- Splash Screen Clara (jika ada) ---
    setTimeout(function() {
        var splash = document.getElementById('splash-clara');
        if(splash) splash.style.display = 'none';
    }, 1500);
});

// --- Service Worker Registration (PWA) ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => console.log('SW registered: ', registration))
      .catch(registrationError => console.log('SW registration failed: ', registrationError));
  });
} 

// Splash screen Clara
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    var splash = document.getElementById('splash-clara');
    if(splash) splash.classList.add('hide');
  }, 1500);
});

// 2. Typing effect di judul hero
window.addEventListener('DOMContentLoaded', function() {
  var heroTitle = document.querySelector('.hero-title');
  if(heroTitle) {
    var text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let i = 0;
    function typeChar() {
      heroTitle.innerHTML = text.slice(0, i) + '<span class="typing-cursor">|</span>';
      if(i < text.length) {
        i++;
        setTimeout(typeChar, 32);
      } else {
        heroTitle.innerHTML = text;
      }
    }
    typeChar();
  }
});

// 4. Confetti saat klik tombol CTA utama
function confettiBurst() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  const confetti = [];
  for(let i=0;i<80;i++) {
    confetti.push({
      x: Math.random()*canvas.width,
      y: Math.random()*-canvas.height,
      r: Math.random()*8+4,
      d: Math.random()*canvas.height/2+canvas.height/2,
      color: `hsl(${Math.random()*360},90%,70%)`,
      tilt: Math.random()*10-5
    });
  }
  let frame = 0;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.r, c.r*0.6, c.tilt, 0, 2*Math.PI);
      ctx.fillStyle = c.color;
      ctx.fill();
    });
    update();
    frame++;
    if(frame < 60) requestAnimationFrame(draw);
    else setTimeout(()=>{canvas.style.display='none';}, 400);
  }
  function update() {
    confetti.forEach(c => {
      c.y += 6 + Math.random()*2;
      c.x += Math.sin(c.y/30)*2;
      c.tilt += Math.random()*0.2-0.1;
    });
  }
  draw();
}
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.cta-main').forEach(btn => {
    btn.addEventListener('click', confettiBurst);
  });
}); 