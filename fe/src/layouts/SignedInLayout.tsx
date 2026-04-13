import * as React from 'react';
import { ServerListNav } from '../ServerListNav';
import { ServerCreateForm } from '../ServerCreateForm';

export function SignedInLayout({ children }: { children: React.ReactNode }) {
  const [showCreate, setShowCreate] = React.useState(false);
  return (
    <div role="main" tabIndex={-1} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      <aside style={{ width: 260, borderRight: '1px solid #eee', padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.2em' }}>Servers</h2>
          <button
            type="button"
            aria-label="Create server"
            onClick={() => setShowCreate((v) => !v)}
            style={{ fontSize: '1.2em', padding: '0 0.5em', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ＋
          </button>
        </div>
        <ServerListNav />
        {showCreate && (
          <div style={{ marginTop: 16 }}>
            <ServerCreateForm onSuccess={() => setShowCreate(false)} />
          </div>
        )}
      </aside>
      <div style={{ flex: 1, minWidth: 0, padding: 24 }}>{children}</div>
    </div>
  );
}
