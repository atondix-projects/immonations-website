import { VideoDialog, type VideoDialogLabels } from '@/components/site/video-dialog'

/** Alle drei Clips liegen als tonlose 720p-Fassung vor. */
const FILM_SIZE = { width: 1280, height: 720 } as const

const FILM_MEDIA = {
  house: {
    src: '/videos/ai-visualizations/house-nuremberg.mp4',
    poster: '/videos/ai-visualizations/house-nuremberg-poster.webp',
  },
  apartment: {
    src: '/videos/ai-visualizations/apartment-nuremberg.mp4',
    poster: '/videos/ai-visualizations/apartment-nuremberg-poster.webp',
  },
  plot: {
    src: '/videos/ai-visualizations/property-schwabach.mp4',
    poster: '/videos/ai-visualizations/property-schwabach-poster.webp',
  },
} as const

export type FilmId = keyof typeof FILM_MEDIA

export const FILM_IDS = ['house', 'apartment', 'plot'] as const satisfies readonly FilmId[]

export type Film = { id: FilmId; title: string; text: string }

/**
 * Die Filme laufen erst im Overlay — die Kachel zeigt bis dahin nur das Poster.
 * Drei automatisch startende Clips à 2–6 MB wären sonst auf jedem Seitenaufruf
 * fällig, obwohl die Sektion weit unter dem ersten Bildschirm liegt.
 */
export function VisualizationFilms({
  films,
  badge,
  fallback,
  labels,
}: {
  films: readonly Film[]
  badge: string
  fallback: string
  labels: VideoDialogLabels
}) {
  return (
    <ul className="grid gap-6 lg:grid-cols-3 lg:gap-8">
      {films.map((film) => {
        const media = FILM_MEDIA[film.id]

        return (
          <li key={film.id} className="flex flex-col">
            <VideoDialog
              src={media.src}
              poster={media.poster}
              width={FILM_SIZE.width}
              height={FILM_SIZE.height}
              title={film.title}
              fallback={fallback}
              labels={labels}
              className="aspect-video w-full"
              posterSizes="(min-width: 1024px) 32vw, 100vw"
              overlay={
                <span className="bg-brand-600 absolute top-0 left-0 z-10 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
                  {badge}
                </span>
              }
            />
            <h3 className="mt-5 max-w-[24ch] text-lg leading-snug font-semibold text-balance text-white">
              {film.title}
            </h3>
            <p className="mt-2 max-w-[46ch] text-sm leading-[1.7] text-pretty text-neutral-400">
              {film.text}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
