import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import SignUp from '../SignUp';

describe('SignUp Page', () => {
  it('renders redirection message', () => {
    renderWithProviders(<SignUp />);
    expect(screen.getByText(/Redirecting to Auth0/i)).toBeInTheDocument();
    expect(screen.getByText(/Please wait while we connect you to our secure registration provider/i)).toBeInTheDocument();
  });

  it('renders fallback button', () => {
    renderWithProviders(<SignUp />);
    expect(screen.getByRole('button', { name: /Click here if you are not redirected automatically/i })).toBeInTheDocument();
  });
});
