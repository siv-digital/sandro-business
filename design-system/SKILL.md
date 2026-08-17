---
name: sandro-business-design
description: Use this skill to generate well-branded interfaces and assets for Sandro Business, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read `readme.md` in this skill first, then explore the other files.

**Before you apply any colour rule from `readme.md`, read `../README.md` → Skins.**
`readme.md` documents the default Sandro Business system (aquamarine accent, khaki
trim) and never mentions that the deployed prototype in `../site/` does not render
it. The CEO moved Sandro Business onto the **Sandro Wealth parent palette** on
2026-08-13 — colour preference, not the system — shipped as `html[data-skin="wealth"]`
overrides in `../site/assets/skins.css`. Under that skin actions are **monochrome**
(titanium on light, ivory on dark), brass is **editorial trim only**, and **no
aquamarine renders anywhere**. The Business tokens remain the unscoped default and
are never edited by a re-skin: every palette change goes in `skins.css`.

So the aqua rules in `readme.md` are preserved and still authoritative for the
default system. They are **not** a description of what ships today.

For visual artifacts (slides, mocks, throwaway prototypes) copy the assets out and
produce static HTML files the user can open. For production code, copy the assets
and read the rules here so you can design accurately in this brand.

If the user invokes this skill with no other guidance, ask what they want to build,
ask enough questions to design it properly, then act as an expert designer and
output either HTML artifacts or production code depending on the need.

Sandro Business is a business unit of Sandro Wealth Management™, an SEC-registered
investment adviser. Check any copy against the compliance list in `readme.md`
before finalising it: no performance promises, no specific investment advice, no
superlatives, no testimonials, no "risk-free" framing. Never write disclosure or
citation copy, and never leave bracketed placeholders for it. Omit the line and
flag that Sandro's approved language is required before anything ships.
