import React from 'react';
import type { Offer } from '../mocks/offers';
import  { PlaceCard } from '../components/PlaceCard';

type NearPlacesOffersListProps = {
  offers: Offer[];
};

export const NearPlacesOffersList: React.FC<NearPlacesOffersListProps> = ({ offers }) => (
  <div className="near-places__list places__list">
    {offers.map((offer) => (
      <PlaceCard key={offer.id} offer={offer} cardClassName="near-places__card" imageWrapperClassName="near-places__image-wrapper" />
    ))}
  </div>
);
