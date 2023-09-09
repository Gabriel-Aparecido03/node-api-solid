import { app } from '@/app'
import request from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be abel to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
