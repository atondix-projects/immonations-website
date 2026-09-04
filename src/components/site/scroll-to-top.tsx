'use client'

import { ArrowUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useConsentChoice, useIsHydrated } from '@/components/site/consent/use-consent'

const REVEAL_THRESHOLD = 720

export function ScrollToTop() {
  const t = useTranslations('Footer')
  const [revealed, setRevealed] = useState(false)
  const { scrollY } = useScroll()
  const choice = useConsentChoice()
  const isHydrated = useIsHydrated()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setRevealed(latest > REVEAL_THRESHOLD)
  })

  // Der Cookie-Hinweis liegt in derselben Ecke und wird auf schmalen Viewports
  // fast bildschirmbreit — solange er offen ist, tritt der Button zurück.
  if (isHydrated && choice === null) return null

  const scrollToTop = () => {
    // `auto` würde auf das `scroll-behavior: smooth` des Dokuments zurückfallen —
    // nur `instant` springt tatsächlich ohne Animation.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t('backToTop')}
      tabIndex={revealed ? 0 : -1}
      aria-hidden={!revealed}
      className={cn(
        'bg-neutral-0 focus-visible:ring-brand-700 fixed right-4 bottom-4 z-30 grid size-12 place-items-center rounded-full border border-neutral-300 text-neutral-800 shadow-[0_16px_40px_-20px_rgba(38,36,34,0.6)] transition-[opacity,transform,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-neutral-500 focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none sm:size-14',
        revealed ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  )
}
