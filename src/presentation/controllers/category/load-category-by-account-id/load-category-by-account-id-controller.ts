import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { LoadCategoriesByAccountId } from '../../../../domain/usecases/category/load-categories-by-account-id'

export class LoadCategoryController implements Controller {
  constructor (private readonly loadCategoriesByAccountId: LoadCategoriesByAccountId) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { accountId } = httpRequest
    await this.loadCategoriesByAccountId.loadById(accountId)
    return null
  }
}
