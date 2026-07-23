# Embedded valuation entry design

## Decision

The existing first wizard step, property type, becomes a reusable embedded card. On the seller homepage it replaces the primary valuation button and appears in the upper-right half of the desktop hero. The same card replaces the button-only panel in the lower valuation section. The sales-process link remains in the seller hero. Buyer mode is unchanged.

## Data flow

- The card presents the four existing translated choices.
- Stable IDs (`house`, `apartment`, `apartment-building`, and `land`) are kept separate from German and English display labels.
- Submitting the first step performs a localized client-side navigation to the valuation route with the selected ID in the `type` query parameter.
- The valuation wizard validates the ID, restores the localized label, and starts on step 2 of 5.
- Returning to step 1 keeps the selected property type active.
- Direct visits without a valid `type` parameter still begin at step 1.
- The interaction sends no request, writes no browser storage, and adds no backend behavior.

## Responsive composition

- Desktop seller hero: headline and sales-process link remain on the left; the valuation entry card occupies the upper-right rail; audience switch and Google rating stay at the bottom-right.
- Mobile/tablet seller hero: the card follows the sales-process link in the normal content flow.
- Lower homepage CTA: editorial proof remains left; the shared first-step card is right.
- The card uses a stable two-by-two choice grid, visible selected state, validation feedback, keyboard focus styles, and a single Continue action.

## Verification

- German hero handoff opened `/de/immobilienbewertung?type=house` at step 2.
- English hero handoff opened `/en/property-valuation?type=house` at step 2.
- Back navigation restored step 1 with the chosen type still pressed.
- Desktop and 390 px mobile captures show the embedded card without horizontal overflow.
- Buyer mode retains its original primary and secondary actions.
- Browser console reported zero errors.
- TypeScript, scoped ESLint, and the 95-page production build passed.
