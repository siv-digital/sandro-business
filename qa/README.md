# QA

Per-page sweep for the prototype. Mobile is part of every pass here, not a
follow-up: `qa.js` runs a page at 1440 / 1280 / 1024 / 768 / 390 and fails on
horizontal overflow, reveals that never fired, webfonts falling back to
Georgia/Arial, console and page errors, failed requests, `href="#"`, and touch
targets under 40px. It also resolves every internal link and reports the status
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

Two thresholds are deliberate and should not be "tightened":

- **The touch-target floor is 40px, not 44.** `components.css` sizes footer
  links to exactly 40 below the tablet breakpoint as a design-system decision.
  This check exists to catch targets the system never sized, not to relitigate
  the ones it did.
- **The font check does not count to three.** A declared `@font-face` only
  reports `loaded` once something on the page uses it, so a page with no pull
  quote never loads Baskerville Italic and is perfectly fine. It checks the two
  faces every page uses, plus italic only when italic actually renders.
