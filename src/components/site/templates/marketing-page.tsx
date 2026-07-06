import type { ComponentProps } from 'react'
import Image from 'next/image'
import { CalendarDays, Check, FileText, Lock, MapPin, ShieldCheck, Star, Users } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { FaqSection, type FaqItem } from './faq-section'

type LinkHref = ComponentProps<typeof Link>['href']

export type MarketingFeature = { title: string; text: string }
export type MarketingStep = { num: string; title: string; text: string }
export type MarketingStat = { value: string; label: string }

export type MarketingPageProps = {
  locale: Locale
  hero: { eyebrow: string; title: string; lede: string }
  /** AEO: answers the page's implicit question in the first prose block. */
  answer: string
  features?: { title?: string; items: MarketingFeature[] }
  steps?: { title?: string; items: MarketingStep[] }
  stats?: MarketingStat[]
  faq?: { title?: string; items: FaqItem[] }
  cta: {
    title: string
    text?: string
    primary: { label: string; href: LinkHref }
    secondary?: { label: string; href: LinkHref }
  }
}

export function MarketingPage({
  locale,
  hero,
  answer,
  features,
  steps,
  stats,
  faq,
  cta,
}: MarketingPageProps) {
  const labels =
    locale === 'de'
      ? {
          simple: 'So einfach geht es',
          report: 'Verkehrswert',
          factors: 'Wesentliche Einflussfaktoren',
          comparables: 'Regionale Vergleichsobjekte',
          region: 'Unser Einsatzgebiet',
          safe: 'Ihre Daten sind sicher. Wir geben keine Informationen weiter.',
        }
      : {
          simple: 'How simple it is',
          report: 'Market value',
          factors: 'Key value drivers',
          comparables: 'Regional comparables',
          region: 'Our service area',
          safe: 'Your data is safe. We do not pass information on.',
        }

  return (
    <div className="bg-background">
      <section className="mx-auto grid w-full max-w-[1440px] overflow-hidden lg:grid-cols-[0.95fr_1.05fr]">
        <div className="px-6 py-16 lg:px-20 lg:py-24">
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.22em]">
            {hero.eyebrow}
          </p>
          <h1 className="mt-8 max-w-[720px] font-serif text-5xl font-semibold leading-[1.02] text-balance md:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-7 max-w-[66ch] text-lg leading-8 text-foreground/90">{hero.lede}</p>
          <p className="text-muted-foreground mt-6 max-w-[72ch] leading-7">{answer}</p>

          {features ? (
            <div className="border-border mt-12 grid gap-6 border-y py-8 sm:grid-cols-2">
              {features.items.map((feature, index) => (
                <article key={feature.title} className="border-border border-b pb-6 sm:border-b-0 sm:border-r sm:pr-6 sm:even:border-r-0">
                  <span className="border-primary text-primary flex size-11 items-center justify-center border">
                    {index === 0 ? (
                      <FileText className="size-5" aria-hidden="true" />
                    ) : index === 1 ? (
                      <MapPin className="size-5" aria-hidden="true" />
                    ) : index === 2 ? (
                      <Check className="size-5" aria-hidden="true" />
                    ) : (
                      <ShieldCheck className="size-5" aria-hidden="true" />
                    )}
                  </span>
                  <h2 className="mt-5 text-base font-semibold leading-snug">{feature.title}</h2>
                  <p className="text-muted-foreground mt-3 text-sm leading-6">{feature.text}</p>
                </article>
              ))}
            </div>
          ) : null}

          {steps ? (
            <section className="mt-12">
              <h2 className="font-serif text-2xl font-semibold">{labels.simple}</h2>
              <ol className="mt-7 grid gap-4 md:grid-cols-3">
                {steps.items.map((step, index) => (
                  <li key={step.num} className="grid gap-3 md:grid-cols-[auto_1fr]">
                    <span className="border-border flex size-12 items-center justify-center border bg-white font-semibold text-primary">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground mt-2 text-sm leading-6">{step.text}</p>
                    </div>
                    {index < steps.items.length - 1 ? (
                      <span className="bg-border mt-6 hidden h-px md:block" />
                    ) : null}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={cta.primary.href}
              className="bg-primary hover:bg-primary/90 inline-flex items-center justify-center gap-3 px-7 py-4 text-sm font-semibold text-white transition-colors"
            >
              {cta.primary.label}
              <Check className="size-4" aria-hidden="true" />
            </Link>
            {cta.secondary ? (
              <Link
                href={cta.secondary.href}
                className="border-foreground/40 hover:border-foreground inline-flex items-center justify-center gap-3 border px-7 py-4 text-sm font-semibold transition-colors"
              >
                <CalendarDays className="size-4" aria-hidden="true" />
                {cta.secondary.label}
              </Link>
            ) : null}
          </div>
          <p className="text-muted-foreground mt-5 inline-flex items-center gap-2 text-xs">
            <Lock className="size-4" aria-hidden="true" />
            {labels.safe}
          </p>
        </div>

        <aside className="bg-muted relative min-h-[720px] overflow-hidden border-l border-border">
          <Image
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=82"
            alt="Modern property prepared for valuation"
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          <div className="relative z-10 grid h-full content-center gap-5 p-6 lg:p-12">
            <div className="border-border bg-white/95 p-7 shadow-sm backdrop-blur">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.16em]">
                    Immonation GmbH
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-semibold">{labels.report}</h2>
                </div>
                <FileText className="text-primary size-7" aria-hidden="true" />
              </div>
              <p className="text-primary mt-7 text-4xl font-semibold tabular-nums">725.000 - 785.000</p>
              <div className="border-border mt-7 border-t pt-6">
                <p className="font-semibold">{labels.factors}</p>
                <ul className="mt-4 grid gap-3 text-sm">
                  {(features?.items ?? []).slice(0, 4).map((feature) => (
                    <li key={feature.title} className="flex items-center gap-3">
                      <Check className="text-primary size-4" aria-hidden="true" />
                      {feature.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-[0.85fr_1fr]">
              <div className="border-border bg-white/95 p-5 shadow-sm backdrop-blur">
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.16em]">
                  {labels.region}
                </p>
                <div className="bg-brand-50 mt-4 flex min-h-36 items-center justify-center">
                  <MapPin className="text-primary size-12" aria-hidden="true" />
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  {locale === 'de' ? '60 km rund um Zirndorf' : '60 km around Zirndorf'}
                </p>
              </div>

              <div className="border-border bg-white/95 p-5 shadow-sm backdrop-blur">
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.16em]">
                  {labels.comparables}
                </p>
                <div className="mt-5 grid gap-4">
                  {['698.000', '742.000', '765.000'].map((price, index) => (
                    <div key={price} className="grid grid-cols-[56px_1fr_auto] items-center gap-3">
                      <div className="relative h-12 overflow-hidden">
                        <Image
                          src={`https://images.unsplash.com/photo-${index === 0 ? '1600566753086-00f18fb6b3ea' : index === 1 ? '1600585154526-990dced4db0d' : '1600607687920-4e2a09cf159d'}?auto=format&fit=crop&w=240&q=80`}
                          alt="Comparable property"
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm">{locale === 'de' ? 'Einfamilienhaus' : 'Single-family home'}</span>
                      <span className="text-primary text-sm font-semibold tabular-nums">{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {stats ? (
        <section className="mx-auto w-full max-w-[1240px] px-6 pb-16 lg:px-10">
          <div className="border-border grid grid-cols-2 border bg-white lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="border-border flex gap-4 border-r p-6 last:border-r-0">
                {index === 0 ? (
                  <Star className="text-primary size-8" aria-hidden="true" />
                ) : index === 2 ? (
                  <Users className="text-primary size-8" aria-hidden="true" />
                ) : (
                  <MapPin className="text-primary size-8" aria-hidden="true" />
                )}
                <div>
                  <span className="font-serif text-3xl font-semibold">{stat.value}</span>
                  <p className="text-muted-foreground mt-1 text-[13px] leading-snug">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {faq ? <FaqSection title={faq.title} items={faq.items} /> : null}
    </div>
  )
}
