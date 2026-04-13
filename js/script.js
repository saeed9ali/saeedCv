/* =============================================
   CV Website – script.js
   ============================================= */

// ── Language Toggle ──────────────────────────
let currentLang = 'ar';

function toggleLang() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  const isEn = currentLang === 'en';

  document.documentElement.lang = currentLang;
  document.documentElement.dir = isEn ? 'ltr' : 'rtl';
  document.body.classList.toggle('ltr', isEn);

  document.getElementById('langLabel').textContent = isEn ? 'ع' : 'EN';

  document.querySelectorAll('[data-ar]').forEach(el => {
    const target = isEn ? el.dataset.en : el.dataset.ar;
    if (target !== undefined) {
      el.textContent = target;
    }
  });

  document.title = isEn ? 'Saeed Ali | CV' : 'سعيد علي | سيرة ذاتية';
}

// ── Navbar scroll ────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile nav ───────────────────────────────
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const nav = document.getElementById('mobileNav');
  const btn = document.querySelector('.nav-menu-btn');
  if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// ── Parallax ─────────────────────────────────
const parallaxBg     = document.getElementById('parallaxBg');
const parallaxMid    = document.getElementById('parallaxMid');
const parallaxBottom = document.getElementById('parallaxBottom');

function applyParallax() {
  const sy = window.scrollY;
  if (parallaxBg)     parallaxBg.style.transform    = `translateY(${sy * 0.25}px)`;
  if (parallaxMid)    parallaxMid.style.transform    = `translateY(${(sy - parallaxMid.parentElement.offsetTop) * 0.15}px)`;
  if (parallaxBottom) parallaxBottom.style.transform = `translateY(${(sy - parallaxBottom.parentElement.offsetTop) * 0.1}px)`;
}
window.addEventListener('scroll', applyParallax, { passive: true });

// ── Reveal on scroll ─────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ── Skill bars ───────────────────────────────
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(el => skillObserver.observe(el));

// ── Smooth scroll ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Active nav highlight ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id ? 'var(--gold)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => activeObserver.observe(s));
