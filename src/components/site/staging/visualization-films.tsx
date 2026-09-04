import { VideoDialog, type VideoDialogLabels } from '@/components/site/video-dialog'

/** Alle drei Clips liegen als tonlose 720p-Fassung vor. */
const FILM_SIZE = { width: 1280, height: 720 } as const

const FILM_MEDIA = {
  house: {
    src: '/videos/ai-visualizations/house-nuremberg.mp4',
    poster: '/videos/ai-visualizations/house-nuremberg-poster.webp',
  },
  houseEntenberg: {
    src: '/videos/ai-visualizations/house-entenberg.mp4',
    poster: '/videos/ai-visualizations/house-entenberg-poster.webp',
  },
  apartment: {
    src: '/videos/ai-visualizations/apartment-nuremberg.mp4',
    poster: '/videos/ai-visualizations/apartment-nuremberg-poster.webp',
  },
  apartmentWiesenstrasse: {
    src: '/videos/ai-visualizations/apartment-wiesenstrasse.mp4',
    poster: '/videos/ai-visualizations/apartment-wiesenstrasse-poster.webp',
  },
  plot: {
    src: '/videos/ai-visualizations/property-schwabach.mp4',
    poster: '/videos/ai-visualizations/property-schwabach-poster.webp',
  },
  plotUttenreuth: {
    src: '/videos/ai-visualizations/property-uttenreuth.mp4',
    poster: '/videos/ai-visualizations/property-uttenreuth-poster.webp',
  },
} as const

export type FilmId = keyof typeof FILM_MEDIA

/**
 * Nach Objektart gruppiert, je zwei Filme.
 *
 * Sechs gleichrangige Kacheln beantworten die Frage nicht, die Verkäufer hier
 * stellen — „gibt es das auch für meine Art von Objekt?". Die Gruppen
 * beantworten sie, ohne dass ein Wort dazu nötig wäre.
 */
export const FILM_GROUPS = [
  { id: 'house', films: ['house', 'houseEntenberg'] },
  { id: 'apartment', films: ['apartment', 'apartmentWiesenstrasse'] },
  { id: 'plot', films: ['plot', 'plotUttenreuth'] },
] as const satisfies readonly { id: string; films: readonly FilmId[] }[]

export type FilmGroupId = (typeof FILM_GROUPS)[number]['id']

export const FILM_IDS = FILM_GROUPS.flatMap((group) => group.films) as readonly FilmId[]

export type Film = { id: FilmId; title: string; text: string }

/**
 * Die Filme laufen erst im Overlay — die Kachel zeigt bis dahin nur das Poster.
 * Drei automatisch startende Clips à 2–6 MB wären sonst auf jedem Seitenaufruf
 * fällig, obwohl die Sektion weit unter dem ersten Bildschirm liegt.
 */
export function VisualizationFilms({
  films,
  groupLabels,
  badge,
  fallback,
  labels,
}: {
  films: readonly Film[]
  groupLabels: Record<FilmGroupId, string>
  badge: string
  fallback: string
  labels: VideoDialogLabels
}) {
  const byId = new Map(films.map((film) => [film.id, film]))

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {FILM_GROUPS.map((group) => (
        <section key={group.id}>
          <h3 className="border-brand-500/40 border-b pb-3 text-[11px] font-semibold tracking-[0.22em] text-neutral-400 uppercase">
            {groupLabels[group.id]}
          </h3>
          <ul className="mt-7 grid gap-6 md:grid-cols-2 lg:gap-8">
            {group.films.map((id) => {
              const film = byId.get(id)
              if (!film) return null

              return (
                <FilmTile
                  key={film.id}
                  film={film}
                  badge={badge}
                  fallback={fallback}
                  labels={labels}
                />
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}

function FilmTile({
  film,
  badge,
  fallback,
  labels,
}: {
  film: Film
  badge: string
  fallback: string
  labels: VideoDialogLabels
}) {
  const media = FILM_MEDIA[film.id]

  return (
    <li className="flex flex-col">
      <VideoDialog
        src={media.src}
        poster={media.poster}
        width={FILM_SIZE.width}
        height={FILM_SIZE.height}
        title={film.title}
        fallback={fallback}
        labels={labels}
        className="aspect-video w-full"
        posterSizes="(min-width: 768px) 46vw, 100vw"
        overlay={
          <span className="bg-brand-600 absolute top-0 left-0 z-10 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
            {badge}
          </span>
        }
      />
      <h4 className="mt-5 max-w-[28ch] text-lg leading-snug font-semibold text-balance text-white">
        {film.title}
      </h4>
      <p className="mt-2 max-w-[52ch] text-sm leading-[1.7] text-pretty text-neutral-400">
        {film.text}
      </p>
    </li>
  )
}
