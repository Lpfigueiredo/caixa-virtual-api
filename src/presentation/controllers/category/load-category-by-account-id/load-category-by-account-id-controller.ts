import { Controller, HttpRequest, HttpResponse, LoadCategoriesByAccountId } from './load-category-by-account-id-controller-protocols'
import { ok, noContent, serverError } from '../../../helpers/http/http-helper'

export class LoadCategoryController implements Controller {
  constructor (private readonly loadCategoriesByAccountId: LoadCategoriesByAccountId) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest
      const categories = await this.loadCategoriesByAccountId.loadById(accountId)
      let categoriesFormated = []
      if (categories.length) {
        categoriesFormated = categories.map(category => ({ id: category.id, name: category.name }))
      }
      return categoriesFormated.length ? ok(categoriesFormated) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
