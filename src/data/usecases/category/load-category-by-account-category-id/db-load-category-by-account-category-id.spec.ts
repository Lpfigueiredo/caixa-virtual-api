import { DbLoadCategoryByAccountCategoryId } from './db-load-category-by-account-category-id'
import { CategoryModel } from '../../../../domain/models/category'
import { LoadCategoryByAccountCategoryIdRepository } from '../../../../data/protocols/db/category/load-category-by-account-category-id-repository'

const makeFakeLoadCategory = (): CategoryModel => (
  {
    id: 'any_id',
    accountId: 'any_account_id',
    name: 'any_name'
  }
)

const makeLoadCategoryByAccountCategoryIdRepository = (): LoadCategoryByAccountCategoryIdRepository => {
  class LoadCategoryByAccountCategoryIdRepositoryStub implements LoadCategoryByAccountCategoryIdRepository {
    async loadByAccountCategoryId (accountId: string, categoryId: string): Promise<CategoryModel> {
      return new Promise(resolve => resolve(makeFakeLoadCategory()))
    }
  }
  return new LoadCategoryByAccountCategoryIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadCategoryByAccountCategoryId
  loadCategoryByAccountCategoryIdRepositoryStub: LoadCategoryByAccountCategoryIdRepository
}

const makeSut = (): SutTypes => {
  const loadCategoryByAccountCategoryIdRepositoryStub = makeLoadCategoryByAccountCategoryIdRepository()
  const sut = new DbLoadCategoryByAccountCategoryId(loadCategoryByAccountCategoryIdRepositoryStub)
  return {
    sut,
    loadCategoryByAccountCategoryIdRepositoryStub
  }
}

describe('DbLoadCategoryByAccountCategoryId Usecase', () => {
  test('Should call LoadCategoryByAccountCategoryIdRepository', async () => {
    const { sut, loadCategoryByAccountCategoryIdRepositoryStub } = makeSut()
    const loadByAccountIdSpy = jest.spyOn(loadCategoryByAccountCategoryIdRepositoryStub, 'loadByAccountCategoryId')
    await sut.loadByAccountCategoryId('any_account_id', 'any_id')
    expect(loadByAccountIdSpy).toHaveBeenCalledWith('any_account_id', 'any_id')
  })

  test('Should return Categories on success', async () => {
    const { sut } = makeSut()
    const categories = await sut.loadByAccountCategoryId('any_account_id', 'any_id')
    expect(categories).toEqual(makeFakeLoadCategory())
  })

  test('Should throw if LoadCategoryByAccountCategoryIdRepository throws', async () => {
    const { sut, loadCategoryByAccountCategoryIdRepositoryStub } = makeSut()
    jest.spyOn(loadCategoryByAccountCategoryIdRepositoryStub, 'loadByAccountCategoryId').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadByAccountCategoryId('any_account_id', 'any_id')
    await expect(promise).rejects.toThrow()
  })
})
