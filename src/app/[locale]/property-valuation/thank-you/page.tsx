import type { Metadata } from 'next'
import { ArrowLeft, CalendarDays, Check } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: 'ValuationThankYou' })

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    robots: { index: false, follow: false },
  }
}

export default async function ValuationThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations('ValuationThankYou')

  return (
    <section className="bg-muted/45 flex min-h-[72dvh] items-center border-y border-neutral-200 py-20">
      <div className="mx-auto w-full max-w-[880px] px-5 sm:px-7">
        <div className="border-border bg-neutral-0 p-7 sm:p-12 lg:p-16">
          <span className="bg-brand-100 text-brand-800 flex size-12 items-center justify-center rounded-full">
            <Check className="size-5" aria-hidden="true" />
          </span>
          <p className="text-brand-700 mt-8 text-[11px] font-semibold tracking-[0.2em] uppercase">
            {t('eyebrow')}
          </p>
          <h1 className="mt-4 max-w-[16ch] font-serif text-[2.8rem] leading-[1.02] font-medium tracking-[-0.03em] text-balance md:text-[4.25rem]">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-[62ch] text-lg leading-[1.75]">
            {t('text')}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="bg-brand-700 hover:bg-brand-800 inline-flex min-h-12 items-center gap-2 px-6 text-sm font-semibold text-white"
            >
              <CalendarDays className="size-4" aria-hidden="true" />
              {t('contact')}
            </Link>
            <Link
              href="/property-valuation"
              className="border-border inline-flex min-h-12 items-center gap-2 border px-6 text-sm font-semibold hover:border-neutral-600"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t('back')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
