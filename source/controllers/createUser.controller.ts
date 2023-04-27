import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserService } from '../services/createUser.service'
import { z } from 'zod'

export class CreateUserController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const service = new CreateUserService()
    const userSchema = z.object({
      email: z.string(),
      handler: z.string(),
      password: z.string(),
    })

    const { email, handler, password } = userSchema.parse(req.body)

    const { user } = await service.execute({ email, handler, password })
    return res.status(201).send({
      user,
    })
  }
}
