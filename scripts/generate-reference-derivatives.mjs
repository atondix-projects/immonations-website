import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const root = process.cwd()
const sourceRoot = join(root, 'assets', 'Referenz Objekte')
const publicRoot = join(root, 'public', 'images', 'references')

const sourceToId = {
  'Adelsdorf/RMH - Reuthseering': 'adelsdorf-reuthseering',
  'Deining/ETW Bürgermeister Keckl Str': 'deining-neubauwohnung',
  'Erlangen/ETW Luise Kisselbach Str': 'erlangen-eigentumswohnung',
  'Forchheim/ETW Spieläcker Str': 'forchheim-eigentumswohnung',
  'Forchheim/Townhouse Katzensteinstraße': 'forchheim-reihenhaus',
  'Fürth/ETW Kellermannstraße': 'fuerth-altbauwohnung',
  'Fürth/ETW Ludwigstraße': 'fuerth-renovierte-wohnung',
  'Fürth/Medizinisches Versorgungszentrum Fürth': 'fuerth-versorgungszentrum',
  'Fürth/MFH Ottostraße': 'fuerth-mehrfamilienhaus',
  'Hagenbüchach/An den Hausäckern': 'hagenbuechach-hausaeckern',
  'Heroldsbach/ZFH Am Vogelherd': 'heroldsbach-mehrfamilienhaus',
  'Herzogenaurach/Schützengraben': 'herzogenaurach-schuetzengraben',
  'Langenzenn/ETW Lenzenstraße': 'langenzenn-terrassenwohnung',
  'Nürnberg/DHH Willy Wunder Str': 'nuernberg-willy-wunder',
  'Nürnberg/EFH Seidelbastweg': 'nuernberg-einfamilienhaus',
  'Nürnberg/ETW Neutrograben': 'nuernberg-neutrograben',
  'Nürnberg/ETW Stabiusstraße': 'nuernberg-eigentumswohnung',
  'Nürnberg/ETW Züricher Str 52': 'nuernberg-zuericher-52',
  'Nürnberg/ETW Züricher Str. 40': 'nuernberg-zuericher-40',
  'Nürnberg/REH Siebenbürger Str': 'nuernberg-reihenendhaus',
  'Nürnberg/RMH Haderastraße': 'nuernberg-haderastrasse',
  'Nürnberg/RMH Wörnitzstraße': 'nuernberg-woernitzstrasse',
  'Oberasbach/EFH Bucher Straße': 'oberasbach-einfamilienhaus',
  'Schwabach/ETW Abenberger Straße': 'schwabach-abenberger',
  'Zirndorf/Carl Benz Straße': 'zirndorf-carl-benz',
  'Zirndorf/Gutenbergstraße': 'zirndorf-gutenbergstrasse',
  'Zirndorf/Homburger Str': 'zirndorf-homburger',
  'Zirndorf/Marienbader Str': 'zirndorf-marienbader',
  'Zirndorf/Vogelherdstraße': 'zirndorf-gartenwohnung',
}

const curatedSourceFolderBySource = {
  'Adelsdorf/RMH - Reuthseering': 'adelsdorf/rmh-reuthseering',
  'Deining/ETW Bürgermeister Keckl Str': 'deining/etw-buergermeister-keckl-str',
  'Erlangen/ETW Luise Kisselbach Str': 'erlangen/etw-luise-kisselbach-str',
  'Forchheim/ETW Spieläcker Str': 'forchheim/etw-spielaecker-str',
  'Forchheim/Townhouse Katzensteinstraße': 'forchheim/townhouse-katzensteinstrasse',
  'Fürth/ETW Kellermannstraße': 'fuerth/etw-kellermannstrasse',
  'Fürth/ETW Ludwigstraße': 'fuerth/etw-ludwigstrasse',
  'Fürth/Medizinisches Versorgungszentrum Fürth': 'fuerth/medizinisches-versorgungszentrum-fuerth',
  'Fürth/MFH Ottostraße': 'fuerth/mfh-ottostrasse',
  'Heroldsbach/ZFH Am Vogelherd': 'heroldsbach/zfh-am-vogelherd',
  'Langenzenn/ETW Lenzenstraße': 'langenzenn/etw-lenzenstrasse',
  'Nürnberg/EFH Seidelbastweg': 'nuernberg/efh-seidelbastweg',
  'Nürnberg/ETW Stabiusstraße': 'nuernberg/etw-stabiusstrasse',
  'Nürnberg/ETW Züricher Str. 40': 'nuernberg/etw-zuericher-str-40',
  'Nürnberg/REH Siebenbürger Str': 'nuernberg/reh-siebenbuerger-str',
  'Nürnberg/RMH Haderastraße': 'nuernberg/rmh-haderastrasse',
  'Nürnberg/RMH Wörnitzstraße': 'nuernberg/rmh-woernitzstrasse',
  'Oberasbach/EFH Bucher Straße': 'oberasbach/efh-bucher-strasse',
  'Zirndorf/Gutenbergstraße': 'zirndorf/gutenbergstrasse',
  'Zirndorf/Homburger Str': 'zirndorf/homburger-str',
  'Zirndorf/Marienbader Str': 'zirndorf/marienbader-str',
  'Zirndorf/Vogelherdstraße': 'zirndorf/vogelherdstrasse',
}

