interface DailyMovementCategoryModel {
  id: string
  name: string
}

interface DailyMovementItemModel {
  date: Date
  id: string
  category: DailyMovementCategoryModel
  type: string
  value: number
  description: string
}

export interface DailyMovementModel {
  totalBalance: number
  movements: DailyMovementItemModel[]
}
