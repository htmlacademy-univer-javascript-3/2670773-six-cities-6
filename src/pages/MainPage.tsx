import React, {useState, useMemo} from 'react';
import {OffersList} from '../components/OffersList';
import {useSelector, useDispatch} from 'react-redux';
import type {RootState} from '../store';
import {Map} from '../components/Map';
import {CitiesList} from '../components/CitiesList';
import {changeCity} from '../store/action';
import {SortOptions} from '../components/SortOptions';
import {SortType} from '../components/SortOptions';
import {Header} from "../components/Header";
import Spinner from '../components/Spinner';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers.items);
  const isLoading = useSelector((state: RootState) => state.offers.isLoading);
  const error = useSelector((state: RootState) => state.offers.error);

  const [sort, setSort] = useState<SortType>(SortType.Popular);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const filtered = useMemo(
    () => offers.filter((offer) => offer.city.name === city),
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

  const handleCityClick = (selectedCity: string) => {
    dispatch(changeCity(selectedCity));
  };

  return (
    <>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            >
            </path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path
              d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"
            >
            </path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            >
            </path>
          </symbol>
        </svg>
      </div>

      <div className="page page--gray page--main">
        <Header/>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList
                cities={CITIES}
                activeCity={city}
                onCityClick={handleCityClick}
              />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filtered.length} places to stay in Amsterdam</b>
                <SortOptions sortState={sort} onSortChange={setSort}/>
                {
                  isLoading
                    ? <Spinner/>
                    : error
                      ? <div>{error}</div>
                      : <OffersList offers={sorted} onCardHover={setActiveOfferId}/>
                }
              </section>
              <div className="cities__right-section">
                <Map offers={filtered} className="cities__map map" activeOfferId={activeOfferId}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
};
