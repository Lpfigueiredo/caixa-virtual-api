export interface AddMovementModel {
  accountId: string
  categoryId: string
  type: string
  value: number
  description: string
  date: Date
}

export interface AddMovement {
  add (data: AddMovementModel): Promise<void>
}
