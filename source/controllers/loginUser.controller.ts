import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { LoginUserService } from '../services/loginUser.service'

export class LoginUserController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      const service = new LoginUserService()
      const loginSchema = z.object({
        email: z.string(),
        password: z.string(),
      })

      const { email, password } = loginSchema.parse(req.body)

      const user = await service.execute({ email, password })
      return res.status(201).send({
        user,
      })
    } catch (err) {
      console.log(err)
      return res.send({
        error: 'Wrong credentials',
      })
    }
  }
}
