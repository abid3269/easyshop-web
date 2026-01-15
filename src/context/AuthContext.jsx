import { createContext, useContext, useState, useEffect } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = (email, password) => {
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

  const signUp = (name, email, password) => {
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

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
