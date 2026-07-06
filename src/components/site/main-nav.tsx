'use client'

import type { ComponentProps, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  CircleHelp,
  Download,
  Handshake,
  Home,
  KeyRound,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Video,
} from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

type LinkHref = ComponentProps<typeof Link>['href']

type MenuLink = {
  labelKey: string
  descriptionKey: string
  href: LinkHref
  icon: LucideIcon
  homeAnchor?: string
}

type MenuSection = {
  num: string
  titleKey: string
  links: MenuLink[]
}

type MenuHighlight = {
  kickerKey: string
  titleKey: string
  taglineKey: string
  bodyKey: string
  ctaKey: string
  href: LinkHref
  icon: LucideIcon
  homeAnchor?: string
}

type MenuFooter = {
  textKey: string
  ctaKey: string
  href: LinkHref
}

type MenuGroup = {
  id: string
  labelKey: string
  href?: LinkHref
  homeAnchor?: string
  sections?: MenuSection[]
  highlight?: MenuHighlight
  footer?: MenuFooter
}

const menuGroups: MenuGroup[] = [
  { id: 'home', labelKey: 'home', href: '/' },
  { id: 'about', labelKey: 'about', href: '/about' },
  { id: 'references', labelKey: 'references', href: '/', homeAnchor: '#referenzen' },
  {
    id: 'services',
    labelKey: 'services',
    sections: [
      {
        num: '01',
        titleKey: 'mega.ownerPath',
        links: [
          {
            labelKey: 'mega.valuation',
            descriptionKey: 'mega.valuationDesc',
            href: '/property-valuation',
            icon: Calculator,
          },
          {
            labelKey: 'mega.selling',
            descriptionKey: 'mega.sellingDesc',
            href: '/services',
            icon: Home,
          },
          {
            labelKey: 'mega.virtualTour',
            descriptionKey: 'mega.virtualTourDesc',
            href: '/',
            homeAnchor: '#virtuelle-besichtigung',
            icon: Video,
          },
          {
            labelKey: 'mega.references',
            descriptionKey: 'mega.referencesDesc',
            href: '/',
            homeAnchor: '#referenzen',
            icon: Building2,
          },
        ],
      },
      {
        num: '02',
        titleKey: 'mega.buyerPath',
        links: [
          {
            labelKey: 'mega.buying',
            descriptionKey: 'mega.buyingDesc',
            href: '/buy',
            icon: KeyRound,
          },
          {
            labelKey: 'mega.financing',
            descriptionKey: 'mega.financingDesc',
            href: '/services',
            icon: Banknote,
          },
          {
            labelKey: 'mega.searchRequest',
            descriptionKey: 'mega.searchRequestDesc',
            href: '/contact',
            icon: Search,
          },
        ],
      },
      {
        num: '03',
        titleKey: 'mega.proofPath',
        links: [
          { labelKey: 'faq', descriptionKey: 'mega.faqDesc', href: '/faq', icon: CircleHelp },
          {
            labelKey: 'mega.trustProof',
            descriptionKey: 'mega.trustProofDesc',
            href: '/',
            homeAnchor: '#bewertungen',
            icon: Star,
          },
          {
            labelKey: 'contact',
            descriptionKey: 'mega.contactDesc',
            href: '/contact',
            icon: Phone,
          },
        ],
      },
    ],
    highlight: {
      kickerKey: 'mega.highlightKicker',
      titleKey: 'mega.highlightTitle',
      taglineKey: 'mega.highlightTagline',
      bodyKey: 'mega.highlightBody',
      ctaKey: 'mega.highlightCta',
      href: '/',
      homeAnchor: '#virtuelle-besichtigung',
      icon: Video,
    },
    footer: {
      textKey: 'mega.servicesFooter',
      ctaKey: 'mega.servicesFooterCta',
      href: '/services',
    },
  },
  {
    id: 'resources',
    labelKey: 'resources',
    sections: [
      {
        num: '01',
        titleKey: 'mega.knowledgePath',
        links: [
          { labelKey: 'faq', descriptionKey: 'mega.faqDesc', href: '/faq', icon: CircleHelp },
          { labelKey: 'guide', descriptionKey: 'mega.guideDesc', href: '/blog', icon: BookOpen },
          {
            labelKey: 'downloads',
            descriptionKey: 'mega.downloadsDesc',
            href: '/downloads',
            icon: Download,
          },
        ],
      },
      {
        num: '02',
        titleKey: 'mega.companyPath',
        links: [
          {
            labelKey: 'careers',
            descriptionKey: 'mega.careersDesc',
            href: '/careers',
            icon: Briefcase,
          },
          {
            labelKey: 'referrers',
            descriptionKey: 'mega.referrersDesc',
            href: '/referrers',
            icon: Handshake,
          },
          {
            labelKey: 'contact',
            descriptionKey: 'mega.contactDesc',
            href: '/contact',
            icon: Phone,
          },
        ],
      },
    ],
    highlight: {
      kickerKey: 'mega.resourcesKicker',
      titleKey: 'mega.resourcesTitle',
      taglineKey: 'mega.resourcesTagline',
      bodyKey: 'mega.resourcesBody',
      ctaKey: 'mega.resourcesCta',
      href: '/faq',
      icon: ShieldCheck,
    },
    footer: {
      textKey: 'mega.resourcesFooter',
      ctaKey: 'mega.resourcesFooterCta',
      href: '/downloads',
    },
  },
]

