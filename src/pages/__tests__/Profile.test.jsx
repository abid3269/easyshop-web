import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import Profile from '../Profile';

describe('Profile Page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders profile information when user is logged in', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    localStorage.setItem('user', JSON.stringify(mockUser));

    renderWithProviders(<Profile />);

    expect(await screen.findByText(/Personal Information/i, {}, { timeout: 3000 })).toBeInTheDocument();
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
  });
});
