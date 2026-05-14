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
    // Preserve the icon span if present, update text label
    var iconSpan = btn.querySelector('.btn-icon');
    if (iconSpan) {
      iconSpan.textContent = active ? 'Games+Manga: ON' : 'Manga';
    } else {
      btn.textContent = active ? '🎌 Games+Manga: ON' : '🎌 Manga';
    }
    btn.setAttribute('aria-pressed', String(active));
    btn.setAttribute('title', active ? 'Toggle off Manga/Games Mode' : 'Toggle on Manga/Games Mode');
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
    dispatchMangaEvent(active);
  }

  function dispatchMangaEvent(active) {
    try {
      window.dispatchEvent(new CustomEvent('mangaModeChange', { detail: { active: active } }));
    } catch (_) {}
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
        var nowActive = !document.body.classList.contains('manga-mode');
        setMangaMode(nowActive);
        // spinSoft on activate, controllerPulse on deactivate
        var icon = btn.querySelector('.btn-icon');
        if (icon) {
          icon.style.animation = 'none';
          void icon.offsetWidth;
          icon.style.animation = nowActive ? 'spinSoft 0.6s ease' : 'controllerPulse 0.5s ease';
          setTimeout(function () { icon.style.animation = ''; }, 700);
        }
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

    // Emoji burst — relaxed stagger, panel waits for burst to settle
    var emojis = ['🎌', '🎮', '📚', '✨', '🎨', '⚔️', '🌸', '🎴', '🀄', '🕹️'];
    for (var i = 0; i < 14; i++) {
      (function (idx) {
        setTimeout(function () {
          var el = document.createElement('div');
          el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
          el.style.cssText = [
            'position:fixed',
            'left:' + (5 + Math.random() * 90) + 'vw',
            'top:88vh',
            'font-size:' + (1.3 + Math.random() * 1.2) + 'rem',
            'pointer-events:none',
            'animation:floatUp 1.8s ease-out forwards',
            'z-index:9998'
          ].join(';');
          document.body.appendChild(el);
          setTimeout(function () { if (el.parentNode) el.remove(); }, 2000);
        }, idx * 120);
      })(i);
    }

    // Panel appears after emojis have had time to burst (900ms delay)
    setTimeout(function() {
    var overlay = document.createElement('div');
    overlay.id = 'manga-easter-egg';
    overlay.innerHTML = [
      '<div class="egg-panel">',
      '  <button class="egg-close" aria-label="Close">✕</button>',
      '  <h2>🎌 Secret Unlocked!</h2>',
      '  <p>ML Engineer by day. Manga reader &amp; retro gamer by night.</p>',
      '  <p>Favourites: <em>JoJo\'s, Berserk, Vinland Saga</em></p>',
      '  <p>🎮 Currently playing: something retro, obviously.</p>',
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
    }, 900); // end panel setTimeout — waits for emoji burst to settle
  }
})();
