# Sandro Business

The advisory community platform for business owners, plus the Sandro Business design system it is built on.

Sandro Business is the unit spinning off from Sandro Wealth Management. This repo holds its design system, the design reference screens, and the clickable prototype of the community platform.

## Layout

| Path | What | Published? |
|---|---|---|
| `site/` | The v1 prototype (Sandro Business branding). Everything here is served at the v1 public URL. | **Yes** |
| `site-v2/` | The **Business Value Advisory Alliance** homepage (8/25 rebrand round). Publishes as its OWN Render service, `bvaa-prototype`; v1 stays untouched. Its `assets/` are copied from `site/assets/` plus a `v2.css` layer (`.sbp2-`) — the copies are read-only siblings, never edits to `site/`. | **Yes** (own service) |
| `qa/` | Per-page QA sweep and screenshot helper. See `qa/README.md`. | No |
| `design-system/` | Tokens, 22 components with `.d.ts` contracts, logo lockups, sunburst, photography, `SKILL.md`. Read `design-system/readme.md` in full before writing UI. | No |
| `marketing-site/` | Four design-reference screens (Home, The Journey, Tracks, Assessment). Browser-transpiled prototypes showing intended look, not production code. | No |
| `reference/_notes/` | Extracted text of the three client source documents, including the requirements draft the members area is built against. All site copy derives from these. | No |
| `CLAUDE.md` | Design-system project context. Auto-loads when working in this repo. | No |

Only `site/` is in the publish path. That is deliberate: the design system is 14MB including a 4.6MB inlined icon set, and the reference notes are internal.

## What is built

