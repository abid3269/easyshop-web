import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const {
    user: auth0User,
    isAuthenticated,
    isLoading: auth0Loading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently
  } = useAuth0();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (isAuthenticated && auth0User) {
      const namespace = import.meta.env.VITE_AUTH0_NAMESPACE || 'https://easyshop.com';
      const userData = {
        id: auth0User.sub,
        email: auth0User.email,
        name: auth0User.name,
        displayName: auth0User.nickname || auth0User.name,
        photoURL: auth0User.picture,
        // Auth0 roles/permissions are typically in custom claims
        roles: auth0User[`${namespace}/roles`] || [],
        permissions: auth0User[`${namespace}/permissions`] || []
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else if (!auth0Loading && !isAuthenticated) {
      setUser(null);
      localStorage.removeItem('user');
    }
  }, [auth0User, isAuthenticated, auth0Loading]);

  const signIn = async () => {
    return loginWithRedirect();
  };

  const signUp = async () => {
    return loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  const signOut = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const signInWithGoogle = async () => {
    return loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2',
      },
    });
  };

  const signInWithApple = async () => {
    return loginWithRedirect({
      authorizationParams: {
        connection: 'apple',
      },
    });
  };

  const signInWithGithub = async () => {
    return loginWithRedirect({
      authorizationParams: {
        connection: 'github',
      },
    });
  };

  const getAccessToken = async () => {
    try {
      return await getAccessTokenSilently();
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  };

  const value = {
    user,
    isLoading: auth0Loading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithApple,
    signInWithGithub,
    getAccessToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
