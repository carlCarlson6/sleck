import { create } from 'zustand';

interface AppState {
  currentServerId: string | null;
  setCurrentServerId: (id: string | null) => void;
  currentChannelId: string | null;
  setCurrentChannelId: (id: string | null) => void;
}

export const useAppState = create<AppState>((set) => ({
  currentServerId: null,
  setCurrentServerId: (id) => set({ currentServerId: id }),
  currentChannelId: null,
  setCurrentChannelId: (id) => set({ currentChannelId: id }),
}));
