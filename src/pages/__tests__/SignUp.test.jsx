import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import SignUp from '../SignUp';

describe('SignUp Page', () => {
  it('renders sign up page with Auth0 button', () => {
    renderWithProviders(<SignUp />);
    expect(screen.getByText(/Create your account/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Continue with Auth0/i })).toBeInTheDocument();
  });

  it('renders social sign in buttons', () => {
    renderWithProviders(<SignUp />);
    expect(screen.getByText(/Or use a social provider/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in with Google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in with Apple/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in with GitHub/i })).toBeInTheDocument();
  });
});
