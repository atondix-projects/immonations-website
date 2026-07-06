'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

/**
 * DSGVO-freundliche Video-Fassade: Der YouTube-Player (nocookie-Domain) wird
 * erst nach explizitem Klick geladen — vorher fließen keine Daten an Dritte.
 */
export function VideoEmbed({
  videoId,
  title,
  playLabel,
  consentNote,
}: {
  videoId: string
  title: string
  playLabel: string
  consentNote: string
}) {
  const [active, setActive] = useState(false)

  if (active) {
    return (
      <div className="relative aspect-video w-full">
        <iframe
          className="absolute inset-0 size-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group bg-surface-dark relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden text-white"
    >
      <span className="from-brand-800/40 absolute inset-0 bg-gradient-to-tr via-transparent to-transparent opacity-60" />
      <span className="border-brand-500 bg-brand-500/15 group-hover:bg-brand-500 relative flex size-16 items-center justify-center border transition-colors">
        <Play className="size-6 fill-current" aria-hidden />
      </span>
      <span className="relative font-serif text-xl font-semibold md:text-2xl">{title}</span>
      <span className="text-neutral-400 relative max-w-[46ch] px-6 text-[13px]">
        {consentNote}
      </span>
      <span className="sr-only">{playLabel}</span>
    </button>
  )
}
