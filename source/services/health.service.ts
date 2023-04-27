interface HealthResponse {
  status: string
}

export class HealthService {
  async execute(): Promise<HealthResponse> {
    return {
      status: 'ok',
    }
  }
}
