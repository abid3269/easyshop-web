import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import ProductListing from '../ProductListing';

describe('ProductListing Page', () => {
  it('renders product listing with filters', () => {
    renderWithProviders(<ProductListing />);
    expect(screen.getByText(/All Products/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Filters/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search products.../i)).toBeInTheDocument();
  });

  it('displays products', () => {
    renderWithProviders(<ProductListing />);
    // Since we use mockData, we expect some products to be there
    expect(screen.getByText(/Showing/i)).toBeInTheDocument();
  });
});
