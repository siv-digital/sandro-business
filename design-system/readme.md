# Sandro Business — Design System

A design system for Sandro Business, the unit spinning off from Sandro Wealth
Management™ (an SEC-registered RIA). Sandro Business runs the Business Owner
Journey, a five-phase engagement that carries a mid-market business owner from a
first conversation, through the sale of the company, and into post-close wealth
integration.

v2 of this system replaced almost every colour decision in v1. v1 was built from
a flattened brand-book PDF, so it leaned on Titanium and Ivory with a cyan accent
I invented, and it read as Sandro Wealth with a stripe. The Sandro Prism Figma
file shows the real palette is much wider. That file is now the source of truth.

Aqua `#0BA0BD` is the accent. It is the terminal stop of the SandroWealth
brand-book gradient (Titanium to cyan), so it is sanctioned Sandro colour rather
than a new hue, and its light tints `100–300` are the Figma `--blue-01…03` ramp
verbatim. Sage (`--greenalt-01…03`) bridges aqua to the warm side. Khaki
(`--brand-00…07`) carries the prestige: `#8E8565` is the file's real primary
button, 5px radius, 46px tall, with a hover that inverts to white with a titanium
keyline. There is also a full asset-class palette (ember, azure, plum, mauve,
gold) for data.

The invented Brass ramp from v1 is gone. A violet-led pass was tried and
reverted, because `#A581FD` reads off-palette for this audience. Violet survives
only where the file itself uses it, as the `real assets · public` asset-class
colour.

The team asked for two other things.

Motion is a real layer now rather than a footnote: a live travelling gradient,
clip-path wipes on display type, drawing rules, a drifting and breathing
sunburst, staggered reveals. See Motion below.

The sunburst contrast defect is fixed structurally, and the hero was rebuilt
around it. The mark is a rising sun, so it is used as one. The `horizon` variant
puts the rays in an overflow-clipped, top-fading band along the bottom of the
frame, with an aqua hairline drawing across it and a breathing glow lifting off
the bottom edge. Display type sits in the clean air above. Contrast is solved by
geometry instead of by a scrim. The `field` and `halo` variants still ship their
own scrims, and `Sunburst` only renders content through `children`, so there is
no API path to putting text on bare rays.

One thing that had to be fixed before any of that worked: the illustration
shipped with an opaque titanium background, which is why every early attempt to
use it as an overlay read as a dark rectangle. `sunburst-rays.svg` is the client's own
vector export of that fan, with no ground behind it. Every overlay uses it. The original panel is kept for framed, picture-like use.

A ray-echo field texture was tried as a sixth permutation and removed: the
sunburst swept across light sections at whisper level as a tinted texture. It
never sat in the page — as a graphic laid over a flat field it read as pasted
on rather than as light, and no amount of falloff, floor-glow or edge-hemming
fixed that. **Do not reintroduce it.** If a light section needs relief, change
its tone or give it a photograph; the sunburst earns its place as a subject,
not as wallpaper.

Worth keeping from that dead end, because it constrains anything similar:
**a raster `mask-image` is the one masking technique that does not render
across the surfaces this system ships into.** Gradient masks, SVG data-URI
masks and `clip-path` all render correctly; a PNG mask resolves, fetches 200
and then silently paints the unmasked box. Where ivory ink has to read as
another colour, use vector paths with `currentColor` (see `--bloom-ray-color`) —
or, for a raster, a `filter` on the image.

---

## Sources given to me

| Source | What it is |
|---|---|
| **`Sandro Prism x Syrens.fig`** (mounted) | **The authoritative source.** 22 pages, 84,355 nodes. Supplied: the real Figma Variable collections (67 variables), the named type styles, the real component families, the 1,173-glyph icon library, the asset-class palette, and the vector logo lockup. Pages read: `/Design-system` (Colors, Components, Elements, Icon-Library, Text), `/Sandro-Prism` (client logo vector), `/Color-schemes`, plus `/METADATA.md` and `/README.md`. |
| `uploads/sandro-business-owner-journey-playbook-v2.pdf` | **The Business Owner Journey** playbook, 9 pages — the five phases, the three tracks, who is at the table per phase, what each phase produces. Extracted text kept at `_notes/sandro-business-owner-journey-playbook-v2.txt`. |
| `uploads/business-owner-personas.pdf` | **The three business owner personas** — The Committed Seller (Ready to Sell), The Value Builder (Build Value First), and Still Exploring, with assessment score bands and HubSpot handling. Extracted text kept at `_notes/business-owner-personas.txt`. |
| `uploads/Sandro Prism x Syrens/` (23 PNG renders) | SandroWealth Brand Guidelines 2024 v2.0 by Syrens. Useful for tone, imagery direction and logo usage rules. Some pages still carry the template's placeholder copy (a "Laurent" cosmetics brand) — not treated as Sandro content. |
| `uploads/Identity Elements.png`, `Frame 48096634/47/48.png` | Identity summary and logo lockups. `Frame 48096647.png` (transparent ivory master) is the source of the raster logo assets. |
| Reference sites named by the client | `https://www.rockco.com/` (Rockefeller Capital Management) and `https://www.northerntrust.com/united-states/home`. Read for register and **content rhythm**, not for visual copying. What they share and what this system took: a full-bleed hero band carrying a small kicker, one large statement, one supporting line and one primary action; then an **asymmetric run of editorial bands** (headline + paragraph + link, no card grid); then a three-up image row; restrained accent colour and a lot of air. Northern Trust in particular pairs deep neutral ground with a single cool accent — the reason aqua rather than violet. |
| `sandro-wealth-brand` skill | The existing parent-brand skill. Authoritative for inherited rules; **superseded by the .fig on any conflict.** |

