import type { ComponentProps } from 'react'
import { Link } from '@/i18n/navigation'

type LinkHref = ComponentProps<typeof Link>['href']

export type CtaBandProps = {
  title: string
  text?: string
  primary: { label: string; href: LinkHref }
  secondary?: { label: string; href: LinkHref }
}

/** Dark conversion band — closes marketing/template pages with one clear action. */
export function CtaBand({ title, text, primary, secondary }: CtaBandProps) {
  return (
    <section className="bg-surface-dark border-y border-white/8 py-18 md:py-24">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-10 px-5 sm:px-7 lg:flex-row lg:items-end lg:px-12">
        <div className="flex flex-col gap-3">
          <h2 className="max-w-[20ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance text-white md:text-[3.35rem]">
            {title}
          </h2>
          {text ? (
            <p className="max-w-[56ch] text-[17px] leading-[1.7] text-neutral-300">{text}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-4">
          {secondary ? (
            <Link
              href={secondary.href}
              className="inline-flex min-h-12 items-center justify-center border border-white/35 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/5 active:translate-y-px"
            >
              {secondary.label}
            </Link>
          ) : null}
          <Link
            href={primary.href}
            className="bg-brand-600 hover:bg-brand-700 inline-flex min-h-12 items-center justify-center px-7 py-3 text-sm font-semibold text-white transition-colors active:translate-y-px"
          >
            {primary.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
