export const addCategoryParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    }
  },
  required: ['name']
}
