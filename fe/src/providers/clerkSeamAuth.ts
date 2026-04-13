import * as React from 'react';

const demoUserId = import.meta.env.VITE_DEMO_USER_ID || '00000000-0000-0000-0000-000000000001';

export type ClerkSeamAuth = {
  isLoaded: boolean;
  isSignedIn: boolean;
  userId: string;
};

export const clerkSeamAuthValue: ClerkSeamAuth = {
  isLoaded: true,
  isSignedIn: true,
  userId: demoUserId,
};

export const ClerkSeamContext = React.createContext<ClerkSeamAuth>(clerkSeamAuthValue);

export function useClerkSeamAuth() {
  return React.useContext(ClerkSeamContext);
}
