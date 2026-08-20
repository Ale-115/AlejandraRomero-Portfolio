// All Aboard! Studio — Founder & Independent Designer
// Scroll-reveal + media carousels. Nav toggle / active-link behavior is
// already handled by script.js (shared across the site).

document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll(
    '.overview-item, .achievement-item, .decision-item, .work-block, .client-card, .results-card'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  initMediaCarousels();
});

// One-at-a-time media carousels (.gallery-wrap). Builds the dot indicators
// from however many .media-item slots exist, wires the arrow button to
// advance (looping back to the first slot at the end), and keeps the
// active dot in sync whether the user clicks a dot, clicks the arrow, or
// just drags/swipes the gallery directly. Also auto-advances on a timer,
// pausing while the pointer is over the gallery and resetting after any
// manual navigation so it doesn't fight the user.
const CAROUSEL_AUTOPLAY_MS = 5000;

function initMediaCarousels() {
  document.querySelectorAll('.gallery-wrap').forEach((wrap) => {
    const gallery = wrap.querySelector('.media-gallery');
    const nextBtn = wrap.querySelector('.media-nav-next');
    const prevBtn = wrap.querySelector('.media-nav-prev');
    const dotsContainer = wrap.querySelector('.media-dots');
    if (!gallery || !dotsContainer) return;

    // Only count slots that actually hold real media — unfilled placeholders
    // are hidden via CSS (.media-item:not(.media-filled)) and should be
    // skipped here too, so dots/arrows only ever reflect visible slides.
    const items = Array.from(gallery.querySelectorAll('.media-item.media-filled'));
    if (!items.length) return;

    dotsContainer.innerHTML = '';
    const dots = items.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'media-dot';
      dot.setAttribute('aria-label', `Go to image ${i + 1}`);
      dot.addEventListener('click', () => {
        gallery.scrollTo({ left: items[i].offsetLeft, behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);
      return dot;
    });

    if (items.length < 2) {
      if (nextBtn) nextBtn.style.display = 'none';
      if (prevBtn) prevBtn.style.display = 'none';
      dotsContainer.style.display = 'none';
    }

    function activeIndex() {
      const pos = gallery.scrollLeft;
      let closest = 0;
      let closestDist = Infinity;
      items.forEach((item, i) => {
        const dist = Math.abs(item.offsetLeft - pos);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      return closest;
    }

    function syncDots() {
      const current = activeIndex();
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    function goTo(index) {
      gallery.scrollTo({ left: items[index].offsetLeft, behavior: 'smooth' });
    }

    let scrollRaf = null;
    gallery.addEventListener('scroll', () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        syncDots();
        scrollRaf = null;
      });
    });

    // Autoplay — advances one slide at a time, paused on hover/focus and
    // while the tab is hidden. Only runs when there's more than one slide.
    let autoplayTimer = null;
    function stopAutoplay() {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    }
    function startAutoplay() {
      if (items.length < 2 || document.hidden) return;
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        goTo((activeIndex() + 1) % items.length);
      }, CAROUSEL_AUTOPLAY_MS);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const current = activeIndex();
        goTo((current + 1) % items.length);
        startAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const current = activeIndex();
        goTo((current - 1 + items.length) % items.length);
        startAutoplay();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => startAutoplay());
    });

    wrap.addEventListener('mouseenter', stopAutoplay);
    wrap.addEventListener('mouseleave', startAutoplay);
    wrap.addEventListener('focusin', stopAutoplay);
    wrap.addEventListener('focusout', startAutoplay);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay(); else startAutoplay();
    });

    syncDots();
    startAutoplay();
  });
}
