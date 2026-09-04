import { createCatalogMetadata } from '@/lib/content/catalog-page-route'
import {
  createPrototypePage,
  generatePrototypeStaticParams,
} from '@/lib/content/prototype-page-route'
import { AwardsContent } from '@/components/site/prototype-page-content'

export const generateMetadata = createCatalogMetadata('awards')
export const generateStaticParams = generatePrototypeStaticParams
export default createPrototypePage('awards', (locale) => <AwardsContent locale={locale} />, false)
