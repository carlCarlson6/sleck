import './App.css';
import { AuthShell } from './components/AuthShell';
import { AppNavFrame } from './components/AppNavFrame';
import { ServerListPanel } from './components/ServerListPanel';
import { useState } from 'react';
import { CreateServerDialog } from './components/CreateServerDialog';
import { JoinServerPanel } from './components/JoinServerPanel';
import { InviteAcceptPanel } from './components/InviteAcceptPanel';
import { ServerSettingsPanel } from './components/ServerSettingsPanel';

function App() {
  const [showCreate, setShowCreate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedServerId] = useState<string | null>(null);
  const [inviteCode] = useState<string | null>(null);
  const currentUserId = 'me'; // TODO: wire to Clerk user

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
          <JoinServerPanel serverId={selectedServerId} onJoined={() => {}} />
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
    </AuthShell>
  );
}

export default App;
