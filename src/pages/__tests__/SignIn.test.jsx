import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import SignIn from '../SignIn';

describe('SignIn Page', () => {
  it('renders sign in page with Auth0 button', () => {
    renderWithProviders(<SignIn />);
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Continue with Auth0/i })).toBeInTheDocument();
  });

  it('renders social sign in buttons', () => {
    renderWithProviders(<SignIn />);
    expect(screen.getByText(/Or use a social provider/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in with Google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in with Apple/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in with GitHub/i })).toBeInTheDocument();
  });
});
