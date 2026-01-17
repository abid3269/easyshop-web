import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock scrollIntoView as it's not implemented in jsdom
window.HTMLElement.prototype.scrollIntoView = vi.fn();

let lastUser = null;
let lastAuth0Return = null;

vi.mock('@auth0/auth0-react', () => ({
  Auth0Provider: ({ children }) => children,
  useAuth0: () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    // Simple reference stability check
    const userChanged = JSON.stringify(user) !== JSON.stringify(lastUser);

    if (userChanged || !lastAuth0Return) {
      lastUser = user;
      lastAuth0Return = {
        isAuthenticated: !!user,
        user: user ? {
          sub: user.id,
          email: user.email,
          name: user.name,
          nickname: user.displayName,
          picture: user.photoURL,
        } : null,
        isLoading: false,
        loginWithRedirect: vi.fn(),
        logout: vi.fn(),
        getAccessTokenSilently: vi.fn().mockResolvedValue('fake-token'),
        getAccessTokenWithPopup: vi.fn(),
      };
    }

    return lastAuth0Return;
  },
}));
