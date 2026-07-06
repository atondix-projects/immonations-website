@AGENTS.md

# Immonation — Claude Code project guide

This file is the canonical, expanded guide for Claude Code. The short form lives in `AGENTS.md` (imported above). When the two ever disagree, **this file wins**.

## 1. What this project is

Immonation is a bilingual (German / English) marketing website for a real-estate advisory firm. The site is content-heavy by design: many sub-pages (services, blog posts, location pages) will land over time, and every one of them must ship SEO-, AEO-, and GEO-correct out of the gate.

- **SEO** — search engine crawlers (Google, Bing). Every page exposes canonical URL, hreflang alternates, OG tags, and at least one JSON-LD block.
- **AEO** — answer-engine optimization (Perplexity, Copilot, etc.). FAQ schema on service pages, `llms.txt` at the root, prose answers near the top of each page.
- **GEO** — generative-engine optimization (LLM-driven search). Same machinery as AEO; `llms-full.txt` is the long-form companion to `llms.txt`.

## 2. Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router, RSC) | Read `node_modules/next/dist/docs/` before assuming any API surface. |
| Language | TypeScript (strict, `noUncheckedIndexedAccess`) | `tsconfig.json` is tightened beyond `create-next-app` defaults. |
| Styling | Tailwind CSS v4 | **CSS-first config** in `src/app/globals.css` `@theme`. No `tailwind.config.ts`. |
| Primitives | shadcn/ui (Neutral, `base-nova` preset on Base UI) | `src/components/ui/*`. Generated. |
| Motion / visuals | Magic UI | Lives in `src/components/ui/*` alongside shadcn. Generated. |
| i18n | next-intl v4 | `localePrefix: 'always'`, `pathnames` table for localized URLs. |
| Long-form content | `next-mdx-remote/rsc` + `gray-matter` | MDX files live under `content/blog/{de,en}/`. |
| Pkg manager | pnpm | `pnpm-workspace.yaml` is scaffolded but the project is single-package. |

## 3. Directory map

```
src/
├── app/
│   ├── [locale]/                Locale-scoped routes (root layout lives here)
│   │   ├── layout.tsx           <html lang={locale}>, providers, header/footer
│   │   ├── page.tsx             Home (hero + marquee + features + stats)
│   │   ├── opengraph-image.tsx  Default per-locale OG image
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── services/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx  Canonical route — German URL is /de/leistungen/[slug] via pathnames
│   ├── sitemap.ts               Bilingual sitemap with hreflang
│   ├── robots.ts                References sitemap
│   └── globals.css              Tailwind v4 entry + @theme tokens + base layer
├── components/
│   ├── ui/                      shadcn + Magic UI (generated — do not edit)
│   └── site/                    Project components (header, footer, json-ld, locale-switcher)
├── content/
│   └── services/{de,en}/        Typed Service records (TSX-driven sub-pages)
├── i18n/
│   ├── routing.ts               defineRouting + pathnames table
│   ├── navigation.ts            Localized Link / useRouter / usePathname
│   └── request.ts               Server-side messages loader
├── lib/
│   ├── content/                 blog (MDX reader), services (registry loader)
│   ├── seo/                     site, metadata builder, jsonld builders, routes registry
│   └── utils.ts                 cn() helper (from shadcn init)
└── proxy.ts                     Next.js 16 file convention (formerly middleware.ts)

content/blog/{de,en}/*.mdx       Long-form content with frontmatter
messages/{de,en}.json            Translation JSON consumed by next-intl
public/llms.txt                  AEO/GEO entry point
public/llms-full.txt             AEO/GEO long-form
```

## 4. Routing model

- All public routes live under `src/app/[locale]/...`. There is no root `app/layout.tsx`.
- The `[locale]` segment is constrained to `de` and `en` (see `src/i18n/routing.ts`).
- **Localized URLs are produced by `routing.pathnames`, not by parallel folders.** Example: the German URL `/de/leistungen/initial-consultation` and the English URL `/en/services/initial-consultation` both resolve to the same filesystem route `src/app/[locale]/services/[slug]/page.tsx`. The German segment `leistungen` comes from the `pathnames` table.
- The internal route name (the key in `pathnames`) uses **English / default-locale segments** by convention. When you add a new route that needs a localized URL, add it to `routing.pathnames`.
- Use the typed `Link` from `@/i18n/navigation` — never `next/link` directly. The locale prefix is added automatically.

## 5. Tailwind-first directive (canonical)

This is the single rule that matters more than any other style choice in the repo.

### Use Tailwind utilities for everything

Compose conditional classes with `cn()` from `@/lib/utils` (`clsx` + `tailwind-merge`). Apply variants where the markup is — do not abstract them into separate style objects.

```tsx
<button className={cn('rounded-md px-3 py-2', isActive && 'bg-foreground text-background')} />
```

### Tokens live in `@theme`, not in a JS config

`src/app/globals.css` contains:
- the Tailwind v4 import (`@import "tailwindcss";`)
- the shadcn helper imports (`tw-animate-css`, `shadcn/tailwind.css`)
- `@theme inline { ... }` — the design-token surface
- `:root { ... }` + `.dark { ... }` — the CSS custom properties referenced by the tokens
- a minimal `@layer base { ... }` — only resets, no component CSS

When you need a new color, radius, spacing token, or font:

1. Add the CSS variable to `:root` (and `.dark` if it differs).
2. Map it inside `@theme inline { --color-foo: var(--foo); }` so Tailwind generates `bg-foo`, `text-foo`, `border-foo`, etc.
3. Use the utility — never write the raw `var(--foo)` in JSX.

### Banned

