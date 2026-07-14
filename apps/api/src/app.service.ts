import { Injectable } from '@nestjs/common';

export interface HealthResponse {
  status: 'ok';
  service: 'nova-api';
  timestamp: string;
}

@Injectable()
export class AppService {
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: 'nova-api',
      timestamp: new Date().toISOString(),
    };
  }
}