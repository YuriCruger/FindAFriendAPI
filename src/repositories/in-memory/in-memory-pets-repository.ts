import { Pet, Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository | null = null) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independence: data.independence,
      environment: data.environment,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
    if (!this.orgsRepository) {
      throw new Error('orgsRepository is not provided')
    }

    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.address === params.address,
    )

    if (orgsByCity.length === 0) {
      throw new ResourceNotFoundError()
    }

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) => (params.energy ? item.energy === params.energy : true))
      .filter((item) =>
        params.independence ? item.independence === params.independence : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      )

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
