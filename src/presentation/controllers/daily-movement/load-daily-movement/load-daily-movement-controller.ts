import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { LoadDailyMovement } from '../../../../domain/usecases/daily-movement/load-daily-movement'
import { serverError, ok, noContent } from '../../../helpers/http/http-helper'

export class LoadDailyMovementController implements Controller {
  constructor (private readonly loadDailyMovement: LoadDailyMovement) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest
      const dailyMovement = await this.loadDailyMovement.load({
        accountId,
        date: new Date(new Date().setHours(0, 0, 0))
      })
      return dailyMovement ? ok(dailyMovement) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
