'use client'

import { useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'
import { useLocale } from 'next-intl'
import { motion, useInView, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

export type RegionLandValue = {
  city: string
  min: number
  max: number
  source: string
}

type RegionValuesGridProps = {
  rows: RegionLandValue[]
  unit: string
  className?: string
}

/**
 * Regional Bodenrichtwert board — adapted from the 21st.dev
 * “Analytics stats cards” Number Ticker pattern (Daniel Petho):
 * staggered entrance, featured cell, animated tabular figures.
 * Restyled to Immonation borders / brand (no purple gradients).
 */
export function RegionValuesGrid({ rows, unit, className }: RegionValuesGridProps) {
  const locale = useLocale()
  const intlLocale = locale === 'de' ? 'de-DE' : 'en-US'
  const scaleMax = Math.max(...rows.map((row) => row.max), 1)

  return (
    <div
      className={cn(
        'border-border grid gap-px overflow-hidden border bg-neutral-950/10 sm:grid-cols-2 lg:grid-cols-6',
        className,
      )}
    >
      {rows.map((row, index) => {
        const featured = index === 0
        return (
          <RegionValueCell
            key={row.city}
            row={row}
            index={index}
            featured={featured}
            unit={unit}
            intlLocale={intlLocale}
            scaleMax={scaleMax}
            className={cn(
              featured && 'sm:col-span-2 lg:col-span-3 lg:row-span-2',
              !featured && 'lg:col-span-3',
            )}
          />
        )
      })}
    </div>
  )
}

function RegionValueCell({
  row,
  index,
  featured,
  unit,
  intlLocale,
  scaleMax,
  className,
}: {
  row: RegionLandValue
  index: number
  featured: boolean
  unit: string
  intlLocale: string
  scaleMax: number
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const leftPct = (row.min / scaleMax) * 100
  const widthPct = Math.max(((row.max - row.min) / scaleMax) * 100, 4)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'bg-background relative flex flex-col justify-between p-6 md:p-8',
        featured && 'from-brand-50/80 via-background to-background bg-linear-to-b',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase">
            <MapPin className="text-brand-600 size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
            {row.city}
          </p>
          {featured ? (
            <p className="text-muted-foreground mt-3 max-w-[36ch] text-sm leading-[1.65] text-pretty">
              {row.source}
            </p>
          ) : null}
        </div>
      </div>

      <div className={cn('mt-10', featured && 'mt-auto pt-16 md:pt-24')}>
        <p
          className={cn(
            'font-serif font-medium tracking-[-0.03em] tabular-nums',
            featured
              ? 'text-[2.6rem] leading-none md:text-[4.25rem]'
              : 'text-[1.85rem] leading-none md:text-[2.35rem]',
          )}
          aria-label={`${formatNumber(row.min, intlLocale)}–${formatNumber(row.max, intlLocale)} ${unit}`}
        >
          <LocaleTicker value={row.min} delay={index * 0.12} intlLocale={intlLocale} />
          <span
            className="text-muted-foreground mx-1.5 font-sans text-[0.55em] font-normal"
            aria-hidden
          >
            –
          </span>
          <LocaleTicker value={row.max} delay={index * 0.12 + 0.15} intlLocale={intlLocale} />
          <span
            className={cn(
              'text-muted-foreground ml-2 font-sans font-semibold tracking-[0.08em] uppercase',
              featured ? 'text-sm md:text-base' : 'text-xs',
            )}
            aria-hidden
          >
            {unit}
          </span>
        </p>

        <div className="bg-muted mt-6 h-1.5 w-full overflow-hidden" aria-hidden="true">
          <motion.div
            className="bg-brand-600 h-full"
            initial={{ opacity: 0.35, width: 0, marginLeft: `${leftPct}%` }}
            animate={
              inView ? { opacity: 1, width: `${widthPct}%`, marginLeft: `${leftPct}%` } : undefined
            }
            transition={{ duration: 0.9, delay: index * 0.1 + 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {!featured ? (
          <p className="text-muted-foreground mt-4 text-xs leading-[1.55] text-pretty">
            {row.source}
          </p>
        ) : null}
      </div>
    </motion.article>
  )
}

function formatNumber(value: number, intlLocale: string) {
  return Intl.NumberFormat(intlLocale, { maximumFractionDigits: 0 }).format(value)
}

function LocaleTicker({
  value,
  delay,
  intlLocale,
}: {
  value: number
  delay: number
  intlLocale: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 55, stiffness: 90 })
  const isInView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    if (!isInView) return
    const timer = setTimeout(() => motionValue.set(value), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay, isInView, motionValue, value])

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = formatNumber(Math.round(latest), intlLocale)
        }
      }),
    [intlLocale, springValue],
  )

  return (
    <span ref={ref} aria-hidden="true" className="inline-block tracking-wider tabular-nums">
      {formatNumber(0, intlLocale)}
    </span>
  )
}
