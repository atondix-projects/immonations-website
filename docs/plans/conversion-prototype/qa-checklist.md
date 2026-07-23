# Prototype QA checklist

## Functional prototype

- [x] Every header, footer, CTA, card, and contextual link reaches the intended route.
- [x] Valuation step validation, forward/back, summary, and completion work locally.
- [x] Valuation completion states clearly that no request was sent.
- [x] Contact controls do not submit or throw errors.
- [ ] Calendly is the only authorized real external conversion link. Deferred: no approved URL exists in the repository; no link was invented.
- [x] Sample listing filters/details are disabled or clearly marked.
- [x] Cookie banner does not claim that consent was stored.
- [x] No interaction calls a missing API or logs avoidable runtime errors.

## Responsive and browser

- [x] Test representative narrow mobile, wide mobile, tablet, laptop, and large desktop widths.
- [x] Test current Chrome, Safari, Firefox, and Edge where available. Chromium was available in the local browser runner; the remaining engines stay in the production regression gate.
- [x] No horizontal overflow, clipped controls, accidental overlap, or unreadable crop.
- [x] Sticky header does not obscure anchors or dialogs.
- [x] Content order remains logical when columns stack.

## Accessibility

- [x] One clear `h1` per page; headings are hierarchical.
- [x] Landmarks, links, buttons, inputs, labels, errors, and progress are semantic.
- [x] Full core journey works by keyboard.
- [x] Focus is visible and never trapped.
- [x] Text and essential UI meet WCAG-oriented contrast targets.
- [x] Images have appropriate alt text or are correctly decorative.
- [x] Motion respects reduced-motion preference.
- [x] Video has controls and does not unexpectedly play audio.
- [x] Language attributes and locale changes are correct.

## Content and localization

- [x] Metrics are consistent across pages and locales.
- [x] German core and supporting routes have no placeholders.
- [x] Core English is complete and naturally adapted.
- [x] Dates, numbers, currency, punctuation, and address formatting match locale.
- [x] Reference city/district privacy rule is respected.
- [x] Prototype/sample disclosures are visible without dominating the design.

## Engineering and repository rules

- [x] Relevant Next.js 16 local documentation was consulted before API/convention changes.
- [x] Styling uses Tailwind utilities and `@theme` tokens only.
- [x] No CSS Modules, CSS-in-JS, `tailwind.config.ts`, or hand-edited registry UI files.
- [x] New localized routes follow `routing.pathnames` and repository SEO helpers.
- [x] `pnpm typecheck` passes.
- [x] `pnpm lint` passes.
- [x] `pnpm build` passes.
- [x] Browser console has no new errors or hydration warnings.

## Final review

- [x] Homepage reviewed at 100% zoom on desktop and a physical/realistic mobile viewport.
- [x] Seller → valuation and seller → process journeys are coherent.
- [x] Buyer route cannot be confused with live inventory.
- [x] All available reference detail pages are reachable.
- [ ] Andreas gives final visual approval or a bounded revision list.
