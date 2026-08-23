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

const SERVICES = [
  { href: '/sell', icon: KeyRound },
  { href: '/property-valuation', icon: Calculator },
  { href: '/floor-plans', icon: ScanLine },
  { href: '/selling-situations', icon: Waypoints },
  { href: '/virtual-tour', icon: Search },
  { href: '/staging', icon: Sparkles },
  { href: '/video', icon: Video },
  { href: '/buyer-search', icon: UsersRound },
  { href: '/financing', icon: Landmark },
] as const

export async function ServicesOverview({ compact = false }: { compact?: boolean }) {
  const t = await getTranslations('Home.servicesOverview')
  const items = t.raw('items') as ServiceItem[]
  const priorityItems = items.slice(0, 3)
  const supportingItems = items.slice(3)

  function renderService(item: ServiceItem, index: number, isPriority: boolean) {
    const service = SERVICES[index] ?? SERVICES[0]
    const Icon = service.icon

    return (
      <Link
        key={item.title}
        href={service.href}
        className={
          isPriority
            ? 'border-border hover:border-foreground group flex min-h-64 flex-col gap-4 border bg-white p-7 transition-colors'
            : 'border-border hover:border-foreground group grid min-h-40 grid-cols-[auto_1fr] gap-x-4 gap-y-2 border bg-white p-5 transition-colors'
        }
      >
        <Icon
          className={isPriority ? 'text-primary size-6' : 'text-primary mt-0.5 size-5'}
          strokeWidth={1.75}
          aria-hidden
        />
        <h4 className={isPriority ? 'text-[21px] leading-tight font-semibold' : 'font-semibold'}>
          {item.title}
        </h4>
        <p
          className={
            isPriority
              ? 'text-muted-foreground text-[15px] leading-[1.55]'
              : 'text-muted-foreground col-start-2 text-sm leading-[1.55]'
          }
        >
          {item.text}
        </p>
        <span
          className={
            isPriority
              ? 'text-primary mt-auto text-sm font-medium tracking-[0.04em]'
              : 'text-primary col-start-2 mt-auto text-xs font-semibold'
          }
        >
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
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supportingItems.map((item, index) => renderService(item, index + 3, false))}
        </div>
      </div>
    </div>
  )
}
