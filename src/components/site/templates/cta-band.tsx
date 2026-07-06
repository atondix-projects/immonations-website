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
    <section className="bg-surface-dark py-16 md:py-20">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-start justify-between gap-8 px-6 lg:flex-row lg:items-center lg:px-10">
        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-3xl font-semibold leading-[1.15] text-balance text-white md:text-[38px]">
            {title}
          </h2>
          {text ? (
            <p className="text-neutral-400 max-w-[56ch] text-[17px] leading-[1.6]">{text}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-4">
          {secondary ? (
            <Link
              href={secondary.href}
              className="inline-flex items-center justify-center border border-white/40 px-8 py-[15px] text-base font-medium tracking-[0.04em] text-white transition-colors hover:border-white"
            >
              {secondary.label}
            </Link>
          ) : null}
          <Link
            href={primary.href}
            className="bg-brand-500 hover:bg-brand-400 inline-flex items-center justify-center px-8 py-4 text-base font-medium tracking-[0.04em] text-white transition-colors"
          >
            {primary.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
