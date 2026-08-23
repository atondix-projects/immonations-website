/**
 * Zahlformatierung für den Preisatlas.
 *
 * Die Locale wird immer explizit übergeben: eine implizite Umgebungs-Locale
 * würde auf Server und Client unterschiedlich auflösen und zu Hydration-
 * Mismatches in genau diesen tabellarischen Zahlen führen.
 */
const INTL_LOCALES: Record<string, string> = { de: 'de-DE', en: 'en-US' }

export function intlLocale(locale: string): string {
  return INTL_LOCALES[locale] ?? 'de-DE'
}

export function formatValue(value: number, locale: string): string {
  return new Intl.NumberFormat(intlLocale(locale), { maximumFractionDigits: 0 }).format(value)
}
