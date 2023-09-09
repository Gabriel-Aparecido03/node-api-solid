import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthtenticatedUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'

describe('CheckIn (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthtenticatedUser(app)

    const { id } = await prisma.gym.create({
      data: {
        title: 'gym-01',
        description: 'gym-01-01',
        phone: '1231341234',
        latitude: -23.490432,
        longitude: -47.503551,
      },
    })

    const profileResponse = await request(app.server)
      .post(`/gyms/${id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.490432,
        longitude: -47.503551,
      })

    expect(profileResponse.statusCode).toEqual(201)
  })
})
