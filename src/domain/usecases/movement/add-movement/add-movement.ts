export interface SaveMovementModel {
  accountId: string
  categoryId: string
  type: string
  value: number
  description: string
  date: Date
}

export interface SaveMovement {
  save (data: SaveMovementModel): Promise<void>
}
