import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gym-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const createGymQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = createGymQuerySchema.parse(request.query)

  const createGymUseCase = await makeSearchGymUseCase()

  const { gyms } = await createGymUseCase.execute({
    page,
    query: q,
  })

  return reply.status(200).send({ gyms })
}
