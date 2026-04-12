import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

// Empty router for now, ready for later extension
export const appRouter = t.router({});

export type AppRouter = typeof appRouter;
