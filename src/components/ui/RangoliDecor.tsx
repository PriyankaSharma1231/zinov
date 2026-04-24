'use client'
// src/components/ui/RangoliDecor.tsx

interface Props {
  size?: number
  color?: string
  className?: string
}

export default function RangoliDecor({ size = 120, color = '#b8943f', className = '' }: Props) {
  const c = size / 2
  const r1 = size * 0.45
  const r2 = size * 0.32
  const r3 = size * 0.18

  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 8
    const x1 = c + Math.cos(angle) * r2
    const y1 = c + Math.sin(angle) * r2
    const x2 = c + Math.cos(angle + 0.4) * r1
    const y2 = c + Math.sin(angle + 0.4) * r1
    const x3 = c + Math.cos(angle - 0.4) * r1
    const y3 = c + Math.sin(angle - 0.4) * r1
    return `M ${c} ${c} Q ${x2} ${y2} ${x1} ${y1} Q ${x3} ${y3} ${c} ${c}`
  })

  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 12
    return {
      x: c + Math.cos(angle) * r3,
      y: c + Math.sin(angle) * r3,
    }
  })

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`rangoli-spin ${className}`}
      style={{ display: 'block' }}
    >
      {/* Outer ring */}
      <circle cx={c} cy={c} r={r1} fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <circle cx={c} cy={c} r={r2} fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />

      {/* Petals */}
      {petals.map((d, i) => (
        <path key={i} d={d} fill={color} opacity="0.15" />
      ))}

      {/* Dots ring */}
      {dots.map((dot, i) => (
        <circle key={i} cx={dot.x} cy={dot.y} r={size * 0.012} fill={color} opacity="0.5" />
      ))}

      {/* Center diamond */}
      <polygon
        points={`${c},${c - r3 * 0.6} ${c + r3 * 0.6},${c} ${c},${c + r3 * 0.6} ${c - r3 * 0.6},${c}`}
        fill={color}
        opacity="0.3"
      />
      <circle cx={c} cy={c} r={size * 0.03} fill={color} opacity="0.8" />
    </svg>
  )
}
