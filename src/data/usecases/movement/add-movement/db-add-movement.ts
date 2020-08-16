import { AddMovementRepository } from '../../../protocols/db/movement/add-movement-repository'
import { AddMovementModel, AddMovement } from '../../../../domain/usecases/movement/add-movement'
import { UpdateAccountRepository } from '../../../protocols/db/account/update-account-repository'

export class DbAddMovement implements AddMovement {
  constructor (
    private readonly addMovementRepository: AddMovementRepository,
    private readonly updateAccountRepository: UpdateAccountRepository
  ) {}

  async add (data: AddMovementModel): Promise<void> {
    await this.addMovementRepository.add(data)
    await this.updateAccountRepository.updateTotalBalance(data.accountId, data.value)
  }
}
