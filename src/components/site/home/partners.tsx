import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { CONTAINER, EYEBROW } from './section-shell'

type PartnerId = 'dr-klein' | 'immowelt' | 'rewe'
type GroupId = 'capital-holding' | 'in-beteiligung' | 'dream-living'
type LogoItem<T extends string> = { id: T; name: string; role: string; alt: string }

const PARTNER_MEDIA: Record<PartnerId, { src: string; href: string; imageClassName?: string }> = {
  'dr-klein': {
    src: '/images/partners/dr-klein.svg',
    href: 'https://www.drklein.de/',
  },
  immowelt: {
    src: '/images/partners/immowelt-business-partner.webp',
    href: 'https://www.immowelt.de/profil/aa4a4a5bc6a949b2981f3a050371ce96',
    imageClassName: 'scale-[0.78]',
  },
  rewe: {
    src: '/images/partners/rewe.svg',
    href: 'https://www.rewe.de/',
    imageClassName: 'scale-[0.68]',
  },
}

const GROUP_MEDIA: Record<GroupId, { src: string; imageClassName?: string }> = {
  'capital-holding': {
    src: '/images/partners/immonation-capital-holding.webp',
  },
  'in-beteiligung': {
    src: '/images/partners/in-beteiligung.webp',
  },
  'dream-living': {
    src: '/images/partners/dream-living.webp',
  },
}

function LogoTile({
  item,
  media,
}: {
  item: LogoItem<string>
  media: { src: string; href?: string; imageClassName?: string }
}) {
  const content = (
    <>
      <div className="relative h-28 w-full overflow-hidden">
        <Image
          src={media.src}
          alt={item.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className={`object-contain p-5 ${media.imageClassName ?? ''}`}
        />
      </div>
      <div className="flex items-start justify-between gap-3 border-t border-neutral-200 px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-neutral-900">{item.name}</p>
          <p className="mt-1 text-xs leading-snug text-neutral-600">{item.role}</p>
        </div>
        {media.href ? (
          <ArrowUpRight
            aria-hidden="true"
            className="mt-0.5 size-3.5 shrink-0 text-neutral-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        ) : null}
      </div>
    </>
  )

  if (media.href) {
    return (
      <a
        href={media.href}
        target="_blank"
        rel="noreferrer"
        className="group focus-visible:ring-primary flex min-w-0 flex-col bg-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none"
      >
        {content}
      </a>
    )
  }

  return <div className="flex min-w-0 flex-col bg-white">{content}</div>
}

export async function Partners() {
  const t = await getTranslations('Home.partners')
  const partners = t.raw('items') as LogoItem<PartnerId>[]
  const group = t.raw('groupItems') as LogoItem<GroupId>[]

  return (
    <section id="partner" className="bg-muted border-border scroll-mt-24 border-y py-16 md:py-22">
      <div className={CONTAINER}>
        <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div className="flex flex-col gap-3.5">
            <span className={EYEBROW}>{t('eyebrow')}</span>
            <h2 className="max-w-[18ch] font-serif text-[1.625rem] leading-[1.12] font-semibold text-balance sm:text-3xl md:text-[40px]">
              {t('title')}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-[64ch] text-[16px] leading-[1.65] lg:justify-self-end">
            {t('text')}
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="mb-4 font-mono text-[11px] tracking-[0.18em] text-neutral-600 uppercase">
              {t('partnerGroupLabel')}
            </h3>
            <div className="grid gap-px overflow-hidden bg-neutral-200 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {partners.map((item) => (
                <LogoTile key={item.id} item={item} media={PARTNER_MEDIA[item.id]} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[11px] tracking-[0.18em] text-neutral-600 uppercase">
              {t('companyGroupLabel')}
            </h3>
            <div className="grid gap-px overflow-hidden bg-neutral-200 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {group.map((item) => (
                <LogoTile key={item.id} item={item} media={GROUP_MEDIA[item.id]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
