import { Clock3, Volume2 } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { VideoDialog } from '@/components/site/video-dialog'
import { TSV_FEEDBACK_VIDEO, TSV_QUOTES } from '@/lib/content/tsv-zirndorf'

/**
 * Das Videofeedback von Marcus Grun als eigene Sektion.
 *
 * Bis hierher lief der Clip als zweite Kachel in einem Zweierraster neben dem
 * Sponsoringfilm und ging darin unter. Er ist aber der einzige Beleg auf der
 * Seite, in dem der Partner selbst und in eigenen Worten spricht — deshalb
 * bekommt er eine eigene Bühne.
 *
 * Der dunkle Grund ist Absicht: Die Sektionen darüber und darunter laufen auf
 * `background` und `muted/45`; nur `surface-dark` setzt im Seitenrhythmus
 * eine echte Zäsur. Das schließende CTA-Band bleibt auf `background`.
 *
 * Das schriftliche Zitat stammt aus der Bekanntgabe des Vereins, nicht aus dem
 * Film — es steht deshalb nur einmal auf der Seite, hier beim Sprecher.
 */

const COPY = {
  de: {
    eyebrow: 'Der Partner im O-Ton',
    title: 'Hören Sie es von Marcus Grun',
    lede: 'Der Abteilungsleiter der Leichtathletik beim TSV Zirndorf hat sich vor die Kamera gestellt und erzählt in gut einer Minute, wie sich die Zusammenarbeit mit Immonation anfühlt.',
    duration: '1:21 Minuten',
    sound: 'Mit Ton, auf Deutsch',
    note: 'Aufgenommen im Immonation-Büro in Zirndorf.',
  },
  en: {
    eyebrow: 'Our partner, in his own words',
    title: 'Hear it from Marcus Grun',
    lede: 'The head of the athletics division at TSV Zirndorf stepped in front of the camera and spends just over a minute describing what working with Immonation feels like.',
    duration: '1:21 minutes',
    sound: 'With sound, in German',
    note: 'Recorded at the Immonation office in Zirndorf.',
  },
} as const

export async function TsvFeedbackSpotlight({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const tVideo = await getTranslations('VideoDialog')
  const t = await getTranslations('BlogPost')

  return (
    <section
      id="tsv-feedback"
      aria-labelledby="tsv-feedback-heading"
      className="bg-surface-dark scroll-mt-24 border-y border-white/10 py-16 md:py-24"
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:px-10">
        {/* Das Hochformat bekommt eine gedeckelte Spalte statt der halben
            Sektionsbreite — 1080×1920 auf 50 % Breite wäre höher als der
            Viewport und würde die Textspalte an den oberen Rand drücken. */}
        <VideoDialog
          src={TSV_FEEDBACK_VIDEO.src}
          poster={TSV_FEEDBACK_VIDEO.poster}
          width={TSV_FEEDBACK_VIDEO.width}
          height={TSV_FEEDBACK_VIDEO.height}
          title={TSV_FEEDBACK_VIDEO.title[locale]}
          fallback={t('videoFallback')}
          labels={{
            play: tVideo('play'),
            close: tVideo('close'),
            transcript: tVideo('transcript'),
          }}
          captions={TSV_FEEDBACK_VIDEO.captions}
          className="mx-auto aspect-[9/16] w-full max-w-[19rem] border border-white/15 lg:mx-0"
          posterSizes="(min-width: 1024px) 20rem, (min-width: 640px) 60vw, 100vw"
          playAppearance="reel"
        />

        <div className="min-w-0">
          <p className="text-brand-300 font-mono text-[11px] tracking-[0.2em] uppercase">
            {copy.eyebrow}
          </p>
          <h2
            id="tsv-feedback-heading"
            className="mt-5 max-w-[20ch] font-serif text-[2rem] leading-[1.08] font-medium tracking-[-0.02em] text-balance text-white md:text-[2.6rem]"
          >
            {copy.title}
          </h2>
          <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.7] text-pretty text-neutral-300">
            {copy.lede}
          </p>

          <figure className="border-brand-400/60 mt-9 border-l-2 pl-6">
            <blockquote className="max-w-[46ch] font-serif text-[1.35rem] leading-[1.45] text-pretty text-white/90 md:text-[1.6rem]">
              “{TSV_QUOTES.grun[locale]}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-neutral-400">
              <span className="font-semibold text-neutral-200">{TSV_QUOTES.grun.speaker}</span> —{' '}
              {TSV_QUOTES.grun.role[locale]}
            </figcaption>
          </figure>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-neutral-400">
            <li className="inline-flex items-center gap-2">
              <Clock3 className="size-4 shrink-0" aria-hidden="true" />
              {copy.duration}
            </li>
            <li className="inline-flex items-center gap-2">
              <Volume2 className="size-4 shrink-0" aria-hidden="true" />
              {copy.sound}
            </li>
            <li>{copy.note}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
