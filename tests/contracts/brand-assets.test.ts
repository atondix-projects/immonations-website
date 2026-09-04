import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Every web logo derivative is a crop/recolour of one vector master. These tests
 * fail if a derivative is hand-edited, or if the master is replaced without
 * re-running `pnpm brand:assets` — either of which would let the geometry drift
 * away from the registered mark.
 */
const MASTER = join(
  process.cwd(),
  'assets',
  'Logos Immonation',
  '33 - Immonation Facelift Logo.svg',
)

/** Registered brand values. Changing these means changing the trademark. */
const MARK_FILLS = ['#1D9CD7', '#737372', '#A2D9F5'] as const

const read = (...segments: string[]) => readFileSync(join(process.cwd(), ...segments), 'utf8')
const pathData = (svg: string) => [...svg.matchAll(/ d="([^"]+)"/g)].map(([, d]) => d)

describe('brand derivatives', () => {
  const master = readFileSync(MASTER, 'utf8')
  const masterPaths = [...master.matchAll(/<path class="(fil[0-3])" d="([^"]+)"\/>/g)].map(
    ([, cls, d]) => ({ cls, d }),
  )
  const markPaths = masterPaths.filter((p) => p.cls !== 'fil3').map((p) => p.d)
  const textPaths = masterPaths.filter((p) => p.cls === 'fil3').map((p) => p.d)

  it('reads the five paths the generator expects from the master', () => {
    expect(masterPaths).toHaveLength(5)
    expect(markPaths).toHaveLength(3)
    expect(textPaths).toHaveLength(2)
  })

  it.each([
    ['public/brand/immonation-mark.svg', 0],
    ['public/brand/immonation-logo.svg', 2],
    ['public/brand/immonation-logo-inverse.svg', 2],
    ['src/app/icon.svg', 0],
  ])('%s carries the master geometry unchanged', (file, textPathCount) => {
    const svg = read(file)
    const paths = pathData(svg)

    expect(paths).toHaveLength(3 + textPathCount)
    for (const d of markPaths) expect(paths).toContain(d)
    for (const fill of MARK_FILLS) expect(svg).toContain(`fill="${fill}"`)
  })

  it('the React component matches the mark SVG path for path', () => {
    const component = read('src/components/site/brand/immonation-mark.tsx')
    const marker = read('public/brand/immonation-mark.svg')

    for (const d of markPaths) expect(component).toContain(d)
    for (const fill of MARK_FILLS) expect(component).toContain(`fill="${fill}"`)
    // Same viewBox and same crop offset, so the two render identically.
    const viewBox = marker.match(/viewBox="([^"]+)"/)?.[1]
    const transform = marker.match(/transform="(translate\([^)]+\))"/)?.[1]
    expect(viewBox).toBeTruthy()
    expect(transform).toBeTruthy()
    expect(component).toContain(`viewBox="${viewBox}"`)
    expect(component).toContain(`transform="${transform}"`)
  })

  it('the wordmark derivatives differ only in text colour', () => {
    const dark = read('public/brand/immonation-logo.svg')
    const light = read('public/brand/immonation-logo-inverse.svg')

    expect(pathData(dark)).toEqual(pathData(light))
    expect(dark).toContain('fill="#2B2A29"')
    // Sampled from the PNG this replaced, so the swap stays pixel-neutral.
    expect(light).toContain('fill="#D4D6D6"')
  })

  it('ships a favicon that is a real multi-size ICO, not the framework default', () => {
    const ico = readFileSync(join(process.cwd(), 'src', 'app', 'favicon.ico'))

    expect(ico.readUInt16LE(0)).toBe(0) // reserved
    expect(ico.readUInt16LE(2)).toBe(1) // type: icon
    const frameCount = ico.readUInt16LE(4)
    expect(frameCount).toBe(3)

    const sizes: number[] = []
    for (let i = 0; i < frameCount; i++) {
      const entry = 6 + i * 16
      const declared = ico.readUInt8(entry) || 256
      const length = ico.readUInt32LE(entry + 8)
      const offset = ico.readUInt32LE(entry + 12)
      const frame = ico.subarray(offset, offset + length)

      expect(frame.subarray(1, 4).toString()).toBe('PNG')
      expect(frame.readUInt32BE(16)).toBe(declared) // IHDR width
      expect(frame.readUInt32BE(20)).toBe(declared) // IHDR height
      sizes.push(declared)
    }
    expect(sizes).toEqual([48, 32, 16])
  })

  it('ships a raster apple-touch-icon at the size iOS asks for', () => {
    const png = readFileSync(join(process.cwd(), 'src', 'app', 'apple-icon.png'))

    expect(png.subarray(1, 4).toString()).toBe('PNG')
    expect(png.readUInt32BE(16)).toBe(180)
    expect(png.readUInt32BE(20)).toBe(180)
  })
})
