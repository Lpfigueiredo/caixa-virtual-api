import { CategoryModel } from '../../../../domain/models/category'
import { LoadCategoryRepository } from '../../../protocols/db/category/load-category-repository'
import { DbLoadCategory } from './db-load-category'

const makeFakeCategories = (): CategoryModel[] => ([
  {
    id: 'any_id',
    accountId: 'any_account_id',
    name: 'any_name'
  },
  {
    id: 'other_id',
    accountId: 'any_account_id',
    name: 'other_name'
  }
])

const makeLoadCategoryRepository = (): LoadCategoryRepository => {
  class LoadCategoryRepositoryStub implements LoadCategoryRepository {
    async loadByAccountId (): Promise<CategoryModel[]> {
      return new Promise(resolve => resolve(makeFakeCategories()))
    }
  }
  return new LoadCategoryRepositoryStub()
}

interface SutTypes {
  sut: DbLoadCategory
  loadCategoryRepositoryStub: LoadCategoryRepository
}

const makeSut = (): SutTypes => {
  const loadCategoryRepositoryStub = makeLoadCategoryRepository()
  const sut = new DbLoadCategory(loadCategoryRepositoryStub)
  return {
    sut,
    loadCategoryRepositoryStub
  }
}

describe('DbLoadCategory Usecase', () => {
  test('Should call LoadCategoryRepository', async () => {
    const { sut, loadCategoryRepositoryStub } = makeSut()
    const loadByAccountIdSpy = jest.spyOn(loadCategoryRepositoryStub, 'loadByAccountId')
    await sut.loadById('any_id')
    expect(loadByAccountIdSpy).toHaveBeenCalledWith('any_id')
  })
})
