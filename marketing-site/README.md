# UI kit — Sandro Business marketing site

Four click-through screens in one shell: Home, The Journey, Tracks and
Assessment. Open `index.html`.

Content comes from the two client documents, the Business Owner Journey playbook
(v2) and the three business owner personas, so the phases, tracks, score bands,
persona quotes and cadence language are the client's own rather than invented.

| File | What it covers |
|---|---|
| `index.html` | The shell: sticky header, page switch, footer. |
| `Home.jsx` | Sunrise hero, the five phases, a full-bleed photographic band, the three tracks, a proof band, the sequence statement, briefings, and the file's own black-to-titanium CTA block. |
| `Journey.jsx` | Phase-by-phase detail: who is at the table, what happens, what it produces. |
| `Tracks.jsx` | The three entry points with persona quotes, score bands and cadence. |
| `Assessment.jsx` | Five diagnostic questions, a live progress keyline, and a track result state. |
| `photos.js` | The three reference photographs, inlined as data URIs so the kit renders standalone. |

## Standing disclaimers

This is a proposal, not a recreation. No Sandro Business codebase or product
Figma page was provided. The Figma file supplied the design system and these
screens compose it, so the layout is ours while the tokens, components, icons and
type are the file's.

Assessment scoring here is illustrative. The real assessment is scored 0 to 10 by
Sandro. This demo derives a band from the option index so the result state can be
shown.

No disclosures or citations are rendered. The screens carry none by design, the
figures shown are illustrative, and Sandro's approved disclosure and citation
language has to be added by whoever ships a real page.
