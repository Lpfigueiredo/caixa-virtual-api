export const addEntryParamsSchema = {
  type: 'object',
  properties: {
    value: {
      type: 'number'
    },
    description: {
      type: 'string'
    }
  },
  required: ['value', 'description']
}
