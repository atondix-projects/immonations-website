# Goal: Build and verify the Immonation conversion prototype

## Outcome

Implement the decision-locked, premium-editorial Immonation frontend prototype defined in `docs/plans/2026-07-22-conversion-prototype-design.md`. Complete the full P0 backlog and the P1 backlog where it does not endanger P0 quality, then obtain final visual approval from Andreas.

The finished prototype must be seller-first, responsive on desktop/tablet/mobile, complete in German, professionally adapted in English for the core journey, populated from the normalized customer material, and convincingly interactive without backend functionality.

## Audience and destination

- Primary audience: homeowners considering a sale in the Metropolregion Nürnberg.
- Secondary audiences: buyers, prospective agents, referrers, and knowledge-seeking visitors.
- Destination: the existing Next.js 16 application in this repository.
- Final visual approver: Andreas.

## Canonical inputs

1. `docs/plans/2026-07-22-conversion-prototype-design.md`
2. `docs/plans/conversion-prototype/master-backlog.md`
3. `docs/plans/conversion-prototype/task-board.csv`
4. `docs/plans/conversion-prototype/two-week-board.md`
5. `docs/plans/conversion-prototype/design-checklist.md`
6. `docs/plans/conversion-prototype/content-claims-checklist.md`
7. `docs/plans/conversion-prototype/rights-assets-checklist.md`
8. `docs/plans/conversion-prototype/qa-checklist.md`
9. `docs/plans/conversion-prototype/post-prototype-checklist.md`
10. `docs/source-material/customer-files/` and its inventories, normalized documents, transcriptions, references, and page-structure records
11. `PRODUCT.md`, `AGENTS.md`, and `CLAUDE.md`

The latest explicit user decisions in the design brief override older planning assumptions where they conflict.

## Baseline

- The repository already has a bilingual Next.js 16 App Router foundation, routes, content, SEO helpers, a partial design system, and prior feature work.
- Customer-provided DOCX/PDF/media sources are normalized and machine-readable under `docs/source-material/customer-files/`.
- The prototype backlog contains 36 tasks: 30 P0 and 6 P1. At activation, only F01 is ready and the remaining tasks are dependency-blocked.
- The worktree contains pre-existing user and prior-goal changes. Preserve them and do not stage, commit, push, deploy, publish, or discard them.

## Binding scope

### Core routes

- Homepage
- Sell hub
- House, apartment, and apartment-building seller pages
- Valuation wizard and prototype thank-you page
- Sales process
- References hub and all available reference detail pages
- FAQ
- Contact
- Imprint and privacy pages

### Supporting routes

- Buyer overview with realistic sample listings
- Services overview and existing service detail pages
- Locations hub only
- About, careers, referrers, downloads, blog/magazine, and existing articles

### Prototype behavior

- Valuation is a complete local-state flow and transmits nothing.
- Contact and cookie UI are visual only and do not claim submission or stored consent.
- Sample listings and search controls cannot be mistaken for live inventory.
- The existing Calendly URL is the only approved real conversion link.
- No backend, CRM, database, email, authentication, listing feed, analytics, AI assistant, heatmap, or consent storage is added.

## Visual and content constraints

- Premium-editorial direction: warm white, selective charcoal, restrained Immonation blue, serif display plus sans body, architecture-led supplied imagery, flat panels, fine borders, minimal radius/shadow, and restrained motion.
- Seller-first information hierarchy and the homepage sequence in the design brief are binding.
- Avoid generic real-estate templates, portal clutter, stock-smile luxury language, AI prominence, decorative dashboards, and competitor imitation.
- Display prototype values consistently: 4.9/5 with 220+ Google reviews, 60+ annual sales, €30 million annual volume, and 8,000+ buyers.
- Use all four developed customer stories and all available reference detail pages. Reference locations stop at city or district.
- Never present synthetic/generated media as documentary customer evidence.
- Prototype display permission is not public-release clearance; keep claims, rights, privacy, awards, partners, and legal follow-ups visible in the post-prototype checklist.

## Repository constraints

- Read the relevant local Next.js 16 guide in `node_modules/next/dist/docs/` before changing affected APIs or conventions.
- Use Tailwind CSS v4 utilities and `@theme` tokens; do not add a Tailwind config, CSS Modules, component CSS, or runtime CSS-in-JS.
- Compose project-specific UI in `src/components/site/`; do not hand-edit generated `src/components/ui/` primitives.
- Use next-intl routing and repository SEO helpers for localized routes.
- Preserve unrelated dirty-worktree changes.

