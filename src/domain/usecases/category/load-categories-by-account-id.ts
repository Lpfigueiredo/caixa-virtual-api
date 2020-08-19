export interface LoadCategoryModel {
  id: string
  name: string
}

export interface LoadCategoriesByAccountId {
  loadById (id: string): Promise<LoadCategoryModel[]>
}
