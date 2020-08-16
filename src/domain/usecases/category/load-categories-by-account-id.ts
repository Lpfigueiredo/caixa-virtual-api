import { LoadCategoryModel } from '../../usecases/category/load-categories'

export interface LoadCategoriesByAccountId {
  loadById (id: string): Promise<LoadCategoryModel[]>
}
