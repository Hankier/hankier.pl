'use client'
import React from 'react'
import { Terminal, Bot, Brain, Sparkles, type LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Terminal,
  Bot,
  Brain,
  Sparkles,
}

type Feature = {
  title: string
  icon: keyof typeof ICONS
  content: string
}

type Props = {
  title?: string
  subtitle?: string
  gridColumns: '2' | '3' | '4'
  features: Feature[]
}

export const FeaturesBlock: React.FC<Props> = ({ title, subtitle, gridColumns, features }) => {
  const gridCols = {
    '2': 'grid-cols-1 md:grid-cols-2 mx-auto',
    '3': 'grid-cols-1 md:grid-cols-3 mx-auto',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto',
  }[gridColumns]

  return (
    <section className="relative py-4">
      <div className="container px-4">
        {title && (
          <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {title}
            </h2>
            {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
          </div>
        )}

        <div className={`grid ${gridCols} gap-8`}>
          {features.map((feature, index) => {
            const Icon = ICONS[feature.icon] || Sparkles

            return (
              <div
                key={index}
                className="p-6 rounded-lg border border-primary/20 bg-card backdrop-blur-sm text-left"
              >
                <Icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <div className="text-muted-foreground">
                  <p>{feature.content}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesBlock
