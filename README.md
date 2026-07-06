# Immonation Website

Bilingual (DE / EN) marketing site for Immonation — a real-estate advisory firm — built for SEO, AEO, and GEO.

**Stack:** Next.js 16 · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui (Neutral) · Magic UI · next-intl v4 · MDX (blog) · pnpm

## Quickstart

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>. The root path redirects to `/de`; English lives under `/en`.

```bash
pnpm typecheck   # tsc --noEmit
pnpm lint        # eslint
pnpm format      # prettier --write
pnpm build       # production build (generates sitemap.xml, robots.txt, OG images)
pnpm start       # serve the production build
```

## Project layout

See [`CLAUDE.md`](./CLAUDE.md) for the directory map and the full authoring playbook (Tailwind-first directive, SEO patterns, AEO / GEO conventions, bilingual routing model).

For AI agents: [`AGENTS.md`](./AGENTS.md) is the entry point and imports `CLAUDE.md`.

## Environment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your real domain in production.
