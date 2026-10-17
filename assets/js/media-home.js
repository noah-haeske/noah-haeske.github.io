/* Noah Haeske — media-forward home page.
   Loads each tile video only when it scrolls into view, plays it while
   visible, pauses it when it leaves. Posters carry the page until then,
   so the first paint costs images, not megabytes of H.264. */
(function () {
  'use strict';

  var vids = document.querySelectorAll('video[data-src]');
  if (!vids.length) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;

  // Reduced motion or data-saver: the poster frame is the whole story.
  // No controls either, since every tile is wrapped in a link.
  if (reduce || saveData) return;

  function load(v) {
    if (v.dataset.loaded) return;
    v.dataset.loaded = '1';
    var s = document.createElement('source');
    s.src = v.dataset.src;
    s.type = 'video/mp4';
    v.appendChild(s);
    v.load();
  }

  function play(v) {
    var p = v.play();
    // If the browser refuses autoplay, the poster frame stands in. Native
    // controls would sit inside a link, so they are never added.
    if (p && p.catch) p.catch(function () {});
  }

  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(vids, function (v) { load(v); play(v); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { load(v); play(v); }
      else if (!v.paused) { v.pause(); }
    });
  }, { rootMargin: '200px 0px', threshold: 0.2 });

  Array.prototype.forEach.call(vids, function (v) { io.observe(v); });

  // Stop background playback when the tab is hidden.
  document.addEventListener('visibilitychange', function () {
    Array.prototype.forEach.call(vids, function (v) {
      if (document.hidden) { if (!v.paused) v.pause(); }
      else if (v.dataset.loaded) play(v);
    });
  });
})();
