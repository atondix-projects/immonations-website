import { createCatalogMetadata } from '@/lib/content/catalog-page-route'
import {
  createPrototypePage,
  generatePrototypeStaticParams,
} from '@/lib/content/prototype-page-route'
import { SoldContent } from '@/components/site/prototype-page-content'

export const generateMetadata = createCatalogMetadata('sold')
export const generateStaticParams = generatePrototypeStaticParams
export default createPrototypePage('sold', (locale) => <SoldContent locale={locale} />, false)
