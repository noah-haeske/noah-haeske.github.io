/* SUIRP journal: All / Research / Travel filter */
(function () {
  'use strict';
  var bar = document.querySelector('.j-filter');
  if (!bar) return;
  var entries = document.querySelectorAll('.entry');
  var months = document.querySelectorAll('.j-month');
  var buttons = bar.querySelectorAll('button');

  // Fill the counts on each button from the entries actually on the page.
  Array.prototype.forEach.call(buttons, function (b) {
    var k = b.getAttribute('data-kind');
    var n = k === 'all' ? entries.length : document.querySelectorAll('.entry[data-kind="' + k + '"]').length;
    var c = b.querySelector('.j-count');
    if (c) c.textContent = n;
  });

  function apply(kind) {
    Array.prototype.forEach.call(buttons, function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-kind') === kind));
    });
    Array.prototype.forEach.call(entries, function (e) {
      var show = kind === 'all' || e.getAttribute('data-kind') === kind;
      e.hidden = !show;
      if (show) e.classList.add('is-in');
    });
    // Hide a month heading when every entry under it is filtered out.
    Array.prototype.forEach.call(months, function (m) {
      var el = m.nextElementSibling, any = false;
      while (el && !el.classList.contains('j-month')) {
        if (el.classList.contains('entry') && !el.hidden) { any = true; break; }
        el = el.nextElementSibling;
      }
      m.hidden = !any;
    });
  }

  bar.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) apply(b.getAttribute('data-kind'));
  });
})();
