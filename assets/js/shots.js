// Screenshot strip: ‹ › buttons that scroll about one screenshot, hidden at either end.
(function () {
  document.querySelectorAll('.shots-wrap').forEach(function (wrap) {
    var strip = wrap.querySelector('.shots');
    var prev = wrap.querySelector('.shots-prev');
    var next = wrap.querySelector('.shots-next');
    if (!strip || !prev || !next) return;
    wrap.classList.add('has-arrows');
    function step() {
      var img = strip.querySelector('img');
      var gap = parseFloat(getComputedStyle(strip).columnGap) || 16;
      return img ? img.getBoundingClientRect().width + gap : strip.clientWidth * 0.8;
    }
    var still = window.matchMedia('(prefers-reduced-motion: reduce)');
    function update() {
      var max = strip.scrollWidth - strip.clientWidth;
      // A few px of slack: the strip's padding and scroll-snap leave it just off 0 / max.
      prev.disabled = strip.scrollLeft <= 8;
      next.disabled = strip.scrollLeft >= max - 8;
    }
    function go(dir) { strip.scrollBy({ left: dir * step(), behavior: still.matches ? 'auto' : 'smooth' }); }
    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    strip.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    strip.querySelectorAll('img').forEach(function (img) { img.addEventListener('load', update); });
    update();
  });
})();
