import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

// End-to-end coverage boots the full AppModule, so it requires a valid
// environment (WEB_ORIGIN, DATABASE_URL). It is intentionally excluded from the
// default `pnpm test` unit suite and is run explicitly via `pnpm test:e2e`.
describe('Health (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  it('GET /api/v1/health returns a stable service status', () => {
    return request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200)
      .expect({ status: 'ok', service: 'nova-systems-lab-api' });
  });

  afterEach(async () => {
    await app.close();
  });
});
