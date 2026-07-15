import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseLifecycleService } from './database/database-lifecycle.service';
import { HealthModule } from './health/health.module';
import { validateEnvironment } from './config/environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironment,
    }),
    HealthModule,
  ],
  providers: [DatabaseLifecycleService],
})
export class AppModule {}
