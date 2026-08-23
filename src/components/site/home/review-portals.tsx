import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedNumber } from '@/components/site/animated-number'
import { cn } from '@/lib/utils'

export type ReviewPortal = {
  id: string
  name: string
  rating: string
  scale: string
  basis: string
  kind: 'direct' | 'aggregate'
}

export type PortalLabels = {
  direct: string
  aggregate: string
  openProfile: string
}

type PortalMedia = {
  href: string
  /**
   * Local copy of the portal's own mark. Omitted where no logo file is
   * available — the tile then falls back to a plain wordmark rather than an
   * approximated logo.
   */
  logo?: string
  /** Icon-only marks carry no name, so the tile spells it out beside them. */
  markOnly?: boolean
}

export const GOOGLE_PROFILE = 'https://www.google.com/maps?cid=3199252424447906498'

const PORTAL_MEDIA: Record<string, PortalMedia> = {
  google: {
    href: GOOGLE_PROFILE,
    logo: '/images/reviews/portals/google.svg',
    markOnly: true,
  },
  trustpilot: {
    href: 'https://de.trustpilot.com/review/immonationgmbh.de',
    logo: '/images/reviews/portals/trustpilot.svg',
  },
  immowelt: {
    href: 'https://www.immowelt.de/profil/aa4a4a5bc6a949b2981f3a050371ce96',
  },
  provenexpert: {
    href: 'https://www.provenexpert.com/de-de/immonation-gmbh-zirndorf/',
    logo: '/images/reviews/portals/provenexpert.svg',
    markOnly: true,
  },
  jacasa: {
    href: 'https://www.jacasa.de/immobilienmakler/immonation-zirndorf',
    logo: '/images/reviews/portals/jacasa.svg',
  },
  werkenntdenbesten: {
    href: 'https://www.werkenntdenbesten.de/e/108894981/immobilienmakler/zirndorf-mittelfranken/immonation-gmbh-bewertungen.html',
    logo: '/images/reviews/portals/werkenntdenbesten.png',
    markOnly: true,
  },
  trustlocal: {
    href: 'https://trustlocal.de/bayern/zirndorf/immobilienmakler/immonation-gmbh/',
    logo: '/images/reviews/portals/trustlocal.svg',
  },
  kennstdueinen: {
    href: 'https://www.kennstdueinen.de/immobilienmakler-zirndorf-immonation-gmbh-d2392865.html',
    logo: '/images/reviews/portals/kennstdueinen.png',
    markOnly: true,
  },
  elf880: {
    href: 'https://www.11880.com/branchenbuch/zirndorf-mittelfranken/131072469B108894981/immonation-gmbh.html',
    logo: '/images/reviews/portals/11880.svg',
  },
  golocal: {
    href: 'https://www.golocal.de/zirndorf/immobilien/immonation-gmbh-MJm4N/',
    logo: '/images/reviews/portals/golocal.svg',
    markOnly: true,
  },
}

function PortalTile({
  portal,
  media,
  labels,
  compact = false,
  showSource = true,
}: {
  portal: ReviewPortal
  media: PortalMedia
  labels: PortalLabels
  compact?: boolean
  /** Hidden where every visible tile carries the same kind — the label would say nothing. */
  showSource?: boolean
}) {
  const showsName = !media.logo || media.markOnly === true

  return (
    <a
      href={media.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${portal.name} — ${portal.rating} ${portal.scale}, ${portal.basis}. ${labels.openProfile}`}
      className={cn(
        'group bg-background focus-visible:ring-brand-700 flex min-w-0 flex-col justify-between gap-7 p-5 transition-colors hover:bg-white focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
        compact && 'shrink-0 grow basis-[230px] snap-start',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-7 min-w-0 items-center gap-2.5">
          {media.logo ? (
            <Image
              src={media.logo}
              alt={showsName ? '' : portal.name}
              width={128}
              height={28}
              unoptimized
              className={cn(
                'object-contain object-left',
                media.markOnly ? 'size-7 shrink-0' : 'h-7 w-auto max-w-[118px]',
              )}
            />
          ) : null}
          {showsName ? (
            <span className="group-hover:text-brand-700 truncate text-sm font-semibold transition-colors">
              {portal.name}
            </span>
          ) : null}
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="text-muted-foreground group-hover:text-brand-700 mt-0.5 size-4 shrink-0 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
        />
      </div>

      <div>
        <p className="flex items-baseline gap-1.5">
          <AnimatedNumber
            value={portal.rating}
            className="font-serif text-[2rem] leading-none font-medium tracking-[-0.03em]"
          />
          <span className="text-muted-foreground text-xs">{portal.scale}</span>
        </p>
        <p className="text-muted-foreground mt-2.5 text-xs leading-relaxed text-pretty">
          {portal.basis}
        </p>
        {showSource ? (
          <span
            className={cn(
              'mt-3.5 inline-block text-[10px] font-semibold tracking-[0.14em] uppercase',
              portal.kind === 'direct' ? 'text-brand-700' : 'text-muted-foreground',
            )}
          >
            {portal.kind === 'direct' ? labels.direct : labels.aggregate}
          </span>
        ) : null}
      </div>
    </a>
  )
}

export function ReviewPortalGrid({
  portals,
  labels,
  compact = false,
}: {
  portals: ReviewPortal[]
  labels: PortalLabels
  compact?: boolean
}) {
  // With a single kind on screen the label repeats on every tile and says
  // nothing; it only earns its space where direct and aggregate sit side by side.
  const showsSource = new Set(portals.map((portal) => portal.kind)).size > 1

  return (
    <div
      className={cn(
        'border-border gap-px border bg-neutral-300',
        compact
          ? 'flex snap-x snap-mandatory [scrollbar-width:thin] overflow-x-auto'
          : 'grid overflow-hidden sm:grid-cols-2 lg:grid-cols-5',
      )}
    >
      {portals.flatMap((portal) => {
        const media = PORTAL_MEDIA[portal.id]

        return media
          ? [
              <PortalTile
                key={portal.id}
                portal={portal}
                media={media}
                labels={labels}
                compact={compact}
                showSource={showsSource}
              />,
            ]
          : []
      })}
    </div>
  )
}
