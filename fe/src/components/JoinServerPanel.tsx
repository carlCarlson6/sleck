import { useServerListState } from './serverState';

export function JoinServerPanel({ serverId, onJoined }: { serverId: string; onJoined: () => void }) {
  const state = useServerListState();
  const server = state.servers.find(s => s.id === serverId);
  if (!server) return <div className="join-server-panel error" role="alert">Server not found.</div>;
  if (server.joined) return <div className="join-server-panel success">You are already a member of <b>{server.name}</b>.</div>;

  async function handleJoin() {
    // Placeholder for backend contract
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 500));
      state.setServers(state.servers.map(s => s.id === serverId ? { ...s, joined: true, memberCount: s.memberCount + 1 } : s));
      onJoined();
    } catch {

      // Show error state
    }
  }

  return (
    <div className="join-server-panel">
      <h2>Join {server.name}</h2>
      <p>{server.description}</p>
      <button onClick={handleJoin} className="primary-action">Join server</button>
    </div>
  );
}
