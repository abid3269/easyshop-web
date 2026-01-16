import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import MyOrders from '../MyOrders';

describe('MyOrders Page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders order history when user is logged in', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    localStorage.setItem('user', JSON.stringify(mockUser));

    renderWithProviders(<MyOrders />);

    expect(await screen.findByText(/Order History/i, {}, { timeout: 3000 })).toBeInTheDocument();
  });
});
