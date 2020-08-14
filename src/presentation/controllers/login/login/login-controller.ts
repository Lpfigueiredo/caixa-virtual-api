import { Controller, HttpRequest, HttpResponse, Authentication } from './login-controller-protocols'
import { unauthorized } from '../../../helpers/http/http-helper'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    const accessToken = await this.authentication.auth({
      email,
      password
    })
    if (!accessToken) {
      return unauthorized()
    }
    return null
  }
}
