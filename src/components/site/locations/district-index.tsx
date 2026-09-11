import { Link } from '@/i18n/navigation'
import type { DistrictLink } from '@/lib/content/districts'

export type DistrictIndexGroup = {
  citySlug: string
  cityName: string
  countLabel: string
  cityLinkLabel: string
  districts: DistrictLink[]
}

/**
 * Alle Stadtteilseiten als serverseitig gerenderte Linkliste — kein Akkordeon,
 * damit Crawler und Answer Engines jede Seite ohne Interaktion erreichen.
 */
export function DistrictIndex({ groups }: { groups: DistrictIndexGroup[] }) {
  return (
    <div className="border-border divide-border divide-y border-y">
      {groups.map((group) => (
        <section
          key={group.citySlug}
          aria-labelledby={`districts-${group.citySlug}`}
          className="grid gap-6 py-9 md:py-11 lg:grid-cols-[16rem_1fr] lg:gap-12"
        >
          <div>
            <h3
              id={`districts-${group.citySlug}`}
              className="font-serif text-[1.9rem] leading-tight font-medium tracking-[-0.02em]"
            >
              {group.cityName}
            </h3>
            <p className="text-muted-foreground mt-1.5 text-sm">{group.countLabel}</p>
            <Link
              href={{ pathname: '/locations/[slug]', params: { slug: group.citySlug } }}
              className="text-brand-700 border-brand-700/30 hover:border-brand-700 mt-5 inline-block border-b pb-0.5 text-sm font-semibold transition-colors"
            >
              {group.cityLinkLabel}
            </Link>
          </div>
          <ul className="columns-2 gap-x-8 sm:columns-3 xl:columns-4">
            {group.districts.map((district) => (
              <li key={district.slug} className="break-inside-avoid">
                <Link
                  href={{
                    pathname: '/districts/[city]/[slug]',
                    params: { city: group.citySlug, slug: district.slug },
                  }}
                  className="hover:text-brand-700 decoration-brand-700/40 inline-block py-1.5 text-[15px] underline-offset-4 transition-colors hover:underline"
                >
                  {district.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
