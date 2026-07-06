'use client'

import type { ComponentProps } from 'react'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type LinkHref = ComponentProps<typeof Link>['href']
type NavGroup = { headingKey?: string; items: { labelKey: string; href: LinkHref }[] }

const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { labelKey: 'home', href: '/' },
      { labelKey: 'about', href: '/about' },
    ],
  },
  {
    headingKey: 'mega.forSellers',
    items: [
      { labelKey: 'mega.valuation', href: '/property-valuation' },
      { labelKey: 'mega.selling', href: '/services' },
    ],
  },
  {
    headingKey: 'mega.forBuyers',
    items: [
      { labelKey: 'mega.buying', href: '/buy' },
      { labelKey: 'mega.financing', href: '/services' },
    ],
  },
  {
    headingKey: 'resources',
    items: [
      { labelKey: 'faq', href: '/faq' },
      { labelKey: 'guide', href: '/blog' },
      { labelKey: 'downloads', href: '/downloads' },
      { labelKey: 'careers', href: '/careers' },
      { labelKey: 'referrers', href: '/referrers' },
      { labelKey: 'contact', href: '/contact' },
    ],
  },
]

export function MobileNav({ light = false }: { light?: boolean }) {
  const t = useTranslations('Nav')
  const tAudience = useTranslations('Audience')
  const tSite = useTranslations('Site')
  const locale = useLocale()
  const [open, setOpen] = useState(false)

  const itemClasses =
    'text-foreground hover:text-primary border-border/60 border-b py-3 text-base transition-colors last:border-b-0'

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Menu"
        className={cn(
          '-mr-2 flex size-11 cursor-pointer items-center justify-center transition-colors md:hidden',
          light ? 'text-white' : 'text-foreground',
        )}
      >
        <Menu className="size-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-80 gap-0 overflow-y-auto rounded-none border-l p-0">
        <SheetHeader className="border-border border-b px-6 py-5">
          <SheetTitle className="text-left text-base font-semibold">{tSite('name')}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col px-6 py-4">
          <a href={`/${locale}#referenzen`} onClick={() => setOpen(false)} className={itemClasses}>
            {t('references')}
          </a>
          {NAV_GROUPS.map((group, groupIndex) => (
            <div key={group.headingKey ?? groupIndex} className="flex flex-col">
              {group.headingKey ? (
                <span className="text-neutral-600 pb-1 pt-5 text-[11px] font-semibold uppercase tracking-[0.14em]">
                  {t(group.headingKey)}
                </span>
              ) : null}
              {group.items.map((item) => (
                <Link
                  key={item.labelKey}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={itemClasses}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="mt-auto px-6 pb-8 pt-4">
          <a
            href={`/${locale}#bewertung`}
            onClick={() => setOpen(false)}
            className="bg-primary text-primary-foreground hover:bg-brand-700 block px-6 py-4 text-center text-base font-medium tracking-[0.04em] transition-colors"
          >
            {tAudience('sellerCta')}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  )
}
