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
}

export function CatalogPage({
  eyebrow,
  title,
  lede,
  answer,
  sections,
  faq,
  preview,
  cta,
}: {
  eyebrow: string
  title: string
  lede: string
  answer: string
  sections: CatalogSection[]
  faq?: FaqItem[]
  preview?: ReactNode
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
        <div className="mx-auto grid w-full max-w-[1240px] gap-px bg-neutral-900/10 px-6 md:grid-cols-3 lg:px-10">
          {sections.map((section, index) => (
            <article key={section.title} className="bg-background p-7 md:p-9">
              <span className="text-brand-700 font-mono text-xs tabular-nums">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="mt-6 font-serif text-2xl leading-tight font-semibold">{section.title}</h2>
              <p className="text-muted-foreground mt-4 text-[15px] leading-[1.75]">{section.text}</p>
              <Link href={cta.href} className="text-brand-700 mt-7 inline-flex items-center gap-2 text-sm font-semibold">
                {cta.label}<ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      {faq?.length ? <FaqSection title="FAQ" items={faq} /> : null}
      <CtaBand title={cta.title} text={cta.text} primary={{ label: cta.label, href: cta.href }} />
    </div>
  )
}