function localAnchor(locale: string, anchor: string) {
  return `/${locale}${anchor}`
}

function NavAnchor({
  href,
  homeAnchor,
  locale,
  className,
  children,
}: {
  href: LinkHref
  homeAnchor?: string
  locale: string
  className?: string
  children: ReactNode
}) {
  if (homeAnchor) {
    return (
      <NavigationMenuLink
        render={<a href={localAnchor(locale, homeAnchor)} />}
        className={className}
      >
        {children}
      </NavigationMenuLink>
    )
  }

  return (
    <NavigationMenuLink render={<Link href={href} />} className={className}>
      {children}
    </NavigationMenuLink>
  )
}

function MegaMenuEntry({ link, locale }: { link: MenuLink; locale: string }) {
  const t = useTranslations('Nav')
  const Icon = link.icon

  return (
    <li>
      <NavAnchor
        href={link.href}
        homeAnchor={link.homeAnchor}
        locale={locale}
        className={cn(
          'group/mega grid grid-cols-[20px_1fr] items-start gap-3 px-0 py-2.5 text-left',
          'text-neutral-700 hover:bg-transparent focus:bg-transparent',
        )}
      >
        <Icon
          aria-hidden="true"
          className="text-brand-600 group-hover/mega:text-brand-700 mt-0.5 size-4 transition-colors"
          strokeWidth={1.75}
        />
        <span className="min-w-0">
          <span className="group-hover/mega:text-brand-700 block text-sm leading-tight font-semibold text-neutral-900 transition-colors">
            {t(link.labelKey)}
          </span>
          <span className="mt-1 block text-[12px] leading-snug text-neutral-600">
            {t(link.descriptionKey)}
          </span>
        </span>
      </NavAnchor>
    </li>
  )
}

function MegaMenuSection({ section, locale }: { section: MenuSection; locale: string }) {
  const t = useTranslations('Nav')

  return (
    <div className="border-neutral-200/80 px-5 py-6 lg:border-r">
      <div className="flex items-center gap-3">
        <span className="text-brand-700 font-mono text-[10px] tracking-widest tabular-nums">
          {section.num}
        </span>
        <span className="font-mono text-[10px] tracking-[0.22em] text-neutral-500 uppercase">
          {t(section.titleKey)}
        </span>
      </div>
      <ul className="mt-5 flex flex-col gap-1">
        {section.links.map((link) => (
          <MegaMenuEntry key={link.labelKey} link={link} locale={locale} />
        ))}
      </ul>
    </div>
  )
}

function MegaMenuHighlight({ highlight, locale }: { highlight: MenuHighlight; locale: string }) {
  const t = useTranslations('Nav')
  const Icon = highlight.icon

  return (
    <div className="px-5 py-6">
      <span className="text-brand-700 font-mono text-[10px] tracking-[0.22em] uppercase">
        {t(highlight.kickerKey)}
      </span>
      <NavAnchor
        href={highlight.href}
        homeAnchor={highlight.homeAnchor}
        locale={locale}
        className={cn(
          'group/highlight border-brand-100 bg-brand-50/70 mt-5 flex min-h-[214px] flex-col border p-5',
          'hover:bg-brand-50 focus:bg-brand-50 text-left',
        )}
      >
        <Icon aria-hidden="true" className="text-brand-700 size-5" strokeWidth={1.75} />
        <span className="mt-5 block font-serif text-[22px] leading-none font-semibold text-neutral-900">
          {t(highlight.titleKey)}
        </span>
        <span className="text-brand-700 mt-2 block text-[13px] leading-snug font-semibold">
          {t(highlight.taglineKey)}
        </span>
        <span className="mt-4 block text-[13px] leading-relaxed text-neutral-700">
          {t(highlight.bodyKey)}
        </span>
        <span className="group-hover/highlight:text-brand-800 text-brand-700 mt-auto inline-flex items-center gap-1.5 pt-6 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors">
          {t(highlight.ctaKey)}
          <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={1.8} />
        </span>
      </NavAnchor>
    </div>
  )
}

