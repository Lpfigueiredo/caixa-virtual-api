import { HttpRequest } from '../../../protocols'
import { LoadCategoriesByAccountId } from '../../../../domain/usecases/category/load-categories-by-account-id'
import { LoadCategoryModel } from '../../../../domain/models/load-category'
import { AddMovementController } from './add-movement-controller'
import { forbidden } from '../../../helpers/http/http-helper'
import { InvalidParamError } from '../../../errors/invalid-param-error'

const makeFakeRequest = (): HttpRequest => ({
  accountId: 'any_account_id',
  body: {
    categoryId: 'any_category_id',
    value: '123.45',
    description: 'any_description'
  }
})

const makeFakeCategoryResult = (): LoadCategoryModel[] => ([
  {
    id: 'any_id',
    name: 'any_name'
  },
  {
    id: 'any_id',
    name: 'any_name'
  }
])

const makeLoadCategoryByAccountId = (): LoadCategoriesByAccountId => {
  class LoadCategoriesByAccountIdStub implements LoadCategoriesByAccountId {
    async loadById (id: string): Promise<LoadCategoryModel[]> {
      return new Promise(resolve => resolve(makeFakeCategoryResult()))
    }
  }
  return new LoadCategoriesByAccountIdStub()
}

interface SutTypes {
  sut: AddMovementController
  loadByAccountIdStub: LoadCategoriesByAccountId
}

const makeSut = (): SutTypes => {
  const loadByAccountIdStub = makeLoadCategoryByAccountId()
  const sut = new AddMovementController(loadByAccountIdStub)
  return {
    sut,
    loadByAccountIdStub
  }
}

describe('AddMovement Controller', () => {
  test('Should call LoadCategoriesByAccountId with correct value', async () => {
    const { sut, loadByAccountIdStub } = makeSut()
    const loadByAccountIdSpy = jest.spyOn(loadByAccountIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByAccountIdSpy).toHaveBeenCalledWith('any_account_id')
  })

  test('Should return 403 if LoadCategoriesByAccountId returns empty', async () => {
    const { sut , loadByAccountIdStub } = makeSut()
    jest.spyOn(loadByAccountIdStub, 'loadById').mockReturnValueOnce(new Promise((resolve) => resolve([])))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('categoryId')))
  })
})
