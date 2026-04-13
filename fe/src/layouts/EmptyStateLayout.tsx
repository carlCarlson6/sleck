import type { ReactNode } from 'react';

export function EmptyStateLayout({ children }: { children?: ReactNode }) {
  return (
    <div role="main" tabIndex={-1} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <h2>No content yet</h2>
        <p>Nothing to show here. Select a server or channel to get started.</p>
        {children}
      </div>
    </div>
  );
}
