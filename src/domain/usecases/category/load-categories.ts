export interface LoadCategoryModel {
  id: string
  name: string
}

export interface LoadCategories {
  load (): Promise<LoadCategoryModel[]>
}
