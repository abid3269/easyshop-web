import { createContext, useContext, useState } from 'react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading] = useState(false);

  const signIn = (email, password) => { // eslint-disable-line no-unused-vars
    // Mock authentication - in real app, this would call an API
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const signUp = (name, email, password) => { // eslint-disable-line no-unused-vars
    // Mock registration - in real app, this would call an API
    const mockUser = {
      id: Date.now().toString(),
      email,
      name,
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleAuthSuccess = (result) => {
    const user = result.user;
    const userData = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const signInWithGoogle = async () => {
    if (!auth) {
      console.warn("Firebase Auth is disabled.");
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      handleAuthSuccess(result);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const signInWithApple = async () => {
    if (!auth) {
      console.warn("Firebase Auth is disabled.");
      return;
    }
    const provider = new OAuthProvider('apple.com');
    try {
      const result = await signInWithPopup(auth, provider);
      handleAuthSuccess(result);
    } catch (error) {
      console.error("Error signing in with Apple:", error);
    }
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithApple,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
