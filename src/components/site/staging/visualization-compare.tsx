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
  'bedroom-entenberg',
  'living-room-nuremberg',
  'office-wiesenstrasse',
  'bedroom-nuremberg',
  'terrace-entenberg',
  'entrance-nuremberg',
  'plot-schwabach',
] as const

export type PairSlug = (typeof PAIR_SLUGS)[number]

/**
 * Das erste Paar steht allein und groß, die übrigen zu zweit.
 *
 * Sieben gleich große Paare untereinander lesen sich als Metronom — man scrollt
 * hindurch statt hinzusehen. Vorne steht deshalb der deutlichste Fall
 * (dieselbe Kamera, nur modernisiert), danach trägt die Reihenfolge der Paare
 * die Gliederung: möblieren, Außenanlage, Bebauung — dieselbe Reihenfolge wie
 * in „Was wir sichtbar machen".
 */
export const LEAD_PAIR_COUNT = 1

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
  size = 'lead',
}: {
  pair: VisualizationPair
  index: number
  beforeLabel: string
  afterLabel: string
  /** `lead` steht über die volle Breite, `compact` in der zweispaltigen Reihe. */
  size?: 'lead' | 'compact'
}) {
  const isLead = size === 'lead'

  return (
    // Die kompakte Karte streckt sich über die Zeilenhöhe, damit die Bildpaare
    // einer Zeile auf gleicher Höhe beginnen — Titel und Text sind
    // unterschiedlich lang, die Belege sollen es nicht scheinen.
    <article className={cn(!isLead && 'flex h-full flex-col')}>
      <div
        className={cn(
          isLead
            ? 'grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16'
            : 'flex flex-1 flex-col gap-2',
        )}
      >
        <div className="flex items-start gap-4">
          <span className="text-brand-700 mt-1.5 font-mono text-xs tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3
            className={cn(
              'font-serif leading-snug font-medium text-balance',
              isLead ? 'max-w-[24ch] text-2xl md:text-[1.9rem]' : 'max-w-[28ch] text-xl',
            )}
          >
            {pair.title}
          </h3>
        </div>
        <p
          className={cn(
            'text-muted-foreground text-pretty',
            isLead
              ? 'max-w-[64ch] text-[15px] leading-[1.75]'
              : 'max-w-[52ch] pl-8 text-[14px] leading-[1.7]',
          )}
        >
          {pair.text}
        </p>
      </div>

      {/* Auch auf dem Telefon zweispaltig: Die Seite verspricht „direkt
          nebeneinander". Untereinander gestapelt sieht man immer nur eine
          Hälfte und muss die andere aus dem Gedächtnis vergleichen. */}
      <div className={cn('grid grid-cols-2 gap-px bg-neutral-950/10', isLead ? 'mt-7' : 'mt-5')}>
        <Frame
          src={`/images/staging/${pair.slug}-before.webp`}
          alt={pair.beforeAlt}
          label={beforeLabel}
          variant="before"
          size={size}
        />
        <Frame
          src={`/images/staging/${pair.slug}-after.webp`}
          alt={pair.afterAlt}
          label={afterLabel}
          variant="after"
          size={size}
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
  size,
}: {
  src: string
  alt: string
  label: string
  variant: 'before' | 'after'
  size: 'lead' | 'compact'
}) {
  return (
    <figure className="bg-background relative m-0">
      <Image
        src={src}
        alt={alt}
        width={FRAME_SIZE.width}
        height={FRAME_SIZE.height}
        sizes={size === 'lead' ? '46vw' : '(min-width: 768px) 23vw, 46vw'}
        className="block h-full w-full object-cover"
      />
      {/* Die Kennzeichnung steht im Bild, nicht nur in der Bildunterschrift:
          ein weitergereichter Screenshot verliert die Unterschrift, das Label
          nicht. */}
      <figcaption
        className={cn(
          'absolute top-0 left-0 font-semibold tracking-[0.14em] text-white uppercase',
          // Auf schmalen Spalten trägt das Label sonst mehr Gewicht als das Bild.
          size === 'lead'
            ? 'px-2 py-1 text-[9px] sm:px-4 sm:py-2 sm:text-[11px]'
            : 'px-2 py-1 text-[9px] md:px-3 md:py-1.5 md:text-[10px]',
          variant === 'after' ? 'bg-brand-600' : 'bg-neutral-800',
        )}
      >
        {label}
      </figcaption>
    </figure>
  )
}
