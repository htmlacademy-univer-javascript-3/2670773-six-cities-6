import '@testing-library/jest-dom/vitest';
import {describe, expect, it, vi, beforeEach, Mock} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import NearPlacesOffersSection from './near-places-offers-section.tsx';
import type {Offer} from '../../types/offer.ts';
import {CITY_COORDINATES} from '../../constants';

// ---- mocks ----
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../OffersList', () => ({
  default: ({offers, onCardHover}: { offers: Offer[]; onCardHover: (id: string | null) => void }) => (
    <div>
      {offers.map((offer) => (
        <div
          key={offer.id}
          data-testid="offer-card"
          onMouseEnter={() => onCardHover(offer.id)}
          onMouseLeave={() => onCardHover(null)}
        >
          {offer.title}
        </div>
      ))}
    </div>
  ),
}));

vi.mock('../Map', () => ({
  default: ({offers, activeOfferId, center}: { offers: Offer[]; activeOfferId?: string; center: [number, number] }) => (
    <div data-testid="map">
      <span data-testid="map-offers-count">{offers.length}</span>
      <span data-testid="map-active">{activeOfferId ?? 'none'}</span>
      <span data-testid="map-center">{center.join(',')}</span>
    </div>
  ),
}));

import {useSelector} from 'react-redux';

describe('NearPlacesOffersSection', () => {
  const nearbyOffers: Offer[] = [
    {id: '1', title: 'Near 1'} as Offer,
    {id: '2', title: 'Near 2'} as Offer,
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render offers list and map with data from store', () => {
    (useSelector as unknown as Mock).mockImplementation((selector) =>
      selector({
        offers: {
          nearbyOffers,
          currentOffer: {
            city: {
              location: {latitude: 52.39, longitude: 4.9},
            },
          },
        },
      })
    );

    render(<NearPlacesOffersSection/>);

    const cards = screen.getAllByTestId('offer-card');
    expect(cards.length).toBe(nearbyOffers.length);

    expect(screen.getByTestId('map-offers-count')).toHaveTextContent('2');
    expect(screen.getByTestId('map-center')).toHaveTextContent('52.39,4.9');
  });

  it('should pass hovered offer id to Map as activeOfferId', () => {
    (useSelector as unknown as Mock).mockImplementation((selector) =>
      selector({
        offers: {
          nearbyOffers,
          currentOffer: {
            city: {
              location: {latitude: 52.39, longitude: 4.9},
            },
          },
        },
      })
    );

    render(<NearPlacesOffersSection/>);

    const firstCard = screen.getAllByTestId('offer-card')[0];

    fireEvent.mouseEnter(firstCard);
    expect(screen.getByTestId('map-active')).toHaveTextContent('1');

    fireEvent.mouseLeave(firstCard);
    expect(screen.getByTestId('map-active')).toHaveTextContent('none');
  });

  it('should use default city coordinates when currentOffer is null', () => {
    (useSelector as unknown as Mock).mockImplementation((selector) =>
      selector({
        offers: {
          nearbyOffers,
          currentOffer: null,
        },
      })
    );

    render(<NearPlacesOffersSection/>);

    const [lat, lng] = CITY_COORDINATES['Amsterdam'];
    expect(screen.getByTestId('map-center')).toHaveTextContent(`${lat},${lng}`);
  });
});
