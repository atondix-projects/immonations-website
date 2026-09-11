import { getTranslations } from 'next-intl/server'
import { TourEmbed } from '@/components/site/home/tour-embed'
import type { Locale } from '@/i18n/routing'
import { createCatalogMetadata, createCatalogPage } from '@/lib/content/catalog-page-route'
import { VIRTUAL_TOUR } from '@/lib/content/virtual-tour'

async function VirtualTourExample({ locale }: { locale: Locale }) {
  if (!VIRTUAL_TOUR) return null

  const t = await getTranslations({ locale, namespace: 'PremiumMarketing' })

  return (
    <section
      id="tour-beispiel"
      className="border-border bg-surface-dark border-y py-16 text-white md:py-24"
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16 lg:px-10">
        <div>
          <p className="text-brand-300 text-[11px] font-semibold tracking-[0.2em] uppercase md:text-xs">
            {t('tourPageEyebrow')}
          </p>
          <h2 className="mt-4 max-w-[16ch] font-serif text-4xl leading-[1.05] font-semibold text-balance md:text-5xl">
            {t('tourPageTitle')}
          </h2>
          <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.75] text-pretty text-neutral-300">
            {t('tourPageText')}
          </p>
        </div>

        <TourEmbed
          url={VIRTUAL_TOUR.url}
          labels={{
            title: t('tourTitle'),
            consentNote: t('tourConsentNote', { provider: VIRTUAL_TOUR.provider }),
            openOverlayLabel: t('tourOpenOverlayLabel'),
            closeLabel: t('tourCloseOverlayLabel'),
            loadingLabel: t('tourLoadingLabel'),
            failedTitle: t('tourFailedTitle'),
            failedText: t('tourFailedText', { provider: VIRTUAL_TOUR.provider }),
            failedLinkLabel: t('tourOpenLabel', { provider: VIRTUAL_TOUR.provider }),
          }}
        />
      </div>
    </section>
  )
}

export const generateMetadata = createCatalogMetadata('virtual-tour')
export default createCatalogPage('virtual-tour', (locale) => <VirtualTourExample locale={locale} />)
