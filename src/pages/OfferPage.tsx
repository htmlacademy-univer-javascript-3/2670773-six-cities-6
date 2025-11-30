import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, Navigate, useNavigate} from 'react-router';
import {fetchOffer, fetchNearbyOffers, fetchReviews, changeFavoriteStatus} from '../store/offerThunks';
import type {RootState, AppDispatch} from '../store';
import {AuthorizationStatus} from '../store/authSlice';
import {ReviewList} from '../components/ReviewList';
import Spinner from '../components/Spinner';
import {CommentForm} from '../components/CommentForm';
import {NearPlacesOffersSection} from '../components/NearPlacesOffersSection';

export const OfferPage: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviews(id));
    }
  }, [id, dispatch]);

  const offer = useSelector((state: RootState) => state.offers.currentOffer);
  const reviews = useSelector((state: RootState) => state.offers.reviews);
  const isOfferLoading = useSelector((state: RootState) => state.offers.isOfferLoading);
  const error = useSelector((state: RootState) => state.offers.error);

  const isAuthorized = useSelector((state: RootState) => state.auth.authorizationStatus === AuthorizationStatus.Authorized)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthorized) {
      navigate('/login');
      return;
    }
    if (!offer?.id) {
      return;
    }
    dispatch(changeFavoriteStatus({
      offerId: offer.id,
      status: offer.isFavorite ? 0 : 1
    }));
  }

  if (isOfferLoading) {
    return <Spinner/>;
  }

  if (!isOfferLoading && error) return <Navigate to="/404" replace/>;

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer?.images?.map((img, i) => (
                <div className="offer__image-wrapper" key={i}>
                  <img className="offer__image" src={img} alt={offer?.title}/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer?.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer?.title}
                </h1>
                <button
                  className={`offer__bookmark-button button${offer?.isFavorite ? ' offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{offer?.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(offer?.rating ?? 0) * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer?.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer?.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer?.bedrooms} {offer?.bedrooms === 1 ? 'bedroom' : 'bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer?.maxAdults} {offer?.maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer?.goods?.map((good, i) => (
                    <li className="offer__inside-item" key={i}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                {offer?.host && (
                  <div className="offer__host-user user">
                    <div
                      className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}
                    >
                      <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                           alt="Host avatar"/>
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                  </div>
                )}
                <div className="offer__description">
                  <p className="offer__text">
                    {offer?.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList reviews={reviews}/>
                {isAuthorized && (
                  <CommentForm offerId={id!}/>
                )}
              </section>
            </div>
          </div>
        </section>
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <NearPlacesOffersSection/>
      </main>
    </div>
  );
}
