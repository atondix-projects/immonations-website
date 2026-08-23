# Safe prototype content parity — implementation handoff

**Status:** approved scope, ready for implementation  
**Prepared:** 2026-08-23  
**Source prototype:** `Immonation_Master_Prototyp.html`  
**Primary outcome:** replace the most misleading or empty public content shells with substantive bilingual content, beginning with the glossary and reference stories, without publishing unverified prototype claims or building provider-dependent products.

## 1. Start here

Before editing:

1. Read `AGENTS.md` and `CLAUDE.md` completely.
2. Read these version-matched Next.js 16 guides:
   - `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`
   - `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`
   - `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md`
   - `node_modules/next/dist/docs/01-app/02-guides/json-ld.md`
   - `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md`
3. Inspect the current worktree. Preserve unrelated user changes.
4. Treat the prototype as a content lead, not as publication approval.

The project is Next.js 16 App Router, React 19, strict TypeScript, next-intl v4, and Tailwind CSS v4. Do not introduce a Tailwind config, CSS Modules, component CSS, or hand-edited `src/components/ui/*` files.

## 2. Why this pass exists

The route catalog creates an impression of near-complete parity with the master prototype, but 22 public routes are currently backed by the generic `createCatalogPage()` shell. The shell supplies a hero, one answer paragraph, three cards whose bodies may be boilerplate, two generic FAQs, and a CTA.

The clearest example is `/de/lexikon`:

- it is routed and marked published;
- it promises 77 definitions;
- it renders zero definitions and no A–Z navigation;
- the prototype already contains 77 German source entries.

The current route catalog also labels all published shell pages as `contentStatus: 'substantive'`, even where content is not substantive. Do not rely on that field as proof of parity.

## 3. Approved implementation scope

### 3.1 Required: real bilingual glossary

Replace the generic glossary route with a dedicated implementation.

Deliver:

- all 77 terms from the prototype as a typed content collection;
- reviewed German wording and natural English adaptations;
- one canonical route family: `/de/lexikon` and `/en/glossary`;
- all entries present in the initial server-rendered HTML;
- an accessible client-side A–Z filter that hides/shows already-rendered entries;
- an “All/Alle” control and disabled presentation for letters without terms;
- counts derived from the collection, never hard-coded in page copy;
- metadata, canonical, hreflang, breadcrumb JSON-LD, and an `ItemList` or `DefinedTermSet`-appropriate schema using existing JSON-LD conventions;
- contextual links only where a stable route genuinely matches the term;
- a useful no-JavaScript reading order grouped alphabetically.

Recommended files:

- `src/content/glossary/entries.ts` — typed bilingual data;
- `src/lib/content/glossary.ts` — selectors/grouping only if needed;
- `src/components/site/glossary/glossary-filter.tsx` — the small client boundary;
- `src/app/[locale]/glossary/page.tsx` — server route, metadata and schema.

Do not create one thin route per term in this pass. Do not copy legal or financing statements blindly: review absolutes, statutory percentages, “usual” market values, deadlines, and bank requirements before publication. Prefer durable explanations over date-sensitive claims.

Prototype sources:

- glossary data starts near line 664 of `Immonation_Master_Prototyp.html`;
- prototype renderer starts near line 2319.

### 3.2 Required: publish the existing reference stories

The repository already contains 15 reference records in `src/lib/content/references.ts`, including:

- requests;
- viewings;
- duration;
- result;
- challenge;
- approach;
- optional approved review evidence.

Those fields are currently unused by the UI. `ReferenceGallery` links every card back to `/references`, so users cannot reach a story.

Deliver:

- a canonical dynamic route at `src/app/[locale]/references/[slug]/page.tsx`;
- a pathname entry for `/references/[slug]` with German `/referenzen/[slug]` and English `/references/[slug]`;
- route-catalog records and static params for all 15 reference IDs;
- metadata and hreflang using the route record;
- breadcrumb plus an appropriate page/article/item JSON-LD representation;
- page content showing image, privacy-safe type/location, challenge, approach and CTA;
- KPI output only for fields already present in `REFERENCE_DETAILS` and allowed by the current prototype content policy;
- review block only when the record contains review data;
- source screenshot and source context where supplied;
- previous/next or back-to-overview navigation;
- gallery cards linking to the detail route;
- overview `ItemList` URLs matching real routes.

