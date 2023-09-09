import { CheckInsRepository } from '@/repositores/check-ins-repository'
import { ResourceNotFound } from './erros/resource-not-found-erro'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './erros/late-check-in-validation-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ checkInId }: ValidateCheckInUseCaseRequest) {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
