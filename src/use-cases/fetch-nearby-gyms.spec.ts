import { InMemoryGymRepository } from '@/repositores/in-memory/in-memory-gyms-repository'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { FetchNearbyUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymRepository
let sut: FetchNearbyUseCase

describe('Serch Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new FetchNearbyUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -23.490432,
      longitude: -47.503551,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: 23.490432,
      longitude: 47.503551,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.490432,
      userLongitude: -47.503551,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
