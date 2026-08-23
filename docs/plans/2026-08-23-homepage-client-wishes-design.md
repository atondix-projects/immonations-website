# Homepage client wishes

## Scope

The three requested adjustments apply to the existing homepage blocks in both locales. No new route or content type is introduced.

## Decisions

- The services overview uses the nine service points from the master prototype in the same order. Each card links to the closest existing canonical route.
- The compact references teaser selects one apartment, one house, and one commercial property explicitly by reference ID instead of taking the first three records.
- The three verified Google review screenshots replace the static featured-review grid with one stable-height carousel. It crossfades every 5.5 seconds and provides previous/next buttons and direct-selection dots.
- Autoplay pauses for hover, keyboard focus, hidden tabs, and reduced-motion preferences. The reviews section remains a Server Component; only the carousel is a Client Component.

## Verification

- Check both locales for translated service content and carousel labels.
- Run type checking and scoped linting.
- Verify the homepage at mobile and desktop widths, including auto-advance and manual controls.
