import { db } from "./config";
import { doc, setDoc, getDoc, collection, addDoc, getDocs } from "firebase/firestore";

// Guardar datos del onboarding
export const saveUserProfile = async (uid: string, data: any) => {
    await setDoc(doc(db, "users", uid), data, { merge: true });
};

// Guardar rutina generada
export const saveRoutine = async (uid: string, routine: any) => {
    await addDoc(collection(db, "users", uid, "routines"), routine);
};

// Obtener rutinas guardadas
export const getUserRoutines = async (uid: string) => {
    const snapshot = await getDocs(collection(db, "users", uid, "routines"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Guardar historial
export const saveHistory = async (uid: string, entry: any) => {
    await addDoc(collection(db, "users", uid, "history"), entry);
};
