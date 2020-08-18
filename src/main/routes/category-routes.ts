import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddCategoryController } from '../factories/controllers/category/add-category/add-category-controller-factory'
import { auth } from '../middlewares/auth'
import { addCategoryValidation } from '../middlewares/validation/add-category-validation'
import { makeLoadCategoryController } from '../factories/controllers/category/load-category/load-category-controller-factory'

export default (router: Router): void => {
  router.post('/categories', addCategoryValidation, auth, adaptRoute(makeAddCategoryController()))
  router.get('/categories', auth, adaptRoute(makeLoadCategoryController()))
}
