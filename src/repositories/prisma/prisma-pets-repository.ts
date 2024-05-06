import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FindAllParams } from '../pets-repository'

export class PrismaPetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findAll(params: FindAllParams) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          address: params.address,
        },
        age: params.age,
        energy: params.energy,
        environment: params.environment,
        independence: params.independence,
        size: params.size,
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
}
