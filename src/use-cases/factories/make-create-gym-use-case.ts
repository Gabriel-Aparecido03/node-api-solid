import { CreateGymUseCase } from '../create-gym'
import { PrismaGymRepository } from '@/repositores/prisma/prisma.gyms-repository'

export async function makeCreateGymUseCase() {
  const prismaGymRepository = new PrismaGymRepository()
  const useCase = new CreateGymUseCase(prismaGymRepository)

  return useCase
}
