import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { FilterPetsUseCase } from './filter-pets'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FilterPetsUseCase

describe('Fetch Pets By Filters Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new FilterPetsUseCase(petsRepository)
  })

  it('should to filter pets by city', async () => {
    const org1 = await orgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '99999999',
      address: 'rua-1',
      contact: '99999999999',
      password_hash: await hash('123456', 6),
      created_at: new Date(),
    })

    const org2 = await orgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '99999999',
      address: 'rua-2',
      contact: '99999999999',
      password_hash: await hash('123456', 6),
      created_at: new Date(),
    })

    await orgsRepository.create({
      name: 'Maria Doe',
      email: 'mariadoe@example.com',
      cep: '99999999',
      address: 'rua-2',
      contact: '99999999999',
      password_hash: await hash('123456', 6),
      created_at: new Date(),
    })

    await petsRepository.create({
      name: 'Fluffy',
      about: 'Fluffy is a playful and friendly cat.',
      age: 3,
      size: 'Medium',
      energy: 'High',
      independence: 'Low',
      environment: 'Indoor',
      org_id: org1.id,
    })

    await petsRepository.create({
      name: 'Spike',
      about: 'Spike is a playful and friendly dog.',
      age: 3,
      size: 'Medium',
      energy: 'High',
      independence: 'Low',
      environment: 'Indoor',
      org_id: org1.id,
    })

    await petsRepository.create({
      name: 'Bud',
      about: 'Bud is a playful and friendly dog.',
      age: 3,
      size: 'Medium',
      energy: 'High',
      independence: 'Low',
      environment: 'Indoor',
      org_id: org2.id,
    })

    const address = 'rua-1'

    const { pets } = await sut.execute({ address })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Fluffy',
      }),
      expect.objectContaining({
        name: 'Spike',
      }),
    ])
  })

  it('should filter pets by address and size', async () => {
    const org1 = await orgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '99999999',
      address: 'rua-1',
      contact: '99999999999',
      password_hash: await hash('123456', 6),
      created_at: new Date(),
    })

    await petsRepository.create({
      name: 'Fluffy',
      about: 'Fluffy is a playful and friendly cat.',
      age: 3,
      size: 'Medium',
      energy: 'High',
      independence: 'Low',
      environment: 'Indoor',
      org_id: org1.id,
    })

    await petsRepository.create({
      name: 'Doug',
      about: 'Doug is a playful and friendly dog.',
      age: 3,
      size: 'Lower',
      energy: 'High',
      independence: 'Low',
      environment: 'Indoor',
      org_id: org1.id,
    })

    const address = 'rua-1'
    const size = 'Lower'

    const { pets } = await sut.execute({ address, size })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Doug',
      }),
    ])
  })

  it('should filter pets by address and age', async () => {
    const org1 = await orgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '99999999',
      address: 'rua-1',
      contact: '99999999999',
      password_hash: await hash('123456', 6),
      created_at: new Date(),
    })

    await petsRepository.create({
      name: 'Fluffy',
      about: 'Fluffy is a playful and friendly cat.',
      age: 1,
      size: 'Medium',
      energy: 'High',
      independence: 'Low',
      environment: 'Indoor',
      org_id: org1.id,
    })

    await petsRepository.create({
      name: 'Doug',
      about: 'Doug is a playful and friendly dog.',
      age: 2,
      size: 'Lower',
      energy: 'High',
      independence: 'Low',
      environment: 'Indoor',
      org_id: org1.id,
    })

    const address = 'rua-1'
    const age = 2

    const { pets } = await sut.execute({ address, age })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Doug',
      }),
    ])
  })

  it('should filter pets by address and energy', async () => {
    const org1 = await orgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '99999999',
      address: 'rua-1',
      contact: '99999999999',
      password_hash: await hash('123456', 6),
      created_at: new Date(),
    })

    await petsRepository.create({
      name: 'Fluffy',
      about: 'Fluffy is a playful and friendly cat.',
      age: 1,
      size: 'Medium',
      energy: 'High',
      independence: 'Low',
      environment: 'Indoor',
      org_id: org1.id,
    })

    await petsRepository.create({
      name: 'Doug',
      about: 'Doug is a playful and friendly dog.',
      age: 2,
      size: 'Lower',
      energy: 'Medium',
      independence: 'Low',
      environment: 'Indoor',
      org_id: org1.id,
    })

    const address = 'rua-1'
    const energy = 'Medium'

    const { pets } = await sut.execute({ address, energy })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Doug',
      }),
    ])
  })

  it('should filter pets by address and independence', async () => {
    const org1 = await orgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '99999999',
      address: 'rua-1',
      contact: '99999999999',
      password_hash: await hash('123456', 6),
      created_at: new Date(),
    })

    await petsRepository.create({
      name: 'Fluffy',
      about: 'Fluffy is a playful and friendly cat.',
      age: 1,
      size: 'Medium',
      energy: 'High',
      independence: 'High',
      environment: 'Indoor',
      org_id: org1.id,
    })

    await petsRepository.create({
      name: 'Doug',
      about: 'Doug is a playful and friendly dog.',
      age: 2,
      size: 'Lower',
      energy: 'Medium',
      independence: 'Low',
      environment: 'Indoor',
      org_id: org1.id,
    })

    const address = 'rua-1'
    const independence = 'Low'

    const { pets } = await sut.execute({ address, independence })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Doug',
      }),
    ])
  })

  it('should filter pets by address and environment', async () => {
    const org1 = await orgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cep: '99999999',
      address: 'rua-1',
      contact: '99999999999',
      password_hash: await hash('123456', 6),
      created_at: new Date(),
    })

    await petsRepository.create({
      name: 'Fluffy',
      about: 'Fluffy is a playful and friendly cat.',
      age: 1,
      size: 'Medium',
      energy: 'High',
      independence: 'High',
      environment: 'Outdoor',
      org_id: org1.id,
    })

    await petsRepository.create({
      name: 'Doug',
      about: 'Doug is a playful and friendly dog.',
      age: 2,
      size: 'Lower',
      energy: 'Medium',
      independence: 'Low',
      environment: 'Indoor',
      org_id: org1.id,
    })

    const address = 'rua-1'
    const environment = 'Indoor'

    const { pets } = await sut.execute({ address, environment })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Doug',
      }),
    ])
  })

  it('should not find any pets in a city with no pets registered', async () => {
    const address = 'city-without-pets'

    await expect(() => sut.execute({ address })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
