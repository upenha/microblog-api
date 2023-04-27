import fastify from 'fastify'

import { HealthController } from './controllers/health.controller'

import { ViewUserController } from './controllers/viewUser.controller'
import { CreateUserController } from './controllers/createUser.controller'
import { LoginUserController } from './controllers/loginUser.controller'

import { CreatePostController } from './controllers/createPost.controller'

const app = fastify({
  logger: true,
})

app.get('/health', new HealthController().handle)

// User Logic
app.post('/user/view', new ViewUserController().handle)
app.post('/user/register', new CreateUserController().handle)
app.post('/user/login', new LoginUserController().handle)

// Post Logic
app.post('/post/new', new CreatePostController().handle)

app.listen({ port: 666 })
