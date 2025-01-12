import { Block } from 'payload'

export const Features: Block = {
  slug: 'features',
  labels: {
    singular: 'Features Block',
    plural: 'Features Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
    },
    {
      name: 'gridColumns',
      type: 'select',
      defaultValue: '4',
      options: [
        {
          label: '2 Columns',
          value: '2',
        },
        {
          label: '3 Columns',
          value: '3',
        },
        {
          label: '4 Columns',
          value: '4',
        },
      ],
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 12,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Terminal',
              value: 'Terminal',
            },
            {
              label: 'Bot',
              value: 'Bot',
            },
            {
              label: 'Brain',
              value: 'Brain',
            },
            {
              label: 'Sparkles',
              value: 'Sparkles',
            },
          ],
        },
        {
          name: 'content',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export default Features
