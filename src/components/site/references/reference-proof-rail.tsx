import type { Locale } from '@/i18n/routing'
import { localizeReference, type ReferenceRecord } from '@/lib/content/references'
import { ReferenceCard } from './reference-card'

export function ReferenceProofRail({
  references,
  locale,
  eyebrow,
  title,
  text,
  referenceLabel,
}: {
  references: readonly ReferenceRecord[]
  locale: Locale
  eyebrow: string
  title: string
  text: string
  referenceLabel: string
}) {
  if (references.length === 0) return null
  return (
    <section className="border-border bg-muted border-y py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        <div className="mb-8 max-w-[720px]">
          <p className="text-primary text-[13px] font-semibold tracking-[0.16em] uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-balance md:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground mt-4 leading-[1.7]">{text}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {references.slice(0, 3).map((reference) => (
            <ReferenceCard
              key={reference.id}
              item={localizeReference(reference, locale)}
              label={referenceLabel}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
