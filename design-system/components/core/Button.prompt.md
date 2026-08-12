Every call to action.

```jsx
<Button variant="primary" size="lg" iconRight="ArrowRight">Request access</Button>
<Button variant="secondary">Read the brief</Button>
<Button variant="link">All insights</Button>
```

`primary` (khaki `#8E8565`, the file's own button) is the default; `accent` (aqua) is the signature accent and `gradient` is the live-gradient hero CTA — one of those two per screen, never both; `secondary` is the keyline pair to it; `ghost` for toolbars; `link` for inline. Sizes `sm|md|lg` = 34/44/54px. `loading` runs the sheen sweep. Labels are sentence case, verb-first, no exclamation.

On a dark field `secondary` gets its own hover — a 14% fill plus an aqua
keyline — because the light-mode 8% quiet-hover tint is nearly invisible there
and leaves it looking inert beside an accent CTA.

`data-ink="light"` on an `accent` button swaps the resting fill to aqua-700 so
the label can be white (5.96:1). Use it where an accent CTA has to carry a light
section on its own; plain `accent` keeps its dark-aqua ink, since offwhite on
aqua-500 is only ~3:1.
