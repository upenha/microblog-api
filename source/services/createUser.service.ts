import { database } from '../database'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'

interface CreateUserServiceRequest {
  email: string
  handler: string
  password: string
}

interface CreateUserServiceResponse {
  user: {
    email: string
    handler: string
    id: string
    createdAt: Date
    updatedAt: Date
  }
}

export class CreateUserService {
  async execute({
    email,
    handler,
    password,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    try {
      const encryptedPassword = await bcrypt.hash(password, 12)
      const id = uuidv4()
      const token = jwt.sign({ user_id: id, email }, process.env.SECURITY_TOKEN)
      const user = await database.user.create({
        data: {
          id,
          email,
          handler,
          password: encryptedPassword,
          token,
        },
        select: {
          id: true,
          email: true,
          handler: true,
          createdAt: true,
          updatedAt: true,
          posts: false,
          token: false,
          password: false,
        },
      })
      return {
        user,
      }
    } catch (err) {
      console.log(err)
      throw new Error('Not created')
    }
  }
}
