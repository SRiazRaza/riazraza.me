(function () {
  var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    || ('ontouchstart' in window)
    || (navigator.maxTouchPoints > 0);

  var tapCount = 0;
  var tapTimer = null;

  // Inject the secret tap span into the h1 title (runs after i18n already applied)
  function injectSpan() {
    if (document.getElementById('riaz-secret-tap')) return;
    var h1 = document.querySelector('h1.title');
    if (!h1) return;
    var found = false;
    for (var i = 0; i < h1.childNodes.length; i++) {
      var node = h1.childNodes[i];
      if (node.nodeType === 3 && node.textContent.indexOf('Riaz') !== -1) {
        var text = node.textContent;
        var idx = text.indexOf('Riaz');
        var span = document.createElement('span');
        span.id = 'riaz-secret-tap';
        span.textContent = 'Riaz';
        // iOS Safari requires cursor:pointer + onclick for touchstart to fire on non-interactive elements
        span.style.cssText = 'cursor:pointer;-webkit-tap-highlight-color:transparent;';
        span.onclick = function () {};
        var before = document.createTextNode(text.slice(0, idx));
        var after = document.createTextNode(text.slice(idx + 4));
        h1.replaceChild(after, node);
        h1.insertBefore(span, after);
        h1.insertBefore(before, span);
        found = true;
        break;
      }
    }
    if (!found) return;
    attachTap(document.getElementById('riaz-secret-tap'));
  }

  // Re-inject span if i18n overwrites on language switch
  function watchH1() {
    var h1 = document.querySelector('h1.title');
    if (!h1) return;
    new MutationObserver(function () {
      if (!document.getElementById('riaz-secret-tap')) injectSpan();
    }).observe(h1, { childList: true, subtree: true, characterData: true });
  }

  function handleTap(e) {
    e.stopPropagation();
    tapCount++;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(function () { tapCount = 0; }, 2200);
    if (tapCount >= 5) {
      tapCount = 0;
      clearTimeout(tapTimer);
      showEgg();
    }
  }

  function attachTap(trigger) {
    if (!trigger) return;
    if (isMobile) {
      trigger.addEventListener('touchstart', handleTap, { passive: true });
    } else {
      trigger.addEventListener('click', handleTap);
    }
  }

  // Run after DOM + deferred scripts (i18n) have already executed.
  // Use setTimeout to yield to any other defer scripts (e.g. i18n) that may
  // overwrite the h1 text immediately after DOMContentLoaded fires.
  function init() {
    setTimeout(function () {
      injectSpan();
      watchH1();
    }, 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Inject fade-in keyframe once
  var style = document.createElement('style');
  style.textContent = '@keyframes meerabIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}';
  document.head.appendChild(style);


  /* ── Overlay ── */
  function showEgg() {
    if (document.getElementById('meerab-egg')) return;

    var overlay = document.createElement('div');
    overlay.id = 'meerab-egg';
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:99999',
      'background:rgba(8,3,18,0.96)',
      'display:flex', 'align-items:center', 'justify-content:center'
    ].join(';');

    var panel = document.createElement('div');
    panel.style.cssText = [
      'position:relative',
      'width:92vw', 'max-width:360px',
      'height:72vh', 'max-height:580px',
      'border-radius:22px', 'overflow:hidden',
      'animation:meerabIn 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards',
      'box-shadow:0 0 60px rgba(255,107,157,0.45),0 0 120px rgba(255,107,157,0.15)'
    ].join(';');

    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%;';

    var close = document.createElement('button');
    close.textContent = '✕';
    close.setAttribute('aria-label', 'Close');
    close.style.cssText = [
      'position:absolute', 'top:12px', 'right:14px',
      'background:rgba(255,255,255,0.18)', 'border:none',
      'color:#fff', 'font-size:1.1rem', 'font-weight:bold',
      'width:44px', 'height:44px', 'border-radius:50%',
      'cursor:pointer', 'z-index:10',
      'display:flex', 'align-items:center', 'justify-content:center',
      '-webkit-tap-highlight-color:transparent'
    ].join(';');

    // Lock background scroll
    var prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function closeOverlay() {
      document.body.style.overflow = prevOverflow;
      overlay.remove();
    }

    close.addEventListener('touchend', function (e) { e.preventDefault(); closeOverlay(); });
    close.addEventListener('click', closeOverlay);

    // Delay backdrop-tap close so the opening tap doesn't immediately dismiss it
    var canClose = false;
    setTimeout(function () { canClose = true; }, 500);
    overlay.addEventListener('touchend', function (e) {
      if (canClose && e.target === overlay) { e.preventDefault(); closeOverlay(); }
    });
    overlay.addEventListener('click', function (e) {
      if (canClose && e.target === overlay) closeOverlay();
    });

    panel.appendChild(canvas);
    panel.appendChild(close);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    runArt(canvas, overlay);
  }

  /* ── Generative Art ── */
  function runArt(canvas, overlay) {
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    var W = rect.width, H = rect.height;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    var t = 0;
    var textAlpha = 0;
    var hearts = [];
    var stars = [];
    var petals = [];

    /* Stars */
    for (var i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.025 + 0.008
      });
    }

    /* Petals (flowing particles) */
    for (var j = 0; j < 18; j++) {
      petals.push(newPetal(W, H, true));
    }

    function newPetal(W, H, init) {
      return {
        x: Math.random() * W,
        y: init ? Math.random() * H : H + 10,
        size: 2.5 + Math.random() * 3.5,
        vy: -(0.4 + Math.random() * 0.7),
        vx: (Math.random() - 0.5) * 0.4,
        alpha: 0.6 + Math.random() * 0.4,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.04,
        hue: 320 + Math.random() * 50
      };
    }

    /* Heart path */
    function heartPath(cx, cy, sz) {
      ctx.beginPath();
      for (var a = 0; a <= Math.PI * 2; a += 0.06) {
        var hx = cx + sz * 16 * Math.pow(Math.sin(a), 3) / 17;
        var hy = cy - sz * (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) / 17;
        a < 0.07 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
      }
      ctx.closePath();
    }

    /* Spawn burst hearts */
    function spawnHeart() {
      hearts.push({
        x: W * 0.25 + Math.random() * W * 0.5,
        y: H * 0.75 + Math.random() * H * 0.15,
        sz: 5 + Math.random() * 10,
        vy: -(1 + Math.random() * 1.5),
        vx: (Math.random() - 0.5) * 0.7,
        alpha: 0.95,
        wobble: Math.random() * Math.PI * 2,
        wSpd: 0.025 + Math.random() * 0.025,
        hue: 330 + Math.random() * 45
      });
    }

    /* Constellation ring */
    var nodes = [];
    for (var n = 0; n < 12; n++) {
      var angle = (n / 12) * Math.PI * 2;
      var rad = Math.min(W, H) * 0.42;
      nodes.push({
        bx: W / 2 + Math.cos(angle) * rad,
        by: H / 2 + Math.sin(angle) * rad,
        phase: angle
      });
    }

    function frame() {
      t += 0.018;

      /* Background */
      var bg = ctx.createRadialGradient(W / 2, H * 0.45, 0, W / 2, H / 2, Math.max(W, H) * 0.75);
      bg.addColorStop(0, '#1e0535');
      bg.addColorStop(0.55, '#0d0520');
      bg.addColorStop(1, '#050210');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      /* Stars */
      stars.forEach(function (s) {
        s.phase += s.speed;
        var a = 0.3 + Math.sin(s.phase) * 0.3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + a + ')';
        ctx.fill();
      });

      /* Constellation ring */
      ctx.save();
      var ringAlpha = Math.min(1, t * 0.4) * 0.35;
      nodes.forEach(function (nd, i) {
        nd.x = nd.bx + Math.cos(t * 0.3 + nd.phase) * 4;
        nd.y = nd.by + Math.sin(t * 0.4 + nd.phase) * 4;
        var next = nodes[(i + 1) % nodes.length];
        ctx.beginPath();
        ctx.moveTo(nd.x, nd.y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = 'rgba(255,215,0,' + ringAlpha + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,215,0,' + (ringAlpha * 2) + ')';
        ctx.fill();
      });
      ctx.restore();

      /* Flowing sine streams */
      for (var s = 0; s < 2; s++) {
        ctx.beginPath();
        for (var x = 0; x <= W; x += 4) {
          var y = H * 0.5
            + Math.sin(x * 0.016 + t * 1.4 + s * Math.PI) * 28
            + Math.sin(x * 0.031 + t * 0.9) * 12;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        var sa = 0.1 + Math.sin(t + s) * 0.04;
        ctx.strokeStyle = s === 0
          ? 'rgba(255,107,157,' + sa + ')'
          : 'rgba(255,215,0,' + sa + ')';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      /* Petals */
      petals.forEach(function (p, i) {
        p.y += p.vy; p.x += p.vx;
        p.angle += p.spin;
        p.alpha -= 0.0018;
        if (p.y < -20 || p.alpha <= 0) petals[i] = newPetal(W, H, false);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 1.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + p.hue + ',90%,72%,0.8)';
        ctx.fill();
        ctx.restore();
      });

      /* Heart burst */
      if (Math.sin(t * 1.6) > 0.94) spawnHeart();

      for (var hi = hearts.length - 1; hi >= 0; hi--) {
        var h = hearts[hi];
        h.y += h.vy; h.x += h.vx;
        h.x += Math.sin(h.wobble) * 0.5;
        h.wobble += h.wSpd;
        h.alpha -= 0.007;
        if (h.alpha <= 0 || h.y < -30) { hearts.splice(hi, 1); continue; }

        ctx.save();
        ctx.globalAlpha = h.alpha;
        heartPath(h.x, h.y, h.sz);
        var hg = ctx.createRadialGradient(h.x, h.y - h.sz * 0.3, 0, h.x, h.y, h.sz);
        hg.addColorStop(0, 'hsla(' + h.hue + ',100%,78%,1)');
        hg.addColorStop(1, 'hsla(' + h.hue + ',100%,52%,0.85)');
        ctx.fillStyle = hg;
        ctx.shadowColor = 'hsla(' + h.hue + ',100%,68%,0.9)';
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.restore();
      }

      /* Text */
      textAlpha = Math.min(1, textAlpha + 0.007);
      ctx.save();
      ctx.globalAlpha = textAlpha;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      var fSz = Math.min(W * 0.1, 34);

      /* Glow layer */
      ctx.shadowColor = 'rgba(255,107,157,0.9)';
      ctx.shadowBlur = 28 + Math.sin(t * 1.5) * 8;
      ctx.font = 'bold ' + fSz + 'px "Gentium Book Basic",Georgia,serif';
      var tg = ctx.createLinearGradient(W * 0.15, 0, W * 0.85, 0);
      tg.addColorStop(0, '#ffd700');
      tg.addColorStop(0.45, '#ffffff');
      tg.addColorStop(1, '#ffd700');
      ctx.fillStyle = tg;
      ctx.fillText('Love you Meerab', W / 2, H * 0.38);

      /* Beating heart */
      var hBeat = 1 + Math.sin(t * 2.5) * 0.08;
      ctx.save();
      ctx.translate(W / 2, H * 0.52);
      ctx.scale(hBeat, hBeat);
      ctx.font = Math.min(W * 0.13, 48) + 'px serif';
      ctx.fillStyle = '#ff6b9d';
      ctx.shadowColor = '#ff6b9d';
      ctx.shadowBlur = 22 + Math.sin(t * 2.5) * 12;
      ctx.fillText('♥', 0, 0);
      ctx.restore();

      /* Signature */
      ctx.font = 'italic ' + Math.min(W * 0.072, 25) + 'px "Gentium Book Basic",Georgia,serif';
      ctx.shadowColor = 'rgba(255,215,0,0.7)';
      ctx.shadowBlur = 14;
      ctx.fillStyle = 'rgba(255,215,0,0.92)';
      ctx.fillText('— Riaz', W / 2, H * 0.67);

      ctx.restore();

      /* Animated border */
      var bA = 0.25 + Math.sin(t * 2.5) * 0.12;
      ctx.strokeStyle = 'rgba(255,215,0,' + bA + ')';
      ctx.lineWidth = 1;
      ctx.strokeRect(7, 7, W - 14, H - 14);

      /* Corner sparkles */
      [[10, 10], [W - 10, 10], [10, H - 10], [W - 10, H - 10]].forEach(function (c) {
        var pr = 2.5 + Math.sin(t * 4 + c[0]) * 1.2;
        ctx.beginPath();
        ctx.arc(c[0], c[1], pr, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,215,0,' + (0.55 + Math.sin(t * 3) * 0.3) + ')';
        ctx.fill();
      });

      if (document.getElementById('meerab-egg')) {
        requestAnimationFrame(frame);
      }
    }

    frame();
  }
})();
