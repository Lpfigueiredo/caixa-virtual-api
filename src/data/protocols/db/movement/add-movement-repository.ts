import { AddMovementModel } from '../../../../domain/usecases/movement/add-movement'

export interface AddMovementRepository {
  add (movementData: AddMovementModel): Promise<void>
}
