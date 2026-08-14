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

  /* The demo member is the COMMITTED SELLER (Travis, 2026-08-14): Ready to
     Sell track, assessment band 8 to 10, fast-tracked past value acceleration,
     currently in Phase III. Chosen over the Value Builder because his roadmap
     has two phases complete, one live and two ahead, which is the state with
     the most to show on a dashboard. reference/_notes/business-owner-personas
     is the source; nothing here is invented beyond the name.

     The consultant is Alok Gupta, standing in until Sandro names the real one
     (Travis, 2026-08-14). A real person's name rather than an invented one, so
     nobody reads a stranger's byline on their own platform. */
  var DEFAULT_SESSION = {
    signedIn: false,
    member: {
      name: 'Ray Halloran',
      first: 'Ray',
      initials: 'RH',
      company: 'Halloran Industrial',
      sector: 'Industrial services',
      track: 'Ready to sell',
      phase: 'III',
      phaseName: 'Put your plans in place',
      joined: 'March 2026'
    },
    consultant: {
      name: 'Alok Gupta',
      first: 'Alok',
      initials: 'AG',
      role: 'Senior partner'
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
        consultant: Object.assign({}, DEFAULT_SESSION.consultant, parsed.consultant || {}),
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

  /* data-inert: a control that must LOOK live and go nowhere.

     The href stays in the markup on purpose. It documents where the control
     will point once the screen exists, it keeps the element focusable and
     hoverable, and it keeps the QA link sweep reporting the unbuilt screens as
     a list rather than losing track of them. Only the navigation is cancelled.

     auxclick as well as click, or a middle click still opens the dead path in
     a new tab. `aria-disabled` is deliberately NOT used: components.css drops
     a disabled .sb-btn to 42% opacity with a not-allowed cursor, and these are
     meant to read as ordinary live controls. */
  function initInert() {
    function block(e) {
      var el = e.target.closest ? e.target.closest('[data-inert]') : null;
      if (el) e.preventDefault();
    }
    document.addEventListener('click', block);
    document.addEventListener('auxclick', block);
  }

  /* ---------------------------------------------------------------------
     6. Email capture.

     The newsletter is the always-on nurture engine in the spec, so the field
     has to behave like a real one even with no back end: novalidate is on the
     form so the browser's own bubble does not fire, and this owns the whole
     response. Validation is deliberately shallow — a real one belongs at the
     HubSpot end, and rejecting an address a mail server would accept is worse
     than passing one it would not.
     ------------------------------------------------------------------- */
  function initSubscribe() {
    /* Clear the invalid state the moment the field is touched.
       Without this, one failed submit leaves data-invalid set, components.css
       paints the border --feedback-critical, and it STAYS red the whole time
       the user is typing the correct address. A field that is being fixed must
       not still be shouting about the old mistake. */
    document.addEventListener('input', function (e) {
      var input = e.target;
      if (!input.closest || !input.closest('form[data-subscribe]')) return;
      var wrap = input.closest('.sb-input-wrap');
      if (wrap) wrap.removeAttribute('data-invalid');
    });

    document.addEventListener('submit', function (e) {
      var form = e.target.closest ? e.target.closest('form[data-subscribe]') : null;
      if (!form) return;
      e.preventDefault();

      var input = form.querySelector('input[type="email"]');
      var wrap = input && input.closest('.sb-input-wrap');
      var value = input ? input.value.trim() : '';
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

      if (!ok) {
        if (wrap) wrap.setAttribute('data-invalid', '1');
        if (input) input.focus();
        showToast('Enter an email address so we know where to send it.');
        return;
      }

      if (wrap) wrap.removeAttribute('data-invalid');
      input.value = '';
      showToast('Thanks. This adds you to the Insights list on the live site.');
    });
  }

  /* ---------------------------------------------------------------------
     7. Insights format filters.

     Every card and the podcast panel are in the DOM and visible before this
     runs, so a page whose script never loads shows the full list rather than
     an empty grid. This applies "All" on boot and swaps from there. Same
     fail-open contract as the reveals.

     Filtering is show/hide on markup that already exists rather than rendering
     from a data array: the cards keep their reveal attributes, their images
     are fetched by the browser normally, and nothing has to be re-observed.
     `hidden` is not used, because .sbp-card-cell sets display and an inline
     display would beat it; a data attribute and a CSS rule keep the cascade
     where it can be read.
     ------------------------------------------------------------------- */
  function initFilters() {
    var chips = document.querySelectorAll('.sbp-filters [data-filter]');
    if (!chips.length) return;
    var grid = document.querySelector('[data-filter-grid]');
    var panel = document.querySelector('.sbp-podcast');
    if (!grid) return;

    var cells = grid.querySelectorAll('[data-media]');

    /* Home curates "All" down to the featured cards; the members library IS
       the full list, so its grid opts out with data-filter-full. */
    var full = grid.hasAttribute('data-filter-full');

    function apply(which) {
      /* The podcast has no episodes, so its filter shows the panel INSTEAD of
         the grid rather than an empty three-up. */
      var podcast = which === 'podcast';
      grid.toggleAttribute('data-off', podcast);
      if (panel) panel.toggleAttribute('data-off', !podcast);

      Array.prototype.forEach.call(cells, function (cell) {
        var show = which === 'all'
          ? (full || cell.hasAttribute('data-featured'))
          : cell.getAttribute('data-media') === which;
        cell.toggleAttribute('data-off', !show);

        /* A display:none cell has a zero intersection rectangle, so its
           observer reports 0 and its reveal never fires. It would then be
           shown by a filter click while still in the from-state: present in
           the DOM, correct in the layout, and painted at opacity 0. This is
           the same failure the wipe/observer note in initReveals describes,
           arriving from the other direction.

           So anything we hide is marked revealed on the way out. It cannot
           animate while hidden and it has to be ready the instant a filter
           brings it back. Cells that stay visible are left to the observer,
           which is what keeps the section's entrance animation intact. */
        if (!show) cell.setAttribute('data-in', '1');
      });

      Array.prototype.forEach.call(chips, function (chip) {
        var on = chip.getAttribute('data-filter') === which;
        /* Explicit "1", not toggleAttribute: components.css keys the active
           tag off [data-active="1"] and toggleAttribute would write "". */
        if (on) chip.setAttribute('data-active', '1');
        else chip.removeAttribute('data-active');
        chip.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener('click', function () {
        apply(chip.getAttribute('data-filter'));
      });
    });

    apply('all');
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
    initInert();
    initSubscribe();
    initFilters();
    initSessionControls();
    var year = document.querySelectorAll('[data-year]');
    Array.prototype.forEach.call(year, function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
