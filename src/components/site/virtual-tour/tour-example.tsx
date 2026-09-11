import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { TourEmbed } from '@/components/site/home/tour-embed'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getReference, PUBLISH_REFERENCE_METRICS } from '@/lib/content/references'
import { VIRTUAL_TOUR } from '@/lib/content/virtual-tour'

/**
 * Der veröffentlichte Rundgang neben dem Ergebnis genau dieses Objekts. Die
 * Kennzahlen erscheinen nur, wenn die Referenz sie zur Veröffentlichung
 * freigegeben hat — dieselbe Bedingung wie auf der Referenz-Detailseite. Ein
 * Kausalzusammenhang zwischen Rundgang und Ergebnis wird bewusst nicht behauptet.
 *
 * `resultValue` („4 % Verhandlung“) fehlt hier absichtlich: Ohne den Kontext der
 * Detailseite liest es sich als Abschlag unter dem Angebotspreis. Anfragen,
 * Besichtigungen und Vermarktungsdauer sind die Werte, die zum Rundgang passen.
 */
export async function TourExample({ locale }: { locale: Locale }) {
  if (!VIRTUAL_TOUR) return null

  const t = await getTranslations({ locale, namespace: 'VirtualTourPage.example' })
  // Die Rundgang-Labels teilt sich die Seite mit der Startseite (PremiumMarketing).
  const tour = await getTranslations({ locale, namespace: 'PremiumMarketing' })

  const reference = getReference(VIRTUAL_TOUR.referenceId)
  const metrics =
    PUBLISH_REFERENCE_METRICS &&
    reference?.publication.metricsApproved &&
    reference.metrics?.approved
      ? reference.metrics
      : null
  const duration =
    metrics?.duration && locale === 'de' ? metrics.duration.replace('.', ',') : metrics?.duration
  const facts = [
    { value: metrics?.requests, label: t('requests') },
    { value: metrics?.viewings, label: t('viewings') },
    { value: duration, label: t('weeks') },
  ].filter((fact): fact is { value: string; label: string } => Boolean(fact.value))

  return (
    <section
      id="tour-beispiel"
      className="border-border bg-surface-dark scroll-mt-24 border-y py-18 text-white md:py-24"
    >
      <div className="mx-auto grid w-full max-w-[1320px] gap-10 px-5 sm:px-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-12">
        <div>
          <p className="text-brand-300 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs">
            {t('eyebrow')}
          </p>
          <h2 className="hyphens-headline mt-4 max-w-[16ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance break-words md:text-[3.2rem]">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.75] text-pretty text-neutral-300">
            {t('text')}
          </p>

          {reference && facts.length > 0 ? (
            <div className="mt-9 border-t border-white/15 pt-7">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                {t('proofLabel')}
              </p>
              <p className="mt-2 text-[15px] font-semibold">{reference.title[locale]}</p>
              <dl className="mt-5 grid grid-cols-3 divide-x divide-white/15">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col-reverse px-4 first:pl-0">
                    <dt className="mt-1.5 text-[13px] leading-snug text-neutral-400">
                      {fact.label}
                    </dt>
                    <dd className="font-serif text-3xl leading-none font-semibold tabular-nums md:text-4xl">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 max-w-[46ch] text-[13px] leading-[1.6] text-pretty text-neutral-400">
                {t('proofNote')}
              </p>
              <Link
                href={{ pathname: '/references/[slug]', params: { slug: reference.slug } }}
                className="text-brand-300 mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
              >
                {t('caseLink')}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          ) : null}
        </div>

        <TourEmbed
          url={VIRTUAL_TOUR.url}
          posterSrc={reference?.media[0].src}
          // Unter `sm` ist 16:9 zu flach für Titel und Consent-Hinweis — das Icon würde abgeschnitten.
          className="aspect-[4/3] sm:aspect-video"
          labels={{
            title: tour('tourTitle'),
            consentNote: tour('tourConsentNote', { provider: VIRTUAL_TOUR.provider }),
            openOverlayLabel: tour('tourOpenOverlayLabel'),
            closeLabel: tour('tourCloseOverlayLabel'),
            loadingLabel: tour('tourLoadingLabel'),
            failedTitle: tour('tourFailedTitle'),
            failedText: tour('tourFailedText', { provider: VIRTUAL_TOUR.provider }),
            failedLinkLabel: tour('tourOpenLabel', { provider: VIRTUAL_TOUR.provider }),
          }}
        />
      </div>
    </section>
  )
}
