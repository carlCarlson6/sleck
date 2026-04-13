import * as React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { getTrpcBaseUrl, trpc } from '../api/trpc';
import { useClerkSeamAuth } from './clerkSeamAuth';

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { userId } = useClerkSeamAuth();
  const client = React.useMemo(
    () =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: `${getTrpcBaseUrl()}/trpc`,
            headers() {
              return userId ? { 'x-user-id': userId } : {};
            },
          }),
        ],
      }),
    [userId],
  );

  return (
    <trpc.Provider client={client} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  );
}
