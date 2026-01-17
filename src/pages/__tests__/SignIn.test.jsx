import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import SignIn from '../SignIn';

describe('SignIn Page', () => {
  it('renders redirection message', () => {
    renderWithProviders(<SignIn />);
    expect(screen.getByText(/Redirecting to Auth0/i)).toBeInTheDocument();
    expect(screen.getByText(/Please wait while we connect you to our secure login provider/i)).toBeInTheDocument();
  });

  it('renders fallback button', () => {
    renderWithProviders(<SignIn />);
    expect(screen.getByRole('button', { name: /Click here if you are not redirected automatically/i })).toBeInTheDocument();
  });
});
