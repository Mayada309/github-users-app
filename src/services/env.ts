import { z } from 'zod';

const envSchema = z.object({
  GITHUB_API: z.url()
});

const env = envSchema.parse({
  GITHUB_API: import.meta.env.VITE_GITHUB_API,
});

export const GITHUB_API = env.GITHUB_API;
