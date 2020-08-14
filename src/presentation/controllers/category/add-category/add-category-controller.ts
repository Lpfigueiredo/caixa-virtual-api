import { Controller, HttpRequest, HttpResponse, AddCategory } from './add-category-controller-protocols'
import { serverError, noContent } from '../../../helpers/http/http-helper'

export class AddCategoryController implements Controller {
  constructor (private readonly addCategory: AddCategory) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest
      const { name } = httpRequest.body
      await this.addCategory.add({
        accountId,
        name
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
