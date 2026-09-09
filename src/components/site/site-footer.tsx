import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

const LINK_CLASSES =
  'text-[15px] leading-snug text-neutral-400 transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:outline-none'
const COLUMN_TITLE_CLASSES = 'text-brand-500 mb-1 text-xs font-semibold uppercase tracking-[0.14em]'
/** Zweitrangige Gruppe innerhalb einer Spalte — leiser als die Spaltenüberschrift. */
const SUBGROUP_TITLE_CLASSES =
  'mt-4 mb-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-600'
const SUBGROUP_LINK_CLASSES =
  'text-sm leading-snug text-neutral-500 transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:outline-none'
const BADGE_CLASSES = 'border border-white/15 px-3 py-2 text-[13px] leading-none text-neutral-400'

export async function SiteFooter() {
  const t = await getTranslations('Footer')
  const tSite = await getTranslations('Site')
  const locale = await getLocale()
  const year = new Date().getFullYear()

  return (
    <footer data-site-footer className="bg-surface-dark pt-18 pb-10">
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:gap-8">
          {/* Marke: Logo, Claim und die belegbaren Vertrauensnachweise. */}
          <div className="flex flex-col items-start gap-5">
            <Image
              src="/brand/immonation-logo-inverse.svg"
              alt={`${tSite('name')} GmbH`}
              width={167}
              height={32}
              className="h-8 w-auto"
            />
            <p className="max-w-[34ch] text-[15px] leading-relaxed text-neutral-500">
              {t('claim')}
            </p>
            <div className="flex flex-col items-start gap-2.5">
              <span className={BADGE_CLASSES}>{t('badges.immowelt')}</span>
              {/* Führt zum Markenschutz-Abschnitt mit Registernummer und Zertifikat. */}
              <Link
                href={{ pathname: '/about', hash: '#markenschutz' }}
                className={`${BADGE_CLASSES} transition-colors hover:border-white/40 hover:text-white focus-visible:border-white/40 focus-visible:text-white focus-visible:outline-none`}
              >
                {t('badges.trademark')}
              </Link>
            </div>
            <div className="flex flex-col items-start gap-4">
              <Image
                src="/images/reviews/maklersieger-badge.svg"
                alt={t('badges.maklersiegerAlt')}
                width={300}
                height={100}
                unoptimized
                className="h-14 w-auto"
              />
              <Image
                src="/images/reviews/seals/makler-siegel.png"
                alt={t('badges.maklersiegelAlt')}
                width={300}
                height={282}
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className={COLUMN_TITLE_CLASSES}>{t('sell.title')}</span>
            <Link href="/sell" className={LINK_CLASSES}>
              {t('sell.sell')}
            </Link>
            <Link href="/property-valuation" className={LINK_CLASSES}>
              {t('sell.valuation')}
            </Link>
            <Link href="/floor-plans" className={LINK_CLASSES}>
              {t('sell.floorPlans')}
            </Link>
            <Link href="/selling-situations" className={LINK_CLASSES}>
              {t('sell.situations')}
            </Link>
            <Link href="/references" className={LINK_CLASSES}>
              {t('sell.references')}
            </Link>
            <Link href="/buyer-search" className={LINK_CLASSES}>
              {t('sell.buyerSearch')}
            </Link>

            <span className={SUBGROUP_TITLE_CLASSES}>{t('sell.byType')}</span>
            <Link
              href={{
                pathname: '/sell/[slug]',
                params: { slug: locale === 'de' ? 'haus' : 'house' },
              }}
              className={SUBGROUP_LINK_CLASSES}
            >
              {t('sell.house')}
            </Link>
            <Link
              href={{
                pathname: '/sell/[slug]',
                params: { slug: locale === 'de' ? 'wohnung' : 'apartment' },
              }}
              className={SUBGROUP_LINK_CLASSES}
            >
              {t('sell.apartment')}
            </Link>
            <Link
              href={{
                pathname: '/sell/[slug]',
                params: { slug: locale === 'de' ? 'grundstueck' : 'land' },
              }}
              className={SUBGROUP_LINK_CLASSES}
            >
              {t('sell.land')}
            </Link>
            <Link
              href={{
                pathname: '/sell/[slug]',
                params: {
                  slug: locale === 'de' ? 'mehrfamilienhaus' : 'apartment-building',
                },
              }}
              className={SUBGROUP_LINK_CLASSES}
            >
              {t('sell.apartmentBuilding')}
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className={COLUMN_TITLE_CLASSES}>{t('buy.title')}</span>
            <Link href="/buy" className={LINK_CLASSES}>
              {t('buy.listings')}
            </Link>
            <Link href="/virtual-tour" className={LINK_CLASSES}>
              {t('buy.virtualTour')}
            </Link>
            <Link href="/financing" className={LINK_CLASSES}>
              {t('buy.financing')}
            </Link>
            <Link href="/ai" className={LINK_CLASSES}>
              {t('buy.ai')}
            </Link>
            <Link href="/appointment" className={LINK_CLASSES}>
              {t('buy.appointment')}
            </Link>
            <Link href="/downloads" className={LINK_CLASSES}>
              {t('buy.downloads')}
            </Link>
            <Link href="/faq" className={LINK_CLASSES}>
              {t('buy.faq')}
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className={COLUMN_TITLE_CLASSES}>{t('company.title')}</span>
            <Link href="/about" className={LINK_CLASSES}>
              {t('company.about')}
            </Link>
            <Link href="/group" className={LINK_CLASSES}>
              {t('company.group')}
            </Link>
            <Link href="/awards" className={LINK_CLASSES}>
              {t('company.awards')}
            </Link>
            <Link href="/locations" className={LINK_CLASSES}>
              {t('company.locations')}
            </Link>
            <Link href="/reviews" className={LINK_CLASSES}>
              {t('company.reviews')}
            </Link>
            <Link href="/engagement" className={LINK_CLASSES}>
              {t('company.engagement')}
            </Link>
            <Link href="/careers" className={LINK_CLASSES}>
              {t('company.careers')}
            </Link>
            <Link href="/referrers" className={LINK_CLASSES}>
              {t('company.referrers')}
            </Link>
            <Link href="/blog" className={LINK_CLASSES}>
              {t('company.guide')}
            </Link>
            <Link href="/contact" className={LINK_CLASSES}>
              {t('company.contact')}
            </Link>
            <Link href="/directions" className={LINK_CLASSES}>
              {t('company.directions')}
            </Link>
          </div>
        </div>

        {/* Legal row */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/12 pt-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-sm text-neutral-600">{t('copyright', { year })}</span>
          </div>
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
