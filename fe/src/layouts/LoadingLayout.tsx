import type { ReactNode } from 'react';

export function LoadingLayout({ children }: { children?: ReactNode }) {
  return (
    <div role="status" aria-busy="true" tabIndex={-1} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <span>Loading…</span>
        {children}
      </div>
    </div>
  );
}
