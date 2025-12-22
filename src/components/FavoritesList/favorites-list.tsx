import React from 'react';
import PlaceCard from '../PlaceCard';
import {Offer} from '../../types/offer.ts';

type FavoritesListProps = {
  offers: Offer[];
};

const FavoritesList: React.FC<FavoritesListProps> = ({ offers }) => (
  <ul className="favorites__list places__list">
    {offers.map((offer) => (
      <li className="favorites__locations-items" key={offer.id}>
        <PlaceCard
          offer={offer}
          cardClassName="favorites__card"
          imageWrapperClassName="favorites__image-wrapper"
        />
      </li>
    ))}
  </ul>
);

export default FavoritesList;
