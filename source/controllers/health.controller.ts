import { FastifyReply, FastifyRequest } from 'fastify'
import { HealthService } from '../services/health.service'

export class HealthController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const service = new HealthService()

    const status = await service.execute()

    return status
  }
}
