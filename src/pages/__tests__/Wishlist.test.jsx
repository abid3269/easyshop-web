import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import Wishlist from '../Wishlist';

describe('Wishlist Page', () => {
  it('renders empty wishlist message when wishlist is empty', () => {
    renderWithProviders(<Wishlist />);
    expect(screen.getByText(/Your wishlist is empty/i)).toBeInTheDocument();
  });
});
