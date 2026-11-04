/* SUIRP travel journal: fade-in, current-week nav, photo lightbox */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  // --- fade in ---
  var fades = document.querySelectorAll('.fade');
  if (reduce || !hasIO) {
    Array.prototype.forEach.call(fades, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    Array.prototype.forEach.call(fades, function (el) { io.observe(el); });
  }

  // --- highlight the week you are reading ---
  var links = document.querySelectorAll('.weeknav a[href^="#week-"]');
  if (hasIO && links.length) {
    var byId = {};
    Array.prototype.forEach.call(links, function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Array.prototype.forEach.call(links, function (a) { a.classList.remove('is-current'); });
        var a = byId[e.target.id];
        if (a) {
          a.classList.add('is-current');
          if (a.scrollIntoView && !reduce) a.parentNode.parentNode.scrollTo({ left: a.offsetLeft - 40, behavior: 'smooth' });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Array.prototype.forEach.call(document.querySelectorAll('.week'), function (s) { spy.observe(s); });
  }

  // --- lightbox ---
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Photo');
  box.innerHTML = '<img alt=""><p></p>';
  document.body.appendChild(box);
  var bigImg = box.querySelector('img'), cap = box.querySelector('p'), last = null;

  function close() { box.classList.remove('is-open'); if (last) last.focus(); }
  document.addEventListener('click', function (e) {
    var img = e.target.closest('.photo img, .polaroid img');
    if (!img) return;
    last = img;
    bigImg.src = img.currentSrc || img.src;
    bigImg.alt = img.alt;
    var fc = img.closest('figure').querySelector('figcaption');
    cap.textContent = fc ? fc.textContent : '';
    box.classList.add('is-open');
  });
  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('is-open')) close(); });
})();
