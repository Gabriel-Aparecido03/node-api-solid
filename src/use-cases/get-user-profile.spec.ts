import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFound } from './erros/resource-not-found-erro'
import { InMemoryUsersRepository } from '@/repositores/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })
  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johnDoe@test.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should be not to able get user profile wiht wroing id', async () => {
    expect(
      async () =>
        await sut.execute({
          userId: 'not-existing-id',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
