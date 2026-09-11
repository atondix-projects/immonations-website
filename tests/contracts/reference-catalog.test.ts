import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  listAllReferences,
  listReferenceUsage,
  listReferencesByCity,
  REFERENCE_IDS,
  referenceImage,
} from '@/lib/content/references'

describe('reference-object trust system', () => {
  it('covers all reconciled folders, records, photos, and derivatives', () => {
    const references = listAllReferences()
    const usage = listReferenceUsage()

    expect(references).toHaveLength(29)
    expect(new Set(references.map((reference) => reference.sourceFolder))).toHaveLength(29)
    expect(usage).toMatchObject({
      sourceFolders: 29,
      sourcePhotos: 87,
      catalogRecords: 29,
      publicDerivatives: 87,
      localizedDetailRoutes: 58,
      cities: 13,
      draftedCases: 26,
      additionalOrAmbiguousFolders: 3,
      legacyCoverAliases: 15,
    })
    for (const id of REFERENCE_IDS.slice(0, 15))
      expect(
        existsSync(
          join(process.cwd(), 'public', referenceImage(id).slice(1).replaceAll('/', '\\')),
        ),
      ).toBe(true)

    for (const reference of references) {
      expect(
        existsSync(
          join(process.cwd(), 'assets', 'Referenz Objekte', ...reference.sourceFolder.split('/')),
        ),
      ).toBe(true)
      expect(reference.provenance.sourceFiles).toHaveLength(3)
      for (const sourceFile of reference.provenance.sourceFiles) {
        expect(
          existsSync(join(process.cwd(), 'assets', 'Referenz Objekte', ...sourceFile.split('/'))),
        ).toBe(true)
      }
      expect(reference.media).toHaveLength(3)
      for (const asset of reference.media) {
        expect(
          existsSync(join(process.cwd(), 'public', asset.src.slice(1).replaceAll('/', '\\'))),
        ).toBe(true)
        expect(asset.width).toBeGreaterThan(0)
        expect(asset.height).toBeGreaterThan(0)
      }
      expect(reference.publication.metricsApproved).toBe(Boolean(reference.metrics))
      expect(reference.provenance.notes).not.toMatch(/publish/i)
      expect(reference.title.de).not.toMatch(/straße|str\.?\s*\d+/i)
      expect(reference.title.en).not.toMatch(/street|str\.?\s*\d+/i)
    }
  })

  it('does not publish unresolved metric or address claims', () => {
    for (const reference of listAllReferences()) {
      const publicCopy = JSON.stringify({
        title: reference.title,
        area: reference.area,
        narrative: reference.narrative,
      })
      expect(publicCopy).not.toContain('X')
      expect(publicCopy).not.toMatch(/\b\d{1,4}\s+(straße|str\.|street)\b/i)
    }
  })

  it('publishes every confirmed metric set without placeholders', () => {
    const referencesWithMetrics = listAllReferences().filter((reference) => reference.metrics)

    expect(referencesWithMetrics).toHaveLength(26)
    for (const reference of referencesWithMetrics) {
      const resultValue = reference.metrics?.resultValue
      if (!resultValue) throw new Error(`Missing sale result for ${reference.id}`)

      expect(reference.metrics?.approved).toBe(true)
      expect(reference.metrics?.requests).toMatch(/^\d+$/)
      expect(reference.metrics?.viewings).toMatch(/^\d+$/)
      expect(reference.metrics?.duration).toMatch(/^\d+(\.\d+)?$/)
      expect(resultValue.de).not.toMatch(/\bX\b|__/)
      expect(resultValue.en).not.toMatch(/\bX\b|__/)
    }
  })

  it('matches the five local SEO proof collections by exact city', () => {
    expect(listReferencesByCity('nuernberg')).toHaveLength(9)
    expect(listReferencesByCity('fuerth')).toHaveLength(4)
    expect(listReferencesByCity('erlangen')).toHaveLength(1)
    expect(listReferencesByCity('zirndorf')).toHaveLength(5)
    expect(listReferencesByCity('schwabach')).toHaveLength(1)
  })
})
