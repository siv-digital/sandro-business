/* Sandro Business prototype — per-page QA sweep.
   Runs every page at five widths, because mobile is part of the pass, not a
   follow-up. Checks the things that fail silently on this build:
     - horizontal overflow (an element wider than the viewport)
     - reveals that never fired (the clip-path/IntersectionObserver trap)
     - fonts falling back to Georgia/Arial (the Google Fonts CDN failure mode)
     - console errors, page errors, failed requests
     - href="#" and unresolved internal links (a live link that 404s fails the
       sweep; links marked data-inert or data-stub are documented placeholders
       and are reported but never fail)
     - touch targets under 40px below the tablet breakpoint (the build aims
       for 44px on primary paths; 40 is the floor so documented 40px footer
       links do not false-fail)

   node qa.js <url> [outPrefix]
   Screenshots land in qa/shots/ (created on demand, gitignored).
*/
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const url = process.argv[2] || 'http://localhost:4331/';
const prefix = process.argv[3] || 'qa';

/* Shots go to qa/shots/ relative to the repo root (this script's parent),
   not the cwd — a sweep used to leave a pile of PNGs wherever it was run. */
const SHOTS = path.join(__dirname, 'shots');
fs.mkdirSync(SHOTS, { recursive: true });

/* Members screens open on the soft gate, which blurs the console behind a card.
   QA'd in that state a members page reports one card and no content, so
   SB_SIGNED_IN=1 seeds the demo session into localStorage BEFORE the page runs.
   addInitScript, not an evaluate after goto: app.js reads the session during
   boot, and seeding afterwards would measure a page that painted signed out.
   The shape must stay in step with DEFAULT_SESSION in assets/app.js. */
const SEED_SIGNED_IN = process.env.SB_SIGNED_IN === '1';
const seed = page => SEED_SIGNED_IN
  ? page.addInitScript(() => {
      try { localStorage.setItem('sb.demo.v1', JSON.stringify({ signedIn: true })); } catch (e) {}
    })
  : Promise.resolve();
const WIDTHS = [
  [1440, 900, 'desktop'],
  [1280, 800, 'laptop'],
  [1024, 768, 'tablet-l'],
  [768, 1024, 'tablet-p'],
  [390, 844, 'phone'],
];

