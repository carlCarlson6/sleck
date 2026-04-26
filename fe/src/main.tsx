import { ClerkProvider } from '@clerk/clerk-react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.trim();
if (!clerkKey) {
  throw new Error('MISSING-ENV');
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkKey}>
        <App />
      </ClerkProvider>
  </React.StrictMode>,
);
