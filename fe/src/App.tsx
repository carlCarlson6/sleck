import { ClerkSeamProvider } from './providers/ClerkSeamProvider';
import { useClerkSeamAuth } from './providers/clerkSeamAuth';
import { QueryProvider } from './providers/QueryProvider';
import { TrpcProvider } from './providers/TrpcProvider';
import { SignedInLayout } from './layouts/SignedInLayout';
import { SignedOutLayout } from './layouts/SignedOutLayout';
import { LoadingLayout } from './layouts/LoadingLayout';
import { EmptyStateLayout } from './layouts/EmptyStateLayout';

import { useAppState } from './state/appState';
import { ServerDiscovery } from './ServerDiscovery';
import { trpc } from './api/trpc';
import * as React from 'react';

function AppShell() {
  const { isLoaded, isSignedIn } = useClerkSeamAuth();
  const isLoading = !isLoaded;
  const { currentServerId, setCurrentServerId } = useAppState();
  const { data: myServers, isLoading: isServersLoading, isError: isServersError } = trpc.servers.listMine.useQuery();

  // Always call hooks unconditionally
  React.useEffect(() => {
    if (!currentServerId && myServers && myServers.length > 0) {
      setCurrentServerId(myServers[0].id);
    }
  }, [currentServerId, myServers, setCurrentServerId]);

  // UI state logic
  if (isLoading || isServersLoading) return <LoadingLayout />;
  if (!isSignedIn) return <SignedOutLayout />;
  if (isServersError) {
    return <SignedInLayout><EmptyStateLayout><div role="alert" style={{color:'red'}}>Error loading servers</div></EmptyStateLayout></SignedInLayout>;
  }

  // If user has not joined any servers, show discovery as main content
  if (!myServers || myServers.length === 0) {
    return (
      <SignedInLayout>
        <EmptyStateLayout>
          <ServerDiscovery />
        </EmptyStateLayout>
      </SignedInLayout>
    );
  }

  if (!currentServerId) {
    return <LoadingLayout />;
  }

  // Otherwise, show main app content (placeholder for now)
  return (
    <SignedInLayout>
      {/* TODO: Replace with server/channel experience */}
      <div>Welcome to Sleck!</div>
    </SignedInLayout>
  );
}

function App() {
  return (
    <ClerkSeamProvider>
      <QueryProvider>
        <TrpcProvider>
          <AppShell />
        </TrpcProvider>
      </QueryProvider>
    </ClerkSeamProvider>
  );
}

export default App;
