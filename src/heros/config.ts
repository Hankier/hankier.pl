import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

const socialLinkFields: Field[] = [
  {
    name: 'platform',
    type: 'select',
    required: true,
    options: [
      { label: 'LinkedIn', value: 'linkedin' },
      { label: 'Twitter', value: 'twitter' },
      { label: 'Instagram', value: 'instagram' },
      { label: 'YouTube', value: 'youtube' },
      { label: 'Email', value: 'email' },
      { label: 'GitHub', value: 'github' },
    ],
  },
  {
    name: 'url',
    type: 'text',
    required: true,
  },
  {
    name: 'label',
    type: 'text',
    required: true,
  },
]

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'About',
          value: 'about',
        },
        {
          label: 'Holo Grid',
          value: 'holoGrid',
        },
      ],
      required: true,
    },
    {
      name: 'preTitle',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'holoGrid',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['about', 'holoGrid'].includes(type),
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'about',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => type === 'about',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: socialLinkFields,
      admin: {
        condition: (_, { type } = {}) => type === 'about',
        initCollapsed: true,
      },
    },
    {
      name: 'socialSectionTitle',
      type: 'text',
      defaultValue: 'You can find me on',
      admin: {
        condition: (_, { type } = {}) => type === 'about',
      },
    },
  ],
  label: false,
}
