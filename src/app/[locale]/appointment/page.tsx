import { createCatalogMetadata } from '@/lib/content/catalog-page-route'
import {
  createPrototypePage,
  generatePrototypeStaticParams,
} from '@/lib/content/prototype-page-route'
import { AppointmentContent } from '@/components/site/prototype-page-content'

export const generateMetadata = createCatalogMetadata('appointment')
export const generateStaticParams = generatePrototypeStaticParams
export default createPrototypePage('appointment', (locale) => (
  <AppointmentContent locale={locale} />
))
