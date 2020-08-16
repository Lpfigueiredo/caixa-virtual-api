import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { LoadDailyMovement } from '../../../../domain/usecases/daily-movement/load-daily-movement'

export class LoadDailyMovementController implements Controller {
  constructor (private readonly loadDailyMovement: LoadDailyMovement) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { accountId } = httpRequest
    await this.loadDailyMovement.load({
      accountId,
      date: new Date()
    })
    return null
  }
}
