import type { ReactElement, SVGProps } from 'react'

/**
 * Die sechs Glyphen aus `assets/Immonation_Master_Prototyp.html` (dort `.uic svg`).
 * Der Prototyp setzt `fill:none`, `stroke:currentColor` und die Rundungen per CSS —
 * hier stehen sie als Attribute am `<svg>`, sonst laufen Rechtecke, Kreise und das
 * Urkunden-Blatt als schwarze Flächen aus.
 *
 * Reihenfolge = Reihenfolge von `Home.difference.items` in beiden Sprachdateien.
 */

type IconProps = SVGProps<SVGSVGElement>

function Glyph({ strokeWidth = 1.7, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

/** Aktiv gesteuert — Zielkreuz. */
function ActivelyManagedIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </Glyph>
  )
}

/** Ingenieur im Haus — Maßband. */
function EngineerIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <rect x="3" y="8" width="18" height="8" rx="1" />
      <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
    </Glyph>
  )
}

/** Video & 360°-Rundgang — Filmkamera. */
function VideoTourIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3z" />
    </Glyph>
  )
}

/** Diskret verkaufen — durchgestrichenes Auge. */
function DiscreetIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M4 4l16 16" />
    </Glyph>
  )
}

/** Beurkundet, nicht behauptet — Urkunde mit Haken. */
function NotarisedIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M9 12l2 2 4-4" />
    </Glyph>
  )
}

/** Persönlich bis zum Notar — fester Ansprechpartner. */
function PersonalIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21c0-4 3.5-6 7-6s7 2 7 6" />
    </Glyph>
  )
}

export const DIFFERENCE_ICONS = [
  ActivelyManagedIcon,
  EngineerIcon,
  VideoTourIcon,
  DiscreetIcon,
  NotarisedIcon,
  PersonalIcon,
] as const satisfies readonly ((props: IconProps) => ReactElement)[]
