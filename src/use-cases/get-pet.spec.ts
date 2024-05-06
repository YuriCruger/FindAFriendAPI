import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { GetPetUseCase } from './get-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet details', async () => {
    const org = await orgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '99999999',
      address: 'rua 2',
      contact: '99999999999',
      password_hash: await hash('123456', 6),
    })

    const pet = await petsRepository.create({
      name: 'Fluffy',
      about: 'Fluffy is a playful and friendly cat.',
      age: 3,
      size: 'Medium',
      energy: 'High',
      independence: 'Low',
      environment: 'Indoor',
      org_id: org.id,
    })

    const petId = pet.id

    const result = await sut.execute({ petId })

    expect(result.pet).toEqual({
      about: 'Fluffy is a playful and friendly cat.',
      age: 3,
      energy: 'High',
      environment: 'Indoor',
      id: petId,
      independence: 'Low',
      name: 'Fluffy',
      org_id: org.id,
      size: 'Medium',
    })
  })

  it('should not be able to get pet details with wrong id', async () => {
    await expect(() =>
      sut.execute({ petId: 'wrong-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
