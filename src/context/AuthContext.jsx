import { createContext, useContext, useState } from 'react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, OAuthProvider } from 'firebase/auth';

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
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email, password) => { // eslint-disable-line no-unused-vars
    setIsLoading(true);
    try {
      // Mock authentication - in real app, this would call an API
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return mockUser;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name, email, password) => { // eslint-disable-line no-unused-vars
    setIsLoading(true);
    try {
      // Mock registration - in real app, this would call an API
      const mockUser = {
        id: Date.now().toString(),
        email,
        name,
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return mockUser;
    } finally {
      setIsLoading(false);
    }
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
    return userData;
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      if (!auth) {
        console.warn("Firebase Auth is disabled. Using mock user.");
        const mockUser = {
          id: 'google-mock-id',
          email: 'google-user@example.com',
          displayName: 'Google User',
          photoURL: 'https://via.placeholder.com/150',
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return mockUser;
      }
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return handleAuthSuccess(result);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithApple = async () => {
    setIsLoading(true);
    try {
      if (!auth) {
        console.warn("Firebase Auth is disabled. Using mock user.");
        const mockUser = {
          id: 'apple-mock-id',
          email: 'apple-user@example.com',
          displayName: 'Apple User',
          photoURL: 'https://via.placeholder.com/150',
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return mockUser;
      }
      const provider = new OAuthProvider('apple.com');
      const result = await signInWithPopup(auth, provider);
      return handleAuthSuccess(result);
    } catch (error) {
      console.error("Error signing in with Apple:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGithub = async () => {
    setIsLoading(true);
    try {
      if (!auth) {
        console.warn("Firebase Auth is disabled. Using mock user.");
        const mockUser = {
          id: 'github-mock-id',
          email: 'github-user@example.com',
          displayName: 'Github User',
          photoURL: 'https://via.placeholder.com/150',
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return mockUser;
      }
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return handleAuthSuccess(result);
    } catch (error) {
      console.error("Error signing in with Github:", error);
      throw error;
    } finally {
      setIsLoading(false);
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
    signInWithGithub,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
