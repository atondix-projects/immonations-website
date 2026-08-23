'use client'

import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Banknote,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  Calculator,
  CalendarDays,
  ChartNoAxesCombined,
  CircleHelp,
  Download,
  HeartHandshake,
  Home,
  KeyRound,
  Landmark,
  MapPinned,
  Newspaper,
  Ruler,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
} from 'lucide-react'
import { useLocale } from 'next-intl'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { getNavigation, type NavigationIcon, type NavigationLink } from '@/content/navigation'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const ICONS: Record<NavigationIcon, LucideIcon> = {
  award: Award,
  banknote: Banknote,
  book: BookOpen,
  bot: Bot,
  briefcase: Briefcase,
  building: Building2,
  calculator: Calculator,
  calendar: CalendarDays,
  chart: ChartNoAxesCombined,
  'circle-help': CircleHelp,
  download: Download,
  heart: HeartHandshake,
  home: Home,
  key: KeyRound,
  landmark: Landmark,
  map: MapPinned,
  newspaper: Newspaper,
  ruler: Ruler,
  search: Search,
  shield: ShieldCheck,
  sparkles: Sparkles,
  star: Star,
  users: Users,
  video: Video,
}

function splitLinks(links: NavigationLink[]) {
  const columnCount = links.length <= 4 ? 1 : links.length <= 10 ? 2 : 3
  const columnSize = Math.ceil(links.length / columnCount)
  return Array.from({ length: columnCount }, (_, index) =>
    links.slice(index * columnSize, (index + 1) * columnSize),
  )
}

function MenuEntry({ item }: { item: NavigationLink }) {
  const Icon = ICONS[item.icon]

  return (
    <li>
      <NavigationMenuLink
        render={<Link href={item.href} />}
        className="group/entry grid grid-cols-[20px_1fr] items-start gap-3 px-0 py-2.5 text-left text-neutral-700 hover:bg-transparent focus:bg-transparent"
      >
        <Icon
          aria-hidden="true"
          className="text-brand-600 group-hover/entry:text-brand-700 mt-0.5 size-4 transition-colors"
          strokeWidth={1.75}
        />
        <span className="min-w-0">
          <span className="group-hover/entry:text-brand-700 block text-sm leading-tight font-semibold text-neutral-900 transition-colors">
            {item.label}
          </span>
          <span className="mt-1 block text-[12px] leading-snug text-neutral-600">
            {item.description}
          </span>
        </span>
      </NavigationMenuLink>
    </li>
  )
}

function MenuColumn({
  links,
  index,
  compact = false,
}: {
  links: NavigationLink[]
  index: number
  compact?: boolean
}) {
  return (
    <div className={cn('border-neutral-200/80 lg:border-r', compact ? 'px-5 py-5' : 'px-5 py-6')}>
      <span className="text-brand-700 font-mono text-[10px] tracking-widest tabular-nums">
        {String(index + 1).padStart(2, '0')}
      </span>
      <ul className="mt-4 flex flex-col gap-1">
        {links.map((item) => (
          <MenuEntry key={item.id} item={item} />
        ))}
      </ul>
    </div>
  )
}

function MenuHighlight({
  item,
  locale,
  compact = false,
}: {
  item: NavigationLink
  locale: Locale
  compact?: boolean
}) {
  const Icon = ICONS[item.icon]
  const labels =
    locale === 'de' ? { kicker: 'Fokus', open: 'Öffnen' } : { kicker: 'Featured', open: 'Open' }

  return (
    <div className={compact ? 'px-5 py-5' : 'px-5 py-6'}>
      <span className="text-brand-700 font-mono text-[10px] tracking-[0.22em] uppercase">
        {labels.kicker}
      </span>
      <NavigationMenuLink
        render={<Link href={item.href} />}
        className={cn(
          'group/highlight border-brand-100 bg-brand-50/70 hover:bg-brand-50 focus:bg-brand-50 flex flex-col border text-left',
          compact ? 'mt-4 min-h-[164px] p-4' : 'mt-5 min-h-[214px] p-5',
        )}
      >
        <Icon aria-hidden="true" className="text-brand-700 size-5" strokeWidth={1.75} />
        <span
          className={cn(
            'block font-serif leading-none font-semibold text-neutral-900',
            compact ? 'mt-4 text-xl' : 'mt-5 text-[22px]',
          )}
        >
          {item.label}
        </span>
        <span className="mt-3 block text-[13px] leading-relaxed text-neutral-700">
          {item.description}
        </span>
        <span
          className={cn(
            'group-hover/highlight:text-brand-800 text-brand-700 mt-auto inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors',
            compact ? 'pt-4' : 'pt-6',
          )}
        >
          {labels.open}
          <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={1.8} />
        </span>
      </NavigationMenuLink>
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
  const locale = useLocale() as Locale
  const groups = getNavigation(locale)
  const navItemSurface = light
    ? 'text-white hover:bg-white/10 focus:bg-white/10'
    : 'text-foreground hover:bg-muted focus:bg-muted'
  const triggerClasses = cn(
    'bg-transparent px-2.5 font-normal transition-[color,background-color,height,font-size] duration-300 motion-reduce:transition-none',
    compact ? 'h-8 text-[15px]' : 'h-9 text-base',
    navItemSurface,
    light &&
      'data-open:bg-white/10 data-open:hover:bg-white/10 data-open:focus:bg-white/10 data-popup-open:bg-white/10 data-popup-open:hover:bg-white/10 data-popup-open:focus:bg-white/10',
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
        {groups.map((group) => {
          const visibleLinks = group.links.filter((item) => !item.hiddenFromList)
          const isCompactMenu = visibleLinks.length <= 4
          const columns = splitLinks(visibleLinks)
          const highlight =
            group.links.find((item) => item.id === group.highlightId) ?? group.links[0]

          return (
            <NavigationMenuItem key={group.id}>
              <NavigationMenuTrigger className={triggerClasses}>
                {group.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0">
                <div
                  className={cn(
                    'border border-neutral-900/10 bg-white/95 text-neutral-900 shadow-[0_24px_70px_-34px_rgba(0,0,0,0.45)] backdrop-blur-xl',
                    isCompactMenu
                      ? 'w-[min(calc(100vw_-_48px),760px)]'
                      : 'w-[min(calc(100vw_-_48px),1128px)]',
                  )}
                >
                  <div
                    className={cn(
                      'grid',
                      isCompactMenu && 'grid-cols-[minmax(245px,0.9fr)_minmax(300px,1.1fr)]',
                    )}
                    style={
                      isCompactMenu
                        ? undefined
                        : {
                            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr)) minmax(240px, 1.08fr)`,
                          }
                    }
                  >
                    {columns.map((column, index) => (
                      <MenuColumn
                        key={`${group.id}-${index}`}
                        links={column}
                        index={index}
                        compact={isCompactMenu}
                      />
                    ))}
                    {highlight ? (
                      <MenuHighlight item={highlight} locale={locale} compact={isCompactMenu} />
                    ) : null}
                  </div>
                  <div
                    className={cn(
                      'mx-5 flex items-center justify-between gap-6 border-t border-neutral-200/80',
                      isCompactMenu ? 'py-4' : 'py-5',
                    )}
                  >
                    <p className="max-w-[52ch] text-xs leading-relaxed text-neutral-600">
                      {group.footer.text}
                    </p>
                    <NavigationMenuLink
                      render={<Link href={group.footer.href} />}
                      className="group/footer text-brand-700 hover:text-brand-800 inline-flex shrink-0 items-center gap-2 p-0 font-mono text-[10px] tracking-[0.22em] uppercase hover:bg-transparent focus:bg-transparent"
                    >
                      {group.footer.label}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-3 transition-transform group-hover/footer:translate-x-0.5"
                        strokeWidth={1.8}
                      />
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
