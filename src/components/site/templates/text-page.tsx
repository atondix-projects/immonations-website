import { PageHero } from './page-hero'

export type TextSection = {
  heading?: string
  paragraphs: string[]
}

/**
 * Text-only page template (Impressum, Datenschutz, AGB, plain prose pages).
 * Server-rendered prose with generous measure — no cards, no decoration.
 */
export function TextPage({
  eyebrow,
  title,
  lede,
  sections,
  note,
}: {
  eyebrow: string
  title: string
  lede?: string
  sections: TextSection[]
  note?: string
}) {
  return (
    <div className="bg-background">
      <PageHero eyebrow={eyebrow} title={title} lede={lede} />
      <section className="mx-auto w-full max-w-[1240px] px-6 pb-16 lg:px-10 lg:pb-24">
        <div className="flex max-w-[76ch] flex-col gap-10">
          {sections.map((section, index) => (
            <div key={section.heading ?? index} className="flex flex-col gap-3">
              {section.heading ? (
                <h2 className="font-serif text-2xl font-semibold leading-tight">
                  {section.heading}
                </h2>
              ) : null}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-muted-foreground text-[16px] leading-[1.7]">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
          {note ? (
            <p className="border-accent text-neutral-600 border-l-2 pl-5 text-sm leading-relaxed">
              {note}
            </p>
          ) : null}
        </div>
      </section>
    </div>
  )
}
