// Ale animada — hero illustration
(function () {
  var INTENSITY = 0.7;           // 0.3 = muy leve · 1 = más movimiento
  document.querySelectorAll('.ale-anim').forEach(function (root) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var q = function (c) { return root.querySelector(c); };
    var breathe = q('.ale-breathe'), head = q('.ale-head'), hl = q('.ale-hl'), hr = q('.ale-hr');
    var TAU = Math.PI * 2, TOTAL = 9, TH = 3, ID = 5.2, BW = 6.2, k = INTENSITY, g = 0.3;
    var sine = function (p) { return -(Math.cos(Math.PI * p) - 1) / 2; };
    var cubic = function (p) { return p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; };
    var back = function (p) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); };
    function kf(T, keys) {
      if (T <= keys[0][0]) return keys[0][1];
      for (var i = 1; i < keys.length; i++) {
        var a = keys[i - 1], b = keys[i];
        if (T <= b[0]) { var p = b[0] === a[0] ? 1 : (T - a[0]) / (b[0] - a[0]); return a[1] + (b[1] - a[1]) * (b[2] || sine)(p); }
      }
      return keys[keys.length - 1][1];
    }
    function frame(T) {
      var typing = kf(T, [[0,1],[TH-.1,1],[TH+.35,0,cubic],[BW+.1,0],[BW+.6,1,cubic],[TOTAL,1]]);
      var rot = kf(T, [[0,0],[TH,0],[TH+.7,-4.5],[ID-.05,-5],[ID+.15,-1.5,cubic],[ID+.5,2.5,back],[BW+.6,.6],[BW+1.6,0],[TOTAL,0]]);
      var gy = kf(T, [[0,0],[TH,0],[TH+.7,-12],[ID-.05,-14],[ID+.15,6,cubic],[ID+.45,-16,back],[BW+.5,0,cubic],[TOTAL,0]]);
      var gx = kf(T, [[0,0],[TH,0],[TH+.8,-8],[ID,-9],[BW+.6,0,cubic],[TOTAL,0]]);
      var pop = kf(T, [[0,0],[ID+.15,0],[ID+.45,1,back],[BW+.4,0,cubic],[TOTAL,0]]);
      var bob = Math.sin(TAU * T / .5) * 2.2 * typing, sway = Math.sin(TAU * T / 4.5) * 1.2 * typing;
      var x = gx * g * k / 10.8, y = (gy * g + bob) * k / 14.4;   // px de la imagen original → %
      head.style.transform = 'translate(' + x + '%,' + y + '%) rotate(' + (rot * g + sway) * k + 'deg) scale(' + (1 + .006 * pop * k) + ')';
      hl.style.transform = 'translateY(' + (-Math.max(0, Math.sin(TAU * T * 4)) * 3.5 * typing * k / 14.4) + '%)';
      hr.style.transform = 'translateY(' + (-Math.max(0, Math.sin(TAU * T * 40 / 9 + 1.7)) * 3.5 * typing * k / 14.4) + '%)';
      breathe.style.transform = 'scaleY(' + (1 + Math.sin(TAU * T / 3) * .006 * k) + ')';
    }
    var visible = true, t0 = performance.now();
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(root);
    (function loop(now) {
      if (visible) frame(((now - t0) / 1000) % TOTAL);
      requestAnimationFrame(loop);
    })(t0);
  });
})();
