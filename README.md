# Sandro Business

The advisory community platform for business owners, plus the Sandro Business design system it is built on.

Sandro Business is the unit spinning off from Sandro Wealth Management. This repo holds its design system, the design reference screens, and the clickable prototype of the community platform.

## Layout

| Path | What | Published? |
|---|---|---|
| `site/` | The prototype. Everything here is served at the public URL. | **Yes** |
| `qa/` | Per-page QA sweep and screenshot helper. See `qa/README.md`. | No |
| `design-system/` | Tokens, 22 components with `.d.ts` contracts, logo lockups, sunburst, photography, `SKILL.md`. Read `design-system/readme.md` in full before writing UI. | No |
| `marketing-site/` | Four design-reference screens (Home, The Journey, Tracks, Assessment). Browser-transpiled prototypes showing intended look, not production code. | No |
| `reference/_notes/` | Extracted text of the two client source documents. All site copy derives from these. | No |
| `CLAUDE.md` | Design-system project context. Auto-loads when working in this repo. | No |

Only `site/` is in the publish path. That is deliberate: the design system is 14MB including a 4.6MB inlined icon set, and the reference notes are internal.

## What is built

Home, `/advisors/` and a styled `404.html`. The Members Area, Insights, Apply and Directory screens are not started.

**No control on the site reaches a 404 any more.** A link into unbuilt product either goes silent (`data-inert`, used for small affordances: buttons, nav links, the footer) or answers with a toast (`data-stub`, used for large ones: the Insights cards, the directory). Both keep the `href` in the markup, because it documents where the control will point, it keeps the element focusable, and it keeps the QA link sweep reporting the unbuilt screens as a list. `data-inert` cancels `auxclick` as well as `click`, or a middle click still opens the dead path in a new tab. The 404 remains as the catch-all with its full screen index.

`site/assets/ds/` is the design system ported verbatim (tokens + `components.css`) plus two files that are ours: `fonts.css`, which self-hosts and replaces the CDN link, and `icons.css`, a 24-glyph subset of the 4.6MB `icon-data.js` rendered as SVG data-URI masks. `site/assets/app.css` is the prototype layer and is `.sbp-` prefixed so it can never be confused with a ported `.sb-` style. `site/assets/app.js` carries motion arming, reveals, the sticky-header ground swap, the mobile sheet, stub toasts and the `sb.demo.v1` session.

## Local preview

Serve from inside the folder you are working on, not the repo root:

```bash
python3 -m http.server 4324 --directory site
```

Python's `http.server` is single-threaded and drops requests when a page load and a QA run overlap. It dies fairly often. Restart it rather than debugging the site.

For the design reference screens:

```bash
python3 -m http.server 4325 --directory marketing-site
```

`marketing-site/index.html` needs an **HTTP origin**. It will not render from `file://`, because Babel standalone fetches the `.jsx` sources over XHR and Chrome refuses that on a file URL. Opening the file directly gives a blank page, not an error.

## Deploy

One Render service, `sandro-business-prototype`, Blueprint-managed from `render.yaml`. Push to `main` and it deploys. Full mechanics, and the traps, are in the comments at the top of `render.yaml`.

Verify headers after any header change, because local preview sends none:

```bash
curl -sSI https://sandro-business-prototype.onrender.com/ | grep -iE "x-frame|x-robots|content-security"
```

## Traps

Every one of these has already cost time somewhere in this engagement.