No Sandro Business product codebase or product Figma page was provided. The
`.fig` supplied the design system and the UI kits compose it. Layout in the kits
is mine. Tokens, components, icons and type are the file's.

---

## Who Sandro Business serves

Not advisory practices. Mid-market business owners approaching exit. From the
playbook: up to 80% of a mid-market owner's net worth sits inside the operating
business, as one illiquid, undiversified asset. Sandro Business is a single
engagement that carries the whole lifecycle.

The five phases:

| Phase | | Who is at the table | Produces |
|---|---|---|---|
| I | Discovery & diagnostics — *know where you stand* | Owner · Sandro Senior Partner · senior business strategist | Complimentary baseline valuation, ending with a track |
| II | Value & wealth assessment — *see the full picture* | + financial planner · value growth advisor | Personal financial plan |
| III | Pre-sale planning — *put your plans in place* | + estate & tax counsel · attorneys | Estate, tax and wealth plan |
| IV | Sale & transition — *sell the business* | + M&A advisor · attorneys | M&A execution |
| V | Wealth integration — *manage the wealth* | + the full Sandro team | Sandro's core expertise |

The three tracks. A track is where an owner starts, not a category they are filed
under, and tracks move:

| Track | Timeline | Enters at | Score band | Persona |
|---|---|---|---|---|
| Still exploring | No timeline yet | Phase I | Hasn't taken the assessment | — |
| Build value first | 3–5 years out | Phase II | 0 to 7 | The Value Builder |
| Ready to sell | 12–18 months, or in a deal | Phase III | 8 to 10 | The Committed Seller |

---

## Content fundamentals

The register is institutional and assured. Fiduciary, restrained, quiet. Sandro
is a partner and a quarterback, never a vendor.

Sentences are short and declarative, with few adjectives and two clauses at most.
The playbook's own voice is the model. It earns its weight by being plain.

On brand:

- "From the business you built to the wealth it becomes."
- "A track is where you start, not a category you are filed under."
- "The sale is the middle of the process, not the end of it."
- "The gap is a number, so the work has a finish line."

Off brand:

- "Unlock your business's hidden value!" Hype, exclamation, implied outcome.
- "Maximize your exit multiple." Implies a performance promise.

Write to the owner in second person, and be unsentimental about it: "Most of your
net worth sits inside one illiquid asset." First-person plural is only for what
Sandro does, never for the owner's money.

Naming the fear plainly is on brand. The personas document does it directly:
"what their life looks like the day after the wire hits," "value enhancement that
never ends." Copy may name the fear. It may not promise it away.

Sentence case in body and headings. `UPPERCASE` is for kickers and small
structural labels only, always at `--tracking-kicker` (0.16em). Never all-caps a
headline. Phase numbers are Roman numerals (I to V) set in Libre Baskerville.

No emoji. No exclamation points. Oxford comma. Em dashes sparingly.

Kicker, then headline, then sub is the signature copy unit:

```
THE PHASED APPROACH              ← kicker, DM Sans, uppercase, 0.16em
Five phases. One team. One plan. ← headline, Libre Baskerville
You spent decades turning an idea into an enterprise; the exit is the only
transaction of its size you will ever run.
                                 ← sub, DM Sans 18/1.45, -0.04em, 60% opacity
```

Compliance. Don't generate performance promises or guarantees, specific
investment advice, superlatives ("best", "#1"), testimonials, invented client
stories, or "risk-free" and "safe" framing.

Don't write disclosure or citation copy either, and don't leave bracketed
placeholders standing in for it, because those read as unfinished work in a
review. Omit the line and tell the user that Sandro's approved disclosure and
source citations have to be added before anything ships. The 80% net-worth figure
is unverified in the playbook. Treat every figure in this system as illustrative.

---

## Visual foundations

### Colour

Every hex below is read from the `.fig`. Nothing is invented.

The anchors are inherited and unchanged: Titanium `#232B36`, Black `#030303`,
Ivory `#FFFCEC`, Off-White `#FFFEF6`. Page backgrounds are never pure `#FFFFFF`.

