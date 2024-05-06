import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
    const { org } = await createAndAuthenticateOrg(app)

    const pet = await prisma.pet.create({
      data: {
        name: 'Fluffy',
        about: 'Fluffy is a playful and friendly cat.',
        age: 3,
        size: 'Medium',
        energy: 'High',
        independence: 'Low',
        environment: 'Indoor',
        org_id: org.id,
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`)

    expect(response.statusCode).toEqual(201)
  })
})
