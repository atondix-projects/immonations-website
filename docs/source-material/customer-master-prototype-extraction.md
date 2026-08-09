# Customer master prototype — feature extraction

Status: source audit, not an approved implementation specification  
Reviewed: 2026-08-08  
Source: `C:\Users\andreas\Downloads\Immonation_Master_Prototyp.html`  
Source size: 934,028 bytes  
Source SHA-256: `638DD8D790DEE659A624178EEC2F24AD686B107D2FDCDF66D86A91F3D8D354A4`

## Purpose and reading rule

The customer prototype is not a structural or visual reference for the production website. It is useful as a dense collection of feature, content, proof, conversion, and integration ideas. This document extracts those ideas and separates:

- concepts worth adopting;
- concepts worth adapting to the confirmed Immonation product and design system;
- concepts that depend on verified data, consent, legal review, or third-party systems;
- demo shortcuts and unsupported claims that must not reach production.

The prototype contains internal notes, placeholders, illustrative calculations, personal names, transaction data, awards, ratings, and service claims. Nothing in the file is publication approval by itself.

## Executive assessment

The prototype's best contribution is its **proof architecture**, not its page structure or styling. It repeatedly turns broad marketing promises into concrete evidence and useful next steps:

1. notarized transactions instead of vague sales-volume claims;
2. case studies structured as starting point, challenge, result, and customer voice;
3. real transaction corridors instead of pretending that one average price fits every property;
4. a dedicated Tippgeber journey instead of hiding referrals inside the contact page;
5. listing lifecycle continuity: active property → sold state → permanent archive/reference;
6. contextual “what next?” links that connect research pages to the valuation funnel;
7. service explanations that show why an operational detail matters to the sale, especially floor-area measurement and bank-ready documents;
8. consent-gated third-party media with a clear explanation before data is transferred.

The prototype is broad but not production-ready. It mixes verified-looking content with explicit placeholders, uses a one-step demo valuation formula, proposes systems that are not currently available, and sometimes contradicts confirmed project decisions. Its ideas should therefore enter the backlog as individually sourced candidates, never as a wholesale blueprint.

## Complete surface inventory

The file implements one JavaScript single-page prototype with 47 route-like renderers and a client-side router. The inventory below is exhaustive at the renderer level.

### Primary journeys

| Prototype renderer | Concept represented | Useful takeaway |
| --- | --- | --- |
| `home` | Seller-first homepage | Strong proof modules, valuation CTA, buyer exit, service overview, process, local proof, reviews, contact |
| `verkaufen` | Main seller page | Ten-step sale process plus routes for special circumstances |
| `bewertung` | Online valuation | Immediate orientation followed by a personal on-site valuation |
| `angebote` | Property inventory | Location/type/price/room filters and CRM-fed cards |
| `objekt` | Property detail | Gallery, virtual tour, facts, energy data, viewing and financing CTAs |
| `suchkunden` | Active buyer profiles | Seller-facing proof that a fitting buyer may already exist |
| `finanzierung` | Financing | Embedded calculators and a clear bridge back to listings |
| `termin` | Appointment booking | Self-service slot selection connected to the operating calendar |
| `kontakt` | Contact | Phone, email, WhatsApp, office hours, booking, directions, map |

### Seller services and situations

| Prototype renderer | Concept represented | Useful takeaway |
| --- | --- | --- |
| `objektart` | Property-type seller pages | Tailored risks, required documents, process, FAQ, situational links |
| `nischen` | Situational seller hub | Sensitive entry points for life events and complex sales |
| `nische` | Situational seller detail | Situation-specific help, caveats, FAQs, valuation and confidential consultation |
| `wohnflaeche` | Floor area and plans | Turns an operational capability into a financial and financing benefit |
| `virtuell` | 360° viewing | Time saving, prequalification, tracking, and privacy framing |
| `staging` | Visual staging | Before/after storytelling for empty, dated, or cluttered properties |
| `video` | Property video | Film, vertical social edits, emotional presentation, reach |
| `social` | Social distribution | Platform-specific media roles, with consent implications called out |

### Trust, proof, and company

