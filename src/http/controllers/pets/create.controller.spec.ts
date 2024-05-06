import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Fluffy',
        about: 'Fluffy is a playful and friendly cat.',
        age: 3,
        size: 'Medium',
        energy: 'High',
        independence: 'Low',
        environment: 'Indoor',
        orgId: org.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
