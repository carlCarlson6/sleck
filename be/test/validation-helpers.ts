import { z } from 'zod';

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
