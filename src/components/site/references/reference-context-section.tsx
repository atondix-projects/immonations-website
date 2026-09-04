import type { Locale } from '@/i18n/routing'
import { listLocalizedReferences, type ReferenceRecord } from '@/lib/content/references'
import { ReferenceGallery } from './reference-gallery'

export function ReferenceContextSection({
  references,
  locale,
  eyebrow,
  title,
  text,
  referenceLabel,
  filterLabel,
  allLabel,
  cityFilterLabel,
  allCitiesLabel,
  typeFilterLabel,
}: {
  references: readonly ReferenceRecord[]
  locale: Locale
  eyebrow: string
  title: string
  text: string
  referenceLabel: string
  filterLabel?: string
  allLabel?: string
  cityFilterLabel?: string
  allCitiesLabel?: string
  typeFilterLabel?: string
}) {
  const selected = new Set(references.map((reference) => reference.id))
  const items = listLocalizedReferences(locale).filter((item) => selected.has(item.id))
  if (items.length === 0) return null
  return (
    <section className="border-border border-y py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-primary text-[13px] font-semibold tracking-[0.16em] uppercase">
              {eyebrow}
            </p>
            <h2 className="mt-3 max-w-[18ch] font-serif text-3xl leading-[1.12] font-semibold text-balance md:text-[42px]">
              {title}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-[66ch] text-[16px] leading-[1.65] lg:justify-self-end">
            {text}
          </p>
        </div>
        <ReferenceGallery
          items={items}
          referenceLabel={referenceLabel}
          allLabel={allLabel}
          filterLabel={filterLabel}
          cityFilterLabel={cityFilterLabel}
          allCitiesLabel={allCitiesLabel}
          typeFilterLabel={typeFilterLabel}
        />
      </div>
    </section>
  )
}
