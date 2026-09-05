'use client'

import Image from 'next/image'
import { ArrowUpRight, Play } from 'lucide-react'
import { useState } from 'react'
import { ImmonationMark } from '@/components/site/brand/immonation-mark'
import { useExternalMediaConsent } from '@/components/site/consent/use-consent'
import { cn } from '@/lib/utils'
import type { SocialEmbed, SocialThumbnail } from '@/lib/content/social-channels'
import { SocialEmbedLightbox, type SocialLightboxLabels } from './social-embed-lightbox'

export type SocialEmbedLabels = {
  views: string
  play: string
  playAria: string
  watchOn: string
  thumbnailAlt: string
  consentNote: string
  lightbox: SocialLightboxLabels
}

/**
 * Ein echter Social-Beitrag als 9:16-Kachel.
 *
 * Die Kachel zeigt das **echte Standbild des Beitrags**, lokal ausgeliefert
 * (`scripts/fetch-social-thumbnails.mjs`) — kein Ersatzbild und kein Hotlink auf
 * das Plattform-CDN. Der Klick öffnet den **großen Player im Lichtkasten**, nicht
 * einen Miniatur-Player in der Kachel: Ein Hochformat-Video in einer 220 px
 * breiten Kachel ist unbedienbar.
 *
 * Dass der Player erst dann lädt, ist die Zwei-Klick-Lösung: Erst der Klick
 * überträgt IP-Adresse und Gerätedaten an TikTok, Instagram oder YouTube, und erst
 * dann dürfen diese Anbieter etwas auf dem Gerät speichern (§ 25 TDDDG,
 * Art. 6 Abs. 1 lit. a DSGVO). Der Hinweistext auf der Kachel benennt das, damit
 * der Klick eine informierte Einwilligung ist. Beim Schließen wird der Rahmen
 * wieder abgeräumt, die Verbindung endet also mit dem Lichtkasten.
 *
 * Liegt bereits eine Einwilligung für externe Medien vor (`Alle erlauben` im
 * Cookie-Hinweis), entfällt nur der Hinweistext — der Klick bleibt, weil sonst
 * zwölf fremde Player gleichzeitig starten würden.
 */
export function SocialEmbedTile({
  embed,
  href,
  thumbnail,
  platformName,
  label,
  views,
  labels,
  sizes,
  priority = false,
  className,
}: {
  embed: SocialEmbed | null
  href: string
  thumbnail?: SocialThumbnail
  platformName: string
  label: string
  views: string
  labels: SocialEmbedLabels
  sizes: string
  priority?: boolean
  className?: string
}) {
  const hasExternalMediaConsent = useExternalMediaConsent()
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)

  const shell = cn(
    'bg-surface-dark group relative block overflow-hidden rounded-xl',
    'focus-visible:ring-brand-400 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
    className,
  )

  const backdrop = thumbnail ? (
    <Image
      src={thumbnail.src}
      alt={labels.thumbnailAlt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
    />
  ) : (
    <>
      <span
        className="from-brand-600/30 pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b to-transparent"
        aria-hidden="true"
      />
      <ImmonationMark className="pointer-events-none absolute -right-8 -bottom-10 h-40 opacity-[0.14]" />
    </>
  )

  const overlay = (
    <>
      {/* Der Verlauf trägt die Schrift über dem Standbild — sonst steht weiße
          Schrift je nach Objektfoto auf hellem Himmel. */}
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/45"
        aria-hidden="true"
      />
      <span className="relative flex h-full flex-col justify-between p-3.5 sm:p-4">
        <span className="flex items-start justify-between gap-2">
          <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md">
            {platformName}
          </span>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-neutral-900">
            {embed ? (
              <Play className="size-4 translate-x-px fill-current" aria-hidden="true" />
            ) : (
              <ArrowUpRight className="size-4" aria-hidden="true" />
            )}
          </span>
        </span>

        <span className="flex flex-col gap-1">
          <span className="flex items-baseline gap-1.5">
            <span className="font-serif text-[1.75rem] leading-none font-medium tracking-[-0.03em] text-white tabular-nums">
              {views}
            </span>
            <span className="text-[10px] font-semibold tracking-[0.14em] text-white/70 uppercase">
              {labels.views}
            </span>
          </span>
          <span className="mt-1 text-[13px] leading-snug text-balance text-white/90">{label}</span>
          <span className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-semibold text-white">
            {embed ? labels.play : labels.watchOn}
            {embed ? null : <ArrowUpRight className="size-3.5" aria-hidden="true" />}
          </span>
          {embed && !hasExternalMediaConsent ? (
            <span className="mt-1 text-[10.5px] leading-snug text-pretty text-white/55">
              {labels.consentNote}
            </span>
          ) : null}
        </span>
      </span>
    </>
  )

  if (!embed) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${labels.watchOn}: ${label} — ${views} ${labels.views}`}
        className={shell}
      >
        {backdrop}
        {overlay}
      </a>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsPlayerOpen(true)}
        aria-haspopup="dialog"
        aria-label={`${labels.playAria}: ${label} — ${views} ${labels.views}`}
        className={cn(shell, 'w-full cursor-pointer text-left')}
      >
        {backdrop}
        {overlay}
      </button>

      <SocialEmbedLightbox
        open={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        embedUrl={embed.url}
        shape={embed.shape}
        href={href}
        platformName={platformName}
        label={label}
        views={views}
        labels={labels.lightbox}
        hasConsent={hasExternalMediaConsent}
      />
    </>
  )
}
