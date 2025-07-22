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

    // --- Dark Mode ---
    function setDarkMode(on) {
        document.body.classList.toggle('darkmode', on);
        if (darkBtn) darkBtn.textContent = on ? '☀️' : '🌙';
        localStorage.setItem('clara-darkmode', on ? '1' : '0');
    }
    if (darkBtn) {
        darkBtn.onclick = () => setDarkMode(!document.body.classList.contains('darkmode'));
        if (localStorage.getItem('clara-darkmode') === '1') {
            setDarkMode(true);
        }
    }

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

    // --- Chatbot Interactivity ---
    if (chatbotBtn && chatbotModal && chatbotClose && chatbotForm) {
        const messages = chatbotModal.querySelector('.clara-chatbot-messages');
        chatbotBtn.onclick = () => { chatbotModal.style.display = 'flex'; };
        chatbotClose.onclick = () => { chatbotModal.style.display = 'none'; };
        window.onclick = (e) => { if (e.target === chatbotModal) chatbotModal.style.display = 'none'; };
        chatbotForm.onsubmit = function(e) {
            e.preventDefault();
            const input = chatbotForm.querySelector('input');
            const userMsg = document.createElement('div');
            userMsg.className = 'clara-msg clara-msg-user';
            userMsg.textContent = input.value;
            messages.appendChild(userMsg);
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'clara-msg clara-msg-bot';
                botMsg.textContent = 'Clara: Maaf, fitur chat asli belum tersedia.';
                messages.appendChild(botMsg);
                messages.scrollTop = messages.scrollHeight;
            }, 700);
            input.value = '';
            messages.scrollTop = messages.scrollHeight;
        };
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