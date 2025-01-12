import type { ArrayField, Field } from 'payload'
import deepMerge from '@/utilities/deepMerge'

type FeatureGroupType = (options?: { overrides?: Partial<ArrayField> }) => Field

export const featureGroup: FeatureGroupType = ({ overrides = {} } = {}) => {
  const generatedFeatureGroup: Field = {
    name: 'features',
    type: 'array',
    fields: [
      {
        name: 'feature',
        type: 'text',
        required: true,
      },
    ],
    admin: {
      initCollapsed: true,
    },
  }

  return deepMerge(generatedFeatureGroup, overrides)
}
