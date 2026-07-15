import { z } from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  PORT: z.coerce.number().int().min(1).max(65535).default(4000),

  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required')
    .refine(
      (value) =>
        value.startsWith('postgresql://') || value.startsWith('postgres://'),
      {
        message: 'DATABASE_URL must be a PostgreSQL connection URL',
      },
    ),

  WEB_ORIGIN: z.string().url(),
});

export type EnvironmentVariables = z.infer<typeof environmentSchema>;

export function validateEnvironment(
  configuration: Record<string, unknown>,
): EnvironmentVariables {
  const result = environmentSchema.safeParse(configuration);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => {
        const path = issue.path.join('.') || 'environment';
        return `${path}: ${issue.message}`;
      })
      .join('\n');

    throw new Error(`Invalid environment configuration:\n${details}`);
  }

  return result.data;
}
