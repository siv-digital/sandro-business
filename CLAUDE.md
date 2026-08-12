# Sandro Business — project context

This repo contains the **Sandro Business design system** and a **marketing-site design reference**.
Read `design-system/readme.md` in full before writing any UI. It is the source of truth for
colour, type, spacing, motion, interaction states, accessibility and copy voice, and it records
several traps that have already cost cycles here.

## Layout

| Path | What it is |
|---|---|
| `design-system/readme.md` | The complete system documentation. Read first. |
| `design-system/SKILL.md` | Front-matter skill definition — usable as a Claude Code skill (see below). |
| `design-system/styles.css` | Single CSS entry point. `@import` list only. |
| `design-system/tokens/` | All tokens: fonts, colours, typography, spacing, elevation, motion, semantic, base, responsive, plus the Figma-generated variable collections. |
| `design-system/components/` | 22 hand-authored React components (`core`, `brand`, `layout`, `navigation`, `forms`, `icons`). Each has a `.jsx`, a `.d.ts` prop contract, and a `.prompt.md` usage note. |
| `design-system/assets/` | Logo lockups (SVG + PNG), the sunburst illustration (vector), photography. |
| `design-system/_ds_bundle.js` | Prebuilt bundle exposing every component on `window.SandroBusinessDesignSystem_06f5c8`. Used only by the HTML references. |
| `marketing-site/` | The design reference: `index.html` shell + `Home.jsx`, `Journey.jsx`, `Tracks.jsx`, `Assessment.jsx`, `photos.js`. Open `marketing-site/index.html` in a browser to see the intended design. |
| `reference/_notes/` | Extracted text of the two client source documents (Business Owner Journey playbook v2, business owner personas). All site copy derives from these. |

## What these files are

**Design references, not production code.** The `.jsx` files are browser-transpiled prototypes
(Babel standalone, no build step, no imports — components are read off a global namespace).
They exist to show intended look, structure, copy and behaviour precisely.

Your job is to **rebuild these designs in a real environment** using its established patterns —
Next.js/Vite + React, Astro, whatever the target is. Port the design, not the plumbing:

- `tokens/*.css` port over **verbatim**. They are the authoritative values; do not re-derive or
  "tidy" them, and do not introduce colours that are not in them.
- `components/**/*.d.ts` are the prop contracts to preserve. Keep the names and the variants.
- `components/**/*.jsx` are reference implementations. Reimplement idiomatically for the target
  (proper module imports, typed props, no `window` namespace lookups, no lazy `__ds()` forwarder —
  that pattern exists only to survive the prototype's script-load race).
- `components/components.css` holds the real component CSS. Most of it ports directly; keep the
  class names (`.sb-*`) unless the target uses a different styling system, in which case translate
  rule-for-rule and keep the token references.

## Fidelity

**High fidelity.** Colours, type, spacing, radii, shadows, motion timings and interaction states
are final and measured. Rebuild pixel-accurately. Where a value looks arbitrary it usually isn't —
5px button radius, `--horizon-band: 38%`, `-0.04em` sub tracking and the `1ms` reduced-motion
collapse are all deliberate and documented in `readme.md`.

## Non-negotiables

1. **Motion must fail open.** Resting states are the unconditional CSS default; hidden from-states
   live under `html[data-sb-motion="1"]`, which is only set after two consecutive
   `requestAnimationFrame` callbacks actually land. Never gate legibility on an animation running.
   See "Accessibility notes" in `readme.md`.
2. **No inline styles on anything a breakpoint changes.** An inline style beats a media query. This
   broke the photographic band three times.
3. **Never `#FFFFFF` as a page background.** Off-White is `#FFFEF6`.
4. **Aqua `#0BA0BD` is the accent, ~6% of pixels.** Khaki under 3%. Asset-class colours are for
   data visualisation only, never UI.
5. **Compliance.** Sandro Wealth Management™ is an SEC-registered investment adviser. No performance
   promises, no specific investment advice, no superlatives, no testimonials, no invented client
   stories, no "risk-free" framing. Do not write disclosure or citation copy and do not leave
   bracketed placeholders for it — omit the line and flag that Sandro's approved language is
   required before launch.
6. **Two different sunbursts exist** (hero fan: 23 rays; logo symbol: 15 rays). They look
   interchangeable at small sizes and are not. See `readme.md`.

## Known gaps to resolve before launch

- **Photography.** `marketing-site/photos.js` holds 439×597 crops from the client's brand-book PDF.
  Real photography is needed at 2560px wide, 3840px for full-bleed. Treat every photographic band
  as a placeholder.
- **Wordmark.** The parent lockup's letterfit is tighter than Libre Baskerville produces, so
  "SandroBusiness" as composed in `Logo.jsx` is an approximation. Confirm the typeface or have it drawn.
- **Icons.** `components/icons/icon-data.js` is 4.6 MB of inlined glyph paths (1,173 icons). Subset
  to the icons actually used before shipping.
- **Fonts.** Libre Baskerville and DM Sans load from the Google Fonts CDN. Self-host `.woff2` files
  for production, print, email or offline use.
- **Disclosures.** None are rendered anywhere, by design.

## Using this as a Claude Code skill

`design-system/SKILL.md` is already a valid skill definition. To make the brand available in every
session of a project, copy the `design-system/` folder to `.claude/skills/sandro-business-design/`
(so `SKILL.md` sits at that folder's root) — Claude Code will then load the brand rules on demand
rather than needing them pasted in.
