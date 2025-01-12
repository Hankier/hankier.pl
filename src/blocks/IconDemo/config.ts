import type { Block } from 'payload'

export const IconDemo: Block = {
  slug: 'iconDemo',
  interfaceName: 'IconDemoBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'icons',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        //{
        //  name: 'icon',
        //  type: 'text',
        //  required: true,
        //  admin: {
        //    components: {
        //      Field: '@/fields/lucideIcon/LucideIconComponent#LucideIconComponent',
        //    },
        //  },
        //},
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
