import { DailyMovementModel } from '../../models/daily-movement'

export interface LoadDailyMovementModel {
  accountId: string
  date: Date
}

export interface LoadDailyMovement {
  load (data: LoadDailyMovementModel): Promise<DailyMovementModel>
}
