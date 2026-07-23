# References resource hub

## Purpose

Move references out of the top-level navigation and into Resources, then provide one bilingual, indexable hub that combines property proof, customer video capacity, virtual-tour access, and verified company relationships.

## Structure

- Localized route: `/de/referenzen` and `/en/references`.
- A concise editorial hero answers what the page contains and links back to the sales consultation.
- Fifteen image-backed property references use supplied media. Cards publish only property type and privacy-safe locality; draft durations, prices, inquiry counts, and result claims remain unpublished until approved.
- A virtual-tour CTA is data-driven and renders only when a verified URL exists. The supplied archive contains no usable tour URL, so the implementation must not ship a dead or invented link.
- Three customer-review video slots use the supplied Viktor Emter, Markus Burkhard, and Sandra Börschlein artwork. The available Viktor interview is web-optimized; missing video sources remain explicitly marked as forthcoming.
- The existing partner wordmark cards become a real logo system. External relationships and group companies are separated to avoid misclassification:
  - Partners and market presence: Dr. Klein, immowelt Business Partner, REWE.
  - Immonation group: Immonation Capital Holding, IN Beteiligungs GmbH, Dream Living GmbH.

## Interaction and visual direction

- The property grid uses varied spans and image ratios to avoid a generic equal-card wall while remaining predictable on mobile.
- Images have restrained overlays, strong readable labels, keyboard-visible links, and subtle transform/opacity hover motion.
- Video slots preserve native controls and clear availability states.
- Logo rows use neutral surfaces with real image assets, accessible names, and verified outbound links where appropriate.

## SEO and verification

- Add localized metadata, canonical and hreflang URLs, breadcrumb and ItemList JSON-LD, sitemap registration, internal navigation, and `llms.txt` references.
- Validate both locales, responsive layout, links, media loading, accessibility basics, console errors, typecheck, lint, and production build.
