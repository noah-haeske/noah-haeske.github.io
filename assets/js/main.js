/* Noah Haeske — portfolio: mobile nav + scroll reveal */
(function () {
  'use strict';

  // --- mobile nav ---
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  function isMobile() { return window.matchMedia('(max-width: 800px)').matches; }

  function sync() {
    if (!nav || !toggle) return;
    if (isMobile()) {
      nav.hidden = toggle.getAttribute('aria-expanded') !== 'true';
    } else {
      nav.hidden = false;
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (toggle && nav) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      sync();
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && isMobile()) {
        toggle.setAttribute('aria-expanded', 'false');
        sync();
      }
    });
    window.addEventListener('resize', sync);
    sync();
  }

  // --- scroll reveal ---
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal');

  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
})();
