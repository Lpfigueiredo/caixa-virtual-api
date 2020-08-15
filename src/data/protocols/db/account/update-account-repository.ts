export interface UpdateAccountRepository {
  updateTotalBalance (id: string, value: number): Promise<void>
}
