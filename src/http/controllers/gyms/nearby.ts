import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymUseCase } from '@/use-cases/factories/make-fetch-nearby-gym-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsBodySchema.parse(request.query)

  const fetchNearbyGymUseCase = await makeFetchNearbyGymUseCase()

  const { gyms } = await fetchNearbyGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}
