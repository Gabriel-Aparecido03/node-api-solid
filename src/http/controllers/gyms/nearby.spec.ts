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

  it('should be able to find nearby gym', async () => {
    const { token } = await createAndAuthtenticatedUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym-01',
        description: 'gym-01-01',
        phone: '1231341234',
        latitude: -23.490432,
        longitude: -47.503551,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym-02',
        description: 'gym-01-01',
        phone: '1231341234',
        latitude: 23.490432,
        longitude: 47.503551,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -23.490432,
        longitude: -47.503551,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'gym-01',
      }),
    ])
  })
})
