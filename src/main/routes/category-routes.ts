import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddCategoryController } from '../factories/controllers/category/add-category/add-category-controller-factory'
import { auth } from '../middlewares/auth'
import { addCategoryValidation } from '../middlewares/add-category-validation'

export default (router: Router): void => {
  router.post('/categories', addCategoryValidation, auth, adaptRoute(makeAddCategoryController()))
}
