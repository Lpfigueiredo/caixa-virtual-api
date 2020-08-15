export interface MovimentationModel {
  id: string
  accountId: string
  categoryId: string
  type: string
  value: number
  description: string
  date: Date
}
