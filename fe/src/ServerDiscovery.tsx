import * as React from 'react';
import { trpc } from './api/trpc';
import { useAppState } from './state/appState';

export function ServerDiscovery() {
  const utils = trpc.useUtils?.() ?? {};
  const { data: publicServers, isLoading, isError, refetch } = trpc.servers.listPublic.useQuery();
  const { data: myServers } = trpc.servers.listMine.useQuery();
  const joinMutation = trpc.servers.joinPublic.useMutation();
  const { setCurrentServerId } = useAppState();

  // Set of server IDs the user is already a member of
  const joinedIds = React.useMemo(() => new Set(myServers?.map(s => s.id)), [myServers]);

  function handleJoin(serverId: string) {
    joinMutation.mutate(
      { serverId },
      {
        onSuccess: (server) => {
          utils.servers?.listMine?.invalidate?.();
          refetch();
          setCurrentServerId(server.id);
        },
      }
    );
  }

  if (isLoading) {
    return <section aria-label="Discover public servers" style={{ padding: 16 }}><span>Loading public servers…</span></section>;
  }
  if (isError) {
    return <section aria-label="Discover public servers" style={{ padding: 16 }}><span role="alert" style={{ color: 'red' }}>Error loading public servers</span></section>;
  }
  if (!publicServers || publicServers.length === 0) {
    return <section aria-label="Discover public servers" style={{ padding: 16 }}><span>No public servers found.</span></section>;
  }

  return (
    <section aria-label="Discover public servers" style={{ padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>Discover public servers</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {publicServers.map(server => {
          const joined = joinedIds.has(server.id);
          return (
            <li key={server.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 1 }}>
                <strong>{server.name}</strong>
                <span style={{ fontSize: '0.8em', color: '#888', marginLeft: 8 }}>by {server.ownerId.slice(0, 8)}</span>
              </span>
              {joined ? (
                <span aria-label="Already joined" style={{ color: '#4caf50', fontWeight: 500 }}>Joined</span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleJoin(server.id)}
                  disabled={joinMutation.isPending}
                  style={{ padding: '0.3em 1em', borderRadius: 4, border: '1px solid #888', background: '#f8f8f8', cursor: 'pointer' }}
                  aria-label={`Join server ${server.name}`}
                >
                  {joinMutation.isPending ? 'Joining…' : 'Join'}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {joinMutation.error && (
        <div role="alert" style={{ color: 'red', marginTop: 8 }}>{joinMutation.error.message}</div>
      )}
    </section>
  );
}
