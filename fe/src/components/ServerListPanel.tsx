import { useEffect } from 'react';
import { useServerListState } from './serverState';

// Placeholder for backend contract. Replace with TanStack Query/trpc when available.
type Server = {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  ownerId: string;
  memberCount: number;
  joined: boolean;
  inviteCode?: string;
};

async function fetchServers(): Promise<Server[]> {
  // Simulate API call
  return [
    {
      id: '1',
      name: 'Public Devs',
      description: 'A public server for devs',
      isPublic: true,
      ownerId: 'user1',
      memberCount: 42,
      joined: true,
    },
    {
      id: '2',
      name: 'Private Team',
      description: 'Private team server',
      isPublic: false,
      ownerId: 'user2',
      memberCount: 5,
      joined: false,
    },
  ];
}

export function ServerListPanel() {
  const state = useServerListState();

  useEffect(() => {
    state.setLoading(true);
    fetchServers()
      .then((servers) => {
        state.setServers(servers);
        state.setError(null);
      })
      .catch(() => {
        state.setError('Failed to load servers');
      })
      .finally(() => {
        state.setLoading(false);
      });
  }, []);

  if (state.loading) return <div className="server-list-panel" aria-busy="true">Loading servers…</div>;
  if (state.error) return <div className="server-list-panel error" role="alert">{state.error}</div>;
  if (!state.servers.length) return <div className="server-list-panel empty">No servers found.</div>;

  return (
    <nav className="server-list-panel" aria-label="Server list">
      <ul>
        {state.servers.map((server) => (
          <li key={server.id}>
            <button
              className={server.joined ? 'joined' : 'not-joined'}
              aria-current={state.selectedServerId === server.id ? 'page' : undefined}
              onClick={() => state.selectServer(server.id)}
            >
              <span className="server-name">{server.name}</span>
              {server.isPublic && <span className="badge public">public</span>}
              {!server.isPublic && <span className="badge private">private</span>}
              {server.joined ? null : <span className="badge join">join</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
