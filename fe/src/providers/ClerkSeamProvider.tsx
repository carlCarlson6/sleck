import type { ReactNode } from 'react';

// Thin seam for Clerk integration, to be replaced with real Clerk provider later
export function ClerkSeamProvider({ children }: { children: ReactNode }) {
  // TODO: Replace with ClerkProvider when wiring real auth
  return <>{children}</>;
}
