import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export type Channel = {
  id: string;
  serverId: string;
  name: string;
  description?: string;
  position: number;
  createdAt: string;
  updatedAt: string;
};

// API functions (replace with real transport)
// API functions (replace with real transport)
async function listChannels(_serverId: string): Promise<Channel[]> {
  // TODO: Replace with real API call
  return [];
}
async function createChannel(_serverId: string, _name: string, _description?: string): Promise<{ id: string }> {
  // TODO: Replace with real API call
  return { id: Math.random().toString(36).slice(2) };
}
async function updateChannel(_channelId: string, _name?: string, _description?: string): Promise<{ success: true }> {
  // TODO: Replace with real API call
  return { success: true };
}
async function deleteChannel(_channelId: string): Promise<{ success: true }> {
  // TODO: Replace with real API call
  return { success: true };
}
async function reorderChannels(_serverId: string, _channelIds: string[]): Promise<{ success: true }> {
  // TODO: Replace with real API call
  return { success: true };
}

export function useChannels(serverId: string | null) {
  return useQuery({
    queryKey: ['channels', serverId],
    queryFn: () => serverId ? listChannels(serverId) : Promise.resolve([]),
    enabled: !!serverId,
  });
}

export function useCreateChannel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ serverId, name, description }: { serverId: string; name: string; description?: string }) => createChannel(serverId, name, description),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['channels', variables.serverId] });
    },
  });
}
export function useUpdateChannel(serverId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ channelId, name, description }: { channelId: string; name?: string; description?: string }) => updateChannel(channelId, name, description),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['channels', serverId] });
    },
  });
}
export function useDeleteChannel(serverId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ channelId }: { channelId: string }) => deleteChannel(channelId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['channels', serverId] });
    },
  });
}
export function useReorderChannels(serverId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ channelIds }: { channelIds: string[] }) => reorderChannels(serverId, channelIds),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['channels', serverId] });
    },
  });
}
