import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { VideoDialog } from '@/components/site/video-dialog'
import {
  testimonialImage,
  testimonialVideo,
  type StoryId,
  type TestimonialStory,
} from '@/lib/content/testimonials'

/**
 * Einzelne Kundenstimme zum Einsetzen auf Unterseiten.
 *
 * Die Startseite zeigt über `home/customer-stories.tsx` alle vier Geschichten
 * nebeneinander. Auf Verkaufsratgebern, Standort- und Kontaktseiten passt genau
 * eine — die zur Objektart, zur Stadt oder zum Anlass. Der Baustein liest
 * denselben Textbestand (`Testimonials.items`) und dieselbe Medienzuordnung,
 * damit Zitat und Ergebnis nirgends auseinanderlaufen.
 */
export async function TestimonialSpotlight({
  id,
  /**
   * Anker der Sektion. Bewusst ohne Vorgabe: `customer-stories` und
   * `feedback-videos` belegen bereits `kundenstimmen`, und zwei gleiche IDs auf
   * einer Seite machen den Sprung aus der Navigation unbestimmt.
   */
  anchorId,
  className,
}: {
  id: StoryId
  anchorId?: string
  className?: string
}) {
  const t = await getTranslations('Testimonials')
  const tVideo = await getTranslations('VideoDialog')

  const items = t.raw('items') as TestimonialStory[]
  const story = items.find((item) => item.id === id)
  // Fehlt der Eintrag in einer Sprachdatei, bleibt die Seite vollständig
  // nutzbar, statt beim Rendern auszufallen.
  if (!story) return null

  const video = story.video ? testimonialVideo(id) : null
  const image = testimonialImage(id)

  return (
    <section
      id={anchorId}
      className={cn(
        'border-border bg-muted/45 border-y py-14 md:py-18',
        anchorId && 'scroll-mt-24',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        <p className="text-primary text-[12px] font-semibold tracking-[0.16em] uppercase">
          {t('spotlightEyebrow')}
        </p>

        <div className="bg-neutral-0 mt-6 grid overflow-hidden border border-neutral-200 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="relative aspect-[16/10] min-h-0 overflow-hidden bg-neutral-100 lg:aspect-auto lg:min-h-[340px]">
            {video ? (
              <VideoDialog
                src={video.src}
                poster={image}
                width={video.width}
                height={video.height}
                title={`${story.name}: ${story.context}`}
                fallback={t('videoFallback')}
                labels={{ play: tVideo('play'), close: tVideo('close') }}
                className="size-full"
                posterSizes="(min-width: 1024px) 42vw, 100vw"
              />
            ) : (
              <Image
                src={image}
                alt={story.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            )}
          </div>

          <div className="flex min-w-0 flex-col justify-between p-7 sm:p-9 lg:p-11">
            <div>
              <p className="text-brand-700 text-[10px] font-semibold tracking-[0.2em] uppercase">
                {story.context}
              </p>
              <blockquote className="mt-5 max-w-[34ch] font-serif text-2xl leading-[1.32] font-medium text-pretty md:text-[1.75rem]">
                “{story.quote}”
              </blockquote>
            </div>
            <div className="mt-8 border-t border-neutral-200 pt-5">
              <p className="font-semibold">{story.name}</p>
              <p className="text-muted-foreground mt-1 text-sm">{story.result}</p>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mt-5 max-w-[76ch] text-xs leading-relaxed">
          {t('prototypeNote')}
        </p>
      </div>
    </section>
  )
}
