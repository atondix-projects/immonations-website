import { ArrowUpRight, Users } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { AnimatedNumber } from '@/components/site/animated-number'
import { VIRTUAL_TOUR } from '@/lib/content/virtual-tour'
import {
  PremiumMarketingSystem,
  type MarketingService,
  type VisualizationExample,
} from '@/components/site/home/premium-marketing-system'

export async function PremiumMarketing({
  showNetworkProof = false,
}: {
  showNetworkProof?: boolean
}) {
  const t = await getTranslations('PremiumMarketing')
  const tVideo = await getTranslations('VideoDialog')
  const services = t.raw('services') as MarketingService[]
  const visualizationExamples = t.raw('visualizationExamples') as VisualizationExample[]

  return (
    <section
      id="virtuelle-besichtigung"
      className="scroll-mt-24 overflow-hidden border-y border-neutral-200 bg-neutral-50 py-16 text-neutral-950 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-brand-600 text-[13px] font-semibold tracking-[0.16em] uppercase">
            {t('eyebrow')}
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.04] font-semibold text-balance md:text-[54px]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-5 max-w-[70ch] text-lg leading-[1.65] text-pretty text-neutral-600">
            {t('lede')}
          </p>
          {showNetworkProof ? (
            <div className="mx-auto mt-7 flex w-fit max-w-full items-center gap-4 bg-white px-5 py-4 text-left shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
              <span
                aria-hidden="true"
                className="bg-brand-50 text-brand-700 flex size-11 shrink-0 items-center justify-center"
              >
                <Users className="size-5" strokeWidth={1.6} />
              </span>
              <span className="flex flex-col gap-1">
                <span className="flex flex-wrap items-baseline gap-x-2.5">
                  <AnimatedNumber
                    value={t('networkProofValue')}
                    className="font-serif text-[1.75rem] leading-none font-semibold tracking-[-0.02em] md:text-3xl"
                  />
                  <span className="text-[15px] leading-tight font-semibold text-neutral-900">
                    {t('networkProofLabel')}
                  </span>
                </span>
                <span className="max-w-[34ch] text-[13px] leading-snug text-neutral-500">
                  {t('networkProofNote')}
                </span>
              </span>
            </div>
          ) : null}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/property-valuation"
              className="bg-surface-dark inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-[background-color,scale] duration-150 hover:bg-neutral-800 active:scale-[0.96] motion-reduce:transition-none"
            >
              {t('primaryCta')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/sell"
              className="inline-flex min-h-11 items-center justify-center px-6 py-3 text-sm font-semibold text-neutral-950 shadow-[0_0_0_1px_rgba(0,0,0,0.22)] transition-[box-shadow,scale] duration-150 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.48)] active:scale-[0.96] motion-reduce:transition-none"
            >
              {t('secondaryCta')}
            </Link>
          </div>
        </div>

        <div className="mt-12 md:mt-14">
          <PremiumMarketingSystem
            services={services}
            tourUrl={VIRTUAL_TOUR?.url ?? null}
            visualizationExamples={visualizationExamples}
            labels={{
              tabList: t('tabList'),
              included: t('included'),
              result: t('result'),
              videoLabel: t('videoLabel'),
              videoFallback: t('videoFallback'),
              aiVisualization: t('aiVisualization'),
              visualizationExamplesLabel: t('visualizationExamplesLabel'),
              video: { play: tVideo('play'), close: tVideo('close') },
              tour: {
                title: t('tourTitle'),
                consentNote: t('tourConsentNote', { provider: VIRTUAL_TOUR?.provider ?? '' }),
                openOverlayLabel: t('tourOpenOverlayLabel'),
                closeLabel: t('tourCloseOverlayLabel'),
                loadingLabel: t('tourLoadingLabel'),
                failedTitle: t('tourFailedTitle'),
                failedText: t('tourFailedText', { provider: VIRTUAL_TOUR?.provider ?? '' }),
                failedLinkLabel: t('tourOpenLabel', { provider: VIRTUAL_TOUR?.provider ?? '' }),
              },
            }}
          />
        </div>
      </div>
    </section>
  )
}
