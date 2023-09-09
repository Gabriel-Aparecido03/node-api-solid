import { FetchUserCheckInsHistoryUseUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositores/prisma/prisma-check-ins-repository'

export async function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseUseCase(
    prismaCheckInsRepository,
  )

  return useCase
}
