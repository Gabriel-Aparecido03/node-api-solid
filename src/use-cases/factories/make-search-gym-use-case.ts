import { SearchGymUseCase } from '../gym-search'
import { PrismaGymRepository } from '@/repositores/prisma/prisma.gyms-repository'

export async function makeSearchGymUseCase() {
  const prismaGymRepository = new PrismaGymRepository()
  const useCase = new SearchGymUseCase(prismaGymRepository)

  return useCase
}
