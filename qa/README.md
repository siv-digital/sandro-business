# QA

Per-page sweep for the prototype. Mobile is part of every pass here, not a
follow-up: `qa.js` runs a page at 1440 / 1280 / 1024 / 768 / 390 and fails on
horizontal overflow, reveals that never fired, images that respond but fail to
render, webfonts falling back to Georgia/Arial, console and page errors, failed
requests, `href="#"`, and touch targets under 40px. It also resolves every internal link and reports the status
codes, so an unbuilt screen shows up as a 404 rather than as a silent dead end.

Playwright is not vendored here. It lives with the Broadridge QA skill, so both
scripts run with `NODE_PATH` pointed at it:

```bash
NODE_PATH=~/.claude/skills/broadridge-wix-qa/scripts/node_modules \
  node qa/qa.js http://localhost:4331/ home
```

`shot.js` is the screenshot helper. Full-page captures go through Playwright
rather than the Browser pane, because pane screenshots on this machine blank out
after a scroll.

```bash
NODE_PATH=~/.claude/skills/broadridge-wix-qa/scripts/node_modules \
  node qa/shot.js http://localhost:4331/ home.png --full
```

## Members screens

A members page loads on the soft gate, which blurs the console behind a card.
QA'd in that state it reports one card and no content, so `SB_SIGNED_IN=1`
seeds the demo session into `localStorage` before the page runs:

```bash
SB_SIGNED_IN=1 NODE_PATH=~/.claude/skills/broadridge-wix-qa/scripts/node_modules \
  node qa/qa.js http://localhost:4331/members/ members
```

It uses `addInitScript`, not an `evaluate` after `goto`: `app.js` reads the
session during boot, so seeding afterwards would measure a page that had
already painted signed out. Run the sign-in screen **without** the flag, since
its whole job is the signed-out state.

The seeded object's shape has to stay in step with `DEFAULT_SESSION` in
`site/assets/app.js`.

Two thresholds are deliberate and should not be "tightened":

- **The touch-target floor is 40px, not 44.** `components.css` sizes footer
  links to exactly 40 below the tablet breakpoint as a design-system decision.
  This check exists to catch targets the system never sized, not to relitigate
  the ones it did.
- **The font check does not count to three.** A declared `@font-face` only
  reports `loaded` once something on the page uses it, so a page with no pull
  quote never loads Baskerville Italic and is perfectly fine. It checks the two
  faces every page uses, plus italic only when italic actually renders.


## The broken-image check

Added 2026-08-14 after a sweep reported a page clean while an avatar was
visibly broken. A double hyphen inside an XML comment made an SVG unparseable;
it served 200, logged no console error and failed no request, so every existing
check passed and Chrome painted its broken-image glyph. `img.complete &&
img.naturalWidth === 0` is the only reliable tell, and it costs nothing.
