import { AddCategoryModel } from '../../../../domain/usecases/category/add-category'

export interface AddCategoryRepository {
  add (surveyData: AddCategoryModel): Promise<void>
}