| Prototype renderer | Concept represented | Useful takeaway |
| --- | --- | --- |
| `referenzen` | Narrative references | Starting point → challenge → result → customer quote → KPIs |
| `verkauft` | Sold-property archive | Anonymized, filterable evidence of transactions by place and year |
| `marktdaten` | Transaction-derived market analysis | Real closing-price corridors, transparent samples, factors behind spread |
| `bewertungen` | Review credibility page | Review-source links and editorial education on evaluating credibility |
| `kundenstimmen` | Testimonial library | Individual, source-linked review excerpts |
| `stimme` | Testimonial detail | Indexable long-form review, source link, contextual CTA |
| `auszeichnungen` | Awards and credentials | Issuer, year, explanation, evidence link, rights/privacy warning |
| `ueber` | Company profile | Independence, regional identity, proof counters, credentials |
| `gruppe` | Company group | Clear explanation of roles across related entities |
| `engagement` | Local/social engagement | Local sponsorship and community proof rather than generic CSR copy |

### Knowledge and local discovery

| Prototype renderer | Concept represented | Useful takeaway |
| --- | --- | --- |
| `markt` | Regional market overview | City-level entry points, source/date requirement, valuation caveat |
| `staedte` | City and district index | Scalable local discovery and internal-link structure |
| `stadt` | City detail | Local intro, data, selected transactions, FAQ, valuation CTA |
| `stadtteil` | District detail | Local answer, nearby links, local proof or honest no-data fallback |
| `bodenrichtwert` | Land-value guide | Official-source framing and explanation of why guideline value is not sale price |
| `lexikon` | A–Z glossary | Letter filtering, plain-language definitions, internal-link potential |
| `news` | Guide/news hub | Separate evergreen advice from company/news content |
| `faq` | FAQ hub | Grouped questions designed for snippets and answer engines |
| `downloads` | Document library | Checklists and forms as useful lead assets |
| `anfahrt` | Directions and opening hours | Car, transit, bicycle, accessibility, parking, map, appointment path |

### Recruiting, partner, referral, and product concepts

| Prototype renderer | Concept represented | Useful takeaway |
| --- | --- | --- |
| `karriere` | Employee recruiting | Benefits, tools, training, direct application |
| `partner` | Independent sales partners | Separate partner model, quality requirements, legal boundary |
| `tippgeber` | Referrer network | Dedicated intake and confirmation instead of generic contact |
| `kundenbereich` | Owner portal | Status, documents, powers of attorney, keys, tours, messages |
| `ki` | Immonation-Assistent | Questions, routing, property matching, valuation/financing orientation |

### Utility and legal surfaces

| Prototype renderer | Concept represented | Useful takeaway |
| --- | --- | --- |
| `agb` | Terms | Structured legal content |
| `impressum` | Imprint | Required company information |
| `datenschutz` | Privacy | Processing purposes, third parties, consent, rights |
| `seo` | Internal SEO inventory | Useful only as planning material; never expose publicly |
| `sitemap` | Human-readable sitemap | Full route discovery and information-architecture QA |

## High-value ideas to adopt or adapt

### 1. Tippgeber as a real conversion funnel

This is the clearest underdeveloped opportunity in the current site.

At extraction time, the production route already had the right positioning—“Empfehlen und profitieren”—but ended in a generic contact CTA. The implementation described at the end of this document has since turned it into a dedicated intake. The customer prototype contributed three useful ideas:

- choose the recommended property's object type;
- collect the referrer's own contact/address data;
- send an automatic confirmation after submission.

The prototype also says that a property street is not required. That is a useful privacy and friction-reduction instinct, but the proposed form is still incomplete and legally ambiguous.

#### Recommended production funnel

