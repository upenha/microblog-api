import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ViewUserService } from '../services/viewUser.service'

export class ViewUserController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const service = new ViewUserService()
    const profileSchema = z.object({
      handler: z.string(),
    })

    const { handler } = profileSchema.parse(req.body)

    const { user } = await service.execute({ handler })
    return res.status(201).send({
      user,
    })
  }
}
