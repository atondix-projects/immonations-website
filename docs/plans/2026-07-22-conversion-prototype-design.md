# Immonation conversion prototype — design brief

**Status:** decision locked
**Target:** two-week frontend prototype
**Priority:** visual quality first; no backend functionality

## Outcome

Create a premium-editorial, seller-first Immonation website prototype that feels local, personal, precise, and visibly capable of handling a property sale from preparation through presentation and buyer qualification.

The desired first impression is: **“They will handle my sale professionally and personally.”**

## Audience and conversion hierarchy

1. Homeowners considering a sale in the Metropolregion Nürnberg.
2. Owners comparing agents or seeking a valuation.
3. Buyers browsing representative inventory.
4. Prospective agents, referrers, and knowledge-seeking visitors.

Primary CTA: **Kostenlose Bewertung starten**
Secondary CTA: **Verkaufsprozess ansehen**

## Phase-one route scope

### Core

- Homepage
- Sell hub
- House, apartment, and apartment-building seller pages
- Valuation wizard and prototype thank-you page
- Sales process
- References hub and all available reference detail pages
- FAQ
- Contact
- Imprint and privacy pages

### Supporting

- Buyer overview with realistic sample listings
- Services overview and existing service detail pages
- Locations hub only
- About
- Careers
- Referrer page
- Downloads
- Blog/magazine overview and existing articles

German is complete. English is professionally adapted for the core journey and may remain partial on secondary content, with no broken routes or mixed-language UI.

## Homepage narrative

1. Architecture-led hero with concise seller promise
2. Trust and regional proof
3. Seller services
4. Selected references and results
5. Transparent sales process
6. Premium marketing deliverables
7. Customer stories and reviews
8. Valuation entry
9. Contact and local office proof
10. Small company-group credibility block lower on the page

Community content stays off the homepage. The magazine is a secondary editorial entry.

## Visual system

- Elegant serif display typography paired with a restrained sans-serif body face.
- Warm-white primary canvas with selective charcoal sections.
- Existing Immonation blue is an accent, not a field color.
- Architecture-led supplied photography with natural light and restrained grading.
- Flat editorial panels, fine borders, minimal corner radius, and almost no shadow.
- Strong type scale, generous whitespace, crisp grids, and controlled asymmetry.
- Restrained reveal, image movement, and hover states; motion never delays reading.
- Video is selective, muted by default, user-controlled, and never the only carrier of information.
- WCAG-oriented contrast, focus states, keyboard use, reduced-motion behavior, and semantic structure.

Canonical identity: current facelift lockup, dark on light and white on dark.

## Interaction model

### Valuation

- Fully interactive, local-state wizard.
- No personal data leaves the browser.
- Progress, validation, back/forward behavior, summary, and completion feel real.
- Completion routes to a prototype thank-you page.
- The UI must clearly state that no request was transmitted in the prototype.

### Listings

- Realistic sample property cards.
- Location/postcode/object-ID search pattern may be demonstrated visually.
- Filters and detail actions are disabled or visibly marked as prototype behavior.
- No live feed, saved profile, favorite, account, or inquiry submission.

### Contact and appointments

- Contact forms are presentation-only.
- Existing Calendly link may be real and external.
- Cookie banner is visual only and must not imply stored consent.

## Content and evidence policy

Prototype display values approved by the final visual approver:

- 4.9/5 Google rating and 220+ reviews
- 60+ sales annually
- €30 million annual transaction volume
- 8,000+ buyer network
- Supplied inquiry, viewing, duration, and outcome metrics within approved case studies
- City or district only for reference locations; never street-level precision

Use supplied German copy largely verbatim. Adapt English professionally rather than literally. Use “specialist network” for floor-plan/technical preparation until the exact professional designation is verified. State that Immonation focuses exclusively on sales. Dr. Klein may appear as a named partner in the prototype.

These are prototype content decisions, not proof of public-release clearance. Claims, reviews, names, quotes, screenshots, partner marks, and awards remain gated in the post-prototype checklist.

Use all four developed stories: Viktor Emter, Markus Burkhard, Herr Sippel, and Frau Hartmann. Never present a synthetic-looking portrait as documentary customer photography; use an approved property image, typographic treatment, or neutral illustration instead.

## Reference interpretation

References are pattern inputs, not templates to copy.

| Source | Use | Do not import |
| --- | --- | --- |
| VON OTTO | Concrete, editorial presentation of premium marketing deliverables | Copy, distinctive composition, or unsupported service claims |
| DAHLER | Clear location/postcode/object-ID sample-search hierarchy | Portal density, live-feed expectations, accounts, favorites |
| Evernest | Categorized guide and knowledge-hub taxonomy | Broader platform structure |
| Enora | Human customer-story and video treatment | Its review/statistics/reference system |
| Engel & Völkers | Recruiting content hierarchy | Corporate scale or luxury-brand tone |
| ImmoPartner | Seller topics and SEO/content coverage | Conversion tools or digital-service ecosystem |
| Immowelt | Future heatmap concept only | Price portal architecture in this prototype |
| VON POLL | Future assistant concept only | Assistant or AI prominence in this prototype |
| Königskinder | Secondary content reference | Primary information architecture |

## Explicit non-goals

- No backend, database, CRM, email, authentication, API integration, listing feed, or form delivery.
- No functioning consent management or analytics.
- No AI assistant or heatmap in the two-week core scope.
- No rentals positioning; Immonation is sales-only.
- No invented before/after pairs, drone claims, awards, or partner proof.
- No generic stock smiles, interchangeable property cards, empty luxury vocabulary, portal clutter, or SEO text walls.

## Build approach

Use a design-system-first approach, followed by vertical journey slices:

1. Lock tokens, typography, shell, responsive grid, and shared sections.
2. Complete the homepage and valuation entry as the visual benchmark.
3. Extend the system across seller pages, process, and references.
4. Populate supporting routes without lowering design consistency.
5. Finish with cross-device, accessibility, language, content, and visual QA.

This is more reliable than styling pages independently and faster than polishing the homepage before reusable patterns exist.

## Acceptance criteria

- Every selected page is responsive, populated, consistent, and reachable from navigation or contextual links.
- Homepage communicates seller value, regional credibility, process, proof, and next action without generic premium language.
- German core journey is complete; core English reads naturally.
- Valuation journey completes locally and explicitly confirms that nothing was sent.
- Sample listings cannot be mistaken for live inventory.
- All four customer stories and available reference details use approved prototype content and privacy rules.
- Keyboard navigation, focus visibility, contrast, reduced motion, headings, labels, and image alternatives pass P0 QA.
- Current Chrome, Safari, Firefox, and Edge work on representative desktop and mobile viewports.
- No frontend behavior generates a network request to a missing backend.
