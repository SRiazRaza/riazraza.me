(function () {
  'use strict';

  var STORAGE_KEY = 'mangaMode';
  var FONT_URL = 'https://fonts.googleapis.com/css2?family=Bangers&display=swap';
  var fontLoaded = false;

  function loadMangaFont() {
    if (fontLoaded) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONT_URL;
    document.head.appendChild(link);
    fontLoaded = true;
  }

  function updateToggleUI(active) {
    var btn = document.getElementById('manga-toggle');
    if (!btn) return;
    btn.textContent = active ? '🎌 Manga: ON' : '🎌 Manga';
    btn.setAttribute('aria-pressed', String(active));
  }

  function setMangaMode(active) {
    document.body.classList.toggle('manga-mode', active);
    try { localStorage.setItem(STORAGE_KEY, active ? 'true' : 'false'); } catch (_) {}
    var url = new URL(window.location.href);
    if (active) {
      url.searchParams.set('theme', 'manga');
      loadMangaFont();
    } else {
      url.searchParams.delete('theme');
    }
    history.replaceState(null, '', url.toString());
    updateToggleUI(active);
  }

  // Resolve initial state from localStorage or URL param
  var url = new URL(window.location.href);
  var savedState = false;
  try { savedState = localStorage.getItem(STORAGE_KEY) === 'true'; } catch (_) {}
  var urlState = url.searchParams.get('theme') === 'manga';
  var isActive = savedState || urlState;

  if (isActive) {
    document.body.classList.add('manga-mode');
    loadMangaFont();
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateToggleUI(isActive);

    var btn = document.getElementById('manga-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        setMangaMode(!document.body.classList.contains('manga-mode'));
      });
    }

    // Konami Code — only active when manga-mode is ON
    var KONAMI = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    var pos = 0;

    document.addEventListener('keydown', function (e) {
      if (!document.body.classList.contains('manga-mode')) {
        pos = 0;
        return;
      }
      if (e.key === KONAMI[pos]) {
        pos++;
        if (pos === KONAMI.length) {
          triggerEasterEgg();
          pos = 0;
        }
      } else {
        pos = (e.key === KONAMI[0]) ? 1 : 0;
      }
    });
  });

  function triggerEasterEgg() {
    if (document.getElementById('manga-easter-egg')) return;

    var overlay = document.createElement('div');
    overlay.id = 'manga-easter-egg';
    overlay.innerHTML = [
      '<div class="egg-panel">',
      '  <button class="egg-close" aria-label="Close">✕</button>',
      '  <h2>🎌 Secret Unlocked!</h2>',
      '  <p>ML Engineer by day. Manga reader by night.</p>',
      '  <p>Favourites: <em>JoJo\'s, Berserk, Vinland Saga</em></p>',
      '  <p class="egg-tagline">「人は皆、可能性に満ちている」</p>',
      '  <p style="font-size:0.8rem;margin-top:1rem;opacity:0.5">Press ESC or click outside to close</p>',
      '</div>'
    ].join('');

    document.body.appendChild(overlay);

    overlay.querySelector('.egg-close').addEventListener('click', function () {
      overlay.remove();
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.remove();
    });
    document.addEventListener('keydown', function onEsc(e) {
      if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', onEsc); }
    });
  }
})();
