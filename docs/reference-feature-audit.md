# Reference website feature audit

Observed: 2026-07-17. This audit records public features and interaction patterns. It does not treat competitor claims as verified facts and does not authorize copying text, assets, branding, or distinctive layouts.

## Audit method

- Reviewed the public homepage and relevant subpages, tools, navigation, funnels, and interactive controls for each approved reference.
- Cross-checked visible interfaces against indexable page content where consent layers or embedded tools limited inspection.
- Classified the Immonation baseline as `present`, `partial`, or `missing`. A placeholder or static claim is `partial`, not `present`.
- Kept external integrations out of the implementation scope. They are still recorded so the product boundary remains explicit.
- Left the reference-purpose interpretation open where the user's original reason could reasonably mean different things.

## User-confirmed reference roles

Confirmed on 2026-07-19:

| Reference | Intended role for Immonation |
| --- | --- |
| ImmoPartner | Content and SEO only. Its conversion tools and digital-service ecosystem are not part of the reference reason. |
| DAHLER | Property-offer search, especially location and postal-code search. |
| Engel & Völkers | Content plus real-estate-agent recruiting. |
| VON OTTO | The homepage's `Premium-Vermarktung` presentation: style, design, and language. |
| VON POLL | AI assistant only. The broader digital-service platform is not part of the reference reason. |
| Evernest | Categorized guide and knowledge-hub structure. |
| Immowelt | Interactive heatmap only. The wider local price-page architecture is not part of the reference reason. |
| Königskinder | Secondary, general content reference; it must not drive the primary content architecture. |
| Enora Immobilien | Customer videos only. Reviews, statistics, and sold-property presentation are not part of the reference reason. |

## Immonation baseline

### Present

- Bilingual German and English routing, metadata, JSON-LD helpers, sitemap infrastructure, and localized navigation.
- Seller-first homepage, service overview, process presentation, property-valuation page, FAQ, contact, buyer, careers, downloads, referrer, blog, and service routes.
- Existing design system, responsive navigation, reusable page templates, and initial media sections.

### Partial

- Property valuation: content and a simple form exist, but the confirmed multi-step wizard is not implemented.
- Listings: attractive static cards exist, but they use placeholder content and remote stock imagery rather than production inventory.
- References: three homepage cards exist, but there is no reference content model, overview route, detail route, or approved source data.
- Reviews and testimonials: static sections and supplied source candidates exist, but live/reviewed publication data and rights approval are incomplete.
- Booking: a contact call-to-action exists, but there is no booking flow.
- 360-degree marketing: the benefit is described, but the site does not demonstrate a complete approved property experience.
- Guides and downloads: routes exist, but the content library is minimal and approved source downloads have not been published.
- Careers: a generic resource page exists, but employee and self-employed sales-partner journeys are not separated.

### Missing

- Local market/location content system, price-history modules, glossary, structured reference case studies, filtered reference inventory, advanced property search, property detail pages, sold-property archive, and content-category hubs.
- Owner portal/tracking, AI assistant, live review providers, market-data providers, search-profile delivery, and other external-service capabilities. These remain explicitly outside implementation scope.

## 1. ImmoPartner

Primary source: <https://www.immopartner.de/>

Relevant source journeys:

- <https://www.immopartner.de/eigentuemer/verkaufen/haus/kaeuferfinder/>
- <https://www.immopartner.de/eigentuemer/verkaufen/objekttracking/>
- <https://www.immopartner.de/unternehmen/referenzobjekte/>
- <https://www.immopartner.de/eigentuemer/immobilienpreise/preisatlas/>
- <https://www.immopartner.de/immobilienpreise/nuernberg/>

Observed features:

- Intent-heavy navigation for owners, price research, buyers, renters, and company proof.
- Separate seller pages for houses, apartments, land, and apartment buildings.
- Local price pages for Nürnberg, Fürth, and Erlangen plus district-oriented market content.
- Embedded price atlas, with an address-led market-value experience.
- Buyer finder using property type, location, area, price expectation, property notes, and contact data.
- OnOffice-backed owner tracking portal.
- Filtered reference inventory by property type, purchase/rent, text fields, and sorting.
- Online valuation, consultation booking, Matterport demonstration, seller guide, blog, FAQs, awards, and public review stream.

