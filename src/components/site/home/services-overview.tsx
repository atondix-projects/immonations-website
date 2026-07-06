import { getTranslations } from 'next-intl/server'
import {
  Building2,
  Calculator,
  KeyRound,
  Landmark,
  Search,
  TrendingUp,
} from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { CONTAINER, SectionHeader } from './section-shell'

type ServiceItem = { title: string; text: string }

const SERVICE_ICONS = [KeyRound, Calculator, Building2, Search, Landmark, TrendingUp] as const

export async function ServicesOverview() {
  const t = await getTranslations('Home.servicesOverview')
  const items = t.raw('items') as ServiceItem[]

  return (
    <section id="leistungen" className="bg-muted border-border scroll-mt-24 border-y py-16 md:py-24">
      <div className={CONTAINER}>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          link={{ label: t('link'), href: '/services' }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = SERVICE_ICONS[index] ?? KeyRound
            return (
              <Link
                key={item.title}
                href="/services"
                className="border-border hover:border-foreground group flex flex-col gap-4 border bg-white p-7 transition-colors"
              >
                <Icon className="text-primary size-6" strokeWidth={1.75} aria-hidden />
                <h3 className="text-[21px] font-semibold leading-tight">{item.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-[1.55]">{item.text}</p>
                <span className="text-primary mt-auto text-sm font-medium tracking-[0.04em] opacity-0 transition-opacity group-hover:opacity-100">
                  {t('itemLink')}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
