'use client'

import { useEffect, useState } from 'react'

/**
 * Hairline progress bar pinned under the fixed header, tracking how far the
 * reader has moved through `#article-content`. Purely decorative — hidden from
 * assistive tech and from users who asked for reduced motion.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const article = document.getElementById('article-content')
      if (!article) return

      const articleTop = window.scrollY + article.getBoundingClientRect().top
      const scrollable = article.offsetHeight - window.innerHeight

      if (scrollable <= 0) {
        setProgress(window.scrollY >= articleTop ? 100 : 0)
        return
      }

      const ratio = ((window.scrollY - articleTop) / scrollable) * 100
      setProgress(Math.min(100, Math.max(0, ratio)))
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="bg-border/60 fixed inset-x-0 top-[var(--header-height)] z-40 h-px motion-reduce:hidden"
    >
      <div
        className="bg-brand-600 h-full origin-left transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  )
}
