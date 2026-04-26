import { useChannels, useReorderChannels } from './channelState';
import { useState } from 'react';

export function ChannelListPanel({
  serverId,
  isOwner,
  selectedChannelId,
  onSelect,
  onCreate,
  onEdit,
  onDelete,
}: {
  serverId: string;
  isOwner: boolean;
  selectedChannelId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { data, isLoading, error } = useChannels(serverId);
  const [dragged, setDragged] = useState<string | null>(null);
  const reorder = useReorderChannels(serverId);

  function handleDragStart(id: string) {
    setDragged(id);
  }
  function handleDrop(targetId: string) {
    if (!data || !dragged || dragged === targetId) return;
    const idxFrom = data.findIndex(c => c.id === dragged);
    const idxTo = data.findIndex(c => c.id === targetId);
    if (idxFrom < 0 || idxTo < 0) return;
    const newOrder = [...data];
    const [moved] = newOrder.splice(idxFrom, 1);
    newOrder.splice(idxTo, 0, moved);
    reorder.mutate({ channelIds: newOrder.map(c => c.id) });
    setDragged(null);
  }

  if (isLoading) return <div className="channel-list-panel" aria-busy="true">Loading channels</div>;
  if (error) return <div className="channel-list-panel error" role="alert">Failed to load channels</div>;
  if (!data?.length) {
    return (
      <div className="channel-list-panel empty">
        {isOwner ? (
          <>
            <div>No channels yet.</div>
            <button onClick={onCreate} className="primary-action">+ Create channel</button>
          </>
        ) : (
          <div>No channels available.</div>
        )}
      </div>
    );
  }

  return (
    <nav className="channel-list-panel" aria-label="Channel list">
      <ul>
        {data.map((channel) => (
          <li
            key={channel.id}
            draggable={isOwner}
            onDragStart={() => handleDragStart(channel.id)}
            onDragOver={e => { if (isOwner) e.preventDefault(); }}
            onDrop={() => handleDrop(channel.id)}
          >
            <button
              className={selectedChannelId === channel.id ? 'selected' : ''}
              aria-current={selectedChannelId === channel.id ? 'page' : undefined}
              onClick={() => onSelect(channel.id)}
            >
              <span className="channel-name"># {channel.name}</span>
            </button>
            {isOwner && (
              <span className="channel-actions">
                <button aria-label="Edit channel" onClick={() => onEdit(channel.id)}>&#9998;</button>
                <button aria-label="Delete channel" onClick={() => onDelete(channel.id)}>&#128465;</button>
              </span>
            )}
          </li>
        ))}
      </ul>
      {isOwner && (
        <button onClick={onCreate} className="primary-action">+ Create channel</button>
      )}
    </nav>
  );
}
