'use client'

import type { ComponentProps } from 'react'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

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
      { labelKey: 'references', href: '/references' },
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
  const [open, setOpen] = useState(false)

  const itemClasses =
    'text-foreground hover:text-primary border-border/60 border-b py-3 text-base transition-colors last:border-b-0'

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Menu"
        className={cn(
          '-mr-2 flex size-11 cursor-pointer items-center justify-center transition-colors lg:hidden',
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
          {NAV_GROUPS.map((group, groupIndex) => (
            <div key={group.headingKey ?? groupIndex} className="flex flex-col">
              {group.headingKey ? (
                <span className="pt-5 pb-1 text-[11px] font-semibold tracking-[0.14em] text-neutral-600 uppercase">
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
