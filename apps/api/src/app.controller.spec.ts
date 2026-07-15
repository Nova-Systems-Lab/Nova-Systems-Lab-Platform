import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import type { HealthResponse } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const healthResponse: HealthResponse = {
    status: 'ok',
    service: 'nova-api',
    database: 'up',
    timestamp: '2026-07-15T00:00:00.000Z',
  };

  const appServiceMock = {
    getHealth: jest.fn<Promise<HealthResponse>, []>(),
  };

  beforeEach(async () => {
    appServiceMock.getHealth.mockResolvedValue(healthResponse);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appServiceMock,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('health', () => {
    it('should return API and database health status', async () => {
      await expect(appController.getHealth()).resolves.toEqual(healthResponse);
      expect(appServiceMock.getHealth).toHaveBeenCalledTimes(1);
    });
  });
});
