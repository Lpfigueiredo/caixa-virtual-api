import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { LoadDailyMovement } from '../../../../domain/usecases/daily-movement/load-daily-movement'
import { serverError, ok } from '../../../helpers/http/http-helper'

export class LoadDailyMovementController implements Controller {
  constructor (private readonly loadDailyMovement: LoadDailyMovement) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest
      const { date } = httpRequest.query
      let dateInput = new Date().toISOString()
      if (date) {
        dateInput = new Date(date).toISOString()
      }
      const dailyMovement = await this.loadDailyMovement.load({
        accountId,
        date: dateInput
      })
      return ok(dailyMovement)
    } catch (error) {
      return serverError(error)
    }
  }
}
