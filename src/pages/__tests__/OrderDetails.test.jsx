import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import OrderDetails from '../OrderDetails';
import { Routes, Route } from 'react-router-dom';

describe('OrderDetails Page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders order details when user is logged in and order exists', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    localStorage.setItem('user', JSON.stringify(mockUser));

    // We use a mock order ID from mockData.js
    const orderId = 'ORD-99901';

    renderWithProviders(
      <Routes>
        <Route path="/profile/orders/:orderId" element={<OrderDetails />} />
      </Routes>,
      { initialEntries: [`/profile/orders/${orderId}`] }
    );

    // Increase timeout because fetchOrderById has multiple delays totalling > 1s
    expect(await screen.findByText(new RegExp(`Order #${orderId}`, 'i'), {}, { timeout: 3000 })).toBeInTheDocument();
    expect(screen.getByText(/Order Items/i)).toBeInTheDocument();
  });
});
