import { PrismaClient } from './generated/prisma';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'], // Optional: for debugging
  });

if (process.env['NODE_ENV'] !== 'production') {
  global.prisma = prisma;
}