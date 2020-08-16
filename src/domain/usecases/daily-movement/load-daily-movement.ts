import { DailyMovementModel } from '../../models/daily-movement'

export interface LoadDailyMovement {
  load (accountId: string, date: Date): Promise<DailyMovementModel>
}
