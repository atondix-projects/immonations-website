import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { CONTAINER, EYEBROW } from './section-shell'

// Maklersieger ist bewusst nicht hier: das verifizierte Profil erscheint mit
// offiziellem Badge bereits in der Bewertungs-Sektion (siehe reviews.tsx).
type AwardId =
  | 'faz-top-makler-2026'
  | 'capital-makler-kompass-2024'
  | 'immowelt-business-partner'
  | 'deutscher-immobilienpreis-2021'

type AwardItem = {
  id: AwardId
  title: string
  issuer: string
  meta: string
  note: string
  alt: string
}

type AwardMedia = {
  src?: string
  href?: string
  /** Fallback statt Bild: typografisches Kürzel des Herausgebers. */
  wordmark?: string
  imageClassName?: string
}

/**
 * Siegel-Artwork nur dort, wo eine saubere, frei nutzbare Vorlage vorliegt.
 * F.A.Z. und Capital laufen bewusst ohne Siegelbild: deren Siegelnutzung ist
 * lizenzpflichtig, das Capital-Siegel trägt zudem "gültig bis 10/2025".
 * Die Auszeichnung zu benennen und auf die Quelle zu verlinken ist davon
 * nicht berührt.
 */
const AWARD_MEDIA: Record<AwardId, AwardMedia> = {
  'faz-top-makler-2026': {
    wordmark: 'F.A.Z.\nINSTITUT',
    href: 'https://topmakler.faz.net/',
  },
  'capital-makler-kompass-2024': {
    wordmark: 'Capital',
  },
  'immowelt-business-partner': {
    src: '/images/awards/immowelt-business-partner-2026.png',
    href: 'https://www.immowelt.de/profil/aa4a4a5bc6a949b2981f3a050371ce96',
  },
  'deutscher-immobilienpreis-2021': {
    src: '/images/awards/deutscher-immobilienpreis-network-2021.jpg',
  },
}

function AwardMark({ item, media }: { item: AwardItem; media: AwardMedia }) {
  if (media.src) {
    return (
      <div className="relative size-16 shrink-0 overflow-hidden bg-neutral-100">
        <Image
          src={media.src}
          alt={item.alt}
          fill
          sizes="64px"
          className={cn('object-contain', media.imageClassName)}
        />
      </div>
    )
  }

  return (
    <div
      className="flex size-16 shrink-0 items-center justify-center bg-neutral-900 px-1.5"
      aria-hidden
    >
      <span className="text-center font-serif text-[12px] leading-[1.15] font-medium tracking-[-0.01em] whitespace-pre-line text-white">
        {media.wordmark}
      </span>
    </div>
  )
}

function AwardCard({
  item,
  media,
  sourceLabel,
}: {
  item: AwardItem
  media: AwardMedia
  sourceLabel: string
}) {
  const content = (
    <>
      <AwardMark item={item} media={media} />
      <p className="mt-5 font-serif text-[18px] leading-[1.2] font-medium tracking-[-0.015em] text-balance text-neutral-900">
        {item.title}
      </p>
      <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-neutral-500 uppercase">
        {item.issuer} · {item.meta}
      </p>
      <p className="mt-3.5 text-[13.5px] leading-[1.6] text-neutral-600">{item.note}</p>
      {media.href ? (
        <span className="text-brand-700 mt-auto inline-flex items-center gap-1 pt-4 text-[13px] font-semibold">
          {sourceLabel}
          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      ) : null}
    </>
  )

  const shell = 'flex min-w-0 flex-col border border-neutral-200 bg-white p-5'

  if (media.href) {
    return (
      <a
        href={media.href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          shell,
          'group focus-visible:ring-primary transition-transform duration-200 hover:-translate-y-0.5 hover:border-neutral-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none',
        )}
      >
        {content}
      </a>
    )
  }

  return <div className={shell}>{content}</div>
}

export async function Awards({ compact = false }: { compact?: boolean }) {
  const t = await getTranslations('Home.awards')
  const items = t.raw('items') as AwardItem[]

  return (
    <section
      id="auszeichnungen"
      className={cn(
        'bg-muted border-border scroll-mt-24 border-b',
        compact ? 'py-12 md:py-16' : 'py-14 md:py-18',
      )}
    >
      <div className={CONTAINER}>
        <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div className="flex flex-col gap-3.5">
            <span className={EYEBROW}>{t('eyebrow')}</span>
            <h3 className="max-w-[18ch] font-serif text-[1.625rem] leading-[1.12] font-semibold text-balance sm:text-3xl md:text-[40px]">
              {t('title')}
            </h3>
          </div>
          <p className="text-muted-foreground max-w-[64ch] text-[16px] leading-[1.65] lg:justify-self-end">
            {t('text')}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <AwardCard
              key={item.id}
              item={item}
              media={AWARD_MEDIA[item.id]}
              sourceLabel={t('sourceLabel')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