Home, `/advisors/`, a styled `404.html`, the members area (`site/members/` — the Roadmap dashboard — plus `site/members/sign-in.html`, the **Insights library** at `site/members/insights.html`, and the **Directory** at `site/directory/`, all live as of 8/14), and the join flow's front half: `site/assessment/` (a fork of the sandro-pages readiness assessment carrying the client's 7/28 wording review — 15 questions, results CTA "Continue your application") and `site/apply/` (the stubbed application container it opens; reuses the 404 shell's classes on purpose so it adds no CSS). Every "Start your application" CTA and the members "Retake the assessment" link resolve to `/assessment/`. The members rail is Roadmap, Insights, Requests, Directory, Diagnostics, Events: **every built screen is a live link on every members shell, Diagnostics routes to `/assessment/`** (the diagnostic IS the assessment; there is no separate screen), and only Requests, Events and the consultant page remain stubs. The Directory is reachable from the members rail ONLY — the footer link stays inert and home carries no link to it, on purpose. **The assessment fork's question roster must track `sandro-pages/assessment/` — one client-approved question set, two deployments; the fork's deliberate deltas are branding, the application CTA, the application-first intro copy, and the removal of every playbook reference and CTA (Travis, 8/14) — the standalone keeps the playbook hook, the fork's value story is the membership application.**

**The members area is the argument for why this is not Framer**, so it demonstrates state rather than describing it:

- **The shell** is the design system's own `.sb-rail` (including its 820px collapse to a horizontal bar) inside a `.sbp-rail-col` that carries the ground full height, with `.sbp-console` page-scrolling rather than `.sb-console`'s inner scroller. Reasoning is on the rules in `app.css`.
- **The soft gate, never a redirect.** Signed out, `/members/` still renders its real content, blurred behind a small card. A redirect to a login screen would hide the exact thing the prototype exists to show.
- **The session is `localStorage`, not `sessionStorage`.** The first thing anyone does with a members link is open it in a new tab, and `sessionStorage` would land them signed out and reading it as a broken login.
- **The demo member is the Committed Seller** (Ready to Sell track, Phase III, two phases complete). Seeded from `reference/_notes/business-owner-personas`, marked `Demonstration account` on the page so it cannot be taken for a real member.
- **Named firms are a scoped exception, not the rule** (CEO direction via Travis, 8/14, amended twice the same day). A signed firm's real name, logo and description appear on exactly three surfaces: `/directory/` (the per-firm blocks), the home partner-directory sample (logo plates only, never the per-firm block), and the dashboard request cards (so a member sees who an upcoming introduction might be). Everywhere else firms stay described, never named. A solid-border plate means a signed firm; the dashed plate remains the mark of an unsigned/pending slot. No ratings and no stars anywhere. Do not "fix" the directory back to placeholders, and do not propagate names to a fourth surface.
- **Freemium vs premium is one attribute.** `data-access="free|member"` on an Intelligence card drives the Members badge and the warm ground, and nothing else distinguishes the tiers. The badge markup sits in every card and CSS hides it for free items, so flipping the attribute is genuinely the whole change. It is the seam a CMS field plugs into later.
- **An Intelligence card's whole presentation comes from two attributes.** `data-access` gives it the tier, `data-format` gives it the media-type mark (guides outlined with a brass glyph, case studies solid titanium). Adding a format later is a glyph in the markup plus one CSS rule. Both are the seams a CMS plugs into.
- **`site/assets/img/member-placeholder.svg` is a vector figure, not a stock photo.** The demo member does not exist, so a real face would invite "who is that?" beside a Demonstration account tag. A real headshot drops in as a square `<img>` with no CSS change.
- **`site/assets/img/alok-gupta.jpg` is a client-supplied headshot**, cropped square and circled in CSS, used at 72px in the lede card and 36px in the rail. A replacement only has to be square. Note it is served from the public prototype URL; the same photograph is already public on sandrowealth.com/business-owner.
- **Nothing here holds client financial records.** The Documents module was cut rather than deferred: a member document vault commits an SEC-registered adviser to Reg S-P safeguards and a records-retention answer. Diagnostics shows a last-run date, not a stored report list, for the same reason.

**No control on the site reaches a 404 any more.** A link into unbuilt product either goes silent (`data-inert`, used for small affordances: buttons, nav links, the footer) or answers with a toast (`data-stub`, used for large ones: the Insights cards, the directory). Both keep the `href` in the markup, because it documents where the control will point, it keeps the element focusable, and it keeps the QA link sweep reporting the unbuilt screens as a list. Both handlers cancel `auxclick` as well as `click` — a middle click would otherwise open the dead path in a new tab (the stub handler gained this in the 8/14 QA pass; it had been click-only). The 404 remains as the catch-all with its full screen index.

`site/assets/ds/` is the design system ported verbatim (tokens + `components.css`) plus two files that are ours: `fonts.css`, which self-hosts and replaces the CDN link, and `icons.css`, a subset of the 4.6MB `icon-data.js` rendered as SVG data-URI masks and regenerated by `qa/genIcon.js`. `site/assets/app.css` is the prototype layer and is `.sbp-` prefixed so it can never be confused with a ported `.sb-` style. `site/assets/app.js` carries motion arming, reveals, the sticky-header ground swap, the mobile sheet, stub toasts and the `sb.demo.v1` session.

## Skins

The Sandro Business tokens in `site/assets/ds/` are the **unscoped default** and are
never edited by a re-skin. `site/assets/skins.css` defines `html[data-skin="wealth"]`
— the Sandro Wealth parent palette (CEO decision, 2026-08-13): monochrome actions
(titanium on light, ivory on dark), brass editorial accents sourced from the authored
Framer tokens on sandrowealth.com/business-owner, and a warm ivory sunrise. All three
page shells currently set the attribute; **removing it returns the site to aqua with
current content** — that switch, not a snapshot, is the preservation mechanism. Tag
`skin/sandro-business-aqua` bookmarks the last pre-decision build.

Rules that travel with the skin: `skins.css` carries its own `?v=` — bump it like
app.css; brass-600 `#9C6F2F` is **non-text only** on light fields (4.39:1) — brass
text on light is `#876B3D`; the dawn/bloom glows are re-authored, not retinted, and
the dark ray-silhouette over the bloom's bright core is the composition's own
behaviour in both skins.

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

Two Render services, Blueprint-managed from `render.yaml`: `sandro-business-prototype` (publishes `site/`, the v1 prototype) and `bvaa-prototype` (publishes `site-v2/`, the BVAA homepage). Push to `main` and existing services deploy. **A service newly added to `render.yaml` does NOT exist until its pending Blueprint sync is approved in the dashboard** (Blueprint → Syncs) — diagnose with the curl below, not by hunting for buttons. Full mechanics, and the traps, are in the comments at the top of `render.yaml`.

Verify headers after any header change, because local preview sends none:

```bash
curl -sSI https://sandro-business-prototype.onrender.com/ | grep -iE "x-frame|x-robots|content-security"
```

## Traps

Every one of these has already cost time somewhere in this engagement.

- **Render's edge can negative-cache a path, and a rebuild will not clear it.** Seen on the very first deploy: `/assets/fonts/libre-baskerville.woff2` returned 404 with `x-render-routing: no-server` while the same path with `?v=1` returned 200, proving the file was published and only the cached path was poisoned. CDN invalidation only covers *changed* files, so the fix is to change the URL, not to redeploy. Font URLs carry `?v=` for exactly this reason — bump it on any font swap. When something 404s that you know you shipped, retry with a query string before you go looking for a build problem.
- **Google Fonts fails silently on the build machine.** `design-system/tokens/fonts.css` and the marketing-site reference load Libre Baskerville and DM Sans from the CDN, which is unreachable and fails without an error. You will build the whole thing looking at Georgia and Arial and not notice. Self-host `.woff2` for anything in `site/`.
- **Aquamarine carries the actions, not khaki** *(describes the default Sandro Business system; under the currently-active `data-skin="wealth"` no aqua paints at all — see Skins)*. `--action-primary` resolves to khaki in the tokens, but the marketing site never uses it that way: the header CTA, hero CTA and light-section CTAs are all aqua, bright on dark fields and deeper on light ones. Khaki is editorial trim. Restraint comes from field discipline (most sections quiet, carrying one aqua element), not from rationing the colour.
- **Motion must fail open.** Resting states are the unconditional CSS default; hidden from-states live under `html[data-sb-motion="1"]`, set only after two consecutive `requestAnimationFrame` callbacks land. Never gate legibility on an animation running.
- **No inline styles on anything a breakpoint changes.** An inline style beats a media query. This broke the photographic band three times.
- **Never `#FFFFFF` as a page background.** Off-White is `#FFFEF6`.
- **Two different sunbursts exist** (hero fan: 23 rays; logo symbol: 15). They look interchangeable at small sizes and are not.
- **An SVG data-URI mask must have its double quotes percent-encoded.** Leave them raw and the CSS string closes early, the mask never resolves, and the element paints as a solid box — indistinguishable from a design decision. Cost a cycle on the icon subset. The generator is checked in at `qa/genIcon.js`; prove any change to it by regenerating a glyph already in `icons.css` and diffing byte for byte.
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