Reuse `PageHero`, `CtaBand`, existing reference images, and Tailwind utilities. Do not invent street addresses, sale prices, dates, customer identities, quotes, or outcomes.

Important checks:

- Confirm whether `REFERENCE_DETAILS` metrics are still approved by the current content policy before rendering them. The 2026-07-22 prototype brief allows supplied reference metrics for prototype display, while earlier source audits treat many metrics as gated. If approval remains ambiguous, render challenge/approach/result only and keep numeric KPIs behind a single explicit content flag.
- Do not silently publish a metric merely because it exists in TypeScript.

### 3.3 Required: replace safe static boilerplate

The following pages do not require live providers or unapproved numeric datasets. Replace their generic fallback bodies with unique bilingual content and unique FAQs.

#### `/warnsignale-immobilienverkauf`

Publish nine concrete warning signs. Cover phantom buyers, unsupported asking prices, pressure to sign, unclear service scope, weak document review, lack of buyer qualification, opaque reporting, unverifiable reviews/awards, and premature fee promises. Keep the tone educational and non-defamatory. Do not name competitors.

#### `/nischen`

Turn the hub into a genuine index of the 12 existing situation guides. Each card must link to its localized detail route. Explain how value basis, authority, timing, documents and discretion change by situation. Keep the existing detail routes; improve repeated detail-page boilerplate only where the underlying seed supports a specific statement.

#### `/virtuell`

Explain capture, privacy/consent, buyer prequalification, remote viewing, accessibility fallback and the relationship to physical viewings. Reuse a verified self-hosted example if one exists; otherwise show an honest unavailable/demo state. Do not invent Ogulo access or tracking claims.

#### `/staging`

Explain physical versus digital staging, suitable property states, disclosure requirements, approval workflow and limits. Use before/after media only if the pair is demonstrably the same approved property. Otherwise omit comparison imagery.

#### `/video`

Explain concept, capture, edit variants, owner approval, distribution and how video complements photography, floor plans and 360° tours. Reuse only self-hosted, approved media.

#### `/social`

Explain channel roles and approval/consent boundaries without promising live feeds, exact reach or universal distribution. Prefer self-hosted examples and outbound links over tracking-heavy embeds.

#### `/gruppe`

Explain only verified group entities and their distinct roles. Source candidate names from the existing reference-hub plan and customer files, then reconcile them against current legal records before publication. Do not claim that four companies cover the full property lifecycle unless confirmed.

#### `/partner`

Explain the two cooperation-model concept, quality expectations, responsibilities, onboarding and contact path. Avoid compensation, territory, employment-status or legal-model claims unless sourced and approved.

#### `/engagement`

Use the existing TSV Zirndorf and Uganda source material only where the partner/project, relationship and media rights are documented. Explain what is supported and how; avoid vague impact numbers.

#### `/anfahrt`

Consolidate verified address, phone, appointment expectations, opening hours, parking, public transit, bicycle and accessibility information. Reuse `OfficeVisit` where appropriate. Do not publish travel times or accessibility claims without confirmation.

Implementation preference:

- Keep the routes as Server Components.
- For content that fits the existing template, enrich `CatalogPageContent` with explicit `sectionTexts`, FAQs and optional link/card data.
- When a page needs a real index, media, or structured sequence, replace its six-line `createCatalogPage()` route with a dedicated page.
- Remove generic fallback copy from every page included in this scope. It is acceptable to retain the fallback for provider-dependent preview pages outside this scope.

## 4. Explicitly out of scope

Do not build or imply completion of:

- live price atlas or heatmap;
- transaction-derived market data;
- filterable sold-property archive;
- AI assistant;
- appointment-provider integration;
- authenticated customer area;
- CRM/OnOffice listing integration;
- live buyer-profile matching;
- live review aggregation;
- new backend delivery for contact or valuation forms;
- individual glossary-term routes;
- public internal SEO strategy.