## Primary verifier

The machine-readable task board reconciles every P0 item to an implemented artifact and recorded verification result, and an automated route/browser audit of all selected routes shows:

1. every route is reachable in its intended locale;
2. core German and English journeys render without runtime or console errors;
3. representative mobile, tablet, and desktop viewports have no horizontal overflow or blocked content;
4. valuation completes entirely in browser state and makes no backend request;
5. sample listing/contact/cookie behaviors cannot imply live functionality;
6. all available reference detail pages are discoverable;
7. the final visual approval gate is resolved by Andreas.

The verifier must be able to fail. A route, task, checklist item, or visual gate may not be marked complete merely because code exists.

## Supporting checks

- `pnpm typecheck` passes.
- `pnpm lint` passes.
- `pnpm build` passes.
- `git diff --check` passes for authored changes.
- Browser console has no new errors or hydration warnings.
- Keyboard navigation, focus visibility, headings, form labels/errors, image alternatives, contrast, and reduced-motion behavior pass the P0 QA checklist.
- Translation structure and core journey coverage reconcile across German and English.
- Metadata, JSON-LD, localized routing, sitemap registration, and internal links follow repository rules on changed routes.
- Asset usage maps to the normalized source inventory; prototype-only rights/claim status remains documented.
- Existing unrelated changes remain unstaged and preserved.

## Iteration loop

1. Read the current goal state, worklog, task board, applicable project instructions, and the next task's source material.
2. Inspect the existing implementation and record a keep/replace/defer decision before rewriting it.
3. Implement one dependency-ready vertical slice, using shared foundations before multiplying page variants.
4. Run the smallest relevant static and browser checks for that slice.
5. If a check fails, diagnose the cause, make one meaningful correction, and rerun it.
6. Update `task-board.csv` and `WORKLOG.md` with changed paths, evidence, failures, and the next dependency-ready action.
7. At the end of each workstream, run its checklist and reconcile unfinished items.
8. After all P0 work, run the full clean verification suite, capture representative screenshots, and request final visual approval.
9. Resolve the bounded approval revision list, rerun affected checks, and write `RESULT.md`.

## Anti-cheating rules

- Do not weaken tests, TypeScript strictness, lint rules, accessibility requirements, routing coverage, or the primary verifier.
- Do not mark tasks done without implementation paths and verification evidence.
- Do not narrow the selected route set, omit reference pages, or call partial English complete to satisfy the board.
- Do not replace required behavior with screenshots, static mockups, or controls that falsely appear functional.
- Do not add hidden backend calls, placeholder integrations, fabricated reviews, invented claims, exact private addresses, or synthetic customer proof.
- Do not copy competitor text, imagery, branding, or distinctive layouts.
- Do not consume P0 time on P2 features.
- Do not change prototype-approved content decisions without recording the conflict and obtaining approval when the finish line would change.

## Approval gates

Separate user approval is required for:

- final visual acceptance or the bounded visual revision list;
- consequential scope changes or removal of a selected P0 route;
- use of an uncertain customer identity, synthetic portrait as proof, unapproved partner/award asset, or material outside its documented rights boundary;
- any backend, external integration beyond the existing Calendly link, purchase, credential, account, upload, public message, deployment, publication, staging, commit, push, or destructive Git action.

Routine local implementation, local browser testing, and reversible edits within the approved prototype scope do not need an extra approval.

## Blocker standard

A blocker exists only when the same external condition has recurred for at least three consecutive goal turns, no safe dependency-independent work remains, and the smallest required user or external action is known. A failed build, difficult design problem, missing individual asset, or uncertain implementation is not a blocker while another safe fix or backlog lane remains.

## Completion proof

Before marking the goal complete, `RESULT.md` must include:

- reconciliation of all 30 P0 and 6 P1 tasks, with every non-completed P1 explicitly deferred and justified;
- changed-file map by workstream;
- route inventory and bilingual coverage result;
- representative desktop, tablet, and mobile screenshot paths for the homepage, valuation, a seller page, references hub/detail, and buyer sample state;
- browser-flow evidence for seller → valuation, seller → process, references discovery, buyer sample behavior, keyboard use, reduced motion, and no-backend network behavior;
- final outputs for typecheck, lint, build, translation/route reconciliation, and `git diff --check`;
- completed P0 design, content, asset, and QA checklists;
- documented post-prototype production items that remain intentionally open;
- Andreas's final visual approval record;
- final `git status --short` showing unrelated changes preserved and no staging, commit, push, deployment, or publication.
