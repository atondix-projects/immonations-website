# Prototype baseline audit

Date: 2026-07-22

## Summary

The existing application is structurally reusable. It already has the correct Next.js 16 App Router, next-intl, Tailwind v4, SEO helper, route, content, and component foundations. The prototype should be an upgrade, not a rewrite.

The primary gaps are experiential: the palette is cool white instead of warm editorial, the homepage is long and section-heavy, trust proof is fragmented, the valuation experience is not a wizard, the buyer page looks live and uses remote stock imagery, and reference cards do not lead to detail pages.

## Core route dispositions

| Route | Current evidence | Disposition | Required change |
| --- | --- | --- | --- |
| Homepage | Complete section assembly and supplied media exist | Replace composition; retain useful content/components | Apply locked narrative, warm editorial art direction, consolidated proof, stronger CTA hierarchy, four stories, approved metrics |
| Sell hub | Working bilingual hub and typed guides | Keep and restyle | Remove generic icon-card feel; emphasize three selected branches; move land outside core hierarchy |
| House seller | Dynamic typed route exists | Keep and upgrade | Add stronger situation/proof/process composition and editorial media |
| Apartment seller | Dynamic typed route exists | Keep and upgrade | Add apartment-specific proof and concerns |
| Apartment-building seller | Dynamic typed route exists | Keep and upgrade | Add investor/sale-preparation proof and concerns |
| Valuation | Static explainer plus small homepage form | Replace interaction | Build complete local-state wizard, progress, validation, summary, and explicit no-transmission thank-you route |
| Sales process | Detailed ten-step route exists | Keep and restyle | Reduce interface density and align with editorial system |
| References hub | Fifteen supplied cards exist | Keep data and imagery; upgrade navigation | Make cards link to details and surface approved case metrics |
| Reference details | No detail route exists | Add | Create localized dynamic detail route for every available reference |
| FAQ | Route and JSON-LD exist | Keep and restyle | Prioritize seller questions and validate visible/schema parity |
| Contact | Contact information and process exist | Keep and restyle | Add clearly presentation-only contact surface and safe appointment route/link treatment |
| Imprint/privacy | Legal templates exist | Keep | Align typography and shell only; do not rewrite legal substance |

## Supporting route dispositions

| Route | Disposition | Required change |
| --- | --- | --- |
| Buyer | Replace visual/data presentation | Use supplied local property media; add sample search hierarchy; label all inventory and actions as prototype samples |
| Services and details | Keep and restyle | Align with shared editorial patterns and concrete marketing deliverables |
| Locations hub | Keep | Retain hub; location details remain outside selected prototype navigation emphasis |
| About | Keep and restyle | Preserve local/personal company character |
| Careers and agent recruiting | Keep and restyle | Retain recruiting hierarchy; avoid corporate scale cues |
| Referrers/downloads/blog | Keep and restyle | Secondary-page consistency; no backend download capture |
| Terms | Keep | Align legal presentation only |

## Shared component dispositions

- Keep: metadata/JSON-LD helpers, next-intl navigation, typed content registries, current logo assets, supplied reference/process imagery, section composition boundaries, header/footer semantics.
- Upgrade: global tokens, page container and rhythm, header CTA behavior, footer density, page hero, CTA band, FAQ, reference gallery, story presentation, cards, focus/hover states.
- Replace: homepage mini valuation form, remote buyer stock imagery, live-looking listing inquiry links, unavailable-video placeholders, excessive review-platform grid.
- Add: skip link, prototype notice component, local valuation wizard, thank-you route, sample-property search panel, reference-detail route/template, four-story editorial proof section.

## Content and asset findings

- Fifteen public reference images are already provenance-linked to normalized source assets.
- The source library contains additional reference photos, customer-story material, review screenshots, video, partner assets, and documented rights gates.
- Current homepage copy contains older values such as 216 reviews; all prototype surfaces must use the locked 4.9/5 and 220+ state.
- Existing feedback content includes Sandra Börschlein, while the locked four developed stories are Viktor Emter, Markus Burkhard, Herr Sippel, and Frau Hartmann. The story module must be reconciled.
- The buyer page currently pulls Unsplash imagery and routes “exposé” actions to contact. Replace both to avoid external stock and live-inventory implications.

## Baseline verification

- Repository and route inspection: complete.
- Local Next.js 16 image, metadata, and dynamic-route documentation: read before implementation.
- Initial combined typecheck/lint attempt exceeded the 120-second command window and produced no result. This is not treated as a pass or failure; run commands independently after the first implementation slice and in the final clean suite.
