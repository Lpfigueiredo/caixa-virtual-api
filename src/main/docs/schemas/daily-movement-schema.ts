export const dailyMovementSchema = {
  type: 'object',
  properties: {
    totalBalance: {
      type: 'number'
    },
    movements: {
      type: 'array',
      items: {
        $ref: '#/schemas/movement'
      }
    }
  },
  required: ['totalBalance', 'movements']
}
