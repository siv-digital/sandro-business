/* Sandro Business prototype — shared behaviour.

   Everything here is PROGRESSIVE. The pages are complete, legible static HTML
   before this file runs; it only arms motion, wires the demo session, and
   answers clicks that have no product behind them yet. If it fails to load,
   the prototype still reads, still navigates, and still shows the members area.
   That is the same contract the design system holds itself to, and it is not
   negotiable here either: see the arming note below. */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------------------------------------------------------------------
     1. Motion arming.

     components.css keeps every hidden from-state scoped under
     html[data-sb-motion="1"], so the FINISHED state is the unconditional CSS
     default and nothing can be invisible because an animation failed to run.
     This is the only code that sets that flag, and it sets it only after two
     consecutive requestAnimationFrame callbacks have actually been delivered,
     which proves frames are advancing in this host. Print, PDF pagination,
     screenshot capture, background tabs (rAF throttled to zero) and embedded
     webviews never get past the first callback, so they never arm and simply
     render the finished design. Reduced motion never arms either.

     Ported verbatim in spirit from design-system/components/layout/Reveal.jsx.
     Do not "simplify" this to a single rAF or a load handler.
     ------------------------------------------------------------------- */
  var reduceMotion = typeof matchMedia === 'function' &&
    matchMedia('(prefers-reduced-motion:reduce)').matches;

  if (!reduceMotion && typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { root.dataset.sbMotion = '1'; });
    });
  }

  /* ---------------------------------------------------------------------
     2. Reveals.

     Markup carries the from-state class itself (.sb-reveal, or .sb-wipe-inner
     for the editorial clip-path wipe) plus data-rv. This file only flips
     data-in and sets the stagger delay, so the HTML is the source of truth and
     an unrun script leaves finished content rather than an empty page.

     FAIL OPEN, three guards, because an observer is not guaranteed to report:
       1. already in view on load  -> reveal immediately, no observer;
       2. no IntersectionObserver  -> reveal;
       3. observer never reports within 400ms -> re-measure and reveal anyway.
     A live observer always fires an initial callback per observed element, so
     (3) only trips when the observer is genuinely dead. Below-fold content
     still animates on scroll as intended.
     ------------------------------------------------------------------- */
  function initReveals() {
    var nodes = document.querySelectorAll('[data-rv]');
    if (!nodes.length) return;

    Array.prototype.forEach.call(nodes, function (el) {
      var i = parseInt(el.getAttribute('data-rv-i') || '0', 10);
      var d = parseInt(el.getAttribute('data-rv-d') || '0', 10);
      if (i || d) el.style.transitionDelay = (d + i * 70) + 'ms';

      /* OBSERVE THE WRAPPER, FLIP THE INNER. The wipe's from-state is
         `clip-path: inset(100% 0 0 0)`, which reduces the element's own
         intersection rectangle to zero area — so an IntersectionObserver
         watching the clipped element itself reports intersectionRatio 0
         forever and the reveal never fires. Below-fold wipes then stay
         permanently invisible while every .sb-reveal on the same page works,
         which is a maddening thing to debug from a screenshot.
         Reveal.jsx avoids this by putting its ref on the OUTER element and the
         .sb-wipe-inner span inside it. Same split here. */
      var probe = el.classList.contains('sb-wipe-inner') && el.parentElement
        ? el.parentElement
        : el;

      var shown = false;
      function show() { if (!shown) { shown = true; el.setAttribute('data-in', '1'); } }

      var box = window.innerHeight || 0;
      var b = probe.getBoundingClientRect();
      if (b.top < box - box * 0.06 && b.bottom > 0) { show(); return; }
      if (typeof IntersectionObserver === 'undefined') { show(); return; }

      var reported = false;
      var io = new IntersectionObserver(function (entries) {
        reported = true;
        entries.forEach(function (e) { if (e.isIntersecting) { show(); io.disconnect(); } });
      }, { threshold: 0.15 });
      io.observe(probe);

      setTimeout(function () {
        if (shown) return;
        if (!reported) { show(); return; }
        /* Re-measure rather than trusting the report: on load an element may
           have had no layout box yet, and a zero rect fails the check above. */
        var r = probe.getBoundingClientRect();
        if (r.bottom > 0 && r.top < (window.innerHeight || 0)) show();
      }, 400);
    });
  }

  /* ---------------------------------------------------------------------
     3. Sticky header over unknown ground.

     The translucent rest state is tuned to the field the header STARTS over.
     Two scrolls later an arbitrary section is passing underneath, and a 72%
     dark ground over a white section composites to light grey, which erases
     the ivory logo and links. So the header commits to a near-opaque ground as
     soon as the page moves. Passive listener behind a rAF gate, and it reads
     the state once on load because a reload can restore a scrolled position.
     ------------------------------------------------------------------- */
  function initHeader() {
    var header = document.querySelector('.sb-header');
    if (!header) return;

    var queued = false;
    function read() {
      queued = false;
      var y = Math.max(window.scrollY || 0, document.documentElement.scrollTop || 0);
      if (y > 18) header.setAttribute('data-scrolled', '1');
      else header.removeAttribute('data-scrolled');
    }
    function onScroll() { if (!queued) { queued = true; requestAnimationFrame(read); } }
    read();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* Mobile nav sheet. The panel only exists below 820px; if the viewport
       grows past that while it is open the links would be left in a sheet that
       is no longer rendered as one. */
    var toggle = header.querySelector('.sb-nav-toggle');
    var nav = header.querySelector('.sb-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      if (open) { nav.setAttribute('data-open', '1'); header.setAttribute('data-open', '1'); }
      else { nav.removeAttribute('data-open'); header.removeAttribute('data-open'); }
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      var ico = toggle.querySelector('.sb-ico');
      if (ico) ico.setAttribute('data-ico', open ? 'XClose' : 'Menu01');
    }
    toggle.addEventListener('click', function () {
      setOpen(nav.getAttribute('data-open') !== '1');
    });
    if (typeof matchMedia === 'function') {
      matchMedia('(min-width:821px)').addEventListener('change', function () { setOpen(false); });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ---------------------------------------------------------------------
     4. The demo session.

     localStorage, NOT sessionStorage. sessionStorage does not survive a new
     tab, and the first thing anyone does with a members link is open it in a
     new one: they would land signed out and conclude the login is broken.
     ------------------------------------------------------------------- */
  var KEY = 'sb.demo.v1';

  var DEFAULT_SESSION = {
    signedIn: false,
    member: {
      name: 'Ray Halloran',
      first: 'Ray',
      company: 'Halloran Industrial',
      sector: 'Industrial services',
      track: 'Build value first',
      joined: 'March 2026'
    },
    /* submitted -> matched -> introduced. The demo panel steps this. */
    requestState: 'matched'
  };

  function readSession() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) return JSON.parse(JSON.stringify(DEFAULT_SESSION));
      var parsed = JSON.parse(raw);
      /* Merge over the default so a stored object written by an earlier build
         cannot leave a newer screen reading undefined. */
      return {
        signedIn: !!parsed.signedIn,
        member: Object.assign({}, DEFAULT_SESSION.member, parsed.member || {}),
        requestState: parsed.requestState || DEFAULT_SESSION.requestState
      };
    } catch (e) {
      /* Private-mode Safari throws on localStorage. Signed out is the honest
         fallback, and the soft gate makes that a legible state rather than a
         broken one. */
      return JSON.parse(JSON.stringify(DEFAULT_SESSION));
    }
  }

  function writeSession(s) {
    try { window.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* see above */ }
    session = s;
    applySession();
  }

  var session = readSession();

  /* Paints every session-dependent element on the page. Called on load and on
     every session change, so no screen has to know how it got here. */
  function applySession() {
    root.setAttribute('data-sb-signed-in', session.signedIn ? '1' : '0');
    root.setAttribute('data-sb-request', session.requestState);

    Array.prototype.forEach.call(
      document.querySelectorAll('[data-session-field]'),
      function (el) {
        var path = el.getAttribute('data-session-field').split('.');
        var v = session;
        for (var i = 0; i < path.length && v != null; i++) v = v[path[i]];
        if (v != null) el.textContent = v;
      }
    );

    /* Show only when signed in / only when signed out. */
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-when]'),
      function (el) {
        var want = el.getAttribute('data-when');
        var on = (want === 'in') === session.signedIn;
        el.hidden = !on;
      }
    );

    if (window.SBDemo && window.SBDemo.sync) window.SBDemo.sync(session);
  }

  /* ---------------------------------------------------------------------
     5. Stubs.

     There is no href="#" anywhere in this prototype. A control that would lead
     into unbuilt product carries data-stub with the sentence to show, and lands
     here. A click is always answered.
     ------------------------------------------------------------------- */
  var toast, toastTimer;

  function showToast(msg) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'sbp-toast';
      toast.setAttribute('role', 'status');
      toast.innerHTML = '<span class="sb-ico" data-ico="InfoCircle" aria-hidden="true"></span><span></span>';
      document.body.appendChild(toast);
    }
    toast.lastChild.textContent = msg;
    toast.setAttribute('data-open', '1');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.removeAttribute('data-open'); }, 3600);
  }

  function initStubs() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest ? e.target.closest('[data-stub]') : null;
      if (!el) return;
      e.preventDefault();
      showToast(el.getAttribute('data-stub'));
    });
  }

  /* Sign in / out controls, usable from any screen. */
  function initSessionControls() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest ? e.target.closest('[data-session-action]') : null;
      if (!el) return;
      var action = el.getAttribute('data-session-action');
      if (action === 'signin' || action === 'signout') {
        e.preventDefault();
        var next = readSession();
        next.signedIn = action === 'signin';
        writeSession(next);
        var to = el.getAttribute('data-session-to');
        if (to) window.location.href = to;
      }
    });
  }

  /* ---------------------------------------------------------------------
     Public surface, for demo.js and the members screens.
     ------------------------------------------------------------------- */
  window.SB = {
    key: KEY,
    get session() { return session; },
    read: readSession,
    write: writeSession,
    reset: function () {
      try { window.localStorage.removeItem(KEY); } catch (e) { /* see readSession */ }
      session = readSession();
      applySession();
    },
    toast: showToast,
    defaults: DEFAULT_SESSION
  };

  function boot() {
    applySession();
    initReveals();
    initHeader();
    initStubs();
    initSessionControls();
    var year = document.querySelectorAll('[data-year]');
    Array.prototype.forEach.call(year, function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
