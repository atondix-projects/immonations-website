# Immonation conversion prototype worklog

## 2026-07-22 — activation baseline

- Consolidated 60 user decisions into the locked design brief and implementation package.
- Confirmed a frontend-only, design-first prototype with no backend or hidden integration behavior.
- Confirmed 36 board tasks: 30 P0 and 6 P1.
- Confirmed Andreas as final visual approver.
- Defined independent completion checks covering task reconciliation, routes, browser behavior, responsive layouts, accessibility, localization, builds, assets, and approval.
- Preserved public-release verification, consent, rights, partner, award, and legal work as explicit post-prototype gates.
- No subagent delegation is authorized or planned.

Next: inspect the active goal state, audit the existing route/component/asset baseline (F01), and update the machine-readable board with dispositions and evidence.

## 2026-07-22 — F01 baseline audit

- Inspected all application routes, shared site components, design tokens, translations, SEO registries, public media, normalized customer-source cross-references, and current worktree state.
- Read the applicable local Next.js 16 documentation for images, metadata, and dynamic routes before implementation.
- Recorded keep/replace/add dispositions for every core and supporting route in `BASELINE-AUDIT.md`.
- Confirmed the existing architecture is reusable; the main shortfalls are visual hierarchy, prototype-state honesty, valuation interaction depth, reference detail coverage, and content consistency.
- Identified direct contradictions to resolve: remote stock buyer imagery, live-looking listing actions, no reference detail routes, a one-step valuation form, fragmented proof, an outdated 216-review label, and story content that does not match the four locked stories.
- Initial combined typecheck/lint execution exceeded its 120-second window without output. No pass/fail claim is recorded; the checks will be rerun independently.
- Marked F01 complete and made F02 dependency-ready in the machine-readable board.

Next: implement the warm editorial Tailwind token layer (F02), shared responsive composition (F03), and accessible site shell (F04), then validate the foundation before multiplying routes.

## 2026-07-22 — implementation and verification pass

- Implemented the warm editorial Tailwind foundation, shared page patterns, accessible shell, seller-first homepage narrative, local valuation wizard, local thank-you route, references hub and all 15 detail pages, four customer stories, supplied review proof, buyer sample experience, contact prototype, and cookie prototype.
- Replaced remote stock buyer imagery with local supplied/reference media and removed live-portal ambiguity from sample search, filters, and exposé actions.
- Aligned approved proof values, specialist-network wording, sales-only positioning, Dr. Klein wording, bilingual routing, metadata, sitemap, JSON-LD, and `llms.txt`.
- Browser-tested valuation, references, buyer, contact, locale/navigation, keyboard focus, and reduced-motion behavior.
- Found and fixed a 768 px header collision, unlabeled valuation choice controls, image-quality and scroll-behavior warnings, and 320 px horizontal overflow from long editorial headings.
- Final verification passes: typecheck, lint, 95-page production build, 46/46 production URL smoke test, 566/566 translation-key parity, customer-source reconciliation, curated-asset reconciliation, and `git diff --check`.
- One P1 item remains deferred: the repository contains no approved Calendly URL. The final P0 visual approval gate is ready for Andreas.
- Added an explicit production-browser no-backend audit: valuation completed with zero non-GET/API/write requests, contact produced zero requests, cookie/contact actions created no browser storage or cookies, and all five buyer search/exposé actions are disabled.

Next: Andreas reviews the representative screenshots and either approves the visual prototype or supplies a bounded revision list.

## 2026-07-22 — approval gate blocked

- The implementation, production build, route smoke test, responsive QA, accessibility evidence, source reconciliation, and no-backend audit are complete.
- Final visual approval remained unanswered for three consecutive goal turns.
- Q07 and the durable goal are therefore blocked, not complete. The smallest required action is an `approved` response or a bounded visual revision list from Andreas.

## 2026-07-23 — bounded review and story revision

- Andreas supplied a bounded visual revision list for the homepage review and customer-story sections and selected option A: one rotating Google-review screenshot.
- Added a hydration-safe client rotator that selects randomly on page load, changes to a different supplied screenshot every 5.5 seconds, pauses on hover/focus or a hidden tab, and respects reduced motion.
- Reframed the screenshot near its native dimensions inside one stable editorial surface with a restrained crossfade and manual indicators.
- Replaced the one-pixel story grid with 32–40 px gutters, removed aspect-ratio-driven grid overflow, and made the first and last stories full-width desktop features.
- Set the three story images to eager loading so below-the-fold cards do not present as empty beige panels.
- Browser evidence: six reloads exercised all three screenshots; timed rotation changed the active review; 390, 1020, and 1440 px all measured zero horizontal overflow; the Frau Hartmann image rendered correctly at every inspected width.
- Verification passed: Prettier, TypeScript, scoped ESLint, and the 95-page production build.
- Revision captures: `reviews-final-mobile.png`, `reviews-final-1020.png`, `reviews-final-desktop.png`, `final-story-mobile.png`, `stories-final-1020.png`, and `stories-final-desktop-v2.png` under ignored `output/playwright/`.

Next: Andreas reviews the revised sections and either approves Q07 or supplies another bounded revision.

## 2026-07-23 — embedded valuation entry revision

- Andreas selected option A: replace the seller hero’s primary valuation button with the actual first wizard step and repeat that shared step in the lower valuation CTA card.
- Added one reusable property-type card with translated labels, selected/error/focus states, and local-only messaging.
- Added stable property-type IDs so German and English labels never become URL state.
- The localized handoff opens the valuation route at step 2 of 5; direct visits still start at step 1, and Back preserves the selected type.
- Rebalanced the seller hero into a desktop headline/card rail while keeping the card in normal mobile flow. Buyer mode remains unchanged.
- Browser evidence: German and English handoffs reached their localized step-two routes, Back restored the selected type, mobile width remained 390/390, and the console reported zero errors.
- Verification passed: Prettier, TypeScript, scoped ESLint, and the 95-page production build.
- Added local ignore rules for multi-gigabyte raw source inputs, temporary QA output, and generated Python caches before the authorized commit/push.

Next: clean generated residue, review the staged scope, commit the prototype, and push the current branch as requested.
