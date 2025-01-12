'use client'

import React from 'react'
import * as Icons from 'lucide-react'
import { LucideProps } from 'lucide-react'

interface IconDemoBlockProps {
  title: string
  description?: string
  icons: {
    icon: string
    label: string
  }[]
}

type IconType = React.ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>

export const IconDemoBlock: React.FC<IconDemoBlockProps> = ({ title, description, icons }) => {
  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {icons.map((item, index) => {
            const IconComponent = Icons[item.icon as keyof typeof Icons] as IconType
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {IconComponent && (
                  <IconComponent className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
                )}
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
