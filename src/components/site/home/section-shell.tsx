import type { ComponentProps } from 'react'
import { Link } from '@/i18n/navigation'

export const CONTAINER = 'mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12'
export const EYEBROW =
  'text-brand-700 text-[11px] font-semibold uppercase tracking-[0.2em] md:text-xs'
export const SECTION_TITLE =
  'font-serif text-[2rem] font-medium leading-[1.04] tracking-[-0.025em] sm:text-[2.35rem] md:text-[3.35rem]'
export const SECTION_LINK =
  'text-brand-700 whitespace-nowrap border-b border-brand-700/30 pb-1 text-sm font-semibold transition-colors hover:border-brand-700'

type LinkHref = ComponentProps<typeof Link>['href']

export function SectionHeader({
  eyebrow,
  title,
  link,
}: {
  eyebrow?: string
  title: string
  link?: { label: string; href: LinkHref }
}) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-8 md:mb-16">
      <div className="flex flex-col gap-3.5">
        {eyebrow ? <span className={EYEBROW}>{eyebrow}</span> : null}
        <h2 className={`${SECTION_TITLE} max-w-[26ch] text-balance`}>{title}</h2>
      </div>
      {link ? (
        <Link href={link.href} className={SECTION_LINK}>
          {link.label}
        </Link>
      ) : null}
    </div>
  )
}
