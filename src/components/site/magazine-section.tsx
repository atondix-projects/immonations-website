import { getTranslations } from 'next-intl/server'
import { MAGAZINE_REVIER } from '@/lib/content/magazine'
import { cn } from '@/lib/utils'
import { MagazineFlipbook, type MagazineFlipbookLabels } from './magazine-flipbook'

export async function MagazineSection({
  tone = 'light',
  compact = false,
}: {
  tone?: 'light' | 'muted'
  compact?: boolean
}) {
  const t = await getTranslations('Magazine')
  const labels: MagazineFlipbookLabels = {
    previous: t('reader.previous'),
    next: t('reader.next'),
    firstPage: t('reader.firstPage'),
    pageProgress: t.raw('reader.pageProgress') as string,
    spreadProgress: t.raw('reader.spreadProgress') as string,
    pageAlt: t.raw('reader.pageAlt') as string,
    readerLabel: t('reader.label'),
  }
  const Heading = compact ? 'h3' : 'h2'

  return (
    <section
      id="magazin"
      className={cn(
        'scroll-mt-24 border-y',
        compact ? 'py-14 md:py-18' : 'py-16 md:py-24',
        tone === 'muted' ? 'bg-muted/50 border-border' : 'bg-background border-border',
      )}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-10">
        <div className="max-w-[900px]">
          <span className="text-[13px] font-semibold tracking-[0.14em] text-neutral-600 uppercase">
            {t('eyebrow')}
          </span>
          <Heading className="mt-4 font-serif text-3xl leading-[1.12] font-semibold text-balance md:text-[42px]">
            {t('title')}
          </Heading>
          <p className="text-muted-foreground mt-5 max-w-[64ch] text-[17px] leading-[1.65] md:text-lg">
            {t('text')}
          </p>
        </div>

        <MagazineFlipbook pages={MAGAZINE_REVIER.pages} labels={labels} />
      </div>
    </section>
  )
}
