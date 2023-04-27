import { FastifyReply, FastifyRequest } from 'fastify'
import { CreatePostService } from '../services/createPost.service'
import { z } from 'zod'

export class CreatePostController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const service = new CreatePostService()
    const postSchema = z.object({
      content: z.string(),
      token: z.string(),
    })

    const { content, token } = postSchema.parse(req.body)

    const { post } = await service.execute({ content, token })
    return res.status(201).send({
      post,
    })
  }
}
