import { create } from 'zustand';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';

const PREFERENCES_STORAGE_KEY = 'fitapp-user-preferences';

function readPreferencesFromStorage() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { level: string; equipment: string; goal: string };
  } catch (error) {
    console.error('Failed to read preferences from storage', error);
    return null;
  }
}

function writePreferencesToStorage(data: { level: string; equipment: string; goal: string }) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to write preferences to storage', error);
  }
}

function removePreferencesFromStorage() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(PREFERENCES_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to remove preferences from storage', error);
  }
}

const persistedPreferences = readPreferencesFromStorage();

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
  level: persistedPreferences?.level || '',
  equipment: persistedPreferences?.equipment || '',
  goal: persistedPreferences?.goal || '',
  isLoggedIn: false,
  preferencesLoaded: Boolean(persistedPreferences),
  reset: () => {
    removePreferencesFromStorage();
    set({ level: '', equipment: '', goal: '', isLoggedIn: false, preferencesLoaded: false });
  },
  setLoggedIn: (status) => set({ isLoggedIn: status }),
  fetchUserPreferences: async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data();
        const prefs = {
          level: data.level || '',
          equipment: data.equipment || '',
          goal: data.goal || ''
        };
        writePreferencesToStorage(prefs);
        set({ ...prefs, preferencesLoaded: true });
      } else {
        set({ preferencesLoaded: true });
      }
    } catch (e) {
      console.error(e);
      set({ preferencesLoaded: true });
    }
  },
  setPreferences: async (level, equipment, goal) => {
    const prefs = { level, equipment, goal };
    writePreferencesToStorage(prefs);
    set({ ...prefs, preferencesLoaded: true });

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
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          level,
          equipment,
          goal,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (mergeError) {
        console.error('Error updating preferences in Firestore:', error, mergeError);
      }
    }
  }
}));
