import {
  Armchair,
  ArrowUpRight,
  BadgeCheck,
  Check,
  HardHat,
  HeartHandshake,
  MapPin,
  TrendingUp,
  UserRound,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { BuyerProfile, BuyerSegment } from '@/lib/content/buyer-profiles'

const SEGMENT_ICONS: Record<BuyerSegment, LucideIcon> = {
  family: UsersRound,
  single: UserRound,
  couple: HeartHandshake,
  investor: TrendingUp,
  retirees: Armchair,
  developer: HardHat,
}

export type BuyerProfileCardLabels = {
  wishes: string
  districts: string
  cta: string
}

const LABEL = 'text-foreground text-[11px] font-semibold uppercase tracking-[0.16em]'

/** Ein Suchprofil als „Karteikarte“: wer sucht, bis zu welchem Budget, wo und was zählt. */
export function BuyerProfileCard({
  profile,
  labels,
}: {
  profile: BuyerProfile
  labels: BuyerProfileCardLabels
}) {
  const Icon = SEGMENT_ICONS[profile.segment]
  const titleId = `suchprofil-${profile.id}`

  return (
    <article
      aria-labelledby={titleId}
      className="group border-border bg-background hover:border-brand-700/40 flex h-full flex-col border transition-colors duration-300"
    >
      <header className="border-border flex items-center justify-between gap-4 border-b px-6 py-4 md:px-7">
        <span className="text-brand-700 inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] uppercase">
          <span className="bg-brand-50 grid size-9 shrink-0 place-items-center rounded-full">
            <Icon className="size-[18px]" aria-hidden="true" />
          </span>
          {profile.segmentLabel}
        </span>
        <span className="text-muted-foreground font-mono text-[11px] tracking-wide tabular-nums">
          {profile.code}
        </span>
      </header>

      <div className="flex flex-1 flex-col px-6 pt-6 pb-7 md:px-7">
        <h3
          id={titleId}
          className="font-serif text-[1.4rem] leading-[1.22] font-medium tracking-[-0.01em] text-balance"
        >
          {profile.headline}
        </h3>

        <p className="mt-5 flex items-baseline gap-2">
          <span className="text-muted-foreground text-sm">{profile.budget.prefix}</span>
          <span className="font-serif text-[2.1rem] leading-none font-semibold tracking-[-0.02em] tabular-nums">
            {profile.budget.amount}
          </span>
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {[profile.propertyTypeLabel, ...profile.facts].map((fact) => (
            <li
              key={fact}
              className="border-border bg-muted/45 border px-2.5 py-1 text-[13px] font-medium"
            >
              {fact}
            </li>
          ))}
        </ul>

        <p className="text-muted-foreground mt-5 text-[15px] leading-[1.7]">{profile.brief}</p>

        <div className="mt-6">
          <p className={LABEL}>{labels.wishes}</p>
          <ul className="mt-3 grid gap-2">
            {profile.wishes.map((wish) => (
              <li key={wish} className="flex gap-2.5 text-[14px] leading-[1.5]">
                <Check className="text-brand-600 mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {wish}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-6">
          <p className={`${LABEL} inline-flex items-center gap-1.5`}>
            <MapPin className="text-brand-700 size-3.5" aria-hidden="true" />
            {labels.districts} · {profile.cityName}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {profile.districts.map((district) => (
              <li key={district.slug}>
                <Link
                  href={{
                    pathname: '/districts/[city]/[slug]',
                    params: { city: profile.city, slug: district.slug },
                  }}
                  className="text-brand-800 decoration-brand-700/30 hover:decoration-brand-700 text-sm font-medium underline underline-offset-4 transition-colors"
                >
                  {district.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="border-border flex flex-wrap items-center justify-between gap-3 border-t px-6 py-3 md:px-7">
        <span className="text-muted-foreground inline-flex items-center gap-1.5 text-[13px]">
          <BadgeCheck className="text-brand-600 size-4" aria-hidden="true" />
          {profile.financingLabel}
        </span>
        <Link
          href="/contact"
          className="text-brand-700 hover:text-brand-800 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold transition-colors"
        >
          {labels.cta}
          <span className="sr-only"> – {profile.code}</span>
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </footer>
    </article>
  )
}
