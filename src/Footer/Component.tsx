import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-zinc-400 py-2 mt-auto border-t border-zinc-800 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>
              &copy; {currentYear} Grzesiek &apos;Hankier&apos; Ćwikliński. All rights reserved.
            </p>
          </div>
          <nav>
            <ul className="flex space-x-4">
              {navItems.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} className="hover:text-amber-500 transition-colors" />
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