1. **Explain eligibility before the form.** State what counts as a new, attributable referral, when a fee can arise, exclusions, and that no payout is guaranteed merely for submitting a contact.
2. **Capture the referrer first.** Name, email, telephone, postal address if contract/tax processing genuinely requires it, preferred contact channel, and confirmation that the details are their own.
3. **Capture the tip without unnecessary personal data.** Property type, approximate location/postcode, relationship to the owner, what indicates selling intent, timing, and an optional note. Do not require a precise street at the first step.
4. **Handle the owner's data lawfully.** The safest initial pattern is a consent-based introduction: the referrer confirms that the owner has agreed to be contacted, or sends the owner a shareable Immonation link so the owner submits their own data. Legal/privacy review must decide the production pattern.
5. **Confirm and track.** Send the referrer a receipt with a reference number, next steps, and no unverified payout promise. Internally record attribution, status, duplicate check, owner consent status, contact attempts, successful mandate, closing, and payout eligibility.
6. **Provide a status path later.** Start with transactional email updates; only build a dashboard if operating volume justifies authentication and support costs.

#### Claims that must be verified before use

The prototype states “around 18 active referrers” and “€2,000–€8,000 annual referrer commission.” These are proposals until the client supplies dated evidence and legal approval. The project source material separately says a 20% commission claim is public-usable, but it is not clear that this applies to Tippgeber rather than independent sales partners. Do not combine those claims.

#### Recommended component boundary

Build a project-owned `ReferrerIntake` composition from existing form primitives. It should support:

- conditional property fields;
- step progress;
- accessible validation and error summary;
- consent/privacy acknowledgement;
- loading, duplicate, success, and retry states;
- bilingual transactional copy;
- Resend delivery now and a replaceable persistence/CRM adapter later;
- spam protection and rate limiting;
- server-side event logging without exposing referred-person data to analytics.

### 2. Proof from notarized outcomes

The “Beurkundet, nicht behauptet” idea is memorable and strategically aligned with the brand principle “trust before effect.” It uses a physical proof object—folders of notarized closing documents—to make transaction experience tangible.

Adaptation rules:

- use an original photo/video with all personal and contractual details unreadable;
- show a dated evidence statement and explain the sample or counting method;
- never imply public access to confidential contracts;
- reconcile annual sales and volume claims across every route before publication;
- prefer an evidence narrative over decorative counters.

### 3. Transaction corridors instead of false precision

The market-data concept correctly explains that asking prices and closed prices are different and that a single average can mislead. The strongest version is:

- show a range for a defined property type, area, and period;
- disclose that it is a selected sample if it is not the full population;
- show sample size and last updated date;
- explain the variables that move an object within the range;
- route to an individual valuation rather than present the range as a valuation.

This is potentially a major trust and local-SEO asset, but only after the transaction dataset is normalized, anonymized, legally cleared, and checked for statistical usefulness. Small samples must not be dressed up as market-wide truth.

### 4. Listing lifecycle continuity

The prototype explicitly recommends not deleting a property detail after sale. The better lifecycle is:

`active listing → reserved/sold state → permanent sold archive → optional full case study`

Benefits:

- preserves backlinks and indexed URLs;
- builds a visible track record;
- lets local pages link to genuine nearby experience;
- avoids dead links after CRM inventory changes;
- creates a natural bridge from buyer content to seller proof.

Production needs stable OnOffice identifiers, status mapping, canonical URLs, a retention/privacy policy, and a content rule for what remains public after sale. A sold page should remove stale viewing CTAs and replace them with valuation or similar-property actions.

### 5. Case studies with an evidence grammar

The prototype's repeatable story structure is excellent:

- Ausgangslage;
- Herausforderung;
- Strategie or action taken;
- Ergebnis;
- customer quote;
- a small set of meaningful KPIs.

The current project already has reference routes and a content model, so this should enrich that system rather than create a second one. Every field needs per-case approval. Exact price uplift, timing, names, portraits, object photos, and quotes must each have source and consent metadata.

### 6. Contextual “Wie geht es weiter?” navigation

The prototype defines route-specific next-step cards rather than showing the same CTA band everywhere. This is worth adapting as a reusable content pattern:

- a research page can offer valuation, local proof, and consultation;
- a listing can offer financing, viewing, and virtual tour;
- a review page can offer full stories, references, and valuation;
- a service page can offer the next operational step.

Keep this to two or three relevant choices. It should reinforce the seller-first journey without turning each footer into a navigation dump.