function MegaMenuPanel({ group, locale }: { group: MenuGroup; locale: string }) {
  const t = useTranslations('Nav')
  const sections = group.sections ?? []
  const gridColumns =
    sections.length === 2 ? 'lg:grid-cols-[1fr_1fr_1.05fr]' : 'lg:grid-cols-[1fr_1fr_1fr_1.08fr]'

  return (
    <div className="w-[min(calc(100vw_-_48px),1128px)] border border-neutral-900/10 bg-white/95 text-neutral-900 shadow-[0_24px_70px_-34px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className={cn('grid gap-0', gridColumns)}>
        {sections.map((section) => (
          <MegaMenuSection key={section.titleKey} section={section} locale={locale} />
        ))}
        {group.highlight ? <MegaMenuHighlight highlight={group.highlight} locale={locale} /> : null}
      </div>
      {group.footer ? (
        <div className="mx-5 flex items-center justify-between gap-6 border-t border-neutral-200/80 py-5">
          <p className="max-w-[52ch] text-xs leading-relaxed text-neutral-600">
            {t(group.footer.textKey)}
          </p>
          <NavigationMenuLink
            render={<Link href={group.footer.href} />}
            className="group/footer text-brand-700 hover:text-brand-800 inline-flex shrink-0 items-center gap-2 p-0 font-mono text-[10px] tracking-[0.22em] uppercase hover:bg-transparent focus:bg-transparent"
          >
            {t(group.footer.ctaKey)}
            <ArrowRight
              aria-hidden="true"
              className="size-3 transition-transform group-hover/footer:translate-x-0.5"
              strokeWidth={1.8}
            />
          </NavigationMenuLink>
        </div>
      ) : null}
    </div>
  )
}

export function MainNav({
  light = false,
  compact = false,
}: {
  light?: boolean
  compact?: boolean
}) {
  const t = useTranslations('Nav')
  const locale = useLocale()

  const plainLinkClasses = cn(
    'inline-flex items-center px-2.5 transition-[color,height,font-size] duration-300 motion-reduce:transition-none',
    compact ? 'h-8 text-[15px]' : 'h-9 text-base',
    light ? 'text-white hover:text-brand-200' : 'text-foreground hover:text-primary',
  )
  const triggerClasses = cn(
    'bg-transparent px-2.5 font-normal transition-[color,background-color,height,font-size] duration-300 motion-reduce:transition-none',
    compact ? 'h-8 text-[15px]' : 'h-9 text-base',
    light
      ? 'text-white hover:bg-white/10 focus:bg-white/10 data-open:bg-white/10 data-open:hover:bg-white/10 data-open:focus:bg-white/10 data-popup-open:bg-white/10 data-popup-open:hover:bg-white/10 data-popup-open:focus:bg-white/10'
      : 'text-foreground hover:bg-muted',
  )

  return (
    <NavigationMenu
      align="center"
      className="hidden justify-center md:flex"
      positionerClassName={cn(
        '!fixed !left-1/2 !right-auto !bottom-auto !h-auto !w-auto !max-w-[calc(100vw-48px)] !-translate-x-1/2 !transition-none',
        compact ? '!top-[68px]' : '!top-[84px]',
      )}
      popupClassName="!h-auto !w-auto !scale-100 !rounded-none !border-0 !bg-transparent !shadow-none !ring-0 !transition-opacity !duration-150"
    >
      <NavigationMenuList className="gap-0.5">
        {menuGroups.map((group) => (
          <NavigationMenuItem key={group.id}>
            {group.sections ? (
              <>
                <NavigationMenuTrigger className={triggerClasses}>
                  {t(group.labelKey)}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-0">
                  <MegaMenuPanel group={group} locale={locale} />
                </NavigationMenuContent>
              </>
            ) : group.homeAnchor ? (
              <NavigationMenuLink
                render={<a href={localAnchor(locale, group.homeAnchor)} />}
                className={plainLinkClasses}
              >
                {t(group.labelKey)}
              </NavigationMenuLink>
            ) : (
              <NavigationMenuLink
                render={<Link href={group.href ?? '/'} />}
                className={plainLinkClasses}
              >
                {t(group.labelKey)}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
