import { app } from '@/app'
import { createAndAuthtenticatedUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'

describe('Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create  a gym', async () => {
    const { token } = await createAndAuthtenticatedUser(app, true)

    const profileResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym-01',
        description: 'gym-01-01',
        phone: '1231341234',
        latitude: -23.490432,
        longitude: -47.503551,
      })

    expect(profileResponse.statusCode).toEqual(201)
  })
})
