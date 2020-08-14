import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { AddCategory } from '../../../../domain/usecases/category/add-category'
import { serverError } from '../../../helpers/http/http-helper'

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
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
