import { createAction } from '@reduxjs/toolkit';
import type { Offer } from '../types/offer.ts';

export const changeCity = createAction<string>('city/changeCity');
export const fillOffers = createAction<Offer[]>('offers/fillOffers');
export const clearFavorites = createAction('favorites/clearfavorites');
