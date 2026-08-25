'use client'

import Image from 'next/image'
import { MousePointer2, Star } from 'lucide-react'
import ImageTrail, { ImageTrailItem } from '@/components/fancy/image/image-trail'
import { AnimatedNumber } from '@/components/site/animated-number'
import { cn } from '@/lib/utils'

/**
 * Gemeinsame Felder jeder Trail-Karte. `srLabel` ist der Name, unter dem die
 * Karte in der Vorlesereihenfolge auftaucht — die Bilder selbst sind
 * `aria-hidden`, weil der Trail nur mit Maus existiert.
 */
type TrustProofExampleBase = {
  id: string
  image: string
  /**
   * Bild für die 64-px-Kachel ohne Hover (Touch). Fehlt es, dient `image`.
   * Bewertungs-Screenshots brauchen hier eine Alternative: quergestellt in ein
   * Quadrat gerechnet bleibt vom Text nur ein grauer Streifen.
   */
  thumb?: string
  badge: string
  srLabel: string
}

/**
 * Die vier Kennzahlen belegen dieselbe Geste mit unterschiedlichem Beleg:
 * Bewertungen zeigen Bewertungen, Verkaufszahl und Volumen zeigen Objekte,
 * die Suchkundenzahl zeigt die Menschen dahinter. Die Variante entscheidet über
 * Zuschnitt und Beschriftung der Karte — ein einheitliches 4:3-Objektformat
 * würde die Sterne und den Text eines Bewertungs-Screenshots wegschneiden.
 */
export type TrustProofExample =
  | (TrustProofExampleBase & {
      kind: 'property'
      title: string
      type: string
      location: string
    })
  | (TrustProofExampleBase & {
      kind: 'review'
      reviewer: string
      /** Echte Pixelmaße — die Screenshots reichen von 518×289 bis 522×749. */
      width: number
      height: number
    })
  | (TrustProofExampleBase & {
      kind: 'person'
      name: string
      role: string
    })

export type TrustProofItem = {
  value: string
  label: string
  trailHint: string
  exampleLabel: string
  examples: TrustProofExample[]
}

const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'] as const

const CARD_WIDTH = {
  property: 'w-44',
  review: 'w-56',
  person: 'w-40',
} as const

const CARD_SIZES = {
  property: '176px',
  review: '224px',
  person: '160px',
} as const

const BADGE =
  'text-brand-700 block truncate font-mono text-[9px] font-semibold tracking-[0.12em] uppercase'
const CARD_TITLE = 'mt-1 truncate font-serif text-[15px] leading-tight font-semibold'
const CARD_META = 'mt-1 truncate text-[10px] text-neutral-500'

function TrailCardBody({ example }: { example: TrustProofExample }) {
  if (example.kind === 'review') {
    return (
      <>
        {/* Intrinsische Maße statt festem Seitenverhältnis: Sternzeile und
            Kopf der Bewertung bleiben bei jedem Screenshot sichtbar. `max-h-44`
            deckelt nur die hochformatigen Screenshots (bis 522×749), damit eine
            einzelne Karte den Zahlenstreifen nicht überragt. */}
        <Image
          src={example.image}
          alt=""
          width={example.width}
          height={example.height}
          sizes={CARD_SIZES.review}
          className="h-auto max-h-44 w-full rounded-md bg-neutral-100 object-cover object-top outline -outline-offset-1 outline-black/10"
        />
        <div className="px-2 pt-2 pb-1.5">
          <span className={BADGE}>{example.badge}</span>
          <p className={CARD_TITLE}>{example.reviewer}</p>
          <span aria-hidden="true" className="text-brand-700 mt-1 flex gap-0.5">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} className="size-2.5 fill-current" strokeWidth={0} />
            ))}
          </span>
        </div>
      </>
    )
  }

  if (example.kind === 'person') {
    return (
      <>
        <div className="relative aspect-3/4 overflow-hidden rounded-md bg-neutral-200 outline -outline-offset-1 outline-black/10">
          <Image
            src={example.image}
            alt=""
            fill
            sizes={CARD_SIZES.person}
            className="object-cover"
          />
        </div>
        <div className="px-2 pt-2 pb-1.5">
          <span className={BADGE}>{example.badge}</span>
          <p className={CARD_TITLE}>{example.name}</p>
          <p className={CARD_META}>{example.role}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="relative aspect-4/3 overflow-hidden rounded-md bg-neutral-200 outline -outline-offset-1 outline-black/10">
        <Image
          src={example.image}
          alt=""
          fill
          sizes={CARD_SIZES.property}
          className="object-cover"
        />
      </div>
      <div className="px-2 pt-2 pb-1.5">
        <span className={BADGE}>{example.badge}</span>
        <p className={CARD_TITLE}>{example.title}</p>
        <p className={CARD_META}>
          {example.type} · {example.location}
        </p>
      </div>
    </>
  )
}

