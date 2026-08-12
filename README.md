# Sandro Business

The advisory community platform for business owners, plus the Sandro Business design system it is built on.

Sandro Business is the unit spinning off from Sandro Wealth Management. This repo holds its design system, the design reference screens, and the clickable prototype of the community platform.

## Layout

| Path | What | Published? |
|---|---|---|
| `site/` | The prototype. Everything here is served at the public URL. | **Yes** |
| `design-system/` | Tokens, 22 components with `.d.ts` contracts, logo lockups, sunburst, photography, `SKILL.md`. Read `design-system/readme.md` in full before writing UI. | No |
| `marketing-site/` | Four design-reference screens (Home, The Journey, Tracks, Assessment). Browser-transpiled prototypes showing intended look, not production code. | No |
| `reference/_notes/` | Extracted text of the two client source documents. All site copy derives from these. | No |
| `CLAUDE.md` | Design-system project context. Auto-loads when working in this repo. | No |

Only `site/` is in the publish path. That is deliberate: the design system is 14MB including a 4.6MB inlined icon set, and the reference notes are internal.

## Local preview

Serve from inside the folder you are working on, not the repo root:

```bash
python3 -m http.server 4324 --directory site
```

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

- **Google Fonts fails silently on the build machine.** `design-system/tokens/fonts.css` and the marketing-site reference load Libre Baskerville and DM Sans from the CDN, which is unreachable and fails without an error. You will build the whole thing looking at Georgia and Arial and not notice. Self-host `.woff2` for anything in `site/`.
- **Aquamarine carries the actions, not khaki.** `--action-primary` resolves to khaki in the tokens, but the marketing site never uses it that way: the header CTA, hero CTA and light-section CTAs are all aqua, bright on dark fields and deeper on light ones. Khaki is editorial trim. Restraint comes from field discipline (most sections quiet, carrying one aqua element), not from rationing the colour.
- **Motion must fail open.** Resting states are the unconditional CSS default; hidden from-states live under `html[data-sb-motion="1"]`, set only after two consecutive `requestAnimationFrame` callbacks land. Never gate legibility on an animation running.
- **No inline styles on anything a breakpoint changes.** An inline style beats a media query. This broke the photographic band three times.
- **Never `#FFFFFF` as a page background.** Off-White is `#FFFEF6`.
- **Two different sunbursts exist** (hero fan: 23 rays; logo symbol: 15). They look interchangeable at small sizes and are not.
- **Compliance.** Sandro Wealth Management is an SEC-registered investment adviser. No performance promises, no specific investment advice, no superlatives, no testimonials. **Never write disclosure or citation copy and never leave a bracketed placeholder for it** — omit the line and flag that Sandro's approved language is required.

## Known gaps in the design system

Carried from the original handoff, unresolved:

- **Photography** is 439×597 crops from the brand-book PDF. Real photography is needed at 2560px, 3840px for full-bleed. Treat every photographic band as a placeholder.
- **Wordmark.** The parent lockup's letterfit is tighter than Libre Baskerville produces, so "SandroBusiness" as composed in `Logo.jsx` is an approximation.
- **Icons.** `design-system/components/icons/icon-data.js` is 4.6MB of inlined paths (1,173 icons). Subset before anything ships.
- **Fixed on import:** `marketing-site/index.html` shipped referencing `../../styles.css` and `../../_ds_bundle.js`, which resolved above the handoff root. Repointed to `../design-system/`.

## Related

Workstream context, requirements spec and decisions live in the SIV workspace at `clients/sandro-wealth-management/technical/sandro-business-community/CLAUDE.md`.
