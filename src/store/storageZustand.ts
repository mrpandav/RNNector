// src/store/storageZustand.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import storage from './storage';

interface UserDetails {
  username: string;
  email: string;
  password: string;
  uid: string;
}

interface UserState {
  isLogin: boolean;
  details: UserDetails;
  setUser: (user: UserDetails) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLogin: false,
      details: { username: '', email: '', password: '', uid: '' },
      setUser: (user) => set({ details: user, isLogin: true }),
      logout: () =>
        set({
          isLogin: false,
          details: { username: '', email: '', password: '', uid: '' },
        }),
    }),
    {
      name: 'Nectar',
      storage: createJSONStorage(() => storage),
    }
  )
);

export default useUserStore;