### 7. Floor-area service framed as risk prevention

The prototype does more than advertise measurement. It explains the chain:

`uncertain area or unusable plan → bank questions → delay → changing financing conditions → buyer risk`

That causal explanation is valuable and is already substantially implemented in the current floor-plans route. Keep the production version evidence-based and avoid universal claims such as “banks always require” or “almost every second property is wrong” unless documented.

### 8. Consent-gated embeds

The two-click embed pattern is sound:

- provider label;
- what the visitor will load;
- why it is useful;
- explicit load button;
- notice that data is transferred;
- iframe only after consent.

The project already has consent-aware video and tour components. Extend the same model to Calendly, maps, review widgets, financing tools, and social media where required. The provider, purpose, policy link, consent category, revoke behavior, and fallback link must be consistent.

### 9. Honest local-page fallback

The district renderer has a useful split: show real local transactions when data exists; otherwise show a helpful valuation block instead of fabricating local evidence. This is the right anti-thin-content rule. Local pages should be indexable only when they have a unique local answer, verified evidence, useful FAQ, and meaningful internal links.

### 10. Human-readable glossary and grouped FAQ

The A–Z filter and grouped FAQ are good discovery tools, especially when each answer is concise, server-rendered, source-aware, and internally linked to a service or local page. Avoid creating hundreds of near-empty term routes purely for search traffic.

## Interaction and component patterns worth preserving

These patterns are useful independently of the prototype's visual language:

| Pattern | Keep | Production adjustment |
| --- | --- | --- |
| Seller/buyer intent split | Yes | Preserve the confirmed seller priority and current audience switch |
| Sticky header | Yes | Keep navigation smaller than the prototype's four large mega menus |
| Contextual next-step cards | Yes | Two or three choices, content-driven and bilingual |
| Progressive valuation | Yes | Use the existing multi-step wizard; discard the demo formula |
| Listing filters | Yes | Use confirmed fields and OnOffice API, accessible labels and reset state |
| Sold status | Yes | Use the design system's hard-edged status treatment, not prototype pills |
| FAQ disclosure | Yes | Server-render answers, keyboard semantics, FAQ schema where eligible |
| A–Z filter | Maybe | Only after enough glossary content exists; preserve URL/search usability |
| Animated counters | Sparingly | Respect reduced motion and never use animation to imply verification |
| Scroll progress | Usually no | Adds little to short marketing pages; consider only for long guides |
| Reveal-on-scroll | Sparingly | Keep content visible without JavaScript and avoid repetitive entrance motion |
| Hover lift/zoom | Adapt | Use restrained motion consistent with the current hard-edge design system |
| Dashboard preview | Defer | Do not market a portal before the service and data model exist |

## Feature disposition and current-project comparison

