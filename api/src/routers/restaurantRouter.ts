import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';

export const restaurantRouter = router({
  getRestaurants: publicProcedure
    .input(
      z.object({
        cursor: z.string().uuid().nullish(),
        limit: z.number().min(1).max(100).nullish(),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 10;
      const { cursor } = input ?? {};

      const items = await ctx.prisma.restaurant.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop(); // remove the extra item
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  setFavoriteStatus: publicProcedure
    .input(
      z.object({
        restaurantId: z.string().uuid({ message: "Invalid restaurant ID format. Expected UUID." }),
        isFavorite: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { restaurantId, isFavorite } = input;

      const restaurant = await ctx.prisma.restaurant.findUnique({
        where: { id: restaurantId },
      });
      if (!restaurant) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Restaurant with ID ${restaurantId} not found.`,
        });
      }

      const updatedRestaurant = await ctx.prisma.restaurant.update({
        where: { id: restaurantId },
        data: { isFavorite: isFavorite },
      });

      return {
        success: true,
        message: `Restaurant favorite status updated to ${isFavorite}.`,
        restaurant: updatedRestaurant,
      };
    }),
});