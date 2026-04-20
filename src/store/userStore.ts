import { create } from "zustand";

interface UserData {
    uid: string;
    email: string;
    level?: string | null;
    goal?: string | null;
    equipment?: string[];
}

interface UserState {
    user: UserData | null;

    setUser: (userData: UserData) => void;
    updatePreferences: (prefs: Partial<UserData>) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,

    setUser: (userData) => set({ user: userData }),

    updatePreferences: (prefs) =>
        set((state) => ({
        user: state.user ? { ...state.user, ...prefs } : null,
        })),

    clearUser: () => set({ user: null }),
}));
