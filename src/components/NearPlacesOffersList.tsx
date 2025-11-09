import React from 'react';
import {PlaceCard} from './PlaceCard';
import {Offer} from "../types/Offer.ts";

type NearPlacesOffersListProps = {
  offers: Offer[];
};

export const NearPlacesOffersList: React.FC<NearPlacesOffersListProps> = ({offers}) => (
  <div className="near-places__list places__list">
    {offers.map((offer) => (
      <PlaceCard
        key={offer.id}
        offer={offer}
        cardClassName="near-places__card"
        imageWrapperClassName="near-places__image-wrapper"
      />
    ))}
  </div>
);