| Candidate | Prototype | Current project | Disposition | Main dependency/risk |
| --- | --- | --- | --- | --- |
| Tippgeber intake | One-card form concept | Dedicated consent-aware form and Resend endpoint implemented | **Implemented MVP** | Final legal model, production Resend configuration, durable rate limiting/persistence |
| Tippgeber status updates | Mentioned via confirmation | Missing | **Adapt, P2** | Operating workflow; start with email, not portal |
| Notarized-proof story | Reusable proof band | General trust proof exists | **Adopt, P1** | Original media, redaction, consistent verified counts |
| Transaction price corridors | Detailed demo | No approved live-price system | **Defer pending data** | Sample quality, privacy, methodology, annual updates |
| Sold archive | Detailed tables | Reference overview/details exist | **Adapt, P1/P2** | OnOffice history, consent, stable URLs, status rules |
| Reference evidence grammar | Strong | Reference content model exists | **Adopt incrementally** | Per-field approval and source metadata |
| Active buyer profiles | Static examples | Network claim/content exists | **Adapt carefully** | Fresh CRM data; avoid fabricated or identifiable profiles |
| Buyer property search | Functional demo | Buyer page exists, listings integration pending | **Adopt in launch scope** | OnOffice API, filters, pagination, zero states |
| Personal owner portal | Detailed preview | Missing | **Defer** | Auth, OnOffice portal, document security, support burden |
| Immonation-Assistent | Static concept | Confirmed product requirement | **Keep planned** | Knowledge, guardrails, privacy, escalation, CRM boundary |
| Appointment booking | onOffice onPointment concept | Calendly is confirmed | **Reject implementation choice** | Use Calendly unless product decision changes |
| Demo instant valuation | Hard-coded €4,200/m² formula | Real multi-step wizard exists | **Reject** | False precision and unsupported output |
| PriceHubble valuation embed | Proposed | Not confirmed | **Defer/reject** | Vendor, consent, cost, data provenance |
| Dr. Klein calculators | Live embed concept | Financing route planned | **Adapt after confirmation** | Partnership wording, embed rights, consent, accessibility |
| Ogulo 360° tour | Consent-gated example | Consent-aware tour component exists | **Keep pattern** | Approved tour and provider terms |
| Live social feeds | Proposed embeds | Social video components exist | **Prefer self-hosted/linked media** | Tracking, consent, performance, platform fragility |
| Review-source directory | Ten providers | Review modules exist | **Adapt selectively** | Current values, source links, rights, no “verified customer” claim |
| Individual review pages | Proposed at large scale | Review content exists, no review route model | **Defer** | Rights, duplication/thin content, export availability |
| Awards directory | Detailed | Awards section exists | **Adapt after evidence** | Naming, methodology, logo license, expiry/year |
| Local city/district data | Many generated pages | Locations system exists without fake prices | **Keep current safer model** | Verified sources and unique content before numeric claims |
| Land-value guide | Detailed | Route currently in progress | **Reuse content ideas only** | Official dated sources and claim review |
| Human sitemap | Proposed | XML sitemap exists | **Low priority** | Only useful if IA becomes difficult to discover |
| Internal SEO page | Publicly routable in demo | SEO docs exist | **Reject publicly** | Internal strategy must remain documentation |

## Claims and content that require a hard stop before publication

The following prototype statements look authoritative but are not publication-ready merely because they appear in the file:

- 4.9 stars and 223 Google reviews, plus a conflicting 224 in one next-step card;
- “more than 300 reviews across portals”;
- 60+ sales per year and €30 million notarized volume per year;
- around 18 active referrers and €2,000–€8,000 annual referrer commission;
- individual reference results such as six weeks, 6% above market value, two weeks without listing, or full asking price;
- active buyer budgets and criteria;
- all city, district, land-value, trend, and transaction figures;
- “typically 6–12 weeks” sale duration;
- “almost every second property” advertised with the wrong floor area;
- specific bank requirements stated as universal rules;
- award names, years, methodologies, and seal usage;
- Dr. Klein partnership scope and “top conditions” wording;
- “every object receives” video or 360° services;
- exact qualifications, protected professional titles, and service responsibility descriptions;
- opening hours, travel times, accessibility, and parking information;
- statements about group-company roles and coverage of the full property lifecycle.

Every production claim should have a source, owner, checked-at date, geographic/temporal scope, and approval status. Where the prototype contains a placeholder or bracketed number, production should omit the claim rather than visually soften it.

## Technical and privacy observations

### Useful technical thinking

- The prototype prefers OnOffice API-backed native pages over an iframe for design control and SEO.
- It identifies stable property details and a sold archive as an SEO continuity mechanism.
- It calls out `RealEstateListing` structured data for property pages.
- It treats third-party embeds as inactive until the visitor chooses to load them.
- It includes reduced-motion handling and responsive layout fallbacks.
- It recognizes that object type should affect form fields and document requirements.

### Production gaps

- The entire prototype is client-rendered and injects large HTML strings, so it is not an implementation model for the Next.js App Router site.
- User-facing strings are German-only and hard-coded.
- Form buttons do not provide a complete submission, validation, error, retry, or persistence flow.
- Several labels are not programmatically associated with their inputs.
- The valuation result is a hard-coded demonstration and must never be used.
- Authentication, document upload, and the owner dashboard are visual simulations only.
- External embeds need vendor-specific consent categories, fallbacks, accessibility checks, and legal text.
- Inline styles, custom CSS, rounded-card styling, and the Inter-only type system conflict with the current Tailwind v4 design system and should not be copied.
- The large mega-navigation exposes far more choices than the confirmed primary navigation and would weaken the seller journey.

