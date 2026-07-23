import { Suspense, type ComponentProps } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { ValuationWizard } from '@/components/site/valuation/valuation-wizard'
import { FaqSection, type FaqItem } from './faq-section'
import { CtaBand } from './cta-band'

type LinkHref = ComponentProps<typeof Link>['href']

export type ValuationFeature = { title: string; text: string }
export type ValuationStep = { title: string; text: string }
export type ValuationStat = { value: string; label: string }

export type ValuationPageProps = {
  locale: Locale
  hero: { eyebrow: string; title: string; lede: string }
  answer: string
  features: { title: string; items: ValuationFeature[] }
  steps: { title: string; items: ValuationStep[] }
  stats: ValuationStat[]
  faq: { title: string; items: FaqItem[] }
  cta: {
    title: string
    text?: string
    primary: { label: string; href: LinkHref }
    secondary?: { label: string; href: LinkHref }
  }
}

const CONTAINER = 'mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12'

export function ValuationPage({
  locale,
  hero,
  answer,
  features,
  steps,
  stats,
  faq,
  cta,
}: ValuationPageProps) {
  const labels =
    locale === 'de'
      ? {
          formCaption: 'Interaktiver Prototyp · keine Übertragung',
          trust: 'Ihre Eingaben bleiben in diesem Browser und werden nicht gespeichert.',
        }
      : {
          formCaption: 'Interactive prototype · no transmission',
          trust: 'Your entries stay in this browser and are not stored.',
        }

  return (
    <div className="bg-background">
      <section className="border-border relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/references/nuernberg-einfamilienhaus.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.09] grayscale"
            priority
          />
        </div>

        <div
          className={`${CONTAINER} relative grid gap-12 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(460px,1.1fr)] lg:items-start lg:gap-18 lg:py-24`}
        >
          <div className="flex flex-col gap-6">
            <p className="text-primary text-[13px] font-semibold tracking-[0.16em] uppercase">
              {hero.eyebrow}
            </p>
            <h1 className="max-w-[14ch] font-serif text-[2.8rem] leading-[0.98] font-medium tracking-[-0.035em] text-balance md:text-[4.25rem] lg:text-[5.2rem]">
              {hero.title}
            </h1>
            <p className="text-muted-foreground max-w-[62ch] text-lg leading-[1.65]">{hero.lede}</p>
            <p className="text-foreground/90 max-w-[68ch] text-[17px] leading-[1.7]">{answer}</p>
          </div>

          <div className="lg:sticky lg:top-28">
            <p className="text-muted-foreground mb-3 text-sm font-medium">{labels.formCaption}</p>
            <Suspense
              fallback={
                <div
                  className="border-border bg-neutral-0 min-h-[580px] animate-pulse border motion-reduce:animate-none"
                  aria-hidden="true"
                />
              }
            >
              <ValuationWizard />
            </Suspense>
            <p className="text-muted-foreground mt-4 text-xs leading-relaxed">{labels.trust}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className={CONTAINER}>
          <h2 className="font-serif text-3xl leading-tight font-semibold md:text-[38px]">
            {features.title}
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {features.items.map((feature) => (
              <article key={feature.title} className="flex flex-col gap-3">
                <h3 className="text-lg leading-snug font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground max-w-[52ch] text-[15px] leading-[1.65]">
                  {feature.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border bg-muted border-y py-16 md:py-20">
        <div className={CONTAINER}>
          <h2 className="font-serif text-3xl leading-tight font-semibold md:text-[38px]">
            {steps.title}
          </h2>
          <ol className="mt-10 grid max-w-[760px] gap-8">
            {steps.items.map((step, index) => (
              <li key={step.title} className="grid gap-3 md:grid-cols-[3rem_1fr] md:gap-6">
                <span className="text-primary font-serif text-2xl font-semibold tabular-nums">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground mt-2 max-w-[58ch] text-[15px] leading-[1.65]">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className={CONTAINER}>
          <div className="border-border grid grid-cols-2 gap-8 border-y py-10 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <span className="font-serif text-3xl font-semibold tabular-nums md:text-4xl">
                  {stat.value}
                </span>
                <p className="text-muted-foreground text-sm leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection title={faq.title} items={faq.items} />
      <CtaBand title={cta.title} text={cta.text} primary={cta.primary} secondary={cta.secondary} />
    </div>
  )
}