export function TrustProofGrid({ items }: { items: TrustProofItem[] }) {
  return (
    <dl className="border-border mt-14 grid grid-cols-2 border-y md:mt-20 lg:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            'group relative min-h-52 overflow-visible p-5 lg:min-h-56 lg:p-7',
            index < 2 && 'border-border border-b',
            index % 2 === 0 && 'border-border border-r',
            'lg:border-r lg:border-b-0',
            index === items.length - 1 && 'lg:border-r-0',
          )}
        >
          <ImageTrail
            aria-hidden="true"
            threshold={48}
            intensity={0.45}
            repeatChildren={2}
            baseZIndex={20}
            keyframes={{
              opacity: [0, 1, 1, 0],
              scale: [0.88, 1, 1, 0.96],
              filter: ['blur(4px)', 'blur(0px)', 'blur(0px)', 'blur(2px)'],
            }}
            keyframesOptions={{
              duration: 3.6,
              opacity: { times: [0, 0.08, 0.88, 1] },
              scale: { times: [0, 0.08, 0.88, 1] },
              filter: { times: [0, 0.08, 0.88, 1] },
            }}
            className="absolute inset-0 z-20 hidden overflow-visible motion-reduce:hidden [@media(hover:hover)]:block"
          >
            {item.examples.map((example, exampleIndex) => (
              <ImageTrailItem
                key={example.id}
                className={cn(
                  'pointer-events-none rounded-xl bg-white p-1.5 text-neutral-950 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.08)]',
                  CARD_WIDTH[example.kind],
                  rotations[exampleIndex % rotations.length],
                )}
              >
                <TrailCardBody example={example} />
              </ImageTrailItem>
            ))}
          </ImageTrail>

          {item.examples[0] ? (
            <div
              aria-hidden="true"
              className="absolute top-4 right-4 size-16 overflow-hidden rounded-lg shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,0,0,0.08)] [@media(hover:hover)]:hidden"
            >
              <Image
                src={item.examples[0].thumb ?? item.examples[0].image}
                alt=""
                fill
                sizes="64px"
                className="object-cover object-top outline -outline-offset-1 outline-black/10"
              />
            </div>
          ) : null}

          <div className="pointer-events-none relative z-10 flex h-full min-h-42 flex-col justify-between">
            <span className="text-muted-foreground group-hover:text-brand-700 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors duration-200 motion-reduce:transition-none">
              <MousePointer2 aria-hidden="true" className="size-3" strokeWidth={1.8} />
              {item.trailHint}
            </span>
            <div>
              <dd>
                <AnimatedNumber
                  value={item.value}
                  delay={index * 0.08}
                  className="font-serif text-3xl font-medium tracking-[-0.02em] md:text-[2.8rem]"
                />
              </dd>
              <dt className="text-muted-foreground mt-2 max-w-[20ch] text-xs leading-snug font-semibold md:text-sm">
                {item.label}
              </dt>
              <span className="sr-only">
                {item.exampleLabel}: {item.examples.map((example) => example.srLabel).join(', ')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </dl>
  )
}
