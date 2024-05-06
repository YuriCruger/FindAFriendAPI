import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FilterPetsUseCaseRequest {
  address: string
  age?: number
  size?: string
  energy?: string
  independence?: string
  environment?: string
}

interface FilterPetsUseCaseResponse {
  pets: Pet[]
}

export class FilterPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    address,
    age,
    size,
    energy,
    independence,
    environment,
  }: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      address,
      age,
      size,
      energy,
      independence,
      environment,
    })

    return { pets }
  }
}
