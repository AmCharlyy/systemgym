import { create } from "zustand";

interface HistoryEntry {
    id: string;
    routineId: string;
    date: string;
    duration: number;
}

interface HistoryState {
    history: HistoryEntry[];
    addHistory: (entry: HistoryEntry) => void;
    setHistory: (entries: HistoryEntry[]) => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
    history: [],

    addHistory: (entry) =>
        set((state) => ({ history: [...state.history, entry] })),

    setHistory: (entries) => set({ history: entries }),
}));
