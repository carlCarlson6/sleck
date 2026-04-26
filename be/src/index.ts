import express from 'express';
import { clerkMiddleware } from '@clerk/express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpc/root';
import { createContext } from './trpc/context';

const app = express();
const port = process.env.PORT || 3001;

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/trpc', clerkMiddleware(), createExpressMiddleware({
  router: appRouter,
  createContext,
}));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Sleck backend listening on port ${port}`);
});
