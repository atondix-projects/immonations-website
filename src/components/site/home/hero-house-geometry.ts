/**
 * Geometry for the homepage hero's logo-to-house fold.
 *
 * Everything lives in the CI mark's own units — the 2440.71 × 2746.8 ink box that
 * `ImmonationMark` draws — so frame 0 lands exactly on the logo. The mark's three
 * blades read as wall slices of one building in an oblique projection: x runs along
 * a blade (down-right on screen), y is height, z is the blade spacing (down-left,
 * towards the viewer). Back blade at z = 0, middle blade at z = 1, front blade at z = 2.
 *
 * The fold: the back blade swings round its right edge into the side wall, the middle
 * blade tips over into the roof, and the front blade grows a gable. Every export is a
 * pure function of progress, so the component only has to wire motion values to it.
 */

type Point3 = readonly [x: number, y: number, z: number]
type Range = readonly [start: number, end: number]

export const MARK_SIZE = { width: 2440.71, height: 2746.8 } as const

/** Canvas around the mark: headroom for the chimney, floor space for the plot outline. */
export const HOUSE_VIEWBOX = { x: -560, y: -140, width: 3560, height: 3260 } as const

// Measured from the vector master: corners of the three blades in mark units.
const ORIGIN = [1006.79, 1431] as const // back blade, bottom-left corner
const AXIS_X = [1433.92, 685] as const // one blade width
const AXIS_Z = [-503.4, 315.4] as const // one blade spacing, towards the viewer
const BLADE_HEIGHT = 1430
/** In the master the front blade's lower-left corner sits a little higher than the rest. */
const FRONT_BLADE_LIFT = 22.6

const HOUSE = { wall: 820, ridge: 600, depth: 2 } as const
const RIDGE_Y = HOUSE.wall + HOUSE.ridge
const FRONT_Z = HOUSE.depth

/** Scroll ranges (0–1) for each beat of the story. */
export const TIMELINE = {
  markFade: [0.015, 0.045],
  sideWall: [0.04, 0.4],
  gable: [0.07, 0.42],
  roof: [0.14, 0.48],
  leftRoof: [0.42, 0.56],
  shadow: [0.3, 0.6],
  chimney: [0.5, 0.62],
  plot: [0.46, 0.78],
  openings: [0.5, 0.66],
  lights: [0.64, 0.92],
  glow: [0.68, 0.96],
} as const satisfies Record<string, Range>

export function projectPoint([x, y, z]: Point3): readonly [number, number] {
  return [ORIGIN[0] + x * AXIS_X[0] + z * AXIS_Z[0], ORIGIN[1] + x * AXIS_X[1] - y + z * AXIS_Z[1]]
}

function project(point: Point3): string {
  const [x, y] = projectPoint(point)
  return `${x.toFixed(1)},${y.toFixed(1)}`
}

function toPoints(points: readonly Point3[]): string {
  return points.map(project).join(' ')
}

function toPath(points: readonly Point3[], closed = false): string {
  return (
    points.map((point, index) => `${index === 0 ? 'M' : 'L'}${project(point)}`).join('') +
    (closed ? 'Z' : '')
  )
}

const lerp = (from: number, to: number, t: number) => from + (to - from) * t

const lerpPoint = (from: Point3, to: Point3, t: number): Point3 => [
  lerp(from[0], to[0], t),
  lerp(from[1], to[1], t),
  lerp(from[2], to[2], t),
]

/**
 * Maps global progress onto one beat's range, eased in-out (cubic). A zero-width beat
 * (easy to produce with the staggers) becomes a step instead of NaN coordinates.
 */
