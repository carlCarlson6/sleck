import { useServerListState } from './serverState';

export function InviteAcceptPanel({ inviteCode, onAccepted }: { inviteCode: string; onAccepted: () => void }) {
  const state = useServerListState();
  // Placeholder: simulate lookup by invite code
  const server = state.servers.find(s => s.inviteCode === inviteCode);
  if (!server) return <div className="invite-accept-panel error" role="alert">Invite not found or expired.</div>;
  if (server.joined) return <div className="invite-accept-panel success">You are already a member of <b>{server.name}</b>.</div>;

  async function handleAccept() {
    // Placeholder for backend contract
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 500));
      if (!server) return;
      state.setServers(state.servers.map(s => s.id === server.id ? { ...s, joined: true, memberCount: s.memberCount + 1 } : s));
      onAccepted();
    } catch {

      // Show error state
    }
  }

  return (
    <div className="invite-accept-panel">
      <h2>Accept invite to {server.name}</h2>
      <p>{server.description}</p>
      <button onClick={handleAccept} className="primary-action">Accept invite</button>
    </div>
  );
}
