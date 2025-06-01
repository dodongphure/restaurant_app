import { inject, Injectable } from '@angular/core';
import { Restaurant } from './../../../../api/src/generated/prisma/index.d';
import { TrpcService } from './trpc.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private readonly trpcService = inject(TrpcService);

  async getRestaurants(): Promise<Restaurant[]> {
    const result = await this.trpcService.client.restaurant.getRestaurants.query({});
    return result.items;
  }
}
