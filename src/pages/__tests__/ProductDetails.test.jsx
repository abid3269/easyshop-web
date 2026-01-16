import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import ProductDetails from '../ProductDetails';
import { Routes, Route } from 'react-router-dom';

describe('ProductDetails Page', () => {
  it('renders product details for a valid product', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>,
      { initialEntries: ['/products/1'] }
    );

    // We assume product with ID 1 exists and has some text
    // From mockData.js, ID 1 is often a smartphone or similar
    expect(await screen.findByText(/Add to Cart/i)).toBeInTheDocument();
    expect(screen.getByText(/Buy Now/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Reviews/i)).toBeInTheDocument();
  });

  it('renders not found message for invalid product', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>,
      { initialEntries: ['/products/999'] }
    );

    expect(await screen.findByText(/Product not found/i)).toBeInTheDocument();
  });
});
