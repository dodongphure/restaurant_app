import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routers/_app';
import { createContext } from './trpc';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
    onError: ({ path, error }) => {
      console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
    },
  })
);

app.get('/', (req, res) => {
  res.send('Hello from tRPC Restaurant API!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});