import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { DistrictDemand } from '@/lib/content/buyer-profiles'
import { cn } from '@/lib/utils'
import { CONTAINER } from '../home/section-shell'

const WIDE_CITY_THRESHOLD = 10
const FULL_WIDTH_CITY_THRESHOLD = 30

export type DistrictDemandCopy = {
  eyebrow: string
  title: string
  text: string
  cityLink: string
  missingTitle: string
  missingText: string
  missingCta: string
}

/**
 * Wo gesucht wird: die Stadtteile aus den Suchprofilen, je Stadt gruppiert und auf die
 * Stadtteilseiten verlinkt. Bewusst ohne Zählwerte je Stadtteil.
 */
export function DistrictDemandSection({
  cities,
  copy,
}: {
  cities: DistrictDemand[]
  copy: DistrictDemandCopy
}) {
  return (
    <section className="bg-surface-dark py-18 text-white md:py-28">
      <div className={CONTAINER}>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-brand-300 text-[11px] font-semibold tracking-[0.2em] uppercase md:text-xs">
              {copy.eyebrow}
            </p>
            <h2 className="mt-4 max-w-[18ch] font-serif text-[2rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-[2.35rem] md:text-[3.35rem]">
              {copy.title}
            </h2>
          </div>
          <p className="max-w-[58ch] text-[17px] leading-[1.7] text-neutral-300 lg:justify-self-end">
            {copy.text}
          </p>
        </div>

        {/* `grid-flow-row-dense` füllt die Lücke, die eine doppelt breite Stadt sonst am
            Zeilenende hinterlassen würde. */}
        <div className="mt-12 grid grid-flow-row-dense gap-px border border-white/10 bg-white/10 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {cities.map((group) => {
            // Lange Listen bekommen mehr Spalten statt einer sehr langen Spalte: ab elf
            // Stadtteilen zwei, ab 31 (Nürnberg) die volle Breite mit drei.
            const isWide = group.districts.length > WIDE_CITY_THRESHOLD
            const isFullWidth = group.districts.length > FULL_WIDTH_CITY_THRESHOLD
            return (
              <article
                key={group.city}
                className={cn(
                  'bg-surface-dark flex flex-col p-7 md:p-9',
                  isWide && 'sm:col-span-2',
                  isFullWidth && 'lg:col-span-3',
                )}
              >
                <h3 className="font-serif text-2xl font-medium">{group.cityName}</h3>
                {/* Mobil zweispaltig ohne Objektart, sonst wird die Liste mit über 100
                    Stadtteilen mehrere Bildschirmhöhen lang. */}
                <ul
                  className={cn(
                    'mt-4 columns-2 gap-x-6',
                    isWide ? 'sm:columns-2 sm:gap-x-10' : 'sm:columns-1',
                    isFullWidth && 'lg:columns-3',
                  )}
                >
                  {group.districts.map((district) => (
                    <li
                      key={district.slug}
                      className="flex break-inside-avoid items-baseline justify-between gap-4 border-b border-white/10 py-3"
                    >
                      <Link
                        href={{
                          pathname: '/districts/[city]/[slug]',
                          params: { city: group.city, slug: district.slug },
                        }}
                        className="hover:text-brand-300 inline-flex items-center gap-2 text-[15px] font-medium text-white transition-colors"
                      >
                        <MapPin className="text-brand-300 size-3.5 shrink-0" aria-hidden="true" />
                        {district.name}
                      </Link>
                      <span className="hidden text-right text-xs leading-snug text-neutral-400 sm:inline">
                        {district.propertyTypes.join(' · ')}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={{ pathname: '/locations/[slug]', params: { slug: group.city } }}
                  className="text-brand-300 mt-auto inline-flex min-h-11 items-center gap-1.5 pt-7 text-sm font-semibold transition-colors hover:text-white"
                >
                  {copy.cityLink} {group.cityName}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            )
          })}

          <article className="bg-brand-700 flex flex-col gap-6 p-7 sm:col-span-2 md:p-9 lg:col-span-3 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-[72ch]">
              <h3 className="font-serif text-2xl leading-tight font-medium text-balance">
                {copy.missingTitle}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-white/85">{copy.missingText}</p>
            </div>
            <Link
              href="/contact"
              className="hover:text-brand-800 inline-flex min-h-12 shrink-0 items-center justify-center gap-1.5 border border-white/60 px-6 text-sm font-semibold text-white transition-colors hover:bg-white"
            >
              {copy.missingCta}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