These routes may remain honest previews/reserved pages:

- `/preisatlas`;
- `/marktdaten`;
- `/markt`;
- `/verkauft`;
- `/ki`;
- `/termin`;
- `/kundenbereich`;
- `/seo`.

Do not convert preview language into a production claim.

## 5. Claims and source safety

The following prototype material must not be copied without a named source, owner, checked-at date and approval:

- 4.9 stars and 220/223/224 reviews;
- more than 300 reviews across providers;
- 60+ sales or €30 million annual volume;
- buyer-network size or active buyer budgets;
- referrer counts, commission ranges or payout claims;
- transaction prices and price corridors;
- city/district €/m² values and land-value ranges;
- “typically 6–12 weeks” or similar duration promises;
- “almost every second property” floor-area claims;
- universal bank requirements;
- award names, methodologies, years and logo rights;
- exact group-company responsibilities;
- exact office hours, parking, accessibility and travel times;
- universal “every property receives video/360°” promises.

When uncertain, omit the claim rather than weakening it with “approximately.”

## 6. Routing, SEO, AEO and GEO checklist

For every new or replaced route:

1. Use `buildMetadata`.
2. Use localized public paths from `PATHNAMES`/route catalog.
3. Emit `JsonLd` through the existing component, never a raw unescaped script.
4. Add breadcrumb schema and the page-appropriate schema.
5. Add FAQ schema only when the visible page renders the same eligible FAQs.
6. Register new static/dynamic routes in `src/lib/routing/route-catalog.ts`.
7. Ensure the sitemap receives the route from the canonical catalog rather than a duplicate list.
8. Add both German and English content in the same change.
9. Update `public/llms.txt` and `public/llms-full.txt` for the real glossary and reference detail system.
10. Check navigation descriptions and hard-coded counts. Derive the glossary count from data; fix any stale “77” or “45” labels only when appropriate.

For reference detail paths, add a new `PATHNAMES` key rather than constructing untyped arbitrary URLs. Use the typed localized `Link` from `@/i18n/navigation`.

## 7. Suggested implementation sequence

### Step 1 — baseline and contracts

- Run `pnpm typecheck`, `pnpm lint`, and the contract tests before editing.
- Record existing failures separately; do not mix unrelated fixes into this pass.
- Add/adjust route-catalog contract expectations for reference detail routes.

### Step 2 — glossary data and route

- Extract the 77 source terms.
- Review German wording for legal/financial absolutes.
- Add English adaptations.
- Build grouping/filter UI and page schema.
- Add tests for count, unique terms, bilingual completeness and alphabetical grouping.

### Step 3 — reference detail routes

- Add pathnames and route records.
- Implement static params, metadata and page.
- Point gallery cards and overview JSON-LD to real detail URLs.
- Test every detail route in both locales.

### Step 4 — static content pages

- Replace the ten approved shell pages in small related batches:
  1. warning signs and selling-situation hub;
  2. virtual tour, staging, video and social;
  3. group, partners, engagement and directions.
- Add unique content and FAQs; remove fallback dependence.

### Step 5 — discovery updates

- Update sitemap/catalog behavior, internal links, `llms.txt`, and `llms-full.txt`.
- Ensure no reserved/noindex route leaks into public discovery.

### Step 6 — verification

- Run all commands in section 10.
- Inspect representative German and English pages at mobile and desktop widths.
- Check console output, keyboard operation, no-JS glossary readability and localized links.

## 8. Tests to add or extend

### Contract tests

- Glossary has exactly 77 unique entries.
- Every entry has non-empty German and English term/definition fields.
- Glossary groups sort alphabetically using the intended locale behavior.
- Every reference detail has a route record for both locales.
- Every reference gallery item resolves to an existing detail record and route.
- Published scoped catalog pages have explicit section bodies rather than shared fallback text.
- Reserved routes remain excluded from the indexable route list.

### E2E checks

