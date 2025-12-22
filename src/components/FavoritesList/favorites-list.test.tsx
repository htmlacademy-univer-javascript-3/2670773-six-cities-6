import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FavoritesList from './favorites-list.tsx';
import type { Offer } from '../../types/offer.ts';

vi.mock('../PlaceCard', () => ({
  default: ({ offer }: { offer: Offer }) => (
    <div data-testid="place-card">{offer.title}</div>
  ),
}));

describe('FavoritesList', () => {
  it('should render list of favorite offers', () => {
    const offers: Offer[] = [
      {
        id: 'o1',
        title: 'Nice apartment',
      } as Offer,
      {
        id: 'o2',
        title: 'Cozy studio',
      } as Offer,
    ];

    render(<FavoritesList offers={offers} />);

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(offers.length);

    const cards = screen.getAllByTestId('place-card');
    expect(cards.length).toBe(offers.length);

    expect(screen.getByText('Nice apartment')).toBeInTheDocument();
    expect(screen.getByText('Cozy studio')).toBeInTheDocument();
  });
});
