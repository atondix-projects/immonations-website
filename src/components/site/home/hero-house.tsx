'use client'

import { motion, useTransform, type MotionValue } from 'motion/react'
import { ImmonationMark } from '@/components/site/brand/immonation-mark'
import { cn } from '@/lib/utils'
import {
  DOOR,
  GLOW_CENTER,
  HOUSE_VIEWBOX,
  MARK_SIZE,
  PLOT,
  SHADOW_POINTS,
  TIMELINE,
  WINDOWS,
  chimneyFaces,
  gablePoints,
  leftRoofPoints,
  roofPoints,
  sideWallPoints,
  stage,
  type Opening,
} from './hero-house-geometry'

// Registered brand colours of the three blades (CLAUDE.md § Brand assets) — kept literal.
const BLADE = { front: '#1D9CD7', middle: '#A2D9F5', back: '#737372' } as const
// Illustration tones that only exist once the logo has become a house.
const TONE = {
  roofShade: '#76BFD8',
  chimneySide: '#5C5C5B',
  chimneyTop: '#2B3134',
  frame: '#E7F2F7',
  opening: '#152126',
  light: '#FFD08A',
} as const

const OPENING_STAGGER = 0.025
const LIGHT_STAGGER = 0.045
const BEAT_LENGTH = { opening: 0.06, light: 0.07 } as const

const percent = (value: number, total: number) => `${(value / total) * 100}%`

const VIEWBOX = `${HOUSE_VIEWBOX.x} ${HOUSE_VIEWBOX.y} ${HOUSE_VIEWBOX.width} ${HOUSE_VIEWBOX.height}`
const CANVAS_STYLE = { aspectRatio: `${HOUSE_VIEWBOX.width} / ${HOUSE_VIEWBOX.height}` }
// Where the mark's ink box sits on the canvas, so the real logo overlays frame 0 exactly.
const MARK_STYLE = {
  left: percent(-HOUSE_VIEWBOX.x, HOUSE_VIEWBOX.width),
  top: percent(-HOUSE_VIEWBOX.y, HOUSE_VIEWBOX.height),
  width: percent(MARK_SIZE.width, HOUSE_VIEWBOX.width),
}

type Beat = readonly [start: number, end: number]

function useBeat(progress: MotionValue<number>, beat: Beat) {
  return useTransform(progress, (value) => stage(value, beat))
}

/** Hides a shape until its beat starts, so a zero-size polygon never leaves a speck. */
function useStarted(beat: MotionValue<number>) {
  return useTransform(beat, (value) => (value > 0 ? 1 : 0))
}

function HouseWindow({
  opening,
  index,
  progress,
}: {
  opening: Opening
  index: number
  progress: MotionValue<number>
}) {
  const openStart = TIMELINE.openings[0] + index * OPENING_STAGGER
  const lightStart = TIMELINE.lights[0] + index * LIGHT_STAGGER
  const shown = useBeat(progress, [openStart, openStart + BEAT_LENGTH.opening])
  const lit = useBeat(progress, [lightStart, lightStart + BEAT_LENGTH.light])

  return (
    <motion.g style={{ opacity: shown }}>
      <polygon points={opening.frame} fill={TONE.frame} />
      <polygon points={opening.glass} fill={TONE.opening} />
      <motion.polygon points={opening.glass} fill={TONE.light} style={{ opacity: lit }} />
      <path d={opening.mullions} stroke={TONE.frame} strokeWidth={12} />
    </motion.g>
  )
}

/**
 * The hero's scroll story: the CI mark folds into a house, which then gets its
 * roof, chimney, plot and — last — its lights. `progress` runs 0–1; the parent
 * decides whether that comes from a pinned scroll, the stage's own position, or
 * is simply 1 under reduced motion.
 */
