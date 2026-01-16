import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import Cart from '../Cart';

describe('Cart Page', () => {
  it('renders empty cart message when cart is empty', () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByText(/Continue Shopping/i)).toBeInTheDocument();
  });
});
