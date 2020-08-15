import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { LoadCategoriesByAccountId } from '../../../../domain/usecases/category/load-categories-by-account-id'
import { ok, noContent } from '../../../helpers/http/http-helper'

export class LoadCategoryController implements Controller {
  constructor (private readonly loadCategoriesByAccountId: LoadCategoriesByAccountId) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { accountId } = httpRequest
    const categories = await this.loadCategoriesByAccountId.loadById(accountId)
    return categories.length ? ok(categories) : noContent()
  }
}
