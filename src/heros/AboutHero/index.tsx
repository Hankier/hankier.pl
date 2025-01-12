'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Page } from '@/payload-types'
import Image from 'next/image'

const iconMap = {
  twitter: '/assets/icons/social_x.svg',
  linkedin: '/assets/icons/social_linkedin.svg',
  instagram: '/assets/icons/social_instagram.svg',
  youtube: '/assets/icons/social_youtube.svg',
}

const SocialLink: React.FC<{
  platform: keyof typeof iconMap
  url: string
  label: string
}> = ({ platform, url, label }) => {
  const iconSrc = iconMap[platform]

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 text-zinc-400 hover:text-amber-500 transition-colors"
    >
      <div className="w-8 h-8 text-zinc-400 group-hover:text-amber-500 transition-colors">
        <Image
          src={iconSrc}
          alt={label}
          width={32}
          height={32}
          className="w-full h-full [filter:brightness(0)_invert(1)] opacity-50 group-hover:opacity-100 transition-opacity"
        />
      </div>
      <span className="text-lg font-semibold group-hover:text-amber-500 transition-colors">
        {label}
      </span>
    </Link>
  )
}

export const AboutHero: React.FC<Page['hero']> = ({
  title,
  subtitle,
  richText,
  profileImage,
  socialLinks,
  socialSectionTitle,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <section className="relative min-h-[60vh] max-h-[80vh] flex items-center">
      <div className="absolute inset-y-0 right-0 w-full md:w-3/4 md:ml-[25%]">
        {profileImage && typeof profileImage === 'object' && (
          <Media
            resource={profileImage}
            fill
            className="object-cover object-center opacity-40 md:opacity-100"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-custom" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-100 mb-6">
            {title}
          </h1>

          <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-amber-500 to-yellow-500 text-transparent bg-clip-text mb-6">
            {subtitle}
          </p>

          {richText && (
            <div className="space-y-4 text-zinc-300 mb-8">
              <RichText data={richText} className="[&>*:first-child]:mt-0" enableGutter={false} />
            </div>
          )}

          {socialLinks && socialLinks.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-amber-500 to-yellow-500 text-transparent bg-clip-text">
                {socialSectionTitle}
              </h2>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <SocialLink
                    key={i}
                    platform={social.platform as keyof typeof iconMap}
                    url={social.url}
                    label={social.label}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
