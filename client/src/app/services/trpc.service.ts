import { Injectable } from '@angular/core';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { environment } from '../../environments/environment';
import superjson from 'superjson';
import { AppRouter } from './../../../../api/src/routers/_app';

@Injectable({
  providedIn: 'root',
})
export class TrpcService {
  public client = createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: environment.apiUrl + '/trpc',
        transformer: superjson,
      }),
    ],
  });
}
