import { ClerkSeamProvider } from './providers/ClerkSeamProvider';
import { QueryProvider } from './providers/QueryProvider';
import { TrpcProvider } from './providers/TrpcProvider';
import { SignedInLayout } from './layouts/SignedInLayout';
import { SignedOutLayout } from './layouts/SignedOutLayout';
import { LoadingLayout } from './layouts/LoadingLayout';
import { EmptyStateLayout } from './layouts/EmptyStateLayout';
// import { useAppState } from './state/appState';

// TODO: Replace with real auth state
const isSignedIn = false;
const isLoading = false;
const isEmpty = false;

function App() {
  // Example: useAppState for current server/channel
  // const { currentServerId, setCurrentServerId } = useAppState();

  return (
    <ClerkSeamProvider>
      <QueryProvider>
        <TrpcProvider>
          {isLoading ? (
            <LoadingLayout />
          ) : isSignedIn ? (
            <SignedInLayout>
              {isEmpty ? <EmptyStateLayout /> : <div>Welcome to Sleck!</div>}
            </SignedInLayout>
          ) : (
            <SignedOutLayout />
          )}
        </TrpcProvider>
      </QueryProvider>
    </ClerkSeamProvider>
  );
}

export default App;
