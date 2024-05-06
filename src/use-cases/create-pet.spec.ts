import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should to create a pet', async () => {
    const org = await orgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '99999999',
      address: 'rua 2',
      contact: '99999999999',
      password_hash: await hash('123456', 6),
      created_at: new Date(),
    })

    const { pet } = await sut.execute({
      name: 'Fluffy',
      about: 'Fluffy is a playful and friendly cat.',
      age: 3,
      size: 'Medium',
      energy: 'High',
      independence: 'Low',
      environment: 'Indoor',
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
