import { DailyMovementModel } from '../../models/daily-movement'

export interface LoadDailyMovementModel {
  accountId: string
  date: string
}

export interface LoadDailyMovement {
  load (data: LoadDailyMovementModel): Promise<DailyMovementModel>
}
