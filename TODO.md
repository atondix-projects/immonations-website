# Outstanding work

Last audited: 2026-09-03.

This is the only active project TODO. Add new work here only after confirming that it is not
already implemented. Source records under `docs/source-material/` may describe historical gaps or
publication gates; they are evidence, not parallel backlogs.

Current baseline (2026-09-03): format check, lint, typecheck, all 88 unit tests, and the
production build (396 static pages) pass.

> **Environment note.** The direct dependencies were pruned out of `node_modules` mid-session
> while transitive packages remained, breaking `next build` with `Cannot find module 'react'`.
> `npm install` restored them. Root cause is a package-manager split: `CLAUDE.md` specifies
> pnpm, but the repo tracks `package-lock.json` and no `pnpm-lock.yaml`, so a pnpm invocation
> treats the npm-installed tree as extraneous and prunes it. Pick one manager and commit its
> lockfile, or this recurs.

The repository ships a complete bilingual prototype, but it is not production-cleared while the
items below remain open.

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
  - [x] **Uganda donation photos — written releases filed 2026-09-03.** All seven photos under
    `public/images/engagement/` render on `/engagement` and in both articles.
  - [x] **TSV Zirndorf sponsorship media — written releases filed 2026-09-03.** Covers both
    athletes' likeness (including Amelie Giese as a minor), Marcus Grun's on-camera statement,
    and both films, for the public site in DE + EN.
  - [x] **TSV videos — audio reviewed 2026-09-03.** Nothing said in either film contradicts the
    confidentiality agreement or the claims on the page.
  - [ ] **Objektvideo Wörnitzstraße — confirm the location precision.** The 38 s property tour on
    `/social` (`public/videos/property-tours/nuernberg-woernitzstrasse.mp4`) carries a burnt-in
    title card naming Großreuth bei Schweinau, and the house number is briefly legible in the
    opening shot. The reference record publishes at `city-area`, and the page copy stays at
    "Nürnberg". Confirm the seller approves the clip as it stands, or request a re-cut.
- [ ] Confirm the Dr. Klein relationship and allowed wording/linking; confirm the employee versus
  independent-agent model, current vacancies, referral terms, and any secondary buyer-search offer.
- [x] Complete legal review of imprint, privacy, terms, cookies, forms, tracking, financing,
  commission/tax/energy-certificate language, downloads, awards, and sensitive seller guidance.
  Approved 2026-09-03.

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

The machinery for these landed on 2026-09-03. What remains under each item is the part only a
person can close. Run `python scripts/content-governance-report.py` for the current list.

- [x] Establish content owners, review cadence, source links, checked-at dates, and expiry rules.
  `src/lib/content/provenance.ts` holds the typed `Provenance` record and the `CLAIM_REGISTRY`;
  `tests/contracts/provenance.test.ts` asserts the fields are present and coherent — deliberately
  not that a claim is true, so honest gaps stay recorded instead of being papered over.
  - [ ] **Assign real owners.** Four claims still read `owner: 'unassigned'` /
    `state: 'unverified'` — buyer network, annual sales, transaction volume, and the
    "fast jede zweite Immobilie" floor-area statistic. All four belong to the open P0
    numeric-claims reconciliation above.
- [x] Validate local city/district content; noindex or consolidate thin/duplicated pages.
  The 103 district pages were already `noindex` and stay so. The five city hub pages remain
  indexed by decision — only their per-city context and focuses are hand-written, so they are
  recorded as `provisional` under `locations:city-hubs` rather than pulled from the index.
  `isRouteNoindex()` is now the single path from the route catalog to the robots tag; the
  district route and the generic catalog route previously branched on different fields.
  - [ ] **Write real local content** for the five city hubs so the templated sections go away.
- [x] Replace provisional ground-value and price-atlas data with dated sources and visible
  methodology. `/land-value` no longer ships its internal to-do note or "Entwurf" badges to
  visitors, `/market` no longer calls its own figures "aus dem Prototyp", and the previously
  dead `MarketCity.source` field now renders. All four data pages carry a shared
  `<DataProvenance>` block with `Stand: September 2026` and a named source.
- [x] Provide captions, text alternatives, and AI labels. `VideoDialog` renders
  `<track kind="captions">`, and every registry behind a video with sound (testimonials, TSV,
  bell, presentation, notary) carries an optional `captions` field that is passed at the call
  site — so a supplied WebVTT file renders with no code change. Alt text was already systematic,
  and AI visualizations were already labelled with the label baked into the image.
  - [ ] **Supply WebVTT caption files** for the 14 videos that carry an audio track (measured
    with ffprobe, not assumed — the AI-visualization clips and the 18 sold-property clips are
    silent and need none). This is the WCAG 1.2.2 gap.
  - [ ] **Full transcripts are only half-wired.** `VideoDialog` has the disclosure and the
    `VideoDialog.transcript` label in both locales, but no registry carries transcript *text*
    yet, so nothing renders it. Add a `transcript` field alongside `captions` when the wording
    is available.
- [x] Measure which situational seller topics warrant distinct pages. The governance report
  compares the 12 situational routes against the article library; none is currently supported
  by an article.
  - [ ] **Write the articles**, and define news/newsletter ownership. `/magazine` is a static
    one-issue flipbook with no cadence or owner, and there is no newsletter anywhere in `src/`.
  - [ ] **Give articles a per-person byline** — all eight currently say "Immonation Redaktion" /
    "Immonation Editorial".
- [x] Reconcile the source asset manifest with `assets/media-library/`. The governance report
  checks every curated destination; all 104 are present on this checkout.
  - [ ] **Archive the library durably.** `assets/` is gitignored, so a fresh clone has the
    manifest but not the files and `scripts/verify-ek-source-assets.py` cannot reproduce the
    hash check. Choosing that location is an open decision.

## P2 — product decisions (taken 2026-09-03)

All four were decided on 2026-09-03. They are now scoped work, not open questions. None should
start before the P0 blockers they depend on are closed.

- [ ] **Build the Immonation Assistant, full version with lead capture.** Answers grounded in the
  approved corpus only (FAQ registries, the 77-entry glossary, catalog pages, `llms-full.txt`),
  with an explicit refusal boundary outside it, plus qualification and routing into the existing
  valuation and contact flows.
  - Depends on the same P0 gaps as the valuation form: consent evidence, retention policy,
    failure recovery, notification ownership, and a response SLA. Do not ship lead capture
    before those exist — it would create a second unowned lead path.
  - Still needs defining: escalation to a human, and who owns answer quality.
- [ ] **Build the market heatmap, gated on a sample threshold.** Render only districts whose
  sample count clears a stated minimum; grey out the rest and name the threshold on the page,
  consistent with the price atlas's existing "Dünne Datenlage wird benannt" methodology card.
  - Label the greyed-out districts explicitly as *no data*, not as *no market* — an unlabelled
    gap on a map reads as the latter.
  - Reassess coverage once OnOffice inventory lands (P0); the current 38–85 samples per district
    are first-party only.
- [ ] **Email-based saved searches. No accounts.** Alerts by email with no login, no password
  storage, no account recovery, no session security. Explicitly rules out favorites and buyer
  profiles.
  - Needs a real submission and consent flow — the current download gate validates an address
    and transmits nothing (see P0). Reuse whatever that gap is closed with.
- [ ] **Give community content a full homepage section.** Same weight as the marketing and
  testimonial sections, drawing on `/engagement` (Uganda donation, TSV Zirndorf sponsorship —
  releases filed 2026-09-03).
  - Watch the conversion path: the homepage already runs long, so verify the valuation
    call-to-action is still reachable without excessive scrolling after this lands.
