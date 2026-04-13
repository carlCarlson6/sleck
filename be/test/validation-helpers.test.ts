import { expectZodError } from './validation-helpers';
import { z } from 'zod';

describe('validation-helpers', () => {
  it('should catch ZodError', () => {
    const schema = z.object({ foo: z.string() });
    const fn = () => schema.parse({ foo: 123 });
    const err = expectZodError(fn);
    expect(err).toBeInstanceOf(z.ZodError);
  });
});
