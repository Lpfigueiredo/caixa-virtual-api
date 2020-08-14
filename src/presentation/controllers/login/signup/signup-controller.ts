import { Controller, HttpRequest, HttpResponse, AddAccount, Authentication } from './signup-controller-protocols'
import { forbidden, ok } from '../../../helpers/http/http-helper'
import { EmailInUseError } from '../../../errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password } = httpRequest.body
    const account = await this.addAccount.add({
      name,
      email,
      password
    })
    if (!account) {
      return forbidden(new EmailInUseError())
    }
    const accessToken = await this.authentication.auth({ email, password })
    return ok({ accessToken })
  }
}
