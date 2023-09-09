import { describe, it, expect, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositores/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should be user registrer', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johnDoe@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johnDoe@test.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johnDoe@test.com',
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        name: 'John Doe',
        email: 'johnDoe@test.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
