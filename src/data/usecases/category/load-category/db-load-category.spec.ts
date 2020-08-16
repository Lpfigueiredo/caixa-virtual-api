import { LoadCategoryRepository } from '../../../protocols/db/category/load-category-repository'
import { DbLoadCategory } from './db-load-category'
import { LoadCategoryModel } from '../../../../domain/usecases/category/load-categories'
import { CategoryModel } from '../../../../domain/models/category'

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

const makeFakeLoadCategories = (): LoadCategoryModel[] => ([
  {
    id: 'any_id',
    name: 'any_name'
  },
  {
    id: 'other_id',
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

  test('Should return Categories on success', async () => {
    const { sut } = makeSut()
    const categories = await sut.loadById('any_id')
    expect(categories).toEqual(makeFakeLoadCategories())
  })

  test('Should throw if LoadCategoryRepository throws', async () => {
    const { sut, loadCategoryRepositoryStub } = makeSut()
    jest.spyOn(loadCategoryRepositoryStub, 'loadByAccountId').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
