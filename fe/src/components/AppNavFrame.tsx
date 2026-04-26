import { UserButton } from '@clerk/clerk-react';
import React from 'react';

export function AppNavFrame() {
  return (
    <nav className="app-nav-frame" aria-label="Main navigation">
      <div className="nav-brand">Sleck</div>
      <div className="nav-actions">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
