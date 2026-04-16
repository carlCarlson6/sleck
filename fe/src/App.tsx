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

function AppShell() {
  const { isLoaded, isSignedIn } = useClerkSeamAuth();
  const isLoading = !isLoaded;
  const { currentServerId } = useAppState();

  if (isLoading) return <LoadingLayout />;
  if (!isSignedIn) return <SignedOutLayout />;

  // If user has not joined any servers, show discovery as main content
  if (!currentServerId) {
    return (
      <SignedInLayout>
        <EmptyStateLayout>
          <ServerDiscovery />
        </EmptyStateLayout>
      </SignedInLayout>
    );
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
