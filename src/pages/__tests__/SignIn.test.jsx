import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import SignIn from '../SignIn';

describe('SignIn Page', () => {
  it('renders sign in form', () => {
    renderWithProviders(<SignIn />);
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('shows error when fields are empty', async () => {
    renderWithProviders(<SignIn />);

    // Use fireEvent.submit directly on the form
    const emailInput = screen.getByPlaceholderText(/Email address/i);
    const form = emailInput.closest('form');
    fireEvent.submit(form);

    expect(await screen.findByText(/Please fill in all fields/i)).toBeInTheDocument();
  });
});
