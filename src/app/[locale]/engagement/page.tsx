import { TsvFeedbackSpotlight } from '@/components/site/engagement/tsv-feedback-spotlight'
import { TsvZirndorf } from '@/components/site/engagement/tsv-zirndorf'
import { UgandaDonation } from '@/components/site/engagement/uganda-donation'
import { createCatalogMetadata, createCatalogPage } from '@/lib/content/catalog-page-route'

export const generateMetadata = createCatalogMetadata('engagement')

/**
 * Reihenfolge der Sektionen ist auch eine Frage des Untergrunds: hell (TSV),
 * dunkel (Feedback von Marcus Grun), gedeckt (Uganda). Die dunkle Bahn in der
 * Mitte ist die einzige echte Zäsur der Seite und hebt den Film heraus.
 */
export default createCatalogPage('engagement', (locale) => (
  <>
    <TsvZirndorf locale={locale} />
    <TsvFeedbackSpotlight locale={locale} />
    <UgandaDonation locale={locale} />
  </>
))
