import type { Locale } from '@/i18n/routing'
import type { ReferenceRecord } from '@/lib/content/references'
import { ReferenceProofRail } from './reference-proof-rail'

export function RelatedReferenceBlock({
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
  return (
    <ReferenceProofRail
      references={references}
      locale={locale}
      eyebrow={eyebrow}
      title={title}
      text={text}
      referenceLabel={referenceLabel}
    />
  )
}
