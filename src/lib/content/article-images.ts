import { TSV_ALL_IMAGES } from './tsv-zirndorf'
import { UGANDA_ALL_IMAGES } from './uganda-donation'

/**
 * Intrinsische Maße für Bilder, die in MDX-Artikeln vorkommen.
 *
 * Markdown (`![alt](src)`) transportiert keine Dimensionen. Ohne `width`/`height`
 * reserviert der Browser für ein `loading="lazy"`-Bild keinen Platz und der
 * Artikel springt beim Dekodieren. Die Maße stehen bereits in den
 * Bildregistern — hier werden sie nur nach Pfad auffindbar gemacht.
 *
 * Neue Register einfach unten anhängen; unbekannte Pfade liefern `{}`, das Bild
 * rendert dann wie zuvor ohne Reservierung.
 */
const DIMENSIONS: ReadonlyMap<string, { width: number; height: number }> = new Map(
  [...UGANDA_ALL_IMAGES, ...TSV_ALL_IMAGES].map((image) => [
    image.src,
    { width: image.width, height: image.height },
  ]),
)

export function imageDimensions(src?: string): { width?: number; height?: number } {
  if (!src) return {}
  return DIMENSIONS.get(src) ?? {}
}
