'use client'

import { Menu } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { getNavigation } from '@/content/navigation'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export function MobileNav({ light = false }: { light?: boolean }) {
  const locale = useLocale() as Locale
  const tAudience = useTranslations('Audience')
  const tSite = useTranslations('Site')
  const [open, setOpen] = useState(false)
  const groups = getNavigation(locale)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={locale === 'de' ? 'Menü öffnen' : 'Open menu'}
        className={cn(
          '-mr-2 flex size-11 cursor-pointer items-center justify-center transition-colors lg:hidden',
          light ? 'text-white' : 'text-foreground',
        )}
      >
        <Menu className="size-6" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(92vw,380px)] gap-0 overflow-y-auto rounded-none border-l p-0"
      >
        <SheetHeader className="border-border border-b px-6 py-5">
          <SheetTitle className="text-left text-base font-semibold">{tSite('name')}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col px-6 py-4">
          {groups.map((group) => (
            <section key={group.id} className="flex flex-col">
              <h2 className="text-brand-700 pt-6 pb-2 text-[11px] font-semibold tracking-[0.14em] uppercase">
                {group.label}
              </h2>
              {group.links
                .filter((item) => !item.hiddenFromList)
                .map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-foreground hover:text-primary border-border/60 border-b py-3 text-base transition-colors last:border-b-0"
                  >
                    <span className="block font-medium">{item.label}</span>
                    <span className="text-muted-foreground mt-1 block text-xs leading-snug">
                      {item.description}
                    </span>
                  </Link>
                ))}
            </section>
          ))}
        </nav>
        <div className="mt-auto px-6 pt-4 pb-8">
          <Link
            href="/property-valuation"
            onClick={() => setOpen(false)}
            className="bg-brand-700 text-primary-foreground hover:bg-brand-800 block px-6 py-4 text-center text-base font-semibold transition-colors"
          >
            {tAudience('sellerCta')}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
