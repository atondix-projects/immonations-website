import Image from 'next/image'
import { ArrowUpRight, BadgeCheck, Star } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { REAL_REVIEWS_POST_SLUG } from '@/lib/content/blog'
import { MAKLER_SIEGER_PROFILE } from '@/lib/content/review-portals'
import {
  testimonialCoverClass,
  testimonialImage,
  testimonialVideo,
  type TestimonialId,
  type TestimonialStory,
} from '@/lib/content/testimonials'
import { AnimatedNumber } from '@/components/site/animated-number'
import { ReviewRotator, type TestimonialVideoSlide } from './review-rotator'
import { GOOGLE_PROFILE, ReviewPortalGrid, type ReviewPortal } from './review-portals'
import { CONTAINER, SECTION_LINK, SectionHeader } from './section-shell'

type Headline = { platform: string; rating: string; count: string; link: string }
type Stat = { value: string; label: string }
type FeedbackVoice = {
  id: TestimonialId
  name: string
  title: string
  available: boolean
}

function getVideoTestimonials(stories: TestimonialStory[], voices: FeedbackVoice[]) {
  return voices.flatMap((voice) => {
    const video = testimonialVideo(voice.id)
    if (!voice.available || !video) return []
    const story = stories.find((item) => item.id === voice.id)

    return [
      {
        video,
        poster: testimonialImage(voice.id),
        posterClassName: testimonialCoverClass(voice.id),
        story: {
          name: story?.name ?? voice.name,
          context: story?.context ?? voice.title,
          quote: story?.quote,
          result: story?.result,
        },
      },
    ]
  }) satisfies TestimonialVideoSlide[]
}

