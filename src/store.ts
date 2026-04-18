import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  level: string;
  equipment: string;
  goal: string;
  isLoggedIn: boolean;
  setPreferences: (level: string, equipment: string, goal: string) => void;
  login: () => void;
  logout: () => void;
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      level: 'Intermedio',
      equipment: 'Mancuernas',
      goal: 'Fuerza',
      isLoggedIn: false,
      setPreferences: (level, equipment, goal) => set({ level, equipment, goal }),
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, level: '', equipment: '', goal: '' }),
    }),
    { name: 'fitapp-storage' }
  )
);
