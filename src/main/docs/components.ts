import { badRequest, serverError, unauthorized, notFound, forbidden } from './components/'
import { apiKeyAuthSchema } from './schemas/'

export default {
  securitySchemes: {
    ApiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
}
