import { InMemoryGymRepository } from '@/repositores/in-memory/in-memory-gyms-repository'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { SearchGymUseCase } from './gym-search'

let gymsRepository: InMemoryGymRepository
let sut: SearchGymUseCase

describe('Serch Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to serach for gyms', async () => {
    await gymsRepository.create({
      title: '01 gym',
      description: null,
      phone: null,
      latitude: -23.490432,
      longitude: -47.503551,
    })

    await gymsRepository.create({
      title: '02 gym',
      description: null,
      phone: null,
      latitude: -23.490432,
      longitude: -47.503551,
    })

    const { gyms } = await sut.execute({
      query: '01',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: '01 gym' })])
  })

  it('should be able to fectch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `gym-${i}`,
        description: null,
        phone: null,
        latitude: -23.490432,
        longitude: -47.503551,
      })
    }

    const { gyms } = await sut.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'gym-21' }),
      expect.objectContaining({ title: 'gym-22' }),
    ])
  })
})
