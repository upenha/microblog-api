import { Posts } from '@prisma/client'
import { database } from '../database'

interface ViewUserServiceRequest {
  handler: string
}

interface UserWithoutToken {
  handler: string
  id: string
  email: string
  createdAt: Date
  posts: Posts[]
  updatedAt: Date
}

interface ViewUserServiceResponse {
  user: UserWithoutToken | null
}

export class ViewUserService {
  async execute({
    handler,
  }: ViewUserServiceRequest): Promise<ViewUserServiceResponse> {
    const user = await database.user.findFirst({
      where: {
        handler,
      },
      select: {
        id: true,
        email: true,
        handler: true,
        createdAt: true,
        updatedAt: true,
        posts: true,
        token: false,
        password: false,
      },
    })

    return {
      user,
    }
  }
}
