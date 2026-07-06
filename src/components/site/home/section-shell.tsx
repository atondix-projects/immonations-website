import type { ComponentProps } from 'react'
import { Link } from '@/i18n/navigation'

export const CONTAINER = 'mx-auto w-full max-w-[1240px] px-6 lg:px-10'
export const EYEBROW =
  'text-neutral-600 text-[13px] font-semibold uppercase tracking-[0.14em]'
export const SECTION_TITLE = 'font-serif text-3xl font-semibold leading-[1.2] md:text-[38px]'
export const SECTION_LINK =
  'text-primary whitespace-nowrap text-base font-medium tracking-[0.04em] hover:underline'

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
    <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
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
