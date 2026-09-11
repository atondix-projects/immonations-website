import { ArrowUpRight } from 'lucide-react'
import { ImmonationMark } from '@/components/site/brand/immonation-mark'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { listBuyerProfilesForDistrict } from '@/lib/content/buyer-profiles'
import { BuyerProfileCard } from './buyer-profile-card'
import { BUYER_SEARCH_COPY } from './buyer-search-copy'

/**
 * Die Suchprofile, die diesen Stadtteil als Wunschlage nennen — auf der Stadtteilseite, mit
 * Deep Link auf die gefilterte Suchkunden-Seite. Ohne passendes Profil rendert nichts.
 */
export function DistrictBuyerProfiles({
  locale,
  city,
  slug,
}: {
  locale: Locale
  city: string
  slug: string
}) {
  const profiles = listBuyerProfilesForDistrict(locale, city, slug)
  const district = profiles[0]?.districts.find((entry) => entry.slug === slug)
  if (!district) return null

  const copy = BUYER_SEARCH_COPY[locale]
  const fill = (template: string) => template.replaceAll('{district}', district.name)

  return (
    <section
      data-district-buyer-profiles
      className="border-border bg-muted/45 border-y py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="flex flex-col gap-3.5">
            <span className="flex items-center gap-2.5">
              <ImmonationMark className="h-5 shrink-0" />
              <span className="text-brand-700 text-[11px] font-semibold tracking-[0.2em] uppercase md:text-xs">
                {copy.districtPage.eyebrow}
              </span>
            </span>
            <h2 className="max-w-[22ch] font-serif text-3xl leading-[1.08] font-medium tracking-[-0.02em] text-balance md:text-[2.6rem]">
              {fill(copy.districtPage.title)}
            </h2>
            <p className="text-muted-foreground max-w-[62ch] text-[16px] leading-[1.7]">
              {fill(copy.districtPage.text)}
            </p>
          </div>
          <Link
            href={{
              pathname: '/buyer-search',
              query: { stadt: city, stadtteil: district.name },
            }}
            className="text-brand-700 border-brand-700/30 hover:border-brand-700 inline-flex items-center gap-1.5 self-start border-b pb-1 text-sm font-semibold whitespace-nowrap transition-colors lg:self-end"
          >
            {copy.districtPage.link}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ul role="list" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {profiles.map((profile) => (
            <li key={profile.id}>
              <BuyerProfileCard profile={profile} labels={copy.board} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
