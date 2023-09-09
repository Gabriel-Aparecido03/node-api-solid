import { FetchNearbyUseCase } from '../fetch-nearby-gyms'
import { PrismaGymRepository } from '@/repositores/prisma/prisma.gyms-repository'

export async function makeFetchNearbyGymUseCase() {
  const prismaGymRepository = new PrismaGymRepository()
  const useCase = new FetchNearbyUseCase(prismaGymRepository)

  return useCase
}
