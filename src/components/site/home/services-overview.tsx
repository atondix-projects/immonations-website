import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import {
  Calculator,
  KeyRound,
  Landmark,
  ScanLine,
  Search,
  Sparkles,
  UsersRound,
  Video,
  Waypoints,
} from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { CONTAINER } from './section-shell'

type ServiceItem = { title: string; text: string }

/**
 * Nur die drei Schwerpunktleistungen tragen ein Motiv — und nur dort, wo es die Leistung
 * tatsächlich zeigt: der Grundriss ist die echte Ingenieurs-Zeichnung von der Leistungsseite,
 * die beiden Objektfotos sind anonymisierte Gattungsbilder ohne konkretes Kundenobjekt.
 * Für Bewertungsanlässe, Käufersuche oder Finanzierung gibt es kein ehrliches Motiv;
 * diese Kacheln bleiben deshalb bewusst textbasiert statt mit Stockfotos gefüllt.
 */
const SERVICES = [
  { href: '/sell', icon: KeyRound, image: '/images/generic/generic-sandstone-house-exterior.webp' },
  {
    href: '/property-valuation',
    icon: Calculator,
    image: '/images/generic/generic-aerial-house-alt.webp',
  },
  {
    // Nicht die Grundriss-Zeichnung: Sie besteht aus hellen Haarlinien auf Weiß und ist in
    // einer 228 px breiten Kachel zu 96 % weiße Fläche (gemessen: Mittelwert 241/255,
    // 3,4 % Tintenpixel) — auch mit Zoom und Kontrast bleibt sie eine leere Box.
    // Der leere, unmöblierte Raum zeigt dagegen genau das, was hier aufgemessen wird.
    href: '/floor-plans',
    icon: ScanLine,
    image: '/images/generic/generic-empty-living-room.webp',
  },
  { href: '/selling-situations', icon: Waypoints, image: null },
  { href: '/virtual-tour', icon: Search, image: null },
  { href: '/staging', icon: Sparkles, image: null },
  { href: '/video', icon: Video, image: null },
  { href: '/buyer-search', icon: UsersRound, image: null },
  { href: '/financing', icon: Landmark, image: null },
] as const

export async function ServicesOverview({ compact = false }: { compact?: boolean }) {
  const t = await getTranslations('Home.servicesOverview')
  const items = t.raw('items') as ServiceItem[]
  const priorityItems = items.slice(0, 3)
  const supportingItems = items.slice(3)

  function renderService(item: ServiceItem, index: number, isPriority: boolean) {
    const service = SERVICES[index] ?? SERVICES[0]
    const Icon = service.icon

    if (isPriority) {
      return (
        <Link
          key={item.title}
          href={service.href}
          className="border-border hover:border-foreground group flex flex-col border bg-white transition-colors"
        >
          {service.image ? (
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
              <Image
                src={service.image}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
              />
              <span
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                aria-hidden="true"
              />
              <span className="absolute bottom-3 left-3 flex size-10 items-center justify-center bg-white/95 backdrop-blur-sm">
                <Icon className="text-primary size-5" strokeWidth={1.75} aria-hidden />
              </span>
            </div>
          ) : null}
          <div className="flex flex-1 flex-col gap-3 p-7">
            <h4 className="text-[21px] leading-tight font-semibold">{item.title}</h4>
            <p className="text-muted-foreground text-[15px] leading-[1.55]">{item.text}</p>
            <span className="text-primary mt-auto pt-2 text-sm font-medium tracking-[0.04em]">
              {t('itemLink')}
            </span>
          </div>
        </Link>
      )
    }

    return (
      <Link
        key={item.title}
        href={service.href}
        className="group hover:bg-muted/60 grid min-h-40 grid-cols-[auto_1fr] gap-x-4 gap-y-2 bg-white p-6 transition-colors"
      >
        <Icon className="text-primary mt-0.5 size-5" strokeWidth={1.75} aria-hidden />
        <h4 className="font-semibold">{item.title}</h4>
        <p className="text-muted-foreground col-start-2 text-sm leading-[1.55]">{item.text}</p>
        <span className="text-primary col-start-2 mt-auto text-xs font-semibold">
          {t('itemLink')}
        </span>
      </Link>
    )
  }

  return (
    <div
      id="leistungen"
      className={
        compact
          ? 'bg-muted border-border scroll-mt-24 border-y py-14 md:py-18'
          : 'bg-muted border-border scroll-mt-24 border-y py-16 md:py-24'
      }
    >
      <div className={CONTAINER}>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <div>
            <p className="text-brand-700 text-[11px] font-semibold tracking-[0.2em] uppercase">
              {t('eyebrow')}
            </p>
            <h3 className="mt-4 max-w-[18ch] font-serif text-3xl leading-tight font-semibold text-balance md:text-[40px]">
              {t('title')}
            </h3>
          </div>
          <Link href="/sell" className="text-brand-700 text-sm font-semibold">
            {t('link')}
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {priorityItems.map((item, index) => renderService(item, index, true))}
        </div>
        {/* Hairline-Raster statt einzeln umrandeter Kacheln: Die sechs ergänzenden
            Leistungen lesen sich als ein zusammenhängender Block und konkurrieren
            optisch nicht mehr mit den drei Schwerpunktkarten darüber. */}
        <div className="border-border mt-5 grid gap-px border bg-neutral-900/10 sm:grid-cols-2 lg:grid-cols-3">
          {supportingItems.map((item, index) => renderService(item, index + 3, false))}
        </div>
      </div>
    </div>
  )
}
