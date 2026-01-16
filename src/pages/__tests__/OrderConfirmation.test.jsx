import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import OrderConfirmation from '../OrderConfirmation';
import { Routes, Route } from 'react-router-dom';

describe('OrderConfirmation Page', () => {
  it('renders order confirmation with order ID', () => {
    const orderId = 'ORD-123456';
    renderWithProviders(
      <Routes>
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
      </Routes>,
      { initialEntries: [`/order-confirmation/${orderId}`] }
    );

    expect(screen.getByText(/Order Confirmed!/i)).toBeInTheDocument();
    expect(screen.getByText(orderId)).toBeInTheDocument();
  });
});
