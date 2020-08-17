import { LoadDailyMovement, LoadDailyMovementModel } from '../../../../domain/usecases/daily-movement/load-daily-movement'
import { DailyMovementModel } from '../../../../domain/models/daily-movement'
import { LoadDailyMovementRepository } from '../../../protocols/db/daily-movement/load-daily-movement-repository'
import { LoadAccountByAccountIdRepository } from '../../../protocols/db/account/load-account-by-account-id-repository'

export class DbLoadDailyMovement implements LoadDailyMovement {
  constructor (
    private readonly loadDailyMovementRepository: LoadDailyMovementRepository,
    private readonly loadAccountByAccountIdRepository: LoadAccountByAccountIdRepository
  ) {}

  async load (data: LoadDailyMovementModel): Promise<DailyMovementModel> {
    let dailyMovement = await this.loadDailyMovementRepository.load(data)
    if (!dailyMovement) {
      const movement = await this.loadAccountByAccountIdRepository.loadByAccountId(data.accountId)
      dailyMovement = {
        totalBalance: movement.totalBalance,
        movements: []
      }
    }
    return dailyMovement
  }
}
