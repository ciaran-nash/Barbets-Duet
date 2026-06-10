'use client'

interface PentangleGroup {
  id: string
  label: string
  sites: string[]
  review_chain: string[]
  status: 'active' | 'forming'
}

interface OpenReview {
  id: string
  reviewer_site_slug: string
  reviewee_site_slug: string
  status: 'pending' | 'submitted' | 'acknowledged'
}

interface PentangleRingProps {
  group: PentangleGroup
  openReviews: OpenReview[]
  overdueIds: Set<string>
}

const SIZE = 200
const CENTER = SIZE / 2
const RADIUS = 68
const NODE_R = 11
const FONT_SIZE = 6.5

function truncate(s: string, max = 9): string {
  return s.length > max ? s.slice(0, max) + '…' : s
}

function getNodePosition(index: number, total: number): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  }
}

export function PentangleRing({ group, openReviews, overdueIds }: PentangleRingProps) {
  const chain = group.review_chain
  const n = chain.length
  if (n === 0) return null

  // reviewer_slug → review row
  const reviewMap = new Map(openReviews.map((r) => [r.reviewer_site_slug, r]))

  const positions = chain.map((_, i) => getNodePosition(i, n))

  const markerId = `arrow-${group.id}`

  return (
    <div className="flex flex-col items-center gap-1.5" style={{ minWidth: SIZE }}>
      {/* Group label */}
      <p
        className="text-xs font-medium text-[#06211A] font-['DM_Sans'] text-center leading-tight"
        style={{ maxWidth: SIZE }}
      >
        {group.label}
      </p>
      <span
        className={[
          'text-xs px-1.5 py-0.5 rounded-full font-[\'DM_Sans\']',
          group.status === 'active'
            ? 'bg-[#DBFF66]/20 text-[#4a5e00]'
            : 'bg-[#06211A]/8 text-[#06211A]/50',
        ].join(' ')}
      >
        {group.status}
      </span>

      {/* SVG ring diagram */}
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-label={`${group.label} circular review chain. ${n} sites.`}
        role="img"
      >
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(6,33,26,0.4)" />
          </marker>
        </defs>

        {/* Arcs: reviewer[i] → reviewee[i+1] */}
        {chain.map((reviewerSlug, i) => {
          const nextIdx = (i + 1) % n
          const from = positions[i]
          const to = positions[nextIdx]
          const review = reviewMap.get(reviewerSlug)
          const isOverdue = review ? overdueIds.has(review.id) : false

          const dx = to.x - from.x
          const dy = to.y - from.y
          const len = Math.sqrt(dx * dx + dy * dy)
          if (len === 0) return null
          const ux = dx / len
          const uy = dy / len

          // Offset start/end to not overlap node circles
          const startX = from.x + ux * (NODE_R + 1)
          const startY = from.y + uy * (NODE_R + 1)
          const endX = to.x - ux * (NODE_R + 3)
          const endY = to.y - uy * (NODE_R + 3)

          // Gentle curve towards center
          const mx = (from.x + to.x) / 2
          const my = (from.y + to.y) / 2
          const cx = mx + 0.12 * (CENTER - mx)
          const cy = my + 0.12 * (CENTER - my)

          const strokeColor = isOverdue
            ? '#dc2626'
            : review?.status === 'submitted'
            ? '#2D6A4F'
            : review?.status === 'pending'
            ? '#8fa800'
            : 'rgba(6,33,26,0.15)'

          return (
            <path
              key={reviewerSlug}
              d={`M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={1.8}
              strokeLinecap="round"
              markerEnd={`url(#${markerId})`}
            />
          )
        })}

        {/* Nodes */}
        {chain.map((siteSlug, i) => {
          const pos = positions[i]
          const review = reviewMap.get(siteSlug)
          const isOverdue = review ? overdueIds.has(review.id) : false

          const fillColor = isOverdue
            ? '#fee2e2'
            : review?.status === 'submitted'
            ? '#d1fae5'
            : '#F4F4F5'

          const strokeColor = isOverdue
            ? '#dc2626'
            : review?.status === 'submitted'
            ? '#2D6A4F'
            : 'rgba(6,33,26,0.2)'

          return (
            <g key={siteSlug} aria-label={siteSlug}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={NODE_R}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={1.5}
              />
              <text
                x={pos.x}
                y={pos.y + 0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={FONT_SIZE}
                fill="rgba(6,33,26,0.8)"
                fontFamily="DM Sans, sans-serif"
              >
                {truncate(siteSlug)}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs font-['DM_Sans'] text-[#06211A]/60">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#8fa800] inline-block" aria-hidden="true" />
          pending
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#2D6A4F] inline-block" aria-hidden="true" />
          submitted
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-600 inline-block" aria-hidden="true" />
          overdue
        </span>
      </div>
    </div>
  )
}
