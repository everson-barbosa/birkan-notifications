import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_PUBLIC_KEY: z.string(),
  PORT: z.coerce.number().optional().default(3333),
  KAFKA_BROKERS: z.string().transform((value) => value.split(',')),
  KAFKA_GROUP_ID: z.string(),
});

export type Env = z.infer<typeof envSchema>;