- `/de/lexikon` and `/en/glossary` render all entries before filtering.
- Selecting a letter changes visible entries and updates `aria-pressed` correctly.
- Keyboard users can operate every glossary filter.
- A reference card opens the matching detail page in both locales.
- Reference detail back link returns to the localized overview.
- Each rewritten static page has one H1, meaningful H2 structure and working CTA links.
- No scoped page contains prototype-only labels, empty placeholders or dead links.

### Visual checks

- Long German glossary terms do not overflow cards.
- English definitions remain readable at narrow widths.
- Reference KPI layout handles short and decimal durations.
- Review screenshots preserve aspect ratio and useful alternative text.
- Filter controls wrap cleanly without horizontal scrolling.

## 9. Acceptance criteria

The pass is complete when:

- `/de/lexikon` contains 77 real German entries and `/en/glossary` contains 77 English adaptations;
- all glossary entries are server-rendered and the A–Z filter is accessible;
- all 15 reference cards reach real localized detail pages;
- every published reference detail renders only approved fields and media;
- warning signs, selling situations hub, virtual viewing, staging, video, social, group, partners, engagement and directions no longer use generic fallback bodies;
- all new user-facing content exists in both locales;
- metadata, hreflang, JSON-LD, route catalog, sitemap and LLM discovery files agree;
- unverified prices, counts, awards, partner claims and office facts have not been introduced;
- typecheck, lint, contract tests, E2E checks and production build pass;
- no existing routes or unrelated user changes regress.

## 10. Verification commands

Run from the repository root:

```bash
pnpm typecheck
pnpm lint
pnpm exec vitest run tests/contracts
pnpm exec playwright test tests/e2e/navigation.spec.ts tests/e2e/catalog-crawl.spec.ts
pnpm build
```

If the full E2E suite is already reliable in the environment, also run:

```bash
pnpm exec playwright test
```

Do not claim completion if the production build or bilingual route crawl fails.

## 11. Existing files most relevant to the work

- `Immonation_Master_Prototyp.html`
- `docs/source-material/customer-master-prototype-extraction.md`
- `docs/source-material/content-findings.md`
- `docs/plans/2026-07-20-references-resource-hub-design.md`
- `docs/plans/2026-07-22-conversion-prototype-design.md`
- `docs/plans/conversion-prototype/content-claims-checklist.md`
- `src/content/catalog-pages.ts`
- `src/lib/content/catalog-page-route.tsx`
- `src/components/site/templates/catalog-page.tsx`
- `src/lib/content/references.ts`
- `src/components/site/references/reference-gallery.tsx`
- `src/app/[locale]/references/page.tsx`
- `src/i18n/pathnames.ts`
- `src/lib/routing/route-catalog.ts`
- `src/lib/seo/jsonld.ts`
- `src/lib/seo/metadata.ts`
- `src/app/sitemap.ts`
- `public/llms.txt`
- `public/llms-full.txt`
- `tests/contracts/route-catalog.test.ts`
- `tests/contracts/navigation.test.ts`
- `tests/e2e/catalog-crawl.spec.ts`

## 12. Known traps

- `params` is asynchronous in Next.js 16.
- The route catalog currently infers `contentStatus` from publication status; it does not measure actual depth.
- `ReferenceGallery` currently self-links to `/references`.
- `REFERENCE_DETAILS` contains richer fields than the UI but presence is not equivalent to publication approval.
- The prototype is German-only; English must be adapted, not mechanically translated.
- The prototype glossary includes legal and financing statements that may be time-sensitive.
- The generic catalog FAQ title is hard-coded as `FAQ`; this is acceptable in both languages, but all answers must match visible content and JSON-LD.
- Do not hand-edit registry-managed components in `src/components/ui/`.
- Do not expose the internal `/seo` page or prototype notes through sitemap, navigation or LLM discovery files.
- Do not create parallel German and English filesystem route trees. Use localized pathnames.

## 13. Handoff completion note

This document authorizes the safe static content pass only. It does not authorize live integrations, customer authentication, publication of unverified evidence, or a wholesale visual copy of the master prototype.