Immonation comparison:

- `Partial`: intent navigation, valuation, seller services, FAQ, guide route, 360-degree messaging, review section, and reference teaser.
- `Missing`: local price pages, buyer finder, owner tracking, price atlas, filtered reference archive, real consultation flow, and real reference pages.
- `External boundary`: owner tracking, market data, scheduling, live reviews, and CRM-connected buyer matching.

Reference-purpose decision: content and SEO only. Conversion tools, price atlas, buyer finder, owner tracking, review feeds, and scheduling remain observations but are outside this reference role.

## 2. DAHLER

Primary source: <https://www.dahlercompany.com/de>

Relevant source journeys:

- <https://www.dahlercompany.com/de/immobiliensuche>
- <https://www.dahlercompany.com/de/immobilienbewertung>
- <https://www.dahlercompany.com/de/immobilienpreise>
- <https://www.dahlercompany.com/de/immobilienwissen>
- <https://www.dahlercompany.com/de/immobilie-kaufen/suchprofil-anlegen>

Observed features:

- Curated premium homepage with current listings, a single property highlight, regional price entry, and four simple task choices.
- Property search with location/object-ID input, property type, price, living area, rooms, expandable filters, and reset behavior.
- Saved-search profile and off-market positioning.
- Three valuation modes: online, video appointment, and in-person assessment.
- Valuation-process explanation, benefits, proof, customer quotation, and extensive FAQ.
- Regional property-price content, expert-location discovery, property knowledge hub, reports, and newsletter.

Immonation comparison:

- `Partial`: buyer cards, valuation content, process sections, premium editorial direction, and contact paths.
- `Missing`: functional search/filter experience, property details, saved search, valuation-mode choice, local price pages, and a developed knowledge hub.
- `External boundary`: inventory feed, saved-search delivery, online valuation calculation, video scheduling, market data, and third-party review aggregation.

Reference-purpose decision: property-offer search, particularly location and postal-code search. Saved profiles, off-market positioning, valuation modes, and DAHLER's broader content ecosystem are outside this reference role.

## 3. Engel & Völkers

Primary source: <https://www.engelvoelkers.com/de/de>

Relevant source journeys:

- <https://www.engelvoelkers.com/de/de/immobilienmakler-werden>
- <https://www.engelvoelkers.com/de/de/verkauf/immobilienbewertung>
- <https://www.engelvoelkers.com/de/de/ressourcen/verkaeufer>
- <https://www.engelvoelkers.com/de/de/ressourcen/kaeufer>
- <https://www.engelvoelkers.com/de/de/ressourcen/makler>

Observed features:

- Search mode choice for buying, renting, or AI-assisted search plus location and property type.
- Search results with filters, radius, sorting, favorites, map mode, count, and regional landing content.
- Dedicated buyer guide, seller guide, broker-career guide, budget calculator, financing, valuation, price, and market-report entries.
- Local city pages combining current inventory, local expertise, services, market indicators, guides, and contact.
- Recruiting page built around benefits, academy/training, tools, earnings, candidate profile, FAQs, and local opportunity discovery.
- Lifestyle magazine and newsletter as brand/content layers.

Immonation comparison:

- `Partial`: buyer/seller route separation, valuation, guides, careers, and regional positioning.
- `Missing`: complete search results, local city templates, separate recruiting journeys, candidate profile, recruiting FAQs, and career content hub.
- `External boundary`: AI search, inventory/favorites, budget/finance calculators, newsletter delivery, and market reports driven by proprietary data.

Reference-purpose decision: content and real-estate-agent recruiting. The recruiting analysis covers page content, benefits, candidate profile, training, FAQs, and journey structure; broader corporate/platform features are not the reason for this reference.

## 4. VON OTTO

Primary source: <https://von-otto.de/>

Relevant source journeys:

- <https://von-otto.de/immobilien>
- <https://von-otto.de/bewertung>
- <https://von-otto.de/karriere>
- <https://von-otto.de/blog/virtual-staging-zukunft>

Observed features:

