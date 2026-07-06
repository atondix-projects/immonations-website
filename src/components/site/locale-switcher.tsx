'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useTransition } from 'react'
import { cn } from '@/lib/utils'

/** Single-button locale toggle: shows the language you would switch TO. */
export function LocaleSwitcher({ light = false }: { light?: boolean }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const target = routing.locales.find((loc) => loc !== locale) ?? routing.defaultLocale

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          // pathname is the canonical (locale-stripped) path; cast keeps the
          // typed-routes helper happy when we don't know the exact pathname union.
          router.replace(pathname as Parameters<typeof router.replace>[0], { locale: target })
        })
      }}
      aria-label={target === 'de' ? 'Zu Deutsch wechseln' : 'Switch to English'}
      className={cn(
        'border px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors',
        light
          ? 'border-white/30 text-white hover:border-white hover:bg-white/10'
          : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground',
      )}
    >
      {target}
    </button>
  )
}
