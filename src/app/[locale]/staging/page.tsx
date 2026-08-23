import { createCatalogMetadata, createCatalogPage } from '@/lib/content/catalog-page-route'

export const generateMetadata = createCatalogMetadata('staging')
export default createCatalogPage('staging')
