import { CategoryModel } from '../../../../domain/models/category'

export interface LoadCategoryRepository {
  loadByAccountId (categoryId: string): Promise<CategoryModel[]>
}
