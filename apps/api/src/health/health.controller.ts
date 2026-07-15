import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import type { DatabaseHealth, ServiceHealth } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): ServiceHealth {
    return this.healthService.getStatus();
  }

  @Get('database')
  getDatabaseHealth(): Promise<DatabaseHealth> {
    return this.healthService.checkDatabase();
  }
}
