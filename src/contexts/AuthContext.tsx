import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useStore } from '../store';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { fetchUserPreferences, setLoggedIn } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setLoggedIn(true);
        await fetchUserPreferences(user.uid);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [fetchUserPreferences, setLoggedIn]);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
