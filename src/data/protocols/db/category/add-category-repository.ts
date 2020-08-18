import { AddCategoryModel } from '../../../../domain/usecases/category/add-category'

export interface AddCategoryRepository {
  add (categoryData: AddCategoryModel): Promise<void>
}
