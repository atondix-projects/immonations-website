'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { VisualizationPair } from '@/components/site/staging/visualization-pairs'

export function VisualizationCompare({
  pair,
  index,
  beforeLabel,
  afterLabel,
  controlLabel,
  size = 'lead',
}: {
  pair: VisualizationPair
  index: number
  beforeLabel: string
  afterLabel: string
  controlLabel: string
  size?: 'lead' | 'compact'
}) {
  const [position, setPosition] = useState(50)
  const isLead = size === 'lead'

  return (
    <article data-visualization-compare className={cn(!isLead && 'flex h-full flex-col')}>
      <div
        className={cn(
          isLead
            ? 'grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16'
            : 'flex flex-1 flex-col gap-2',
        )}
      >
        <div className="flex items-start gap-4">
          <span className="text-brand-700 mt-1.5 font-mono text-xs tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3
            className={cn(
              'font-serif leading-snug font-medium text-balance',
              isLead ? 'max-w-[24ch] text-2xl md:text-[1.9rem]' : 'max-w-[28ch] text-xl',
            )}
          >
            {pair.title}
          </h3>
        </div>
        <p
          className={cn(
            'text-muted-foreground text-pretty',
            isLead
              ? 'max-w-[64ch] text-[15px] leading-[1.75]'
              : 'max-w-[52ch] pl-8 text-[14px] leading-[1.7]',
          )}
        >
          {pair.text}
        </p>
      </div>

      <div
        className={cn(
          'relative aspect-video overflow-hidden bg-neutral-950 select-none',
          isLead ? 'mt-7' : 'mt-5',
        )}
      >
        <Image
          src={`/images/staging/${pair.slug}-before.webp`}
          alt={pair.beforeAlt}
          fill
          sizes={size === 'lead' ? '92vw' : '(min-width: 768px) 46vw, 92vw'}
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={`/images/staging/${pair.slug}-after.webp`}
            alt={pair.afterAlt}
            fill
            sizes={size === 'lead' ? '92vw' : '(min-width: 768px) 46vw, 92vw'}
            className="object-cover"
          />
        </div>

        <span className="pointer-events-none absolute top-0 left-0 z-30 bg-neutral-800 px-2 py-1 text-[9px] font-semibold tracking-[0.14em] text-white uppercase sm:px-4 sm:py-2 sm:text-[11px]">
          {afterLabel}
        </span>
        <span className="bg-brand-600 pointer-events-none absolute top-0 right-0 z-30 px-2 py-1 text-[9px] font-semibold tracking-[0.14em] text-white uppercase sm:px-4 sm:py-2 sm:text-[11px]">
          {beforeLabel}
        </span>

        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.currentTarget.value))}
          aria-label={controlLabel}
          className="peer absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-30 w-px -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.28)]"
          style={{ left: `${position}%` }}
        >
          <span className="bg-brand-600 absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 text-sm font-semibold text-white shadow-md">
            ↔
          </span>
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-1 z-40 border-2 border-transparent peer-focus-visible:border-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-neutral-950"
        />
      </div>
    </article>
  )
}
