Sticky site header.

```jsx
<Header tone="transparent" items={['Home','The Journey','Tracks','Assessment']}
  active="Home" onNavigate={setPage} cta="Take the assessment" />
```

Use `transparent` over a dark hero, `light` over off-white content, `dark` over a
titanium body. One CTA at most. Below 820px the nav collapses into a sheet behind
a toggle, which the component handles itself.

The header sets `data-scrolled="1"` on itself once the page moves past 18px, and
CSS swaps the translucent rest ground for a near-opaque one
(`--glass-dark-scrolled` / `--glass-light-scrolled`) plus a hairline and a soft
shadow. This is not decoration: sticky chrome ends up over sections it was never
designed against, and a 72%-dark glass over a white section composites to light
grey, which erases an ivory logo and ivory links. `tone="transparent"` adopts the
dark ground when scrolled rather than staying see-through, for the same reason.

The listener is bound to `document` in the capture phase, not to `window`, because
`scroll` does not bubble — a window-only listener silently never fires when the
header is mounted inside a scrolling host such as a template preview or an
embedded frame.

**If the header scrolls away instead of staying put, the cause is its containing
block, not the component.** `position:sticky` only holds within its nearest
ancestor box: mount it inside a wrapper that is one viewport tall while the
DOCUMENT does the scrolling — which is what the DC template host does, with a
`display:contents` mount point over a fixed-height `.sc-host` — and the header
detaches after the first screen. In that situation pin it in the host page
(`body .sb-header{position:fixed;left:0;right:0;top:0}`; the `body` prefix wins
against the system stylesheet, which loads after an inline block), and give the
pages that used to sit below it `padding-top:var(--header-h)`, since pinning takes
it out of flow. `templates/website/Website.dc.html` does exactly this.

Below 820px the links collapse into a sheet under the bar. **That sheet is opaque
(`--sheet-dark` / `--sheet-light`), not glass** — it covers headlines, photographs
and the sunburst, and translucency there puts competing type directly behind its
own links. The bar goes opaque with it, otherwise a translucent header sits on a
solid panel and the two read as separate cards. Rows are 48px and the CTA is
full-width at `--control-h-lg`.
