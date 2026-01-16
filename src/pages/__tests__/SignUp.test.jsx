import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import SignUp from '../SignUp';

describe('SignUp Page', () => {
  it('renders sign up form', () => {
    renderWithProviders(<SignUp />);
    expect(screen.getByText(/Create your account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    // Use exact match or regex with start/end anchors to avoid matching "Confirm Password"
    expect(screen.getByPlaceholderText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign up/i })).toBeInTheDocument();
  });

  it('shows error when passwords do not match', async () => {
    renderWithProviders(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/^Password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'password456' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
  });
});
