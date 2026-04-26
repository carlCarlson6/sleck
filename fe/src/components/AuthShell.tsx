import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import type { ReactNode } from 'react';

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SignedOut>
        <main className="auth-shell">
          <h1>Sleck</h1>
          <p className="subtitle">Sign in to start collaborating</p>
          <SignInButton mode="modal">
            <button className="primary-action" autoFocus>Sign in / Sign up</button>
          </SignInButton>
        </main>
      </SignedOut>
      <SignedIn>
        {children}
      </SignedIn>
    </>
  );
}
