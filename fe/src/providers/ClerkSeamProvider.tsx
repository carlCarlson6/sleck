// Thin seam for Clerk integration, to be replaced with real Clerk provider later
export function ClerkSeamProvider({ children }: { children: React.ReactNode }) {
  // TODO: Replace with ClerkProvider when wiring real auth
  return <>{children}</>;
}
