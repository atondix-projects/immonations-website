import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const sourceRoot = join(root, 'assets', 'Referenz Objekte')
const publicRoot = join(root, 'public', 'images', 'references')
const manifestPath = join(root, 'docs', 'source-material', 'reference-public-derivatives.csv')

const sourceFolders = readdirSync(sourceRoot, { withFileTypes: true }).flatMap((city) => {
  if (!city.isDirectory()) return []
  return readdirSync(join(sourceRoot, city.name), { withFileTypes: true })
    .filter((folder) => folder.isDirectory())
    .map((folder) => `${city.name}/${folder.name}`)
})
const sourcePhotos = sourceFolders.reduce(
  (total, folder) =>
    total +
    readdirSync(join(sourceRoot, ...folder.split('/'))).filter((file) =>
      /\.(jpe?g|png|webp)$/i.test(file),
    ).length,
  0,
)
const publicReferenceFolders = readdirSync(publicRoot, { withFileTypes: true }).filter((entry) =>
  entry.isDirectory(),
)
const publicDerivatives = publicReferenceFolders.reduce(
  (total, folder) =>
    total +
    readdirSync(join(publicRoot, folder.name)).filter((file) => file.endsWith('.webp')).length,
  0,
)
const manifestRows = readFileSync(manifestPath, 'utf8')
  .trim()
  .split(/\r?\n/)
  .slice(1)
  .filter(Boolean)
const catalogIds = [...new Set(manifestRows.map((row) => row.split(',')[0]))]
const missingPublicFolders = catalogIds.filter((id) => !existsSync(join(publicRoot, id)))
const missingDerivatives = catalogIds.flatMap((id) =>
  ['cover.webp', 'gallery-02.webp', 'gallery-03.webp']
    .filter((file) => !existsSync(join(publicRoot, id, file)))
    .map((file) => `${id}/${file}`),
)

const report = {
  generatedAt: new Date().toISOString(),
  sourceFolders: sourceFolders.length,
  sourcePhotos,
  catalogRecords: catalogIds.length,
  publicDerivatives,
  localizedDetailRoutes: catalogIds.length * 2,
  missingPublicFolders,
  missingDerivatives,
  complete:
    sourceFolders.length === 29 &&
    sourcePhotos === 87 &&
    catalogIds.length === 29 &&
    publicDerivatives === 87 &&
    missingPublicFolders.length === 0 &&
    missingDerivatives.length === 0,
}

writeFileSync(
  join(root, 'docs', 'source-material', 'reference-coverage-report.json'),
  `${JSON.stringify(report, null, 2)}\n`,
)
console.log(JSON.stringify(report, null, 2))
