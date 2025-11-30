import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {OffersList} from '../components/OffersList';
import {useSelector, useDispatch} from 'react-redux';
import type {AppDispatch, RootState} from '../store';
import {Map} from '../components/Map';
import {CitiesList} from '../components/CitiesList';
import {changeCity} from '../store/action';
import {SortOptions} from '../components/SortOptions';
import {SortType} from '../components/SortOptions';
import Spinner from '../components/Spinner';
import {resetCityChanged} from "../store/citySlice.ts";
import {MainEmptyPage} from "./MainEmptyPage.tsx";

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const MainPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const city = useSelector((state: RootState) => state.city);
  const cityCoords = useSelector((state: RootState) => state.city.coords);
  const cityChanged = useSelector((state: RootState) => state.city.cityChanged);
  const offers = useSelector((state: RootState) => state.offers.items);
  const isLoading = useSelector((state: RootState) => state.offers.isOffersLoading);
  const error = useSelector((state: RootState) => state.offers.error);

  const [sort, setSort] = useState<SortType>(SortType.Popular);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const filtered = useMemo(
    () => offers.filter((offer) => offer.city.name === city.name),
    [offers, city]
  );

  const sorted = useMemo(() => {
    switch (sort) {
      case 'Price: low to high':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [filtered, sort]);

  const handleCityClick = useCallback((selectedCity: string) => {
    dispatch(changeCity(selectedCity));
  }, [dispatch]);

  useEffect(() => {
    if (cityChanged) {
      dispatch(resetCityChanged());
    }
  }, [cityChanged, dispatch])

  if ((!isLoading && filtered.length === 0) || error) {
    return <MainEmptyPage/>;
  }

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={CITIES}
              activeCity={city.name}
              onCityClick={handleCityClick}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filtered.length} places to stay in {city.name}</b>
              <SortOptions sortState={sort} onSortChange={setSort}/>
              {
                isLoading
                  ? <Spinner/>
                  : error
                    ? <div>{error}</div>
                    : <OffersList offers={sorted} onCardHover={setActiveOfferId}/>
              }
            </section>
            <section className="cities__map map" style={{width: '45%'}}>
              <Map offers={filtered} activeOfferId={activeOfferId} center={cityCoords} cityChanged={cityChanged}/>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
