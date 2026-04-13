import './env';
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc/root';
import { createContext } from './trpc/context';

const app = express();
const port = process.env.PORT || 4000;

// Health endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// tRPC endpoint (empty router for now)
app.use('/trpc', trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
}));

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
