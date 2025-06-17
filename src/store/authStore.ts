import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: { name: string; email: string } | null;
  accessToken: string | null;
  login: (data: { name: string; email: string; accessToken: string }) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

/**
 * Zustand store for managing authentication state.
 *
 * Persists user and access token using localStorage.
 *
 * Features:
 * - `login`: Stores user info and access token
 * - `logout`: Clears user and token data
 * - `isLoggedIn`: Checks if a user is currently authenticated
 *
 * State shape:
 * - `user`: { name, email } or null
 * - `accessToken`: string or null
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,

      login: ({ name, email, accessToken }) =>
        set({ user: { name, email }, accessToken }),

      logout: () => set({ user: null, accessToken: null }),

      isLoggedIn: () => !!get().accessToken,
    }),
    {
      name: 'auth-storage',
    }
  )
);
