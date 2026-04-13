import { appRouter } from '../src/trpc/root';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

describe('appRouter', () => {
  it('should be defined and empty for now', () => {
    expect(appRouter).toBeDefined();
    // The router is empty at foundation, but type-safe
    // Type checks only
    type Inputs = inferRouterInputs<typeof appRouter>;
    type Outputs = inferRouterOutputs<typeof appRouter>;
    expect(typeof appRouter).toBe('object');
  });
});
