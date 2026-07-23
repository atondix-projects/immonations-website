# Master backlog

Priority legend: **P0** required for prototype acceptance; **P1** complete if P0 is stable; **P2** defer without compromising the core review.

## Workstream 0 — foundations

- [ ] **P0 F01** Audit existing routes/components/assets against the locked brief. Dependency: none. Accept: keep/replace/defer disposition recorded for each core route.
- [ ] **P0 F02** Define Tailwind v4 tokens for color, type, spacing, radii, borders, and motion. Dependency: F01. Accept: tokens live in `globals.css`; no new styling system.
- [ ] **P0 F03** Build responsive page container, editorial grid, section rhythm, and type scale. Dependency: F02. Accept: stable at mobile/tablet/desktop widths.
- [ ] **P0 F04** Align header, locale switcher, CTA, footer, and mobile navigation. Dependency: F02. Accept: keyboard-operable sticky shell on every route.
- [ ] **P0 F05** Create reusable site patterns for hero, proof strip, editorial cards, process steps, quote/story, CTA, FAQ, and media. Dependency: F03. Accept: core routes compose shared site components.
- [ ] **P1 F06** Add restrained motion and reduced-motion variants. Dependency: F05. Accept: no layout shift or blocked content.

## Workstream 1 — homepage benchmark

- [ ] **P0 H01** Build architecture-led hero and two-CTA hierarchy. Dependencies: F03–F05. Accept: value proposition and region are clear above the fold.
- [ ] **P0 H02** Build proof, services, references, process, marketing, stories, valuation, contact, and company-group sequence. Dependency: H01. Accept: order matches the brief and each section has a clear purpose.
- [ ] **P0 H03** Place approved prototype metrics and disclosure state. Dependency: H02. Accept: values are consistent and tracked for public verification.
- [ ] **P0 H04** Complete responsive visual pass. Dependency: H03. Accept: no awkward crop, orphan heading, overflow, or unreadable overlay.

## Workstream 2 — conversion journey

- [ ] **P0 C01** Align sell hub with house/apartment/apartment-building branches. Dependency: F05. Accept: paths are distinct, scannable, and seller-first.
- [ ] **P0 C02** Finish the three seller detail pages with situation, service, process, proof, FAQ, and CTA. Dependency: C01. Accept: no duplicate filler; each property type has relevant concerns.
- [ ] **P0 C03** Build sales-process page from preparation through handover. Dependency: F05. Accept: responsibilities and deliverables are concrete.
- [ ] **P0 C04** Build local-state valuation wizard. Dependencies: F04, F05. Accept: progress, validation, navigation, summary, and completion work without network calls.
- [ ] **P0 C05** Build prototype thank-you page. Dependency: C04. Accept: clearly says nothing was transmitted and offers safe next steps.
- [ ] **P0 C06** Build FAQ with seller-focused questions. Dependency: C02. Accept: visible answers match structured data where present.

## Workstream 3 — proof and references

- [ ] **P0 R01** Normalize reference records used by the UI. Dependency: F01. Accept: city/district, property type, imagery, approved metrics, story, and rights status are explicit.
- [ ] **P0 R02** Build reference hub filters or categories as frontend-only navigation. Dependencies: F05, R01. Accept: all available reference details are discoverable.
- [ ] **P0 R03** Build reusable reference-detail layout. Dependency: R01. Accept: result metrics, narrative, media, and CTA have consistent hierarchy.
- [ ] **P0 R04** Populate all available reference detail pages. Dependency: R03. Accept: no street addresses, missing images, or invented values.
- [ ] **P0 R05** Build four developed customer-story treatments. Dependency: F05. Accept: named stories are readable; no synthetic portrait is framed as real evidence.
- [ ] **P1 R06** Add supplied review screenshots in a restrained proof section. Dependency: rights annotation. Accept: readable, attributed, and queued for launch clearance.

## Workstream 4 — buyer and supporting routes

- [ ] **P0 S01** Build buyer overview and realistic sample listings. Dependency: F05. Accept: sample status is unambiguous.
- [ ] **P0 S02** Add visual location/postcode/object-ID search and disabled filters/actions. Dependency: S01. Accept: no interaction implies live inventory or submission.
- [ ] **P0 S03** Align services overview and existing detail pages. Dependency: F05. Accept: complete preparation and premium marketing are demonstrated concretely.
- [ ] **P0 S04** Align locations hub without building location detail pages. Dependency: F05. Accept: regional competence is visible without placeholder claims.
- [ ] **P1 S05** Align About, careers, referrers, downloads, magazine/blog, contact, and legal pages. Dependency: F04. Accept: all are visually consistent and navigable.
- [ ] **P1 S06** Name Dr. Klein in the financing partner treatment with prototype verification flag. Dependency: S01. Accept: no stronger partnership promise than supplied.
- [ ] **P1 S07** Wire real Calendly link where appropriate. Dependency: F04. Accept: external behavior is labelled and opens safely.

## Workstream 5 — language, SEO shell, and quality

- [ ] **P0 Q01** Consolidate German UI and supplied copy. Dependency: page implementation. Accept: no placeholder, mixed register, or contradictory metric.
- [ ] **P0 Q02** Professionally adapt core English journey. Dependency: Q01. Accept: natural English, no literal artifacts, complete navigation.
- [ ] **P0 Q03** Run responsive, browser, keyboard, contrast, reduced-motion, and content QA. Dependency: P0 pages. Accept: QA checklist has no open blocker.
- [ ] **P0 Q04** Verify prototype-only behavior and network silence. Dependency: interactions. Accept: no form or UI control calls an absent backend.
- [ ] **P0 Q05** Run typecheck, lint, and production build. Dependency: implementation complete. Accept: all pass without new errors.
- [ ] **P1 Q06** Align metadata, JSON-LD, route registry, hreflang, and translation coverage for touched routes. Dependency: final copy. Accept: repository SEO conventions are followed even though public launch is deferred.
- [ ] **P0 Q07** Final visual approval by Andreas. Dependency: Q01–Q05. Accept: explicit approval or documented revision list.

## P2 parking lot

- Live property feed and functioning search
- Form delivery, CRM, email, and lead storage
- Production consent management and analytics
- AI assistant
- Interactive heatmap and price data
- Accounts, favorites, search profiles, and saved properties
- Automated review or award integrations
- Community homepage module
