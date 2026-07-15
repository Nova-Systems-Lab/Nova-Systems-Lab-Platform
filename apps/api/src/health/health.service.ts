import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { database } from '@nova/database';

export interface ServiceHealth {
  status: 'ok';
  service: 'nova-systems-lab-api';
}

export interface DatabaseHealth {
  status: 'ok';
  database: 'up';
}

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  /**
   * Liveness signal for the API process itself. Intentionally does not touch
   * the database so that the general health check stays fast and stable and
   * exposes no infrastructure details.
   */
  getStatus(): ServiceHealth {
    return {
      status: 'ok',
      service: 'nova-systems-lab-api',
    };
  }

  /**
   * Readiness signal for database connectivity. Reports only whether a trivial
   * query succeeds; connection strings and error internals are never returned
   * to the client and never logged.
   */
  async checkDatabase(): Promise<DatabaseHealth> {
    try {
      await database.$queryRaw`SELECT 1`;

      return {
        status: 'ok',
        database: 'up',
      };
    } catch (error) {
      // Log only the error class name to avoid leaking connection details
      // (which may include DATABASE_URL) into logs.
      const name = error instanceof Error ? error.name : 'UnknownError';
      this.logger.warn(`Database health check failed (${name}).`);

      throw new ServiceUnavailableException({
        status: 'error',
        database: 'down',
      });
    }
  }
}
