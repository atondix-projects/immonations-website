import { VideoDialog, type VideoDialogLabels } from '@/components/site/video-dialog'

/**
 * Video im Fließtext eines MDX-Beitrags.
 *
 * MDX kennt weder `locale` noch die übersetzten Bedienbeschriftungen, die
 * `VideoDialog` braucht. Die Beschriftungen reicht deshalb die Artikelseite an
 * die Komponentenkarte durch — im MDX bleiben nur die Angaben stehen, die zum
 * Clip selbst gehören:
 *
 * ```mdx
 * <ArticleVideo
 *   src="/videos/engagement/beispiel.mp4"
 *   poster="/images/engagement/beispiel.webp"
 *   width="1080"
 *   height="1920"
 *   title="Titel für Screenreader und Overlay"
 * />
 *
 * _Bildunterschrift als normaler kursiver Absatz._
 * ```
 *
 * **Alle Angaben als String schreiben.** Die Beiträge laufen über
 * `next-mdx-remote/rsc`; in dieser Pipeline kommen Ausdrucksattribute der Form
 * `width={1080}` nicht an — sie landen als `undefined` in der Komponente, ohne
 * dass irgendetwas einen Fehler wirft. Nachgemessen am gerenderten DOM:
 * `width="1080"` erreicht die Komponente, `width={1080}` nicht. Deshalb nimmt
 * die Komponente `string | number` entgegen und rechnet selbst um.
 *
 * Die Vorschaukachel von `VideoDialog` füllt ihren Container über `fill` und
 * bringt deshalb keine eigene Höhe mit — das Seitenverhältnis muss von außen
 * kommen. Es wird aus `width`/`height` abgeleitet: Hochformat läuft auf 9:16,
 * Querformat auf 16:9. Fehlen oder kippen die Maße, greift Querformat als
 * unauffälliger Rückfall; im Overlay spielt jeder Clip ohnehin in seinem
 * echten Format.
 */
export function ArticleVideo({
  src,
  poster,
  width,
  height,
  title,
  fallback,
  labels,
}: {
  src: string
  poster: string
  width: string | number
  height: string | number
  title: string
  fallback: string
  labels: VideoDialogLabels
}) {
  const pixelWidth = Number(width)
  const pixelHeight = Number(height)
  const hasSize = Number.isFinite(pixelWidth) && Number.isFinite(pixelHeight)
  const isPortrait = hasSize && pixelHeight > pixelWidth

  return (
    <div className={isPortrait ? 'my-8 max-w-[20rem]' : 'my-8'}>
      <VideoDialog
        src={src}
        poster={poster}
        width={pixelWidth}
        height={pixelHeight}
        title={title}
        fallback={fallback}
        labels={labels}
        className={
          isPortrait
            ? 'border-border aspect-[9/16] w-full border'
            : 'border-border aspect-video w-full border'
        }
        posterSizes={
          isPortrait ? '(min-width: 640px) 20rem, 100vw' : '(min-width: 768px) 42rem, 100vw'
        }
      />
    </div>
  )
}
