import { DailyMovementModel } from '../../../../domain/models/daily-movement'
import { LoadDailyMovementModel } from '../../../../domain/usecases/daily-movement/load-daily-movement'

export interface LoadDailyMovementRepository {
  load (data: LoadDailyMovementModel): Promise<DailyMovementModel>
}
