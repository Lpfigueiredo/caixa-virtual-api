import { Controller, HttpRequest, HttpResponse, LoadCategories } from './load-categories-controller-protocols'

export class LoadCategoriesController implements Controller {
  constructor (private readonly loadCategories: LoadCategories) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadCategories.load()
    return null
  }
}