- Seller-first premium positioning supported by concrete marketing deliverables rather than only brand adjectives.
- Modular marketing-package explanation: photography, drone imagery, virtual staging, 3D tours, social-media marketing, multi-platform distribution, 3D floor plans, and professional exposés.
- Before/after property-presentation examples.
- Process/system explanation with clear team responsibilities and buyer qualification.
- Team profiles, property videos, selected-property showcase, reviews, awards, location pages, FAQs, and a marketing-focused blog.
- Property inventory embedded from a CRM provider.

Immonation comparison:

- `Partial`: 360-degree promise, videos, process, partner/team proof, property cards, valuation, FAQs, and social-media sections.
- `Missing`: structured marketing-package page, before/after proof, approved property showcase, real property details, and evidence-led presentation examples.
- `External boundary`: CRM inventory embed, live reviews, scheduling, and multi-platform publishing.

Reference-purpose decision: the homepage `Premium-Vermarktung` section, specifically its style, design, language, and concrete presentation of marketing deliverables.

## 5. VON POLL

Primary source: <https://www.von-poll.com/de>

Relevant source journeys:

- <https://www.von-poll.com/de/immobilien-preisatlas>
- <https://www.von-poll.com/de/unternehmen/marktberichte>
- <https://www.von-poll.com/de/tech-blog/immobilienfragen-der-ki-assistent-von-von-poll-immobilien-hat-die-antwort>
- <https://www.von-poll.com/de/virtueller-shop>

Observed features:

- Task-based digital service architecture for evaluating, selling, buying, financing, managing, and renovating.
- Search with a dedicated AI mode and a separate conventional mode.
- Customer account surfaces for saved search, financing, valuation updates, and related services.
- Valuation paths by property type, sale simulator, search profile, financing calculation/certificate, management, and renovation services.
- Embedded price atlas, market reports, magazine, multiple blogs, academy, online appointment, and third-party review proof.
- AI assistant covering valuation, sale, purchase, finance, energy/renovation, and management, with escalation to experts.

Immonation comparison:

- `Partial`: task-oriented navigation, valuation, service pages, FAQs, and the documented Immonation Assistant concept.
- `Missing`: assistant UI, conventional/AI search modes, customer account, sale simulator, price atlas, market report system, and digital-service dashboard.
- `External boundary`: all assistant behavior, accounts, market data, calculations, certificates, booking, and third-party review data.

Reference-purpose decision: AI assistant only. Search modes, accounts, simulators, finance, management, renovation, price atlas, and the broader digital-service platform are outside this reference role.

## 6. Evernest

Primary source: <https://www.evernest.com/de/>

Relevant source journeys:

- <https://www.evernest.com/de/ratgeber/>
- <https://www.evernest.com/de/ratgeber/immobilienbewertung/>
- <https://www.evernest.com/de/musterdokumente/>
- <https://www.evernest.com/de/unsere-makler/>
- <https://www.evernest.com/de/karriere/>

Observed features:

- Address-first valuation entry and three prominent service choices: valuation, listings, and search profile.
- Current and sold listings together, plus a separately branded premium selection.
- Search-profile lead capture, value-tracking promise, and repeated valuation entry points.
- Benefits framed as modern marketing, technology, and personal local advice.
- Location directory, franchise route, employee route, job filtering, FAQs, and newsletter.
- Large categorized knowledge hub covering selling, buying, valuation, brokers, prices, financing, energy, and career topics.
- Musterdokumente/download library connected to the knowledge hub.

Immonation comparison:

- `Partial`: address/property valuation concept, buyer cards, sold references, guide route, downloads, careers, FAQs, and local positioning.
- `Missing`: content taxonomy, category hubs, meaningful article library, approved downloads, sold/current inventory integration, separate employee/partner funnels, and job data model.
- `External boundary`: valuation calculation, inventory/search delivery, newsletter delivery, value tracking, and job provider integration.

Reference-purpose interpretation: sufficiently clear. Evernest is the knowledge-hub, content-taxonomy, and guide discoverability reference.

## 7. Immowelt

Primary source: <https://www.immowelt.de/immobilienpreise/deutschland>

Representative local source: <https://www.immowelt.de/immobilienpreise/bayern/nurnberg-90402/ad08de7633>

Observed features:

