import { Controller, HttpRequest, HttpResponse, LoadCategories } from './load-categories-controller-protocols'
import { ok } from '../../../helpers/http/http-helper'

export class LoadCategoriesController implements Controller {
  constructor (private readonly loadCategories: LoadCategories) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const categories = await this.loadCategories.load()
    return ok(categories)
  }
}
