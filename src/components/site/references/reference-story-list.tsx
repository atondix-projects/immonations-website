import { getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { listReferenceStories, type ReferenceStoryItem } from '@/lib/content/reference-stories'
import { ReferenceStoryCard } from './reference-story-card'

export async function ReferenceStoryList({ locale }: { locale: 'de' | 'en' }) {
  const t = await getTranslations('ReferencesPage')
  const stories = listReferenceStories(t.raw('stories.items') as ReferenceStoryItem[])
  if (stories.length === 0) return null

  const labels = t.raw('stories.labels') as {
    startingPoint: string
    challenge: string
    result: string
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-primary text-[13px] font-semibold tracking-[0.16em] uppercase">
              {t('stories.eyebrow')}
            </p>
            <h2 className="mt-3 max-w-[18ch] font-serif text-3xl leading-[1.12] font-semibold text-balance md:text-[42px]">
              {t('stories.title')}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-[66ch] text-[16px] leading-[1.65] lg:justify-self-end">
            {t('stories.text')}
          </p>
        </div>

        <div className="grid gap-8 md:gap-10">
          {stories.map((item) => (
            <ReferenceStoryCard
              key={item.id}
              item={item}
              locale={locale}
              soldLabel={t('stories.soldLabel')}
              labels={labels}
            />
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/sold"
            className="bg-foreground text-background hover:bg-brand-800 inline-flex min-h-11 items-center gap-2 px-7 py-3 text-sm font-semibold transition-colors"
          >
            {t('stories.viewSold')}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <p className="text-muted-foreground mt-6 max-w-[72ch] text-sm leading-relaxed">
          {t('stories.note')}
        </p>
      </div>
    </section>
  )
}
