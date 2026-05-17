'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useTransition } from 'react'
import { cn } from '@/lib/utils'

export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      {routing.locales.map((loc) => {
        const isActive = loc === locale
        return (
          <button
            key={loc}
            type="button"
            disabled={isPending || isActive}
            onClick={() => {
              startTransition(() => {
                // pathname is the canonical (locale-stripped) path; cast keeps the
                // typed-routes helper happy when we don't know the exact pathname union.
                router.replace(pathname as Parameters<typeof router.replace>[0], { locale: loc })
              })
            }}
            className={cn(
              'rounded-md px-2 py-1 uppercase tracking-wider transition-colors',
              isActive
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground',
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {loc}
          </button>
        )
      })}
    </div>
  )
}
