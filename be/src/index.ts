import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Sleck backend listening on port ${port}`);
});
