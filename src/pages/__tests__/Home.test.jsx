import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import Home from '../Home';

describe('Home Page', () => {
  it('renders hero section', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Welcome to EasyShop/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Shop Now/i })).toBeInTheDocument();
  });

  it('renders categories', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Shop by Category/i)).toBeInTheDocument();
  });
});
