import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { database } from '@nova/database';

@Injectable()
export class DatabaseLifecycleService implements OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseLifecycleService.name);

  async onApplicationShutdown(signal?: string): Promise<void> {
    this.logger.log(
      `Closing database connection${signal ? ` after ${signal}` : ''}.`,
    );

    await database.$disconnect();
  }
}
