import { InMemoryGymRepository } from '@/repositores/in-memory/in-memory-gyms-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepostiory: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepostiory = new InMemoryGymRepository()
    sut = new CreateGymUseCase(gymsRepostiory)
  })
  it('should be to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Lorem',
      description: null,
      phone: null,
      latitude: -23.490432,
      longitude: -47.503551,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
