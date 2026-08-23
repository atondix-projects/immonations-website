# Outstanding work

Last audited: 2026-08-23.

This is the only active project TODO. Add new work here only after confirming that it is not
already implemented. Source records under `docs/source-material/` may describe historical gaps or
publication gates; they are evidence, not parallel backlogs.

Current baseline: lint, typecheck, unit tests, and the production build pass. The repository ships a
complete bilingual prototype, but it is not production-cleared while the items below remain open.

## P0 — launch blockers

### Business, content, rights, and legal

- [ ] Verify the public business data: legal/contact details, the `info@immonations.de` address,
  office hours, directions, phone number, service area, and every production environment value.
- [ ] Reconcile and date every numerical claim, especially the Google rating/review count, 8,000+
  buyer network, 40 versus 60+ annual sales, 30 million euro transaction volume, marketing duration,
  and reference outcomes. Remove any claim that cannot be evidenced.
- [ ] Obtain written publication permission for every testimonial, review screenshot, customer or
  property image/video, sold-property case, partner logo, award, athlete/child image, and AI
  visualization. Record approved location precision and metrics per reference.
- [ ] Confirm the Dr. Klein relationship and allowed wording/linking; confirm the employee versus
  independent-agent model, current vacancies, referral terms, and any secondary buyer-search offer.
- [ ] Complete legal review of imprint, privacy, terms, cookies, forms, tracking, financing,
  commission/tax/energy-certificate language, downloads, awards, and sensitive seller guidance.

### Production data and conversions

- [ ] Integrate verified OnOffice inventory, media, availability states, filters, property details,
  inquiries, empty/error states, and a documented sample-to-live migration. Remove prototype/sample
  listings from indexable production output.
- [ ] Replace the local-only valuation completion with a secure submission flow, retention policy,
  consent evidence, failure recovery, notifications, ownership, and response SLA.
- [ ] Connect the contact form and download gate to approved destinations. The current contact form
  only simulates success, and the download gate validates an address without transmitting it.
- [ ] Configure and end-to-end test the referrer email flow with verified Resend sender/recipient
  values. Replace the process-local rate limiter with production-grade shared abuse protection and
  add endpoint tests for validation, origin checks, throttling, provider failure, and success.
- [ ] Add the approved Calendly flow, or remove booking promises if no production URL is approved.
- [ ] Implement a production consent platform before loading analytics or non-essential third-party
  content. Add the approved GA4/Meta measurement plan and verify consent withdrawal and blocking.

### Release engineering

- [ ] Add CI for format check, lint, typecheck, unit tests, production build, and the Playwright suite.
- [ ] Complete WCAG 2.2 AA review with keyboard, screen-reader, zoom, reduced-motion, and form-error
  checks; resolve all findings.
- [ ] Run production-like cross-browser/device regression and verify metadata, canonicals, hreflang,
  sitemap, robots, JSON-LD, OG images, redirects, broken links, and `llms.txt` outputs.
- [ ] Complete performance/Core Web Vitals work, especially the large video/image payloads; define
  CDN/transcoding/poster/lazy-load policies and performance budgets.
- [ ] Complete security/privacy review of the API and third parties, then add production logging,
  error tracking, uptime checks, alert ownership, backups/rollback, and incident procedures.
- [ ] Configure the production domain/environment, run a deployment smoke test, and obtain explicit
  content, legal, privacy, security, and launch approval before replacing the existing site.

## P1 — content and operational follow-through

- [ ] Establish content owners, review cadence, source links, checked-at dates, and expiry rules for
  claims, market data, legal guidance, listings, references, awards, reviews, and local pages.
- [ ] Validate local city/district content against official sources and real regional evidence;
  noindex or consolidate thin/duplicated pages before launch.
- [ ] Replace provisional ground-value and price-atlas data with dated official sources and a visible
  methodology, or keep those pages clearly non-authoritative/noindex.
- [ ] Publish only approved testimonial stories, review evidence, awards, handover downloads, and
  community/news material; provide transcripts, captions, text alternatives, and AI labels.
- [ ] Expand the small bilingual article library, define news/newsletter ownership, and measure which
  situational seller topics warrant distinct pages instead of overlapping thin content.
- [ ] Reconcile the source asset manifest with the unavailable offline `assets/media-library/`, or
  archive that library in an approved durable location so provenance checks can be reproduced.

## P2 — optional product decisions

- [ ] Decide whether the Immonation Assistant should be built; first define approved knowledge
  sources, answer boundaries, escalation, lead handling, privacy, and operational ownership.
- [ ] Decide whether reliable data justifies an interactive market heatmap or expanded price tools.
- [ ] Decide whether accounts, favorites, saved searches, or buyer profiles have enough value to
  justify authentication, data protection, support, and lifecycle costs.
- [ ] Decide whether community content deserves permanent homepage placement.
