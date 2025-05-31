import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routers/_app';
import { createContext } from './trpc';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file

const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Configure CORS as needed for your frontend
app.use(express.json()); // To parse JSON bodies

app.use(
  '/trpc', // Your tRPC endpoint prefix
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
  console.log(`🚀 Server listening at http://localhost:${port}`);
  console.log(`💡 tRPC available at http://localhost:${port}/trpc`);
});