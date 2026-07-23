import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

type FooterStat = { value: string; label: string }

const LINK_CLASSES = 'text-[15px] text-neutral-400 transition-colors hover:text-white'
const COLUMN_TITLE_CLASSES = 'text-brand-500 mb-1 text-xs font-semibold uppercase tracking-[0.14em]'

export async function SiteFooter() {
  const t = await getTranslations('Footer')
  const tSite = await getTranslations('Site')
  const locale = await getLocale()
  const stats = t.raw('stats') as FooterStat[]
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface-dark pt-18 pb-10">
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        {/* Stats band */}
        <div className="grid grid-cols-2 gap-8 border-b border-white/12 pb-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1.5">
              <span className="text-brand-500 font-serif text-3xl font-semibold md:text-[40px]">
                {stat.value}
              </span>
              <span className="text-[15px] text-neutral-500">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Image
              src="/immonation-logo-white-text.png"
              alt={`${tSite('name')} GmbH`}
              width={167}
              height={32}
              className="h-8 w-auto self-start"
            />
            <p className="max-w-[40ch] text-[15px] leading-relaxed text-neutral-500">
              {t('claim')}
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className={COLUMN_TITLE_CLASSES}>{t('sell.title')}</span>
            <Link href="/property-valuation" className={LINK_CLASSES}>
              {t('sell.valuation')}
            </Link>
            <Link
              href={{
                pathname: '/sell/[slug]',
                params: { slug: locale === 'de' ? 'haus' : 'house' },
              }}
              className={LINK_CLASSES}
            >
              {t('sell.house')}
            </Link>
            <Link
              href={{
                pathname: '/sell/[slug]',
                params: { slug: locale === 'de' ? 'wohnung' : 'apartment' },
              }}
              className={LINK_CLASSES}
            >
              {t('sell.apartment')}
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className={COLUMN_TITLE_CLASSES}>{t('buy.title')}</span>
            <Link href="/buy" className={LINK_CLASSES}>
              {t('buy.listings')}
            </Link>
            <Link href="/contact" className={LINK_CLASSES}>
              {t('buy.searchRequest')}
            </Link>
            <Link href="/services" className={LINK_CLASSES}>
              {t('buy.financing')}
            </Link>
            <Link href="/services" className={LINK_CLASSES}>
              {t('buy.buyerAdvice')}
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className={COLUMN_TITLE_CLASSES}>{t('company.title')}</span>
            <Link href="/about" className={LINK_CLASSES}>
              {t('company.about')}
            </Link>
            <Link href="/references" className={LINK_CLASSES}>
              {t('company.references')}
            </Link>
            <Link href="/blog" className={LINK_CLASSES}>
              {t('company.guide')}
            </Link>
            <Link href="/faq" className={LINK_CLASSES}>
              {t('company.faq')}
            </Link>
            <Link href="/careers" className={LINK_CLASSES}>
              {t('company.careers')}
            </Link>
            <Link href="/referrers" className={LINK_CLASSES}>
              {t('company.referrers')}
            </Link>
            <Link href="/downloads" className={LINK_CLASSES}>
              {t('company.downloads')}
            </Link>
            <Link href="/contact" className={LINK_CLASSES}>
              {t('company.contact')}
            </Link>
          </div>
        </div>

        {/* Legal row */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/12 pt-8">
          <span className="text-sm text-neutral-600">{t('copyright', { year })}</span>
          <div className="flex gap-6">
            <Link
              href="/imprint"
              className="text-sm text-neutral-600 transition-colors hover:text-white"
            >
              {t('imprint')}
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-neutral-600 transition-colors hover:text-white"
            >
              {t('privacy')}
            </Link>
            <Link
              href="/terms"
              className="text-sm text-neutral-600 transition-colors hover:text-white"
            >
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
