import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { LoadCategoriesByAccountId } from '../../../../domain/usecases/category/load-categories-by-account-id'
import { forbidden, serverError } from '../../../helpers/http/http-helper'
import { InvalidParamError } from '../../../errors/invalid-param-error'

export class AddMovementController implements Controller {
  constructor (private readonly loadByAccountId: LoadCategoriesByAccountId) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest
      const { categoryId } = httpRequest.body
      const categories = await this.loadByAccountId.loadById(accountId)
      if (categories.length) {
        const categoriesObj = categories.map(a => a.id)
        if (!categoriesObj.includes(categoryId)) {
          return forbidden(new InvalidParamError('categoryId'))
        }
      } else {
        return forbidden(new InvalidParamError('categoryId'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
