interface DailyMovementCategoryModel {
  id: string
  name: string
}

interface DailyMovementItemModel {
  date: string
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