export function HeroHouse({
  progress,
  idPrefix,
  className,
}: {
  progress: MotionValue<number>
  /** Keeps gradient/filter ids unique if the graphic is ever rendered twice. */
  idPrefix: string
  className?: string
}) {
  const glowId = `${idPrefix}-house-glow`
  const shadowId = `${idPrefix}-house-shadow`

  const markOpacity = useTransform(progress, [...TIMELINE.markFade], [1, 0])
  const sideWall = useTransform(progress, (value) =>
    sideWallPoints(stage(value, TIMELINE.sideWall)),
  )
  const gable = useTransform(progress, (value) => gablePoints(stage(value, TIMELINE.gable)))
  const roof = useTransform(progress, (value) => roofPoints(stage(value, TIMELINE.roof)))

  const leftRoofBeat = useBeat(progress, TIMELINE.leftRoof)
  const leftRoof = useTransform(leftRoofBeat, leftRoofPoints)
  const leftRoofShown = useStarted(leftRoofBeat)

  const chimneyBeat = useBeat(progress, TIMELINE.chimney)
  const chimneyFront = useTransform(chimneyBeat, (value) => chimneyFaces(value).front)
  const chimneySide = useTransform(chimneyBeat, (value) => chimneyFaces(value).side)
  const chimneyTop = useTransform(chimneyBeat, (value) => chimneyFaces(value).top)
  const chimneyShown = useStarted(chimneyBeat)

  const plotLength = useBeat(progress, TIMELINE.plot)
  const plotShown = useStarted(plotLength)
  const plotCorners = useBeat(progress, [TIMELINE.plot[1] - 0.08, TIMELINE.plot[1]])
  const shadowOpacity = useTransform(progress, (value) => 0.55 * stage(value, TIMELINE.shadow))
  const glowOpacity = useBeat(progress, TIMELINE.glow)
  const doorShown = useBeat(progress, [TIMELINE.openings[0], TIMELINE.openings[0] + 0.06])
  const lampLit = useBeat(progress, [TIMELINE.lights[0] - 0.04, TIMELINE.lights[0] + 0.03])

  return (
    <div className={cn('relative', className)} style={CANVAS_STYLE} aria-hidden="true">
      <svg viewBox={VIEWBOX} className="absolute inset-0 size-full overflow-visible">
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0" stopColor={TONE.light} stopOpacity="0.32" />
            <stop offset="0.55" stopColor={TONE.light} stopOpacity="0.08" />
            <stop offset="1" stopColor={TONE.light} stopOpacity="0" />
          </radialGradient>
          <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="46" />
          </filter>
        </defs>

        <motion.circle
          cx={GLOW_CENTER[0]}
          cy={GLOW_CENTER[1]}
          r="1500"
          fill={`url(#${glowId})`}
          style={{ opacity: glowOpacity }}
        />

        {/* Plot survey outline — the ground the house is valued on. */}
        <motion.path
          d={PLOT.path}
          fill="none"
          className="stroke-brand-200"
          strokeOpacity={0.4}
          strokeWidth={7}
          style={{ pathLength: plotLength, opacity: plotShown }}
        />
        <motion.g className="fill-brand-200" style={{ opacity: plotCorners }}>
          {PLOT.corners.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={18} />
          ))}
        </motion.g>

        <motion.polygon
          points={SHADOW_POINTS}
          fill="#000000"
          filter={`url(#${shadowId})`}
          style={{ opacity: shadowOpacity }}
        />

        {/* Back to front: side wall, shaded roof, lit roof, gable. */}
        <motion.polygon points={sideWall} fill={BLADE.back} />
        <motion.polygon
          points={leftRoof}
          fill={TONE.roofShade}
          style={{ opacity: leftRoofShown }}
        />
        <motion.polygon points={roof} fill={BLADE.middle} />
        <motion.polygon points={gable} fill={BLADE.front} />

        <motion.g style={{ opacity: chimneyShown }}>
          <motion.polygon points={chimneySide} fill={TONE.chimneySide} />
          <motion.polygon points={chimneyFront} fill={BLADE.back} />
          <motion.polygon points={chimneyTop} fill={TONE.chimneyTop} />
        </motion.g>

        <motion.g style={{ opacity: doorShown }}>
          <polygon points={DOOR.frame} fill={TONE.opening} />
          <motion.polygon points={DOOR.glass} fill={TONE.light} style={{ opacity: lampLit }} />
        </motion.g>

        {WINDOWS.map((opening, index) => (
          <HouseWindow key={opening.id} opening={opening} index={index} progress={progress} />
        ))}

        <motion.g style={{ opacity: lampLit }}>
          <circle cx={DOOR.lamp[0]} cy={DOOR.lamp[1]} r={170} fill={`url(#${glowId})`} />
          <circle cx={DOOR.lamp[0]} cy={DOOR.lamp[1]} r={18} fill={TONE.light} />
        </motion.g>
      </svg>

      {/* The registered mark itself at rest; the polygons underneath take over as it fades. */}
      <motion.div className="absolute" style={{ ...MARK_STYLE, opacity: markOpacity }}>
        <ImmonationMark className="w-full" />
      </motion.div>
    </div>
  )
}
