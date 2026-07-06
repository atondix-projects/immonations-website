'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type Audience = 'seller' | 'buyer'

const SEGMENT_CLASSES =
  'px-3.5 py-2 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors'

/**
 * Segmented "I am a seller/buyer" control — switches between the seller (home)
 * and buyer (/buy) strecken. Meant to sit as one cell inside a shared bordered
 * bar alongside the rating badge (see hero.tsx), so it carries no border of its own.
 */
export function AudienceSwitch({ mode }: { mode: Audience }) {
  const t = useTranslations('Audience')
  const isSeller = mode === 'seller'

  return (
    <div className="flex items-center gap-3 px-4 py-2.5">
      <span className="text-[11px] font-semibold tracking-[0.12em] text-white/50 uppercase">
        {t('iAmA')}
      </span>
      <div className="inline-flex divide-x divide-white/20">
        <Link
          href="/"
          aria-current={isSeller ? 'page' : undefined}
          className={cn(
            SEGMENT_CLASSES,
            isSeller ? 'bg-brand-500 text-white' : 'text-white/60 hover:text-white',
          )}
        >
          {t('seller')}
        </Link>
        <Link
          href="/buy"
          aria-current={!isSeller ? 'page' : undefined}
          className={cn(
            SEGMENT_CLASSES,
            !isSeller ? 'bg-brand-500 text-white' : 'text-white/60 hover:text-white',
          )}
        >
          {t('buyer')}
        </Link>
      </div>
    </div>
  )
}
