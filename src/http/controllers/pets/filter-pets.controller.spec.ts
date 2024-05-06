import { app } from '@/app'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Filter Pets (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })
  it('should be able to filter a pet by address', async () => {
    const { org } = await createAndAuthenticateOrg(app)

    await prisma.pet.create({
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

    const response = await request(app.server)
      .get('/pets')
      .query({ address: org.address })

    expect(response.statusCode).toEqual(200)
  })
})
