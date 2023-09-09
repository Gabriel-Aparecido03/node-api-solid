import { PrismaGymRepository } from '@/repositores/prisma/prisma.gyms-repository'
import { PrismaCheckInsRepository } from '@/repositores/prisma/prisma-check-ins-repository'
import { CheckInUseCase } from '../check-in'

export async function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
