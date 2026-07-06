import type { ComponentProps } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Download, FileText, Headphones, Lock, ShieldCheck } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
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
  action,
}: {
  locale: Locale
  eyebrow: string
  title: string
  lede?: string
  sections: TextSection[]
  note?: string
  action: ResourcePageAction
}) {
  const labels =
    locale === 'de'
      ? {
          status: 'In Vorbereitung',
          pages: 'PDF · kompakt',
          note: 'Redaktioneller Hinweis',
          contact: 'Nicht gefunden, was Sie suchen?',
          contactCta: 'Kontakt aufnehmen',
          trust: ['Praxiserprobt', 'Aktuell', 'Vertraulich'],
          trustText: [
            'Unsere Unterlagen basieren auf realen Transaktionen und regionaler Praxis.',
            'Regelmäßig aktualisiert mit neuen Markt- und Rechtsentwicklungen.',
            'Ihre Angaben bleiben bei uns und werden nicht an Dritte weitergegeben.',
          ],
        }
      : {
          status: 'In preparation',
          pages: 'PDF · concise',
          note: 'Editorial note',
          contact: 'Did not find what you need?',
          contactCta: 'Get in touch',
          trust: ['Field-tested', 'Current', 'Confidential'],
          trustText: [
            'Our material is grounded in real transactions and regional practice.',
            'Regularly updated with new market and legal developments.',
            'Your details stay with us and are not passed to third parties.',
          ],
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
        title: index === 0 ? (section.heading ?? title) : paragraph.split('.')[0] || section.heading || title,
        text: paragraph,
      }
    })
  })

  const navItems = [eyebrow, ...sections.map((section) => section.heading).filter(Boolean)]

  return (
    <section className="bg-background">
      <div className="mx-auto grid w-full max-w-[1440px] lg:grid-cols-[280px_1fr]">
        <aside className="border-border hidden min-h-full border-r px-9 py-12 lg:block">
          <div className="sticky top-28 flex min-h-[calc(100dvh-8rem)] flex-col justify-between">
            <div>
              <div className="mb-16 flex items-center gap-3">
                <span className="bg-primary h-8 w-1" />
                <span className="font-semibold tracking-tight">Immonation</span>
              </div>
              <nav className="flex flex-col">
                {navItems.map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="border-border text-muted-foreground border-b py-4 text-[15px] first:border-t first:text-primary first:font-semibold"
                  >
                    {item}
                  </span>
                ))}
              </nav>
            </div>
            <div className="border-border bg-muted/40 p-5">
              <Headphones className="text-primary size-6" aria-hidden="true" />
              <p className="mt-4 text-sm leading-6">{labels.contact}</p>
              <Link href="/contact" className="text-primary mt-3 inline-flex items-center gap-2 text-sm font-semibold">
                {labels.contactCta}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </aside>

        <div className="grid lg:grid-cols-[0.95fr_1fr]">
          <div className="px-6 py-16 lg:px-20 lg:py-24">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.22em]">{eyebrow}</p>
            <h1 className="mt-8 max-w-[700px] font-serif text-5xl font-semibold leading-[1.02] text-balance md:text-7xl">
              {title}
            </h1>
            {lede ? (
              <p className="text-muted-foreground mt-8 max-w-[62ch] text-lg leading-8">{lede}</p>
            ) : null}

            <div className="border-border mt-12 grid gap-6 border-y py-8 md:grid-cols-3">
              {labels.trust.map((label, index) => (
                <article key={label} className="border-border md:border-r md:pr-6 md:last:border-r-0">
                  {index === 0 ? (
                    <ShieldCheck className="text-primary size-7" aria-hidden="true" />
                  ) : index === 1 ? (
                    <FileText className="text-primary size-7" aria-hidden="true" />
                  ) : (
                    <Lock className="text-primary size-7" aria-hidden="true" />
                  )}
                  <h2 className="mt-5 font-semibold">{label}</h2>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">{labels.trustText[index]}</p>
                </article>
              ))}
            </div>

            {note ? (
              <aside className="border-primary bg-muted/50 mt-12 border-l-2 p-7">
                <p className="text-primary text-sm font-semibold">{labels.note}</p>
                <p className="text-muted-foreground mt-3 text-sm leading-7">{note}</p>
              </aside>
            ) : null}

            <p className="text-muted-foreground mt-8 inline-flex items-center gap-2 text-xs">
              <Lock className="size-4" aria-hidden="true" />
              {labels.trustText[2]}
            </p>
          </div>

          <div className="bg-muted relative overflow-hidden border-l border-border px-6 py-16 lg:px-12 lg:py-24">
            <div className="absolute inset-x-0 top-0 h-44 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80"
                alt="Floor plan and property documents"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-35"
              />
            </div>
            <div className="relative z-10 flex flex-col gap-4 pt-20">
              {resourceItems.map((item, index) => (
                <article key={`${item.title}-${index}`} className="border-border bg-white p-5 shadow-sm">
                  <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:items-center sm:gap-5">
                    <div className="border-border bg-muted flex aspect-[3/4] flex-col justify-between border p-4">
                      <span className="font-serif text-sm leading-tight hyphens-auto [overflow-wrap:anywhere]">
                        {item.title}
                      </span>
                      <Download className="text-primary size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-serif text-2xl font-semibold leading-tight">{item.title}</h2>
                        <span className="bg-brand-100 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]">
                          {labels.status}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-3 max-w-[54ch] leading-7">{item.text}</p>
                      <p className="text-muted-foreground mt-4 inline-flex items-center gap-2 text-xs">
                        <Download className="text-primary size-4" aria-hidden="true" />
                        {labels.pages}
                      </p>
                    </div>
                    <Link href={action.href} className="text-primary col-start-2 justify-self-start sm:col-start-auto sm:justify-self-end">
                      <ArrowUpRight className="size-6" aria-hidden="true" />
                      <span className="sr-only">{action.label}</span>
                    </Link>
                  </div>
                </article>
              ))}

              <div className="bg-brand-50 border-border mt-4 grid gap-5 border p-7 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h2 className="text-xl font-semibold">{action.title}</h2>
                  {action.text ? (
                    <p className="text-muted-foreground mt-2 max-w-[52ch] leading-7">{action.text}</p>
                  ) : null}
                </div>
                <Link
                  href={action.href}
                  className="bg-primary hover:bg-primary/90 inline-flex items-center justify-center gap-3 px-6 py-4 text-sm font-semibold text-white transition-colors"
                >
                  {action.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
