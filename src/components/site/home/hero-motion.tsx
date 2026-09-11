'use client'

import { Fragment } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

/** Shared entrance choreography for the page heroes. */

// Premium ease (matches the rest of the site's spring-like feel); staggered in seconds.
export const EASE = [0.22, 1, 0.36, 1] as const

export const STAGE_DELAYS = {
  eyebrow: 0.1,
  wordBase: 0.2,
  wordStep: 0.055,
  subtitle: 0.62,
  ctas: 0.78,
  rating: 0.92,
} as const

/** Rise-in: opacity + translateY, disabled entirely under prefers-reduced-motion. */
export function getRise(reduceMotion: boolean, delay: number) {
  return {
    initial: reduceMotion ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.9, ease: EASE, delay: reduceMotion ? 0 : delay },
  } as const
}

export function RevealTitle({
  title,
  reduceMotion,
  id,
  className,
}: {
  title: string
  reduceMotion: boolean
  id?: string
  className?: string
}) {
  const words = title.split(' ')
  return (
    <h1
      id={id}
      className={cn(
        // Size comes from the caller: each hero sizes its headline for its own layout.
        'font-serif leading-[1.12] font-semibold tracking-[-0.005em] text-balance text-white',
        className,
      )}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="-mb-[0.08em] inline-flex overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              initial={reduceMotion ? false : { y: '115%' }}
              animate={{ y: '0%' }}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                ease: EASE,
                delay: reduceMotion ? 0 : STAGE_DELAYS.wordBase + index * STAGE_DELAYS.wordStep,
              }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </h1>
  )
}
