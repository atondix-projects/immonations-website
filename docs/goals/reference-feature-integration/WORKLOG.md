# Reference feature integration worklog

## 2026-07-17

- Confirmed Goal mode with a research-to-approved-implementation finish line.
- Confirmed all nine named reference websites and deep public-journey auditing.
- Confirmed suitability filtering, one consolidated backlog approval gate, existing design/product constraints, bilingual implementation, comprehensive verification, and no Git or publication mutations.
- Excluded all external-service integrations and their mock equivalents.
- Set the confidence policy: proceed at 95%+, use an independent verification subagent at 85–94%, and ask the user below 85% or after unresolved verification.
- Preserved the completed archive-curation goal files at the repository root and created this goal in a separate durable directory.

Next: activate the goal, inventory the existing Immonation feature baseline, and build the audit evidence model before completing the nine-site review.

### Baseline and factual audit

- Inventoried the current routes, site components, content registries, translations, SEO routing, and curated source archive.
- Distinguished fully implemented capabilities from static copy and placeholders. Valuation, listings, references, reviews, booking, 360-degree proof, guides, downloads, and careers all have material partial-state gaps.
- Completed public feature observation across all nine approved reference sites, including relevant search, valuation, pricing, reference, guide, recruiting, testimonial, and digital-service journeys.
- Wrote the source-backed baseline and site-by-site findings to `docs/reference-feature-audit.md`, with direct URLs and explicit external-integration boundaries.
- Identified eight reference-purpose descriptions that could reasonably produce different recommendations. Asked the user to confirm the intended meaning before any disposition becomes an implementation decision.

Next: incorporate the user's intent clarifications, normalize the observations into the include/defer/reject feature matrix, and prepare the consolidated backlog approval gate.

### Coverage matrix

- Normalized the factual findings into `docs/reference-feature-matrix.csv`.
- The matrix contains 92 feature rows across all nine references: ImmoPartner 12, DAHLER 10, Engel & Völkers 11, VON OTTO 12, VON POLL 11, Evernest 11, Immowelt 8, Königskinder 9, and Enora Immobilien 8.
- Every row has a direct source URL, category, Immonation baseline state, implementation boundary, intent status, confidence score, and notes.
- Rows affected by ambiguous reference reasons remain `pending`; no include/defer/reject recommendation has been inferred.
- CSV parsing found zero missing required fields, and `git diff --check` passed for the authored audit artifacts.

Next: wait for the requested intent clarifications, then assign dispositions and build the consolidated approval backlog.

### Reference-purpose decisions and approval backlog

- Recorded the user's exact role for every ambiguous reference: ImmoPartner for content/SEO; DAHLER for PLZ-capable property search; Engel & Völkers for Makler-recruiting content only; VON OTTO for the homepage Premium-Vermarktung section; VON POLL for the AI assistant only; Immowelt for the heatmap only; Königskinder as a secondary content reference; and Enora for customer videos only. Evernest remains the primary knowledge-hub reference.
- Applied the 85–94% confidence rule to the three interpretation boundaries and commissioned an independent verification subagent. Its only unresolved question was whether Engel & Völkers meant general content or recruiting content; the user approved the recommended narrow recruiting-content reading.
- Added `docs/reference-feature-dispositions.csv`, keyed one-to-one to all 92 matrix IDs, with include/defer/reject status, priority, target journey, dependency/risk, and rationale.
- Added `docs/reference-feature-backlog.md` with four recommended implementation slices and explicit deferred/excluded work.
- Kept property search, AI assistant, heatmap, before/after proof, and customer-story videos outside current implementation until their real-data, integration, asset, or rights dependencies are resolved.

Next: present the consolidated backlog for explicit user approval. Do not change implementation code before that approval.

### Approval and implementation start

- The user approved the full recommended backlog with “lgtm” on 2026-07-19.
- Added an original bilingual homepage Premium-Vermarktung section using local video and substantiated Immonation service language.
- Added a bilingual seller hub and four property-type guides per locale for house, apartment, land, and apartment building.
- Added a bilingual regional hub and evergreen local pages for Zirndorf, Nürnberg, Fürth, and Erlangen without live-price claims.
- Added a dedicated bilingual Makler recruiting journey and linked it from the existing careers page.
- Upgraded the guide index into a category-led knowledge hub with contextual links, editorial guardrails, and FAQ schema.
- Registered new localized routes, sitemap entries, hreflang paths, navigation links, and AI-crawler references.

Next: format, typecheck, resolve implementation defects, then run the full verification suite and reconcile all approved IDs.

### Verification and defect loop

- `pnpm typecheck` passed after the initial implementation.
- `pnpm lint` passed with zero findings.
- Translation-shape verification found 23 matching top-level namespaces and zero missing DE/EN keys.
- `pnpm build` generated 59 static pages and passed compilation, TypeScript, page-data collection, and static generation.
- Desktop browser checks covered the German homepage and seller hub, an English seller detail, a German location detail, the English recruiting page, the German knowledge hub, and the German careers page. Each representative page had one H1, correct locale, canonical plus three hreflang links, expected JSON-LD, and no console warnings/errors.
- Mobile checks at 390 × 844 found two genuine overflow defects: timeline entrance transforms expanded the homepage document width, and the long German knowledge-hub heading exceeded the shared hero grid. Added horizontal containment to the timeline and shrink-safe, language-aware wrapping to the shared page hero.
- Rebuilt and rechecked: homepage, recruiting, seller hub, and German knowledge hub all have document width equal to viewport width. Premium CTAs are 44 px high; keyboard focus exposes a visible outline.
- Added `docs/reference-feature-implementation-map.csv` to map all 18 included audit IDs to repository files and evidence.

Next: run the final clean verification suite, update the result report, confirm dirty-work preservation, and complete the active goal only if every proof remains green.

### Final clean-state verification

- Final `pnpm typecheck`: passed.
- Final `pnpm lint`: passed with zero findings.
- Authored-file `prettier --check`: passed.
- Final `pnpm build`: passed and generated 59 static pages.
- Generated sitemap inspection confirmed localized seller, location, recruiting, and dynamic detail URLs with hreflang alternates.
- Final reconciliation: 92 matrix rows, 92 unique dispositions, 18 includes, 18 implementation-map rows, zero missing or unexpected IDs.
- Final translation reconciliation: 23 DE namespaces, 23 EN namespaces, zero missing structural paths.
- Final `git diff --check`: passed; only the repository's existing LF-to-CRLF warnings were emitted.
- Final status confirmed pre-existing documentation, source archive, scripts, root goal files, and `src/components/site/home/hero.tsx` remain present and unstaged. No commit, push, publication, deployment, upload, or external mutation occurred.

Result: every approved in-scope feature is implemented and verified; every selected but dependency-blocked feature remains explicitly deferred; all other audited observations retain documented rejection rationale.
