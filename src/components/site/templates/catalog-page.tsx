import type { ComponentProps, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { CtaBand } from './cta-band'
import { FaqSection, type FaqItem } from './faq-section'
import { PageHero } from './page-hero'

type LinkHref = ComponentProps<typeof Link>['href']

export type CatalogSection = {
  title: string
  text: string
  href?: LinkHref
}

export function CatalogPage({
  eyebrow,
  title,
  lede,
  answer,
  sections,
  faq,
  preview,
  extra,
  cta,
}: {
  eyebrow: string
  title: string
  lede: string
  answer: string
  sections: CatalogSection[]
  faq?: FaqItem[]
  preview?: ReactNode
  /** Seitenspezifischer Abschnitt unterhalb der Katalogsektionen. */
  extra?: ReactNode
  cta: { title: string; text: string; label: string; href: LinkHref }
}) {
  return (
    <div className="bg-background">
      <PageHero eyebrow={eyebrow} title={title} lede={lede} />
      <section className="border-border bg-muted/45 border-y py-10 md:py-12">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <p className="max-w-[82ch] text-[17px] leading-[1.75] text-pretty">{answer}</p>
        </div>
      </section>
      {preview}
      <section className="py-16 md:py-24">
        {/* Das Trennraster liegt bewusst auf einem inneren Element: Trägt der
            Container den Seitenabstand und die Hairline-Fläche gemeinsam, malt
            `bg-neutral-900/10` in die Polsterung und die Sektion bekommt links
            und rechts je einen grauen Balken neben den Karten. */}
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <div className="border-border grid gap-px border bg-neutral-900/10 md:grid-cols-3">
            {sections.map((section, index) => (
              <article key={section.title} className="bg-background flex flex-col p-7 md:p-9">
                <span className="text-brand-700 font-mono text-xs tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-6 font-serif text-2xl leading-tight font-semibold text-balance">
                  {section.title}
                </h2>
                <p className="text-muted-foreground mt-4 text-[15px] leading-[1.75]">
                  {section.text}
                </p>
                {section.href ? (
                  <Link
                    href={section.href}
                    className="text-brand-700 mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold"
                  >
                    {section.title}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
      {extra}
      {faq?.length ? <FaqSection title="FAQ" items={faq} /> : null}
      <CtaBand title={cta.title} text={cta.text} primary={{ label: cta.label, href: cta.href }} />
    </div>
  )
}
