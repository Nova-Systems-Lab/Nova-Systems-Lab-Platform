import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { database } from '@nova/database';

export interface HealthResponse {
  status: 'ok';
  service: 'nova-api';
  database: 'up';
  timestamp: string;
}

@Injectable()
export class AppService {
  async getHealth(): Promise<HealthResponse> {
    try {
      await database.$queryRaw`SELECT 1`;

      return {
        status: 'ok',
        service: 'nova-api',
        database: 'up',
        timestamp: new Date().toISOString(),
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        service: 'nova-api',
        database: 'down',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
