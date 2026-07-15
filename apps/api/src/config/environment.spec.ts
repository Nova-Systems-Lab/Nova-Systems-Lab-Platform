import { validateEnvironment } from './environment';

describe('validateEnvironment', () => {
  const baseEnv = {
    NODE_ENV: 'development',
    PORT: '4000',
    DATABASE_URL: 'postgresql://user:pass@localhost:5432/nova',
    WEB_ORIGIN: 'http://localhost:3000',
  };

  it('accepts a valid environment and coerces PORT to a number', () => {
    const result = validateEnvironment(baseEnv);

    expect(result.NODE_ENV).toBe('development');
    expect(result.PORT).toBe(4000);
    expect(result.DATABASE_URL).toBe(baseEnv.DATABASE_URL);
    expect(result.WEB_ORIGIN).toBe(baseEnv.WEB_ORIGIN);
  });

  it('applies defaults for optional variables', () => {
    const result = validateEnvironment({
      DATABASE_URL: baseEnv.DATABASE_URL,
      WEB_ORIGIN: baseEnv.WEB_ORIGIN,
    });

    expect(result.NODE_ENV).toBe('development');
    expect(result.PORT).toBe(4000);
  });

  it('rejects a missing DATABASE_URL', () => {
    expect(() =>
      validateEnvironment({ WEB_ORIGIN: baseEnv.WEB_ORIGIN }),
    ).toThrow(/DATABASE_URL/);
  });

  it('rejects a non-PostgreSQL DATABASE_URL', () => {
    expect(() =>
      validateEnvironment({ ...baseEnv, DATABASE_URL: 'mysql://host/db' }),
    ).toThrow(/PostgreSQL/);
  });

  it('rejects an invalid WEB_ORIGIN', () => {
    expect(() =>
      validateEnvironment({ ...baseEnv, WEB_ORIGIN: 'not-a-url' }),
    ).toThrow();
  });

  it('rejects an out-of-range PORT', () => {
    expect(() => validateEnvironment({ ...baseEnv, PORT: '70000' })).toThrow();
  });
});
