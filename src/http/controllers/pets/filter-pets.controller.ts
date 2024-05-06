import { makeFilterPetsUseCase } from '@/use-cases/factories/make-filter-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function filterPets(request: FastifyRequest, reply: FastifyReply) {
  const filterPetsQuerySchema = z.object({
    address: z.string(),
    age: z.number().optional(),
    size: z.string().optional(),
    energy: z.string().optional(),
    independence: z.string().optional(),
    environment: z.string().optional(),
  })
  const { address, age, energy, environment, independence, size } =
    filterPetsQuerySchema.parse(request.query)

  try {
    const filterPetsUseCase = makeFilterPetsUseCase()

    await filterPetsUseCase.execute({
      address,
      age,
      energy,
      environment,
      independence,
      size,
    })

    return reply.status(200).send()
  } catch {
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
