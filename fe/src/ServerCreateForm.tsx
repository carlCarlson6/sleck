import * as React from 'react';
import { trpc } from './api/trpc';

type ServerInput = {
  name: string;
  visibility: 'public' | 'private';
};

export function ServerCreateForm({ onSuccess }: { onSuccess?: () => void }) {
  const utils = trpc.useUtils?.() ?? {};
  const createServer = trpc.servers.create.useMutation({
    onSuccess: () => {
      utils.servers?.listMine?.invalidate?.();
      onSuccess?.();
    },
  });
  const [name, setName] = React.useState('');
  const [visibility, setVisibility] = React.useState<'public' | 'private'>('public');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    createServer.mutate({ name: name.trim(), visibility } as ServerInput);
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Create server" style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
      <label>
        Server name
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          maxLength={64}
          style={{ width: '100%' }}
        />
      </label>
      <fieldset>
        <legend>Visibility</legend>
        <label>
          <input
            type="radio"
            name="visibility"
            value="public"
            checked={visibility === 'public'}
            onChange={() => setVisibility('public')}
          />
          Public (anyone can discover)
        </label>
        <label>
          <input
            type="radio"
            name="visibility"
            value="private"
            checked={visibility === 'private'}
            onChange={() => setVisibility('private')}
          />
          Private (invite only)
        </label>
      </fieldset>
      <button type="submit" disabled={createServer.isPending}>
        {createServer.isPending ? 'Creating…' : 'Create server'}
      </button>
      {createServer.error && <div role="alert" style={{ color: 'red' }}>{createServer.error.message}</div>}
    </form>
  );
}
