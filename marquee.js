// Infinite marquee strips (home Branding gallery + All Aboard! Studio page).
// Slow auto-scroll; arrows jump to the previous/next item; pauses on hover,
// focus or tap; with reduced motion it only moves with the arrows.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-marquee]').forEach(function (m) {
    var wrap = m.closest('.marquee-wrap') || m.parentElement;
    var track = m.querySelector('.brand-marquee-track');
    var items = track.children;
    var setSize = +track.getAttribute('data-set') || items.length / 2;
    var SPEED = +m.getAttribute('data-speed') || 28; // px per second
    var x = 0, target = null, period = 0, hover = false, resumeAt = 0, last = performance.now();
    function measure() { period = items[setSize].offsetLeft - items[0].offsetLeft; }
    measure(); window.addEventListener('load', measure); window.addEventListener('resize', measure);
    track.querySelectorAll('img, video').forEach(function (el) {
      el.addEventListener('load', measure); el.addEventListener('loadedmetadata', measure);
    });
    wrap.addEventListener('mouseenter', function () { hover = true; });
    wrap.addEventListener('mouseleave', function () { hover = false; });
    m.addEventListener('focusin', function () { hover = true; });
    m.addEventListener('focusout', function () { hover = false; });
    m.addEventListener('touchstart', function () { m.classList.toggle('is-paused'); }, { passive: true });
    function step(dir) {
      var from = target === null ? x : target, best = null, pos, i;
      for (i = 0; i < items.length; i++) {
        pos = items[i].offsetLeft - items[0].offsetLeft;
        if (dir > 0 && pos > from + 4) { best = pos; break; }
        if (dir < 0 && pos < from - 4) best = pos;
      }
      if (best === null) best = from + dir * 320;
      target = best; resumeAt = performance.now() + 5000;
    }
    wrap.querySelectorAll('[data-marquee-dir]').forEach(function (b) {
      b.addEventListener('click', function () { step(+b.getAttribute('data-marquee-dir')); });
    });
    function wrapX() {
      if (!period) return;
      while (x >= period) { x -= period; if (target !== null) target -= period; }
      while (x < 0) { x += period; if (target !== null) target += period; }
    }
    (function loop(now) {
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (target !== null) {
        var d = target - x; x += d * Math.min(1, dt * 7);
        if (Math.abs(d) < 0.5) { x = target; target = null; }
      } else if (!reduce && !hover && !m.classList.contains('is-paused') && now > resumeAt) {
        x += SPEED * dt;
      }
      wrapX();
      track.style.transform = 'translate3d(' + (-x) + 'px,0,0)';
      requestAnimationFrame(loop);
    })(last);
  });
})();