export function stage(progress: number, [start, end]: Range): number {
  const t = Math.min(Math.max((progress - start) / Math.max(end - start, 1e-6), 0), 1)
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

/** Back blade → side wall. Swings round its right edge (x = 1, z = 0) like a door. */
export function sideWallPoints(t: number): string {
  const angle = (t * Math.PI) / 2
  const reach = lerp(1, HOUSE.depth, t)
  const height = lerp(BLADE_HEIGHT, HOUSE.wall, t)
  const freeX = 1 - reach * Math.cos(angle)
  const freeZ = reach * Math.sin(angle)
  return toPoints([
    [1, 0, 0],
    [1, height, 0],
    [freeX, height, freeZ],
    [freeX, 0, freeZ],
  ])
}

/** Front blade → gable wall. The top edge folds up into the ridge. */
export function gablePoints(t: number): string {
  const wall = lerp(BLADE_HEIGHT, HOUSE.wall, t)
  const apex = wall + lerp(0, HOUSE.ridge, t)
  return toPoints([
    [0, lerp(FRONT_BLADE_LIFT, 0, t), FRONT_Z],
    [1, 0, FRONT_Z],
    [1, wall, FRONT_Z],
    [0.5, apex, FRONT_Z],
    [0, wall, FRONT_Z],
  ])
}

const ROOF_FROM: readonly Point3[] = [
  [0, 0, 1],
  [1, 0, 1],
  [1, BLADE_HEIGHT, 1],
  [0, BLADE_HEIGHT, 1],
]
const ROOF_TO: readonly Point3[] = [
  [0.5, RIDGE_Y, FRONT_Z],
  [1, HOUSE.wall, FRONT_Z],
  [1, HOUSE.wall, 0],
  [0.5, RIDGE_Y, 0],
]

/** Middle blade → the lit roof slope. Its foot swings forward onto the front ridge. */
export function roofPoints(t: number): string {
  return toPoints(ROOF_FROM.map((from, index) => lerpPoint(from, ROOF_TO[index] ?? from, t)))
}

/** The shaded roof slope unfolds from the ridge once the lit slope has landed. */
export function leftRoofPoints(t: number): string {
  const eaveX = lerp(0.5, 0, t)
  const eaveY = lerp(RIDGE_Y, HOUSE.wall, t)
  return toPoints([
    [0.5, RIDGE_Y, FRONT_Z],
    [eaveX, eaveY, FRONT_Z],
    [eaveX, eaveY, 0],
    [0.5, RIDGE_Y, 0],
  ])
}

const CHIMNEY = { x: [0.66, 0.78], z: [0.38, 0.66], height: 290 } as const

/** Height of the lit roof slope above a point on the x axis (x ≥ 0.5). */
const roofHeightAt = (x: number) => HOUSE.wall + 2 * HOUSE.ridge * (1 - x)

/** Chimney rising out of the lit roof slope: its three visible faces. */
export function chimneyFaces(t: number): { front: string; side: string; top: string } {
  const [x0, x1] = CHIMNEY.x
  const [z0, z1] = CHIMNEY.z
  const base0 = roofHeightAt(x0)
  const base1 = roofHeightAt(x1)
  const top = base0 + CHIMNEY.height * t
  const sideTop = Math.max(top, base1)
  return {
    front: toPoints([
      [x0, base0, z1],
      [x1, base1, z1],
      [x1, sideTop, z1],
      [x0, top, z1],
    ]),
    side: toPoints([
      [x1, base1, z1],
      [x1, base1, z0],
      [x1, sideTop, z0],
      [x1, sideTop, z1],
    ]),
    top: toPoints([
      [x0, top, z1],
      [x1, top, z1],
      [x1, top, z0],
      [x0, top, z0],
    ]),
  }
}

export type Opening = { id: string; frame: string; glass: string; mullions: string }

const GLASS_INSET = { x: 0.014, z: 0.035, y: 20 } as const

function frontWindow(id: string, [x0, x1]: Range, [y0, y1]: Range): Opening {
  const gx0 = x0 + GLASS_INSET.x
  const gx1 = x1 - GLASS_INSET.x
  const gy0 = y0 + GLASS_INSET.y
  const gy1 = y1 - GLASS_INSET.y
  const midX = (x0 + x1) / 2
  const midY = (y0 + y1) / 2
  const at = (x: number, y: number): Point3 => [x, y, FRONT_Z]
  return {
    id,
    frame: toPoints([at(x0, y0), at(x1, y0), at(x1, y1), at(x0, y1)]),
    glass: toPoints([at(gx0, gy0), at(gx1, gy0), at(gx1, gy1), at(gx0, gy1)]),
    mullions: toPath([at(midX, gy0), at(midX, gy1)]) + toPath([at(gx0, midY), at(gx1, midY)]),
  }
}

function sideWindow(id: string, [z0, z1]: Range, [y0, y1]: Range): Opening {
  const gz0 = z0 + GLASS_INSET.z
  const gz1 = z1 - GLASS_INSET.z
  const gy0 = y0 + GLASS_INSET.y
  const gy1 = y1 - GLASS_INSET.y
  const midZ = (z0 + z1) / 2
  const midY = (y0 + y1) / 2
  const at = (z: number, y: number): Point3 => [1, y, z]
  return {
    id,
    frame: toPoints([at(z1, y0), at(z0, y0), at(z0, y1), at(z1, y1)]),
    glass: toPoints([at(gz1, gy0), at(gz0, gy0), at(gz0, gy1), at(gz1, gy1)]),
    mullions: toPath([at(midZ, gy0), at(midZ, gy1)]) + toPath([at(gz0, midY), at(gz1, midY)]),
  }
}

/** Windows in the order their lights come on. */
export const WINDOWS: readonly Opening[] = [
  frontWindow('front-ground', [0.1, 0.34], [330, 590]),
  sideWindow('side-front', [1.5, 1.8], [330, 590]),
  sideWindow('side-middle', [0.9, 1.2], [330, 590]),
  sideWindow('side-back', [0.3, 0.6], [330, 590]),
  frontWindow('front-gable', [0.42, 0.58], [930, 1120]),
]

export const DOOR = {
  frame: toPoints([
    [0.56, 0, FRONT_Z],
    [0.76, 0, FRONT_Z],
    [0.76, 480, FRONT_Z],
    [0.56, 480, FRONT_Z],
  ]),
  glass: toPoints([
    [0.64, 110, FRONT_Z],
    [0.68, 110, FRONT_Z],
    [0.68, 400, FRONT_Z],
    [0.64, 400, FRONT_Z],
  ]),
  lamp: projectPoint([0.81, 430, FRONT_Z]),
} as const

/** The footprint, slightly oversized, for the blurred contact shadow. */
export const SHADOW_POINTS = toPoints([
  [-0.03, 0, -0.05],
  [1.12, 0, -0.05],
  [1.12, 0, 2.1],
  [-0.03, 0, 2.1],
])

const PLOT_CORNERS: readonly Point3[] = [
  [-0.2, 0, -0.3],
  [1.24, 0, -0.3],
  [1.24, 0, 2.42],
  [-0.2, 0, 2.42],
]

/** Survey outline of the plot the house stands on. */
export const PLOT = {
  path: toPath(PLOT_CORNERS, true),
  corners: PLOT_CORNERS.map(projectPoint),
} as const

export const GLOW_CENTER = projectPoint([0.5, 700, 1])
