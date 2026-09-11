import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { LocationHubCity } from '@/lib/content/location-hub'
import { cn } from '@/lib/utils'

export type CityCardCopy = {
  /** Kennzahlenzeile, z. B. „5 Referenzen · 8 Stadtteile". */
  meta: string
  link: string
  soldIn: string
  headquarters: string
}

type CityCardProps = {
  city: LocationHubCity
  index: number
  copy: CityCardCopy
}

const INDEX_LABEL = 'font-mono text-[11px] tracking-[0.2em] uppercase'
const ARROW =
  'size-5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none'

function cityHref(slug: string) {
  return { pathname: '/locations/[slug]' as const, params: { slug } }
}

function indexNumber(index: number) {
  return String(index + 1).padStart(2, '0')
}

function FocusList({ items, inverse = false }: { items: readonly string[]; inverse?: boolean }) {
  return (
    <ul className="mt-7 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            'border px-3 py-1.5 text-[13px] leading-snug',
            inverse ? 'border-white/20 text-white/85' : 'border-border text-foreground/80',
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

/**
 * Verkaufte Objekte als Belegreihe. Die Coverfotos zeigen meist Innenräume —
 * als Stadtporträt taugen sie nicht, als Nachweis „hier verkauft" schon.
 */
function ReferenceThumbs({ references }: { references: LocationHubCity['references'] }) {
  if (references.length === 0) return null
  return (
    <div aria-hidden="true" className="flex gap-1.5">
      {references.slice(0, 3).map((item) => (
        <div key={item.id} className="relative size-11 shrink-0 overflow-hidden bg-neutral-200">
          <Image src={item.image} alt="" fill sizes="44px" className="object-cover" />
        </div>
      ))}
    </div>
  )
}

export function CityCard({ city, index, copy }: CityCardProps) {
  const { location, references } = city
  return (
    <Link
      href={cityHref(location.slug)}
      className="group hover:bg-muted/55 flex h-full min-h-[380px] flex-col p-7 transition-[background-color] duration-150 motion-reduce:transition-none md:p-10"
    >
      <div className="flex items-center justify-between">
        <span className={cn(INDEX_LABEL, 'text-muted-foreground')}>{indexNumber(index)}</span>
        <ArrowUpRight
          className={cn(ARROW, 'text-muted-foreground group-hover:text-brand-700')}
          aria-hidden="true"
        />
      </div>
      <h3 className="mt-10 font-serif text-[2.5rem] leading-none font-medium tracking-[-0.03em] md:text-[3.1rem]">
        {location.name}
      </h3>
      <p className="text-muted-foreground mt-5 max-w-[54ch] leading-[1.65] text-pretty">
        {location.lede}
      </p>
      <FocusList items={location.localFocus} />
      <div className="mt-auto pt-9">
        <div className="border-border flex flex-wrap items-center justify-between gap-4 border-t pt-5">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
            <ReferenceThumbs references={references} />
            <span className="text-muted-foreground text-[13px] whitespace-nowrap">{copy.meta}</span>
          </div>
          <span className="text-brand-700 shrink-0 text-sm font-semibold">{copy.link}</span>
        </div>
      </div>
    </Link>
  )
}

/** Der Unternehmenssitz: dunkle Karte über die volle Breite mit Referenz-Mosaik. */
export function FeaturedCityCard({ city, index, copy }: CityCardProps) {
  const { location, references } = city
  const mosaic = references.length >= 3 ? references.slice(0, 3) : references.slice(0, 1)

  return (
    <Link
      href={cityHref(location.slug)}
      className="group bg-surface-dark grid h-full text-white lg:grid-cols-[1.08fr_0.92fr]"
    >
      <div className="flex flex-col p-7 md:p-10 lg:p-12">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className={cn(INDEX_LABEL, 'text-white/55')}>{indexNumber(index)}</span>
            <span className="bg-brand-600 px-2.5 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase">
              {copy.headquarters}
            </span>
          </div>
          <ArrowUpRight
            className={cn(ARROW, 'text-white/60 group-hover:text-white')}
            aria-hidden="true"
          />
        </div>
        <h3 className="mt-10 font-serif text-[3rem] leading-[0.95] font-medium tracking-[-0.035em] md:text-[4.5rem]">
          {location.name}
        </h3>
        <p className="mt-6 max-w-[54ch] text-[1.05rem] leading-[1.7] text-pretty text-white/72">
          {location.lede}
        </p>
        <FocusList items={location.localFocus} inverse />
        <div className="mt-auto pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
            <span className="text-[13px] text-white/60">{copy.meta}</span>
            <span className="text-brand-300 text-sm font-semibold">{copy.link}</span>
          </div>
        </div>
      </div>

      {mosaic.length > 0 ? (
        <div
          aria-hidden="true"
          className={cn(
            'relative grid min-h-[300px] gap-px bg-white/10 sm:min-h-[380px]',
            mosaic.length === 3 ? 'grid-cols-2 grid-rows-2' : 'grid-cols-1',
          )}
        >
          {mosaic.map((item, position) => (
            <div
              key={item.id}
              className={cn(
                'relative overflow-hidden bg-neutral-800',
                mosaic.length === 3 && position === 0 && 'col-span-2',
              )}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes={
                  position === 0
                    ? '(min-width: 1024px) 40vw, 100vw'
                    : '(min-width: 1024px) 20vw, 50vw'
                }
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </div>
          ))}
          <span className="absolute bottom-4 left-4 bg-black/60 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-white/90 uppercase">
            {copy.soldIn}
          </span>
        </div>
      ) : null}
    </Link>
  )
}
