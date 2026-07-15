import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import type { DatabaseHealth, ServiceHealth } from './health.service';

// Prevent the real database package from constructing a Prisma client when the
// health.service module is imported through the controller under test.
jest.mock('@nova/database', () => ({
  database: {
    $queryRaw: jest.fn(),
  },
}));

describe('HealthController', () => {
  let controller: HealthController;

  const serviceHealth: ServiceHealth = {
    status: 'ok',
    service: 'nova-systems-lab-api',
  };

  const databaseHealth: DatabaseHealth = {
    status: 'ok',
    database: 'up',
  };

  const healthServiceMock = {
    getStatus: jest.fn<ServiceHealth, []>(),
    checkDatabase: jest.fn<Promise<DatabaseHealth>, []>(),
  };

  beforeEach(async () => {
    healthServiceMock.getStatus.mockReturnValue(serviceHealth);
    healthServiceMock.checkDatabase.mockResolvedValue(databaseHealth);

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: HealthService, useValue: healthServiceMock }],
    }).compile();

    controller = moduleRef.get<HealthController>(HealthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns the stable service status', () => {
    expect(controller.getHealth()).toEqual(serviceHealth);
    expect(healthServiceMock.getStatus).toHaveBeenCalledTimes(1);
  });

  it('delegates database health to the service', async () => {
    await expect(controller.getDatabaseHealth()).resolves.toEqual(
      databaseHealth,
    );
    expect(healthServiceMock.checkDatabase).toHaveBeenCalledTimes(1);
  });
});