- **Render's edge can negative-cache a path, and a rebuild will not clear it.** Seen on the very first deploy: `/assets/fonts/libre-baskerville.woff2` returned 404 with `x-render-routing: no-server` while the same path with `?v=1` returned 200, proving the file was published and only the cached path was poisoned. CDN invalidation only covers *changed* files, so the fix is to change the URL, not to redeploy. Font URLs carry `?v=` for exactly this reason — bump it on any font swap. When something 404s that you know you shipped, retry with a query string before you go looking for a build problem.
- **Google Fonts fails silently on the build machine.** `design-system/tokens/fonts.css` and the marketing-site reference load Libre Baskerville and DM Sans from the CDN, which is unreachable and fails without an error. You will build the whole thing looking at Georgia and Arial and not notice. Self-host `.woff2` for anything in `site/`.
- **Aquamarine carries the actions, not khaki.** `--action-primary` resolves to khaki in the tokens, but the marketing site never uses it that way: the header CTA, hero CTA and light-section CTAs are all aqua, bright on dark fields and deeper on light ones. Khaki is editorial trim. Restraint comes from field discipline (most sections quiet, carrying one aqua element), not from rationing the colour.
- **Motion must fail open.** Resting states are the unconditional CSS default; hidden from-states live under `html[data-sb-motion="1"]`, set only after two consecutive `requestAnimationFrame` callbacks land. Never gate legibility on an animation running.
- **No inline styles on anything a breakpoint changes.** An inline style beats a media query. This broke the photographic band three times.
- **Never `#FFFFFF` as a page background.** Off-White is `#FFFEF6`.
- **Two different sunbursts exist** (hero fan: 23 rays; logo symbol: 15). They look interchangeable at small sizes and are not.
- **An SVG data-URI mask must have its double quotes percent-encoded.** Leave them raw and the CSS string closes early, the mask never resolves, and the element paints as a solid box — indistinguishable from a design decision. Cost a cycle on the icon subset. The generator and its safe-character set are recorded in `site/assets/ds/icons.css`.
- **Never point an IntersectionObserver at a `.sb-wipe-inner` element.** Its from-state is `clip-path: inset(100%)`, which zeroes the element's own intersection rectangle, so the observer reports 0 forever. Every below-fold wipe stays permanently invisible while `.sb-reveal` on the same page works, which is maddening to debug from a screenshot. `Reveal.jsx` observes the OUTER element; `site/assets/app.js` does the same via its `probe` / `target` split.
- **Anything hidden with `display:none` has to be marked `data-in="1"`.** Same failure as above from the other direction: a hidden element's observer can never fire, so when a filter brings it back it sits correctly in the layout and paints at opacity 0. `initFilters` marks every cell it hides on the way out.
- **`app.css` and `app.js` carry `?v=N`. Bump it whenever either file changes.** `http.server` sends no `Cache-Control`, so the browser revalidates the HTML and holds the stylesheet. You get new markup with old styles, which looks exactly like a change that did not apply, and it cost two rounds of phantom bug reports. Same class of problem as the Render edge cache above, same fix: change the URL.
- **Never add `scroll-behavior:smooth`.** It animates *programmatic* scrolls too, so the QA sweep's scroll loop and any below-fold IntersectionObserver stop landing. Three reveals in the closing field went permanently invisible at 768. Tried and reverted on 2026-08-13; there is a note in `app.css` saying so.
- **`aria-disabled` is not how you make a control look live and go nowhere.** `components.css` drops a disabled `.sb-btn` to 42% opacity with a `not-allowed` cursor. Use `data-inert`.
- **Markup must reference a glyph that exists in `site/assets/ds/icons.css`.** A missing name means no mask, and the element paints as a solid box, which looks identical to the unencoded-quote failure above and has nothing to do with encoding. Adding a glyph means regenerating from the 4.6 MB `icon-data.js`; prove the generator by regenerating a glyph already in the file and diffing byte for byte first.
- **A `.sb-btn` with no `data-size` has no padding and collapses to ~26px.** `Button.jsx` supplies `md` as a prop default, so `components.css` never declares an unattributed fallback. Hand-authored HTML has to set it.
- **The ray fan is an external SVG used as a CSS mask**, not inlined path data, so 9.5KB is not duplicated into every page that shows a sunrise. Safe only because it is vector — the warning above about masks that fetch 200 and then paint the unmasked box is about **raster** masks. Never point `.sbp-rays` at a PNG.
- **Compliance.** Sandro Wealth Management is an SEC-registered investment adviser. No performance promises, no specific investment advice, no superlatives, no testimonials. **Never write disclosure or citation copy and never leave a bracketed placeholder for it** — omit the line and flag that Sandro's approved language is required.

## Known gaps in the design system

Carried from the original handoff, unresolved:

- **Photography** is 439×597 crops from the brand-book PDF. Real photography is needed at 2560px, 3840px for full-bleed. Treat every photographic band as a placeholder.
- **Wordmark.** The parent lockup's letterfit is tighter than Libre Baskerville produces, so "SandroBusiness" as composed in `Logo.jsx` is an approximation.
- **Icons.** `design-system/components/icons/icon-data.js` is 4.6MB of inlined paths (1,173 icons). Subset before anything ships.
- **Fixed on import:** `marketing-site/index.html` shipped referencing `../../styles.css` and `../../_ds_bundle.js`, which resolved above the handoff root. Repointed to `../design-system/`.

## Related

Workstream context, requirements spec and decisions live in the SIV workspace at `clients/sandro-wealth-management/technical/sandro-business-community/CLAUDE.md`.
