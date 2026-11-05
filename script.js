// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-open');
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-link');

const hasInPageLinks = Array.from(links).some((l) => l.getAttribute('href').startsWith('#'));

if (hasInPageLinks) window.addEventListener('scroll', () => {
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

// Close mobile menu after choosing a link
navLinks.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => navLinks.classList.remove('nav-open'));
});

// Marketing carousel: prev/next buttons
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const buttons = carousel.querySelectorAll('.carousel-btn');
  const step = () => {
    const card = track.querySelector('.case');
    return card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8;
  };
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    buttons[0].disabled = track.scrollLeft <= 2;
    buttons[1].disabled = track.scrollLeft >= max;
  };
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      track.scrollBy({ left: step() * Number(btn.dataset.dir), behavior: 'smooth' });
    });
  });
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});
