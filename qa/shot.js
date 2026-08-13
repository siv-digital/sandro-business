/* Screenshot helper for the Sandro Business prototype QA loop.
   The Browser pane blanks after a scroll on this machine (see memory:
   preview-pane-screenshot-workaround), so full-page captures go through
   Playwright against the cached chromium instead.

   node shot.js <url> <out.png> [--w=1440] [--h=900] [--full] [--fonts]
     --fonts injects self-hosted @font-face over the design system's Google
     Fonts CDN link, which is unreachable here and fails silently. Only needed
     for marketing-site/ (the reference); site/ self-hosts already.            */
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const url = args[0];
const out = args[1];
const flag = (n, d) => { const a = args.find(x => x.startsWith(`--${n}=`)); return a ? +a.split('=')[1] : d; };
const has = n => args.includes(`--${n}`);

const FONT_CSS = `
@font-face{font-family:'Libre Baskerville';src:url('/site/assets/fonts/libre-baskerville.woff2') format('woff2');font-weight:400 700;font-style:normal}
@font-face{font-family:'Libre Baskerville';src:url('/site/assets/fonts/libre-baskerville-italic.woff2') format('woff2');font-weight:400 700;font-style:italic}
@font-face{font-family:'DM Sans';src:url('/site/assets/fonts/dm-sans.woff2') format('woff2');font-weight:400 600;font-style:normal}`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: flag('w', 1440), height: flag('h', 900) },
    deviceScaleFactor: 2,
  });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(String(e)));
  page.on('requestfailed', r => errors.push(`FAILED ${r.url()} ${r.failure()?.errorText || ''}`));

  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  if (has('fonts')) {
    await page.addStyleTag({ content: FONT_CSS });
    await page.evaluate(() => document.fonts.ready);
  }
  // Let entrance reveals land, then scroll the whole page so every
  // IntersectionObserver has fired before the full-page capture.
  await page.waitForTimeout(600);
  if (has('full')) {
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 260));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(900);
  }
  await page.screenshot({ path: out, fullPage: has('full') });

  const fonts = await page.evaluate(() => {
    const g = el => el ? getComputedStyle(el).fontFamily : null;
    return {
      body: g(document.body),
      h1: g(document.querySelector('h1')),
      h2: g(document.querySelector('h2')),
    };
  });
  console.log(JSON.stringify({ out, fonts, errors: [...new Set(errors)].slice(0, 20) }, null, 2));
  await browser.close();
})();
