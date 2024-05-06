import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaOrgsRepository {
  async findById(id: string) {
    const user = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.OrgCreateInput) {
    const user = await prisma.org.create({
      data,
    })

    return user
  }
}
