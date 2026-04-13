import { ClerkSeamProvider } from './providers/ClerkSeamProvider';
import { useClerkSeamAuth } from './providers/clerkSeamAuth';
import { QueryProvider } from './providers/QueryProvider';
import { TrpcProvider } from './providers/TrpcProvider';
import { SignedInLayout } from './layouts/SignedInLayout';
import { SignedOutLayout } from './layouts/SignedOutLayout';
import { LoadingLayout } from './layouts/LoadingLayout';
import { EmptyStateLayout } from './layouts/EmptyStateLayout';

const isEmpty = false;

function AppShell() {
  const { isLoaded, isSignedIn } = useClerkSeamAuth();
  const isLoading = !isLoaded;

  return isLoading ? (
    <LoadingLayout />
  ) : isSignedIn ? (
    <SignedInLayout>
      {isEmpty ? <EmptyStateLayout /> : <div>Welcome to Sleck!</div>}
    </SignedInLayout>
  ) : (
    <SignedOutLayout />
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