## Recommended backlog

### P0 — preserve as requirements and evidence work

- Treat all prototype data and claims as unverified until added to the existing source/approval system.
- Reconcile the review count and the annual sales/volume figures across source documents.
- Confirm the Tippgeber commercial model, attribution rules, privacy basis, payout trigger, exclusions, and responsible operator.
- Confirm whether the referred owner must opt in before Immonation receives their contact details.
- Define the OnOffice status lifecycle and whether historical sold listings are available.

### P1 — highest-value product work

- Replace the `/referrers` generic contact CTA with a dedicated bilingual Tippgeber intake flow.
- Add a privacy-safe automatic confirmation and internal attribution record for Tippgeber submissions.
- Introduce the notarized-proof story using approved original media and reconciled figures.
- Enrich the existing reference model with evidence grammar and field-level approval metadata.
- Define stable listing URLs and active/reserved/sold transitions for the OnOffice integration.
- Add contextual next-step data to the existing page/template system rather than hard-code per route.

### P2 — after data and integration foundations

- Build the anonymized sold archive and connect it to local pages and references.
- Publish transaction corridors only where the sample and methodology are defensible.
- Add fresh, non-identifying active-buyer profiles sourced from OnOffice, with expiry dates.
- Expand the glossary and grouped FAQ only where they solve genuine user questions.
- Add Tippgeber status emails; assess whether a login is still necessary after observing volume.

### P3 — defer until business value is proven

- Authenticated owner dashboard and document exchange.
- Individual indexable pages for every review.
- Live social feeds.
- Additional third-party valuation or market-data platforms.
- A public human-readable sitemap.

## What not to carry over

- the prototype's information architecture or route count as a target;
- its rounded-card visual style, Inter typography, hover-heavy motion, or inline CSS;
- bracketed placeholder values or demo transaction figures;
- the hard-coded valuation formula;
- the assumption that every proposed OnOffice module exists or should replace confirmed tools;
- the onPointment booking choice while Calendly remains confirmed;
- a classic self-managed buyer search profile as a primary feature;
- public internal notes, SEO strategy, placeholder warnings, or implementation instructions;
- claims that all public reviews are “verified customers”;
- a portal or AI feature marketed before its real scope, privacy model, and operational ownership exist.

## Source traceability

Important source regions in the prototype:

| Lines | Content |
| --- | --- |
| 319–915 | Content datasets: cities, references, reviews, situations, awards, glossary, listings, transactions, market samples |
| 916–960 | Large intent-based navigation map |
| 974–1024 | Contextual “Wie geht es weiter?” journey map |
| 1027–1740 | Main, service, company, resource, referral, portal, assistant, booking, contact, and legal renderers |
| 1740–2002 | Property-type, land-value, glossary, reviews, listing detail, sold archive, and transaction-market renderers |
| 2003–2047 | Page titles, consent-gated embeds, notarized-proof module |
| 2049–2126 | Listing filters, demo valuation, animation, navigation, and client-side routing logic |

This extraction should be used alongside `PRODUCT.md`, `DESIGN.md`, `docs/requirements-decisions.md`, `docs/site-structure.md`, the existing reference-feature audit, and the customer-file approval records. Where they conflict, confirmed product decisions and verified source records win.

## Implementation note

Implemented on 2026-08-08:

- the generic `/referrers` resource page was replaced with a dedicated bilingual Tippgeber journey;
- the intake captures the referrer's own details and broad property context but explicitly excludes owner contact data and exact address;
- owner awareness/consent and privacy acknowledgement are required;
- `/api/referrals` validates submissions, includes a honeypot and a basic request-rate guard, sends an internal Resend notification, and attempts an automatic confirmation to the referrer;
- FAQPage structured data and explicit eligibility/fee caveats were added;
- production email delivery remains inactive until the Resend environment values in `.env.example` are configured.
