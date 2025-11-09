import {combineReducers} from '@reduxjs/toolkit';
import offersReducer from './offerSlice';
import cityReducer from './citySlice';

export const reducer = combineReducers({
  offers: offersReducer,
  city: cityReducer,
});
