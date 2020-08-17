export const entriesPath = {
  post: {
    security: [{
      ApiKeyAuth: []
    }],
    tags: ['Movimentação'],
    summary: 'API para adicionar uma Entrada monetária',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [{
      in: 'path',
      name: 'categoryId',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addMovementParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Sucesso, mas sem dados para exibir'
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
