import './auth-helpers';
import { createContext, getUserFromRequest } from '../src/trpc/context';

describe('tRPC context', () => {
  it('reads the user id from the request header', async () => {
    const user = await getUserFromRequest({
      headers: { 'x-user-id': 'user-123' },
    } as any);

    expect(user).toEqual({ id: 'user-123' });
  });

  it('returns null when the request is unauthenticated', async () => {
    const user = await getUserFromRequest({
      headers: {},
    } as any);

    expect(user).toBeNull();
  });

  it('builds the tRPC context with the resolved user', async () => {
    const ctx = await createContext({
      req: { headers: { 'x-user-id': 'user-456' } } as any,
      res: {} as any,
    });

    expect(ctx.user).toEqual({ id: 'user-456' });
    expect(ctx.db).toBeDefined();
  });
});
