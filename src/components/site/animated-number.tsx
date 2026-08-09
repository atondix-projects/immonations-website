'use client'

import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react'
import { useLocale } from 'next-intl'
import { useInView, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

type ParsedNumber = {
  value: number
  decimalPlaces: number
  suffix: string
}

/**
 * Parse CMS display strings like `300+`, `8.000+`, `4,9`, `360°`, `60 km`.
 * Non-countable values (`6–12`, `Regional`, …) return null → render as static text.
 */
export function parseStatNumber(raw: string): ParsedNumber | null {
  const trimmed = raw.trim()
  if (!trimmed) return null

  // Ranges and en-dashes are labels, not counters.
  if (/^\d+\s*[–—-]\s*\d+/.test(trimmed)) return null

  // Leading integer/decimal with optional thousands separators (DE `.` / EN `,`).
  const match = trimmed.match(
    /^(\d{1,3}(?:\.\d{3})+|\d{1,3}(?:,\d{3})+|\d+)(?:([.,])(\d+))?([\s\S]*)$/,
  )
  if (!match) return null

  const [, intPart = '', decimalSep = '', fraction = '', suffix = ''] = match
  if (!/^\d/.test(intPart)) return null

  const normalizedInt = intPart.replace(/[.,]/g, '')
  const value = Number(fraction ? `${normalizedInt}.${fraction}` : normalizedInt)
  if (!Number.isFinite(value)) return null

  // Preserve explicit decimals (`5,0`, `5,00`) even when the numeric value is whole.
  const decimalPlaces = decimalSep ? fraction.length : 0

  return { value, decimalPlaces, suffix }
}

type AnimatedNumberProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  /** Display string from messages, e.g. `300+` or `4,9`. */
  value: string
  /** Stagger delay in seconds before the count starts. */
  delay?: number
}

/**
 * Magic UI–style number ticker for localized CMS strings (suffixes included).
 * Falls back to the raw string when the value is not countable.
 */
export function AnimatedNumber({ value, delay = 0, className, ...props }: AnimatedNumberProps) {
  const locale = useLocale()
  const parsed = parseStatNumber(value)

  if (!parsed) {
    return (
      <span className={cn('inline-block tabular-nums', className)} {...props}>
        {value}
      </span>
    )
  }

  return (
    <span
      className={cn('inline-flex items-baseline tabular-nums', className)}
      aria-label={value}
      {...props}
    >
      <LocaleNumberTicker
        value={parsed.value}
        decimalPlaces={parsed.decimalPlaces}
        delay={delay}
        locale={locale}
        className="tracking-[inherit] text-inherit"
      />
      {parsed.suffix ? <span aria-hidden="true">{parsed.suffix}</span> : null}
    </span>
  )
}

/**
 * Locale-aware ticker. The registry NumberTicker hardcodes `en-US` and dark text;
 * this keeps the same spring motion but formats with the active site locale.
 */
function LocaleNumberTicker({
  value,
  startValue = 0,
  direction = 'up',
  delay = 0,
  decimalPlaces = 0,
  locale,
  className,
}: {
  value: number
  startValue?: number
  direction?: 'up' | 'down'
  delay?: number
  decimalPlaces?: number
  locale: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === 'down' ? value : startValue)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: '0px' })
  const intlLocale = locale === 'de' ? 'de-DE' : 'en-US'

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    if (isInView) {
      timer = setTimeout(() => {
        motionValue.set(direction === 'down' ? startValue : value)
      }, delay * 1000)
    }

    return () => {
      if (timer !== null) clearTimeout(timer)
    }
  }, [motionValue, isInView, delay, value, direction, startValue])

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat(intlLocale, {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)))
        }
      }),
    [springValue, decimalPlaces, intlLocale],
  )

  const formattedStart = Intl.NumberFormat(intlLocale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(startValue)

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn('inline-block tracking-wider tabular-nums', className)}
    >
      {formattedStart}
    </span>
  )
}
