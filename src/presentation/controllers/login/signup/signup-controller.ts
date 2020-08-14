import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { AddAccount } from '../../../../domain/usecases/account/add-account'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password } = httpRequest.body
    await this.addAccount.add({
      name,
      email,
      password
    })
    return Promise.resolve(null)
  }
}
