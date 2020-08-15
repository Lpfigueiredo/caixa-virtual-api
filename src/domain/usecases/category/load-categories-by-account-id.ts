import { CategoryModel } from '../../models/category'

export interface LoadCategoriesByAccountId {
  loadById (id: string): Promise<CategoryModel[]>
}
