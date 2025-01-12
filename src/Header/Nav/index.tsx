'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
//import Link from 'next/link'
//import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center">
      <ul className="flex space-x-6">
        {navItems.map(({ link }, i) => {
          return (
            <li key={i}>
              <CMSLink
                {...link}
                appearance="link"
                className="text-zinc-300 hover:text-amber-500 transition-colors"
              />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
