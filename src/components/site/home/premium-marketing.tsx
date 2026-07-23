import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import {
  PremiumMarketingSystem,
  type MarketingService,
} from '@/components/site/home/premium-marketing-system'

export async function PremiumMarketing() {
  const t = await getTranslations('PremiumMarketing')
  const services = t.raw('services') as MarketingService[]

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
            labels={{
              tabList: t('tabList'),
              included: t('included'),
              result: t('result'),
              videoLabel: t('videoLabel'),
              videoFallback: t('videoFallback'),
            }}
          />
        </div>
      </div>
    </section>
  )
}
