import { UsersRepository } from '@/repositores/users-repository'
import { InvalidCredentialsErrors } from './erros/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'
import { ResourceNotFound } from './erros/resource-not-found-erro'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFound()
    }

    return { user }
  }
}