if (!existsSync(sourceRoot)) throw new Error(`Missing reference source: ${sourceRoot}`)

const rows = []
for (const [folder, id] of Object.entries(sourceToId)) {
  const sourceFolder = join(sourceRoot, ...folder.split('/'))
  const curatedFolderName = curatedSourceFolderBySource[folder]
  const curatedFolder = curatedFolderName
    ? join(root, 'assets', 'media-library', 'references', ...curatedFolderName.split('/'))
    : ''
  const curatedFiles = curatedFolder && existsSync(curatedFolder)
    ? readdirSync(curatedFolder).filter((file) => /\.(jpe?g|png|webp)$/i.test(file)).sort((a, b) => a.localeCompare(b, 'en'))
    : []
  const inputFolder = curatedFiles.length === 3 ? curatedFolder : sourceFolder
  const files = readdirSync(inputFolder)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, 'en'))
  if (files.length !== 3) throw new Error(`${folder} has ${files.length} image files; expected 3`)

  const destinationFolder = join(publicRoot, id)
  mkdirSync(destinationFolder, { recursive: true })
  for (const [index, file] of files.entries()) {
    const position = index === 0 ? 'cover' : `gallery-0${index + 1}`
    const output = join(destinationFolder, `${position}.webp`)
    execFileSync(
      'magick',
      [
        join(inputFolder, file),
        '-auto-orient',
        '-resize',
        '1600x1067^',
        '-gravity',
        'center',
        '-extent',
        '1600x1067',
        '-strip',
        '-quality',
        '82',
        output,
      ],
      { stdio: 'inherit' },
    )
    rows.push({
      source: relative(root, join(inputFolder, file)).split(sep).join('/'),
      publicPath: relative(root, output).split(sep).join('/'),
      id,
      position,
    })
  }
}

const derivativeMap = join(
  root,
  'docs',
  'source-material',
  'customer-files',
  'public-derivative-map.csv',
)
const header = 'source_path,public_path,match_basis,confidence,notes'
const existingText = existsSync(derivativeMap)
  ? readFileSync(derivativeMap, 'utf8').trimEnd()
  : header
const mapLines = existingText.split(/\r?\n/)
const retainedMapText = [mapLines[0], ...mapLines.slice(1).filter((line) => !line.match(/,public\/images\/references\/[^,]+\/(cover|gallery-02|gallery-03)\.webp,/))].join('\n')
const existingRows = new Set(retainedMapText.split(/\r?\n/).slice(1))
const newRows = rows
  .map(
    ({ source, publicPath }) =>
      `${source},${publicPath},source-folder-reconciliation,verified-high,"Three-image WebP derivative; street address withheld from public copy."`,
  )
  .filter((row) => !existingRows.has(row))
writeFileSync(derivativeMap, `${retainedMapText}${newRows.length ? `\n${newRows.join('\n')}` : ''}\n`)

const crossReference = join(
  root,
  'docs',
  'source-material',
  'customer-files',
  'asset-cross-reference.csv',
)
const crossHeader =
  'id,source_path,sha256,curated_destination,public_destination,match_basis,confidence,code_usage,notes'
const crossText = existsSync(crossReference)
  ? readFileSync(crossReference, 'utf8').trimEnd()
  : crossHeader
const crossLines = crossText.split(/\r?\n/)
const retainedCrossText = [crossLines[0], ...crossLines.slice(1).filter((line) => !line.match(/public\/images\/references\/[^,]+\/(cover|gallery-02|gallery-03)\.webp/))].join('\n')
const escapeCsv = (value) => `"${String(value).replaceAll('"', '""')}"`
const newCrossRows = rows
  .map(({ source, publicPath, id, position }) => {
    const sourcePath = source.startsWith('assets/') ? source.slice('assets/'.length) : source
    if (retainedCrossText.includes(`"${sourcePath.replaceAll('"', '""')}"`)) return null
    const sourceFile = join(root, ...source.split('/'))
    const hash = createHash('sha256').update(readFileSync(sourceFile)).digest('hex')
    return [
      `ref-${id}-${position}`,
      sourcePath,
      hash,
      `assets/media-library/references/${id}/${position}.jpg`,
      publicPath,
      'source-folder-reconciliation',
      'verified-high',
      'references.ts; reference-coverage',
      'All source photos are mapped to an optimized public derivative; exact address is not public.',
    ]
      .map(escapeCsv)
      .join(',')
  })
  .filter(Boolean)
writeFileSync(
  crossReference,
  `${retainedCrossText}${newCrossRows.length ? `\n${newCrossRows.join('\n')}` : ''}\n`,
)

const manifest = join(root, 'docs', 'source-material', 'reference-public-derivatives.csv')
writeFileSync(
  manifest,
  `reference_id,source_folder,source_photo_count,cover,gallery_02,gallery_03\n${Object.entries(
    sourceToId,
  )
    .map(
      ([folder, id]) =>
        `${id},${folder},3,public/images/references/${id}/cover.webp,public/images/references/${id}/gallery-02.webp,public/images/references/${id}/gallery-03.webp`,
    )
    .join('\n')}\n`,
)
console.log(
  `Generated ${rows.length} reference derivatives for ${Object.keys(sourceToId).length} source folders.`,
)
