import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FilterPetsUseCase } from '../filter-pets'

export function makeFilterPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const filterPetsUseCase = new FilterPetsUseCase(prismaPetsRepository)

  return filterPetsUseCase
}
