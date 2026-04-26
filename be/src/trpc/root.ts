import { router, publicProcedure, protectedProcedure } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  publicHello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return { message: `Hello, ${input.name ?? 'world'}!` };
    }),

  whoami: protectedProcedure
    .query(({ ctx }) => {
      // ctx.user is guaranteed to be present
      return {
        id: ctx.user.id,
        email: ctx.user.email,
        profile: ctx.user.clerkUser,
      };
    }),
});

export type AppRouter = typeof appRouter;
