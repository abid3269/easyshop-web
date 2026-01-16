import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import Checkout from '../Checkout';

describe('Checkout Page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders checkout form when cart has items', () => {
    const mockCart = [{ id: 1, name: 'Test Product', price: 100, quantity: 1, image: 'test.jpg' }];
    localStorage.setItem('cart', JSON.stringify(mockCart));

    renderWithProviders(<Checkout />);
    expect(screen.getByText(/Shipping Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment Method/i)).toBeInTheDocument();
    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
  });
});
