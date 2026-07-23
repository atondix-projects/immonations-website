# Review rotation and customer-story layout revision

## Decision

Andreas selected option A: one integrated Google-review screenshot at a time. The review frame chooses a random supplied screenshot on each browser load and changes to a different screenshot every 5.5 seconds.

## Component structure

- `Reviews` remains a Server Component so translated review data stays server-rendered.
- `ReviewRotator` is a narrow Client Component that receives only the serializable screenshot records.
- The frame keeps a stable height across images, constrains screenshots near their native size, and crossfades with opacity so rotation causes no layout shift.
- Three understated indicators expose the current review and provide manual selection.

## Interaction and accessibility

- The first browser-rendered selection is random and hydration-safe.
- Every timed selection excludes the currently visible screenshot.
- Rotation pauses while the frame is hovered or keyboard focus is inside it.
- Automatic rotation is disabled when the browser requests reduced motion.
- Indicator buttons retain visible keyboard focus and use the supplied localized screenshot descriptions as accessible names.
- Rotation stops while the tab is not visible.

## Story layout

- Story cards use real gutters instead of one-pixel separation.
- The video story opens the grid as a full-width horizontal feature.
- The two middle stories form a balanced two-column row on desktop.
- The Frau Hartmann story closes the section as a full-width horizontal feature, eliminating the broken empty half-row.
- Tablet and mobile collapse to one column.
- Grid tracks and card contents use explicit `minmax(0, …)` / `min-w-0` containment to prevent horizontal clipping.
- The three below-the-fold story images load eagerly so a user cannot arrive at an empty beige media panel.

## Verification

- Random-load sample: six reloads produced all three supplied review screenshots.
- Timed rotation: the active screenshot changed after the 5.5-second interval.
- Responsive widths: 390, 1020, and 1440 px all measured `scrollWidth === innerWidth`.
- The final story asset loaded with valid intrinsic dimensions and rendered at mobile, tablet, and desktop widths.
- `pnpm typecheck`, scoped ESLint, and `pnpm build` passed.
