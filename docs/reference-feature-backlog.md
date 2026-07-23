# Reference feature implementation backlog

Status: approved in full by the user on 2026-07-19; implemented and verified.

This backlog translates the factual audit and the one-to-one disposition map into coherent Immonation work. It uses original design and copy, preserves the seller-first product direction, and excludes competitor assets, unverified claims, mock integrations, and external-service work.

## Recommended implementation set

### P1 — Homepage Premium-Vermarktung

Create one original, editorial homepage section inspired by the clarity and premium language of VON OTTO, integrated into the existing Immonation visual system.

- Lead with a concise premium-marketing promise connected to concrete deliverables.
- Present the substantiated Immonation capabilities: professional photography, video/expose, 360-degree presentation, virtual staging where appropriate, floor-plan/document preparation, and multi-channel distribution.
- Reuse only approved/local Immonation media and the existing local presentation video.
- Treat drone imagery as conditional copy: publish it only if the business confirms that service.
- Do not copy VON OTTO's text, arrangement, visual identity, or assets.
- Defer the before/after proof pattern until approved paired assets exist.

Source IDs: `VO-01`–`VO-07`; `VO-08` deferred.

### P1 — Seller content and local SEO architecture

Build a coherent bilingual content structure based primarily on ImmoPartner, with Königskinder used only as a secondary comparison.

- Create a seller content hub with clear paths for house, apartment, land, and apartment-building owners.
- Add original FAQs and internal links between seller guides, services, valuation, contact, and relevant knowledge articles.
- Add local SEO landing-page structure for Zirndorf, Nürnberg, Fürth, and Erlangen.
- Keep local pages useful through evergreen process, property-type, and service information.
- Do not publish live prices, market statistics, rankings, or other current claims without an approved data source.
- Keep property valuation as the primary conversion action.

Source IDs: `IMP-01`, `IMP-02`, `IMP-03`, `IMP-12`; Königskinder rows are supporting references only.

### P1 — Dedicated Makler recruiting journey

Create a bilingual recruiting page for prospective real-estate agents, separate from the generic employee-careers narrative but linked from the existing careers page.

Recommended route:

- German: `/de/immobilienmakler-werden`
- English: `/en/become-a-real-estate-agent`

Content modules:

- role proposition and responsibilities;
- substantiated benefits, enablement, tools, and training;
- candidate profile and transparent expectations;
- a static recruiting FAQ;
- a direct application/contact CTA using the existing internal contact path.

Remuneration, lead volume, training, territory, and support claims must match approved Immonation facts. No external job feed or applicant platform is included.

Source IDs: `EV-05`, `EV-08`, `EV-09`, and the static FAQ portion of `EV-10`.

### P1/P2 — Knowledge hub and connected downloads

Upgrade the current guides area into a bilingual, category-led knowledge hub, then connect approved downloads to relevant topics.

- Define a compact taxonomy covering selling, buying, valuation, property types, local knowledge, financing/energy where content exists, and careers.
- Improve guide discovery with category navigation and contextual internal links.
- Add an FAQ block to the hub using existing project components.
- Connect only real, reviewed, accessible download files; empty categories or fabricated documents are not allowed.
- Keep newsletter functionality excluded.

Source IDs: `EVE-09`, `EVE-10`, and the FAQ portion of `EVE-11`.

## Explicitly deferred

These selected ideas remain in the audited roadmap but are not part of the current implementation completion criteria:

| Reference | Selected feature | Reason for defer |
|---|---|---|
| DAHLER | PLZ/location/object-ID property search and filters | Requires approved real listing data and filter facets; mock inventory is prohibited. |
| VON OTTO | Before/after presentation proof | Requires approved paired Immonation assets and rights. |
| VON POLL | AI assistant | External AI integrations are explicitly excluded. |
| Immowelt | Interactive property-price heatmap | Requires an approved market-data provider and map functionality. |
| Enora | Named customer-story videos | Available candidates still require written rights/claim approval and web-ready transcoding; external embeds are excluded. |

## Rejected scope

All other audited features are rejected for this goal because they fall outside the user-confirmed reference reason, conflict with the seller-first/local product direction, introduce unconfirmed services, require excluded integrations, or duplicate work better justified by a primary reference. The exact decision for every audited row is recorded in `docs/reference-feature-dispositions.csv`.

## Implementation rules after approval

- Both German and English must be complete.
- New routes receive localized pathnames, metadata, JSON-LD where appropriate, sitemap registration, internal links, and `llms.txt` updates.
- Original Immonation language and design only; no competitor copy or protected assets.
- No source-archive asset or testimonial is published without its documented approval gate.
- No mock listing search, mock heatmap, mock AI assistant, or other imitation of an excluded integration.
- Responsive, keyboard, focus, reduced-motion, contrast, typecheck, lint, build, browser-flow, and diff checks are required before completion.

## Approval record

The user approved the full recommended implementation set with “lgtm” on 2026-07-19. Deferred and rejected items remain outside the implementation completion criteria.
