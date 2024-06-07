import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets';
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel()],
  shared: {
    NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  },
  server: {
    PORT: z.coerce.number().default(3000),

    DATABASE_URL: z.string().url().startsWith('postgres'),

    UPLOADTHING_SECRET: z.string(),
    UPLOADTHING_APP_ID: z.string(),

    UNKEY_ROOT_KEY: z.string().optional(),
    UNKEY_NAMESPACE: z.string().optional(),

    AUTH_GITHUB_ID: z.string().optional(),
    AUTH_GITHUB_SECRET: z.string().optional(),

    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),
    AUTH_GOOGLE_CODE_VERIFIER: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env['NODE_ENV'],
    NEXT_PUBLIC_POSTHOG_KEY: process.env['NEXT_PUBLIC_POSTHOG_KEY'],
    NEXT_PUBLIC_POSTHOG_HOST: process.env['NEXT_PUBLIC_POSTHOG_HOST'],
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env['SKIP_ENV_VALIDATION'],
});
