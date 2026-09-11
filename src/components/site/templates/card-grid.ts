/**
 * Spalten für die nummerierten Kartenraster der Unterseiten.
 *
 * Das Raster zeichnet seine Trennlinien über `gap-px` auf einem grauen Hintergrund. Geht
 * die Kartenzahl nicht in der Spaltenzahl auf, bleibt eine leere graue Restzelle stehen
 * (vier Karten in drei Spalten). Deshalb richtet sich die Spaltenzahl nach der Kartenzahl:
 * Vielfache von drei bleiben dreispaltig, gerade Zahlen werden zweispaltig, und bei allen
 * übrigen füllt die letzte Karte die Reihe auf.
 */
export function cardGridColumns(count: number): string {
  if (count % 3 !== 0 && count % 2 === 0) return 'md:grid-cols-2'
  return 'md:grid-cols-3'
}

/** Spannweite einer Karte, damit die letzte Reihe ohne Restzelle endet. */
export function cardGridSpan(index: number, count: number): string {
  if (count % 3 === 0 || count % 2 === 0 || index !== count - 1) return ''
  return count % 3 === 1 ? 'md:col-span-3' : 'md:col-span-2'
}