Aqua is the accent. `--sb-aqua-100…900`, centred on `#0BA0BD`, the terminal stop
of the brand-book's Titanium-to-cyan gradient; `100–300` are Figma
`--blue-01…03` verbatim. It does the active states, focus rings, phase numerals,
switches, chart strokes, the hero horizon and the CTA fill.

Sage is the bridge. `--sb-sage-100…300` from Figma `--greenalt-01…03`, plus
`#678857` for semantic positive. It is what stops aqua and khaki from arguing.
Use it in the keyline gradient and in soft positive surfaces.

Khaki is the warm side. `--sb-khaki-000…700` from Figma `--brand-00…07`, plus
`--sb-sand-400` (`#E0D0A7`, Figma `--sand-04`). `#8E8565` is the real primary
button. Khaki carries the "prestigious" half of the brief and aqua carries
"uplifting."

Ember (`#F78934`, `#A04515`) and Azure (`#1781BF`) come from the asset-class
equity pair. They are for data, track markers, and the one place the palette
raises its voice.

The asset-class palette (`--sb-ac-*`) is public equity `#F78934`, private equity
`#1781BF`, core fixed income `#4A331E`, opportunistic `#9C6F2F`, private credit
`#C49A5A`, real assets public `#4F3B78`, private `#AE86A4`, khaki `#8E8565`. Use
it for data visualisation only, never as UI colour.

Semantic colours are positive `#678857`, moderate `#DBB257`, negative `#A04515`.

On volume: one dark field or one light field as a screen's base. Aqua on roughly
6% of pixels, which is enough to register as the accent and not enough to make a
teal website. Khaki below 3%. Sage only in gradients and soft positive fills.
Asset-class colours stay in charts and track markers. If aqua and khaki appear in
the same viewport they have to be doing different jobs, aqua on the interactive
thing and khaki on the warm editorial thing.

### Type

Libre Baskerville and DM Sans, with the file's named styles reproduced verbatim
as tokens. This is the part v1 guessed at and got wrong.

| Token | Style |
|---|---|
| `--type-h1` | Libre Baskerville Regular 48 / 100% / 0% |
| `--type-h2` | Libre Baskerville **Bold** 24 / 100% |
| `--type-h3` | Libre Baskerville Regular 20 / 100% |
| `--type-h4` | Libre Baskerville **Bold** 16 / 100% |
| `--type-body-headline` | DM Sans SemiBold 16 |
| `--type-p1` / `--type-p2` | DM Sans Regular / Medium 16 |
| `--type-p3` | DM Sans Regular 14 |
| `--type-nav` | DM Sans Regular 14 |
| `--type-cta` | DM Sans Regular 16 / **-1%** tracking |
| `--type-link` | DM Sans Medium 16 |
| `--type-small` | DM Sans Regular 12 |

The file sets display line-height at 100% and tracking at 0%, much tighter than a
typical scale. `--type-hero`, `--type-display` and `--type-quote` extend the same
families upward for editorial sizes, with `-0.02em` tracking above 48px.
Baskerville Italic is the editorial voice: pull quotes and the opening statement
of a section, never inline emphasis. Never set body copy in Baskerville below
20px.

### Spacing & layout

