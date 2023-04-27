import { database } from '../database'
import { v4 as uuidv4 } from 'uuid'
import { Posts, User } from '@prisma/client'

interface CreatePostServiceRequest {
  content: string
  token: string
}

interface CreatePostServiceResponse {
  post: Posts
}

export class CreatePostService {
  async execute({
    content,
    token,
  }: CreatePostServiceRequest): Promise<CreatePostServiceResponse> {
    try {
      const user = (await database.user.findUnique({
        where: {
          token,
        },
      })) as User

      const post = await database.posts.create({
        data: {
          id: uuidv4(),
          content,
          userId: user.id,
        },
      })
      return {
        post,
      }
    } catch (err) {
      console.log(err)
      throw new Error('Not created')
    }
  }
}
