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

  it('should be able to validate a check-in', async () => {
    const { token } = await createAndAuthtenticatedUser(app, true)
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

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: id,
        user_id: user.id,
      },
    })

    const profileResponse = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
