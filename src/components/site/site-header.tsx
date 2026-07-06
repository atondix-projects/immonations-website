'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { LocaleSwitcher } from './locale-switcher'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'

const SCROLL_THRESHOLD = 24

export function SiteHeader() {
  const tSite = useTranslations('Site')
  const tAudience = useTranslations('Audience')
  const locale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > SCROLL_THRESHOLD)
  })

  // Transparenter, über dem Hero-Video schwebender Header — nur auf der Startseite ganz oben.
  const isHome = pathname === '/'
  const transparent = isHome && !scrolled
  const compact = !transparent

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none',
        transparent
          ? 'border-white/15 bg-neutral-900/[0.18] shadow-none'
          : 'border-neutral-900/10 bg-white/[0.82] shadow-[0_16px_42px_-34px_rgba(0,0,0,0.45)]',
      )}
    >
      <div
        className={cn(
          'mx-auto grid w-full origin-top grid-cols-[1fr_auto] items-center gap-4 px-6 transition-[max-width,min-height,padding,transform] duration-300 ease-out motion-reduce:transition-none md:grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)] lg:px-10',
          compact
            ? 'min-h-[68px] max-w-[1240px] scale-[0.985] py-2'
            : 'min-h-[84px] max-w-[1320px] scale-100 py-3.5',
        )}
      >
        {/* The logo follows the transparent/scrolled header state. */}
        <Link
          href="/"
          aria-label={`${tSite('name')} GmbH`}
          className={cn(
            'relative z-10 block transition-[width,height,transform] duration-300 ease-out motion-reduce:transition-none',
            compact ? 'h-7 w-[146px] md:h-8 md:w-[167px]' : 'h-8 w-[167px] md:h-9 md:w-[188px]',
          )}
        >
          <Image
            src="/immonation-logo.png"
            alt={`${tSite('name')} GmbH — ${tSite('tagline')}`}
            width={188}
            height={36}
            priority
            className={cn(
              'absolute inset-0 h-full w-auto transition-opacity duration-300',
              transparent ? 'opacity-0' : 'opacity-100',
            )}
          />
          <Image
            src="/immonation-logo-white-text.png"
            alt=""
            width={188}
            height={36}
            priority
            aria-hidden="true"
            className={cn(
              'absolute inset-0 h-full w-auto transition-opacity duration-300',
              transparent ? 'opacity-100' : 'opacity-0',
            )}
          />
        </Link>
        <div className="hidden justify-self-center md:block">
          <MainNav light={transparent} compact={compact} />
        </div>
        <div className="relative z-10 flex items-center gap-3 justify-self-end">
          <LocaleSwitcher light={transparent} />
          <a
            href={`/${locale}#bewertung`}
            className={cn(
              'bg-primary text-primary-foreground hover:bg-brand-700 hidden text-sm font-medium tracking-[0.04em] whitespace-nowrap transition-[background-color,padding] duration-300 motion-reduce:transition-none md:inline-block',
              compact ? 'px-4 py-2.5' : 'px-5 py-3',
            )}
          >
            {tAudience('sellerCta')}
          </a>
          <MobileNav light={transparent} />
        </div>
      </div>
    </header>
  )
}
