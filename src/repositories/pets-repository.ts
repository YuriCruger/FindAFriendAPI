import { Pet, Prisma } from '@prisma/client'

export interface FindAllParams {
  address: string
  age?: number
  size?: string
  energy?: string
  independence?: string
  environment?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findAll(params: FindAllParams): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
