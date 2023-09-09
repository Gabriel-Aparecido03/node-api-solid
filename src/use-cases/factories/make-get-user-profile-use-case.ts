import { PrismaUsersRepository } from '@/repositores/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export async function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(prismaUsersRepository)

  return useCase
}
