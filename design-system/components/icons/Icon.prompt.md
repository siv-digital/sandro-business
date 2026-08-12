Any icon in the system — the real Sandro set (1,173 glyphs) pulled from the Figma file. No substitution.

```jsx
<Icon name="ArrowRight" size={18} />
<Icon name="Bank" size={24} color="var(--sb-aqua-500)" />
```

Names are PascalCase and listed exhaustively in `Icon.d.ts` — read that file rather than guessing (`Mail01`, not `mail`; `BarChart03`, not `bar-chart-3`). Icons paint with `currentColor`, so setting `color` on any ancestor works. Default size 20; the token sizes are 16 (`--icon-sm-px`) and 18 (`--icon-md-px`). Never substitute emoji or a unicode glyph for an icon.
