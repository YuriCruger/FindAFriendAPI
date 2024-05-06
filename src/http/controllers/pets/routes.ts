import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { getPet } from './get-pet.controller'
import { filterPets } from './filter-pets.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJwt] }, create)

  app.get('/pets/:petId', getPet)

  app.get('/pets', filterPets)
}
