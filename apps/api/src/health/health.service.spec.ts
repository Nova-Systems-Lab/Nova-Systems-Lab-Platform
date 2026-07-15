import { ServiceUnavailableException } from '@nestjs/common';
import { database } from '@nova/database';
import { HealthService } from './health.service';

// Replace the shared database package so unit tests never construct a real
// Prisma client or require a live Neon connection.
jest.mock('@nova/database', () => ({
  database: {
    $queryRaw: jest.fn(),
  },
}));

// Typed as a plain mock property (not a method) so the reference does not trip
// the unbound-method lint rule.
const mockDatabase = database as unknown as {
  $queryRaw: jest.Mock;
};

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(() => {
    service = new HealthService();
    mockDatabase.$queryRaw.mockReset();
  });

  describe('getStatus', () => {
    it('returns a stable service status without touching the database', () => {
      expect(service.getStatus()).toEqual({
        status: 'ok',
        service: 'nova-systems-lab-api',
      });
      expect(mockDatabase.$queryRaw).not.toHaveBeenCalled();
    });
  });

  describe('checkDatabase', () => {
    it('reports the database as up when connectivity succeeds', async () => {
      mockDatabase.$queryRaw.mockResolvedValue([{ result: 1 }]);

      await expect(service.checkDatabase()).resolves.toEqual({
        status: 'ok',
        database: 'up',
      });
      expect(mockDatabase.$queryRaw).toHaveBeenCalledTimes(1);
    });

    it('throws ServiceUnavailable when connectivity fails', async () => {
      mockDatabase.$queryRaw.mockRejectedValue(new Error('connection refused'));

      await expect(service.checkDatabase()).rejects.toBeInstanceOf(
        ServiceUnavailableException,
      );
    });

    it('does not leak connection details in the failure response', async () => {
      mockDatabase.$queryRaw.mockRejectedValue(
        new Error('postgresql://user:secret@db.example.com/nova'),
      );

      let caught: unknown;
      try {
        await service.checkDatabase();
      } catch (error) {
        caught = error;
      }

      expect(caught).toBeInstanceOf(ServiceUnavailableException);
      expect((caught as ServiceUnavailableException).getResponse()).toEqual({
        status: 'error',
        database: 'down',
      });
    });
  });
});
