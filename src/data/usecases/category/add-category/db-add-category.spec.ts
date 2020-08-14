import { DbAddCategory } from './db-add-category'
import { AddCategoryModel, AddCategoryRepository } from './db-add-category-protocols'

const makeFakeCategoryData = (): AddCategoryModel => ({
  accountId: 'any_account_id',
  name: 'any_category_name'
})

const makeAddCategoryRepository = (): AddCategoryRepository => {
  class AddCategoryRepositoryStub implements AddCategoryRepository {
    async add (surveyData: AddCategoryModel): Promise<void> {
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

describe('DbAddSurvey Usecase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCategoryRepositoryStub, 'add')
    const surveyData = makeFakeCategoryData()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    jest.spyOn(addCategoryRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeCategoryData())
    await expect(promise).rejects.toThrow()
  })
})
