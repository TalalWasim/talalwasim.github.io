/* Site behaviour: theme toggle, news expander, BibTeX dialog, external links. */
(function () {
  'use strict';

  /* ---------- Theme toggle ------------------------------------------------ */
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function currentTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit === 'dark' || explicit === 'light') return explicit;
    return media && media.matches ? 'dark' : 'light';
  }

  function syncToggle() {
    var dark = currentTheme() === 'dark';
    var buttons = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', dark ? 'true' : 'false');
      var label = buttons[i].querySelector('[data-theme-label]');
      if (label) label.textContent = dark ? 'Light mode' : 'Dark mode';
    }
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) { /* private mode etc. */ }
    syncToggle();
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-theme-toggle]');
    if (!button) return;
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  if (media && media.addEventListener) media.addEventListener('change', syncToggle);
  syncToggle();

  /* ---------- News: show all / show fewer -------------------------------- */
  var newsList = document.querySelector('[data-news]');
  var newsToggle = document.querySelector('[data-news-toggle]');
  if (newsList && newsToggle) {
    var visibleCount = parseInt(newsList.getAttribute('data-visible'), 10) || 5;
    var items = newsList.querySelectorAll('.news-item');
    var allLabel = newsToggle.textContent;

    newsToggle.addEventListener('click', function () {
      var expanded = newsToggle.getAttribute('aria-expanded') === 'true';
      for (var i = visibleCount; i < items.length; i++) items[i].hidden = expanded;
      newsToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      newsToggle.textContent = expanded ? allLabel : 'Show fewer';
      if (expanded) newsList.scrollIntoView({ block: 'start' });
    });
  }

  /* ---------- BibTeX dialog ---------------------------------------------- */
  var dialog = document.getElementById('bibtex-dialog');
  if (dialog) {
    var textEl = dialog.querySelector('[data-bibtex-text]');
    var copyBtn = dialog.querySelector('[data-bibtex-copy]');
    var copyLabel = dialog.querySelector('[data-bibtex-copy-label]');
    var copyTimer = null;

    function openBibtex(source) {
      textEl.textContent = source.textContent.trim();
      resetCopy();
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    }

    function closeBibtex() {
      if (dialog.open) dialog.close();
      else dialog.removeAttribute('open');
    }

    function resetCopy() {
      clearTimeout(copyTimer);
      copyBtn.classList.remove('is-done');
      copyLabel.textContent = 'Copy';
    }

    function copyBibtex() {
      var text = textEl.textContent;
      var done = function () {
        copyBtn.classList.add('is-done');
        copyLabel.textContent = 'Copied';
        clearTimeout(copyTimer);
        copyTimer = setTimeout(resetCopy, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { selectText(); });
      } else {
        selectText();
      }
    }

    function selectText() {
      var range = document.createRange();
      range.selectNodeContents(textEl);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      copyLabel.textContent = 'Press Ctrl/Cmd+C';
    }

    document.addEventListener('click', function (event) {
      var open = event.target.closest('[data-bibtex-button]');
      if (open) {
        var source = open.parentNode.querySelector('.pub-bibtex');
        if (source) openBibtex(source);
        return;
      }
      if (event.target.closest('[data-bibtex-close]')) { closeBibtex(); return; }
      if (event.target.closest('[data-bibtex-copy]')) { copyBibtex(); return; }
      // click on the backdrop (outside the dialog box) closes it
      if (event.target === dialog && dialog.open) {
        var r = dialog.getBoundingClientRect();
        var inside = event.clientX >= r.left && event.clientX <= r.right &&
                     event.clientY >= r.top && event.clientY <= r.bottom;
        if (!inside) closeBibtex();
      }
    });
  }

  /* ---------- External links open in a new tab --------------------------- */
  var anchors = document.querySelectorAll('a[href]');
  for (var i = 0; i < anchors.length; i++) {
    var a = anchors[i];
    var external = a.hostname && a.hostname !== window.location.hostname;
    var isPdf = /\.pdf($|\?)/i.test(a.getAttribute('href'));
    if (external || isPdf) {
      a.setAttribute('target', '_blank');
      var rel = (a.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
      if (rel.indexOf('noopener') === -1) rel.push('noopener');
      a.setAttribute('rel', rel.join(' '));
    }
  }
})();
