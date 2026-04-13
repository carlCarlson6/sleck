import { router } from './context';
import { serversRouter } from './servers';

export const appRouter = router({
  servers: serversRouter,
});

export type AppRouter = typeof appRouter;
