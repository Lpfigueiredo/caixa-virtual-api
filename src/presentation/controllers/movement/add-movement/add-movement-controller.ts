import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { forbidden, serverError, noContent } from '../../../helpers/http/http-helper'
import { InvalidParamError } from '../../../errors/invalid-param-error'
import { AddMovement } from '../../../../domain/usecases/movement/add-movement'
import { LoadCategoriesByAccountCategoryId } from '../../../../domain/usecases/category/load-categories-by-account-category-id'

export class AddMovementController implements Controller {
  constructor (
    private readonly loadByAccountCategoryId: LoadCategoriesByAccountCategoryId,
    private readonly addMovement: AddMovement,
    private readonly type: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest
      const { categoryId } = httpRequest.params
      const { description } = httpRequest.body
      let { value } = httpRequest.body
      const category = await this.loadByAccountCategoryId.loadByAccountCategoryId(accountId, categoryId)
      if (!category) {
        return forbidden(new InvalidParamError('categoryId'))
      }
      value = Number(value) * 100
      if (this.type === 'exit') {
        value = value * -1
      }
      await this.addMovement.add({
        accountId,
        categoryId,
        type: this.type,
        value,
        description,
        date: new Date().toISOString()
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
