import './App.css';
import { AuthShell } from './components/AuthShell';
import { AppNavFrame } from './components/AppNavFrame';

function App() {
  return (
    <AuthShell>
      <AppNavFrame />
      <main className="workspace-placeholder" tabIndex={-1} aria-label="Workspace">
        <h1>Welcome to Sleck</h1>
        <p className="subtitle">You are signed in. Server and channel features coming soon.</p>
      </main>
    </AuthShell>
  );
}

export default App;
