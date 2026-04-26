import { useState } from 'react';
import { useServerListState } from './serverState';

export function CreateServerDialog({ onCreated, onCancel }: { onCreated: () => void; onCancel: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const state = useServerListState();

  async function handleCreate() {
    setSubmitting(true);
    setError(null);
    // Placeholder for backend contract
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 500));
      state.setServers([
        ...state.servers,
        {
          id: Math.random().toString(36).slice(2),
          name,
          description,
          isPublic,
          ownerId: 'me',
          memberCount: 1,
          joined: true,
        },
      ]);
      onCreated();
    } catch {

      setError('Failed to create server');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="create-server-title">
      <form className="modal" onSubmit={() => handleCreate()}>
        <h2 id="create-server-title">Create a new server</h2>
        <label>
          Name
          <input value={name} onChange={e => setName(e.target.value)} required autoFocus />
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
          <button type="submit" disabled={submitting}>{submitting ? 'Creating…' : 'Create'}</button>
          <button type="button" onClick={onCancel} disabled={submitting}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
