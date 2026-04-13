import * as React from 'react';
import { ClerkSeamContext, clerkSeamAuthValue } from './clerkSeamAuth';

// Thin seam for Clerk integration, to be replaced with real Clerk provider later
export function ClerkSeamProvider({ children }: { children: React.ReactNode }) {
  const value = React.useMemo(() => clerkSeamAuthValue, []);

  return <ClerkSeamContext.Provider value={value}>{children}</ClerkSeamContext.Provider>;
}
