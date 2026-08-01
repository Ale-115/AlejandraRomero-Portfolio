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
