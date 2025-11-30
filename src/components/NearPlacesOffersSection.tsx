import React, {useState} from 'react'
import {OffersList} from './OffersList.tsx';
import type {RootState} from '../store';
import {useSelector} from 'react-redux';
import {Map} from './Map.tsx';

export const NearPlacesOffersSection: React.FC = React.memo(() => {
  const nearbyOffers = useSelector((state: RootState) => state.offers.nearbyOffers);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className="container" style={{display: 'flex', height: "860px"}}>
      <section
        className="near-places places"
        style={{width: '680px', overflowY: 'auto', boxSizing: 'border-box', paddingTop: '10px'}}
      >
        <OffersList offers={nearbyOffers} onCardHover={setActiveOfferId}/>
      </section>
      <section className="offer__map map" style={{margin: "0 auto", width: "50%", height: '100%'}}>
        <Map offers={nearbyOffers} activeOfferId={activeOfferId}/>
      </section>
    </div>
  );
});
