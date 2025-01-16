import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Hankier.pl',
  images: [
    {
      url: `${getServerSideURL()}/hankier-OG.webp`,
    },
  ],
  siteName: 'Hankier.pl',
  title: 'Hankier.pl',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
