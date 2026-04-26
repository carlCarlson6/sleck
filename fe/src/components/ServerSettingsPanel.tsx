import { useServerListState } from './serverState';
import { useState } from 'react';

export function ServerSettingsPanel({ serverId, currentUserId, onClose }: { serverId: string; currentUserId: string; onClose: () => void }) {
  const state = useServerListState();
  const server = state.servers.find(s => s.id === serverId);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(server?.name || '');
  const [description, setDescription] = useState(server?.description || '');
  const [isPublic, setIsPublic] = useState(server?.isPublic ?? true);

  if (!server) return <div className="server-settings-panel error" role="alert">Server not found.</div>;
  if (server.ownerId !== currentUserId) return <div className="server-settings-panel error" role="alert">You are not the owner of this server.</div>;

  async function handleSave() {
    setSaving(true);
    setError(null);
    // Placeholder for backend contract
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 500));
      state.setServers(state.servers.map(s => s.id === serverId ? { ...s, name, description, isPublic } : s));
      onClose();
    } catch {

      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="server-settings-title">
      <form className="modal" onSubmit={() => handleSave()}>
        <h2 id="server-settings-title">Server settings</h2>
        <label>
          Name
          <input value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Description
          <input value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <label>
          <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
          Publicly discoverable
        </label>
        {error && <div className="form-error" role="alert">{error}</div>}
        <div className="modal-actions">
          <button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
          <button type="button" onClick={onClose} disabled={saving}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
