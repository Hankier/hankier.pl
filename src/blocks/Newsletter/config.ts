import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Newsletter: Block = {
  slug: 'newsletter',
  interfaceName: 'NewsletterBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Subtitle/Text',
    },
    {
      name: 'termsText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, InlineToolbarFeature()]
        },
      }),
      required: true,
      label: 'Terms Text',
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Subscribe',
      required: true,
    },
    {
      name: 'successTitle',
      type: 'text',
      defaultValue: 'Dziękujemy za zapisanie się!',
      required: true,
    },
    {
      name: 'successMessage',
      type: 'text',
      defaultValue: 'Będziemy informować Cię o najnowszych wiadomościach.',
      required: true,
    },
    {
      name: 'mailerLiteGroups',
      type: 'array',
      fields: [
        {
          name: 'groupId',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  labels: {
    singular: 'Newsletter Block',
    plural: 'Newsletter Blocks',
  },
}
