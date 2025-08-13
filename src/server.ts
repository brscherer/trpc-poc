import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './router';

const app = express();
app.use(cors());

app.use('/trpc', createExpressMiddleware({ router: appRouter }));

const port = 3000;
app.listen(port, () => {
  console.log(`tRPC server running at http://localhost:${port}/trpc`);
});