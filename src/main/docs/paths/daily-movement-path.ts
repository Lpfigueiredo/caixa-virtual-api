export const dailyMovementPath = {
  get: {
    security: [{
      ApiKeyAuth: []
    }],
    tags: ['Movimentação'],
    summary: 'API para consultar a movimentação diária do usuário',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [{
      in: 'query',
      name: 'date',
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/dailyMovement'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
