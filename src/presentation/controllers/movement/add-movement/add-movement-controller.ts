import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { LoadCategoriesByAccountId } from '../../../../domain/usecases/category/load-categories-by-account-id'
import { forbidden, serverError, noContent } from '../../../helpers/http/http-helper'
import { InvalidParamError } from '../../../errors/invalid-param-error'
import { AddMovement } from '../../../../domain/usecases/movement/add-movement/add-movement'

export class AddMovementController implements Controller {
  constructor (
    private readonly loadByAccountId: LoadCategoriesByAccountId,
    private readonly addMovement: AddMovement,
    private readonly type: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest
      const { categoryId, description } = httpRequest.body
      let { value } = httpRequest.body
      const categories = await this.loadByAccountId.loadById(accountId)
      if (categories.length) {
        const categoriesObj = categories.map(a => a.id)
        if (!categoriesObj.includes(categoryId)) {
          return forbidden(new InvalidParamError('categoryId'))
        }
      } else {
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
        date: new Date()
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
