import './App.css';
import { AuthShell } from './components/AuthShell';
import { AppNavFrame } from './components/AppNavFrame';
import { ServerListPanel } from './components/ServerListPanel';
import { useState } from 'react';
import { CreateServerDialog } from './components/CreateServerDialog';

import { InviteAcceptPanel } from './components/InviteAcceptPanel';
import { ServerSettingsPanel } from './components/ServerSettingsPanel';
import { ChannelListPanel } from './components/ChannelListPanel';
import { CreateChannelDialog } from './components/CreateChannelDialog';
import { EditChannelDialog } from './components/EditChannelDialog';
import { useServerListState } from './components/serverState';

function App() {
  const [showCreate, setShowCreate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [editChannelId, setEditChannelId] = useState<string | null>(null);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [inviteCode] = useState<string | null>(null);
  const currentUserId = 'me'; // TODO: wire to Clerk user
  const serverState = useServerListState();
  const selectedServerId = serverState.selectedServerId;
  const selectedServer = serverState.servers.find(s => s.id === selectedServerId) || null;
  const isOwner = selectedServer && selectedServer.ownerId === currentUserId;

  return (
    <AuthShell>
      <AppNavFrame />
      <aside>
        <ServerListPanel />
        <button className="primary-action" onClick={() => setShowCreate(true)} aria-label="Create server">+ Create server</button>
      </aside>
      <main className="workspace" tabIndex={-1} aria-label="Workspace">
        {!selectedServerId && !inviteCode && (
          <div className="workspace-placeholder">
            <h1>Welcome to Sleck</h1>
            <p className="subtitle">Select or create a server to get started.</p>
          </div>
        )}
        {selectedServerId && !showSettings && (
          <div className="workspace-server">
            <ChannelListPanel
              serverId={selectedServerId}
              isOwner={!!isOwner}
              selectedChannelId={selectedChannelId}
              onSelect={setSelectedChannelId}
              onCreate={() => setShowCreateChannel(true)}
              onEdit={setEditChannelId}
              onDelete={setEditChannelId}
            />
            {/* TODO: Channel content panel here */}
          </div>
        )}
        {inviteCode && (
          <InviteAcceptPanel inviteCode={inviteCode} onAccepted={() => {}} />
        )}
        {showSettings && selectedServerId && (
          <ServerSettingsPanel serverId={selectedServerId} currentUserId={currentUserId} onClose={() => setShowSettings(false)} />
        )}
      </main>
      {showCreate && (
        <CreateServerDialog onCreated={() => setShowCreate(false)} onCancel={() => setShowCreate(false)} />
      )}
      {showCreateChannel && selectedServerId && (
        <CreateChannelDialog serverId={selectedServerId} onCreated={() => setShowCreateChannel(false)} onCancel={() => setShowCreateChannel(false)} />
      )}
      {editChannelId && selectedServerId && (
        <EditChannelDialog
          serverId={selectedServerId}
          channelId={editChannelId}
          onUpdated={() => setEditChannelId(null)}
          onDeleted={() => {
            setEditChannelId(null);
            setSelectedChannelId(null);
          }}
          onCancel={() => setEditChannelId(null)}
        />
      )}
    </AuthShell>
  );
}

export default App;
