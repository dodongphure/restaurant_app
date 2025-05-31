import { router, publicProcedure } from '../trpc';
import { restaurantRouter } from './restaurantRouter';

export const appRouter = router({
  restaurant: restaurantRouter,
  health: publicProcedure.query(() => 'ok'),
});

export type AppRouter = typeof appRouter;