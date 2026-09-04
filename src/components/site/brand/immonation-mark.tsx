import { cn } from '@/lib/utils'

/**
 * The Immonation CI element — the "Einzelnes I", the three-blade mark from the
 * logo shown without the wordmark. Path data and fills are lifted verbatim from
 * the vector master (assets/Logos Immonation); tests/contracts/brand-assets.test.ts
 * fails if they drift from it.
 *
 * House rules for the mark: scale it uniformly, keep the brand colours, and give
 * it room. No skew, no rotation, no gradient fill, no recolouring — it carries a
 * registered trademark (assets/Zertifikat Marke Immonation.PDF).
 *
 * The mark is decorative wherever it appears next to the company name, so it is
 * hidden from assistive technology by default. Pass a `label` only where it
 * stands in for the name with no visible text beside it.
 */
export function ImmonationMark({ className, label }: { className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 2440.71 2746.8"
      className={cn('block h-auto w-auto', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {label ? <title>{label}</title> : null}
      {/* Crops the master's A4 artboard down to the mark's own ink bounds. */}
      <g transform="translate(-3306.57 -13477.13)">
        {/* front blade */}
        <path
          fill="#1D9CD7"
          d="M4740.49 15663.26l0 -870.38c-15.26,-4.52 -45.77,-20.35 -61.02,-27.13 -22.88,-11.3 -38.14,-18.09 -61.02,-29.39 -87.71,-42.95 -789.41,-373.02 -812.3,-391.11 -45.76,-18.08 -83.9,-38.43 -125.85,-58.78l-308.9 -149.21c-7.62,-2.26 -11.44,-4.52 -19.07,-6.78 -7.62,-4.52 -7.62,-4.52 -15.25,-9.04 -11.44,-4.52 -19.07,-6.78 -30.51,-13.57l0 1408.44c22.88,4.53 45.76,20.35 68.65,29.39l777.97 388.85c7.63,4.52 11.44,9.04 19.07,11.3l358.48 178.6c19.07,11.31 183.05,99.48 205.93,99.48l3.82 -560.67z"
        />
        {/* back blade */}
        <path
          fill="#737372"
          d="M4305.74 14028.75l934.33 452.15 0 868.12c26.7,4.52 213.56,103.99 255.51,124.34 34.32,18.09 228.82,119.82 251.7,122.08l0 -1431.05 -804.67 -386.58c-30.51,-13.57 -57.21,-29.39 -91.53,-42.96 -30.51,-15.82 -57.2,-27.13 -87.71,-42.95l-450.01 -214.77 -7.62 551.62z"
        />
        {/* middle blade */}
        <path
          fill="#A2D9F5"
          d="M3806.15 14345.25c22.89,18.09 724.59,348.16 812.3,391.11 22.88,11.3 38.14,18.09 61.02,29.39 15.25,6.78 45.76,22.61 61.02,27.13l0 870.38c26.69,9.05 95.34,47.48 122.03,61.04l251.7 124.34c22.88,13.57 106.78,58.78 129.66,61.04 0,-72.34 3.82,-531.27 -3.81,-560.66l0 -868.12 -934.33 -452.15 -499.59 -235.12 0 551.62z"
        />
      </g>
    </svg>
  )
}
