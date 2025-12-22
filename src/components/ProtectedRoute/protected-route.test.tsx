import {describe, it, expect, Mock} from 'vitest';
import {render, screen} from '@testing-library/react';
import {useSelector} from 'react-redux';
import {MemoryRouter, Routes, Route} from 'react-router';
import ProtectedRoute from './protected-route.tsx';
import {AuthorizationStatus} from '../../store/auth-slice.ts';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

// Мокаем Spinner чтобы не рендерить его
vi.mock('../Spinner', () => ({
  default: () => <div data-testid="spinner">spinner</div>
}));

describe('ProtectedRoute', () => {
  it('Отображает лоадер, когда статус Unknown', () => {
    (useSelector as Mock).mockReturnValue(AuthorizationStatus.Unknown);

    render(
      <MemoryRouter>
        <ProtectedRoute/>
      </MemoryRouter>
    );

    expect(screen.getByText('Подождите...')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('Редиректит, если пользователь НЕ авторизован', () => {
    (useSelector as Mock).mockReturnValue(AuthorizationStatus.Unauthorized);

    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/private" element={<ProtectedRoute redirectPath="/login"/>}/>
          <Route path="/login" element={<div>LoginPage</div>}/>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });

  it('Показывает контент, если Authorized', () => {
    (useSelector as Mock).mockReturnValue(AuthorizationStatus.Authorized);

    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/" element={<div>Main</div>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path="/private" element={<div>Protected content</div>}/>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });
});
