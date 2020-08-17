export const badRequestSchema = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'number'
    },
    error: {
      type: 'string'
    },
    message: {
      type: 'string'
    },
    validation: {
      $ref: '#/schemas/validation'
    }
  },
  required: ['statusCode', 'error', 'message', 'validation']
}
