'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useTransition } from 'react'
import { getRouteByPath, type CatalogLocale } from '@/lib/routing/route-catalog'
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
        const currentLocale = locale as CatalogLocale
        const targetLocale = target as CatalogLocale
        const publicPath = window.location.pathname.replace(new RegExp(`^/${currentLocale}(?=/|$)`), '') || '/'
        const catalogRoute = getRouteByPath(currentLocale, publicPath)

        if (catalogRoute) {
          window.location.assign(`/${targetLocale}${catalogRoute.paths[targetLocale]}`.replace(/\/$/, ''))
          return
        }

        startTransition(() => {
          router.replace(pathname as Parameters<typeof router.replace>[0], { locale: target })
        })
      }}
      aria-label={target === 'de' ? 'Zu Deutsch wechseln' : 'Switch to English'}
      className={cn(
        'border px-2.5 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors',
        light
          ? 'border-white/30 text-white hover:border-white hover:bg-white/10'
          : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground',
      )}
    >
      {target}
    </button>
  )
}
