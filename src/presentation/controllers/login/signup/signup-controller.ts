import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { AddAccount } from '../../../../domain/usecases/account/add-account'
import { forbidden } from '../../../helpers/http/http-helper'
import { EmailInUseError } from '../../../errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount
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
    return Promise.resolve(null)
  }
}
