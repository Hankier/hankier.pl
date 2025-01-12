'use client'

import { useRef } from 'react'
import './index.scss'

export default function PerspectiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="perspective-grid-container">
      <div className="grid">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="grid-line horizontal" style={{ top: `${i * 4}%` }} />
        ))}
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="grid-line vertical" style={{ left: `${i * 2}%` }} />
        ))}
      </div>
    </div>
  )
}
