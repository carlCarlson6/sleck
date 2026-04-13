import type { ReactNode } from 'react';

export function SignedOutLayout({ children }: { children?: ReactNode }) {
  return (
    <div role="main" tabIndex={-1} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <h1>Sleck</h1>
        <p>You are signed out. Please sign in to continue.</p>
        {children}
      </div>
    </div>
  );
}
