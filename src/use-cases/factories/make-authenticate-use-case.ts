import { PrismaUsersRepository } from '@/repositores/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export async function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authtenticaUseCase = new AuthenticateUseCase(prismaUsersRepository)

  return authtenticaUseCase
}
