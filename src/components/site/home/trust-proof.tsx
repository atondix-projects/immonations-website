import { getTranslations } from 'next-intl/server'
import { referenceImage, type ReferenceId, type ReferenceItem } from '@/lib/content/references'
import { TrustProofGrid, type TrustProofExample } from './trust-proof-grid'
import { CONTAINER } from './section-shell'

type ProofItem = { value: string; label: string }

const TRAIL_IDS = [
  ['deining-neubauwohnung', 'fuerth-mehrfamilienhaus', 'langenzenn-terrassenwohnung'],
  [
    'forchheim-eigentumswohnung',
    'fuerth-altbauwohnung',
    'nuernberg-reihenendhaus',
    'zirndorf-gartenwohnung',
  ],
  ['fuerth-versorgungszentrum', 'fuerth-mehrfamilienhaus', 'heroldsbach-mehrfamilienhaus'],
  [
    'nuernberg-einfamilienhaus',
    'oberasbach-einfamilienhaus',
    'erlangen-eigentumswohnung',
    'forchheim-reihenhaus',
  ],
] as const satisfies readonly (readonly ReferenceId[])[]

export async function TrustProof() {
  const [t, references] = await Promise.all([
    getTranslations('Home'),
    getTranslations('ReferencesPage'),
  ])
  const proof = t.raw('proof.items') as ProofItem[]
  const referenceItems = references.raw('items') as ReferenceItem[]
  const referencesById = new Map(referenceItems.map((item) => [item.id, item]))
  const trailBadges = [
    t('proof.trailBadges.reviews'),
    t('proof.trailBadges.sales'),
    t('proof.trailBadges.volume'),
    t('proof.trailBadges.search'),
  ]

  const proofItems = proof.map((item, index) => {
    const badge = trailBadges[index] ?? ''
    const examples = (TRAIL_IDS[index] ?? []).flatMap<TrustProofExample>((id) => {
      const reference = referencesById.get(id)

      return reference
        ? [
            {
              id,
              title: reference.title,
              type: reference.type,
              location: reference.location,
              image: referenceImage(id),
              badge,
            },
          ]
        : []
    })

    return { ...item, examples }
  })

  return (
    <section className="border-border bg-background border-b py-16 md:py-22">
      <div className={CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="text-brand-700 text-[11px] font-semibold tracking-[0.2em] uppercase">
              {t('proof.eyebrow')}
            </p>
            <h2 className="mt-5 max-w-[17ch] font-serif text-[2rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-[2.35rem] md:text-[3.35rem]">
              {t('intro.title')}
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:pt-8">
            <p className="text-muted-foreground max-w-[62ch] text-[17px] leading-[1.75]">
              {t('intro.p1')}
            </p>
            <p className="text-muted-foreground max-w-[62ch] text-[17px] leading-[1.75]">
              {t('intro.p2')}
            </p>
          </div>
        </div>

        <TrustProofGrid
          items={proofItems}
          trailHint={t('proof.trailHint')}
          exampleLabel={t('proof.exampleLabel')}
        />
      </div>
    </section>
  )
}
