import { useState } from 'react';
import { useCreateChannel } from './channelState';

export function CreateChannelDialog({ serverId, onCreated, onCancel }: { serverId: string; onCreated: () => void; onCancel: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const create = useCreateChannel();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    create.mutate({ serverId, name, description }, {
      onSuccess: () => onCreated(),
    });
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="create-channel-title">
      <form className="modal" onSubmit={handleSubmit}>
        <h2 id="create-channel-title">Create channel</h2>
        <label>
          Name
          <input value={name} onChange={e => setName(e.target.value)} required autoFocus />
        </label>
        <label>
          Description
          <input value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        {create.isError && <div className="form-error" role="alert">Failed to create channel</div>}
        <div className="modal-actions">
          <button type="submit" disabled={create.isLoading}>{create.isLoading ? 'Creating…' : 'Create'}</button>
          <button type="button" onClick={onCancel} disabled={create.isLoading}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
