import '@testing-library/jest-dom/vitest';
import {describe, expect, it, vi, beforeEach, Mock} from 'vitest';
import { render, screen } from '@testing-library/react';
import CommentForm from './comment-form.tsx';

// мокаем redux dispatch
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

// мокаем thunk
vi.mock('../../store/offerThunks', () => ({
  postComment: vi.fn(),
}));

import { useDispatch } from 'react-redux';

describe('CommentForm', () => {
  const mockDispatch = vi.fn();
  const offerId = 'offer-1';

  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    // dispatch возвращает Promise, как у thunk
    mockDispatch.mockResolvedValue({});
  });

  it('should render form elements', () => {
    render(<CommentForm offerId={offerId} />);

    expect(screen.getByLabelText(/your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should keep submit button disabled initially', () => {
    render(<CommentForm offerId={offerId} />);

    const submitBtn = screen.getByRole('button', { name: /submit/i });
    expect(submitBtn).toBeDisabled();
  });
});
