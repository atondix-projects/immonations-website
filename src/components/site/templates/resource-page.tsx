import type { ComponentProps, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { PageHero } from './page-hero'
import { CtaBand } from './cta-band'
import type { TextSection } from './text-page'

type LinkHref = ComponentProps<typeof Link>['href']

export type ResourcePageAction = {
  title: string
  text?: string
  label: string
  href: LinkHref
}

export function ResourcePage({
  locale,
  eyebrow,
  title,
  lede,
  sections,
  note,
  feature,
  action,
}: {
  locale: Locale
  eyebrow: string
  title: string
  lede?: string
  sections: TextSection[]
  note?: string
  feature?: ReactNode
  action: ResourcePageAction
}) {
  const labels =
    locale === 'de'
      ? {
          status: 'In Vorbereitung',
          note: 'Hinweis',
        }
      : {
          status: 'In preparation',
          note: 'Note',
        }

  const resourceItems = sections.flatMap((section) => {
    const hasLabeledParagraph = section.paragraphs.some((paragraph) => {
      const divider = paragraph.indexOf(':')
      return divider > 0 && divider <= 48
    })

    if (!hasLabeledParagraph) {
      return [
        {
          title: section.heading ?? title,
          text: section.paragraphs.join(' '),
        },
      ]
    }

    return section.paragraphs.map((paragraph, index) => {
      const divider = paragraph.indexOf(':')
      const hasShortLabel = divider > 0 && divider <= 48

      if (hasShortLabel) {
        return {
          title: paragraph.slice(0, divider),
          text: paragraph.slice(divider + 1).trim(),
        }
      }

      return {
        title:
          index === 0
            ? (section.heading ?? title)
            : paragraph.split('.')[0] || section.heading || title,
        text: paragraph,
      }
    })
  })

  return (
    <div className="bg-background">
      <PageHero eyebrow={eyebrow} title={title} lede={lede} />

      {note ? (
        <aside className="mx-auto mb-12 w-full max-w-[1240px] px-6 lg:px-10">
          <div className="bg-muted/60 max-w-[76ch] px-6 py-5">
            <p className="text-primary text-sm font-semibold">{labels.note}</p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{note}</p>
          </div>
        </aside>
      ) : null}

      {feature}

      <section className="border-border border-t py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <ul className="divide-border divide-y">
            {resourceItems.map((item, index) => (
              <li
                key={`${item.title}-${index}`}
                className="grid gap-4 py-8 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-serif text-2xl leading-tight font-semibold">
                      {item.title}
                    </h2>
                    <span className="bg-brand-100 text-primary px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
                      {labels.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-3 max-w-[62ch] leading-7">{item.text}</p>
                </div>
                <Link
                  href={action.href}
                  className="text-primary inline-flex items-center gap-2 text-sm font-semibold"
                >
                  {action.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={action.title}
        text={action.text}
        primary={{ label: action.label, href: action.href }}
      />
    </div>
  )
}
