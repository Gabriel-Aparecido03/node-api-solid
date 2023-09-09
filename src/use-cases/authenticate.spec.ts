import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsErrors } from './erros/invalid-credentials-error'
import { InMemoryUsersRepository } from '@/repositores/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('should be authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johnDoe@test.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johnDoe@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be not to able authenticate with wrong email', async () => {
    expect(
      async () =>
        await sut.execute({
          email: 'johnDoe@test.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsErrors)
  })

  it('should be not to able authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johnDoe@test.com',
      password_hash: await hash('123456', 6),
    })

    expect(
      async () =>
        await sut.execute({
          email: 'johnDoe@test.com',
          password: '123123',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsErrors)
  })
})
