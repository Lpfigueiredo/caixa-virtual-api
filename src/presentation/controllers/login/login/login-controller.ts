import { Controller, HttpRequest, HttpResponse, Authentication } from './login-controller-protocols'
import { unauthorized, serverError } from '../../../helpers/http/http-helper'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({
        email,
        password
      })
      if (!accessToken) {
        return unauthorized()
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
