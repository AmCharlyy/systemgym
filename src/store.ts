import { create } from 'zustand';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';

interface UserState {
  level: string;
  equipment: string;
  goal: string;
  isLoggedIn: boolean;
  preferencesLoaded: boolean;
  setPreferences: (level: string, equipment: string, goal: string) => Promise<void>;
  fetchUserPreferences: (uid: string) => Promise<void>;
  reset: () => void;
  setLoggedIn: (status: boolean) => void;
}

export const useStore = create<UserState>((set, get) => ({
  level: '',
  equipment: '',
  goal: '',
  isLoggedIn: false,
  preferencesLoaded: false,
  reset: () => set({ level: '', equipment: '', goal: '', isLoggedIn: false, preferencesLoaded: false }),
  setLoggedIn: (status) => set({ isLoggedIn: status }),
  fetchUserPreferences: async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data();
        set({ 
          level: data.level || '', 
          equipment: data.equipment || '', 
          goal: data.goal || '',
          preferencesLoaded: true
        });
      } else {
        set({ preferencesLoaded: true });
      }
    } catch (e) {
      console.error(e);
      set({ preferencesLoaded: true });
    }
  },
  setPreferences: async (level, equipment, goal) => {
    set({ level, equipment, goal, preferencesLoaded: true }); // optimistic update
    
    const user = auth.currentUser;
    if (!user) return;
    
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        level,
        equipment,
        goal,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating preferences in Firestore:", error);
    }
  }
}));
