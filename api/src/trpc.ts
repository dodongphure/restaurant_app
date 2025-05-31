import { initTRPC } from '@trpc/server';
import { type CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { prisma } from './db';

// Context creation for each request
// Here we can inject things like Prisma client, or session data from auth
export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  // For now, we'll just pass Prisma.
  // In a real app, you'd get user from `req` (e.g., from a session or token)
  // const user = getUserFromHeader(req.headers);
  // return { prisma, user };
  return { prisma, req, res };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
