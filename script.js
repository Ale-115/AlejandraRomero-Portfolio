// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-open');
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  links.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Hero title typewriter effect (left to right)
const typewriterParts = document.querySelectorAll('.typewriter-part');

if (typewriterParts.length) {
  const fullTexts = Array.from(typewriterParts).map((el) => el.textContent);
  typewriterParts.forEach((el) => { el.textContent = ''; });

  let partIndex = 0;
  let charIndex = 0;
  const typeSpeed = 65; // ms per character

  function typeNext() {
    if (partIndex >= typewriterParts.length) return;

    const text = fullTexts[partIndex];
    if (charIndex < text.length) {
      typewriterParts[partIndex].textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeNext, typeSpeed);
    } else {
      partIndex++;
      charIndex = 0;
      setTimeout(typeNext, typeSpeed);
    }
  }

  setTimeout(typeNext, 300); // brief pause before typing starts
}

// Subtle horizontal nudge to hint the card rows are swipeable on mobile.
// Nudges each row once, the first time it scrolls into view.
const swipeGrids = document.querySelectorAll('.additional-grid, .projects-grid');

if (swipeGrids.length && 'IntersectionObserver' in window) {
  const nudge = (el) => {
    if (!window.matchMedia('(max-width: 900px)').matches) return;
    el.scrollTo({ left: 36, behavior: 'smooth' });
    setTimeout(() => el.scrollTo({ left: 0, behavior: 'smooth' }), 450);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => nudge(entry.target), 300);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  swipeGrids.forEach((grid) => observer.observe(grid));
}
