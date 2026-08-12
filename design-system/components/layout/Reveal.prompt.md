Wrap anything that should enter on scroll.

```jsx
{items.map((it,i)=><Reveal key={it.id} index={i}><Card {...it} /></Reveal>)}
<Reveal mode="wipe"><h1>Display type wipes up from its baseline.</h1></Reveal>
```

`index` multiplies the 70ms stagger. `mode="wipe"` is for headlines only — it clips from the baseline, which reads as typographic rather than as a UI animation. Content enters once and stays. Never wrap a whole page in one Reveal.


## Fail open

Motion in this system is **armed, not assumed.** Every hidden from-state lives
under `html[data-sb-motion="1"]`, which this file sets at bundle-eval time only
after two consecutive `requestAnimationFrame` callbacks actually land — so print,
PDF, screenshot/PPTX capture, background tabs and reduced-motion never arm and
render the finished design unanimated. `Reveal` also fails open on the trigger:
it shows immediately when already in view, when `IntersectionObserver` is
missing, or when an observer never reports within 400ms.

Adding a new entrance treatment: resting state unscoped, from-state under
`html[data-sb-motion="1"]`. Never make a hidden state the CSS default.
