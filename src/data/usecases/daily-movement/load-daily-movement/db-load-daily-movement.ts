import { LoadDailyMovement, LoadDailyMovementModel } from '../../../../domain/usecases/daily-movement/load-daily-movement'
import { DailyMovementModel } from '../../../../domain/models/daily-movement'
import { LoadDailyMovementRepository } from '../../../protocols/db/daily-movement/load-daily-movement-repository'

export class DbLoadDailyMovement implements LoadDailyMovement {
  constructor (private readonly loadDailyMovementRepository: LoadDailyMovementRepository) {}

  async load (data: LoadDailyMovementModel): Promise<DailyMovementModel> {
    const dailyMovement = await this.loadDailyMovementRepository.load(data)
    return dailyMovement
  }
}
