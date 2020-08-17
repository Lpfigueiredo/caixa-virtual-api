export const categoriesPath = {
  post: {
    security: [{
      ApiKeyAuth: []
    }],
    tags: ['Categoria'],
    summary: 'API para criar uma categoria',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/categoryParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Sucesso'
      },
      400: {
        $ref: '#/components/badRequest'
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
