import { db } from "./config";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

export const saveUserPreferences = async (uid: string, prefs: any) => {
    await setDoc(doc(db, "users", uid), prefs, { merge: true });
};

export const getUserPreferences = async (uid: string) => {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data() : null;
};

export const deleteUserData = async (uid: string) => {
    await deleteDoc(doc(db, "users", uid));
};
