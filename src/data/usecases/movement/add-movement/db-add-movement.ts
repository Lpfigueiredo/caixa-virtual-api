import { AddMovementRepository } from '../../../protocols/db/movement/add-movement-repository'
import { AddMovementModel, AddMovement } from '../../../../domain/usecases/movement/add-movement/add-movement'

export class DbAddMovement implements AddMovement {
  constructor (private readonly addMovementRepository: AddMovementRepository) {}

  async add (data: AddMovementModel): Promise<void> {
    await this.addMovementRepository.add(data)
  }
}
