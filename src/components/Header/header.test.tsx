import '@testing-library/jest-dom/vitest';
import {describe, expect, it, vi, beforeEach, Mock} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Header from './header.tsx';
import { AuthorizationStatus } from '../../store/auth-slice.ts';
import { logout } from '../../store/auth-thunk.ts';

// Мокаем redux hooks
vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  };
});

// Мокаем logout thunk
vi.mock('../../store/auth-thunk', () => ({
  logout: vi.fn(() => ({ type: 'auth/logout' })),
}));

import { useSelector, useDispatch } from 'react-redux';

describe('Header', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
  });

  it('should render Sign in link when user is not authorized', () => {
    (useSelector as unknown as Mock).mockImplementation((selector) =>
      selector({
        offers: { items: [] },
        auth: { authorizationStatus: AuthorizationStatus.Unauthorized },
      })
    );

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });

  it('should render user info and favorites count when authorized', () => {
    (useSelector as unknown as Mock).mockImplementation((selector) =>
      selector({
        offers: {
          items: [
            { id: '1', isFavorite: true },
            { id: '2', isFavorite: false },
            { id: '3', isFavorite: true },
          ],
        },
        auth: { authorizationStatus: AuthorizationStatus.Authorized },
      })
    );

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Oliver.conner@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('should dispatch logout when Sign out is clicked', () => {
    (useSelector as unknown as Mock).mockImplementation((selector) =>
      selector({
        offers: { items: [] },
        auth: { authorizationStatus: AuthorizationStatus.Authorized },
      })
    );

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/sign out/i));

    expect(logout).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'auth/logout' });
  });
});
