# Review portal cards

## Intent

Expand the homepage review section without implying that every displayed score is an independent set of customer reviews.

## Design

- Keep Google, Trustpilot, and Immowelt as the three prominent rating cards.
- Add a visually quieter row of compact cards for ProvenExpert, Trustlocal, Jacasa, and Das Örtliche.
- Label aggregated profiles with their data basis, such as “from Google” or “from two portals”.
- Keep the existing customer quotations in a separate column so platform scores and editorial testimonials remain distinct.
- Preserve the current editorial typography, square borders, blue accent, and responsive stacking behavior.

## Data handling

The ratings are static, date-stamped editorial data. External links open the corresponding public profile in a new tab. No third-party scripts, widgets, cookies, or live API integrations are added.

## Verification

- Check both translation files for matching keys.
- Run TypeScript, ESLint, and the production build.
- Inspect the German homepage section at desktop and mobile widths.
