import { useState } from 'react';
import { useUpdateChannel, useDeleteChannel, useChannels } from './channelState';

export function EditChannelDialog({ serverId, channelId, onUpdated, onDeleted, onCancel }: {
  serverId: string;
  channelId: string;
  onUpdated: () => void;
  onDeleted: () => void;
  onCancel: () => void;
}) {
  const { data } = useChannels(serverId);
  const channel = data?.find(c => c.id === channelId);
  const [name, setName] = useState(channel?.name || '');
  const [description, setDescription] = useState(channel?.description || '');
  const update = useUpdateChannel(serverId);
  const del = useDeleteChannel(serverId);

  if (!channel) return null;

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    update.mutate({ channelId, name, description }, {
      onSuccess: () => onUpdated(),
    });
  }
  function handleDelete() {
    if (window.confirm('Delete this channel?')) {
      del.mutate({ channelId }, {
        onSuccess: () => onDeleted(),
      });
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="edit-channel-title">
      <form className="modal" onSubmit={handleUpdate}>
        <h2 id="edit-channel-title">Edit channel</h2>
        <label>
          Name
          <input value={name} onChange={e => setName(e.target.value)} required autoFocus />
        </label>
        <label>
          Description
          <input value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        {update.isError && <div className="form-error" role="alert">Failed to update channel</div>}
        <div className="modal-actions">
          <button type="submit" disabled={update.isLoading}>{update.isLoading ? 'Saving…' : 'Save'}</button>
          <button type="button" onClick={onCancel} disabled={update.isLoading}>Cancel</button>
          <button type="button" onClick={handleDelete} disabled={del.isLoading} className="danger">Delete</button>
        </div>
      </form>
    </div>
  );
}
