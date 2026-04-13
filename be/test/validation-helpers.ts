import { z } from 'zod';

declare global {
  // eslint-disable-next-line no-var
  var __TEST_DATABASE_URL__: string | undefined;
}
if (!process.env.DATABASE_URL) {
  (globalThis as any).__TEST_DATABASE_URL__ = 'postgres://user:pass@localhost:5432/sleck_test';
}

export function expectZodError(fn: () => any) {
  try {
    fn();
  } catch (e) {
    if (e instanceof z.ZodError) {
      return e;
    }
    throw e;
  }
  throw new Error('Expected ZodError');
}
