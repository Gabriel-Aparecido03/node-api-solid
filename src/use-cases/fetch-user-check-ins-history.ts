import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositores/check-ins-repository'

interface FetchUsersCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUsersCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUsersCheckInsHistoryUseCaseRequest): Promise<FetchUsersCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
