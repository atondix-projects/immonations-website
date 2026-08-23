import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { CONTAINER, EYEBROW, SECTION_TITLE } from '@/components/site/home/section-shell'
import type { HandoverPolaroid } from '@/lib/content/handover-polaroids'

// Gemessene Kachelbreite im 4-Spalten-Raster sind 265 px plus Drehung; 280 px
// deklarieren, damit auf Retina-Displays nicht die zu kleine Stufe gewinnt.
const GRID_SIZES = '(min-width: 1024px) 280px, (min-width: 640px) 30vw, 44vw'

/**
 * Leichte Ablage aus der Achse, damit die Sofortbilder wie hingelegt wirken und
 * nicht wie ein Produktraster. Fester Zyklus statt Zufall: die Seite wird
 * statisch erzeugt, ein wechselndes Muster würde bei jedem Build den Diff
 * aufblähen.
 */
const TILT = [
  '-rotate-[1.6deg]',
  'rotate-[1.1deg]',
  '-rotate-[0.6deg]',
  'rotate-[1.9deg]',
  '-rotate-[1.2deg]',
  'rotate-[0.5deg]',
  '-rotate-[1.9deg]',
  'rotate-[1.4deg]',
] as const

/**
 * Die Übergabe-Polaroids als ruhige Wand.
 *
 * Bewusst ein statisches Raster und keine zweite Laufleiste: direkt darüber
 * liegt bereits die Verkauft-Marquee, und zwei bewegte, nach Orten sortierte
 * Beweisleisten hintereinander lesen sich als Wiederholung.
 *
 * Die Orte stehen zusätzlich als echter Text unter jedem Bild. Auf den
 * Sofortbildern sind sie nur handgeschrieben — für Crawler und Antwortmaschinen
 * wäre die Aussage sonst nicht vorhanden.
 */
export async function HandoverPolaroidWall({
  items,
  eyebrow,
  title,
  text,
  id = 'uebergabe',
  className,
  compact = false,
}: {
  items: HandoverPolaroid[]
  eyebrow?: string
  title: string
  text?: string
  id?: string
  className?: string
  compact?: boolean
}) {
  const t = await getTranslations('HandoverPolaroids')
  if (items.length === 0) return null

  return (
    <section
      id={id}
      className={cn(
        'bg-background scroll-mt-24',
        compact ? 'py-12 md:py-16' : 'py-16 md:py-24',
        className,
      )}
    >
      <div className={CONTAINER}>
        <div className="mb-12 flex flex-col gap-3.5 md:mb-16">
          {eyebrow ? <span className={EYEBROW}>{eyebrow}</span> : null}
          {compact ? (
            <h3 className={`${SECTION_TITLE} max-w-[24ch] text-balance`}>{title}</h3>
          ) : (
            <h2 className={`${SECTION_TITLE} max-w-[24ch] text-balance`}>{title}</h2>
          )}
          {text ? (
            <p className="text-muted-foreground mt-1.5 max-w-[68ch] text-[17px] leading-[1.65]">
              {text}
            </p>
          ) : null}
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-9 lg:gap-y-14">
          {items.map((item, index) => (
            <li key={item.id}>
              <figure
                className={cn(
                  'flex flex-col gap-3.5',
                  TILT[index % TILT.length],
                  // Beim Überfahren richtet sich das Sofortbild auf. Reine
                  // Deko, deshalb komplett hinter `motion-safe`: `hover:rotate-0`
                  // allein würde bei reduzierter Bewegung weiterhin greifen und
                  // nur die Überblendung verlieren — das Bild schnappt dann
                  // hart in die Waagerechte statt still liegen zu bleiben.
                  'motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:rotate-0',
                )}
              >
                <Image
                  src={item.image}
                  alt={t('alt', { town: item.town })}
                  width={item.width}
                  height={item.height}
                  sizes={GRID_SIZES}
                  loading="lazy"
                  className="h-auto w-full shadow-[0_10px_30px_rgba(0,0,0,0.13)]"
                />
                {/* Nur der Ort. Ein zweiter Span mit konstantem Label ("Schlüssel-
                    übergabe") stünde achtmal identisch darunter und würde beim
                    Auslesen mit dem Ortsnamen zu "AdelsdorfSchlüsselübergabe"
                    verschmelzen — genau die Textebene, für die diese Sektion da
                    ist. Worum es geht, sagen Überschrift und Fließtext einmal. */}
                <figcaption className="px-0.5 font-serif text-lg leading-tight font-semibold">
                  {item.town}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
