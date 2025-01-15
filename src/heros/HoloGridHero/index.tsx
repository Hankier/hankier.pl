'use client'

import React, { useEffect } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import RichText from '@/components/RichText'
import PerspectiveGrid from '@/components/PerspectiveGrid'
import type { Page } from '@/payload-types'

export const HoloGridHero: React.FC<Page['hero']> = ({ preTitle, title, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <section className="relative min-h-[40vh] flex items-center overflow-hidden">
      <PerspectiveGrid />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {preTitle && (
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-100 mb-6">
              {preTitle}{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-transparent bg-clip-text">
                {title}
              </span>
            </h1>
          )}
          {richText && (
            <div className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              <RichText data={richText} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
