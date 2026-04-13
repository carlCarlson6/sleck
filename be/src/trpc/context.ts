import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { db } from '../db';
import { z } from 'zod';
import type { Request } from 'express';

// Dummy auth for foundation; replace with real auth in later plans
export async function getUserFromRequest(req: Request) {
  // In real app, parse JWT/cookie/etc. Here, just use header for dev
  const userId = req.headers['x-user-id'] as string | undefined;
  return userId ? { id: userId } : null;
}

export async function createContext({ req, res }: { req: Request; res: any }) {
  const user = await getUserFromRequest(req);
  return { req, res, db, user };
}
export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) throw new Error('UNAUTHORIZED');
  return next({ ctx });
});
