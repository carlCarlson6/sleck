import { useState } from 'react';

export type Server = {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  ownerId: string;
  memberCount: number;
  joined: boolean;
  inviteCode?: string;
};

export type ServerListState = {
  servers: Server[];
  loading: boolean;
  error: string | null;
  selectedServerId: string | null;
  setServers: (servers: Server[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  selectServer: (id: string | null) => void;
};

export function useServerListState(): ServerListState {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null);

  function selectServer(id: string | null) {
    setSelectedServerId(id);
  }

  return {
    servers,
    loading,
    error,
    selectedServerId,
    setServers,
    setLoading,
    setError,
    selectServer,
  };
}
