import { FastifyInstance } from 'fastify'
import { register } from './register.controller'
import { authenticate } from './authenticate.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)

  app.post('/sessions', authenticate)
}
