import type { ReactNode } from 'react';

export function SignedInLayout({ children }: { children: ReactNode }) {
  // TODO: Add navigation shell, server/channel list, etc.
  return (
    <div role="main" tabIndex={-1} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sleck app shell header could go here */}
      {children}
    </div>
  );
}
