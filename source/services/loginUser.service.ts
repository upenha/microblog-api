import { database } from '../database'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface LoginUserServiceRequest {
  email: string
  password: string
}

export class LoginUserService {
  async execute({ email, password }: LoginUserServiceRequest) {
    const user = await database.user.findUnique({
      where: {
        email,
      },
    })

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.SECURITY_TOKEN,
      )

      const userNew = await database.user.update({
        where: {
          email,
        },
        data: {
          token,
        },
      })

      return userNew
    }
  }
}