| Don't | Why |
|---|---|
| `tailwind.config.ts` | Tailwind v4 is CSS-first. A JS config file would be ignored, confusing future contributors. |
| CSS Modules (`*.module.css`) | Splits styling out of the markup; defeats the Tailwind colocation model. |
| styled-components, emotion, vanilla-extract, stitches, linaria | Runtime CSS-in-JS adds bundle weight and breaks RSC streaming. |
| Component-scoped `.css` / `.scss` files | If a utility doesn't exist, add a token in `@theme`, not a stylesheet. |
| Inline `<style>` blocks (except in dynamic SVG/JSON-LD contexts) | Same reason. |
| Hand-written media-query dark mode | Dark mode is the `.dark` class; tokens swap automatically. |

### Order of operations when you "need a custom style"

1. **Is there a shadcn primitive in `src/components/ui/`?** If so, use it. Compose with Tailwind utilities for spacing/sizing.
2. **Is there a Magic UI component (also in `src/components/ui/`)?** Many "we need motion" requests are already solved by Magic UI.
3. **Can plain Tailwind utilities express it?** 95% of the time, yes.
4. **Does the design need a new token?** Add it to `:root` + `@theme` in `globals.css`. Then use the generated utility.
5. **Truly last resort**: add a small utility via `@layer utilities { .foo { ... } }` in `globals.css`. Document why.

If you find yourself wanting to write a `.css` file or a styled component, stop and re-read this section.

## 6. Component layering

- `src/components/ui/*` — **registry-managed**. Both shadcn primitives and Magic UI components land here. Do not edit these files by hand — re-run `pnpm dlx shadcn@latest add <name>` or the registry URL instead. If you need a variant a registry component doesn't support, wrap it in a `src/components/site/...` component rather than editing the source.
- `src/components/site/*` — **project-owned**. Build by composing `ui/*` + Tailwind. Examples: `site-header.tsx`, `site-footer.tsx`, `json-ld.tsx`, `locale-switcher.tsx`. Add new ones here.
- Server components by default. Add `'use client'` only when the component actually needs interactivity, browser-only APIs, or motion hooks.

## 7. SEO authoring playbook

When you add a new sub-page under `src/app/[locale]/...`:

1. **Export `generateMetadata`**. Use `buildMetadata` from `@/lib/seo/metadata`:
   ```ts
   export async function generateMetadata({ params }) {
     const { locale } = await params
     return buildMetadata({
       locale,
       path: '/some-route',
       title: ...,
       description: ...,
       localizedPaths: { de: '/eine-route', en: '/some-route' }, // only if URL differs
     })
   }
   ```
2. **Emit JSON-LD** with the `<JsonLd>` component:
   ```tsx
   <JsonLd data={[
     breadcrumbList([...]),
     // page-type-specific schema, e.g. article(), service(), faqPage(), localBusiness()
   ]} />
   ```
3. **Update `routing.pathnames`** in `src/i18n/routing.ts` if the URL slug differs by locale.
4. **Update `STATIC_ROUTES`** in `src/lib/seo/routes.ts` so the sitemap picks the page up. (Dynamic routes — blog posts, services — are sourced automatically via `listAllPosts` / `listAllServices`.)
5. **Add translation keys** to both `messages/de.json` and `messages/en.json`.
6. **Service pages**: include a FAQ section and emit `faqPage()` JSON-LD. This is the AEO win.
7. **`params` is async in Next.js 16** — always `const { locale } = await params`.

## 8. AEO / GEO guidance

- Every service page emits `Service` + `FAQPage` + `BreadcrumbList` JSON-LD. Keep FAQs concrete: the question users actually ask, answered in 1–3 sentences.
- Lead with a prose paragraph near the top of each page that *answers* the page's implicit question. LLMs lift the first answer-shaped paragraph.
- Keep `public/llms.txt` short and link-heavy (an index for AI crawlers). Keep `public/llms-full.txt` substantive (the model can quote it).
- Avoid hiding key facts behind interactive components — server-rendered prose is what gets indexed and cited.

## 9. Commands

```bash
pnpm install
pnpm dev          # http://localhost:3000 → 308 to /de
pnpm build        # also generates sitemap.xml, robots.txt, OG images for each locale
pnpm start        # production server (after build)

pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
pnpm lint:fix
pnpm format       # prettier --write
pnpm format:check # prettier --check (use in CI)
```

## 10. Things to never do

- Create a `tailwind.config.ts`. Tailwind v4 is CSS-first. Use `@theme` in `globals.css`.
- Use `middleware.ts`. Next.js 16 renamed the file convention to `proxy.ts`. The file currently exports `default createMiddleware(routing)` — that is correct.
- Create `[locale]/leistungen/` next to `[locale]/services/`. Use one canonical route + `routing.pathnames`.
- Hand-edit `src/components/ui/*`. Re-add from registry instead.
- Hardcode user-facing strings in JSX. Use `useTranslations` / `getTranslations`.
- Render JSON-LD inline without the `JsonLd` component — the component escapes the `<` character for XSS safety.
- Add a CSS-in-JS library or write `.css` / `.scss` outside `globals.css`.
- Skip `generateMetadata` on a public page.
- Ignore the bilingual contract: a new page exists in both `messages/de.json` and `messages/en.json`, or it does not exist.

## 11. Working with Next.js 16

Read the version-matched docs in `node_modules/next/dist/docs/` before relying on API memory. Notable Next.js 16 changes from common training data:

- `middleware.ts` → `proxy.ts` (file convention rename; export named `proxy` or default).
- `params` and `searchParams` are async (`Promise<...>`).
- `PageProps<'/[locale]'>` / `LayoutProps<'/[locale]'>` are global TS helpers.
- Tailwind v4 is the new `--tailwind` scaffold default.
- `next.config.ts` is the default config filename.
