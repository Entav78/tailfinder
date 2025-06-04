import { create } from 'zustand';

interface AuthState {
  user: { name: string; email: string } | null;
  accessToken: string | null;
  login: (data: { name: string; email: string; accessToken: string }) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,

  login: ({ name, email, accessToken }) =>
    set({ user: { name, email }, accessToken }),

  logout: () => set({ user: null, accessToken: null }),

  isLoggedIn: () => !!get().accessToken,
}));
