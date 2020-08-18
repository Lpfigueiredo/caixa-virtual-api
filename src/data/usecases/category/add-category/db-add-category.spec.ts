import { DbAddCategory } from './db-add-category'
import { AddCategoryModel, AddCategoryRepository } from './db-add-category-protocols'

const makeFakeCategoryData = (): AddCategoryModel => ({
  accountId: 'any_account_id',
  name: 'any_category_name'
})

const makeAddCategoryRepository = (): AddCategoryRepository => {
  class AddCategoryRepositoryStub implements AddCategoryRepository {
    async add (categoryData: AddCategoryModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddCategoryRepositoryStub()
}

interface SutTypes {
  sut: DbAddCategory
  addCategoryRepositoryStub: AddCategoryRepository
}

const makeSut = (): SutTypes => {
  const addCategoryRepositoryStub = makeAddCategoryRepository()
  const sut = new DbAddCategory(addCategoryRepositoryStub)
  return {
    sut,
    addCategoryRepositoryStub
  }
}

describe('DbAddCategory Usecase', () => {
  test('Should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCategoryRepositoryStub, 'add')
    const categoryData = makeFakeCategoryData()
    await sut.add(categoryData)
    expect(addSpy).toHaveBeenCalledWith(categoryData)
  })

  test('Should throw if AddCategoryRepository throws', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    jest.spyOn(addCategoryRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeCategoryData())
    await expect(promise).rejects.toThrow()
  })
})