- Address/place search leading into a hierarchical location page system.
- Purchase/rent and house/apartment switching.
- Current average, minimum, and maximum square-metre prices with an accuracy indicator and data timestamp.
- Methodology disclosure explaining the market-trend calculation.
- Historical annual price development and year-over-year changes.
- Nearby districts/locations, parent-region navigation, and deep internal linking.
- Price map and online valuation/calculator entry points.

Immonation comparison:

- `Missing`: all price-data interfaces, local history tables, methodology pages, nearby-district comparison, and hierarchical market pages.
- `External boundary`: interactive heatmap, address autocomplete, calculated estimates, and refreshed market datasets.

Reference-purpose decision: interactive heatmap only. Price-page copy, history tables, nearby-district comparisons, and the broader SEO architecture are outside this reference role.

## 8. Königskinder

Primary source: <https://koenigskinder.de/>

Relevant source journeys:

- <https://koenigskinder.de/service/>
- <https://koenigskinder.de/service/fuer-verkaeufer/>
- <https://koenigskinder.de/service/immobilien-glossar/>
- <https://koenigskinder.de/service/immobilienatlas/>
- <https://koenigskinder.de/referenzen/>

Observed features:

- Full property search directly on the homepage: transaction type, use type, property type, location, radius, object ID, area, rooms, rent, and purchase price.
- Four clear service routes for buying, valuation, selling, and financing.
- Seller process with preparation, valuation, presentation, buyer selection, document procurement, floor plans, area calculation, energy certificate, viewings, contract coordination, and handover.
- Broad specialist content: seller/landlord services, glossary, property atlas, anonymous sale, premium-property sale, direct purchase, partial sale, and company sale.
- Reference inventory, location pages, statistics, customer reviews, and newsletter.

Immonation comparison:

- `Partial`: service tracks, valuation, seller process, buyer page, references, financing copy, statistics, reviews, and location ambitions.
- `Missing`: glossary, property atlas, functional advanced search, specialist seller-content taxonomy, approved reference inventory, and detailed local pages.
- `External boundary`: production inventory, valuation provider, newsletter, finance products, and market atlas data.

Reference-purpose decision: secondary general content reference. Königskinder may supply comparison ideas, but must not determine the primary content taxonomy or introduce unconfirmed services.

## 9. Enora Immobilien

Primary source: <https://www.enora-immobilien.de/>

Relevant source journeys:

- <https://www.enora-immobilien.de/verkaufen/>
- <https://www.enora-immobilien.de/kostenlose-wertermittlung/>
- <https://www.enora-immobilien.de/immobilie-kaufen-in-schwabach-umgebung-enora-immobilien/#referenzen>

Observed features:

- Regional seller-first homepage with current inventory and a large sold-property archive.
- Three named customer-story video modules covering seller and buyer experiences.
- Local-expertise and proof section supported by concrete marketing services.
- Dedicated website for each property and strong use of professional property videos.
- Valuation entry, customer rating/statistics, sold properties, FAQs, and local SEO copy.
- Consent-aware video placeholders before external media loads.

Immonation comparison:

- `Partial`: regional positioning, video sections, reviews, reference cards, valuation, FAQs, property marketing narrative, and supplied testimonial/reference assets.
- `Missing`: approved named video stories, full sold-property archive, property-detail pages, and dedicated property-presentation examples.
- `External boundary`: YouTube/video provider, maps, production inventory, live reviews, and valuation processing.

Reference-purpose decision: named customer videos only. Review scores, quotations, sold-property proof, valuation, and broader local SEO patterns are outside this reference role.

## Cross-site feature families

The observations normalize into these feature families:

1. Seller conversion and valuation.
2. Marketing-service proof.
3. References, sold properties, and customer stories.
4. Buyer listings, filters, and search profiles.
5. Local market and property-price content.
6. Guides, glossary, downloads, and content taxonomy.
7. Careers, employees, and self-employed partner recruiting.
8. Reviews, awards, statistics, and trust proof.
9. AI assistance, accounts, tracking, and other digital services.

The one-to-one disposition map in `docs/reference-feature-dispositions.csv` assigns every matrix row to `include`, `defer`, or `reject` according to these confirmed roles. The consolidated recommendation is in `docs/reference-feature-backlog.md` and remains behind the required user approval gate.
