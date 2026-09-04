import { ArrowUpRight } from 'lucide-react'
import { ImmonationMark } from '@/components/site/brand/immonation-mark'
import { cn } from '@/lib/utils'

/**
 * Ein reichweitenstarker Objektclip als Kachel, die auf die Plattform verlinkt.
 *
 * Bewusst ohne Vorschaubild: Zu diesen Clips liegt kein eigenes Standbild vor,
 * und die Thumbnails von TikTok, Instagram und YouTube dürfen nicht eingebunden
 * werden — sie würden die IP-Adresse jedes Besuchers vor jeder Einwilligung an
 * die Plattform übertragen, und ihre CDN-Links laufen signiert ab. Ein fremdes
 * Objektfoto als Platzhalter wäre eine Falschbeschriftung. Also trägt die
 * Aufrufzahl die Kachel — sie ist ohnehin die Aussage.
 */
export function ChannelHighlightCard({
  platformName,
  handle,
  label,
  views,
  viewsLabel,
  href,
  linkLabel,
  className,
}: {
  platformName: string
  handle?: string
  label: string
  views: string
  viewsLabel: string
  href: string
  linkLabel: string
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${linkLabel}: ${label} — ${views} ${viewsLabel}`}
      className={cn(
        'bg-surface-dark focus-visible:ring-brand-400 group relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:p-6',
        className,
      )}
    >
      <span
        className="from-brand-600/25 pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b to-transparent"
        aria-hidden="true"
      />
      <ImmonationMark className="pointer-events-none absolute -right-8 -bottom-10 h-40 opacity-[0.14] transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none" />

      <span className="relative flex flex-col gap-1">
        <span className="text-[11px] font-semibold tracking-[0.18em] text-white uppercase">
          {platformName}
        </span>
        {handle ? <span className="text-[12px] text-neutral-400">{handle}</span> : null}
      </span>

      <span className="relative mt-8 flex flex-col gap-2">
        <span className="font-serif text-[2.6rem] leading-[0.95] font-medium tracking-[-0.03em] text-white tabular-nums sm:text-[3rem]">
          {views}
        </span>
        <span className="text-brand-200 text-[11px] font-semibold tracking-[0.16em] uppercase">
          {viewsLabel}
        </span>
        <span className="mt-3 text-[15px] leading-snug text-balance text-neutral-300">{label}</span>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white">
          {linkLabel}
          <ArrowUpRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </span>
      </span>
    </a>
  )
}
