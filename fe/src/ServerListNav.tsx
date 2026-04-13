import * as React from 'react';
import { trpc } from '../api/trpc';
import { useAppState } from '../state/appState';

type Server = {
  id: string;
  name: string;
  ownerId: string;
  visibility: 'public' | 'private';
  createdAt: string | Date;
};

export function ServerListNav() {
  const { data: servers, isLoading, isError } = trpc.servers.listMine.useQuery<Server[]>();
  const { currentServerId, setCurrentServerId } = useAppState();

  if (isLoading) return <nav aria-label="Servers">Loading servers...</nav>;
  if (isError) return <nav aria-label="Servers">Error loading servers</nav>;
  if (!servers || servers.length === 0) {
    return <nav aria-label="Servers">No servers yet</nav>;
  }

  return (
    <nav aria-label="Servers">
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {servers.map((server) => (
          <li key={server.id}>
            <button
              type="button"
              aria-current={currentServerId === server.id ? 'page' : undefined}
              onClick={() => setCurrentServerId(server.id)}
              style={{
                fontWeight: currentServerId === server.id ? 'bold' : undefined,
                background: 'none',
                border: 'none',
                padding: '0.5em 1em',
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              {server.name} <span style={{ fontSize: '0.8em', color: '#888' }}>({server.visibility})</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
