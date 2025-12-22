import {combineReducers} from '@reduxjs/toolkit';
import offersReducer from './offer-slice.ts';
import cityReducer from './city-slice.ts';
import authReducer from './auth-slice.ts';

export const reducer = combineReducers({
  offers: offersReducer,
  city: cityReducer,
  auth: authReducer,
});
