import { getTranslations } from 'next-intl/server'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { MAGAZINE_REVIER } from '@/lib/content/magazine'
import { cn } from '@/lib/utils'
import { MagazineFlipbook, type MagazineFlipbookLabels } from './magazine-flipbook'

type MagazinePoint = {
  title: string
  text: string
}

export async function MagazineSection({ tone = 'light' }: { tone?: 'light' | 'muted' }) {
  const t = await getTranslations('Magazine')
  const points = t.raw('points') as MagazinePoint[]
  const labels: MagazineFlipbookLabels = {
    previous: t('reader.previous'),
    next: t('reader.next'),
    expand: t('reader.expand'),
    collapse: t('reader.collapse'),
    firstPage: t('reader.firstPage'),
    lastPage: t('reader.lastPage'),
    pageProgress: t.raw('reader.pageProgress') as string,
    spreadProgress: t.raw('reader.spreadProgress') as string,
    pageAlt: t.raw('reader.pageAlt') as string,
    readerLabel: t('reader.label'),
  }

  return (
    <section
      id="magazin"
      className={cn(
        'scroll-mt-24 border-y py-16 md:py-24',
        tone === 'muted' ? 'bg-muted/50 border-border' : 'bg-background border-border',
      )}
    >
      <div className="mx-auto grid w-full max-w-[1240px] items-start gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 lg:px-10">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <div className="flex flex-col gap-3.5">
            <span className="text-neutral-600 text-[13px] font-semibold tracking-[0.14em] uppercase">
              {t('eyebrow')}
            </span>
            <h2 className="font-serif text-3xl leading-[1.2] font-semibold text-balance md:text-[38px]">
              {t('title')}
            </h2>
            <p className="text-muted-foreground max-w-[58ch] text-[17px] leading-[1.6]">
              {t('text')}
            </p>
          </div>

          <div className="grid gap-4">
            {points.map((point) => (
              <div key={point.title} className="flex gap-3">
                <BookOpen className="text-primary mt-1 size-4 shrink-0" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-[16px] font-semibold">{point.title}</h3>
                  <p className="text-muted-foreground text-sm leading-[1.55]">{point.text}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="text-primary inline-flex w-fit items-center gap-2 text-sm font-semibold"
          >
            {t('cta')}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <MagazineFlipbook
          title={MAGAZINE_REVIER.title}
          pages={MAGAZINE_REVIER.pages}
          pageWidth={MAGAZINE_REVIER.pageWidth}
          pageHeight={MAGAZINE_REVIER.pageHeight}
          labels={labels}
        />
      </div>
    </section>
  )
}
