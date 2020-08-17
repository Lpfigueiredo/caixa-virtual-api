export const validationSchema = {
  type: 'object',
  properties: {
    source: {
      type: 'string'
    },
    keys: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: ['source', 'keys']
}
