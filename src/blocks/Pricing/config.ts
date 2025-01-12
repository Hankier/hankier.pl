import type { Block, Field } from 'payload'
import { featureGroup } from '@/fields/featureGroup'

const priceCardFields: Field = {
  name: 'priceCards',
  type: 'array',
  label: 'Price Cards',
  maxRows: 4,
  admin: {
    initCollapsed: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'monthlyPrice',
      type: 'number',
      required: true,
    },
    {
      name: 'yearlyPrice',
      type: 'number',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'isPopular',
      type: 'checkbox',
      defaultValue: false,
    },
    featureGroup({
      overrides: {
        maxRows: 10,
      },
    }),
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Sign up',
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
    },
  ],
}

export const PricingBlock: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Pricing',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Whatever your status, our offers evolve according to your needs.',
    },
    {
      name: 'yearlyDiscount',
      type: 'number',
      defaultValue: 10,
      min: 0,
      max: 100,
    },
    priceCardFields,
  ],
  labels: {
    singular: 'Pricing Block',
    plural: 'Pricing Blocks',
  },
}
