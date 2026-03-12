/* ============================
   AMBALAN SUKANDA LAKSMA
   Main JavaScript
   ============================ */

// ============================
// NAVBAR SCROLL EFFECT
// ============================
(function() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load
})();

// ============================
// MOBILE NAV TOGGLE
// ============================
(function() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    
    // Animate hamburger
    const spans = toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translateY(7px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close on nav link click
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
})();

// ============================
// ACTIVE NAV LINK
// ============================
(function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ============================
// SCROLL ANIMATIONS
// ============================
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.animate-on-scroll, .timeline-item').forEach(el => {
    observer.observe(el);
  });
})();

// ============================
// HERO PARTICLES
// ============================
(function() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const colors = ['#7c3aed', '#a78bfa', '#d4a843', '#8b5cf6', '#c4b5fd'];
  const count = 20;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('hero-particle');
    
    const size = Math.random() * 4 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 8;
    
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: 0;
    `;
    
    container.appendChild(p);
  }
})();

// ============================
// COUNTER ANIMATION
// ============================
(function() {
  const counters = document.querySelectorAll('[data-count]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.count);
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = Math.floor(current);
        }, 16);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ============================
// SMOOTH HOVER TILT CARDS
// ============================
(function() {
  const cards = document.querySelectorAll('.program-card, .card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      card.style.transform = `perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ============================
// GALLERY LIGHTBOX (simple)
// ============================
(function() {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  // Create lightbox
  const lb = document.createElement('div');
  lb.style.cssText = `
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.92);
    z-index: 9999;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
    backdrop-filter: blur(8px);
  `;

  const lbContent = document.createElement('div');
  lbContent.style.cssText = `
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 12px;
    overflow: hidden;
    font-size: 5rem;
    text-align: center;
    color: white;
  `;

  lb.appendChild(lbContent);
  document.body.appendChild(lb);

  items.forEach(item => {
    item.addEventListener('click', () => {
      const icon = item.querySelector('.gallery-icon');
      const cap = item.querySelector('.gallery-caption');
      lbContent.innerHTML = `<div style="padding:48px 64px;background:#1c1c28;border-radius:12px;">${icon ? icon.textContent : '🖼️'}<p style="font-size:1rem;color:#aaa;margin-top:16px;font-family:var(--font-sans);">${cap ? cap.textContent : 'Galeri'}</p></div>`;
      lb.style.display = 'flex';
    });
  });

  lb.addEventListener('click', () => {
    lb.style.display = 'none';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lb.style.display = 'none';
  });
})();

// ============================
// FORM SUBMISSION (demo)
// ============================
(function() {
  const form = document.querySelector('.contact-form-el');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const original = btn.innerHTML;
    btn.innerHTML = '✓ Terkirim!';
    btn.style.background = 'linear-gradient(135deg, #059669, #047857)';
    
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
})();

// ============================
// TYPED TEXT EFFECT (Hero)
// ============================
(function() {
  const el = document.querySelector('.typed-text');
  if (!el) return;

  const words = ['Kepemimpinan', 'Persaudaraan', 'Pengabdian', 'Keberanian'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = words[wordIndex];
    
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
})();
