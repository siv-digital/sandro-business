The brand's one illustration, in six sanctioned permutations — hero fields, section dividers, cover art.

```jsx
{/* the hero treatment: a rising sun. Rays live in the lower band and dissolve
    upward, so display type sits on clean ground with no scrim needed. */}
<section style={{position:'relative',minHeight:'92vh'}}>
  <Sunburst variant="horizon" opacity={0.62}>
    <h1>From the business you built to the wealth it becomes.</h1>
  </Sunburst>
</section>
```

```jsx
{/* closing field: the sun as ATMOSPHERE. Oversized, centre dropped below the
    bottom edge, faded radially — no band edge, no keyline. Reach for this
    instead of `horizon` in any section under ~600px, where a clipped band
    reads as a decorative strip stuck on the bottom. */}
<section style={{position:'relative',overflow:'hidden',padding:'var(--section-y) var(--gutter-lg)'}}>
  <Sunburst variant="bloom" opacity={0.34} />
  <div style={{position:'relative',zIndex:3}}>…</div>
</section>
```

```jsx
{/* alternate hero: the sunburst sits BESIDE the headline, contained */}
<div style={{display:'grid',gridTemplateColumns:'1fr 380px',gap:64,alignItems:'center'}}>
  <h1>From the business you built to the wealth it becomes.</h1>
  <Sunburst variant="halo" size={380} drift />
</div>

{/* background field — children get the scrim automatically */}
<section style={{position:'relative'}}>
  <Sunburst variant="field" drift opacity={0.5}>
    <h1>Readable, because the scrim is part of the component.</h1>
  </Sunburst>
</section>
```

**Never** absolutely-position text over a Sunburst from outside. Pass it as `children`. `field` pushes the rays to the right-hand 78% so the left column stays clean, then lays `--scrim-solid` over everything before the content. Keep `opacity <= 0.55` whenever children are present. `drift` is the only looping animation in the system. `bloom` needs no scrim and takes no `drift` prop — it breathes and drifts by default, because an edgeless field with a hard-cut animation state would give itself away.

Tune `bloom` with `--bloom-reach` (how far up the section the rays survive, default 72%) and `--bloom-spread` (how wide, default 68%) — these are measured in SECTION space, so they behave the same at any artwork size. `--bloom-w` (126%) and `--bloom-drop` (-4%) size and seat the artwork itself; `--bloom-glow-h` (88%) sizes the glow. Lower `--bloom-reach` to buy headroom for type.

### Layout
`horizon` is **in flow**, not an absolute overlay — its children drive the hero's height, and `--hero-min-h` is only a floor. Children are wrapped in `.sb-sun-content`, which reserves `--horizon-band + --horizon-clearance` as padding, so display type and CTAs structurally cannot land on the horizon hairline at any viewport. Put the section's own `position:relative;display:flex` on the wrapper and let the variant size itself.

### Scroll behaviour
The `horizon` variant carries a **scroll-linked sunrise parallax**: the band sits 120px low at `.55` opacity and rises to rest over the first `--sun-lift-range` (58vh) of page scroll, tracking scroll in both directions. The travel-to-range *ratio* is what reads as depth — roughly 0.2x scroll speed; drop much below that and the effect is running but invisible. It needs no props and no JS beyond the motion flag. Tune with `--sun-lift-range` and `--sun-lift-distance` on the hero.

It is scroll-*linked*, not scroll-*triggered* — do not pair it with a `<Reveal>` on the same hero; the two read as a double entrance.

The ray artwork is inlined, so never pass `src` unless you are deliberately swapping the illustration.

`bloom` carries the aqua. The fan is vector paths filled with `currentColor`, so
its colour is just `--bloom-ray-color`. (This used to be a
`filter: sepia() hue-rotate()` hack, needed only because the artwork was a
raster: a raster `mask-image` does not render across the surfaces this system
ships into, and `hue-rotate` does nothing to a near-white.) Behind them sit two fields: `--sb-glow-bloom` inside the
radial mask (seats the fan) and `--sb-glow-bloom-wash` outside it (lifts the
whole lower field off flat titanium; it carries no rays, so it cannot wash
type). Both fields are hemmed off the section floor by `--bloom-hem`. They peak at
the bottom edge, so unhemmed they get clipped at near-full alpha and cut a
bright seam against whatever section follows. The hem is partial rather than to
zero — cutting the glow entirely severs the rays from their own base and the
fan reads as floating. **House rule: light never terminates on a section edge.**
Set `--bloom-ray-color: var(--sb-offwhite)` for plain ivory rays.
