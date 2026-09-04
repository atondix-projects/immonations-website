import { createCatalogMetadata } from '@/lib/content/catalog-page-route'
import {
  createPrototypePage,
  generatePrototypeStaticParams,
} from '@/lib/content/prototype-page-route'
import { MagazineContent } from '@/components/site/prototype-page-content'

export const generateMetadata = createCatalogMetadata('magazine')
export const generateStaticParams = generatePrototypeStaticParams
export default createPrototypePage('magazine', () => <MagazineContent />, false)
