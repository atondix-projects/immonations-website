import { describe, expect, it } from 'vitest'
import {
  gablePoints,
  roofPoints,
  sideWallPoints,
  stage,
} from '@/components/site/home/hero-house-geometry'

type Point = [number, number]

function parse(points: string): Point[] {
  return points.split(' ').map((pair) => pair.split(',').map(Number) as Point)
}

function expectNear([x, y]: Point, [expectedX, expectedY]: Point, tolerance: number) {
  expect(Math.abs(x - expectedX)).toBeLessThanOrEqual(tolerance)
  expect(Math.abs(y - expectedY)).toBeLessThanOrEqual(tolerance)
}

// Visible blade corners of the vector master, in the mark's own ink-box units
// (assets/Logos Immonation/33 - Immonation Facelift Logo.svg, translated like ImmonationMark).
const MASTER = {
  front: {
    topLeft: [0, 630.74],
    topRight: [1433.92, 1315.75],
    bottomRight: [1433.92, 2746.8],
    bottomLeft: [0, 2039.18],
  },
  middle: {
    topLeft: [499.58, 316.5],
    topRight: [1933.5, 1003.77],
    bottomRight: [1937.31, 2432.55],
  },
  back: { topLeft: [1006.79, 0], topRight: [2440.71, 687.26], bottomRight: [2440.71, 2118.31] },
} satisfies Record<string, Record<string, Point>>

/** ≈0.2 % of the mark's height — below a pixel at any size the hero renders it. */
const LOGO_TOLERANCE = 5

describe('hero house geometry', () => {
  it('treats a zero-width beat as a step, never as NaN coordinates', () => {
    expect(stage(0.49, [0.5, 0.5])).toBe(0)
    expect(stage(0.5, [0.5, 0.5])).toBe(0)
    expect(stage(0.51, [0.5, 0.5])).toBe(1)
    expect(Number.isFinite(stage(0.5, [0.6, 0.4]))).toBe(true)
  })

  it('starts exactly on the CI mark, so the cross-fade from the real logo is invisible', () => {
    const [frontBottomLeft, frontBottomRight, frontTopRight, , frontTopLeft] = parse(gablePoints(0))
    const [, middleBottomRight, middleTopRight, middleTopLeft] = parse(roofPoints(0))
    const [backBottomRight, backTopRight, backTopLeft] = parse(sideWallPoints(0))

    expectNear(frontTopLeft!, MASTER.front.topLeft, LOGO_TOLERANCE)
    expectNear(frontTopRight!, MASTER.front.topRight, LOGO_TOLERANCE)
    expectNear(frontBottomRight!, MASTER.front.bottomRight, LOGO_TOLERANCE)
    expectNear(frontBottomLeft!, MASTER.front.bottomLeft, LOGO_TOLERANCE)
    expectNear(middleTopLeft!, MASTER.middle.topLeft, LOGO_TOLERANCE)
    expectNear(middleTopRight!, MASTER.middle.topRight, LOGO_TOLERANCE)
    expectNear(middleBottomRight!, MASTER.middle.bottomRight, LOGO_TOLERANCE)
    expectNear(backTopLeft!, MASTER.back.topLeft, LOGO_TOLERANCE)
    expectNear(backTopRight!, MASTER.back.topRight, LOGO_TOLERANCE)
    expectNear(backBottomRight!, MASTER.back.bottomRight, LOGO_TOLERANCE)
  })

  it('ends as a closed house: gable, roof and side wall meet at the front eave', () => {
    const gableEave = parse(gablePoints(1))[2]!
    const roofEave = parse(roofPoints(1))[1]!
    const wallEave = parse(sideWallPoints(1))[2]!

    expectNear(roofEave, gableEave, 0.5)
    expectNear(wallEave, gableEave, 0.5)
  })
})
