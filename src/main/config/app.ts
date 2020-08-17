import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupCelebrate from './celebrate'
import setupSwagger from './config-swagger'

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
setupCelebrate(app)
export default app
