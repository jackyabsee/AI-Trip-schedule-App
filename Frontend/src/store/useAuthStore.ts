import { create } from 'zustand';

interface AuthState {
  user: any | null;
  session: any | null;
  isInitialized: boolean;
  setAuth: (session: any | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isInitialized: false,
  setAuth: (session) => set({ 
    session, 
    user: session?.user ?? null,
    isInitialized: true 
  }),
}));