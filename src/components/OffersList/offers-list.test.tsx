import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OffersList from './offers-list.tsx';
import type { Offer } from '../../types/offer.ts';

// Мокаем PlaceCard
vi.mock('../PlaceCard', () => ({
  default: ({ offer, onHover }: { offer: Offer; onHover?: (id: string | null) => void }) => (
    <div
      data-testid="place-card"
      onMouseEnter={() => onHover?.(offer.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      {offer.title}
    </div>
  ),
}));

describe('OffersList', () => {
  const offers: Offer[] = [
    { id: '1', title: 'Offer 1' } as Offer,
    { id: '2', title: 'Offer 2' } as Offer,
    { id: '3', title: 'Offer 3' } as Offer,
  ];

  it('should render list of offers', () => {
    render(<OffersList offers={offers} />);

    const cards = screen.getAllByTestId('place-card');
    expect(cards.length).toBe(offers.length);

    offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('should call onCardHover with offer id on mouse enter and null on leave', () => {
    const handleHover = vi.fn();

    render(<OffersList offers={offers} onCardHover={handleHover} />);

    const firstCard = screen.getAllByTestId('place-card')[0];

    fireEvent.mouseEnter(firstCard);
    expect(handleHover).toHaveBeenCalledWith('1');

    fireEvent.mouseLeave(firstCard);
    expect(handleHover).toHaveBeenCalledWith(null);
  });

  it('should not throw if onCardHover is not provided', () => {
    render(<OffersList offers={offers} />);

    const firstCard = screen.getAllByTestId('place-card')[0];

    expect(() => {
      fireEvent.mouseEnter(firstCard);
      fireEvent.mouseLeave(firstCard);
    }).not.toThrow();
  });
});