Named steps mirror the Figma Variable collection: `none 0 · sm 6 · md 8 · lg 12 ·
xl 16 · 2xl 24 · 3xl 32`. Content maxes at `1240px`; the file's own content block
is `1495px` (`--container-wide`); prose at `760px`. Sections are `112px` tall,
`90px` for tighter bands (the file's CTA-block padding). 12 columns, `24px`
gutters (`40px` wide).

The brand book's page composition recurs throughout and is the system's signature
layout: a narrow left label column, one full-height hairline, a wide content
column. That is `EditorialColumns`.

### Backgrounds

Five legitimate treatments, and no others:

1. Flat Off-White `#FFFEF6`, the default.
2. Flat Titanium `#232B36`, for inverse sections and footers.
3. `--sb-gradient-base`: `#030303` to `#232B36` at 90°. The file's own CTA-block
   gradient, reproduced exactly.
4. `--sb-gradient-dawn`, `--sb-gradient-signature` and `--sb-gradient-rail`: ink
   through titanium into aqua. `dawn` at 168° is the hero ground, since the sun
   is at the bottom of the frame and so is the light. `rail` is its vertical form
   for the console sidebar.
5. The live gradient. `.sb-live-gradient`, `--sb-gradient-live` at 280%
   background-size, travelling over 22s. One per page.

No noise or grain overlays, no repeating patterns, no gradient-mesh blobs, no
photography as decorative wash.

### Imagery

Per the brand book, photography runs a spectrum from relatable to inspirational.
Avatars are relatable, human, warm and mature. Still life is clear and concise.
Lifestyle is aspirational and collaborative, where "the subject is part of
something bigger."

The colour vibe is cool, natural daylight, desaturated. Owner-and-advisor working
sessions, urban architecture. Not warm-graded, not black-and-white, no grain.
Images sit in `--radius-0` or `--radius-md` rectangles. Type over photography
always gets a scrim (`--scrim-bottom`, `--scrim-left` or `--scrim-solid`), never
a blur panel.

### Motion

This is where Business differs most from Wealth.

| Principle | Detail |
|---|---|
| **Everything decelerates** | `--ease-out-expo` `cubic-bezier(.16,1,.3,1)` is the house curve; `--ease-out-quart` for small state changes; `--ease-in-out` for ambient loops. |
| **No bounce, no overshoot, no spring** | Prestige does not wobble. |
| **The live gradient** | `sb-gradient-shift`, 22s, `--ease-in-out`, on a 280% background. One surface per page. |
| **Display type wipes** | `sb-wipe-up` — a `clip-path` reveal from the baseline plus a 14px rise, 1200ms. Reads as typographic, not as UI animation. `<Reveal mode="wipe">`. |
| **Content rises** | 20px translate + fade over 760ms, staggered 70ms between siblings, once on scroll into view. `<Reveal index={i}>`. |
| **Rules draw** | `scaleX(0→1)` from the left. Used on section keylines, the card hover keyline, the nav underline, the phase spine, the assessment progress bar. |
| **Rays open** | `sb-ray-open`, `scaleY(.18→1)` staggered `--stagger-ray` (26ms). |
| **Horizon geometry is one token** | `--horizon-band` (38%) sizes the ray band, positions the horizon hairline, and pins `.sb-hero-copy`'s bottom edge (`bottom: calc(var(--horizon-band) + var(--horizon-clearance))`). Change it in one place. Note it is pinned with `bottom`, not `padding-bottom` — a percentage in `padding-bottom` resolves against **width**, which silently let the CTAs drift onto the hairline. |
| **The sunrise opens** | `sb-ray-open` on the horizon band, `scaleY(.18→1)` over 1900ms — the rays fan out once, on load. The horizon hairline draws across behind it at 420ms. |
| **Ambient drift + breathe** | `sb-drift` (transform only) on the rays and `sb-breathe` (opacity) on the horizon glow, 16–18s. The hero only. Nothing else loops. |
| **Keyframes never animate a property a prop declares** | `sb-ray-open` animates transform only, and `sb-breathe` is confined to the glow. An animated property outranks an inline style, so a keyframe touching `opacity` silently voids any `opacity` prop — and because the motion gate is off in print, screen and print then disagree. If a new entrance needs to fade, gate the fade on a class the component does not also style. |
| **The sunrise parallax** | `sb-sun-rise` on `.sb-sun-lift` — the hero's horizon band sits 120px low at `.55` opacity and rises to rest over the first `--sun-lift-range` (58vh) of scroll — a ~0.2x scroll ratio, which is the threshold where travel reads as depth rather than as nothing. The **only** scroll-linked effect in the system. It uses a native CSS `scroll()` timeline, so it is frame-perfect, interruptible, and reverses on scroll-up — there is not a single scroll listener anywhere. Wrapped in `@supports (animation-timeline:scroll())` and gated on `data-sb-motion`, so older browsers, reduced-motion users and print/PPTX capture all get the finished state. Don't add a second one without a reason. |
| **CTA icon nudge** | The trailing icon in any button translates 3px on hover. The smallest and most-repeated motion tell in the system. |
| **Sheen** | `sb-sheen` for loading states and the gradient button's hover. |
| Timings | hover `160ms` · state `240ms` · transition `420ms` · reveal `760ms` · wipe `1200ms`. |

`prefers-reduced-motion` collapses every duration to 1ms — wired into `tokens/motion.css`.

### Interaction states

| State | Treatment |
|---|---|
| **Hover, primary button** | Inverts: khaki fill → white fill, `inset 0 0 0 1px #232B36`, label weight 400 → 700. Read verbatim from the file's `State=Hover, Type=Primary`. |
| **Hover, accent (aqua) button** | Fill darkens `#0BA0BD → #0B6C84` and the ink flips from near-black to off-white, so contrast rises rather than falls (5.28:1 → 5.96:1). Gains `--shadow-aqua-glow`. Aqua gets deeper on hover, never brighter. |
| **Hover, gradient button** | Gains the violet glow; the gradient keeps travelling. |
| **Hover, ghost/quiet** | 5% titanium wash. Never an outline appearing on hover. |
| **Hover, link** | Colour deepens and the underline **disappears** (present at rest). Inverse of the web default, and the brand's tell. |
| **Hover, card** | Hairline goes violet-300, `translateY(-3px)`, `--shadow-xs → --shadow-md`, and a violet→azure→sand keyline wipes across the top edge. |
| **Hover, image** | `scale(1.04)` inside `overflow:hidden`, 420ms. |
| **Press** | `scale(.985)` plus the press colour. Never a shadow change. |
| **Focus** | 2px aqua outline at 2px offset, or `--shadow-focus` (3px, 34% aqua) on fields. Never removed. |
| **Disabled** | `opacity:.42`, `cursor:not-allowed`. The shape stays; the ink recedes. |
| **Loading** | `sb-sheen` sweep. No spinners in marketing surfaces. |

### Accessibility notes

Entrance states are visible by default. Motion is armed, never assumed.

This one is worth recording, because getting it wrong shipped a blank page twice.
A hidden from-state undone by a transition or a `both`-filled animation only
resolves if frames advance, and there are plenty of real contexts where they
don't: print and PDF pagination, PPTX and screenshot capture, background tabs
(where `visibilityState:'hidden'` throttles `requestAnimationFrame` to zero),
embedded webviews. A system whose templates exist to be exported cannot gate
legibility on an animation running.

So the finished state is the plain, unconditional CSS default. Every hidden
from-state is scoped under `html[data-sb-motion="1"]`, and
`components/layout/Reveal.jsx` sets that flag at bundle-eval time only after two
consecutive `requestAnimationFrame` callbacks have actually been delivered, which
proves frames are advancing, and only when reduced motion is not requested. No
frames means never armed, which means the design renders finished and
unanimated. Nothing can be invisible because motion failed.

`Reveal` also fails open on the trigger side. It reveals synchronously when the
element is already in view on mount, when `IntersectionObserver` is missing, and
when an observer exists but has not reported within 400ms.

When you add an entrance treatment, put the resting state unscoped and the
from-state under `html[data-sb-motion="1"]`. The wipe path carries
`.sb-wipe-inner`, not `.sb-reveal`.

The reveal observer's root is the nearest scrollable ancestor, not the viewport.
Anywhere this system is mounted inside a host that scrolls its own container (a
template preview, a canvas frame, an embedded panel) a viewport-rooted observer
reports "not intersecting" forever, and because it did report, it also suppresses
the dead-observer fallback. Content then stays hidden with no error. The 400ms
fallback re-measures rather than trusting that report.

### Responsive

Three breakpoints, and the layer is deliberately thin: almost everything that
changes with viewport is a token override in `tokens/responsive.css` rather than a
per-component rule. Change the gutters, the section rhythm, the header height
and the display ramp, and every component and both UI kits re-flow at once.

| Width | What changes |
| --- | --- |
| **≤ 1080** | Container goes fluid; display ramp steps down one notch. Layout is otherwise the desktop layout. |
| **≤ 820** | Editorial columns stack; the nav collapses into a sheet under the header; the console rail becomes a horizontal top bar; touch targets go to 48px. |
| **≤ 560** | One column throughout; the hero copy goes ragged-right (centred display type is hard to read in a narrow column); the hero facts strip leaves the hero and becomes a band beneath it; dense console tables scroll sideways inside their card. |

Four rules worth keeping.

Body copy never shrinks. 16px at every width. Display sizes are what break a
phone layout, and anything under 16px in an input triggers iOS zoom-on-focus.

Grids declare intent, not a column count. Use `.sb-cols` with
`data-cols="2|3|4"` or `data-split="a|b"` rather than an inline
`grid-template-columns`. An inline template cannot be overridden by a media
query, which is the most common reason a screen here would fail to adapt. For the
same reason, every track is `minmax(0,…)`: a bare `1fr` won't shrink below its
content's min-content width, so one long word pushes a grid wider than the
viewport.

Buttons in a row never get a fixed px width. Two 188px buttons plus a gap is
388px, which overflows a 375px phone. Use `.sb-btn-row`.

A dense table scrolls sideways; it doesn't restack. A seven-column pipeline table
exists for comparison, and a stack of label/value pairs destroys that.

### Portability rules

Two rules keep a screen working once it is lifted out of this project, whether
that is a published artifact, a template mounted through `<x-import>`, or a file
copied into a consuming repo.

Artwork travels with the code. `Mark.jsx` and `sunburst-data.js` inline the brand
illustrations as data URIs, so `Logo` and `Sunburst` need no sibling `assets/`
directory. A relative default silently 404s, and the component then falls back to
something wrong-looking instead of erroring, which is much harder to notice.

Screens resolve design-system components lazily. Every `ui_kits/**` screen opens
with a `__ds()` forwarder rather than a top-level
`const {Button} = window.<Namespace>` destructure. A template's `<x-import>` fetch
races the bundle `<script>`, so destructuring at module-eval time captures
`undefined` where resolving inside the render does not.

The accent CTA is the one control worth measuring. Aqua `#0BA0BD` with near-black
`--sb-aqua-950` (`#03222B`) ink measures 5.35:1, over the 4.5:1 floor for 14 to
16px text. On hover the fill darkens to `#0B6C84` and the ink flips to off-white,
taking it to 5.96:1, so contrast rises on interaction rather than falling. Don't
use off-white ink on `aqua-500` (4.4:1, fails) or `aqua-950` ink on `aqua-600`
(3.7:1, fails).

Body copy on dark uses the file's own `rgba(255,254,246,.6)`, which is fine at
18px and above. Below that, step up to `.82` (`--text-body`).

Focus is never removed: a 2px aqua outline at 2px offset, or `--shadow-focus`
(3px, 34% aqua) on fields.

### Borders, radii, shadows, cards

Hairlines carry the system: 1px at `rgba(35,43,54,.12)` on light,
`rgba(255,254,246,.16)` on dark. On dark, the file's own secondary-button keyline
is `rgba(255,254,246,.5)`, which is `--border-inverse`.

Figma gives radii of `none 0 · sm 4 · md 10`. Buttons and fields are 5px in the
file (`--radius-button`), which is not on the token scale. The file wins, so 5px
is recorded as its own token rather than snapped to 4. Images and full-bleed
panels are 0. Pills are for tags and avatars only.

Shadows are cool-tinted and shallow, `rgba(20,21,23,…)` rather than black.
Hairline first, shadow second. `--shadow-lg` is for modals. `--shadow-aqua-glow`
and `--shadow-warm-glow` are the expressive layer, reserved for a hero CTA.

A card is white on Off-White with a 1px hairline, 10px radius and `--shadow-xs`
at rest, going to `--shadow-md` with a 3px lift and a keyline wipe on hover. On
dark, cards are titanium-700 with an ivory hairline and no shadow.

### Transparency & blur

Two places only: sticky chrome (`--glass-light` / `--glass-dark` with
`--blur-chrome`) and soft accent surfaces on dark. Never a frosted panel over
photography, which is what scrims are for, and never blur as decoration.

### Fixed / sticky elements

The header is 76px and sticky: transparent over a dark hero, glass over light
content. The console kit uses a fixed 264px rail on the vertical signature
gradient, with a 2px aqua marker on the active item.

---

## Sticky chrome over unknown ground

Any sticky, translucent header is tuned to the field it *starts* over. Two
scrolls later an arbitrary section is passing underneath, and `--glass-dark` at
72% over a white section composites to light grey — ivory logo and links vanish.
`Header` therefore commits to a near-opaque ground (`--glass-dark-scrolled`)
as soon as the page moves.

Second trap, same component: **sticky only holds within its containing block.**
Mounted inside a wrapper one viewport tall while the document scrolls, the header
detaches after the first screen — which looked identical to the contrast bug,
because it vanished exactly where the white sections start. The template host does
this, so `templates/website/Website.dc.html` pins the header and gives the inner
pages `padding-top:var(--header-h)`. Standalone pages keep the sticky behaviour. Apply the same reasoning to anything else pinned:
measure the composite over the LIGHTEST and DARKEST sections it can travel over,
not just the one behind it at rest.

## Known issue — photography resolution

The three images in `ui_kits/website/photos.js` are **439x597 reference crops
lifted from the client's brand-book PDF, not production photography.** The
full-bleed statement band stretches one of them across the viewport, which is
roughly a 9x horizontal upscale on a 4K panel — it visibly falls apart there.

There is no higher-resolution source anywhere in the project, so this cannot be
fixed from what we have. It needs real photography from the client at 2560px wide
or better (3840px for full-bleed use). Until then, treat every photographic band
as a placeholder, not as a finished treatment.

## The sunburst is vector — and there are two of them

`assets/illustration/sunburst-rays.svg` is the client's own SVG export of the
hero-weight mark, inlined as path data in `components/brand/sunburst-data.js`.
It replaced a 738x739 raster that upscaled 2.3x at 2560px and 4.6x on a Retina
panel, which softened the ray edges and banded the aqua field.

**The brand has two sunbursts and they are easy to confuse.** At small sizes they
look interchangeable; measured on painted pixels along a line at 45% height they
are clearly different drawings:

| | rays across the line | ink coverage | used by |
|---|---|---|---|
| Hero weight | 23 | ~24% | `Sunburst` — `horizon`, `bloom`, `field`, `halo` |
| Master logo symbol | 15 | ~51% | `Mark`, `Logo` |

If you re-export either one, **measure it before trusting it** — a screenshot at
a single size will not tell you which you have. That mistake cost a full cycle
here: the logo symbol was swapped in for the hero fan, and at 133px it looked
right.

Going vector also retired a hack. Fills are `currentColor`, so ray colour is now
`--bloom-ray-color`; the raster had to be pushed toward aqua with
`filter: sepia() hue-rotate()` because a raster `mask-image` does not render
across the surfaces this system ships into and `hue-rotate` does nothing to a
near-white.


### Measures on display type

Give a display measure in **em, not px or ch**, and put it on the element whose
font-size it should track. Two failures in one edit here: a `ch` cap on the wrapper
resolved against the wrapper's 16px body font, pinning every viewport to the same
483px line; replacing it with a fixed 720px then held two lines at 1280 but let the
whole sentence collapse onto one 720px line at 1024, shooting across the frame into
the bright side at 3.7:1. `width:min(21em,100%)` on the quote itself holds two lines
from 390 to 1440. Note `width`, not `max-width` — the wrapper is a flex item, so a
max-width alone lets it shrink to the balanced text width and the measure never
governs.

### Responsive gotcha, learned three times

**An inline style beats a media query.** Anything a breakpoint needs to change
must live in a class, not in a JSX `style={{…}}` — a phone rule written against an
inline-styled property silently does nothing and the layout looks untested. This
bit the band three times in one pass: `object-position` on the image, `white-space`
on the kicker, `display` on the keyline, and `background` on the scrim were all
inline, so every phone rule targeting them was dead. They are classes now
(`.sb-band-scrim`, `.sb-band-kicker`, `.sb-band-keyline`). Inline styles are still
right for one-off positioning that no breakpoint touches.

### Photographic bands

The statement band carries its **subject on one side and its type on the other**,
and the photograph decides which. The SandroWealth signage shot behind "The exit
is the only transaction of its size" measures luminance ~173 on the stone where
the logo sits and ~65 on the glass entrance, so the quote is right-justified over
the glass with `--scrim-right`. Left-aligned type there would have needed a scrim
heavy enough to flood the logo — the thing the photograph is for. Check the
subject side before choosing the type side, and bias the `object-position` crop
toward the type side at narrow widths, or `cover` will centre on the subject and
put the copy back over the bright half.

Below 560px **the split becomes a veil**. The quote spans the whole frame at that
width, so it crosses the un-scrimmed side and lands on specular highlights in the
glass measuring 238 luminance — white type there was 1.4:1. Phones get a flat
62–86% veil instead of the directional scrim, which holds the brightest pixel near
90 and white type at ~7:1. Measured, not eyeballed: the worst composited pixel
under the quote is 87 at 390px, 90 at 430px, 67 at 768px.

## Iconography

The real Sandro icon set is in the project: 1,173 glyphs, extracted from the
`.fig` (`/Design-system/Icon-Library`) into `components/icons/icon-data.js` and
rendered by `components/icons/Icon.jsx`. The v1 Lucide substitution is gone.

Style: outline, uniform stroke, geometric, 24px grid, single-colour, painted with
`currentColor`. Categories in the source: Arrows, Charts, Communication,
Development, Editor, Education, Files, Finance & E-Commerce, General, Images,
Layout, Maps & Travel, Media & Devices, Security, Users, Weather.

Names are PascalCase and enumerated exhaustively in `components/icons/Icon.d.ts`.
Read that file rather than guessing: `Mail01`, not `mail`; `BarChart03`, not
`bar-chart-3`. Token sizes are 16px (`--icon-sm-px`) and 18px (`--icon-md-px`).
20px is the component default and 24px is the editorial size.

Never emoji. Unicode characters `—`, `→` and `·` are typographic devices only,
never UI affordances. The sunburst is a brand mark, not an icon, so it never
appears in an icon slot.

Note that `icon-data.js` is 4.6 MB. It is fine for design and prototyping, but
subset or tree-shake it before shipping to production.

---

## Logo & the Sandro Business treatment

`assets/logo/` holds:

| File | Notes |
|---|---|
| **`sandro-lockup.svg`** | **The real vector lockup**, copied from the `.fig` (`/Sandro-Prism/Client-logo/Vector.svg`, 912 × 163.5). Use this wherever the parent lockup is needed. |
| `sandro-lockup-ivory.png` / `-titanium.png` | Raster lockups extracted from the client's transparent master PNG. |
| `sandro-symbol-ivory.png` / `-titanium.png` | The sunburst symbol, 137px. Also inlined as a data URI inside `Mark.jsx`. |
| `illustration/sunburst-panel.png` | The half-sun illustration as the brand book prints it — ivory rays on a titanium panel. Use framed, as a picture. |
| `illustration/sunburst-rays.svg` | The hero-weight fan as vector, straight from the client. Inlined as path data in `sunburst-data.js`; fills are `currentColor`. **Use this for every overlay** — hero, `field`, `halo`, slides. The opaque panel was the reason the v2 hero read as a dark rectangle. |

The Business lockup is composed live rather than baked: the extracted symbol plus
"SandroBusiness" set in Libre Baskerville Regular, optically matched to the parent
wordmark. See `components/brand/Logo.jsx`.

The parent wordmark's letterfit is tighter than Libre Baskerville produces, which
suggests custom lettering rather than the plain typeface. The composed Business
lockup is a close approximation, not a match. Confirm the wordmark typeface, or
have "SandroBusiness" drawn. This is the largest remaining fidelity gap.

`components/brand/Sunburst.jsx` has five variants, all from the same artwork and
none redrawn: `square`, `arc`, `rays`, `field`, `horizon`, `bloom` and `halo`.
See Brand in the Design System tab for the contrast rule and the before/after.

Inherited usage rules: clear space of at least the symbol's height, and a minimum
lockup width around 300px on a 1200px canvas, because the rays are thin and vanish
when small. Never stretch, recolour outside the sanctioned colourways, rotate, or
add effects.

---

## Font note

Libre Baskerville and DM Sans are free Google Fonts, loaded from the Google Fonts
CDN in `tokens/fonts.css`. No substitution was necessary. The project holds no
self-hosted binaries, so send the `.woff2` or `.ttf` files if Sandro needs
offline, print, email or PowerPoint output.

The `.fig` also references Moderat, Mulish, Inter, Degular and Replay Pro in older
or third-party pages. Those are not part of the Business type system, and where
materialized kit components reference them they fall back to a generic stack. Only
Libre Baskerville and DM Sans are canonical.

---

## Index

| Path | What is in it |
|---|---|
| Root | `styles.css` (the single entry point consumers link, an `@import` list only), `readme.md`, `SKILL.md`, `thumbnail.html` |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `motion.css`, `semantic.css`, `base.css`, `responsive.css`, plus `figma/fig-tokens.css` and `figma/fig-typography.css` generated from the Figma Variable collections (67 variables, both collections at 100% coverage) |
| `assets/` | `logo/` (1 SVG, 4 PNG), `illustration/` (`sunburst-panel.png`, `sunburst-rays.svg`), `photography/` (incl. `sandro-signage.jpg`), `photography/` (3 references cropped from the brand book) |
| `_notes/` | Extracted text of the two client PDFs |
| `guidelines/` | 23 foundation specimen cards across Colors, Type, Spacing, Motion and Brand |
| `slides/` | Seven deck layouts in the brand-book grid |

### Components

| Group | Components |
|---|---|
| `components/brand/` | `Mark`, `Logo`, `Sunburst`, `Kicker` |
| `components/core/` | `Button`, `IconButton`, `Tag`, `Badge`, `Card`, `StatBlock`, `Rule` |
| `components/forms/` | `Input`, `Select`, `Checkbox`, `Switch` |
| `components/layout/` | `Section`, `EditorialColumns`, `Reveal` |
| `components/navigation/` | `Header`, `Footer`, `Tabs` |
| `components/icons/` | `Icon` (1,173 real Sandro glyphs) |

`components/figma/` holds components extracted verbatim from the `.fig`, kept
separate from the authored set. Anything colliding with an authored name carries a
`Fig` prefix to mark it as raw kit output: `FigButton`, `FigHeader`, `FigFooter`,
`FigHome`, plus `Buttons`, `NavLink`, `Logotype`, `SideNav`, `SideNav2`,
`ActionIcon`, `IconWrapper`, `IconGlyph`, `BreadcrumbMain`,
`BreadcrumbItemsCore`, `BreadcrumbItemsCoreFalseButton`,
`BreadcrumbItemsCoreFalseButton2`, `ChevronRight2`, `ChevronRight4`, `Blocks`,
`LeftContent`, `LeftText`, `MainContent`, `TypographyGuideItem`,
`DetailColourText`, `Circle2`, `Diamond012`, `Copy062`.

`ui_kits/website/` is the Business Owner Journey marketing site: Home, The
Journey, Tracks, Assessment. `ui_kits/platform/` is the Senior Partner console:
Pipeline, Owners, Phases, Settings.

`templates/` holds the one-click starting points for consuming projects.
`templates/website/` and `templates/platform/` are thin Design Component shells
that hold the page chrome and route between screens. The screens themselves are
`<x-import>`ed from `ui_kits/`, so a template and its kit are never two copies of
the same design. Point the `base` line in each `ds-base.js` at the bound
design-system folder and the template runs anywhere.

### Coverage against the `.fig`

Every component family in the file is built except five that are documentation
scaffolding and example frames rather than reusable UI: `_Colour item`, `6h`,
`iPhone-14-Instagram-Gray 1`, `Template` and `ToT item`.

`Breadcrumb` (375 variants) was extracted and then removed. The generated file was
4.6 MB of baked instances, which would bloat every consumer's bundle for a
component neither kit uses. `BreadcrumbMain` (4 variants) and
`BreadcrumbItemsCore` (30 variants) cover the family. Say the word and I'll
restore the full set.

Both token collections are at 100% (62 + 5 variables), and all 12 named text
styles are reproduced as tokens.

### Intentional additions

These have no counterpart in the `.fig` and were added because the system needs
them. `Reveal` is the motion primitive the Business direction is built on.
`Kicker` and `Rule` are the brand book's two most-repeated typographic devices,
promoted to components. `StatBlock` generalises the oversized Baskerville numeral
treatment. `Sunburst` carries the illustration's permutations and the contrast
contract, and `Mark` is the symbol alone. `Icon` wraps the extracted glyph data.
