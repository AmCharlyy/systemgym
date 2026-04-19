import { create } from "zustand";

interface OnboardingState {
    level: string | null;
    goal: string | null;
    equipment: string[];
    setLevel: (value: string) => void;
    setGoal: (value: string) => void;
    toggleEquipment: (value: string) => void;
    resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
    level: null,
    goal: null,
    equipment: [],

    setLevel: (value) => set({ level: value }),
    setGoal: (value) => set({ goal: value }),

    toggleEquipment: (value) => {
        const current = get().equipment;
        if (current.includes(value)) {
        set({ equipment: current.filter((e) => e !== value) });
        } else {
        set({ equipment: [...current, value] });
        }
    },

    resetOnboarding: () => set({ level: null, goal: null, equipment: [] }),
}));
