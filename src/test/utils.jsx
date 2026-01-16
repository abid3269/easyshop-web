import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';

const AllTheProviders = ({ children, initialEntries = ['/'] }) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

const renderWithProviders = (ui, { initialEntries, ...renderOptions } = {}) =>
  render(ui, {
    wrapper: (props) => <AllTheProviders {...props} initialEntries={initialEntries} />,
    ...renderOptions,
  });

export * from '@testing-library/react';
export { renderWithProviders };
