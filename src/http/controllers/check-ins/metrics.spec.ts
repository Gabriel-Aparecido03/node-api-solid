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

  it('should be able to list the total count of check-ins', async () => {
    const { token } = await createAndAuthtenticatedUser(app)
    const user = await prisma.user.findFirstOrThrow()

    const { id } = await prisma.gym.create({
      data: {
        title: 'gym-01',
        description: 'gym-01-01',
        phone: '1231341234',
        latitude: -23.490432,
        longitude: -47.503551,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: id,
          user_id: user.id,
        },
        {
          gym_id: id,
          user_id: user.id,
        },
      ],
    })

    const profileResponse = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.checkInsCount).toEqual(2)
  })
})
