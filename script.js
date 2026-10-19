/* ============================================================
   Portfolio JS – Siti Nur Khadijah
   Features: Navbar scroll, mobile menu, scroll reveal, active nav
   ============================================================ */

// ---------- Navbar scroll effect ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ---------- Mobile hamburger menu ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// ---------- Scroll Reveal ----------
const revealElements = document.querySelectorAll(
  '.section-header, .about-text, .about-info-card, .stat-card, ' +
  '.skill-category, .timeline-item, .project-card, ' +
  '.cert-card, .edu-card, .contact-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (Array.from(revealElements).indexOf(entry.target) % 5));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--purple-light)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => activeObserver.observe(section));

// ---------- Typing effect in hero ----------
const subtitleEl = document.querySelector('.hero-subtitle');
if (subtitleEl) {
  const roles = [
    'Information Science Graduate',
    'Aspiring UI/UX Designer',
    'Web & Mobile Developer',
    'Detail-Oriented Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = roles[roleIndex];
    if (isDeleting) {
      subtitleEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      subtitleEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }
    let delay = isDeleting ? 50 : 80;
    if (!isDeleting && charIndex === current.length) {
      delay = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }
    setTimeout(typeEffect, delay);
  }
  setTimeout(typeEffect, 1200);
}

// ---------- Smooth scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---------- Cursor glow effect ----------
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 300px; height: 300px; border-radius: 50%;
  background: radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  top: -200px; left: -200px;
`;
document.body.appendChild(glow);
document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