(async () => {
  const browser = await chromium.launch();
  const report = { url, widths: {}, links: null, problems: [] };

  for (const [w, h, name] of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    await seed(page);
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push('pageerror: ' + e));
    page.on('requestfailed', r => errors.push('requestfailed: ' + r.url()));

    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    // Scroll the whole page so every observer fires before we measure.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
        window.scrollTo(0, y); await new Promise(r => setTimeout(r, 200));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);

    const r = await page.evaluate(() => {
      const vw = window.innerWidth;
      // Only count overflow that actually escapes: an element clipped by an
      // overflow:hidden ancestor is intentional (the sunburst does this).
      const clipped = el => {
        for (let p = el.parentElement; p; p = p.parentElement) {
          const o = getComputedStyle(p);
          if (o.overflow !== 'visible' || o.overflowX !== 'visible') return true;
        }
        return false;
      };
      const over = [...document.querySelectorAll('body *')]
        .filter(el => {
          const b = el.getBoundingClientRect();
          return b.width > 0 && (b.right > vw + 1 || b.left < -1) && !clipped(el);
        })
        .map(el => el.tagName.toLowerCase() + '.' + (typeof el.className === 'string' ? el.className : '').split(' ')[0])
        .slice(0, 8);

      const unrevealed = [...document.querySelectorAll('[data-rv]')]
        .filter(e => e.getAttribute('data-in') !== '1')
        .map(e => (e.textContent || '').trim().slice(0, 40));

      /* Floor is 40, not 44: components.css sets footer links to exactly 40px
         below the tablet breakpoint as a deliberate call, and this check exists
         to catch targets the design system never sized, not to relitigate the
         ones it did. */
      const small = vw <= 820
        ? [...document.querySelectorAll('a[href], button')]
            .filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && b.height < 40; })
            .map(e => e.tagName.toLowerCase() + ' "' + (e.textContent || '').trim().slice(0, 24) + '" h=' + Math.round(e.getBoundingClientRect().height))
        : [];

      /* An image that responds 200 but fails to DECODE clears every other check
         here: no console error, no failed request, no layout problem. A broken
         SVG paints Chrome's broken-image glyph and looks like a missing file.
         naturalWidth === 0 on a complete image is the only reliable tell.
         (Found 2026-08-14: a double hyphen inside an XML comment made an SVG
         avatar unparseable, and this sweep reported the page clean.) */
      const brokenImages = [...document.querySelectorAll('img')]
        .filter(i => i.complete && i.naturalWidth === 0)
        .map(i => i.getAttribute('src'));

      const usedSerif = getComputedStyle(document.querySelector('h1') || document.body).fontFamily;
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: vw,
        overflowing: over,
        brokenImages,
        unrevealed,
        smallTargets: [...new Set(small)],
        serifStack: usedSerif,
        /* A declared @font-face only reports "loaded" once something on the
           page actually uses it, so counting to three is wrong: a page with no
           pull quote never loads Baskerville Italic and is perfectly fine.
           Check the two faces every page uses, and check italic only when the
           page renders italic type. */
        fontsLoaded: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + '/' + f.style),
        needsItalic: [...document.querySelectorAll('body *')].some(e => getComputedStyle(e).fontStyle === 'italic'),
      };
    });

    await page.screenshot({ path: path.resolve(SHOTS, `${prefix}-${name}.png`), fullPage: name === 'desktop' || name === 'phone' });
    r.errors = [...new Set(errors)];
    report.widths[name] = r;

    if (r.scrollWidth > r.innerWidth) report.problems.push(`${name}: horizontal scroll (${r.scrollWidth} > ${r.innerWidth})`);
    if (r.overflowing.length) report.problems.push(`${name}: overflowing ${r.overflowing.join(', ')}`);
    if (r.brokenImages.length) report.problems.push(`${name}: image(s) responded but failed to render: ${r.brokenImages.join(', ')}`);
    if (r.unrevealed.length) report.problems.push(`${name}: ${r.unrevealed.length} reveal(s) never fired: ${r.unrevealed.join(' | ')}`);
    if (r.smallTargets.length) report.problems.push(`${name}: touch targets under 40px: ${r.smallTargets.join(' ; ')}`);
    if (r.errors.length) report.problems.push(`${name}: ${r.errors.join(' | ')}`);
    const need = ['Libre Baskerville/normal', 'DM Sans/normal']
      .concat(r.needsItalic ? ['Libre Baskerville/italic'] : []);
    const missing = need.filter(f => !r.fontsLoaded.includes(f));
    if (missing.length) report.problems.push(`${name}: webfont not loaded: ${missing.join(', ')} (falling back to Georgia/Arial)`);

    await page.close();
  }

  // Link audit once, at desktop.
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await seed(page);
  await page.goto(url, { waitUntil: 'networkidle' });
  const links = await page.evaluate(() => {
    /* Two classes of internal link, judged per ELEMENT: a link carrying
       data-inert or data-stub is a documented placeholder (non-failing); one
       carrying neither is live and must resolve. The same href can appear in
       both classes (footer /directory/ is inert, the rail's is live) — an href
       with any live element is judged live. */
    const hash = [], stub = [], internal = new Set(), documented = new Set();
    document.querySelectorAll('a').forEach(a => {
      const h = a.getAttribute('href');
      if (!h || h === '#') { hash.push((a.textContent || '').trim().slice(0, 30)); return; }
      if (/^https?:|^mailto:/.test(h)) return;
      if (a.hasAttribute('data-stub') || a.hasAttribute('data-inert')) {
        if (a.hasAttribute('data-stub')) stub.push((a.textContent || '').trim().slice(0, 30));
        documented.add(h);
      } else internal.add(h);
    });
    return { hash, stub, internal: [...internal], documented: [...documented].filter(h => !internal.has(h)) };
  });
  const codes = {};
  for (const h of [...links.internal, ...links.documented]) {
    const u = new URL(h, url);
    const res = await page.request.get(u.toString()).catch(() => null);
    codes[h] = res ? res.status() : 'ERR';
  }
  links.codes = codes;
  if (links.documented.length) links.documentedNote = `inert/stub documented targets: ${links.documented.length} (non-failing)`;
  report.links = links;
  if (links.hash.length) report.problems.push(`href="#" on: ${links.hash.join(', ')}`);
  for (const h of links.internal.filter(h => codes[h] !== 200)) {
    report.problems.push(`live link resolves to ${codes[h]}: ${h}`);
  }

  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})();
