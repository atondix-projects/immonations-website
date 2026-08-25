import Image from 'next/image'
import { cn } from '@/lib/utils'

/** Alle Paare werden von `scripts/curate-visualization-assets.py` in 1600 × 900 erzeugt. */
const FRAME_SIZE = { width: 1600, height: 900 } as const

/**
 * Reihenfolge und Dateinamen der Paare. Die Übersetzungen liegen unter demselben
 * Schlüssel in `StagingPage.compare.items`, damit Bild und Text nicht über einen
 * Index gekoppelt sind.
 */
export const PAIR_SLUGS = [
  'plot-schwabach',
  'living-room-nuremberg',
  'entrance-nuremberg',
  'bedroom-nuremberg',
] as const

export type PairSlug = (typeof PAIR_SLUGS)[number]

export type VisualizationPair = {
  slug: PairSlug
  title: string
  text: string
  beforeAlt: string
  afterAlt: string
}

/**
 * Original und Visualisierung nebeneinander — bewusst statisch.
 *
 * Der Prototyp sah hier einen Vorher/Nachher-Regler vor. Ein Regler zeigt aber
 * immer nur eine Hälfte und versteckt die andere hinter einem Zeigerereignis:
 * Antwortmaschinen lesen sie nicht, und die Seite verspricht ausdrücklich, die
 * Visualisierung *dem Originalfoto gegenüberzustellen*. Beide Aufnahmen stehen
 * deshalb gleichzeitig im Dokument, jede mit sichtbarer Kennzeichnung.
 */
export function VisualizationCompare({
  pair,
  index,
  beforeLabel,
  afterLabel,
}: {
  pair: VisualizationPair
  index: number
  beforeLabel: string
  afterLabel: string
}) {
  return (
    <article className="border-border border-t pt-8 first:border-t-0 first:pt-0 md:pt-12 md:first:pt-0">
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
        <div className="flex items-start gap-4">
          <span className="text-brand-700 mt-1.5 font-mono text-xs tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="max-w-[24ch] font-serif text-2xl leading-snug font-medium text-balance md:text-[1.9rem]">
            {pair.title}
          </h3>
        </div>
        <p className="text-muted-foreground max-w-[64ch] text-[15px] leading-[1.75] text-pretty">
          {pair.text}
        </p>
      </div>

      <div className="mt-7 grid gap-px bg-neutral-950/10 sm:grid-cols-2">
        <Frame
          src={`/images/staging/${pair.slug}-before.webp`}
          alt={pair.beforeAlt}
          label={beforeLabel}
          variant="before"
        />
        <Frame
          src={`/images/staging/${pair.slug}-after.webp`}
          alt={pair.afterAlt}
          label={afterLabel}
          variant="after"
        />
      </div>
    </article>
  )
}

function Frame({
  src,
  alt,
  label,
  variant,
}: {
  src: string
  alt: string
  label: string
  variant: 'before' | 'after'
}) {
  return (
    <figure className="bg-background relative m-0">
      <Image
        src={src}
        alt={alt}
        width={FRAME_SIZE.width}
        height={FRAME_SIZE.height}
        sizes="(min-width: 640px) 46vw, 100vw"
        className="block h-full w-full object-cover"
      />
      {/* Die Kennzeichnung steht im Bild, nicht nur in der Bildunterschrift:
          ein weitergereichter Screenshot verliert die Unterschrift, das Label
          nicht. */}
      <figcaption
        className={cn(
          'absolute top-0 left-0 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-white uppercase',
          variant === 'after' ? 'bg-brand-600' : 'bg-neutral-800',
        )}
      >
        {label}
      </figcaption>
    </figure>
  )
}
