import { create } from "zustand";

interface Exercise {
    name: string;
    sets: number;
    reps: number;
    rest: number;
}

interface Routine {
    id: string;
    name: string;
    level: string;
    goal: string;
    duration: number;
    exercises: Exercise[];
}

interface RoutineState {
    todayRoutine: Routine | null;
    generatedRoutine: Routine | null;
    setTodayRoutine: (routine: Routine) => void;
    setGeneratedRoutine: (routine: Routine) => void;
    clearGeneratedRoutine: () => void;
}

export const useRoutineStore = create<RoutineState>((set) => ({
    todayRoutine: null,
    generatedRoutine: null,

    setTodayRoutine: (routine) => set({ todayRoutine: routine }),
    setGeneratedRoutine: (routine) => set({ generatedRoutine: routine }),
    clearGeneratedRoutine: () => set({ generatedRoutine: null }),
}));
