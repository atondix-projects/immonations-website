export const MAGAZINE_REVIER = {
  title: 'REVIER 01',
  issue: 'Ausgabe 01 / 2026',
  pageWidth: 2800,
  pageHeight: 3928,
  pages: Array.from({ length: 12 }, (_, index) => ({
    number: index + 1,
    src: `/magazine/revier/page-${String(index + 1).padStart(2, '0')}.webp`,
  })),
} as const
