import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  app.enableShutdownHooks();

  app.enableCors({
    origin: configService.getOrThrow<string>('WEB_ORIGIN'),
    credentials: true,
  });

  const port = Number(process.env.PORT ?? 4000);

  await app.listen(port, '0.0.0.0');

  console.log(`Nova API running on http://localhost:${port}`);
}

void bootstrap();
