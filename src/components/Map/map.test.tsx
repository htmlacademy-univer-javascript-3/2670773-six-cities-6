import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Map from './map.tsx';
import type { Offer } from '../../types/offer.ts';

describe('Map component', () => {
  it('renders without crashing', () => {
    const offers: Offer[] = [
      { id: '1', location: { latitude: 52.39, longitude: 4.9 } } as Offer,
      { id: '2', location: { latitude: 52.37, longitude: 4.88 } } as Offer,
    ];

    render(<Map offers={offers} center={[52.38333, 4.9]} />);

    const mapDiv = document.getElementById('cities__leaflet-map-wrapper');

    expect(mapDiv).toBeInTheDocument();
  });
});
