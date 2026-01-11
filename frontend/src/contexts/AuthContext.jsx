import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../services/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email, password, displayName) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: displayName
      });

      setUser({ ...userCredential.user, displayName });
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const getAuthToken = async () => {
    if (user) {
      return await user.getIdToken();
    }
    return null;
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    loginWithGoogle,
    logout,
    getAuthToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};