export async function Reviews({ compact = false }: { compact?: boolean }) {
  const t = await getTranslations('Home.reviews')
  const tTestimonials = await getTranslations('Testimonials')
  const tFeedback = await getTranslations('Home.feedback')
  const tVideo = await getTranslations('VideoDialog')
  const locale = await getLocale()
  const language = locale === 'en' ? 'en' : 'de'
  const headline = t.raw('headline') as Headline
  const stats = t.raw('stats') as Stat[]
  const portals = t.raw('portals') as ReviewPortal[]
  const visiblePortals = compact
    ? portals.filter((portal) => portal.kind === 'direct').slice(0, 5)
    : portals
  const testimonialItems = tTestimonials.raw('items') as TestimonialStory[]
  const feedbackItems = tFeedback.raw('items') as FeedbackVoice[]
  const videoTestimonials = getVideoTestimonials(testimonialItems, feedbackItems)

  return (
    <section
      id="bewertungen"
      className={
        compact
          ? 'border-border bg-muted/65 scroll-mt-24 border-y py-16 md:py-22'
          : 'border-border bg-muted/65 scroll-mt-24 border-y py-18 md:py-28'
      }
    >
      <div className={CONTAINER}>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />
        <p className="text-muted-foreground -mt-7 mb-12 max-w-[62ch] text-[17px] leading-[1.75] text-pretty md:-mt-10 md:mb-16">
          {t('lead')}
        </p>

        {/* Headline rating, aggregate figures, and the independent seal. */}
        <div className="border-border grid gap-px overflow-hidden border bg-neutral-300 lg:grid-cols-[0.9fr_1.1fr_auto]">
          <div className="bg-background flex flex-col justify-between gap-8 p-6 sm:p-8">
            <div>
              {/* The Google asset is the square “G” mark, so it is paired with the name. */}
              <div className="flex items-center gap-2.5">
                <Image
                  src="/images/reviews/portals/google.svg"
                  alt=""
                  width={32}
                  height={32}
                  unoptimized
                  className="size-7 object-contain"
                />
                <span className="text-base font-semibold">{headline.platform}</span>
              </div>
              <div className="mt-7 flex items-end gap-3">
                <AnimatedNumber
                  value={headline.rating}
                  className="font-serif text-[4.25rem] leading-none font-medium tracking-[-0.04em]"
                />
                <span className="text-muted-foreground pb-2 text-sm">{t('ratingSuffix')}</span>
              </div>
              <div
                className="text-brand-700 mt-4 flex gap-1"
                aria-label={`${headline.rating} ${t('ratingSuffix')}`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="text-muted-foreground mt-4 text-sm">{headline.count}</p>
            </div>
            <a
              href={GOOGLE_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 border-brand-700/30 hover:border-brand-700 inline-flex w-fit items-center gap-2 border-b pb-1 text-sm font-semibold transition-colors"
            >
              {headline.link}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <dl className="grid h-full gap-px bg-neutral-300 sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-background flex h-full flex-col justify-center gap-1.5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-start lg:gap-5 lg:px-8 lg:py-0"
              >
                <dt className="text-muted-foreground order-2 text-sm">{stat.label}</dt>
                <dd className="order-1 lg:w-24 lg:shrink-0">
                  <AnimatedNumber
                    value={stat.value}
                    delay={index * 0.08}
                    className="font-serif text-[2.5rem] leading-none font-medium tracking-[-0.03em]"
                  />
                </dd>
              </div>
            ))}
          </dl>

          <div className="bg-background flex flex-col justify-between gap-6 p-6 sm:p-8 lg:max-w-[19.5rem]">
            <a
              href={MAKLER_SIEGER_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="group focus-visible:ring-brand-700 w-fit focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Image
                src="/images/reviews/maklersieger-badge.svg"
                alt={t('sealAlt')}
                width={300}
                height={100}
                unoptimized
                className="h-[74px] w-auto transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
              {/* Pfeil inline im Textfluss, damit er beim Umbruch am letzten Wort bleibt. */}
              <span className="text-brand-700 mt-4 flex items-start gap-2 text-sm font-semibold">
                <BadgeCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  {t('verifiedProfile')}
                  <ArrowUpRight className="ml-1 inline size-4 align-[-0.2em]" aria-hidden="true" />
                </span>
              </span>
            </a>
            <p className="text-muted-foreground text-xs leading-relaxed text-pretty">
              {t('sealNote')}
            </p>
          </div>
        </div>

        {/* Playable interviews rotate with their matching documented sale stories. */}
        <div className="mt-14 md:mt-16">
          <ReviewRotator
            slides={videoTestimonials}
            labels={{
              carousel: t('carouselLabel'),
              previous: t('previousReview'),
              next: t('nextReview'),
              slide: t('reviewSlide'),
              video: t('videoLabel'),
              play: tVideo('play'),
              close: tVideo('close'),
              transcript: tVideo('transcript'),
            }}
            fallback={tTestimonials('videoFallback')}
          />
        </div>
        <p className="text-muted-foreground mt-4 max-w-[62ch] text-xs leading-relaxed text-pretty">
          {t('selectionNote')}{' '}
          <Link
            href={{
              pathname: '/blog/[slug]',
              params: { slug: REAL_REVIEWS_POST_SLUG[language] },
            }}
            className="text-brand-700 hover:text-brand-800 font-semibold transition-colors"
          >
            {t('guideLink')}
          </Link>
        </p>

        {/* Every public review profile, with its rating and source basis. */}
        <div className="border-border mt-14 border-t pt-8 md:mt-20 md:pt-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <div>
              <p className="text-brand-700 text-[11px] font-semibold tracking-[0.2em] uppercase">
                {t('portalTitle')}
              </p>
              <p className="mt-3 font-serif text-[1.75rem] leading-[1.15] font-medium text-balance md:text-[2.1rem]">
                {t('portalClaim')}
              </p>
            </div>
            <p className="text-muted-foreground max-w-[46ch] text-sm leading-relaxed text-pretty">
              {t('portalIntro')}
            </p>
          </div>

          <ReviewPortalGrid
            portals={visiblePortals}
            labels={{
              direct: t('sourceDirect'),
              aggregate: t('sourceAggregate'),
              openProfile: t('openProfile'),
            }}
            compact={compact}
          />

          {compact ? (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-x-10 gap-y-3">
              <Link href="/reviews" className={SECTION_LINK}>
                {t('allProfilesLink')}
              </Link>
              <p className="text-muted-foreground text-xs whitespace-nowrap">{t('asOf')}</p>
            </div>
          ) : (
            <div className="text-muted-foreground mt-4 flex flex-wrap items-start justify-between gap-x-10 gap-y-2 text-xs leading-relaxed">
              <p className="max-w-3xl text-pretty">{t('portalNote')}</p>
              <p className="whitespace-nowrap">{t('asOf')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
