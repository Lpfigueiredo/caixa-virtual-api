import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { LoadDailyMovement } from '../../../../domain/usecases/daily-movement/load-daily-movement'
import { serverError } from '../../../helpers/http/http-helper'

export class LoadDailyMovementController implements Controller {
  constructor (private readonly loadDailyMovement: LoadDailyMovement) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest
      await this.loadDailyMovement.load({
        accountId,
        date: new Date()
      })
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
