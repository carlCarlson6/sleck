import express from 'express';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpc/root';
import { createContext } from './trpc/context';

const app = express();
const port = process.env.PORT || 3001;

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/trpc', ClerkExpressWithAuth(), createExpressMiddleware({
  router: appRouter,
  createContext,
}));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Sleck backend listening on port ${port}`);
});
