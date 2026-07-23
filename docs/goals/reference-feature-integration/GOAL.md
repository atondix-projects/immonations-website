# Goal: Reference feature audit and integration

## Outcome

Audit the nine approved real-estate reference websites, convert their useful patterns into a source-backed Immonation feature backlog, obtain user approval for the consolidated backlog, and implement every approved in-scope feature in the bilingual Immonation website.

The approved reference set is:

1. ImmoPartner
2. DAHLER
3. Engel & Völkers
4. VON OTTO
5. VON POLL
6. Evernest
7. Immowelt
8. Königskinder
9. Enora Immobilien

## Baseline

- Immonation already has a bilingual Next.js 16 foundation, an established design system, seller-first navigation, static service and resource pages, a property-valuation page, a buyer page with placeholder listings, homepage trust sections, and preliminary reference-property cards.
- Several planned capabilities remain incomplete or use placeholders, including real reference pages, deeper local content, production listing data, live reviews, booking, and advanced tools.
- Prior planning documents name the nine sites as inspiration but do not contain a complete source-backed feature inventory, suitability assessment, approved backlog, or verified implementation.
- The worktree contains pre-existing user and completed-goal changes. They must be preserved and must not be staged, committed, pushed, published, or deployed.

## Binding product constraints

- Bilingual German and English output.
- Seller-first positioning with property valuation as the primary conversion.
- Local, personal, premium character rather than a corporate portal experience.
- Preserve the existing Immonation design system and translate suitable patterns into it.
- Tailwind CSS v4 utilities and existing project layering remain mandatory.
- AI remains secondary assistance, not the main product.
- Competitor content, branding, layouts, images, and protected assets must not be copied.
- Curated Immonation source-archive candidates may be used only with their documented provenance and legal, privacy, testimonial, or licensing gates intact.

## Scope

### Audit

Inspect relevant public homepages, subpages, navigation, tools, funnels, and interactive experiences. Extract:

- functional features and tools;
- page sections and reusable modules;
- conversion and lead-generation patterns;
- content and information architecture;
- SEO, AEO, GEO, and local-market structures;
- trust, review, testimonial, and proof patterns;
- relevant visual interaction patterns where they affect the feature.

For every extracted item, record its source, evidence, user value, Immonation baseline status, suitability, target journey/page, priority, dependencies, risks, and proposed disposition: include, defer, or reject.

### Approval gate

Present one consolidated, prioritized master backlog after the complete audit. Do not begin implementation until the user approves that backlog or an explicitly identified subset.

### Implementation

Implement every user-approved, in-scope item using the existing architecture and design system. Add both locales, metadata, structured data, sitemap/routing registration, internal links, accessibility behavior, and responsive behavior where applicable.

## Explicit non-goals

- No OnOffice, Calendly, Google Reviews, Maps, market-price provider, AI-assistant, or other external-service integrations.
- No mock implementations of excluded external integrations.
- No purchases, account creation, credential handling, external uploads, publishing, deployment, staging, commits, or pushes.
- No attempt to reproduce every competitor feature; unsuitable ideas must be documented and rejected.
- No wholesale visual redesign.

External integrations may be named as future dependencies or boundaries in the audit, but are excluded from implementation and completion criteria.

## Confidence and verification policy

- At 95–100% decision confidence, proceed autonomously.
- At 85–94% confidence, assign a bounded independent verification subagent to inspect the evidence and challenge the proposed decision. Proceed only if the verification resolves the uncertainty without changing the approved outcome.
- Below 85% confidence, or when verification remains conflicting, stop and ask the user before deciding.
- Never use a subagent to make consequential product choices on the user's behalf.

## Primary verifier

A traceable coverage matrix accounts for all nine reference websites and every material public feature found in the audited journeys. Each retained feature maps to either:

1. an approved implementation with identifiable repository files and verification evidence;
2. an approved defer decision with dependencies; or
3. a documented rejection with rationale.

No approved in-scope feature may remain without a disposition or implementation result.

## Supporting checks

- Every audit record includes a direct source URL and observation date.
- The consolidated backlog is explicitly approved before implementation.
- User-facing additions exist in both German and English.
- New public pages include metadata, appropriate JSON-LD, localized routing, sitemap coverage, and internal links.
- Responsive browser checks cover representative mobile and desktop sizes.
- Keyboard navigation, focus visibility, semantics, reduced motion, and WCAG AA-relevant contrast are checked for changed interfaces.
- `pnpm typecheck`, `pnpm lint`, and `pnpm build` pass without weakening configuration or suppressing failures.
- Relevant browser flows are exercised and recorded.
- `git diff --check` passes for authored changes.
- Pre-existing unrelated worktree changes remain preserved.

## Iteration loop

1. Inspect the current Immonation baseline and source archive relevant to the next feature category.
2. Audit a bounded set of reference journeys and capture source evidence.
3. Normalize duplicate patterns into feature candidates without losing provenance.
4. Compare candidates with the current product and classify include, defer, or reject.
5. Apply the confidence policy; use independent verification or ask the user when required.
6. Complete the consolidated master backlog and request approval.
7. After approval, implement one coherent feature slice at a time.
8. Run proportionate checks after each slice and the full verifier suite at the end.
9. Record evidence, remaining risks, and the next action in `WORKLOG.md`.

## Anti-cheating rules

- Do not narrow audited journeys merely to make coverage appear complete.
- Do not count an existing placeholder as an implemented feature.
- Do not weaken tests, lint rules, TypeScript settings, accessibility requirements, or build configuration.
- Do not substitute mock integrations for excluded external services.
- Do not copy competitor text, assets, branding, or distinctive layouts.
- Do not mark uncertain claims or source-archive material as approved merely because a file exists.
- Do not mark the goal complete before user backlog approval and implementation of the approved in-scope set.

## Approval gates

Separate user approval is required for:

- the consolidated implementation backlog;
- any decision below 85% confidence or unresolved after verification;
- any scope expansion into external integrations;
- use of assets or claims whose archive records require legal, privacy, testimonial, trademark, or licensing approval;
- staging, commits, pushes, deployment, publication, purchases, account changes, or external messages.

## Blocker standard

A blocker is an external condition that recurs for at least three consecutive goal turns and leaves no meaningful in-scope work. Record the exact condition, evidence, and smallest user or external action needed. Difficulty, a failed check, or an inaccessible individual reference page is not itself a blocker while alternative public evidence or other audit lanes remain.

## Completion proof

- Paths to the final source-backed audit, coverage matrix, approved backlog, implementation plan, worklog, and result report.
- The approval record for the implemented backlog.
- A reconciliation showing every material candidate as implemented, deferred, or rejected.
- A changed-file map connecting approved features to implementation.
- Passing output from typecheck, lint, production build, browser-flow checks, accessibility checks, bilingual/SEO checks, and `git diff --check`.
- Final `git status --short` confirming unrelated pre-existing changes remain preserved and no files were staged, committed, pushed, published, or deployed.
