// Trailer facade: nothing loads from YouTube until the visitor taps play; then the poster becomes the nocookie player.
(function () {
  document.querySelectorAll('.trailer[data-embed]').forEach(function (box) {
    var btn = box.querySelector('.trailer-play');
    if (!btn) return;
    box.classList.add('trailer-ready');
    btn.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.src = box.getAttribute('data-embed');
      frame.title = box.getAttribute('data-title') || 'YouTube video';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.setAttribute('allowfullscreen', '');
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      box.replaceChild(frame, btn);
      frame.focus();
    }, { once: true });
  });
})();
