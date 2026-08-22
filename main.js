/* Language toggle + section highlighting. No dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-set-lang]'));

  function apply(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.setLang === lang));
    });
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  // Remembered choice wins; otherwise fall back to the browser's language.
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  if (saved !== 'zh' && saved !== 'en') {
    saved = /^zh\b/i.test(navigator.language || '') ? 'zh' : 'en';
  }
  apply(saved);

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { apply(b.dataset.setLang); });
  });

  // Placeholder profile links: until a real URL is pasted in, clicking one would
  // jump to the top of the page. Swallow the click instead.
  Array.prototype.forEach.call(document.querySelectorAll('.links a[data-todo]'), function (a) {
    a.setAttribute('role', 'link');
    a.setAttribute('aria-disabled', 'true');
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });

  // Mark the section currently in view in the rail nav.
  var links = Array.prototype.slice.call(document.querySelectorAll('.rail nav a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
      });
      var current = sections.filter(function (s) { return visible.has(s.id); })[0];
      links.forEach(function (a) {
        var on = current && a.getAttribute('href') === '#' + current.id;
        if (on) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-10% 0px -70% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }
})();
