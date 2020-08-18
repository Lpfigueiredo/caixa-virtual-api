export const movementSchema = {
  type: 'object',
  properties: {
    date: {
      type: 'string'
    },
    id: {
      type: 'string'
    },
    category: {
      $ref: '#/schemas/category'
    },
    type: {
      type: 'string'
    },
    value: {
      type: 'number'
    },
    description: {
      type: 'string'
    }
  },
  required: ['date', 'id', 'category', 'type', 'value', 'description']
}
