export const addMovementParamsSchema = {
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
