import { LoadCategoryModel } from '../../models/load-category'

export interface LoadCategoriesByAccountId {
  loadById (id: string): Promise<LoadCategoryModel[]>
}
