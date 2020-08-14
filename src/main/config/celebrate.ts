import { Express } from 'express'
import { errors } from 'celebrate'

export default (app: Express): void => {
  app.use(errors())
}
