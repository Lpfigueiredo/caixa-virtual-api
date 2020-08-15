import { CategoryModel } from '../../../../domain/models/category'

export interface LoadCategoryRepository {
  loadByAccountId (surveyId: string): Promise<CategoryModel[]>
}
