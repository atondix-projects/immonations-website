# Sales process cards and SEO page

## Outcome

Replace the homepage's seven-step scroll timeline with a compact, interactive ten-step card system based on pages 5–14 of the Immonation sales handbook. Add a dedicated bilingual page that explains the complete property-sale process in indexable detail.

## Content model

One `SalesProcess` translation namespace is the authority for both surfaces. Each of the ten ordered steps contains an ID, number, phase label, title, homepage summary, detailed explanation, three concrete activities, and an owner-facing outcome. The German copy stays close to the handbook; the English copy is a faithful adaptation. Unsupported time, price, success-rate, or legal claims are excluded.

## Homepage interaction

The homepage section uses one large image-backed card. It shows only the current step number, title, and short handbook-derived summary, keeping the detailed material on the SEO page. Previous and next controls allow sequential browsing. A compact horizontal process bar contains the ten numbered selectors and fades softly at both ends; on narrow screens it becomes horizontally scrollable. The interaction uses semantic tabs with linked panels, roving tabindex, Left/Right/Home/End keyboard controls, visible focus states, and reduced-motion-safe transitions. The section ends with a descriptive link to the complete process page.

## SEO page

The canonical internal route is `/sales-process`, localized to `/de/immobilie-verkaufen/ablauf` and `/en/sell-property/process`. The page includes a direct answer paragraph, a linked step index, ten anchored step articles, practical owner guidance, FAQ, and conversion links. Metadata targets the intent behind “Ablauf Immobilienverkauf” without keyword stuffing. Breadcrumb, Service, HowTo, and FAQ JSON-LD support search and answer engines. The route is included in the sitemap and both `llms` reference files.

## Verification

Run formatting, TypeScript, ESLint, production build, translation-shape checks, sitemap/path assertions, and real-browser checks at desktop and mobile widths. Verify card clicks and keyboard navigation, the German and English routes, visible anchor targets, structured data, and absence of horizontal overflow.
