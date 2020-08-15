import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { LoadCategoriesByAccountId } from '../../../../domain/usecases/category/load-categories-by-account-id'
import { forbidden } from '../../../helpers/http/http-helper'
import { InvalidParamError } from '../../../errors/invalid-param-error'

export class AddMovementController implements Controller {
  constructor (private readonly loadByAccountId: LoadCategoriesByAccountId) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { accountId } = httpRequest
    const categories = await this.loadByAccountId.loadById(accountId)
    if (!categories.length) {
      return forbidden(new InvalidParamError('categoryId'))
    }
    return null
  }
}
