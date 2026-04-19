import { create } from "zustand";

interface UserState {
    user: null | {
        uid: string;
        email: string;
        level?: string;
        goal?: string;
        equipment?: string[];
    };
    
    setUser: (userData: any) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,

    setUser: (userData) => set({ user: userData }),

    clearUser: () => set({ user: null }),
}));
