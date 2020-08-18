import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Caixa Virtual API',
    description: 'API REST em NodeJs usando Typescript, TDD, Clean Architecture, Design Patterns e princípios SOLID.',
    version: '1.8.6',
    contact: {
      name: 'Leonardo Figueiredo',
      url: 'https://www.linkedin.com/in/leonardo-paulo-figueiredo/'
    }
  },
  license: {
    name: 'ISC',
    url: 'https://opensource.org/licenses/ISC'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }, {
    name: 'Categoria',
    description: 'APIs relacionadas a Categoria'
  }, {
    name: 'Movimentação',
    description: 'APIs relacionadas a Movimentação'
  }],
  paths,
  schemas,
  components
}
